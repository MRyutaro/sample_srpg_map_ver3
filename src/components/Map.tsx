import { useEffect, useState } from "react";

const TILE_SIDE_LENGTH = 100; // タイルのサイズ
const ROTATE_X = 66; // マップの平たさ具合(deg)
const MAP_OFFSET_X = 20; // マップのX方向のオフセット
const MAP_OFFSET_Y = -21.7; // マップのY方向のオフセット

function Tile({ x, y, children }: { x: number; y: number; children?: React.ReactNode }) {
    const [tileHalfWidth, setTileHalfWidth] = useState<number>(0);
    const [tileHalfHeight, setTileHalfHeight] = useState<number>(0);

    useEffect(() => {
        setTileHalfWidth(TILE_SIDE_LENGTH / Math.sqrt(2) + 0.7);  // 0.7は誤差補正。これがないとタイルの間のボーダーの太さが太すぎる。
        setTileHalfHeight(TILE_SIDE_LENGTH / (Math.sqrt(2) * Math.tan((ROTATE_X * Math.PI) / 180)));
    }, [TILE_SIDE_LENGTH]);

    return (
        <div
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
    // ここで連想配列を取得
    // 連想配列に画像のパスを直接書くか、他の管理方法にするかは考える
    // 連想配列のキーは、タイルの座標を表す文字列にする
    // 例: "0,0" -> (0, 0)のタイル
    // キーがない部分はデフォルトのタイルで埋める
    // tilesNum.x, tilesNum.y でアクセスできるようにする
    const [tilesNum, setTilesNum] = useState({ x: 3, y: 3 });

    useEffect(() => {
        // ウィンドウサイズが変更されたときにタイルの数を再計算
        const handleResize = () => {
            setTilesNum({
                x: Math.ceil(window.innerWidth / TILE_SIDE_LENGTH),
                y: Math.ceil(window.innerHeight / TILE_SIDE_LENGTH),
            });
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
            }}
        >
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    padding: "8px",
                    background: "lightgray",
                }}
            >
                {tilesNum.x} x {tilesNum.y}
            </div>
            <Tile x={0} y={0}>
                (0, 0)
            </Tile>
            <Tile x={1} y={-1}>
                (1, -1)
            </Tile>
            <Tile x={2} y={-2}>
                (2, -2)
            </Tile>
        </div>
    );
}
