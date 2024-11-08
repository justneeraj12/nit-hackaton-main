from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional
import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

app = FastAPI()

# This should be a secure random string in a real application
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# This would typically be stored in a database
fake_users_db = {
    "parent@example.com": {
        "email": "parent@example.com",
        "hashed_password": pwd_context.hash("parentpassword"),
        "is_parent": True
    },
    "kid": {
        "username": "kid",
        "hashed_password": pwd_context.hash("kidpassword"),
        "is_parent": False
    }
}

class User(BaseModel):
    username: str
    is_parent: bool

class Token(BaseModel):
    access_token: str
    token_type: str

class ScreenTimeLog(BaseModel):
    date: str
    minutes: int

class AIRecommendation(BaseModel):
    recommendation: str

def get_user(username: str):
    if username in fake_users_db:
        user_dict = fake_users_db[username]
        return User(**user_dict)

def authenticate_user(username: str, password: str):
    user = get_user(username)
    if not user:
        return False
    if not pwd_context.verify(password, fake_users_db[username]["hashed_password"]):
        return False
    return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    user = get_user(username)
    if user is None:
        raise credentials_exception
    return user

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/log-screen-time")
async def log_screen_time(log: ScreenTimeLog, current_user: User = Depends(get_current_user)):
    # Here you would typically save this to a database
    print(f"Logged {log.minutes} minutes for {current_user.username} on {log.date}")
    return {"status": "success"}

@app.get("/ai-recommendations", response_model=List[AIRecommendation])
async def get_ai_recommendations(current_user: User = Depends(get_current_user)):
    # This is a simple rule-based system. In a real application, you'd use a more sophisticated AI model.
    recommendations = [
        AIRecommendation(recommendation="Take a 15-minute break and do some stretching exercises."),
        AIRecommendation(recommendation="Read a book for 30 minutes before bedtime to improve sleep quality."),
        AIRecommendation(recommendation="Engage in a family board game night to boost social skills.")
    ]
    return recommendations

@app.get("/user-info")
async def get_user_info(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username, "is_parent": current_user.is_parent}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)