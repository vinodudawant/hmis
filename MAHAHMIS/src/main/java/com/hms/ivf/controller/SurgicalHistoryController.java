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

import com.hms.ivf.dto.SurgicalHistoryDto;
import com.hms.ivf.service.SurgicalHistoryService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value= "/SurgicalHistory")
public class SurgicalHistoryController {
	
	@Autowired
	SurgicalHistoryService surgicalService;

	
	@RequestMapping(value = "/saveSurgicalHistory", method = RequestMethod.POST)
	@ResponseBody	
	public  String saveSurgicalHistory(@RequestParam("SurHisDtoDetails") String SurHisDtoDetails ,HttpServletRequest request ) {
		
		String response="";
		int result = 0;
		
		SurgicalHistoryDto objDto=(SurgicalHistoryDto) ConfigUIJSONUtility.getObjectFromJSON(SurHisDtoDetails, SurgicalHistoryDto.class);
	
		result=	surgicalService.saveSurgicalHistory(objDto.getListSurgicalHis(), request);
		
		if(result==1){
			response = "Data Inserted..";
		}else if(result==2){
			
			response = "Data Updated...";
		}else{
			response = "oops there is some problem..";
		}
		
		return response;
	}
	


	@RequestMapping(value = "/fetchSurgicalHistory", method = RequestMethod.POST)
	@ResponseBody
	public SurgicalHistoryDto fetchSurgicalHistoryData(@RequestParam("pid") int pid,
			@RequestParam("tid") int tid,@RequestParam("callform") String callform) {

		//int patientId = Integer.parseInt(pid);
		//int treatmentId = Integer.parseInt(tid);
         System.out.println("  "+pid+"   "+tid+" "+callform);
		List<SurgicalHistoryDto> listSurgicalData = new ArrayList<SurgicalHistoryDto>();

		listSurgicalData = surgicalService.fetchSurgicalHistoryData(pid, tid,callform);

		SurgicalHistoryDto obj = new SurgicalHistoryDto();
		obj.setListSurgicalHis(listSurgicalData);

		return obj;
	}
	
	@RequestMapping(value = "/deleteRecordSurgicalHistoryInfo", method = RequestMethod.GET)
	@ResponseBody	
	public String deleteRecordSurgicalHistoryInfo(@RequestParam("ovampickupslaveids") String ovampickupslaveids,@RequestParam("userId") int userId) {
		System.out.println("deleteRecordSurgicalHistoryInfodeleteRecordSurgicalHistoryInfo.....ovampickupslaveids..userId"+ovampickupslaveids+" ;;;;;"+userId);
		String msg = surgicalService.deleteRecordSurgicalHistoryInfo(ovampickupslaveids, userId);
		return msg;
	}
	
	@RequestMapping(value = "/getListForSurgicalHistory", method = RequestMethod.GET)
	  
	  @ResponseBody public SurgicalHistoryDto getListForSurgicalHistory(@RequestParam("patientId") String patientId) {
	  
		SurgicalHistoryDto obj =new SurgicalHistoryDto();
	  
	  List<SurgicalHistoryDto> list = surgicalService.getListForSurgicalHistory(patientId);
	  
	  obj.setListSurgicalHis(list);   
	  
	  return obj;
	  }

}