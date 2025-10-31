// components/MemoryCard.tsx
import React from 'react';
import { Music } from 'lucide-react';
import type { MemoryCardProps } from '../types';
import Flower from './../assets/img/flor-hd.png'
import Candle from './../assets/img/vela.png'

/**
 * Tarjeta individual que muestra un recuerdo en la galería
 * Incluye foto, nombre, mensaje preview y animaciones
 */
const MemoryCard: React.FC<MemoryCardProps> = ({
    memory,
    index,
    candleMode,
    onSelect
}) => {
    return (
        <div
            className={`rounded-lg overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-slideUp border-2 ${candleMode
                ? 'bg-gradient-to-br from-gray-900 to-black border-orange-500 animate-glow'
                : 'bg-gradient-to-br from-purple-800 to-orange-800 border-yellow-500'
                }`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={onSelect}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect();
                }
            }}
            aria-label={`Ver detalles de ${memory.name}`}
        >
            {/* Imagen del recuerdo */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={memory.photoUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400'}
                    alt={memory.name}
                    className={`w-full h-full object-cover transition-all duration-1000 ${candleMode ? 'opacity-30' : 'opacity-100'
                        }`}
                    loading="lazy"
                />

                {/* Vela parpadeante (siempre visible) */}
                <div
                    className="absolute top-2 right-2 text-2xl animate-flicker w-15 h-15"
                    aria-label="Vela encendida"
                >
                    <img src={Candle} alt="candle" />
                </div>

                {/* Flor decorativa (oculta en modo vela) */}
                <div
                    className={`absolute w-15 h-15 bottom-7  left-2 text-2xl transition-opacity duration-1000 ${candleMode ? 'opacity-0' : 'opacity-100'
                        }`}
                    aria-hidden="true"
                >
                    <img src={Flower} alt="" />
                </div>
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-4">
                {/* Nombre del ser querido */}
                <h3 className={`text-md font-bold mb-2 transition-colors duration-1000 font-pixel ${candleMode ? 'text-orange-400' : 'text-yellow-300'
                    }`}>
                    {memory.name}
                </h3>

                {/* Preview del mensaje (máximo 3 líneas) */}
                <p className={`text-sm line-clamp-3 transition-colors duration-1000 font-pixel ${candleMode ? 'text-orange-300' : 'text-orange-200'
                    }`}>
                    {memory.message}
                </p>

                {/* Footer con fecha y badge de audio */}
                <div className={`mt-3 flex items-center justify-between text-xs transition-colors duration-1000 font-pixel ${candleMode ? 'text-orange-400' : 'text-yellow-400'
                    }`}>
                    <span>
                        {new Date(memory.date).toLocaleDateString('es-MX')}
                    </span>

                    {/* Indicador de que tiene audio */}
                    {memory.audioUrl && (
                        <div
                            className="flex items-center gap-1"
                            title="Este recuerdo incluye audio"
                        >
                            <Music className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MemoryCard;