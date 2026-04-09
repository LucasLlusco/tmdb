"use client"
import Image from 'next/image';
import React, { useState, useTransition } from 'react'
import YouTube from 'react-youtube';

interface YoutubeVideoProps {
  videoId: string;
  setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

const YoutubeVideo = ({videoId, setHasLoaded, className}:YoutubeVideoProps) => {
  const _onReady = () => {
    setHasLoaded(true);
    //event.target.playVideo();
  };

  return (
    <YouTube  
      videoId={videoId}
      onReady={_onReady}
      className={className}
      iframeClassName={className}
    /> 
  )
}

interface VideoPlayerProps {
  videoUrl: string;
  width: number;
  height: number;
  className?: string;
}

const VideoPlayer = ({videoUrl, width, height, className} : VideoPlayerProps) => {
  const [play, setPlay] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [, startTransition] = useTransition();

  return (
    <div className={`videoplayer-container ${className}`}>
      {(!play || !hasLoaded) && (
        <button 
          className='thumbnail-button'
          onClick={() => {
            startTransition(() => {
              setPlay(true)
            });
          }}
        >     
          <Image
            src={`https://img.youtube.com/vi/${videoUrl}/hqdefault.jpg`}
            alt={"Thumbnail"} 
            width={width}
            height={height}
            className={className}
            loading='lazy'
          />
          <Image 
            src={"/youtube-play-icon.svg"}
            alt={"Play video"} 
            width={60}
            height={42} 
            className="play-icon"
            loading='lazy'
          />
        </button>
      )}
      {play && ( 
        <YoutubeVideo 
          videoId={videoUrl} 
          setHasLoaded={setHasLoaded} 
          className={className}
        />        
      )}
    </div>
  )
}

export default VideoPlayer
