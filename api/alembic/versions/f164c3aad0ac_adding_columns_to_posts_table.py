"""Adding columns to posts table

Revision ID: f164c3aad0ac
Revises: 833c3be527fb
Create Date: 2022-06-06 11:35:44.485454

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "f164c3aad0ac"
down_revision = "833c3be527fb"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("posts", sa.Column("date", sa.DateTime))
    op.add_column("posts", sa.Column("user_id", sa.dialects.postgresql.UUID))
    op.add_column("posts", sa.Column("big_image_url", sa.String(250)))
    op.add_column("posts", sa.Column("category_id", sa.dialects.postgresql.UUID))


def downgrade() -> None:
    op.drop_column("posts", "date")
    op.drop_column("posts", "user_id")
    op.drop_column("posts", "big_image_url")
    op.drop_column("posts", "category_id")
