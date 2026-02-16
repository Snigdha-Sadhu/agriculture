import React from "react";
import { uiTitles } from "../assets/uiTitle";
import { cropNames } from "../assets/CROPS";
const Badge = ({ label, color }) => (
  <span className={`text-xs px-2 py-1 rounded-full ${color} ml-2`}>
    {label}
  </span>
);

const Section = ({ title, icon, badge, children, bg = "bg-white" }) => (
  <div className={`${bg} p-4 rounded-xl shadow-sm border`}>
    <h3 className="text-lg font-semibold mb-2 flex items-center text-green-800">
      {icon} {title} {badge}
    </h3>
    {children}
  </div>
);
const normalizeKey = (crop) =>
  crop.toLowerCase().replace(/\s+/g, "");

const displayCrop = (crop, lang) =>
  cropNames[normalizeKey(crop)]?.[lang] || crop;

const FertilizerResultPage = ({ data, lang = "en" }) => {
  if (!data) return null;

  const { fertilizerAdvice, aiAdvisory, recommendedCrops } = data;
  const advisory = aiAdvisory?.advisory;
  const t = uiTitles;
const c=cropNames;
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">

      {/* RULE-BASED FERTILIZER ADVICE */}
      <Section
        title={t.fertilizerAdvice[lang]}
        icon="📏"
        badge={<Badge label="Rule-Based" color="bg-green-100 text-green-700" />}
        bg="bg-green-50"
      >
        <p>{fertilizerAdvice.message}</p>
        <ul className="list-disc pl-5 mt-2">
          {fertilizerAdvice.practices.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </Section>

      {/* AI CROP SUITABILITY */}
      {advisory && (
        <Section
          title={t.cropSuitability[lang]}
          icon="🤖"
          badge={<Badge label="AI Generated" color="bg-blue-100 text-blue-700" />}
        >
          <p>{advisory.cropSuitabilityExplanation}</p>
        </Section>
      )}

      {/* AI ORGANIC TIPS */}
      {advisory?.organicFertilizerTips && (
        <Section
          title={t.organicTips[lang]}
          icon="🌿"
          badge={<Badge label="AI Generated" color="bg-blue-100 text-blue-700" />}
          bg="bg-blue-50"
        >
          <p>{advisory.organicFertilizerTips}</p>
        </Section>
      )}

      {/* AI ECO PRACTICES */}
      {advisory?.ecoFriendlyPractices && (
        <Section
          title={t.ecoPractices[lang]}
          icon="♻️"
          badge={<Badge label="AI Generated" color="bg-blue-100 text-blue-700" />}
        >
          <p>{advisory.ecoFriendlyPractices}</p>
        </Section>
      )}

      {/* RULE-BASED RECOMMENDED CROPS */}
      <Section
        title={t.recommendedCrops[lang]}
        icon="📏"
        badge={<Badge label="Rule-Based" color="bg-green-100 text-green-700" />}
        bg="bg-green-50"
      >
       
          {recommendedCrops.length>0?(
             <ul className="flex gap-3 flex-wrap">
        { recommendedCrops.map((crop, i) => (
            <li
              key={i}
              className="px-3 py-1 bg-white border rounded-full text-sm"
            >
              {displayCrop(crop, lang)}
            </li>
        ))}
             </ul>
         ) :(
<p>{recommendedCrops[0]}</p>
          )
        }
       
      </Section>

      {/* AI WARNINGS */}
      {advisory?.warnings && (
        <Section
          title={t.warnings[lang]}
          icon="⚠️"
          badge={<Badge label="AI Generated" color="bg-yellow-100 text-yellow-700" />}
          bg="bg-red-50"
        >
          <p>{advisory.warnings}</p>
        </Section>
      )}

      {/* FINAL DISCLAIMER */}
      <div className="bg-red-100 border border-red-300 p-3 rounded-lg text-center">
        <p className="text-sm text-red-700 font-semibold">
          ⚠️ AI advisory may be incorrect. Always follow rule-based recommendations
          and consult agricultural experts before taking action.
        </p>
      </div>

    </div>
  );
};

export default FertilizerResultPage;
