// components/MemoryDetail.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { MemoryDetailProps } from '../types';

/**
 * Modal que muestra los detalles completos de un recuerdo
 * Incluye la foto grande, mensaje completo, audio y opción de eliminar
 */
const MemoryDetail: React.FC<MemoryDetailProps> = ({
    memory,
    candleMode,
    onClose,
    onDelete
}) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    /**
     * Formatea la fecha para mostrar
     */
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    /**
     * Maneja la confirmación de eliminación
     */
    const handleDelete = () => {
        onDelete(memory.id);
        setShowDeleteConfirm(false);
    };

    return (
        <div
            className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className={`rounded-lg max-w-2xl w-full border-4 overflow-hidden max-h-[90vh] overflow-y-auto ${candleMode
                    ? 'bg-gradient-to-br from-gray-900 to-black border-orange-500'
                    : 'bg-gradient-to-br from-purple-900 to-orange-900 border-yellow-500'
                    }`}
            >
                {/* Imagen principal */}
                <div className="relative h-64">
                    <img
                        src={memory.photoUrl}
                        alt={memory.name}
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${candleMode ? 'opacity-30' : 'opacity-100'
                            }`}
                    />

                    {/* Botón de cerrar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
                        aria-label="Cerrar detalles"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Decoraciones */}
                    <div
                        className="absolute bottom-4 left-4 text-4xl animate-flicker"
                        aria-label="Vela encendida"
                    >
                        🕯️
                    </div>
                    <div
                        className={`absolute bottom-4 right-4 text-4xl transition-opacity duration-1000 ${candleMode ? 'opacity-0' : 'opacity-100'
                            }`}
                        aria-hidden="true"
                    >
                        🌺
                    </div>
                </div>

                {/* Contenido del modal */}
                <div className="p-8">
                    {/* Nombre del ser querido */}
                    <h2 className={`text-3xl font-bold mb-4 transition-colors duration-1000 ${candleMode ? 'text-orange-400' : 'text-yellow-300'
                        }`}>
                        {memory.name}
                    </h2>

                    {/* Mensaje completo */}
                    <p className={`text-lg mb-4 whitespace-pre-wrap transition-colors duration-1000 ${candleMode ? 'text-orange-300' : 'text-orange-200'
                        }`}>
                        {memory.message}
                    </p>

                    {/* Reproductor de audio si existe */}
                    {memory.audioUrl && (
                        <div className="mb-4">
                            <h3 className={`text-sm font-semibold mb-2 transition-colors duration-1000 ${candleMode ? 'text-orange-400' : 'text-yellow-400'
                                }`}>
                                Audio del recuerdo:
                            </h3>
                            <audio
                                controls
                                className="w-full"
                                preload="metadata"
                            >
                                <source src={memory.audioUrl} />
                                Tu navegador no soporta la reproducción de audio.
                            </audio>
                        </div>
                    )}

                    {/* Fecha */}
                    <div className={`text-sm mb-6 transition-colors duration-1000 ${candleMode ? 'text-orange-400' : 'text-yellow-400'
                        }`}>
                        Recordado el {formatDate(memory.date)}
                    </div>

                    {/* Sección de eliminación */}
                    <div className="border-t border-gray-600 pt-4">
                        {!showDeleteConfirm ? (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="text-red-400 hover:text-red-300 text-sm transition-colors"
                            >
                                Eliminar recuerdo
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-orange-200 text-sm">
                                    ¿Estás seguro de que deseas eliminar este recuerdo?
                                    Esta acción no se puede deshacer.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Confirmar eliminación
                                    </button>
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemoryDetail;