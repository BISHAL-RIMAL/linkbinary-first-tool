import { useState } from "react";

function GuestEntry({visit, index, like, Toggle, remove}) {
  return(
    <li key={index}>
            <div
            style= {{
              display: 'inline-block',
              border: visit.name.toLowerCase() === "admin" && '2px solid black',
              padding: '5px'
            }}>
            <p>Name: {visit.name}</p></div> 
            <p>Message: {visit.private ? 
            (<button onClick={() => Toggle(index)}>
            {visit.visible ? 'Hide Private Message' : 'View Private Message'}
            </button>) : visit.message}
            {visit.visible && visit.private && <p>{visit.message}</p>}
            </p>
            <p>Likes: {visit.likes}</p>
            <button onClick={() => like(index)}>Like</button>
            <button onClick={() => remove(index)}>Remove</button>
          </li>
  );
}
function App(){
  //initialize array
  const [visitor, setVisitor] = useState([]);
  const [v_name, setName] = useState("");
  const [Message, setMessage] = useState("");
  const [Private, setPrivate] = useState(false);

  const addVisitor =() => {
    if (v_name.trim() ==="") return;
    setVisitor([...visitor, {name:v_name, message:Message,
      private: Private, likes: 0, visible:false }]);
    setName(""); setMessage("");
    setPrivate(false);
  };

  const Like = (index) => {
    const newList = [...visitor];
    newList[index].likes +=1;
    setVisitor(newList);
  };

  const toggle = (index) =>{
    const newList = [...visitor];
    newList[index].visible = !newList[index].visible;
    setVisitor(newList);
  }

  const Remove = (v_id) => {
    setVisitor(visitor.filter((_, index) => index !== v_id));
  };

  return (
    <div>
      <h1>Digital Guestbook</h1>
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
      (<ul>
        {visitor.map((visit, index) =>(
          <GuestEntry
            key={index}
            index={index}
            visit={visit}
            like={Like}
            Toggle={toggle}
            remove={Remove}
          />
        ))}
      </ul>)}
    </div>
  );
}
export default App;