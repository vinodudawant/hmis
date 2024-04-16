package com.hms.pathology.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pathology.dto.LabReagentDetailsDTO;
import com.hms.pathology.service.LabReagentDetailsService;


@RestController
@RequestMapping(value = "/reagentdetails")
public class LabReagentDetailsController {
	
	static Logger log=Logger.getLogger(LabReagentDetailsController.class.getName());

	@Autowired
	LabReagentDetailsService labReagentDetailsService;

	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to get all Reagent List
 * @param request
 * @return Reagent List
 ****************************************************************************************************/
	@RequestMapping(value = "/getAllReagentList", method = RequestMethod.GET)
	public ItemMasterDto getAllReagentList(@RequestParam("type") String type){
		return labReagentDetailsService.getAllReagentList(type);
	}

	
	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to get all Asset List
 * @param request
 * @return Asset List
 ****************************************************************************************************/
	@RequestMapping(value = "/getAllAssetList", method = RequestMethod.GET)
	public ItemMasterDto getAllAssetList(){
		return labReagentDetailsService.getAllAssetList();
	}


	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to get all Reagent List
 * @param request
 * @return Reagent List
 ****************************************************************************************************/
	@RequestMapping(value = "/getReagentValues", method = RequestMethod.POST)
	public ItemMasterDto getReagentValues(@RequestParam("id") Integer id,HttpServletRequest request){
		return labReagentDetailsService.getReagentValues(id,request);
	}
	
/*****************************************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to save reagent 
 * @param request
 * @return
 ****************************************************************************************************/
	@RequestMapping(value = "/saveReagentDetails", method = RequestMethod.POST)
	public int saveReagentDetails(LabReagentDetailsDTO labReagentDetailsDTO, HttpServletRequest request) {
		log.info("saveReagentDetails..");
		int response = labReagentDetailsService.saveReagentDetails(labReagentDetailsDTO, request);
		 log.debug("save Reagent Details....."+response);
		return response;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to get all Sample Container  List
 * @param 
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllReagentByTest", method = RequestMethod.POST)
	public  LabReagentDetailsDTO getAllReagentByTest(@RequestParam("id") int testId,HttpServletRequest request) {
		List<LabReagentDetailsDTO> list=new ArrayList<LabReagentDetailsDTO>();
		log.info("getAllReagentByTest..");
		list = labReagentDetailsService.getAllReagentByTest(testId,request);
		log.debug("save Reagent Details....."+list);
		LabReagentDetailsDTO obj =new LabReagentDetailsDTO();
		obj.setLabReagentDetailsList(list);
		return  obj;
	}
		
/*************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to edit reagent details By Id
 * @param 
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/editReagentById", method = RequestMethod.POST)
	public  LabReagentDetailsDTO editReagentById(@RequestParam("id") int id,HttpServletRequest request) {
		LabReagentDetailsDTO obj =new LabReagentDetailsDTO();
		log.info("editReagentById..");
		obj = labReagentDetailsService.editReagentById(id,request);
		log.debug("save Reagent Details....."+obj);
		return  obj;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 24-02-2020
 * @comment This method is to delete reagent details by id
 * @param request  sampleContainerId
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteReagentById", method = RequestMethod.POST)
	public  boolean deleteReagentById(@RequestParam("id") int id,HttpServletRequest request) {
		log.info("deleteReagentById..");
		 boolean flag = labReagentDetailsService.deleteReagentById(id,request);
		 log.debug("save Reagent Details....."+flag);
		return  flag;
	}
}
