from uuid import UUID

from sqlalchemy.orm import Session

from api import models
from api.schemas import comments as schemas_comments


def get_comments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Comment).offset(skip).limit(limit).all()


def get_comment_by_id(db: Session, comment_id: UUID):
    return db.query(models.Comment).filter(models.Comment.id == comment_id)


def create_comment(
    db: Session,
    comment: schemas_comments.CommentCreate,
    user: models.User,
    post_id: UUID,
):
    db_comment = models.Comment(**comment.dict(), user_id=user.id, post_id=post_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    return db_comment


async def remove_comment(db: Session, comment_id: UUID):
    db_comment = get_comment_by_id(db=db, comment_id=comment_id)
    await db.delete(db_comment)
    db.commit()
