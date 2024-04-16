package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DocTypDto;
import com.hms.ehat.service.DocTypService;
@Controller  
@RequestMapping(value = "/doctorType")
public class DocTypMasterController {
	@Autowired
	DocTypService docTypService;
	
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:savedoctortypemaster
	 ***********/
	@RequestMapping(value = "/saveDoctorTypeMaster", method = RequestMethod.POST)
	@ResponseBody
	public String SaveDoctorTypeMaster(DocTypDto docTypDto,
			HttpServletRequest request) {
		
/*		System.out.println("in controler");
*/		
		int response = docTypService.saveDoctorTypeMaster(docTypDto, request);
		String msg = "";
		if (response == 1) {
			msg = "Saved sucessfully";
		} else {
			msg = "error occured";
		}
		return msg;
	}
	
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:fetchDoctypeMasterList
	 ***********/
	
	@RequestMapping(value = "/getchDoctypeMasterList", method = RequestMethod.POST)
	 @ResponseBody
	 public	DocTypDto fetchDoctypeMasterList() {
		List<DocTypDto> lstDocTyp = new ArrayList<DocTypDto>();
		lstDocTyp = docTypService.getDoctyp();
		
		DocTypDto obj = new DocTypDto();
		obj.setLstDocTyp(lstDocTyp);
		return obj;
	}
	
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:fetchDoctypeMasterList
	 ***********/
	
	@RequestMapping(value = "/deleteDoctypMaster", method = RequestMethod.POST)
	public @ResponseBody
	String DeleteDoctypMaster(@RequestParam("doctypeId") Integer doctypeId, HttpServletRequest request) {
		System.out.println("in contrtole delect");
		String msg = "";
		if (docTypService.deleteDoctypMaster(doctypeId, request)==1) {
			msg = "Delete Sucessfully!";
		}else{
			
			msg="Network Issues!";	
			
		}
		return msg;
	}

	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:AutosuugestionDTM and search
	 ***********/
	
	@RequestMapping(value = "/autosuggDTM", method = RequestMethod.POST)
	 @ResponseBody
	 public	DocTypDto AutosuugestionDTM(@RequestParam("findingName") String findingName, HttpServletRequest request) {
		List<DocTypDto> lstDocTyp = new ArrayList<DocTypDto>();
		lstDocTyp = docTypService.getAutodetails( findingName);
		
		DocTypDto obj = new DocTypDto();
		obj.setLstDocTyp(lstDocTyp);
		return obj;
	}
	
}
