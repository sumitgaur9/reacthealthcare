import React, { useState, useEffect } from 'react'
import Api from './api/apiService'
import { arrayBufferToBase64 } from './utils/utils'
import stylesNur from "./Otherlinks.module.css";
import { useHistory } from "react-router-dom";
import { Companymaster } from './Modals/Companymaster'
import { Expertisemaster } from './Modals/Expertisemaster'
import { Diseasemaster } from './Modals/Diseasemaster'
import { WebsiteTextData } from './Modals/WebsiteTextData'
import { ImageUpload } from './Modals/ImageUpload'

const Otherlinks = () => {

    const [doctorListData, setDoctorListData] = useState([]);

     //openVerifyOTPPopup
     const [showCompanyMasterPopup, setShowCompanyMasterPopup] = useState(false);
     const closeCompanyMasterPopup = () => setShowCompanyMasterPopup(false);

     function openCompanyMasterPopup(){
      setShowCompanyMasterPopup(true)
     }


     //
     const [showExpertiseMasterPopup, setShowExpertiseMasterPopup] = useState(false);
     const closeExpertiseMasterPopup = () => setShowExpertiseMasterPopup(false);

     function openExpertiseMasterPopup(){
      setShowExpertiseMasterPopup(true)
     }

    //
    const [showDiseaseMasterPopup, setShowDiseaseMasterPopup] = useState(false);
    const closeDiseaseMasterPopup = () => setShowDiseaseMasterPopup(false);

    function openDiseaseMasterPopup(){
      setShowDiseaseMasterPopup(true)
    }


    //
    const [showWebsiteTextDataPopup, setShowWebsiteTextDataPopup] = useState(false);
    const closeWebsiteTextDataPopup = () => setShowWebsiteTextDataPopup(false);

    function openWebsiteTextDataPopup(){
      setShowWebsiteTextDataPopup(true)
    }

     //
     const [showImageUploadPopup, setShowImageUploadPopup] = useState(false);
     const closeImageUploadPopup = () => setShowImageUploadPopup(false);
 
     function openImageUploadDataPopup(){
      setShowImageUploadPopup(true)
     }
 

    
     
     
     

    const history = useHistory();

    const redirectTo =  (path) => {
      history.push(path);
    }
    // useEffect(() => {
    //     const getDoctorsList = async (load) => {
    //         let loadResponse = await Api.getNursesList(load);
    //         if (loadResponse.status) {
    //             setDoctorListData(loadResponse.data);
    //         }
    //     };

    //     let dataobj = {};
    //     getDoctorsList(dataobj);


    // }, []);

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
       <div class="content" style={{position: 'absolute',top: '23%',width:'96%',left:'2%',right:'2%'}}>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 col-lg-4 col-xxl-3">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Other Services</h5>
          </div>
          <div class="card-body d-flex w-100">
            <div class="align-self-center chart chart-lg">
              <div style={{display: 'block'}}>
                <div class="text-center">
                  <button style={{width: '225px'}}
                    class={stylesNur.btn}><i class="fa fa-book" aria-hidden="true"></i><span
                      style={{marginLeft:'5px'}}>Book Appointment</span></button>
                </div>

                <div class="text-center" style={{marginTop: '5%'}}>
                  <button style={{width: '225px'}} 
                    class={stylesNur.btn}><i class="fa fa-book" aria-hidden="true"></i><span
                      style={{marginLeft:'5px'}}>BookLabTest</span></button>
                </div>

                <div class="text-center" style={{marginTop: '5%'}}>
                  <button style={{width: '225px'}} class={stylesNur.btn}
                    ><i class="fa fa-tachometer" aria-hidden="true"></i><span
                      style={{marginLeft:'5px'}} onClick={() => redirectTo("/pharmacistdashboard")} >Pharmacist Dashboard</span></button>
                </div>
                <div class="text-center" style={{marginTop: '5%'}}>
                  <button style={{width: '225px'}}
                    class={stylesNur.btn}><i class="fa fa-tachometer" aria-hidden="true"></i><span
                      style={{marginLeft:'5px'}} onClick={() => redirectTo("/patientdashboard")}>Patient Dashboard</span></button>
                </div>
                <div class="text-center" style={{marginTop: '5%'}}>
                  <button style={{width: "225px"}}
                    class={stylesNur.btn}><i class="fa fa-tachometer" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}} onClick={() => redirectTo("/doctordashboard")}>Doctor Dashboard</span></button>
                </div>
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}}
                    class={stylesNur.btn}><i class="fa fa-tachometer" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}} onClick={() => redirectTo("/admindashboard")}>Admin Dashboard</span></button>
                </div>

               
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}><i class="fa fa-tachometer"
                      aria-hidden="true"></i><span style={{marginLeft:"5px"}} onClick={() => redirectTo("/nursedashboard")} >Nurse Dashboard</span></button>
                </div>
               
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}
                    ><i class="fa fa-tachometer" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}} onClick={() => redirectTo("/labtechniciandashboard")}>LabTechDashboard</span></button>
                </div>
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}
                    ><i class="fa fa-list" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}} onClick={() => redirectTo("/labtechnician")}>LabTechList</span></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xxl-3 d-flex">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">File Uploader</h5>
          </div>
          <div class="card-body d-flex w-100">
            <div class="align-self-center chart chart-lg">
              <div style={{display: 'block'}}>
                <form enctype="multipart/form-data">
                  <div class="overlay"></div>
                  <div>
                    <div class="containerBlock">
                      <div class="formSection">
                        <div class="container">
                          <h2 class="text-center"></h2>
                          <div class="row justify-content-center">
                            <div class="col-8">
                              <div class="card" style={{border: 'transparent!important'}}>
                                <div class="card-body p-3">
                                  <div class="form-group">
                                    <div class="input-group mb-2">
                                      <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fa fa-user text-info"></i></div>
                                      </div>
                                      <input type="file" class="form-control" name="file" />

                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div class="buttonSection">
                    <div class="text-center">
                      <input type="submit" style={{width: "225px"}} value="✔️ &nbsp;&nbsp;Save"
                        class="btn btn-info btn-block rounded-0 py-2"/>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-4 col-xxl-3">
        <div class="card flex-fill w-100">
          <div class="card-header">
            <h5 class="card-title mb-0">Other Services</h5>
          </div>
          <div class="card-body d-flex w-100">
            <div class="align-self-center chart chart-lg">
              <div style={{display: 'block'}}>
                
                                
                
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}><i class="fa fa-list" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}} onClick={() => redirectTo("/labtestlist")}>GetLabTestList</span></button>
                </div>

                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}><i class="fa fa-list" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}} onClick={() => redirectTo("/labtestpackagelist")}>GetLabTestPackageList</span></button>
                </div>

                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}><i class="fa fa-list"
                      aria-hidden="true"></i><span style={{marginLeft:"5px"}} onClick={() => redirectTo("/medicineslist")} >Medicine List</span></button>
                </div>
                
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}><i class="fa fa-list"
                      aria-hidden="true"></i><span style={{marginLeft:"5px"}}  onClick={() => redirectTo("/paymentlist")}>All Payment List</span></button>
                </div>

                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn}  onClick={() => openImageUploadDataPopup()}><i class="fa fa-upload"
                      aria-hidden="true"></i><span style={{marginLeft:"5px"}}>Image Upload</span></button>
                </div>

                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn} onClick={() => openWebsiteTextDataPopup()}><i class="fa fa-text-width"
                      aria-hidden="true"></i><span style={{marginLeft:"5px"}}>Web Text</span></button>
                </div>

                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn} onClick={() => openDiseaseMasterPopup()}>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}}>Diseases Master</span></button>
                </div>
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn} onClick={() => openExpertiseMasterPopup()}>
                    <i class="fa fa-plus-circle" aria-hidden="true"></i><span
                      style={{marginLeft:"5px"}}>Experties Master</span></button>
                </div>
                <div class="text-center" style={{marginTop: "5%"}}>
                  <button style={{width: "225px"}} class={stylesNur.btn} onClick={() => openCompanyMasterPopup()}><i class="fa fa-plus-circle"
                      aria-hidden="true" ></i><span style={{marginLeft:"5px"}}>Company Master</span></button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
            
{showCompanyMasterPopup && <Companymaster showCompanyMasterPopup={showCompanyMasterPopup} closeCompanyMasterPopup={closeCompanyMasterPopup}/>}

{showExpertiseMasterPopup && <Expertisemaster showExpertiseMasterPopup={showExpertiseMasterPopup} closeExpertiseMasterPopup={closeExpertiseMasterPopup}/>}

{showDiseaseMasterPopup && <Diseasemaster showDiseaseMasterPopup={showDiseaseMasterPopup} closeDiseaseMasterPopup={closeDiseaseMasterPopup}/>}

{showWebsiteTextDataPopup && <WebsiteTextData showWebsiteTextDataPopup={showWebsiteTextDataPopup} closeWebsiteTextDataPopup={closeWebsiteTextDataPopup}/>}

{showImageUploadPopup && <ImageUpload showImageUploadPopup={showImageUploadPopup} closeImageUploadPopup={closeImageUploadPopup}/>}

        </>
    )
}

export default Otherlinks
