import { useEffect, useState } from 'react';
import { fetchApiList } from '../api';

const LEADERBOARD_ENDPOINT = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : '/api/leaderboard/';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiList(LEADERBOARD_ENDPOINT)
      .then(setItems)
      .catch(() => setError('Unable to load leaderboard.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading leaderboard...</div>
      ) : items.length ? (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row, index) => (
                <tr key={row.rank ?? index}>
                  <td>{row.rank ?? '—'}</td>
                  <td>{row.name || '—'}</td>
                  <td>{row.points ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No leaderboard entries available.</div>
      )}
    </div>
  );
}
