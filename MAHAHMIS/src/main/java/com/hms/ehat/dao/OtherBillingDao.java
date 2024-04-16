package com.hms.ehat.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.OtherBillReceiptMasterDTO;
import com.hms.ehat.dto.OtherBillRefundMasterDTO;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.RegistrationOtherDto;

public interface OtherBillingDao {

	int saveOtherBilling(OtherBillingDto otherBillingDto,HttpServletRequest request, String queryType);
	Integer saveRefundBillDetails(String servIdsChecked,Integer refDocId,OtherBillReceiptMasterDTO billRecMaster);

	List<OtherBillingDto> fetchPatientBillAmountOther(Integer treatmentId,
			Integer userId);

	List<OtherBillingDto> fetchPatientBillAmountOther(Integer treatmentId);

	int deleteservdetailsOther(String labservicelist, Integer userId,
			String callform);

	RegistrationOtherDto getAllRecordsForOPDque1ToOther(Integer deptid);

	List<RegistrationOtherDto> getPatientDataByPatientIdOther(Integer patientId);

	RegistrationOtherDto getOtherBillingRecordsAuto(Integer deptId,
			String letter, String usertype);

	Integer saveOtherBillDetails(String masterIdsChecked,String servIdsChecked,Integer refDocId,OtherBillReceiptMasterDTO billRecMaster,String multiPayDetails);
	OtherBillReceiptMasterDTO fetchAllReceiptTotals(OtherBillReceiptMasterDTO obj,String callFrom);
	
	OtherBillReceiptMasterDTO getBillReceiptDetails(OtherBillReceiptMasterDTO billRecMaster,String callFrom);
	
	OtherBillingDto getTotalPayable(OtherBillingDto billRecMaster,String callFrom);
	
	OtherBillRefundMasterDTO getBillRefundDetails(OtherBillRefundMasterDTO billRecMaster,String callFrom);
	
	int getAppointPatientId(Integer appId);
}
