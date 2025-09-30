import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Smartphone, 
  Users, 
  Activity, 
  Download,
  Wifi,
  WifiOff,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react'

const DashboardOverview = () => {
  const navigate = useNavigate()
  const stats = [
    {
      title: 'Total Devices',
      value: '24',
      change: '+2',
      changeType: 'positive',
      icon: Smartphone,
      description: 'Active devices in fleet'
    },
    {
      title: 'Online Devices',
      value: '18',
      change: '75%',
      changeType: 'positive',
      icon: Wifi,
      description: 'Currently connected'
    },
    {
      title: 'Active Fleets',
      value: '3',
      change: '+1',
      changeType: 'positive',
      icon: Users,
      description: 'Managed fleets'
    },
    {
      title: 'Updates Today',
      value: '12',
      change: '-3',
      changeType: 'negative',
      icon: Download,
      description: 'Successful deployments'
    }
  ]

  const recentDevices = [
    {
      id: 'rpi-001',
      name: 'Raspberry Pi 4 - Sensor Hub',
      status: 'online',
      fleet: 'IoT Sensors',
      lastSeen: '2 minutes ago',
      cpu: 45,
      memory: 62,
      temperature: 42
    },
    {
      id: 'rpi-002',
      name: 'Raspberry Pi 4 - Gateway',
      status: 'updating',
      fleet: 'Edge Gateways',
      lastSeen: '5 minutes ago',
      cpu: 78,
      memory: 55,
      temperature: 38
    },
    {
      id: 'rpi-003',
      name: 'Raspberry Pi Zero - Camera',
      status: 'offline',
      fleet: 'Security Cameras',
      lastSeen: '2 hours ago',
      cpu: 0,
      memory: 0,
      temperature: 0
    },
    {
      id: 'rpi-004',
      name: 'Raspberry Pi 4 - Display',
      status: 'online',
      fleet: 'Digital Signage',
      lastSeen: '1 minute ago',
      cpu: 23,
      memory: 41,
      temperature: 35
    }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />
      case 'updating':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      online: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      offline: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      updating: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    }
    
    return (
      <Badge className={variants[status] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage your IoT device fleet
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {stat.changeType === 'positive' ? (
                  <TrendingUp className="w-3 h-3 text-green-500" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-500" />
                )}
                <span className={stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
                  {stat.change}
                </span>
                <span>from last week</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Devices */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Devices</CardTitle>
              <CardDescription>
                Latest activity from your device fleet
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/devices')}>
              View All
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDevices.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(device.status)}
                    <div>
                      <h4 className="font-medium text-foreground">{device.name}</h4>
                      <p className="text-sm text-muted-foreground">{device.id}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block">
                    {getStatusBadge(device.status)}
                  </div>
                  
                  <div className="hidden lg:block text-sm text-muted-foreground">
                    Fleet: {device.fleet}
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  {device.status === 'online' && (
                    <>
                      <div className="hidden xl:flex items-center space-x-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">CPU:</span>
                          <span className="ml-1 font-medium">{device.cpu}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Memory:</span>
                          <span className="ml-1 font-medium">{device.memory}%</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Temp:</span>
                          <span className="ml-1 font-medium">{device.temperature}°C</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div className="text-sm text-muted-foreground">
                    {device.lastSeen}
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fleet Health</CardTitle>
            <CardDescription>
              Overall status of your device fleets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>IoT Sensors</span>
                <span>8/10 online</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Edge Gateways</span>
                <span>6/8 online</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Security Cameras</span>
                <span>4/6 online</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest events and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Device rpi-001 came online</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Application update deployed to IoT Sensors fleet</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Device rpi-002 started updating</p>
                  <p className="text-xs text-muted-foreground">22 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Device rpi-003 went offline</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardOverview
