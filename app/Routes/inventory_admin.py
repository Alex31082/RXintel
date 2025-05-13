from fastapi import APIRouter, HTTPException, Body
from app.Crud.op import get_all_documents, get_document_by_filter, update_document_by_filter, delete_document_by_filter
from app.database.rxdb import db
from bson import ObjectId
from app.Models.medicines import MedEq, UpdateMedEq

# Create a new APIRouter for the inventory admin endpoints
inventory_admin = APIRouter()

# ------------------ Display All Medicines ------------------
@inventory_admin.get("/medeq", response_model=list[MedEq])
async def get_all_medicines():
    try:
        # Fetch all medicines from the 'medeq' collection in MongoDB
        medicines = db.medeq.find()
        result = [MedEq(**medicine) for medicine in medicines]

        if not result:
            raise HTTPException(status_code=404, detail="No medicines found.")

        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching medicines: {str(e)}")

# ------------------ Delete Medicine ------------------
@inventory_admin.delete("/medeq/{vendor_id}")
async def delete_medicine(vendor_id: str):
    try:
        result = db.medeq.delete_one({"vendor_id": vendor_id})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Medicine not found.")

        return {"message": "Medicine deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting medicine: {str(e)}")

# ------------------ Edit Medicine (excluding vendor_id) ------------------
@inventory_admin.put("/medeq/{vendor_id}", response_model=MedEq)
async def update_medicine(vendor_id: str, updated_medicine: UpdateMedEq):
    try:
        update_data = {key: value for key, value in updated_medicine.dict(exclude_unset=True).items()}

        result = db.medeq.update_one(
            {"vendor_id": vendor_id}, {"$set": update_data}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Medicine not found.")

        updated_medicine = db.medeq.find_one({"vendor_id": vendor_id})
        return MedEq(**updated_medicine)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating medicine: {str(e)}")
