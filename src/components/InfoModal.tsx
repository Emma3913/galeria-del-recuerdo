// components/InfoModal.tsx
import React from 'react';
import { X } from 'lucide-react';
import type { InfoModalProps } from '../types';

/**
 * Modal informativo que explica la tradición del Día de Muertos,
 * instrucciones de uso y la historia personal detrás de la app
 */
const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
    return (
        <div
            className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-gradient-to-br from-purple-900 to-orange-900 rounded-lg p-8 max-w-2xl w-full border-4 border-yellow-500 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-yellow-300 font-pixel">
                        Acerca de esta App
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-yellow-300 hover:text-yellow-400 transition-colors"
                        aria-label="Cerrar información"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-6 text-orange-200">
                    {/* Sección: Qué es el Día de Muertos */}
                    <section>
                        <h3 className="text-2xl font-bold text-yellow-300 mb-3 font-pixel">
                            ¿Qué es el Día de Muertos?
                        </h3>
                        <p className="leading-relaxed font-pixel text-xs">
                            El Día de Muertos es una celebración mexicana de origen prehispánico que honra a los difuntos
                            los días 1 y 2 de noviembre. Lejos de ser una celebración triste, es una fiesta llena de color,
                            amor y recuerdos donde se cree que las almas de los seres queridos regresan para estar con sus familias.
                        </p>
                    </section>

                    {/* Sección: Elementos del Altar */}
                    <section>
                        <h3 className="text-2xl font-bold text-yellow-300 mb-3 font-pixel">
                            Elementos del Altar
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <span className="text-2xl flex-shrink-0">🕯️</span>
                                <div>
                                    <strong className="text-yellow-400 font-pixel">Velas:</strong>
                                    <p className="font-pixel text-xs">Iluminan el camino de las almas hacia el altar. Su luz representa la fe y la esperanza.</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-2xl flex-shrink-0">🌼</span>
                                <div>
                                    <strong className="text-yellow-400 font-pixel">Flores de Cempasúchil:</strong>
                                    <p className="font-pixel text-xs">Su aroma intenso y color naranja brillante guían a los difuntos de regreso a casa.</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-2xl flex-shrink-0">🎨</span>
                                <div>
                                    <strong className="text-yellow-400 font-pixel">Papel Picado:</strong>
                                    <p className="font-pixel text-xs">Representa la fragilidad de la vida y añade color y alegría a la celebración.</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-2xl flex-shrink-0">📸</span>
                                <div>
                                    <strong className="text-yellow-400 font-pixel">Fotografías:</strong>
                                    <p className="font-pixel text-xs">Para recordar físicamente a nuestros seres queridos y mantener su memoria viva.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección: Cómo usar la app */}
                    <section>
                        <h3 className="text-2xl font-bold text-yellow-300 mb-3 font-pixel">
                            Cómo usar la app
                        </h3>
                        <ol className="space-y-2 list-decimal list-inside leading-relaxed font-pixel text-xs">
                            <li>
                                Haz clic en <strong>"Agregar un Recuerdo"</strong> para honrar a un ser querido
                            </li>
                            <li>
                                Llena el nombre y escribe un mensaje especial (ambos obligatorios)
                            </li>
                            <li>
                                Opcionalmente, agrega una foto (URL) o un audio (mensaje de voz o música)
                            </li>
                            <li>
                                Haz clic en cualquier tarjeta de la galería para ver los detalles completos
                            </li>
                            <li>
                                Usa el botón <strong>🌙</strong> para activar el modo "Luz de Velas" - perfecto para momentos de reflexión
                            </li>
                            <li>
                                Usa el botón <strong>🔊</strong> para reproducir música ambiental relajante
                            </li>
                            <li>
                                Usa el botón <strong>ℹ️</strong> para ver esta información nuevamente
                            </li>
                        </ol>
                    </section>

                    {/* Sección: Historia Personal */}
                    {/* <section>
                        <h3 className="text-2xl font-bold text-yellow-300 mb-3">
                            ❤️ Historia Personal
                        </h3>
                        <p className="leading-relaxed italic">
                            "Esta app nació del deseo de mantener viva la tradición del Día de Muertos en el mundo digital.
                            Cada familia tiene sus propias historias y recuerdos que merecen ser preservados. A través de
                            esta galería, queremos que cada persona pueda crear su propio altar virtual, un espacio donde
                            los recuerdos brillen eternamente como las velas en un altar tradicional."
                        </p>
                        <p className="leading-relaxed italic mt-3">
                            "Porque recordar es volver a vivir, y el amor nunca muere. Esta es una forma de honrar a
                            quienes ya no están físicamente con nosotros, pero que viven eternamente en nuestros corazones
                            y memorias."
                        </p>
                    </section> */}

                    {/* Sección: Características técnicas */}
                    {/* <section className="bg-purple-800 bg-opacity-50 p-4 rounded-lg">
                        <h3 className="text-xl font-bold text-yellow-300 mb-2">
                            ✨ Características
                        </h3>
                        <ul className="space-y-1 text-sm">
                            <li>✅ Persistencia de datos (los recuerdos se guardan automáticamente)</li>
                            <li>✅ Modo "Luz de Velas" para una experiencia más íntima</li>
                            <li>✅ Música ambiental relajante</li>
                            <li>✅ Animaciones suaves y culturalmente apropiadas</li>
                            <li>✅ Diseño responsivo (móvil, tablet, desktop)</li>
                            <li>✅ Soporte para fotos y audio</li>
                            <li>✅ Interfaz intuitiva y accesible</li>
                        </ul>
                    </section> */}

                    {/* Sección: Cita final */}
                    <section className="border-t border-yellow-500 pt-4 text-center">
                        <p className="text-lg italic text-yellow-300 font-pixel text-xs">
                            "La muerte no nos roba los seres amados. Al contrario, nos los guarda y nos los inmortaliza en el recuerdo."
                        </p>
                        <p className="text-sm text-orange-300 mt-2 font-pixel">
                            - François Mauriac
                        </p>
                    </section>
                </div>

                {/* Botón de cierre */}
                <button
                    onClick={onClose}
                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 font-pixel"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default InfoModal;