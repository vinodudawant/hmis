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
import com.hms.ehat.dto.DeptMasterDto;
import com.hms.ehat.service.DeptService;

@Controller
@RequestMapping(value = "/dept")
public class DeptController {

	
	@Autowired
	DeptService deptService;

	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/viewAllDeptList", method = RequestMethod.POST)
	public @ResponseBody
	 	DeptMasterDto getDeptMasterList(HttpServletRequest request) {
		List<DeptMasterDto> ltDeptMasters = new ArrayList<DeptMasterDto>();
		ltDeptMasters = deptService.getAllDeptLst(request);
		DeptMasterDto obj = new DeptMasterDto();
		obj.setLstDepts(ltDeptMasters);
		return obj;
	}	
	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/

	@RequestMapping(value = "/autoSuggestionDeptNames", method = RequestMethod.POST)
	 @ResponseBody
	public DeptMasterDto getAllDeptList(@RequestParam("letter") String letter) {
		 
		 DeptMasterDto ltDeptMasterDto = new  DeptMasterDto();
		ltDeptMasterDto = deptService.getAutoSuggestionDeptNames(letter);	
		return ltDeptMasterDto;
	}
	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/saveDept", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateChargesMaster(DeptMasterDto deptMaster,
			HttpServletRequest request) {
		
		int response = deptService.saveOrUpdateDept(deptMaster, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	 
	}	
	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/deleteDept", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMaster(@RequestParam("dId") Integer deptId,HttpServletRequest request) {
		boolean response = deptService.deleteDept(deptId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
		
		
		 
	}
	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/getDeptById", method = RequestMethod.GET)
	public @ResponseBody
	List<DeptMasterDto> getDeptById(
		@RequestParam("deptId") Integer deptId) {
		List<DeptMasterDto> ltDeptMasterDto = new ArrayList<DeptMasterDto>();
		ltDeptMasterDto = deptService.getDeptById(deptId);
		return ltDeptMasterDto;
	}
	/**
	 * End of Department masters  methods
	 * **/


	/************************************************************************************
	 * @author Kishor Lokhande @date 22_May_2017 these methods are used to map request
	 * with services with Dept master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/getdeptCount", method = RequestMethod.POST)
	public @ResponseBody
	Long getDeptCount() {
		System.out.println("in controller");
		Long totaleCount = deptService.getDeptCount();	
		
		
		return totaleCount;
	}	

	/**
	 * @author Kishor @date 29_Nov_2017 these methods are used to Map request
	 *         with services with Department master All methods
	 * **/
	@RequestMapping(value = "/viewAllDeptListAll", method = RequestMethod.POST)
	public @ResponseBody
	 	DeptMasterDto getDeptMasterListAll(HttpServletRequest request) {
		List<DeptMasterDto> ltDeptMasters = new ArrayList<DeptMasterDto>();
		ltDeptMasters = deptService.getDeptMasterListAll(request);
		DeptMasterDto obj = new DeptMasterDto();
		obj.setLstDepts(ltDeptMasters);
		return obj;
	}	
	
}
