import FileItem from "$/components/fileItem";
import { formatSize } from "$/lib/utility";
import React, { useState, useEffect } from "react";

export default function Report() {
  const [info, setInfo] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const userApiResponse = {
      user: {
        kind: "drive#user",
        displayName: "hello world",
        photoLink: "https://lh3.googleusercontent.com/a/default-user=s64",
        me: true,
        permissionId: "07612961798161226202",
        emailAddress: "helloworld12347777777@gmail.com",
      },
      storageQuota: {
        limit: "16106127360",
        usage: "395203",
        usageInDrive: "395203",
        usageInDriveTrash: "0",
      },
    };

    const filesApiResponse = {
      files: [
        {
          mimeType: "application/vnd.google-apps.folder",
          webViewLink:
            "https://drive.google.com/drive/folders/15pyNW17ydMzew5i5d-eVIqTJ-dwznTTI",
          id: "15pyNW17ydMzew5i5d-eVIqTJ-dwznTTI",
          name: "hello  world",
          trashed: false,
        },
        {
          mimeType: "application/pdf",
          webViewLink:
            "https://drive.google.com/file/d/1TeNiz6kN7t_2ZXlTS33k21T3khV6f0RH/view?usp=drivesdk",
          size: "98803",
          id: "1TeNiz6kN7t_2ZXlTS33k21T3khV6f0RH",
          name: "resume.vipin.pdf",
          trashed: false,
        },
        {
          mimeType: "application/pdf",
          webViewLink:
            "https://drive.google.com/file/d/1uWIl7McVSGeN2z9G-OvXxGHSWYmDD5Fh/view?usp=drivesdk",
          size: "98798",
          id: "1uWIl7McVSGeN2z9G-OvXxGHSWYmDD5Fh",
          name: "Experience (3).pdf",
          trashed: false,
        },
        {
          mimeType: "application/pdf",
          webViewLink:
            "https://drive.google.com/file/d/1wNLr5nrnsZmP0sZWI9VOlRhPcWpod2zr/view?usp=drivesdk",
          size: "98801",
          id: "1wNLr5nrnsZmP0sZWI9VOlRhPcWpod2zr",
          name: "Experience (2).pdf",
          trashed: false,
        },
        {
          mimeType: "application/pdf",
          webViewLink:
            "https://drive.google.com/file/d/1amV4GDph3hmdpHW3JTkFWGTKislL6mXk/view?usp=drivesdk",
          size: "98801",
          id: "1amV4GDph3hmdpHW3JTkFWGTKislL6mXk",
          name: "Experience (1).pdf",
          trashed: false,
        },
      ],
    };

    setInfo(userApiResponse);
    setFiles(filesApiResponse.files);
  }, []);

  return (
    <div className="report-page p-6">
      <h2 className="text-2xl font-semibold mb-4">Google Drive Risk Report</h2>
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
      <div className="file-list">
        <h3 className="text-xl font-semibold mb-2">File List:</h3>
        {files.map((file, index) => (
          <FileItem key={index} file={file} />
        ))}
      </div>
    </div>
  );
}
