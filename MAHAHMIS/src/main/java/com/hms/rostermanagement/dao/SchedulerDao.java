package com.hms.rostermanagement.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.Doctor;
import com.hms.dto.DoctorDetail;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.rostermanagement.dto.AppointPatientResponseDTO;
import com.hms.rostermanagement.dto.AppointmentParameterDTO;
import com.hms.rostermanagement.dto.FollowUpResponseDTO;
import com.hms.rostermanagement.dto.SchedularDoctorTimeSlotDto;
import com.hms.rostermanagement.dto.SchedularExistingPatientDTO;
import com.hms.rostermanagement.dto.ScheduleAppointmentsDTO;
import com.hms.rostermanagement.dto.SchedulerRoomMasterDto;

public interface SchedulerDao {

	int saveRoom(SchedulerRoomMasterDto schedulerRoomMasterDto);

	List<SchedulerRoomMasterDto> getAllRoom();

	boolean deleteRoom(Integer roomId, HttpServletRequest request);

	List<Doctor> getAllDoctorList(String date, String docType);
	
	List<DoctorDetail> getAllDoctorListfromSpec(String date, String docType);
	
	int saveDoctorSlotTime(SchedularDoctorTimeSlotDto schedularDoctorTimeSlotDto);

	List<SchedularDoctorTimeSlotDto> getDoctorTimeSlotDetails(Integer doctorId,
			String pageName,Integer specializationId);

	List<SchedularDoctorTimeSlotDto> getDoctorTimeSlotDetailsFromDoc(
			Integer doctorId, String pageName, String appointmentDate,Integer specializationId);

	List<ScheduleAppointmentsDTO> fetchListOfNewExistingPatient(HttpServletRequest request);
	
	List<ScheduleAppointmentsDTO> fetchListOfReschedulePatient(HttpServletRequest request);
	
	List<ScheduleAppointmentsDTO> fetchListOfFollowUPPatient(HttpServletRequest request);
	
	int removeAppointment(HttpServletRequest request);

	List<RegistrationDto> getPatientDetailsNew(HttpServletRequest request);

	String getPatientNameFromId(Integer patientId,String callfrom);

	int getPatientNameFromId(List<ScheduleAppointmentsDTO> liTotalTimeslices,
			String appoType, int userid);
	
	List<AppointPatientResponseDTO> getPatientAppointListData(AppointmentParameterDTO obj);
	
	List<SchedularExistingPatientDTO> getGetSchedularExistingPatientDTOList(String searchType,String searchText);
	
	List<FollowUpResponseDTO> getFolloupPatientList();
	
	List<FollowUpResponseDTO> searchFolloupPatientList(String serachType,String serachText);
	
	int cancelPatientFollowUp(Integer followupId);


}
