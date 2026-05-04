/**
 * 🚂 Dabbawala Delivery Tracker - Closures
 *
 * Mumbai ke famous dabbawala system ka tracker bana! Yahan closure ka
 * use hoga — ek function ke andar private state rakhna hai jo bahar se
 * directly access nahi ho sakta. Sirf returned methods se access hoga.
 *
 * Function: createDabbawala(name, area)
 *
 * Returns an object with these methods (sab ek hi private state share karte hain):
 *
 *   - addDelivery(from, to)
 *     Adds a new delivery. Returns auto-incremented id (starting from 1).
 *     Each delivery: { id, from, to, status: "pending" }
 *     Agar from ya to empty/missing, return -1
 *
 *   - completeDelivery(id)
 *     Marks delivery as "completed". Returns true if found and was pending.
 *     Returns false if not found or already completed.
 *
 *   - getActiveDeliveries()
 *     Returns array of deliveries with status "pending" (copies, not references)
 *
 *   - getStats()
 *     Returns: { name, area, total, completed, pending, successRate }
 *     successRate = completed/total as percentage string "85.00%" (toFixed(2) + "%")
 *     Agar total is 0, successRate = "0.00%"
 *
 *   - reset()
 *     Clears all deliveries, resets id counter to 0. Returns true.
 *
 * IMPORTANT: Private state (deliveries array, nextId counter) should NOT
 *   be accessible as properties on the returned object.
 *   Two instances created with createDabbawala should be completely independent.
 *
 * Hint: Use closure to keep variables private. The returned object's methods
 *   form a closure over those variables.
 *
 * @param {string} name - Dabbawala's name
 * @param {string} area - Delivery area
 * @returns {object} Object with delivery management methods
 *
 * @example
 *   const ram = createDabbawala("Ram", "Dadar");
 *   ram.addDelivery("Andheri", "Churchgate"); // => 1
 *   ram.addDelivery("Bandra", "CST");         // => 2
 *   ram.completeDelivery(1);                   // => true
 *   ram.getStats();
 *   // => { name: "Ram", area: "Dadar", total: 2, completed: 1, pending: 1, successRate: "50.00%" }
 */

export function createDabbawala(name, area) {
  let id = 0;
  let deliveryArr = [];
  return {
    addDelivery(from, to) {
      if (!from || from.trim() === "" || !to || to.trim() === "") return -1;
      deliveryArr.push({ id: id + 1, from, to, status: "pending" });
      return ++id;
    },
    completeDelivery(id) {
      const findByPendingDeliveryId = deliveryArr.find(
        (val) => val.id === id && val.status === "pending",
      );
      // const findByCompletedDeliveryId=deliveryArr.find((val)=>val.id===id && val.status==="completed")
      if (findByPendingDeliveryId) {
        deliveryArr = deliveryArr.map((val) => {
          return {
            ...val,
            status:
              val.id === findByPendingDeliveryId.id ? "completed" : val.status,
          };
        });
        return true;
      } else {
        return false;
      }
    },
    getActiveDeliveries() {
      const activeDeliveries = [...deliveryArr];
      return activeDeliveries.filter((val) => val.status === "pending");
    },
    getStats() {
      const orderNumberByStatus = deliveryArr.reduce(
        (acc, curr) => {
          if (curr.status === "pending") {
            acc[curr.status] += 1;
          }
          if (curr.status === "completed") {
            acc[curr.status] += 1;
          }
          return acc;
        },
        { pending: 0, completed: 0 },
      );
      const total = orderNumberByStatus.pending + orderNumberByStatus.completed;
      const successRate =
        total === 0
          ? "0.00%"
          : String(((orderNumberByStatus.completed / total)*100).toFixed(2)) + "%";
      return {
        name,
        area,
        total,
        pending: orderNumberByStatus.pending,
        completed: orderNumberByStatus.completed,
        successRate,
      };
    },
    reset() {
      id=0
      deliveryArr=new Array(0)
      return true
    }
  };
  // Your code here
}
const ram = createDabbawala("Ram", "Dadar");
console.log(ram.addDelivery("Andheri", "Churchgate")); // => 1
console.log(ram.addDelivery("Bandra", "CST"));
console.log(ram.completeDelivery(1))
console.log(ram.getStats())
