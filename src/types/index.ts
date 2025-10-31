/**
 * Interfaz principal para un recuerdo/memoria
 */
export interface Memory {
  id: string;
  name: string;
  
  /** Mensaje, dedicatoria o recuerdo */
  message: string;
  
  /** URL de la foto (puede ser externa o predeterminada) */
  photoUrl: string;
  
  /** URL opcional de audio (mensaje de voz o música) */
  audioUrl?: string;
  
  /** Fecha de creación en formato ISO */
  date: string;
}

/**
 * Props para el componente MemoryCard
 */
export interface MemoryCardProps {
  /** Objeto Memory a mostrar */
  memory: Memory;
  
  /** Índice en la lista para animar con delay */
  index: number;
  
  /** Si está activo el modo luz de velas */
  candleMode: boolean;
  
  /** Callback cuando se selecciona la tarjeta */
  onSelect: () => void;
}

/**
 * Props para el componente MemoryForm
 */
export interface MemoryFormProps {
  /** Callback cuando se guarda un nuevo recuerdo */
  onSave: (memory: Memory) => void;
  
  /** Callback para cerrar el formulario */
  onClose: () => void;
}

/**
 * Props para el componente MemoryDetail
 */
export interface MemoryDetailProps {
  /** Recuerdo a mostrar en detalle */
  memory: Memory;
  
  /** Si está activo el modo luz de velas */
  candleMode: boolean;
  
  /** Callback para cerrar el modal */
  onClose: () => void;
  
  /** Callback para eliminar el recuerdo */
  onDelete: (id: string) => void;
}

/**
 * Props para el componente ControlPanel
 */
export interface ControlPanelProps {
  /** Estado del modo luz de velas */
  candleMode: boolean;
  
  /** Setter para el modo luz de velas */
  setCandleMode: (value: boolean) => void;
  
  /** Estado de la música de fondo */
  musicEnabled: boolean;
  
  /** Setter para la música */
  setMusicEnabled: (value: boolean) => void;
  
  /** Callback para mostrar el modal de información */
  onShowInfo: () => void;
}

/**
 * Props para el componente InfoModal
 */
export interface InfoModalProps {
  /** Callback para cerrar el modal */
  onClose: () => void;
}

/**
 * Resultado de operaciones de almacenamiento
 */
export interface StorageResult {
  /** Si la operación fue exitosa */
  success: boolean;
  
  /** Mensaje de error si hubo alguno */
  error?: string;
  
  /** Datos retornados si los hay */
  data?: any;
}

/**
 * Configuración de animaciones
 */
export interface AnimationConfig {
  /** Duración en milisegundos */
  duration: number;
  
  /** Delay inicial en milisegundos */
  delay?: number;
  
  /** Función de easing */
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
}

/**
 * Tema de colores para modo normal y modo vela
 */
export interface ThemeColors {
  background: string;
  text: string;
  accent: string;
  border: string;
}

/**
 * Estado global de la aplicación
 */
export interface AppState {
  /** Lista de todos los recuerdos */
  memories: Memory[];
  
  /** Si se está cargando datos */
  isLoading: boolean;
  
  /** Si hay un error */
  error: string | null;
  
  /** Modo luz de velas activo */
  candleMode: boolean;
  
  /** Música de fondo activa */
  musicEnabled: boolean;
}

/**
 * Constantes de la aplicación
 */
export const APP_CONSTANTS = {
  /** Prefijo para las claves de storage */
  STORAGE_PREFIX: 'memory:',
  
  /** URL de imagen por defecto */
  DEFAULT_IMAGE_URL: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400',
  
  /** URL de música de fondo */
  BACKGROUND_MUSIC_URL: 'https://www.bensound.com/bensound-music/bensound-relaxing.mp3',
  
  /** Volumen de la música (0-1) */
  MUSIC_VOLUME: 0.3,
  
  /** Máximo de caracteres para el mensaje */
  MAX_MESSAGE_LENGTH: 1000,
  
  /** Formato de fecha para display */
  DATE_LOCALE: 'es-MX',
} as const;

/**
 * Tipos de error posibles
 */
export const ErrorType = {
  STORAGE_ERROR: 'STORAGE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUDIO_ERROR: 'AUDIO_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
} as const;

export type ErrorType = typeof ErrorType[keyof typeof ErrorType];

/**
 * Interfaz para manejo de errores
 */
export interface AppError {
  type: ErrorType;
  message: string;
  details?: any;
}

/**
 * Utilidad para validar URLs
 */
export type URLValidator = (url: string) => boolean;

/**
 * Utilidad para formatear fechas
 */
export type DateFormatter = (date: string | Date, locale?: string) => string;

/**
 * Extensión del objeto Window para incluir storage personalizado
 */
declare global {
  interface Window {
    storage: {
      set: (key: string, value: string) => Promise<void>;
      get: (key: string) => Promise<{ value: string } | null>;
      delete: (key: string) => Promise<void>;
      list: (prefix: string) => Promise<{ keys: string[] } | null>;
    };
  }
}