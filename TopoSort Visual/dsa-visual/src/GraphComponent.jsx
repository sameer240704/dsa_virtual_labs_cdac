import React from 'react';
import { Graph } from 'react-d3-graph';
import "./style.css";

// Convert graph data to react-d3-graph format
const graphDataFormatter = (graph, indegrees, highlightedNode, highlightedEdges) => {
  const nodes = Object.keys(graph).map(node => ({
    id: node.toString(),  // Ensure the ID is a string
    label: `Node ${node} (Indegree: ${indegrees[node]})`,
    color: highlightedNode === node ? 'red' : 'lightblue',
  }));

  const links = Object.keys(graph).flatMap(source => 
    graph[source].map(target => ({
      source: source.toString(),  // Ensure source is a string
      target: target.toString(),   // Ensure target is a string
      color: (highlightedNode === source && highlightedEdges.includes(target))
        ? 'red'  // Only highlight edges connected to the selected node
        : 'lightblue',
    }))
  );

  return { nodes, links };
};

function GraphComponent({ graph, indegrees, highlightedNode, highlightedEdges }) {
  const graphData = graphDataFormatter(graph, indegrees, highlightedNode, highlightedEdges);

  // Graph configuration for react-d3-graph
  const config = {
    nodeHighlightBehavior: true,
    node: {
      color: 'lightblue',
      size: 800,
      highlightStrokeColor: 'blue',
      fontSize: '20',
      highlightFontSize: '20',
    },
    link: {
      highlightColor: 'lightblue',
    },
    directed: true,
    height: 350,
    width: 600,
    // Enable automatic graph centering on render
    d3: {
      gravity: -200,  // This ensures nodes don't overlap
      linkLength: 150,  // Distance between nodes
    },
    // Automatically fit graph within the container after each render
    automaticRearrangeAfterDropNode: true,
  };
  

  return (
    <div className='inner-container'>
      <Graph
        id="graph-id"
        data={graphData}
        config={config}
      />
    </div>
  );
}

export default GraphComponent;
