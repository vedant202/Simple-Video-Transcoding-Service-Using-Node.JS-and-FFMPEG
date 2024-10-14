require("regenerator-runtime");
require("dotenv/config");

import { app } from "./lib";

const PORT = process.env.PORT || 4000;

const api = app.listen(PORT, () => console.info(`Server running on port ${PORT}`));

export default api;

