const express = require("express");
const router = express.Router();

const Actions = require("./actions-model");
const {
  validateActionId,
  validateActionsBody,
} = require("./actions-middlware");

router.get("/", (req, res) => {
  Actions.get().then((result) => {
    res.json(result);
  });
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.actionId);
});

router.post("/", validateActionsBody, (req, res) => {
  Actions.insert(req.body).then((result) => {
    res.status(201).json(result);
  });
});

router.put("/:id", validateActionId, validateActionsBody, (req, res) => {
  Actions.update(req.params.id, req.body).then((result) => {
    res.json(result);
  });
});

router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
