import React, { useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";

const graphDataFormatter = (graph, indegrees, highlightedNode, highlightedEdges) => {
  const nodes = Object.keys(graph).map((node) => ({
    id: node.toString(),
    label: `${node}`,
    color: highlightedNode === node ? "red" : "lightblue",
  }));

  const links = Object.keys(graph).flatMap((source) =>
    graph[source]?.map((target) => ({
      source: source.toString(),
      target: target.toString(),
      color: highlightedNode === source && highlightedEdges?.includes(target) ? "red" : "lightblue",
    })) || []
  );

  return { nodes, links };
};

function GraphComponent({
  graph,
  indegrees,
  highlightedNode,
  highlightedEdges,
  onNodeClick,
}) {
  const graphData = graphDataFormatter(graph, indegrees, highlightedNode, highlightedEdges);

  const handleNodeClick = (node) => {
    onNodeClick(node.id); // Notify the parent component about the click
  };

  return (
    <div className="inner-container">
      <ForceGraph2D
        graphData={graphData}
        nodeAutoColorBy="id"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkWidth={(link) => (link.color === "red" ? 2 : 1)}
        linkColor={(link) => link.color || "lightblue"}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.label;
          const fontSize = 14 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.fillStyle = "black";
          ctx.fillText(label, node.x + 6, node.y + 2);
        }}
        onNodeClick={handleNodeClick}
        d3VelocityDecay={0.9} // Higher value to reduce node movement
        d3AlphaDecay={0.02}  // Ensures the graph stabilizes quickly
        d3Force={(forceGraph) => {
          // Add collision avoidance
          forceGraph.force("collide", d3.forceCollide(30));
          // Reduce overall graph movement by weakening link force
          forceGraph.force("link").strength(0.1);
          // Damp down movement with weak center force
          forceGraph.force("center").strength(0.2);
        }}
        cooldownTicks={100} // Stops the simulation after 100 ticks
        //onEngineStop={(forceGraph) => forceGraph.zoom(1)}
      />
    </div>
  );
}

export default GraphComponent;
