'use client'
import {useRef, useState} from "react";

const audioFiles = [
    'magical-sound-effect.mp3',
    'Jingle-copper-bell-ding-2.mp3',
    'Jingle-guitar-riff.mp3'
]

import {Fragment} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/20/solid'

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function SoundFiles({onSelect}: { onSelect: (file: string) => void}) {
    const [selected, setSelected] = useState(audioFiles[0])
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    className="w-[250px] inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selected}
                    <ChevronDownIcon className="-mr-1 h-5 w-10 text-gray-400" aria-hidden="true"/>
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-128 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {audioFiles.map((file) => {
                                return (
                                    <Menu.Item key={file}>

                                        {({active}) => (
                                            <a
                                                href="#"
                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                onClick={() => {
                                                    setSelected(file)
                                                    onSelect(file)
                                                }}
                                            >
                                                {file}
                                            </a>
                                        )}
                                    </Menu.Item>
                                )
                            }
                        )}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}


export default function Home() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [audioFile, setAudioFile] = useState(audioFiles[0])
    const play = () => {
        if (audioRef.current) {
            if (playing) {
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
        <main className="flex min-h-screen flex-col items-center justify-end p-8">

            <div className="relative flex flex-col items-center">
                <div className={"mb-16"}>
                    <SoundFiles onSelect={(file) => {

                        setAudioFile(file)

                        audioRef.current?.pause()
                        setPlaying(false)
                    }}/>
                </div>
                <div className={"mb-64"}>
                    <button onClick={play}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-4xl w-72 h-16">
                        {playing ? 'Stop' : 'Play'} sound
                    </button>
                    <audio ref={audioRef} src={audioFile} onEnded={() => setPlaying(false)} />
                </div>
            </div>


        </main>
    )
}
