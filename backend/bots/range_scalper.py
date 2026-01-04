"""
Range Scalper Bot - Fades extremes of a established range
"""
from typing import List
import pandas as pd
from bots.base_bot import BaseBot


class RangeScalperBot(BaseBot):
    """Strategy that fades extremes of a established range (e.g., Asian Session)."""
    
    def __init__(self, symbols: List[str]):
        super().__init__(
            bot_id="range_scalper",
            name="Range Scalper",
            strategy="Range Trading",
            risk_level="LOW",
            symbols=symbols
        )
        self.lookback = 48  # Approx 4 hours of 5m data if Asian range
    
    def should_enter(self, symbol: str, df: pd.DataFrame) -> tuple[bool, float, str]:
        """Enter when price is at range extremes with low volatility."""
        if len(df) < self.lookback:
            return False, 0, "Insufficient data"
        
        recent_df = df.iloc[-self.lookback:]
        high = recent_df['High'].max()
        low = recent_df['Low'].min()
        current_price = df['Close'].iloc[-1]
        
        range_size = high - low
        position_in_range = (current_price - low) / range_size if range_size > 0 else 0.5
        
        # Fade the top: Short if price > 90% of range
        if position_in_range > 0.90:
            return True, 75, f"Fading range top ({position_in_range*100:.1f}%)"
            
        # Fade the bottom: Buy if price < 10% of range
        if position_in_range < 0.10:
            return True, 75, f"Fading range bottom ({position_in_range*100:.1f}%)"
            
        return False, 0, "Price in middle of range"
    
    def should_exit(self, symbol: str, df: pd.DataFrame, entry_price: float) -> tuple[bool, str]:
        """Exit at range mean or stop loss."""
        if len(df) < self.lookback:
            return False, "No data"
            
        recent_df = df.iloc[-self.lookback:]
        high = recent_df['High'].max()
        low = recent_df['Low'].min()
        mean = (high + low) / 2
        current_price = df['Close'].iloc[-1]
        
        # Exit at mean (Take Profit)
        is_long = current_price > entry_price # Simple heuristic
        if is_long and current_price >= mean:
            return True, "Target reached (Range Mean)"
        if not is_long and current_price <= mean:
            return True, "Target reached (Range Mean)"
            
        # Stop loss at 1.5%
        pnl_pct = abs((current_price - entry_price) / entry_price) * 100
        if pnl_pct > 1.5:
            return True, f"Range breakout stop loss ({pnl_pct:.1f}%)"
            
        return False, "Holding"
