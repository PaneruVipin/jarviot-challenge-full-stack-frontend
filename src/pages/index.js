export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen flex ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 ml-[10%] mt-[10%] h-full">
        <h1 className="text-2xl font-bold mb-4">Link Google Drive</h1>
        <p className="mb-4">
          Click the button below to link your Google Drive account:
        </p>
        <a
          href="http://localhost:4000/google/redirect"
          className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded  text-center"
        >
          Link Google Drive
        </a>
        <p className="mt-4 text-sm text-gray-500">
          You need to sign in with your Google account to link your Drive.
        </p>
      </div>
    </main>
  );
}
