import React from 'react';

export default (props) => {
  // Implement this component to pass the tests in ./__tests/index.spec.js
  const listItems = props.data.map((d) => {
    const item = <li
      key={d.key}
      onClick={() => props.onClick(d.key)}
      className={d.selected ? "selected" : ""}
    >
      {d.name}
    </li>
    return item;
  });

  return (
    <ul>
      {listItems}
    </ul>
  );
};
