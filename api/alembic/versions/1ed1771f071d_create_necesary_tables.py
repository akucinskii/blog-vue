"""Create necesary tables

Revision ID: 1ed1771f071d
Revises: f164c3aad0ac
Create Date: 2022-06-09 08:17:58.343288

"""
import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "1ed1771f071d"
down_revision = "f164c3aad0ac"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.dialects.postgresql.UUID, primary_key=True),
        sa.Column("username", sa.String(50)),
        sa.Column("name", sa.String(50)),
        sa.Column("surname", sa.String(50)),
        sa.Column("password", sa.String(250)),
        sa.Column("avatar_url", sa.String(250)),
        sa.Column("is_admin", sa.Boolean),
        sa.Column("disabled", sa.Boolean),
    )

    op.create_table(
        "categories",
        sa.Column("id", sa.dialects.postgresql.UUID, primary_key=True),
        sa.Column("name", sa.String(250)),
    )

    op.create_table(
        "comments",
        sa.Column("id", sa.dialects.postgresql.UUID, primary_key=True),
        sa.Column("user_id", sa.dialects.postgresql.UUID),
        sa.Column("post_id", sa.dialects.postgresql.UUID),
        sa.Column("text", sa.String(250)),
    )


def downgrade() -> None:
    op.drop_table("users")
    op.drop_table("categories")
    op.drop_table("comments")
