import { Link, useLocation } from 'react-router-dom';
import { Home, Plug, Mic, BookOpen } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${currentPath === '/' ? 'active-tab' : ''}`}>
        <Home size={24} strokeWidth={2.5} />
        <span>HOME</span>
      </Link>
      
      <Link to="/appliance" className={`nav-item ${currentPath === '/appliance' ? 'active-tab' : ''}`}>
        <Plug size={24} strokeWidth={2.5} />
        <span>APPLIANCE</span>
      </Link>
      
      <Link to="/translator" className={`nav-item ${currentPath === '/translator' ? 'active-tab' : ''}`}>
        <Mic size={24} strokeWidth={2.5} />
        <span>TALK</span>
      </Link>
      
      <Link to="/ledger" className={`nav-item ${currentPath === '/ledger' ? 'active-tab' : ''}`}>
        <BookOpen size={24} strokeWidth={2.5} />
        <span>LEDGER</span>
      </Link>
    </nav>
  );
};

export default BottomNav;