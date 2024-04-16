package com.hms.administrator.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.administrator.service.HospitalDetailAdminService;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Controller
@RequestMapping(value = "/admin")
public class HospitalDetailAdminController {

	public static final String SAVE_RECORD="Save Record Successfully";
	public static final String UPDATE_RECORD="Update Record Successfully";
	public static final String UNKNOWN="Ooops Some Problem Occurred";
	public static final String DUPLICATE_RECORD="Duplicate Record Found";

	@Autowired
	HospitalDetailAdminService adminservice;
		
/******************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Save HospitalInfomartion Detail
 ******************************************************************************************/	
	
	@RequestMapping(value = "/savehospitalinfo", method = RequestMethod.POST)
	public @ResponseBody int savehospitalInfo(@RequestParam("hospitalInfo") String hospitalInfo,@RequestParam("hospitalId") String hospitalId, HttpServletRequest request) {
		//Integer response = adminservice.savehospitalInfo(hospitalInfo,request);	
		Integer response = adminservice.savehospitalInfo(hospitalInfo,hospitalId,request);	
		String msg = "";
		if (response > 1 ) {
			System.out.println("Records Saved Sucessfully");			
		} else if (response == 1) {
			System.out.println("Records Updated Sucessfully");
			HospitalDetails hospitalInfoList=(HospitalDetails) ConfigUIJSONUtility.getObjectFromJSON(hospitalInfo,HospitalDetails.class);	
			HospitalDetails	hospitalDto=hospitalInfoList.getListHospitalDetails().get(0);			
		} 
		else
		{
			msg = "Oops Some Problem Ocured";
		}
		return response;
	}

	
/*************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Get hospital info admin
 *************************************************************************************************/
	
	@RequestMapping(value = "/gethospitalinfoadmin", method = RequestMethod.POST)
	public @ResponseBody HospitalDetails getListhospitalInfo() {
		//System.out.println("In gethospitalinfoadmin");
		HospitalDetails hospitalDto = adminservice.getListHospitalDetails();
		return hospitalDto;
	}	
	
/*************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: save hospital spcialization
 ************************************************************************************************/

	@RequestMapping(value = "/savehospitalspcialization", method = RequestMethod.POST)
	public @ResponseBody String saveHospitalSpcialization(@RequestParam("hospitalSpecialization") String hospitalSpecialization,HttpServletRequest request,Integer unitId) { 
		int response = adminservice.saveHospitalSpcialization(hospitalSpecialization, request,unitId);	
		String msg = "";
		return msg = (response == 1) ? SAVE_RECORD: (response == 2) ? UPDATE_RECORD : UNKNOWN;
	}
	
	
/**********************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Get hospitalspcialization List
 *********************************************************************************************/
	
	@RequestMapping(value = "/gethospitalspcializationList", method = RequestMethod.POST)
	public @ResponseBody HospitalSpecialisationDto gethospitalspcializationList(HttpServletRequest request) { 
		HospitalSpecialisationDto hospitalSpecialisationDto = adminservice.gethospitalspcializationList();	
		return hospitalSpecialisationDto;
	}



/***********************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Delete hospital spcialization
 **********************************************************************************************/
	
	@RequestMapping(value = "/deletehospitalspcialization", method = RequestMethod.POST)
	public @ResponseBody
	String deletehospitalspcialization(@RequestParam("hospitalSpecialization") Integer specialisationId,HttpServletRequest request) {
		//System.out.println("in deletehospitalspcialization"+specialisationId);
		boolean response = adminservice.deletehospitalspcialization(specialisationId, request);
		String msg = "";
		if (response == true) {
			msg = "Record Deleted Successfully";
		} else {
			msg = "Record Not Deleted";
		}
		return msg;
	}
	
/*************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Save hospital department
*************************************************************************************************/
	
	@RequestMapping(value = "/savehospitaldepartment", method = RequestMethod.POST)
	public @ResponseBody String savehospitaldepartment(@RequestParam("hospitalDepartment") String hospitalDepartment,HttpServletRequest request, Integer unitId) { 
		int response = adminservice.savehospitaldeaprtment(hospitalDepartment,  unitId, request);	
		String msg = "";
		return msg = (response == 1) ? SAVE_RECORD: (response == 2) ? UPDATE_RECORD : UNKNOWN;
	}
	
/************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Get hospital hospitaldepartment List
***********************************************************************************************/
	
