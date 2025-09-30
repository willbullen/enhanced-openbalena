from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from rest_framework import viewsets, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from devices.models import Device, Fleet, Organization
from django.db.models import Count, Q
from django.utils import timezone
from datetime import timedelta
import json

def dashboard_view(request):
    """Main dashboard view"""
    return render(request, 'dashboard/index.html')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    """API endpoint for dashboard statistics"""
    try:
        # Get user's organization
        user_profile = request.user.userprofile
        organization = user_profile.organization
        
        # Get all devices for the organization
        devices = Device.objects.filter(fleet__organization=organization)
        
        # Calculate statistics
        total_devices = devices.count()
        online_devices = devices.filter(status='online').count()
        offline_devices = devices.filter(status='offline').count()
        updating_devices = devices.filter(status='updating').count()
        
        # Get fleets count
        fleets = Fleet.objects.filter(organization=organization)
        total_fleets = fleets.count()
        
        # Calculate updates today
        today = timezone.now().date()
        updates_today = devices.filter(
            updated_at__date=today,
            status='online'
        ).count()
        
        # Get recent devices (last 10)
        recent_devices = devices.order_by('-last_seen')[:10]
        recent_devices_data = []
        
        for device in recent_devices:
            recent_devices_data.append({
                'id': str(device.id),
                'name': device.name,
                'device_id': device.device_id,
                'status': device.status,
                'fleet': device.fleet.name,
                'last_seen': device.last_seen.isoformat() if device.last_seen else None,
                'cpu_usage': device.cpu_usage,
                'memory_usage': device.memory_usage,
                'temperature': device.temperature,
            })
        
        return Response({
            'stats': {
                'total_devices': total_devices,
                'online_devices': online_devices,
                'offline_devices': offline_devices,
                'updating_devices': updating_devices,
                'total_fleets': total_fleets,
                'updates_today': updates_today,
            },
            'recent_devices': recent_devices_data,
        })
        
    except Exception as e:
        return Response(
            {'error': str(e)}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
