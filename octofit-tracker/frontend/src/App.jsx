import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="display-6 fw-bold">OctoFit Tracker</h1>
              <p className="lead">A modern multi-tier fitness platform for teams, activities, and progress tracking.</p>
              <div className="d-flex gap-2">
                <Link to="/" className="btn btn-primary">Dashboard</Link>
                <a href="http://localhost:8000/api/health" className="btn btn-outline-secondary">API Health</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
