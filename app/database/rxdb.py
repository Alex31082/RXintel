from motor.motor_asyncio import AsyncIOMotorClient
from app.config.settings import get_mongo_uri, get_db_name

# Initialize MongoDB client with database name
client = AsyncIOMotorClient(get_mongo_uri())
db = client[get_db_name()]

# Add verification function
async def verify_db_connection():
    try:
        # Verify connection
        await client.admin.command('ping')
        # List collections
        collections = await db.list_collection_names()
        print(f"Connected to database. Available collections: {collections}")
        return True
    except Exception as e:
        print(f"Database connection error: {e}")
        return False
