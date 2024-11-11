import React, { useCallback, useState } from "react";

import AccountsHeader from "../components/AccountsHeader";
import Users from "../components/Users";
import UsersTable from "../components/UsersTable";
import CreateAccount from "../components/CreateAccount";

const Accounts = () => {
  const [openAddAcount, setOpenAddAcount] = useState(false);

  const [queryData, setQueryData] = useState({
    search: "",
    sort: "firstName",
    order: "asc",
    filter: "all",
  });

  return (
    <section className="min-w-[800px]">
      {openAddAcount && <CreateAccount setOpenAddAcount={setOpenAddAcount} />}
      <AccountsHeader
        queryData={queryData}
        setQueryData={setQueryData}
        setOpenAddAcount={setOpenAddAcount}
      />
      <Users />
      <UsersTable />
    </section>
  );
};

export default Accounts;
