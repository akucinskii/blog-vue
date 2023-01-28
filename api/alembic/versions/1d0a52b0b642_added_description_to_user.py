"""Added description to User

Revision ID: 1d0a52b0b642
Revises: 1ed1771f071d
Create Date: 2022-06-23 09:12:42.698458

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "1d0a52b0b642"
down_revision = "1ed1771f071d"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("users", sa.Column("description", sa.String(500)))


def downgrade() -> None:
    op.drop_column("users", "description")
