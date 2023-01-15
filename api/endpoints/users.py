from uuid import UUID
from sqlalchemy.orm import Session

from fastapi import Depends, APIRouter

from api import models
from api.schemas import users as schemas_users
from api.crud import users as crud_users, auth as crud_auth
from api.database import get_db

router = APIRouter()


@router.get("")
def read_users(
    skip: int = 0,
    limit: int = 25,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_users.get_users(db=db, skip=skip, limit=limit, user=user)


@router.get("/{user_id}")
def read_user_by_id(user_id: UUID, db: Session = Depends(get_db)):
    return crud_users.get_user_by_id(db=db, user_id=user_id)


@router.post("")
def create_user(user: schemas_users.UserCreate, db: Session = Depends(get_db)):
    return crud_users.create_user(db=db, user=user)


@router.patch("/update", response_model=schemas_users.UserEdit)
def update_user(
    user_to_change_id: UUID,
    data_to_change: schemas_users.UserEdit,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_users.update_user(
        db=db,
        user_to_change_id=user_to_change_id,
        data_to_change=data_to_change,
        user=user,
    )


@router.delete("")
def remove_user(
    user_id: UUID,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_users.remove_user(db=db, user_id=user_id, user=user)
