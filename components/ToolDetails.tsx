import { Tool } from "@/types/catalog";

export function ToolDetails({
    tool,
    action,
}: {
    tool: Tool;
    action: (formData: FormData) => Promise<void>;
}) {
    const inputs = tool.inputs.map((input) => {
        let inputElement = <input key={input.id} {...input} />;
        if (input.type === "textarea") {
            inputElement = <textarea key={input.id} {...input} />;
        }
        return (
            <div key={input.id}>
                <label htmlFor={input.id}>{input.label}</label>
                {inputElement}
                <p>{input.description}</p>
            </div>
        );
    });
    return (
        <>
            <form action={action}>
                {inputs}
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
