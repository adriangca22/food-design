import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCartIcon, MenuIcon, XIcon } from 'lucide-react'
import { useCartContext } from "../context/CartContext"
import '../styles/header.css'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCartContext()

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MenúFácil
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/menus" className="hover:text-purple-200 transition">Menús</Link>
          <Link href="/pedidos" className="hover:text-purple-200 transition">Mis Pedidos</Link>
          <Link href="/contacto" className="hover:text-purple-200 transition">Contacto</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/carrito" className="hover:text-purple-200 transition relative">
            <ShoppingCartIcon className="w-6 h-6" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <nav className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/menus" className="block hover:text-purple-200 transition">Menús</Link>
            <Link href="/pedidos" className="block hover:text-purple-200 transition">Mis Pedidos</Link>
            <Link href="/contacto" className="block hover:text-purple-200 transition">Contacto</Link>
          </nav>
        </div>
      )}
    </header>
  )
}