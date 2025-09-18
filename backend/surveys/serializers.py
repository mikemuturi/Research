# from rest_framework import serializers
# from .models import Project, Institution, Question, Submission, Answer

# class ProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         fields = '__all__'

# class InstitutionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Institution
#         fields = '__all__'

# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = '__all__'

# class AnswerSerializer(serializers.ModelSerializer):
#     question_text = serializers.CharField(source='question.text', read_only=True)
#     dimension = serializers.CharField(source='question.dimension', read_only=True)
    
#     class Meta:
#         model = Answer
#         fields = ['question', 'question_text', 'dimension', 'value']

# class SubmissionCreateSerializer(serializers.ModelSerializer):
#     answers = AnswerSerializer(many=True, write_only=True)
    
#     class Meta:
#         model = Submission
#         fields = [
#             'name', 'email', 'phone', 'role', 'institution', 'institution_name', 
#             'county', 'project', 'consent_given', 'is_anonymous', 'answers'
#         ]
    
#     def create(self, validated_data):
#         answers_data = validated_data.pop('answers')
        
#         # Get client IP
#         request = self.context.get('request')
#         if request:
#             x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
#             if x_forwarded_for:
#                 validated_data['ip_address'] = x_forwarded_for.split(',')[0]
#             else:
#                 validated_data['ip_address'] = request.META.get('REMOTE_ADDR')
        
#         submission = Submission.objects.create(**validated_data)
        
#         # Create answers
#         for answer_data in answers_data:
#             Answer.objects.create(submission=submission, **answer_data)
        
#         # Calculate scores
#         submission.calculate_scores()
#         submission.save()
        
#         return submission

# class SubmissionDetailSerializer(serializers.ModelSerializer):
#     answers = AnswerSerializer(many=True, read_only=True)
#     institution_name_display = serializers.SerializerMethodField()
#     recommendations = serializers.SerializerMethodField()
#     scores_by_dimension = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Submission
#         fields = [
#             'id', 'name', 'email', 'phone', 'role', 'institution', 'institution_name',
#             'institution_name_display', 'county', 'consent_given', 'is_anonymous',
#             'submitted_at', 'technical_score', 'economic_score', 'socio_cultural_score',
#             'environmental_score', 'policy_regulatory_score', 'overall_score',
#             'readiness_level', 'answers', 'recommendations', 'scores_by_dimension'
#         ]
    
#     def get_institution_name_display(self, obj):
#         if obj.institution:
#             return obj.institution.name
#         return obj.institution_name
    
#     def get_recommendations(self, obj):
#         return obj.get_recommendations()
    
#     def get_scores_by_dimension(self, obj):
#         return {
#             'technical': obj.technical_score,
#             'economic': obj.economic_score,
#             'socio_cultural': obj.socio_cultural_score,
#             'environmental': obj.environmental_score,
#             'policy_regulatory': obj.policy_regulatory_score,
#         }

# class SubmissionListSerializer(serializers.ModelSerializer):
#     institution_name_display = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Submission
#         fields = [
#             'id', 'name', 'role', 'institution_name_display', 'county',
#             'submitted_at', 'overall_score', 'readiness_level'
#         ]
    
#     def get_institution_name_display(self, obj):
#         if obj.institution:
#             return obj.institution.name
#         return obj.institution_name

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
            'name', 'email', 'phone', 'role', 'institution', 'institution_name', 
            'county', 'project', 'consent_given', 'is_anonymous', 'answers', 'dimension_comments'
        ]
    
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
    recommendations = serializers.SerializerMethodField()
    scores_by_dimension = serializers.SerializerMethodField()
    
    class Meta:
        model = Submission
        fields = [
            'id', 'name', 'email', 'phone', 'role', 'institution', 'institution_name',
            'institution_name_display', 'county', 'consent_given', 'is_anonymous',
            # "option_message",
            'submitted_at', 'technical_score', 'economic_score', 'socio_cultural_score',
            'environmental_score', 'policy_regulatory_score', 'overall_score',
            'readiness_level', 'answers', 'dimension_comments', 'recommendations', 'scores_by_dimension'
        ]
    
    def get_institution_name_display(self, obj):
        if obj.institution:
            return obj.institution.name
        return obj.institution_name
    
    def get_recommendations(self, obj):
        return obj.get_recommendations()
    
    def get_scores_by_dimension(self, obj):
        return {
            'technical': obj.technical_score,
            'economic': obj.economic_score,
            'socio_cultural': obj.socio_cultural_score,
            'environmental': obj.environmental_score,
            'policy_regulatory': obj.policy_regulatory_score,
        }

class SubmissionListSerializer(serializers.ModelSerializer):
    institution_name_display = serializers.SerializerMethodField()
    
    class Meta:
        model = Submission
        fields = [
            'id', 'name', 'role', 'institution_name_display', 'county',
            'submitted_at', 'overall_score', 'readiness_level'
        ]
    
    def get_institution_name_display(self, obj):
        if obj.institution:
            return obj.institution.name
        return obj.institution_name