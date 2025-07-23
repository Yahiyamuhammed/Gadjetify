import React, { useState, useRef } from 'react';
import './ImageZoom.css';

const ProductImageZoom = ({
  src,
  alt = "Product",
  zoomScale = 2,
  zoomContainerWidth = 400,
  zoomContainerHeight = 400,
  className = ""
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageRef.current || !wrapperRef.current) return;

    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // Calculate relative position within the image
    const x = Math.max(0, Math.min(100, ((e.clientX - imageRect.left) / imageRect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - imageRect.top) / imageRect.height) * 100));
    
    setPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div 
      className={`image-zoom-wrapper ${className}`}
      ref={wrapperRef}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="main-image-container"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="main-image"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      {isHovering && (
        <div
          className="zoom-container"
          style={{
            width: `${zoomContainerWidth}px`,
            height: `${zoomContainerHeight}px`,
          }}
        >
          <div
            className="zoomed-image"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoomScale * 100}%`,
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProductImageZoom;