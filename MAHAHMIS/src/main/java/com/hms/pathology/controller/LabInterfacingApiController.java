package com.hms.pathology.controller;

import java.io.IOException;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.hms.api.controller.APIDaoImpl;
import com.hms.pathology.dto.LabInterfaceDto;
import com.hms.pathology.service.LabInterfacingApiService;
import com.hms.utility.ApplicationContextUtils;

@RestController
@EnableWebMvc
@RequestMapping(value = "/labInterfacing")
public class LabInterfacingApiController {

	
	@Autowired
	LabInterfacingApiService labservice;
	
	JSONParser parser = new JSONParser();
	
	//APIDaoImpl apiDaoImpl = (ApplicationContextUtils.getApplicationContext()).getBean(APIDaoImpl.class);

	@Autowired
	APIDaoImpl apiDaoImpl;
	
	

	/********************************************************************
	 * @author Ajay Khandare
	 * @since 03-03-2020
	 * @comment This method is used to get list of sampleId wise TestList 
	 **********************************************************************/	
	@RequestMapping(value = "/getTestDetailsFromSampleId/{sampleId}", method = RequestMethod.POST)
    public ResponseEntity<Object> getTestDetailsFromSampleId(@PathVariable("sampleId") Integer sampleId) {
        Object appointment = labservice.getTestDetailsFromSampleId(sampleId);
        return new ResponseEntity<Object>(appointment, HttpStatus.OK);

    }
	

	/********************************************************************
	 * @author Ajay Khandare
	 * @since 03-03-2020
	 * @comment This method is used to update record from machine calling
	 **********************************************************************/	
	@RequestMapping(value = "/savemachinevaluesnew1", method = RequestMethod.POST)
    public ResponseEntity<String> savemachinevalues(List<LabInterfaceDto> resultlist) {
		
		JSONArray jsonArray = new JSONArray();
		Boolean flag = false;
		
		try {
			
			//jsonArray = (org.json.simple.JSONArray) parser.parse(content);
			//stem.err.println("====================>>>>>>>>"+jsonArray.toJSONString());
			flag = labservice.savemachinevalues(jsonArray);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String output = "Data updation success";
		String output1 = "Data updation failed";
		if(flag){
	        return new ResponseEntity<String>(output, HttpStatus.OK);
		}else{
	         return new ResponseEntity<String>(output1, HttpStatus.OK);
		}
	}
	
	/********************************************************
	* @author	: Ajay Khandare
	* @date     : 22 Feb 2021
	* @codeFor	: Get save machine values details 
	*********************************************************/
	//@POST
	//@Consumes("application/json")
	//@Path("/savemachinevaluesnew")
	@RequestMapping(value = "/savemachinevaluesnew", method = RequestMethod.POST)
	public ResponseEntity<String> saveMachineValuesnew(@RequestBody String content) throws IOException {
		
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
	        return new ResponseEntity<String>(output, HttpStatus.OK);
		}else{
			return new ResponseEntity<String>(output1, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	 
	
}
