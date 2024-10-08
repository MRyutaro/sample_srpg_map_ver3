import { Map } from "./components/Map";

function App() {
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "1000px",
                    height: "500px",
                    // width: "100%",
                    // height: "100vh",
                    border: "1px solid black",
                }}
            >
                <Map />
            </div>
        </div>
    );
}

export default App;
