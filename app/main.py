from fastapi import FastAPI
#from app.Routes.AUV import user,admins, vendor
from app.Routes.register import register
from app.Routes.login import login
from fastapi.middleware.cors import CORSMiddleware
from app.Routes.medeq import medeq
from app.database.rxdb import db,verify_db_connection
from app.Routes.inventory_admin import inventory_admin

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    # Verify database connection and collections
    if not await verify_db_connection():
        raise Exception("Failed to connect to database")

# Add CORS middleware to allow the frontend to interact with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Changed to list
    allow_credentials=True,
    allow_methods=[" http://localhost:3000"],  # Allow all HTTP methods
    allow_headers=[" http://localhost:3000"],  # Allow all headers
)

# Include routes
app.include_router(register, prefix="/api/register", tags=["register"])
app.include_router(login, prefix="/api/login", tags=["login"])
app.include_router(medeq, prefix="/api/medeq", tags=["medicine"])
app.include_router(inventory_admin, prefix="/api/inventory_admin", tags=["inventory_admin"])
#app.include_router(user.router, prefix="/user", tags=["User"])
#app.include_router(admins.router, prefix="/admin", tags=["Admin"])
#app.include_router(vendor.router, prefix="/vendor", tags=["Vendor"])

@app.get("/")
def root():
    return {"message": "RXIntel API is live"}

