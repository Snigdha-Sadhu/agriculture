import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, BarChart, Bar, ResponsiveContainer } from "recharts";
import SimpleCropTrend from "./SimpleCropTrend";
// Change this to your backend base URL
const API_BASE = "http://localhost:5000/api/analytics";

export default function FertilizerAnalytics() {
  const [fertilizerTrend, setFertilizerTrend] = useState([]);
  const [cropTrend, setCropTrend] = useState([]);
  const [soilTrend, setSoilTrend] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [f1, f2, f3] = await Promise.all([
          fetch(`${API_BASE}/farmer/fertilizertrend`).then(r => r.json()),
        fetch(`${API_BASE}/farmer/croptrend`).then(r => r.json()),
          fetch(`${API_BASE}/farmer/soiltrend`).then(r => r.json()),
          
        ]);
console.log("f2 data",f2.data)
        // Format Fertilizer Trend
        const formattedFertilizer = f1.data.map(item => ({
          date: `${item._id.month}/${item._id.year}`,
          Organic: item.organicCount,
          Chemical: item.chemicalCount,
          Total: item.total,
        }));

        // Format Crop Trend (Top crop per month)
        const formattedCrop = f2.data.map(item => ({
          date: `${item._id.month}/${item._id.year}`,
          crop: item._id.crop,
          count: item.count,
        }));

        // Format Soil Trend
        const formattedSoil = f3.data.map(item => ({
          date: `${item._id.month}/${item._id.year}`,
          soil: item._id.soil,
          avgSoilHealth: item.avgSoilHealth,
        
         
        }));

        setFertilizerTrend(formattedFertilizer);
        setCropTrend(f2.data);
        setSoilTrend(formattedSoil);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading analytics...</p>;

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">🌱 Smart Agriculture Analytics</h1>

      {/* Fertilizer Usage Trend */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Fertilizer Usage Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={fertilizerTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Organic" />
            <Line type="monotone" dataKey="Chemical" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Crop Trend */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Crop Usage Trend</h2>
       <SimpleCropTrend data={cropTrend} />

        <p className="text-sm text-gray-600 mt-2">Represents frequency of crops recommended/used per month</p>
      </div>

      {/* Soil Sustainability Trend */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-semibold mb-4">Soil Sustainability Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={soilTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgSoilHealth" />
           
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
