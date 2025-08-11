from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import InterviewNoteViewSet

router = DefaultRouter()
router.register(r'notes', InterviewNoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]