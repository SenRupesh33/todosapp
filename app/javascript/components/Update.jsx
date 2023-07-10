import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Update = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const handleCheckboxChange = () => {
    setCompleted(!completed);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/todolist/update";
    if (title.length == 0 || description.length == 0 || completed.length == 0)
      return;
    const body = {
      title,
      description,
      completed
    };
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate("/"))
      .catch((error) => console.log(error.message));
  };
  return (
    <>
      <div className="container d-flex justify-content-center mt-5">
        <form className="border p-5 bg-black-subtle" style={{border:"4px white",color:"white",borderRadius:"20px"}}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={title} onChange={(e) => setTitle(e.target.value)} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input type="text" className="form-control" id="exampleInputPassword1" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={completed} onChange={handleCheckboxChange} />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <div className="text-center mt-4">
          <button type="submit" className="btn btn-dark" onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Update;