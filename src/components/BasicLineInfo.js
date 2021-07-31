import React from "react";

const iconMap = new Map([
  ['b', 'fas fa-bus'],
  ['m', 'fas fa-subway'],
]);
const titleMap = new Map([
  ['b', 'Bus line'],
  ['m', 'Subway line'],
]);

/*
* Component capable of rendering line icon, name and whatnot.
*/
function BasicLineInfo(props) {
  const iconClasses = `${iconMap.get(props.type)} mr2`;

  return (
    <header className="flex items-center">
      <div className="pv2 ph3 mr4 white br2"
        style={{ backgroundColor: props.color }}>
        <i className={iconClasses}
          aria-hidden="true"
          title={`${titleMap.get(props.type)} ${props.number}`}></i>
        <span className="sr-only">
          {`${titleMap.get(props.type)} ${props.number}`}
        </span>
        {props.number}
      </div>
      <h4>{props.name}</h4>
    </header>
  )
}

export default BasicLineInfo;