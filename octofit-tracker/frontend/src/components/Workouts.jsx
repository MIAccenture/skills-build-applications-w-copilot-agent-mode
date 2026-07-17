import { useEffect, useState } from 'react';
import { fetchApiList } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiList('workouts')
      .then(setWorkouts)
      .catch(() => setError('Unable to load workouts.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading workouts...</div>
      ) : workouts.length ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout.title ?? index}>
                  <td>{workout.title || '—'}</td>
                  <td>{workout.duration || '—'}</td>
                  <td>{workout.difficulty || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No workouts available.</div>
      )}
    </div>
  );
}
