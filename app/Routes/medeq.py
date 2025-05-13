# app/Routes/medicine.py

from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.Models.medicines import MedEq  
from bson import ObjectId
from io import BytesIO
from motor.motor_asyncio import AsyncIOMotorGridFSBucket
from app.database.rxdb import db
import base64

medeq = APIRouter()

# Initialize GridFS for async operations
fs = AsyncIOMotorGridFSBucket(db)

# Create Medicine Endpoint (POST)
@medeq.post("/")
async def create_medicine(
    name: str = Form(...),
    category: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    quantity: int = Form(...),
    vendor_id: str = Form(...),
    expiry_date: str = Form(...),
    manufacturer: str = Form(...),
    warnings: str = Form(...),
    stock: int = Form(...),
    image: UploadFile = File(...),
):
    try:
        # Validate image file
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Read image data
        image_data = await image.read()
        
        # Convert image to base64 for storage
        image_base64 = base64.b64encode(image_data).decode('utf-8')

        # Prepare medicine data
        medicine_data = MedEq(
            name=name,
            category=category,
            description=description,
            price=price,
            quantity=quantity,
            vendor_id=vendor_id,
            expiry_date=expiry_date,
            manufacturer=manufacturer,
            warnings=warnings,
            stock=stock,
            image={
                'filename': image.filename,
                'content_type': image.content_type,
                'data': image_base64
            }
        )

        # Convert to JSON-serializable format
        medicine_data_dict = jsonable_encoder(medicine_data)

        try:
            # Insert into database
            result = await db["medeq"].insert_one(medicine_data_dict)
            
            # Add the inserted ID to response
            medicine_data_dict["_id"] = str(result.inserted_id)
            
            # Remove base64 image data from response to reduce payload size
            if "image" in medicine_data_dict:
                medicine_data_dict["image"] = {
                    "filename": image.filename,
                    "content_type": image.content_type
                }
            
            return JSONResponse(
                content={
                    "message": "Medicine added successfully",
                    "data": medicine_data_dict
                },
                status_code=201
            )

        except Exception as db_error:
            print(f"Database error: {str(db_error)}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to save to database: {str(db_error)}"
            )

    except Exception as e:
        print(f"Error adding medicine: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"Error adding medicine: {str(e)}"
        )

class Config:
    validate_by_name = True  # Replace allow_population_by_field_name


