/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let newStr = str.toLowerCase();

  return newStr.includes("1xbet") || newStr.includes("xxx") ? true : false;
}
