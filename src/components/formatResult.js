import React from "react";

const LogViewer = ({ log }) => {
  console.log(log, 'LogViewer input -------------------------------------');

  if (!log) return null;

  // Normalize the log into an array of lines
  let lines = [];

  if (Array.isArray(log)) {
    lines = log;
  } else if (typeof log === 'string') {
    lines = log.split('\n');
  } else {
    return <div className="text-red-500">Unsupported log format</div>;
  }

  return (
    <div className="whitespace-pre-wrap font-mono text-sm p-4 bg-gray-100 rounded overflow-auto max-h-[500px] border">
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default LogViewer;
