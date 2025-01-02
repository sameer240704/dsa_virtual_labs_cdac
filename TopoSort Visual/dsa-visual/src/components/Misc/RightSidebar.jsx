import React from "react";
import { Button } from "@mui/material";
import "../../styles/style.css";

const RightSidebar = ({ addNode, openModal }) => {
  return (
    <div className="w-1/5 border p-4 h-full graph-container justify-start flex-col gap-y-4">
      <Button variant="contained" onClick={addNode} className="w-full">
        Add Node
      </Button>
    </div>
  );
};

export default RightSidebar;
