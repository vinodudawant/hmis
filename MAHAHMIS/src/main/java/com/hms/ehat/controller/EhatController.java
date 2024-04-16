package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.DeptMasterDto;

import com.hms.ehat.service.EhatService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
public class EhatController {

	@Autowired
	EhatService ehatService;

	/**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/viewChragesMaster", method = RequestMethod.GET)
	public ModelAndView getChargesMasterView() {
		ModelAndView modelAndView = new ModelAndView();
		modelAndView.addObject("charges", new ChargesMasterDto());

		List<ChargesMasterDto> ltChargesMasterDto = new ArrayList<ChargesMasterDto>();
		ltChargesMasterDto = ehatService.getCharges();
		modelAndView.addObject("ltChargesMasterDto", ltChargesMasterDto);

		modelAndView.setViewName("charges_master");
		return modelAndView;
	}

	*//**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/saveChragesMaster", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateChargesMaster(ChargesMasterDto chargesMaster,
			HttpServletRequest request) {
		
		System.out.println("code=-=-=-=-=->"+chargesMaster.getCodeName());
		
		boolean response = ehatService.saveOrUpdateCharges(chargesMaster, request);
		String msg = "";
		if (response == true) {
			msg = "Saved sucessfully";
		} else {
			msg = "error occured";
		}
		return msg;
	}

	*//**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/deleteChragesMaster", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteChargesMaster(@RequestParam("chargesId") Integer chargesId, HttpServletRequest request) {
		Boolean flag = false;
		if (ehatService.deleteCharges(chargesId, request)) {
			flag = true;
		}
		return flag;
	}

	*//**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/chargesMasterList", method = RequestMethod.POST)
	public @ResponseBody
	ChargesMasterDto getChargesMasterList() {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = ehatService.getAllCharges();
		ChargesMasterDto obj = new ChargesMasterDto();
		obj.setLstCharges(ltChargesMasters);
		return obj;
	}

	*//**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/allChargesMasterList", method = RequestMethod.GET)
	public @ResponseBody
	List<ChargesMasterDto> getAllChargesMasterList() {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = ehatService.getAllCharges();
		return ltChargesMasters;
	}

	*//**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/autoSuggestionChargesMasterNames", method = RequestMethod.GET)
	public @ResponseBody
	List<ChargesMasterDto> getAutoSuggestionChargesMasterNames(
			@RequestParam("letter") String letter) {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = ehatService.getAutoSuggestionChargesNames(letter);
		return ltChargesMasters;
	}

	*//**
	 * @author Bilal @date 16_May_2017 these methods are used to map request
	 *         with services with Charges master controller methods
	 * **//*
	@RequestMapping(value = "/getChargesMasterById", method = RequestMethod.GET)
	public @ResponseBody
	List<ChargesMasterDto> getChargesMasterById(
			@RequestParam("chargesId") Integer chargesId) {
		List<ChargesMasterDto> ltChargesMasters = new ArrayList<ChargesMasterDto>();
		ltChargesMasters = ehatService.getChargesById(chargesId);
		return ltChargesMasters;
	}
	*//**
	 * End of Charges master controller methods
	 * **//*
*/

	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/fetchDeptList", method = RequestMethod.POST)
	public @ResponseBody
	DeptMasterDto getAllDeptList() {
		List<DeptMasterDto> ltDeptMasterDto = new ArrayList<DeptMasterDto>();
		ltDeptMasterDto = ehatService.getAllDept();	
		DeptMasterDto objDept=new DeptMasterDto();
		objDept.setLstDepts(ltDeptMasterDto);
		//includeJSONResponseObject(ltDeptMasterDto, response);		
		return objDept;
	}
	

	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/savedept", method = RequestMethod.POST)
 	public @ResponseBody String saveModule(HttpServletRequest request) {
		//for current time & date and current login user id and ip address
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		String deptName=request.getParameter("deptName");	
		String deptCode=request.getParameter("deptCode");	
		DeptMasterDto objDept=new DeptMasterDto();
		objDept.setDeptName(deptName);	
		objDept.setCreatedBy(userId);
		objDept.setDeptCode(deptCode);	

		objDept.setCreatedDate(new java.util.Date());
		objDept.setCreatedDate(new java.util.Date());
		
		boolean response =ehatService.saveOrUpdateDept(objDept);
		String msg="";
		if(response==true){
			msg="Saved sucessfully";
		}else{
			msg="error occured";
		}
		return msg;
	}	
	
	

	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/deleteDept", method = RequestMethod.POST)
	public @ResponseBody
	Boolean deleteMaster(@RequestParam("dId") Integer deptId) {
		Boolean flag = false;
		if (ehatService.deleteDept(deptId)) {
			flag = true;
		}
		return flag;
	}

	@RequestMapping(value = "/deptList", method = RequestMethod.GET)
	public @ResponseBody
	List<DeptMasterDto> getCompaniesList() {
		List<DeptMasterDto> ltDeptMasterDto = new ArrayList<DeptMasterDto>();
		ltDeptMasterDto = ehatService.getDept();
		
		
		return ltDeptMasterDto;
	}	

	

	/**
	 * @author Sagar @date 16_May_2017 these methods are used to map request
	 *         with services with Department master methods
	 * **/
	@RequestMapping(value = "/autoSuggestionDeptNames", method = RequestMethod.GET)
	public @ResponseBody
	List<DeptMasterDto> getAutoSuggestionCompanyNames(
			@RequestParam("letter") String letter) {
		List<DeptMasterDto> ltDeptMasterDto = new ArrayList<DeptMasterDto>();
		ltDeptMasterDto = ehatService.getAutoSuggestionDeptNames(letter);
		return ltDeptMasterDto;
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
		ltDeptMasterDto = ehatService.getDeptById(deptId);
		return ltDeptMasterDto;
	}
	/**
	 * End of Department masters  methods
	 * **/


	
	
	
}
