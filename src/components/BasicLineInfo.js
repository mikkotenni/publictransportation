import React from "react";

const iconMap = new Map([
  ['b', 'fas fa-bus'],
  ['m', 'fas fa-subway'],
]);

/*
* Component capable of rendering line icon, name and whatnot.
*/
function BasicLineInfo(props) {
  const iconClasses = `${iconMap.get(props.data.type)} mr2`;

  return (
    <header className="flex items-center">
      <div className="pv2 ph3 mr4 white br2" style={{ backgroundColor: `#${props.data.color}` }}>
        <i className={iconClasses}></i> {props.data.id}
      </div>
      <h4>{props.data.name}</h4>
    </header>
  )
}

export default BasicLineInfo;