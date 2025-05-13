from pydantic import BaseModel, EmailStr, Field

class UserRegister(BaseModel):
    username: str = Field(..., min_length=3)
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    age: int
    gender: str
    address: str
    password: str = Field(..., min_length=6)
