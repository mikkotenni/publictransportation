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
    this.state = { details: {stopsOrStations: []} };
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
          <Link to="/" className="link">
            <i className="fas fa-arrow-alt-circle-left link--large"></i>
          </Link>
        </nav>
        <section className="line-card">
          <div className="line-card__information">
            <div className="line-card__icon" style={{ backgroundColor: `#${this.state.details.color}` }}>
              {this.state.details.type === 'b' && <i className="fas fa-bus"></i>}
              {this.state.details.type === 'm' && <i className="fas fa-subway"></i>}
            </div>
            <div className="line-card__id" style={{ color: `#${this.state.details.color}` }}>
              {this.state.details.id}
            </div>
            <h4>{this.state.details.name}</h4>
          </div>
          <ul className="line-card__stops-or-stations">
            {this.state.details.stopsOrStations.map((s, index) => {
              return (
                <li key={index}>
                  {s.name}
                  {s.lines.filter(l => l !== this.state.details.name).length > 0 && <i className="fas fa-exchange-alt line-card__stop-or-station--higlighted"></i>}
                  {this.state.details.originStopOrStation === s.id && <i className="fas fa-sign-out-alt line-card__stop-or-station--higlighted"></i>}
                  {this.state.details.endingStopOrStation === s.id && <i className="fas fa-sign-in-alt line-card__stop-or-station--higlighted"></i>}
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    );
  }
}

export default withRouter(LineDetails);