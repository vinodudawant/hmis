package com.hms.ot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ot.service.PharmaStockService;
import com.hms.pharmacy.pojo.PharmaStockDTO;
@Controller
@RequestMapping(value = "/pharmastock")
public class PharmaStockController {
	@Autowired
	PharmaStockService service;
	
	@RequestMapping(value = "/getPharmaStockDetails", method = RequestMethod.GET)
	@ResponseBody
	PharmaStockDTO getPharmaStockDetails(@RequestParam("productId") int productId,@RequestParam("subStoreName") String subStoreName) {
		List<PharmaStockDTO> list = service.getPharmaStockDetails(productId, subStoreName);
		PharmaStockDTO obj=new PharmaStockDTO();
		obj.setLstPharmaStockDto(list);
		return obj;
		
	}

}
