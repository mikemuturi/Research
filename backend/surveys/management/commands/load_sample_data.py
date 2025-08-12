# import os
# import django

# # Setup Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rafsia_backend.settings')
# django.setup()

# from django.core.management.base import BaseCommand
# from surveys.models import Question, Institution, Project
# from django.contrib.auth.models import User

# class Command(BaseCommand):
#     help = 'Load comprehensive RAFSIA assessment questions and sample data'
    
#     def handle(self, *args, **options):
#         # Create superuser if it doesn't exist
#         if not User.objects.filter(username='admin').exists():
#             User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
#             self.stdout.write('Created superuser: admin/admin123')
        
#         # Create sample project
#         project, created = Project.objects.get_or_create(
#             name="RAFSIA Readiness Assessment 2025",
#             defaults={
#                 'description': 'Baseline readiness assessment for satellite internet adoption in Kenya',
#                 'start_date': '2025-01-01'
#             }
#         )
        
#         # Create sample institutions
#         institutions_data = [
#             {'name': 'Masinde Muliro University of Science and Technology', 'type': 'university', 'county': 'Kakamega'},
#             {'name': 'Kakamega Technical Training Institute', 'type': 'technical', 'county': 'Kakamega'},
#             {'name': 'Kibabii University', 'type': 'university', 'county': 'Bungoma'},
#             {'name': 'Sigalagala National Polytechnic', 'type': 'technical', 'county': 'Kakamega'},
#             {'name': 'Kaimosi Friends University College', 'type': 'college', 'county': 'Vihiga'},
#         ]
        
#         for inst_data in institutions_data:
#             Institution.objects.get_or_create(**inst_data)
        
#         # Clear existing questions to avoid duplicates
#         Question.objects.all().delete()
        
#         # Comprehensive questions for all five RAFSIA dimensions
#         questions_data = [
#             # TECHNICAL READINESS QUESTIONS
#             {
#                 'text': 'Our institution has adequate ICT infrastructure (servers, networking equipment, etc.) to support satellite internet connectivity',
#                 'dimension': 'technical',
#                 'role': 'ihl',
#                 'order': 1
#             },
#             {
#                 'text': 'We have reliable and consistent power supply to support continuous internet connectivity operations',
#                 'dimension': 'technical',
#                 'role': 'both',
#                 'order': 2
#             },
#             {
#                 'text': 'Our technical staff possess adequate skills and training to manage satellite internet connectivity systems',
#                 'dimension': 'technical',
#                 'role': 'both',
#                 'order': 3
#             },
#             {
#                 'text': 'We have sufficient end-user devices (computers, tablets, smartphones) to effectively utilize satellite internet services',
#                 'dimension': 'technical',
#                 'role': 'ihl',
#                 'order': 4
#             },
#             {
#                 'text': 'Our organization has the technical capacity and expertise to provide reliable satellite internet services',
#                 'dimension': 'technical',
#                 'role': 'isp',
#                 'order': 5
#             },
#             {
#                 'text': 'We have backup power systems (generators, UPS, solar) to ensure uninterrupted internet connectivity',
#                 'dimension': 'technical',
#                 'role': 'both',
#                 'order': 6
#             },
#             {
#                 'text': 'Our current network infrastructure can be easily integrated with satellite internet technology',
#                 'dimension': 'technical',
#                 'role': 'both',
#                 'order': 7
#             },
#             {
#                 'text': 'We have adequate technical support and maintenance capabilities for satellite internet equipment',
#                 'dimension': 'technical',
#                 'role': 'both',
#                 'order': 8
#             },

