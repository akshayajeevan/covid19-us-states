const path = require("path");
const update = require("./update");

const WORKSPACE = process.env.GITHUB_WORKSPACE;
const DATA_REPO = "data";
const MAIN_REPO = "main";

const dataPath = path.join(
  WORKSPACE,
  DATA_REPO,
  "csse_covid_19_data",
  "csse_covid_19_time_series"
);
const outputPath = path.join(WORKSPACE, MAIN_REPO, "docs", "timeseries.json");

update.execute(dataPath, outputPath);