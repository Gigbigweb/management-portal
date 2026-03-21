import React from 'react';

const CircularProgress = ({ value }) => {
  const strokeDashoffset = 100 - value;
  
  let strokeColor = '#00acc1'; // Default (optimum)
  if (value < 40) {
    strokeColor = 'red';
  } else if (value >= 40 && value < 80) {
    strokeColor = 'orange';
  }

  return (
    <svg width="40" height="40" viewBox="0 0 36 36" className="circular-chart">
      <path
        className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#eee"
        strokeWidth="3"
      />
      <path
        className="circle"
        stroke={strokeColor}
        strokeDasharray="100, 100"
        strokeDashoffset={strokeDashoffset}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        strokeWidth="3"
        style={{ transition: 'stroke-dashoffset 0.5s' }}
      />
      <text x="18" y="22" textAnchor="middle" fontSize="8" fill="#333" fontWeight="bold">
        {value}%
      </text>
    </svg>
  );
};

export default CircularProgress;
