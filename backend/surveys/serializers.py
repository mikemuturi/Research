from rest_framework import serializers
from .models import Project, Institution, Question, Submission, Answer, DimensionComment

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    question_text = serializers.CharField(source='question.text', read_only=True)
    dimension = serializers.CharField(source='question.dimension', read_only=True)
    
    class Meta:
        model = Answer
        fields = ['question', 'question_text', 'dimension', 'value']

class DimensionCommentSerializer(serializers.ModelSerializer):
    dimension_label = serializers.CharField(source='get_dimension_display', read_only=True)
    
    class Meta:
        model = DimensionComment
        fields = ['dimension', 'dimension_label', 'comment', 'created_at']

class SubmissionCreateSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, write_only=True)
    dimension_comments = serializers.DictField(write_only=True, required=False)
    
    class Meta:
        model = Submission
        fields = [
            'id', 'name', 'email', 'phone', 'role', 'gender', 'institution', 'institution_name', 
            'county', 'project', 'survey_type', 'consent_given', 'is_anonymous', 
            'answers', 'dimension_comments', 'overall_score', 'readiness_level'
        ]
        read_only_fields = ['id', 'overall_score', 'readiness_level']
    
    def create(self, validated_data):
        answers_data = validated_data.pop('answers')
        dimension_comments_data = validated_data.pop('dimension_comments', {})
        
        # Get client IP
        request = self.context.get('request')
        if request:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                validated_data['ip_address'] = x_forwarded_for.split(',')[0]
            else:
                validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
        
        # Set survey_type from project if not provided
        if not validated_data.get('survey_type') and validated_data.get('project'):
            validated_data['survey_type'] = validated_data['project'].survey_type
        
        submission = Submission.objects.create(**validated_data)
        
        # Create answers
        for answer_data in answers_data:
            Answer.objects.create(submission=submission, **answer_data)
        
        # Create dimension comments (only for non-empty comments)
        for dimension_key, comment in dimension_comments_data.items():
            if comment and comment.strip():  # Only save non-empty comments
                DimensionComment.objects.create(
                    submission=submission,
                    dimension=dimension_key,
                    comment=comment.strip()
                )
        
        # Calculate scores
        submission.calculate_scores()
        submission.save()
        
        return submission

class SubmissionDetailSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)
    dimension_comments = DimensionCommentSerializer(many=True, read_only=True)
    institution_name_display = serializers.SerializerMethodField()
    project_name = serializers.CharField(source='project.name', read_only=True)
    survey_type_display = serializers.CharField(source='get_survey_type_display', read_only=True)
    recommendations = serializers.SerializerMethodField()
    scores_by_dimension = serializers.SerializerMethodField()
    overall_percentage = serializers.SerializerMethodField()
    
    class Meta:
        model = Submission
        fields = [
            'id', 'name', 'email', 'phone', 'role', 'gender', 'institution', 'institution_name',
            'institution_name_display', 'county', 'project', 'project_name', 'survey_type', 
            'survey_type_display', 'consent_given', 'is_anonymous', 'submitted_at', 
            'technical_score', 'economic_score', 'socio_cultural_score', 'environmental_score', 
            'policy_regulatory_score', 'strategic_score', 'overall_score', 'overall_percentage',
            'readiness_level', 'answers', 'dimension_comments', 'recommendations',
            'scores_by_dimension'
        ]
    
    def get_institution_name_display(self, obj):
        if obj.institution:
            return obj.institution.name
        return obj.institution_name
    
    def get_recommendations(self, obj):
        return obj.get_recommendations()
    
    def get_scores_by_dimension(self, obj):
        stats = obj.get_dimension_stats()
        data = {}
        for dimension, info in stats.items():
            data[dimension] = {
                'average_percentage': info.get('average_percentage', 0),
                'weighted_score': info.get('weighted_score', 0),
                'question_count': info.get('question_count', 0),
                'weight': info.get('weight'),
        }
        return data

    def get_overall_percentage(self, obj):
        return obj.get_overall_percentage()

class SubmissionListSerializer(serializers.ModelSerializer):
    institution_name_display = serializers.SerializerMethodField()
    project_name = serializers.CharField(source='project.name', read_only=True)
    survey_type_display = serializers.CharField(source='get_survey_type_display', read_only=True)
    
    class Meta:
        model = Submission
        fields = [
            'id', 'name', 'role', 'gender', 'survey_type', 'survey_type_display', 
            'project_name', 'institution_name_display', 'county', 'overall_score', 
            'readiness_level', 'submitted_at'
        ]
    
    def get_institution_name_display(self, obj):
        return obj.institution.name if obj.institution else obj.institution_name

class CommentWithSubmissionSerializer(serializers.ModelSerializer):
    dimension_label = serializers.CharField(source='get_dimension_display', read_only=True)
    submission = SubmissionListSerializer(read_only=True)
    
    class Meta:
        model = DimensionComment
        fields = ['id', 'dimension', 'dimension_label', 'comment', 'created_at', 'submission']