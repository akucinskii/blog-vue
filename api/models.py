import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from api import database


class BaseDatabaseModel(database.Base):
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date_of_creation = Column(DateTime(timezone=True), default=datetime.utcnow)
    date_of_last_edit = Column(
        DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow
    )
    disabled = Column(Boolean, default=False, nullable=False)


class Post(BaseDatabaseModel):
    __tablename__ = "posts"

    title = Column(String, nullable=False)
    text = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"), nullable=False)

    author = relationship("User", back_populates="posts")
    category = relationship("Category")
    comments = relationship("Comment")


class User(BaseDatabaseModel):
    __tablename__ = "users"

    username = Column(String, unique=True, nullable=False)
    name = Column(String)
    surname = Column(String)
    password = Column(String, nullable=False)
    description = Column(String, nullable=False)
    avatar_url = Column(String, nullable=False)
    is_admin = Column(Boolean, nullable=False)

    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")


class Category(BaseDatabaseModel):
    __tablename__ = "categories"

    name = Column(String, nullable=False)


class Comment(BaseDatabaseModel):
    __tablename__ = "comments"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.id"), nullable=False)
    text = Column(String, nullable=False)

    author = relationship("User", back_populates="comments")
