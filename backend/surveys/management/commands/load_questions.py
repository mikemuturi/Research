from django.core.management.base import BaseCommand
from surveys.models import Question

class Command(BaseCommand):
    help = 'Load RAFSIA assessment questions'
    
    def handle(self, *args, **options):
        questions_data = [
            # Technical Readiness Questions
            {
                'text': 'Our institution has adequate ICT infrastructure to support satellite internet connectivity',
                'dimension': 'technical',
                'role': 'ihl',
                'order': 1
            },
            {
                'text': 'We have reliable power supply to support continuous internet connectivity',
                'dimension': 'technical',
                'role': 'both',
                'order': 2
            },
            {
                'text': 'Our technical staff are adequately trained to manage internet connectivity systems',
                'dimension': 'technical',
                'role': 'both',
                'order': 3
            },
            {
                'text': 'We have sufficient ICT equipment (computers, tablets, etc.) for our operations',
                'dimension': 'technical',
                'role': 'ihl',
                'order': 4
            },
            {
                'text': 'Our organization has the technical capacity to provide satellite internet services',
                'dimension': 'technical',
                'role': 'isp',
                'order': 5
            },
            {
                'text': 'We have backup power systems (generators, UPS, solar) to ensure continuous operation',
                'dimension': 'technical',
                'role': 'both',
                'order': 6
            },
            {
                'text': 'Our current internet infrastructure can be easily upgraded to satellite technology',
                'dimension': 'technical',
                'role': 'both',
                'order': 7
            },
            
            # Economic Readiness Questions
            {
                'text': 'Our institution can afford the costs associated with satellite internet connectivity',
                'dimension': 'economic',
                'role': 'ihl',
                'order': 8
            },
            {
                'text': 'We have sustainable funding mechanisms for ICT infrastructure development',
                'dimension': 'economic',
                'role': 'both',
                'order': 9
            },
            {
                'text': 'The cost of satellite internet services is affordable for our target market',
                'dimension': 'economic',
                'role': 'isp',
                'order': 10
            },
            {
                'text': 'We have adequate budget allocation for ICT maintenance and upgrades',
                'dimension': 'economic',
                'role': 'both',
                'order': 11
            },
            {
                'text': 'Our economic model supports long-term sustainability of internet services',
                'dimension': 'economic',
                'role': 'both',
                'order': 12
            },
            {
                'text': 'We have access to funding sources (grants, loans, partnerships) for technology adoption',
                'dimension': 'economic',
                'role': 'both',
                'order': 13
            },
            {
                'text': 'The return on investment for satellite internet adoption is acceptable',
                'dimension': 'economic',
                'role': 'both',
                'order': 14
            },
            
            # Socio-Cultural Readiness Questions
            {
                'text': 'Our staff and students are willing to adopt new internet technologies',
                'dimension': 'socio_cultural',
                'role': 'ihl',
                'order': 15
            },
            {
                'text': 'The community we serve is ready to embrace satellite internet technology',
                'dimension': 'socio_cultural',
                'role': 'both',
                'order': 16
            },
            {
                'text': 'We have programs to promote digital literacy among our users',
                'dimension': 'socio_cultural',
                'role': 'both',
                'order': 17
            },
            {
                'text': 'Cultural factors in our region support the adoption of new technologies',
                'dimension': 'socio_cultural',
                'role': 'both',
                'order': 18
            },
            {
                'text': 'Our customers have sufficient digital skills to use internet services effectively',
                'dimension': 'socio_cultural',
                'role': 'isp',
                'order': 19
            },
            {
                'text': 'There is strong leadership support for technology adoption in our organization',
                'dimension': 'socio_cultural',
                'role': 'both',
                'order': 20
            },
            {
                'text': 'Our organization has a culture that embraces innovation and change',
                'dimension': 'socio_cultural',
                'role': 'both',
                'order': 21
            },
            
            # Environmental Readiness Questions
            {
                'text': 'Our institution considers environmental impact in ICT decisions',
                'dimension': 'environmental',
                'role': 'ihl',
                'order': 22
            },
            {
                'text': 'We have policies promoting environmentally sustainable ICT practices',
                'dimension': 'environmental',
                'role': 'both',
                'order': 23
            },
            {
                'text': 'Our operations minimize negative environmental impacts',
                'dimension': 'environmental',
                'role': 'both',
                'order': 24
            },
            {
                'text': 'We promote the use of renewable energy sources for ICT operations',
                'dimension': 'environmental',
                'role': 'both',
                'order': 25
            },
            {
                'text': 'Environmental regulations support our satellite internet operations',
                'dimension': 'environmental',
                'role': 'isp',
                'order': 26
            },
            {
                'text': 'We have environmental management systems in place',
                'dimension': 'environmental',
                'role': 'both',
                'order': 27
            },
            {
                'text': 'Our organization is committed to reducing carbon footprint through technology choices',
                'dimension': 'environmental',
                'role': 'both',
                'order': 28
            },
            
            # Policy & Regulatory Readiness Questions
            {
                'text': 'Existing government policies support satellite internet adoption in our institution',
                'dimension': 'policy_regulatory',
                'role': 'ihl',
                'order': 29
            },
            {
                'text': 'Regulatory frameworks are conducive to satellite internet service provision',
                'dimension': 'policy_regulatory',
                'role': 'both',
                'order': 30
            },
            {
                'text': 'We have clear institutional policies governing ICT use and management',
                'dimension': 'policy_regulatory',
                'role': 'ihl',
                'order': 31
            },
            {
                'text': 'Licensing and regulatory requirements are clear and achievable',
                'dimension': 'policy_regulatory',
                'role': 'isp',
                'order': 32
            },
            {
                'text': 'Government support exists for expanding internet connectivity in rural areas',
                'dimension': 'policy_regulatory',
                'role': 'both',
                'order': 33
            },
            {
                'text': 'We have data protection and privacy policies in place',
                'dimension': 'policy_regulatory',
                'role': 'both',
                'order': 34
            },
            {
                'text': 'Our organization complies with all relevant telecommunications regulations',
                'dimension': 'policy_regulatory',
                'role': 'both',
                'order': 35
            },
            {
                'text': 'We have established governance frameworks for ICT decision-making',
                'dimension': 'policy_regulatory',
                'role': 'both',
                'order': 36
            }
        ]
        
        created_count = 0
        for q_data in questions_data:
            question, created = Question.objects.get_or_create(
                text=q_data['text'],
                dimension=q_data['dimension'],
                defaults=q_data
            )
            if created:
                created_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully loaded {created_count} new questions')
        )