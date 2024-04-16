package com.hms.pathology.service;

import java.util.List;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.SponsorCustomTestNameDTO;
import com.hms.ehat.dto.SponsorCustomWardNameDTO;
import com.hms.ehat.dto.SubServiceDto;

public interface SponsorCustomTestNameService {
  
	List<SponsorCustomTestNameDTO>  getTestDetailsByServiceId(int sponsorId,int serviceId);
	
	
	int saveSponsorCustomTestName(String testDeatisls);
	
	String getSponsorCustomTestName(int sponsorId,int serviceId,int subserviceId);
	
	List<SubServiceDto>  getSubservicelistById(int serviceId,String searchText);
	
	List<SponsorCustomTestNameDTO>  getTestDetailsBySubServiceId(int sponsorId,int serviceId,int subServiceID);
	
     List<SponsorCustomWardNameDTO>  getWardDetailsBySponsorId(int sponsorId);
	
	int saveSponsorCustomWardName(String wardDeatisls);
	
	List<ChargesMasterSlave>  getWardListAutoSuggestion(String searchText);
	
	List<SponsorCustomWardNameDTO>  getWardDetailsBysponsorIdandChargeId(int sponsorId,int chargeId);

	
}
