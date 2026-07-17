import { useEffect, useState } from 'react';
import { fetchApiList } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiList('users')
      .then(setUsers)
      .catch(() => setError('Unable to load users.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading users...</div>
      ) : users.length ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.email ?? index}>
                  <td>{user.name || '—'}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.fitnessLevel || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No users available.</div>
      )}
    </div>
  );
}
