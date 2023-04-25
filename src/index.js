const app = require("./app");

const port = process.env.PORT;
 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(process.env.NODE_ENV);
});