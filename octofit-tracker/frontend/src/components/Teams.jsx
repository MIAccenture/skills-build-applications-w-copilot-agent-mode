import { useEffect, useState } from 'react';
import { fetchApiList } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiList('teams')
      .then(setTeams)
      .catch(() => setError('Unable to load teams.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading teams...</div>
      ) : teams.length ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Members</th>
                <th>Goal</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team.name ?? index}>
                  <td>{team.name || '—'}</td>
                  <td>{team.members ?? '—'}</td>
                  <td>{team.goal || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No teams available.</div>
      )}
    </div>
  );
}
