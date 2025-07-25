import React from 'react';
import './styles.css';

export const SkeletonBox = ({ width = '100%', height = '20px', className = '' }) => (
  <div 
    className={`skeleton-box ${className}`}
    style={{ width, height }}
  />
);

export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`skeleton-text-container ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <div 
        key={index} 
        className="skeleton-text-line"
        style={{ width: index === lines - 1 ? '70%' : '100%' }}
      />
    ))}
  </div>
);

export const SkeletonImage = ({ width = '100%', height = '200px', className = '' }) => (
  <div 
    className={`skeleton-image ${className}`}
    style={{ width, height }}
  />
); 