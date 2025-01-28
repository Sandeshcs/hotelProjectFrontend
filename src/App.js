import "bootstrap/dist/css/bootstrap.min.css"
import {useState} from 'react';
import AllHotels from "./components/AllHotels";

function App() {
  const [formData, setFormData] = useState({
  name: "",
  category: "",
  location: "",
  rating: "",
  website: "",
  phoneNumber: "",
  checkInTime: "",
  checkOutTime: "",
  amenities: "",
  priceRange: "",
  reservationsNeeded: "",
  isParkingAvailable: "",
  isWifiAvailable: "",
  isPoolAvailable: "",
  isSpaAvailable: "",
  isRestaurantAvailable: "",
  photos: ""
  });
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
     ...prevData, [name]: name === "rating"?parseInt(value):value 
    }));
  }

  const handleCheckbox = (e) => {
    const {name, checked} = e.target;
    if(checked){
      formData[name] = true;
    }else{
      formData[name] = false;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try{
      const response = await fetch('https://hotel-backend-project-ten.vercel.app/hotels', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      console.log(response);
      if(!response.ok){
        console.log("failed to add hotel.")
      }
      const data = await response.json();
      console.log('added hotel: ', data);
    }
    catch (error) {
      throw error;
    }
  }
  return (
    <div className="container">
      <h1>Add New Hotel</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label><br/>
        <input type='text' name="name" value={formData.name} onChange={handleChange}/><br/><br/>

        <label>Category:</label><br/>
        <select name="category" onChange={handleChange}>
          <option value={'Budget'}>Budget</option>
          <option value={'Mid-Range'}>Mid-Range</option>
          <option value={'Luxury'}>Luxury</option>
          <option value={'Boutique'}>Boutique</option>
          <option value={'Resort'}>Resort</option>
          <option value={'Other'}>Other</option>
        </select><br/><br/>
        
        <label>Location:</label><br/>
        <input type='text' name="location" value={formData.location} onChange={handleChange}/><br/><br/>

        <label>Rating:</label><br/>
        <input type='text' name="rating" value={formData.rating} onChange={handleChange}/><br/><br/>

        <label>Website:</label><br/>
        <input type='text' name="website" value={formData.website} onChange={handleChange}/><br/><br/>

        <label>Phone Number:</label><br/>
        <input type='text' name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}/><br/><br/>

        <label>Check In Time:</label><br/>
        <input type='text' name="checkInTime" value={formData.checkInTime} onChange={handleChange}/><br/><br/>

        <label>Check Out Time:</label><br/>
        <input type='text' name="checkOutTime" value={formData.checkOutTime} onChange={handleChange}/><br/><br/>
        
        <label>Amenities:</label><br/>
        <input type='text' name="amenities" value={formData.amenities} onChange={handleChange}/><br/><br/>

        <label>Price Range:</label><br/>
        <select name="priceRange" onChange={handleChange}>
          <option value={'$$ (11-30)'}>$$ (11-30)</option>
          <option value={'$$$ (31-60)'}>$$$ (31-60)</option>
          <option value={'$$$$ (61+)'}>$$$$ (61+)</option>
          <option value={'Other'}>Other</option>
        </select><br/><br/>

        <label><input type='checkbox' name="reservationsNeeded" onChange={handleCheckbox}/>
          Reservations Needed</label><br/><br/>
           
        <label><input type='checkbox' name="isParkingAvailable" onChange={handleCheckbox}/>Is Parking Available</label><br/><br/>

        <label><input type='checkbox' name="isSpaAvailable" onChange={handleCheckbox}/>Is Spa Available:</label><br/><br/>

        <label><input type='checkbox' name="isWifiAvailable" onChange={handleCheckbox}/>Is Wifi Available</label><br/><br/>
        
        <label><input type='checkbox' name="isPoolAvailable" onChange={handleCheckbox}/>Is Pool Available:</label><br/><br/>
                
        <label><input type='checkbox' name="isRestaurantAvailable" onChange={handleCheckbox}/>Is Restaurant Available:</label><br/><br/>
        
        <label>Photos:</label><br/>
        <input type='text' name="photos" value={formData.photos} onChange={handleChange}/><br/><br/>

        <button type="submit">submit</button>
      </form>
      <h2>All Hotel Title List</h2>
      <AllHotels/>
    </div>
  );
}

export default App;
