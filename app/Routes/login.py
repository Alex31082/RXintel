from fastapi import APIRouter, HTTPException
from app.Routes.auth_router import UserLogin
from passlib.context import CryptContext
from app.database.rxdb import db
from app.Routes.auth_router import UserLogin  # wherever you store it

login = APIRouter(prefix="/api/login", tags=["login"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated=["auto"])

# Login route
@login.post("/")
async def login_user(user: UserLogin):
    # Check if the user exists
    existing_user = db.users.find_one({"email": user.email})
    if not existing_user:
        raise HTTPException(status_code=400, detail="User not found")

    # Verify the password
    if not pwd_context.verify(user.password, existing_user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # Return a success message (or token if implementing JWT)
    return {"message": "Login successful", "role": existing_user["role"]}
