import { Outlet, Link } from "react-router-dom"
function App() {
  return (
    <div style={{alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column"}}>
      <h1>Hello World!</h1>
      <nav >
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Outlet router/>
      </nav>
    </div>
  )
}

export default App