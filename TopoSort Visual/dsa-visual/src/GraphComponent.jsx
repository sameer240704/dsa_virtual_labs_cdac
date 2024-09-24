import React from 'react';
import { Graph } from 'react-d3-graph';

// Convert graph data to react-d3-graph format
const graphDataFormatter = (graph, indegrees) => {
  const nodes = Object.keys(graph).map(node => ({
    id: node.toString(),  // Ensure the ID is a string
    label: `Node ${node} (Indegree: ${indegrees[node]})`,
  }));

  const links = Object.keys(graph).flatMap(source => 
    graph[source].map(target => ({
      source: source.toString(),  // Ensure source is a string
      target: target.toString()   // Ensure target is a string
    }))
  );

  return { nodes, links };
};

function GraphComponent({ graph, indegrees }) {
  const graphData = graphDataFormatter(graph, indegrees);

  // Graph configuration for react-d3-graph
  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightblue',
      size: 600,
      highlightStrokeColor: 'blue',
    },
    link: {
      highlightColor: 'lightblue',
    },
    directed: true,
    height: 400,
    width: 800,
    // Enable automatic graph centering on render
    d3: {
      gravity: -200,  // This ensures nodes don't overlap
      linkLength: 150,  // Distance between nodes
    },
    // Automatically fit graph within the container after each render
    automaticRearrangeAfterDropNode: true,
  };
  

  return (
    <div>
      <h3>Graph Visualization</h3>
      <Graph
        id="graph-id"
        data={graphData}
        config={config}
      />
    </div>
  );
}

export default GraphComponent;
