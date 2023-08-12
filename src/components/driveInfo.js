import { revokeAccess } from "$/apis/auth";
import { removeFromLocalStorage } from "$/lib/localstorage";
import { formatSize } from "$/lib/utility";
import { useRouter } from "next/router";
import { memo } from "react";

const driveInfo = ({ info, files, ...props }) => {
  const router = useRouter();
  const revoke = () => {
    revokeAccess();
    removeFromLocalStorage("token");
    router.push("/");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className=" mb-4">
        <p>Total Storage: {formatSize(info.storageQuota?.limit)} </p>
        <p>Storage Usage: {formatSize(info.storageQuota?.usage)} </p>
        <p>Usage in Drive: {formatSize(info.storageQuota?.usageInDrive)}</p>
        <p>
          Usage in trash: {formatSize(info.storageQuota?.usageInDriveTrash)}
        </p>
      </div>
      <div className="flex flex-col items-start">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 mb-2"></div>
        <div className="text-blue-500 font-bold text-lg">
          Scanning... {files.length} files found
        </div>
      </div>
      <div className=" space-y-1">
        <div className="mb-4 flex items-center">
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
        <button
          onClick={revoke}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Revoke Google Access
        </button>
      </div>
    </div>
  );
};

driveInfo.defaultProps = {};

export default memo(driveInfo);
