import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./Loading";
import Tour from './Tour';

const url = "https://course-api.com/react-tours-project";

const TourList = () => {
  
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
      } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours("https://course-api.com/react-tours-project");
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <section>
      <Navbar/>

      <div className="title">
        <div className="underline"></div>
      </div> 

      <div>
        {tours.map((tour) => {
          return (
          <Tour 
          key={tour.id} 
          id={tour.id}
          name={tour.name}
          {...tour} 
          removeTour={removeTour} 
          />
          );

        })}
      </div>
      
    </section>
  );
};

export default TourList;