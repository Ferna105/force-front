import Image from "next/image";
import BottomNavigation from "../../components/BottomNavigation";

// Datos mockeados de mundos basados en la información de la base de datos
const worlds = [
  {
    id: 1,
    name: "Eryndor",
    description: "Eryndor es un mundo de contrastes y fuerzas primordiales. Al norte, las cumbres eternas, cubiertas de nieve, se alzan como guardianes ancestrales sobre vastos bosques verdes y lagos cristalinos que reflejan un cielo siempre cambiante. Hacia el centro, una cordillera colosal divide el continente, separando las tierras fértiles de los áridos desiertos del sur. En el este, un desgarrón de fuego y magma serpentea como una herida ardiente, recordando que la tierra está viva y en constante transformación.",
    image: "/next.svg",
    color: "blue",
    places: 7,
    type: "Mundo Principal",
    features: ["Montañas nevadas", "Bosques verdes", "Lagos cristalinos", "Desiertos áridos", "Grietas de magma"],
    status: "Activo",
    difficulty: "Moderado"
  },
  {
    id: 2,
    name: "Deo",
    description: "Deo no es solo una luna: es un enigma envuelto en piedra y metal, una construcción ciclópea orbitando en perpetuo silencio sobre Eryndor. Su superficie, árida y grisácea, imita el aspecto de un astro natural, pero la simetría de sus túneles, las estructuras que emergen entre los cráteres y los inmensos portales circulares revelan su verdadero origen: una megápolis lunar abandonada o una estación artificial disfrazada de satélite.",
    image: "/vercel.svg",
    color: "gray",
    places: 9,
    type: "Luna Artificial",
    features: ["Túneles simétricos", "Estructuras metálicas", "Portales circulares", "Cristales oscuros", "Máquinas antiguas"],
    status: "Silencioso",
    difficulty: "Alto"
  },
  {
    id: 3,
    name: "Egea",
    description: "Egea es un astro de un intenso tono carmesí, marcado por cicatrices de antiguas tormentas cósmicas y cráteres profundos que cuentan historias de impactos milenarios. Su superficie árida y polvorienta refleja el fuego interno que todavía arde bajo su corteza, visible en las fisuras que emanan un brillo anaranjado, como venas de magma en constante agitación.",
    image: "/globe.svg",
    color: "red",
    places: 3,
    type: "Luna de Fuego",
    features: ["Superficie carmesí", "Cráteres profundos", "Fisuras de magma", "Erupciones subterráneas", "Corazón ardiente"],
    status: "Inestable",
    difficulty: "Extremo"
  },
  {
    id: 4,
    name: "Koril",
    description: "Koril es una luna de tonos verdes brillantes, cubierta de un manto de minerales esmeralda y formaciones rocosas que parecen absorber la luz de las estrellas. Su superficie, marcada por grandes cráteres dorados, refleja una atmósfera misteriosa y viva, como si la luna misma respirara una energía orgánica.",
    image: "/file.svg",
    color: "green",
    places: 7,
    type: "Luna Bioluminiscente",
    features: ["Minerales esmeralda", "Cráteres dorados", "Energía orgánica", "Torres metálicas", "Criaturas cristalinas"],
    status: "Vivo",
    difficulty: "Moderado"
  }
];

// Función para obtener colores del mundo
function getWorldColors(world: typeof worlds[0]) {
  const colors = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900",
      border: "border-blue-200 dark:border-blue-700",
      text: "text-blue-800 dark:text-blue-200",
      accent: "text-blue-600 dark:text-blue-400"
    },
    gray: {
      bg: "bg-gray-100 dark:bg-gray-900",
      border: "border-gray-200 dark:border-gray-700",
      text: "text-gray-800 dark:text-gray-200",
      accent: "text-gray-600 dark:text-gray-400"
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900",
      border: "border-red-200 dark:border-red-700",
      text: "text-red-800 dark:text-red-200",
      accent: "text-red-600 dark:text-red-400"
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900",
      border: "border-green-200 dark:border-green-700",
      text: "text-green-800 dark:text-green-200",
      accent: "text-green-600 dark:text-green-400"
    }
  };
  return colors[world.color as keyof typeof colors] || colors.blue;
}

