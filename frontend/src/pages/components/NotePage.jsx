import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom"
import AccountNav from "./AccountNav";
import axios from "axios";
import { format } from "date-fns";
import LoadSpinner from "./LoadSpinner";

export default function NotePage() {
    const { id } = useParams();
    const [notes, setNotes] = useState([]);
    const [car, setCar] = useState([]);
    const [readyGarage, setReadyGarage] = useState(false);
    const [readyNote, setReadyNote] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [listOfPhotos, setListOfPhotos] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        axios.get('/verify/' + id).then((response) => {
            if (response.data == true) {
                axios.get('/garage/' + id).then(({ data }) => {
                    setCar(data);
                    setListOfPhotos(data.photos);
                    setReadyGarage(true);
                });
                axios.get('/listNotes/' + id).then(({ data }) => {
                    setNotes(data);
                    setReadyNote(true);
                });
            } else {
                setRedirect(true);
                setReadyNote(true);
                setReadyGarage(true);
            }
        })
    }, []);


    if (!readyGarage && !readyNote) { return (<LoadSpinner />) }

    if (redirect) { return <Navigate to="/account/garage" />; }

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? listOfPhotos.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === listOfPhotos.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    async function deleteNote(note_id) {
        await axios.delete('/deleteNote/' + note_id);
        setNotes([...notes.filter(note => note._id !== note_id)]);
    }

    function maxKilometerOfCar() {
        const kilometers = [];
        if (notes.length > 0) {
            notes.forEach(note => {
                kilometers.push(note.kilometer)
            });
            kilometers.reverse()
            return kilometers[0] + ' km'
        } else {
            kilometers[0] = 'null'
            return kilometers[0]
        }
    }

    function costOfAllServices() {
        let costOfAllService = 0;
        if (notes.length > 0) {
            notes.forEach(note => {
                costOfAllService += note.costOfService
            });
            return costOfAllService + ' Ft'
        } else {
            costOfAllService = 'null'
            return costOfAllService
        }
    }

    function countTypeOfServices() {
        const countTypeOfService = [0, 0, 0]
        if (!notes.length == 0) {
            notes.forEach(note => {
                if (note.typeOfService === 'Mandatory') {
                    countTypeOfService[0]++;
                }
                if (note.typeOfService === 'Service') {
                    countTypeOfService[1]++;
                }
                if (note.typeOfService === 'One time') {
                    countTypeOfService[2]++;
                }
            });
        }
        return countTypeOfService
    }

    function NotePageMainDiv() {
        return (
            <>
                <div className="flex gap-1">
                    <div className="flex-none grow-0">
                        <div className="flex gap-0.5">
                            <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" ><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg></div>
                            <div>Info:</div>
                        </div>
                    </div>
                    <div className="tracking-tight">{car.description}</div>
                </div>
                <div className="flex justify-between gap-5">
                    <div className="flex gap-1">
                        <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg></div>
                        <p>Notes: {notes.length}</p>
                    </div>
                    <div>Mandatory: {countTypeOfServices()[0]}</div>
                    <div>Service: {countTypeOfServices()[1]}</div>
                    <div>One Time: {countTypeOfServices()[2]}</div>
                </div>
                <div className="flex gap-1">
                    <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg></div>
                    <p>All cost of services: {costOfAllServices()}</p>
                </div>
                <div className="flex gap-1">
                    <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg></div>
                    <p>Last registrated kilometer: {maxKilometerOfCar()}</p>
                </div>
            </>
        )
    }

    return (
        <>
            <AccountNav />
            <div className='responsive xl:mx-44 text-sm'>
                <div className="flex justify-center">
                    <div className="flex flex-col w-full" key={car._id}>
                        <div className='flex justify-between mb-1'>
                            <div className='flex text-base xl:text-2xl gap-1'>
                                <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 xl:w-7 xl:h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg></div>
                                <div className='flex gap-2 items-center'>
                                    <div>Selected car: </div>
                                    <div className='font-medium '>{car.nameOfTheCar}</div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <Link to={'/'} className="flex gap-1 px-2 py-0.5 hover:bg-gray-50 hover:rounded-xl hover:shadow-md hover:shadow-gray-400 hover:ring-1 hover:ring-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <div className='flex items-center'>Back</div>
                                </Link>
                            </div>
                        </div>

                        <div className='border-0 border-b border-gray-300 mb-2'></div>

                        <div className='flex gap-5 mb-2'>
                            <div className='flex flex-col md:flex-row md:gap-5'>
                                <div className='flex gap-0.5'>
                                    <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" /></svg></div>
                                    <div>Registration plate: {car.licensePlate}</div>
                                </div>
                                <div className='flex gap-0.5'>
                                    <div className='flex flex-col justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg></div>
                                    <div>Year: {car.yearOfTheCar}</div>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:gap-5'>
                                <div className='flex gap-0.5'>
                                    <div className='flex flex-col justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" /></svg></div>
                                    <div>Model: {car.modelOfTheCar}</div>
                                </div>
                                <div className='flex gap-0.5'>
                                    <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg></div>
                                    <div>Color: {car.color}</div>
                                </div>
                            </div>
                        </div>

                        <div className='border-0 border-b border-gray-300 mb-2'></div>

                        <div className='flex justify-center'>
                            <div className='flex lg:w-3/5 p-1 justify-center group relative'>
                                <div className='flex justify-center h-60 w-96 bg-gray-50 bg-opacity-75 rounded-xl shadow-md shadow-gray-400 overflow-hidden mb-1'>
                                    <img src={listOfPhotos[currentIndex]} alt="" />
                                </div>
                                {listOfPhotos.length > 1 && (
                                    <>
                                        <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 xl:left-20 rounded-xl p-0.5 bg-black/30 text-white cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={prevSlide}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                            </svg>
                                        </div>
                                        <div className='absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 xl:right-20 rounded-xl p-0.5 bg-black/30 text-white cursor-pointer'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={nextSlide}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                            </svg>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className='flex-col lg:w-2/5 gap-2 hidden xl:flex'>
                                <NotePageMainDiv />
                            </div>
                        </div>
                        <div className='flex flex-col w-full display xl:hidden mt-2'>
                            <NotePageMainDiv />
                        </div>
                        <div className='border-0 border-b border-gray-300 m-2'></div>
                    </div>
                </div>

                <div className="flex flex-col justify-start">
                    <div className='flex justify-between mb-2'>
                        <div className="flex gap-0.5">
                            <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" /></svg></div>
                            <div>Notes</div>
                        </div>
                        <div className="flex justify-center">
                            <Link className="flex bg-green-400 text-gray-900 py-0.5 px-1 rounded-xl shadow-md shadow-gray-400 gap-0.5 ring-1 ring-gray-400 hover:ring-1 hover:ring-black" to={'/account/garage/' + id + '/notes/newNote'}>
                                <div className="flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>New note</div>
                            </Link>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {notes.length == 0 && (
                            <div className='flex gap-1'>
                                <div className='flex flex-col justify-center'><svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                                </div>
                                <div>{car.nameOfTheCar} haven't got any notes!</div>
                            </div>
                        )}
                        {notes.length != 0 &&
                            notes.map((note) => (
                                <div className="flex flex-col p-1 rounded-xl shadow-md shadow-gray-400 ring-1 ring-gray-400 hover:ring-1 hover:ring-black group " key={note._id}>
                                    <div className="flex justify-between">
                                        <div className="flex flex-col justify-center w-full text-sm lg:text-base tracking-tight">
                                            <div className="flex gap-0.5">
                                                <div className="flex flex-col justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                                    </svg>
                                                </div>
                                                <div className="flex gap-0.5 w-full">
                                                    <div className="flex flex-col justify-center w-1/3">
                                                        {note.subject}
                                                    </div>
                                                    <div className="flex w-1/3 md:ml-32 gap-0.5">
                                                        <div className="flex flex-col justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                                                        </div>
                                                        <p className="flex flex-col justify-center">
                                                            {note.typeOfService}
                                                        </p>
                                                    </div>
                                                    <div className="flex w-1/3 justify-end gap-0.5 mr-1">
                                                        <div className="flex flex-col justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" /></svg>
                                                        </div>
                                                        <p className="flex flex-col justify-center">
                                                            {format(new Date(note.timeOfService), 'yyyy-MM-dd')}
                                                        </p>
                                                        <div className="flex gap-1 ml-1">
                                                            <Link to={'edit/' + note._id}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-0.5 rounded-full bg-white hover:bg-green-300 shadow shadow-gray-500">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                                </svg>
                                                            </Link>
                                                            <div onClick={() => deleteNote(note._id)} key={"delete/" + note._id} className="cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-0.5 rounded-full bg-white hover:bg-red-300 shadow shadow-gray-500">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden mt-1 group-hover:block">
                                                <div className="flex justify-between md:w-3/5">
                                                    <div className="flex gap-0.5">
                                                        <div className="flex flex-col justify-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg></div>
                                                        <p>Registrated kilometer: {note.kilometer} km</p>
                                                    </div>
                                                    <div className="flex gap-0.5">
                                                        <div className="flex flex-col justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                        </div>
                                                        <p>Cost: {note.costOfService} Ft</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-0.5 break-all">
                                                    <div className="flex-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                                                    </div>
                                                    <div>{note.extraInfo}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}