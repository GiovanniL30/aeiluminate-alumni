import React from "react";

const Tag = ({ title, count }) => {
  return (
    <div className="flex flex-col bg-light_blue py-2 pl-4 pr-16 gap-2 rounded-xl">
      <h1 className="font-semibold text-sm text-light_text">{title}</h1>
      <p className="font-semibold text-xl text-text_color">{count}</p>
    </div>
  );
};

const Users = ({ data }) => {
  if (!data) return <h1>Loading</h1>;

  const totalAlumni = data.filter((user) => user.role === "Alumni").length;
  const totalManager = data.filter((user) => user.role === "Manager").length;

  return (
    <div className="flex gap-6">
      <Tag title={"Total User"} count={data.length} />
      <Tag title={"Manager"} count={totalManager} />
      <Tag title={"Alumni"} count={totalAlumni} />
    </div>
  );
};

export default Users;
