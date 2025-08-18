import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = {
  pending: "#4f46e5", 
  accepted: "#22c55e",
  rejected: "#ef4444",
};

const SubmissionChart = ({ data = {} }) => {
  const chartData = [
    { name: "Pending", value: data?.pending ?? 0, color: COLORS.pending },
    { name: "Accepted", value: data?.accepted ?? 0, color: COLORS.accepted },
    { name: "Rejected", value: data?.rejected ?? 0, color: COLORS.rejected },
  ];

 
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  if (total === 0) {
    return (
      <div className="text-center text-gray-400 p-6">
        No submissions data available
      </div>
    );
  }

  return (
    <div className="w-full h-[620px] flex justify-center"> 
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={240}  
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`} 
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}`, name]} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubmissionChart;
