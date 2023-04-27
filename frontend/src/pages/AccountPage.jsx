import { Navigate, Link, useParams } from "react-router-dom";
import AccountNav from "./components/AccountNav";
import FavouritesPage from "./components/FavouritesPage";
import GaragesPage from "./components/GaragePage";
import ProfilePage from "./components/ProfilePage";

export default function AccountPage() {
    let { subpage } = useParams();
    if (subpage === undefined) {
        subpage = 'profile';
    }

    return (
        <div>
            <AccountNav />
            {subpage === 'profile' && (
                <ProfilePage />
            )}
            {subpage === 'garage' && (
                <GaragesPage />
            )}
            {subpage === 'favourites' && (
                <FavouritesPage />
            )}
        </div>
    );
}