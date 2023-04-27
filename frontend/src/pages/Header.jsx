import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <div>
            <header className="flex items-center justify-between mb-6">

                <Link to={'/'} className="flex justify-start">
                    <div className="flex items-center gap-1 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                        <span className="font-bold text-primary text-sm w-28 md:w-auto md:text-base lg:text-xl">krisii carDiary's Project</span>
                    </div>
                </Link>

                <Link to={user ? '/account' : '/login'} className="flex justify-end">
                    <div className="flex items-center gap-1 border border-gray-500 rounded-2xl py-1 px-2 text-sm md:text-base shadow-md shadow-gray-400 grow">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-5 md:w-5 relative top-1">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        </div>
                        {!!user && (
                            <div className="flex gap-1">
                                <div className="hidden lg:block md:text-base lg:text-xl">
                                    You are logged in as
                                </div>
                                <div className="text-sm md:text-base lg:text-xl lg:font-bold ">
                                    {user.name.split(' ')[0]}
                                </div>
                            </div>
                        )}
                    </div>
                </Link>

                <div className="flex absolute left-1/2 transform -translate-x-1/2 justify-center">
                    <div className="flex items-center gap-1 border border-gray-500 rounded-2xl py-1 px-2 text-sm shadow-md shadow-gray-400 bg-red-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <span className="text-base md:text-base text-center hidden md:block md:text-base lg:text-xl">Welcome our page, its a test!</span>
                    </div>
                </div>
            </header>
        </div>
    )
}