from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    openai_api_key: Optional[str] = None
    max_image_size_mb: int = 10
    request_timeout_seconds: int = 30
    enable_caching: bool = False
    log_level: str = "INFO"
    default_topic: str = "raincoat"

    class Config:
        env_file = ".env"
        env_prefix = "CHOREO_OPENAICON_"  # Added prefix to read from CHOREO_OPENAICON_OPENAI_API_KEY


settings = Settings()
