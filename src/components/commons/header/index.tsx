import React, { useContext, useEffect, useState } from "react";
import { Drawer } from 'antd';

const Header = ( title: string ) => {

  const [fixedHeader, setFixedHeader] = useState(title === 'Merchant Area' ? 'bg-dark' : '');
  const [authVisible, setAuthVisible] = useState(false);

  const listenScrollEvent = () => {

    if (title === 'Home') {
      if (window.scrollY > 50) {
        setFixedHeader('fixed-top bg-background');
      } else {
        setFixedHeader('fixed-top');
      }
    } else {
      setFixedHeader('sticky-top bg-background')
    }

  }

  const hideCanvas = () => setAuthVisible(false)

  useEffect(() => {

    listenScrollEvent();
    window.addEventListener('scroll', listenScrollEvent)

  }, []);

  return (
    <>
      <nav className={"navbar fixed-top d-lg-none navbar-dark bg-background"}>
        <div className="container-fluid">
          
        </div>
      </nav>

      <header className={"d-none header_gradient d-lg-block ontop " + fixedHeader}>
        <div className="container ">
          <header className="d-flex justify-content-between align-items-center py-3">


            <nav className="nav navigation d-flex justify-content-between">


                <a className={`p-2 text-white`}>Our Homes</a>

                <a className={`p-2 text-white`}>Download App</a>

                <a onClick={() => setAuthVisible(true)} className={`p-2 text-white`}>Sign In</a>

                <a className={`p-2 active text-white`}><i className="fa fa-map-marker-alt"></i> Lekki Phase 1</a>

            </nav>


          </header>


        </div>


      </header>


      <Drawer
        title=" " className="authPanel"
        onClose={() => setAuthVisible(false)}
        visible={authVisible} zIndex={99999999}
      >
      </Drawer>
    </>
  )

}