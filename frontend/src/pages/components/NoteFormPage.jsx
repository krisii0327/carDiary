import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";
import { format } from "date-fns";

export default function NoteFormPage() {
    const { id, note_id } = useParams();
    const test = useState()
    const [subject, setSubject] = useState('');
    const [typeOfService, setTypeOfService] = useState('');
    const [kilometer, setKilometer] = useState();
    const [costOfService, setCostOfService] = useState();
    const [extraInfo, setExtraInfo] = useState('');
    const [timeOfService, setTimeOfService] = useState(Date);
    const [redirect, setRedirect] = useState(false);

    let styleClasses = 'mt-2 ml-1 text-sm md:text-xl';

    useEffect(() => {
        if (!note_id) {
            return;
        }
        axios.get('/edit/' + note_id).then(response => {
            const { data } = response;
            setSubject(data.subject);
            setTypeOfService(data.typeOfService);
            setKilometer(data.kilometer);
            setCostOfService(data.costOfService);
            setExtraInfo(data.extraInfo);
            setTimeOfService(format(new Date(data.timeOfService), 'yyyy-MM-dd'));
        })
    }, [note_id])

    function styleOftypeOfService(type) {
        let radioButtonClasses = 'bg-white cursor-pointer p-1 px-4 rounded-xl shadow-md shadow-gray-400'
        if (typeOfService === type) {
            radioButtonClasses = 'bg-primary text-white cursor-pointer p-1 px-4 rounded-xl shadow-md shadow-gray-400'
        }
        return radioButtonClasses;
    }

    async function saveNote(ev) {
        ev.preventDefault();
        const noteData = { id, subject, typeOfService, kilometer, costOfService, extraInfo, timeOfService };

        if (note_id) {
            //update
            const updateNoteData = { note_id, ...noteData }
            await axios.put('/updateNote', updateNoteData)
        } else {
            //new note
            const newNoteData = { ...noteData }
            await axios.post('/newNote', newNoteData);
        }
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/garage/' + id + '/notes'} />;
    }

    return (
        <div>
            <AccountNav />
            <div className="flex flex-col items-center">
                <div className="w-full md:w-11/12 lg:w-9/12 xl:w-7/12 flex justify-end">
                    <Link to={'/account/garage/' + id + '/notes'} className="flex gap-1 bg-gray-100 px-2 py-1 rounded-2xl shadow-md shadow-gray-400 hover:ring-2 hover:ring-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Back to the car
                    </Link>
                </div>

                <form className="w-full md:w-11/12 lg:w-9/12 xl:w-7/12 mt-2 p-2 gap-2 rounded-xl bg-gray-100 my-2 shadow-lg shadow-gray-400 ring-2 ring-gray-300" onSubmit={saveNote}>
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="w-2/3">
                            <p className={styleClasses}>Subject of the service:</p>
                            <input type="text" value={subject} onChange={ev => setSubject(ev.target.value)} placeholder="Oil change" />
                        </div>
                        <div className="w-1/3 flex md:justify-end">
                            <div>
                                <p className={styleClasses}>Time of service:</p>
                                <input type="date" value={timeOfService} onChange={ev => setTimeOfService(ev.target.value)} />
                            </div>
                        </div>
                    </div>

                    <p className={styleClasses}>Type of service:</p>
                    <div className="flex justify-around mt-1 mb-2">
                        <div>
                            <label><input type="radio" name="typeOfService" value={'Mandatory'} onChange={ev => setTypeOfService(ev.target.value)} className="hidden"></input>
                                <span className={styleOftypeOfService('Mandatory')}>Mandatory</span>
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="radio" name="typeOfService" value={'Service'} onChange={ev => setTypeOfService(ev.target.value)} className="hidden"></input>
                                <span className={styleOftypeOfService('Service')}>Service</span>
                            </label>
                        </div>

                        <div>
                            <label>
                                <input type="radio" name="typeOfService" value={'One time'} onChange={ev => setTypeOfService(ev.target.value)} className="hidden"></input>
                                <span className={styleOftypeOfService('One time')}>One time</span>
                            </label>
                        </div>
                    </div>

                    <p className={styleClasses}>Kilometer:</p>
                    <input type="number" value={kilometer} onChange={ev => setKilometer(ev.target.value)} placeholder="45000" />

                    <p className={styleClasses}>Cost of service:</p>
                    <input type="number" value={costOfService} onChange={ev => setCostOfService(ev.target.value)} placeholder="100000" />

                    <p className={styleClasses}>Extra info about the service:</p>
                    <textarea type="text" value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} placeholder="filter changes aswell" />

                    <div className="flex justify-center mt-2">
                        <div className="w-1/2">
                            <button className="primary">Save</button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}