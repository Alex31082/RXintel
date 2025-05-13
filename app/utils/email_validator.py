from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from app.database.rxdb import db
from passlib.context import CryptContext
from email_validator import EmailNotValidError , validate_email


# Dependency for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Email domain-based role assignment function
def assign_role_based_on_email(email: str) -> str:
    """Assign a role based on the domain of the email."""
    if "@rxadmin.com" in email:
        return "admin"
    elif "@rxvendor.com" in email:
        return "vendor"
    else:
      return "user"

# Helper function to validate email
def is_valid_email(email: str) -> bool:
    """Validate the email using email_validator."""
    try:
        # Validate email format
       def validate_email(email):
          return True
    except EmailNotValidError as e:
        # Return False if invalid email
        raise HTTPException(status_code=400, detail=f"Invalid email address: {str(e)}")

