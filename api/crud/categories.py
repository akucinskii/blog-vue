from sqlalchemy.orm import Session
from uuid import UUID

from api import models
from api.schemas import categories as schemas_categories
from api.crud import auth as crud_auth

def get_categories(db: Session):
    return db.query(models.Category).all()

def get_category_by_id(db: Session, category_id: UUID):
    return db.query(models.Category).filter(models.Category.id == category_id)

def create_category(db: Session, category: schemas_categories.CategoryCreate, user: models.User):
    if user.is_admin:
        db_category = models.Category(name = category.name)
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    else:
        raise crud_auth.privlige_exception

def remove_category(db: Session, user: models.User, category_id: UUID):
    if user.is_admin:
        db_category = get_category_by_id(db=db, category_id=category_id)
        db.delete(db_category)
        db.commit()
    else:
        raise crud_auth.privlige_exception