import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from './components/Image';

export default function IndexPage() {
  const [cars, setCars] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get('/cars').then((response) => {
      setCars([...response.data]);
      setReady(true);
    });
  }, []);

  if (!ready) {
    return 'Workin progress...';
  }

  return (
    <div>
      <div className="w-full md:w-11/12 lg:w-9/12 xl:w-7/12 m-auto">
        <div className="flex justify-center">
          <div className="w-4/5 bg-primary text-white rounded-2xl mt-4 mb-4 text-sm md:text-xl shadow-md shadow-gray-400 text-center">
            Registrated cars:
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cars.length > 0 &&
            cars.map((car) => (
              <Link
                to={'/garage/' + car._id}
                className="bg-gray-100 rounded-2xl border border-gray shadow-md shadow-gray-400 hover:ring-2 hover:ring-black"
                key={car._id}
              >
                <div className="rounded-2xl flex justify-center p-2">
                  {car.photos?.[0] && (
                    <Image
                      className="rounded-2xl h-32 w-48 ring-2 ring-white shadow-md shadow-gray-400"
                      src={car.photos?.[0]}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex flex-col text-sm md:text-base text-center mb-1">
                  <p>{car.nameOfTheCar}</p>
                  <p>{car.modelOfTheCar}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
