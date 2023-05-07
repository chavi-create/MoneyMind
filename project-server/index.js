require('dotenv').config();
require('mysql2')
const express = require("express");

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());

app.use(express.json());

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
