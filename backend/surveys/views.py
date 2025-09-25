# from rest_framework import viewsets, status, permissions
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from django.http import HttpResponse
# from django.db.models import Q, Count, Avg
# import csv
# import json
# from datetime import datetime
# from reportlab.pdfgen import canvas
# from reportlab.lib.pagesizes import letter
# from io import BytesIO

# from .models import Project, Institution, Question, Submission, DimensionComment
# from .serializers import (
#     ProjectSerializer, InstitutionSerializer, QuestionSerializer,
#     SubmissionCreateSerializer, SubmissionDetailSerializer, SubmissionListSerializer
# )

# class ProjectViewSet(viewsets.ModelViewSet):
#     queryset = Project.objects.all()
#     serializer_class = ProjectSerializer
#     permission_classes = [permissions.AllowAny]

# class InstitutionViewSet(viewsets.ModelViewSet):
#     queryset = Institution.objects.all()
#     serializer_class = InstitutionSerializer
#     # permission_classes = [permissions.IsAuthenticated]
#     permission_classes = [ permissions.AllowAny]

# class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
#     queryset = Question.objects.filter(is_active=True)
#     serializer_class = QuestionSerializer
#     permission_classes = [permissions.AllowAny]
    
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         role = self.request.query_params.get('role')
#         dimension = self.request.query_params.get('dimension')
        
#         if role:
#             queryset = queryset.filter(Q(role=role) | Q(role='both'))
        
#         if dimension:
#             queryset = queryset.filter(dimension=dimension)
        
#         return queryset

# class SubmissionViewSet(viewsets.ModelViewSet):
#     queryset = Submission.objects.all()
    
#     def get_serializer_class(self):
#         if self.action == 'create':
#             return SubmissionCreateSerializer
#         elif self.action == 'list':
#             return SubmissionListSerializer
#         return SubmissionDetailSerializer
    
#     def get_permissions(self):
#         if self.action == 'create':
#             permission_classes = [permissions.AllowAny]
#         elif self.action in ['retrieve'] and self.request.query_params.get('public') == 'true':
#             permission_classes = [permissions.AllowAny]
#         else:
#             permission_classes = [permissions.IsAuthenticated]
#             # permission_classes = [permission_classes.AllowAny]
        
#         return [permission() for permission in permission_classes]
    
#     def get_queryset(self):
#         queryset = super().get_queryset()
        
#         # Filters for admin dashboard
#         role = self.request.query_params.get('role')
#         county = self.request.query_params.get('county')
#         institution = self.request.query_params.get('institution')
#         project = self.request.query_params.get('project')
#         date_from = self.request.query_params.get('date_from')
#         date_to = self.request.query_params.get('date_to')
        
#         if role:
#             queryset = queryset.filter(role=role)
        
#         if county:
#             queryset = queryset.filter(county__icontains=county)
        
#         if institution:
#             queryset = queryset.filter(
#                 Q(institution__name__icontains=institution) | 
#                 Q(institution_name__icontains=institution)
#             )
        
#         if project:
#             queryset = queryset.filter(project_id=project)
        
#         if date_from:
#             queryset = queryset.filter(submitted_at__gte=date_from)
        
#         if date_to:
#             queryset = queryset.filter(submitted_at__lte=date_to)
        
#         return queryset.order_by('-submitted_at')
    
#     @action(detail=False, methods=['get'])
#     def export_csv(self, request):
#         submissions = self.get_queryset()
        
#         response = HttpResponse(content_type='text/csv')
#         response['Content-Disposition'] = 'attachment; filename="rafsia_submissions.csv"'
        
#         writer = csv.writer(response)
        
#         # Header - now includes dimension comments
#         writer.writerow([
#             'ID', 'Name', 'Email', 'Role', 'Institution', 'County', 
#             'Submitted At', 'Technical Score', 'Economic Score', 
#             'Socio-Cultural Score', 'Environmental Score', 
#             'Policy & Regulatory Score', 'Overall Score', 'Readiness Level',
#             'Technical Comment', 'Economic Comment', 'Socio-Cultural Comment',
#             'Environmental Comment', 'Policy & Regulatory Comment'
#         ])
        
