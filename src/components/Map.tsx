// タイルの左上のx, y座標、タイルの中身を受け取って描画するコンポーネント
function Tile({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
    return (
        <div
            style={{
                position: 'absolute',
                left: x * 100,
                top: y * 100,
                width: 100,
                height: 100,
                border: '1px solid black',
            }}
        >
            {children}
        </div>
    );
}

export function Map() {
    return (
        <div
            style={{
                position: 'relative',
            }}
        >
            <Tile x={0} y={0}>A</Tile>
            <Tile x={1} y={0}>B</Tile>
            <Tile x={2} y={0}>C</Tile>
            <Tile x={0} y={1}>D</Tile>
        </div>
    );
}
