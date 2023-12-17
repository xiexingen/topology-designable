import React from 'react';

export interface ISnippet {
  icon: string;
}

const Snippet: React.FC<ISnippet> = (props) => {
  return (
    <div className="topology-designable-node snippet">
      <img
        width="100%"
        height="100%"
        alt="片段"
        src={props.icon}
      />
    </div>
  )
}

export default Snippet;
