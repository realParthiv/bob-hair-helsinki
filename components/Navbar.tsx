'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' }
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2)
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex items-center justify-between transition-all duration-300">
      <div className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'} bg-[#F4F4F4]/70 backdrop-blur-md -z-10`} />
      <Link href="/" className={`text-xl font-bold tracking-tighter uppercase z-50 transition-colors duration-300 ${isOpen ? 'text-[#F4F4F4]' : 'text-[#1A1A1A]'}`}>
        BOB
      </Link>



      <motion.button
        style={{ x, y }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { x.set(0); y.set(0) }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 text-[#1A1A1A]"
      >
        {isOpen ? <X size={28} className="text-[#F4F4F4]" /> : <Menu size={28} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#000000] flex flex-col items-center justify-center gap-8"
          >
            <motion.div 
              variants={container} 
              initial="hidden" 
              animate="visible" 
              className="flex flex-col gap-6 text-center"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={item}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-[clamp(3rem,8vw,6rem)] font-bold text-[#F4F4F4] hover:text-[#FF3366] transition-colors uppercase leading-none"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={item} className="mt-12">
                <a 
                  href="https://varaa.timma.fi/bobhairhelsinki" 
                  target="_blank"
                  className="text-lg font-medium text-[#FF3366] underline decoration-2 underline-offset-8"
                >
                  Book Appointment
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}