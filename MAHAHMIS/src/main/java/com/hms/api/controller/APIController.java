package com.hms.api.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.ws.WebServiceContext;

import org.json.JSONException;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.google.gson.Gson;
import com.hms.dto.Appointment;
import com.hms.dto.Doctor;
import com.hms.dto.HospitalSpecializations;
import com.hms.dto.SchedularDoctorTimeSlot;
import com.hms.ehat.dto.BillingInfoDto;
import com.hms.ehat.dto.InsurerInfoDto;
import com.hms.ehat.dto.SponsorPatientInfoDto;
//import com.hms.model.AppointmentModel;
import com.hms.model.PatientModel;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.utility.ApplicationContextUtils;

@Path("/")
//@RestController
//@EnableWebMvc
//@RequestMapping(value = "/api")
public class APIController {

	@Resource
	private WebServiceContext context;

	@Context
	private ServletContext servletContext;

	@Context
	private HttpServletRequest request;

	@Context
	private HttpServletResponse response;

	APIDaoImpl apiDaoImpl = (ApplicationContextUtils.getApplicationContext())
			.getBean(APIDaoImpl.class);

	JSONParser parser = new JSONParser();
	
	
/**
[
	{
		"ID":0,
		"AnalyzerId":0,
		"AnalyzerName":null,
		"SampleId":"114",
		"ResultDate":"21-06-2018 11:29:46",
		"Results":
		[
				{"ID":0,"ResultId":0,"TestId":4,"Result":"32.9"}
		]
	
	}
]**/

