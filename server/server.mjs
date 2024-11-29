import express from "express";
import fs from "fs";
import csv from "csv-parser";

// utils
import { getRandomValueFromArray } from "./utils.js";

const app = express();
const port = 3000;

const inMemoryQuestionCache = [];

app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

  // Path to your CSV file
  const csvFilePath = "questions.csv";

  // Create a readable stream and pipe it to the csv-parser
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      inMemoryQuestionCache.push(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
});

app.get("/question/random", (_req, res) => {
  if (inMemoryQuestionCache.length) {
    console.log("Reading from cached questions");
    res.send(getRandomValueFromArray(inMemoryQuestionCache));
  }
});

app.get("/question/:id", (req, res) => {
  const questionId = req.params.id;
  if (inMemoryQuestionCache.length) {
    console.log("Reading from cached questions");
    res.send(inMemoryQuestionCache[questionId]);
  }
});
