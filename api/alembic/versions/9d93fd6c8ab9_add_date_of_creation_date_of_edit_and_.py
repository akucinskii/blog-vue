"""Add date of creation, date of edit and is_disabled

Revision ID: 9d93fd6c8ab9
Revises: 1d0a52b0b642
Create Date: 2022-06-29 11:15:28.733230

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9d93fd6c8ab9"
down_revision = "1d0a52b0b642"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.drop_column("posts", "date")
    op.add_column("posts", sa.Column("date_of_creation", sa.DateTime))
    op.add_column("posts", sa.Column("date_of_last_edit", sa.DateTime))
    op.add_column("posts", sa.Column("disabled", sa.Boolean))
    op.add_column("users", sa.Column("date_of_creation", sa.DateTime))
    op.add_column("users", sa.Column("date_of_last_edit", sa.DateTime))
    op.add_column("comments", sa.Column("date_of_creation", sa.DateTime))
    op.add_column("comments", sa.Column("date_of_last_edit", sa.DateTime))
    op.add_column("comments", sa.Column("disabled", sa.Boolean))
    op.add_column("categories", sa.Column("date_of_creation", sa.DateTime))
    op.add_column("categories", sa.Column("date_of_last_edit", sa.DateTime))
    op.add_column("categories", sa.Column("disabled", sa.Boolean))


def downgrade() -> None:
    op.add_column("posts", sa.Column("date", sa.DateTime))
    op.drop_column("posts", "date_of_creation")
    op.drop_column("posts", "date_of_last_edit")
    op.drop_column("posts", "disabled")
    op.drop_column("users", "date_of_creation")
    op.drop_column("users", "date_of_last_edit")
    op.drop_column("comments", "date_of_creation")
    op.drop_column("comments", "date_of_last_edit")
    op.drop_column("comments", "disabled")
    op.drop_column("categories", "date_of_creation")
    op.drop_column("categories", "date_of_last_edit")
    op.drop_column("categories", "disabled")
