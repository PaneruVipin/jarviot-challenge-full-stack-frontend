import { formatSize } from "$/lib/utility";
import React from "react";

const SmallFileItem = ({ file }) => {
  const isFolder = file.mimeType === "application/vnd.google-apps.folder";
  const isImage = file.mimeType.startsWith("image/");
  const isDocument = file.mimeType.startsWith("application/pdf");

  const getIcon = () => {
    if (isFolder) return "far fa-folder text-blue-500 text-lg";
    if (isImage) return "far fa-file-image text-green-500 text-lg";
    if (isDocument) return "far fa-file-pdf text-red-500 text-lg";
    return "far fa-file text-gray-500 text-lg";
  };

  return (
    <div className="flex items-center w-80 gap-x-4 gap-y-4 p-2 bg-white shadow-md rounded-lg mb-2">
      <div className="mr-2">
        <i className={getIcon()}></i>
      </div>
      <div>
        <p className="text-sm font-semibold">{file.name}</p>
        <p className="text-gray-400 text-xs">
          {isFolder ? "Folder" : `${formatSize(file.size)} - ${file.mimeType}`}
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
