import { getFiles, getInfo } from "$/apis/drive";
import FileItem from "$/components/fileItem";
import { formatSize } from "$/lib/utility";
import React, { useState, useEffect } from "react";

export default function Report() {
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState([]);

  const getAllFiles = async (page = "", i = 1) => {
    const data = await getFiles(page);
    if (data?.status === "!200") {
    } else {
      if (i == 1) {
        setFiles([...data.files]);
      } else {
        setFiles((prev) => [...prev, ...data.files]);
      }
      if (data?.nextPageToken) {
        await getAllFiles(data?.nextPageToken, ++i);
      }
    }
  };

  const getAndSaveInfo = async () => {
    const data = await getInfo();
    if (data?.status === "!200") {
    } else {
      setInfo(data);
    }
  };
  useEffect(() => {
    if (process.env.NODE_ENV == "development")
      return () => {
        getAllFiles();
        getAndSaveInfo();
      };
    else {
      getAllFiles();
      getAndSaveInfo();
    }
  }, []);
  return (
    <div className="report-page p-6">
      <h2 className="text-2xl font-semibold mb-4">Google Drive Risk Report</h2>
      <div className="flex justify-between">
        <div className="">
          <div className="user-info mb-4 flex items-center">
            <img
              src={info.user?.photoLink}
              alt="User"
              className="rounded-full w-10 h-10 mr-2"
            />
            <div>
              <p className="text-lg font-semibold">{info.user?.displayName}</p>
              <p className="text-gray-500">{info.user?.emailAddress}</p>
            </div>
          </div>
          <div className="storage-info mb-4">
            <p>Storage Usage: {formatSize(info.storageQuota?.usage)} </p>
            <p>Usage in Drive: {formatSize(info.storageQuota?.usageInDrive)}</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 mb-2"></div>
          <div className="text-blue-500 font-bold text-lg">
            Scanning... {files.length} files found
          </div>
        </div>
      </div>
      <div className="ffile-list">
        <h3 className="text-xl font-semibold mb-2">File List:</h3>
        <div className=" flex flex-wrap">
          {files.map((file, index) => (
            <FileItem key={index} file={file} />
          ))}
        </div>
      </div>
    </div>
  );
}
