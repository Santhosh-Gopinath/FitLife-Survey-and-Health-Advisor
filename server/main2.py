from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import json
import os
import pickle
import numpy as np
from datetime import datetime

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Paths
base_dir = os.path.dirname(__file__)
db_json_path = os.path.join(base_dir, '../db.json')
client_path = os.path.join(base_dir, '../client')
model_path = os.path.join(base_dir, 'svc.pkl')

# Create db.json if it doesn't exist
if not os.path.exists(db_json_path):
    print('Creating new db.json file')
    with open(db_json_path, 'w') as f:
        json.dump({"users": [], "profiles": []}, f, indent=2)
    print('db.json file created successfully')

# Load the SVC model from svc.pkl
try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    print('Model loaded successfully from svc.pkl')
except Exception as e:
    model = None
    print(f'Failed to load model svc.pkl: {e}')

# Serve static files from client directory
app.mount("/static", StaticFiles(directory=client_path), name="static")

# Pydantic models
class Profile(BaseModel):
    fullName: str
    dateOfBirth: str
    age: int
    gender: str
    userId: str = None  # Will be set from auth middleware
    createdAt: str = None
    updatedAt: str = None

class PredictRequest(BaseModel):
    data: list

# Dummy auth dependency (Replace with your real auth logic)
def auth(request: Request):
    # Example: extract user info from JWT token or headers
    # Here we simply return a dummy user id for demonstration
    return {"id": "dummy_user_id"}

# Profile endpoints
@app.get("/api/profile", response_model=Profile)
async def get_profile(user: dict = Depends(auth)):
    user_id = user['id']
    try:
        with open(db_json_path, 'r') as f:
            db_data = json.load(f)
        if 'profiles' not in db_data:
            db_data['profiles'] = []
            # write back updated empty profiles array
            with open(db_json_path, 'w') as fw:
                json.dump(db_data, fw, indent=2)
        user_profile = next((p for p in db_data['profiles'] if p['userId'] == user_id), None)
        if not user_profile:
            raise HTTPException(status_code=404, detail="Profile not found")
        return user_profile
    except Exception as e:
        print(f"Error in GET /api/profile: {e}")
        raise HTTPException(status_code=500, detail="Server error")

@app.post("/api/profile", response_model=Profile)
async def create_or_update_profile(profile: Profile, user: dict = Depends(auth)):
    user_id = user['id']
    # Ensure required fields present (Pydantic validation enforces this)
    try:
        with open(db_json_path, 'r') as f:
            db_data = json.load(f)
    except Exception:
        db_data = {"users": [], "profiles": []}
    if 'profiles' not in db_data:
        db_data['profiles'] = []
    profile_index = next((i for i, p in enumerate(db_data['profiles']) if p['userId'] == user_id), None)
    profile_data = profile.dict()
    profile_data['userId'] = user_id
    profile_data['updatedAt'] = datetime.utcnow().isoformat()
    if profile_index is not None:
        # update
        db_data['profiles'][profile_index] = profile_data
    else:
        profile_data['createdAt'] = datetime.utcnow().isoformat()
        db_data['profiles'].append(profile_data)
    try:
        with open(db_json_path, 'w') as f:
            json.dump(db_data, f, indent=2)
        print(f"Profile saved for user {user_id}")
        return profile_data
    except Exception as e:
        print(f"Error writing to db.json: {e}")
        raise HTTPException(status_code=500, detail="Server error")

# Prediction endpoint using svc.pkl model
@app.post("/api/predict")
async def predict(request: PredictRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    try:
        # Assuming input data is a list of feature values
        input_array = np.array(request.data).reshape(1, -1)
        prediction = model.predict(input_array)
        return {"prediction": prediction.tolist()}
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=400, detail="Invalid input or prediction error")

# Serve client static HTML files for '/' and '/dashboard'
@app.get("/")
async def root():
    index_path = os.path.join(client_path, 'index.html')
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="File not found")

@app.get("/dashboard")
async def dashboard():
    dashboard_path = os.path.join(client_path, 'dashboard.html')
    if os.path.exists(dashboard_path):
        return FileResponse(dashboard_path)
    raise HTTPException(status_code=404, detail="File not found")

# Catch-all route for client side routing
@app.get("/{full_path:path}")
async def catch_all(full_path: str):
    index_path = os.path.join(client_path, 'index.html')
    if os.path.exists(index_path):
        return FileResponse(index_path)
    raise HTTPException(status_code=404, detail="File not found")

# Exception handler to mimic error handling middleware
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    print(f"Unhandled error: {exc}")
    return JSONResponse(
        status_code=500,
        content={"message": "Server error", "error": str(exc)},)

# Run the server with: uvicorn main2:app --reload
