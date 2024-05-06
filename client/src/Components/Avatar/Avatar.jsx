import "./Avatar.css";

export default function Avatar({ user }) {
  return (
    <>
      <div
        className="icon-container"
        style={{ "--bgcolour": user.icon.theme.colour }}
      >
        <img className="icon-select" src={user.icon.path.slice(1)}></img>
      </div>
    </>
  );
}
