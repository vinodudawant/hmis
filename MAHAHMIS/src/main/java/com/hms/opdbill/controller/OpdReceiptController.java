package com.hms.opdbill.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.opdbill.dto.OpdReceiptMasterDto;
import com.hms.opdbill.service.OpdReceiptService;

@Controller
@RequestMapping(value = "/testautosuggest")
public class OpdReceiptController {

	static Logger log=Logger.getLogger(OpdReceiptController.class.getName());
	static {
		System.out.println("OpdReceiptController is Loaded...!");
	}
	
	@Autowired
	OpdReceiptService opdReceiptService;
	
	/* =============
	  Code By  : Vinod Udawant
	  Code For : To save payment details
	================*/
	@ResponseBody
	@RequestMapping(value = "/saveOpdBillReceipt", method = RequestMethod.POST)
	public OpdReceiptMasterDto saveOpdBillReceipt(@RequestBody OpdReceiptMasterDto objDto) {
		
		return opdReceiptService.saveOpdBillReceipt(objDto);
	}
}
