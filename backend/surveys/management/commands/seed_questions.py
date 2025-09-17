# surveys/management/commands/seed_questions.py
from django.core.management.base import BaseCommand
from surveys.models import Question

class Command(BaseCommand):
    help = "Seed ISP survey questions"

    def handle(self, *args, **kwargs):
        questions = [
            # Section 2: Technical
            ("We have the required satellite ground infrastructure...", "technical"),
            ("Our technology is scalable and can handle increasing demand...", "technical"),
            ("Our organization has skilled technical personnel...", "technical"),
            ("We have SLAs and backup mechanisms...", "technical"),
            
            # Section 3: Economic
            ("Our pricing model supports both cost-recovery and affordability...", "economic"),
            ("We have access to adequate financing and investment...", "economic"),
            ("We provide differentiated service packages...", "economic"),
            ("Our financial planning includes loans, subsidies, PPPs...", "economic"),

            # Section 4: Socio-Cultural
            ("We adapt service strategies to local customs and norms...", "socio_cultural"),
            ("Our customer engagement includes digital literacy training...", "socio_cultural"),
            ("We promote equitable access for women, youth, marginalized groups...", "socio_cultural"),
            ("We consult and train local communities before deployment...", "socio_cultural"),

            # Section 5: Environmental
            ("Our installations follow environmental laws...", "environmental"),
            ("We prioritize green energy in deployments...", "environmental"),
            ("Our decommissioning minimizes ecological disruption...", "environmental"),
            ("Sustainability and climate resilience are part of planning...", "environmental"),

            # Section 6: Policy & Regulatory
            ("We are fully licensed and authorized...", "policy_regulatory"),
            ("We comply with cybersecurity, data protection, spectrum rules...", "policy_regulatory"),
            ("We engage with regulatory bodies and policy forums...", "policy_regulatory"),
            ("We have internal compliance/legal monitoring...", "policy_regulatory"),
        ]

        for text, dim in questions:
            Question.objects.get_or_create(text=text, dimension=dim, survey_type="isp")

        self.stdout.write(self.style.SUCCESS("ISP questions seeded."))
