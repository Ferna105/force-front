'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Tipos para los objetos del inventario
interface InventoryItem {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'material' | 'artifact';
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  icon: string;
  stats?: {
    attack?: number;
    defense?: number;
    magic?: number;
    health?: number;
  };
}

// Datos mockeados del inventario
const mockInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Espada de Hierro",
    description: "Una espada básica pero confiable para el combate.",
    type: "weapon",
    rarity: "common",
    quantity: 1,
    icon: "⚔️",
    stats: { attack: 15 }
  },
  {
    id: 2,
    name: "Armadura de Cuero",
    description: "Protección ligera pero efectiva contra ataques básicos.",
    type: "armor",
    rarity: "common",
    quantity: 1,
    icon: "🛡️",
    stats: { defense: 10 }
  },
  {
    id: 3,
    name: "Poción de Curación",
    description: "Restaura 50 puntos de salud al instante.",
    type: "potion",
    rarity: "common",
    quantity: 5,
    icon: "🧪",
    stats: { health: 50 }
  },
  {
    id: 4,
    name: "Cristal Mágico",
    description: "Material raro usado para encantamientos poderosos.",
    type: "material",
    rarity: "rare",
    quantity: 3,
    icon: "💎"
  },
  {
    id: 5,
    name: "Bastón del Arcano",
    description: "Un bastón mágico que aumenta el poder de los hechizos.",
    type: "weapon",
    rarity: "epic",
    quantity: 1,
    icon: "🔮",
    stats: { magic: 25, attack: 8 }
  },
  {
    id: 6,
    name: "Coraza de Dragón",
    description: "Armadura legendaria forjada con escamas de dragón.",
    type: "armor",
    rarity: "legendary",
    quantity: 1,
    icon: "🐉",
    stats: { defense: 35, health: 20 }
  },
  {
    id: 7,
    name: "Poción de Maná",
    description: "Restaura 30 puntos de maná para lanzar hechizos.",
    type: "potion",
    rarity: "uncommon",
    quantity: 8,
    icon: "🔵",
    stats: { magic: 30 }
  },
  {
    id: 8,
    name: "Amuleto de la Suerte",
    description: "Un artefacto místico que aumenta la fortuna del portador.",
    type: "artifact",
    rarity: "rare",
    quantity: 1,
    icon: "🍀"
  },
  {
    id: 9,
    name: "Hierro Refinado",
    description: "Material de alta calidad para forjar armas.",
    type: "material",
    rarity: "uncommon",
    quantity: 12,
    icon: "⚒️"
  },
  {
    id: 10,
    name: "Daga Venenosa",
    description: "Una daga envenenada que causa daño adicional.",
    type: "weapon",
    rarity: "rare",
    quantity: 1,
    icon: "🗡️",
    stats: { attack: 20 }
  }
];

// Función para obtener el color según la rareza
function getRarityColor(rarity: string): string {
  const colors = {
    common: 'text-gray-600 dark:text-gray-400',
    uncommon: 'text-green-600 dark:text-green-400',
    rare: 'text-blue-600 dark:text-blue-400',
    epic: 'text-purple-600 dark:text-purple-400',
    legendary: 'text-yellow-600 dark:text-yellow-400'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
}

// Función para obtener el color de fondo según la rareza
function getRarityBgColor(rarity: string): string {
  const colors = {
    common: 'bg-gray-100 dark:bg-gray-800',
    uncommon: 'bg-green-100 dark:bg-green-900/30',
    rare: 'bg-blue-100 dark:bg-blue-900/30',
    epic: 'bg-purple-100 dark:bg-purple-900/30',
    legendary: 'bg-yellow-100 dark:bg-yellow-900/30'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
}

// Función para obtener el color del borde según la rareza
function getRarityBorderColor(rarity: string): string {
  const colors = {
    common: 'border-gray-300 dark:border-gray-600',
    uncommon: 'border-green-300 dark:border-green-600',
    rare: 'border-blue-300 dark:border-blue-600',
    epic: 'border-purple-300 dark:border-purple-600',
    legendary: 'border-yellow-300 dark:border-yellow-600'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
}

// Función para obtener el nombre del tipo
function getTypeName(type: string): string {
  const types = {
    weapon: 'Arma',
    armor: 'Armadura',
    potion: 'Poción',
    material: 'Material',
    artifact: 'Artefacto'
  };
  return types[type as keyof typeof types] || type;
}

export default function InventoryPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventory);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  // Filtrar inventario
  const filteredInventory = inventory.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // No agrupar por tipo - mantener lista plana

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-purple-600 dark:text-purple-400 font-medium">
                Cargando inventario...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Se redirigirá automáticamente
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-60 left-1/2 w-12 h-12 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b-2 border-purple-200 dark:border-purple-700">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">🎒</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Inventario
                </h1>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  ✨ Objetos de {user.username} ✨
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total: {inventory.length} objetos
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-6 relative z-10">
        {/* Filtros y búsqueda */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-700 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Búsqueda */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔍 Buscar objetos
              </label>
              <input
                type="text"
                id="search"
                placeholder="Buscar por nombre o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filtro por tipo */}
            <div className="md:w-48">
              <label htmlFor="filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🏷️ Filtrar por tipo
              </label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Todos los tipos</option>
                <option value="weapon">Armas</option>
                <option value="armor">Armaduras</option>
                <option value="potion">Pociones</option>
                <option value="material">Materiales</option>
                <option value="artifact">Artefactos</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de objetos */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-200 dark:border-purple-700">
          {filteredInventory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎒</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No se encontraron objetos
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intenta cambiar los filtros o la búsqueda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredInventory.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${getRarityBgColor(item.rarity)} ${getRarityBorderColor(item.rarity)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-medium ${getRarityColor(item.rarity)}`}>
                            {item.rarity.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getTypeName(item.type)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {item.quantity > 1 && (
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  {item.stats && (
                    <div className="space-y-1">
                      {item.stats.attack && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-red-600">⚔️</span>
                          <span className="text-gray-600 dark:text-gray-400">Ataque: {item.stats.attack}</span>
                        </div>
                      )}
                      {item.stats.defense && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-blue-600">🛡️</span>
                          <span className="text-gray-600 dark:text-gray-400">Defensa: {item.stats.defense}</span>
                        </div>
                      )}
                      {item.stats.magic && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-purple-600">🔮</span>
                          <span className="text-gray-600 dark:text-gray-400">Magia: {item.stats.magic}</span>
                        </div>
                      )}
                      {item.stats.health && (
                        <div className="flex items-center gap-1 text-xs">
                          <span className="text-green-600">❤️</span>
                          <span className="text-gray-600 dark:text-gray-400">Salud: {item.stats.health}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 