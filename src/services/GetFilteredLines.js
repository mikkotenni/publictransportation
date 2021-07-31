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
    let included = filterRegExp.test(line.name.replace(/\s+/g, ''));

    // See if line should be included based on halts.
    if (included === false) {
        included = line.halts.some(h => filterRegExp.test(h.name.replace(/\s+/g, '')));
    }

    return included;
  });
}

export default GetFilteredLines;