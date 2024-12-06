import { useState } from 'react';
import { Menu, X, Home, HelpCircle, History, Mail, Shield, Maximize, Cast, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Page } from '../types';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', page: 'game' },
    { icon: HelpCircle, label: 'How to Play', page: 'how-to-play' },
    { icon: History, label: 'Recent Games', page: 'history' },
    { icon: Mail, label: 'Contact Us', page: 'contact' },
    { icon: Shield, label: 'Privacy Policy', page: 'privacy' },
    { icon: Share2, label: 'Share Game', action: 'share' },
    { icon: Maximize, label: 'Toggle Fullscreen', action: 'fullscreen' },
    { icon: Cast, label: 'Cast to TV', action: 'cast' }
  ];

  const handlePageChange = (page: Page) => {
    onPageChange(page);
    setIsOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-emerald-900 shadow-lg overflow-hidden z-[100]"
          >
            <nav className="py-1">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.page && handlePageChange(item.page)}
                  className={`w-full px-4 py-2 text-left flex items-center gap-3 ${
                    currentPage === item.page
                      ? 'bg-emerald-100 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100'
                      : 'text-emerald-800 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-800/50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}