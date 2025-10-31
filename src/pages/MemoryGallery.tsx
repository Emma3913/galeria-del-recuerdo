import React, { useState, useEffect } from 'react';
import { Upload, Music, X, Heart, Flame, Moon, Sun, Volume2, VolumeX, Info } from 'lucide-react';
import MemoryForm from '../components/MemoryForm';
import MemoryCard from '../components/MemoryCard';
import MemoryDetail from '../components/MemoryDetail';
import InfoModal from '../components/InfoModal';
import ControlPanel from '../components/ControlPanel';
import Flor from '../assets/img/flor-hd.png'

interface Memory {
    id: string;
    name: string;
    message: string;
    photoUrl: string;
    audioUrl?: string;
    date: string;
}

export default function MemoryGallery() {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [candleMode, setCandleMode] = useState(false);
    const [musicEnabled, setMusicEnabled] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        loadMemories();
        const audio = new Audio('https://www.bensound.com/bensound-music/bensound-relaxing.mp3');
        audio.loop = true;
        audio.volume = 0.3;
        setAudioElement(audio);
        return () => {
            if (audio) {
                audio.pause();
                audio.src = '';
            }
        };
    }, []);

    useEffect(() => {
        if (audioElement) {
            if (musicEnabled) {
                audioElement.play().catch(e => console.log('Error playing audio:', e));
            } else {
                audioElement.pause();
            }
        }
    }, [musicEnabled, audioElement]);

    const loadMemories = async () => {
        try {
            const result = await window.storage.list('memory:');
            if (result && result.keys) {
                const loadedMemories = await Promise.all(
                    result.keys.map(async (key) => {
                        const data = await window.storage.get(key);
                        return data ? JSON.parse(data.value) : null;
                    })
                );
                setMemories(loadedMemories.filter(m => m !== null));
            }
        } catch (error) {
            console.log('No hay memorias previas');
        }
        setIsLoading(false);
    };

    const saveMemory = async (memory: Memory) => {
        try {
            // await window.storage.set(`memory:${memory.id}`, JSON.stringify(memory));
            setMemories([...memories, memory]);
            setShowForm(false);
        } catch (error) {
            console.error('Error al guardar:', error);
            alert('Error al guardar el recuerdo. Por favor intenta nuevamente.');
        }
    };

    const deleteMemory = async (id: string) => {
        try {
            await window.storage.delete(`memory:${id}`);
            setMemories(memories.filter(m => m.id !== id));
            setSelectedMemory(null);
        } catch (error) {
            console.error('Error al eliminar:', error);
        }
    };

    return (
        <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${candleMode
            ? 'bg-black'
            : 'bg-gradient-to-br from-purple-900 via-orange-900 to-yellow-900'
            }`}>
            <div className={`absolute top-0 left-0 right-0 h-full bg-gradient-to-r from-pink-500 via-yellow-500 to-green-500 transition-opacity duration-1000 ${candleMode ? 'opacity-0' : 'opacity-30 animate-pulse'
                }`}></div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute text-4xl animate-float transition-opacity duration-1000 ${candleMode ? 'opacity-0' : 'opacity-100'
                            }`}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${8 + Math.random() * 4}s`
                        }}
                    >
                        <img src={Flor} alt="flor" />
                    </div>
                ))}
            </div>

            <ControlPanel
                candleMode={candleMode}
                setCandleMode={setCandleMode}
                musicEnabled={musicEnabled}
                setMusicEnabled={setMusicEnabled}
                onShowInfo={() => setShowInfo(true)}
            />

            <div className="relative z-10 container mx-auto px-4 py-8">
                <header className="text-center mb-12 animate-fadeIn">
                    <h1 className={`text-6xl font-bold mb-4 drop-shadow-lg px-10 transition-colors duration-1000 font-pixel ${candleMode ? 'text-orange-400' : 'text-yellow-300'}`} >
                        {/* 💀 Galería del Recuerdo 💀 */}
                        Galería del Recuerdo
                    </h1>
                    <p className={`text-xl font-pixel max-w-2xl mx-auto mb-4 transition-colors duration-1000 ${candleMode ? 'text-orange-300' : 'text-orange-200'
                        }`}>
                        El Día de Muertos es una celebración para honrar a quienes ya no están con nosotros.
                        Aquí, sus recuerdos brillan eternamente como las velas en un altar.
                    </p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-orange-500 font-pixel hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
                    >
                        {/* <Heart className="w-5 h-5" /> */}
                        Agregar un Recuerdo
                    </button>
                </header>

                {isLoading ? (
                    <div className={`text-center text-2xl transition-colors duration-1000 ${candleMode ? 'text-orange-400' : 'text-yellow-300'
                        }`}>
                        Encendiendo las velas... 🕯️
                    </div>
                ) : (
                    <>
                        {memories.length === 0 ? (
                            <div className={`text-center text-xl mt-20 transition-colors duration-1000 font-pixel ${candleMode ? 'text-orange-300' : 'text-orange-200'
                                }`}>
                                <p className="mb-4 font-pixel">Aún no hay recuerdos en el altar</p>
                                <p>Sé el primero en honrar a un ser querido</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {memories.map((memory, index) => (
                                    <MemoryCard
                                        key={memory.id}
                                        memory={memory}
                                        index={index}
                                        candleMode={candleMode}
                                        onSelect={() => setSelectedMemory(memory)}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>

            {showForm && (
                <MemoryForm
                    onSave={saveMemory}
                    onClose={() => setShowForm(false)}
                />
            )}

            {selectedMemory && (
                <MemoryDetail
                    memory={selectedMemory}
                    candleMode={candleMode}
                    onClose={() => setSelectedMemory(null)}
                    onDelete={deleteMemory}
                />
            )}

            {showInfo && (
                <InfoModal onClose={() => setShowInfo(false)} />
            )}

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 165, 0, 0.5); }
          50% { box-shadow: 0 0 40px rgba(255, 165, 0, 0.8); }
        }
        .animate-float { animation: float infinite ease-in-out; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out; }
        .animate-flicker { animation: flicker 2s infinite; }
        .animate-glow { animation: glow 2s infinite; }
      `}</style>
        </div>
    );
}