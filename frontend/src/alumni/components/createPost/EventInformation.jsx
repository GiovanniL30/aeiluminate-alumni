import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { eventCategories } from "../../constants";
import Input from "../Input";
import loc from "../../../assets/loc.png";
import time from "../../../assets/time.png";
import create_event from "../../../assets/create_event.png";
import category from "../../../assets/category.png";

const EventInformation = ({ setEventInformation, eventInformation }) => {
  return (
    <div>
      <div>
        <p>Event Title</p>
        <Input placeholder="eg. Reunion For Batch 2021" name="title" value={eventInformation.title} handleChange={setEventInformation} />
      </div>
      <div>
        <div className="flex flex-row gap-2 items-center mt-5">
          <img className="h-5" src={loc} alt="location" />
          <p>Add Location</p>
        </div>
        <Input placeholder="eg. Baguio City Burnham Park" name="location" value={eventInformation.location} handleChange={setEventInformation} />
      </div>
      <div>
        <div className="flex flex-row gap-2 items-center mt-5">
          <img className="h-4" src={category} alt="event type" />
          <p>Category </p>
        </div>
        <select className="border-[1px]" onChange={setEventInformation} value={eventInformation.category} name="category">
          {eventCategories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <div className="flex flex-row gap-2 items-center mt-5">
          <img className="h-5" src={create_event} alt="calendar" />
          <p>Date and Time</p>
        </div>
        <DateTimePicker format="y-MM-dd h:mm:ss a" name="dateTime" onChange={setEventInformation} value={eventInformation.dateTime} />
      </div>
      <div className="relative mt-5">
        <p>Event Description</p>
        <textarea
          value={eventInformation.description}
          onChange={setEventInformation}
          name="description"
          placeholder="eg. Party Party"
          className="p-2  text-sm focus:outline-none resize-none border-[1px] w-full h-36"
        ></textarea>
        <p className="absolute text-sm text-light_text bottom-3 right-3">
          {eventInformation.description.length}/{225}
        </p>
      </div>
    </div>
  );
};

export default EventInformation;
