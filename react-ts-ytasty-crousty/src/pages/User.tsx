//import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { User as UserType } from "../types/user";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function User() {
  const users = useSelector((state: RootState) => state.user.users)
  const [user, setUser] = useState<UserType>();
  const { userId } = useParams();
  const [error, setError] = useState<string>("No user found");
  useEffect(() => {
    (async () => {
      try {
        if (!userId) {
          setError("No user id")
          throw Error("No user id")
        }
        const findUser = users.find(el => el.id == parseInt(userId));
        setUser(findUser);
      } catch (e) {
        let message = 'Unknown Error'
	      if (e instanceof Error) message = e.message
        setError(message)
        console.error(e);
      }
    })();
  }, [userId]);

  return (
    <>
      <div>
        {user ?
          <>
            <p>name : {user.firstName}</p>
            <p>last name : {user.lastName}</p>
          </>
          :
          <p>{error}</p>}
      </div>
    </>
  );
}

export default User;