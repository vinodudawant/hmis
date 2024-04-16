package com.hms.rostermanagement.controller;

import java.lang.invoke.MethodHandles;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
import com.hms.rostermanagement.service.SchedulerService;

import groovy.util.logging.Slf4j;


@Controller
@RequestMapping(value = "/scheduler")
@Slf4j
public class SchedulerContoller {
	 private static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	@Autowired
	SchedulerService schedulerService;
	
	/*Consulting Room Master*/	
	@RequestMapping(value = "/saveRoom", method = RequestMethod.POST)
	@ResponseBody
	public String saveRoom(SchedulerRoomMasterDto schedulerRoomMasterDto,
			HttpServletRequest request) {
		System.out.println("SchedulerContoller");
		int response = schedulerService.saveRoom(schedulerRoomMasterDto, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}
	
	@RequestMapping(value = "/getAllRoom", method = RequestMethod.POST)
	public @ResponseBody
	SchedulerRoomMasterDto getAllRoom() {
		List<SchedulerRoomMasterDto> ltRoomMasterDto = new ArrayList<SchedulerRoomMasterDto>();
		ltRoomMasterDto = schedulerService.getAllRoom();	
		SchedulerRoomMasterDto objRoom=new SchedulerRoomMasterDto();
		objRoom.setListSchedulerRoomMasterDto(ltRoomMasterDto);	
		return objRoom;
	}
	
	@RequestMapping(value = "/deleteRoom", method = RequestMethod.POST)
	public @ResponseBody
	String deleteRoom(@RequestParam("roomId") Integer roomId,
			HttpServletRequest request) {
				boolean response = schedulerService.deleteRoom(roomId,request);
		String msg = "";
		if (response == true) {
			msg = "Room Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	

	@RequestMapping(value = "/getAllDoctorList", method = RequestMethod.POST)
	public @ResponseBody
	Doctor getAllDoctorList(HttpServletRequest request) {
		String date = request.getParameter("date");
		String docType = request.getParameter("docType");
		List<Doctor> ltDoctorDto = new ArrayList<Doctor>();
		ltDoctorDto = schedulerService.getAllDoctorList(date,docType);	
		Doctor objDoctor=new Doctor();
		objDoctor.setListDoctor(ltDoctorDto);
		return objDoctor;
	}
	
	@RequestMapping(value = "/getAllDoctorListfromSpec", method = RequestMethod.POST)
	public @ResponseBody
	DoctorDetail getAllDoctorListfromSpec(HttpServletRequest request) {
		String date = request.getParameter("date");
		String docType = request.getParameter("docType");
		List<DoctorDetail> ltDoctorDto = new ArrayList<DoctorDetail>();
		ltDoctorDto = schedulerService.getAllDoctorListfromSpec(date,docType);	
		DoctorDetail objDoctor=new DoctorDetail();
		objDoctor.setListDoctorDetailsDto(ltDoctorDto);	
		return objDoctor;
	}
	
	@RequestMapping(value = "/saveDoctorSlotTime", method = RequestMethod.POST)
	@ResponseBody
	public String saveDoctorSlotTime(SchedularDoctorTimeSlotDto schedularDoctorTimeSlotDto,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();		
		Integer unitId = (Integer) session.getAttribute("uId");
		schedularDoctorTimeSlotDto.setUnitId(unitId);
		int response = schedulerService.saveDoctorSlotTime(schedularDoctorTimeSlotDto, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}
	
	@RequestMapping(value = "/getDoctorTimeSlotDetails", method = RequestMethod.POST)
	public @ResponseBody
	SchedularDoctorTimeSlotDto getDoctorTimeSlotDetails(HttpServletRequest request) {
		String doctorId = request.getParameter("doctorId");
		String pageName = request.getParameter("pageName");
		String specializationId = request.getParameter("specializationId");
		
		List<SchedularDoctorTimeSlotDto> ltTimeSlotDto = new ArrayList<SchedularDoctorTimeSlotDto>();
		ltTimeSlotDto = schedulerService.getDoctorTimeSlotDetails(Integer.parseInt(doctorId),pageName,Integer.parseInt(specializationId));	
		SchedularDoctorTimeSlotDto objList=new SchedularDoctorTimeSlotDto();
		objList.setListSchedularDoctorTimeSlotDto(ltTimeSlotDto);	
		return objList;
	}
	
	@RequestMapping(value = "/getDoctorTimeSlotDetailsFromDoc", method = RequestMethod.POST)
	public @ResponseBody
	SchedularDoctorTimeSlotDto getDoctorTimeSlotDetailsFromDoc(HttpServletRequest request) {
		String doctorId = request.getParameter("doctorId");
		String pageName = request.getParameter("pageName");
		String appointmentDate = request.getParameter("appointmentDate");
		String specializationId = request.getParameter("specializationId");
		
		List<SchedularDoctorTimeSlotDto> ltTimeSlotDto = new ArrayList<SchedularDoctorTimeSlotDto>();
		ltTimeSlotDto = schedulerService.getDoctorTimeSlotDetailsFromDoc(Integer.parseInt(doctorId),pageName,appointmentDate,Integer.parseInt(specializationId));	
		SchedularDoctorTimeSlotDto objList=new SchedularDoctorTimeSlotDto();
		objList.setListSchedularDoctorTimeSlotDto(ltTimeSlotDto.get(0).getListSchedularDoctorTimeSlotDto());
		objList.setListDoctorNA(ltTimeSlotDto.get(0).getListDoctorNA());
		objList.setListForDoctorAvailable(ltTimeSlotDto.get(0).getListForDoctorAvailable());
		
		return objList;
	}
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used fetchListOfNewExistingPatient onload
	 * *****/
	
	@RequestMapping(value = "/fetchList", method = RequestMethod.POST)
	public @ResponseBody ScheduleAppointmentsDTO fetchList(HttpServletRequest request){
		System.out.println("In fetchList");
		String actionType = request.getParameter("action");
		System.out.println("In fetchList action "+actionType);
		//ScheduleAppointmentsDTO scheduleAppointmentsDTO=new ScheduleAppointmentsDTO();
		List<ScheduleAppointmentsDTO> ltTimeSlotDto = new ArrayList<ScheduleAppointmentsDTO>();
		logger.info("inside fetchList");
		ltTimeSlotDto = schedulerService.fetchListOfNewExistingPatient(request);
		logger.debug("response fetchList...."+ltTimeSlotDto);
		ScheduleAppointmentsDTO objList=new ScheduleAppointmentsDTO();
		objList.setListAppointmet(ltTimeSlotDto);	
		return objList;
		
	}	
	
		
	@RequestMapping(value = "/fetchFollowUpList", method = RequestMethod.POST)
	public @ResponseBody ScheduleAppointmentsDTO fetchFollowUpList(HttpServletRequest request){
		System.out.println("In fetchFollowUpList Controller");
		String actionType = request.getParameter("action");
		System.out.println("In fetchFollowUpList  action "+actionType);
		List<ScheduleAppointmentsDTO> listDto = new ArrayList<ScheduleAppointmentsDTO>();
		listDto = schedulerService.fetchListOfFollowUPPatient(request);	
		ScheduleAppointmentsDTO objList=new ScheduleAppointmentsDTO();
		objList.setListAppointmet(listDto);
		//System.err.println("data------schedule appoint--->" + objList.getListAppointmet().get(0).getDocname());
		return objList;
		
	}		
	
	@RequestMapping(value = "/fetchRescheduleList", method = RequestMethod.POST)
	public @ResponseBody ScheduleAppointmentsDTO fetchRescheduleList(HttpServletRequest request){
		System.out.println("In fetchRescheduleList Controller");
		String actionType = request.getParameter("action");
		System.out.println("In fetchRescheduleList  action "+actionType);
		List<ScheduleAppointmentsDTO> ltTimeSlotDto = new ArrayList<ScheduleAppointmentsDTO>();
		ltTimeSlotDto = schedulerService.fetchListOfReschedulePatient(request);	
		ScheduleAppointmentsDTO objList=new ScheduleAppointmentsDTO();
		objList.setListAppointmet(ltTimeSlotDto);	
		return objList;
	}	
	
	
	@RequestMapping(value = "/removeAppointMent", method = RequestMethod.POST)
	public @ResponseBody
	int removeAppointMent(HttpServletRequest request){
		System.out.println("In remove AppointMent Controller");
		int ret=schedulerService.removeAppointment(request);	
		return ret;
	}	
	
	@RequestMapping(value = "/fetchCount" , method = RequestMethod.POST)
	public @ResponseBody ScheduleAppointmentsDTO fetchCountOfFollowReschedule(HttpServletRequest request){
		System.out.println("In");
		List<ScheduleAppointmentsDTO> reschedulelist = new ArrayList<ScheduleAppointmentsDTO>();
		reschedulelist = schedulerService.fetchListOfReschedulePatient(request);
		
		List<ScheduleAppointmentsDTO> listDto = new ArrayList<ScheduleAppointmentsDTO>();
		listDto = schedulerService.fetchListOfFollowUPPatient(request);	
		ScheduleAppointmentsDTO scheduler=new ScheduleAppointmentsDTO();
		scheduler.setFollowUpCount(listDto.size());
		scheduler.setRescheduleCount(reschedulelist.size());
		return scheduler;
	}
	
	
	
	@RequestMapping(value = "/getPatientDetailsNew", method = RequestMethod.POST)
	public @ResponseBody
	RegistrationDto getPatientDetailsNew(HttpServletRequest request) {
		List<RegistrationDto> ltregPatDto = new ArrayList<RegistrationDto>();
		ltregPatDto = schedulerService.getPatientDetailsNew(request);	
		RegistrationDto objPatRegList=new RegistrationDto();
		objPatRegList.setPatientList(ltregPatDto);	
		return objPatRegList;
	}
	
	/******
	 * @author   :kishor lokhande
	 * @Code     :this method used saveorupdate  patient appointment
	 * *****/
	
	@RequestMapping(value = "/SavescheduleAppointmentOfPatientNew", method = RequestMethod.POST)
	@ResponseBody
	public String SaveScheduleAppointmentOfPatientNew(HttpServletRequest request, HttpServletResponse response) {
		String  isInserted = "0";
		try {
		HttpSession session = request.getSession();		
		Integer unitId = (Integer) session.getAttribute("uId");

		String appoTypeAR = request.getParameter("appoTypeAR");
		String divTokens = request.getParameter("divTokens");
		//String divAppoList = request.getParameter("divAppoList");

		String appoType = request.getParameter("appoType");
		String apptDate = request.getParameter("txtAppoDate");
		
		String branchId = request.getParameter("branchId");
		String appointmentId = request.getParameter("appointmentId");
		//System.out.println(appointmentId);
		String note = request.getParameter("note");
		
		String regType = request.getParameter("regType");

		int treatmentId = 0;
		int patientId = 0;
		if (!appoType.equals("New") && !appoType.equals("Personal")) {
			String trid = request.getParameter("trid");
			String patid = request.getParameter("patid");
			treatmentId = Integer.parseInt(trid);
			patientId = Integer.parseInt(patid);
		}
		String title = request.getParameter("title");
		String patName = request.getParameter("patName");
		String patLastName = request.getParameter("patLastName");
		String patMob = request.getParameter("patMob");
		String details = request.getParameter("details");

		//PatientModel objPatientModel = new PatientModel();
		//UserModel objUserModel = ((UserModel) getContext().getBean("userModel"));
		//AppointmentModel objAppointmentModel = ((AppointmentModel) getContext().getBean("appointModel"));
		
		
		List<ScheduleAppointmentsDTO> liMain = new ArrayList<ScheduleAppointmentsDTO>();
		List<String> lidoctorid = new ArrayList<String>();
		List<ScheduleAppointmentsDTO> liTotalTimeslices = new ArrayList<ScheduleAppointmentsDTO>();
		List<String> liSelectedTimeslices = new ArrayList<String>();

		ScheduleAppointmentsDTO objAppointment = new ScheduleAppointmentsDTO();
		

		String arrAppo[] = divTokens.split("#");

		for (String strAppo : arrAppo) {
			String arrAppoInfo[] = strAppo.split("M");

			liSelectedTimeslices.add(arrAppoInfo[2]);
			lidoctorid.add(arrAppoInfo[1]);
		}
		int i = 0;
		for (String strTime : liSelectedTimeslices) {

			ScheduleAppointmentsDTO objTempAppointment = new ScheduleAppointmentsDTO();

			if (appoType.equals("New") || appoType.equals("Personal")) {
				objTempAppointment.setTitle(title);
				objTempAppointment.setLastName(patLastName);
				objTempAppointment.setPatientName(patName);
				objTempAppointment.setDetails(details);
				objTempAppointment.setMobNo(patMob);
			} else {
				String patientFullName = schedulerService.getPatientNameFromId(patientId,"name");
				//String patientFullName = objPatientModel.fetchPatNameByPatId(patientId);
				
				if(patientId==0){
					objTempAppointment.setTitle(title);
					objTempAppointment.setLastName(patLastName);
					objTempAppointment.setPatientName(patName);
					
				}else{
					String arrPatientName[] = patientFullName.split(" ");

					objTempAppointment.setTitle(arrPatientName[0]);
					objTempAppointment.setLastName(arrPatientName[2]);
					objTempAppointment.setPatientName(arrPatientName[1]);					
				}

				objTempAppointment.setMobNo(schedulerService.getPatientNameFromId(patientId,"mobile"));
				objTempAppointment.setPatientId(patientId);
				objTempAppointment.setTreatmentId(treatmentId);
			}
			objTempAppointment.setDetails(details);
			objTempAppointment.setBranchId(Integer.parseInt(branchId));
			objTempAppointment.setApptId(Integer.parseInt(appointmentId));
			objTempAppointment.setNote(note);
			objTempAppointment.setApptTypeId(appoType);
			
			objTempAppointment.setRegType(regType);

			//objTempAppointment.setApptDate(apptDate);
			
			
			
		    
		    //objTempAppointment.setApptDate(new SimpleDateFormat("yyyy-MM-dd").parse(appointmentDate));
		    SimpleDateFormat sdf1 = new SimpleDateFormat("dd/MM/yyyy");
		    java.util.Date date = sdf1.parse(apptDate);
		    objTempAppointment.setApptDate(new Date (date.getTime()));
		   
			
			objTempAppointment.setStatus("Y");
			objTempAppointment.setApptTimeFrom(strTime);
			objTempAppointment.setApptTimeTo(strTime);

			/*objTempAppointment.setDocname(objUserModel
					.fetchDocNameByDocId(Integer.parseInt(lidoctorid.get(i))));*/
			
			objTempAppointment.setDocname(schedulerService.getPatientNameFromId(Integer.parseInt(lidoctorid.get(i)),"doctor"));

			objTempAppointment.setDoctorId(Integer.parseInt(lidoctorid.get(i)));

			liTotalTimeslices.add(objTempAppointment);
			i++;
		}
		
		//HttpSession session = request.getSession();
		int userid = (Integer) session.getAttribute("userId");
		int isInserted2 = schedulerService.saveAppointment(liTotalTimeslices,
				appoType,userid);
		logger.info("inside save appointment");
		return isInserted2 == 1 ? "Appointment Saved successfully..." : isInserted2 == 2 ? "Appointment Updated successfully..." : isInserted2 == 3 ? "Appointment can't be saved. Because it's Holiday..." : "Oops some problem occured while saving Appointment Detail...";
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return isInserted;
	}
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getting new,existing,reschedule patient list on tab
	 * *****/
	@RequestMapping(value = "/getPatientAppointListData", method = RequestMethod.POST)
	public @ResponseBody
	AppointPatientResponseDTO getPatientAppointListData(AppointmentParameterDTO obj,HttpServletRequest request) {
		List<AppointPatientResponseDTO> lstappointmnet = new ArrayList<AppointPatientResponseDTO>();
		logger.info("inside getPatientAppointListData");
		lstappointmnet = schedulerService.getPatientAppointListData(obj);
		logger.debug("response getPatientAppointListData...."+lstappointmnet);
		AppointPatientResponseDTO appobj=new AppointPatientResponseDTO();
		appobj.setListAppointmet(lstappointmnet);
		return appobj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getting closed treatment patient list
	 * *****/
	@RequestMapping(value = "/getSchedularExistingPatientDTOList", method = RequestMethod.POST)
	public @ResponseBody
	SchedularExistingPatientDTO getSchedularExistingPatientDTOList(@RequestParam("searchType") String searchType,@RequestParam("searchText") String searchText,HttpServletRequest request) {
		List<SchedularExistingPatientDTO> lstExistingPatient = new ArrayList<SchedularExistingPatientDTO>();
		logger.info("inside getSchedularExistingPatientDTOList");
		lstExistingPatient = schedulerService.getGetSchedularExistingPatientDTOList(searchType, searchText);
		logger.debug("response getSchedularExistingPatientDTOList...."+lstExistingPatient);
		SchedularExistingPatientDTO appobj=new SchedularExistingPatientDTO();
		appobj.setGetSchedularExistingPatientDTOList(lstExistingPatient);
		return appobj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getting follow up patient list
	 * *****/
	@RequestMapping(value = "/getFolloupPatientList", method = RequestMethod.POST)
	public @ResponseBody
	FollowUpResponseDTO getFolloupPatientList(HttpServletRequest request) {
		List<FollowUpResponseDTO> lstFollowupPatient = new ArrayList<FollowUpResponseDTO>();
		logger.info("inside getFolloupPatientList");
		lstFollowupPatient = schedulerService.getFolloupPatientList();
		logger.debug("response getFolloupPatientList...."+lstFollowupPatient);
		FollowUpResponseDTO appobj=new FollowUpResponseDTO();
		appobj.setLstFolloupPatientList(lstFollowupPatient);
		return appobj;
	}
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getting follow up patient list
	 * *****/
	@RequestMapping(value = "/searchFolloupPatientList", method = RequestMethod.POST)
	public @ResponseBody
	FollowUpResponseDTO searchFolloupPatientList(@RequestParam("serachType")String serachType,@RequestParam("searchText")String serachText,HttpServletRequest request) {
		List<FollowUpResponseDTO> lstFollowupPatient = new ArrayList<FollowUpResponseDTO>();
		logger.info("inside searchFolloupPatientList");
		lstFollowupPatient = schedulerService.searchFolloupPatientList(serachType, serachText);
		logger.debug("response searchFolloupPatientList...."+lstFollowupPatient);
		FollowUpResponseDTO appobj=new FollowUpResponseDTO();
		appobj.setLstFolloupPatientList(lstFollowupPatient);
		return appobj;
	}
	
	
	/******
	 * @author   :HM00054
	 * @Code     :this method used for getting follow up patient list
	 * *****/
	@RequestMapping(value = "/cancelPatientFollowUp", method = RequestMethod.POST)
	public @ResponseBody
	int  cancelPatientFollowUp(@RequestParam("followUpId")Integer followUpId,HttpServletRequest request) {
		
		logger.info("inside cancelPatientFollowUp");
		int res = schedulerService.cancelPatientFollowUp(followUpId);
		logger.debug("response cancelPatientFollowUp...."+res);
		
		return res;
	}


}
