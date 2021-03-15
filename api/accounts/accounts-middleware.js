const { getById } = require("./accounts-model");
const db = require("../../data/db-config");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (req.body.name !== req.body.name.toString()) {
    res.status(400).json({ message: "name of account must be a string" });
  } else if (isNaN(req.body.budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (req.body.name < 3 || req.body.name > 100) {
    res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  } else if (req.body.budget < 0 || req.body.budget > 1000000) {
    res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  } else {
    next();
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const checkedName = await db("accounts").where("name", req.body.name).first();
  if (checkedName) {
    res.status(400).json({ message: "that name is taken" });
  } else {
    next();
  }
};

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const account = await getById(req.params.id);
    if (!account) {
      res.status(404).json({ message: "account not found" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
