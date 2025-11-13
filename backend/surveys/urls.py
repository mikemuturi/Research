from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, 
    InstitutionViewSet, 
    QuestionViewSet, 
    SubmissionViewSet
)

# Create router for API viewsets
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'institutions', InstitutionViewSet, basename='institution')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'submissions', SubmissionViewSet, basename='submission')

# This file is included at /api/surveys/ in main urls.py
# So these routes will be available at /api/surveys/projects/, /api/surveys/questions/, etc.
urlpatterns = [
    path('', include(router.urls)),
]