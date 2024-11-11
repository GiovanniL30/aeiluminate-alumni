import React, { useState } from "react";

import search from "../../assets/search.svg";
import filter from "../../assets/filter.png";
import down from "../../assets/chevron-down.png";
import filter_name from "../../assets/first_name_icon.svg";
import user from "../../assets/user.svg";
import ascending from "../../assets/ascending.svg";
import descending from "../../assets/descending.svg";

import DropDownOptions from "../components/DropDownOptions";
import Button from "./Button";

const sortOptions = [
  {
    title: "First Name",
    icon: filter_name,
    value: "firstName",
  },
  {
    title: "Last Name",
    icon: filter_name,
    value: "lasttName",
  },
  {
    title: "User Name",
    icon: user,
    value: "username",
  },
];

const orderBy = [
  {
    title: "Ascending",
    icon: ascending,
    value: "asc",
  },
  {
    title: "Descending",
    icon: descending,
    value: "desc",
  },
];

const filterOption = [
  {
    title: "All",
    value: "all",
  },
  {
    title: "Alumni",
    value: "Alumni",
  },
  {
    title: "Manager",
    value: "Manager",
  },
];

const AccountsHeader = ({ queryData, setQueryData, setOpenAddAcount }) => {
  const [activeDropDown, setActiveDropDown] = useState({
    name: "",
    open: false,
  });

  const handleOpenDropDown = (value) => {
    setActiveDropDown((prev) => ({
      name: value,
      open: prev.name === value ? !prev.open : true,
    }));
  };

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setQueryData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-between">
      <div className="relative w-[400px]">
        <input
          className="w-full border-[1px] rounded-full border-light_text bg-light_blue text-sm p-2 pl-10 focus:outline-primary_blue"
          type="text"
          placeholder="Search"
          name="search"
          value={queryData.search}
          onChange={(e) => handleOptionChange(e)}
        />
        <img
          className="absolute top-1/2 -translate-y-1/2 w-4 left-3 mt-[1px]"
          src={search}
          alt=""
        />
      </div>
      <div className="flex items-center gap-5">
        <Button
          text="Add Account +"
          otherStyle="!rounded-full"
          onClick={() => setOpenAddAcount(true)}
        />
        <button
          onClick={() => handleOpenDropDown("sort")}
          className="flex items-center gap-2  text-sm relative"
        >
          <p>Sort by</p> <img src={down} alt="" />
          {activeDropDown.name == "sort" && activeDropDown.open && (
            <div className="flex flex-col absolute -left-20 top-10  border-[1px] rounded-md shadow-md w-40 items-center p-2 gap-2 bg-white">
              <DropDownOptions
                options={sortOptions}
                handleOptionChange={handleOptionChange}
                queryData={queryData.sort}
                name="sort"
              />

              <div className="border-[0.7px] w-full"></div>
              <DropDownOptions
                options={orderBy}
                handleOptionChange={handleOptionChange}
                queryData={queryData.order}
                name="order"
              />
            </div>
          )}
        </button>
        <button
          className="relative"
          onClick={() => handleOpenDropDown("filter")}
        >
          <img src={filter} alt="filter" />
          {activeDropDown.name == "filter" && activeDropDown.open && (
            <div className="flex flex-col absolute -left-20  top-10  border-[1px] rounded-md shadow-md items-center p-2 gap-2 bg-white ">
              <DropDownOptions
                otherStyle="w-full gap-0"
                options={filterOption}
                handleOptionChange={handleOptionChange}
                queryData={queryData.filter}
                name="filter"
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountsHeader;
