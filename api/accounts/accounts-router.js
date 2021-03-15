const router = require("express").Router();
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get("/", async (req, res, next) => {
  // DO YOUR MAGIC
  Account.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.getById(req.params.id)
    .then((account) => {
      res.status(200).json(account);
    })
    .catch(next);
});

router.post(
  "/",
  checkAccountPayload,
  checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    Account.create(req.body)
      .then((account) => {
        res.status(201).json(account);
      })
      .catch(next);
  }
);

router.put(
  "/:id",
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
  (req, res, next) => {
    // DO YOUR MAGIC
    Account.updateById(req.params.id, req.body)
      .then((account) => {
        res.status(200).json(account);
      })
      .catch(next);
  }
);

router.delete("/:id", checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Account.deleteById(req.params.id).then(() => {
    res.status(200).json({ message: "Account deleted successfully." });
  });
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  // CALL next(err) IF THE PROMISE REJECTS INSIDE YOUR ENDPOINTS
  res.status(500).json({
    message: "something went wrong inside the accounts router",
    errMessage: err.message,
  });
});

module.exports = router;
