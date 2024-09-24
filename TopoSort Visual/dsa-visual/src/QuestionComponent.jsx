import React from 'react';

function QuestionComponent({ onNodeSelect, nodes }) {
  return (
    <div>
      <h3>Which node should be next in the topological sort?</h3>
      <div>
        {nodes.map(node => (
          <button key={node} onClick={() => onNodeSelect(node)}>
            {node}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionComponent;
