import { Outlet } from 'react-router-dom'
import Header from './Header'

// Layout partagé par toutes les routes : Header fixe en haut + zone de contenu
// qui change via <Outlet/> selon la route active.
export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
