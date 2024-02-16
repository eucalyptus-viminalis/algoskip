type ActionCardProps = {
    buttonHint: string;
    id?: string
    width?: string | number
    justifyContent?: string
    children: JSX.Element | JSX.Element[]
    selected: boolean
};
export default function ActionCard(props: ActionCardProps) {
    const {buttonHint,id,width,justifyContent,children, selected} = props
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: width ?? "100%",
                borderColor: "#B6A1BD",
                backgroundColor: selected ? '#491768' : '',
                borderWidth: 5,
                borderRadius: 50,
                wordBreak: "break-word",
                justifyContent: justifyContent ?? "space-around",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            {children}
            {/* Button hint */}
            <span
                style={{
                    display: "flex",
                    position: "absolute",
                    left: "50%",
                    bottom: -10,
                    transform: "translate(-50%, 100%)",
                    // translate: '[-50, -50]'
                }}
            >
                {buttonHint}
            </span>
        </div>
    );
}
