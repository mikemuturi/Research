# from django.db import models
# from django.contrib.auth.models import User
# import json

# class Project(models.Model):
#     name = models.CharField(max_length=200)
#     description = models.TextField(blank=True)
#     start_date = models.DateField()
#     end_date = models.DateField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.name

# class Institution(models.Model):
#     INSTITUTION_TYPES = [
#         ('university', 'University'),
#         ('college', 'College'),
#         ('technical', 'Technical Institute'),
#         ('other', 'Other'),
#     ]
    
#     name = models.CharField(max_length=200)
#     type = models.CharField(max_length=20, choices=INSTITUTION_TYPES)
#     county = models.CharField(max_length=100)
#     latitude = models.FloatField(null=True, blank=True)
#     longitude = models.FloatField(null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
    
#     def __str__(self):
#         return self.name

# class Question(models.Model):
#     ROLE_CHOICES = [
#         ('ihl', 'Institution of Higher Learning'),
#         ('isp', 'Internet Service Provider'),
#         ('both', 'Both'),
#     ]
    
#     DIMENSION_CHOICES = [
#         ('technical', 'Technical Readiness'),
#         ('economic', 'Economic Readiness'),
#         ('socio_cultural', 'Socio-Cultural Readiness'),
#         ('environmental', 'Environmental Readiness'),
#         ('policy_regulatory', 'Policy & Regulatory Readiness'),
#     ]
    
#     text = models.TextField()
#     dimension = models.CharField(max_length=20, choices=DIMENSION_CHOICES)
#     role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='both')
#     order = models.IntegerField(default=0)
#     is_active = models.BooleanField(default=True)
    
#     class Meta:
#         ordering = ['dimension', 'order']
    
#     def __str__(self):
#         return f"{self.dimension}: {self.text[:50]}"

# class Submission(models.Model):
#     ROLE_CHOICES = [
#         ('lecturer', 'Lecturer'),
#         ('it_support', 'IT Support'),
#         ('admin', 'Administrator'),
#         ('principal', 'Principal'),
#         ('student', 'Student'),
#         ('service_provider', 'Service Provider'),
#     ]
    
#     READINESS_LEVELS = [
#         ('very_ready', 'Very Ready (80-100)'),
#         ('not_sure', 'Not Sure (60-79)'),
#         ('not_ready', 'Not Ready (<60)'),
#     ]
    
#     # Respondent Info
#     name = models.CharField(max_length=200, blank=True)
#     email = models.EmailField(blank=True)
#     phone = models.CharField(max_length=15, blank=True)
#     role = models.CharField(max_length=20, choices=ROLE_CHOICES)
#     institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
#     institution_name = models.CharField(max_length=200, blank=True)
#     county = models.CharField(max_length=100)
    
#     # Metadata
#     project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
#     consent_given = models.BooleanField(default=False)
#     is_anonymous = models.BooleanField(default=False)
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     ip_address = models.GenericIPAddressField(null=True, blank=True)
    
#     # Calculated Scores
#     technical_score = models.FloatField(default=0)
#     economic_score = models.FloatField(default=0)
#     socio_cultural_score = models.FloatField(default=0)
#     environmental_score = models.FloatField(default=0)
#     policy_regulatory_score = models.FloatField(default=0)
#     overall_score = models.FloatField(default=0)
#     readiness_level = models.CharField(max_length=15, choices=READINESS_LEVELS, blank=True)
    
#     def calculate_scores(self):
#         """Calculate dimension and overall scores"""
#         dimensions = ['technical', 'economic', 'socio_cultural', 'environmental', 'policy_regulatory']
#         scores = {}
        
#         for dimension in dimensions:
#             answers = self.answers.filter(question__dimension=dimension)
#             if answers.exists():
#                 avg_score = sum(answer.value for answer in answers) / answers.count()
#                 # Convert 1-5 scale to 0-100 scale
#                 normalized_score = ((avg_score - 1) / 4) * 100
#                 scores[f"{dimension}_score"] = normalized_score
#             else:
#                 scores[f"{dimension}_score"] = 0
        
#         # Calculate overall score
#         overall_score = sum(scores.values()) / len(scores) if scores else 0
#         scores['overall_score'] = overall_score
        
#         # Determine readiness level
#         if overall_score >= 80:
#             scores['readiness_level'] = 'very_ready'
#         elif overall_score >= 60:
#             scores['readiness_level'] = 'not_sure'
#         else:
#             scores['readiness_level'] = 'not_ready'
        
