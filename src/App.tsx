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
                    width: "50vw",
                    height: "50vh",
                    border: "1px solid black",
                }}
            >
                <Map />
            </div>
        </div>
    );
}

export default App;
