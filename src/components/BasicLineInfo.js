import React from "react";

/*
* Component capable of rendering line icon, name and other basic information.
*/
function BasicLineInfo(props) {
  return (
    <article className="flex items-center">
      <div className="pv2 ph3 mr4 white br2" style={{ backgroundColor: `#${props.data.color}` }}>
        {/* FIXME: If there ever will be more types, provide proper icon. */}
        {props.data.type === 'b' ? <i className="fas fa-bus mr2"></i> : <i className="fas fa-subway mr2"></i>}
        {props.data.id}
      </div>
      <h4>{props.data.name}</h4>
    </article>
  )
}

export default BasicLineInfo;