
## React hooks

```js
useState简单实现

const MyReact = (() => {
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

  return useState;
})();

```

### useEffect
```js
const MyReact = (() => {
  const callbackArr = [];
  const depArr = [];
  let index = 0;

  const useEffect = (callback, deps) => {
    if(typeof(callback) !== 'function') {
      throw new TypeError('回调函数必须是函数！');
    };
    if(deps!== undefined && !Array.isArray(deps)) {
      throw new TypeError('依赖必须是数组结构！');
    };
    const isChange = depArr[index] ? depArr[index].some((dep, index) => !Object.is(dep, deps[index])) : true;

    if(isChage) {
      callback();
    };
    depArr[index] = dep;
    index++;
  };
  return useEffect
})();

```

### useMemo
```js
const MyReact = (() => {
  const callbackArr = [];
  const depArr = [];
  const resultArr = []
  let index = 0;

  const useMemo = (callback, deps) => {
    if(typeof(callback) !== 'function') {
      throw new TypeError('回调函数必须是函数！');
    };
  
    if(deps!== undefined && !Array.isArray(deps)) {
      throw new TypeError('依赖必须是数组结构！');
    };
  
    const isChange = depArr[index] ? depArr[index].some((dep, index) => !Object.is(dep, deps[index])) : true;

    if(isChanged) {
      resultArr[index] = callback();
      return resultArr[index];
    } else {
      return resultArr[index];
    }
    depArr[index] = dep;
    index++;
  };
})();

```
