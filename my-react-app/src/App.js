import { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { throttle } from 'lodash'

import './App.css';

function App() {
  return (
    <div className="App">
      <div className='drag-div' id='dragcom'>
        <DragCom popContainer={(parentNode) => document.getElementById('dragcom')}>
          <div draggable='true'>阿斯顿发射点       #0</div>
          <div draggable='true'>爱是付出 #1</div>
          <div draggable='true'>发士大夫 #2</div>
          <div draggable='true'>啊手动阀手动阀 #3</div>
          <div draggable='true'>阿三发射点发 #4</div>
          <div draggable='true'>阿达 #5</div>
          <div draggable='true'>啊实打实#6</div>
          <div draggable='true'>阿道夫 #7</div>
          <div draggable='true'>大大叔 #8</div>
        </DragCom>
      </div>
    </div>
  );
}

export default App;



function DragCom(props) {
  const { children, popContainer } = props
  const [sortChild, setSortChild] = useState([]);
  const childrenPosition = useRef([]); //存放元素id及中心点位置 [{x: 100, y: 200, domId: '#1'}, ...]
  const childrenIds = useRef([]); //元素id

  useEffect(() => {
    const ids= [];
    for(let i = 0; i<children.length; i++){
      ids.push(`#${i}`);
    }
    childrenIds.current = ids;
    const newChildren = children.map((item, index) => (
      { ...item,
        props: {
          ...item.props,
          // onDragStart: e => onDragStart(childrenIds.current[index]),
          onDrag: e => onDrag(e, childrenIds.current[index]),
          onDragEnd: e => onDragEnd(e, childrenIds.current[index]),
          id: `#${index}`
        }
      }
    ));
    setSortChild(newChildren);
  }, [children]);

  useLayoutEffect(() => {
    // 计算所有属性位置
    const rectArr = childrenIds.current?.map(id => document.getElementById(id)?.getBoundingClientRect()) || [];
    childrenPosition.current = rectArr.map((rect, index) => ({ x: rect ? (rect.left + rect.right)/2 : 0, y: rect ? (rect.top + rect.bottom)/2 : 0, domId: childrenIds.current[index] }));
  }, [sortChild])

  const onDrag = (e, id) => {
    const position = {x: e.clientX, y: e.clientY, domId: id};
    const minDistanceId = caculateDistance(position); // 计算距离最近的domId
    const { domId, isRight } = minDistanceId;
    if(domId !== id) { // 则需要移动位置
      // 如果是在右边，则把之后的元素后移动
      // clo(domId)
      // clo(111)
      // clo(id)
      toSortChild(domId, id, isRight);
    }
  }

  const clo = throttle((position) => {
    console.log(position)
  }, 3000)

  const toSortChild = throttle((domId, id, isRight) => { //需要将domId移到id的(isRight > 0 ? 后面 : 前面)
    console.log('domId, id',domId, id)
    const targetDom = sortChild.find(item => item.props.id === domId);
    clo(targetDom)
    if(targetDom) {
      const newStotChild = [];
      sortChild.forEach(item => {
        if(item.props.id !== id && item.props.id !== domId) {
          newStotChild.push(item);
        } else if(item.props.id === id) {
          isRight ? newStotChild.push(item, targetDom) : newStotChild.push(targetDom, item);
        }
      });
      // clo(newStotChild)
      setSortChild(newStotChild);
    }
  }, 200)

  const onDragEnd = (e, domId) => {
  }

  // 计算一个坐标距离其他坐标的距离
  const caculateDistance = throttle((pos) => {
    // console.log('pos', pos);
    let minDis = Infinity;
    let minDisId = { domId: '', isRight: false };
    childrenPosition.current.forEach((position) => {
      const { x, y, domId } = position;
      const dis = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2);
      if(dis < minDis) {
        minDis = dis;
        minDisId = { isRight: pos.x - x, domId };
      };
    });
    return minDisId;
  }, 200)

  return (
      sortChild
  )
}

