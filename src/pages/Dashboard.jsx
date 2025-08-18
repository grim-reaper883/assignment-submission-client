import { useEffect, useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import SubmissionChart from '../components/SubmissionChart';


const Dashboard = () => {
  const [statusCounts, setStatusCounts] = useState({});
  const axiosSecure = useAxiosSecure();
  
  useEffect(() => {
    axiosSecure.get("/submissions").then((res) => {
      const counts = { pending: 0, accepted: 0, rejected: 0 };
      res.data.forEach(sub => {
        const status = sub.status.toLowerCase();
        if (status === "accepted") counts.accepted++;
        else if (status === "rejected") counts.rejected++;
        else counts.pending++;
      });
      setStatusCounts(counts);
    });
  }, []);


  return (
    <div>
      <h2 className="text-5xl font-bold mb-4 text-center">Submission Status Chart</h2>
      <div>
        <SubmissionChart cl data={statusCounts} />
      </div>
    </div>
  );
};

export default Dashboard;
