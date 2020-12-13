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
    Get_LabTestsPackageList
} from "../constants/constants";


export default {
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
//   updateLoadStatus: (userId, bidId, status) => {
//     return PUT(`${Commaon_Path}/${API_VERSION_V1}/bidStatus`, {
//       bidId,
//       status,
//     });
//   },
};
