package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.MedicationMaster;
import com.hms.doctordesk.dto.OPDPrescriptionDto;
import com.hms.doctordesk.dto.OPDPrescriptionDtoSP;
import com.hms.doctordesk.dto.OPDPrescriptionFolloUpDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplateMedicineDto;
import com.hms.doctordesk.dto.OPDPrescriptionTemplatesDTO;
import com.hms.doctordesk.dto.PrescriptionGenericDTO;
import com.hms.doctordesk.dto.PrescriptionInstructionDto;
import com.hms.doctordesk.dto.RouteMaster;
import com.hms.pharmacy.pojo.PreparationMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.UomMaster;

public interface PrescriptionService {

	
	List<PrescriptionInstructionDto> getAllPreDetails(HttpServletRequest request);

	List<PreparationMaster> fetchPreparationMaster();

	List<RouteMaster> getRoutesByPreparationId(Integer prepID, Integer unitId, HttpServletRequest request);

	List<RouteMaster> getAllRoutesForPrescription(Integer unitId, HttpServletRequest request);

	int saveOPDPrescription(OPDPrescriptionDto obj, HttpServletRequest request, Integer productId);

	List<ProductMaster> autoSuggestionProductlist(String letter, String prep);

	ProductMaster getMedicineById(Integer productId);

	List<UomMaster> fetchAllUnits(HttpServletRequest request);

	List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentId(Integer treatmentId, Integer unitId);

	OPDPrescriptionDtoSP getPrescriptionById(Integer unitId, Integer prescriptionId);

	//boolean deleteOPDPrescription(Integer unitId, Integer prescriptionId, HttpServletRequest request);
	boolean deleteOPDPrescription(Integer unitId, String prescriptionId, HttpServletRequest request);
	
	int saveOPDPrescriptionTemplates(OPDPrescriptionTemplatesDTO obj, HttpServletRequest request);

	List<OPDPrescriptionTemplatesDTO> fetchOPDPrescriptionTemplatesByID(Integer templateId, HttpServletRequest request);

	int saveUpdateOPDPrescTempMeds(OPDPrescriptionTemplateMedicineDto obj, HttpServletRequest request, Integer templateId);

	OPDPrescriptionTemplateMedicineDto getOPDPrescriptionTemplateMedicineById(Integer unitId,
			Integer templateMedicineId);

	boolean deleteOPDPrescriptionTemplateMedicine(Integer unitId, Integer templateMedicineId,
			HttpServletRequest request);

	boolean usePrescriptionTemp(Integer treatmentId, Integer patientId, Integer templateId, HttpServletRequest request);

	boolean deleteOPDPrescriptionTemplate(Integer unitId, Integer templateId, HttpServletRequest request);

	String addPrescriptionAsNEWOPDTemplate(OPDPrescriptionTemplatesDTO newDto, String[] prescriptionIDArray, Integer unitId, HttpServletRequest request);

	String updateOpdTemplateWithNewMedicines(Integer templateId, String[] prescriptionIDArray, Integer unitId,
			HttpServletRequest request);

	int savefollowUpForOPDPatient(OPDPrescriptionFolloUpDto opdFolloUp, Integer treatmentId,
			HttpServletRequest request);

	OPDPrescriptionFolloUpDto getfollowUpForOPDPatient(Integer unitId, Integer treatmentId);

	List<MedicationMaster> paediatricsMedicineAutoSuggestList(String prep, String letter);

	MedicationMaster getPaediatricsMedicineById(Integer id);

	List<OPDPrescriptionDto> getPharmacyStockMedicine(String prep, String letter);

	OPDPrescriptionDto getMedicineFromStockById(Integer id);
	
	List<OPDPrescriptionDtoSP> getAllPrescriptionsNursingStation(Integer treatmentId, Integer unitId,String date);
	
	PreparationMaster getPreparationById(Integer id);
	
	List<OPDPrescriptionDtoSP> getAllPrescriptionsByTreatmentIdDateWise(Integer treatmentId, Integer unitId,String date);
	
	int updateIPDPrescriptionSequence(HttpServletRequest request, Integer treatmentId,String prescriptionId);
	
}