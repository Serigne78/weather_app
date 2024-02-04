import express from "express";
import axios from "axios";
import bodyParser from "body-parser"

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));


app.get("/", (req, res) => {
      res.render("index.ejs");
});

app.post("/", async (req, res)=> {
      var data = req.body["search"]
      var checked = false;
      try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=8954054279cb884b3ab414a99305806c`);
            const result = response.data;
            const temp  = Math.floor(result.main.temp);
            const humidity =  Math.floor(result.main.humidity);
            const wind = Math.floor(result.wind.speed) * 3.6;
            const descript =  result.weather[0].main;
            console.log(humidity);
            console.log(temp);
            console.log(wind);
            console.log(descript);

            if (descript === "Clouds") {
                  var pic = "clouds.png"
            } else if (descript === "Clear") {
                  var pic = "sun.png"

            }  else if (descript === "Rain") {
                  var pic = "heavy-rain.png"

            }

            else if (descript === "Snow") {
                  var pic = "snow.png"

            }
            
            else if (descript === "Mist") {
                  var pic = "mist (1).png"

            }
            checked = true
            
            
            
            res.render("index.ejs", {
                  temps :temp,
                  humi:humidity,
                  windy:wind,
                  look:checked,
                  descripts: descript,
                  image:pic,
                  city:data
            })
      } catch (error) {
            console.log("erruer", error.message);
      }
}
);


app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });