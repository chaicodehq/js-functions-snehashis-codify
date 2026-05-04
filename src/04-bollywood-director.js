/**
 * 🎬 Bollywood Scene Director - Factory Functions
 *
 * Bollywood ka script generator bana! Factory functions use karo — matlab
 * aise functions jo DOOSRE functions return karte hain. Pehle configuration
 * do, phir ek specialized function milega jo kaam karega.
 *
 * Functions:
 *
 *   1. createDialogueWriter(genre)
 *      - Factory: returns a function (hero, villain) => string
 *      - Genres and their dialogue templates:
 *        "action"  => `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`
 *        "romance" => `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`
 *        "comedy"  => `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`
 *        "drama"   => `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`
 *      - Unknown genre => return null (not a function, just null)
 *      - Returned function: if hero or villain empty/missing, return "..."
 *
 *   2. createTicketPricer(basePrice)
 *      - Factory: returns a function (seatType, isWeekend = false) => price
 *      - Seat multipliers: silver=1, gold=1.5, platinum=2
 *      - Agar isWeekend, multiply final price by 1.3 (30% extra)
 *      - Round to nearest integer
 *      - Unknown seatType in returned fn => return null
 *      - Agar basePrice not positive number => return null (not a function)
 *
 *   3. createRatingCalculator(weights)
 *      - Factory: returns a function (scores) => weighted average
 *      - weights: { story: 0.3, acting: 0.3, direction: 0.2, music: 0.2 }
 *      - scores: { story: 8, acting: 9, direction: 7, music: 8 }
 *      - Weighted avg = sum of (score * weight) for matching keys
 *      - Round to 1 decimal place
 *      - Agar weights not an object => return null
 *
 * Hint: A factory function RETURNS another function. The returned function
 *   "remembers" the parameters of the outer function (this is a closure!).
 *
 * @example
 *   const actionWriter = createDialogueWriter("action");
 *   actionWriter("Shah Rukh", "Raees")
 *   // => "Shah Rukh says: 'Tujhe toh main dekh lunga, Raees!'"
 *
 *   const pricer = createTicketPricer(200);
 *   pricer("gold", true)  // => 200 * 1.5 * 1.3 = 390
 */
export function createDialogueWriter(genre) {
  if (!["action", "romance", "comedy", "drama"].includes(genre)) return null;
  return function (hero, villain) {
    if (!hero || !villain || hero.trim() === "" || villain.trim() === "")
      return "...";
    let baseStr = null;
    switch (genre) {
      case "action":
        baseStr = `${hero} says: 'Tujhe toh main dekh lunga, ${villain}!'`;
        break;
      case "romance":
        baseStr = `${hero} whispers: '${villain}, tum mere liye sab kuch ho'`;
        break;
      case "comedy":
        baseStr = `${hero} laughs: '${villain} bhai, kya kar rahe ho yaar!'`;
        break;
      case "drama":
        baseStr = `${hero} cries: '${villain}, tune mera sab kuch cheen liya!'`;
        break;
      default:
        baseStr = baseStr;
        break;
    }
    return baseStr;
  };
  // Your code here
}

export function createTicketPricer(basePrice) {
  if (basePrice <= 0) return null;
  return function (seatType, isWeekend = false) {
    if (basePrice <= 0) return null;
    let price = isWeekend ? basePrice * 1.3 : basePrice;
    switch (seatType) {
      case "silver":
        price = price;
        break;
      case "gold":
        price *= 1.5;
        break;
      case "platinum":
        price *= 2;
        break;

      default:
        price = null;
        break;
    }
    return price ? Math.round(price) : null;
  };
  // Your code here
}

export function createRatingCalculator(weights) {
  if (typeof weights !== "object" || !weights) return null;
  return function (scores) {
    if (typeof weights !== "object") return null;
    const weightedAvg = Object.keys(scores).reduce((acc, curr) => {
      acc += scores[curr] * weights[curr];
      return acc;
    }, 0);
    return Math.round(weightedAvg * 10) / 10;
  };
  // Your code here
}
const actionWriter = createDialogueWriter("horror");
console.log(createDialogueWriter("horror"));
const pricer = createTicketPricer(200);
console.log(createRatingCalculator(null)); // => 200 * 1.5 * 1.3 = 390
