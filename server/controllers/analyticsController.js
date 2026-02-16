import FertilizerUsage
 from "../models/FertilizerUsage.js";


export const fertilizerTrendOverTime = async (req, res) => {
  try {
    const data = await FertilizerUsage.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          organicCount: {
            $sum: { $cond: ["$organicUsed", 1, 0] }
          },
          chemicalCount: {
            $sum: { $cond: ["$chemicalUsed", 1, 0] }
          },
          total: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const cropTrendOverTime = async (req, res) => {
  try {
    const data = await FertilizerUsage.aggregate([
      {
        
         // $unwind: "$crop" ,
      
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            crop: "$crop"
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          count: -1
        }
      }
    ]);

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const soilSustainabilityTrend = async (req, res) => {
  try {
    const data = await FertilizerUsage.aggregate([
      // 1️⃣ Convert NPK text → numeric score
      {
        $addFields: {
          nScore: {
            $switch: {
              branches: [
                { case: { $eq: ["$n", "low"] }, then: 1 },
                { case: { $eq: ["$n", "medium"] }, then: 2 },
                { case: { $eq: ["$n", "high"] }, then: 3 }
              ],
              default: 0
            }
          },
          pScore: {
            $switch: {
              branches: [
                { case: { $eq: ["$p", "low"] }, then: 1 },
                { case: { $eq: ["$p", "medium"] }, then: 2 },
                { case: { $eq: ["$p", "high"] }, then: 3 }
              ],
              default: 0
            }
          },
          kScore: {
            $switch: {
              branches: [
                { case: { $eq: ["$k", "low"] }, then: 1 },
                { case: { $eq: ["$k", "medium"] }, then: 2 },
                { case: { $eq: ["$k", "high"] }, then: 3 }
              ],
              default: 0
            }
          }
        }
      },

      // 2️⃣ Soil health index
      {
        $addFields: {
          soilHealthIndex: {
            $avg: ["$nScore", "$pScore", "$kScore"]
          }
        }
      },

      // 3️⃣ Group by soil type + time
      {
        $group: {
          _id: {
            soil: "$soil",
            year: { $year: "$createdAt" }
          },
          avgSoilHealth: { $avg: "$soilHealthIndex" },
          samples: { $sum: 1 }
        }
      },

      // 4️⃣ Sort chronologically
      {
        $sort: {
          "_id.year": 1
        }
      }
    ]);

    res.json({
      success: true,
      xAxis: "Year",
      yAxis: "Average Soil Health Index",
      data
    });

  } catch (err) {
    console.error("Soil Sustainability Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to calculate soil sustainability trend"
    });
  }
};
