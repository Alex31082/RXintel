from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str
    SECRET_KEY: str
    DB_NAME: str
    ALGORITHM: str = "HS256"  # Default value
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # Default value

    class Config:
        env_file = ".env"  # Ensure that it's loading the .env file

# Instantiate the settings
settings = Settings()

# Define the required functions
def get_mongo_uri():
    return settings.MONGO_URI

def get_db_name():
    return settings.DB_NAME
