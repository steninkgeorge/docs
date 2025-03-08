"use client";

import { useState, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";

export const Ruler = () => {
  const [leftPosition, setLeftPosition] = useState(56);
  const [rightPosition, setRightPosition] = useState(56);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const handleMouseDownLeft = () => {
    setIsDraggingLeft(true);
  };

  const handleMouseDownRight = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    console.log("mouse move");
    if (isDraggingLeft || isDraggingRight) {
      const rulerContainer = document.getElementById("ruler-container");
      if (!rulerContainer) return;

      const rulerRect = rulerContainer.getBoundingClientRect();
      // Calculate cursor position relative to the ruler
      const cursorPosition = e.clientX - rulerRect.left;

      if (isDraggingLeft) {
        // For left marker: position directly corresponds to the cursor position
        // But constrained between 0 and (816 - rightPosition - 20)
        const maxLeftPosition = 816 - rightPosition - 20;
        const newLeftPosition = Math.max(
          0,
          Math.min(maxLeftPosition, cursorPosition)
        );
        setLeftPosition(newLeftPosition);
      }

      if (isDraggingRight) {
        // For right marker: we need to convert cursor position to right-side position
        // Right position is measured from the right edge
        const rightSidePosition = 816 - cursorPosition;

        // Constrain between 0 and (816 - leftPosition - 20)
        const maxRightPosition = 816 - leftPosition - 20;

        const newRightPosition = Math.max(
          0,
          Math.min(maxRightPosition, rightSidePosition)
        );
        setRightPosition(newRightPosition);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false); // Stop dragging the left marker
    setIsDraggingRight(false); // Stop dragging the right marker
  };

  // useEffect to handle event listeners
  useEffect(() => {
    if (isDraggingLeft || isDraggingRight) {
      console.log("dragging");
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    // Clean up the event listeners when dragging is finished or the component is unmounted
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight]);

  const marker = Array.from({ length: 83 }, (_, i) => i);

  return (
    <div
      className={`  h-6 flex items-end border-gray-300 border-b print:hidden ${
        isDraggingLeft || isDraggingRight ? "cursor-grabbing" : ""
      }`}
    >
      <div
        id="ruler-container"
        className="relative max-w-[816px] h-full w-full mx-auto select-none"
      >
        <Marker
          position={leftPosition}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleMouseDownLeft}
          onDoubleClick={() => {}}
        />
        <Marker
          position={rightPosition}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleMouseDownRight}
          onDoubleClick={() => {}}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {marker.map((marker) => {
              const pos = (816 * marker) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${pos}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="h-2 w-[1px] bg-neutral-500 absolute bottom-0 " />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="h-1.5 w-[1px] bg-neutral-500 absolute bottom-0" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="h-1 w-[1px] bg-neutral-300 absolute bottom-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface MarkerProps {
  isLeft: boolean;
  isDragging: boolean;
  position: number;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className=" absolute top-0 z-[5] w-4 cursor-ew-resize group -ml-2 "
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className=" fill-blue-500  top-0 h-full  left-1/2 transform -translate-x-1/2 " />
      <div
        className="absolute -translate-x-1/2 top-4 transform select-none"
        style={{
          height: "100vh",
          width: "1px",
          backgroundColor: "#3b72f6",
          transform:'scaleX(0.5)',
          display: isDragging? 'block': 'none',
          userSelect:'none'
          
        }}
      ></div>
    </div>
  );
};
