import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div class="h-screen w-full flex-col flex flex-wrap content-center justify-center">
    <h1 className="text-center font-black text-5xl mb-4">404 - Not Found!</h1>
    <Link className="text-center" to="/">
      Go Home
    </Link>
  </div>
);

export default NotFound;
