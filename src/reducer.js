const initialState = {
  keys: { left: false, right: false, up: false, down: false },
  monster: { x: 0, y: 0 }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "KEY_LEFT_DOWN":
      return {...state, keys: {...state.keys, left: true}};
    case "KEY_LEFT_UP":
      return {...state, keys: {...state.keys, left: false}};
    case "KEY_RIGHT_DOWN":
      return {...state, keys: {...state.keys, right: true}};
    case "KEY_RIGHT_UP":
      return {...state, keys: {...state.keys, right: false}};
    case "SET_MONSTER_POSITION":
      return {...state, monster: {x: action.x, y: action.y}};
    default:
      return state;
  }
};

export default reducer;
