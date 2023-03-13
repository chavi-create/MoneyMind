require('dotenv').config();
require('mysql2')
const express = require("express");
// const userRouter = require('./routes/user_route')

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

//app.use("/users", userRouter);    //option2
require("./routes/user_route")(app);
require("./routes/family_route")(app);
require("./routes/category_route")(app);
require("./routes/process_route")(app);
require("./routes/permission_route")(app);
require("./routes/expense_route")(app);
require("./routes/income_route")(app);
require("./routes/permission_process_route")(app);
require("./routes/manager_route")(app);

app.listen(PORT,()=>console.log(`server running on port ${PORT}`))

// app.listen(8080,()=>{
//     console.log("connected!");
// });
