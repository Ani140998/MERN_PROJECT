const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const router = require("./router/auth-router");
const connectDB = require("./utils/db")
const errorMiddleware = require("./middlewares/error-middleware")

/*------------------------------------------------------------------------------------------------------
   Mount the Router:  To use the router you have to mount or import it into main express file,
                      you can mount it at a specific URL prefix.
  ------------------------------------------------------------------------------------------------------*/

app.use(express.json());
app.use("/api/auth/", router);
app.use(errorMiddleware);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on Port: ${port}`)
    })
})
