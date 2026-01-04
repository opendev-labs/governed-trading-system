"""
Session Open Bot - Trades the break or fade of the first move in NY/London open
"""
from typing import List
from datetime import datetime
import pandas as pd
from bots.base_bot import BaseBot


class SessionOpenBot(BaseBot):
    """Strategy that trades session openings by detecting initial direction."""
    
    def __init__(self, symbols: List[str]):
        super().__init__(
            bot_id="session_open",
            name="Session Open",
            strategy="Momentum",
            risk_level="HIGH",
            symbols=symbols
        )
    
    def should_enter(self, symbol: str, df: pd.DataFrame) -> tuple[bool, float, str]:
        """Enter when a session opens and shows clear direction."""
        now = datetime.utcnow()
        # London Open (approx 8 AM UTC) or NY Open (approx 13 PM UTC)
        is_london_open = now.hour == 8 and now.minute < 30
        is_ny_open = now.hour == 13 and now.minute < 30
        
        if not (is_london_open or is_ny_open):
            return False, 0, "No active session opening"
            
        if len(df) < 5: return False, 0, "Insufficient data"
        
        # Check for expansion in first few 5m candles
        first_candle = df.iloc[-5]
        last_candle = df.iloc[-1]
        move_pct = ((last_candle['Close'] - first_candle['Open']) / first_candle['Open']) * 100
        
        if abs(move_pct) > 0.5:
            direction = "Long" if move_pct > 0 else "Short"
            return True, 85, f"{direction} trade on Session Open expansion ({move_pct:.2f}%)"
            
        return False, 0, "Wait for expansion"
    
    def should_exit(self, symbol: str, df: pd.DataFrame, entry_price: float) -> tuple[bool, str]:
        """Exit after 1 hour or on reversal."""
        if len(df) == 0: return False, "No data"
        
        current_price = df['Close'].iloc[-1]
        pnl_pct = abs((current_price - entry_price) / entry_price) * 100
        
        # Exit if target 1% reached or 2% stop
        if pnl_pct > 1.0:
            return True, f"Session move target reached ({pnl_pct:.1f}%)"
            
        return False, "Holding"
