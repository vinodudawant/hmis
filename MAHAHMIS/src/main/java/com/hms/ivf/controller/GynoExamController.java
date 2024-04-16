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

import com.hms.ivf.dto.GynoExamDto;
import com.hms.ivf.service.GynaecologicalexamService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value= "/gynExam")
public class GynoExamController {
	@Autowired
	GynaecologicalexamService gynexamService;
	
	
	@RequestMapping(value = "/savegynExamHistory", method = RequestMethod.POST)
	@ResponseBody	
	public String saveGynaecologicalexamHistory22(@RequestParam("GynExamDtoDetails") String GynExamDtoDetails ,HttpServletRequest request ) {
			
			
			String response="";
			int result = 0;
			
			GynoExamDto objDto = (GynoExamDto) ConfigUIJSONUtility
					.getObjectFromJSON(GynExamDtoDetails, GynoExamDto.class);
			
			result=	gynexamService.saveGynExamHistory11(objDto.getListGynExam(), request);
			
			if(result==1){
				response = "Data Inserted..";
			}else if(result==2){
				
				response = "Data Updated...";
			}else{
				response = "oops there is some problem..";
			}
			//System.out.println("response.........."+response);
		return response;
 }
	
	
	@RequestMapping(value="/fetchGynoexamHistory",method = RequestMethod.POST )
	@ResponseBody
	public GynoExamDto fetchExamGynaecologicalHistoryData(@RequestParam("pid") String pid,
			@RequestParam("tid") String tid)
	
	{
		
	    int patientId=Integer.parseInt(pid);
		int treatmentId=Integer.parseInt(tid);
		
		List<GynoExamDto> listGynData=new ArrayList<GynoExamDto>();
		
		listGynData=gynexamService.fetchGynExamHisPrvData(patientId, treatmentId);
	 
		GynoExamDto obj = new GynoExamDto();
		obj.setListGynExam(listGynData); 
		
		return obj;		
	}

	
	
 @RequestMapping(value = "/getListForGynStudy", method = RequestMethod.GET)
  
  @ResponseBody public GynoExamDto getListForGynStudy(@RequestParam("patientId") String patientId) {
  
  GynoExamDto obj =new GynoExamDto();
  
  List<GynoExamDto> list = gynexamService.getlistGynExam(patientId);
  
  obj.setListGynExam(list);
  
  return obj;
  }
 
 
	
 
 
 @RequestMapping(value = "/deleteRecordGynStudyBasicInfo", method = RequestMethod.GET)
	@ResponseBody	
	public String deleteRecordGynStudyBasicInfo(@RequestParam("ovampickupslaveids") String ovampickupslaveids,@RequestParam("userId") int userId) {
		
		String msg = gynexamService.deleteRecordGynStudyBasicInfo(ovampickupslaveids, userId);
		return msg;
	}
  
  }



 