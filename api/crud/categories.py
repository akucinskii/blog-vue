from uuid import UUID
from sqlalchemy.orm import Session

from api import models
from api.crud import api_exceptions, users as crud_users
from api.schemas import categories as schemas_categories


def get_categories(db: Session):
    return db.query(models.Category).all()


def get_category_by_id(db: Session, category_id: UUID):
    category = db.query(models.Category).filter(models.Category.id == category_id).first()
    if category is not None:
        return category
    raise api_exceptions.doesnt_exist_exception


def get_category_by_name(db: Session, category_name: str):
    category = db.query(models.Category).filter(models.Category.name == category_name).first()
    if category is not None:
        return category
    raise api_exceptions.doesnt_exist_exception


def create_category(
    db: Session, category: schemas_categories.CategoryCreate, user: models.User
):
    check_category = db.query(models.Category).filter(models.Category.name == category.name).first()

    if user.is_admin:
        if check_category is None:
            db_category = models.Category(name=category.name)
            db.add(db_category)
            db.commit()
            db.refresh(db_category)
            return db_category
        raise api_exceptions.username_already_used_exception
    raise api_exceptions.privlige_exception


def remove_category(db: Session, user: models.User, category_id: UUID):
    if user.is_admin:
        check_dependency = db.query(models.Post).filter(models.Post.category_id == category_id).first()
        if not check_dependency:
            db_category = get_category_by_id(db=db, category_id=category_id)
            db.delete(db_category)
            db.commit()
            return db_category
        raise api_exceptions.remove_dependencies_before_deleting_or_disabling
    raise api_exceptions.privlige_exception
