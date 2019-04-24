const menuRepo = require('../db/menuRepo.js');

module.exports = app => {
  menuRepo.initWithSomeMenu();

  app.get("/api/menu/:id", (req, res) => {
    const id = req.params['id'];
    const menu = menuRepo.getMenu(id);
    if(menu){
      res.status(200).json(menuRepo.getMenu(id));
    } else {
      res.status(404).send()
    }
  });

  app.post("/api/menu", (req, res) => {
    const dto = req.body;

    menuRepo.createMenuObject(dto.days[0], dto.days[1], dto.days[2], dto.days[3], dto.days[4]);

    res.status(201).send()
  });

  app.put("/api/menu/:id", (req, res) => {
    const menu = req.body;

    menuRepo.updateMenu(menu);

    res.status(204).send()
  })
};