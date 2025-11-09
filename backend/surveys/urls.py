# from django.urls import path, include
# from rest_framework.routers import DefaultRouter
# from .views import ProjectViewSet, InstitutionViewSet, QuestionViewSet, SubmissionViewSet

# router = DefaultRouter()
# router.register(r'projects', ProjectViewSet)
# router.register(r'institutions', InstitutionViewSet)
# router.register(r'questions', QuestionViewSet)
# router.register(r'submissions', SubmissionViewSet)

# urlpatterns = [
#     path('', include(router.urls)),
# ]

# Main project urls.py (e.g., rafsia_project/urls.py)

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from surveys.views import (
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

urlpatterns = [
    # Django admin
    path('admin/', admin.site.urls),

    # API routes - all under /api/
    path('api/', include(router.urls)),

    # DRF auth (login/logout for browsable API)
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    
    # Optional: Add a health check endpoint
    path('api/health/', lambda request: __import__('django.http').JsonResponse({'status': 'ok'})),
]

# Add this for debugging - prints all registered URLs
if __name__ == '__main__':
    from django.core.management import execute_from_command_line
    import sys
    if 'show_urls' in sys.argv:
        for pattern in urlpatterns:
            print(pattern)