import React, { useState, useEffect } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
const Show = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState([]);
    useEffect(() => {
        const url = `/api/v1/show/${params.id}`;
        fetch(url)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then((response) => setRecipe([response]))
            .catch(() => navigate("/"));
    }, [params.id]);
    console.log(recipe, "recipes");
    return (
        <>
            {recipe.map((item) =>
                <div>
                    <h1>{item.title}</h1>
                    <h1>{item.description}</h1>
                </div>
            )}
        </>
    )
}

export default Show;