	@RequestMapping(value = "/gethospitalhospitaldepartmentList", method = RequestMethod.POST)
	public @ResponseBody HospitalDepartmentDto getListDepartments(HttpServletRequest request) { 
		HospitalDepartmentDto hospitaldepartmentDto = adminservice.getListDepartments();	
		return hospitaldepartmentDto;
	}	
	
	
/********************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 14-Jan-2020
	* @codeFor	: Delete hospital department
********************************************************************************************/
	
	
	@RequestMapping(value = "/deletehospitalhospitaldepartment", method = RequestMethod.POST)
	public @ResponseBody
	String deletehospitalhospitaldepartment(@RequestParam("listhospitaldeparment") Integer departmentId,HttpServletRequest request) {
		//System.out.println("in deletehospitalspcialization"+specialisationId);
		boolean response = adminservice.deletehospitalhospitaldepartment(departmentId, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Not Deleted";
		}
		return msg;
	}
		
/*********************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: save hospital owner detail
*********************************************************************************************/

	@RequestMapping(value = "/savehospitalownerdetail", method = RequestMethod.POST)
	public @ResponseBody String savehospitalownerdetail(@RequestParam("savehospitalownerdetail") String savehospitalownerdetail,HttpServletRequest request) { 
		int response = adminservice.savehospitalownerdetail(savehospitalownerdetail, request);	
		String msg = "";
		return msg = (response == 1) ? SAVE_RECORD: (response == 2) ? UPDATE_RECORD : UNKNOWN;
	}
	
/***********************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: Get FetchHospital Owner Detail
***********************************************************************************************/
	
	
	  @RequestMapping(value = "/getFetchHospitalOwnerDetail", method =
	  RequestMethod.POST) public @ResponseBody HospitalOwnerDetailDto
	  getFetchHospitalOwnerDetail(HttpServletRequest request) {
	  HospitalOwnerDetailDto hospitalOwnerDetailDto =
	  adminservice.getListhospitalownerdetail(); return hospitalOwnerDetailDto; }
	 
	
	
/**************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: Edit Hospital Owner Detail
***************************************************************************************************/

	
	  @RequestMapping(value = "/editHospitalOwnerDetail", method =
	  RequestMethod.POST) public @ResponseBody HospitalOwnerDetailDto
	  editHospitalOwnerDetail(Integer hospitalOwnerlist,HttpServletRequest request)
	  { HospitalOwnerDetailDto hospitalOwnerDetailDto =
	  adminservice.edithospitalownerdetail(hospitalOwnerlist, request); return
	  hospitalOwnerDetailDto; }
	 
	
/****************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: Delete hospital owner detail
***************************************************************************************************/
	
	@RequestMapping(value = "/deletehospitalownerdetail", method = RequestMethod.POST)
	public @ResponseBody
	String deletehospitalownerdetail(@RequestParam("savehospitalownerdetail") Integer idhospitalOwner,HttpServletRequest request) {
		//System.out.println("in deletehospitalownerdetail"+idhospitalOwner);
		boolean response = adminservice.delethospitalownerdetail(idhospitalOwner, request);
		String msg = "";
		if (response == true) {
			msg = "Record Deleted Successfully";
		} else {
			msg = "Record Deleted Un-successfully";
		}
		return msg;
	}
		
/****************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Save Hospital Holiday Master
****************************************************************************************************/	
	
	@RequestMapping(value = "/savehospitalholidaynew", method = RequestMethod.POST)
	public @ResponseBody String saveHospitalHoliday(@RequestParam("date") String date,
			@RequestParam("reason") String reason,
			@RequestParam("idHospitalHolidays") int idHospitalHolidays,
			HttpServletRequest request) { 
		String year[]=date.split("/");	
		int response = adminservice.saveHospitalHoliday(date,reason,idHospitalHolidays,request);
		String msg = "";
		return msg=(response==1)? SAVE_RECORD : (response==2)? DUPLICATE_RECORD:UNKNOWN;
		}
	
/*******************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020S
	* @codeFor	: Fetch Hospital Holiday
*******************************************************************************************************/
	