#             # ECONOMIC READINESS QUESTIONS
#             {
#                 'text': 'Our institution can afford the initial setup costs associated with satellite internet connectivity',
#                 'dimension': 'economic',
#                 'role': 'ihl',
#                 'order': 9
#             },
#             {
#                 'text': 'We have sustainable funding mechanisms in place for ongoing ICT infrastructure development and maintenance',
#                 'dimension': 'economic',
#                 'role': 'both',
#                 'order': 10
#             },
#             {
#                 'text': 'The cost of satellite internet services is affordable and competitive for our target market',
#                 'dimension': 'economic',
#                 'role': 'isp',
#                 'order': 11
#             },
#             {
#                 'text': 'We have adequate budget allocation specifically for ICT services, maintenance, and regular upgrades',
#                 'dimension': 'economic',
#                 'role': 'both',
#                 'order': 12
#             },
#             {
#                 'text': 'Our economic model and revenue streams support the long-term sustainability of internet services',
#                 'dimension': 'economic',
#                 'role': 'both',
#                 'order': 13
#             },
#             {
#                 'text': 'We can secure financing or investment for satellite internet infrastructure development',
#                 'dimension': 'economic',
#                 'role': 'both',
#                 'order': 14
#             },
#             {
#                 'text': 'The return on investment for satellite internet adoption is justified by expected benefits',
#                 'dimension': 'economic',
#                 'role': 'both',
#                 'order': 15
#             },
#             {
#                 'text': 'We have cost-sharing mechanisms or partnerships to reduce the financial burden of internet adoption',
#                 'dimension': 'economic',
#                 'role': 'both',
#                 'order': 16
#             },

#             # SOCIO-CULTURAL READINESS QUESTIONS
#             {
#                 'text': 'Our staff, students, and stakeholders are willing and eager to adopt new internet technologies',
#                 'dimension': 'socio_cultural',
#                 'role': 'ihl',
#                 'order': 17
#             },
#             {
#                 'text': 'The community we serve is ready to embrace and utilize satellite internet technology',
#                 'dimension': 'socio_cultural',
#                 'role': 'both',
#                 'order': 18
#             },
#             {
#                 'text': 'We have effective programs and initiatives to promote digital literacy among our users',
#                 'dimension': 'socio_cultural',
#                 'role': 'both',
#                 'order': 19
#             },
#             {
#                 'text': 'Cultural factors and traditions in our region support the adoption of new communication technologies',
#                 'dimension': 'socio_cultural',
#                 'role': 'both',
#                 'order': 20
#             },
#             {
#                 'text': 'Our target customers have sufficient digital skills and knowledge to use internet services effectively',
#                 'dimension': 'socio_cultural',
#                 'role': 'isp',
#                 'order': 21
#             },
#             {
#                 'text': 'There is strong community support and acceptance for expanding internet connectivity in our area',
#                 'dimension': 'socio_cultural',
#                 'role': 'both',
#                 'order': 22
#             },
#             {
#                 'text': 'We provide adequate training and support to help users adapt to new internet technologies',
#                 'dimension': 'socio_cultural',
#                 'role': 'both',
#                 'order': 23
#             },
#             {
#                 'text': 'Language and communication barriers do not significantly hinder internet technology adoption',
#                 'dimension': 'socio_cultural',
#                 'role': 'both',
#                 'order': 24
#             },

#             # ENVIRONMENTAL READINESS QUESTIONS
#             {
#                 'text': 'Our institution actively considers environmental impact when making ICT infrastructure decisions',
#                 'dimension': 'environmental',
#                 'role': 'ihl',
#                 'order': 25
#             },
#             {
#                 'text': 'We have established policies and practices that promote environmentally sustainable ICT operations',
#                 'dimension': 'environmental',
#                 'role': 'both',
#                 'order': 26
#             },
#             {
#                 'text': 'Our operations and service delivery minimize negative environmental impacts and carbon footprint',
#                 'dimension': 'environmental',
#                 'role': 'both',
#                 'order': 27
#             },
#             {
#                 'text': 'We actively promote and utilize renewable energy sources for our ICT operations and infrastructure',
#                 'dimension': 'environmental',
#                 'role': 'both',
#                 'order': 28
#             },
#             {
#                 'text': 'Environmental regulations and requirements support our satellite internet operations and expansion',
#                 'dimension': 'environmental',
#                 'role': 'isp',
#                 'order': 29
#             },
#             {
#                 'text': 'We have implemented green ICT practices such as energy-efficient equipment and e-waste management',
#                 'dimension': 'environmental',
#                 'role': 'both',
#                 'order': 30
#             },
#             {
#                 'text': 'Our satellite internet infrastructure is designed to be environmentally sustainable and eco-friendly',
#                 'dimension': 'environmental',
#                 'role': 'both',
#                 'order': 31
#             },
#             {
#                 'text': 'We conduct environmental impact assessments for our ICT projects and infrastructure development',
#                 'dimension': 'environmental',
#                 'role': 'both',
#                 'order': 32
#             },

