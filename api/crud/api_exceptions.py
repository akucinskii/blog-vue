from fastapi import HTTPException, status

privlige_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="User is not admin",
    headers={"WWW-Authenticate": "Bearer"},
)

doesnt_exist_exception = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail="Whatever you were looking for doesn't exist or became disabled",
)

password_not_meeting_requirements_exception = HTTPException(
    status_code=status.HTTP_412_PRECONDITION_FAILED,
    detail="Password doesn't meet conditions",
)

username_already_used_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="Username is already in use",
)

remove_dependencies_before_deleting_or_disabling = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="Remove dependencies before deleting or disabling"
)