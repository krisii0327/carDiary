import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from './AccountNav';
import axios from 'axios';
import Image from './Image';

export default function GaragePage() {
  const [garage, setGarage] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    axios.get('/garage').then(({ data }) => {
      setGarage(data);
      setReady(true);
    });
  }, []);

  async function deleteCar(car_id) {
    await axios.delete('/delete/' + car_id);
    await axios.delete('/deleteNotes/' + car_id);
    setGarage([...garage.filter((car) => car._id !== car_id)]);
  }

  if (!ready) {
    return (
      <div className="text-center mt-10">
        <div role="status">
          <svg aria-hidden="true" class="inline w-14 h-14 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <AccountNav />
      <div className="flex flex-col text-sm md:text-base">
        <div className="w-full md:w-11/12 lg:w-9/12 xl:w-7/12 m-auto">
          {garage.length == 0 && (
            <div className="bg-gray-100 p-2 rounded-2xl shadow-md shadow-gray-400">
              You haven't got any car in your garage!
            </div>
          )}
          {garage.length > 0 &&
            garage.map((car) => (
              <div key={car._id}>
                <Link
                  to={'/account/garage/' + car._id + '/notes'}
                  className="flex cursor-pointer gap-2 bg-gray-100 hover:bg-gray-200 hover:ring-2 hover:ring-primary p-2 rounded-2xl shadow-md shadow-gray-400 mb-3 relative"
                  key={'notes/' + car._id}
                >
                  <div className="flex">
                    {car.photos.length > 0 && (
                      <Image
                        className="rounded-2xl h-24 w-52 md:h-32 md:w-56 ring-2 ring-white shadow-md shadow-gray-400"
                        src={car.photos[0]}
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-between w-full overflow-hidden truncate ...">
                    <div className="flex gap-0.5">
                      <div className="flex flex-col justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6h.008v.008H6V6z"
                          />
                        </svg>
                      </div>
                      <p>
                        {car.nameOfTheCar} - {car.licensePlate}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      <div className="flex flex-col justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                          />
                        </svg>
                      </div>
                      <div className="flex gap-1">
                        <p>{car.yearOfTheCar}</p>
                        <p>{car.modelOfTheCar}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      <div className="flex flex-col justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                          />
                        </svg>
                      </div>
                      <div>{car.color}</div>
                    </div>
                    <div className="flex truncate">
                      <div className="flex gap-0.5">
                        <div className="flex flex-col justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                          </svg>
                        </div>
                        <div>Info:</div>
                      </div>

                      <div className="ml-1 truncate">{car.description}</div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-around">
                    <Link
                      to={'/account/garage/' + car._id}
                      className="flex rounded-full p-1 bg-white hover:bg-green-300 shadow shadow-gray-500"
                      key={'edit/' + car._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </Link>
                    <div
                      onClick={() => deleteCar(car._id)}
                      className="flex cursor-pointer rounded-full p-1 bg-white hover:bg-red-300 shadow shadow-gray-500"
                      key={'delete/' + car._id}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link
            className="flex bg-green-400 text-gray-900 py-0.5 px-2 rounded-2xl shadow-md shadow-gray-400 gap-1 hover:ring-2 hover:ring-black"
            to={'/account/garage/new'}
          >
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span>New car</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
