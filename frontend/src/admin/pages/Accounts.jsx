import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

import AccountsHeader from "../components/AccountsHeader";
import Users from "../components/Users";
import UsersTable from "../components/UsersTable";
import CreateAccount from "../components/CreateAccount";

const Accounts = () => {
  const [openAddAcount, setOpenAddAcount] = useState(false);
  const [users, setUsers] = useState([]);

  const [queryData, setQueryData] = useState({
    search: "",
    sort: "firstName",
    order: "asc",
    filter: "all",
    page: 1,
    pageSize: 10,
  });

  /**
   * Query to fetch list of users
   */
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getUsers(
        `${import.meta.env.VITE_API_BASE_URL}/api/users?page=${
          queryData.page
        }&pageSize=${queryData.pageSize}`
      ),
  });

  /**
   * Filter or Sort the data once the query state changes
   */
  useEffect(() => {
    if (usersQuery.data) {
      const filteredUsers = usersQuery.data.results.filter((user) => {
        const matchesSearch =
          queryData.search === "" ||
          user.username
            .toLowerCase()
            .includes(queryData.search.toLowerCase()) ||
          user.email.toLowerCase().includes(queryData.search.toLowerCase()) ||
          user.firstName
            .toLowerCase()
            .includes(queryData.search.toLowerCase()) ||
          user.lastName.toLowerCase().includes(queryData.search.toLowerCase());

        const matchesFilter =
          queryData.filter === "all" || user.role === queryData.filter;

        return matchesSearch && matchesFilter;
      });

      const sortedUsers = filteredUsers.sort((a, b) => {
        const fieldA = a[queryData.sort].toLowerCase();
        const fieldB = b[queryData.sort].toLowerCase();

        if (fieldA < fieldB) return queryData.order === "asc" ? -1 : 1;
        if (fieldA > fieldB) return queryData.order === "asc" ? 1 : -1;
        return 0;
      });

      setUsers(sortedUsers);
    }
  }, [queryData, usersQuery.data]);

  if (usersQuery.isError)
    return <h1>{JSON.stringify(usersQuery.error.message)}</h1>;

  return (
    <section className="min-w-[800px] flex flex-col gap-10">
      {openAddAcount && <CreateAccount setOpenAddAcount={setOpenAddAcount} />}
      <AccountsHeader
        queryData={queryData}
        setQueryData={setQueryData}
        setOpenAddAcount={setOpenAddAcount}
      />
      <Users data={users} />
      {usersQuery.isLoading ? <h1>Loading...</h1> : <UsersTable data={users} />}
    </section>
  );
};

export default Accounts;
