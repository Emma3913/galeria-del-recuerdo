// components/MemoryForm.tsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Memory, MemoryFormProps } from '../types';

/**
 * Formulario modal para agregar un nuevo recuerdo
 * Incluye campos para nombre, mensaje, foto y audio
 */
const MemoryForm: React.FC<MemoryFormProps> = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    /**
     * Valida los campos del formulario
     */
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }

        if (!message.trim()) {
            newErrors.message = 'El mensaje es obligatorio';
        } else if (message.length > 1000) {
            newErrors.message = 'El mensaje no puede exceder 1000 caracteres';
        }

        if (photoUrl && !isValidUrl(photoUrl)) {
            newErrors.photoUrl = 'La URL de la foto no es válida';
        }

        if (audioUrl && !isValidUrl(audioUrl)) {
            newErrors.audioUrl = 'La URL del audio no es válida';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Valida si una string es una URL válida
     */
    const isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    /**
     * Maneja el envío del formulario
     */
    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        const newMemory: Memory = {
            id: `mem_${Date.now()}`,
            name: name.trim(),
            message: message.trim(),
            photoUrl: photoUrl.trim() || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400',
            audioUrl: audioUrl.trim() || undefined,
            date: new Date().toISOString()
        };

        onSave(newMemory);
    };

    return (
        <div
            className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-gradient-to-br from-purple-900 to-orange-900 rounded-lg p-8 max-w-lg w-full border-4 border-yellow-500 max-h-[90vh] overflow-y-auto">
                {/* Header del formulario */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-yellow-300 font-pixel">
                        Honra un Recuerdo
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-yellow-300 hover:text-yellow-400 transition-colors"
                        aria-label="Cerrar formulario"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Campo: Nombre */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-orange-200 mb-2 font-pixel text-sm"
                        >
                            Nombre del ser querido *
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                if (errors.name) setErrors({ ...errors, name: '' });
                            }}
                            className={`w-full px-4 py-2 rounded bg-purple-800 text-white border focus:outline-none focus:border-yellow-300 font-pixel text-sm ${errors.name ? 'border-red-500' : 'border-yellow-500'
                                }`}
                            placeholder="Ej: María López"
                            maxLength={100}
                        />
                        {errors.name && (
                            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Campo: Mensaje */}
                    <div>
                        <label
                            htmlFor="message"
                            className="block text-orange-200 mb-2 font-pixel text-sm"
                        >
                            Mensaje o dedicatoria *
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                                if (errors.message) setErrors({ ...errors, message: '' });
                            }}
                            rows={4}
                            className={`w-full px-4 py-2 rounded bg-purple-800 text-white border focus:outline-none focus:border-yellow-300 resize-none font-pixel text-sm ${errors.message ? 'border-red-500' : 'border-yellow-500'
                                }`}
                            placeholder="Comparte un recuerdo, agradecimiento o mensaje..."
                            maxLength={1000}
                        />
                        <div className="flex justify-between items-center mt-1">
                            {errors.message ? (
                                <p className="text-red-400 text-sm">{errors.message}</p>
                            ) : (
                                <span className="text-xs text-yellow-400 font-pixel text-sm">
                                    {message.length}/1000 caracteres
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Campo: URL de Foto */}
                    <div>
                        <label
                            htmlFor="photoUrl"
                            className="block text-orange-200 mb-2 font-pixel text-sm"
                        >
                            URL de foto (opcional)
                        </label>
                        <input
                            id="photoUrl"
                            type="url"
                            value={photoUrl}
                            onChange={(e) => {
                                setPhotoUrl(e.target.value);
                                if (errors.photoUrl) setErrors({ ...errors, photoUrl: '' });
                            }}
                            className={`w-full px-4 py-2 rounded bg-purple-800 text-white border focus:outline-none focus:border-yellow-300 font-pixel text-sm ${errors.photoUrl ? 'border-red-500' : 'border-yellow-500'
                                }`}
                            placeholder="https://ejemplo.com/foto.jpg"
                        />
                        {errors.photoUrl ? (
                            <p className="text-red-400 text-sm mt-1">{errors.photoUrl}</p>
                        ) : (
                            <p className="text-xs text-yellow-400 mt-1 font-pixel">
                                Si no agregas, usaremos una imagen del altar
                            </p>
                        )}
                    </div>

                    {/* Campo: URL de Audio */}
                    <div>
                        <label
                            htmlFor="audioUrl"
                            className="block text-orange-200 mb-2 font-pixel text-sm"
                        >
                            URL de audio (opcional)
                        </label>
                        <input
                            id="audioUrl"
                            type="url"
                            value={audioUrl}
                            onChange={(e) => {
                                setAudioUrl(e.target.value);
                                if (errors.audioUrl) setErrors({ ...errors, audioUrl: '' });
                            }}
                            className={`w-full px-4 py-2 rounded bg-purple-800 font-pixel text-sm text-white border focus:outline-none focus:border-yellow-300 ${errors.audioUrl ? 'border-red-500' : 'border-yellow-500'
                                }`}
                            placeholder="https://ejemplo.com/audio.mp3"
                        />
                        {errors.audioUrl ? (
                            <p className="text-red-400 text-sm mt-1">{errors.audioUrl}</p>
                        ) : (
                            <p className="text-xs text-yellow-400 mt-1 font-pixel text-sm">
                                Puedes agregar un mensaje de voz o música especial
                            </p>
                        )}
                    </div>

                    {/* Botón de envío */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 font-pixel text-sm"
                    >
                        Encender una Vela
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MemoryForm;