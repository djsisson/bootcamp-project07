import "./Avatar.css";

export default function Avatar({ user,icon_id=0 }) {
  return (
    <>
      <div
        className="icon-container"
        active = {icon_id==user.id ? "true" : null}
        style={{ "--bgcolour": user.theme.colour }}
      >
        <img className="icon-select" src={user.path.slice(1)}></img>
      </div>
      
    </>
  );
}
