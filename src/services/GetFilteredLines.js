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
    let isIncluded = filterRegExp.test(line.name.replace(/\s+/g, ''));

    /*
    * If line isn't included based on it's name, let's see if it should be included
    * based on stop or station names it has.
    */
    if (isIncluded === false) {
        isIncluded = line.stopsOrStations.some(s => filterRegExp.test(s.name.replace(/\s+/g, '')));
    }

    return isIncluded;
  });
}

export default GetFilteredLines;