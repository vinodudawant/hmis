package com.hms.ehat.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.DialysisDao;
import com.hms.ehat.dto.BloodTransfusionDTO;
import com.hms.ehat.dto.DialysisAdviceDto;


import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.DialysisDto;
import com.hms.ehat.dto.DialysisSchedulerDto;
import com.hms.ehat.dto.InformedConsentFormDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.UploadDocumentDialysisDto;
import com.hms.ehat.dto.DialysisDtoView;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.HaeRecordModialtsisDTO;
import com.hms.ehat.dto.HemodialysisCarePlanDto;
import com.hms.ehat.dto.PostDialysisTableDTO;
import com.hms.ehat.dto.VirologyVaccinationDTO;
import com.hms.ehat.service.DialysisService;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
@Service
public class DialysisSeviceImpl implements DialysisService {

	@Autowired
	DialysisDao dialysisDao;

	@Override
	@Transactional
	public List<IpdQueueDTO> getAlldialysisPatient() {
		// TODO Auto-generated method stub
		return dialysisDao.getAlldialysisPatient();
	}

	@Override
	@Transactional
	public List<IpdBillPatientsBedsDTO> viewIpdbillPatientsBedsWithDialysis() {
		return dialysisDao.viewIpdbillPatientsBedsWithDialysis();

	}

