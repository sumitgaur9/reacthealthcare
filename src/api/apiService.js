import { GET, POST, PUT } from "./helper";
import { 
    Commaon_Path,
    API_VERSION_V1,
    login,
    Get_DoctorsList,
    Get_PatientsList,
    Get_NursesList,
    Get_PhysiosList,
    Get_PharmacistsList,
    Get_LabTechniciansList,
    Get_PaymentLists,
    Get_MedicinesList,
    Get_LabTestsList,
    Get_LabTestsPackageList,
    GenerateOTP,
    Forgot_Password,
    Get_DoctorProfile,
    Get_PatientProfile,
    Get_PharmacistProfile,
    Get_NurseProfile,
    Get_PhysioProfile,
    Get_LabTechnicianProfile,
    Get_ExpertiseList,
    Update_DoctorProfile,
    Update_PatientProfile,
    Update_PhysioProfile,
    Update_NurseProfile,
    Update_PharmacistProfile,
    Update_LabTechnicianProfile,
    Get_PharmaReqForHomeDel,
    Get_LabTestsBookings,
    registration,
    GenerateOTPToPhone,
    Get_CompanyList,
    Save_Company,
    Save_Expertise,
    Save_Disease,
    Get_WebsiteTextDataByLocationEnum,
    SaveUpdate_WebsiteTextData,
    Get_WebsiteImageByLocationEnum,
    SaveUpdate_UploadWebsiteImages,
    Get_IndividualToPackageLabTestCount,
    Get_CommonDashboardCount,
    Get_LabTestWiseTestCount,
    Get_DoctorWiseApptCount,
    Get_AppointmentsByPatientID,
    Get_DiseaseWiseApptCount,
    Get_PharmacistWiseApptCount,
    Get_MonthlyHomeOnlineApptCount,
    Get_PatientMedicinesHomeDelivery,
    Get_AppointmentsByDocID,
    Get_UploadPrescriptionForMedicineApprovalsList,
    Save_ApproveMedicineReqUsingPrescription,
    Get_DiseasesList,
} from "../constants/constants";


