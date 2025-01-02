import React, { useState } from "react";
import "./styles/style.css";
import GraphComponent from "./components/Graph/GraphComponent";
import TopoSortArrayComponent from "./components/Graph/TopoSortArrayComponent";
import QuestionComponent from "./components/Graph/QuestionComponent";
import ErrorComponent from "./ErrorComponent";
import TheoryModal from "./components/Theory/TheoryModal";
import GuideLayout from "./components/Guide/GuideLayout";
import RightSidebar from "./components/Misc/RightSidebar";

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
  Object.keys(graph).forEach((node) => {
    indegree[node] = 0;
  });
  Object.values(graph).forEach((edges) => {
    edges.forEach((edge) => {
      indegree[edge]++;
    });
  });
  return indegree;
};

const updateLinksAfterNodeRemoval = (graph, node) => {
  const newGraph = {};
  Object.keys(graph).forEach((source) => {
    if (source !== node) {
      newGraph[source] = graph[source].filter((target) => target !== node);
    }
  });
  return newGraph;
};

function App() {
  const [graph, setGraph] = useState(initialGraph);
  const [indegrees, setIndegrees] = useState(calculateIndegrees(initialGraph));
  const [topoSort, setTopoSort] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [highlightedEdges, setHighlightedEdges] = useState([]);
  const [addingEdge, setAddingEdge] = useState(false);
  const [newEdgeSource, setNewEdgeSource] = useState(null);
  const [chatMessage, setChatMessage] = useState("Hello, this is DSA Buddy");

  const handleNodeSelection = async (node) => {
    if (indegrees[node] !== 0) {
      setErrorMessage(
        `Incorrect choice! Node ${node} has indegree greater than 0.`
      );
      setChatMessage(`Incorrect choice! Node ${node} is not ready yet.`);
      return;
    }

    setHighlightedNode(node);
    setHighlightedEdges(graph[node]);
    setChatMessage(`Good job! Node ${node} is the correct choice.`);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newGraph = updateLinksAfterNodeRemoval(graph, node);
    const newIndegrees = { ...indegrees };
    Object.values(graph[node]).forEach((edge) => {
      newIndegrees[edge]--;
    });
    delete newIndegrees[node];

    setTopoSort([...topoSort, node]);
    setGraph(newGraph);
    setIndegrees(newIndegrees);
    setErrorMessage("");
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
    <div className="px-5 py-4 h-screen w-screen relative overflow-hidden flex flex-col items-center">
      {isModalOpen && <TheoryModal onClose={closeModal} />}
      <div className="px-5 py-2 w-fit rounded-md bg-black/10 backdrop-blur-xl">
        <h2 className="text-3xl font-bold tracking-wide uppercase">
          Topological Sort Visualizer
        </h2>
      </div>

      <button className="info-button" onClick={openModal}>
        ?
      </button>
      <div className="flex w-full items-start justify-start gap-x-5 mt-5">
        <div className="w-4/5">
          <div className="graph-container w-full">
            <GraphComponent
              graph={graph}
              indegrees={indegrees}
              highlightedNode={highlightedNode}
              highlightedEdges={highlightedEdges}
              onNodeClick={startAddingEdge}
            />
          </div>
        </div>

        <RightSidebar addNode={addNode} />
      </div>

      <div className="w-full p-2">
        <TopoSortArrayComponent topoSort={topoSort} />
        <QuestionComponent
          onNodeSelect={handleNodeSelection}
          nodes={Object.keys(indegrees)}
        />
      </div>
      {errorMessage && <ErrorComponent message={errorMessage} />}

      <GuideLayout message={chatMessage} openModal={openModal} />
    </div>
  );
}

export default App;
