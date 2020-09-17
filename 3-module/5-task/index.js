/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let sortArr = str
    .split(",")
    .join(" ")
    .split(" ")
    .filter((item) => parseFloat(item))
    .map((item) => parseFloat(item));

  return {
    min: Math.min(...sortArr),
    max: Math.max(...sortArr),
  };
}
