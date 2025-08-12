from django.http import JsonResponse

def home(request):
    return JsonResponse({"status": "ok", "app": "RAFSIA Readiness API"})
