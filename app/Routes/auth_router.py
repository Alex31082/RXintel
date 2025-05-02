
from pydantic import BaseModel, EmailStr

from app.utils.email_validator import is_valid_email
from app.database.rxdb import db

# Models
class UserRegister(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: EmailStr
    phone: str
    age: int
    gender: str
    address: str
    password: str 
    
class UserLogin(BaseModel):
    username:str
    email: EmailStr
    password: str

# Role assignment
def assign_role_based_on_email(email: str) -> str:
    if "@rxadmin.com" in email:
        return "admin"
    elif "@rxvendor.com" in email:
        return "vendor"
    else:
      return "user"



