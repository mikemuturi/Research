from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

#JWT login & refresh provided by SimpleJWT
class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]

class RefreshTokenView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]
