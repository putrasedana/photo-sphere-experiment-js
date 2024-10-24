import './App.css';
import PhotoSphereViewer from './components/PhotoSphereViewer';
// import VirtualTour from './components/VirtualTour';

function App() {
  return (
    <div className="app">
      <h1>360° Photo Sphere Viewer</h1>
      <PhotoSphereViewer />
      {/* <VirtualTour /> */}
    </div>
  );
}

export default App;