#         # Data
#         for submission in submissions:
#             # Get comments for each dimension
#             comments = {comment.dimension: comment.comment for comment in submission.dimension_comments.all()}
            
#             writer.writerow([
#                 submission.id,
#                 submission.name if not submission.is_anonymous else 'Anonymous',
#                 submission.email if not submission.is_anonymous else '',
#                 submission.role,
#                 submission.institution.name if submission.institution else submission.institution_name,
#                 submission.county,
#                 submission.submitted_at.strftime('%Y-%m-%d %H:%M:%S'),
#                 round(submission.technical_score, 2),
#                 round(submission.economic_score, 2),
#                 round(submission.socio_cultural_score, 2),
#                 round(submission.environmental_score, 2),
#                 round(submission.policy_regulatory_score, 2),
#                 round(submission.overall_score, 2),
#                 submission.readiness_level,
#                 comments.get('technical', ''),
#                 comments.get('economic', ''),
#                 comments.get('socio_cultural', ''),
#                 comments.get('environmental', ''),
#                 comments.get('policy_regulatory', ''),
#             ])
        
#         return response
    
#     @action(detail=True, methods=['get'])
#     def export_pdf(self, request, pk=None):
#         submission = self.get_object()
        
#         buffer = BytesIO()
#         p = canvas.Canvas(buffer, pagesize=letter)
        
#         # Title
#         p.setFont("Helvetica-Bold", 16)
#         p.drawString(100, 750, "RAFSIA Readiness Assessment Report")
        
#         # Respondent info
#         p.setFont("Helvetica-Bold", 12)
#         p.drawString(100, 720, "Respondent Information")
#         p.setFont("Helvetica", 10)
        
#         y_pos = 700
#         info_lines = [
#             f"Name: {submission.name if not submission.is_anonymous else 'Anonymous'}",
#             f"Role: {submission.get_role_display()}",
#             f"Institution: {submission.institution.name if submission.institution else submission.institution_name}",
#             f"County: {submission.county}",
#             f"Submitted: {submission.submitted_at.strftime('%Y-%m-%d %H:%M:%S')}",
#         ]
        
#         for line in info_lines:
#             p.drawString(100, y_pos, line)
#             y_pos -= 20
        
#         # Scores
#         p.setFont("Helvetica-Bold", 12)
#         p.drawString(100, y_pos - 20, "Readiness Scores")
#         p.setFont("Helvetica", 10)
        
#         y_pos -= 50
#         scores = [
#             f"Technical Readiness: {submission.technical_score:.1f}%",
#             f"Economic Readiness: {submission.economic_score:.1f}%",
#             f"Socio-Cultural Readiness: {submission.socio_cultural_score:.1f}%",
#             f"Environmental Readiness: {submission.environmental_score:.1f}%",
#             f"Policy & Regulatory Readiness: {submission.policy_regulatory_score:.1f}%",
#             f"Overall Readiness: {submission.overall_score:.1f}%",
#             f"Readiness Level: {submission.get_readiness_level_display()}",
#         ]
        
#         for score in scores:
#             p.drawString(100, y_pos, score)
#             y_pos -= 20
        
#         # Dimension Comments
#         dimension_comments = submission.dimension_comments.all()
#         if dimension_comments.exists():
#             p.setFont("Helvetica-Bold", 12)
#             p.drawString(100, y_pos - 20, "Additional Comments")
#             p.setFont("Helvetica", 10)
            
#             y_pos -= 50
#             for comment in dimension_comments:
#                 # Dimension header
#                 p.setFont("Helvetica-Bold", 10)
#                 p.drawString(100, y_pos, f"{comment.get_dimension_display()}:")
#                 y_pos -= 15
                
#                 # Comment text (wrap long comments)
#                 p.setFont("Helvetica", 9)
#                 comment_lines = self._wrap_text(comment.comment, 80)
#                 for line in comment_lines:
#                     p.drawString(120, y_pos, line)
#                     y_pos -= 12
                    
#                     if y_pos < 100:  # Start new page if needed
#                         p.showPage()
#                         y_pos = 750
                
#                 y_pos -= 10  # Extra spacing between dimensions
        
#         # Recommendations
#         recommendations = submission.get_recommendations()
#         if recommendations:
#             if y_pos < 200:  # Start new page if not enough space
#                 p.showPage()
#                 y_pos = 750
            
