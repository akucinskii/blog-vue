from faulthandler import disable
from uuid import UUID
from typing import Optional
from datetime import date
from pydantic import BaseModel


from api.schemas import (
    users as schemas_users,
    categories as schemas_categories,
    comments as schemas_comments,
)


class PostBase(BaseModel):
    class Config:
        orm_mode = True

    title: str
    text: str
    image_url: str


class PostShow(PostBase):
    id: UUID
    disabled: bool
    author: schemas_users.UserPostDisplay
    category: schemas_categories.CategoryBase
    comments: schemas_comments.CommentUnderPost


class PostsShow(PostBase):
    id: UUID
    disabled: bool
    author: schemas_users.UserPostDisplay
    category: schemas_categories.CategoryDisplay


class UserPosts(PostBase):
    id: UUID
    category: schemas_categories.CategoryDisplay


class PostCreate(PostBase):
    category_id: UUID
    disabled: bool = False

class Post(PostBase):
    id: UUID
    user_id: UUID
    
    
    date_of_creation: date
    date_of_last_edit: date


class PostEdit(PostBase):
    disabled: bool = False
    category_id: UUID
