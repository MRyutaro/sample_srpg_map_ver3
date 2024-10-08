import { Fragment, useEffect, useState } from "react";

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
            id={`tile(${x},${y})`}
            className="tile"
            style={{
                position: "absolute",
                width: TILE_SIDE_LENGTH,
                height: TILE_SIDE_LENGTH,
                left: `${MAP_OFFSET_X + x * tileHalfWidth - y * tileHalfWidth}px`,
                top: `${
                    MAP_OFFSET_Y + y * (tileHalfWidth * Math.cos((ROTATE_X * Math.PI) / 180)) + x * (tileHalfWidth * Math.cos((ROTATE_X * Math.PI) / 180))
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
        const mapElement = document.getElementById("map");

        if (!mapElement) return;

        const handleResize = () => {
            const mapWidth = mapElement.clientWidth;
            const mapHeight = mapElement.clientHeight;

            setTilesNum({
                x: Math.ceil(mapWidth / (tileHalfWidth * 2)),
                y: Math.ceil(mapHeight / (tileHalfHeight * 2)),
            });
        };

        // 初期計算
        handleResize();

        // ResizeObserverの設定
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });

        resizeObserver.observe(mapElement);

        return () => {
            if (mapElement) resizeObserver.unobserve(mapElement);
        };
    }, [tileHalfWidth, tileHalfHeight]);

    return (
        <div
            id="map"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                className="panel"
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
            {/* 指定された範囲のタイルを描画 */}
            {Array.from({ length: 2 * tilesNum.x + 2 }, (_, x) => x - 1).map((x) => (
                <Fragment key={x}>
                    {Array.from({ length: 2 * tilesNum.y + 3 }, (_, y) => y - tilesNum.y - 1).map((y) => {
                        if (-x - 1 <= y && y <= x + 1 && x - 2 * tilesNum.x <= y && y <= -x + 2 * tilesNum.x + 1) {
                            return (
                                <Tile key={`${x},${y}`} x={x} y={y} tileHalfWidth={tileHalfWidth} tileHalfHeight={tileHalfHeight}>
                                    ({x}, {y})
                                </Tile>
                            );
                        }
                        return null;
                    })}
                </Fragment>
            ))}
        </div>
    );
}
