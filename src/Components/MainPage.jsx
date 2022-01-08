import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MainPage.module.css";

export const MainPage = () => {
    const [data, setData] = useState([]);
    const [date, setDate] = useState("");
    const [filterDate, setFilterDate] = useState([]);

    useEffect(() => {
        getData();
        
    }, [])

    const getData = async () => {
        let res = await axios.get("https://www.gov.uk/bank-holidays.json");
        const { scotland } = res.data;
        setData(scotland.events);
        console.log(scotland.events);
    }

    const currentDate = () => {
        let date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let day = date.getDate()-1;
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        var fullDate = year + "-" + month + "-"  + day;
        console.log(fullDate);
    }

    const handleChange = (el) => {
        setDate(el.target.value);
        let filteredDate = data.filter((e, i) => {
            if (e.date === el.target.value) {
                return e;
            }
        })
        setFilterDate(filteredDate);
    }

    const changeSelect = (e) => {
        let selectedDay = e.target.value;
        // console.log(selectedDay);
        if (selectedDay === "Yesterday") {
            currentDate();
        }
    }

    return (
      <div className={styles.mainDiv}>
        <div className={styles.select}>
          <label>Select Day: </label>
          <select name="selectDay" onChange={changeSelect}>
            <option>Select Day</option>
            <option value="Yesterday">Yesterday</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
          </select>
        </div>
        <div className={styles.select}>
          <label>Select Date: </label>
          <input type="date" onChange={handleChange} />
        </div>
        <div>
          {filterDate.map((e, i) => {
            return (
              <div key={i} className={styles.displayData}>
                    <h1 className={styles.title}>{e.title}</h1>
                    <p>{e.date}</p>
                    <p>{e.notes}</p>
                    <p>{e.bunting ? "Let's Celebrate" : "Sorry no celebrations"}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
}