package com.hms.inventory.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.service.GoodsReceiptService;

@Controller
@RequestMapping(value="/goodsReceipt")
public class GoodsReceiptController {

	@Autowired
	GoodsReceiptService goodsReceiptService;
	
	@RequestMapping(value="/getMrn",method=RequestMethod.GET)
	@ResponseBody
	public List<MrnMasterDTO> getMrnData(){
		 List<MrnMasterDTO> response = goodsReceiptService.getMrnData();
		return response;
	}
	
	@RequestMapping(value="/getMrnById",method=RequestMethod.GET)
	@ResponseBody
	public List<MrnMasterDTO> getMrnDataById(@RequestParam("mrnId")int id){
		 List<MrnMasterDTO> response = goodsReceiptService.getMrnDataById(id);
		return response;
	}
}
