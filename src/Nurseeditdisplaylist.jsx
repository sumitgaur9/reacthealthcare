import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Nurseeditdisplaylist.module.css";

const Nurseeditdisplaylist = () => {

    const [doctorListData, setDoctorListData] = useState([]);

    useEffect(() => {
        const getDoctorsList = async (load) => {
            let loadResponse = await Api.getNursesList(load);
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
        <div className="container mt-2" style={{ position:'absolute',top:'17%',left:'7%'}}>
        <div style={{ marginBottom:'1%'}}>
        </div>
                    <div className="row">
                            
                    {
                        doctorListData.map((data, ind) => {
                            console.log(data)
                            return (

                                <div className={`col-md-3 col-sm-6 ${stylesNur.item}`}>

                                    <div className={[stylesNur['card'], stylesNur['item-card']].join(' ')} style={{ padding: '2% 2%' }}>
                                        <img src={arrayBufferToBase64local(data.newimage?.data?.data) || 'https://w7.pngwing.com/pngs/243/481/png-transparent-history-of-nursing-health-care-medicine-national-council-licensure-examination-nurse-blue-logo-medicine.png'} alt="Photo of sunset" />
                                        <h5 className={`mt-3 mb-3 ${stylesNur['item-card-title']}`} style={{ fontWeight: '800' }}>{data.name}</h5>
                                        
                                        <p className="card-text">{data.description}</p>

                                        <div style={{float:'left',width:'100%'}}>
                                            <div style={{float:'left',width:'96%'}} class="card-title1">
                                                <i class="fa fa-pencil" ></i>
                                            </div>
                                            <div style={{float:'left',width:'4%'}} class="card-title1">
                                            <i class="fa fa-trash" aria-hidden="true" style={{color:'red'}}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                            
                        
                    </div>
                </div>
            
        </>
    )
}

export default Nurseeditdisplaylist
