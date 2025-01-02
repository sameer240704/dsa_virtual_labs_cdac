import React from "react";

// const TheoryModal = ({ onClose }) => {
//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Kahn's Algorithm Explanation</h2>
//         <p>
//           Kahn's Algorithm is used for topological sorting of a Directed Acyclic Graph (DAG).
//           It works by maintaining an indegree count for each node, and repeatedly removing
//           nodes with an indegree of 0. This ensures that nodes are processed in a valid
//           topological order.
//         </p>
//         <p>
//           In this visualization, you need to select nodes with an indegree of 0. If you
//           select a node with a non-zero indegree, the system will indicate an incorrect
//           choice. The goal is to correctly order all nodes until the graph is fully
//           sorted.
//         </p>
//         <button onClick={onClose} className="start-button">Start</button>
//       </div>
//     </div>
//   );
// };

// export default TheoryModal;

const TheoryModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Kahn&apos;s Algorithm Explanation</h2>
        <div className="modal-body">
          <div className="theory-section">
            <p>
              Kahn&apos;s Algorithm is used for topological sorting of a
              Directed Acyclic Graph (DAG). It works by maintaining an indegree
              count for each node, and repeatedly removing nodes with an
              indegree of 0. This ensures that nodes are processed in a valid
              topological order.
            </p>
            <p>
              In this visualization, you need to select nodes with an indegree
              of 0. If you select a node with a non-zero indegree, the system
              will indicate an incorrect choice. The goal is to correctly order
              all nodes until the graph is fully sorted.
            </p>
          </div>
          <div className="pseudocode-section">
            <h3>Pseudo-code</h3>
            <pre>
              {`Kahn's Algorithm for Topological Sort:
1. Initialize 'indegree' of all vertices to 0.
2. For each vertex u in the graph:
     - For each adjacent vertex v of u:
         - Increment indegree[v].
3. Initialize an empty queue.
4. Enqueue all vertices with indegree 0.
5. While the queue is not empty:
     a. Dequeue a vertex u.
     b. Add u to the topological sort.
     c. For each adjacent vertex v of u:
         - Decrease indegree[v] by 1.
         - If indegree[v] becomes 0, enqueue v.
6. If all vertices are processed:
     - The topological order is valid.
   Else:
     - The graph has a cycle.`}
            </pre>
          </div>
        </div>
        <button onClick={onClose} className="start-button">
          Start
        </button>
      </div>
    </div>
  );
};

export default TheoryModal;
