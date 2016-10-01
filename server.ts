import * as express from "express";
import * as path from "path";


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/app/index.html"));
});


app.listen(PORT, () =>{
    console.log(`Express server started at localhost:${PORT}`);    
});
