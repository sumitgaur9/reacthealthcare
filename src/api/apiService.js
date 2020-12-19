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
    Get_ExpertiseList,
    Update_DoctorProfile,
    Update_PatientProfile,
    Update_PhysioProfile,
    Update_NurseProfile,
    Update_PharmacistProfile
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
  Get_ExpertiseList: (load) => {
    return GET(`${Commaon_Path}${API_VERSION_V1}${Get_ExpertiseList}`);
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
  
  

  
  login: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${login}`, load);
  }, 
  GenerateOTP: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${GenerateOTP}`, load);
  },

  ForgotPassword: async (load) => {
    return POST(`${Commaon_Path}${API_VERSION_V1}${Forgot_Password}`, load);
  }, 
//   updateLoadStatus: (userId, bidId, status) => {
//     return PUT(`${Commaon_Path}/${API_VERSION_V1}/bidStatus`, {
//       bidId,
//       status,
//     });
//   },
};
