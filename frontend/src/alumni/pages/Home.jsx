import React from "react";

import Contacts from "../components/_home/Contacts";
import EventsNearYou from "../components/_home/EventsNearYou";
import JobsNearYou from "../components/_home/JobsNearYou";
import SuggestedAlbums from "../components/_home/SuggestedAlbums";
import SuggestedContacts from "../components/_home/SuggestedContacts";

const Home = () => {
  return (
    <div className="max-container flex justify-between gap-10">
      <div className="hidden w-[70%] lg:flex bg-red-50">Left</div>
      <div className="flex w-full justify-center bg-red-100">Center</div>
      <div className="hidden w-[70%] md:flex bg-red-200">Right</div>
    </div>
  );
};

export default Home;
