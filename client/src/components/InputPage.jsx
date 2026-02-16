import React, { useState } from "react";
import translations from "../assets/translations";
import FertilizerResultPage from "./FertilizerResultPage";
const InputPage = () => {
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({
    soil: "alluvial",
    season: "rabi",
    water: "medium",
    n: "medium",
    p: "medium",
    k: "medium",
  });
  const [apiResponse, setApiResponse] = useState(null);


  const t = translations[lang];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:5000/api/fertilizer/advice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {...formData,
        language: lang})
    
      });
      const result = await response.json();
       setApiResponse(result);
      console.log("API response:", result);
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed");
    }
  };

 return (
  <div className="min-h-screen bg-gradient-to-r from-white via-[#e0b44c] via-[#f1d27a] to-[#4caf50]">
  <div className=" max-w-md mx-auto mt-10 p-6 bg-green-50 border border-green-200 rounded-xl shadow-lg">
    
    {/* Header */}
    <h2 className="text-2xl font-bold text-green-800 text-center mb-2">
      🌾 {t.formTitle || "Farmer Input Form"}
    </h2>
    <p className="text-center text-green-700 mb-6">
      {t.formSubtitle || "Enter your field details for fertilizer advice"}
    </p>

    {/* Language Switcher */}
    <div className="flex justify-center gap-3 mb-6">
      {["en", "hi", "bn"].map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
            lang === l
              ? "bg-green-700 text-white border-green-700"
              : "bg-white text-green-700 border-green-300"
          }`}
        >
          {l === "en" ? "English" : l === "hi" ? "हिन्दी" : "বাংলা"}
        </button>
      ))}
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Soil */}
      <div>
        <label className="block mb-1 font-semibold text-green-800">
          🌱 {t.soilLabel}
        </label>
        <select
          name="soil"
          value={formData.soil}
          onChange={handleChange}
          className="w-full border border-green-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
        >
          {Object.entries(t.soilOptions).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Season */}
      <div>
        <label className="block mb-1 font-semibold text-green-800">
          🌤️ {t.seasonLabel}
        </label>
        <select
          name="season"
          value={formData.season}
          onChange={handleChange}
          className="w-full border border-green-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
        >
          {Object.entries(t.seasonOptions).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Water */}
      <div>
        <label className="block mb-1 font-semibold text-green-800">
          💧 {t.waterLabel}
        </label>
        <select
          name="water"
          value={formData.water}
          onChange={handleChange}
          className="w-full border border-green-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
        >
          {Object.entries(t.waterOptions).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* NPK */}
      {["n", "p", "k"].map((nutrient) => (
        <div key={nutrient}>
          <label className="block mb-1 font-semibold text-green-800">
            🧪 {t.npkLabel} ({nutrient.toUpperCase()})
          </label>
          <select
            name={nutrient}
            value={formData[nutrient]}
            onChange={handleChange}
            className="w-full border border-green-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            {Object.entries(t.npkOptions).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      ))}

      <button
        type="submit"
        className="w-full mt-4 bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition"
      >
        🚜 {t.submitBtn}
      </button>

    </form>
     {apiResponse && (
      <FertilizerResultPage data={apiResponse} lang={lang}/>
    )}
  </div>
  </div>
);
}

export default InputPage;
