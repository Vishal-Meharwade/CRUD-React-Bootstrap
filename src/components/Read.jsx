import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    axios
      .get("https://67d69e9a286fdac89bc277f2.mockapi.io/React_bootstrap")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://67d69e9a286fdac89bc277f2.mockapi.io/React_bootstrap/${id}`
      )
      .then(() => {
        getData();
      });
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <p>Read + Delete Operation</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email Address</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
          {data.map((eachData) => {
            return (
              <>
                <tr>
                  <th scope="row">{eachData.id}</th>
                  <td>{eachData.name}</td>
                  <td>{eachData.email}</td>
                  <td>
                    <Link to="/update">
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            eachData.id,
                            eachData.name,
                            eachData.email
                          )
                        }
                      >
                        Update
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </thead>
      </table>
    </div>
  );
};

export default Read;
