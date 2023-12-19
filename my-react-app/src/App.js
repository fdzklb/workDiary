import React, { children, ReactElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
        <DragDropContext
          parentNode={() => document.getElementById('dragcom')}
          onDragEndChange={(sortOrder) => saveSortOrder(sortOrder)}
          sortOrder={[]}
          // sortOrder={sortOrder}
        >
          <div>0</div>
          <div>11 </div>
          <div>222</div>
          <div>3333</div>
          <div>44444</div>
          <div>555555</div>
          <div>6666666</div>
          <div>77777777</div>
          <div>888888888</div>
          <div>10101010101010</div>
          <div>1111111111111111</div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;



function DragDropContext(props) {
  const { children, parentNode, sortOrder, onDragEndChange } = props;

  const newChildren = useMemo(() => {
    if(sortOrder.length > 0) {
      return sortOrder.map(order => {
        return children[order];
      });
    } else {
      return children;
    }
  }, [sortOrder, children]);

  return (
    React.Children.map(newChildren, (child, index) =>
    <DragItem
      key={index}
      child={child}
      sortOrderNum={sortOrder && sortOrder.length > 0 ? sortOrder[index] : index}
      parentNode={parentNode}
      onDragEndChange={onDragEndChange}
    />
  ))
}


function DragItem(props) {
  const { child: propsChild, parentNode, onDragEndChange } = props
  const [child, setChild] = useState(propsChild);
  const dragRef = useRef(null);

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
    // dragRef.current.style.display = 'none';
  }

    // 拖拽结束
  const onDragEnd = (e, id) => {
  }

  // 拖拽中
  const onDrag = throttle((e, id) => {
  
  }, 200);


  return (
    child
  )
}

