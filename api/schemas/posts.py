from pydantic import BaseModel
from datetime import date
from uuid import UUID

from api.schemas import users as schemas_users, categories as schemas_categories, comments as schemas_comments

class PostBase(BaseModel):
    class Config:
        orm_mode = True
    title: str
    text: str
    image_url: str
    big_image_url: str
    
class PostShow(PostBase):
    id: UUID
    date: date
    author: schemas_users.UserPostDisplay
    category: schemas_categories.CategoryBase
    comments: schemas_comments.CommentUnderPost

class PostsShow(PostBase):
    id: UUID
    date: date
    author: schemas_users.UserPostDisplay
    category: schemas_categories.CategoryBase

class UserPosts(PostBase):
    id: UUID
    date: date
    category: schemas_categories.CategoryBase

class PostCreate(PostBase):
    category_id: UUID
    
class Post(PostBase):
    id: UUID
    user_id: UUID
    disabled: bool = False
    date_of_creation: date
    date_of_last_edit: date


