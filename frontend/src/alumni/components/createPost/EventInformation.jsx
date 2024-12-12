import React from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { eventCategories } from "../../constants";
import Input from "../Input";

const EventInformation = ({ setEventInformation, eventInformation }) => {
  return (
    <div>
      <div>
        <p>Event Title</p>
        <Input placeholder="eg. Reunion For Batch 2021" name="title" value={eventInformation.title} handleChange={setEventInformation} />
      </div>
      <div>
        <img src="" alt="" />
        <p>Add Location</p>
        <Input placeholder="eg. Baguio City Burnham Park" name="location" value={eventInformation.location} handleChange={setEventInformation} />
      </div>
      <div>
        <img src="" alt="" />
        <p>Category </p>
        <select className="border-[1px]" onChange={setEventInformation} value={eventInformation.category} name="category">
          {eventCategories.map((category, index) => (
            <option key={index}>{category}</option>
          ))}
        </select>
      </div>
      <div>
        <img src="" alt="" />
        <p>Date and Time</p>
        <DateTimePicker format="y-MM-dd h:mm:ss a" name="dateTime" onChange={setEventInformation} value={eventInformation.dateTime} />
      </div>
      <div className="relative">
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
