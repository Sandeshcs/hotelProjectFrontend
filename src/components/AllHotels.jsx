import { useState } from "react";
import useFetch from "../useFetch";

const AllHotels = () => {
    const [successMessage, setMessage] = useState('');
    const {data, loading, error} = useFetch('https://hotel-backend-project-ten.vercel.app/allhotels');
    //console.log(data);

    const handleDelete = async (hotelId) => {
        try{
            const response = await fetch(`https://hotel-backend-project-ten.vercel.app/hotels/delete/${hotelId}`, {
                method: 'DELETE',
                headers: {
                    'content-type':'application/json'
                },
            });

            if(!response.ok){
                throw 'failed to delete hotel';
            }
            const data = await response.json();
            if(data){
                setMessage("hotel deleted successfully.")
                window.location.reload();
            }
        }
        catch (error) {
            throw error;
        }
    };

    return(
        <div className="container">
            {loading && <p>loading...</p>}
            <ul>
            {data?(
             data.map(hotel => (
                <li key={hotel._id}>
                    {hotel.name}
                    <button onClick={() => handleDelete(hotel._id)}>Delete</button>
                </li>
             ))   
            ): error && <p>{error}</p>}
            </ul>
            <p>{successMessage}</p>
        </div>
    )
};
export default AllHotels;