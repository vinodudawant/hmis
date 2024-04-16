package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.administrator.service.AdminTalukaService;


@RestController
@RequestMapping(value = "/taluka")
public class AdminTalukaController {
	
	@Autowired
	AdminTalukaService adminTalukaService;

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to save Taluka 
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/saveTaluka", method = RequestMethod.POST)
	public int saveTalukaMaster(AdminTalukaDTO taluka,HttpServletRequest request) {
		int response =adminTalukaService.saveAdminTaluka(taluka, request);
		System.out.println("res "+response);
		return response;
	}
	

	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to fetch all Taluka List
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/getAllTalukaList", method = RequestMethod.GET)
	public AdminTalukaDTO getAllTaluka() {
		List<AdminTalukaDTO> talukaList=new ArrayList<AdminTalukaDTO>();
		talukaList = adminTalukaService.getAllTaluka();
		AdminTalukaDTO taluka =new AdminTalukaDTO();
		taluka.setTalukaList(talukaList);
		return  taluka;
	}

	
	
	
/***************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to edit Taluka By Id
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/editTalukaById", method = RequestMethod.POST)
	public  AdminTalukaDTO editTalukaById(@RequestParam("taluka_id") int taluka_id,HttpServletRequest request) {
		AdminTalukaDTO talukaDTO =new AdminTalukaDTO();
		talukaDTO = adminTalukaService.editTalukaById(taluka_id,request);
		return  talukaDTO;
	}

	
	
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to delete Taluka By Id
 * @param request  taluka_id
 * @return
 ************************************************************************/
	@RequestMapping(value = "/deleteTalukaById", method = RequestMethod.POST)
		public  boolean deleteTalukaById(@RequestParam("taluka_id") int taluka_id,HttpServletRequest request) {
			boolean flag;
			flag = adminTalukaService.deleteTalukaById(taluka_id,request);
			return  flag;
		}
	

/*************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to delete District By Id
 * @param request  district_id
 * @return
 ************************************************************************/
	@RequestMapping(value = "/getAllTalukaListByDistrictId", method = RequestMethod.POST)
		public  AdminTalukaDTO getAllTalukaListByDistrictId(@RequestParam("districtId") int districtId,HttpServletRequest request) {
			List<AdminTalukaDTO> talukaList=new ArrayList<AdminTalukaDTO>();
			talukaList = adminTalukaService.getAllTalukaListByDistrictId(districtId,request);
			AdminTalukaDTO taluka =new AdminTalukaDTO();
			taluka.setTalukaList(talukaList);
			return  taluka;
		}

	
	
/***************************************************************************************
 * @author Ganesh Patil
 * @since 22-01-2020
 * @comment This method is to search State By name
 * @param request  State_Id
 * @return
 **************************************************************************************/	
	@RequestMapping(value = "/searchTalukaByName", method = RequestMethod.POST)
		public  AdminTalukaDTO searchTalukaByName(@RequestParam("searchName") String name,HttpServletRequest request) {
			List<AdminTalukaDTO> talukaList=new ArrayList<AdminTalukaDTO>();
			talukaList = adminTalukaService.searchTalukaByName(name,request);
			AdminTalukaDTO talukaDTO =new AdminTalukaDTO();
			talukaDTO.setTalukaList(talukaList);
			return  talukaDTO;
		}
}