	@RequestMapping(value = "/fetchHospitalHoliday", method = RequestMethod.POST)
	public @ResponseBody HospitalHolidaysDto gethospitalholidayList(String selYear, HttpServletRequest request) { 
		HospitalHolidaysDto hospitalHolidaysDto = adminservice.getListHospitalHoliday(selYear);	
		return hospitalHolidaysDto;
	}
	
/*******************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Edit Hospital Holiday
****************************************************************************************************/
	
	@RequestMapping(value = "/editHospitalHoliday", method = RequestMethod.POST)
	public @ResponseBody HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHolidays,HttpServletRequest request) { 
		HospitalHolidaysDto hospitalHolidaysDto = adminservice.editHospitalHoliday(idHospitalHolidays, request);	
		return hospitalHolidaysDto;
	}
	
/********************************************************************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: Delete Hospital Holiday
*******************************************************************************************************/
	
	@RequestMapping(value = "/deleteHospitalHoliday", method = RequestMethod.POST)
	public @ResponseBody
	String deleteHospitalHoliday(@RequestParam("idHospitalHolidays") Integer idHospitalHolidays,HttpServletRequest request) 
	{	
		boolean response = adminservice.deleteHospitalHoliday(idHospitalHolidays, request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Successfully";
		} else {
			msg = "Records Deleted Un-successfully";
		}
		return msg;
	}
	

	/*************************************************************************************************
	* @author	:Annapurna Jamnor
	* @date		: 28-Nov-2023
	* @codeFor	: Get  listHospitalDetails Unitwise
 ************************************************************************************************/

	@RequestMapping(value = "/getListHospitalDetailsNew", method = RequestMethod.POST)
	public @ResponseBody HospitalDetails getListHospitalDetailsNew(@RequestParam("hospitalUnitId") Integer hospitalUnitId) {
		HospitalDetails hospitalDto = adminservice.getListHospitalDetailsNew(hospitalUnitId);
		return hospitalDto;
	}
	/*************************************************************************************************
	* @author	:Annapurna Jamnor
	* @date		: 23-Nov-2023
	* @codeFor	: Get  hospital Information Unitwise
 ************************************************************************************************/

	@RequestMapping(value = "/gethospitalinfoadmin1", method = RequestMethod.POST)
	public @ResponseBody HospitalDetails gethospitalinfoadmin1(@RequestParam("hospitalId") int hospitalId) {
		//System.out.println("In gethospitalinfoadmin");
		HospitalDetails hospitalDto = adminservice.gethospitalinfoadmin1(hospitalId);
		return hospitalDto;
	}
	/**********************************************************************************************
	* @author	:Annapurna Jamnor
	* @date		: 30-Nov-2023
	* @codeFor	: Get hospitalspcialization List UnitWise
 *********************************************************************************************/
	
	@RequestMapping(value = "/gethospitalspcializationListByUnitId", method = RequestMethod.POST)
	public @ResponseBody HospitalSpecialisationDto gethospitalspcializationListByUnitId(HttpServletRequest request,@RequestParam("unitId") Integer unitId) { 
		HospitalSpecialisationDto hospitalSpecialisationDto = adminservice.gethospitalspcializationListByUnitId(unitId);	
		return hospitalSpecialisationDto;
	}
	/*************************************************************************************************
	* @author	:Annapurna Jamnor
	* @date		: 28-Nov-2023
	* @codeFor	: Get  listHospitalDetails Unitwise
 ************************************************************************************************/
	
	@RequestMapping(value = "/getListDepartmentsByUnitId", method = RequestMethod.POST)
	public @ResponseBody HospitalDepartmentDto getListDepartmentsByUnitId(HttpServletRequest request,@RequestParam("unitId") Integer unitId) { 
		HospitalDepartmentDto hospitaldepartmentDto = adminservice.getListDepartmentsByUnitId(unitId);	
		return hospitaldepartmentDto;
	}	
	
}
