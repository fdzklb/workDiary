import React, { children, ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash'
import './index.css';

function App() {
  const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrderForm')?.split(',') || []);

  const saveSortOrder = (sortOrder) => {
    window.localStorage.setItem('sortOrderForm', sortOrder);
    setSortOrder(sortOrder);
  }

  return (
    <div className="App" style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='drag-div' id='dragcom'>
        <DragDropContext
          parentNode={() => document.getElementById('dragcom')}
          onDragEndChange={(sortOrder) => saveSortOrder(sortOrder)}
          sortOrder={[]}
          // sortOrder={sortOrder}
        >
          <div>000000</div>
          <div>111111 </div>
          <div>222222</div>
          <div>333333</div>
          <div>444444</div>
          <div>555555</div>
          <div>666666</div>
          <div>777777</div>
          <div>888888</div>
          <div>999999</div>
        </DragDropContext>
      </div>
    </div>
  );
}


function DragDropContext(props) {
  const { children, sortOrder, onDragEndChange, parentNode } = props;

  const newChildren = useMemo(() => {
    if(sortOrder.length > 0) {
      return sortOrder.map(order => {
        return children[order];
      });
    } else {
      return children;
    }
  }, [sortOrder, children]);

  // 计算dom位置
  const getDomPosition = () => {
    const doms = parentNode();
    const rectArr = [...doms.children].map(dom => dom.getBoundingClientRect()) || [];
    console.log('rectArr: ', rectArr);
    // const domsPotions = rectArr.map((rect, index) => ({ x: rect ? (rect.left + rect.right)/2 : 0, y: rect ? (rect.top + rect.bottom)/2 : 0, width: rect ? rect.bottom - rect.top : 0, domId: childrenIds.current[index] }));
    // return domsPotions
  }

  // 返回与被拖拽元素最近元素的id 以及位置关系
  const caculateDomPosition = (pos) => {
    let minDis = Infinity;
    let minDisId = { domId: '', isRight: false };
    const domsPotions = getDomPosition();
    // domsPotions.forEach((position) => {
    //   const { x, y, domId, width } = position;
    //   if(Math.abs(y - pos.y) < width / 2) {
    //     const dis = Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2);
    //     if(dis < minDis) {
    //       minDis = dis;
    //       minDisId = { isRight: pos.x - x > 0 ? true : false, domId };
    //     };
    //   }
    // });
    // return minDisId;
  }

  return (
    React.Children.map(newChildren, (child, index) =>
      <DragItem
        key={index}
        child={child}
        sortOrderNum={sortOrder && sortOrder.length > 0 ? sortOrder[index] : index}
        onDragEndChange={onDragEndChange}
        caculateDomPosition={caculateDomPosition}
      />
    )
  )
}


function DragItem(props) {
  const { child: propsChild, onDragEndChange, caculateDomPosition } = props
  const [child, setChild] = useState(propsChild);
  const dragRef = useRef(null);
  const dragDomInitialPosition = useRef(null);

  useEffect(() => {
    const newChild = ({ ...child, ref: dragRef,
        props: {
          ...child.props,
          draggable: 'true',
          onDragStart: e => onDragStart(e),
          onDrag: e => onDrag(e),
          onDragEnd: e => onDragEnd(e),
        }
      }
    );
    setChild(newChild);
  }, []);

   // 拖拽开始
  const onDragStart = (e) => {
    dragRef.current.style.opacity = 0.5;
    dragRef.current.style.position = 'relative';
    dragDomInitialPosition.current = {
      initialX: e.clientX, initialY: e.clientY,
      initialStyle: dragRef.current.currentStyle || window.getComputedStyle(dragRef.current, null)
    };
    console.log('dragDomInitialPosition.current: ', dragDomInitialPosition.current);
  }

  // 拖拽中
  const onDrag = throttle((e) => {
    const {initialX, initialY, initialStyle} = dragDomInitialPosition.current;
    const currentX = e.clientX - initialX;
    const currentY = e.clientY - initialY;
    // let styL, styT;
    //   styL = +initialStyle.left.replace(/\px/g, '');
    //   styT = +initialStyle.top.replace(/\px/g, '');
    //   // 移动当前元素
    //   dragRef.current.style.left = `${currentX + styL}px`;
    //   dragRef.current.style.top = `${currentY + styT}px`;

    // if(position.x === 0 && position.y === 0) return;
    // caculateDomPosition(position); // 计算出距离最近的dom
    // const { isRight } = caculateDomPosition(position); // 计算出距离最近的dom
    // if(beInsertedId !== id && (beResertDomId.current !== beInsertedId || beResertDomPosition.current !== isRight)) { // 被拖拽元素 需要调整位置
    //   beResertDomId.current = beInsertedId;
    //   beResertDomPosition.current = isRight;
    //   // 1. 删除之前插入的dom
    //   const oldDom = document.getElementById('clone-dom-id');
    //   oldDom && getParentNode(oldDom)?.removeChild(oldDom);
    //   // 2. 在新位置插入dom
    //   toSortChild(beInsertedId, id, isRight);
    // }
  }, 1000);

    // 拖拽结束
  const onDragEnd = (e) => {
  }



  return (
    child
  )
}

export default App