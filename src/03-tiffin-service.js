/**
 * 🍱 Mumbai Tiffin Service - Plan Builder
 *
 * Mumbai ki famous tiffin delivery service hai. Customer ka plan banana hai
 * using destructuring parameters aur rest/spread operators.
 *
 * Functions:
 *
 *   1. createTiffinPlan({ name, mealType = "veg", days = 30 })
 *      - Destructured parameter with defaults!
 *      - Meal prices per day: veg=80, nonveg=120, jain=90
 *      - Agar mealType unknown hai, return null
 *      - Agar name missing/empty, return null
 *      - Return: { name, mealType, days, dailyRate, totalCost }
 *
 *   2. combinePlans(...plans)
 *      - Rest parameter! Takes any number of plan objects
 *      - Each plan: { name, mealType, days, dailyRate, totalCost }
 *      - Return: { totalCustomers, totalRevenue, mealBreakdown }
 *      - mealBreakdown: { veg: count, nonveg: count, ... }
 *      - Agar koi plans nahi diye, return null
 *
 *   3. applyAddons(plan, ...addons)
 *      - plan: { name, mealType, days, dailyRate, totalCost }
 *      - Each addon: { name: "raita", price: 15 }
 *      - Add each addon price to dailyRate
 *      - Recalculate totalCost = new dailyRate * days
 *      - Return NEW plan object (don't modify original)
 *      - addonNames: array of addon names added
 *      - Agar plan null hai, return null
 *
 * Hint: Use { destructuring } in params, ...rest for variable args,
 *   spread operator for creating new objects
 *
 * @example
 *   createTiffinPlan({ name: "Rahul" })
 *   // => { name: "Rahul", mealType: "veg", days: 30, dailyRate: 80, totalCost: 2400 }
 *
 *   combinePlans(plan1, plan2, plan3)
 *   // => { totalCustomers: 3, totalRevenue: 7200, mealBreakdown: { veg: 2, nonveg: 1 } }
 */
const mealTypes = ["veg", "nonveg", "jain"];
export function createTiffinPlan({ name, mealType = "veg", days = 30 } = {}) {
  if (!mealTypes.includes(mealType)) return null;
  if (!name || name.trim() === "") return null;
  const dailyRate = handleMealPricesPerDay(mealType);
  const totalCost = dailyRate * days;
  return { name, mealType, days, dailyRate, totalCost };
  // Your code here
}

export function combinePlans(...plans) {
  const plansArr = [...plans];
  if (plansArr.every((val) => Object.keys(val) <= 0)) return null;
  const filterPlans = plansArr.filter((val) => Object.keys(val).length > 0);
  if (filterPlans.length <= 0) return null;
  const mealBreakdown = filterPlans.reduce((acc, curr, idx) => {
    if (Object.keys(acc).includes(curr.mealType)) {
      return { ...acc, [curr.mealType]: acc[curr.mealType] + 1 };
    }
    return { ...acc, [curr.mealType]: 1 };
  }, {});
  const totalCustomers = filterPlans.length;
  const totalRevenue = filterPlans.reduce((acc, curr) => {
    acc += curr.totalCost;
    return acc;
  }, 0);
  return { totalCustomers, totalRevenue, mealBreakdown };
  // Your code here
}

export function applyAddons(plan, ...addons) {
  if (!plan) return null;
  const addonList = [...addons];
  const filterAddons = addonList.filter((val) => Object.keys(val).length > 0);
  console.log("UIO", filterAddons);
  if (filterAddons.length <= 0)
    return {
      plan,
      dailyRate: plan.dailyRate,
      totalCost: plan.totalCost,
      addonNames: [],
    };

  const newDailyRate = filterAddons.reduce((acc, curr) => {
    acc += curr.price;
    return acc;
  }, 0);
  const calculateRate = plan.dailyRate + newDailyRate;
  const totalCost = calculateRate * plan.days;
  const newPlan = { ...plan };
  newPlan.dailyRate = calculateRate;
  newPlan.totalCost = totalCost;
  const addonNames = filterAddons.map((val) => val.name);
  return {
    newPlan,
    dailyRate: newPlan.dailyRate,
    totalCost: newPlan.totalCost,
    addonNames,
  };
  // Your code here
}

const handleMealPricesPerDay = (mealType) => {
  let basePrice = 0;
  switch (mealType) {
    case "veg":
      basePrice = 80;
      break;
    case "nonveg":
      basePrice = 120;
      break;
    case "jain":
      basePrice = 90;
      break;
    default:
      basePrice = basePrice;
      break;
  }
  return basePrice;
};
console.log(
  applyAddons(
    {
      name: "Rahul",
      mealType: "veg",
      days: 30,
      dailyRate: 80,
      totalCost: 2400,
    },
    { name: "raita", price: 15 },
    { name: "papad", price: 10 },
  ),
);
