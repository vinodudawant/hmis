package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.PatientCareAdvicesDto;
import com.hms.dto.PatientChemoDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.PatientChemoOrderSheetDto;
import com.hms.ehat.service.PatientChemoService;
import com.hms.patient.util.ConfigUIJSONUtility;



@Controller
@RequestMapping(value = "/patientChemo")
public class PatientChemoController {
	
	@Autowired
	PatientChemoService patChemoService;
	
	/**
	 * @author Pooja Sukre @date 7_March-2018 these methods are used to map request
	 *         with services for Save Patient Chemotherapy
	 * **/
	@SuppressWarnings("unused")
	@RequestMapping(value = "/savePatientChemo", method = RequestMethod.POST)
	@ResponseBody
	public int saveModule(@RequestParam("patChemoDetails") String patChemo,HttpServletRequest request) {
		
		int response=0;
		
		PatientChemoDto ptChemoDtoObj = (PatientChemoDto) ConfigUIJSONUtility
				.getObjectFromJSON(patChemo, PatientChemoDto.class);
		
		response = patChemoService.saveOrUpdatePatChemo(ptChemoDtoObj.getLstPatChemodetails().get(0), request);
		
		return response;	 
	}
	
	/**
	 * @author Pooja Sukre @date 7_March-2018 these methods are used to map request
	 *         with services for fetch Patient Chemotherapy
	 * **/
	@RequestMapping(value = "/getPatientChemo", method = RequestMethod.POST)
	public @ResponseBody
	List<PatientChemoDto> getPatChemoTherapy(@RequestParam("callFrom") String callFrom,PatientChemoDto patientChemoDto, HttpServletRequest request) {
		List<PatientChemoDto> ltPatChemoDto = new ArrayList<PatientChemoDto>();
		System.err.println("callFrom>>>>>>>>"+callFrom);
		ltPatChemoDto = patChemoService.getPatientChemo(callFrom,patientChemoDto,request);
		
		return ltPatChemoDto;
	}
	
	/**
	 * @author Pooja Sukre @date 7_March-2018 these methods are used to map request
	 *         with services for Patient Care Advices
	 * **/
	@RequestMapping(value = "/savePatientAdvices", method = RequestMethod.POST)
	@ResponseBody
	public int savePatAdvice(@RequestParam("patCareAdvDetails") String patCareAdv,HttpServletRequest request) {
		int response=0;
		PatientCareAdvicesDto  ptCareAdvDtoObj =  (PatientCareAdvicesDto) ConfigUIJSONUtility.getObjectFromJSON(patCareAdv,PatientCareAdvicesDto.class);

		System.err.println("");
		response = patChemoService.saveOrUpdatePatAdvice(ptCareAdvDtoObj.getLstPatCareAdvicedetails().get(0), request);
		
		return response;	 
	}
	
	/**
	 * @author Pooja Sukre@date 7_March-2018 these methods are used to map request
	 *         with services for Fetch Patient Chemotherapy
	 * **/
	@RequestMapping(value = "/getPatientCareAdvices", method = RequestMethod.POST)
	public @ResponseBody
	List<PatientCareAdvicesDto> getPatCareAdvices(PatientCareAdvicesDto patientCareAdvDto, HttpServletRequest request) {
		List<PatientCareAdvicesDto> ltPatCareAdvDto = new ArrayList<PatientCareAdvicesDto>();
		
		ltPatCareAdvDto = patChemoService.getPatCareAdvices(patientCareAdvDto,request);
		
		return ltPatCareAdvDto;
	}
	
	/**
	 * @author Pooja @date 7_March-2018 these methods are used to map request
	 *         with services for Chemotherapy Protocol AutoSuggesion
	 * **/
	@RequestMapping(value = "/getAutoChemoProtocol", method = RequestMethod.POST)
	 @ResponseBody
	public ChemoTheropyMaterDto getChemoProtocol(@RequestParam("letter") String letter) {
		 
		ChemoTheropyMaterDto ltChemoProtoDto = new  ChemoTheropyMaterDto();
		ltChemoProtoDto = patChemoService.getChemoProtocol(letter);	
		return ltChemoProtoDto;
	}
	
