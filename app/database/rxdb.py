from pymongo import MongoClient
from app.config.settings import get_mongo_uri, get_db_name

# MongoDB client
client = MongoClient(get_mongo_uri())
db = client[get_db_name()]  # Access the correct database
