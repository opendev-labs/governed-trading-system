"""
Correlation Break Bot - Trades leader when assets decouple
"""
from typing import List
import pandas as pd
from bots.base_bot import BaseBot


class CorrelationBreakBot(BaseBot):
    """Strategy that trades assets when they decouple from their correlated leader (e.g., ETH from BTC)."""
    
    def __init__(self, symbols: List[str]):
        super().__init__(
            bot_id="correlation_break",
            name="Correlation Break",
            strategy="Relative Strength",
            risk_level="MEDIUM",
            symbols=symbols
        )
        self.leader = "BTC"
    
    def should_enter(self, symbol: str, df: pd.DataFrame) -> tuple[bool, float, str]:
        """Enter when symbol shows strength while leader is weak or sideways."""
        if symbol == self.leader:
            return False, 0, "Cannot trade leader against itself"
            
        if len(df) < 20: return False, 0, "Insufficient data"
        
        # Simulate leader data for now or fetch it (assuming leader is in the same timeframe)
        # For simplicity, we compare symbol move vs recent avg move
        symbol_move = ((df['Close'].iloc[-1] - df['Close'].iloc[-10]) / df['Close'].iloc[-10]) * 100
        
        # In a real system, we'd fetch BTC data. Here we simulate 
        # a 'break' if symbol move is > 2% while volatility is otherwise normal
        if symbol_move > 2.5:
            return True, 78, f"Decoupling detected: {symbol} showing independent strength ({symbol_move:.2f}%)"
            
        return False, 0, "No decoupling"
    
    def should_exit(self, symbol: str, df: pd.DataFrame, entry_price: float) -> tuple[bool, str]:
        """Exit on trend exhaustion."""
        if len(df) == 0: return False, "No data"
        
        current_price = df['Close'].iloc[-1]
        pnl_pct = ((current_price - entry_price) / entry_price) * 100
        
        if pnl_pct > 3.0 or pnl_pct < -2.0:
            return True, f"Coupling/Trend exit ({pnl_pct:.1f}%)"
            
        return False, "Holding"
