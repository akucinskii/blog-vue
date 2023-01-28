from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel

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
    disabled: Optional[bool] = False
    date_of_creation: Optional[date]
    date_of_last_edit: Optional[date]


class CommentUnderPost(CommentBase):
    disabled: Optional[bool] = False
    author: schemas_users.UserPostDisplay
