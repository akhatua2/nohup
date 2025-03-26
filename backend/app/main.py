from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
from urllib.parse import unquote

from . import models, database, schemas

# Initialize database
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/comments/", response_model=schemas.Comment)
def create_comment(comment: schemas.CommentCreate, db: Session = Depends(database.get_db)):
    return database.create_comment(db=db, comment=comment)

@app.get("/comments/", response_model=List[schemas.Comment])
def get_comments(url: str | None = None, db: Session = Depends(database.get_db)):
    if url:
        decoded_url = unquote(url)
        comments = database.get_comments_by_url(db, url=decoded_url)
    else:
        comments = database.get_all_comments(db)
    return comments

@app.delete("/comments/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(database.get_db)):
    if database.delete_comment(db, comment_id):
        return {"message": "Comment deleted successfully"}
    raise HTTPException(status_code=404, detail="Comment not found") 