import { cropRules } from "./cropRules.js";

export const getCropRecommendation = (data) => {
  console.log(data)
  const { soil, season, water, n, p, k } = data;
console.log("Incoming:", soil, season, water, n, p, k);
console.log("Types:", typeof soil, typeof season, typeof water, typeof n, typeof p, typeof k);

cropRules.forEach(rule => {
  console.log("Rule check =>", rule.soil, rule.season, rule.water, rule.npk);
});
  const match = cropRules.find(rule =>
    rule.soil === soil &&
    rule.season === season &&
    rule.water === water &&
    rule.npk.n === n &&
    rule.npk.p === p &&
    rule.npk.k === k
  );
console.log("match",match)
  return match ? match.crops : ["No exact crop found — try mixed farming"];
};
