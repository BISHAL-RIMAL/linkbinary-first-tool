import { useState, useEffect } from "react";
import "./App.css";

function GuestEntry({visit, index, like, toggle, remove}) {
  return(
    <li key={index}>
      <div>
        <p
          style= {{
            display: 'inline',
            border: visit.name.toLowerCase() === "admin" && '2px solid black',
            padding: '5px'
          }}
          >Name: {visit.name}</p>
          <p>Message:
          {visit.private ? 
          (<button className='toggle'
          onClick={() => toggle(index)}>
          {visit.visible ? 'Hide Private Message' : 'View Private Message'}
          </button>) : visit.message}
          {visit.visible && visit.private && <p>{visit.message}</p>}
          </p>
          <p>Likes: {visit.likes}</p>
          <button className="like" onClick={() => like(index)}>Like</button>
          <button className="remove" onClick={() => remove(index)}>Remove</button>
        <p>{visit.timestamp}</p>
      </div>
    </li>
  );
}

function App(){
  //initialize array
  const [visitor, setVisitor] = useState(loadEntries());
  const [v_name, setName] = useState("");
  const [Message, setMessage] = useState("");
  const [Private, setPrivate] = useState(false);
  const [search, setSearch] = useState("");

  const addVisitor =() => {
    if (v_name.trim() ==="") return;
    const newVisitor = {name:v_name, message:Message,
      private: Private, likes: 0, visible:false,
      timestamp: new Date().toLocaleString() };
    setVisitor([...visitor, newVisitor]);
    setName(""); setMessage("");
    setPrivate(false);
  };

  const Like = (index) => {
    const newList = [...visitor];
    newList[index].likes +=1;
    setVisitor(newList);
  };

  const Toggle = (index) =>{
    const newList = [...visitor];
    newList[index].visible = !newList[index].visible;
    setVisitor(newList);
  }

  const Remove = (v_id) => {
    setVisitor(visitor.filter((_, index) => index !== v_id));
  };

  // save entries to localstorage
  useEffect(() => {
    saveEntries(visitor);
  }, [visitor]);
  //save
  function saveEntries(entries){
    localStorage.setItem("visitor", JSON.stringify(entries));
  }
  
  //load entries from local storage
  function loadEntries() {
    const savedEntries = localStorage.getItem("visitor");
    return savedEntries ? JSON.parse(savedEntries): [];
  }

  //handle search
  const searchWord = (e) => {
    setSearch(e.target.value);
  };
  //filter search
  const keyword = visitor.filter(visit =>{
    return(
      visit.name.toLowerCase().includes(search.toLowerCase()) ||
      visit.message.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <h1>Digital Guestbook</h1>
      <input
        type="text"
        value={search}
        onChange={searchWord}
        placeholder="Search For Visitor Or Message"
      /><br/>
      <input
        type="text" value={v_name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Visitor Name"/><br/>
      <input
        type="text" value={Message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter Message"/><br/>
      <label>
        <input
          type="checkbox" checked={Private}
          onChange={(e) => setPrivate(e.target.checked)}>
        </input>Mark For Private<br/>
      </label>
      <button onClick={addVisitor}>Add Visitor</button>

      {visitor.length ===0 ?
      (<p>Visitor Entry Is Empty !</p>):
      (<ul className="display">
        {keyword.map((visit, index) =>(
          <GuestEntry
            key={index}
            index={index}
            visit={visit}
            like={Like}
            toggle={Toggle}
            remove={Remove}
          />
        ))}
      </ul>)}
    </div>
  );
}
export default App;