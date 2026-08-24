// import Hello from "../../components/hello";

const Home = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  const albums = await response.json();

  const response2 = await fetch(`http://localhost:3000/api/books/${1}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 1, name: "The Power of Habit" }),
  });

  const albumGenerated = await response2.json();
  console.log("albumGenerated", albumGenerated);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {albums.map((album: { id: number; title: string }) => (
        <div
          key={album.id}
          className="bg-black shadow-md rounded-lg p-4 transition t..."
        >
          <h3 className="text-lg font-bold mb-2">{album.title}</h3>
          <p className="text-gray-600">Album ID: {album.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
