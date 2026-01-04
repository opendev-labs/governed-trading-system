"""
Funding Extremes Bot - Fades market crowd when sentiment (funding) is at extremes
"""
from typing import List
import pandas as pd
from bots.base_bot import BaseBot


class FundingExtremesBot(BaseBot):
    """Strategy that fades the crowd when funding rates (or price/volume stalls) are extreme."""
    
    def __init__(self, symbols: List[str]):
        super().__init__(
            bot_id="funding_extremes",
            name="Funding Extremes",
            strategy="Contrarian",
            risk_level="HIGH",
            symbols=symbols
        )
    
    def should_enter(self, symbol: str, df: pd.DataFrame) -> tuple[bool, float, str]:
        """Enter when price stalls after a strong move with high volume."""
        if len(df) < 10: return False, 0, "Insufficient data"
        
        # Heuristic for extreme sentiment: Sharp price move + high volume + deceleration
        recent_move = ((df['Close'].iloc[-1] - df['Low'].iloc[-5]) / df['Low'].iloc[-5]) * 100
        avg_v = df['Volume'].iloc[-10:-1].mean()
        cur_v = df['Volume'].iloc[-1]
        
        # Deceleration check: Last candle body is small relative to range
        range_size = df['High'].iloc[-1] - df['Low'].iloc[-1]
        body_size = abs(df['Close'].iloc[-1] - df['Open'].iloc[-1])
        deceleration = body_size < (range_size * 0.3)
        
        if recent_move > 3.0 and cur_v > (avg_v * 2) and deceleration:
            return True, 82, f"Fading extreme bullishness (Deceleration after {recent_move:.1f}% move)"
            
        if recent_move < -3.0 and cur_v > (avg_v * 2) and deceleration:
            return True, 82, f"Fading extreme bearishness (Deceleration after {abs(recent_move):.1f}% move)"
            
        return False, 0, "No extreme sentiment detected"
    
    def should_exit(self, symbol: str, df: pd.DataFrame, entry_price: float) -> tuple[bool, str]:
        """Exit on mean reversion or stop loss."""
        if len(df) == 0: return False, "No data"
        
        current_price = df['Close'].iloc[-1]
        # Exit if 1.5% profit or 2.5% stop
        profit_pct = ((current_price - entry_price) / entry_price) * 100
        
        if abs(profit_pct) > 1.5:
            return True, f"Sentiment reversal exit ({profit_pct:.1f}%)"
            
        return False, "Holding"
