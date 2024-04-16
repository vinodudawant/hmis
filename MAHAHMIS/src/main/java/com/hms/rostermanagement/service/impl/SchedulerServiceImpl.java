package com.hms.rostermanagement.service.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.Doctor;
import com.hms.dto.DoctorDetail;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.rostermanagement.dao.SchedulerDao;
import com.hms.rostermanagement.dto.AppointPatientResponseDTO;
import com.hms.rostermanagement.dto.AppointmentParameterDTO;
import com.hms.rostermanagement.dto.FollowUpResponseDTO;
import com.hms.rostermanagement.dto.SchedularDoctorTimeSlotDto;
import com.hms.rostermanagement.dto.SchedularExistingPatientDTO;
import com.hms.rostermanagement.dto.ScheduleAppointmentsDTO;
import com.hms.rostermanagement.dto.SchedulerRoomMasterDto;
import com.hms.rostermanagement.service.SchedulerService;

@Service
public class SchedulerServiceImpl implements  SchedulerService{
	@Autowired
	SchedulerDao schedulerDao;

	@Override
	@Transactional
	public int saveRoom(SchedulerRoomMasterDto schedulerRoomMasterDto,
			HttpServletRequest request) {
		
		if (schedulerRoomMasterDto.getRoomId() == 0) {
			Calendar calendar = Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
			String todaysDate = formatter.format(calendar.getTime());
			HttpSession session = request.getSession();
			String remoteAddress = request.getRemoteHost();
			
			Integer userId = (Integer) session.getAttribute("userId1");
			String uId=userId.toString();
			schedulerRoomMasterDto.setAddedBy(uId);
			schedulerRoomMasterDto.setAddedOn(todaysDate);
			schedulerRoomMasterDto.setStatus("Y");
			schedulerRoomMasterDto.setRemoteAddress((remoteAddress));
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {
			Calendar calendar = Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
			String todaysDate = formatter.format(calendar.getTime());
			HttpSession session = request.getSession();
			String remoteAddress = request.getRemoteHost();
			
			Integer userId = (Integer) session.getAttribute("userId1");
			String uId=userId.toString();
			schedulerRoomMasterDto.setStatus("Y");
			schedulerRoomMasterDto.setModifyBy(uId);
			schedulerRoomMasterDto.setModifyOn((todaysDate));
			schedulerRoomMasterDto.setRemoteAddress((remoteAddress));
		}

		if (schedulerDao.saveRoom(schedulerRoomMasterDto)==1) 
		{
			if(schedulerRoomMasterDto.getRoomId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
		
	}

	@Override
	@Transactional
	public List<SchedulerRoomMasterDto> getAllRoom() {
		// TODO Auto-generated method stub
		return schedulerDao.getAllRoom();
	}

	@Override
	@Transactional
	public boolean deleteRoom(Integer roomId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return schedulerDao.deleteRoom(roomId,request);
	}
	

	@Override
	@Transactional
	public List<Doctor> getAllDoctorList(String date, String docType) {
		// TODO Auto-generated method stub
		return schedulerDao.getAllDoctorList(date,docType);	
		}
	
	@Override
	@Transactional
	public List<DoctorDetail> getAllDoctorListfromSpec(String date, String docType) {
		// TODO Auto-generated method stub
		return schedulerDao.getAllDoctorListfromSpec(date,docType);	
		}

	@Override
	@Transactional
	public int saveDoctorSlotTime(	SchedularDoctorTimeSlotDto schedularDoctorTimeSlotDto,HttpServletRequest request) {

		return schedulerDao.saveDoctorSlotTime(schedularDoctorTimeSlotDto);
		}

	@Override
	@Transactional
	public List<SchedularDoctorTimeSlotDto> getDoctorTimeSlotDetails(
			Integer doctorId, String pageName,Integer specializationId) {
		return schedulerDao.getDoctorTimeSlotDetails(doctorId,pageName,specializationId);
	}
	
	@Override
	@Transactional
	public List<SchedularDoctorTimeSlotDto> getDoctorTimeSlotDetailsFromDoc(
			Integer doctorId, String pageName, String appointmentDate,Integer specializationId) {
		return schedulerDao.getDoctorTimeSlotDetailsFromDoc(doctorId,pageName,appointmentDate,specializationId);
	}

	@Override
	@Transactional
	public List<ScheduleAppointmentsDTO> fetchListOfNewExistingPatient(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return schedulerDao.fetchListOfNewExistingPatient(request);
	}

	@Override
	@Transactional
	public List<ScheduleAppointmentsDTO> fetchListOfReschedulePatient(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return schedulerDao.fetchListOfReschedulePatient(request);
	}

	@Override
	@Transactional
	public List<ScheduleAppointmentsDTO> fetchListOfFollowUPPatient(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return schedulerDao.fetchListOfFollowUPPatient(request);
	}

	@Override
	@Transactional
	public int removeAppointment(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return schedulerDao.removeAppointment(request);
	}

	@Override
	@Transactional
	public List<RegistrationDto> getPatientDetailsNew(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return schedulerDao.getPatientDetailsNew(request);
	}

	@Override
	@Transactional
	public String getPatientNameFromId(Integer patientId,String callfrom) {
		// TODO Auto-generated method stub
		return schedulerDao.getPatientNameFromId(patientId, callfrom);
	}

	@Override
	@Transactional
	public int saveAppointment(List<ScheduleAppointmentsDTO> liTotalTimeslices,
			String appoType, int userid) {
		// TODO Auto-generated method stub
		return schedulerDao.getPatientNameFromId(liTotalTimeslices,appoType,userid);
	}

	@Override
	@Transactional
	public List<AppointPatientResponseDTO> getPatientAppointListData(AppointmentParameterDTO obj) {
		
		return schedulerDao.getPatientAppointListData(obj);
	}

	@Override
	@Transactional
	public List<SchedularExistingPatientDTO> getGetSchedularExistingPatientDTOList(String searchType,String searchText) {
		
		return schedulerDao.getGetSchedularExistingPatientDTOList(searchType, searchText);
	}

	@Override
	@Transactional
	public List<FollowUpResponseDTO> getFolloupPatientList() {
		
		return schedulerDao.getFolloupPatientList();
	}

	@Override
	@Transactional
	public List<FollowUpResponseDTO> searchFolloupPatientList(String serachType, String serachText) {
		
		return schedulerDao.searchFolloupPatientList(serachType, serachText);
	}

	@Override
	@Transactional
	public int cancelPatientFollowUp(Integer followupId) {
		
		return schedulerDao.cancelPatientFollowUp(followupId);
	}
	

}
