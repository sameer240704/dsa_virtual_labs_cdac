import React, { useState } from 'react';
import GraphComponent from './GraphComponent';
import TopoSortArrayComponent from './TopoSortArrayComponent';
import QuestionComponent from './QuestionComponent';
import ErrorComponent from './ErrorComponent';

const initialGraph = {
  5: [0, 2],
  4: [0, 1],
  2: [3],
  3: [1],
  0: [],
  1: []
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

  const handleNodeSelection = (node) => {
    if (indegrees[node] !== 0) {
      setErrorMessage(`Incorrect choice! Node ${node} has indegree greater than 0.`);
      return;
    }

    // Remove node from the graph and update links
    const newGraph = updateLinksAfterNodeRemoval(graph, node);

    // Update indegrees
    const newIndegrees = { ...indegrees };
    Object.values(graph[node]).forEach(edge => {
      newIndegrees[edge]--;
    });
    delete newIndegrees[node];

    // Update topo sort
    setTopoSort([...topoSort, node]);
    setGraph(newGraph);
    setIndegrees(newIndegrees);
    setErrorMessage('');
  };

  return (
    <div>
      <GraphComponent graph={graph} indegrees={indegrees} />
      <TopoSortArrayComponent topoSort={topoSort} />
      <QuestionComponent onNodeSelect={handleNodeSelection} nodes={Object.keys(indegrees)} />
      {errorMessage && <ErrorComponent message={errorMessage} />}
    </div>
  );
}

export default App;