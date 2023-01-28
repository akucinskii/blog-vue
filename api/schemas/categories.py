from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class CategoryBase(BaseModel):
    class Config:
        orm_mode = True

    name: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: UUID
    disabled: Optional(bool) = False
    date_of_creation: Optional(date)
    date_of_last_edit: Optional(date)
