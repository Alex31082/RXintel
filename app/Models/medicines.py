from pydantic import BaseModel
from typing import Optional
from bson import ObjectId

class MedEq(BaseModel):
    name: str
    category: str
    description: str
    price: float
    quantity: int
    vendor_id: str
    expiry_date: str
    manufacturer: str
    warnings: str
    stock: int
    image: Optional[dict] = None

    class Config:
        validate_by_name = True

class UpdateMedEq(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None
    expiry_date: Optional[str] = None
    manufacturer: Optional[str] = None
    warnings: Optional[str] = None
    stock: Optional[int] = None
    image_id: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Medicine Name",
                "category": "Category",
                "description": "Description",
                "price": 0.0,
                "quantity": 0,
                "expiry_date": "YYYY-MM-DD",
                "manufacturer": "Manufacturer Name",
                "warnings": "Warning text",
                "stock": 0,
                "image_id": "Image ID"
            }
        }
        json_encoders = {
            ObjectId: str
        }
        form_attributes = True
        arbitrary_types_allowed = True