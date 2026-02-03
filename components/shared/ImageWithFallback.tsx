"use client"
import Image from 'next/image'
import React, { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  className?: string
  width: number
  height: number
  imageErrorSrc?: string
}

const ImageWithFallback = ({src, alt, className, width, height, imageErrorSrc} : ImageWithFallbackProps) => {
  const [imageSrc, setImageSrc] = useState(src);
  const imageError = imageErrorSrc ? imageErrorSrc : "/default-media-img.svg";

  return (
    <Image
      src={imageSrc} 
      alt={alt} 
      className={className}
      width={width}
      height={height}
      onError={() => setImageSrc(imageError)}
    />
  )
}

export default ImageWithFallback