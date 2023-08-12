import { getFiles, getInfo } from "$/apis/drive";
import DriveInfo from "$/components/driveInfo";
import FileItem from "$/components/fileItem";
import { removeFromLocalStorage } from "$/lib/localstorage";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Report() {
  const router = useRouter();
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState([]);
  const [visibleItems, setVisibleItems] = useState(10);

  const handleLoadMoreClick = () => {
    setVisibleItems(visibleItems + 10);
  };
  const hideLoadMore = files.length >= visibleItems;
  const getAllFiles = async (page = "", i = 1) => {
    const data = await getFiles(page);
    if (data?.status === "!200") {
      await getAndSaveInfo();
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
      removeFromLocalStorage("token");
      router.push("/");
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
    <>
      {Object.keys(info)?.length ? (
        <div className=" p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Google Drive Risk Report
          </h2>
          <DriveInfo info={info} files={files} />
          <div className="">
            <h3 className="text-xl font-semibold mb-2">File List:</h3>
            <div className=" flex gap-4 justify-start flex-wrap">
              {files.slice(0, visibleItems).map((file, index) => (
                <FileItem key={index} file={file} />
              ))}
            </div>
            {hideLoadMore ? (
              <button
                onClick={handleLoadMoreClick}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Load More
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