#         # Update model fields
#         for field, value in scores.items():
#             setattr(self, field, value)
        
#         return scores
    
#     def get_recommendations(self):
#         """Generate recommendations based on low-scoring dimensions"""
#         recommendations = []
#         threshold = 60  # Below this threshold, dimension needs improvement
        
#         recommendations_map = {
#             'technical': [
#                 "Upgrade ICT infrastructure and equipment",
#                 "Invest in renewable power backup systems",
#                 "Improve internet connectivity and bandwidth",
#                 "Train staff on technical systems and digital literacy"
#             ],
#             'economic': [
#                 "Develop sustainable funding models",
#                 "Explore partnerships with private sector",
#                 "Create cost-sharing mechanisms",
#                 "Apply for grants and development funding"
#             ],
#             'socio_cultural': [
#                 "Conduct awareness campaigns on digital literacy",
#                 "Develop culturally appropriate content",
#                 "Train staff and students on new technologies",
#                 "Address digital divide concerns"
#             ],
#             'environmental': [
#                 "Implement green ICT practices",
#                 "Develop environmental sustainability policies",
#                 "Invest in energy-efficient technologies",
#                 "Create waste management systems"
#             ],
#             'policy_regulatory': [
#                 "Develop institutional ICT policies",
#                 "Ensure compliance with national regulations",
#                 "Create data protection and privacy policies",
#                 "Establish governance frameworks"
#             ]
#         }
        
#         if self.technical_score < threshold:
#             recommendations.extend(recommendations_map['technical'])
#         if self.economic_score < threshold:
#             recommendations.extend(recommendations_map['economic'])
#         if self.socio_cultural_score < threshold:
#             recommendations.extend(recommendations_map['socio_cultural'])
#         if self.environmental_score < threshold:
#             recommendations.extend(recommendations_map['environmental'])
#         if self.policy_regulatory_score < threshold:
#             recommendations.extend(recommendations_map['policy_regulatory'])
        
#         return recommendations
    
#     def __str__(self):
#         return f"{self.name} - {self.role} ({self.submitted_at.strftime('%Y-%m-%d')})"

# class Answer(models.Model):
#     submission = models.ForeignKey(Submission, related_name='answers', on_delete=models.CASCADE)
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     value = models.IntegerField()  # 1-5 for Likert scale
    
#     class Meta:
#         unique_together = ['submission', 'question']
    
#     def __str__(self):
#         return f"{self.submission.name} - {self.question.text[:30]} - {self.value}"

from django.db import models
from django.contrib.auth.models import User
import json

class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Institution(models.Model):
    INSTITUTION_TYPES = [
        ('university', 'University'),
        ('college', 'College'),
        ('technical', 'Technical Institute'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=200)
    type = models.CharField(max_length=20, choices=INSTITUTION_TYPES)
    county = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Question(models.Model):
    ROLE_CHOICES = [
        ('ihl', 'Institution of Higher Learning'),
        ('isp', 'Internet Service Provider'),
        ('both', 'Both'),
    ]
    
    DIMENSION_CHOICES = [
        ('technical', 'Technical Readiness'),
        ('economic', 'Economic Readiness'),
        ('socio_cultural', 'Socio-Cultural Readiness'),
        ('environmental', 'Environmental Readiness'),
        ('policy_regulatory', 'Policy & Regulatory Readiness'),
    ]
    
    text = models.TextField()
    dimension = models.CharField(max_length=20, choices=DIMENSION_CHOICES)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='both')
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['dimension', 'order']
    
    def __str__(self):
        return f"{self.dimension}: {self.text[:50]}"

