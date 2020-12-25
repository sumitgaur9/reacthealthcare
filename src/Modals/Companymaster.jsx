import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './Companymaster.module.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const Companymaster = (props) => {


  const [companyName, setCompanyName] = useState('');

  const animatedComponents = makeAnimated();


  const [companiesArrayData, setCompaniesArrayData] = useState([]);

  useEffect(() => {
    const Get_CompanyList = async (load) => {
      let loadResponse = await Api.Get_CompanyList(load);
      if (loadResponse.status) {

        let dataArray = loadResponse.data.map(x => {
          return {
            id: x._id,
            value: x.companyName,
            label: x.companyName
          };
        });
        console.log(dataobj)
        setCompaniesArrayData(dataArray);
      } else {
        setCompaniesArrayData([]);
      }
    };

    let dataobj = {};
    Get_CompanyList(dataobj);

  }, []);

  const Save_Company = async () => {
    var dataobj = new Object();
    dataobj.companyName = companyName;
    let loadResponse = await Api.Save_Company(dataobj);
    if (loadResponse.status) {
      props.closeVerifyOTPPopup();
    } else {
      // setCompaniesArrayData([]);
    }
  };

  return (
    <>
      <form>

        <Modal
          show={props.showVerifyOTPPopup}
          onHide={props.closeVerifyOTPPopup}
          backdrop="false"
          keyboard={false}
        >

          <Modal.Body>
            <div className="modal-header" style={{ height: '10px' }}>
              <button type="button" className="close" onClick={props.closeVerifyOTPPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
            </div>


            <div className="popupContainer">
              <div className="containerBlock">
                <div className="formSection">
                  <div className="container">
                    <h2 className="text-center"></h2>
                    <div className="row justify-content-center">
                      <div className="col-8">

                        <div className="card" style={{ border: 'transparent!important' }}>
                          <div className="card-header p-0">
                            <div className="bg-info text-white text-center py-2">
                              <h3><i className="fa fa-medkit"></i>Company Master</h3>
                            </div>
                          </div>
                          <div className="card-body p-3">
                            <label for="exampleFormControlSelect1">Name</label>
                            <div className="ng-autocomplete" style={{ width: '368px' }}>
                              <Autocomplete
                                id="combo-box-demo"
                                options={companiesArrayData}
                                getOptionLabel={(option) => option.label}
                                style={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} onChange={(e) => { setCompanyName(e.target.value); }} label="Combo box" variant="outlined" />}
                              />
                              {/* <Select options={companiesArrayData} value={companyName} className="basic-single"
                                onInputChange={(val) => { }}
                                onChange={(selectedOption) => { }} /> */}

                              {/* <Select options={options} isMulti components={animatedComponents} className="basic-multi-select" classNamePrefix="select" onChange={(selectedOption) => {
                                  if (selectedOption.value) {
                                    alert(selectedOption.id)
                                  }
                                }} /> */}


                            </div>



                          </div>

                        </div>



                      </div>




                    </div>
                  </div>

                </div>

              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>
            <div className="buttonSection">
              <div className="text-center">
                <input type="submit" onClick={Save_Company} style={{ width: '200px', fontWeight: '600' }} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </>

  )

}


