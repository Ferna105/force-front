'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();


  if (isLoading) {
    return (
      <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Force Front
          </Link>
          <div className="animate-pulse bg-gray-700 h-8 w-24 rounded"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Force Front
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${pathname === '/' ? 'text-blue-400' : ''
              }`}
          >
            <span>🏠</span>
            <span>Mundo</span>
          </Link>

          <Link
            href="/explore"
            className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${pathname === '/explore' ? 'text-blue-400' : ''
              }`}
          >
            <span>🔍</span>
            <span>Explorar</span>
          </Link>

          <Link
            href="/monsters"
            className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${pathname === '/monsters' ? 'text-blue-400' : ''
              }`}
          >
            <span>🐉</span>
            <span>Bestiario</span>
          </Link>

          <Link
            href="/help"
            className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${pathname === '/help' ? 'text-blue-400' : ''
              }`}
          >
            <span>❓</span>
            <span>Ayuda</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/inventory"
                className={`flex items-center space-x-1 hover:text-blue-400 transition-colors ${pathname === '/inventory' ? 'text-blue-400' : ''
                  }`}
              >
                <span>🎒</span>
                <span>Inventario</span>
              </Link>
              <span className="text-sm text-gray-300">
                Hola, {user.username}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
} 