import React from "react";
import { Link } from "react-router-dom";
import BasicLineInfo from "./BasicLineInfo";

/*
* Component displays line information as how it's seen in list view.
*/
function Line(props) {
  const haltsList = props.data.halts.map((h, index) => {
    return (
      <span key={`${index}${h.name}`} className="dib mr2">
        {h.name}
        {index < props.data.halts.length - 1 && <i className="fas fa-angle-right ml1 v-mid f6"></i>}
      </span>
    )
  });

  return (
    <Link className="no-underline dark-gray db bg-animate bg-near-white hover-bg-white pa3 pt0 mt2 br1" style={{ flexBasis: '50%' }} to={'/line-details/' + props.data.type + '/' + props.data.id}>
      <BasicLineInfo data={props.data} />
      {haltsList}
    </Link>
  )
}

export default Line;