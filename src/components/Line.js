import React from "react";
import { Link } from "react-router-dom";
import BasicLineInfo from "./BasicLineInfo";

/*
* Component displays line information as how it's seen in list view.
*/
function Line(props) {
  const { color, halts, id, name, type } = props.data;
  const haltsList = halts.map((h, index) => {
    return (
      <span key={`${index}${h.name}`} className="dib mr2">
        {h.name}
        {index < halts.length - 1 && <i className="fas fa-angle-right ml1 v-mid f6"></i>}
      </span>
    )
  });

  return (
    <Link className="no-underline dark-gray db bg-animate bg-near-white hover-bg-white pa3 pt0 mt2 br1"
      style={{ flexBasis: '50%' }}
      to={`/line-details/${type}/${id}`}>
      <BasicLineInfo type={type}
        color={`#${color}`}
        number={id}
        name={name} />
      {haltsList}
    </Link>
  )
}

export default Line;