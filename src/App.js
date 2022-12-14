import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import TourList from "./TourList";
import SearchBox from "../src/components/Searchbox/SearchBox";

const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  const [searchfield, setSearchfield] = useState("");

  const onSearchChange = (event) => {
    setSearchfield(event.target.value);
    console.log(filteredTours);
  };
  const filteredTours = tours.filter((tour) => {
    return tour.name.toLowerCase().includes(searchfield.toLowerCase());
  });
  useEffect(() => {
    fetch("https://course-api.com/react-tours-project")
      .then((response) => response.json())
      .then((tours) => setTours(tours));
  }, []);

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
    fetchTours();
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
          <h2>No Item</h2>
          <button className="btn" onClick={() => fetchTours()}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className="title">New and Popular</h1>
      <SearchBox searchChange={onSearchChange} />
      <TourList tours={filteredTours} removeTour={removeTour} />
    </main>
  );
}

export default App;
