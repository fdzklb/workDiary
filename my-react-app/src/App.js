import { ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash'

import './App.css';

function App() {
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrderForm')?.split(',') || []);

  const saveSortOrder = (sortOrder) => {
    window.localStorage.setItem('sortOrderForm', sortOrder);
    setSortOrder(sortOrder);
  }
  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='drag-div' id='dragcom'>
        <DragCom
          parentNode={() => document.getElementById('dragcom')}
          onDragEndChange={(sortOrder) => saveSortOrder(sortOrder)}
          sortOrder={sortOrder}
        >
          <div draggable='true'>阿</div>
          <div draggable='true'>爱是 </div>
          <div draggable='true'>发士大</div>
          <div draggable='true'>啊手动阀</div>
          <div draggable='true'>阿三发射点</div>
          <div draggable='true'>反对法就的发</div>
          <div draggable='true'>啊实离开的打实</div>
          <div draggable='true'>阿道咯东肯德基的</div>
          <div draggable='true'>大大叔大大叔大大叔</div>
          <div draggable='true'>李四光李四光李四光李</div>
          <div draggable='true'>空静安寺空静安寺空静安</div>
        </DragCom>
      </div>
    </div>
  );
}

export default App;



function DragCom(props) {
  const { children, parentNode, sortOrder, onDragEndChange } = props
  const [sortChild, setSortChild] = useState([]);
  const childrenIds = useRef([]); //元素id
  const beDragedDomRef = useRef(null); // 被拖拽的元素
  const beResertDomId = useRef(null); // 被插入元素id
  const beResertDomPosition = useRef(null);

  useEffect(() => {

    const ids= [];
    const newChildren = sortOrder.length > 0 ? sortOrder.map((sort, index) => {
      const id = `${Date.now()}#_@fr%${sort}`;
      ids.push(id);
      return ({
        ...children[sort],
        key: id,
        props: {
          ...children[sort].props,
          onDragStart: e => onDragStart(e, id),
          onDrag: e => onDrag(e, id),
          onDragEnd: e => onDragEnd(e, id),
          id,
        }
      })
    }) : children.map((item, index) => {
      const id =`${Date.now()}#_@fr%${index}`;
      ids.push(id);
      return (
        { ...item,
          key: id,
          props: {
            ...item.props,
            onDragStart: e => onDragStart(e, id),
            onDrag: e => onDrag(e, id),
            onDragEnd: e => onDragEnd(e, id),
            id,
          }
        }
      )
    });
    childrenIds.current = ids;
    console.log('children', children);
    console.log('sortOrder', sortOrder);
    console.log('newChildren', newChildren);
    setSortChild(newChildren);
  }, [children, sortOrder]);

   // 拖拽开始
  const onDragStart = (e, id) => {
    const beDragedDom = document.getElementById(id);
    beDragedDom.style.opacity = 0.5;
    const cloneDom = beDragedDom.cloneNode(true); // 克隆被拖拽元素
    cloneDom.id = `clone-dom-id-${Date.now()}-${id}`;
    beDragedDomRef.current = cloneDom;
    beResertDomId.current = id;
    beResertDomPosition.current = true;
  }

    // 拖拽结束
  const onDragEnd = (e, id) => {
    setTimeout(() => {
      if(id !== beResertDomId.current) {
        const hiddleDom = document.getElementById(id);
        getParentNode(hiddleDom).removeChild(hiddleDom);
      }
      beDragedDomRef.current = null;
      beResertDomId.current = null;
      const dom = document.getElementById(id);
      const childrenCollections = getParentNode(dom).children;
      const sortOrder = [];
      for(let i=0; i<childrenCollections.length; i++) {
        childrenCollections[i].style.opacity = childrenCollections[i].style.opacity ? 1 : undefined;
        sortOrder.push(childrenCollections[i].id.split('#_@fr%')[1]);
      }
      console.log('childrenCollections', childrenCollections);
      // console.log('sortOrder', sortOrder);
      onDragEndChange && onDragEndChange(sortOrder);
    }, 200)
  }

  // 拖拽中
  const onDrag = throttle((e, id) => {
    const position = {x: e.clientX, y: e.clientY, domId: id};
    if(position.x === 0 && position.y === 0) return;
    const { domId: beInsertedId, isRight } = caculateDistance(position); // 计算出距离最近的dom
    if(beInsertedId !== id && (beResertDomId.current !== beInsertedId || beResertDomPosition.current !== isRight)) { // 被拖拽元素 需要调整位置
      beResertDomId.current = beInsertedId;
      beResertDomPosition.current = isRight;
      // 1. 删除之前插入的dom
      const oldDom = document.getElementById('clone-dom-id');
      oldDom && getParentNode(oldDom)?.removeChild(oldDom);
      // 2. 在新位置插入dom
      toSortChild(beInsertedId, id, isRight);
    }
  }, 200);

  const toSortChild = (beInsertedId, beDragedDomId, isRight) => { //需要将beDragedDomId移到beRemoveId的(isRight > 0 ? 后面 : 前面)
    const beDragedDom = document.getElementById(beDragedDomId); // 被拖拽的dom
    const beInsertedDom = document.getElementById(beInsertedId);
    if(beDragedDom.style.display !== 'none') {
      beDragedDom.style.display = 'none';
    };
    // // 插入元素
    const parent = getParentNode(beDragedDom);
    try{
      isRight ? insertAfter(parent, beDragedDomRef.current, beInsertedDom) : parent.insertBefore(beDragedDomRef.current, beInsertedDom);
    } catch(ereor) {
      console.log('ereor', ereor);
    }
  }
  
  //功能: 在targetElement之后插入 新节点newElement
  const insertAfter = (parent, newElement, targetElement) => {
    if(parent.lastChild === targetElement){
        parent.appendChild(newElement);
    }else{
      parent.insertBefore(newElement,targetElement.nextSibling);
    }
  }
  
  // 计算dom位置
  const getChildrenPosition = () => {
    const rectArr = childrenIds.current.map(id => document.getElementById(id)?.getBoundingClientRect()) || [];
    const domsPotions = rectArr.map((rect, index) => ({ x: rect ? (rect.left + rect.right)/2 : 0, y: rect ? (rect.top + rect.bottom)/2 : 0, width: rect ? rect.bottom - rect.top : 0, domId: childrenIds.current[index] }));
    return domsPotions
  }

  // 返回与被拖拽元素最近元素的id 以及位置关系
  const caculateDistance = (pos) => {
    let minDis = Infinity;
    let minDisId = { domId: '', isRight: false };
    const domsPotions = getChildrenPosition();
    domsPotions.forEach((position) => {
      const { x, y, domId, width } = position;
      if(Math.abs(y - pos.y) < width / 2) {
        const dis = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2);
        if(dis < minDis) {
          minDis = dis;
          minDisId = { isRight: pos.x - x > 0 ? true : false, domId };
        };
      }
    });
    return minDisId;
  }

  const getParentNode = (dom) => {
    return parentNode() || dom?.parentNode || {};
  }

  return (
    sortChild
  )
}

