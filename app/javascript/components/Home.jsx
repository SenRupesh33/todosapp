import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [todolist, setTodolist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const url = "/api/v1/todolist/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setTodolist(res);
        setIsLoading(false); // Set loading state to false after data is fetched
      })
      .catch(() => navigate("/"));
  }, []);

  const filteredList = todolist.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const descriptionMatch = item.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === "active") {
      return (titleMatch || descriptionMatch) && item.completed === false;
    } else if (statusFilter === "inactive") {
      return (titleMatch || descriptionMatch) && item.completed === true;
    } else {
      return titleMatch || descriptionMatch;
    }
  });

  const onDelete = (id) => {
    const url = `/api/v1/todolist/delete/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          setTodolist((prevList) => prevList.filter((item) => item.id !== id));
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => console.log(error.message));
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render the loader while data is being fetched
  }

  return (
    <div className="container mt-5">
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Completed</option>
        </select>
      </div>
      <table className="table" id="tt">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>
                <input type="checkbox" checked={item.completed} readOnly />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/home/create" className="btn btn-dark">
        Create List
      </Link>
    </div>
  );
};

export default Home;
