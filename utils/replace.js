import * as fs from "fs";

const html = fs.readFileSync("./dist/index.html", 'utf8');
fs.writeFileSync("./dist/index.html",html.replace(/ type="module" crossorigin/,""));

