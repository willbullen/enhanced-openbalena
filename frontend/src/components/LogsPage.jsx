import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Info, 
  AlertTriangle,
  Filter,
  Download,
  RefreshCw,
  Search
} from 'lucide-react'

const LogsPage = () => {
  const [filter, setFilter] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(true)

  const logs = [
    {
      id: 1,
      timestamp: '2024-09-30 22:02:15',
      level: 'info',
      source: 'rpi-001',
      fleet: 'IoT Sensors',
      message: 'Device came online successfully',
      details: 'Connection established from 192.168.1.101'
    },
    {
      id: 2,
      timestamp: '2024-09-30 21:47:32',
      level: 'success',
      source: 'fleet-manager',
      fleet: 'IoT Sensors',
      message: 'Application update deployed successfully',
      details: 'Updated 8 devices to version v2.1.3'
    },
    {
      id: 3,
      timestamp: '2024-09-30 21:40:18',
      level: 'warning',
      source: 'rpi-002',
      fleet: 'Edge Gateways',
      message: 'Device update in progress',
      details: 'Updating from v2.1.2 to v2.1.3, estimated completion: 5 minutes'
    },
    {
      id: 4,
      timestamp: '2024-09-30 20:15:45',
      level: 'error',
      source: 'rpi-003',
      fleet: 'Security Cameras',
      message: 'Device went offline unexpectedly',
      details: 'Last heartbeat received at 20:13:22, connection timeout after 2 minutes'
    },
    {
      id: 5,
      timestamp: '2024-09-30 19:30:12',
      level: 'info',
      source: 'rpi-004',
      fleet: 'Digital Signage',
      message: 'Scheduled restart completed',
      details: 'Device restarted for maintenance window, all services restored'
    },
    {
      id: 6,
      timestamp: '2024-09-30 18:45:33',
      level: 'warning',
      source: 'rpi-005',
      fleet: 'IoT Sensors',
      message: 'High CPU usage detected',
      details: 'CPU usage at 85% for 10 minutes, investigating background processes'
    },
    {
      id: 7,
      timestamp: '2024-09-30 17:22:08',
      level: 'success',
      source: 'fleet-manager',
      fleet: 'Edge Gateways',
      message: 'Fleet health check completed',
      details: 'All 8 devices passed health verification'
    },
    {
      id: 8,
      timestamp: '2024-09-30 16:55:41',
      level: 'info',
      source: 'system',
      fleet: 'All',
      message: 'Daily backup completed',
      details: 'Device configurations and logs backed up to cloud storage'
    }
  ]

  const getLevelIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'info':
      default:
        return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getLevelBadge = (level) => {
    const variants = {
      error: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      success: 'bg-green-100 text-green-800 border-green-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200'
    }
    
    return (
      <Badge className={`${variants[level]} capitalize`}>
        {level}
      </Badge>
    )
  }

  const filteredLogs = filter === 'all' 
    ? logs 
    : logs.filter(log => log.level === filter)

  const levelCounts = {
    all: logs.length,
    error: logs.filter(l => l.level === 'error').length,
    warning: logs.filter(l => l.level === 'warning').length,
    success: logs.filter(l => l.level === 'success').length,
    info: logs.filter(l => l.level === 'info').length
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Logs</h1>
          <p className="text-muted-foreground">Monitor system events and device activity</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setAutoRefresh(!autoRefresh)}>
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            {autoRefresh ? 'Auto Refresh On' : 'Auto Refresh Off'}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logs..."
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        
        <div className="flex space-x-2">
          {Object.entries(levelCounts).map(([level, count]) => (
            <Button
              key={level}
              variant={filter === level ? "default" : "outline"}
              onClick={() => setFilter(level)}
              className="capitalize"
              size="sm"
            >
              {level} ({count})
            </Button>
          ))}
        </div>
      </div>

      {/* Logs List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>System Logs</span>
          </CardTitle>
          <CardDescription>
            Real-time system events and device activity logs
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getLevelIcon(log.level)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{log.message}</span>
                        {getLevelBadge(log.level)}
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {log.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <span>Source: <span className="font-mono">{log.source}</span></span>
                      <span>Fleet: <span className="font-medium">{log.fleet}</span></span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {log.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default LogsPage
