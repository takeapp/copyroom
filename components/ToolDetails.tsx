"use client";

import { Tool } from "@/types/catalog";
import { useCompletion } from "ai/react";
import { useState } from "react";

type FormStateType = {
    [key: string]: string;
};

export function ToolDetails({ tool }: { tool: Tool }) {
    const { complete } = useCompletion({
        api: "/api/completion",
    });

    const [formState, setFormState] = useState<FormStateType>({});
    const [result, setResult] = useState("");

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormState({
            ...formState,
            [event.target.id]: event.target.value,
        });
    };

    const handleCompletion = async (state: FormStateType) => {
        const prompt = tool.prompt.replace(
            /{(\w+)}/g,
            (_, key) => state[key] || ""
        );

        console.log(prompt);

        const completion = await complete(prompt);
        if (!completion) throw new Error("Failed");

        setResult(completion);
    };

    // states for form inputs

    const inputs = tool.inputs.map((input) => {
        let inputElement = (
            <input
                key={input.id}
                {...input}
                onChange={handleInputChange}
                value={formState[input.id] || ""}
            />
        );
        if (input.type === "textarea") {
            inputElement = (
                <textarea
                    key={input.id}
                    {...input}
                    onChange={handleInputChange}
                    value={formState[input.id] || ""}
                />
            );
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
            {inputs}

            <button
                onClick={() => {
                    handleCompletion(formState);
                }}
            >
                Submit
            </button>
            <hr />
            <div>{result}</div>
        </>
    );
}
