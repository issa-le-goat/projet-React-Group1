import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { User as UserType } from "../types/user";

export default function User() {
  const { id } = useParams();
  const users = useSelector((state: RootState) => state.auth.usersList);
  const user = users.find((el: UserType) => el.id === Number(id));

  return (
    <div className="page-container text-center">
      {user ? (
        <h2>Username : {user.username}</h2>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}