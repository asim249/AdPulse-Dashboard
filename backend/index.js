const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db.config")
const dotenv = require("dotenv");

dotenv.config()

connectDB()



// middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoutes")
const campaignRoutes = require("./routes/campaignRoutes")
const aiRoutes = require("./routes/aiRoutes")

app.use("/api/ai", aiRoutes)
app.use("/api/campaigns", campaignRoutes)
app.use("/api/auth", authRoutes)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});