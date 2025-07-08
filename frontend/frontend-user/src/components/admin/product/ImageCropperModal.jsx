// frontend/components/product/ImageCropperModal.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/cropImage";
import { Slider } from "@mui/material";

const ImageCropperModal = ({ image, onComplete, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
    onComplete(croppedBlob);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[999]  flex items-center justify-center">
      <div className="bg-white p-4 rounded w-[90vw] max-w-[500px] h-[500px] flex flex-col">
        <div className="relative flex-1">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="mt-4">
          <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, val) => setZoom(val)} />
          <div className="flex justify-between mt-2">
            <button onClick={handleCrop}>Crop</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
