import React, { useEffect, useRef, useState } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/markers-plugin/index.css';
import '@photo-sphere-viewer/compass-plugin/index.css';
import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin';
import { CompassPlugin } from '@photo-sphere-viewer/compass-plugin';

const PhotoSphereViewer = () => {
  const viewerRef = useRef(null);
  const gunungRef = useRef(null);
  const batuRef = useRef(null);
  const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';
  const markersPluginRef = useRef(null);

  const [areAllTooltipsVisible, setAllTooltipsVisible] = useState(false);

  const markerContent = `
  <div
  style="
    width: 30px;
    height: 30px;
    background-color: #00808f;
    border-radius: 30%;
    margin: auto;
    color: white;
  "
>
  <svg
    width="23"
    height="25"
    viewBox="0 0 23 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.6942 22.9167H20.6612V21.875C20.6612 21.25 20.2479 20.8333 19.6281 20.8333H18.595V10.4167H20.6612L22.7273 6.25C20.6612 6.45833 18.595 6.45833 16.5289 6.25C14.876 5 13.6364 3.75 12.3967 2.08333V1.04167C12.3967 0.416667 11.9835 0 11.3636 0C10.7438 0 10.3306 0.416667 10.3306 1.04167V2.08333C9.09091 3.75 7.85124 5 6.19835 6.25C4.13223 6.45833 2.06612 6.45833 0 6.25L2.06612 10.4167H4.13223V20.8333H3.09917C2.47934 20.8333 2.06612 21.25 2.06612 21.875V22.9167H1.03306C0.413223 22.9167 0 23.3333 0 23.9583V25H22.7273V23.9583C22.7273 23.3333 22.314 22.9167 21.6942 22.9167ZM10.3306 20.8333H6.19835V10.4167H10.3306V20.8333ZM16.5289 20.8333H12.3967V10.4167H16.5289V20.8333Z"
      fill="white"
    />
  </svg>
</div>
<div
  style="
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #00808f;
    margin: auto;
  "
></div>
<div style="display: flex; flex-direction: column-reverse; align-items: center">
  <div
    style="width: 1px; height: 40px; background-color: #fff; margin-top: 5px"
  ></div>
  <div
    style="
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      bottom: 0;
    "
  ></div>
</div>
  `;

  const customContent = `
    <div style="margin-bottom: 10px; width: 25px; height: 25px;">
      <svg viewBox="-2 -2 29 29" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="12.5" fill="gray" />
      <circle cx="12.5" cy="12.5" r="12.5" fill="none" stroke="white" stroke-width="1" />
      <text x="12.5" y="19" font-family="Arial" font-size="18" text-anchor="middle" fill="white">i</text>
      </svg>
    </div>
  `;

  useEffect(() => {
    if (!viewerRef.current) return;

    const viewer = new Viewer({
      container: viewerRef.current,
      panorama: baseUrl + 'sphere.jpg',
      caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
      loadingImg: baseUrl + 'loader.gif',
      touchmoveTwoFingers: true,
      mousewheelCtrlKey: true,
      sphereCorrection: {
        pan: '0deg',
      },

      navbar: [
        'autorotate',
        'zoom',
        'move',
        'download',
        'description',
        {
          id: 'change',
          title: 'Tooltips',
          tabbable: true,
          visible: true,
          content: customContent,
          onClick(viewer) {
            const markersPlugin = markersPluginRef.current;
            if (markersPlugin) {
              setAllTooltipsVisible((prevState) => {
                markersPlugin.getMarkers().forEach((marker) => {
                  if (prevState) {
                    markersPlugin.hideMarkerTooltip(marker.id);
                  } else {
                    markersPlugin.showMarkerTooltip(marker.id);
                  }
                });
                return !prevState;
              });
            }
          },
        },
        'markers',
        'markersList',
        'caption',
        'fullscreen',
      ],

      plugins: [
        [
          CompassPlugin,
          {
            size: '5rem',
            backgroundSvg: `
              <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="250" cy="250" r="250" fill="gray" /> 
              </svg>
            `,
          },
        ],
        [
          MarkersPlugin,
          {
            markers: [
              {
                id: 'image',
                position: { yaw: 0.04, pitch: -0.08 },
                // image: baseUrl + 'pictos/pin-blue.png',
                html: markerContent,
                size: { width: 80, height: 80 },
                anchor: 'bottom center',
                zoomLvl: 100,
                tooltip: {
                  content: 'This is marker',
                  position: 'top center',
                },
                content: batuRef.current?.innerHTML,
                data: { compass: '#0000ff' },
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
                data: { compass: '#ff0000' },
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
    markersPluginRef.current = markersPlugin;

    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div>
      <div ref={viewerRef} style={{ height: '500px' }}>
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