	/**
	 * @author Pooja @date 14_March-2018 these methods are used to map request
	 *         with services for Save Chemo Order Sheet
	 * **/
	@RequestMapping(value = "/savePatientOrderSheet", method = RequestMethod.POST)
	@ResponseBody
	public int saveOrderSheet(@RequestParam("patOrderSheetDetails") String orderSheet,HttpServletRequest request) {
		
		int response=0;
		
		PatientChemoOrderSheetDto orderSheetDtoObj = (PatientChemoOrderSheetDto) ConfigUIJSONUtility
				.getObjectFromJSON(orderSheet, PatientChemoOrderSheetDto.class);
		
		response = patChemoService.saveOrderSheet(orderSheetDtoObj.getLstPatChemoOrderSheetdetials().get(0), request);
		return response;	 
	}
	
	/**
	 * @author Pooja @date 14_March-2018 these methods are used to map request
	 *         with services for fetch Chemo Order Sheet
	 * **/
	@RequestMapping(value = "/getChemoOrderSheet", method = RequestMethod.POST)
	public @ResponseBody
	PatientChemoOrderSheetDto getPatChemoOrderSheet(@RequestParam("callFrom") String callFrom,PatientChemoOrderSheetDto patOrderSheetDto, HttpServletRequest request) {
		List<PatientChemoOrderSheetDto> ltPatOrderDto = new ArrayList<PatientChemoOrderSheetDto>();
		ltPatOrderDto = patChemoService.getPatientChemoOrderSheet(callFrom,patOrderSheetDto,request);
		PatientChemoOrderSheetDto obj=new PatientChemoOrderSheetDto();
		obj.setLstPatChemoOrderSheetdetials(ltPatOrderDto);
		return obj;
	}
	
	/**
	 * @author Pooja @date 14_March-2018 these methods are used to map request
	 *         with services for Update Chemo Order Sheet
	 * **/
	@RequestMapping(value = "/updateChemoOrderSheet", method = RequestMethod.POST)
	@ResponseBody
	public int updateOrderSheet(@RequestParam("treatId") int tid,
			@RequestParam("OrderString") String orderString,
			@RequestParam("chemoDt") String date,			
			HttpServletRequest request) {
		
	    
	    java.sql.Timestamp  fromTimestamp = new  java.sql.Timestamp(new java.util.Date().getTime());
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		int response=0;
		
		response = patChemoService.updateOrderSheet(fromTimestamp,userId,tid, orderString, date, request);
		return response;	 
	}
	
	/**
	 * @author Pooja @date 17_March-2018 
	 *         fetch All Care Advice data For DS print  
	 * **/
	@RequestMapping(value = "/getPatientCareAdvices1", method = RequestMethod.POST)
	public @ResponseBody
	List<PatientCareAdvicesDto> getPatCareAdvices2(int Treat) {
		List<PatientCareAdvicesDto> ltPatCareAdvDto = new ArrayList<PatientCareAdvicesDto>();
		
		ltPatCareAdvDto = patChemoService.getPatCareAdvices2(Treat);
		
		return ltPatCareAdvDto;
	}

	/**
	 * @author Pooja @date 17_March-2018 
	 *         fetch All Chemo records Of patient for DS Print 
	 * **/
	@RequestMapping(value = "/getPatientChemoAll", method = RequestMethod.POST)
	public @ResponseBody
	List<PatientChemoDto>getPatChemoTherapyAll(int treatmentId, String callFrom, String date) {
		List<PatientChemoDto> ltPatChemoDto = new ArrayList<PatientChemoDto>();
		ltPatChemoDto = patChemoService.getPatientChemoAll(treatmentId, callFrom,date);
		
		return ltPatChemoDto;
	}
	
	/**
	 * @author Pooja @date 17_March-2018 
	 *         fetch All Chemo order sheet Of patient for Transaction Print 
	 * **/
	@RequestMapping(value = "/getOrderSheetAll", method = RequestMethod.POST)
	public @ResponseBody
	List<PatientChemoOrderSheetDto>getOrderSheetAll(int treatmentId) {
		List<PatientChemoOrderSheetDto> ltOrderSheetDto = new ArrayList<PatientChemoOrderSheetDto>();
		ltOrderSheetDto = patChemoService.getOrderSheetAll(treatmentId);
		
		return ltOrderSheetDto;
	}
}