	@Override
	@Transactional
	public int saveDialysisAdvice(DialysisAdviceDto dialysisdto,
			HttpServletRequest request) {
	
		if (dialysisdto.getDialysisAdviceId() == 0) {
			
			dialysisdto.setIndicationId(dialysisdto.getIndicationId());	
			dialysisdto.setDialysisType(dialysisdto.getDialysisType());
			dialysisdto.setFrequencyDialysis(dialysisdto.getFrequencyDialysis());
			dialysisdto.setNote(dialysisdto.getNote());
			dialysisdto.setTreatmentId(dialysisdto.getTreatmentId());
			dialysisdto.setPid(dialysisdto.getPid());
	
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			dialysisdto.setCreatedBy(userId);
			dialysisdto.setCreatedBy(dialysisdto.getCreatedBy());
			dialysisdto.setDeleted("N");
			

		} else {
			dialysisdto.setIndicationId(dialysisdto.getIndicationId());	
			dialysisdto.setDialysisType(dialysisdto.getDialysisType());
			dialysisdto.setFrequencyDialysis(dialysisdto.getFrequencyDialysis());
			dialysisdto.setNote(dialysisdto.getNote());
			dialysisdto.setTreatmentId(dialysisdto.getTreatmentId());
			dialysisdto.setPid(dialysisdto.getPid());
	
			HttpSession session = request.getSession();
			int userId = (int) session.getAttribute("userId1");
			dialysisdto.setUpdatedBy(dialysisdto.getUpdatedBy());
			dialysisdto.setDeleted("N");
			dialysisdto.setUpdatedBy(userId);
			dialysisdto.setUpdatedDate(new Date(new java.util.Date().getTime()));
		}

		
		if (dialysisDao.saveDialysisAdvice(dialysisdto,request)==1) 
		{
			if(dialysisdto.getDialysisAdviceId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
	}

	@Override
	@Transactional
	public List<DialysisAdviceDto> getDialysisAdviceList(Integer treatmentId) {
		return dialysisDao.getDialysisAdviceList(treatmentId);

	}

	@Override
	@Transactional
	public int saveHaeRecordModialtsis(String preDialysis, String postDialysis, HttpServletRequest request) {
		return dialysisDao.saveHaeRecordModialtsis(preDialysis, postDialysis, request);

	}
	

	@Override
	@Transactional
	public HaeRecordModialtsisDTO getDialysisListById(Integer treatmentId){
		return dialysisDao.getDialysisListById(treatmentId);
	}

	@Override
	@Transactional
	public int saveOnDialysisTable(String tableDialysis,
			HttpServletRequest request) {
		return dialysisDao.saveOnDialysisTable(tableDialysis, request);
	}

	@Override
	@Transactional
	public List<PostDialysisTableDTO> getOnDialysisTableListById(Integer treatmentId) {
		return dialysisDao.getOnDialysisTableListById(treatmentId);
	}

	@Override
	@Transactional
	public boolean deleteTableRows(String idTables, HttpServletRequest request) {
		return dialysisDao.deleteTableRows(idTables,request);
	}

	@Override
	@Transactional
	public int saveCarePlan(HemodialysisCarePlanDto hemodialysiscareplandto,
			HttpServletRequest request) {
	
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		if (hemodialysiscareplandto.getCareplanId() == 0) {

			
			
			hemodialysiscareplandto.setCareplanId(hemodialysiscareplandto
					.getCareplanId());
			hemodialysiscareplandto.setCreatedBy(userId);
			hemodialysiscareplandto.setDeleted("N");
			hemodialysiscareplandto.setUnitId(userId);

			hemodialysiscareplandto.setCreatedDate(new Date(new java.util.Date().getTime()));
		} else {
			hemodialysiscareplandto.setCareplanId(hemodialysiscareplandto
					.getCareplanId());
			hemodialysiscareplandto.setUpdatedBy(userId);
			hemodialysiscareplandto.setUnitId(userId);
			hemodialysiscareplandto.setDeleted("N");
			hemodialysiscareplandto.setUpdatedDate(new Date(
					new java.util.Date().getTime()));
		}
		if (dialysisDao.saveCarePlan(hemodialysiscareplandto, request) == 1) {
			if (hemodialysiscareplandto.getCareplanId() == 0) {
				return 1;
			} else {
				return 2;
			}
		} else {
			return 0;
		}
	}
	

	@Override
	@Transactional
	public List<HemodialysisCarePlanDto> getListCarePlanDialysis(Integer treatmentId) {
		return dialysisDao.getListCarePlanDialysis(treatmentId);
	}

	@Override
	@Transactional
	public int saveBloodtransfusionList(String bloodList,
			HttpServletRequest request) {
		
		return dialysisDao.saveBloodtransfusionList(bloodList, request);
	}

	@Override
	@Transactional
	public int savevirologyVaccinationList(String virologyVaccinationList,
			HttpServletRequest request) {
	
		return dialysisDao.savevirologyVaccinationList(virologyVaccinationList, request);
	}

	@Override
	@Transactional
	public List<BloodTransfusionDTO> getBloodTransfusionListById(
			Integer treatmentId) {
		return dialysisDao.getBloodTransfusionListById(treatmentId);

	}

	@Override
	@Transactional
	public List<VirologyVaccinationDTO> getVirologyVaccninationListById(
			Integer treatmentId) {
			return  dialysisDao.getVirologyVaccninationListById(treatmentId);
	}

	@Override
	@Transactional
	public boolean deleteForBloodTransfution(String idTables,
			HttpServletRequest request) {
		return dialysisDao.deleteForBloodTransfution(idTables,request);
	}

	@Override
	@Transactional
	public boolean deleteForVirologyVaccination(String idTables,
			HttpServletRequest request) {
		return dialysisDao.deleteForVirologyVaccination(idTables,request);
	}

	@Override
	@Transactional
	public int uploadDocumentOnDialysis(UploadDocumentDialysisDto updocs,
			HttpServletRequest request) {
		if (updocs.getUpid() == 0) {
		
			updocs.setFilePath(updocs.getFilePath());
			updocs.setNote(updocs.getNote());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			updocs.setUserId(userId);
			updocs.setDel("N");
		} else {

			updocs.setFilePath(updocs.getFilePath());
			updocs.setNote(updocs.getNote());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			updocs.setDel("N");
			updocs.setUserId(userId);
		}

			if (dialysisDao.uploadDocumentOnDialysis(updocs)==1) 
			{
				if(updocs.getUpid() == 0)
				{
					return 1;
				}else{
					return 2;
				}
			} else 
			{
				return 0;
			}
		}

	@Override
	@Transactional
	public List<UploadDocumentDialysisDto> fetchuploadDocument(Integer treatmentId) {

		return dialysisDao.fetchuploadDocument(treatmentId);
	}

	@Override
	@Transactional
	public boolean deleteuploadDocument(Integer upid, HttpServletRequest request) {
		return dialysisDao.deleteuploadDocument(upid,request);
	}


	@Override
	@Transactional
	public List<DialysisAdviceDto> getwardtypeName() {
		return dialysisDao.getwardtypeName();
	}

	@Override
	@Transactional
	public List<IpdBillPatientsBedsDTO> getwardtypeNameofBedNo(Integer wardId) {
		return dialysisDao.getwardtypeNameofBedNo(wardId);
	}

	@Override
	@Transactional
	public List<DialysisAdviceDto> autoSuggestionPatientNameDialysis(
			String patiename) {
		
		return dialysisDao.autoSuggestionPatientNameDialysis(patiename);
	}

	@Override
	@Transactional
	public int saveDialysisScheduler(DialysisSchedulerDto dialysisdto,
			HttpServletRequest request) {
	
		if (dialysisdto.getSchedulerId() == 0) {
			

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			dialysisdto.setCreatedBy(userId);
			dialysisdto.setCreatedBy(dialysisdto.getCreatedBy());
			dialysisdto.setDeleted("N");
			

		} else {

			
			HttpSession session = request.getSession();
			int userId = (int) session.getAttribute("userId1");
			dialysisdto.setUpdatedBy(dialysisdto.getUpdatedBy());
			dialysisdto.setDeleted("N");
			dialysisdto.setUpdatedBy(userId);
			dialysisdto.setUpdatedDate(new Date(new java.util.Date().getTime()));
		}

		
		if (dialysisDao.saveDialysisScheduler(dialysisdto,request)==1) 
		{
			if(dialysisdto.getSchedulerId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
	}

	@Override
	@Transactional
	public List<DialysisSchedulerDto> getPatientNameListAlreadyPresent(
			String schedulerDate, String wardId, String wardBedId) {
		
		return dialysisDao.getPatientNameListAlreadyPresent(schedulerDate, wardId, wardBedId);
	}

	@Override
	@Transactional
	public List<DialysisSchedulerDto> getPatientNameListDateWise(
			String schedulerDate) {
		return dialysisDao.getPatientNameListDateWise(schedulerDate);
	}

	@Override
	@Transactional
	public List<DialysisSchedulerDto> getPatientNameListDateAndWardWise(
			String schedulerDate, String wardId) {
		return dialysisDao.getPatientNameListDateAndWardWise(schedulerDate, wardId);

	}

	@Override
	@Transactional
	public List<DialysisSchedulerDto> getPatientNameListDateAndWardAndChairWise(
			String schedulerDate, String wardId, String wardBedId) {
		return dialysisDao.getPatientNameListDateAndWardAndChairWise(schedulerDate, wardId, wardBedId);

	}

	@Override
	@Transactional
	public List<DialysisAdviceDto> getdoctorName() {
	     return dialysisDao.getdoctorName();
	}

	@Override
	@Transactional
	public List<AutosugeestionDto> autoSuggestionForTestNameDialysis(
			String testname) {
		return dialysisDao.autoSuggestionForTestNameDialysis(testname);
	}
	
	
	@Override
	@Transactional
	public List<RegTreBillDto> fetchPatientsRecordByOnDialysisTreatmentId(
			Integer treatmentId) {
		
		return dialysisDao.fetchPatientsRecordByOnDialysisTreatmentId(treatmentId);
	}


	@Override
	@Transactional
	public List<IpdBillPatientsBedsDTO> getDialysisPatinetDateWise(String fromDate,String lastDate) {
		 return dialysisDao.getDialysisPatinetDateWise(fromDate,lastDate);
	}

	@Override
	@Transactional
	public int saveinformedconsentForm(InformedConsentFormDto fromdto,
			HttpServletRequest request) {
	
		if (fromdto.getInformedId() == 0) {
			

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			fromdto.setCreatedBy(userId);
			fromdto.setCreatedBy(fromdto.getCreatedBy());
			fromdto.setDeleted("N");
			

		} else {

			
			HttpSession session = request.getSession();
			int userId = (int) session.getAttribute("userId1");
			fromdto.setUpdatedBy(fromdto.getUpdatedBy());
			fromdto.setDeleted("N");
			fromdto.setUpdatedBy(userId);
			fromdto.setUpdatedDate(new Date(new java.util.Date().getTime()));
		}

		
		if (dialysisDao.saveinformedconsentForm(fromdto,request)==1) 
		{
			if(fromdto.getInformedId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
	}

	@Override
	@Transactional
	public List<InformedConsentFormDto> getinformedconsentForm(
			Integer treatmentId) {	
		return dialysisDao.getinformedconsentForm(treatmentId);
	}

	@Override
	@Transactional
	public List<IpdBillPatientsBedsDTO> getpatinetName(Integer patientId) {
		return dialysisDao.getpatinetName(patientId);
	}

	@Override
	@Transactional
	public List<DialysisAdviceDto> autoSuggestionPatientNameByDialysis(
			String patiename) {
		return dialysisDao.autoSuggestionPatientByNameDialysis(patiename);

	}

	@Override
	@Transactional
	public List<DialysisDto> getDialysisPreviousPatienttDetails(
			Integer patientId) {
		return dialysisDao.getDialysisPreviousPatienttDetails(patientId);

	}

	
	

}