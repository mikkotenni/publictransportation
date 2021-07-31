import React, { Component } from "react";
import { withRouter } from "react-router";
import GetLineDetails from "../services/GetLineDetails";
import { Link } from "react-router-dom";
import BasicLineInfo from "./BasicLineInfo";
import Spinner from './Spinner';

/*
* Gets and displays line details based on URL parameter information.
*/
class LineDetails extends Component {
  constructor() {
    super();
    this.state = { details: { halts: [] } };
  }

  async componentDidMount() {
    try {
      const details = await GetLineDetails(this.props.match.params.type, this.props.match.params.id);
      this.setState({ details });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (typeof this.state.details.name === 'undefined') {
      return (
        <Spinner />
      )
    }

    return (
      <div>
        <nav>
          <Link to="/" className="dark-gray">
            <i className="fas fa-arrow-alt-circle-left"></i> Find another line
          </Link>
        </nav>
        <section className="bg-white ph3 pb3 mt2">
          <BasicLineInfo data={this.state.details} />
          {this.state.details.halts.length > 0 &&
            <table className="w-100">
              <thead>
                <tr>
                  <th className="pv2 ph3 tl fw3">Stop/station</th>
                  <th className="pv2 ph3 tl w3 fw3">First</th>
                  <th className="pv2 ph3 tl w3 fw3">Last</th>
                  <th className="pv2 ph3 tl w3 fw3">Connections</th>
                </tr>
              </thead>
              <tbody>
                {this.state.details.halts.map((s, index) => {
                  return (
                    <tr key={index} className="striped--near-white">
                      <td className="pv2 ph3 tl">{s.name}</td>
                      <td className="pv2 ph3 tc">{this.state.details.originStopOrStation === s.id && <i className="fas fa-circle f7"></i>}</td>
                      <td className="pv2 ph3 tc">{this.state.details.endingStopOrStation === s.id && <i className="fas fa-circle f7"></i>}</td>
                      <td className="pv2 ph3 tc">{s.lines.some(l => l !== this.state.details.name) && <i className="fas fa-circle f7"></i>}</td>
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