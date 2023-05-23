import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from './components/Image';
import LoadSpinner from './components/LoadSpinner';

export default function IndexPage() {
  const [cars, setCars] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get('/cars').then((response) => {
      //setCars([...response.data, ...response.data, ...response.data, ...response.data]);
      setCars([...response.data]);
      setReady(true);
    });
  }, []);

  async function search(ev) {
    /*setSearchCars(ev.target.value)
    var updatedList = [...cars];
    console.log(updatedList)
    updatedList = updatedList.filter(cars => cars.nameOfTheCar == searchCars)
    setCars(updatedList);
    console.log(updatedList)
    console.log([...cars])
    setCars([...cars.filter(cars => cars.nameOfTheCar == searchCars)])*/
  }

  if (!ready) {
    return (
      <LoadSpinner />
    )
  }

  return (
    <div className='responsive'>
      <div className="flex justify-around">
        <div className='flex px-5 py-0.5 bg-gray-50 rounded-xl shadow-md shadow-gray-400 items-center ring-1 ring-gray-400'>Database for the garage</div>
        <div className='flex'>
          <input type="text" value={'Search is not working!'} onChange={search} />
        </div>

      </div>
      <div className="flex justify-center mx-auto mt-4">
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {cars.length > 0 &&
            cars.map((car) => (
              <Link to={'/garage/' + car._id} key={car._id} className='relative'>
                <div className="rounded-xl flex justify-center">
                  {car.photos?.[0] && (
                    <Image className="rounded-xl h-36 w-52 lg:h-44 lg:w-64 shadow-md shadow-gray-400" src={car.photos?.[0]} alt="" />
                  )}
                </div>
                <div className="flex flex-col mt-2 mb-2">
                  <div className='flex justify-between text-sm lg:text-base gap-1'>
                    <div className='font-medium flex-none'>{car.nameOfTheCar}</div>
                    <div className='truncate ...'>{car.modelOfTheCar}</div>
                  </div>
                  <div className='-mt-1 text-sm lg:text-base'>{car.licensePlate}</div>
                </div>
                <div className='absolute top-2 right-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="rgba(0, 0, 0, 0.4)" viewBox="0 0 24 24" strokeWidth={1} stroke="white" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
