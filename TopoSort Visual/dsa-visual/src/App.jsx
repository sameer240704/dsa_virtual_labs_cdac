import React, { useState } from 'react';
import './style.css';
import GraphComponent from './GraphComponent';
import TopoSortArrayComponent from './TopoSortArrayComponent';
import QuestionComponent from './QuestionComponent';
import ErrorComponent from './ErrorComponent';
import TheoryModal from './TheoryModal';

// const initialGraph = {
//   5: [0, 2],
//   4: [0, 1],
//   2: [3],
//   3: [1],
//   0: [],
//   1: []
// };

const initialGraph = {
  0: [],
};

const calculateIndegrees = (graph) => {
  const indegree = {};
  Object.keys(graph).forEach(node => {
    indegree[node] = 0;
  });
  Object.values(graph).forEach(edges => {
    edges.forEach(edge => {
      indegree[edge]++;
    });
  });
  return indegree;
};

const updateLinksAfterNodeRemoval = (graph, node) => {
  const newGraph = {};
  Object.keys(graph).forEach(source => {
    if (source !== node) {
      newGraph[source] = graph[source].filter(target => target !== node);
    }
  });
  return newGraph;
};

function App() {
  const [graph, setGraph] = useState(initialGraph);
  const [indegrees, setIndegrees] = useState(calculateIndegrees(initialGraph));
  const [topoSort, setTopoSort] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [addingEdge, setAddingEdge] = useState(false);
  const [newEdgeSource, setNewEdgeSource] = useState(null);

  const handleNodeSelection = async (node) => {
    if (indegrees[node] !== 0) {
      setErrorMessage(`Incorrect choice! Node ${node} has indegree greater than 0.`);
      return;
    }

    setHighlightedNode(node);
    setHighlightedEdges(graph[node]);

    await new Promise(resolve => setTimeout(resolve, 1000));

    const newGraph = updateLinksAfterNodeRemoval(graph, node);
    const newIndegrees = { ...indegrees };
    Object.values(graph[node]).forEach(edge => {
      newIndegrees[edge]--;
    });
    delete newIndegrees[node];

    setTopoSort([...topoSort, node]);
    setGraph(newGraph);
    setIndegrees(newIndegrees);
    setErrorMessage('');
    setHighlightedNode(null); // Reset highlighted node
    setHighlightedEdges([]);
  };

  const addNode = () => {
    const newNode = Object.keys(graph).length;
    const newGraph = { ...graph, [newNode]: [] };
    setGraph(newGraph);
    setIndegrees(calculateIndegrees(newGraph));
  };

  const startAddingEdge = (node) => {
    if (addingEdge) {
      // Adding the second part of the edge
      const newGraph = { ...graph };
      newGraph[newEdgeSource].push(node);
      setGraph(newGraph);
      setIndegrees(calculateIndegrees(newGraph));
      setAddingEdge(false);
      setNewEdgeSource(null);
    } else {
      // Starting the edge
      setAddingEdge(true);
      setNewEdgeSource(node);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">

      {isModalOpen && <TheoryModal onClose={closeModal} />}
      <button className="info-button" onClick={openModal}>?</button>

      <h2 className='main-heading'>Topological Sort Visualizer</h2>

      <button onClick={addNode} className="add-node-button">Add Node</button>

      <div className="graph-container">
        <GraphComponent graph={graph}
         indegrees={indegrees} 
         highlightedNode={highlightedNode} 
         highlightedEdges={highlightedEdges}
         onNodeClick={startAddingEdge}
         />
      </div>
      <TopoSortArrayComponent topoSort={topoSort} />
      <QuestionComponent onNodeSelect={handleNodeSelection} nodes={Object.keys(indegrees)} />
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
}

export default App;
