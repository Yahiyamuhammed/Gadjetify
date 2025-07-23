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
    <div className="fixed inset-0 z-[999] bg-black/60 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[90vw] max-w-[500px] h-[500px] flex flex-col p-4">
        <div className="relative flex-1 rounded overflow-hidden bg-gray-100">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            aspect={4/5} 
            showGrid={true}
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-medium">Zoom</label>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, val) => setZoom(val)}
          />

          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleCrop}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCropperModal;
