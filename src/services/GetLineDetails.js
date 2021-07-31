// CORS prevents actual requests, using static data instead.
import lines from "./_lines.js";

// For choosing correct lines and data traversing by type.
const linesMap = new Map([
  ['b', lines.data.bLines.edges],
  ['m', lines.data.mLines.edges],
]);
const lineTypesWithStops = ['b'];
const lineTypesWithStations = ['m'];

/*
* Provides detailed information of a line.
* @param {string} type - 'b' for bus and 'm' for subway.
* @param {integer} id - of line.
* @returns {object} - detailed information of given line. 
*/
const GetLineDetails = (type, id) => {
  // Returned Promise will be able to access type and id from outer scope (closures).
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lines = linesMap.get(type);
      if (!lines) {
        reject('Type of lines was incorrect.');
      }
      const lineById = lines.find(l => l.node.id === +id);
      if (!lineById) {
        reject('Line id was not found.');
      }
      const line = lineById.node;

      // Copy instead of referencing...
      const details = {...line, type};
      // ...and extend with more information.
      if (lineTypesWithStops.includes(details.type)) {
        /*
        * FIXME: Bus lines don't have this information apart from single exception.
        * Challenge states "The first and the last station should be highlighted.", so supposedly
        * this is only for subways with stations.
        */
        details.originStopOrStation = line.originStop ? line.originStop.id : null;
        details.endingStopOrStation = line.endingStop ? line.endingStop.id : null;
        details.halts = line.stops.edges.map(stop => {
          return {
            name: stop.node.name,
            id: stop.node.id,
            /*
            * FIXME: Bus lines are lacking this information.
            * Challenge states that "Stops that have connections (another line that is not the current one passes through 
            * that station) should be somehow highlighted too." so it's not entirely clear is this only for subways (with stations).
            */
            lines: [],
          }
        });
      }
      
      if (lineTypesWithStations.includes(details.type)) {
        details.originStopOrStation = line.originStation ? line.originStation.id : null;
        details.endingStopOrStation = line.endingStation ? line.endingStation.id : null;
        details.halts = line.stations.edges.map(station => {
          return {
            name: station.node.name,
            id: station.node.id,
            lines: station.node.lines,
          }
        });
      }

      resolve(details);
    }, 1000);
  });
};

export default GetLineDetails;