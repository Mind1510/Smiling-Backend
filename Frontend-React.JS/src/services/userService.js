import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`, { id: inputId });
};

const createNewUserService = (data) => {
  console.log("Check", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getALLDoctors = () => {
  return axios.get(`/api/get-all-doctor`);
};

const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};

const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

const getDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

const getDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

const deleteSpecialtyService = (userId) => {
  return axios.delete("/api/delete-specialty-by-id", { data: { id: userId } });
};

const updateSpecialtyService = (user) => {
  return axios.put("/api/edit-specialty-by-id", user);
};

const deleteClinicService = (userId) => {
  return axios.delete("/api/delete-clinic-by-id", { data: { id: userId } });
};

const updateClinicService = (user) => {
  return axios.put("/api/edit-clinic-by-id", user);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getALLDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleByDate,
  getExtraInforDoctorById,
  getProfileById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty,
  getDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  deleteSpecialtyService,
  updateSpecialtyService,
  updateClinicService,
  deleteClinicService,
};
