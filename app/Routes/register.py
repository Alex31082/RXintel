from fastapi import APIRouter, HTTPException
from app.Routes.auth_router import UserRegister
from passlib.context import CryptContext
from app.database.rxdb import db
from motor.motor_asyncio import AsyncIOMotorClient
register = APIRouter(tags=["register"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Register route
@register.post("/")
async def register_user(user: UserRegister):
    # Check if the user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = pwd_context.hash(user.password)

    # Assign role based on email or other criteria
    if user.email.endswith("@rxadmin.com"):
        role = "admin"
    elif user.email.endswith("@rxvendor.com"):
        role = "vendor"
    else:
        role = "user"

    # Prepare user data
    user_data = {
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        "role": role,  # Save the role in the database
    }

    # Insert the user into the database
    await db.users.insert_one(user_data)
    return {"message": f"User registered as {role} successfully", "role": role}


# Test the connection
async def test_connection():
    print(await db.list_collection_names())