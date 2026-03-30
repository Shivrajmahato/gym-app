from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List

import models, schemas, auth, database
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Gym Management API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Authentication & Users
@app.post("/api/register", response_model=schemas.UserResponse)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(email=user.email, hashed_password=hashed_password, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create empty member profile
    new_profile = models.MemberProfile(user_id=new_user.id, full_name=user.full_name)
    db.add(new_profile)
    db.commit()
    
    return new_user

@app.post("/api/login", response_model=schemas.Token)
def login(user_credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user or not auth.verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Users / Members endpoints
@app.get("/api/members", response_model=List[schemas.MemberProfileResponse])
def get_members(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    members = db.query(models.MemberProfile).offset(skip).limit(limit).all()
    return members

@app.get("/api/dashboard", response_model=schemas.DashboardStats)
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Rough stats for demo
    total_members = db.query(models.MemberProfile).count()
    active_subscriptions = db.query(models.Subscription).filter(models.Subscription.is_active == True).count()
    # sum of completed payments today/recently
    # for simplicity:
    recent_revenue = sum([p.amount for p in db.query(models.Payment).filter(models.Payment.status == "completed").all()])
    upcoming_classes = db.query(models.GymClass).count()
    
    return {
        "total_members": total_members,
        "active_subscriptions": active_subscriptions,
        "recent_revenue": recent_revenue,
        "upcoming_classes": upcoming_classes
    }

# Mock Payment Provisioning
@app.post("/api/payments", response_model=schemas.PaymentResponse)
def create_payment(amount: float, user_id: int, db: Session = Depends(get_db)):
    """ Mock payment creation. In reality, you'd call Stripe/PayPal here. """
    payment = models.Payment(user_id=user_id, amount=amount, status="completed", transaction_id="mock_tx_123")
    db.add(payment)
    db.commit()
    db.refresh(payment)
    return payment

# Mock seed route for easy setup
@app.post("/api/seed")
def seed_database(db: Session = Depends(get_db)):
    if db.query(models.MembershipPlan).count() == 0:
        plans = [
            models.MembershipPlan(name="Basic", price=29.99, duration_days=30, features="Access to gym equipment"),
            models.MembershipPlan(name="Premium", price=49.99, duration_days=30, features="Gym + Classes"),
            models.MembershipPlan(name="VIP", price=89.99, duration_days=30, features="Gym + Classes + Personal Trainer")
        ]
        db.add_all(plans)
        db.commit()
    return {"message": "Seed completed"}
