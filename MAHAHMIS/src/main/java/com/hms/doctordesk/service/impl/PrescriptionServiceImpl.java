package com.hms.doctordesk.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.doctordesk.dao.PresInstructionDao;
import com.hms.doctordesk.dao.PrescriptionDao;
import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplateMedicineDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplatesDTO;
import com.hms.doctordesk.dto.PresTemplateMaster;
import com.hms.doctordesk.dto.PrescriptionGenericDTO;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.doctordesk.service.PrescriptionInstructionService;
import com.hms.doctordesk.service.PrescriptionService;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.UomMaster;

@Service
@Transactional
public class PrescriptionServiceImpl implements PrescriptionService{

	@Autowired
	PrescriptionDao prescriptionDao;

	public List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request) {
		return prescriptionDao.getAllPreDetails(request);
	}

	@Override
	public List<PreparationMaster> fetchPreparationMaster() {
		return prescriptionDao.fetchPreparationMaster();
	}

	@Override
	public List<RouteMaster> getRoutesByPreparationId(Integer prepID, Integer unitId, HttpServletRequest request) {
		return prescriptionDao.getRoutesByPreparationId(prepID,unitId, request);
	}

	@Override
	public List<RouteMaster> getAllRoutesForPrescription(Integer unitId, HttpServletRequest request) {
		return prescriptionDao.getAllRoutesForPrescription(unitId, request);
	}

	@Override
	public int saveOPDPrescription(OPDPrescriptionDto obj, HttpServletRequest request, Integer productId) {
		return prescriptionDao.saveOPDPrescription(obj, request, productId);
	}

	@Override
	public List<ProductMaster> autoSuggestionProductlist(String letter, String prep) {
		return prescriptionDao.autoSuggestionProductlist(letter, prep);
	}

	@Override
	public ProductMaster getMedicineById(Integer productId) {
		return prescriptionDao.getMedicineById(productId);
	}

	@Override
	public List<UomMaster> fetchAllUnits(HttpServletRequest request) {
		return prescriptionDao.fetchAllUnits(request);
	}

	@Override
	public List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId) {
		return prescriptionDao.getAllPrescriptionsByTreatmentId(treatmentId, unitId);
	}

	@Override
	public OPDPrescriptionDtoSP getPrescriptionById(Integer unitId, Integer prescriptionId) {
		return prescriptionDao.getPrescriptionById(unitId, prescriptionId);
	}

	/*
	 * @Override public boolean deleteOPDPrescription(Integer unitId, Integer
	 * prescriptionId, HttpServletRequest request) { return
	 * prescriptionDao.deleteOPDPrescription(unitId, prescriptionId, request); }
	 */
	
	@Override
	public boolean deleteOPDPrescription(Integer unitId, String prescriptionId, HttpServletRequest request) {
		return prescriptionDao.deleteOPDPrescription(unitId, prescriptionId, request);
	}


	@Override
	public int saveOPDPrescriptionTemplates(OPDPrescriptionTemplatesDTO obj, HttpServletRequest request) {
		return prescriptionDao.saveOPDPrescriptionTemplates(obj, request);
	}

	@Override
	public List<OPDPrescriptionTemplatesDTO> fetchOPDPrescriptionTemplatesByID(Integer templateId, HttpServletRequest request) {
		return prescriptionDao.fetchOPDPrescriptionTemplatesByID(templateId, request);
	}

	@Override
	public int saveUpdateOPDPrescTempMeds(OPDPrescriptionTemplateMedicineDto obj, HttpServletRequest request, Integer templateId) {
		return prescriptionDao.saveUpdateOPDPrescTempMeds(obj, request, templateId);
	}

	@Override
	public OPDPrescriptionTemplateMedicineDto getOPDPrescriptionTemplateMedicineById(Integer unitId, Integer templateMedicineId) {
		return prescriptionDao.getOPDPrescriptionTemplateMedicineById(unitId, templateMedicineId);
	}

	@Override
	public boolean deleteOPDPrescriptionTemplateMedicine(Integer unitId, Integer templateMedicineId, HttpServletRequest request) {
		return prescriptionDao.deleteOPDPrescriptionTemplateMedicine(unitId, templateMedicineId, request);
	}

	@Override
	public boolean usePrescriptionTemp(Integer treatmentId, Integer patientId, Integer templateId, HttpServletRequest request) {
		return prescriptionDao.usePrescriptionTemp(treatmentId, patientId, templateId, request);
	}

	@Override
	public boolean deleteOPDPrescriptionTemplate(Integer unitId, Integer templateId, HttpServletRequest request) {
		return prescriptionDao.deleteOPDPrescriptionTemplate(unitId, templateId, request);
	}

	@Override
	public String addPrescriptionAsNEWOPDTemplate(OPDPrescriptionTemplatesDTO newDto, String[] prescriptionIDArray, Integer unitId, HttpServletRequest request) {
		return prescriptionDao.addPrescriptionAsNEWOPDTemplate(newDto, prescriptionIDArray, unitId, request);
	}

	@Override
	public String updateOpdTemplateWithNewMedicines(Integer templateId, String[] prescriptionIDArray, Integer unitId, HttpServletRequest request) {
		return prescriptionDao.updateOpdTemplateWithNewMedicines(templateId, prescriptionIDArray, unitId, request);
	}

	@Override
	public int savefollowUpForOPDPatient(OPDPrescriptionFolloUpDto opdFolloUp, Integer treatmentId, HttpServletRequest request) {
		return prescriptionDao.savefollowUpForOPDPatient(opdFolloUp, treatmentId, request);
	}

	@Override
	public OPDPrescriptionFolloUpDto getfollowUpForOPDPatient(Integer unitId, Integer treatmentId) {
		return prescriptionDao.getfollowUpForOPDPatient(unitId, treatmentId);
	}

	@Override
	public List<MedicationMaster> paediatricsMedicineAutoSuggestList(String prep, String letter) {
		return prescriptionDao.paediatricsMedicineAutoSuggestList(prep, letter);
	}

	@Override
	public MedicationMaster getPaediatricsMedicineById(Integer id) {
		return prescriptionDao.getPaediatricsMedicineById(id);
	}

	@Override
	public List<OPDPrescriptionDto> getPharmacyStockMedicine(String prep, String letter) {
		// TODO Auto-generated method stub
		return prescriptionDao.getPharmacyStockMedicine(prep,letter);
	}

	@Override
	public OPDPrescriptionDto getMedicineFromStockById(Integer id) {
		// TODO Auto-generated method stub
		return prescriptionDao.getMedicineFromStockById(id);
	}

	@Override
	public List<OPDPrescriptionDtoSP> getAllPrescriptionsNursingStation(Integer treatmentId, Integer unitId,String date) {
		// TODO Auto-generated method stub
		return prescriptionDao.getAllPrescriptionsNursingStation(treatmentId, unitId,date);
	}

	@Override
	public PreparationMaster getPreparationById(Integer id) {
		// TODO Auto-generated method stub
		return prescriptionDao.getPreparationById(id);
	}

	@Override
	public List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentIdDateWise(Integer treatmentId, Integer unitId,String date) {
		// TODO Auto-generated method stub
		return prescriptionDao.getAllPrescriptionsByTreatmentIdDateWise(treatmentId, unitId,date);
	}
	
	@Override
	public int updateIPDPrescriptionSequence(HttpServletRequest request, Integer treatmentId,String prescriptionId) {
		return prescriptionDao.updateIPDPrescriptionSequence(request, treatmentId,prescriptionId);
	}

	

	
	
}