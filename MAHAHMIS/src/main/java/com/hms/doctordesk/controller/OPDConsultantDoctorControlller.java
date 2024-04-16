package com.hms.doctordesk.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.doctordesk.dto.OPDConstultantDoctorDto;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDTokenDto;
import com.hms.doctordesk.service.OPDConsultantDoctorService;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.registration.controller.RegisterController;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;

@Controller
@RequestMapping(value = "/opdconsultant")
public class OPDConsultantDoctorControlller {
	static Logger log=Logger.getLogger(RegisterController.class.getName());
	
	@Autowired
	OPDConsultantDoctorService  cService;
	
	//@author : HM00054 @reason : To fetch doctor specialization data 
		@ResponseBody
		@RequestMapping(value = "/getSpecialization", method = RequestMethod.POST)
		public SpecializationDto getSpecialization(@RequestBody SpecializationDto regDto) {
			
			log.info("In RegisterController getSpecialization()");
			regDto = cService.getSpecialization(regDto);
			log.debug("Response--------> "+regDto);
			return regDto;
		}
		
		//@author : HM00054 @reason : To fetch doctor specialization data 
		@ResponseBody
		@RequestMapping(value = "/getDoctorBySpecialization", method = RequestMethod.POST)
		public SpecialityWiseDoctorDto getDoctorBySpecialization(@RequestBody SpecialityWiseDoctorDto regDto) {
			
			log.info("In RegisterController getDoctorBySpecialization()");
			regDto = cService.getDoctorBySpecialization(regDto);
			log.debug("Response--------> "+regDto);
			return regDto;
		}
	
		
		//@author : HM00054 @reason : To save consultant doctor details  data 
		@RequestMapping(value = "/addNewConsultantOpd", method = RequestMethod.POST)
		public @ResponseBody
		int addNewConsultantOpd(@RequestParam("patientId") Integer patientId,
				@RequestParam("treatmentId") Integer treatmentId,@RequestParam("doctorId") Integer doctorId,
				String serviceDate,@RequestParam("queryType") String queryType,HttpServletRequest request) {
			int res=0;

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			BillDetailsDto obj = new BillDetailsDto();
			obj.setPatienttId(patientId);
			obj.setTreatmentId(treatmentId);
			obj.setDoctorId(doctorId);
			obj.setCreatedBy(userId);
			obj.setUnitId(unitId);
			log.info("In addNewConsultantOpd ......");
			  res=cService.addNewConsultantOpd(obj,queryType);
			log.debug("addNewConsultantOpd Response--------> "+res);
			return  res;
		}
		
		//@author : HM00054 @reason : getlstOPDConsultantDoctor data 
		@RequestMapping(value = "/getlstOPDConsultantDoctor", method = RequestMethod.POST)
		@ResponseBody	
		public OPDConstultantDoctorDto getlstOPDConsultantDoctor(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("patientId") Integer patientId,@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
			OPDConstultantDoctorDto obj=new OPDConstultantDoctorDto();
			log.info("In  getlstOPDConsultantDoctorByTreatmentId()");
			List<OPDConstultantDoctorDto> list = cService.getlstOPDConsultantDoctor(treatmentId, patientId, unitId);
			log.debug("getlstOPDConsultantDoctorByTreatmentId Response--------> "+list);
			obj.setLstOPDDoctorConsultantlist(list);
			return obj;
		}
		
		//@author : HM00054 @reason : getLatestConsultantDoctorIdByTreatment  
		@RequestMapping(value = "/getLatestConsultantDoctorIdByTreatment", method = RequestMethod.POST)
		@ResponseBody	
		public int getLatestConsultantDoctorIdByTreatment(@RequestParam("treatmentId") Integer treatmentId, HttpServletRequest request) {
			int res=0;
			log.info("In  getLatestConsultantDoctorIdByTreatment()");
			res= cService.getLatestConsultantDoctorIdByTreatment(treatmentId);
			log.debug("getLatestConsultantDoctorIdByTreatment Response--------> "+res);
			
			return res;
		}
		
