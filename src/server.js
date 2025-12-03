const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;

app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.get("/", (req, res) => {
  const absolutePathOfHtml = path.join(__dirname, "../dist/index.html");
  const htmlContent = fs.readFileSync(
    absolutePathOfHtml,
    "utf-8",
    (err, data) => {
      if (data) {
        return data;
      }
      return err + " - Error loading HTML file";
    }
  );
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}
