import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditPost() {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    email: "",
    contact: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState({});

  const queryParams = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.JWT}`,
          },
        };

        const response = await fetch(
          `http://localhost:1337/api/posts/${queryParams.id}?populate=*`,
          requestOptions
        );
        const json = await response.json();
        const { name, birthday, contact, email } = json.data.attributes;
        setFormData({ name, birthday, contact, email });
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const imageFile = files[0];
      setFile({ ...file, [name]: imageFile });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const form = new FormData();

      delete formData.image;

      form.append("data", JSON.stringify(formData));

      form.append("files.image", file.image, file.image.name);

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        body: form,
      };

      const response = await fetch(
        `http://localhost:1337/api/posts/${queryParams.id}`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);

      if (data["data"] === null) throw data["error"];

      alert("Successfully Edited!");
      setError(false);
      e.target.reset();
      navigate("/");
    } catch (err) {
      alert(err.message);
      location.reload();
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-800 content-center">
      <button className="px-4 py-2 ml-10 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:bg-slate-600 -ml-max">
        <Link to="/">Back</Link>
      </button>
      <div className="container mx-auto border-4 border-black p-10 max-w-md rounded-lg dark:bg-gray-950">
        <h1 className="max-w-sm mx-auto block text-5xl font-medium text-gray-900 dark:text-white mb-12">
          Edit Object
        </h1>
        {loading || error ? (
          <p>Please Wait...</p>
        ) : (
          <>
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-5">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="birthday"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Birthday
                </label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  value={formData.birthday}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="contact"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact No.
                </label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  for="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditPost;
