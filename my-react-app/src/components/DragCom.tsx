import { ReactElement, useEffect, useState } from 'react'

type Props = {
    children: ReactElement[],
}

function DragCom({ children } :Props) {
    const [sortChild, setSortChild] = useState(children);

    useEffect(() => {

    }, []);

    return (
        {sortChild}
    )
}

export default DragCom;