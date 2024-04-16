package com.hms.doctordesk.service.impl;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OPDSxAdviceDao;
import com.hms.doctordesk.dto.OPDCareAdviceDTO;
import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.doctordesk.dto.OPDPlanOfTreatmentDTO;
import com.hms.doctordesk.dto.OPDRadioTheorapyMaster;
import com.hms.doctordesk.dto.OPDRadioTheropyCheckBox;
import com.hms.doctordesk.dto.OPDRadioTheropySlave;
import com.hms.doctordesk.dto.OPDSxAdvicedDTO;
import com.hms.doctordesk.service.OPDSxAdviceService;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ot.dto.Operation;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class OPDSxAdviceServiceImpl implements OPDSxAdviceService  {

	@Autowired
	OPDSxAdviceDao sxaddao;
	@Autowired
	SessionFactory sf;
	
	@Override
	@Transactional
	public int saveOPDSxAdvice(OPDSxAdvicedDTO obj, Integer patientId, Integer treatmentId) {
		
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		return sxaddao.saveOPDSxAdvice(obj);
	}

	@Override
	@Transactional
	public List<OPDSxAdvicedDTO> getOPDSxAdviceListByTreatmentId(Integer treatmentId, Integer unitId) {
		
		return sxaddao.getOPDSxAdviceListByTreatmentId(treatmentId, unitId);
	}

	@Override
	@Transactional
	public OPDSxAdvicedDTO editOPDSxAdvice(Integer id) {
		
		return sxaddao.editOPDSxAdvice(id);
	}

	@Override
	@Transactional
	public int deleteOPDSxAdvice(Integer id,Integer userId) {
		
		return sxaddao.deleteOPDSxAdvice(id,userId);
	}

	@Override
	@Transactional
	public int saveOPDRadioTheropy(OPDRadioTheorapyMaster obj, String radioSlaveDetails,Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		OPDRadioTheropySlave radioTheorapySlaveObj = (OPDRadioTheropySlave) ConfigUIJSONUtility.getObjectFromJSON(radioSlaveDetails,
						OPDRadioTheropySlave.class);
		List<OPDRadioTheropySlave> radioTheorapySlave=  radioTheorapySlaveObj.getGetListOfTheropySlaveDTO();
		obj.setGetListOfTheropySlaveDTO(radioTheorapySlave);
		return sxaddao.saveOPDRadioTheropy(obj);
	}

	@Override
	@Transactional
	public List<OPDRadioTheorapyMaster> getOPDRadioTheropyListByTreatmentId(Integer treatmentId, Integer unitId) {
		
		return sxaddao.getOPDRadioTheropyListByTreatmentId(treatmentId, unitId);
	}

	@Override
	@Transactional
	public OPDRadioTheorapyMaster editOPDRadioTheropy(Integer id) {
		
		return sxaddao.editOPDRadioTheropy(id);
	}

	@Override
	@Transactional
	public int deleteOPDRadioTheropy(Integer id, Integer userId) {
		
		return sxaddao.deleteOPDRadioTheropy(id, userId);
	}

	@Override
	@Transactional
	public int saveOPDCareAdvice(OPDCareAdviceDTO obj, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		
		return sxaddao.saveOPDCareAdvice(obj);
	}

	@Override
	@Transactional
	public OPDCareAdviceDTO editOPDCareAdvice(Integer id) {
		
		return sxaddao.editOPDCareAdvice(id);
	}

	@Override
	@Transactional
	public List<OPDRadioTheropyCheckBox> getRadioTheropyCheckBoxList(String prefixCode) {
		// TODO Auto-generated method stub
		return sxaddao.getRadioTheropyCheckBoxList(prefixCode);
	}

	@Override
	@Transactional
	public int delteRadioTheropySlave(Integer id, Integer userId) {
		
		return sxaddao.delteRadioTheropySlave(id, userId);
	}

	@Override
	@Transactional
	public int saveOPDPlanOfTreatment(String planOfMasterDetails, Integer patientId, Integer treatmentId) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		OPDPlanOfTreatmentDTO planObj = (OPDPlanOfTreatmentDTO) ConfigUIJSONUtility.getObjectFromJSON(planOfMasterDetails,
				OPDPlanOfTreatmentDTO.class);
		 List<OPDPlanOfTreatmentDTO> list=   planObj.getGetListOfPlanOfTreatmentDTO();
		 int res=0;
		
		 for(OPDPlanOfTreatmentDTO obj:list) {
			 obj.setPatientObj(pobj);
			 obj.setTreatObj(tobj);
			 // sxaddao.saveOPDPlanOfTreatment(obj);
			 sf.getCurrentSession().merge(obj);
			  res=1;
		 }
		return res;
	}

	@Override
	@Transactional
	public List<OPDPlanOfTreatmentDTO> getOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId, Integer unitId) {
		
		return sxaddao.getOPDPlanOfTreatmentListByTreatmentId(treatmentId, unitId);
	}

	@Override
	@Transactional
	public int deltePlanOfTreatment(Integer id, Integer userId) {
		
		return sxaddao.deltePlanOfTreatment(id, userId);
	}

	@Override
	@Transactional
	public int saveOPDChemoTheropy(OPDChemoTheropyDTO obj, Integer patientId, Integer treatmentId,String nextBloodTestDate,String nextChemoDate,String nextVisitDate) {
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		
		DateFormat formatter = new SimpleDateFormat("YYYY-MM-DD"); 
		
		try {
			Date date1 = (Date)formatter.parse(nextBloodTestDate);
			Date date2 = (Date)formatter.parse(nextChemoDate);
			Date date3 = (Date)formatter.parse(nextVisitDate);
			obj.setPatientObj(pobj);
			obj.setTreatObj(tobj);
			//obj.setNextBloodTestDate(date1);
			//obj.setNextChemoDate(date2);
			//obj.setNextVisitDate(date3);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		
		return sxaddao.saveOPDChemoTheropy(obj);
	}

	@Override
	@Transactional
	public List<OPDChemoTheropyDTO> getOPDChemoListByTreatmentId(Integer treatmentId, Integer unitId) {
		
		return sxaddao.getOPDChemoListByTreatmentId(treatmentId, unitId);
	}

	

	@Override
	@Transactional
	public OPDChemoTheropyDTO editOPDChemoByTreatmentIdAndDate(Integer treatmentId, String userDate) {
		
		return sxaddao.editOPDChemoByTreatmentIdAndDate(treatmentId, userDate);
	}

	@Override
	@Transactional
	public Operation getOpreationName(Integer procedureType, Integer procedureGroup) {
		// TODO Auto-generated method stub
		return sxaddao.getOpreationName(procedureType, procedureGroup);
	}

	@Override
	@Transactional
	public OPDChemoTheropyDTO getOPDChemoByTreatmentIdForPrint(Integer treatmentId) {
		
		return sxaddao.getOPDChemoByTreatmentIdForPrint(treatmentId);
	}

	@Override
	@Transactional
	public List<OPDRadioTheropyCheckBox> getCheckListOPDPlanOfTreatmentListByTreatmentId(Integer treatmentId,
			Integer unitId) {
		// TODO Auto-generated method stub
		return sxaddao.getCheckListOPDPlanOfTreatmentListByTreatmentId(treatmentId,unitId);
	}

}
