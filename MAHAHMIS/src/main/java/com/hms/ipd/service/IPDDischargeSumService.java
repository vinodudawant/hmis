package com.hms.ipd.service;

import java.util.List;

import com.hms.dto.Assessment;
import com.hms.dto.DischargeSummery;
import com.hms.dto.Order_master;
import com.hms.dto.RouteDTO;
import com.hms.model.DocBean;

public interface IPDDischargeSumService {

	List<RouteDTO> fetchAllMedicationMasterList(String pageType, String searhFlag, String searchText);

	List<Assessment> fetchAssessment(String treatmentId);

	List<Order_master> featchOrderFormByDate(String tid, String date, String type);

	List<Order_master> featchTreatmentAtDischarge(String tid, String date, String type);

	List<DischargeSummery> fetchDischargeAutoSummary(String patID, String treatID);

	List<DocBean> fetchDocuments(String tid, String patId);
	List<Assessment> EditAssessment(int id);


}
