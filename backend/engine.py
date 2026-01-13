import time
import pandas as pd
import requests
import json
import os
from discord_webhook import DiscordWebhook, DiscordEmbed
from datetime import datetime

# --- CONFIGURATION ---
# --- CONFIGURATION ---
# --- CONFIGURATION ---
SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1CStqiA404-7jfAV_wwcZMVy_pXLEDe2r8xj1XRdA-dg/export?format=csv"
WEBHOOK_URL = "YOUR_DISCORD_WEBHOOK_URL_HERE"
# Map specific channels to different webhooks if needed (Advanced Routing)
CHANNEL_MAP = {
    "vip-signals": "WEBHOOK_URL_FOR_VIP",
    "scalping": "WEBHOOK_URL_FOR_SCALPING"
}
STATE_FILE = "leo_memory.json"
POLL_INTERVAL = 60
GEMINI_API_KEY = "AIzaSyApwcYR2OINSwIr2si3591O9mB5a1wUJMg"
MIN_CONFIDENCE = 80 # Only alert if confidence > 80%

class LeoEngine:
    def __init__(self):
        self.sent_alerts = self.load_state()
        print(f"[{datetime.now()}] 🦁 LEO Agent Online (Gemini Powered)")
        print(f"[{datetime.now()}] 📡 Monitoring Advanced Sheet: {SHEET_CSV_URL[:30]}...")

    def load_state(self):
        if os.path.exists(STATE_FILE):
            try:
                with open(STATE_FILE, 'r') as f:
                    return json.load(f)
            except:
                return []
        return []

    def save_state(self):
        with open(STATE_FILE, 'w') as f:
            json.dump(self.sent_alerts, f)

    def fetch_data(self):
        try:
            df = pd.read_csv(SHEET_CSV_URL)
            return df
        except Exception as e:
            print(f"[{datetime.now()}] ❌ LEO Vision Error: {e}")
            return None

    def ask_gemini(self, symbol, condition, price, confidence):
        print(f"[{datetime.now()}] 🧠 LEO Thinking about {symbol}...")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"
        
        prompt = f"""
        You are LEO, a senior crypto quant and trading expert.
        Analyze this signal:
        - Asset: {symbol}
        - Price: {price}
        - Logic: {condition}
        - Conf: {confidence}%
        
        Give a 1-sentence sharp, professional opinion. Is this confidence level justified? 
        """
        
        payload = {"contents": [{"parts": [{"text": prompt}]}]}
        
        try:
            response = requests.post(url, json=payload, headers={'Content-Type': 'application/json'})
            if response.status_code == 200:
                data = response.json()
                return data['candidates'][0]['content']['parts'][0]['text']
            else:
                return "LEO is temporarily offline."
        except:
            return "Analysis failed."

    def send_discord_alert(self, row, ai_analysis):
        # Determine Webhook URL based on Channel
        channel = str(row.get('DISCORD_CHANNEL', 'general')).lower()
        target_url = CHANNEL_MAP.get(channel, WEBHOOK_URL)

        webhook = DiscordWebhook(url=target_url)
        
        signal_type = str(row.get('SIGNAL_TYPE', 'LONG')).upper()
        color = '00ff00' if signal_type == 'LONG' else 'ff0000'

        embed = DiscordEmbed(
            title=f"🦁 LEO Signal: {row.get('SYMBOL', 'N/A')} ({signal_type})", 
            description=f"**{row.get('CONDITION', 'N/A')}**", 
            color=color
        )
        embed.add_embed_field(name="Price", value=str(row.get('LAST_PRICE', 'N/A')), inline=True)
        embed.add_embed_field(name="Confidence", value=f"{row.get('CONFIDENCE', '0')}%", inline=True)
        embed.add_embed_field(name="Channel", value=f"#{channel}", inline=True)
        
        embed.add_embed_field(name="🦁 LEO's Take", value=ai_analysis, inline=False)
        embed.set_footer(text=f"ScanTrade LEO • {datetime.now().strftime('%H:%M:%S')}")
        
        webhook.add_embed(embed)
        webhook.execute()
        return True

    def run(self):
        while True:
            print(f"[{datetime.now()}] 👁️ LEO Scanning...")
            df = self.fetch_data()

            if df is not None:
                df.columns = [x.upper().strip() for x in df.columns]
                
                # Check for critical columns
                if 'STATUS' in df.columns and 'ID' in df.columns:
                    pending = df[df['STATUS'].str.upper() == 'PENDING']
                    
                    for _, row in pending.iterrows():
                        tid = str(row['ID'])
                        if tid not in self.sent_alerts:
                            # Confidence Check
                            conf = float(row.get('CONFIDENCE', 0))
                            if conf >= MIN_CONFIDENCE:
                                print(f"[{datetime.now()}] 🎯 TARGET ACQUIRED: {row.get('SYMBOL')} ({conf}%)")
                                
                                analysis = self.ask_gemini(
                                    row.get('SYMBOL'), 
                                    row.get('CONDITION'), 
                                    row.get('LAST_PRICE'), 
                                    conf
                                )
                                
                                if "YOUR_DISCORD" not in WEBHOOK_URL:
                                    self.send_discord_alert(row, analysis)
                                    print(f"[{datetime.now()}] 📨 Signal Dispatched")
                                else:
                                    print(f"[{datetime.now()}] ⚠️ Simulation: Webhook Unset")
                                
                                self.sent_alerts.append(tid)
                                self.save_state()
                            else:
                                print(f"[{datetime.now()}] 🗑️ Filtered Low Confidence Signal ({conf}%)")
            
            time.sleep(POLL_INTERVAL)

if __name__ == "__main__":
    leo = LeoEngine()
    leo.run()
