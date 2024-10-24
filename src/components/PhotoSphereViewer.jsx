import React, { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/gallery-plugin/index.css';
import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin';
import { GalleryPlugin } from '@photo-sphere-viewer/gallery-plugin';

const PhotoSphereViewer = () => {
  const viewerRef = useRef(null);
  const gunungRef = useRef(null);
  const batuRef = useRef(null);
  const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: baseUrl + 'sphere.jpg',
      caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
      loadingImg: baseUrl + 'loader.gif',
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,

      plugins: [
        [
          GalleryPlugin,
          {
            items: [
              {
                id: 'pano-1',
                name: 'Panorama 1',
                panorama:
                  'https://upload.wikimedia.org/wikipedia/commons/f/f0/Colonia_Ulpia_Traiana_-_Rekonstruktion_römischer_Schiffe-0010560.jpg',
                thumbnail:
                  'https://upload.wikimedia.org/wikipedia/commons/f/f0/Colonia_Ulpia_Traiana_-_Rekonstruktion_römischer_Schiffe-0010560.jpg',
              },
              {
                id: 'pano-2',
                name: 'Panorama 2',
                panorama: baseUrl + 'sphere.jpg',
                thumbnail: baseUrl + 'sphere.jpg',
              },
            ],
          },
        ],
        [
          MarkersPlugin,
          {
            markers: [
              {
                id: 'image',
                position: { yaw: 0.04, pitch: -0.05 },
                image: baseUrl + 'pictos/pin-blue.png',
                size: { width: 32, height: 32 },
                anchor: 'bottom center',
                zoomLvl: 100,
                tooltip: 'Ini batu?',
                content: batuRef.current?.innerHTML,
              },
              {
                id: 'image2',
                position: { yaw: -0.15, pitch: 0.18 },
                image: baseUrl + 'pictos/pin-red.png',
                size: { width: 50, height: 50 },
                anchor: 'bottom center',
                zoomLvl: 100,
                tooltip: 'Ini gunung?',
                content: gunungRef.current?.innerHTML,
              },
            ],
          },
        ],
        [
          AutorotatePlugin,
          {
            autostartDelay: 100000,
            autorotatePitch: '5deg',
          },
        ],
      ],
    });

    const markersPlugin = viewer.getPlugin(MarkersPlugin);

    const handleClick = (data) => {
      if (!data.rightclick) {
        markersPlugin.addMarker({
          id: '#' + Math.random(),
          position: { yaw: data.yaw, pitch: data.pitch },
          image: baseUrl + 'pictos/pin-red.png',
          size: { width: 32, height: 32 },
          anchor: 'bottom center',
          tooltip: 'Generated pin',
          data: {
            generated: true,
          },
        });
      }
    };

    const handleMarkerSelect = (marker) => {
      if (marker.data?.generated) {
        if (marker.doubleClick) {
          markersPlugin.removeMarker(marker);
        } else if (marker.rightClick) {
          markersPlugin.updateMarker({
            id: marker.id,
            image: baseUrl + 'pictos/pin-blue.png',
          });
        }
      }
    };

    viewer.addEventListener('click', handleClick);
    markersPlugin.addEventListener('select-marker', handleMarkerSelect);

    return () => {
      viewer.removeEventListener('click', handleClick);
      markersPlugin.removeEventListener('select-marker', handleMarkerSelect);
      viewer.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={viewerRef} style={{ height: '700px' }}>
        <div id="gunung-content" ref={gunungRef} style={{ display: 'none' }}>
          <h1>Yoi, benar gunung</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae ut
            quam eligendi recusandae autem quos omnis iure doloribus modi
            molestiae ad expedita debitis dolores eius, consectetur rem
            necessitatibus, voluptates fugit!
          </p>
        </div>

        <div id="batu-content" ref={batuRef} style={{ display: 'none' }}>
          <h1>Benar sekali</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, nam
            voluptatibus tempora quae veniam numquam fugit sunt corrupti nostrum
            ex temporibus ipsum minus harum ad impedit dignissimos soluta
            aliquam. Praesentium voluptatibus, illum fuga repellat mollitia
            veritatis quos quasi cumque impedit reprehenderit blanditiis alias
            aut saepe modi recusandae, optio, quae sunt?
          </p>
        </div>
      </div>
    </div>
  );
};

export default PhotoSphereViewer;
