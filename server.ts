import * as express from "express";
import mongoose from "mongoose";
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");
const graphqlResolver = require("./graphql/resolvers");
const app = express();
const dbName = process.env.MONGO_DB_LOCAL as string;
console.log("dbName", dbName);
mongoose
  .connect(dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as mongoose.ConnectOptions) // Type assertion
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);
const port = 5200;
app.listen(port, () => {
  console.log("Server is Started");
});
