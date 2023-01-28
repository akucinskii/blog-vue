from uuid import UUID
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext

from api import models
from api.schemas import posts as schemas_posts
from api.crud import api_exceptions, categories as crud_categories

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_posts_by_category(db: Session, category_id: str):
    return db.query(models.Post).filter(models.Post.category_id == category_id).all()


def get_posts(db: Session):
    return db.query(models.Post).all()


def get_post_by_id(db: Session, post_id: UUID):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if post is not None:
        return post
    raise api_exceptions.doesnt_exist_exception


def create_post(db: Session, post: schemas_posts.PostCreate, user: models.User):
    if user.is_admin:
        category = crud_categories.get_category_by_id(
            db=db, category_id=post.category_id
        )
        if category != None:
            db_post = models.Post(
                **post.dict(),
                user_id=user.id,
            )
            db.add(db_post)
            db.commit()
            db.refresh(db_post)
            return db_post
    raise api_exceptions.privlige_exception


def update_post(
    db: Session,
    post_to_change_id: UUID,
    data_to_change: schemas_posts.PostEdit,
    user=models.User,
):
    if user.is_admin:
        db_post = get_post_by_id(db=db, post_id=post_to_change_id)
        post_data = jsonable_encoder(db_post)
        if isinstance(data_to_change, dict):
            update_data = data_to_change
        else:
            update_data = data_to_change.dict(exclude_unset=True)
        for field in post_data:
            if field in update_data:
                setattr(db_post, field, update_data[field])
        crud_categories.get_category_by_id(db=db, category_id=db_post.category_name)
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    raise api_exceptions.privlige_exception


def remove_post(db: Session, user: models.User, post_id: UUID):
    if user.is_admin:
        db_post = get_post_by_id(db=db, post_id=post_id)
        setattr(db_post, "disabled", True)
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    raise api_exceptions.privlige_exception
