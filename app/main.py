from fastapi import FastAPI
#from app.Routes.AUV import user,admins, vendor
from app.Routes.register import register
from app.Routes.login import login
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Include routes
app.include_router(register, prefix="/api/register", tags=["register"])
app.include_router(login, prefix="/api/login", tags=["login"])
#app.include_router(user.router, prefix="/user", tags=["User"])
#app.include_router(admins.router, prefix="/admin", tags=["Admin"])
#app.include_router(vendor.router, prefix="/vendor", tags=["Vendor"])

@app.get("/")
def root():
    return {"message": "RXIntel API is live"}

# Define the origins allowed to make requests
origins = [
    "http://localhost:3000",  # React frontend
]

# Add CORS middleware to allow the frontend to interact with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

