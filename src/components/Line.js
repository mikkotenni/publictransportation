import React from "react";
import { Link } from "react-router-dom";

/*
* Component displays line information as how it's seen in list view.
*/
function Line(props) {
  return (
    <div>
      <Link className="line-card" to={'/line-details/' + props.data.type + '/' + props.data.id}>
        <div className="line-card__information">
          <div className="line-card__icon" style={{ backgroundColor: `#${props.data.color}` }}>
            {props.data.type === 'b' && <i className="fas fa-bus"></i>}
            {props.data.type === 'm' && <i className="fas fa-subway"></i>}
          </div>
          <div className="line-card__id" style={{ color: `#${props.data.color}` }}>
            {props.data.id}
          </div>
          <h4>{props.data.name}</h4>
        </div>
        <p className="line-card__stops-or-stations">
          {props.data.stopsOrStations.map((s, index) => {
            return (
              <span key={index} className="line-card__next-stop-or-station">
                {index < props.data.stopsOrStations.length - 1
                  ? <span>{s.name} <i className="line-card__next-stop-or-station-icon fas fa-angle-right"></i></span>
                  : <span>{s.name}</span>}
              </span>
            )
          })}
        </p>
      </Link>
    </div>
  )
}

export default Line;