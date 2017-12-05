import { setMonsterPosition } from "./actions";

const SPEED = 2;

export function setApp(app) {
  return ({ mutable }) => {
    mutable.app = app;
  };
}

export function setTextures(textures) {
  return ({ mutable }) => {
    mutable.textures = textures;
  };
}

export function addMonster({ x, y }) {
  return ({ mutable, dispatch }) => {
    const monster = new PIXI.Sprite(mutable.textures.monster);
    monster.position.x = x;
    monster.position.y = y;
    mutable.app.stage.addChild(monster);
    mutable.monster = monster;
    dispatch(setMonsterPosition(x, y));
  };
}

export function setKeyListeners() {
  return ({ mutable, dispatch }) => {
    window.addEventListener("keydown", (event) => keydown(event, dispatch));
    window.addEventListener("keyup", (event) => keyup(event, dispatch));
  };
}

const keydown = (event, dispatch) => {
  switch (event.keyCode) {
    case 37:
      dispatch({type: "KEY_LEFT_DOWN"})
    break;
    case 39:
      dispatch({type: "KEY_RIGHT_DOWN"})
    break;
    default:
    break;
  }
}

const keyup = (event, dispatch) => {
  switch (event.keyCode) {
    case 37:
      dispatch({type: "KEY_LEFT_UP"})
    break;
    case 39:
      dispatch({type: "KEY_RIGHT_UP"})
    break;
    default:
    break;
  }
}

export function animate() {
  function createAnimator({ dispatch }) {
    function animator(delta) {
      dispatch(({mutable, dispatch, state}) => {
        if (state.keys.left) {
          mutable.monster.position.x -= SPEED * delta;
        }
        if (state.keys.right) {
          mutable.monster.position.x += SPEED * delta;
        }
        dispatch(
          setMonsterPosition(
            mutable.monster.position.x,
            mutable.monster.position.y
          )
        );
      });
    }
    return animator;
  }
  return ({ state, dispatch, mutable, mutate }) => {
    mutable.app.ticker.add(
      createAnimator({ dispatch, mutable, mutate, state })
    );
  };
}