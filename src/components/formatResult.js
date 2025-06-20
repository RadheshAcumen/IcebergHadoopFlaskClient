import React from "react";

const LogViewer = ({ log }) => {
  console.log(log, 'LogViewer input -------------------------------------');

  if (!log) return null;

  const hasNewLines = typeof log === 'string' && log.includes('\n');

  const formattedLog = hasNewLines
    ? log.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ))
    : log === 'string' ? log : "An unknown error occurred.";

  return (
    <div className="whitespace-pre-wrap font-mono text-sm p-4 bg-gray-100 rounded overflow-auto max-h-[500px] border">
      {formattedLog}
    </div>
  );
};

export default LogViewer;
