import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Users() {
  const [users, setuser] = useState([]);
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let controller = new AbortController();
    let isMounted = true;

    const getUsers = async function () {
      try {
        const result = await AxiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log("result : ", result);
        isMounted && setuser(result.data);
      } catch (err) {
        console.log("err ; ", err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [AxiosPrivate]);

  return (
    <h1>
      Users List <br /> <br />
      {!users.length ? (
        <h2>No users to display</h2>
      ) : (
        <ol>
          {users.map((user) => (
            <li key={user._id}>{user.name}</li>
          ))}
        </ol>
      )}
    </h1>
  );
}

export default Users;
