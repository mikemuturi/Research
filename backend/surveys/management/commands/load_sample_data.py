from datetime import date
from django.core.management.base import BaseCommand
from django.db import transaction
from django.contrib.auth import get_user_model
from surveys.models import Question, Institution, Project

class Command(BaseCommand):
    help = "Load RAFSIA sample data (superuser, institutions, projects, questions). Safe to re-run."

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

        # --- Projects ---
        projects_data = [
            {
                "name": "RAFSIA Readiness Assessment",
                "description": "Baseline readiness assessment for satellite internet adoption in Kenya",
                "start_date": date(2025, 1, 1),
                "survey_type": "rafsia"
            },
            {
                "name": "ISP Service Provider Assessment",
                "description": "Assessment for Internet Service Providers on satellite internet readiness",
                "start_date": date(2025, 1, 1),
                "survey_type": "isp"
            }
        ]

        project_created = 0
        for proj_data in projects_data:
            project, created = Project.objects.get_or_create(
                name=proj_data["name"],
                defaults=proj_data
            )
            project_created += 1 if created else 0
            self.stdout.write(
                self.style.SUCCESS(f"Created project: {project.name}") if created 
                else f"Project already exists: {project.name}"
            )
        
        self.stdout.write(self.style.SUCCESS(f"Projects created this run: {project_created}"))

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

        # RAFSIA Assessment Questions (Original)
        rafsia_questions = [
            # TECHNICAL
            {"text": "Our institution has adequate ICT infrastructure (servers, networking equipment, etc.) to support satellite internet connectivity", "dimension": "technical", "role": "ihl", "survey_type": "rafsia", "order": 1},
            {"text": "We have reliable and consistent power supply to support continuous internet connectivity operations", "dimension": "technical", "role": "both", "survey_type": "rafsia", "order": 2},
            {"text": "Our technical staff possess adequate skills and training to manage satellite internet connectivity systems", "dimension": "technical", "role": "both", "survey_type": "rafsia", "order": 3},
            {"text": "We have sufficient end-user devices (computers, tablets, smartphones) to effectively utilize satellite internet services", "dimension": "technical", "role": "ihl", "survey_type": "rafsia", "order": 4},
            {"text": "Our organization has the technical capacity and expertise to provide reliable satellite internet services", "dimension": "technical", "role": "isp", "survey_type": "rafsia", "order": 5},
            {"text": "We have backup power systems (generators, UPS, solar) to ensure uninterrupted internet connectivity", "dimension": "technical", "role": "both", "survey_type": "rafsia", "order": 6},
            {"text": "Our current network infrastructure can be easily integrated with satellite internet technology", "dimension": "technical", "role": "both", "survey_type": "rafsia", "order": 7},
            {"text": "We have adequate technical support and maintenance capabilities for satellite internet equipment", "dimension": "technical", "role": "both", "survey_type": "rafsia", "order": 8},

            # ECONOMIC
            {"text": "Our institution can afford the initial setup costs associated with satellite internet connectivity", "dimension": "economic", "role": "ihl", "survey_type": "rafsia", "order": 9},
            {"text": "We have sustainable funding mechanisms in place for ongoing ICT infrastructure development and maintenance", "dimension": "economic", "role": "both", "survey_type": "rafsia", "order": 10},
            {"text": "The cost of satellite internet services is affordable and competitive for our target market", "dimension": "economic", "role": "isp", "survey_type": "rafsia", "order": 11},
            {"text": "We have adequate budget allocation specifically for ICT services, maintenance, and regular upgrades", "dimension": "economic", "role": "both", "survey_type": "rafsia", "order": 12},
            {"text": "Our economic model and revenue streams support the long-term sustainability of internet services", "dimension": "economic", "role": "both", "survey_type": "rafsia", "order": 13},
            {"text": "We can secure financing or investment for satellite internet infrastructure development", "dimension": "economic", "role": "both", "survey_type": "rafsia", "order": 14},
            {"text": "The return on investment for satellite internet adoption is justified by expected benefits", "dimension": "economic", "role": "both", "survey_type": "rafsia", "order": 15},
            {"text": "We have cost-sharing mechanisms or partnerships to reduce the financial burden of internet adoption", "dimension": "economic", "role": "both", "survey_type": "rafsia", "order": 16},

            # SOCIO-CULTURAL
            {"text": "Our staff, students, and stakeholders are willing and eager to adopt new internet technologies", "dimension": "socio_cultural", "role": "ihl", "survey_type": "rafsia", "order": 17},
            {"text": "The community we serve is ready to embrace and utilize satellite internet technology", "dimension": "socio_cultural", "role": "both", "survey_type": "rafsia", "order": 18},
            {"text": "We have effective programs and initiatives to promote digital literacy among our users", "dimension": "socio_cultural", "role": "both", "survey_type": "rafsia", "order": 19},
            {"text": "Cultural factors and traditions in our region support the adoption of new communication technologies", "dimension": "socio_cultural", "role": "both", "survey_type": "rafsia", "order": 20},
            {"text": "Our target customers have sufficient digital skills and knowledge to use internet services effectively", "dimension": "socio_cultural", "role": "isp", "survey_type": "rafsia", "order": 21},
            {"text": "There is strong community support and acceptance for expanding internet connectivity in our area", "dimension": "socio_cultural", "role": "both", "survey_type": "rafsia", "order": 22},
            {"text": "We provide adequate training and support to help users adapt to new internet technologies", "dimension": "socio_cultural", "role": "both", "survey_type": "rafsia", "order": 23},
            {"text": "Language and communication barriers do not significantly hinder internet technology adoption", "dimension": "socio_cultural", "role": "both", "survey_type": "rafsia", "order": 24},

            # ENVIRONMENTAL
            {"text": "Our institution actively considers environmental impact when making ICT infrastructure decisions", "dimension": "environmental", "role": "ihl", "survey_type": "rafsia", "order": 25},
            {"text": "We have established policies and practices that promote environmentally sustainable ICT operations", "dimension": "environmental", "role": "both", "survey_type": "rafsia", "order": 26},
            {"text": "Our operations and service delivery minimize negative environmental impacts and carbon footprint", "dimension": "environmental", "role": "both", "survey_type": "rafsia", "order": 27},
            {"text": "We actively promote and utilize renewable energy sources for our ICT operations and infrastructure", "dimension": "environmental", "role": "both", "survey_type": "rafsia", "order": 28},
            {"text": "Environmental regulations and requirements support our satellite internet operations and expansion", "dimension": "environmental", "role": "isp", "survey_type": "rafsia", "order": 29},
            {"text": "We have implemented green ICT practices such as energy-efficient equipment and e-waste management", "dimension": "environmental", "role": "both", "survey_type": "rafsia", "order": 30},
            {"text": "Our satellite internet infrastructure is designed to be environmentally sustainable and eco-friendly", "dimension": "environmental", "role": "both", "survey_type": "rafsia", "order": 31},
            {"text": "We conduct environmental impact assessments for our ICT projects and infrastructure development", "dimension": "environmental", "role": "both", "survey_type": "rafsia", "order": 32},

            # POLICY & REGULATORY
            {"text": "Existing government policies and regulations support satellite internet adoption in our institution", "dimension": "policy_regulatory", "role": "ihl", "survey_type": "rafsia", "order": 33},
            {"text": "Current regulatory frameworks are conducive to satellite internet service provision and operations", "dimension": "policy_regulatory", "role": "both", "survey_type": "rafsia", "order": 34},
            {"text": "We have clear and comprehensive institutional policies governing ICT use, management, and security", "dimension": "policy_regulatory", "role": "ihl", "survey_type": "rafsia", "order": 35},
            {"text": "Licensing requirements and regulatory compliance procedures are clear, achievable, and well-defined", "dimension": "policy_regulatory", "role": "isp", "survey_type": "rafsia", "order": 36},
            {"text": "Government support and initiatives exist for expanding internet connectivity in rural and underserved areas", "dimension": "policy_regulatory", "role": "both", "survey_type": "rafsia", "order": 37},
            {"text": "We have established data protection and privacy policies that comply with national and international standards", "dimension": "policy_regulatory", "role": "both", "survey_type": "rafsia", "order": 38},
            {"text": "Regulatory authorities provide adequate support and guidance for satellite internet service providers", "dimension": "policy_regulatory", "role": "isp", "survey_type": "rafsia", "order": 39},
            {"text": "Our institutional governance structures support effective ICT policy implementation and compliance", "dimension": "policy_regulatory", "role": "both", "survey_type": "rafsia", "order": 40},
        ]

        # ISP Service Provider Questions (New)
        isp_questions = [
            # TECHNICAL READINESS
            {"text": "Our institution has robust ICT infrastructure including data centers and network equipment to support satellite internet", "dimension": "technical", "role": "isp", "survey_type": "isp", "order": 1},
            {"text": "Our technical staff are adequately skilled in managing and maintaining satellite-based internet systems", "dimension": "technical", "role": "isp", "survey_type": "isp", "order": 2},
            {"text": "We can easily integrate satellite internet with our existing ICT systems without major challenges", "dimension": "technical", "role": "isp", "survey_type": "isp", "order": 3},
            {"text": "We have reliable backup power systems and redundancy measures for continuous operations", "dimension": "technical", "role": "isp", "survey_type": "isp", "order": 4},
            {"text": "Our current network infrastructure supports high-capacity satellite internet deployment", "dimension": "technical", "role": "isp", "survey_type": "isp", "order": 5},

            # ECONOMIC AND FINANCIAL READINESS
            {"text": "Our institution has sufficient financial capacity to acquire and maintain satellite internet infrastructure", "dimension": "economic", "role": "isp", "survey_type": "isp", "order": 6},
            {"text": "We have existing budget allocations and funding opportunities for satellite-based internet solutions", "dimension": "economic", "role": "isp", "survey_type": "isp", "order": 7},
            {"text": "The cost-benefit analysis supports our decision to adopt satellite internet services", "dimension": "economic", "role": "isp", "survey_type": "isp", "order": 8},
            {"text": "We have sustainable revenue models to support long-term satellite internet operations", "dimension": "economic", "role": "isp", "survey_type": "isp", "order": 9},
            {"text": "Financing options and investment opportunities are available for satellite internet expansion", "dimension": "economic", "role": "isp", "survey_type": "isp", "order": 10},

            # POLICY AND REGULATORY READINESS
            {"text": "Our institutional policies fully support the adoption of satellite internet technology", "dimension": "policy_regulatory", "role": "isp", "survey_type": "isp", "order": 11},
            {"text": "We are fully compliant with regulatory requirements from CAK and NEMA for satellite internet deployment", "dimension": "policy_regulatory", "role": "isp", "survey_type": "isp", "order": 12},
            {"text": "We have active collaborations with government and private sector bodies for satellite internet adoption", "dimension": "policy_regulatory", "role": "isp", "survey_type": "isp", "order": 13},
            {"text": "Licensing procedures and regulatory compliance processes are clear and manageable for our organization", "dimension": "policy_regulatory", "role": "isp", "survey_type": "isp", "order": 14},
            {"text": "Government policies actively support satellite internet service providers in Kenya", "dimension": "policy_regulatory", "role": "isp", "survey_type": "isp", "order": 15},

            # SOCIO-CULTURAL READINESS
            {"text": "Students, faculty, and administrators have positive perceptions about satellite internet technology", "dimension": "socio_cultural", "role": "isp", "survey_type": "isp", "order": 16},
            {"text": "Stakeholders have minimal concerns about privacy, health, or security related to satellite-based internet", "dimension": "socio_cultural", "role": "isp", "survey_type": "isp", "order": 17},
            {"text": "Our institutional culture strongly supports adoption of new and emerging ICT technologies", "dimension": "socio_cultural", "role": "isp", "survey_type": "isp", "order": 18},
            {"text": "Our target market demonstrates high acceptance of satellite internet technology", "dimension": "socio_cultural", "role": "isp", "survey_type": "isp", "order": 19},
            {"text": "Digital literacy levels among our users are sufficient for effective satellite internet utilization", "dimension": "socio_cultural", "role": "isp", "survey_type": "isp", "order": 20},

            # ENVIRONMENTAL READINESS
            {"text": "Our physical environment and geography are highly suitable for satellite equipment installation", "dimension": "environmental", "role": "isp", "survey_type": "isp", "order": 21},
            {"text": "We have conducted comprehensive environmental assessments for satellite infrastructure development", "dimension": "environmental", "role": "isp", "survey_type": "isp", "order": 22},
            {"text": "Environmental factors such as weather and terrain pose minimal challenges to satellite infrastructure", "dimension": "environmental", "role": "isp", "survey_type": "isp", "order": 23},
            {"text": "Our sustainability policies effectively guide ICT infrastructure development decisions", "dimension": "environmental", "role": "isp", "survey_type": "isp", "order": 24},
            {"text": "We have implemented comprehensive measures to minimize environmental impact of our operations", "dimension": "environmental", "role": "isp", "survey_type": "isp", "order": 25},

            # STRATEGIC AND FUTURE OUTLOOK
            {"text": "Satellite internet is well-integrated into our strategic plan for digital transformation", "dimension": "strategic", "role": "isp", "survey_type": "isp", "order": 26},
            {"text": "We see satellite internet as crucial for bridging digital gaps in remote areas we serve", "dimension": "strategic", "role": "isp", "survey_type": "isp", "order": 27},
            {"text": "We have identified and can implement critical success factors for satellite internet adoption", "dimension": "strategic", "role": "isp", "survey_type": "isp", "order": 28},
            {"text": "Our long-term vision includes significant expansion of satellite internet services", "dimension": "strategic", "role": "isp", "survey_type": "isp", "order": 29},
            {"text": "We are prepared to be leaders in satellite internet adoption in Kenya's higher education sector", "dimension": "strategic", "role": "isp", "survey_type": "isp", "order": 30},
        ]

        # Combine all questions
        all_questions = rafsia_questions + isp_questions

        created, updated = 0, 0
        for q in all_questions:
            # Use text + survey_type as unique identifier
            obj, was_created = Question.objects.update_or_create(
                text=q["text"],
                survey_type=q["survey_type"],
                defaults=q,
            )
            created += 1 if was_created else 0
            updated += 0 if was_created else 1

        total = Question.objects.count()
        self.stdout.write(self.style.SUCCESS(f"Questions created: {created}, updated: {updated}, total now: {total}"))

        # Report by survey type and dimension
        for survey_type in ["rafsia", "isp"]:
            survey_count = Question.objects.filter(survey_type=survey_type).count()
            self.stdout.write(f"\n{survey_type.upper()} Survey - Total Questions: {survey_count}")
            
            if survey_type == "rafsia":
                dimensions = ["technical", "economic", "socio_cultural", "environmental", "policy_regulatory"]
            else:
                dimensions = ["technical", "economic", "policy_regulatory", "socio_cultural", "environmental", "strategic"]
            
            for dim in dimensions:
                cnt = Question.objects.filter(dimension=dim, survey_type=survey_type).count()
                self.stdout.write(f"  • {dim.replace('_',' ').title()}: {cnt}")