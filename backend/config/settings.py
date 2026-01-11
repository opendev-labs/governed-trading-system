"""
Configuration settings for the trading system.
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Server Configuration
    debug: bool = True
    port: int = 8000
    host: str = "0.0.0.0"
    
    # Database
    database_url: str = "sqlite:///./trading_system.db"
    
    # Trading Configuration
    initial_capital: float = 100000.0
    max_position_size_pct: float = 5.0
    max_portfolio_exposure_pct: float = 20.0
    max_drawdown_pct: float = 10.0
    
    # Market Data
    data_update_interval: int = 60  # seconds
    market_symbols: str = "AAPL,MSFT,GOOGL,AMZN,TSLA,NVDA,META,SPY,QQQ"
    
    # Risk Management
    enable_paper_trading: bool = True
    enable_risk_checks: bool = True
    
    # Google Sheets Integration
    google_sheet_id: str = ""
    google_sheets_credentials_file: str = "backend/config/credentials.json"
    
    # Messaging Integrations
    telegram_bot_token: str = ""
    telegram_chat_id: str = ""
    discord_webhook_url: str = ""
    
    class Config:
        env_file = ".env"
        case_sensitive = False
    
    @property
    def symbols_list(self) -> List[str]:
        """Get list of symbols from comma-separated string."""
        return [s.strip() for s in self.market_symbols.split(",")]


# Global settings instance
settings = Settings()
