package com.hms.pathology.dto;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.ehat.service.SampleContainerService;

@RestController
@RequestMapping(value = "/samplecontainer")
public class SampleContainerController {

	@Autowired
	SampleContainerService sampleContainerService;

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment This method is to save Sample Container 
 * @param 
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/saveSampleContainer", method = RequestMethod.POST)
	public int saveSampleContainer(SampleContainerDTO sampleContainer, HttpServletRequest request) {
		String msg = "";
		int response = sampleContainerService.saveSampleContainer(sampleContainer, request);
		return response;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment This method is to get all Sample Container  List
 * @param 
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllSampleContainer", method = RequestMethod.GET)
	public  SampleContainerDTO getAllSampleContainer() {
		List<SampleContainerDTO> sampleContainerList=new ArrayList<SampleContainerDTO>();
		sampleContainerList = sampleContainerService.getAllSampleContainer();
		SampleContainerDTO sampleContainerDTO =new SampleContainerDTO();
		sampleContainerDTO.setSampleContainerList(sampleContainerList);
		return  sampleContainerDTO;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment This method is to get Sample Container By Id
 * @param request  sampleContainerId
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/editSampleContainerById", method = RequestMethod.POST)
	public  SampleContainerDTO editSampleContainerById(@RequestParam("sampleContainerId") int sampleContainerId,HttpServletRequest request) {
		SampleContainerDTO sampleContainerDTO =new SampleContainerDTO();
		sampleContainerDTO = sampleContainerService.editSampleContainerById(sampleContainerId,request);
		return  sampleContainerDTO;
	}
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment This method is to delete Sample Container By Id
 * @param request  sampleContainerId
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/deleteSampleContainerById", method = RequestMethod.POST)
	public  boolean deleteSampleContainerById(@RequestParam("sampleContainerId") int sampleContainerId,HttpServletRequest request) {
		boolean flag;
		flag = sampleContainerService.deleteSampleContainerById(sampleContainerId,request);
		return  flag;
	}

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 06/02/2020
 * @comment This method is to search Sample Container By name
 * @param request  State_Id
 * @return
 ************************************************************************/	
	@RequestMapping(value = "/searchSampleContainerByName", method = RequestMethod.POST)
		public  SampleContainerDTO searchSampleContainerByName(@RequestParam("searchName") String name,HttpServletRequest request) {
			List<SampleContainerDTO> sampleContainerList=new ArrayList<SampleContainerDTO>();
			sampleContainerList = sampleContainerService.searchSampleContainerByName(name,request);
			SampleContainerDTO sampleContainerDTO =new SampleContainerDTO();
			sampleContainerDTO.setSampleContainerList(sampleContainerList);
			return  sampleContainerDTO;
		}
}
