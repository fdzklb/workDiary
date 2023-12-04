class React {

    const state = [];
    const stateSetter = [];
    let stateIndex = 0;
  
    const createState = (stateIndex, iniState) => {
      return state[stateIndex] = state[stateIndex] === undefined ? iniState : state[stateIndex];
    }
  
    const createStateSetter = (stateIndex) => {
      if(!stateSetter[stateIndex]) {
        const setState = (newState) => {
          if(typeof(newState) === 'function') {
            state[stateIndex] = newState(state(stateIndex));
          } else {
            state[stateIndex] = newState;
          }
          render();
        };
        stateSetter[stateIndex] = setState;
      }
      return stateSetter[stateIndex];
    }
  
    const render = () => {
      stateIndex = 0;
      ReactDom.render(
        <App />,
        document.querySelector('#app')
      )
    }
  
    const useState = (iniState) => {
      const _state = createState(stateIndex, iniState);
      const _setState = createStateSetter(stateIndex);
      stateIndex ++;
      return [_state, _setState];
    }
}


const MyReact = new React();
export default MyReact;