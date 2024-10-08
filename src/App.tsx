import { Map } from "./components/Map";

function App() {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "1000px",
                    height: "500px",
                    border: "1px solid black",
                }}
            >
                <Map />
            </div>
        </div>
    );
}

export default App;
