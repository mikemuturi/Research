from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Create default users for RAFSIA system'
    
    def handle(self, *args, **options):
        # Create admin user
        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_superuser(
                username='admin',
                email='admin@rafsia.org',
                password='admin123',
                first_name='Admin',
                last_name='User'
            )
            self.stdout.write(
                self.style.SUCCESS(f'Created admin user: {admin_user.username}')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Admin user already exists')
            )
        
        # Create regular user
        if not User.objects.filter(username='user').exists():
            regular_user = User.objects.create_user(
                username='user',
                email='user@example.com',
                password='password',
                first_name='John',
                last_name='Doe'
            )
            self.stdout.write(
                self.style.SUCCESS(f'Created regular user: {regular_user.username}')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Regular user already exists')
            )
        
        self.stdout.write(
            self.style.SUCCESS('User creation completed!')
        )