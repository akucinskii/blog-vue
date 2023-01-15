from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import Page, add_pagination, paginate

from api import database
from api.endpoints.categories import router as categories_router
from api.endpoints.posts import router as posts_router
from api.endpoints.users import router as users_router
from api.endpoints.authentication import router as authentication_router

database.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

api_router = APIRouter()
api_router.include_router(authentication_router, prefix="", tags=["auth"])
api_router.include_router(categories_router, prefix="/categories", tags=["categories"])
api_router.include_router(posts_router, prefix="/posts", tags=["posts"])
api_router.include_router(users_router, prefix="/users", tags=["users"])

origins = ["*"]

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

add_pagination(app)