
from pydantic import BaseModel, EmailStr

from app.utils.email_validator import is_valid_email
from app.database.rxdb import db
def to_camel(string: str) -> str:
    parts = string.split('_')
    return parts[0] + ''.join(word.capitalize() for word in parts[1:])


# Models
class UserRegister(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    age: int
    gender: str
    address: str
    password: str 
    class Config:
        alias_generator = to_camel
        populate_by_name = True
        allow_population_by_field_name = True
    
class UserLogin(BaseModel):
    username:str
    email: EmailStr
    password: str
    class Config:
        alias_generator = to_camel
        populate_by_name = True
        validate_by_name = True
# Role assignment
def assign_role_based_on_email(email: str) -> str:
    if "@rxadmin.com" in email:
        return "AdminDashboard"
    elif "@rxvendor.com" in email:
        return "vendor"
    else:
      return "user"