class Submission(models.Model):
    ROLE_CHOICES = [
        ('lecturer', 'Lecturer'),
        ('it_support', 'IT Support'),
        ('admin', 'Administrator'),
        ('principal', 'Principal'),
        ('student', 'Student'),
        ('service_provider', 'Service Provider'),
    ]
    
    READINESS_LEVELS = [
        ('very_ready', 'Very Ready (80-100)'),
        ('not_sure', 'Not Sure (60-79)'),
        ('not_ready', 'Not Ready (<60)'),
    ]
    
    # Respondent Info
    name = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, null=True, blank=True)
    institution_name = models.CharField(max_length=200, blank=True)
    county = models.CharField(max_length=100)
    
    # Metadata
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    consent_given = models.BooleanField(default=False)
    is_anonymous = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    
    # Calculated Scores
    technical_score = models.FloatField(default=0)
    economic_score = models.FloatField(default=0)
    socio_cultural_score = models.FloatField(default=0)
    environmental_score = models.FloatField(default=0)
    policy_regulatory_score = models.FloatField(default=0)
    overall_score = models.FloatField(default=0)
    readiness_level = models.CharField(max_length=15, choices=READINESS_LEVELS, blank=True)
    
    def calculate_scores(self):
        """Calculate dimension and overall scores"""
        dimensions = ['technical', 'economic', 'socio_cultural', 'environmental', 'policy_regulatory']
        scores = {}
        
        for dimension in dimensions:
            answers = self.answers.filter(question__dimension=dimension)
            if answers.exists():
                avg_score = sum(answer.value for answer in answers) / answers.count()
                # Convert 1-5 scale to 0-100 scale
                normalized_score = ((avg_score - 1) / 4) * 100
                scores[f"{dimension}_score"] = normalized_score
            else:
                scores[f"{dimension}_score"] = 0
        
        # Calculate overall score
        overall_score = sum(scores.values()) / len(scores) if scores else 0
        scores['overall_score'] = overall_score
        
        # Determine readiness level
        if overall_score >= 80:
            scores['readiness_level'] = 'very_ready'
        elif overall_score >= 60:
            scores['readiness_level'] = 'not_sure'
        else:
            scores['readiness_level'] = 'not_ready'
        
        # Update model fields
        for field, value in scores.items():
            setattr(self, field, value)
        
        return scores
    
    def get_recommendations(self):
        """Generate recommendations based on low-scoring dimensions"""
        recommendations = []
        threshold = 60  # Below this threshold, dimension needs improvement
        
        recommendations_map = {
            'technical': [
                "Upgrade ICT infrastructure and equipment",
                "Invest in renewable power backup systems",
                "Improve internet connectivity and bandwidth",
                "Train staff on technical systems and digital literacy"
            ],
            'economic': [
                "Develop sustainable funding models",
                "Explore partnerships with private sector",
                "Create cost-sharing mechanisms",
                "Apply for grants and development funding"
            ],
            'socio_cultural': [
                "Conduct awareness campaigns on digital literacy",
                "Develop culturally appropriate content",
                "Train staff and students on new technologies",
                "Address digital divide concerns"
            ],
            'environmental': [
                "Implement green ICT practices",
                "Develop environmental sustainability policies",
                "Invest in energy-efficient technologies",
                "Create waste management systems"
            ],
            'policy_regulatory': [
                "Develop institutional ICT policies",
                "Ensure compliance with national regulations",
                "Create data protection and privacy policies",
                "Establish governance frameworks"
            ]
        }
        
        if self.technical_score < threshold:
            recommendations.extend(recommendations_map['technical'])
        if self.economic_score < threshold:
            recommendations.extend(recommendations_map['economic'])
        if self.socio_cultural_score < threshold:
            recommendations.extend(recommendations_map['socio_cultural'])
        if self.environmental_score < threshold:
            recommendations.extend(recommendations_map['environmental'])
        if self.policy_regulatory_score < threshold:
            recommendations.extend(recommendations_map['policy_regulatory'])
        
        return recommendations
    
    def __str__(self):
        return f"{self.name} - {self.role} ({self.submitted_at.strftime('%Y-%m-%d')})"

class Answer(models.Model):
    submission = models.ForeignKey(Submission, related_name='answers', on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    value = models.IntegerField()  # 1-5 for Likert scale
    
    class Meta:
        unique_together = ['submission', 'question']
    
    def __str__(self):
        return f"{self.submission.name} - {self.question.text[:30]} - {self.value}"

# NEW MODEL for dimension comments
class DimensionComment(models.Model):
    DIMENSION_CHOICES = [
        ('technical', 'Technical Readiness'),
        ('economic', 'Economic Readiness'),
        ('socio_cultural', 'Socio-Cultural Readiness'),
        ('environmental', 'Environmental Readiness'),
        ('policy_regulatory', 'Policy & Regulatory Readiness'),
    ]
    
    submission = models.ForeignKey(Submission, related_name='dimension_comments', on_delete=models.CASCADE)
    dimension = models.CharField(max_length=20, choices=DIMENSION_CHOICES)
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['submission', 'dimension']
        ordering = ['dimension']
    
    def __str__(self):
        return f"{self.submission.name} - {self.get_dimension_display()}: {self.comment[:50]}"