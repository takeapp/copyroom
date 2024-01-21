export interface Tool {
    inputs: ToolInput[];
    prompt: string;
}

export interface ToolInput {
    id: string;
    type: "textarea";
    label: string;
    description?: string;
}
