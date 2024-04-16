package com.hms.ehat.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabSlaveWorksheetViewDto;
import com.hms.ehat.dto.LabWorksheetViewDto;
import com.hms.ehat.service.LabService;
import com.hms.ehat.service.LabWorkSheetService;

@Controller
@RequestMapping(value = "/WorkSheetlab")
public class LabWorkSheetController {

	@Autowired
	LabWorkSheetService labwService;
	
	
/**
 * @author Tushar Jadhav 
* @date 22-Nov-2022
* @code for getLabWorksheetDash.
***/
@RequestMapping(value="/getLabWorksheetDash",method = RequestMethod.POST)
@ResponseBody
public LabWorksheetViewDto getLabWorksheetDash(@RequestParam("txtFdate") String txtFdate,
		@RequestParam("txtTdate") String txtTdate,
		@RequestParam("frmRecNo") Integer frmRecNo,
		@RequestParam("toRecNo") Integer toRecNo,
		@RequestParam("type") String type,
		HttpServletRequest request){
	System.err.println("txtFdate="+txtFdate+" txtTdate="+txtTdate+" type="+type+" frmRecNo="+frmRecNo+" toRecNo="+toRecNo);
	LabWorksheetViewDto labWorksheetObj=new LabWorksheetViewDto();
	labWorksheetObj=labwService.getLabWorksheetDash(txtFdate,txtTdate,frmRecNo,toRecNo,type,request);
	return labWorksheetObj;
}

/**
 * @author Tushar Jadhav 
 * @date 22-Nov-2022
 * @code for getLabWorksheetReportData.
 ***/
@RequestMapping(value="/getLabWorksheetReportData",method = RequestMethod.POST)
@ResponseBody
public LabWorksheetViewDto getLabWorksheetReportData(@RequestParam("txtFdate") String txtFdate,
		@RequestParam("txtTdate") String txtTdate,
		@RequestParam("frmRecNo") Integer frmRecNo,
		@RequestParam("toRecNo") Integer toRecNo,
		@RequestParam("type") String type,
		HttpServletRequest request){
	System.err.println("txtFdate="+txtFdate+" txtTdate="+txtTdate+" type="+type+" frmRecNo="+frmRecNo+" toRecNo="+toRecNo);

	return labwService.getLabWorksheetReportData(txtFdate,txtTdate,frmRecNo,toRecNo,type,request);
}

/**
 * @author Tushar Jadhav 
 * @date 26-Dec-2022
 * @code for checkTestIsTemplate.
 ***/
@ResponseBody
public List<LabProfileDTO> checkTestIsTemplate(){
	
	return labwService.checkTestIsTemplate();
}

}
