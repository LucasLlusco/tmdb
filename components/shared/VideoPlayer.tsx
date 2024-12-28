"use client"
import Image from 'next/image';
import React, { useState, useTransition } from 'react'
import YouTube from 'react-youtube';

interface YoutubeVideoProps {
  videoId: string,
  setHasLoaded: React.Dispatch<React.SetStateAction<boolean>>
}

const YoutubeVideo = ({videoId, setHasLoaded}:YoutubeVideoProps) => {
  const _onReady = () => {
    setHasLoaded(true);
    //event.target.playVideo();
  };

  return (
    <YouTube  
      videoId={videoId}
      onReady={_onReady}
      className='youtube-iframe'
      iframeClassName='youtube-iframe'
    /> 
  )
}

interface VideoPlayerProps {
  videoUrl:string
}

const VideoPlayer = ({videoUrl}:VideoPlayerProps) => {
  const [play, setPlay] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [, startTransition] = useTransition();

  return (
    <div className='videoplayer-container'>
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
            width={529}
            height={300} 
            className='h-[300px]'
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
        <YoutubeVideo videoId={videoUrl} setHasLoaded={setHasLoaded} />        
      )}
    </div>
  )
}

export default VideoPlayer
