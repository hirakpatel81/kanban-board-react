import React, { useContext, useState, useEffect } from "react";
import { BoardContext } from "./Board";
import Lane from "./Lane";
function BoardLanes(props) {
  const {
    onDragOverHandler,
    onDropHandler,
    onTaskContainerDragStartHandler,
    onTaskContainerDropHandler,
    onTaskContainerDragOverHandler,
  } = useContext(BoardContext);
  const [divWidth, setDivWidth] = useState(0);

  useEffect(() => {
    const totalWidth = props.stages.length * 292 + props.stages.length * 20;
    setDivWidth(totalWidth);
  }, []);

  return (
    <div className="column-wrapper">
      <div style={{ width: divWidth }}>
        {props.stages.map((stage, index) => (
          <>
            <div
              className="card-column"
              key={index}
              onDragStart={(event) =>
                onTaskContainerDragStartHandler(event, stage.id)
              }
              onDragOver={(event) => onTaskContainerDragOverHandler(event)}
              onDrop={(event) => onTaskContainerDropHandler(event, stage.id)}
            >
              <div className="card bg-light">
                <div className="card-header stage-header">
                  <h6 className="card-title text-uppercase text-truncate py-2">
                    {stage.name}
                  </h6>
                </div>
                <div
                  className="card-body"
                  onDrop={(event) => onDropHandler(event, stage.id)}
                  onDragOver={(event) => onDragOverHandler(event)}
                >
                  <Lane stage={stage} key={stage.id} />
                </div>
              </div>
            </div>
            <div
              onDrop={(event) => onTaskContainerDropHandler(event, stage.id)}
            ></div>
          </>
        ))}
      </div>
    </div>
  );
}

export default BoardLanes;
