import { useEffect, useState } from 'react';
import { fetchApiList } from '../api';

const ACTIVITIES_ENDPOINT = '/api/activities/';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApiList(ACTIVITIES_ENDPOINT)
      .then(setActivities)
      .catch(() => setError('Unable to load activities.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading activities...</div>
      ) : activities.length ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={index}>
                  <td>{activity.type || '—'}</td>
                  <td>{activity.duration || '—'}</td>
                  <td>{activity.calories ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning">No activities available.</div>
      )}
    </div>
  );
}
