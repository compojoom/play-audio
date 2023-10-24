'use client'
import {useRef, useState} from "react";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    console.log('on play', audioRef.current)
    if (audioRef.current) {
      if(playing) {
        audioRef.current.pause()
        setPlaying(false)
      } else {
        audioRef.current.play()
        setPlaying(true)
      }
    } else {
      // Throw error
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-end p-24">

      <div className="relative flex">
        <div>
          <button onClick={play} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            {playing ? 'Stop' : 'Play'} sound
          </button>
          <audio ref={audioRef} src='sound.mp3'/>
        </div>
      </div>


    </main>
  )
}
