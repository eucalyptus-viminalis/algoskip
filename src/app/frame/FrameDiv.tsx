
type FrameProps = {
    children: JSX.Element[] | JSX.Element
    justifyContent?: string
};
export default function FrameDiv(props: FrameProps) {
    const justifyContent = props.justifyContent ?? 'space-between'
    return (
        <div
            id="frame"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: justifyContent,
                alignItems: 'center',
                fontSize: 50,
                fontFamily: 'regular',
                width: "100%",
                height: "100%",
                backgroundColor: "#1F1629",
                color: "white",
            }}
        >
            {props.children}
        </div>
    );
}
