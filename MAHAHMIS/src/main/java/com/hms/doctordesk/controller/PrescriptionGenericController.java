package com.hms.doctordesk.controller;

import java.lang.management.MemoryType;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.PrescriptionGenericDTO;
import com.hms.doctordesk.service.PrescriptionGenericService;

import groovy.util.logging.Slf4j;

@Controller
@RequestMapping(value="/prescriptiongeneric")
@Slf4j
public class PrescriptionGenericController {

	 @Autowired
	 PrescriptionGenericService pservice;
	 
	 @RequestMapping(value = "/getMedicinesWithGeneric",method = RequestMethod.GET)
	 @ResponseBody	
	PrescriptionGenericDTO getMedicinesWithGeneric(@RequestParam("letter") String  letter,@RequestParam("genericFlag") String  GenericFlag) {
	List<PrescriptionGenericDTO>	list=pservice.getMedicinesWithGeneric(letter, GenericFlag);
	PrescriptionGenericDTO obj=new PrescriptionGenericDTO();
	   obj.setLstPrescriptionGenericDTO(list);
	  return obj;
	}
	 
	 @RequestMapping(value = "/getPharmacyStockMedicine",method = RequestMethod.GET)
	 @ResponseBody	
	PrescriptionGenericDTO getPharmacyStockMedicine(@RequestParam("letter") String  letter,@RequestParam("genericFlag") String  GenericFlag) {
	List<PrescriptionGenericDTO>	list=pservice.getPharmacyStockMedicine(letter,GenericFlag);
	PrescriptionGenericDTO obj=new PrescriptionGenericDTO();
	   obj.setLstPrescriptionGenericDTO(list);
	  return obj;
	}
	 
	
}
