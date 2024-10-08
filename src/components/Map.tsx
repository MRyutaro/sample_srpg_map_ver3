import { useEffect, useState } from "react";

// 定数定義
const TILE_SIDE_LENGTH = 100; // タイルのサイズ
const ROTATE_X = 66; // マップの平たさ具合(deg)
const MAP_OFFSET_X = 20; // マップのX方向のオフセット
const MAP_OFFSET_Y = -21.7; // マップのY方向のオフセット

// TileProps インターフェース定義
interface TileProps {
    x: number;
    y: number;
    tileHalfWidth: number;
    tileHalfHeight: number;
    children?: React.ReactNode;
}

function Tile({ x, y, tileHalfWidth, tileHalfHeight, children }: TileProps) {
    return (
        <div
            style={{
                position: "absolute",
                width: TILE_SIDE_LENGTH,
                height: TILE_SIDE_LENGTH,
                left: `${MAP_OFFSET_X + x * tileHalfWidth - y * tileHalfWidth}px`,
                top: `${
                    MAP_OFFSET_Y +
                    y * (tileHalfWidth * Math.cos((ROTATE_X * Math.PI) / 180)) +
                    x * (tileHalfWidth * Math.cos((ROTATE_X * Math.PI) / 180))
                }px`,
                transform: `rotateX(${ROTATE_X}deg) rotateZ(45deg)`,
                border: "1px solid black",
            }}
        >
            {children}
        </div>
    );
}

export function Map() {
    const [tilesNum, setTilesNum] = useState({ x: 3, y: 3 });
    const [tileHalfWidth, setTileHalfWidth] = useState<number>(0);
    const [tileHalfHeight, setTileHalfHeight] = useState<number>(0);

    useEffect(() => {
        // タイルの幅と高さを計算して設定
        const newTileHalfWidth = TILE_SIDE_LENGTH / Math.sqrt(2) + 0.7;
        const newTileHalfHeight = TILE_SIDE_LENGTH / (Math.sqrt(2) * Math.tan((ROTATE_X * Math.PI) / 180));

        setTileHalfWidth(newTileHalfWidth);
        setTileHalfHeight(newTileHalfHeight);
    }, []);

    useEffect(() => {
        // ウィンドウサイズが変更されたときにタイルの数を再計算
        const handleResize = () => {
            setTilesNum({
                x: Math.ceil(window.innerWidth / tileHalfWidth),
                y: Math.ceil(window.innerHeight / tileHalfHeight),
            });
        };

        if (tileHalfWidth > 0 && tileHalfHeight > 0) {
            handleResize();
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [tileHalfWidth, tileHalfHeight]);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    padding: "8px",
                    background: "lightgray",
                }}
            >
                {tilesNum.x} x {tilesNum.y}
            </div>
            <Tile x={0} y={0} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (0, 0)
            </Tile>
            <Tile x={1} y={-1} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (1, -1)
            </Tile>
            <Tile x={2} y={-2} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (2, -2)
            </Tile>
            <Tile x={3} y={-3} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (3, -3)
            </Tile>
            <Tile x={4} y={-4} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (4, -4)
            </Tile>
            <Tile x={5} y={-5} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (5, -5)
            </Tile>
            <Tile x={6} y={-6} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                (6, -6)
            </Tile>
        </div>
    );
}
