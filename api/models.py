import uuid

from sqlalchemy import Boolean, Column, DateTime, ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from api import database


class BaseDatabaseModel(database.Base):
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    date_of_creation = Column(DateTime(timezone=True), server_default=func.now())
    date_of_last_edit = Column(DateTime(timezone=True), onupdate=func.now())
    disabled = Column(Boolean, default=False)


class Post(BaseDatabaseModel):
    __tablename__ = "posts"

    title = Column(String)
    text = Column(String)
    image_url = Column(String)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    big_image_url = Column(String)
    category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))

    author = relationship("User", back_populates="posts")
    category = relationship("Category")
    comments = relationship("Comment")


class User(BaseDatabaseModel):
    __tablename__ = "users"

    username = Column(String, unique=True)
    name = Column(String)
    surname = Column(String)
    password = Column(String)
    description = Column(String)
    avatar_url = Column(String)
    is_admin = Column(Boolean)

    posts = relationship("Post", back_populates="author")
    comments = relationship("Comment", back_populates="author")


class Category(BaseDatabaseModel):
    __tablename__ = "categories"

    name = Column(String)


class Comment(BaseDatabaseModel):
    __tablename__ = "comments"

    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    post_id = Column(UUID(as_uuid=True), ForeignKey("posts.id"), nullable=False)
    text = Column(String, nullable=False)

    author = relationship("User", back_populates="comments")
