import React from 'react';
import {useStore} from './store';

function Footer() {

  const selectedItem = useStore(state => state.selectedItem);
  const itemList = useStore(state => state.itemList);
  const { removeAllItem } = useStore();

  function RemoveAll() {
    removeAllItem();
  }

  return(
    <div className='sticky bottom-0 bg-slate-200 font-bold text-center h-24'>
      <>        
        <p>Total selected products: {selectedItem}</p>
        <p>You have selected below products:</p> 
        {itemList ? itemList.map((item) => (`${item}, `)) : 'Nil' }
        <br/>
        <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700' onClick={RemoveAll}>Remove All</button>
      </>
    </div>
  )

}


export default Footer;