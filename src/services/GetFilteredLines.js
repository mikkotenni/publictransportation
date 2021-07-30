/*
* Get lines filtered by some string. String should be present in
* line name or in any of the stop/station names.
* @param {string} filterStr - filtering string.
* @param {array} lines - lines to be filtered.
* @returns {array} - filtered lines. 
*/
function GetFilteredLines(filterStr, lines) {
  return lines.filter(line => {
    return `${line.name}${line.stopsOrStations.join('')}`
      .replace(/\s+/g, '')
      .includes(filterStr.replace(/\s+/g, ''));
  });
}

export default GetFilteredLines;