import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rafsia_backend.settings')
django.setup()

from django.core.management.base import BaseCommand
from surveys.models import Question, Institution, Project
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Load sample questions and data for RAFSIA assessment'
    
    def handle(self, *args, **options):
        # Create superuser if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            self.stdout.write('Created superuser: admin/admin123')
        
        # Create sample project
        project, created = Project.objects.get_or_create(
            name="RAFSIA Readiness Assessment 2025",
            defaults={
                'description': 'Baseline readiness assessment for satellite internet adoption',
                'start_date': '2025-01-01'
            }
        )
        
        # Create sample institutions
        institutions_data = [
            {'name': 'Masinde Muliro University', 'type': 'university', 'county': 'Kakamega'},
            {'name': 'Kakamega Technical College', 'type': 'technical', 'county': 'Kakamega'},
            {'name': 'Kibabii University', 'type': 'university', 'county': 'Bungoma'},
        ]
        
        for inst_data in institutions_data:
            Institution.objects.get_or_create(**inst_data)
        
        # Sample questions for each dimension
        questions_data = [
            # Technical Readiness
            {'text': 'Our institution has adequate ICT infrastructure to support satellite internet connectivity', 'dimension': 'technical', 'role': 'ihl'},
            {'text': 'We have reliable power supply to support continuous internet connectivity', 'dimension': 'technical', 'role': 'both'},
            {'text': 'Our technical staff are adequately trained to manage internet connectivity systems', 'dimension': 'technical', 'role': 'both'},
            {'text': 'We have sufficient ICT equipment (computers, tablets, etc.) for our operations', 'dimension': 'technical', 'role': 'ihl'},
            {'text': 'Our organization has the technical capacity to provide satellite internet services', 'dimension': 'technical', 'role': 'isp'},
            
            # Economic Readiness
            {'text': 'Our institution can afford the costs associated with satellite internet connectivity', 'dimension': 'economic', 'role': 'ihl'},
            {'text': 'We have sustainable funding mechanisms for ICT infrastructure development', 'dimension': 'economic', 'role': 'both'},
            {'text': 'The cost of satellite internet services is affordable for our target market', 'dimension': 'economic', 'role': 'isp'},
            {'text': 'We have adequate budget allocation for ICT maintenance and upgrades', 'dimension': 'economic', 'role': 'both'},
            {'text': 'Our economic model supports long-term sustainability of internet services', 'dimension': 'economic', 'role': 'both'},
            
            # Socio-Cultural Readiness
            {'text': 'Our staff and students are willing to adopt new internet technologies', 'dimension': 'socio_cultural', 'role': 'ihl'},
            {'text': 'The community we serve is ready to embrace satellite internet technology', 'dimension': 'socio_cultural', 'role': 'both'},
            {'text': 'We have programs to promote digital literacy among our users', 'dimension': 'socio_cultural', 'role': 'both'},
            {'text': 'Cultural factors in our region support the adoption of new technologies', 'dimension': 'socio_cultural', 'role': 'both'},
            {'text': 'Our customers have sufficient digital skills to use internet services effectively', 'dimension': 'socio_cultural', 'role': 'isp'},
            
            # Environmental Readiness
            {'text': 'Our institution considers environmental impact in ICT decisions', 'dimension': 'environmental', 'role': 'ihl'},
            {'text': 'We have policies promoting environmentally sustainable ICT practices', 'dimension': 'environmental', 'role': 'both'},
            {'text': 'Our operations minimize negative environmental impacts', 'dimension': 'environmental', 'role': 'both'},
            {'text': 'We promote the use of renewable energy sources for ICT operations', 'dimension': 'environmental', 'role': 'both'},
            {'text': 'Environmental regulations support our satellite internet operations', 'dimension': 'environmental', 'role': 'isp'},
            
            # Policy & Regulatory Readiness
            {'text': 'Existing government policies support satellite internet adoption in our institution', 'dimension': 'policy_regulatory', 'role': 'ihl'},
            {'text': 'Regulatory frameworks are conducive to satellite internet service provision', 'dimension': 'policy_regulatory', 'role': 'both'},
            {'text': 'We have clear institutional policies governing ICT use and management', 'dimension': 'policy_regulatory', 'role': 'ihl'},
            {'text': 'Licensing and regulatory requirements are clear and achievable', 'dimension': 'policy_regulatory', 'role': 'isp'},
            {'text': 'Government support exists for expanding internet connectivity in rural areas', 'dimension': 'policy_regulatory', 'role': 'both'},
        ]
        
        # Create questions
        for i, q_data in enumerate(questions_data):
            q_data['order'] = i + 1
            Question.objects.get_or_create(
                text=q_data['text'],
                dimension=q_data['dimension'],
                defaults=q_data
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully loaded {len(questions_data)} questions'))
        self.stdout.write(self.style.SUCCESS(f'Created project: {project.name}'))
        self.stdout.write(self.style.SUCCESS('Sample data loaded successfully!'))