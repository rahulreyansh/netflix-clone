import React, { useEffect, useState } from "react";
import './Nav.css'

function Nav() {
   const [handleShow, setHandleShow] = useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setHandleShow(true);
            }else{
                setHandleShow(false)
            }
        },);
        return ()=>{
            // window.removeEventListener("scroll",null);
        };
    },[]);
  return (
    <div className={`nav ${handleShow && 'nav__black'}`}>
      <img
        className='nav__logo'
        src="https://pngimg.com/uploads/netflix/netflix_PNG25.png"
        alt="Netflix_Logo"
      />
      <img
        className='nav__avatar'
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="avatar_Logo"
      />
    </div>
  );
}

export default Nav;
