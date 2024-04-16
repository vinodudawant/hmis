package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.FormulaDto;
import com.hms.ehat.service.FormulaService;

@Controller
@RequestMapping(value = "/formula")
public class FormulaController {

	@Autowired
	FormulaService formulaService;
	
	//Irfan khan 7-12-2018 function to save formula
	@RequestMapping(value = "/saveFormula", method = RequestMethod.POST)
	public @ResponseBody String saveFormula(@RequestParam("formulaMaster") String formulaMaster,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		//function call
		int returnvalue = formulaService.saveFormula(formulaMaster,userId);
		
		//return result to js
		return (returnvalue == 1) ? "Records Inserted Successfully"
				: (returnvalue == 2) ? "Record Updated Successfully"
						//: (returnvalue == 3) ? "Record Allready Exist!!!"
										: "Network Error!!";
	}
	
	// Irfan khan 11-12-2018 function to delete formula
	@RequestMapping(value = "/deleteFormula", method = RequestMethod.POST)
	public @ResponseBody
	String deleteFormula(@RequestParam("formulaId") int formulaId,
			HttpServletRequest request) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		// function call
		int returnvalue = formulaService.deleteFormula(formulaId, userId);

		// return result to js
		return (returnvalue == 1) ? "Record Deleted Successfully"
						: "Network Error!!";
	}
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 11_Dec_2018 
	 * set Auto Complete For Formula Master
	 * *************************************************************************************/
	
	@RequestMapping(value = "/getAutoCompleteForFormulaMaster", method = RequestMethod.POST)
	public @ResponseBody
	FormulaDto getAutoCompleteForFormulaMaster(@RequestParam("letter") String letter,
			@RequestParam("callfrom") String callfrom
			) {
		List<FormulaDto> ltformulaDto = new ArrayList<FormulaDto>();
		ltformulaDto = formulaService.getAutoCompleteForFormulaMaster(letter,callfrom);
		FormulaDto obj = new FormulaDto();
		obj.setListFormula(ltformulaDto);
		return obj;
	}
	
	// Irfan khan 11-12-2018 function to delete formula
	@RequestMapping(value = "/calculateFormula", method = RequestMethod.POST)
	public @ResponseBody
	FormulaDto calculateFormula(@RequestParam("formulaId") List<Integer> formulaId,@RequestParam("letter") String letter,
			@RequestParam("callfrom") String callfrom,@RequestParam("pid") Integer pid,@RequestParam("tid") Integer tid,
			
			HttpServletRequest request) {

		List<FormulaDto> listFormula = new ArrayList<FormulaDto>();

		FormulaDto obj = new FormulaDto();
		// function call
		listFormula = formulaService.calculateFormula(formulaId,callfrom,letter,pid,tid);
		
		obj.setListFormula(listFormula);
		// return result to js
		return obj;
	}

}
