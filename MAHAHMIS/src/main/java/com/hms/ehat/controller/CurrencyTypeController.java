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

import com.hms.ehat.dto.CurrencyTypeDto;
import com.hms.ehat.dto.PaymentModDto;
import com.hms.ehat.service.CurrencyTypeService;
import com.hms.ehat.service.PaymentModService;


@Controller
@RequestMapping(value ="/currencytype")
public class CurrencyTypeController {
	
	@Autowired
	CurrencyTypeService currService;
	
	/*************************************************************************************
	 * @author Tarique Aalam 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateCurrencyMaster(CurrencyTypeDto currDto,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = currService.saveOrUpdateCurrencyMaster(currDto, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}
	
	
	/************************************************************************************
	 * @author Tarique Aalam @date 16_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchCurrList", method = RequestMethod.POST)
	public @ResponseBody
	CurrencyTypeDto getAllCurrencyList() {
		List<CurrencyTypeDto> ltPayDto = new ArrayList<CurrencyTypeDto>();
		ltPayDto = currService.getAllCurrencyList();	
		CurrencyTypeDto obj=new CurrencyTypeDto();
		obj.setListCurr(ltPayDto);	
		return obj;
	}

	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deleteCurrMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteCurrMaster(@RequestParam("currencyId") Integer currencyId,
			HttpServletRequest request) {
				boolean response = currService.deleteCurrMaster(currencyId,
				request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	
	@RequestMapping(value = "/autoSuggestionCurrencyMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	CurrencyTypeDto getautoSuggestionCurrencyMasterNames(@RequestParam String letter
			) {
		List<CurrencyTypeDto> ltCurr = new ArrayList<CurrencyTypeDto>();
		ltCurr = currService.getautoSuggestionCurrencyMasterNames(letter);
		CurrencyTypeDto obj = new CurrencyTypeDto();
		obj.setListCurr(ltCurr);
		return obj;
	}
	
	
	/************************************************************************************
	 * @author Tarique Aalam @date 16_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchOneCurrList", method = RequestMethod.POST)
	public @ResponseBody
	String getOneCurrencyList() {
		//List<CurrencyTypeDto> ltPayDto = new ArrayList<CurrencyTypeDto>();
		String text;
		text = currService.getOneCurrencyListForSymbol();	
		return text;
	}
	
}
