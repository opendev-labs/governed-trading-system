"""
Liquidity Sweep Bot - Reversals after clearing equal highs/lows
"""
from typing import List
import pandas as pd
from bots.base_bot import BaseBot


class LiquiditySweepBot(BaseBot):
    """Strategy that looks for price to sweep liquidity above/below equal highs/lows."""
    
    def __init__(self, symbols: List[str]):
        super().__init__(
            bot_id="liquidity_sweep",
            name="Liquidity Sweep",
            strategy="Reversal",
            risk_level="MEDIUM",
            symbols=symbols
        )
    
    def should_enter(self, symbol: str, df: pd.DataFrame) -> tuple[bool, float, str]:
        """Enter on reversal after high/low sweep."""
        if len(df) < 20:
            return False, 0, "Insufficient data"
            
        recent_highs = df['High'].iloc[-20:-1].max()
        recent_lows = df['Low'].iloc[-20:-1].min()
        current_high = df['High'].iloc[-1]
        current_low = df['Low'].iloc[-1]
        current_close = df['Close'].iloc[-1]
        
        # Bearish Sweep: Price went above recent high but closed below it
        if current_high > recent_highs and current_close < recent_highs:
            return True, 80, f"Bearish Liquidity Sweep (High: {current_high:.2f})"
            
        # Bullish Sweep: Price went below recent low but closed above it
        if current_low < recent_lows and current_close > recent_lows:
            return True, 80, f"Bullish Liquidity Sweep (Low: {current_low:.2f})"
            
        return False, 0, "No sweep detected"
    
    def should_exit(self, symbol: str, df: pd.DataFrame, entry_price: float) -> tuple[bool, str]:
        """Exit at 1:2 Risk/Reward or stop loss."""
        if len(df) == 0: return False, "No data"
        
        current_price = df['Close'].iloc[-1]
        pnl_pct = ((current_price - entry_price) / entry_price) * 100
        
        if abs(pnl_pct) > 2.0:
            return True, f"Target/Stop reached ({pnl_pct:.1f}%)"
            
        return False, "Holding"
