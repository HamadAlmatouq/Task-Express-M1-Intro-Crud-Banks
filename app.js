const express = require("express");
const accounts = require("./accounts");
const uuid4 = require("uuid4");
const app = express();
app.use(express.json());

//get
app.get("/accounts", (req, res) => {
  res.status(200).json(accounts);
});

//post
app.post("/accounts", (req, res) => {
  const newAccount = {
    ...req.body,
    id: uuid4(),
    funds: 0,
  };
  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

//put
app.put("/accounts/:accountId", (req, res) => {
  const foundAccount = accounts.find(
    (account) => account.id === req.params.accountId
  );
  if (!foundAccount) res.status(404).json({ message: "Account Not Found!" });

  const { username, funds } = req.body;

  //   if(!username || !funds === undefined) res.status()

  foundAccount.username = username;
  foundAccount.funds = funds;

  res.status(200).json(foundAccount);
});

app.delete("/accounts/:accountId", (req, res) => {
  const foundAccount = accounts.find(
    (account) => account.id === req.params.accountId
  );
  if (!foundAccount) res.status(404).json({ message: "Account Not Found!" });

  const accountIndex = accounts.findIndex(
    (account) => account.id === req.params.accountId
  );
  accounts.splice(accountIndex, 1);
  res.status(204).end();
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`This running on ${PORT}`);
});
