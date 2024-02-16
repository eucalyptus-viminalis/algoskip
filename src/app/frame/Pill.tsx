type PillProps = {
    text: string;
    color?: string;
};
export default function Pill(props: PillProps) {
    const {text,color} = props
    return (
        <span
            style={{
                padding: "0px 10px",
                borderColor: "#B6A1BD",
                borderWidth: 5,
                borderRadius: 50,
                backgroundColor: color ?? "#7819B3",
            }}
        >
            {text}
        </span>
    );
}
