import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  console.log(`hello devs`)

  useEffect(()=>{
    axios.get(`/api/jokes`)
    .then((response) => {
    console.log(`response data ${response.data}`)
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

      {jokes.map((joke,index) => (
        <div key={joke.id}>
          <h2>{joke.title}</h2>
          <p>{joke.content}</p>
        </div>
      ))}
    </>
  );
}

export default App;
