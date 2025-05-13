from fastapi import HTTPException
from app.database.rxdb import db  # your MongoDB database object

# Valid collections in your app
VALID_COLLECTIONS = ["users", "vendors", "admins", "med_eq"]

def get_collection(collection_name: str):
    if collection_name not in VALID_COLLECTIONS:
        raise HTTPException(status_code=400, detail=f"Invalid collection: {collection_name}")
    return db[collection_name]

# ---------------- CREATE ----------------
async def create_document(collection_name: str, document_data: dict):
    collection = get_collection(collection_name)
    try:
        await collection.insert_one(document_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error inserting into {collection_name}: {str(e)}")

# ---------------- READ (single) ----------------
async def get_document_by_filter(collection_name: str, filter_query: dict):
    collection = get_collection(collection_name)
    try:
        document = await collection.find_one(filter_query)
        if not document:
            raise HTTPException(status_code=404, detail=f"{collection_name.capitalize()} item not found.")
        return document
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching from {collection_name}: {str(e)}")

# ---------------- READ (all) ----------------
async def get_all_documents(collection_name: str):
    collection = get_collection(collection_name)
    try:
        documents = await collection.find().to_list(length=None)
        if not documents:
            raise HTTPException(status_code=404, detail=f"No items found in {collection_name}.")
        return documents
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading all from {collection_name}: {str(e)}")

# ---------------- UPDATE ----------------
async def update_document_by_filter(collection_name: str, filter_query: dict, updated_data: dict):
    collection = get_collection(collection_name)
    try:
        result = await collection.update_one(filter_query, {"$set": updated_data})
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail=f"No item found to update in {collection_name} with filter: {filter_query}")
        return {"message": f"Successfully updated {result.matched_count} document(s)"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating {collection_name}: {str(e)}")


# ---------------- DELETE ----------------
async def delete_document_by_filter(collection_name: str, filter_query: dict):
    collection = get_collection(collection_name)
    try:
        result = await collection.delete_one(filter_query)
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail=f"No item found to delete in {collection_name} with filter: {filter_query}")
        return {"message": f"Successfully deleted {result.deleted_count} document(s)"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting from {collection_name}: {str(e)}")
