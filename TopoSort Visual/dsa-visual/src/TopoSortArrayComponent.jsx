// import React from 'react';

// function TopoSortArrayComponent({ topoSort }) {
//   return (
//     <div style={{ marginLeft: "30px" }} >
//       <h3>Topological Sort Result</h3>
//       <div>
//         {topoSort.length === 0 ? "No nodes added yet" : topoSort.join(' -> ')}
//       </div>
//     </div>
//   );
// }

// export default TopoSortArrayComponent;

import React from 'react';

function TopoSortArrayComponent({ topoSort }) {
  return (
    <div className="topo-sort-container">
      <h3>Topological Sort Result</h3>
      <div className="topo-sort-graph">
        {topoSort.length === 0 ? (
          <p>No nodes added yet</p>
        ) : (
          topoSort.map((node, index) => (
            <React.Fragment key={node}>
              <div className="node">{node}</div>
              {index < topoSort.length - 1 && <div className="arrow">→</div>}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
}

export default TopoSortArrayComponent;
