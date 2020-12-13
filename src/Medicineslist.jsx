import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Medicineslist.module.css";

const Medicineslist = () => {

    const [doctorListData, setDoctorListData] = useState([]);

    useEffect(() => {
        const getDoctorsList = async (load) => {
            let loadResponse = await Api.getMedicinesList(load);
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
            <div style={{ position:'absolute', top:'17%',left: '3%',width: '93%',right: '3%;'}}>
                <div style={{width:'100%',float:'left',height:'50px',marginBottom: '1%'}}>
                    <div style={{width: '23%',float: 'left',marginTop: '6px',marginLeft: '4%;'}}>
                    <a className="btn btn-primary" style={{fontSize: '14px',height: '35px'}}><i class="fa fa-plus" style={{color: 'white', fontSize: '18px',paddingRight: '5px'}}></i> Medicine</a>

                    </div>

                     <div style={{width: '15%',float: 'left', marginTop: '1%',marginLeft: '4%'}}>
                            <select className="form-control" style={{height: '29px',fontSize: '12px'}}>

                            <option value="Select Company Name" selected>Search by Company</option>
                            {/* <option *ngFor="let opt of companyArrayData" [value]="opt.companyName">
                                {{opt.companyName}}</option> */}
                            </select>
                        </div> 


    </div> 

                <div className="row">
                    <table className="table table-hover my-0" style={{ textAlign: 'center'}}>
                    <thead style={{ backgroundColor: '#39b49b'}}>
          <tr>
            <th style={{ width: '5%;'}}>S.No</th>
            <th style={{ width: '13%'}}>Image</th>
            <th style={{ width: '13%'}}>Medicine Name</th>
            <th style={{ width: '13%'}} className="d-none d-xl-table-cell">Company</th>
            <th style={{ width: '13%'}} className="d-none d-xl-table-cell">Price</th>
            <th style={{width: '5%'}} className="d-none d-xl-table-cell">Edit</th>
            <th style={{width: '5%'}} className="d-none d-xl-table-cell">Delete</th>
            <th style={{width: '11%'}} className="d-none d-xl-table-cell">ADD TO CART</th>

            <th className="d-none d-xl-table-cell">Description</th>
          </tr>
        </thead>
        <tbody>
                    {
                        doctorListData.map((data, ind) => {
                            console.log(data)
                            return (

                                <tr className='gaadiex-list'>
                                    <td style={{verticalAlign: 'middle'}}>{ind + 1}.</td>
                                    <td>
                                        <img src={arrayBufferToBase64local(data.newimage?.data?.data) || 'https://images.moneycontrol.com/static-mcnews/2019/05/Pharma_medicines_health_drugs2-770x433.jpg'} style={{ height: '90px', width: '70%'}} alt="Photo of sunset" />
                                    </td>
                                    <td style={{ fontWeight: '600', verticalAlign: 'middle' }}>{data.medicineName}</td>
                                    <td className="d-none d-xl-table-cell" style={{ verticalAlign: 'middle' }}>{data.companyName}</td>
                                    <td className="d-none d-md-table-cell" style={{ fontWeight: '600', verticalAlign: 'middle' }}>&#8377; {data.price}</td>
                                    <td className="d-none d-xl-table-cell" style={{ verticalAlign: 'middle' }}><i className="fa fa-pencil" aria-hidden="true" style={{ cursor: 'pointer' }}></i></td>
                                    <td className="d-none d-xl-table-cell" style={{ verticalAlign: 'middle' }}><i className="fa fa-trash" aria-hidden="true" style={{ cursor: 'pointer', color: 'red' }} ></i></td>

                                    <td className="d-none d-xl-table-cell" style={{verticalAlign: 'middle'}}><i className="fa fa-cart-plus" aria-hidden="true" style={{ color: 'green', cursor: 'pointer', fontSize: '50px' }}></i></td>

                                    <td className="d-none d-xl-table-cell">{data.description.length > 180 ? data.description.substring(0, 180) + '...' : data.description}</td>

                                </tr>

                            )
                        })
                    }
        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}

export default Medicineslist
