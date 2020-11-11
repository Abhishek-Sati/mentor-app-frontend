import React, { useState, useEffect } from "react";
import Error500 from "components/Common/Error500";
import axios from "axios";
import endPoints from "utils/api";
import Header from "./Header";
import Tasks from "./Tasks";

export default function MentorDetails({ location: { state: { mentor } = {} } = {} }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasksData();
  }, []);

  const fetchTasksData = async () => {
    try {
      const { data = [] } = await axios.get(`${endPoints.detail.base}/all`, {
        params: { _id: mentor._id },
      });
      setTasks(data);
    } catch (e) {}
  };

  if (!mentor) return <Error500 />;
  return (
    <div className="main_container">
      <Header setTasks={setTasks} mentor={mentor} />
      <Tasks tasks={tasks} setTasks={setTasks} mentor={mentor} />
    </div>
  );
}
