package com.hms.ambulance.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.jfree.util.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ambulance.dto.AmbulancePatientCountDto;
import com.hms.ambulance.dto.AmbulancePatientDto;
import com.hms.ambulance.service.AmbulancePatientService;
import com.hms.dto.Users;
import com.hms.ehat.dto.RegistrationDto;

@RestController
@RequestMapping(value = "/ambulancePatient")
public class AmbulancePatientController {
	
	@Autowired
	AmbulancePatientService ambulancePatientService;
	
	static Logger log = Logger.getLogger(AmbulancePatientController.class.getName());

	@RequestMapping(value = "/saveAmbulancePatient", method = RequestMethod.POST)
	public int saveAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request) {
		log.info("In AmbulancePatientController saveAmbulancePatient()");
		String msg = "";
		int response = ambulancePatientService.saveAmbulancePatient(ambulancePatient, request);
		log.debug("Reponse----> " + response);
		return response;
		
	}
	
	@RequestMapping(value = "/getAllAmbulancePatient" , method = RequestMethod.GET)
	public @ResponseBody AmbulancePatientDto getAllAmbulancePatient(@RequestParam("status") String status,HttpServletRequest request) {
		log.info("In AmbulancePatientController getAllAmbulancePatient()");
		List<AmbulancePatientDto> listAmbulancePatientDto = new ArrayList<AmbulancePatientDto>();
		listAmbulancePatientDto = ambulancePatientService.getAllAmbulancePatient(status,request);
		AmbulancePatientDto obj= new AmbulancePatientDto();
		obj.setListAmbulancePatientDto(listAmbulancePatientDto);
		System.out.println("list :  " + listAmbulancePatientDto);
		return obj;
	}
	
	@RequestMapping(value = "/editAmbulancePatient" , method = RequestMethod.GET)
	public @ResponseBody AmbulancePatientDto editAmbulancePatient(@RequestParam("id") Integer id) {
		log.info("In AmbulancePatientController editAmbulancePatient()");
		AmbulancePatientDto obj = new AmbulancePatientDto();
		obj = ambulancePatientService.editAmbulancePatient(id);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/deleteAmbulancePatient", method = RequestMethod.POST)
	public @ResponseBody String deleteAmbulancePatient(@RequestParam("id") Integer patientId,
			HttpServletRequest request) {
		log.info("In deleteAmbulancePatientController deleteAmbulancePatient()");
		System.out.println("patient_Id :" + patientId);
		boolean response = ambulancePatientService.deleteAmbulancePatient(patientId, request);

		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Network issue";
		}
		Log.debug("Response------>" + msg);
		return msg;
	}
	
	@RequestMapping(value = "/getAmbulanceDetailsById", method = RequestMethod.GET)
	public @ResponseBody RegistrationDto getAmbulanceDetailsById(@RequestParam("id") Integer patientId)
	{
		log.info("In AmbulancePatientController getAmbulanceDetailsById()");
		List<RegistrationDto> listAmbulancePatientDto = new ArrayList<RegistrationDto>();
		listAmbulancePatientDto = ambulancePatientService.getAmbulanceDetailsById(patientId);
		RegistrationDto obj = new RegistrationDto();
		obj.setPatientList(listAmbulancePatientDto);
		System.out.println("list :  " + listAmbulancePatientDto);
		return obj;
	}
	
	@RequestMapping(value = "/getDoctorName", method = RequestMethod.GET)
	public @ResponseBody String getDoctorName(@RequestParam("id") Integer patientId)
	{
		log.info("In AmbulancePatientController getDoctorName()");
	
		String response = ambulancePatientService.getDoctorName(patientId);
		log.debug("Reponse----> " + response);
		
		return response;
	}
	
	@RequestMapping(value = "/getDoctors",method = RequestMethod.GET)
	public @ResponseBody Users getDoctors(@RequestParam("id") Integer user_ID)
	{
		log.info("In AmbulancePatientController getDoctors()");
		List<Users> user = new ArrayList<Users>();
		user = ambulancePatientService.getDoctors(user_ID);
		Users obj=new Users();
		obj.setUsersList(user);
		return obj;
	}
	
	@RequestMapping(value = "/getNurse",method = RequestMethod.GET)
	public @ResponseBody Users getNurse(@RequestParam("id") Integer user_ID)
	{
		log.info("In AmbulancePatientController getNurse()");
		List<Users> user = new ArrayList<Users>();
		user = ambulancePatientService.getNurse(user_ID);
		Users obj=new Users();
		obj.setUsersList(user);
		return obj;
	}
	
	@RequestMapping(value = "/autoSuggestion", method = RequestMethod.POST)
	@ResponseBody
	public AmbulancePatientDto autoSuggestion(@RequestParam("callFrom") int callFrom,@RequestParam("text") String text) {
		 
		log.info("In AmbulancePatientController autoSuggestion()");
		AmbulancePatientDto objDto = new  AmbulancePatientDto();
		List<AmbulancePatientDto> listAmbulancePatientDto = ambulancePatientService.autoSuggestion(callFrom,text);	
		objDto.setListAmbulancePatientDto(listAmbulancePatientDto);
		log.debug("Response--------> "+objDto);
		return objDto;
	}
	
	@RequestMapping(value = "/getAmbulancePatientById", method = RequestMethod.GET)
	public @ResponseBody AmbulancePatientDto getAmbulancePatientById(@RequestParam("id") Integer patientId)
	{
		log.info("In AmbulancePatientController getAmbulancePatientById()");
		List<AmbulancePatientDto> listAmbulancePatientDto = new ArrayList<AmbulancePatientDto>();
		listAmbulancePatientDto = ambulancePatientService.getAmbulancePatientById(patientId);
		AmbulancePatientDto obj = new AmbulancePatientDto();
		obj.setListAmbulancePatientDto(listAmbulancePatientDto);
		System.out.println("list :  " + listAmbulancePatientDto);
		return obj;
		
	}
	
	@RequestMapping(value = "/approveAmbulancePatient", method = RequestMethod.GET)
	public @ResponseBody int approveAmbulancePatient(@RequestParam("id") String  id,@RequestParam("userId") Integer  userId)
	{
		log.info("In AmbulancePatientController approveAmbulancePatient()");
		
		int res = ambulancePatientService.approveAmbulancePatient(id, userId);
		
		return res;
		
	}
	
	@RequestMapping(value = "/assignAmbulancePatient", method = RequestMethod.GET)
	public @ResponseBody int assignAmbulancePatient(@RequestParam("id") Integer  id,@RequestParam("userId") Integer  userId)
	{
		log.info("In AmbulancePatientController assignAmbulancePatient()");
		
		int res = ambulancePatientService.assignAmbulancePatient(id, userId);
		
		return res;
		
	}
	
	@RequestMapping(value = "/completeAmbulancePatient", method = RequestMethod.GET)
	public @ResponseBody int completeAmbulancePatient(@RequestParam("id") Integer  id,@RequestParam("userId") Integer  userId)
	{
		log.info("In AmbulancePatientController completeAmbulancePatient()");
		
		int res = ambulancePatientService.completeAmbulancePatient(id, userId);
		
		return res;
		
	}
	
	@RequestMapping(value = "/getAmbulancePatientCount" , method = RequestMethod.GET)
	public @ResponseBody AmbulancePatientCountDto getAmbulancePatientCount(HttpServletRequest request) {
		log.info("In AmbulancePatientController getAmbulancePatientCount()");
		AmbulancePatientCountDto obj = new AmbulancePatientCountDto();
		obj = ambulancePatientService.getAmbulancePatientCount(0,request);
		Log.debug("Response----->" + obj);
		return obj;
	}
	
	@RequestMapping(value = "/updateAmbulancePatient" , method = RequestMethod.POST)
	public @ResponseBody int updateAmbulancePatient(AmbulancePatientDto ambulancePatient, HttpServletRequest request) {
		
		log.info("In AmbulancePatientController updateAmbulancePatient()");
		String msg = "";
		int response = ambulancePatientService.updateAmbulancePatient(ambulancePatient, request);
		log.debug("Reponse----> " + response);
		return response;
	}
	
	@RequestMapping(value = "/updateAmbulancePatientDetails" , method = RequestMethod.POST)
	public @ResponseBody int updateAmbulancePatientDetails(AmbulancePatientDto ambulancePatient, HttpServletRequest request) {
		
		log.info("In AmbulancePatientController updateAmbulancePatient()");
		String msg = "";
		int response = ambulancePatientService.updateAmbulancePatientDetails(ambulancePatient, request);
		log.debug("Reponse----> " + response);
		return response;
	}
	
	@RequestMapping(value = "/autoSuggestionforRID", method = RequestMethod.POST)
	public @ResponseBody AmbulancePatientDto autoSuggestionforRID(@RequestParam("callFrom") int callFrom,@RequestParam("id") Integer id) {
		 
		log.info("In AmbulancePatientController autoSuggestionforRID()");
		AmbulancePatientDto objDto = new  AmbulancePatientDto();
		List<AmbulancePatientDto> listAmbulancePatientDto = ambulancePatientService.autoSuggestionforRID(callFrom,id);	
		objDto.setListAmbulancePatientDto(listAmbulancePatientDto);
		log.debug("Response--------> "+objDto);
		return objDto;
	}
	
	@RequestMapping(value = "/getfilterAmbulancePatientMasterWithDate" , method = RequestMethod.GET)
	public @ResponseBody
	AmbulancePatientDto getfilterAmbulancePatientMasterWithDate(@RequestParam("status") String status, @RequestParam("department") String department,
			@RequestParam("requisitionDate") String requisitionDate, @RequestParam ("toDate") String toDate, @RequestParam ("wardTypeSelect")String wardTypeSelect) {
		
		List<AmbulancePatientDto> list = new ArrayList<AmbulancePatientDto>();
		
		list = ambulancePatientService.getfilterAmbulancePatientMasterWithDate(status, department,requisitionDate,toDate,wardTypeSelect);
		AmbulancePatientDto obj = new AmbulancePatientDto();
		
		obj.setListAmbulancePatientDto(list);
		
		return obj;
	}

}
