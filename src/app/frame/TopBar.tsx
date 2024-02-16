type TopBarProps = {
    children?: JSX.Element[] | JSX.Element
    justifyContent?: string
    pfpUrl?: string | null
    route?: string
    pfpSize?: number
}
export default function TopBar(props: TopBarProps) {
    const {pfpUrl, route, justifyContent, children} = props
    const pfpSize = props.pfpSize ?? 100
    return (
                <div
                    id="top-bar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        fontFamily: "mono",
                        fontSize: 40,
                        justifyContent: justifyContent ?? 'space-between',
                    }}
                >
                    {route ? (
                        <div id="current-route" >
                            {"/" + route}
                        </div>
                    ):null}
                    {pfpUrl ? (
                        <img
                            alt="pfp"
                            src={pfpUrl}
                            width={pfpSize}
                            height={pfpSize}
                            style={{
                                borderRadius: pfpSize / 2,
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                transform: "translate(-50%, 0)",
                            }}
                        />
                    ) : null}
                    {children ? (
                        children
                    ):null}
                </div>
    )
}