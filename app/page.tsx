export default function Home() {
    // find all json files and show links
    const rootDir = process.cwd();
    const catalogDir = rootDir + "/catalog";
    const fs = require("fs");
    const files = fs.readdirSync(catalogDir);
    const jsonFiles = files.filter((file: string) => file.endsWith(".json"));
    const links = jsonFiles.map((file: string) => {
        const name = file.replace(".json", "");
        return (
            <li key={name}>
                <a href={"/catalog/" + name}>{name}</a>
            </li>
        );
    });

    return (
        <main>
            <h1>Copyroom</h1>

            <p>Internal AI Tools Catalog</p>

            <ul>{links}</ul>
        </main>
    );
}
