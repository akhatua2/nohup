from pydantic import BaseModel, Field, constr
from datetime import datetime
from typing import Dict, Optional

class CommentPosition(BaseModel):
    relativeX: float = Field(..., description="Relative X coordinate within the component")
    relativeY: float = Field(..., description="Relative Y coordinate within the component")

class ComponentInfo(BaseModel):
    tagName: constr(min_length=1) = Field(..., description="HTML tag name of the component")
    id: str = Field(..., description="ID of the component, 'no-id' if none")
    classes: str = Field(..., description="Space-separated class names, 'no-classes' if none")
    textContent: str = Field(..., description="First 50 characters of component's text content")

class CommentBase(BaseModel):
    url: str = Field(..., pattern="^https?://.*", description="URL where the comment was created")
    component_info: ComponentInfo
    position: CommentPosition
    text: str = Field(..., min_length=1, description="Comment text content")

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True 