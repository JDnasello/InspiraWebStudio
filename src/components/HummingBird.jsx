import "@google/model-viewer"
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const HummingBird = ({ colibriRef }) => {
  const [modelConfig, setModelConfig] = useState(null);

  useEffect(() => {
    const fetchModelData = async () => {
      try {
        const response = await fetch("hummingBird.json");
        if (!response.ok) {
          throw new Error("Failed to fetch model data");
        }
        const data = await response.json();
        setModelConfig(data);
      } catch (error) {
        console.error("Error loading model configuration:", error);
      }
    };

    fetchModelData();
  }, [])

  if (!modelConfig) {
    return <div style={{color: '#fff'}}>Loading model...</div>;
  }

  return (
      <model-viewer
      ref={colibriRef}
      src={modelConfig.src}
      ar={modelConfig.ar}
      ar-modes={modelConfig.arModes.join(" ")}
      camera-controls={modelConfig.cameraControls}
      tone-mapping={modelConfig.toneMapping}
      shadow-intensity={modelConfig.shadowIntensity}
      environment-image={modelConfig.environmentImage}
      shadow-softness={modelConfig.shadowSoftness}
      exposure={modelConfig.exposure}
      auto-rotate={modelConfig.autoRotate}
      disable-zoom={modelConfig.disableZoom}
      camera-orbit={modelConfig.cameraOrbit}
      id={modelConfig.id}
    ></model-viewer>
  );
};

export default HummingBird;
