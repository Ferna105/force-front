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
  ApiError,
  AuthUser,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  AuthError
} from './types';

// Exportar servicios
export {
  monstersService,
  worldsService,
  placesService,
  dataService,
  authService
} from './services';

// Exportar hooks
export {
  useHomeData,
  useExploreData,
  useMonsters,
  useWorlds,
  usePlaces,
  usePlacesByWorld,
  useLogin,
  useRegister,
  useGetMe
} from './hooks'; 