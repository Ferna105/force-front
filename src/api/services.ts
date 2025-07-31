import apiClient from './client';
import {
  MonstersResponse,
  WorldsResponse,
  PlacesResponse,
  MonsterResponse,
  WorldResponse,
  PlaceResponse,
  QueryParams,
  Monster,
  World,
  Place,
} from './types';

// Función helper para construir query parameters
function buildQueryParams(params: QueryParams = {}): string {
  const searchParams = new URLSearchParams();

  if (params.populate) {
    if (Array.isArray(params.populate)) {
      params.populate.forEach(item => searchParams.append('populate', item));
    } else {
      searchParams.append('populate', params.populate);
    }
  }

  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach(item => searchParams.append('sort', item));
    } else {
      searchParams.append('sort', params.sort);
    }
  }

  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      searchParams.append(`filters[${key}]`, value.toString());
    });
  }

  if (params.pagination) {
    if (params.pagination.page) {
      searchParams.append('pagination[page]', params.pagination.page.toString());
    }
    if (params.pagination.pageSize) {
      searchParams.append('pagination[pageSize]', params.pagination.pageSize.toString());
    }
  }

  if (params.fields) {
    params.fields.forEach(field => searchParams.append('fields', field));
  }

  return searchParams.toString();
}

// Servicio para Monstruos
export const monstersService = {
  // Obtener todos los monstruos
  async getAll(params?: QueryParams): Promise<MonstersResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/monsters?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching monsters: ${error}`);
    }
  },

  // Obtener un monstruo por ID
  async getById(id: number, params?: QueryParams): Promise<MonsterResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/monsters/${id}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching monster ${id}: ${error}`);
    }
  },

  // Crear un nuevo monstruo
  async create(data: Monster): Promise<MonstersResponse> {
    try {
      const response = await apiClient.post('/monsters', { data });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating monster: ${error}`);
    }
  },

  // Actualizar un monstruo
  async update(id: number, data: Monster): Promise<MonstersResponse> {
    try {
      const response = await apiClient.put(`/monsters/${id}`, { data });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating monster ${id}: ${error}`);
    }
  },

  // Eliminar un monstruo
  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/monsters/${id}`);
    } catch (error) {
      throw new Error(`Error deleting monster ${id}: ${error}`);
    }
  }
};

// Servicio para Mundos
export const worldsService = {
  // Obtener todos los mundos
  async getAll(params?: QueryParams): Promise<WorldsResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/worlds?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching worlds: ${error}`);
    }
  },

  // Obtener un mundo por ID
  async getById(id: number, params?: QueryParams): Promise<WorldResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/worlds/${id}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching world ${id}: ${error}`);
    }
  },

  // Crear un nuevo mundo
  async create(data: World): Promise<WorldsResponse> {
    try {
      const response = await apiClient.post('/worlds', { data });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating world: ${error}`);
    }
  },

  // Actualizar un mundo
  async update(id: number, data: World): Promise<WorldsResponse> {
    try {
      const response = await apiClient.put(`/worlds/${id}`, { data });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating world ${id}: ${error}`);
    }
  },

  // Eliminar un mundo
  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/worlds/${id}`);
    } catch (error) {
      throw new Error(`Error deleting world ${id}: ${error}`);
    }
  }
};

// Servicio para Lugares
export const placesService = {
  // Obtener todos los lugares
  async getAll(params?: QueryParams): Promise<PlacesResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/places?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching places: ${error}`);
    }
  },

  // Obtener un lugar por ID
  async getById(id: number, params?: QueryParams): Promise<PlaceResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/places/${id}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching place ${id}: ${error}`);
    }
  },

  // Obtener lugares por mundo
  async getByWorld(worldId: number, params?: QueryParams): Promise<PlacesResponse> {
    try {
      const queryString = buildQueryParams(params);
      const response = await apiClient.get(`/places?filters[world]=${worldId}&${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching places for world ${worldId}: ${error}`);
    }
  },

  // Crear un nuevo lugar
  async create(data: Place): Promise<PlacesResponse> {
    try {
      const response = await apiClient.post('/places', { data });
      return response.data;
    } catch (error) {
      throw new Error(`Error creating place: ${error}`);
    }
  },

  // Actualizar un lugar
  async update(id: number, data: Place): Promise<PlacesResponse> {
    try {
      const response = await apiClient.put(`/places/${id}`, { data });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating place ${id}: ${error}`);
    }
  },

  // Eliminar un lugar
  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/places/${id}`);
    } catch (error) {
      throw new Error(`Error deleting place ${id}: ${error}`);
    }
  }
};

// Servicio general para obtener todos los datos necesarios
export const dataService = {
  // Obtener todos los datos para la página principal
  async getHomeData() {
    try {
      const [monsters, worlds, places] = await Promise.all([
        monstersService.getAll({ populate: '*' }),
        worldsService.getAll({ populate: '*' }),
        placesService.getAll({ populate: '*' })
      ]);

      return {
        monsters: monsters.data || [],
        worlds: worlds.data || [],
        places: places.data || []
      };
    } catch (error) {
      console.error('Error fetching home data:', error);
      return {
        monsters: [],
        worlds: [],
        places: []
      };
    }
  },

  // Obtener datos para la página de exploración
  async getExploreData() {
    try {
      const worlds = await worldsService.getAll({
        populate: '*',
        sort: 'Name:asc'
      });

      return {
        worlds: worlds.data || []
      };
    } catch (error) {
      console.error('Error fetching explore data:', error);
      return {
        worlds: []
      };
    }
  }
}; 