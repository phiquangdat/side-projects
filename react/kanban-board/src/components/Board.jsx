import List from "./List";
export default function Board({ boardName }) {
  return (
    <>
      <List listName="To Do"></List>
      <List listName="In Progress">
        {/* <button onClick={onClick}>Edit</button> */}
      </List>
      <List listName="Done">
        {/* <button onClick={onClick}>Edit</button> */}
      </List>
    </>
  );
}
