/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let newStr = str.toLowerCase();

  return newStr.indexOf("1xbet") !== -1 || newStr.indexOf("xxx") !== -1
    ? true
    : false;
}
