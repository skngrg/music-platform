import React from 'react';

interface TrackProgressProps {
    left: number;
    right: number;
    onChange: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left, right, onChange }) => {  
  return (
    <div style={{ display: 'flex' }}>
        <input 
            type="range" 
            value={left}
            min={0} 
            max={right}  
            onChange={onChange}
        />
        <div>{left} / {right}</div>
    </div>
  )
}

export default TrackProgress;