import React, { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

const CustomNavbar = () => {
  const viewerRef = useRef(null);
  const viewerContainerRef = useRef(null);

  useEffect(() => {
    if (viewerContainerRef.current) {
      const viewer = new Viewer({
        container: viewerContainerRef.current,
        panorama: baseUrl + 'sphere.jpg',
        caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
      });

      viewerRef.current = viewer;

      return () => {
        viewer.destroy();
      };
    }
  }, []);

  return (
    <div>
      <div
        ref={viewerContainerRef}
        style={{ width: '100%', height: '500px' }}
      ></div>
    </div>
  );
};

export default CustomNavbar;
