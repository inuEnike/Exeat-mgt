import express from "express";
const app = express();
import HostelRoutes from "./routes/hostel.route.js";
import ExeatRoutes from "./routes/exeat.route.js";
import AuthRoutes from "./routes/auth.route.js";
import validateExeatRoutes from "./routes/validateExeat.route.js";
import connectDb from "./utils/Db.js";
import { errorHandler } from "./middleware/error.middleware.js";

const PORT = 1954;

app.use(express.json());

app.use("/auth", AuthRoutes);
app.use("/hostel", HostelRoutes);
app.use("/exeat", ExeatRoutes);
app.use("/validateExeat", validateExeatRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    Success: false,
    Message: "route not found",
  });
});

app.use(errorHandler);
app.listen(PORT, () => {
  connectDb();
  console.log(`server fired on port ${PORT}`);
});
