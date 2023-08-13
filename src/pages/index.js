import { getFromLocalStorage, setInLocalStorage } from "$/lib/localstorage";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const token = () => router.query.t || getFromLocalStorage("token");
  useEffect(() => {
    if (token()) {
      router.push("report");
      setInLocalStorage("token", token());
    }
  }, [token()]);
  return (
    <main className="bg-gray-100 min-h-screen flex ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 ml-[10%] mt-[10%] h-full">
        <h1 className="text-2xl font-bold mb-4">Link Google Drive</h1>
        <p className="mb-4">
          Click the button below to link your Google Drive account:
        </p>
        <a
          href={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/google/redirect"}
          className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  text-center"
        >
          Link Google Drive
        </a>
        <p className="mt-4 text-md text-gray-500">
          <strong>Important:</strong> Make sure to sign in with your Google
          account and provide the necessary permissions to enable linking to
          your Google Drive.
        </p>
      </div>
    </main>
  );
}
