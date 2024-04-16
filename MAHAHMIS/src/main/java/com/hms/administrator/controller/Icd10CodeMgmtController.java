package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.service.ICD10CodeMgmtService;
import com.hms.administrator.dto.ICD10_L;

@Controller 
@RequestMapping(value="/admin")
public class Icd10CodeMgmtController {
	static Logger log=Logger.getLogger(Icd10CodeMgmtController.class.getName());
	@Autowired
	ICD10CodeMgmtService  icd10service;
	
	@RequestMapping(value = "/saveicddiagnosisLevel1", method = RequestMethod.POST)
	@ResponseBody
	public int saveICDDiagnosisLevel1(ICD10_L iobj,HttpServletRequest request) {
		log.info("saveICDDiagnosisLevel1..");

		int response = icd10service.saveICDDiagnosisLevel1(iobj, request);
	      log.debug("saveICDDiagnosisLevel1....."+response);

		return response;	
	}
	
	@RequestMapping(value = "/fetchicd10level1", method = RequestMethod.GET)
	public @ResponseBody
	ICD10_L fetchICD10Level1(@RequestParam("unitId") Integer unitId,HttpServletRequest request) {
		log.info("fetchicd10level1..");

		List<ICD10_L> lsticd10 = new ArrayList<ICD10_L>();
		lsticd10 = icd10service.fetchICD10Level1(unitId,request);
	      log.debug("fetchicd10level1....."+lsticd10);
	      ICD10_L obj = new ICD10_L();
		obj.setIcd10_L_List(lsticd10);
		return obj;
	}	

	@RequestMapping(value = "/editIcd10codemgmt", method = RequestMethod.GET)
	public @ResponseBody
	ICD10_L editIcd10CodeMgmt(@RequestParam("icdId") Integer icdId) {
		log.info("editIcd10codemgmt..");
		ICD10_L obj = new ICD10_L();
		obj = icd10service.editIcd10CodeMgmt(icdId);
		 log.debug("editIcd10codemgmt....."+obj);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteicd10codemgmt", method = RequestMethod.POST)
	public @ResponseBody
	String deleteIcd10CodeMgmt(@RequestParam("icdId") Integer icdId,HttpServletRequest request) {
		log.info("deleteicd10codemgmt..");
		boolean response = icd10service.deleteIcd10CodeMgmt(icdId, request);
	      log.debug("deleteicd10codemgmt....."+response);

				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network Issue";
		}
		return msg;
	}	

	@RequestMapping(value = "/icd10Codemgmtautosuggestion", method = RequestMethod.GET)
	public @ResponseBody
	ICD10_L icd10CodeMgmtAutoSuggestion(@RequestParam("icdCode") String icdCode,@RequestParam("icdFlag") String icdFlag,HttpServletRequest request) {
		log.info("icd10CodeMgmtAutoSuggestion..");

		List<ICD10_L> lsticd10 = new ArrayList<ICD10_L>();
		lsticd10 = icd10service.icd10CodeMgmtAutoSuggestion(icdCode,icdFlag);
	      log.debug("icd10CodeMgmtAutoSuggestion....."+lsticd10);
	      ICD10_L obj = new ICD10_L();
		obj.setIcd10_L_List(lsticd10);
		return obj;
	}	

	
	@RequestMapping(value = "/getICD10ListByType", method = RequestMethod.GET)
	public @ResponseBody
	ICD10_L getICD10ListByType(@RequestParam("type") int type,HttpServletRequest request) {
		log.info("getICD10ListByType..");

		List<ICD10_L> lsticd10 = new ArrayList<ICD10_L>();
		lsticd10 = icd10service.getICD10ListByType(type);
	      log.debug("getICD10ListByType....."+lsticd10);
	      ICD10_L obj = new ICD10_L();
		obj.setIcd10_L_List(lsticd10);
		return obj;
	}	
	
	
	@RequestMapping(value = "/ic10AutoSuggByType", method = RequestMethod.GET)
	public @ResponseBody
	ICD10_L ic10AutoSuggByType(@RequestParam("type") int type,@RequestParam("searchText") String searchText,HttpServletRequest request) {
		log.info("ic10AutoSuggByType..");

		List<ICD10_L> lsticd10 = new ArrayList<ICD10_L>();
		lsticd10 = icd10service.ic10AutoSuggByType(type, searchText);
	      log.debug("ic10AutoSuggByType....."+lsticd10);
	      ICD10_L obj = new ICD10_L();
		obj.setIcd10_L_List(lsticd10);
		return obj;
	}	
	
	@RequestMapping(value = "/deleteICD10", method = RequestMethod.GET)
	public @ResponseBody
	int  deleteICD10(@RequestParam("id") String  id,@RequestParam("userId") int userId,HttpServletRequest request) {
		log.info("deleteICD10..");

		int res=0;
		res = icd10service.deleteICD10(id, userId);
	      log.debug("deleteICD10....."+res);
	    
		
		return res;
	}	


}
