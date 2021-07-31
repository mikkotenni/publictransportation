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
    this.state = { details: null };
  }

  async componentDidMount() {
    try {
      const details =
        await GetLineDetails(this.props.match.params.type, this.props.match.params.id);
      this.setState({ details });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (!this.state.details) {
      return (
        <Spinner />
      )
    }

    const haltsRows = this.state.details.halts.map((h, index) => {
      // Key requires some special attention as there are duplicates in data.
      return (
        <tr key={`${index}${h.id}`} className="striped--near-white">
          <td className="pv2 ph3 tl">{h.name}</td>
          <td className="pv2 ph3 tc">{this.state.details.originStopOrStation === h.id
            && <i className="fas fa-circle f7"></i>}</td>
          <td className="pv2 ph3 tc">{this.state.details.endingStopOrStation === h.id
            && <i className="fas fa-circle f7"></i>}</td>
          <td className="pv2 ph3 tc">{h.lines.some(l => l !== this.state.details.name)
            && <i className="fas fa-circle f7"></i>}</td>
        </tr>
      )
    });
    
    return (
      <div>
        <nav>
          <Link to="/" className="dark-gray">
            <i className="fas fa-arrow-alt-circle-left"></i> Find another line
          </Link>
        </nav>
        <section className="bg-white ph3 pb3 mt2">
          <BasicLineInfo type={this.state.details.type}
            color={`#${this.state.details.color}`}
            number={this.state.details.id}
            name={this.state.details.name} />
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
                {haltsRows}
              </tbody>
            </table>}
        </section>
      </div>
    );
  }
}

export default withRouter(LineDetails);