#             p.setFont("Helvetica-Bold", 12)
#             p.drawString(100, y_pos - 20, "Recommendations")
#             p.setFont("Helvetica", 10)
            
#             y_pos -= 50
#             for i, rec in enumerate(recommendations[:10]):  # Limit to 10 recommendations
#                 p.drawString(100, y_pos, f"{i+1}. {rec}")
#                 y_pos -= 15
                
#                 if y_pos < 100:  # Start new page if needed
#                     p.showPage()
#                     y_pos = 750
        
#         p.showPage()
#         p.save()
        
#         buffer.seek(0)
#         response = HttpResponse(buffer, content_type='application/pdf')
#         response['Content-Disposition'] = f'attachment; filename="rafsia_report_{submission.id}.pdf"'
        
#         return response
    
#     def _wrap_text(self, text, width):
#         """Helper method to wrap text for PDF generation"""
#         words = text.split()
#         lines = []
#         current_line = []
#         current_length = 0
        
#         for word in words:
#             if current_length + len(word) + 1 <= width:
#                 current_line.append(word)
#                 current_length += len(word) + 1
#             else:
#                 if current_line:
#                     lines.append(' '.join(current_line))
#                 current_line = [word]
#                 current_length = len(word)
        
#         if current_line:
#             lines.append(' '.join(current_line))
        
#         return lines
    
#     @action(detail=False, methods=['get'])
#     def statistics(self, request):
#         queryset = self.get_queryset()
        
#         stats = {
#             'total_submissions': queryset.count(),
#             'by_role': dict(queryset.values('role').annotate(count=Count('id')).values_list('role', 'count')),
#             'by_county': dict(queryset.values('county').annotate(count=Count('id')).values_list('county', 'count')),
#             'by_readiness_level': dict(queryset.values('readiness_level').annotate(count=Count('id')).values_list('readiness_level', 'count')),
#             'average_scores': {
#                 'technical': queryset.aggregate(avg=Avg('technical_score'))['avg'] or 0,
#                 'economic': queryset.aggregate(avg=Avg('economic_score'))['avg'] or 0,
#                 'socio_cultural': queryset.aggregate(avg=Avg('socio_cultural_score'))['avg'] or 0,
#                 'environmental': queryset.aggregate(avg=Avg('environmental_score'))['avg'] or 0,
#                 'policy_regulatory': queryset.aggregate(avg=Avg('policy_regulatory_score'))['avg'] or 0,
#                 'overall': queryset.aggregate(avg=Avg('overall_score'))['avg'] or 0,
#             },
#             'comments_stats': {
#                 'total_comments': DimensionComment.objects.filter(submission__in=queryset).count(),
#                 'comments_by_dimension': dict(
#                     DimensionComment.objects.filter(submission__in=queryset)
#                     .values('dimension')
#                     .annotate(count=Count('id'))
#                     .values_list('dimension', 'count')
#                 )
#             }
#         }
        
#         return Response(stats)



from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.db.models import Q, Count, Avg
import csv
import json
from datetime import datetime
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO

from .models import Project, Institution, Question, Submission, DimensionComment
from .serializers import (
    ProjectSerializer, InstitutionSerializer, QuestionSerializer,
    SubmissionCreateSerializer, SubmissionDetailSerializer, SubmissionListSerializer
)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

class InstitutionViewSet(viewsets.ModelViewSet):
    queryset = Institution.objects.all()
    serializer_class = InstitutionSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [permissions.AllowAny]

