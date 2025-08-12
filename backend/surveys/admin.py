from django.contrib import admin
from .models import Project, Institution, Question, Submission, Answer

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'start_date', 'end_date', 'created_at']
    list_filter = ['start_date', 'end_date']
    search_fields = ['name', 'description']

@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = ['name', 'type', 'county', 'created_at']
    list_filter = ['type', 'county']
    search_fields = ['name', 'county']

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['text', 'dimension', 'role', 'order', 'is_active']
    list_filter = ['dimension', 'role', 'is_active']
    search_fields = ['text']
    list_editable = ['order', 'is_active']

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ['name', 'role', 'county', 'overall_score', 'readiness_level', 'submitted_at']
    list_filter = ['role', 'readiness_level', 'county', 'submitted_at']
    search_fields = ['name', 'email', 'county']
    readonly_fields = ['technical_score', 'economic_score', 'socio_cultural_score', 
                      'environmental_score', 'policy_regulatory_score', 'overall_score', 
                      'readiness_level', 'submitted_at']

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['submission', 'question', 'value']
    list_filter = ['value', 'question__dimension']