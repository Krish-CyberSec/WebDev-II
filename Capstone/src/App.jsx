import { Suspense, lazy, createContext, useContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('./pages/Search.jsx'));
const Saved = lazy(() => import('./pages/Saved.jsx'));
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export default function App() {
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState([]);

  return (
    <AppContext.Provider value={{ saved, setSaved }}>
      <div className={dark ? 'dark' : ''}>
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
          <nav className="mx-auto flex max-w-3xl items-center gap-4 p-4">
            <Link to="/" className="font-bold">CyberPulse</Link>
            <Link to="/saved">Saved</Link>
            <button onClick={() => setDark(!dark)} className="ml-auto rounded bg-gray-900 px-3 py-1 text-white dark:bg-white dark:text-gray-900">{dark ? 'Light' : 'Dark'}</button>
          </nav>
          <main className="mx-auto max-w-3xl p-4">
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/saved" element={<Saved />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}
