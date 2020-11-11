import React, { useState, useEffect } from "react";
import axios from "axios";
import endPoints from "utils/api";
import Header from "./Header";
import Mentors from "./Mentors";

export default function MentorWrapper() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    fetchMentorsData();
  }, []);

  const fetchMentorsData = async () => {
    try {
      const { data = [] } = await axios.get(endPoints.home.mentors);
      setMentors(data);
    } catch (e) {}
  };

  return (
    <div className="main_container">
      <Header setMentors={setMentors} />
      <Mentors mentors={mentors} setMentors={setMentors} />
    </div>
  );
}
