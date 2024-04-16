package com.hms.ehat.service;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.dto.AutosuggestionConfDto;
import com.hms.ehat.dto.AutosugConfigDto;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.SubServiceDto;

public interface AutosuggestionService {

	List<SubServiceDto> getlistSubService(String callform,
			HttpServletRequest request);

	List<AutosugeestionDto> getlistService(String findingName,
			Integer unit, String unitlist, Integer depdocdeskid, String querytype, Integer serviceid, HttpServletRequest request);

	/**
	 * @author Bilal
	 * @Date 22-JUN-2017
	 * @code For auto suggestion from configuration charges 
	 * ***/
	List<AutosugConfigDto> getallchargesConfig(String findingName,
			 HttpServletRequest request, int sponsorId, int chargesSlaveId, String sponsortabcall, int hallId, int hallSlaveId, int treatId);
	/**
	 * @author Bilal
	 * @Date 28-JUN-2017
	 * @code For auto suggestion from configuration charges for IPD
	 * ***/
	List<AutosugConfigDto> getallchargesConfigForIPD(String findingName,
			 HttpServletRequest request, int sponsorId, int chargesSlaveId, int hallId, int hallSlaveId);

	List<AutosuggestionConfDto> getallservicesConf(String findingName,
			Integer unit, String unitlist, Integer depdocdeskid,
			String querytype, Integer serviceid, HttpServletRequest request, int sponsorId, int chargesSlaveId, int hallId, int hallSlaveId);

	List<AutosugeestionDto> getlistpharmadetails(HttpServletRequest request, String storeId, String findingName, String callform);

	double getcharges(int sponsorId, int chargesSlaveId, int hallId,
			int hallSlaveId, int serviceid, int treatId, String toDate);

	double getchargessponsor(int sponsorId, int chargesSlaveId, int hallId,
			int hallSlaveId, int serviceid, int treatId);//serviceId = subServiceId

	List<ChargesMasterSlave> fetchSuperCatofchargesSlave(Integer chargesSlaveId);

	double getchargessponsorForQuotation(int sponsorId, int chargesSlaveId,
			int hallId, int hallSlaveId, int serviceid, int isComServId,
			int isComServlastId);

	double getyearwisecharges(int subserviceid);
	
	DemographicPatientDto fetchDemoPatientName(String letter, String call);
	
	List<AutosugeestionDto> fetchOtSubInventoryProduct(
			HttpServletRequest request, Integer subInventoryId, String findingName);
	
	List<AutosugeestionDto> getBatchDetailsOnSelect(HttpServletRequest request,
			Integer subInventoryId, Integer itemId);
	
	String fetchPackageCharges(String packageId);
}
