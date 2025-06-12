import React from "react";

const LogViewer = ({ log }) => {
  if (!log) return null;

  // Convert \n to JSX line breaks
  const formattedLog = log.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <div className="whitespace-pre-wrap font-mono text-sm p-4 bg-gray-100 rounded overflow-auto max-h-[500px] border">
      {formattedLog}
    </div>
  );
};

export default LogViewer;
