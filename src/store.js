export function createStore(reducer, initialMutable) {

  let state;

  let mutable = initialMutable;

  const dispatch = (action) => {
    state = reducer(state, action)
    if (typeof action === 'function') {
      action({dispatch, mutate, mutable, state});
    } else {
      state = reducer(state, action);
      //console.log(state);
    }
  }

  const mutate = (fn) => {
    fn({dispatch, mutate, mutable, state});
  }

  dispatch({ type: '@@game-state/INIT' })

  return {
    dispatch,
    mutate,
  }
}