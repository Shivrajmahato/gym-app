from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Users
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[str] = "member"
    full_name: str

class UserLogin(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    is_active: bool

    class Config:
        orm_mode = True

# Tokens
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Member Profiles
class MemberProfileBase(BaseModel):
    full_name: str
    phone: Optional[str] = None
    bmi: Optional[float] = None
    goals: Optional[str] = None

class MemberProfileResponse(MemberProfileBase):
    id: int
    user_id: int
    join_date: datetime

    class Config:
        orm_mode = True

# Membership Plans
class MembershipPlanBase(BaseModel):
    name: str
    price: float
    duration_days: int
    features: str

class MembershipPlanCreate(MembershipPlanBase):
    pass

class MembershipPlanResponse(MembershipPlanBase):
    id: int

    class Config:
        orm_mode = True

# Subscriptions
class SubscriptionResponse(BaseModel):
    id: int
    user_id: int
    plan_id: int
    start_date: datetime
    end_date: datetime
    is_active: bool

    class Config:
        orm_mode = True

# Payments
class PaymentResponse(BaseModel):
    id: int
    user_id: int
    amount: float
    payment_date: datetime
    status: str
    transaction_id: Optional[str] = None

    class Config:
        orm_mode = True

# Dashboard
class DashboardStats(BaseModel):
    total_members: int
    active_subscriptions: int
    recent_revenue: float
    upcoming_classes: int
