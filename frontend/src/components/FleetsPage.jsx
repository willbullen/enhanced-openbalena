import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Users, 
  Smartphone, 
  CheckCircle, 
  WifiOff, 
  Clock, 
  AlertCircle,
  Plus,
  MoreHorizontal,
  Activity
} from 'lucide-react'

const FleetsPage = () => {
  const fleets = [
    {
      id: 'iot-sensors',
      name: 'IoT Sensors',
      description: 'Environmental monitoring sensors across all buildings',
      devices: {
        total: 10,
        online: 8,
        offline: 1,
        updating: 1,
        issues: 0
      },
      lastUpdate: '2 hours ago',
      version: 'v2.1.3',
      location: 'Multiple Buildings'
    },
    {
      id: 'edge-gateways',
      name: 'Edge Gateways',
      description: 'Network gateways for edge computing and data processing',
      devices: {
        total: 8,
        online: 6,
        offline: 1,
        updating: 1,
        issues: 0
      },
      lastUpdate: '5 minutes ago',
      version: 'v2.1.2',
      location: 'Building A & B'
    },
    {
      id: 'security-cameras',
      name: 'Security Cameras',
      description: 'Surveillance and monitoring camera network',
      devices: {
        total: 6,
        online: 4,
        offline: 2,
        updating: 0,
        issues: 0
      },
      lastUpdate: '1 hour ago',
      version: 'v2.1.1',
      location: 'All Entrances'
    },
    {
      id: 'digital-signage',
      name: 'Digital Signage',
      description: 'Information displays and digital signage systems',
      devices: {
        total: 4,
        online: 4,
        offline: 0,
        updating: 0,
        issues: 0
      },
      lastUpdate: '30 minutes ago',
      version: 'v2.1.3',
      location: 'Lobbies & Common Areas'
    }
  ]

  const getHealthPercentage = (devices) => {
    return Math.round((devices.online / devices.total) * 100)
  }

  const getHealthColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fleets</h1>
          <p className="text-muted-foreground">Organize and manage device collections</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Fleet
        </Button>
      </div>

      {/* Fleet Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {fleets.map((fleet) => {
          const healthPercentage = getHealthPercentage(fleet.devices)
          
          return (
            <Card key={fleet.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{fleet.name}</CardTitle>
                      <CardDescription>{fleet.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Fleet Health */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Fleet Health</span>
                    <span className={`text-sm font-bold ${getHealthColor(healthPercentage)}`}>
                      {healthPercentage}%
                    </span>
                  </div>
                  <Progress value={healthPercentage} className="h-2" />
                </div>

                {/* Device Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Online</span>
                      </div>
                      <span className="text-sm font-medium">{fleet.devices.online}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <WifiOff className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Offline</span>
                      </div>
                      <span className="text-sm font-medium">{fleet.devices.offline}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Updating</span>
                      </div>
                      <span className="text-sm font-medium">{fleet.devices.updating}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Issues</span>
                      </div>
                      <span className="text-sm font-medium">{fleet.devices.issues}</span>
                    </div>
                  </div>
                </div>

                {/* Fleet Details */}
                <div className="pt-2 border-t border-border space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Devices:</span>
                    <span className="font-medium">{fleet.devices.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{fleet.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-mono text-xs">{fleet.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Update:</span>
                    <span className="font-medium">{fleet.lastUpdate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Smartphone className="w-4 h-4 mr-2" />
                    View Devices
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Activity className="w-4 h-4 mr-2" />
                    Deploy
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default FleetsPage
