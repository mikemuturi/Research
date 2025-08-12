from django.contrib import admin
from .models import InterviewNote

@admin.register(InterviewNote)
class InterviewNoteAdmin(admin.ModelAdmin):
    list_display = ['title', 'respondent_type', 'institution_name', 'dimension', 'interview_date', 'interviewer']
    list_filter = ['respondent_type', 'dimension', 'interview_date']
    search_fields = ['title', 'institution_name', 'respondent_name', 'question', 'response']
    readonly_fields = ['interviewer', 'created_at', 'updated_at']
    
    def save_model(self, request, obj, form, change):
        if not change:  # Only set interviewer on creation
            obj.interviewer = request.user
        super().save_model(request, obj, form, change)