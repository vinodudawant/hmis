package com.hms.administrator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.service.AdminCityService;

@RestController
@RequestMapping(value = "/city")
public class AdminCityController {
	@Autowired
	AdminCityService adminCityService;
	

/***************************************************************************
 * @author Ganesh Patil
 * @since 24-01-2020
 * @comment This method is to save city 
 * @param request
 * @return    
 * **************************************************************************/
		@RequestMapping(value = "/saveCity", method = RequestMethod.POST)
		public int saveCityMaster(AdminCityDTO city,HttpServletRequest request) {
			int response =adminCityService.saveAdminCity(city, request);
			return response;
		}

		
		
/***************************************************************************
* @author Ganesh Patil
* @since 24-01-2020
* @comment This method is to fetch all Taluka List
* @param request
* @return    
***************************************************************************/
@RequestMapping(value = "/getAllCityList", method = RequestMethod.GET)
	public AdminCityDTO getAllCity() {
	List<AdminCityDTO> cityList=new ArrayList<AdminCityDTO>();
	cityList = adminCityService.getAllCities();
	AdminCityDTO city =new AdminCityDTO();
	city.setCityList(cityList);
	return  city;
	}




/***************************************************************************
 * @author Ganesh Patil
 * @since 24-01-2020
 * @comment This method is to edit City By Id
 * @param request
 * @return    
 * **************************************************************************/
	@RequestMapping(value = "/editCityById", method = RequestMethod.POST)
	public  AdminCityDTO editCityById(@RequestParam("cityId") int cityId,HttpServletRequest request) {
		AdminCityDTO cityDTO =new AdminCityDTO();
		cityDTO = adminCityService.editCityById(cityId,request);
		return  cityDTO;
	}

	
	
	
/*************************************************************************
 * @author Ganesh Patil
 * @since 24-01-2020
 * @comment This method is to delete Taluka By Id
 * @param request  taluka_id
 * @return
 ************************************************************************/
	@RequestMapping(value = "/deleteCityById", method = RequestMethod.POST)
		public  boolean deleteCityById(@RequestParam("cityId") int cityId,HttpServletRequest request) {
			boolean flag;
			flag = adminCityService.deleteCityById(cityId,request);
			return  flag;
		}

/*************************************************************************
 * @author Ganesh Patil
 * @since 24-01-2020
 * @comment This method is to search City By Name
 * @param request  
 * @return
 ************************************************************************/
	@RequestMapping(value = "/searchCityByName", method = RequestMethod.POST)
	public  AdminCityDTO searchCityByName(@RequestParam("searchName") String name,HttpServletRequest request) {
		List<AdminCityDTO> cityList=new ArrayList<AdminCityDTO>();
		cityList = adminCityService.searchCityByName(name,request);
		AdminCityDTO cityDTO =new AdminCityDTO();
		cityDTO.setCityList(cityList);
		return  cityDTO;
	}

}
