import { formatSize } from "$/lib/utility";
import React from "react";

const SmallFileItem = ({ file }) => {
  return (
    <div className="flex items-center w-80 p-2 bg-white shadow-md rounded-lg mb-2">
      <div className="mr-2"></div>
      <div>
        <p className="  text-sm font-semibold">{file.name}</p>
        <p className="text-gray-400 text-xs">
          {`${formatSize(file.size)} - ${file.mimeType}`}
        </p>
        <a
          href={file.webViewLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-xs"
        >
          View File
        </a>
      </div>
    </div>
  );
};

export default SmallFileItem;
