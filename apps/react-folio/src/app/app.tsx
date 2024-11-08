import { Header } from './components/header/Header';
import { AppRoutes } from './app.routes';
import { ThemeWrapper } from './components/layout/Theme';
import '../styles.scss';

export function App() {
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
