package com.hms.ivf.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ivf.dto.GynHistoryDto;
import com.hms.ivf.service.GynaecologicalService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value= "/gynHistory")
public class GynaecologicalController {
	
	@Autowired
	GynaecologicalService gynService;
	
	
	@RequestMapping(value = "/savegynHistory", method = RequestMethod.POST)
	@ResponseBody	
	public  String saveGynaecologicalHistory22(@RequestParam("GynHistoryDtoDetails") String GynHistoryDtoDetails ,HttpServletRequest request) {
		
		String response="";
		int result = 0;
		
		GynHistoryDto objDto = (GynHistoryDto) ConfigUIJSONUtility
				.getObjectFromJSON(GynHistoryDtoDetails, GynHistoryDto.class);
		
		result=	gynService.saveGynHistory11(objDto.getListGyn().get(0), request);
		//System.out.println(".....result...in controller"+result);
		if(result==1){
			response = "Data Inserted..";
		}else if(result==2){
			
			response = "Data Updated...";
		}else{
			response = "oops there is some problem..";
		}
		
	return response;
	}
	
	
	@RequestMapping(value = "/fetchGynaecologicalDetails", method = RequestMethod.POST)
	@ResponseBody
	 public GynHistoryDto getAllGynecologicalList() {
		GynHistoryDto ltgynDto = new GynHistoryDto();
		ltgynDto = gynService.getAllGynaecologicalList();
     
		return ltgynDto;
	}
	
	@RequestMapping(value="/fetchGynaecologicalHistory",method = RequestMethod.POST )
	@ResponseBody
	public GynHistoryDto fetchGynaecologicalHistoryData(@RequestParam("pid") String pid,
			@RequestParam("tid11") String tid)
	{
		int patientId=Integer.parseInt(pid);
		int treatmentId=Integer.parseInt(tid);
		
		List<GynHistoryDto> listGynData=new ArrayList<GynHistoryDto>();
		
		listGynData=gynService.fetchGynHisData(patientId, treatmentId);
	
		GynHistoryDto obj = new GynHistoryDto();
		obj.setListGyn(listGynData);
		
		return obj;		
	}
	

}
