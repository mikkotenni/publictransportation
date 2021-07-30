import React from "react";
import { Link } from "react-router-dom";
import BasicLineInfo from "./BasicLineInfo";

/*
* Component displays line information as how it's seen in list view.
*/
function Line(props) {
  return (
    <Link className="no-underline dark-gray db bg-animate bg-near-white hover-bg-white pa3 pt0 mt2 br1" style={{ flexBasis: '50%' }} to={'/line-details/' + props.data.type + '/' + props.data.id}>
      <BasicLineInfo data={props.data} />
      {props.data.stopsOrStations.map((s, index) => {
        return (
          <span key={index} className="dib mr2">
            {s.name}
            {index < props.data.stopsOrStations.length - 1 && <i className="fas fa-angle-right ml1 v-mid f6"></i>}
          </span>
        )
      })}
    </Link>
  )
}

export default Line;