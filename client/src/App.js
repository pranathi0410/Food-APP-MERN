
import "./App.css";
import GlobalCartBar from "./siwggy-components/GlobalCartBar";
import Header from "./siwggy-components/Header";
// import Footer from "./siwggy-components/Footer";
import { Outlet } from "react-router-dom";


function App() {

return(
 <div className="app-container">
 <Header/>
 <Outlet/>
 <GlobalCartBar/>
  
 </div>
)


}

export default App;
  
