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

import com.hms.ehat.dto.BodyPartMasterDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.ComplaintsMasterDto;
import com.hms.ehat.dto.FindingMasterDto;
import com.hms.ehat.dto.QuestionMasterDto;
import com.hms.ehat.dto.QuestionOptionMasterDto;
import com.hms.ehat.dto.SubObjTempTypeDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ehat.service.SubObjService;
import com.hms.patient.util.ConfigUIJSONUtility;


@Controller  
@RequestMapping(value = "/subObj")
public class SubObjController {
	
	@Autowired
	SubObjService subObjService;
	
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services with All method requierd for Subjective Objective Details
	 * **/
	
	@RequestMapping(value = "/saveBodyPart", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateSubObj(BodyPartMasterDto bodypartMaster,
			HttpServletRequest request) {
		int response = subObjService.saveOrUpdateBodyPart(bodypartMaster, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Getting All Body Parts
	 * **/
	@RequestMapping(value = "/viewAllBodyPart", method = RequestMethod.GET)
	public @ResponseBody
	BodyPartMasterDto getBodyPartsList(HttpServletRequest request) {
		List<BodyPartMasterDto> ltDeptMasters = new ArrayList<BodyPartMasterDto>();
		ltDeptMasters = subObjService.getAllBodyparts(request);
		BodyPartMasterDto obj = new BodyPartMasterDto();
		obj.setLstBodyParts(ltDeptMasters);
		return obj;
	}
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Delete Selected Body Parts
	 * **/
	@RequestMapping(value = "/deleteBodyPart", method = RequestMethod.POST)
	public @ResponseBody
	String deleteMaster(@RequestParam("bpId") Integer bodyPartId,HttpServletRequest request) {
		boolean response = subObjService.deleteBodyPart(bodyPartId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Save SubObjTemplate
	 * **/
	@RequestMapping(value = "/saveSubObjTemplate", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateSubObjTemplate(SubObjTemplateDto subObjTemplateMaster,
			HttpServletRequest request) {
		int response = subObjService.saveOrUpdateSubObjTemplate(subObjTemplateMaster, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Getting All SubObjTemplate Details
	 * **/
	@RequestMapping(value = "/getAllSubobjTemplates", method = RequestMethod.POST)
	public @ResponseBody
	SubObjTemplateDto getAllSubobjTemplateList(HttpServletRequest request) {
	
		return subObjService.getAllSubobjTemplate(request);
	}
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Save Chemetherapy Details
	 * **/
	@RequestMapping(value = "/saveChemotheropy", method = RequestMethod.POST)
	@ResponseBody
	public int saveModule(@RequestParam("chemoTheropyDetails") String chemoTheropyDetails,HttpServletRequest request) {
		int response=0;
		
		ChemoTheropyMaterDto chemoTheropyMaterDto = (ChemoTheropyMaterDto) ConfigUIJSONUtility
				.getObjectFromJSON(chemoTheropyDetails, ChemoTheropyMaterDto.class);
			
		response = subObjService.saveOrUpdateChemoTherapy(chemoTheropyMaterDto.getLstChemoTheropy().get(0), request);
			
		return response;
		
	}
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Getting All Chemetherapy Details
	 * **/
	@RequestMapping(value = "/getAllChemotherapyProtocol", method = RequestMethod.POST)
	public @ResponseBody
	ChemoTheropyMaterDto getAllChemotherapyProtocol(HttpServletRequest request) {
		List<ChemoTheropyMaterDto> ltChemoProtocol = new ArrayList<ChemoTheropyMaterDto>();
		ltChemoProtocol = subObjService.getAllChemotherapyProtocol(request);
		ChemoTheropyMaterDto obj = new ChemoTheropyMaterDto();
		obj.setLstChemoTheropy(ltChemoProtocol);
		return obj;
	}
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Delete Selected Chemetherapy Details
	 * **/
	@RequestMapping(value = "/deleteChemotherapy", method = RequestMethod.POST)
	public @ResponseBody
	String deleteChemoProtocol(@RequestParam("chemoId") Integer chemoId,HttpServletRequest request) {
		boolean response = subObjService.deleteChemotherapyProtocol(chemoId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	/**
	 * @author Vikas @date 6_March-2018 these methods are used to map request
	 *         with services for Getting All Chemetherapy Details
	 * **/
	@RequestMapping(value = "/saveQuetionDetails", method = RequestMethod.POST)
	@ResponseBody
	public int saveQuestionDetails(@RequestParam("objQuestion") String questionDetails,
			@RequestParam("txtQue") String txtQue,@RequestParam("txtQueType") String txtQueType,
			@RequestParam("querytype") String querytype,@RequestParam("txtQueID") Integer txtQueID,
			@RequestParam("templateType") Integer templateType,HttpServletRequest request) {
		int response=0;
		
		response = subObjService.saveOrUpdateQuestionDetails(questionDetails,txtQue,txtQueID,txtQueType,querytype,templateType,request);
			
		return response;
		
	}
	/**
	 * @author Vikas @date 6_March-2018 these methods are used to map request
	 *         with services for Getting All QuestionSlaveDetails
	 * **/
	@RequestMapping(value = "/getQuestionSlaveDetails", method = RequestMethod.POST)
	public @ResponseBody
	QuestionOptionMasterDto getQuestionSlaveDetails(HttpServletRequest request) {
		List<QuestionOptionMasterDto> ltQsnOptions = new ArrayList<QuestionOptionMasterDto>();
		ltQsnOptions = subObjService.getQuestionSlaveDetails(request);
		QuestionOptionMasterDto obj = new QuestionOptionMasterDto();
		obj.setOptionList(ltQsnOptions);
		return obj;
	}
	/**
	 * @author Vikas @date 7_March-2018 these methods are used to map request
	 *         with services for Getting All QuestionMasterDetails
	 * **/
	
	@RequestMapping(value = "/getQuestionMasterDetails", method = RequestMethod.POST)
	public @ResponseBody
	QuestionMasterDto getQuestionMasterDetails(HttpServletRequest request) {
		List<QuestionMasterDto> ltQsnMaster = new ArrayList<QuestionMasterDto>();
		ltQsnMaster = subObjService.getQuestionMasterDetails(request);
		QuestionMasterDto obj = new QuestionMasterDto();
		obj.setLstQuestion(ltQsnMaster);
		return obj;
	}
	/**
	 * @author Vikas @date 7_March-2018 these methods are used to map request
	 *         with services for Getting All QuestionMasterSlaveDetails
	 * **/
	@RequestMapping(value = "/getAllQuestionDetails", method = RequestMethod.POST)
	public @ResponseBody
	QuestionMasterDto getAllQuestionDetails(HttpServletRequest request) {
	
		return subObjService.getAllQuestionDetails(request);
	}
	
	/**
	 * @author Vikas @date 5_March-2018 these methods are used to map request
	 *         with services for Delete Selected Question Details
	 * **/
	@RequestMapping(value = "/deleteQustion", method = RequestMethod.POST)
	public @ResponseBody
	String deleteQsn(@RequestParam("questionId") Integer questionId,HttpServletRequest request) {
		boolean response = subObjService.deleteQustion(questionId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/**
	 * @author Vikas @date 6_March-2018 these methods are used to map request
	 *         with services with All method requierd for Subjective Objective Details
	 * **/
	
	@RequestMapping(value = "/saveComplaints", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateComplaints(ComplaintsMasterDto complaintsMasterDto,
			HttpServletRequest request) {
		int response = subObjService.saveOrUpdateComplaints(complaintsMasterDto, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	/**
	 * @author Vikas @date 8_March-2018 these methods are used to map request
	 *         with services for Getting All Complaints Details
	 * **/
	@RequestMapping(value = "/getAllComplaints", method = RequestMethod.POST)
	public @ResponseBody
	ComplaintsMasterDto getComplaintsDetails(HttpServletRequest request) {
		List<ComplaintsMasterDto> ltComplaints = new ArrayList<ComplaintsMasterDto>();
		ltComplaints = subObjService.getAllComplaints(request);
		ComplaintsMasterDto obj = new ComplaintsMasterDto();
		obj.setLstComplaints(ltComplaints);
		return obj;
	}
	/**
	 * @author Vikas @date 8_March-2018 these methods are used to map request
	 *         with services for Delete Selected Complaint
	 * **/
	@RequestMapping(value = "/deleteComplaint", method = RequestMethod.POST)
	public @ResponseBody
	String deleteComplaints(@RequestParam("complaintId") Integer complaintId,HttpServletRequest request) {
		boolean response = subObjService.deleteComplaint(complaintId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/**
	 * @author Vikas @date 8_March-2018 these methods are used to map request
	 *         with services for Save Findings
	 * **/
	@RequestMapping(value = "/saveFindings", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateFindings(FindingMasterDto findingMasterDto,
			HttpServletRequest request) {
		int response = subObjService.saveOrUpdateFindings(findingMasterDto, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	/**
	 * @author Vikas @date 8_March-2018 these methods are used to map request
	 *         with services for Fetch All Findings
	 * **/
	@RequestMapping(value = "/getAllFindings", method = RequestMethod.POST)
	public @ResponseBody
	FindingMasterDto getFindingsDetails(HttpServletRequest request) {
		List<FindingMasterDto> ltFindings = new ArrayList<FindingMasterDto>();
		ltFindings = subObjService.getAllFindings(request);
		FindingMasterDto obj = new FindingMasterDto();
		obj.setLstFindings(ltFindings);
		return obj;
	}
	
	/**
	 * @author Vikas @date 8_March-2018 these methods are used to map request
	 *         with services for Delete Selected Finding
	 * **/
	
	@RequestMapping(value = "/deleteFinding", method = RequestMethod.POST)
	public @ResponseBody
	String deleteFindings(@RequestParam("findingId") Integer findingId,HttpServletRequest request) {
		boolean response = subObjService.deleteFinding(findingId,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	/**
	 * @author Vikas @date 13_March-2018 these methods are used to map request
	 *         with services for save sub obj template type
	 * **/
	@RequestMapping(value = "/saveSubObjTempType", method = RequestMethod.POST)
	@ResponseBody
	public String saveOrUpdateSubObjTempType(SubObjTempTypeDto subObjTempTypeMaster,
			HttpServletRequest request) {
		int response = subObjService.saveOrUpdateSubObjTempType(subObjTempTypeMaster, request);
		String msg = "";
		if (response == 1) {
			msg = "Records Saved Sucessfully";
		} else if (response == 2) {
			msg = "Records Updated Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;	
	}
	
	/**
	 * @author Vikas @date 13_March-2018 these methods are used to map request
	 *         with services for Fetch All Sub Obj Template Type
	 * **/
	@RequestMapping(value = "/getAllSubObjTempType", method = RequestMethod.POST)
	public @ResponseBody
	SubObjTempTypeDto getSubObjTempTypes(HttpServletRequest request) {
		List<SubObjTempTypeDto> ltSubObjTempTypes = new ArrayList<SubObjTempTypeDto>();
		ltSubObjTempTypes = subObjService.getAllSubObjTempTypes(request);
		SubObjTempTypeDto obj = new SubObjTempTypeDto();
		obj.setLstSubObjTempType(ltSubObjTempTypes);
		return obj;
	}
	
	/**
	 * @author Vikas @date 13_March-2018 these methods are used to map request
	 *         with services for Delete Selected Sub Obj Template Type
	 * **/
	@RequestMapping(value = "/deleteTemplateType", method = RequestMethod.POST)
	public @ResponseBody
	String deleteTempType(@RequestParam("tempTypeId") Integer subObjTempTypeId,HttpServletRequest request) {
		boolean response = subObjService.deleteTempType(subObjTempTypeId,request);
				 
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/autoSuggestionBodyPartNames", method = RequestMethod.POST)
	@ResponseBody
	public BodyPartMasterDto getAllBodyPartList(@RequestParam("letter") String letter) {
		 
		BodyPartMasterDto ltBodyPartMasterDto = new  BodyPartMasterDto();
		ltBodyPartMasterDto = subObjService.getAutoSuggestionBodyPartNames(letter);	
		return ltBodyPartMasterDto;
	}
	
	@RequestMapping(value = "/autoSuggestionSubObjTemp", method = RequestMethod.POST)
	@ResponseBody
	public SubObjTemplateDto getAllSubObjAutoSugg(@RequestParam("letter") String letter) {
		 
		SubObjTemplateDto ltAutoSuggSubObjTemp = new  SubObjTemplateDto();
		ltAutoSuggSubObjTemp = subObjService.getAutoSuggestionSubObjTemp(letter);	
		return ltAutoSuggSubObjTemp;
	}
	
	@RequestMapping(value = "/autoSuggestionChemo", method = RequestMethod.POST)
	@ResponseBody
	public ChemoTheropyMaterDto getAllAutoSuggChemo(@RequestParam("letter") String letter) {
		 
		ChemoTheropyMaterDto ltAutoSuggChemo = new  ChemoTheropyMaterDto();
		ltAutoSuggChemo = subObjService.getAutoSuggestionChemo(letter);	
		return ltAutoSuggChemo;
	}
	
	@RequestMapping(value = "/autoSuggQsnMaster", method = RequestMethod.POST)
	@ResponseBody
	public QuestionMasterDto getAllAutoSuggQsn(@RequestParam("letter") String letter) {
		 
		QuestionMasterDto ltAutoSuggQsn = new  QuestionMasterDto();
		ltAutoSuggQsn = subObjService.getAutoSuggQsnMaster(letter);	
		return ltAutoSuggQsn;
	}
	
	@RequestMapping(value = "/autoSuggComplaints", method = RequestMethod.POST)
	@ResponseBody
	public ComplaintsMasterDto getAllAutoSuggComplaints(@RequestParam("letter") String letter) {
		 
		ComplaintsMasterDto ltAutoSuggComplaints = new  ComplaintsMasterDto();
		ltAutoSuggComplaints = subObjService.getAutoSuggComplaints(letter);	
		return ltAutoSuggComplaints;
	}
	
	@RequestMapping(value = "/autoSuggFindings", method = RequestMethod.POST)
	@ResponseBody
	public FindingMasterDto getAllAutoSuggFindings(@RequestParam("letter") String letter) {
		 
		FindingMasterDto ltAutoSuggFindings = new  FindingMasterDto();
		ltAutoSuggFindings = subObjService.getAutoSuggFindings(letter);	
		return ltAutoSuggFindings;
	}
	
	@RequestMapping(value = "/autoSuggSubObjTempType", method = RequestMethod.POST)
	@ResponseBody
	public SubObjTempTypeDto getAllAutoSuggSubObjTempType(@RequestParam("letter") String letter) {
		 
		SubObjTempTypeDto ltAutoSuggSubObjTempType = new  SubObjTempTypeDto();
		ltAutoSuggSubObjTempType = subObjService.getAutoSuggSubObjTempType(letter);	
		return ltAutoSuggSubObjTempType;
	}
	
	@RequestMapping(value = "/deleteSubObjTemplate", method = RequestMethod.POST)
	public @ResponseBody
	String deleteSubObjTemplate(@RequestParam("oncoEmrTemplateId") Integer oncoEmrTemplateId,HttpServletRequest request) {
		boolean response = subObjService.deleteSubObjTemplate(oncoEmrTemplateId,request);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}
	
	@RequestMapping(value = "/savemortuaryReg",method=RequestMethod.POST)
	public void show(){
		System.err.println("Hiii ");
	}
}
