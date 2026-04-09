import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import ImageWithFallback from './ImageWithFallback'

interface ImageCardProps {
  image: Image;
  width: number;
  height: number;
}

const ImageCard = ({image, width, height} : ImageCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='cursor-pointer'>
          <ImageWithFallback
            src={image.file_path} 
            alt={image.file_path} 
            className="h-full w-full rounded-[8px] bg-[#dbdbdb]"
            width={width}
            height={height}
          />
        </div>
      </DialogTrigger>
      <DialogContent className='p-0 border-0 rounded-[8px]'>
        <DialogTitle hidden={true} />
        <DialogDescription hidden={true} />
        <ImageWithFallback
          src={image.file_path}  
          alt={image.file_path} 
          className="h-full w-full rounded-[8px] bg-[#dbdbdb]"
          width={width}
          height={height}
        />                         
      </DialogContent>
    </Dialog>
  )
}

export default ImageCard