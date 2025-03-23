import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Example data from job_market_trends
const trendData = [
  { year: '2022', demand: 60 },
  { year: '2023', demand: 75 },
  { year: '2024', demand: 85 },
];

<LineChart width={600} height={300} data={trendData}>
  <XAxis dataKey="year" />
  <YAxis />
  <Tooltip />
  <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
  <Line type="monotone" dataKey="demand" stroke="#8884d8" />
</LineChart>
