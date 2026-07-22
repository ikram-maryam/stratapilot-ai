from database import engine, Base
import models

# Yeh command database aur table create kar degi
Base.metadata.create_all(bind=engine)
print("Database and Tables created successfully!")