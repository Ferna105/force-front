interface MenuItem {
  name: string;
  icon: string;
  active: boolean;
  href: string;
}

interface BottomNavigationProps {
  currentPath: string;
}

export default function BottomNavigation({ currentPath }: BottomNavigationProps) {
  const menuItems: MenuItem[] = [
    { name: "Mundo", icon: "🏠", active: currentPath === "/", href: "/" },
    { name: "Explorar", icon: "🔍", active: currentPath === "/explore", href: "/explore" },
    { name: "Bestiario", icon: "🐉", active: currentPath === "/monsters", href: "/monsters" },
    { name: "Ayuda", icon: "❓", active: currentPath === "/help", href: "/help" },
    { name: "Mi Perfil", icon: "👤", active: currentPath === "/profile", href: "/profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-t-2 border-purple-200 dark:border-purple-700 z-50">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 transform hover:scale-110 ${
              item.active 
                ? 'text-purple-600 dark:text-purple-400' 
                : 'text-gray-500 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-300'
            }`}
          >
            <span className="text-2xl mb-1 drop-shadow-sm">{item.icon}</span>
            <span className="text-xs font-bold">{item.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
} 