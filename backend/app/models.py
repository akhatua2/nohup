from sqlalchemy import Column, Integer, String, JSON, DateTime
from sqlalchemy.orm import validates
from sqlalchemy.sql import func
from .database import Base

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, index=True)
    component_info = Column(JSON)  # Stores component selector and attributes
    position = Column(JSON)  # Stores x, y coordinates
    text = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    @validates('position')
    def validate_position(self, key, position):
        if not isinstance(position, dict):
            raise ValueError("Position must be a dictionary")
        if 'relativeX' not in position or 'relativeY' not in position:
            raise ValueError("Position must contain relativeX and relativeY")
        if not isinstance(position['relativeX'], (int, float)) or not isinstance(position['relativeY'], (int, float)):
            raise ValueError("Position coordinates must be numbers")
        return position

    @validates('component_info')
    def validate_component_info(self, key, component_info):
        required_fields = {'tagName', 'id', 'classes', 'textContent'}
        if not isinstance(component_info, dict):
            raise ValueError("Component info must be a dictionary")
        if not all(field in component_info for field in required_fields):
            raise ValueError(f"Component info must contain all required fields: {required_fields}")
        if not isinstance(component_info['tagName'], str):
            raise ValueError("tagName must be a string")
        if not isinstance(component_info['id'], str):
            raise ValueError("id must be a string")
        if not isinstance(component_info['classes'], str):
            raise ValueError("classes must be a string")
        if not isinstance(component_info['textContent'], str):
            raise ValueError("textContent must be a string")
        return component_info 