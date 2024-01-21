export interface Tool {
    inputs: Input[];
    prompt: string;
}

export interface Input {
    id: string;
    type: "textarea";
    label: string;
    description?: string;
}
