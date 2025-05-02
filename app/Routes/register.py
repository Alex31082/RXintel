from fastapi import APIRouter, HTTPException
from app.Routes.auth_router import UserRegister,assign_role_based_on_email
from app.utils.email_validator import is_valid_email, validate_email
from passlib.context import CryptContext
from app.database.rxdb import db

register = APIRouter(tags=["register"])


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Register route
@register.post("/")
async def register_user(user: UserRegister):
    is_valid_email(user.email)
    validate_email(user.email)

    existing_user = db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    role = assign_role_based_on_email(user.email)

    user_data = {
        "username": user.username,
        "firstname": user.firstname,
        "lastname": user.lastname,
        "email": user.email,
        "phone": user.phone,
        "age": user.age,
        "gender": user.gender,
        "address": user.address,
        "password": hashed_password,
        "role": role

    

    }

    db.users.insert_one(user_data)

    return {"message": f"User registered as {role} successfully", "role": role}
