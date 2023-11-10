import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from './store';

// todo by Kevin
// async await syntax
// state instead of documnet api
// style tailwind

function Main() {
  
  const [ data, setData ] = useState([]);

  // use function and state from global state
  const { addItemList, removeItem } = useStore();
  const itemList = useStore(state => state.itemList);
  
  // Fetch data from data.json & put products object into state by setData
  useEffect(() => {    
    
    async function fetchData() {
      const response = await fetch('data.json');
      const data = await response.json();
      setData(data.products);
    }
    
    fetchData();
  }, []);

  // Page Function
  const [ currentPage, setCurrentPage ] = useState(1);
  const recordsPerPage = 3;

  // Get current records
  const indexOfLastRecord = currentPage * recordsPerPage; 
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
  // tells TypeScript that currentRecords is an array of currentRecordsProps objects
  type currentRecordsProps = {
    code: string;
    name?: string;
    // img is an array of object, optional to currentRecords but require url
    images?: { url?: string }[];
    price?: {formattedValue?: string}
  }; 

  const currentRecords : currentRecordsProps[] = data ? data.slice(indexOfFirstRecord, indexOfLastRecord) : [];

  //Change page
  const paginate = (pageNumber : number) => setCurrentPage(pageNumber);
  
  // Create ProductBox Component to display products in main page
  // declare the type as a string array when call useState by useState<string[]>([])
  const [ showPreviewBox, setShowPreviewBox] = useState<string[]>([]);

  // defines the props that ProductBox expects
  type ProductBoxProps = {
    id: string;
    name?: string;
    // img is an array of object
    image?: { url?: string }[];
    price?: string;
  };

  // declare ProductBox as a Function Component that takes props from ProductBoxProps
  const ProductBox = ({ id, name, image, price } : ProductBoxProps ) => {
    
    // show the preview info if isShowPreview is true, otherwise hidden
    const previewboxstyle = (showPreviewBox.includes(id)) ? 'block' : 'hidden' ;

    // turn the box background to grey if isSelected is true
    const style = (itemList.includes(id)) ? 'bg-gray-500' : 'bg-white';

    // When user click Preview button, check if exists in showPreviewBox state
    // Yes -> remove id by .filter -> previewboxstyle = hidden ; No -> set new state with exisits record and new id -> previewboxstyle = block
    
    // When user click Select button, add item into global state by addItemList of useStore and +1 to selectedItem
    // When user click Remove button, remove item from global state by removeItem of useStore and -1 to selectedItem
    return (
      <div className={`${style} inline-block relative m-5 p-2 border border-gray-300 align-top overflow-hidden text-center`}>
        <>
          <div className='pt-11 block relative font-bold'>
            <div className='inline-block'>
              {image ? <img src={image[0].url} alt='product visual'></img> : (<img src='null_photo.png' alt='without product visual'></img>)}
            </div>
            <h1 className='text-2xl'>{ name ? name : 'N/A'}</h1>
          </div>
        </>

        <>
          <Link to={`/detail?code=${id}`}>
            <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700'>Details</button>
          </Link>
          
          <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700' onClick={() => {
            if( showPreviewBox.includes(id) ){
              setShowPreviewBox(showPreviewBox.filter( target => target !== id ))
            }else{
              setShowPreviewBox([...showPreviewBox, id])
            }
          }}>Preview</button>
          
          <div className={`${previewboxstyle}`}>
            <p>{id}</p>
            <p>{price ? price : 'N/A'}</p>
            <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700' onClick={() => {
              
              addItemList(id);

            }}>Select</button>
            
            <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700' onClick={() => {
              
              removeItem(id);
              
            }}>Remove</button>
          </div>
        
        </>
      </div>
    );
  }

  return (
    <>
      <div className='grid grid-cols-3 h-auto'>
        {
          (currentRecords.length > 0) ? (          
            <>
              {
                // From JSON, map products.code to key & id and use ProductBox functional component
                currentRecords.map(( item ) => (
                  <ProductBox
                    key={item.code}
                    id={item.code}
                    name={item.name ? item.name : undefined }
                    image={item.images ? item.images : undefined }
                    price={item.price ? item.price.formattedValue : undefined }
                  />
                ))
              }
            </>
            ) : ( 
            <>
              No Record!
            </>
          )
        }
      </div>

      {/*Paging Control*/}
      <div className='flex justify-center'>
        {currentPage > 1 && <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700' onClick={ () =>  {paginate( currentPage -1 )}}>Previous</button>}
        {data && data.length > indexOfLastRecord && <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700' onClick={() => {paginate( currentPage +1 )}}>Next</button>}
      </div>

    </>
  );
  
}

export default Main;
