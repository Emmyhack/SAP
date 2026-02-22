import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
  currentPage: 'home' | 'arena';
  setCurrentPage: (page: 'home' | 'arena') => void;
}

export default function Layout({ children, currentPage, setCurrentPage }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2024 Somnia Arena Passport. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
