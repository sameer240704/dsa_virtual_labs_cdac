import React from 'react';

function TopoSortArrayComponent({ topoSort }) {
  return (
    <div>
      <h3>Topological Sort Result</h3>
      <div>
        {topoSort.length === 0 ? "No nodes added yet" : topoSort.join(' -> ')}
      </div>
    </div>
  );
}

export default TopoSortArrayComponent;
