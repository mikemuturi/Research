from django.db import models
from django.contrib.auth.models import User

class InterviewNote(models.Model):
    DIMENSION_CHOICES = [
        ('technical', 'Technical Readiness'),
        ('economic', 'Economic Readiness'),
        ('socio_cultural', 'Socio-Cultural Readiness'),
        ('environmental', 'Environmental Readiness'),
        ('policy_regulatory', 'Policy & Regulatory Readiness'),
        ('general', 'General'),
    ]
    
    RESPONDENT_TYPE_CHOICES = [
        ('ihl', 'Institution of Higher Learning'),
        ('isp', 'Internet Service Provider'),
    ]
    
    title = models.CharField(max_length=200)
    respondent_type = models.CharField(max_length=10, choices=RESPONDENT_TYPE_CHOICES)
    institution_name = models.CharField(max_length=200, blank=True)
    respondent_name = models.CharField(max_length=200, blank=True)
    respondent_role = models.CharField(max_length=100, blank=True)
    dimension = models.CharField(max_length=20, choices=DIMENSION_CHOICES)
    question = models.TextField()
    response = models.TextField()
    key_insights = models.TextField(blank=True, help_text="Key insights or themes from this response")
    interview_date = models.DateField()
    interviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-interview_date', '-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.respondent_type} - {self.dimension}"