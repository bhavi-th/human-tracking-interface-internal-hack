import { useState } from 'react'
import './App.css'
import VideoUploader from './VideoUploader'

function App() {
  const [trackedHumans, setTrackedHumans] = useState([
    { id: 1, activity: 'Walking', confidence: 0.95, lastSeen: '2s ago' },
    { id: 2, activity: 'Standing', confidence: 0.87, lastSeen: '5s ago' },
    { id: 3, activity: 'Running', confidence: 0.92, lastSeen: '1s ago' },
  ])

  const [coordinates, setCoordinates] = useState({
    x1: 200,
    y1: 300,
    x2: 500,
    y2: 600
  })

  const handleCoordinateChange = (field, value) => {
    setCoordinates(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }))
  }

  return (
    <div className="app-container">
      <div className="video-section">
        <h2 className="section-title">Video Feed</h2>
        <div className="video-controls">
          <label className="upload-btn">
            Upload Video
            <input type="file" accept="video/*" onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                // Handle video upload in the component itself
                const reader = new FileReader()
                reader.onload = () => {
                  // This would be handled by VideoUploader now
                }
                reader.readAsDataURL(file)
              }
            }} />
          </label>
          <div className="coordinate-inputs">
            <div className="coord-group">
              <label>Corner 1 (x1, y1):</label>
              <input
                type="number"
                value={coordinates.x1}
                onChange={(e) => handleCoordinateChange('x1', e.target.value)}
                placeholder="x1"
              />
              <input
                type="number"
                value={coordinates.y1}
                onChange={(e) => handleCoordinateChange('y1', e.target.value)}
                placeholder="y1"
              />
            </div>
            <div className="coord-group">
              <label>Corner 2 (x2, y2):</label>
              <input
                type="number"
                value={coordinates.x2}
                onChange={(e) => handleCoordinateChange('x2', e.target.value)}
                placeholder="x2"
              />
              <input
                type="number"
                value={coordinates.y2}
                onChange={(e) => handleCoordinateChange('y2', e.target.value)}
                placeholder="y2"
              />
            </div>
          </div>
        </div>
        <VideoUploader onVideoLoaded={() => {}} />
      </div>

      <div className="tracking-section">
        <h2 className="section-title">Detected Humans</h2>
        <div className="tracking-list">
          {trackedHumans.map((human) => (
            <div key={human.id} className="tracking-card">
              <div className="card-header">
                <span className="human-id">ID: {human.id}</span>
                <span className={`activity-badge ${human.activity.toLowerCase()}`}>
                  {human.activity}
                </span>
              </div>
              <div className="card-details">
                <div className="detail-item">
                  <span className="detail-label">Confidence:</span>
                  <span className="detail-value">{(human.confidence * 100).toFixed(1)}%</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Seen:</span>
                  <span className="detail-value">{human.lastSeen}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
