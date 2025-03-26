from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Using environment variables in production
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@db:5432/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CRUD Operations
def get_all_comments(db: Session):
    from . import models  # Import here to avoid circular imports
    return db.query(models.Comment).all()

def get_comments_by_url(db: Session, url: str):
    from . import models
    return db.query(models.Comment).filter(models.Comment.url == url).all()

def create_comment(db: Session, comment):
    from . import models
    db_comment = models.Comment(**comment.dict())
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment

def delete_comment(db: Session, comment_id: int):
    from . import models
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if comment:
        db.delete(comment)
        db.commit()
        return True
    return False 