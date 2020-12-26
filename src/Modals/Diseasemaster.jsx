import React, { useState, useEffect } from 'react'
import Api from '../api/apiService'

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import styles from './Diseasemaster.module.css';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export const Diseasemaster = (props) => {


  const [diseaseName, setDiseaseName] = useState('');
  const [takeCareBy, setTakeCareBy] = useState('');

  const animatedComponents = makeAnimated();


  const [takeCareByDataArray, setTakeCareByDataArray] = useState([]);

  useEffect(() => {
    const Get_ExpertiseList = async (load) => {
      let loadResponse = await Api.Get_ExpertiseList(load);
      if (loadResponse.status) {
        console.log(loadResponse.data)
        setTakeCareByDataArray(loadResponse.data);
      } else {
        setTakeCareByDataArray([]);
      }
    };

    let dataobj = {};
    Get_ExpertiseList(dataobj);

  }, []);

  var diseaseDataArray =[
    {"name":"fever"},
    {"name":"cold"},
    {"name":"Diarrhea"},    
    {"name":"heart-attack"},
    {"name":"Migrane"},
    {"name":"Dipression"},
    {"name":"Diabetes"}
  ];

  const Save_Disease = async () => {
    var dataobj = new Object();
    dataobj.diseaseName = diseaseName;
    dataobj.takeCareBy = takeCareBy;
    let loadResponse = await Api.Save_Disease(dataobj);
    if (loadResponse.status) {
      props.closeDiseaseMasterPopup();
    } else {
      // setTakeCareByDataArray([]);
    }
  };

  return (
    <>
      <form>

        <Modal
          show={props.showDiseaseMasterPopup}
          onHide={props.closeDiseaseMasterPopup}
          backdrop="false"
          keyboard={false}
        >

          <Modal.Body>
            <div className="modal-header" style={{ height: '10px' }}>
              <button type="button" className="close" onClick={props.closeDiseaseMasterPopup}><span aria-hidden="true" className="closebtnspan">&times;</span></button>
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
                              <h3><i className="fa fa-medkit"></i>Diseases Master</h3>
                            </div>
                          </div>

                          <div class="form-group">
                            <label for="exampleFormControlSelect1">Take Care By(Expert In)</label>
                            <select class="form-control" formControlName="takeCareBy" onChange={(e) => { setTakeCareBy(e.target.value); }}>
                              <option value=""></option>
                              {
                                takeCareByDataArray.map((opt, ind) => {
                                  console.log(opt)
                                  return (
                                    <option value={opt.expertiseName}>{opt.expertiseName}</option>
                                  )
                                })
                              }
                            </select>
                          </div>


                          <div class="form-group">
                            <label for="exampleFormControlSelect1">Disease Name</label>
                            <select class="form-control" formControlName="diseaseName" onChange={(e) => { setDiseaseName(e.target.value); }}>
                              <option value=""></option>
                              {
                                diseaseDataArray.map((opt, ind) => {
                                  console.log(opt)
                                  return (
                                    <option value={opt.name}>{opt.name}</option>
                                  )
                                })
                              }
                            </select>
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
                <input type="submit" onClick={Save_Disease} style={{ width: '200px', fontWeight: '600' }} value="✔️ &nbsp;&nbsp;Save" className="btn btn-info btn-block rounded-0 py-2" />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      </form>
    </>

  )

}


