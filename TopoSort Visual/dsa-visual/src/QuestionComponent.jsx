import React from 'react';
import './style.css'; // Import the CSS file here

function QuestionComponent({ onNodeSelect, nodes }) {
  return (
    <div className="question-buttons">
      {nodes.map(node => (
        <button key={node} className="question-button" onClick={() => onNodeSelect(node)}>
          {node}
        </button>
      ))}
    </div>
  );
}

export default QuestionComponent;
