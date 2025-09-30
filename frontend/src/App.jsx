import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout'
import DashboardOverview from './components/DashboardOverview'
import DevicesPage from './components/DevicesPage'
import FleetsPage from './components/FleetsPage'
import LogsPage from './components/LogsPage'
import SettingsPage from './components/SettingsPage'
import './App.css'

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/devices" element={<DevicesPage />} />
          <Route path="/fleets" element={<FleetsPage />} />
          <Route path="/logs" element={<LogsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </DashboardLayout>
    </Router>
  )
}

export default App
