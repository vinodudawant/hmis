package com.hms.ipd.serviceimpl;

import java.lang.invoke.MethodHandles;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Assessment;
import com.hms.dto.DischargeSummery;
import com.hms.dto.Order_master;
import com.hms.dto.RouteDTO;
import com.hms.ipd.dao.IPDDischargeSumDAO;
import com.hms.ipd.service.IPDDischargeSumService;
import com.hms.model.DocBean;

@Service
@Transactional
public class IPDDischargeSumServiceImpl implements IPDDischargeSumService{


	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	private @Autowired IPDDischargeSumDAO ipdDischargeSumDAO;
	
	@Override
	public List<RouteDTO> fetchAllMedicationMasterList(String pageType, String searhFlag, String searchText) {
		LOGGER.info("IPDDischargeSumServiceImpl's fetchAllMedicationMasterList method called.");
		return ipdDischargeSumDAO.fetchAllMedicationMasterList(pageType,searhFlag,searchText);
	}

	@Override
	public List<Assessment> fetchAssessment(String treatmentId) {
		LOGGER.info("IPDDischargeSumServiceImpl's fetchAssessment method called.");
		return ipdDischargeSumDAO.fetchAssessment(treatmentId);
	}

	@Override
	public List<Order_master> featchOrderFormByDate(String tid, String date, String type) {
		LOGGER.info("IPDDischargeSumServiceImpl's featchOrderFormByDate method called.");
		return ipdDischargeSumDAO.featchOrderFormByDate(tid,date,type);
	}

	@Override
	public List<Order_master> featchTreatmentAtDischarge(String tid, String date, String type) {
		LOGGER.info("IPDDischargeSumServiceImpl's featchTreatmentAtDischarge method called.");
		return ipdDischargeSumDAO.featchTreatmentAtDischarge(tid,date,type);
	}

	@Override
	public List<DischargeSummery> fetchDischargeAutoSummary(String patID, String treatID) {
		LOGGER.info("IPDDischargeSumServiceImpl's fetchDischargeAutoSummary method called.");
		return ipdDischargeSumDAO.fetchDischargeAutoSummary(patID,treatID);
	}

	@Override
	public List<DocBean> fetchDocuments(String tid, String patId) {
		LOGGER.info("IPDDischargeSumServiceImpl's fetchDocuments method called.");
		return ipdDischargeSumDAO.fetchDocuments(tid,patId);
	}
	
	@Override
	public List<Assessment> EditAssessment(int id) {
		LOGGER.info("IPDDischargeSumServiceImpl's fetchAssessment method called.");
		return ipdDischargeSumDAO.EditAssessment(id);
	}


}
