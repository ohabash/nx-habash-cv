import { Header } from './components/header/Header';
import { AppRoutes } from './app.routes';
import { ThemeWrapper } from './components/layout/Theme';
import '../styles.scss';
import { AnimatePresence, easeInOut, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

export function App() {
  const isVisible = true;
  return (
    <ThemeWrapper>
      <Header />
      <main>
        <AppRoutes />
      </main>
    </ThemeWrapper>
  );
}

export default App;
