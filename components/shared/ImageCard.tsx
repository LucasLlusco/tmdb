import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import ImageWithFallback from './ImageWithFallback'

interface ImageCardProps {
  src: string;
  width: number;
  height: number;
  className?: string;
}

const ImageCard = ({src, width, height, className} : ImageCardProps) => {
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={`cursor-pointer ${className} w-[${width}px] h-[${height}px]`}>
          <ImageWithFallback
            src={src} 
            alt={src} 
            className={`${className} rounded-[8px] bg-[#dbdbdb] hover:opacity-80 transition-opacity` }
            width={width}
            height={height}
          />
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 border-0 rounded-[8px]'>
        <DialogTitle hidden={true} />
        <DialogDescription hidden={true} />
        <ImageWithFallback
          src={src}  
          alt={src} 
          className="h-full w-full rounded-[8px] bg-[#dbdbdb]"
          width={width}
          height={height}
        />                         
      </DialogContent>
    </Dialog>
  )
}

export default ImageCard