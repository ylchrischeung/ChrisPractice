import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Detail() {
  const [detail, setDetail] = useState<ElementProps | null>(null);;
  const location = useLocation();


  // defines the props that ElementProps expects
  type ElementProps = {
    code: string;
    name?: string;
    description?: string;
    // img is an array of object
    images?: { url?: string }[];
    price?: {formattedValue?: string}
  };
  
  // get the product code from url parameter and fetch specific data to detail state by setDetail
  useEffect(() => {
    const getQueryParam = (param: string) => {
      return new URLSearchParams(location.search).get(param);
    }

    const code = getQueryParam('code');

    async function fetchData() {
      const response = await fetch('data.json');
      const data = await response.json();
      
      data.products.forEach((element: ElementProps) => {
        if(element.code === code ){
          setDetail(element);
        }
      });
    }
    
    fetchData();

  }, [location]);
  
  return (
    <div className='m-10 p-10 grid grid-cols-3 min-h-screen'>
      { detail ? ( 
        <>
          <div className='col-span-1'>
            {detail.images ? (<img src={detail.images[0].url} alt='product'></img>) : (<img src='null_photo.png' alt='product'></img>)}
          </div>

          <div className='col-span-2'>
            <h1>{detail.code}</h1>
            <p>{detail.description ? detail.description : null}</p>
          </div>
        </>
       ) : ( 
        <>
          <p>No Records</p>
        </>
       ) }
      <>
        <Link to={'/'}>
          <button className='font-bold py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700'>
            Back
          </button>
        </Link>
      </>      
    </div>
  )
  
}

export default Detail;
