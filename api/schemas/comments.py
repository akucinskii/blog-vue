from pydantic import BaseModel
from datetime import date
from uuid import UUID

from api.schemas import users as schemas_users

class CommentBase(BaseModel):
    class Config:
        orm_mode = True
    text: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: UUID
    user_id: UUID
    post_id: UUID
    disabled: bool = False
    date_of_creation: date
    date_of_last_edit: date

class CommentUnderPost(CommentBase):
    author: schemas_users.UserPostDisplay
