from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q, Count
from .models import InterviewNote
from .serializers import InterviewNoteSerializer

class InterviewNoteViewSet(viewsets.ModelViewSet):
    queryset = InterviewNote.objects.all()
    serializer_class = InterviewNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filters
        respondent_type = self.request.query_params.get('respondent_type')
        dimension = self.request.query_params.get('dimension')
        institution = self.request.query_params.get('institution')
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        search = self.request.query_params.get('search')
        
        if respondent_type:
            queryset = queryset.filter(respondent_type=respondent_type)
        
        if dimension:
            queryset = queryset.filter(dimension=dimension)
        
        if institution:
            queryset = queryset.filter(institution_name__icontains=institution)
        
        if date_from:
            queryset = queryset.filter(interview_date__gte=date_from)
        
        if date_to:
            queryset = queryset.filter(interview_date__lte=date_to)
        
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(question__icontains=search) |
                Q(response__icontains=search) |
                Q(key_insights__icontains=search)
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def analytics(self, request):
        queryset = self.get_queryset()
        
        analytics = {
            'total_interviews': queryset.count(),
            'by_respondent_type': dict(queryset.values('respondent_type').annotate(count=Count('id')).values_list('respondent_type', 'count')),
            'by_dimension': dict(queryset.values('dimension').annotate(count=Count('id')).values_list('dimension', 'count')),
            'recent_interviews': self.get_serializer(queryset[:5], many=True).data
        }
        
        return Response(analytics)