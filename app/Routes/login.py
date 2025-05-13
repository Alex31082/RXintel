from fastapi import APIRouter, HTTPException
from app.Routes.auth_router import UserLogin
from passlib.context import CryptContext
from app.database.rxdb import db
from app.Routes.auth_router import UserLogin  # wherever you store it

login = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])

@login.post("/")
async def login_user(user: UserLogin):
    # Lookup user by email
    existing_user = await db.users.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="User not found")

    # Optional: match username as well
    if user.username != existing_user.get("username"):
        raise HTTPException(status_code=400, detail="Incorrect username")

    # Verify password
    if not pwd_context.verify(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # (Optional) Generate JWT here if needed

    return {
        "message": "Login successful",
        "role": existing_user["role"]
        # Optionally return token if using JWT
    }