// Función para obtener color de dificultad
function getDifficultyColor(difficulty: string) {
  const colors = {
    "Fácil": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    "Moderado": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    "Alto": "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    "Extremo": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
  };
  return colors[difficulty as keyof typeof colors] || colors.Moderado;
}

// Función para obtener color de estado
function getStatusColor(status: string) {
  const colors = {
    "Activo": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    "Silencioso": "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200",
    "Inestable": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    "Vivo": "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200"
  };
  return colors[status as keyof typeof colors] || colors.Activo;
}

// Componente de tarjeta de mundo
function WorldCard({ world }: { world: typeof worlds[0] }) {
  const colors = getWorldColors(world);
  
  return (
    <article className={`${colors.bg} ${colors.border} backdrop-blur-sm rounded-2xl shadow-lg border-2 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/20 to-gray-500/20 dark:from-gray-600/20 dark:to-gray-700/20"></div>
        <Image
          src={world.image}
          alt={world.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className={`text-xs px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 font-medium ${colors.accent}`}>
            🌍 {world.type}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {world.name}
          </h3>
          <div className="flex gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(world.status)}`}>
              {world.status}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(world.difficulty)}`}>
              {world.difficulty}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {world.description}
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">Lugares descubiertos:</span>
            <span className={`text-sm font-bold ${colors.accent}`}>{world.places} lugares</span>
          </div>
          
          <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
            <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">Características principales:</span>
            <div className="flex flex-wrap gap-1">
              {world.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="text-xs bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  ✨ {feature}
                </span>
              ))}
              {world.features.length > 3 && (
                <span className="text-xs bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                  +{world.features.length - 3} más
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Explore() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-950 dark:via-pink-950 dark:to-blue-950 pb-20 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-60 left-1/2 w-12 h-12 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1500"></div>
      </div>

      {/* Header con Logo */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg border-b-2 border-purple-200 dark:border-purple-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/next.svg"
                  alt="Logo Mágico"
                  width={50}
                  height={50}
                  className="dark:invert drop-shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Explorar Mundos
                </h1>
                <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  ✨ Descubre todos los reinos ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-6 relative z-10">
        {/* Estadísticas de exploración */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-purple-200 dark:border-purple-700">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{worlds.length}</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">Mundos Descubiertos</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 text-center border-2 border-green-200 dark:border-green-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {worlds.reduce((total, world) => total + world.places, 0)}
            </div>
            <div className="text-xs text-green-600 dark:text-green-400">Lugares Totales</div>
          </div>
        </div>

        {/* Sección de mundos */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
              🌍 Mundos Disponibles 🌍
            </h2>
            <p className="text-purple-600 dark:text-purple-400 font-medium">
              Explora cada rincón de nuestro universo mágico
            </p>
          </div>
          
          {/* Grid de mundos */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {worlds.map((world) => (
              <WorldCard key={world.id} world={world} />
            ))}
          </div>
        </section>

        {/* Información adicional */}
        <section className="mt-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-200 dark:border-purple-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              💡 Consejos de Exploración
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
              <div className="space-y-2">
                <p>• <strong>Eryndor</strong> es el mundo principal, perfecto para comenzar tu aventura</p>
                <p>• <strong>Deo</strong> contiene tecnología antigua y secretos cósmicos</p>
                <p>• <strong>Egea</strong> es extremadamente peligrosa, prepárate bien</p>
              </div>
              <div className="space-y-2">
                <p>• <strong>Koril</strong> alberga criaturas bioluminiscentes únicas</p>
                <p>• Cada mundo tiene sus propios guardianes y desafíos</p>
                <p>• Los lugares se desbloquean conforme explores</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Menú de navegación inferior */}
      <BottomNavigation currentPath="/explore" />
    </div>
  );
} 