#             # POLICY & REGULATORY READINESS QUESTIONS
#             {
#                 'text': 'Existing government policies and regulations support satellite internet adoption in our institution',
#                 'dimension': 'policy_regulatory',
#                 'role': 'ihl',
#                 'order': 33
#             },
#             {
#                 'text': 'Current regulatory frameworks are conducive to satellite internet service provision and operations',
#                 'dimension': 'policy_regulatory',
#                 'role': 'both',
#                 'order': 34
#             },
#             {
#                 'text': 'We have clear and comprehensive institutional policies governing ICT use, management, and security',
#                 'dimension': 'policy_regulatory',
#                 'role': 'ihl',
#                 'order': 35
#             },
#             {
#                 'text': 'Licensing requirements and regulatory compliance procedures are clear, achievable, and well-defined',
#                 'dimension': 'policy_regulatory',
#                 'role': 'isp',
#                 'order': 36
#             },
#             {
#                 'text': 'Government support and initiatives exist for expanding internet connectivity in rural and underserved areas',
#                 'dimension': 'policy_regulatory',
#                 'role': 'both',
#                 'order': 37
#             },
#             {
#                 'text': 'We have established data protection and privacy policies that comply with national and international standards',
#                 'dimension': 'policy_regulatory',
#                 'role': 'both',
#                 'order': 38
#             },
#             {
#                 'text': 'Regulatory authorities provide adequate support and guidance for satellite internet service providers',
#                 'dimension': 'policy_regulatory',
#                 'role': 'isp',
#                 'order': 39
#             },
#             {
#                 'text': 'Our institutional governance structures support effective ICT policy implementation and compliance',
#                 'dimension': 'policy_regulatory',
#                 'role': 'both',
#                 'order': 40
#             },
#         ]
        
#         # Create questions
#         for q_data in questions_data:
#             Question.objects.create(**q_data)
        
#         self.stdout.write(self.style.SUCCESS(f'Successfully loaded {len(questions_data)} comprehensive questions'))
#         self.stdout.write(self.style.SUCCESS(f'Created project: {project.name}'))
#         self.stdout.write(self.style.SUCCESS(f'Created {len(institutions_data)} sample institutions'))
#         self.stdout.write(self.style.SUCCESS('✅ Complete RAFSIA assessment data loaded successfully!'))
        
#         # Display question breakdown
#         self.stdout.write('\n📊 Question Distribution:')
#         for dimension in ['technical', 'economic', 'socio_cultural', 'environmental', 'policy_regulatory']:
#             count = Question.objects.filter(dimension=dimension).count()
#             self.stdout.write(f'  • {dimension.replace("_", " ").title()}: {count} questions')

from datetime import date
from django.core.management.base import BaseCommand
from django.db import transaction
from django.contrib.auth import get_user_model
from surveys.models import Question, Institution, Project

