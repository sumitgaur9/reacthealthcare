import React, { useState, useEffect } from 'react'
import { LoaderService } from './loader.service'
import LoaderImg from '../../src/images/loader.gif';
import stylesLoader from "./Loader.module.css";

const LoaderComponent = () => {

    
    const [show, setShow] = useState(false);

    useEffect(() => {
        let subscription = LoaderService.loaderState().subscribe(data => {
            if (data) {
                console.log(data)
                // alert(data.show)
                setShow(data.show)                
                
            } else {
                // alert("no data")
            }
        });
    }, []);

    return (
        <>
            {show && <div className={stylesLoader["loaderSection"]}>
                {/* <img src={LoaderImg} style={{width: '150px'}} alt="loader" /> */}
                <img style={{width: '150px'}} src="https://i.pinimg.com/originals/c4/3b/2d/c43b2d56b4ec611ac450e6782f7143b7.gif" alt="loader" />
            </div>
            }
        </>
    )
}

export default LoaderComponent