		//@author : HM00054 @reason : getDepartNameByDoctorId
		@RequestMapping(value = "/getDepartNameByDoctorId", method = RequestMethod.POST)
		@ResponseBody	
		public int getDepartNameByDoctorId(@RequestParam("doctorId") Integer doctorId, HttpServletRequest request) {
			int res=0;
			log.info("In  getDepartNameByDoctorId()");
			res= cService.getDepartNameByDoctorId(doctorId);
			log.debug("getDepartNameByDoctorId Response--------> "+res);
			
			return res;
		}
		
		//@author : HM00054 @reason : cheUpDoneOrCancelOPD
		@RequestMapping(value = "/cheUpDoneOrCancelOPD", method = RequestMethod.POST)
		@ResponseBody	
		public String cheUpDoneOrCancelOPD(OPDTokenDto obj, HttpServletRequest request) {
			String  msg="0";
			log.info("In  cheUpDoneOrCancelOPD()");
			msg= cService.checkUpDoneOrCancelOPD(obj);
			log.debug("cheUpDoneOrCancelOPD Response--------> "+msg);
			
			return msg;
		}
		
		//@author : HM00098 @reason : list of ipd getlstOPDConsultantDoctor
		@RequestMapping(value = "/getlstIPDConsultantDoctor", method = RequestMethod.POST)
		@ResponseBody	
		public OPDConstultantDoctorDto getlstIPDConsultantDoctor(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("patientId") Integer patientId,@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
			OPDConstultantDoctorDto obj=new OPDConstultantDoctorDto();
			log.info("In  getlstOPDConsultantDoctorByTreatmentId()");
			List<OPDConstultantDoctorDto> list = cService.getlstIPDConsultantDoctor(treatmentId, patientId, unitId);
			log.debug("getlstOPDConsultantDoctorByTreatmentId Response--------> "+list);
			obj.setLstOPDDoctorConsultantlist(list);
			return obj;
		}
		
		//@author : HM00098 @reason : To save consultant doctor details  data for Ipd 
				@RequestMapping(value = "/addNewConsultantIpd", method = RequestMethod.POST)
				public @ResponseBody
				int addNewConsultantIpd(@RequestParam("patientId") Integer patientId,
						@RequestParam("treatmentId") Integer treatmentId,@RequestParam("doctorId") Integer doctorId,
						String serviceDate,@RequestParam("queryType") String queryType,HttpServletRequest request) {
					int res=0;

					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					
					BillDetailsIpdDto obj = new BillDetailsIpdDto();
					obj.setPatienttId(patientId);
					obj.setTreatmentId(treatmentId);
					obj.setDoctorId(doctorId);
					obj.setCreatedBy(userId);
					obj.setUnitId(unitId);
					log.info("In addNewConsultantOpd ......");
					  res=cService.addNewConsultantIpd(obj,queryType);
					log.debug("addNewConsultantOpd Response--------> "+res);
					return  res;
				}
				
				//@author : vishant @reason : list of ipd getIPDConsultantDoctorNew
				@RequestMapping(value = "/getIPDConsultantDoctorNew", method = RequestMethod.POST)
				@ResponseBody	
				public OPDConstultantDoctorDto getIPDConsultantDoctorNew(@RequestParam("treatmentId") Integer treatmentId,@RequestParam("patientId") Integer patientId,@RequestParam("unitId") Integer unitId, HttpServletRequest request) {
					OPDConstultantDoctorDto obj=new OPDConstultantDoctorDto();
					log.info("In  getlstOPDConsultantDoctorByTreatmentId()");
					List<OPDConstultantDoctorDto> list = cService.getIPDConsultantDoctorNew(treatmentId, patientId, unitId);
					log.debug("getlstOPDConsultantDoctorByTreatmentId Response--------> "+list);
					obj.setLstOPDDoctorConsultantlist(list);
					return obj;
				}		
}
