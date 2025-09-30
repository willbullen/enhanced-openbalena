from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class Organization(models.Model):
    """Organization model for multi-tenancy support"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'organizations'
        ordering = ['name']
    
    def __str__(self):
        return self.name

class UserProfile(models.Model):
    """Extended user profile with organization association"""
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=[
        ('admin', 'Administrator'),
        ('developer', 'Developer'),
        ('viewer', 'Viewer'),
    ], default='developer')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"{self.user.username} - {self.organization.name}"

class Fleet(models.Model):
    """Fleet model representing a group of devices"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    slug = models.SlugField()
    description = models.TextField(blank=True)
    device_type = models.CharField(max_length=100)
    application_name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'fleets'
        unique_together = ['organization', 'slug']
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.organization.name})"
    
    @property
    def device_count(self):
        return self.devices.count()
    
    @property
    def online_device_count(self):
        return self.devices.filter(status='online').count()

class Device(models.Model):
    """Device model representing individual IoT devices"""
    STATUS_CHOICES = [
        ('online', 'Online'),
        ('offline', 'Offline'),
        ('updating', 'Updating'),
        ('provisioning', 'Provisioning'),
        ('error', 'Error'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fleet = models.ForeignKey(Fleet, on_delete=models.CASCADE, related_name='devices')
    name = models.CharField(max_length=255)
    device_id = models.CharField(max_length=100, unique=True)  # OpenBalena device ID
    uuid = models.UUIDField(unique=True)  # OpenBalena device UUID
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='offline')
    device_type = models.CharField(max_length=100)
    os_version = models.CharField(max_length=50, blank=True)
    supervisor_version = models.CharField(max_length=50, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    mac_address = models.CharField(max_length=17, blank=True)
    last_seen = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Hardware metrics
    cpu_usage = models.FloatField(null=True, blank=True)
    memory_usage = models.FloatField(null=True, blank=True)
    storage_usage = models.FloatField(null=True, blank=True)
    temperature = models.FloatField(null=True, blank=True)
    
    class Meta:
        db_table = 'devices'
        ordering = ['-last_seen', 'name']
    
    def __str__(self):
        return f"{self.name} ({self.device_id})"
    
    @property
    def is_online(self):
        if not self.last_seen:
            return False
        return (timezone.now() - self.last_seen).total_seconds() < 300  # 5 minutes
    
    def update_status(self):
        """Update device status based on last_seen timestamp"""
        if self.is_online:
            if self.status == 'offline':
                self.status = 'online'
                self.save(update_fields=['status'])
        else:
            if self.status == 'online':
                self.status = 'offline'
                self.save(update_fields=['status'])
