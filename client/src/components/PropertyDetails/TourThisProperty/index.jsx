import React from 'react';
import './styles.css';

function TourThisProperty() {
  return (
    <div id='property-details-tour-this-property-container'>
      <h5>Tour This Property</h5>
      <div id='property-details-send-viewer-list'>
        <h6>
          For <strong>$49</strong>, receive a full report on this property.{' '}
        </h6>
        <p>Send a viewer to receive the following:</p>
        <ul>
          <li>Interior and exterior photos/videos</li>
          <li>Written report</li>
          <li>FaceTime call</li>
          <li>Neighborhood tour</li>
          <li>Street parking report</li>
          <li>Smell and noise level tests</li>
        </ul>
      </div>
      <button id='property-details-send-a-viewer-button'>Send a Viewer</button>
    </div>
  );
}

export default TourThisProperty;
