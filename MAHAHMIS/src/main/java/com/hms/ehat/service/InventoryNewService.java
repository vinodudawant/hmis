package com.hms.ehat.service;

import java.util.List;

import com.hms.ehat.dto.DischargeAllPatientsDto;
import com.hms.ehat.dto.EhatIpdBillFinalEstimateDto;
import com.hms.ehat.dto.InventoryNewDto;
import com.hms.ehat.dto.SponsorSummaryDetailsDto;
import com.hms.ehat.dto.WardWiseDetaisDto;

public interface InventoryNewService {

	List<InventoryNewDto> getDispachlist(Integer unitId, Integer userId1, String callfrom, String callPartyName, String startDate, String endDate, String letter);

	int saveDispachlist(String docId, Integer unitId, Integer userId1);

	List<InventoryNewDto> getPartyDetailsfromDate(String startDate,
			String endDate, Integer unitId, Integer userId1);

	List<InventoryNewDto> getPartyNameForSelectList(Integer unitId,
			Integer userId1);

	List<WardWiseDetaisDto> getWardWisePatientsDetails(Integer unitId,
			Integer userId1, Integer hallId, Integer hallSlaveId,
			Integer docId, String startDate, String endDate, String letter);

	List<DischargeAllPatientsDto> getDischargePatientsDetails(Integer unitId,
			Integer userId1, Integer chargesId, Integer chargesSlaveId,
			String typeOf, String startDate, String endDate, String letter);
	
	List<SponsorSummaryDetailsDto> getSponsorSummaryDetails(Integer unitId,
			Integer userId1, Integer chargesId, Integer chargesSlaveId,
			String typeOf, String startDate, String endDate, String letter);

	List<EhatIpdBillFinalEstimateDto> getIpdbillingEstimateReport(
			String typeOf, String startDate, String endDate, String letter);

}
