import React, { useState, useEffect } from 'react'
import Api from '../src/api/apiService'

import { NavLink } from 'react-router-dom';
import styles from "./Navbar.module.css";
import logo from '../src/images/logo.png';
import phoneIcon from '../src/images/phone-icon.png';
import { useHistory } from "react-router-dom";

const Navbar = () => {

    const [cartInfoData, setcartInfoData] = useState([]);
    
    const [nameFirstChar, setnameFirstChar] = useState('S');
    const [username, setusernames] = useState('Sumit');

    const history = useHistory();

    const redirectTo =  (path) => {
            history.push(path);
    }

    useEffect(() => {
        const userme = async (load) => {
          let loadResponse = await Api.userme(load);
          if (loadResponse.status) {
            console.log("usermeData...........",loadResponse.data)
          } else {
            // setTestPackageListData([]);
          }
        };
    
        let dataobj = {};
        userme(dataobj);
    
      }, []);

    return (
        <>
            <header>
                <div className={styles['header-top']}>
                    <div className="container">
                        <a className={styles['navbar-brand']}>
                        <img style={{ height: '40px',width: '200px'}} src={logo} alt="image" onClick={() => redirectTo("/doctorlist")} />
                        </a>
                        <div className={styles['right-header']}>
                            <div className={styles['header-info']} style={{ paddingRight: '110px'}}>
                                <div className={styles['info-inner']}>
                                    <span className={styles['icontop']}><img src={phoneIcon} style={{height:'auto'}} alt="#" /></span>
                                    <span className={styles['iconcont']}><a href="tel:971 634 2619">971 634 2619</a></span>
                                </div>
                                <div className={styles['info-inner']}>
                                    <span className={styles['icontop']}><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span className={styles['iconcont']}><a data-scroll href="mailto:knowledgerelated96@gmail.com">knowledgerelated96@gmail.com</a></span>
                                </div>
                                <div className={styles['info-inner']} style={{ paddingRight: '60px',cursor: 'pointer'}}>
                                    <i className="fa fa-cart-plus" style={{ fontSize: '29px',color: '#147fdaba'}}></i>
                                    <span className="badge badge-light" style={{ fontSize: '10px',color: 'white',borderRadius: '10px',backgroundColor: 'red',position: 'absolute',top: '7%'}}>
                                        {cartInfoData.length}</span>

                                </div>

                                <div className="dropdown show" style={{ position: 'absolute',right: '0px',top: '20px'}}>


                                    <a href="javascript:void(0);" className="dropdown-toggle" data-toggle="dropdown" style={{ backgroundColor:'white',color:'black',border:'transparent',float: 'right',marginRight: '16px'}}>

                                        <div style={{ width:'100%',float:'left'}}></div>
                                        <div style={{ width:'30%',float:'left',marginTop: '-6px',marginRight: '10px'}}>
                                            <span className={styles['namefirstchar']}>{nameFirstChar}</span>

                                        </div>
                                        <div style={{ width:'60%',float:'left'}}>
                                            <label style={{ cursor: 'pointer',textTransform: 'capitalize'}}>{username}</label>

                                        </div>
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <a className="dropdown-item"><i className="fa fa-sign-out" aria-hidden="true"></i><span style={{ marginLeft:'6px',cursor: 'pointer'}}>Profile</span></a>
                                        <a className="dropdown-item"><i className="fa fa-key" aria-hidden="true"></i><span style={{ marginLeft:'6px',cursor: 'pointer'}}>Change Password</span></a>
                                        <a className="dropdown-item"><i className="fa fa-sign-out" aria-hidden="true"></i><span style={{ marginLeft:'6px',cursor: 'pointer'}}>LogOut</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['header-bottom']} style={{ visibility: 'visible', animationName: 'fadeIn',height:'35px'}}>
                    <div className="container">
                        <nav className={styles['main-menu']}>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className={[styles['nav'], styles['navbar-nav']].join(' ')} style={{ display: 'flex' }}>

                                    <li><a onClick={() => redirectTo("/doctorlist")}>Home</a></li>
                                    <li><a onClick={() => redirectTo('/doctorlist')}>Doctor</a></li>
                                    <li><a onClick={() => redirectTo('/patientlist')}>Patient</a></li>
                                    <li><a onClick={() => redirectTo('/pharmacistlist')}>Pharmacist</a></li>
                                    <li><a onClick={() => redirectTo('/nurselist')}>Nurse</a></li>
                                    <li><a onClick={() => redirectTo('/physiolist')}>Physiotherapist</a></li>
                                    <li><a onClick={() => redirectTo('/otherlinks')}>Features</a></li>

                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Navbar
