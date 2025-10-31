// hooks/useMemories.ts
import { useState, useEffect, useCallback } from 'react';
import { APP_CONSTANTS, type Memory, type StorageResult } from '../types';

/**
 * Hook personalizado para gestionar el CRUD de memorias
 * Maneja la carga, guardado, actualización y eliminación de recuerdos
 */
export const useMemories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga todas las memorias del storage al iniciar
   */
  const loadMemories = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await window.storage.list(APP_CONSTANTS.STORAGE_PREFIX);
      
      if (result && result.keys && result.keys.length > 0) {
        const loadedMemories = await Promise.all(
          result.keys.map(async (key) => {
            try {
              const data = await window.storage.get(key);
              return data ? JSON.parse(data.value) : null;
            } catch (err) {
              console.error(`Error al cargar memoria ${key}:`, err);
              return null;
            }
          })
        );
        
        // Filtrar nulos y ordenar por fecha (más recientes primero)
        const validMemories = loadedMemories
          .filter((m): m is Memory => m !== null)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setMemories(validMemories);
      } else {
        setMemories([]);
      }
    } catch (err) {
      console.error('Error al cargar memorias:', err);
      setError('No se pudieron cargar los recuerdos');
      setMemories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Guarda una nueva memoria en el storage
   */
  const saveMemory = useCallback(async (memory: Memory): Promise<StorageResult> => {
    try {
      const key = `${APP_CONSTANTS.STORAGE_PREFIX}${memory.id}`;
      await window.storage.set(key, JSON.stringify(memory));
      
      // Actualizar el estado local
      setMemories(prev => [memory, ...prev]);
      
      return { success: true, data: memory };
    } catch (err) {
      const errorMessage = 'No se pudo guardar el recuerdo';
      console.error(errorMessage, err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Actualiza una memoria existente
   */
  const updateMemory = useCallback(async (updatedMemory: Memory): Promise<StorageResult> => {
    try {
      const key = `${APP_CONSTANTS.STORAGE_PREFIX}${updatedMemory.id}`;
      await window.storage.set(key, JSON.stringify(updatedMemory));
      
      // Actualizar el estado local
      setMemories(prev => 
        prev.map(m => m.id === updatedMemory.id ? updatedMemory : m)
      );
      
      return { success: true, data: updatedMemory };
    } catch (err) {
      const errorMessage = 'No se pudo actualizar el recuerdo';
      console.error(errorMessage, err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Elimina una memoria del storage
   */
  const deleteMemory = useCallback(async (id: string): Promise<StorageResult> => {
    try {
      const key = `${APP_CONSTANTS.STORAGE_PREFIX}${id}`;
      await window.storage.delete(key);
      
      // Actualizar el estado local
      setMemories(prev => prev.filter(m => m.id !== id));
      
      return { success: true };
    } catch (err) {
      const errorMessage = 'No se pudo eliminar el recuerdo';
      console.error(errorMessage, err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Elimina todas las memorias (útil para resetear)
   */
  const clearAllMemories = useCallback(async (): Promise<StorageResult> => {
    try {
      const result = await window.storage.list(APP_CONSTANTS.STORAGE_PREFIX);
      
      if (result && result.keys) {
        await Promise.all(
          result.keys.map(key => window.storage.delete(key))
        );
      }
      
      setMemories([]);
      return { success: true };
    } catch (err) {
      const errorMessage = 'No se pudieron eliminar todos los recuerdos';
      console.error(errorMessage, err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * Busca memorias por nombre o mensaje
   */
  const searchMemories = useCallback((query: string): Memory[] => {
    if (!query.trim()) return memories;
    
    const lowerQuery = query.toLowerCase();
    return memories.filter(memory => 
      memory.name.toLowerCase().includes(lowerQuery) ||
      memory.message.toLowerCase().includes(lowerQuery)
    );
  }, [memories]);

  /**
   * Filtra memorias por año
   */
  const filterByYear = useCallback((year: number): Memory[] => {
    return memories.filter(memory => {
      const memoryYear = new Date(memory.date).getFullYear();
      return memoryYear === year;
    });
  }, [memories]);

  /**
   * Obtiene estadísticas de las memorias
   */
  const getStats = useCallback(() => {
    const totalMemories = memories.length;
    const memoriesWithAudio = memories.filter(m => m.audioUrl).length;
    const years = [...new Set(memories.map(m => new Date(m.date).getFullYear()))];
    
    return {
      total: totalMemories,
      withAudio: memoriesWithAudio,
      withoutAudio: totalMemories - memoriesWithAudio,
      years: years.sort((a, b) => b - a),
    };
  }, [memories]);

  // Cargar memorias al montar el componente
  useEffect(() => {
    loadMemories();
  }, [loadMemories]);

  return {
    // Estado
    memories,
    isLoading,
    error,
    
    // Acciones
    loadMemories,
    saveMemory,
    updateMemory,
    deleteMemory,
    clearAllMemories,
    
    // Utilidades
    searchMemories,
    filterByYear,
    getStats,
  };
};

export default useMemories;