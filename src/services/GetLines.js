// CORS prevents actual requests, using static data instead.
import lines from "./lines.js";

// Provides information about all lines.
const GetLines = new Promise((resolve, reject) => {
  setTimeout(() => {
    /*
    * FIXME: O(n2) algorithm into something more efficient. Now there's nested
    * iterations. No CRUD actions involved at the moment.
    */
    let bLines = lines.data.bLines.edges.map(line => {
      const { id, name, color } = line.node;
      const halts = line.node.stops.edges.map(stop => {
        return {
          name: stop.node.name,
        }
      });
      return {
        id,
        name,
        color,
        type: 'b',
        halts
      }
    });
    let mLines = lines.data.mLines.edges.map(line => {
      const { id, name, color } = line.node;
      const halts = line.node.stations.edges.map(station => {
        return {
          name: station.node.name,
        }
      });
      return {
        id,
        name,
        color,
        type: 'm',
        halts
      }
    });
    // Lines are sorted by id in ascending order. Subway lines come first.
    bLines.sort((a, b) => (a.id - b.id));
    mLines.sort((a, b) => (a.id - b.id));
    resolve(mLines.concat(bLines));
  }, 1000);

});

export default GetLines;