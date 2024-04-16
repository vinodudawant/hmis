package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.DistrictMasterDto;
import com.hms.ehat.dto.StateMasterDto;
import com.hms.dto.CenterMasterDTO;
import com.hms.dto.HospitalMasterDTO;
import com.hms.dto.TypeMasterDTO;
import com.hms.dto.YearMasterDTO;
import com.hms.ehat.service.CenterService;

@Controller 
@RequestMapping(value="/centerMgt")
public class CenterController {

	@Autowired
	CenterService centerService;
	
	@RequestMapping(value = "/saveStateMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveStateMaster(StateMasterDto roommaster,	HttpServletRequest request) {
		
		int response = centerService.saveorUpdateStateMaster(roommaster, request);		
		return response;	
	}
	
	@RequestMapping(value = "/getAllStateMaster", method = RequestMethod.GET)
	public @ResponseBody
	StateMasterDto getAllStateMaster(HttpServletRequest request) {
		List<StateMasterDto> lstStateMaster = new ArrayList<StateMasterDto>();
		lstStateMaster = centerService.getAllStateMaster();
		StateMasterDto obj = new StateMasterDto();
		obj.setLstStateMaster(lstStateMaster);
		return obj;
	}	
	
	@RequestMapping(value = "/editStateMaster", method = RequestMethod.GET)
	public @ResponseBody
	StateMasterDto editStateMaster(@RequestParam("stateId") Integer stateId) {
		StateMasterDto obj = new StateMasterDto();
		obj = centerService.editStateMaster(stateId);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteStateMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteStateMaster(@RequestParam("stateId") Integer stateId,HttpServletRequest request) {
		boolean response = centerService.deleteStateMaster(stateId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		return msg;
	}	
	
	@RequestMapping(value = "/saveDistrictMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveDistrictMaster(DistrictMasterDto districtMaster,	HttpServletRequest request) {
		
		int response = centerService.saveDistrictMaster(districtMaster, request);		
		return response;	
	}
	
	@RequestMapping(value = "/getAllDistrictMaster", method = RequestMethod.GET)
	public @ResponseBody
	DistrictMasterDto getAllDistrictMaster(HttpServletRequest request) {
		List<DistrictMasterDto> lstDistrictMaster = new ArrayList<DistrictMasterDto>();
		lstDistrictMaster = centerService.getAllDistrictMaster();
		DistrictMasterDto obj = new DistrictMasterDto();
		obj.setLstDistrictMaster(lstDistrictMaster);
		return obj;
	}	
	
	@RequestMapping(value = "/editDistrictMaster", method = RequestMethod.GET)
	public @ResponseBody
	DistrictMasterDto editDistrictMaster(@RequestParam("districtId") Integer districtId) {
		DistrictMasterDto obj = new DistrictMasterDto();
		obj = centerService.editDistrictMaster(districtId);	
		return obj;
	}	
	
	@RequestMapping(value = "/deleteDistrictMaster", method = RequestMethod.POST)
	public @ResponseBody
	String deleteDistrictMaster(@RequestParam("districtId") Integer districtId,HttpServletRequest request) {
		boolean response = centerService.deleteDistrictMaster(districtId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Network issue";
		}
		return msg;
	}
	
	@RequestMapping(value = "/saveTypeMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveTypeMaster(TypeMasterDTO tObj,HttpServletRequest request) {
		int response = centerService.saveTypeMaster(tObj, request);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllTypeMaster", method = RequestMethod.POST)
	public @ResponseBody
	TypeMasterDTO  getAllTypeMaster(HttpServletRequest request) {
		List<TypeMasterDTO> lsttMasters = new ArrayList<TypeMasterDTO>();
		lsttMasters = centerService.getAllTypeMaster();
		TypeMasterDTO obj = new TypeMasterDTO();
		obj.setLsttypemaster(lsttMasters);
		return obj;
	}
	
	@RequestMapping(value = "/editTypeMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	TypeMasterDTO  editTypeMasterDoc(@RequestParam("typeId") Integer typeId) {
		TypeMasterDTO obj = new TypeMasterDTO();
		obj = centerService.editTypeMaster(typeId);
		return obj;
	}
	
	@RequestMapping(value = "/deleteTypeMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTypeMasterDoc(@RequestParam("typeId") Integer typeId,HttpServletRequest request) {
		boolean response = centerService.deleteTypeMaster(typeId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/centertypeAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	TypeMasterDTO centertypeAutoSuggestion(@RequestParam("typeName")String typeName) {
		List<TypeMasterDTO> lsttypemaster = new ArrayList<TypeMasterDTO>();
		lsttypemaster = centerService.getAllITypeMasterAutosuggestion(typeName);
		TypeMasterDTO obj = new TypeMasterDTO();
		obj.setLsttypemaster(lsttypemaster);
		return obj;
	}
	
	@RequestMapping(value = "/saveHospitalCodeMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveHospitalCodeMaster(HospitalMasterDTO hObj,HttpServletRequest request) {
		int response = centerService.saveHospitalMaster(hObj, request);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllHospitalMaster", method = RequestMethod.POST)
	public @ResponseBody
	HospitalMasterDTO  getAllHospitalMaster(HttpServletRequest request) {
		List<HospitalMasterDTO> lsthospitalDoc = new ArrayList<HospitalMasterDTO>();
		lsthospitalDoc = centerService.getAllHospitalMaster();
		HospitalMasterDTO obj = new HospitalMasterDTO();
		obj.setLsthospitalDoc(lsthospitalDoc);
		return obj;
	}
	
	@RequestMapping(value = "/editHospitalMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	HospitalMasterDTO  editHospitalMasterDoc(@RequestParam("hospitalId") Integer hospitalId) {
		HospitalMasterDTO obj = new HospitalMasterDTO();
		obj = centerService.editHospitalMaster(hospitalId);
		return obj;
	}
	
	@RequestMapping(value = "/deleteHospitalMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteHospitalMasterDoc(@RequestParam("hospitalId") Integer hospitalId,HttpServletRequest request) {
		boolean response = centerService.deleteHospitalMaster(hospitalId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/centerhospitalAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	HospitalMasterDTO centerhospitalAutoSuggestion(@RequestParam("hospitalCode")String hospitalCode) {
		List<HospitalMasterDTO> lsthospitalDoc = new ArrayList<HospitalMasterDTO>();
		lsthospitalDoc = centerService.getAllHospitalMasterAutosuggestion(hospitalCode);
		HospitalMasterDTO obj = new HospitalMasterDTO();
		obj.setLsthospitalDoc(lsthospitalDoc);
		return obj;
	}
	
	@RequestMapping(value = "/saveYearMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveYearMaster(YearMasterDTO yObj,HttpServletRequest request) {
		int response = centerService.saveYearMaster(yObj, request);
		
		return response;	
	}
	@RequestMapping(value = "/getAllYearMaster", method = RequestMethod.POST)
	public @ResponseBody
	YearMasterDTO  getAllYearMaster(HttpServletRequest request) {
		List<YearMasterDTO> lstyearDoc = new ArrayList<YearMasterDTO>();
		lstyearDoc = centerService.getAllYearMaster();
		YearMasterDTO obj = new YearMasterDTO();
		obj.setLstyearDoc(lstyearDoc);
		return obj;
	}
	
	@RequestMapping(value = "/editYearMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	YearMasterDTO  editYearMasterDoc(@RequestParam("yearId") Integer yearId) {
		YearMasterDTO obj = new YearMasterDTO();
		obj = centerService.editYearMaster(yearId);
		return obj;
	}
	
	@RequestMapping(value = "/deleteYearMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteYearMasterDoc(@RequestParam("yearId") Integer yearId,HttpServletRequest request) {
		boolean response = centerService.deleteYearMaster(yearId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/centeryearAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	YearMasterDTO centeryearAutoSuggestion(@RequestParam("year")String year) {
		List<YearMasterDTO> lstyearDoc = new ArrayList<YearMasterDTO>();
		lstyearDoc = centerService.getAllYearMasterAutosuggestion(year);
		YearMasterDTO obj = new YearMasterDTO();
		obj.setLstyearDoc(lstyearDoc);
		return obj;
	}
	
	@RequestMapping(value = "/getAllDistrictBystateId", method = RequestMethod.GET)
	public @ResponseBody
	DistrictMasterDto getAllDistrictBystateId(HttpServletRequest request,@RequestParam("stateId")Integer stateId) {
		List<DistrictMasterDto> lstDistrictMaster = new ArrayList<DistrictMasterDto>();
		lstDistrictMaster = centerService.getAllDistrictBystateId(stateId);
		DistrictMasterDto obj = new DistrictMasterDto();
		obj.setLstDistrictMaster(lstDistrictMaster);
		return obj;
	}	
	
	@RequestMapping(value = "/saveCenterMaster", method = RequestMethod.POST)
	@ResponseBody
	public int saveCenterMaster(CenterMasterDTO cObj,HttpServletRequest request) {
		int response = centerService.saveCenterMaster(cObj, request);
		
		return response;	
	}
	
	@RequestMapping(value = "/getAllCenterMaster", method = RequestMethod.POST)
	public @ResponseBody
	CenterMasterDTO  getAllCenterMaster(HttpServletRequest request) {
		List<CenterMasterDTO> lstcenterdoc = new ArrayList<CenterMasterDTO>();
		lstcenterdoc = centerService.getAllCenterMaster();
		CenterMasterDTO obj = new CenterMasterDTO();
		obj.setLstcenterdoc(lstcenterdoc);
		return obj;
	}
	
	@RequestMapping(value = "/editCenterMasterDoc", method = RequestMethod.GET)
	public @ResponseBody
	CenterMasterDTO  editCenterMasterDoc(@RequestParam("centerId") Integer centerId) {
		CenterMasterDTO obj = new CenterMasterDTO();
		obj = centerService.editCenterMaster(centerId);
		return obj;
	}
	
	@RequestMapping(value = "/deleteCenterMasterDoc", method = RequestMethod.POST)
	public @ResponseBody
	String deleteCenterMasterDoc(@RequestParam("centerId") Integer centerId,HttpServletRequest request) {
		boolean response = centerService.deleteCenterMaster(centerId, request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/inventoryCenterMasterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	CenterMasterDTO inventoryCenterMasterAutoSuggestion(@RequestParam("centerName")String centerName) {
		List<CenterMasterDTO> lstcenterdoc = new ArrayList<CenterMasterDTO>();
		lstcenterdoc = centerService.getAllCenetrMasterAutosuggestion(centerName);
		CenterMasterDTO obj = new CenterMasterDTO();
		obj.setLstcenterdoc(lstcenterdoc);
		return obj;
	}
	
	@RequestMapping(value = "/centerStateAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	StateMasterDto centerStateAutoSuggestion(@RequestParam("stateName")String stateName) {
		List<StateMasterDto> lstStateMaster = new ArrayList<StateMasterDto>();
		lstStateMaster = centerService.getAllStateMasterAutosuggestion(stateName);
		StateMasterDto obj = new StateMasterDto();
		obj.setLstStateMaster(lstStateMaster);
		return obj;
	}
	
	@RequestMapping(value = "/centerDistrictMasterAutoSuggestion", method = RequestMethod.POST)
	public @ResponseBody
	DistrictMasterDto centerDistrictMasterAutoSuggestion(@RequestParam("districtName")String districtName) {
		List<DistrictMasterDto> lstDistrictMaster = new ArrayList<DistrictMasterDto>();
		lstDistrictMaster = centerService.getAllDistrictMasterAutosuggestion(districtName);
		DistrictMasterDto obj = new DistrictMasterDto();
		obj.setLstDistrictMaster(lstDistrictMaster);
		return obj;
	}
}
