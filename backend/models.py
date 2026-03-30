from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="member") # admin, manager, member
    is_active = Column(Boolean, default=True)

    member_profile = relationship("MemberProfile", back_populates="user", uselist=False)
    subscriptions = relationship("Subscription", back_populates="user")
    payments = relationship("Payment", back_populates="user")

class MemberProfile(Base):
    __tablename__ = "member_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    full_name = Column(String)
    phone = Column(String, nullable=True)
    join_date = Column(DateTime, default=datetime.datetime.utcnow)
    bmi = Column(Float, nullable=True)
    goals = Column(String, nullable=True)

    user = relationship("User", back_populates="member_profile")

class MembershipPlan(Base):
    __tablename__ = "membership_plans"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    duration_days = Column(Integer)
    features = Column(String)

    subscriptions = relationship("Subscription", back_populates="plan")

class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    plan_id = Column(Integer, ForeignKey("membership_plans.id"))
    start_date = Column(DateTime, default=datetime.datetime.utcnow)
    end_date = Column(DateTime)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="subscriptions")
    plan = relationship("MembershipPlan", back_populates="subscriptions")

class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    payment_date = Column(DateTime, default=datetime.datetime.utcnow)
    status = Column(String, default="completed") # completed, pending, failed
    transaction_id = Column(String, nullable=True)

    user = relationship("User", back_populates="payments")

class GymClass(Base):
    __tablename__ = "gym_classes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    trainer_name = Column(String)
    schedule = Column(DateTime)
    capacity = Column(Integer)
    current_enrolled = Column(Integer, default=0)
