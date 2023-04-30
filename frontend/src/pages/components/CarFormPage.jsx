import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AccountNav from './AccountNav';
import Image from './Image';

export default function CarFormPage() {
  const { id } = useParams();
  const [nameOfTheCar, setNameOfTheCar] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [modelOfTheCar, setModelOfTheCar] = useState('');
  const [yearOfTheCar, setYearOfTheCar] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get('/garage/' + id).then((response) => {
      const { data } = response;
      setNameOfTheCar(data.nameOfTheCar);
      setLicensePlate(data.licensePlate);
      setModelOfTheCar(data.modelOfTheCar);
      setYearOfTheCar(data.yearOfTheCar);
      setColor(data.color);
      setDescription(data.description);
      setAddedPhotos(data.photos);
    });
  }, [id]);

  let styleClasses = 'mt-2 ml-1 text-sm md:text-xl';

  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append('photos', files[i]);
    }
    axios
      .post('/upload', data, {
        headers: { 'Content-type': 'multipart/form-data' },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

  async function saveCar(ev) {
    ev.preventDefault();
    const carData = {
      nameOfTheCar,
      licensePlate,
      modelOfTheCar,
      yearOfTheCar,
      color,
      description,
      addedPhotos,
    };
    if (id) {
      // update
      const morecarData = { id, ...carData };
      await axios.put('/garage', morecarData);
    } else {
      // new car
      const morecarData = { ...carData };
      await axios.post('/garage', morecarData);
    }
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to="/account/garage" />;
  }

  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }

  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    const addedPhotosWithoutSelected = [
      ...addedPhotos.filter((photo) => photo !== filename),
    ];
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
  }

  return (
    <>
      <AccountNav />
      <div className="flex flex-col items-center">
        <div className="w-full md:w-11/12 lg:w-9/12 xl:w-7/12">
          <div className="flex justify-end">
            <Link
              to={'/account/garage/'}
              className="flex gap-1 bg-gray-100 px-2 py-1 rounded-2xl shadow-md shadow-gray-400 hover:ring-2 hover:ring-primary"
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
                  d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Back to the garage
            </Link>
          </div>

          <form
            className="mt-2 p-2 gap-2 rounded-xl bg-gray-100 my-2 shadow-lg shadow-gray-400 ring-2 ring-gray-300"
            onSubmit={saveCar}
          >
            <div className="flex md:gap-32 flex-col md:flex-row">
              <div className="md:w-1/2">
                <p className={styleClasses}>Name of the car:</p>
                <input
                  type="text"
                  value={nameOfTheCar}
                  onChange={(ev) => setNameOfTheCar(ev.target.value)}
                  placeholder="Villám McQueen"
                />
                <p className={styleClasses}>License plate:</p>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(ev) => setLicensePlate(ev.target.value)}
                  placeholder="ABC-123"
                />
                <p className={styleClasses}>Color:</p>
                <input
                  type="text"
                  value={color}
                  onChange={(ev) => setColor(ev.target.value)}
                  placeholder="red"
                />
              </div>
              <div className="md:w-1/2">
                <p className={styleClasses}>Model of the car:</p>
                <input
                  type="text"
                  value={modelOfTheCar}
                  onChange={(ev) => setModelOfTheCar(ev.target.value)}
                  placeholder="Dodge"
                />
                <p className={styleClasses}>Year of the car:</p>
                <input
                  type="text"
                  value={yearOfTheCar}
                  onChange={(ev) => setYearOfTheCar(ev.target.value)}
                  placeholder="2003"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <p className={styleClasses}>Photos:</p>
              <label className="cursor-pointer flex bg-white px-1 ring-1 ring-gray-500 rounded-xl justify-center items-center mt-2">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
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
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                <span>Upload</span>
              </label>
            </div>

            <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="flex relative" key={link}>
                    <Image
                      className="rounded-2xl ring-2 ring-gray-300 h-32 w-52"
                      src={link}
                    />
                    <button
                      onClick={(ev) => removePhoto(ev, link)}
                      className="cursor-pointer absolute bottom-1 right-1 text-white bg-black p-1 bg-opacity-50 rounded-xl"
                    >
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
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(ev) => selectAsMainPhoto(ev, link)}
                      className="cursor-pointer absolute top-1 right-1 text-white bg-black p-1 bg-opacity-50 rounded-xl"
                    >
                      {link === addedPhotos[0] && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="yellow"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {link !== addedPhotos[0] && (
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
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
            </div>

            <p className={styleClasses}>Description:</p>
            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
              placeholder="description of the car"
            />

            <div className="flex justify-center mt-2">
              <div className="w-1/2">
                <button className="primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
