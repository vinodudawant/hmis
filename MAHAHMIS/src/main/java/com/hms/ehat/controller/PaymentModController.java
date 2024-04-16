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

import com.hms.ehat.dto.NarrationDto;
import com.hms.ehat.dto.PaymentModDto;
import com.hms.ehat.service.NarrationService;
import com.hms.ehat.service.PaymentModService;


@Controller
@RequestMapping(value ="/payment")
public class PaymentModController 
{
	@Autowired
	PaymentModService payService;
	
	
	/*************************************************************************************
	 * @author Tarique Aalam 
	 * @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
	@RequestMapping(value = "/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdatePaymentMaster(PaymentModDto payDto,
			HttpServletRequest request) {
		
		//System.out.println("code=-=-=-=-=->"+TempsMaster.getTempCode());
		
		int response = payService.saveOrUpdatePay(payDto, request);
		
		return response == 1 ? "Saved sucessfully" : response == 2 ? "Updated succesfully" : "error";
	
	}
	
	
	
	
	/************************************************************************************
	 * @author Tarique Aalam @date 16_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchPayList", method = RequestMethod.POST)
	public @ResponseBody
	PaymentModDto getAllPayments() {
		List<PaymentModDto> ltPayDto = new ArrayList<PaymentModDto>();
		ltPayDto = payService.getAllPayments();	
		PaymentModDto obj=new PaymentModDto();
		obj.setListPay(ltPayDto);	
		return obj;
	}
	
	
	
	/*************************************************************************************
	 * @author Kishor Lokhande @date 16_May_2017 these methods are used to map request
	 *         with services with Temp master controller methods
	 * *************************************************************************************/
		
	@RequestMapping(value = "/deletePayMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deletePayMaster(@RequestParam("payId") Integer payId,
			HttpServletRequest request) {
				boolean response = payService.deletePayMaster(payId,
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
	
	@RequestMapping(value = "/autoSuggestionPaymentMasterNames", method = RequestMethod.POST)
	public @ResponseBody
	PaymentModDto getautoSuggestionPaymentMasterNames(@RequestParam String letter
			) {
		List<PaymentModDto> ltPay = new ArrayList<PaymentModDto>();
		ltPay = payService.getautoSuggestionPaymentMasterNames(letter);
		PaymentModDto obj = new PaymentModDto();
		obj.setListPay(ltPay);
		return obj;
	}
	
	/************************************************************************************
	 * @author Tarique Aalam @date 16_May_2017 these methods are used to map request
	 * with services with Temp master controller methods
	 * ***********************************************************************************/
	
	@RequestMapping(value = "/fetchPayListById", method = RequestMethod.POST)
	public @ResponseBody
	PaymentModDto getPaymodeById(@RequestParam("payId") Integer payId) {
		List<PaymentModDto> ltPayDto = new ArrayList<PaymentModDto>();
		ltPayDto = payService.getPaymodeById(payId);	
		PaymentModDto obj=new PaymentModDto();
		obj.setListPay(ltPayDto);	
		return obj;
	}
}
