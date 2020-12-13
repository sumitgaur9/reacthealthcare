import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesPackage from "./Labtestpackagelist.module.css";

const Labtestpackagelist = () => {

    const [doctorListData, setDoctorListData] = useState([]);
    const [labTestBasketData, setLabTestBasketData] = useState([]);
    
    const [labTestBasketTotalPriceCount, setlabTestBasketTotalPriceCount] = useState(0);

    
    useEffect(() => {
        const getDoctorsList = async (load) => {
            let loadResponse = await Api.getLabTestsPackageList(load);
            if (loadResponse.status) {
                setDoctorListData(loadResponse.data);
            }
        };

        let dataobj = {};
        getDoctorsList(dataobj);


    }, []);

    // arrayBufferToBase64local((buffer) => {
    //     alert(buffer)
    //     //val.newimage.data.data
    //     //
    //   })

    function arrayBufferToBase64local(buffer) {
        return arrayBufferToBase64(buffer)
    }


    return (
        <>
            <div className="mt-2" style={{ width: '65%', position: 'absolute', top: '17%', left: '6%' }}>
                <div style={{ marginBottom: '1%' }}>
                    <a className="btn btn-primary" style={{ height: '30px', fontSize: '14px' }}><i className="fa fa-plus" style={{ color: 'white', fontSize: '15px', paddingRight: '5px' }}></i> Lab Test</a>
                </div>

                <div className="row">


                    {
                        doctorListData.map((data, ind) => {
                            console.log(data)
                            return (
                                <div className='gaadiex-list'>
                                    <div className={[stylesPackage['gaadiex-list-item'], stylesPackage['border-b1']].join(' ')}
                                        style={{ paddingLeft: '15px', marginBottom: '5px', height: '300px', border: '3px solid rgba(57, 180, 155, 0.08)' }}>
                                        <div className="row" style={{ width: '100%', float: 'left' }}>
                                            <div style={{ width: '28%', float: 'left' }}>

                                                <img className={stylesPackage['gaadiex-list-item-img']} style={{"height":"287px","width":"100%","padding":"5%","borderRadius":"10%"}}
                                                    src={arrayBufferToBase64local(data.newimage?.data?.data) || 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRQqBPK5FnorNl-QxakUC6VNnKSm2MnAH7SYg&usqp=CAU'} alt="Photo of sunset" />
                                                <div className={stylesPackage['health-report-offer']}>
                                                    <span>50% OFF</span>
                                                </div>
                                            </div>

                                            <div style={{ width: '1%', float: 'left' }}>
                                            </div>
                                            <div style={{ width: '70%', float: 'left' }}>
                                                <div className="gaadiex-list-item-text">

                                                    <div style={{ width: '100%', float: 'left' }}>
                                                        <div style={{ width: '40%', float: 'left' }}>
                                                            <h5 className={`mt-3 mb-3 ${stylesPackage['item-card-title']}`} style={{ fontWeight: '700', fontSize: '18px' }}> {data.packageNname}
                                                            </h5>
                                                        </div>
                                                        <div style={{ width: '23%', float: 'right', paddingTop: '12px' }}>
                                                            <h6 className="rupeesymbol" style={{ textDecorationLine: 'line-through', paddingRight: '10%' }}>&#8377;
                                                            <span style={{ fontSize: '18px', color: 'slategray' }}> {(data.packageAmount * 2).toLocaleString('en-IN')}</span></h6>

                                                            <h6 className="rupeesymbol">&#8377;
                                                            <span style={{ fontWeight: 'bold', fontSize: '18px' }}> {data.packageAmount.toLocaleString('en-IN')}</span></h6>
                                                        </div>
                                                        <div style={{ width: '10%', float: 'left', paddingTop: '12px' }}>
                                                            <div style={{ float: 'left', width: '30%' }} className="card-title1">
                                                                <i className="fa fa-pencil" style={{ fontSize: '20px' }} aria-hidden="true"></i>
                                                            </div>
                                                            <div style={{ float: 'right', width: '4%' }} className="card-title1">
                                                                <i className="fa fa-trash" aria-hidden="true" style={{ color: 'red', fontSize: '20px' }}></i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className={stylesPackage['card-text']} style={{ width: '95%', float: 'left', fontWeight: '300', fontSize: '14px', color: '#5d5d5d', marginTop: '8px' }}>{data.description}

                                                    </p>



                                                    <div style={{ float: 'left', width: '100%', padding: '0 0 8px 0' }}>
                                                        <div style={{ float: 'left', width: '51%' }}>
                                                            <div className="d-flex">
                                                                <img src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/test-include.svg"
                                                                    style={{ height: '68px', width: '68px', "padding":"0 5% 5% 5%","borderRadius":"10%" }} alt="test" />
                                                                <div className="test-included-info" style={{ paddingTop: '5px' }}>
                                                                    <h6 style={{ fontSize: '13px' }}>
                                                                        Test Included
                                                                    </h6>
                                                                    <h4 style={{ fontSize: '15px', fontWeight: '600' }}>
                                                                        {data?.testsData.length} Parameters
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div style={{ float: 'left', width: '30%' }}>
                                                            <div className="d-flex">
                                                                <img src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/megnifier.svg"
                                                                    style={{ height: '68px', width: '68px', "padding":"0 5% 5% 5%","borderRadius":"10%" }} alt="test" />
                                                                <div className="test-included-info" style={{ paddingTop: '5px' }}>
                                                                    <h6 style={{ fontSize: '13px' }}>
                                                                        Report Availability
                                                                    </h6>
                                                                    <h4 style={{ fontSize: '15px', fontWeight: '600' }}>
                                                                        Next Day
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                    <div className="report-button" style={{ float: 'left', width: '100%', padding: '0 0 8px 0' }}>
                                                        <div className="form_data" style={{ float: 'left', width: '30%' }}>
                                                            <button className={stylesPackage['btn-blue']}>Book Now</button>
                                                        </div>
                                                        <div className="form_data" style={{ width: '80%', color: 'green' }}>
                                                            <button type="button" className={[stylesPackage['btn-blue-outline'], stylesPackage['add-to-basket-btn']].join(' ')}>{data.isAddedInCart ? "Go To Basket" : "Add to Basket"}</button>
                                                        </div>
                                                    </div>
                                                    <div className={`row ${stylesPackage['fetuter-report']}`} style={{ width: '100%' }}>
                                                        <div className="col-md-3 col-6 pr-sm-0 mb-3 mb-sm-0">
                                                            <div className="d-flex">
                                                                <img style={{ width: '40px', height: '40px',"padding":"5%","borderRadius":"10%" }} src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/home.svg" alt="home" />
                                                                <div>
                                                                    Blood Collection at Home
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3  col-6 pr-sm-0  mb-3 mb-sm-0">
                                                            <div className="d-flex">
                                                                <img style={{ width: '40px', height: '40px',"padding":"5%","borderRadius":"10%" }} src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/repport.svg" alt="home" />
                                                                <div>
                                                                    Smart Report with Trend Analysis
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3  col-6 pr-sm-0  mb-3 mb-sm-0">
                                                            <div className="d-flex">
                                                                <img style={{ width: '40px', height: '40px',"padding":"5%","borderRadius":"10%" }} src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/eight-stage.svg" alt="home" />
                                                                <div>
                                                                    8-stage MET Protocol
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-3  col-6 pr-sm-0  mb-3 mb-sm-0">
                                                            <div className="d-flex">
                                                                <img style={{ width: '40px', height: '40px',"padding":"5%","borderRadius":"10%" }} src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/certified.svg" alt="home" />
                                                                <div>
                                                                    Certified CAP &amp; NABL Labs
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                            )
                        })
                    }

                </div>
            </div>


            <div className="mt-2" style={{ width: '22%', position: 'absolute', top: '14%', right: '6%' }}>
                <div className="col-lg-12 d-none d-sm-block">
                    <div className={stylesPackage['basket-side-bar']}>
                        <div className={`row ${stylesPackage['basket-row']}`}>
                            <div className="col-7 pr-0 d-flex align-items-center">
                                <img src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/basket-black.svg" alt="img"
                                    style={{ width: '30px', height: '30px',"padding":"5%","borderRadius":"10%" }} className="img-fluid" />
                                <h5 style={{ paddingTop: '5px', fontSize: '15px', fontWeight: '600', color: '#212121' }}>Basket</h5>
                            </div>
                            <div className="col-5 d-flex pl-0  justify-content-end" style={{paddingTop: '5px'}}>
                                <span>({labTestBasketData.length} items)</span>
                                <img src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/down-arrow-sidebar.svg"
                                    style={{width: '20px', height: '20px',"padding":"5%","borderRadius":"10%"}} className="img-fluid" />

                            </div>
                        </div>

                        {
                            labTestBasketData.map((data, ind) => {
                                console.log(data)
                                return (
                                    <div className="row side-bar-items">
                                        <div className="col-8">
                                            <p>
                                                {data.itemName}
                                            </p>
                                        </div>
                                        <div className="col-4 text-right">
                                            <p> <span className="rupee">₹</span>  {data.price.toLocaleString('en-IN')}</p>
                                        </div>

                                    </div>

                                )
                            })
                        }


                        <div className={`row ${stylesPackage['side-bar-total']}`}>
                            <div className="col-8" style={{ padding: '0' }}>
                                <p>
                                    Total Amount
                                </p>
                            </div>
                            <div className="col-4 text-right" style={{ padding: '0' }}>
                                <p>
                                    <span className="rupee">₹</span>{labTestBasketTotalPriceCount.toLocaleString('en-IN')}
                                </p>
                            </div>
                        </div>
                        <div>
                            <button className={stylesPackage['checkout-btn-blue']} style={{ width: '100%', height: '42px' }}>Checkout &nbsp;<img
                                src="https://prod-metropolisindia-bucket.s3.ap-south-1.amazonaws.com/images/btn-right-arrow.svg" alt="img"
                                style={{ height: '22px', width: '22px', display: 'inherit', padding: '2%' }} className="img-fluid" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Labtestpackagelist
