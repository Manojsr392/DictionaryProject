import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    try {
      
      res.render("index1.ejs");
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        activity: null,
        error: error.message,
      });
    }
  });
  app.post("/", async (req, res) => {
    try {
      const word = req.body.word;
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const result = response.data;
      console.log(result);
      res.render("index.ejs", {
        activity: result
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
  
      // Check if the error is due to the word not being found
      if (error.response && error.response.status === 404) {
        res.render("index.ejs", {
          error: `The word "${req.body.word}" is not available in the dictionary.`
        });
      } else {
        res.render("index.ejs", {
          error: "Failed to fetch word information. Please try again later."
        });
      }
    }
  });
  



app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
