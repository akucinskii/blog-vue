from datetime import date
from uuid import UUID

from pydantic import BaseModel

# from api.schemas.sch_posts import PostBase


class UserBase(BaseModel):
    username: str
    name: str
    surname: str
    avatar_url: str


class UserInDB(UserBase):
    id: UUID
    password: str
    is_admin: bool
    disabled: bool


class UserCreate(UserBase):
    password: str
    description: str
    disabled: bool = False
    is_admin: bool = False


class User(UserBase):
    class Config:
        orm_mode = True

    id: UUID
    disabled: bool = False
    date_of_creation: date
    date_of_last_edit: date


class UserPostDisplay(UserBase):
    class Config:
        orm_mode = True
        id: UUID

    description: str


class UserDisplay(UserBase):
    class Config:
        orm_mode = True

    id: UUID
    description: str


#    posts: List[PostBase]