class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Question.objects.filter(is_active=True)
    serializer_class = QuestionSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        role = self.request.query_params.get('role')
        survey_type = self.request.query_params.get('survey_type', 'rafsia')
        dimension = self.request.query_params.get('dimension')
        
        # Filter by survey type
        queryset = queryset.filter(survey_type=survey_type)
        
        # Filter by role
        if role:
            queryset = queryset.filter(Q(role=role) | Q(role='both'))
        
        # Filter by dimension
        if dimension:
            queryset = queryset.filter(dimension=dimension)
        
        return queryset

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return SubmissionCreateSerializer
        elif self.action == 'list':
            return SubmissionListSerializer
        return SubmissionDetailSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        elif self.action in ['retrieve'] and self.request.query_params.get('public') == 'true':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
            # permission_classes = [permission_classes.AllowAny]
        
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filters for admin dashboard
        role = self.request.query_params.get('role')
        county = self.request.query_params.get('county')
        institution = self.request.query_params.get('institution')
        project = self.request.query_params.get('project')
        survey_type = self.request.query_params.get('survey_type')
        date_from = self.request.query_params.get('date_from')
        date_to = self.request.query_params.get('date_to')
        
        if role:
            queryset = queryset.filter(role=role)
        
        if county:
            queryset = queryset.filter(county__icontains=county)
        
        if institution:
            queryset = queryset.filter(
                Q(institution__name__icontains=institution) | 
                Q(institution_name__icontains=institution)
            )
        
        if project:
            queryset = queryset.filter(project_id=project)
        
        if survey_type:
            queryset = queryset.filter(survey_type=survey_type)
        
        if date_from:
            queryset = queryset.filter(submitted_at__gte=date_from)
        
        if date_to:
            queryset = queryset.filter(submitted_at__lte=date_to)
        
        return queryset.order_by('-submitted_at')
    
    @action(detail=False, methods=['get'])
    def export_csv(self, request):
        submissions = self.get_queryset()
        
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="survey_submissions.csv"'
        
        writer = csv.writer(response)
        
        # Determine if we have mixed survey types
        survey_types = submissions.values_list('survey_type', flat=True).distinct()
        has_mixed_surveys = len(survey_types) > 1
        
        # Base header
        base_header = [
            'ID', 'Name', 'Email', 'Role', 'Gender', 'Institution', 'County', 
            'Survey Type', 'Project', 'Submitted At', 'Technical Score', 'Economic Score', 
            'Socio-Cultural Score', 'Environmental Score', 
            'Policy & Regulatory Score', 'Overall Score', 'Readiness Level'
        ]
        
        # Add strategic score for ISP surveys or mixed surveys
        if 'isp' in survey_types or has_mixed_surveys:
            base_header.insert(-3, 'Strategic Score')
        
        # Add comment columns
        comment_dimensions = ['technical', 'economic', 'socio_cultural', 'environmental', 'policy_regulatory']
        if 'isp' in survey_types or has_mixed_surveys:
            comment_dimensions.append('strategic')
        
        comment_headers = [f'{dim.replace("_", " ").title()} Comment' for dim in comment_dimensions]
        header = base_header + comment_headers
        
        writer.writerow(header)
        
        # Data
        for submission in submissions:
            # Get comments for each dimension
            comments = {comment.dimension: comment.comment for comment in submission.dimension_comments.all()}
            
            row = [
                submission.id,
                submission.name if not submission.is_anonymous else 'Anonymous',
                submission.email if not submission.is_anonymous else '',
                submission.role,
                submission.gender,
                submission.institution.name if submission.institution else submission.institution_name,
                submission.county,
                submission.get_survey_type_display(),
                submission.project.name if submission.project else '',
                submission.submitted_at.strftime('%Y-%m-%d %H:%M:%S'),
                round(submission.technical_score, 2),
                round(submission.economic_score, 2),
                round(submission.socio_cultural_score, 2),
                round(submission.environmental_score, 2),
                round(submission.policy_regulatory_score, 2),
            ]
            
            # Add strategic score if needed
            if 'isp' in survey_types or has_mixed_surveys:
                row.append(round(submission.strategic_score, 2) if submission.survey_type == 'isp' else '')
            
            # Add overall score and readiness level
            row.extend([
                round(submission.overall_score, 2),
                submission.readiness_level,
            ])
            
            # Add comments
            for dim in comment_dimensions:
                row.append(comments.get(dim, ''))
            
            writer.writerow(row)
        
        return response
    
    @action(detail=True, methods=['get'])
    def export_pdf(self, request, pk=None):
        submission = self.get_object()
        
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        
        # Title - Dynamic based on survey type
        p.setFont("Helvetica-Bold", 16)
        title = "ISP Service Provider Assessment Report" if submission.survey_type == 'isp' else "RAFSIA Readiness Assessment Report"
        p.drawString(100, 750, title)
        
        # Respondent info
        p.setFont("Helvetica-Bold", 12)
        p.drawString(100, 720, "Respondent Information")
        p.setFont("Helvetica", 10)
        
        y_pos = 700
        info_lines = [
            f"Name: {submission.name if not submission.is_anonymous else 'Anonymous'}",
            f"Role: {submission.get_role_display()}",
            f"Survey Type: {submission.get_survey_type_display()}",
        ]
        
        # Add gender for ISP surveys
        if submission.survey_type == 'isp' and submission.gender:
            info_lines.append(f"Gender: {submission.get_gender_display()}")
        
        info_lines.extend([
            f"Institution: {submission.institution.name if submission.institution else submission.institution_name}",
            f"County: {submission.county}",
            f"Project: {submission.project.name if submission.project else 'N/A'}",
            f"Submitted: {submission.submitted_at.strftime('%Y-%m-%d %H:%M:%S')}",
        ])
        
        for line in info_lines:
            p.drawString(100, y_pos, line)
            y_pos -= 20
        
        # Scores - Dynamic based on survey type
        p.setFont("Helvetica-Bold", 12)
        p.drawString(100, y_pos - 20, "Readiness Scores")
        p.setFont("Helvetica", 10)
        
        y_pos -= 50
        scores = [
            f"Technical Readiness: {submission.technical_score:.1f}%",
            f"Economic Readiness: {submission.economic_score:.1f}%",
        ]
        
        if submission.survey_type == 'isp':
            scores.extend([
                f"Policy & Regulatory Readiness: {submission.policy_regulatory_score:.1f}%",
                f"Socio-Cultural Readiness: {submission.socio_cultural_score:.1f}%",
                f"Environmental Readiness: {submission.environmental_score:.1f}%",
                f"Strategic Readiness: {submission.strategic_score:.1f}%",
            ])
        else:
            scores.extend([
                f"Socio-Cultural Readiness: {submission.socio_cultural_score:.1f}%",
                f"Environmental Readiness: {submission.environmental_score:.1f}%",
                f"Policy & Regulatory Readiness: {submission.policy_regulatory_score:.1f}%",
            ])
        
        scores.extend([
            f"Overall Readiness: {submission.overall_score:.1f}%",
            f"Readiness Level: {submission.get_readiness_level_display()}",
        ])
        
        for score in scores:
            p.drawString(100, y_pos, score)
            y_pos -= 20
        
        # Dimension Comments
        dimension_comments = submission.dimension_comments.all()
        if dimension_comments.exists():
            p.setFont("Helvetica-Bold", 12)
            p.drawString(100, y_pos - 20, "Additional Comments")
            p.setFont("Helvetica", 10)
            
            y_pos -= 50
            for comment in dimension_comments:
                # Dimension header
                p.setFont("Helvetica-Bold", 10)
                p.drawString(100, y_pos, f"{comment.get_dimension_display()}:")
                y_pos -= 15
                
                # Comment text (wrap long comments)
                p.setFont("Helvetica", 9)
                comment_lines = self._wrap_text(comment.comment, 80)
                for line in comment_lines:
                    p.drawString(120, y_pos, line)
                    y_pos -= 12
                    
                    if y_pos < 100:  # Start new page if needed
                        p.showPage()
                        y_pos = 750
                
                y_pos -= 10  # Extra spacing between dimensions
        
        # Recommendations
        recommendations = submission.get_recommendations()
        if recommendations:
            if y_pos < 200:  # Start new page if not enough space
                p.showPage()
                y_pos = 750
            
            p.setFont("Helvetica-Bold", 12)
            p.drawString(100, y_pos - 20, "Recommendations")
            p.setFont("Helvetica", 10)
            
            y_pos -= 50
            for i, rec in enumerate(recommendations[:10]):  # Limit to 10 recommendations
                p.drawString(100, y_pos, f"{i+1}. {rec}")
                y_pos -= 15
                
                if y_pos < 100:  # Start new page if needed
                    p.showPage()
                    y_pos = 750
        
        p.showPage()
        p.save()
        
        buffer.seek(0)
        response = HttpResponse(buffer, content_type='application/pdf')
        filename = f"{'isp' if submission.survey_type == 'isp' else 'rafsia'}_report_{submission.id}.pdf"
        response['Content-Disposition'] = f'attachment; filename="{filename}"'
        
        return response
    
    def _wrap_text(self, text, width):
        """Helper method to wrap text for PDF generation"""
        words = text.split()
        lines = []
        current_line = []
        current_length = 0
        
        for word in words:
            if current_length + len(word) + 1 <= width:
                current_line.append(word)
                current_length += len(word) + 1
            else:
                if current_line:
                    lines.append(' '.join(current_line))
                current_line = [word]
                current_length = len(word)
        
        if current_line:
            lines.append(' '.join(current_line))
        
        return lines
    
    @action(detail=False, methods=['get'])
    def statistics(self, request):
        queryset = self.get_queryset()
        
        # Get survey types in the queryset
        survey_types = list(queryset.values_list('survey_type', flat=True).distinct())
        
        stats = {
            'total_submissions': queryset.count(),
            'survey_types': survey_types,
            'by_survey_type': dict(queryset.values('survey_type').annotate(count=Count('id')).values_list('survey_type', 'count')),
            'by_role': dict(queryset.values('role').annotate(count=Count('id')).values_list('role', 'count')),
            'by_county': dict(queryset.values('county').annotate(count=Count('id')).values_list('county', 'count')),
            'by_readiness_level': dict(queryset.values('readiness_level').annotate(count=Count('id')).values_list('readiness_level', 'count')),
            'average_scores': {
                'technical': queryset.aggregate(avg=Avg('technical_score'))['avg'] or 0,
                'economic': queryset.aggregate(avg=Avg('economic_score'))['avg'] or 0,
                'socio_cultural': queryset.aggregate(avg=Avg('socio_cultural_score'))['avg'] or 0,
                'environmental': queryset.aggregate(avg=Avg('environmental_score'))['avg'] or 0,
                'policy_regulatory': queryset.aggregate(avg=Avg('policy_regulatory_score'))['avg'] or 0,
                'overall': queryset.aggregate(avg=Avg('overall_score'))['avg'] or 0,
            },
            'comments_stats': {
                'total_comments': DimensionComment.objects.filter(submission__in=queryset).count(),
                'comments_by_dimension': dict(
                    DimensionComment.objects.filter(submission__in=queryset)
                    .values('dimension')
                    .annotate(count=Count('id'))
                    .values_list('dimension', 'count')
                )
            }
        }
        
        # Add strategic score average for ISP surveys
        if 'isp' in survey_types:
            stats['average_scores']['strategic'] = queryset.filter(survey_type='isp').aggregate(avg=Avg('strategic_score'))['avg'] or 0
        
        # Break down statistics by survey type if we have mixed surveys
        if len(survey_types) > 1:
            stats['by_survey_breakdown'] = {}
            for survey_type in survey_types:
                survey_queryset = queryset.filter(survey_type=survey_type)
                
                breakdown = {
                    'total_submissions': survey_queryset.count(),
                    'by_role': dict(survey_queryset.values('role').annotate(count=Count('id')).values_list('role', 'count')),
                    'by_county': dict(survey_queryset.values('county').annotate(count=Count('id')).values_list('county', 'count')),
                    'by_readiness_level': dict(survey_queryset.values('readiness_level').annotate(count=Count('id')).values_list('readiness_level', 'count')),
                    'average_scores': {
                        'technical': survey_queryset.aggregate(avg=Avg('technical_score'))['avg'] or 0,
                        'economic': survey_queryset.aggregate(avg=Avg('economic_score'))['avg'] or 0,
                        'socio_cultural': survey_queryset.aggregate(avg=Avg('socio_cultural_score'))['avg'] or 0,
                        'environmental': survey_queryset.aggregate(avg=Avg('environmental_score'))['avg'] or 0,
                        'policy_regulatory': survey_queryset.aggregate(avg=Avg('policy_regulatory_score'))['avg'] or 0,
                        'overall': survey_queryset.aggregate(avg=Avg('overall_score'))['avg'] or 0,
                    }
                }
                
                # Add strategic score for ISP surveys
                if survey_type == 'isp':
                    breakdown['average_scores']['strategic'] = survey_queryset.aggregate(avg=Avg('strategic_score'))['avg'] or 0
                
                stats['by_survey_breakdown'][survey_type] = breakdown
        
        return Response(stats)