class Command(BaseCommand):
    help = "Load RAFSIA sample data (superuser, institutions, project, questions). Safe to re-run."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force-reset",
            action="store_true",
            help="Delete all existing questions before loading.",
        )

    @transaction.atomic
    def handle(self, *args, **options):
        User = get_user_model()

        # --- Admin user ---
        admin_username = "admin"
        admin_email = "admin@example.com"
        admin_password = "admin123"

        if not User.objects.filter(username=admin_username).exists():
            User.objects.create_superuser(admin_username, admin_email, admin_password)
            self.stdout.write(self.style.SUCCESS(f"Created superuser: {admin_username}/{admin_password}"))
        else:
            self.stdout.write(f"Superuser '{admin_username}' already exists.")

        # --- Project ---
        project, created = Project.objects.get_or_create(
            name="RAFSIA Readiness Assessment 2025",
            defaults={
                "description": "Baseline readiness assessment for satellite internet adoption in Kenya",
                "start_date": date(2025, 1, 1),
            },
        )
        self.stdout.write(self.style.SUCCESS(f"Created project: {project.name}") if created else f"Project already exists: {project.name}")

        # --- Institutions ---
        institutions_data = [
            {"name": "Masinde Muliro University of Science and Technology", "type": "university", "county": "Kakamega"},
            {"name": "Kakamega Technical Training Institute", "type": "technical", "county": "Kakamega"},
            {"name": "Kibabii University", "type": "university", "county": "Bungoma"},
            {"name": "Sigalagala National Polytechnic", "type": "technical", "county": "Kakamega"},
            {"name": "Kaimosi Friends University College", "type": "college", "county": "Vihiga"},
        ]
        inst_created = 0
        for inst in institutions_data:
            _, c = Institution.objects.get_or_create(**inst)
            inst_created += 1 if c else 0
        self.stdout.write(self.style.SUCCESS(f"Institutions created this run: {inst_created} (total now: {Institution.objects.count()})"))

        # --- Questions ---
        if options.get("force_reset"):
            deleted = Question.objects.all().delete()[0]
            self.stdout.write(self.style.WARNING(f"Deleted {deleted} existing questions."))

        questions_data = [
            # TECHNICAL
            {"text": "Our institution has adequate ICT infrastructure (servers, networking equipment, etc.) to support satellite internet connectivity", "dimension": "technical", "role": "ihl",  "order": 1},
            {"text": "We have reliable and consistent power supply to support continuous internet connectivity operations", "dimension": "technical", "role": "both", "order": 2},
            {"text": "Our technical staff possess adequate skills and training to manage satellite internet connectivity systems", "dimension": "technical", "role": "both", "order": 3},
            {"text": "We have sufficient end-user devices (computers, tablets, smartphones) to effectively utilize satellite internet services", "dimension": "technical", "role": "ihl",  "order": 4},
            {"text": "Our organization has the technical capacity and expertise to provide reliable satellite internet services", "dimension": "technical", "role": "isp",  "order": 5},
            {"text": "We have backup power systems (generators, UPS, solar) to ensure uninterrupted internet connectivity", "dimension": "technical", "role": "both", "order": 6},
            {"text": "Our current network infrastructure can be easily integrated with satellite internet technology", "dimension": "technical", "role": "both", "order": 7},
            {"text": "We have adequate technical support and maintenance capabilities for satellite internet equipment", "dimension": "technical", "role": "both", "order": 8},

            # ECONOMIC
            {"text": "Our institution can afford the initial setup costs associated with satellite internet connectivity", "dimension": "economic", "role": "ihl",  "order": 9},
            {"text": "We have sustainable funding mechanisms in place for ongoing ICT infrastructure development and maintenance", "dimension": "economic", "role": "both", "order": 10},
            {"text": "The cost of satellite internet services is affordable and competitive for our target market", "dimension": "economic", "role": "isp",  "order": 11},
            {"text": "We have adequate budget allocation specifically for ICT services, maintenance, and regular upgrades", "dimension": "economic", "role": "both", "order": 12},
            {"text": "Our economic model and revenue streams support the long-term sustainability of internet services", "dimension": "economic", "role": "both", "order": 13},
            {"text": "We can secure financing or investment for satellite internet infrastructure development", "dimension": "economic", "role": "both", "order": 14},
            {"text": "The return on investment for satellite internet adoption is justified by expected benefits", "dimension": "economic", "role": "both", "order": 15},
            {"text": "We have cost-sharing mechanisms or partnerships to reduce the financial burden of internet adoption", "dimension": "economic", "role": "both", "order": 16},

            # SOCIO-CULTURAL
            {"text": "Our staff, students, and stakeholders are willing and eager to adopt new internet technologies", "dimension": "socio_cultural", "role": "ihl",  "order": 17},
            {"text": "The community we serve is ready to embrace and utilize satellite internet technology", "dimension": "socio_cultural", "role": "both", "order": 18},
            {"text": "We have effective programs and initiatives to promote digital literacy among our users", "dimension": "socio_cultural", "role": "both", "order": 19},
            {"text": "Cultural factors and traditions in our region support the adoption of new communication technologies", "dimension": "socio_cultural", "role": "both", "order": 20},
            {"text": "Our target customers have sufficient digital skills and knowledge to use internet services effectively", "dimension": "socio_cultural", "role": "isp",  "order": 21},
            {"text": "There is strong community support and acceptance for expanding internet connectivity in our area", "dimension": "socio_cultural", "role": "both", "order": 22},
            {"text": "We provide adequate training and support to help users adapt to new internet technologies", "dimension": "socio_cultural", "role": "both", "order": 23},
            {"text": "Language and communication barriers do not significantly hinder internet technology adoption", "dimension": "socio_cultural", "role": "both", "order": 24},

            # ENVIRONMENTAL
            {"text": "Our institution actively considers environmental impact when making ICT infrastructure decisions", "dimension": "environmental", "role": "ihl",  "order": 25},
            {"text": "We have established policies and practices that promote environmentally sustainable ICT operations", "dimension": "environmental", "role": "both", "order": 26},
            {"text": "Our operations and service delivery minimize negative environmental impacts and carbon footprint", "dimension": "environmental", "role": "both", "order": 27},
            {"text": "We actively promote and utilize renewable energy sources for our ICT operations and infrastructure", "dimension": "environmental", "role": "both", "order": 28},
            {"text": "Environmental regulations and requirements support our satellite internet operations and expansion", "dimension": "environmental", "role": "isp",  "order": 29},
            {"text": "We have implemented green ICT practices such as energy-efficient equipment and e-waste management", "dimension": "environmental", "role": "both", "order": 30},
            {"text": "Our satellite internet infrastructure is designed to be environmentally sustainable and eco-friendly", "dimension": "environmental", "role": "both", "order": 31},
            {"text": "We conduct environmental impact assessments for our ICT projects and infrastructure development", "dimension": "environmental", "role": "both", "order": 32},

            # POLICY & REGULATORY
            {"text": "Existing government policies and regulations support satellite internet adoption in our institution", "dimension": "policy_regulatory", "role": "ihl",  "order": 33},
            {"text": "Current regulatory frameworks are conducive to satellite internet service provision and operations", "dimension": "policy_regulatory", "role": "both", "order": 34},
            {"text": "We have clear and comprehensive institutional policies governing ICT use, management, and security", "dimension": "policy_regulatory", "role": "ihl",  "order": 35},
            {"text": "Licensing requirements and regulatory compliance procedures are clear, achievable, and well-defined", "dimension": "policy_regulatory", "role": "isp",  "order": 36},
            {"text": "Government support and initiatives exist for expanding internet connectivity in rural and underserved areas", "dimension": "policy_regulatory", "role": "both", "order": 37},
            {"text": "We have established data protection and privacy policies that comply with national and international standards", "dimension": "policy_regulatory", "role": "both", "order": 38},
            {"text": "Regulatory authorities provide adequate support and guidance for satellite internet service providers", "dimension": "policy_regulatory", "role": "isp",  "order": 39},
            {"text": "Our institutional governance structures support effective ICT policy implementation and compliance", "dimension": "policy_regulatory", "role": "both", "order": 40},
        ]

        created, updated = 0, 0
        for q in questions_data:
            obj, was_created = Question.objects.update_or_create(
                text=q["text"],  # treat text as unique key for this dataset
                defaults=q,
            )
            created += 1 if was_created else 0
            updated += 0 if was_created else 1

        total = Question.objects.count()
        self.stdout.write(self.style.SUCCESS(f"Questions created: {created}, updated: {updated}, total now: {total}"))

        for dim in ["technical", "economic", "socio_cultural", "environmental", "policy_regulatory"]:
            cnt = Question.objects.filter(dimension=dim).count()
            self.stdout.write(f"  • {dim.replace('_',' ').title()}: {cnt}")
