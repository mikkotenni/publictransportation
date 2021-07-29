import lines from "./lines.js";

// CORS prevents actual requests which I'm imitating here.
const GetLines = new Promise((resolve, reject) => {
  setTimeout(() => {
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
    // Lines are sorted by alphabetically by names.
    resolve(busLines.concat(metroLines).sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? - 1 : 0));
  }, 1000);

});

export default GetLines;