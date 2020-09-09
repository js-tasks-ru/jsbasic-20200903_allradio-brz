/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let sum = 0;
  for (const key in salaries) {
    typeof salaries[key] === "number" ? (sum += salaries[key]) : sum;
  }
  return sum;
}
