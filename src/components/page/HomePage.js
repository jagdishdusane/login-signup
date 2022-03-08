import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque excepturi
        delectus nam laboriosam quam modi nihil. Nisi porro non exercitationem.
        Soluta molestias minus delectus, provident porro maxime velit asperiores
        perferendis?
      </p>
      <button className="btn">
        <Link to="/">Logout</Link>
      </button>
    </>
  );
};
export default HomePage;
