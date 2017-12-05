import * as PIXI from "pixi.js";

import { createStore } from "./store";
import { setApp, setTextures, addMonster, setKeyListeners, animate } from "./mutations";
import reducer from "./reducer";

function start() {
  const initialMutable = { app: null, textures: [], monster: null };

  const store = createStore(reducer, initialMutable);

  const app = new PIXI.Application(400, 500, {backgroundColor : 0x000000});
  document.getElementById("game").appendChild(app.view);
  store.mutate(setApp(app));

  Promise.all([loadGraphics()]).then(([{ loader, resources }]) => {
    onLoadResources(loader, resources, store);
  });
}

function loadGraphics() {
  return new Promise((resolve, reject) => {
    PIXI.loader
      .add("monster", "./img/monster.png")
      .load((loader, resources) => {
        resolve({ loader, resources });
      });
  });
}

function onLoadResources(loader, resources, store) {
  const chars = ["monster"];
  const charTextures = chars.reduce((acc, name) => {
    acc[name] = new PIXI.Texture(
      resources[name].texture,
      new PIXI.Rectangle(0, 0, 50, 70)
    );
    return acc;
  }, {});
  store.mutate(setTextures({ ...charTextures }));
  store.mutate(addMonster({ x: 200, y: 200 }));
  store.mutate(setKeyListeners());
  store.mutate(animate());
}

start();