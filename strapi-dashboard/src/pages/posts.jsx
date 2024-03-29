import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Posts() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              `Bearer ${process.env.JWT}`,
          },
        };

        const response = await fetch(
          "http://localhost:1337/api/posts?populate=*",
          requestOptions
        );
        const json = await response.json();
        setData(json.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (index) => {
    setLoading(true);
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
          `Bearer ${process.env.JWT}`,
        },
      };

      const response = await fetch(
        `http://localhost:1337/api/posts/${index}`,
        requestOptions
      );
      const json = await response.json();
      setData(data.filter((item) => item.id !== index));
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-800 pb-12">
      <h1 className="text-4xl font-bold mb-8 pt-10 text-center text-white">
        Data from Strapi
      </h1>
      <div className="space-y-6 max-w-[800px] mx-auto">
        {loading && !error ? (
          <p className="text-center">Loading...</p>
        ) : (
          <>
            <button className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:bg-green-600 transition-colors duration-300">
              <Link to="/new">Create New</Link>
            </button>

            {data.map(({ id, attributes }, index) => (
              <div
                key={id}
                className="bg-white border border-gray-300 rounded-lg shadow-lg p-6"
              >
                <h2 className="text-2xl font-semibold mb-4">ID: {id}</h2>
                {attributes.image.data? (<img src={`http://localhost:1337${attributes?.image.data?.attributes.formats.thumbnail.url}`} alt="Thumbnail" />) : (<></>)}
                <div className="space-y-4">
                  {Object.entries(attributes)
                    .filter(
                      ([key, value]) =>
                        key !== "image" && key !== "localizations"
                    )
                    .map(([key, value]) => (
                      <div key={key}>
                        <span className="text-lg font-semibold">{key}:</span>{" "}
                        {value}
                      </div>
                    ))}
                </div>
                <div className="flex justify-end mt-6">
                  <button className="px-6 py-3 mr-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition-colors duration-300">
                    <Link to={`/edit/${id}`}>Edit</Link>
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition-colors duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Posts;
