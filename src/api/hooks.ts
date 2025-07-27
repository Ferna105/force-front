'use client';
import { useState, useEffect } from 'react';
import { dataService, monstersService, worldsService, placesService } from './services';
import type { Monster, World, Place, QueryParams } from './types';

// Hook para manejar estados de carga y error
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Hook para obtener datos de la página principal
export function useHomeData() {
  const [state, setState] = useState<UseApiState<{
    monsters: Monster[];
    worlds: World[];
    places: Place[];
  }>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await dataService.getHomeData();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    };

    fetchData();
  }, []);

  return state;
}

// Hook para obtener datos de exploración
export function useExploreData() {
  const [state, setState] = useState<UseApiState<{
    worlds: World[];
  }>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await dataService.getExploreData();
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    };

    fetchData();
  }, []);

  return state;
}

// Hook para obtener monstruos
export function useMonsters(params?: QueryParams) {
  const [state, setState] = useState<UseApiState<Monster[]>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await monstersService.getAll(params);
        setState({ data: response.data, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    };

    fetchMonsters();
  }, [params]);

  return state;
}

// Hook para obtener mundos
export function useWorlds(params?: QueryParams) {
  const [state, setState] = useState<UseApiState<World[]>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchWorlds = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await worldsService.getAll(params);
        setState({ data: response.data, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    };

    fetchWorlds();
  }, [params]);

  return state;
}

// Hook para obtener lugares
export function usePlaces(params?: QueryParams) {
  const [state, setState] = useState<UseApiState<Place[]>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await placesService.getAll(params);
        setState({ data: response.data, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    };

    fetchPlaces();
  }, [params]);

  return state;
}

// Hook para obtener lugares por mundo
export function usePlacesByWorld(worldId: number, params?: QueryParams) {
  const [state, setState] = useState<UseApiState<Place[]>>({
    data: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const response = await placesService.getByWorld(worldId, params);
        setState({ data: response.data, loading: false, error: null });
      } catch (error) {
        setState({ 
          data: null, 
          loading: false, 
          error: error instanceof Error ? error.message : 'Error desconocido' 
        });
      }
    };

    if (worldId) {
      fetchPlaces();
    }
  }, [worldId, params]);

  return state;
} 