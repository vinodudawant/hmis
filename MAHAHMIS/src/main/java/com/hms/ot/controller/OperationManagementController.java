package com.hms.ot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ot.dto.OperationTypeTbl;
import com.hms.ot.service.OperationMangeService;

@RestController
@RequestMapping(value = "/otoperationmange")
public class OperationManagementController {

	@Autowired
	OperationMangeService operationMangeService;

	@RequestMapping(value = "/operationType", method = RequestMethod.GET)
	@ResponseBody
	public List<String> fetchOperationType(@RequestParam("q") String letter) {
		List<String> list = operationMangeService.fetchOperationType(letter);
		return list;
	}

	@RequestMapping(value = "/saveoperationType", method = RequestMethod.POST)
	@ResponseBody
	public String saveoperationType(@RequestParam("PT_ID") int PT_ID, @RequestParam("PTname") String PTname,
			@RequestParam("queryType") String queryType) {
		OperationTypeTbl obj = new OperationTypeTbl();
		obj.setIdoperationTypeTbl(PT_ID);
		obj.setName(PTname);
		String msg = operationMangeService.saveoperationType(obj);
		return msg;
	}

	@RequestMapping(value = "/DeletePT", method = RequestMethod.POST)
	@ResponseBody
	public String deletePT(@RequestParam("PTId") int pTId) {
		String msg = operationMangeService.deletePT(pTId);
		return msg;
	}
	
}
