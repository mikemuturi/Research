from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, CustomTokenObtainPairView

# Create router for admin endpoints
admin_router = DefaultRouter()
admin_router.register(r'users', UserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/surveys/', include('surveys.urls')),
    path('api/interviews/', include('interviews.urls')),
    path('api/admin/', include(admin_router.urls)),
]