export default {
  getDoctorProfile: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DoctorProfile}/${rolebasedid}`);
  },
  getPatientProfile: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PatientProfile}/${rolebasedid}`);
  },
  getPharmacistProfile: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PharmacistProfile}/${rolebasedid}`);
  },
  getNurseProfile: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_NurseProfile}/${rolebasedid}`);
  },
  getPhysioProfile: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PhysioProfile}/${rolebasedid}`);
  },  
  getLabtechnicianProfile: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_LabTechnicianProfile}/${rolebasedid}`);
  },  
  Get_ExpertiseList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_ExpertiseList}`);
  },
  
  Get_CompanyList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_CompanyList}`);
  },
  Get_WebsiteTextDataByLocationEnum: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_WebsiteTextDataByLocationEnum}/${rolebasedid}`);
  }, 
  Get_WebsiteImageByLocationEnum: (load,rolebasedid) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_WebsiteImageByLocationEnum}/${rolebasedid}`);
  },   
  
  

  

  Save_Company: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Save_Company}`,load);
  },
  Save_Expertise: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Save_Expertise}`,load);
  },  
  SaveUpdate_WebsiteTextData: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${SaveUpdate_WebsiteTextData}`,load);
  },
  SaveUpdate_UploadWebsiteImages: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${SaveUpdate_UploadWebsiteImages}`,load);
  },
  
  

  Update_DoctorProfile: (load,id) => {
    return PUT(`${Commaon_Path}${API_VERSION_V1}${Update_DoctorProfile}/${id}`,load);
  },
  Update_PatientProfile: (load, id, ) => {
    return PUT(`${Commaon_Path}${API_VERSION_V1}${Update_PatientProfile}/${id}`,load);
  },
  Update_PharmacistProfile: (load, id, ) => {
    return PUT(`${Commaon_Path}${API_VERSION_V1}${Update_PharmacistProfile}/${id}`,load);
  },
  Update_NurseProfile: (load, id, ) => {
    return PUT(`${Commaon_Path}${API_VERSION_V1}${Update_NurseProfile}/${id}`,load);
  },
  Update_PhysioProfile: (load, id, ) => {
    return PUT(`${Commaon_Path}${API_VERSION_V1}${Update_PhysioProfile}/${id}`,load);
  },
  Update_LabTechnicianProfile: (load, id, ) => {
    return PUT(`${Commaon_Path}${API_VERSION_V1}${Update_LabTechnicianProfile}/${id}`,load);
  },

  
  getDoctorsList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DoctorsList}`);
  },
  getPatientsList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PatientsList}`);
  },
  getNursesList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_NursesList}`);
  },
  getPhysiosList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PhysiosList}`);
  },
  getPharmacistsList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PharmacistsList}`);
  },
  getLabTechniciansList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_LabTechniciansList}`);
  },
  Get_DiseasesList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DiseasesList}`);
  },  
  getPaymentsList: (load,paymentTypeEnumKey) => {
    if(paymentTypeEnumKey!=null){
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PaymentLists}/${paymentTypeEnumKey}`);
    } else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PaymentLists}`);
    }
  },

  getPharmacyReqForHomeDel: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Get_PharmaReqForHomeDel}`,load);
  },
  getLabTestsBooking: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Get_LabTestsBookings}`,load);
  },
  
  
  
  getMedicinesList: (load, companyName) => {
    if (companyName) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_MedicinesList}/${companyName}`);
    }
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_MedicinesList}`);
  },

  getLabTestsList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_LabTestsList}`);
  },
  getLabTestsPackageList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_LabTestsPackageList}`);
  },
  Get_UploadPrescriptionForMedicineApprovalsList: (load, patientID) => {
    if (patientID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_UploadPrescriptionForMedicineApprovalsList}/${patientID}`);
    }
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_UploadPrescriptionForMedicineApprovalsList}`);
  },


   //dashboard

  
   Get_IndividualToPackageLabTestCount: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_IndividualToPackageLabTestCount}`);
  },
  Get_CommonDashboardCount: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_CommonDashboardCount}`);
  },

  Get_LabTestWiseTestCount: (load,patientID) => {
    let APIURL;
    if (patientID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_LabTestWiseTestCount}/${patientID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_LabTestWiseTestCount}`);

    }
  },
  Get_DoctorWiseApptCount: (load,patientID) => {
    let APIURL;
    if (patientID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DoctorWiseApptCount}/${patientID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DoctorWiseApptCount}`);
    }
  },

  Get_AppointmentsByPatientID: (load,patientID) => {
    let APIURL;
    if (patientID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_AppointmentsByPatientID}/${patientID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_AppointmentsByPatientID}`);
    }
  },


  Get_DiseaseWiseApptCount: (load,doctorID) => {
    let APIURL;
    if (doctorID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DiseaseWiseApptCount}/${doctorID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DiseaseWiseApptCount}`);
    }
  },
  Get_PharmacistWiseApptCount: (load,doctorID) => {
    let APIURL;
    if (doctorID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PharmacistWiseApptCount}/${doctorID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PharmacistWiseApptCount}`);
    }
  },
  Get_MonthlyHomeOnlineApptCount: (load,doctorID) => {
    let APIURL;
    if (doctorID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_MonthlyHomeOnlineApptCount}/${doctorID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_MonthlyHomeOnlineApptCount}`);
    }
  },
  Get_PatientMedicinesHomeDelivery: (load,doctorID) => {
    let APIURL;
    if (doctorID) {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PatientMedicinesHomeDelivery}/${doctorID}`);
    }
    else {
      return GET(`${Commaon_Path}${API_VERSION_V1}${Get_PatientMedicinesHomeDelivery}`);
    }
  },
  

  

  
  
  
  Get_LabTestsBookings: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Get_LabTestsBookings}`, load);
  }, 

  Get_DoctorsList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_DoctorsList}`);
  },
 
  Get_AppointmentsByDocID: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Get_AppointmentsByDocID}`, load);
  }, 


  
  

  
  login: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${login}`, load);
  }, 
  GenerateOTP: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${GenerateOTP}`, load);
  },

  ForgotPassword: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Forgot_Password}`, load);
  }, 

  registration: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${registration}`, load);
  },
  GenerateOTPToPhone: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${GenerateOTPToPhone}`, load);
  },
  Save_ApproveMedicineReqUsingPrescription: (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Save_ApproveMedicineReqUsingPrescription}`, load);
  },
//   updateLoadStatus: (userId, bidId, status) => {
//     return PUT(`${Commaon_Path}/${API_VERSION_V1}/bidStatus`, {
//       bidId,
//       status,
//     });
//   },
};
