// CORS prevents actual requests, using static data instead.
import lines from "./lines.js";

// Collect halt information.
function getHalts(edges) {
  return edges.map(edge => {
    return {
      name: edge.node.name,
    }
  });
}

// Provides information about all lines.
const GetLines = new Promise((resolve, reject) => {
  setTimeout(() => {
    // FIXME: O(n2) algorithm into something more efficient.
    let bLines = lines.data.bLines.edges.map(line => {
      const { id, name, color } = line.node;
      return {
        id,
        name,
        color,
        type: 'b',
        halts: getHalts(line.node.stops.edges),
      }
    });
    let mLines = lines.data.mLines.edges.map(line => {
      const { id, name, color } = line.node;
      return {
        id,
        name,
        color,
        type: 'm',
        halts: getHalts(line.node.stations.edges),
      }
    });
    // Lines are sorted by id in ascending order. Subway lines come first.
    bLines.sort((a, b) => (a.id - b.id));
    mLines.sort((a, b) => (a.id - b.id));
    resolve(mLines.concat(bLines));
  }, 1000);

});

export default GetLines;