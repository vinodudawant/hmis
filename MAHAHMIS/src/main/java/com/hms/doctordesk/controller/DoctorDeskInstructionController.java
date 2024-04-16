package com.hms.doctordesk.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;
import com.hms.doctordesk.service.DoctorDeskInstructionService;

@Controller
@RequestMapping(value="/ddinstruction")
public class DoctorDeskInstructionController {

	@Autowired
	 DoctorDeskInstructionService doctorDeskInstructionService;
	
	static Logger log=Logger.getLogger(DoctorDeskInstructionController.class.getName());
	
	
	/**
	 * @author :Navnath Erande
	 * @Date :20-02-2020
	 * @Code :This method is fetch Group Instruction Master
	 * @return
	 **/

	@ResponseBody
	@RequestMapping(value="fetchgroupinstructionmaster")
	public GroupInstructionMaster  fetchGroupInstructionMaster(@RequestParam ("value")String value
			)
	{
		log.info("In DoctorDesk fetchGroupInstructionMaster()");
		GroupInstructionMaster groupinstructionmaster=new GroupInstructionMaster();
		List<GroupInstructionMaster> list=doctorDeskInstructionService.fetchGroupInstructionMaster(value);
		System.out.println();
		groupinstructionmaster.setGroupinstructionmasterlist(list);
		log.debug("Reponse----> "+groupinstructionmaster);
		return groupinstructionmaster;
	}
	
	
	/**
	 * @author :Navnath Erande
	 * @Date :20-02-2020
	 * @Code :This method is fetch Group Instruction Master
	 * @return
	 **/

	@ResponseBody
	@RequestMapping(value="fetchgrouptemplateinstructionmaster")
	public GroupTemplateMaster  fetchGroupTemplateInstructionMaster(@RequestParam ("value")String value
			)
	{
		log.info("In DoctorDesk fetchGroupTemplateInstructionMaster()");
		GroupTemplateMaster groupinstructionmaster=new GroupTemplateMaster();
		List<GroupTemplateMaster> list=doctorDeskInstructionService.fetchGroupTemplateInstructionMaster(value);
		System.out.println();
		groupinstructionmaster.setGrouptemplatemasterlist(list);
		log.debug("Reponse----> "+groupinstructionmaster);
		return groupinstructionmaster;
	}
	
	
	/**
	 * @author :Navnath Erande
	 * @Date :20-02-2020
	 * @Code :This method is fetch Group Instruction Master
	 * @return
	 **/

	@ResponseBody
	@RequestMapping(value="fetchtamplategroup")
	public GroupTemplateMaster  fetchtamplategroup(@RequestParam ("value")String value)
	{
		log.info("In DoctorDesk fetchtamplategroup()");
		GroupTemplateMaster grouptemplatemaster=doctorDeskInstructionService.fetchtamplategroup(value);
		log.debug("Reponse----> "+grouptemplatemaster);
		return grouptemplatemaster;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :20-02-2020
	 * @Code :This method is save doctor Instruction 
	 * @return
	 **/

	@ResponseBody
	@RequestMapping(value="/saveinstructiondd")
	public Integer  saveInstructionDd(@RequestParam ("obj")String obj)
	{
		log.info("In DoctorDesk saveInstructionDd()");
		Integer response=doctorDeskInstructionService.saveInstructionDd(obj);
		log.debug("Reponse----> ");
		return response;
	}

	/**
	 * @author :Navnath Erande
	 * @Date :22-02-2020
	 * @Code :This method is fetch Instruction
	 * @return
	 **/

	@ResponseBody
	@RequestMapping(value="/fetchinstruction")
	public DoctorDeskInstructionDto fetchInstruction(@RequestParam ("tid")Integer tid)
	{
		log.info("In DoctorDesk fetchInstruction()");
		DoctorDeskInstructionDto doctordeskinstructiondto=new DoctorDeskInstructionDto();
		List<DoctorDeskInstructionDto> list=doctorDeskInstructionService.fetchInstruction(tid);
		doctordeskinstructiondto.setDoctordeskinstructiondtolist(list);
		log.debug("Reponse----> "+doctordeskinstructiondto);
		return doctordeskinstructiondto;
	}
	
	/**
	 * @author :Navnath Erande
	 * @Date :22-02-2020
	 * @Code :This method is fetch Cover Shit Information Patient
	 * @return
	 **/
	@ResponseBody
	@RequestMapping(value="/covershitinformationpatient")
	public Doctordeskopderdto  coverShitInformationPatient(@RequestParam ("treatmentId")Integer treatmentId,@RequestParam ("dpid")Integer dpid)
	{
		log.info("In DoctorDesk coverShitInformationPatient()");
		Doctordeskopderdto obj=doctorDeskInstructionService.coverShitInformationPatient(treatmentId,dpid);
		log.debug("Reponse----> ");
		return obj;
	}
	
	
	@RequestMapping(value = "/saveIndivisualInstruction", method = RequestMethod.POST)
	public @ResponseBody int saveIndivisualInstruction(OPDReportInstructionDTO obj){
			
		
		int response = doctorDeskInstructionService.saveIndivisualInstruction(obj);
		return response;
	}
	
	@RequestMapping(value = "/getListOfIndivisualInstruction", method = RequestMethod.GET)
	public @ResponseBody OPDReportInstructionDTO getListOfIndivisualInstruction(@RequestParam("unitId") Integer unitId){
			
		List<OPDReportInstructionDTO> listindivisual = new ArrayList<OPDReportInstructionDTO>();
		listindivisual = doctorDeskInstructionService.getListOfIndivisualInstruction();
		OPDReportInstructionDTO obj = new OPDReportInstructionDTO();
		obj.setGetListOfOPDInstructionDTO(listindivisual);
		return obj;
	}
	
	
	@RequestMapping(value = "/deleteIndivisualInstruction", method = RequestMethod.GET)
	public @ResponseBody int deleteIndivisualInstruction(@RequestParam("instructionIds") String instructionIds,@RequestParam("userId") Integer userId){
			
		int res=0;
		res = doctorDeskInstructionService.deleteIndivisualInstruction(instructionIds, userId);
		return res;
	}
	
	@RequestMapping(value = "/editIndivisualInstruction", method = RequestMethod.GET)
	public @ResponseBody OPDReportInstructionDTO editIndivisualInstruction(@RequestParam("instructionId") Integer instructionId){
			
		OPDReportInstructionDTO obj = new OPDReportInstructionDTO();
		obj = doctorDeskInstructionService.editIndivisualInstruction(instructionId);
		return obj;
	}
	
	@RequestMapping(value = "/getIndivisualInstructions", method = RequestMethod.GET)
	public @ResponseBody OPDReportInstructionDTO getIndivisualInstructions(@RequestParam("unitId") Integer unitId, @RequestParam("treatmentId") Integer treatmentId){
			
		List<OPDReportInstructionDTO> listindivisual = new ArrayList<OPDReportInstructionDTO>();
		listindivisual = doctorDeskInstructionService.getIndivisualInstructions(unitId, treatmentId);
		OPDReportInstructionDTO obj = new OPDReportInstructionDTO();
		obj.setGetListOfOPDInstructionDTO(listindivisual);
		return obj;
	}
}
