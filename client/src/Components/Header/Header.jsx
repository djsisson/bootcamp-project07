import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return <header onClick={() => navigate("/Posts")}>React Guest Book</header>;
}
