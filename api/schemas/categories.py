from uuid import UUID
from datetime import date
from pydantic import BaseModel


class CategoryBase(BaseModel):
    class Config:
        orm_mode = True

    name: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    id: UUID
    disabled: bool = False
    date_of_creation: date
    date_of_last_edit: date


class CategoryDisplay(CategoryBase):
    id: UUID
