import "./Typography.css"

type Variant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subheading1" | "subheading2" | "body1" | "body2"

type VariantsMapping = {
    [key in Variant]: keyof JSX.IntrinsicElements
}

const variantsMapping: VariantsMapping = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subheading1: "h6",
    subheading2: "h6",
    body1: "p",
    body2: "p",
}

interface Props {
    variant: Variant
    component?: Variant
    color?: string
    size?: string
    center?: boolean
    children: React.ReactNode
    animated?: boolean
    mt?: number
    mb?: number
}

const Typography: React.FC<Props> = ({ component = 'body1', variant = component, color, size, animated = false, center = false, children, ...props }) => {

    const Component = variantsMapping[component]

    return (
        <div className='typography--container'>
            <Component
                className={`typography--variant-${variant} ${animated ? "typography--animated" : ""}`}
                style={{
                    color,
                    fontSize: size,
                    textAlign: center ? "center" : "left",
                    marginTop: props.mt,
                    marginBottom: props.mb
                }}
                {...props}
            >
                {children}
            </Component>
        </div>
    )
}
export default Typography