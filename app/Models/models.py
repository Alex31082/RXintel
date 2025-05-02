from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date

class MedEq(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    price: float
    quantity: int
    vendor_id: str  # This links the med&eq to a specific vendor (you can include this field if needed)
    medicine_id: str          # Unique identifier for the item
    expiry_date: date         # Expiry date (if applicable)
    manufacturer: str         # Manufacturer or supplier
    warnings: str             # Side effects or warnings (if applicable)
    image_url: str            # Image URL for display
    stock: int                # Stock available (for internal use)

class User(BaseModel):
    username: str
    firstname: str
    lastname: str
    email: EmailStr
    phone: str
    age: int
    gender: str
    address: str
    password: str  # This field will contain the plain text password during registration

class Admin(BaseModel):
    username: str
    email: EmailStr
    password: str  # Admin's password for authentication

class Vendor(BaseModel):
    username: str
    email: EmailStr
    phone: str
    password: str  # Vendor's password for authentication
    vendor_id: str  # Unique identifier for the vendor