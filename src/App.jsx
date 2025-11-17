import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import axios from "axios";

import Footer from "./components/Footer";
import SingleProduct from "./pages/SingleProduct";

import CategoryProduct from "./pages/CategoryProduct";
import ProtectedRoute from "./components/ProtectedRoute";
import { useCart } from "./context/CartContext";

function App() {
  const [location, setLocation] = useState(null);
    const [openDropDown , setOpenDropdown] = useState(false)
   const {cartItem,setCartItem} = useCart()

  const getLocation = async () => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        //console.log("Latitude:", latitude);
        //console.log("Longitude:", longitude);

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

        try {
          const res = await axios.get(url);
          const exactLocation = res.data.address;
         // console.log("Exact location:", exactLocation);
          setLocation(exactLocation);
          setOpenDropdown(false)
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

 useEffect(() => {
  getLocation();
 }, []); 

 useEffect(()=>{
    const storedCart = localStorage.getItem('cartItem')
    if(storedCart){
      setCartItem(JSON.parse(storedCart))
    }
 },[])

 useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))
  }, [cartItem])
  return (
    <BrowserRouter>
         
          
      <NavBar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropdown={setOpenDropdown}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path= "/products/:id" element= {<SingleProduct />} />
        <Route path="/category/:category" element={<CategoryProduct />}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
          <Route path='/cart' element={<ProtectedRoute>
          <Cart location={location} getLocation={getLocation} />
        </ProtectedRoute>}></Route>
      </Routes>
      <Footer />
      
    
    </BrowserRouter>
  );
}

export default App;
