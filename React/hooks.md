
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
#### useEffect使用场景
1. 函数被 useEffect 内部所使用，但为了避免频繁 useEffect 的频繁调用，所以我包一下；
2. 我只是为了解决 hooks lint 的提示报警，所以我包一下；
3. 因为有一个使用了 useCallback 的函数引用了我这个函数，所以我不得不包一下；
4. 当这个函数会被传递给子组件，为了避免子组件频繁渲染，使用 useCallback 包裹，保持引用不变；
5. 需要保存一个函数闭包结果，如配合 debounce、throttle 使用；
6. 我希望这个useCallback包裹但函数，但某个依赖项变化时，引用了我这个函数的所有 useEffect 都得重新执行一下；