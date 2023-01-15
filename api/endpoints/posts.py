from cgitb import text
from uuid import UUID
from typing import Optional
from sqlalchemy.orm import Session

from fastapi import Depends, APIRouter
from fastapi_pagination import Page, paginate

from api import models
from api.schemas import posts as schemas_posts, comments as schemas_comments
from api.crud import posts as crud_posts, comments as crud_comments, auth as crud_auth
from api.database import get_db

router = APIRouter()


@router.get("", response_model=Page[schemas_posts.PostsShow])
def read_posts(category: Optional[str] = None, db: Session = Depends(get_db)):
    if not category:
        return paginate(crud_posts.get_posts(db=db))
    return paginate(crud_posts.get_posts_by_category(db=db, category_id=category))


@router.post("", response_model=schemas_posts.PostCreate)
def create_post(
    post: schemas_posts.PostCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_posts.create_post(post=post, db=db, user=user)


@router.patch("/update")
def update_post(
    post_to_change_id: UUID,
    data_to_change: schemas_posts.PostEdit,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_posts.update_post(
        db=db,
        post_to_change_id=post_to_change_id,
        data_to_change=data_to_change,
        user=user,
    )


@router.get("/{post_id}", response_model=schemas_posts.PostShow)
def read_post(post_id: UUID, db: Session = Depends(get_db)):
    return crud_posts.get_post_by_id(db=db, post_id=post_id)


@router.delete("")
def remove_post(
    post_id: UUID,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_posts.remove_post(db=db, post_id=post_id, user=user)


@router.post("/{post_id}/comments", response_model=schemas_comments.CommentUnderPost)
def create_comment(
    post_id: UUID,
    comment: schemas_comments.CommentCreate,
    db: Session = Depends(get_db),
    user: models.User = Depends(crud_auth.get_current_active_user),
):
    return crud_comments.create_comment(
        db=db, comment=comment, post_id=post_id, user=user
    )


@router.get("/comments", response_model=Page[schemas_comments.CommentUnderPost])
def read_comments(db: Session = Depends(get_db)):
    return paginate(crud_comments.get_comments(db=db))
