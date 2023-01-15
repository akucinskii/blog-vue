from uuid import UUID
from datetime import date
from typing import Optional
from pydantic import BaseModel


# from api.schemas.sch_posts import PostBase


class UserBase(BaseModel):
    username: str
    name: Optional[str] = None
    surname: Optional[str] = None
    avatar_url: Optional[str] = None
    description: Optional[str] = None


class UserInDB(UserBase):
    id: UUID
    password: str
    is_admin: bool
    disabled: bool = False


class UserCreate(UserBase):
    password: str
    description: str
    disabled: bool = False
    is_admin: bool = False


class UserEdit(UserBase):
    class Config:
        orm_mode = True

    username: Optional[str]
    description: Optional[str]
    disabled: bool = False


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
