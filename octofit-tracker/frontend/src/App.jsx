import { Routes, Route, NavLink } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { API_HOST } from './api';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-xl-10">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead">A modern multi-tier fitness platform for teams, activities, and progress tracking.</p>
              <div className="mb-3">
                <strong>API Host:</strong> <code>{API_HOST}</code>
              </div>
              <p className="text-muted">
                If you want to use GitHub Codespaces, define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navigation() {
  const navItem = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `nav-link ${isActive ? 'active' : 'text-secondary'}`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">OctoFit</span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            {navItem('/', 'Home')}
            {navItem('/users', 'Users')}
            {navItem('/activities', 'Activities')}
            {navItem('/teams', 'Teams')}
            {navItem('/workouts', 'Workouts')}
            {navItem('/leaderboard', 'Leaderboard')}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-vh-100 bg-light">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}