	/**
	 * @author Laxman Nikam
	 * @date  14-June-2018
	 * @param jsonObject
	 */
	@POST
	@Consumes("application/json")
	@Path("/savemachinevalues")
	public Response saveMachineValues(String content) throws IOException {
		JSONArray jsonArray = new JSONArray();
		Boolean flag = false;
		
		try {
			
			jsonArray = (org.json.simple.JSONArray) parser.parse(content);
			flag = apiDaoImpl.saveMachineValues(jsonArray);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String output = "Data updation success";
		String output1 = "Data updation failed";
		if(flag){
	        return Response.status(200).entity(output).build();
		}else{
	         return Response.status(500).entity(output1).build();

		}
	}
	
	@GET
	@Produces("application/json")
	//@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Path("/getSpecialityList")
	public List<HospitalSpecializations> getSpecialityList() {
		PatientModel objPatientModel = new PatientModel();
		List<HospitalSpecializations> listHospitalSpecializations = new ArrayList<HospitalSpecializations>();
		listHospitalSpecializations = objPatientModel
				.fetchDoctorSpecilizations();
		
		return listHospitalSpecializations;
	}
	
	/*
	@GET
	@Produces({ MediaType.APPLICATION_JSON })
	@Consumes("plain/text")
	@Path("/getDoctorNameList/{departmentId}")
	public List<Doctor> getDoctorNameList(
			@PathParam("departmentId") Integer departmentId)
			throws JSONException {
		AppointmentModel appointmentModel = new AppointmentModel();
		List<Doctor> listDoctors = new ArrayList<Doctor>();
		listDoctors = appointmentModel.getDoctorNameList(departmentId);
		return listDoctors;
	}
    */
	
	/*
	@GET
	@Produces("application/json")
	@Consumes("plain/text")
	@Path("/getDoctorTimeList/{doctorId}/{appointmentDate}")
	public SchedularDoctorTimeSlot getDoctorTimeList(
			@PathParam("doctorId") Integer doctorId, String pageName,
			@PathParam("appointmentDate") String appointmentDate) throws JSONException {
		Date date=new Date(appointmentDate.replaceAll("-", "/"));
		DateFormat dateFormat=new SimpleDateFormat("dd/MM/yyyy");
		appointmentDate=dateFormat.format(date);
		AppointmentModel appointmentModel = new AppointmentModel();
		SchedularDoctorTimeSlot objDoctorTimeSlot = new SchedularDoctorTimeSlot();
	//	objDoctorTimeSlot = appointmentModel.getDoctorTimeList(doctorId,pageName, appointmentDate);
		return objDoctorTimeSlot;
	}
   */
	
	/*
	@GET
	@Produces("application/json")
	@Consumes("plain/text")
	@Path("/fetchQueue/{appt_date}")
	public List<Appointment> fetchQueue(
			@PathParam("appt_date") String txtAppoDate) throws JSONException {
		AppointmentModel appointmentModel1 = new AppointmentModel();
		List<Appointment> listAppointmentPatient = new ArrayList<Appointment>();

		String todays_date = txtAppoDate;
		if (todays_date.equals(null) || todays_date.equals("")) {
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			todays_date = formatter.format(currentDate.getTime());
		}
		String[] app = txtAppoDate.split("-");
		String appDate = app[0] + "/" + app[1] + "/" + app[2];
		Appointment objAppointment = new Appointment();
		objAppointment.setApptDate(appDate);
		listAppointmentPatient = appointmentModel1.fetchQueue(objAppointment);

		Map<String, String> categoryDiscount = new HashMap<String, String>();
		String json = new Gson().toJson(listAppointmentPatient);
		categoryDiscount.put("result", json);
		return listAppointmentPatient;
	}
   */
	public static void includeJSONResponseObject(Object jsonObject,
			HttpServletResponse response) {
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html");
			ConfigUIJSONUtility.getJSONFromObjectToStream(jsonObject,
					response.getWriter());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * @author Laxman Nikam
	 * @date  29-Jan-2019
	 * @param jsonObject
	 */
	@GET
	@Produces("application/json")
	@Path("/getSponsorPatientInfo/{patientId}/{treatmentId}")
	public List<SponsorPatientInfoDto> getSponsorPatientInfo(
			@PathParam("patientId") Integer patientId,
			@PathParam("treatmentId") Integer treatmentId) throws IOException {
		 List<SponsorPatientInfoDto> ltPatientRecord = new ArrayList<SponsorPatientInfoDto>();
		try {
			ltPatientRecord= apiDaoImpl.getSponsorPatientInfo(patientId,treatmentId);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltPatientRecord;
	}
	
	/************
	* @author	: Vinod Udawant
	* @date		: 06 Jan 2019
	* @codeFor	: Get bill details 
	************/
	@GET
	@Produces("application/json")
	@Path("/getBillingInfo/{patientId}/{treatmentId}")
	public List<BillingInfoDto> getBillingInfo(@PathParam("patientId") Integer patientId,
			@PathParam("treatmentId") Integer treatmentId) throws IOException {
		List<BillingInfoDto> ltPatientRecord = new ArrayList<BillingInfoDto>();
		try {
			ltPatientRecord= apiDaoImpl.getBillingInfo(patientId,treatmentId);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltPatientRecord;
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 13 feb 2019
	* @codeFor	: Get insurer details 
	************/
	@GET
	@Produces("application/json")
	@Path("/getInsurerInfo/{sponsorIds}/{fromDate}/{toDate}")
	public List<InsurerInfoDto> getInsurerInfo(@PathParam("sponsorIds") String sponsorIds,
			@PathParam("fromDate") String fromDate,@PathParam("toDate") String toDate) throws IOException {
		List<InsurerInfoDto> ltPatientRecord = new ArrayList<InsurerInfoDto>();
		try {
			ltPatientRecord= apiDaoImpl.getInsurerInfo(sponsorIds,fromDate,toDate);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltPatientRecord;
	}	
	
	/************
	* @author	: Vinod Udawant
	* @date		: 27 Aug 2019
	* @codeFor	: Get Departmentwise details 
	************/
	@POST
	@Produces("application/json")
	@Consumes("application/json")
	@Path("/getTestDetailsFromSampleId")
	public Response getTestDetailsFromSampleId(String content) throws IOException {
		
		JSONArray jsonArray = new JSONArray();
		String testDetails = new String();
		
		try {			
			jsonArray = (org.json.simple.JSONArray) parser.parse(content);			
			testDetails = apiDaoImpl.getTestDetailsFromSampleId(jsonArray);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	    return Response.status(200).entity(testDetails).build();
		
	}
	
	
	/********************************************************
	* @author	: Ajay Khandare
	* @date     : 22 Feb 2021
	* @codeFor	: Get save machine values details 
	*********************************************************/
	@POST
	@Consumes("application/json")
	@Path("/savemachinevaluesnew")
	public Response saveMachineValuesnew(String content) throws IOException {
		
		JSONArray jsonArray = new JSONArray();
		Boolean flag = false;
		
		try {
			
			jsonArray = (org.json.simple.JSONArray) parser.parse(content);
			
			flag = apiDaoImpl.saveMachineValuesnew(jsonArray);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		String output = "Data updation success";
		String output1 = "Data updation failed";
		if(flag){
	        return Response.status(200).entity(output).build();
		}else{
	         return Response.status(500).entity(output1).build();

		}
	}
	
}