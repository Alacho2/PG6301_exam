const menuRepo = new Map();

let counter = 0;

function getMenu(id){
  return menuRepo.get(id)
}

function createMenuObject(monday, tuesday, wednesday, thursday, friday) {

  counter = ++counter+"";

  const newest = {
    id: counter,
    days: [
      { name: "Monday", meal: monday },
      { name: "Tuesday", meal: tuesday },
      { name: "Wednesday", meal: wednesday },
      { name: "Thursday", meal: thursday },
      { name: "Friday", meal: friday },
    ]
  };
  menuRepo.set(counter, newest);
}

function updateMenu(menu){
  const {id} = menu;
  const oldMenu = getMenu(id);

  if(!menuRepo.has(id)){
    return false
  }

  //.map returned an array of undefined, therefor using old for loop
  for(let i = 0; i < menu.days.length; i++) {
    if(menu.days[i].meal === ""){
      menu.days[i].meal = oldMenu.days[i].meal //handle empty items as the old item
    }
  }
  menuRepo.set(id, menu);
  return true;
}

const initWithSomeMenu = () => {
  createMenuObject("Taco", "Kebab", "Pizza", "Sjokoladekake", "Fiskegrateng");
  createMenuObject("Pølser", "Friterte poteter", "Gryte", "Stuing", "Stek");
  console.log("Made a menuRepo for you")
};

module.exports = {getMenu, initWithSomeMenu, createMenuObject, updateMenu};