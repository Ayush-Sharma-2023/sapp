const Home = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-center text-white px-4">
      <h1 className="text-4xl font-bold mb-4">
        Community Resource Management
      </h1>
      <p className="text-gray-300 text-lg mb-6">
        Connecting communities with essential resources during emergencies. 
        Share, find, and request resources in your local area.
      </p>
      <div className="space-x-4">
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition">
          Find Resources
        </button>
        <button className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition">
          Share Resource
        </button>
      </div>
    </div>
  );
};

export default Home;
