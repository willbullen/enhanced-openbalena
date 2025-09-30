import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  User, 
  Shield, 
  Bell, 
  Database,
  Network,
  Save,
  RefreshCw,
  Key,
  Globe,
  Server
} from 'lucide-react'

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      deviceOffline: true,
      deploymentComplete: true,
      systemAlerts: true,
      weeklyReports: false
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      apiAccess: true
    },
    system: {
      autoUpdates: true,
      backupFrequency: 'daily',
      logRetention: 30
    }
  })

  const handleToggle = (category, setting) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }))
  }

  const settingSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your account and personal preferences',
      items: [
        { label: 'Full Name', value: 'Admin User', type: 'text' },
        { label: 'Email', value: 'admin@example.com', type: 'email' },
        { label: 'Role', value: 'Administrator', type: 'badge' },
        { label: 'Last Login', value: '2024-09-30 21:45:32', type: 'readonly' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      icon: Bell,
      description: 'Configure how and when you receive notifications',
      items: [
        { 
          label: 'Device Offline Alerts', 
          key: 'deviceOffline',
          type: 'toggle',
          description: 'Get notified when devices go offline'
        },
        { 
          label: 'Deployment Complete', 
          key: 'deploymentComplete',
          type: 'toggle',
          description: 'Notifications for successful deployments'
        },
        { 
          label: 'System Alerts', 
          key: 'systemAlerts',
          type: 'toggle',
          description: 'Critical system notifications'
        },
        { 
          label: 'Weekly Reports', 
          key: 'weeklyReports',
          type: 'toggle',
          description: 'Weekly fleet health reports'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      description: 'Manage security and access control settings',
      items: [
        { 
          label: 'Two-Factor Authentication', 
          key: 'twoFactorAuth',
          type: 'toggle',
          description: 'Add an extra layer of security'
        },
        { 
          label: 'Session Timeout (minutes)', 
          key: 'sessionTimeout',
          type: 'number',
          description: 'Automatic logout after inactivity'
        },
        { 
          label: 'API Access', 
          key: 'apiAccess',
          type: 'toggle',
          description: 'Allow API access for this account'
        }
      ]
    },
    {
      id: 'system',
      title: 'System Settings',
      icon: Database,
      description: 'Configure system-wide settings and preferences',
      items: [
        { 
          label: 'Automatic Updates', 
          key: 'autoUpdates',
          type: 'toggle',
          description: 'Automatically update system components'
        },
        { 
          label: 'Backup Frequency', 
          key: 'backupFrequency',
          type: 'select',
          options: ['hourly', 'daily', 'weekly'],
          description: 'How often to backup system data'
        },
        { 
          label: 'Log Retention (days)', 
          key: 'logRetention',
          type: 'number',
          description: 'How long to keep system logs'
        }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Server className="w-5 h-5" />
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">24</div>
              <div className="text-sm text-muted-foreground">Active Devices</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">v2.1.3</div>
              <div className="text-sm text-muted-foreground">System Version</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">2.1GB</div>
              <div className="text-sm text-muted-foreground">Storage Used</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {settingSections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <section.icon className="w-5 h-5" />
                <span>{section.title}</span>
              </CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {section.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    {item.description && (
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    )}
                  </div>
                  
                  <div className="flex-shrink-0">
                    {item.type === 'toggle' && (
                      <Button
                        variant={settings[section.id]?.[item.key] ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToggle(section.id, item.key)}
                      >
                        {settings[section.id]?.[item.key] ? 'Enabled' : 'Disabled'}
                      </Button>
                    )}
                    
                    {item.type === 'text' && (
                      <input
                        type="text"
                        defaultValue={item.value}
                        className="px-3 py-1 text-sm border border-border rounded-md bg-background"
                      />
                    )}
                    
                    {item.type === 'email' && (
                      <input
                        type="email"
                        defaultValue={item.value}
                        className="px-3 py-1 text-sm border border-border rounded-md bg-background"
                      />
                    )}
                    
                    {item.type === 'number' && (
                      <input
                        type="number"
                        defaultValue={settings[section.id]?.[item.key] || item.value}
                        className="px-3 py-1 text-sm border border-border rounded-md bg-background w-20"
                      />
                    )}
                    
                    {item.type === 'select' && (
                      <select
                        defaultValue={settings[section.id]?.[item.key] || item.options[0]}
                        className="px-3 py-1 text-sm border border-border rounded-md bg-background"
                      >
                        {item.options.map(option => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    )}
                    
                    {item.type === 'badge' && (
                      <Badge variant="secondary">{item.value}</Badge>
                    )}
                    
                    {item.type === 'readonly' && (
                      <span className="text-sm text-muted-foreground font-mono">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>API Keys</span>
          </CardTitle>
          <CardDescription>Manage API keys for external integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-md">
              <div>
                <div className="font-medium">Production API Key</div>
                <div className="text-sm text-muted-foreground font-mono">
                  ••••••••••••••••••••••••••••••••••••••••
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
                <Button variant="outline" size="sm">
                  Copy
                </Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <Key className="w-4 h-4 mr-2" />
              Generate New API Key
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage
