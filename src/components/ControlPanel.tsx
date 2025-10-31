import React from 'react';
import { Moon, Sun, Volume2, VolumeX, Info } from 'lucide-react';
import type { ControlPanelProps } from '../types';

/**
 * Panel de control flotante con botones para:
 * - Modo luz de velas
 * - Música de fondo
 * - Información de la app
 */
const ControlPanel: React.FC<ControlPanelProps> = ({
    candleMode,
    setCandleMode,
    musicEnabled,
    setMusicEnabled,
    onShowInfo,
}) => {
    return (
        <div className="fixed top-20 right-4 z-50 flex flex-col gap-3">
            {/* Botón Modo Luz de Velas */}
            <button
                onClick={() => setCandleMode(!candleMode)}
                className={`p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ${candleMode
                    ? 'bg-orange-500 text-white animate-glow'
                    : 'bg-purple-600 text-yellow-300'
                    }`}
                title={candleMode ? "Modo normal" : "Modo luz de velas"}
                aria-label={candleMode ? "Desactivar modo luz de velas" : "Activar modo luz de velas"}
            >
                {candleMode ? (
                    <Sun className="w-6 h-6" />
                ) : (
                    <Moon className="w-6 h-6" />
                )}
            </button>

            {/* Botón de Música */}
            <button
                onClick={() => setMusicEnabled(!musicEnabled)}
                className={`p-3 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300 ${musicEnabled
                    ? 'bg-orange-500 text-white'
                    : 'bg-purple-600 text-yellow-300'
                    }`}
                title={musicEnabled ? "Silenciar música" : "Reproducir música"}
                aria-label={musicEnabled ? "Silenciar música de fondo" : "Reproducir música de fondo"}
            >
                {musicEnabled ? (
                    <Volume2 className="w-6 h-6" />
                ) : (
                    <VolumeX className="w-6 h-6" />
                )}
            </button>

            {/* Botón de Información */}
            <button
                onClick={onShowInfo}
                className="p-3 rounded-full bg-purple-600 text-yellow-300 shadow-lg transform hover:scale-110 transition-all duration-300"
                title="Acerca de esta app"
                aria-label="Mostrar información sobre la aplicación"
            >
                <Info className="w-6 h-6" />
            </button>
        </div>
    );
};

export default ControlPanel;