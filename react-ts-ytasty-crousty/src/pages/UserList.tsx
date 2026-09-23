/*import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../types/user";*/
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
/*interface UsersResponse {
  users: User[];
}*/
function UserList() {
  const users = useSelector((state: RootState) => state.user.users)
  /*
  const url = "https://dummyjson.com/users";
  const [users, setUsers] = useState<User[]>([])
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<UsersResponse>(url);
        setUsers(response.data.users);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);*/

  return (
    <>
      {users.map((user) =>
        <div>
          <p>name : {user.firstName}</p>
          <p>last name : {user.lastName}</p>
          <Link to={`/user/${user.id}`}>Go to user</Link>
        </div>
      )}
    </>

  );
}

export default UserList;