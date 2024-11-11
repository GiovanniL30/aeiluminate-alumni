import React, { useState } from "react";

import AccountsHeader from "../components/AccountsHeader";

const Accounts = () => {
  const [queryData, setQueryData] = useState({
    search: "",
    sort: "firstName",
    order: "asc",
    filter: "all",
  });

  return (
    <section className="min-w-[800px]">
      <AccountsHeader queryData={queryData} setQueryData={setQueryData} />
      <div>users</div>
      <div>table</div>
      <div>pagination</div>
    </section>
  );
};

export default Accounts;
