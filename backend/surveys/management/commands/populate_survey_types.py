from django.core.management.base import BaseCommand
from surveys.models import Submission

class Command(BaseCommand):
    help = 'Populate survey_type for existing submissions'

    def handle(self, *args, **options):
        updated = 0
        
        for submission in Submission.objects.all():
            if not submission.survey_type:
                if submission.project:
                    submission.survey_type = submission.project.survey_type
                else:
                    # Default to rafsia for existing submissions
                    submission.survey_type = 'rafsia'
                
                submission.save()
                updated += 1
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully updated {updated} submissions')
        )