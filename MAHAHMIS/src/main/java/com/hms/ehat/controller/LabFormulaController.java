package com.hms.ehat.controller;

import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.dto.LabFormulaDTO;
import com.hms.ehat.dto.LabFormulaHeadings;
import com.hms.ehat.service.LabFormulaService;

@RestController
@RequestMapping(value = "labformula")
public class LabFormulaController {

	static Logger log=Logger.getLogger(LabFormulaController.class.getName());
	
	@Autowired
	LabFormulaService labFormulaService;
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is save lab formula.
	 **********************************************************************/
	@RequestMapping(value = "/savelabformula", method = RequestMethod.POST)
	public String saveLabFormula(LabFormulaDTO labFormulaDTO, HttpServletRequest request){
		log.info("saveLabFormula()...start");
		String result = labFormulaService.saveLabFormula(labFormulaDTO, request);
		log.info("saveLabFormula()...end");
		return result;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is to get lab formula by id.
	 **********************************************************************/
	@RequestMapping(value = "/getlabformulabyid/{labFormId}", method = RequestMethod.GET)
	public LabFormulaDTO getLabFormulaById(@PathVariable("labFormId") int labFormulaId){
		log.info("getLabFormulaById()...start");
		LabFormulaDTO obj = labFormulaService.getLabFormulaById(labFormulaId);
		log.info("getLabFormulaById()...end");
		return obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is delete lab formula.
	 **********************************************************************/
	@RequestMapping(value = "/deletelabformula/{labFormId}", method = RequestMethod.DELETE)
	public boolean deleteLabFormula(@PathVariable("labFormId") int labFormulaId, HttpServletRequest request){
		log.info("deleteLabFormula()...start");
		boolean result = labFormulaService.deleteLabFormula(labFormulaId, request);
		log.info("deleteLabFormula()...end");
		return result;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is get all headings.
	 **********************************************************************/
	@RequestMapping(value="/getlabformulaheadings",method = RequestMethod.POST)
	public LabFormulaHeadings getLabFormulaHeadings(@RequestParam("type") String type, HttpServletRequest request) throws ParseException{
		log.info("getLabFormulaHeadings()...start");
		LabFormulaHeadings headings = labFormulaService.getLabFormulaHeadings(type,request); 
		log.info("getLabFormulaHeadings()...end");
		return headings;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is get all lab formula profiles.
	 **********************************************************************/
	@RequestMapping(value="/featchLabFormulaPro",method = RequestMethod.GET)
	public LabFormulaHeadings featchLabFormulaPro(@RequestParam("isCategory") String isCategory, @RequestParam("idHed") String idHed, @RequestParam("type") String type,
			HttpServletRequest request) throws ParseException{
		log.info("featchLabFormulaPro()...start");
		LabFormulaHeadings obj = labFormulaService.featchLabFormulaPro(isCategory,idHed,type,request); 
		log.info("featchLabFormulaPro()...end");
		return obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is get all lab formulas.
	 **********************************************************************/
	@RequestMapping(value="/featchLabFormulas",method = RequestMethod.POST)
	public LabFormulaDTO featchLabFormulas(@RequestParam("searchText") String searchText, @RequestParam("searchType") String searchType) {
		log.info("featchLabFormulas()...start");
		LabFormulaDTO obj = labFormulaService.featchLabFormulas(searchText, searchType);
		log.info("featchLabFormulas()...end");
		return  obj;
	}
	
	/********************************************************************
	 * @author Akshay Mache
	 * @comment This method is for auto-suggestion lab formula.
	 **********************************************************************/
	@RequestMapping(value="/labformulaautosugg",method = RequestMethod.GET)
	public LabFormulaDTO labFormulaAutoSugg(@RequestParam("searchText") String searchText) {
		log.info("labFormulaAutoSugg()...start");
		LabFormulaDTO obj = labFormulaService.labFormulaAutoSugg(searchText); 
		log.info("labFormulaAutoSugg()...end");
		return obj;
	}
}