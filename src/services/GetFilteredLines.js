/*
* Get lines filtered by some string. String should be present in
* line name or in any of the stop/station names.
* @param {string} filterStr - filtering string.
* @param {array} lines - lines to be filtered.
* @returns {array} - filtered lines. 
*/
function GetFilteredLines(filterStr, lines) {
  return lines.filter(line => {
    const filterRegExp = new RegExp(filterStr.replace(/\s+/g, ''), 'gi');
    return filterRegExp.test((line.name + line.stopsOrStations.join('')).replace(/\s+/g, ''));
  });
}

export default GetFilteredLines;