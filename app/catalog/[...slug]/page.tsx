import { ToolDetails } from "@/components/ToolDetails";
import { Tool } from "@/types/catalog";
import { readFileSync } from "fs";

export default function Tool({
    params: { slug },
}: {
    params: {
        slug: string[];
    };
}) {
    // import json from catalog folder
    const rootDir = process.cwd();
    const path = slug.map((s) => encodeURIComponent(s)).join("/");
    const tool = JSON.parse(
        readFileSync(`${rootDir}/catalog/${path}.json`, "utf8")
    ) as Tool;

    return (
        <main>
            <ToolDetails tool={tool} />
        </main>
    );
}
