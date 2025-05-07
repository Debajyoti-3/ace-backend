import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(()=>{
    axios
    .get(`http://localhost:3000/jokes`)
    .then((response) => {
      setJokes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  },[])
  

  return (
    <>
      <h1>Learning Full Stack</h1>
      <h2>JOKES: {jokes.length}</h2>

      {jokes.map((joke) => {
        <div key={joke.id}>
          <h2>title:{joke.title}</h2>
          <p>content:{joke.content}</p>
        </div>;
      })}
    </>
  );
}

export default App;
