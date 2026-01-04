"""
No-Trade Guardian Bot - The ultimate safety switch
"""
from typing import List
import pandas as pd
from bots.base_bot import BaseBot
from governance.risk_manager import risk_manager


class NoTradeGuardianBot(BaseBot):
    """Safety bot that enforces NO-TRADE state when health is critical."""
    
    def __init__(self, symbols: List[str]):
        super().__init__(
            bot_id="no_trade_guardian",
            name="No-Trade Guardian",
            strategy="Safety",
            risk_level="CRITICAL",
            symbols=symbols
        )
    
    def should_enter(self, symbol: str, df: pd.DataFrame) -> tuple[bool, float, str]:
        """Guardian never enters trades; it only stops them."""
        return False, 0, "Safety only"
    
    def should_exit(self, symbol: str, df: pd.DataFrame, entry_price: float) -> tuple[bool, str]:
        """Guardian can force exit all positions if health is < 30."""
        if risk_manager.health_score < 30:
            return True, f"GUARDIAN FORCE EXIT: Health Score Critical ({risk_manager.health_score:.1f})"
        return False, "Monitoring"
        
    def execute(self):
        """Override execute to enforce safety rules."""
        if risk_manager.health_score < 40:
            self.status = "active"
            self.last_signal = "ALL BOTS OFF: Health Critical"
        else:
            self.status = "idle"
