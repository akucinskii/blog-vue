"""Create posts table

Revision ID: 833c3be527fb
Revises: 
Create Date: 2022-06-06 10:52:45.401947

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '833c3be527fb'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'posts',
        sa.Column('id', sa.dialects.postgresql.UUID, primary_key=True),
        sa.Column('title', sa.String(500)),
        sa.Column('text', sa.String(20000)),
        sa.Column('image_url', sa.String(250)),
    )

def downgrade():
    op.drop_table('posts')
