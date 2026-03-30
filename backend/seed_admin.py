import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
import models, auth

def seed_admin():
    db = SessionLocal()
    # Seed admin user
    admin_email = "admin@fitmanager.com"
    if not db.query(models.User).filter(models.User.email == admin_email).first():
        hashed_password = auth.get_password_hash("admin")
        admin_user = models.User(email=admin_email, hashed_password=hashed_password, role="admin")
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        admin_profile = models.MemberProfile(user_id=admin_user.id, full_name="System Admin")
        db.add(admin_profile)
        db.commit()
        print("Admin user created successfully.")
    else:
        print("Admin user already exists.")

    # Seed client user
    client_email = "client@fitmanager.com"
    if not db.query(models.User).filter(models.User.email == client_email).first():
        hashed_password = auth.get_password_hash("client")
        client_user = models.User(email=client_email, hashed_password=hashed_password, role="member")
        db.add(client_user)
        db.commit()
        db.refresh(client_user)
        client_profile = models.MemberProfile(user_id=client_user.id, full_name="shivaraj mahato")
        db.add(client_profile)
        db.commit()
        print("Client user created successfully.")
    else:
        print("Client user already exists.")
        
    # Also seed plans
    if db.query(models.MembershipPlan).count() == 0:
        plans = [
            models.MembershipPlan(name="Basic", price=29.99, duration_days=30, features="Access to gym equipment"),
            models.MembershipPlan(name="Premium", price=49.99, duration_days=30, features="Gym + Classes"),
            models.MembershipPlan(name="VIP", price=89.99, duration_days=30, features="Gym + Classes + Personal Trainer")
        ]
        db.add_all(plans)
        db.commit()
        print("Membership plans seeded.")
        
    db.close()

if __name__ == "__main__":
    seed_admin()
