const express = require("express");
const Projects = require("./projects-model");
const { validateId, validateProjectsBody } = require("./projects-middleware");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get().then((projects) => {
    res.json(projects);
  });
});

router.get("/:id", validateId, (req, res) => {
  res.json(req.projectsId);
});

router.post("/", validateProjectsBody, (req, res) => {
  Projects.insert(req.body)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((err) => {
      res.status(500).json({ message: "problem finding project" });
    });
});

router.put("/:id", validateId, validateProjectsBody, (req, res) => {
  if (req.body.completed == null) {
    res
      .status(400)
      .json({ message: "please provide name, description, and completed" });
  } else {
    console.log(req.body.completed);
    Projects.update(req.params.id, req.body).then((project) => {
      res.json(project);
    });
  }
});

router.delete("/:id", validateId, (req, res) => {
  Projects.remove(req.params.id).then((result) => {
    res.json(result);
  });
});

router.get("/:id/actions", validateId, (req, res) => {
  Projects.getProjectActions(req.params.id).then((result) => {
    res.json(result);
  });
});

module.exports = router;
