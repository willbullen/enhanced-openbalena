import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Smartphone } from 'lucide-react'

const AddDeviceModal = ({ onAddDevice }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    deviceType: '',
    fleet: '',
    location: '',
    description: ''
  })

  const deviceTypes = [
    { value: 'raspberry-pi-4', label: 'Raspberry Pi 4' },
    { value: 'raspberry-pi-zero', label: 'Raspberry Pi Zero' },
    { value: 'raspberry-pi-3', label: 'Raspberry Pi 3' },
    { value: 'intel-nuc', label: 'Intel NUC' },
    { value: 'nvidia-jetson', label: 'NVIDIA Jetson' },
    { value: 'generic-x86', label: 'Generic x86' }
  ]

  const fleets = [
    { value: 'iot-sensors', label: 'IoT Sensors' },
    { value: 'edge-gateways', label: 'Edge Gateways' },
    { value: 'security-cameras', label: 'Security Cameras' },
    { value: 'digital-signage', label: 'Digital Signage' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Generate a unique device ID
    const deviceId = `${formData.deviceType.split('-')[0]}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`
    
    // Create new device object
    const newDevice = {
      id: deviceId,
      name: formData.name,
      status: 'offline', // New devices start offline
      fleet: fleets.find(f => f.value === formData.fleet)?.label || formData.fleet,
      lastSeen: 'Never',
      location: formData.location,
      ip: '192.168.1.' + Math.floor(Math.random() * 200 + 50),
      version: 'v2.1.3',
      deviceType: deviceTypes.find(d => d.value === formData.deviceType)?.label || formData.deviceType,
      description: formData.description
    }

    // Call the callback function to add the device
    if (onAddDevice) {
      onAddDevice(newDevice)
    }

    // Reset form and close modal
    setFormData({
      name: '',
      deviceType: '',
      fleet: '',
      location: '',
      description: ''
    })
    setOpen(false)
  }

  const isFormValid = formData.name && formData.deviceType && formData.fleet && formData.location

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Device
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Smartphone className="w-5 h-5" />
            <span>Add New Device</span>
          </DialogTitle>
          <DialogDescription>
            Register a new device to your Enhanced OpenBalena fleet. Fill in the device details below.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Device Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Sensor Hub Alpha"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="deviceType">Device Type *</Label>
              <Select value={formData.deviceType} onValueChange={(value) => handleInputChange('deviceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select device type" />
                </SelectTrigger>
                <SelectContent>
                  {deviceTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fleet">Fleet *</Label>
              <Select value={formData.fleet} onValueChange={(value) => handleInputChange('fleet', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select fleet" />
                </SelectTrigger>
                <SelectContent>
                  {fleets.map((fleet) => (
                    <SelectItem key={fleet.value} value={fleet.value}>
                      {fleet.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="e.g., Building A - Floor 1"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Optional device description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              Add Device
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddDeviceModal
