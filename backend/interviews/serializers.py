from rest_framework import serializers
from .models import InterviewNote

class InterviewNoteSerializer(serializers.ModelSerializer):
    interviewer_name = serializers.CharField(source='interviewer.get_full_name', read_only=True)
    
    class Meta:
        model = InterviewNote
        fields = [
            'id', 'title', 'respondent_type', 'institution_name', 
            'respondent_name', 'respondent_role', 'dimension', 
            'question', 'response', 'key_insights', 'interview_date',
            'interviewer', 'interviewer_name', 'created_at', 'updated_at'
        ]
        read_only_fields = ['interviewer', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['interviewer'] = self.context['request'].user
        return super().create(validated_data)