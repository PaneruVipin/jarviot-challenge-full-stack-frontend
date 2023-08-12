import { memo } from "react";

const Variations = ({ files }) => {
  const imageCount = files?.filter((file) =>
    file.mimeType.includes("image")
  ).length;
  const videoCount = files?.filter((file) =>
    file.mimeType.includes("video")
  ).length;

  const fileSizeLess1Kb = files?.filter(
    (file) => Number(file.size) <= 1024
  ).length;
  const fileSize1KbTo1Mb = files?.filter(
    (file) => Number(file.size) > 1024 && Number(file.size) <= 1024 * 1024
  ).length;
  const fileSize1MbTo1Gb = files?.filter(
    (file) =>
      Number(file.size) > 1024 * 1024 && Number(file.size) <= 1024 * 1024 * 1024
  ).length;
  const fileSizeMore1Gb = files?.filter(
    (file) => Number(file.size) > 1024 * 1024 * 1024
  ).length;

  const duplicateNames = {};
  files.forEach((file) => {
    if (!duplicateNames[file.name]) {
      duplicateNames[file.name] = 1;
    } else {
      duplicateNames[file.name]++;
    }
  });

  const duplicateCount = Object.values(duplicateNames).filter(
    (count) => count > 1
  ).length;
  const duplicateList = Object.entries(duplicateNames)
    .filter(([name, count]) => count > 1)
    .map(([name, count]) => `${name}-${count}`);

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <p className="text-xl font-semibold">File Types</p>
          <p className="text-lg">Images: {imageCount}</p>
          <p className="text-lg">Videos: {videoCount}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <p className="text-xl font-semibold">File Size</p>
          <p className="text-lg">{`less then 1 KB: ` + fileSizeLess1Kb}</p>
          <p className="text-lg">{`1KB to 1 MB: ` + fileSize1KbTo1Mb}</p>
          <p className="text-lg">{`1mb to 1 GB: ` + fileSize1MbTo1Gb}</p>
          <p className="text-lg">{`more then 1 GB: ` + fileSizeMore1Gb}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded-lg">
          <p className="text-xl font-semibold">Duplicate Names</p>
          <p className="text-lg">
            Files with Duplicate Names: {duplicateCount}
          </p>
          <ul className="list-disc pl-4">
            {duplicateList.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Variations);
