from uuid import UUID
from sqlalchemy.orm import Session

from api import models
from api.schemas import comments as schemas_comments
from api.crud import posts as crud_posts


def get_comments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Comment).offset(skip).limit(limit).all()


def get_comment_by_id(db: Session, comment_id: UUID):
    return db.query(models.Comment).filter(models.Comment.id == comment_id).first()


def create_comment(
    db: Session,
    comment: schemas_comments.CommentCreate,
    user: models.User,
    post_id: UUID,
):
    crud_posts.get_post_by_id(db=db, post_id=post_id)
    db_comment = models.Comment(**comment.dict(), user_id=user.id, post_id=post_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


def remove_comment(db: Session, comment_id: UUID):
    db_comment = get_comment_by_id(db=db, comment_id=comment_id)
    db.delete(db_comment)
    db.commit()
