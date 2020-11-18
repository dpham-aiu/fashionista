module.exports = function (app) {
  var items = require("../controllers/item.controller");
  app.get("/api/items", items.findAll);
  app.get("/api/items/:id", items.findById);
  app.post("/api/items", items.addItem);
  app.put("/api/items/:id", items.updateById);
  app.delete("/api/items/:id", items.removeById);
};
