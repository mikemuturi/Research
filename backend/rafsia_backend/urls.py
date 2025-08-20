from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import UserViewSet

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/surveys/', include('surveys.urls')),
    path('api/interviews/', include('interviews.urls')),
    path('api/admin/users/', UserViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/admin/users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'})),
]