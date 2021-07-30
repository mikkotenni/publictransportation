import React from "react";
import { Link } from "react-router-dom";

/*
* Component displays line information as how it's seen in list view.
*/
function Line(props) {
  return (
    <div>
      <Link className="no-underline dark-gray db bg-white pa3 pt0 mt2 br2" to={'/line-details/' + props.data.type + '/' + props.data.id}>
        <div className="flex items-center">
          <div className="pv2 ph3 mr1 white br1" style={{ backgroundColor: `#${props.data.color}` }}>
            {props.data.type === 'b' && <i className="fas fa-bus"></i>}
            {props.data.type === 'm' && <i className="fas fa-subway"></i>}
          </div>
          <div className="mr3" style={{ color: `#${props.data.color}` }}>
            {props.data.id}
          </div>
          <h4>{props.data.name}</h4>
        </div>
        {props.data.stopsOrStations.map((s, index) => {
          return (
            <span key={index} className="dib mr2">
              {s.name}
              {index < props.data.stopsOrStations.length - 1 && <i className="fas fa-angle-right ml1 v-mid f6"></i>}
            </span>
          )
        })}
      </Link>
    </div>
  )
}

export default Line;