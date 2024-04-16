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


import com.hms.ehat.dto.LaundryLinonProcessDto;
import com.hms.ehat.dto.LaundryLinonSubDeptDto;
import com.hms.ehat.dto.ProcessCsdDto;
import com.hms.ehat.service.LaundryLinonService;

@Controller
@RequestMapping(value ="/laundrylinon")
public class LaundryLinonController {
	
	@Autowired
	LaundryLinonService llService;
	
	
	/*************************************************************************************
	 * @author Tarique Aalam 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/saveProcessingrecords", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateProcessingMaster(LaundryLinonProcessDto procDto,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = llService.saveOrUpdateProcessingMaster(procDto, request);
		

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Short Name OR Full Name Allready exist"
						: "Network Error!!!"));
	
	}

	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/fetchProcessMasterList", method = RequestMethod.POST)
	public @ResponseBody
	LaundryLinonProcessDto getProcessingMasterData() {
		List<LaundryLinonProcessDto> listPro = new ArrayList<LaundryLinonProcessDto>();
		listPro = llService.getProcessingMasterData();	
		LaundryLinonProcessDto obj=new LaundryLinonProcessDto();
		obj.setListPro(listPro);	
		return obj;
	}
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: to delete record
	 * 
	 * ***********************************************************************************/	
	@RequestMapping(value = "/deleteProcessyRecord", method = RequestMethod.POST)
	public @ResponseBody
	String deleteProcessyRecord(@RequestParam("processId") Integer processId,
			HttpServletRequest request) {
				boolean response = llService.deleteProcessyRecord(processId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Occured";
		}
		return msg;
	}
	
	
	/*************************************************************************************
	 * @author Tarique Aalam 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/saveSubDeptRecords", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateSubDeptMaster(LaundryLinonSubDeptDto subDepDto,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = llService.saveOrUpdateSubDeptMaster(subDepDto, request);
		

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Short Name OR Full Name Allready exist"
						: "Network Error!!!"));
	
	}
	
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/fetchSubDeptMasterList", method = RequestMethod.POST)
	public @ResponseBody
	LaundryLinonSubDeptDto getSubMasterMasterData() {
		List<LaundryLinonSubDeptDto> listSubDep = new ArrayList<LaundryLinonSubDeptDto>();
		listSubDep = llService.getSubMasterMasterData();	
		LaundryLinonSubDeptDto obj=new LaundryLinonSubDeptDto();
		obj.setListSubDep(listSubDep);	
		return obj;
	}
	
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: to delete record
	 * 
	 * ***********************************************************************************/	
	@RequestMapping(value = "/deleteSubDeptRecord", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSubDeptRecord(@RequestParam("subDeptId") Integer subDeptId,
			HttpServletRequest request) {
				boolean response = llService.deleteSubDeptRecord(subDeptId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Occured";
		}
		return msg;
	}
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: to search record
	 * 
	 * ***********************************************************************************/		
	@RequestMapping(value = "/autoSuggestionForProcess", method = RequestMethod.POST)
	public @ResponseBody
	LaundryLinonProcessDto autoSuggestionForProcess(@RequestParam String letter
			) {
		List<LaundryLinonProcessDto> ltProc = new ArrayList<LaundryLinonProcessDto>();
		ltProc = llService.autoSuggestionForProcess(letter);
		LaundryLinonProcessDto obj = new LaundryLinonProcessDto();
		obj.setListPro(ltProc);
		return obj;
	}
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: to search record
	 * 
	 * ***********************************************************************************/		
	@RequestMapping(value = "/autoSuggestionForSubDept", method = RequestMethod.POST)
	public @ResponseBody
	LaundryLinonSubDeptDto autoSuggestionForSubDept(@RequestParam String letter
			) {
		List<LaundryLinonSubDeptDto> ltSub = new ArrayList<LaundryLinonSubDeptDto>();
		ltSub = llService.autoSuggestionForSubDept(letter);
		LaundryLinonSubDeptDto obj = new LaundryLinonSubDeptDto();
		obj.setListSubDep(ltSub);
		return obj;
	}
	
	
	
	/*************************************************************************************
	 * @these methods are used to map request
	 *  with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/saveProcessingrecordsCsd", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateProcessingMasterCsd(ProcessCsdDto procDto,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = llService.saveOrUpdateProcessingMasterCsd(procDto, request);
		

		return ((response == 1) ? "Saved Successfully"
				: (response == 2) ? "Updated Successfully"
						: ((response == 3) ? "Short Name OR Full Name Allready exist"
						: "Network Error!!!"));
	
	}
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	@RequestMapping(value = "/fetchProcessMasterListCsd", method = RequestMethod.POST)
	public @ResponseBody
	ProcessCsdDto getProcessingMasterDataCsd() {
		List<ProcessCsdDto> listPro = new ArrayList<ProcessCsdDto>();
		listPro = llService.getProcessingMasterDataCsd();	
		ProcessCsdDto obj=new ProcessCsdDto();
		obj.setListPro(listPro);	
		return obj;
	}
	
	
	/************************************************************************************
	 * @author Badrinath Wagh
	 * @CodeFor: to search record
	 * 
	 * ***********************************************************************************/		
	@RequestMapping(value = "/autoSuggestionForProcessCsd", method = RequestMethod.POST)
	public @ResponseBody
	ProcessCsdDto autoSuggestionForProcessCsd(@RequestParam String letter
			) {
		List<ProcessCsdDto> ltProc = new ArrayList<ProcessCsdDto>();
		ltProc = llService.autoSuggestionForProcessCsd(letter);
		ProcessCsdDto obj = new ProcessCsdDto();
		obj.setListPro(ltProc);
		return obj;
	}
	
	
	
	/************************************************************************************
	 * @author Tarique Aalam 
	 * @date 13_02_2018 
	 * @CodeFor: to delete record
	 * 
	 * ***********************************************************************************/	
	@RequestMapping(value = "/deleteProcessyRecordCsd", method = RequestMethod.POST)
	public @ResponseBody
	String deleteProcessyRecordCsd(@RequestParam("processId") Integer processId,
			HttpServletRequest request) {
				boolean response = llService.deleteProcessyRecordCsd(processId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Occured";
		}
		return msg;
	}
	
}
