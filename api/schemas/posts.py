from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

from api.schemas import categories as schemas_categories
from api.schemas import comments as schemas_comments
from api.schemas import users as schemas_users


class PostBase(BaseModel):
    class Config:
        orm_mode = True

    title: str
    text: str
    image_url: str
    big_image_url: str


class PostShow(PostBase):
    id: UUID
    date: Optional[date]
    author: schemas_users.UserPostDisplay
    category: schemas_categories.CategoryBase
    comments: schemas_comments.CommentUnderPost


class PostsShow(PostBase):
    id: UUID
    date: Optional[date]
    author: schemas_users.UserPostDisplay
    category: schemas_categories.CategoryBase


class UserPosts(PostBase):
    id: UUID
    date: Optional[date]
    category: schemas_categories.CategoryBase


class PostCreate(PostBase):
    category_id: UUID


class Post(PostBase):
    id: UUID
    user_id: UUID
    disabled: Optional[bool] = False
    date_of_creation: Optional[date]
    date_of_last_edit: Optional[date]
