package com.hms.ehat.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.hms.ehat.service.LabMachineMasterService;
import com.hms.pathology.dto.LabMachineMasterDto;
import com.hms.pathology.dto.LabTestNormalValuesDTO;


@RestController
@RequestMapping(value = "/labMachineMasterController")
public class LabMachineMasterController {
	
	@Autowired
	LabMachineMasterService labMachineMasterService;
	
	@RequestMapping(value = "/saveMachineName", method = RequestMethod.POST)
	public String saveMachineName(LabMachineMasterDto dto, HttpServletRequest request){
		return labMachineMasterService.saveMachineName(dto, request);
	}
	
	@RequestMapping(value = "/getallMachines", method = RequestMethod.GET)
	public LabMachineMasterDto getallMachines(@RequestParam("searchText") String searchText, @RequestParam("callFrom") String type,@RequestParam("headingId") Integer headingId){
		return labMachineMasterService.getallMachines(searchText,type,headingId);
	}
	
	@RequestMapping(value = "/editMachineName/{id}", method = RequestMethod.GET)
	public LabMachineMasterDto editMachineName(@PathVariable("id") int machineId){
		return labMachineMasterService.editMachineName(machineId);
	}
	
	@RequestMapping(value = "/deleteMachine/{id}", method = RequestMethod.DELETE)
	public boolean deleteMachine(@PathVariable("id") int machineId, HttpServletRequest request){
		return labMachineMasterService.deleteMachine(machineId, request);
	}
	
	@RequestMapping(value = "/getallMachineList", method = RequestMethod.GET)
	public LabMachineMasterDto getallMachineList(){
		return labMachineMasterService.getallMachineList();
	}
	
	@RequestMapping(value = "/getMachineNameWithTestId/{idLabTest}", method = RequestMethod.GET)
	public LabMachineMasterDto getMachineNameWithTestId(@PathVariable("idLabTest") int testId) {
		List<LabMachineMasterDto> listmachine = new ArrayList<LabMachineMasterDto>();
		listmachine = labMachineMasterService.getMachineNameWithTestId(testId);
		LabMachineMasterDto obj = new LabMachineMasterDto();
		obj.setMachineNameList(listmachine);
		return obj;
	}
	
	@RequestMapping(value = "/getNormalValueRangeWithMachineId", method = RequestMethod.GET)
	public LabTestNormalValuesDTO getNormalValueRangeWithMachineId(@RequestParam("mId") int mId,@RequestParam("idLabTest") int idLabTest) {
		List<LabTestNormalValuesDTO> labTestNormalValueList = new ArrayList<LabTestNormalValuesDTO>();
		labTestNormalValueList = labMachineMasterService.getNormalValueRangeWithMachineId(mId,idLabTest);
		LabTestNormalValuesDTO obj = new LabTestNormalValuesDTO();
		obj.setLabTestNormalValueList(labTestNormalValueList);
		return obj;
	}
	
	@RequestMapping(value = "/deleteMachinewiseNormalValue", method = RequestMethod.GET)
	public boolean deleteMachinewiseNormalValue(@RequestParam("machineId") Integer machineId,@RequestParam("idLabTest") Integer idLabTest, HttpServletRequest request){
		return labMachineMasterService.deleteMachinewiseNormalValue(machineId,idLabTest, request);
	}

}
