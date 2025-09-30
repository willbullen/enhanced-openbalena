import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import AddDeviceModal from './AddDeviceModal'
import { 
  Smartphone, 
  Wifi, 
  WifiOff, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  MoreHorizontal,
  Filter,
  Plus
} from 'lucide-react'

const DevicesPage = () => {
  const [filter, setFilter] = useState('all')
  const [devices, setDevices] = useState([
    {
      id: 'rpi-001',
      name: 'Raspberry Pi 4 - Sensor Hub',
      status: 'online',
      fleet: 'IoT Sensors',
      lastSeen: '2 minutes ago',
      location: 'Building A - Floor 1',
      ip: '192.168.1.101',
      version: 'v2.1.3'
    },
    {
      id: 'rpi-002',
      name: 'Raspberry Pi 4 - Gateway',
      status: 'updating',
      fleet: 'Edge Gateways',
      lastSeen: '5 minutes ago',
      location: 'Building A - Floor 2',
      ip: '192.168.1.102',
      version: 'v2.1.2 → v2.1.3'
    },
    {
      id: 'rpi-003',
      name: 'Raspberry Pi Zero - Camera',
      status: 'offline',
      fleet: 'Security Cameras',
      lastSeen: '2 hours ago',
      location: 'Building B - Entrance',
      ip: '192.168.1.103',
      version: 'v2.1.1'
    },
    {
      id: 'rpi-004',
      name: 'Raspberry Pi 4 - Display',
      status: 'online',
      fleet: 'Digital Signage',
      lastSeen: '1 minute ago',
      location: 'Building A - Lobby',
      ip: '192.168.1.104',
      version: 'v2.1.3'
    },
    {
      id: 'rpi-005',
      name: 'Raspberry Pi 3 - Weather Station',
      status: 'issues',
      fleet: 'IoT Sensors',
      lastSeen: '30 minutes ago',
      location: 'Rooftop',
      ip: '192.168.1.105',
      version: 'v2.1.0'
    }
  ])

  const handleAddDevice = (newDevice) => {
    setDevices(prev => [...prev, newDevice])
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />
      case 'updating':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'issues':
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Smartphone className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      online: 'bg-green-100 text-green-800 border-green-200',
      offline: 'bg-red-100 text-red-800 border-red-200',
      updating: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      issues: 'bg-orange-100 text-orange-800 border-orange-200'
    }
    
    return (
      <Badge className={`${variants[status]} capitalize`}>
        {status}
      </Badge>
    )
  }

  const filteredDevices = filter === 'all' 
    ? devices 
    : devices.filter(device => device.status === filter)

  const statusCounts = {
    all: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    updating: devices.filter(d => d.status === 'updating').length,
    issues: devices.filter(d => d.status === 'issues').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Devices</h1>
          <p className="text-muted-foreground">Manage and monitor your IoT device fleet</p>
        </div>
        <AddDeviceModal onAddDevice={handleAddDevice} />
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Button
            key={status}
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status)}
            className="capitalize"
          >
            {status} ({count})
          </Button>
        ))}
      </div>

      {/* Devices Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDevices.map((device) => (
          <Card key={device.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(device.status)}
                  <CardTitle className="text-lg">{device.name}</CardTitle>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{device.id}</Badge>
                {getStatusBadge(device.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fleet:</span>
                  <span className="font-medium">{device.fleet}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Seen:</span>
                  <span className="font-medium">{device.lastSeen}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{device.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">IP Address:</span>
                  <span className="font-mono text-xs">{device.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Version:</span>
                  <span className="font-mono text-xs">{device.version}</span>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Connect
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default DevicesPage
