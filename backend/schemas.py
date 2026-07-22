from pydantic import BaseModel

class UserSettingsUpdate(BaseModel):
    username: str
    email: str