from datetime import datetime, timedelta
from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from sqlalchemy.orm import Session
from passlib.context import CryptContext

# Local database imports from Phase 1 & 2
from database import SessionLocal, engine
import models
import schemas

# Create tables if not already created
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="StrataPilot AI Backend", version="1.0.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password Hashing Context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- DATABASE DEPENDENCY ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- HARDCODED MOCKS (For non-settings modules) ---
ONBOARDING_DATABASE = [
    {
        "strata_plan": "SP-88421",
        "building_name": "Meridian Towers",
        "total_lots": 45,
        "manager_email": "maryamikram089@gmail.com"
    }
]

INVOICE_DATABASE = [
    {
        "invoice_id": "INV-2026-001",
        "vendor": "Sydney Water",
        "category": "Utilities",
        "strata_plan": "SP-88421",
        "amount": 1120.45,
        "status": "Pending Reconciliation"
    }
]

LEVY_DATABASE = [
    {
        "lot": "Lot 14",
        "owner": "Arthur Pendelton",
        "amount": 1450.00,
        "status": "Overdue"
    },
    {
        "lot": "Lot 22",
        "owner": "Elena Rostova",
        "amount": 890.00,
        "status": "Pending"
    }
]


# --- PYDANTIC MODELS ---

class LoginModel(BaseModel):
    email: str
    password: str


class NewClientModel(BaseModel):
    email: str
    username: str
    password: str


class OnboardingModel(BaseModel):
    strata_plan: str
    building_name: str
    total_lots: int
    manager_email: str


# --- API ENDPOINTS ---

@app.get("/")
def read_root():
    return {"message": "Welcome to StrataPilot AI Backend API!"}


# 1. Unified Login Endpoint
@app.post("/api/auth/login")
def login_user(data: LoginModel, db: Session = Depends(get_db)):
    # Check in SQLite Database
    user = db.query(models.User).filter(models.User.email.ilike(data.email)).first()

    if not user:
        # Fallback check for admin if not seeded yet
        if data.email.lower() == "admin@stratapilot.ai" and data.password == "admin123":
            return {
                "success": True,
                "message": "Login successful",
                "token": "sp_token_admin_admin",
                "email": "admin@stratapilot.ai",
                "username": "Super Admin",
                "role": "admin"
            }
        raise HTTPException(status_code=401, detail="Email not registered!")

    # Verify hashed password (support both plain text fallback and bcrypt)
    password_valid = False
    if user.hashed_password.startswith("$2b$") or user.hashed_password.startswith("$2a$"):
        password_valid = pwd_context.verify(data.password, user.hashed_password)
    else:
        password_valid = (user.hashed_password == data.password)

    if not password_valid:
        raise HTTPException(status_code=401, detail="Invalid password!")

    return {
        "success": True,
        "message": "Login successful",
        "token": f"sp_token_{user.id}_client",
        "email": user.email,
        "username": user.username,
        "role": "client"
    }


# 2. Admin: Get All Clients List from DB
@app.get("/api/admin/clients")
def get_admin_clients(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    client_list = []
    for u in users:
        client_list.append({
            "id": u.id,
            "email": u.email,
            "password": u.hashed_password,
            "username": u.username,
            "role": "client",
            "status": "Active",
            "trial_ends": "2030-01-01",
            "last_paid": "2026-07-01"
        })
    return client_list


# 3. Admin: Add New Client to DB (With Hashed Password)
@app.post("/api/admin/clients/add")
def add_new_client(data: NewClientModel, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email.ilike(data.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Client with this email already exists!")

    hashed_pw = pwd_context.hash(data.password)
    new_user = models.User(
        username=data.username,
        email=data.email,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Client successfully added!",
            "client": {"id": new_user.id, "email": new_user.email, "username": new_user.username}}


# 4. Admin: Delete Client
@app.delete("/api/admin/clients/{client_id}")
def delete_client(client_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == client_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Client not found!")

    db.delete(user)
    db.commit()
    return {"message": "Client account deleted successfully!"}


# 5. Dashboard Stats & Other Endpoints
@app.get("/api/dashboard/stats")
@app.get("/api/overview-metrics")
def get_dashboard_stats():
    return {
        "managed_portfolios": len(ONBOARDING_DATABASE),
        "total_lots_registered": sum(item["total_lots"] for item in ONBOARDING_DATABASE),
        "pending_invoices_amount": 1120.45,
        "pending_invoices_count": 1,
        "overdue_levies_amount": 2340.00,
        "system_status": "Systems Operational"
    }


@app.get("/api/invoices")
@app.get("/api/finance-inbox")
def get_invoices():
    return INVOICE_DATABASE


@app.get("/api/levies")
def get_levies():
    return LEVY_DATABASE


@app.post("/api/levies/dispatch/{index}")
def dispatch_notice(index: int):
    if 0 <= index < len(LEVY_DATABASE):
        LEVY_DATABASE[index]["status"] = "Notice Sent"
        return {"message": "BPAY collection notice successfully dispatched!", "item": LEVY_DATABASE[index]}
    raise HTTPException(status_code=404, detail="Levy record not found!")


# --- 6. SETTINGS UPDATE ENDPOINT (Profile & Password Integrated) ---

@app.post("/api/settings/update")
def update_settings(data: schemas.UserSettingsUpdate, db: Session = Depends(get_db)):
    user = db.query(models.User).first()

    if not user:
        user = models.User(
            username=data.username,
            email=data.email,
            hashed_password=pwd_context.hash("password123")
        )
        db.add(user)
    else:
        user.username = data.username
        user.email = data.email

        # Agar naya password bhi bheja gaya hai toh usay encrypt karke save kar do
        if hasattr(data, 'new_password') and data.new_password:
            user.hashed_password = pwd_context.hash(data.new_password)

    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "Settings updated successfully in Database!",
        "username": user.username,
        "email": user.email
    }