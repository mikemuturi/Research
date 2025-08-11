from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, InstitutionViewSet, QuestionViewSet, SubmissionViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'institutions', InstitutionViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'submissions', SubmissionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]