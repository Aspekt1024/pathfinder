import React from 'react'
import { appState } from '../../contexts/AppContext.js';
import ItemTable from '../elements/ItemTable.js';

function Page() {
    const state = React.useContext(appState)

    return (
        <div className='page'>
            {state.bombList && <ItemTable list={state.bombList.results} />}
        </div>
    )
}

export default Page;