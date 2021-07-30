import lines from "./lines.js";

// CORS prevents actual requests which I'm imitating here.
const GetLines = new Promise((resolve, reject) => {
  setTimeout(() => {
    // FIXME: O(n2) algorithm into something more efficient. Now there's nested iterations.
    let busLines = lines.data.bLines.edges.map(line => {
      const { id, name, color } = line.node;
      const stopsOrStations = line.node.stops.edges.map(stop => {
        return {
          name: stop.node.name,
        }
      });
      return {
        id,
        name,
        color,
        type: 'b',
        stopsOrStations
      }
    });
    let metroLines = lines.data.mLines.edges.map(line => {
      const { id, name, color } = line.node;
      const stopsOrStations = line.node.stations.edges.map(station => {
        return {
          name: station.node.name,
        }
      });
      return {
        id,
        name,
        color,
        type: 'm',
        stopsOrStations
      }
    });
    // Lines are sorted by id in ascending order. But in a way that subway lines come first.
    busLines.sort((a, b) => (a.id > b.id) ? 1 : (b.id > a.id) ? - 1 : 0);
    metroLines.sort((a, b) => (a.id > b.id) ? 1 : (b.id > a.id) ? - 1 : 0);
    resolve(metroLines.concat(busLines));
  }, 1000);

});

export default GetLines;