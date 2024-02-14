type FrameProps = {
    children: JSX.Element[] | JSX.Element;
};
export default function Frame(props: FrameProps) {
    return (
        <div
            id="frame"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 50,
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
