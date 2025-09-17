from django.contrib import admin
from django.urls import path, include
from .views import home 
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("", home, name="home"), 
    path("admin/", admin.site.urls),
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/surveys/", include("surveys.urls")),
    path("api/interviews/", include("interviews.urls")),
    path("api/auth/", include("accounts.urls")),

    # path('api/users/', include('users.urls')),

]
