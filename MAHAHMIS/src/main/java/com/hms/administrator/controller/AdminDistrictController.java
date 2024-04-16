package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.service.AdminDistrictService;

@RestController
@RequestMapping(value = "/district")
public class AdminDistrictController {

	@Autowired
	AdminDistrictService adminDistrictService;

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to save State 
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/saveDistrict", method = RequestMethod.POST)
	public int saveStateMaster(AdminDistrictDTO district,HttpServletRequest request) {
		int response =adminDistrictService.saveAdminDistrict(district, request);
		return response;
	}
	

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to fetch all District List
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/getAllDistrict", method = RequestMethod.GET)
	public AdminDistrictDTO getAllDistrict() {
		List<AdminDistrictDTO> districtList=new ArrayList<AdminDistrictDTO>();
		districtList = adminDistrictService.getAllDistrict();
		AdminDistrictDTO district =new AdminDistrictDTO();
		district.setDistrictList(districtList);
		return  district;
	}

	
	
	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to edit District By Id
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/editDistrictById", method = RequestMethod.POST)
	public  AdminDistrictDTO editDistrictById(@RequestParam("district_id") int district_id,HttpServletRequest request) {
		AdminDistrictDTO districtDTO =new AdminDistrictDTO();
		districtDTO = adminDistrictService.editDistrictById(district_id,request);
		return  districtDTO;
	}

	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to delete District By Id
 * @param request  district_id
 * @return
 ************************************************************************/
	@RequestMapping(value = "/deleteDistrictById", method = RequestMethod.POST)
		public  boolean deleteDistrictById(@RequestParam("district_id") int district_id,HttpServletRequest request) {
			boolean flag;
			flag = adminDistrictService.deleteDistrictById(district_id,request);
			return  flag;
		}
	
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to delete District By Id
 * @param request  district_id
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllDistrictListByStateId", method = RequestMethod.POST)
	public  AdminDistrictDTO getAllDistrictListByStateId(@RequestParam("stateId") int stateId,HttpServletRequest request) {
		List<AdminDistrictDTO> districtList=new ArrayList<AdminDistrictDTO>();
		districtList = adminDistrictService.getAllDistrictListByStateId(stateId,request);
		AdminDistrictDTO district =new AdminDistrictDTO();
		district.setDistrictList(districtList);
		return  district;
	}

	
	
/***************************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to search State By name
 * @param request  State_Id
 * @return
 **************************************************************************************/	
	@RequestMapping(value = "/searchDistrictByName", method = RequestMethod.POST)
	public  AdminDistrictDTO searchDistrictByName(@RequestParam("searchName") String name,HttpServletRequest request) {
		List<AdminDistrictDTO> districtList=new ArrayList<AdminDistrictDTO>();
		districtList = adminDistrictService.searchDistrictByName(name,request);
		AdminDistrictDTO districtDTO =new AdminDistrictDTO();
		districtDTO.setDistrictList(districtList);
		return  districtDTO;
	}
}
