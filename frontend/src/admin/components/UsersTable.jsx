import React from "react";

import details_icon from "../../assets/details_icon.svg";
import delete_icon from "../../assets/delete.svg";
import check_mark from "../../assets/check mark.svg";

const UsersTable = ({ data }) => {
  return (
    <table className="w-full max-w-[1500px] mx-auto border-[1px]">
      <tbody>
        <tr className="bg-light_blue text-sm font-normal text-light_text">
          <th className="py-3">Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>User Type</th>
          <th>Action</th>
        </tr>

        {data.map((user) => (
          <tr
            className="border-b-[1px] text-md text-center text-light_text"
            key={user.userID}
          >
            <td className="p-2 font-bold">
              {user.firstName} {user.lastName}
            </td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className="p-2 h-full flex justify-center items-center gap-2">
              <button>
                <img src={details_icon} alt="details" />
              </button>
              <button>
                <img src={check_mark} alt="check" />
              </button>
              <button>
                <img src={delete_icon} alt="delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
