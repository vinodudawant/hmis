package com.hms.ecogreenapi;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import groovy.transform.EqualsAndHashCode;

@Controller
@RequestMapping(value = "/ecogreen/api")
public class EcogreenItemController {
	 
	@Autowired
	EcogreenItemService service;
	
	@Autowired
	RestTemplate restTemplate;

	@RequestMapping(value = "saveItemData",method = RequestMethod.POST)
	ResponseEntity<String> saveItemMater() throws IOException {

		 HttpHeaders headers = new HttpHeaders();
		 //headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
		 headers.setContentType(MediaType.APPLICATION_JSON);
		 headers.set("X-csquare-api-key", "GRfox8WJqGv4njK8nCIZKGOq2tqUe26y+svT6IuHZ8o=");
		 headers.set("X-csquare-api-token", "-299006754bbe960");
		 
		 String body="{\r\n"
		 		+ "\"br_code\": \"000\",\r\n"
		 		+ "\"c2_code\": \"0P6000\",\r\n"
		 		+ "\"data\": {\r\n"
		 		+ "\"arugumentDate\":\"2023-01-02\", //yyyy-mm-dd\r\n"
		 		+ "\"index\": \"M_ITEM_MST\"\r\n"
		 		+ "}\r\n"
		 		+ "}";
		 
		 DataDto d1=new DataDto();
		 d1.setArugumentDate("2023-01-02");
		 d1.setIndex("M_ITEM_MST");
		 
		 EcogreenItemInputDto i1=new EcogreenItemInputDto();
		 i1.setBr_code("000");
		 i1.setC2_code("0P6000");
		 i1.setData(d1);
		 
		 ObjectMapper w=new ObjectMapper();
		 String s="";
		 try {
			 s=w.writeValueAsString(i1);
			
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// HttpEntity<String> entity = new HttpEntity<String>(body,headers);
		 HttpEntity<String> entity = new HttpEntity<String>(s,headers);

		// ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
		 ResponseEntity<String> responseEntity = restTemplate.exchange("https://qa-eg-eco.livc.in/eco/lifenity/fetch/0/25", HttpMethod.POST, entity, String.class);
		
		         String list = responseEntity.getBody();
		         List<EcogrrenItemDto> itmList=new ArrayList<>();
		         ObjectMapper mapper =new ObjectMapper();
		         try {
					EcogreenItemPayloadClass objp = mapper.readValue(list,EcogreenItemPayloadClass.class);
					
					itmList.addAll(objp.getPayloadJson().getRows());
				} catch (JsonMappingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (JsonProcessingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
		         
		     
		         try {
		     	
		     	EcogreenItemMasterDto mobj=new EcogreenItemMasterDto();
		     	//mobj.setLstEcogrrenItem(itmList);
		     int res=	service.saveEcoreenItemDetails(mobj);
		     String msg="";
		        if(res == 1) {
		        	msg="Data Save Successfully";
		        	 
		        	return new ResponseEntity<String>(msg,HttpStatus.OK);
		        }else {
		        	msg="Something Went Wrong";
		        	return new ResponseEntity<String>(msg,HttpStatus.INTERNAL_SERVER_ERROR);
		        }
		     	 
		         }catch (Exception e) {
					e.printStackTrace();
				}
				return responseEntity;
		
		
	 
	}
	
	@RequestMapping(value = "/getItemList/{masterId}")
	@ResponseBody
	EcogreenItemMasterDto getItemList(@PathVariable("masterId") int masterId){
		    
		return service.getItemList(masterId);
	}
	
	
	@RequestMapping(value = "saveItemMasterNew",method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<String> saveItemMaterNew() throws IOException {
		
		String saveItemMaterNew = service.saveItemMaterNew();
		String msg="";
		ResponseEntity<String> entity = new ResponseEntity<String>(saveItemMaterNew,HttpStatus.OK);
		if(saveItemMaterNew == "1") {
        	msg="Data Save Successfully";
        	 
        	return new ResponseEntity<String>(msg,HttpStatus.OK);
        }else {
        	msg="Something Went Wrong";
        	return new ResponseEntity<String>(msg,HttpStatus.INTERNAL_SERVER_ERROR);
        }
//		ResponseEntity<String> entity = new ResponseEntity<String>(saveItemMaterNew,HttpStatus.OK);
		
//		return entity;
	}
	
	
	@RequestMapping(value = "saveProductMasterNew",method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<String> saveProductMasterNew() throws IOException {
		
		String saveItemMaterNew = service.saveProductMasterNew();
		
//		ResponseEntity<String> entity = new ResponseEntity<String>(saveItemMaterNew,HttpStatus.OK);
		String msg="";
//		ResponseEntity<String> entity = new ResponseEntity<String>(saveItemMaterNew,HttpStatus.OK);
		if(saveItemMaterNew == "1") {
        	msg="Data Save Successfully";
        	 
        	return new ResponseEntity<String>(msg,HttpStatus.OK);
        }else {
        	msg="Something Went Wrong";
        	return new ResponseEntity<String>(msg,HttpStatus.INTERNAL_SERVER_ERROR);
        }
		
//		return entity;
		
	}
	
	@RequestMapping(value = "addNewProducts",method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<Object> addNewProducts(@RequestBody ItemMstGenericResponse[] genericRequest) throws IOException {
		
		PharmaIndentErrorDTO eObj = new PharmaIndentErrorDTO();
		String saveItemMaterNew = service.addNewProducts(genericRequest);
		String msg="";
		if(saveItemMaterNew == "1") {
			
			eObj.setMsg("Data Save Successfully");
        	eObj.setStatus(HttpStatus.OK);
			 // Get the current date
	        LocalDate currentDate = LocalDate.now();
	        // Define the desired date format
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        // Format the current date
	        String currentDate1 = currentDate.format(formatter);
			eObj.setDate(currentDate1);
        	return new ResponseEntity<Object>(eObj,HttpStatus.OK);
        	//msg="Data Save Successfully";
        	 
        	//return new ResponseEntity<String>(msg,HttpStatus.OK);
        }else {
        	
        	eObj.setMsg("Something Went Wrong");
        	eObj.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			 // Get the current date
	        LocalDate currentDate = LocalDate.now();
	        // Define the desired date format
	        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	        // Format the current date
	        String currentDate1 = currentDate.format(formatter);
			eObj.setDate(currentDate1);
        	return new ResponseEntity<Object>(eObj,HttpStatus.INTERNAL_SERVER_ERROR);
        }
//		return entity;
		
	}
	
	
	@RequestMapping(value = "getIndentDetails",method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<Object> getIndentDetails(@RequestParam("fromDate") String fromDate,@RequestParam("toDate") String toDate) throws IOException {
		PharamIndentResponseDTO obj =new PharamIndentResponseDTO();
		PharmaIndentErrorDTO eObj=new PharmaIndentErrorDTO();
		if(!fromDate.equalsIgnoreCase(null) && !fromDate.equalsIgnoreCase("null") && !toDate.equalsIgnoreCase(null) && !toDate.equalsIgnoreCase("null")) {
		 obj = service.getIndentDetails(fromDate, toDate);
				
		         if(obj.getLstItemDetails().size() > 0 ) {
		        	 
			        	return new ResponseEntity<Object>(obj,HttpStatus.OK);
			        	
			        }else {
			        	eObj.setMsg("Record Not Found...");
			        	eObj.setStatus(HttpStatus.OK);
						 // Get the current date
				        LocalDate currentDate = LocalDate.now();
				        // Define the desired date format
				        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
				        // Format the current date
				        String currentDate1 = currentDate.format(formatter);
						eObj.setDate(currentDate1);
			        	return new ResponseEntity<Object>(eObj,HttpStatus.OK);
			           }
		}else {
			       if(fromDate.equalsIgnoreCase("null")  && toDate.equalsIgnoreCase("null") )
					eObj.setMsg("From Date or To Date Should Not be null.. ");
					else if(fromDate.equalsIgnoreCase(null) || fromDate.equalsIgnoreCase("null"))
						eObj.setMsg("From Date  Should Not be null.. ");
					else if((toDate.equalsIgnoreCase(null) || toDate.equalsIgnoreCase("null")))
						eObj.setMsg("To Date  Should Not be null.. ");
					
					
					eObj.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
					 // Get the current date
			        LocalDate currentDate = LocalDate.now();
			        // Define the desired date format
			        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			        // Format the current date
			        String currentDate1 = currentDate.format(formatter);
					eObj.setDate(currentDate1);
					return new ResponseEntity<Object>(eObj,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		
	}
	
	
	@RequestMapping(value = "updateIndentStatus",method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<Object> updateIndentStatus(@RequestBody PharmaUpdateIndentPayload obj) throws IOException {
		PharmaIndentErrorDTO eObj=new PharmaIndentErrorDTO();
		 int res = service.updateIndentStatus(obj);
		    if(res == 1) {
		    	eObj.setMsg("Record Updated Successfully");
		    	eObj.setStatus(HttpStatus.OK);
				 // Get the current date
		        LocalDate currentDate = LocalDate.now();
		        // Define the desired date format
		        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		        // Format the current date
		        String currentDate1 = currentDate.format(formatter);
				eObj.setDate(currentDate1);
				return new ResponseEntity<Object>(eObj,HttpStatus.OK);
		    }else {

		    	eObj.setMsg("Something Went Wrong");
		    	eObj.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
				 // Get the current date
		        LocalDate currentDate = LocalDate.now();
		        // Define the desired date format
		        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		        // Format the current date
		        String currentDate1 = currentDate.format(formatter);
				eObj.setDate(currentDate1);
				 return new ResponseEntity<Object>(eObj,HttpStatus.INTERNAL_SERVER_ERROR);
		    }
		   
	}
	
	@RequestMapping(value = "getStockDetails",method = RequestMethod.GET)
	@ResponseBody
	ResponseEntity<PharmaSaleOrderMasterDTO>  getStockDetails() {
		PharmaSaleOrderMasterDTO obj= service.getStockDetails();
		 
		return new ResponseEntity<PharmaSaleOrderMasterDTO>(obj,HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "fechStock",method = RequestMethod.GET)
	@ResponseBody
	ResponseEntity<Object>  fechStock() {
		
		 
		return service.fechStock();
		
	}
	@RequestMapping(value = "sendPrescptionToEcogreen",method = RequestMethod.POST)
	@ResponseBody
	ResponseEntity<PharmaIndentErrorDTO> sendPrescptionToEcogreen( @RequestParam("prescriptionId") String prescriptionId) {
		return service.sendPrescptionToEcogreen(prescriptionId);
	}
}
