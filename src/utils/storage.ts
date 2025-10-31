// utils/storage.ts
import { APP_CONSTANTS, type Memory } from '../types';

/**
 * Utilidades para interactuar con el Storage API
 * Proporciona funciones helpers para operaciones comunes
 */

/**
 * Genera una clave única para una memoria
 */
export const generateMemoryKey = (id: string): string => {
  return `${APP_CONSTANTS.STORAGE_PREFIX}${id}`;
};

/**
 * Genera un ID único para una nueva memoria
 */
export const generateMemoryId = (): string => {
  return `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Valida si un objeto tiene la estructura de Memory
 */
export const isValidMemory = (obj: any): obj is Memory => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.photoUrl === 'string' &&
    typeof obj.date === 'string' &&
    (obj.audioUrl === undefined || typeof obj.audioUrl === 'string')
  );
};

/**
 * Sanitiza una memoria antes de guardarla
 */
export const sanitizeMemory = (memory: Memory): Memory => {
  return {
    id: memory.id.trim(),
    name: memory.name.trim(),
    message: memory.message.trim(),
    photoUrl: memory.photoUrl.trim() || APP_CONSTANTS.DEFAULT_IMAGE_URL,
    audioUrl: memory.audioUrl?.trim() || undefined,
    date: memory.date,
  };
};

/**
 * Guarda una memoria en el storage
 */
export const saveMemoryToStorage = async (memory: Memory): Promise<boolean> => {
  try {
    const sanitized = sanitizeMemory(memory);
    const key = generateMemoryKey(sanitized.id);
    await window.storage.set(key, JSON.stringify(sanitized));
    return true;
  } catch (error) {
    console.error('Error al guardar memoria:', error);
    return false;
  }
};

/**
 * Carga una memoria del storage por su ID
 */
export const loadMemoryFromStorage = async (id: string): Promise<Memory | null> => {
  try {
    const key = generateMemoryKey(id);
    const result = await window.storage.get(key);
    
    if (!result) return null;
    
    const parsed = JSON.parse(result.value);
    return isValidMemory(parsed) ? parsed : null;
  } catch (error) {
    console.error(`Error al cargar memoria ${id}:`, error);
    return null;
  }
};

/**
 * Carga todas las memorias del storage
 */
export const loadAllMemoriesFromStorage = async (): Promise<Memory[]> => {
  try {
    const result = await window.storage.list(APP_CONSTANTS.STORAGE_PREFIX);
    
    if (!result || !result.keys) return [];
    
    const memories = await Promise.all(
      result.keys.map(async (key) => {
        try {
          const data = await window.storage.get(key);
          if (!data) return null;
          
          const parsed = JSON.parse(data.value);
          return isValidMemory(parsed) ? parsed : null;
        } catch {
          return null;
        }
      })
    );
    
    return memories.filter((m): m is Memory => m !== null);
  } catch (error) {
    console.error('Error al cargar todas las memorias:', error);
    return [];
  }
};

/**
 * Elimina una memoria del storage
 */
export const deleteMemoryFromStorage = async (id: string): Promise<boolean> => {
  try {
    const key = generateMemoryKey(id);
    await window.storage.delete(key);
    return true;
  } catch (error) {
    console.error(`Error al eliminar memoria ${id}:`, error);
    return false;
  }
};

/**
 * Elimina todas las memorias del storage
 */
export const clearAllMemoriesFromStorage = async (): Promise<boolean> => {
  try {
    const result = await window.storage.list(APP_CONSTANTS.STORAGE_PREFIX);
    
    if (result && result.keys) {
      await Promise.all(
        result.keys.map(key => window.storage.delete(key))
      );
    }
    
    return true;
  } catch (error) {
    console.error('Error al limpiar todas las memorias:', error);
    return false;
  }
};

/**
 * Exporta todas las memorias como JSON
 */
export const exportMemoriesToJSON = async (): Promise<string> => {
  const memories = await loadAllMemoriesFromStorage();
  return JSON.stringify(memories, null, 2);
};

/**
 * Importa memorias desde JSON
 */
export const importMemoriesFromJSON = async (jsonString: string): Promise<number> => {
  try {
    const memories = JSON.parse(jsonString);
    
    if (!Array.isArray(memories)) {
      throw new Error('El JSON debe contener un array de memorias');
    }
    
    let imported = 0;
    
    for (const memory of memories) {
      if (isValidMemory(memory)) {
        const success = await saveMemoryToStorage(memory);
        if (success) imported++;
      }
    }
    
    return imported;
  } catch (error) {
    console.error('Error al importar memorias:', error);
    return 0;
  }
};

/**
 * Obtiene el tamaño aproximado del storage usado (en bytes)
 */
export const getStorageSize = async (): Promise<number> => {
  try {
    const result = await window.storage.list(APP_CONSTANTS.STORAGE_PREFIX);
    
    if (!result || !result.keys) return 0;
    
    let totalSize = 0;
    
    for (const key of result.keys) {
      const data = await window.storage.get(key);
      if (data) {
        totalSize += new Blob([data.value]).size;
      }
    }
    
    return totalSize;
  } catch (error) {
    console.error('Error al calcular tamaño del storage:', error);
    return 0;
  }
};

/**
 * Formatea el tamaño en bytes a una cadena legible
 */
export const formatStorageSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Verifica si una URL es válida
 */
export const isValidURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Verifica si una URL apunta a una imagen válida
 */
export const isImageURL = (url: string): boolean => {
  if (!isValidURL(url)) return false;
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const lowerUrl = url.toLowerCase();
  
  return imageExtensions.some(ext => lowerUrl.includes(ext));
};

/**
 * Verifica si una URL apunta a un audio válido
 */
export const isAudioURL = (url: string): boolean => {
  if (!isValidURL(url)) return false;
  
  const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac'];
  const lowerUrl = url.toLowerCase();
  
  return audioExtensions.some(ext => lowerUrl.includes(ext));
};