from uuid import UUID
from sqlalchemy.orm import Session

from fastapi.encoders import jsonable_encoder

from api import models
from api.schemas import users as schemas_users
from api.crud import auth as crud_auth, api_exceptions

def check_password(password: str):
    if (
        len(password) >= 8
        and not password.isalnum()
        and not password.islower()
        and not password.isspace()
    ):
        return True
    raise api_exceptions.password_not_meeting_requirements_exception


def get_user_by_username(db: Session, username: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if user is not None:
        return user
    raise api_exceptions.doesnt_exist_exception


def get_user_by_id(db: Session, user_id: UUID):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is not None:
        return user
    raise api_exceptions.doesnt_exist_exception


def get_user_schema_by_username(db: Session, username: str):
    db_user = get_user_by_username(db=db, username=username)
    return schemas_users.UserInDB(**db_user.__dict__)


def get_user_schema_by_id(db: Session, user_id: UUID):
    db_user = get_user_by_id(db=db, user_id=user_id)
    return schemas_users.UserInDB(**db_user.__dict__)


def get_users(db: Session, user: models.User, skip: int = 0, limit: int = 25):
    if user.is_admin:
        return db.query(models.User).offset(skip).limit(limit).all()
    raise api_exceptions.privlige_exception


def create_user(db: Session, user: schemas_users.UserCreate):
    if check_password(user.password):
        hashed_password = crud_auth.get_password_hash(user.password)
    user_check = (
        db.query(models.User).filter(models.User.username == user.username).first()
    )
    if user_check is None:
        db_user = models.User(
            **user.dict(exclude={"password"}), password=hashed_password
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    raise api_exceptions.username_already_used_exception


def update_user(
    db: Session,
    user_to_change_id: UUID,
    data_to_change: schemas_users.UserEdit,
    user=models.User,
):
    db_user = get_user_by_id(db=db, user_id=user_to_change_id)
    user_data = jsonable_encoder(db_user)
    print(user_data)
    if isinstance(data_to_change, dict):
        update_data = data_to_change
    else:
        update_data = data_to_change.dict(exclude_unset=True)
    for field in user_data:
        if field in update_data:
            setattr(db_user, field, update_data[field])
    db.add(db_user)
    db.commit()
    db.refresh(db_user)


def remove_user(db: Session, user: models.User, user_id: UUID):
    if user.is_admin or user_id == user.id:
        db_user = get_user_by_id(db=db, user_id=user_id)
        db.delete(db_user)
        db.commit()
    raise api_exceptions.privlige_exception
