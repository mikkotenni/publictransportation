import lines from "./lines.js";

/*
* CORS prevents actual requests which I'm merely pretending to be doing here.
* @param {string} type - b for bus and m for subway.
* @param {integer} id - of line.
* @returns {object} - detailed information of given line. 
*/
const GetLineDetails = (type, id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // FIXME: Handle correct lines array in case of having more than two types.
      const linesByType = type === 'b' ? lines.data.bLines.edges : lines.data.mLines.edges;
      const line = linesByType.find(l => {
        return l.node.id === +id;
      }).node;
      const details = {...line, type};
      if (details.type === 'b') {
        /*
        * FIXME: Bus lines don't have this information apart from single exception.
        * Challenge states "The first and the last station should be highlighted.", so supposedly
        * this is only for subways with stations.
        */
        details.originStopOrStation = line.originStop ? line.originStop.id : null;
        details.endingStopOrStation = line.endingStop ? line.endingStop.id : null;
        details.stopsOrStations = line.stops.edges.map(stop => {
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
      } else {
        details.originStopOrStation = line.originStation ? line.originStation.id : null;
        details.endingStopOrStation = line.endingStation ? line.endingStation.id : null;
        details.stopsOrStations = line.stations.edges.map(station => {
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