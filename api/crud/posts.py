from datetime import datetime
from uuid import UUID

from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from api import models
from api.crud import auth as crud_auth
from api.schemas import posts as schemas_posts

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_posts_by_category(db: Session, category: UUID):
    return db.query(models.Post).filter(models.Post.category_id == category).all()


def get_posts(db: Session):
    return db.query(models.Post).all()


def get_post_by_id(db: Session, post_id: UUID):
    return db.query(models.Post).filter(models.Post.id == post_id).first()


def create_post(db: Session, post: schemas_posts.PostCreate, user: models.User):
    if user.is_admin:
        get_date = datetime.today().strftime("%Y-%m-%d")
        db_post = models.Post(
            **post.dict(),
            user_id=user.id,
            date_of_creation=get_date,
            date_of_last_edit=get_date
        )
        db.add(db_post)
        db.commit()
        db.refresh(db_post)
        return db_post
    else:
        raise crud_auth.privlige_exception


async def remove_post(db: Session, user: models.User, post_id: UUID):
    if user.is_admin:
        db_post = get_post_by_id(db=db, post_id=post_id)
        db.delete(db_post)
        db.commit()
    else:
        raise crud_auth.privlige_exception
