import Clock from "./components/Clock";
import './App.scss'
import HalfCircle from "./components/HalfCircle";

function App() {

    return (
        <div className="App">
            <Clock timezone={'Europe/London'}/>
            <HalfCircle/>
        </div>
    )
}

export default App
