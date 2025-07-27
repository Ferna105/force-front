// Exportar el cliente API
export { default as apiClient } from './client';

// Exportar tipos
export type {
  StrapiResponse,
  StrapiEntity,
  Monster,
  World,
  Place,
  MonstersResponse,
  WorldsResponse,
  PlacesResponse,
  MonsterResponse,
  WorldResponse,
  PlaceResponse,
  QueryParams,
  ApiError
} from './types';

// Exportar servicios
export {
  monstersService,
  worldsService,
  placesService,
  dataService
} from './services'; 