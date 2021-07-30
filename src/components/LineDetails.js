import React, { Component } from "react";
import { withRouter } from "react-router";
import GetLineDetails from "../services/GetLineDetails";
import { Link } from "react-router-dom";

/*
* Gets and displays line details based on URL parameter information.
*/
class LineDetails extends Component {
  constructor() {
    super();
    this.state = { details: { stopsOrStations: [] } };
  }

  async componentDidMount() {
    const details = await GetLineDetails(this.props.match.params.type, this.props.match.params.id);
    this.setState({ details });
    console.log(this.state.details);
  }

  render() {
    return (
      <div>
        <nav>
          <Link to="/">
            <i className="fas fa-arrow-alt-circle-left f3 light-purple"></i>
          </Link>
        </nav>
        <section className="bg-white ph3 pb1 mt2">
          <div className="flex items-center">
            <div className="pv2 ph3 mr1 white br1" style={{ backgroundColor: `#${this.state.details.color}` }}>
              {this.state.details.type === 'b' && <i className="fas fa-bus"></i>}
              {this.state.details.type === 'm' && <i className="fas fa-subway"></i>}
            </div>
            <div className="mr3" style={{ color: `#${this.state.details.color}` }}>
              {this.state.details.id}
            </div>
            <h4>{this.state.details.name}</h4>
          </div>
          {this.state.details.stopsOrStations.length > 0 &&
            <table className="w-100">
              <thead>
                <tr>
                  <th className="pv2 ph3 tl">Stop/station</th>
                  <th className="pv2 ph3 tl w3">First</th>
                  <th className="pv2 ph3 tl w3">Last</th>
                  <th className="pv2 ph3 tl w3">Connections</th>
                </tr>
              </thead>
              <tbody>
                {this.state.details.stopsOrStations.map((s, index) => {
                  return (
                    <tr key={index} className="striped--near-white">
                      <td className="pv2 ph3 tl">{s.name}</td>
                      <td className="pv2 ph3 tc">{this.state.details.originStopOrStation === s.id && <i className="fas fa-circle light-purple f7"></i>}</td>
                      <td className="pv2 ph3 tc">{this.state.details.endingStopOrStation === s.id && <i className="fas fa-circle light-purple f7"></i>}</td>
                      <td className="pv2 ph3 tc">{s.lines.some(l => l !== this.state.details.name) && <i className="fas fa-circle light-purple f7"></i>}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>}
        </section>
      </div>
    );
  }
}

export default withRouter(LineDetails);