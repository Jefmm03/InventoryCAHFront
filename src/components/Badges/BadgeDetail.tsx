
import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

type BadgeDetailData = {
  number: number;
  department: string;
  status: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
};

const BadgeDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [badge, setBadge] = useState<BadgeDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.badgeId) {
        console.log("Fetching badge data for badgeId:", location.state.badgeId);
        try {
          const response = await fetch(`https://localhost:7283/api/Badges/Obtener/${location.state.badgeId}`);
          
          if (!response.ok) {
            throw new Error(`Failed to fetch badge data: ${response.statusText}`);
          }

          const text = await response.text();
          console.log("Raw response text:", text);

          const result = text ? JSON.parse(text) : null;
          console.log("Parsed JSON result:", result);

          if (result && typeof result === 'object') {
            setBadge(result);
          } else {
            throw new Error('Invalid badge data');
          }
        } catch (error) {
          console.error("Error fetching badge data:", error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No badge ID provided");
        setError('No badge ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (badge) {
      try {
        const response = await fetch(`https://localhost:7283/api/Badges/Eliminar/${badge.number}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete badge');
        }

        navigate('/');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (badge) {
      navigate('/badgeForm', { state: { badge } });
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    badge && (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-between mb-6">
          <button onClick={handleReturn} className="bg-gray-500 text-white px-4 py-2 rounded">
            Return
          </button>
          <div className="space-x-2">
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>

        <table className="table-auto w-full text-left">
          <tbody>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Number:</th>
              <td className="px-4 py-2">{badge.number}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Department:</th>
              <td className="px-4 py-2">{badge.department}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Status:</th>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-white ${badge.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {badge.status}
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{badge.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{badge.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{badge.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{badge.modifiedBy}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default BadgeDetail; 
/*
import React, { useEffect, useState } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';

type BadgeDetailData = {
  number: string;
  department: string;
  status: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  modifiedBy: string;
  history:{
    number: string
    department: string
    status: string
    modifiedBy: string
  }[];
};

const BadgeDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [badge, setBadge] = useState<BadgeDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (location.state && location.state.badgeId) {
        console.log("Fetching badge data for badgeId:", location.state.badgeId);
        try {
          const response = await fetch(`https://localhost:7283/api/Badges/Obtener/${location.state.badgeId}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch badge data: ${response.statusText}`);
          }

          const result = await response.json();
          console.log("Parsed JSON result:", result);

          if (result && typeof result === 'object') {
            setBadge(result);
          } else {
            throw new Error('Invalid badge data');
          }
        } catch (error) {
          console.error("Error fetching badge data:", error);
          setError(error instanceof Error ? error.message : 'An unknown error occurred');
        } finally {
          setLoading(false);
        }
      } else {
        console.error("No badge ID provided");
        setError('No badge ID provided');
        setLoading(false);
      }
    };

    fetchData();
  }, [location.state]);

  const handleDelete = async () => {
    if (badge) {
      try {
        const response = await fetch(`https://localhost:7283/api/Badges/Eliminar/${badge.number}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete badge');
        }

        navigate('/');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    }
  };

  const handleEdit = () => {
    if (badge) {
      navigate('/badgeForm', { state: { badge } });
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    badge && (
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="flex justify-between mb-6">
          <button onClick={handleReturn} className="bg-gray-500 text-white px-4 py-2 rounded">
            Return
          </button>
          <div className="space-x-2">
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>
          </div>
        </div>

        <table className="table-auto w-full text-left mb-8">
          <tbody>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Number:</th>
              <td className="px-4 py-2">{badge.number}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Department:</th>
              <td className="px-4 py-2">{badge.department}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Status:</th>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-white ${badge.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                  {badge.status}
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Comment:</th>
              <td className="px-4 py-2">{badge.comment}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Creation Date:</th>
              <td className="px-4 py-2">{badge.createdAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modification Date:</th>
              <td className="px-4 py-2">{badge.updatedAt}</td>
            </tr>
            <tr className="border-t">
              <th className="px-4 py-2 text-gray-600">Modified By:</th>
              <td className="px-4 py-2">{badge.modifiedBy}</td>
            </tr>
          </tbody>
        </table>

        {badge.history && badge.history.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">History</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Number</th>
                  <th className="border p-2">Department</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Modified By</th>
                </tr>
              </thead>
              <tbody>
                {badge.history.map((historyItem, index) => (
                  <tr key={index} className="border-t">
                    <td className="border p-2">{historyItem.number}</td>
                    <td className="border p-2">{historyItem.department}</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-white ${historyItem.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {historyItem.status}
                      </span>
                    </td>
                    <td className="border p-2">{historyItem.modifiedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  );
};

export default BadgeDetail; 
*/
