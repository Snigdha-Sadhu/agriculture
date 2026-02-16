import React from "react";
import { useNavigate } from "react-router-dom";

const AgricultureLanding = () => {
  const navigate=useNavigate()
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-[#e0b44c] via-[#f1d27a] to-[#4caf50]">

      {/* ================= HEADER ================= */}
      <header className="bg-[#6dbf4b] sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2z"
              />
            </svg>
            <span className="text-2xl font-bold text-white">AgriSmart</span>
          </div>

          {/* Admin Login */}
          <button className="bg-white text-green-700 md:px-6 px-2 md:py-2.5 py-2 rounded-lg font-semibold hover:bg-green-50 transition shadow-md ">
            Admin Login
          </button>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <main className="w-full">
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-80px)]">

          {/* LEFT IMAGE (NO GAP) */}
          <div className="w-full h-[280px] md:h-full bg-white">
            <img
              src="/pngwing.com (6).png"
              alt="Modern Agriculture"
              className="w-full h-full p-2 object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center px-8 md:px-16 py-12 space-y-6">

            <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold w-fit">
              Smart Farming Solution
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Precision Agriculture at Your{" "}
              <span className="text-green-700">Fingertips</span>
            </h1>

            <p className="text-lg text-gray-700 leading-relaxed">
              Transform your farming with data-driven insights. Enter soil NPK
              values and seasonal data to get fertilizer and crop recommendations
              tailored for your land.
            </p>

            {/* FEATURES */}
            <div className="space-y-4 pt-4">
              <Feature
                title="NPK-Based Fertilizer Advice"
                description="Accurate fertilizer recommendations based on soil nutrients."
              />
              <Feature
                title="Seasonal Crop Suggestions"
                description="Grow the best crops for your land and season."
              />
              <Feature
                title="Scientific Insights"
                description="Decisions powered by agricultural data and research."
              />
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg transition" onClick={()=>navigate("/form")}>
                Get Started
              </button>

              
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white/70 border-t border-gray-200 py-6 text-center text-gray-600">
        © 2026 AgriSmart. Empowering farmers with smart solutions.
      </footer>
    </div>
  );
};

const Feature = ({ title, description }) => (
  <div className="flex items-start space-x-3">
    <svg
      className="w-6 h-6 text-green-600 mt-1"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default AgricultureLanding;
