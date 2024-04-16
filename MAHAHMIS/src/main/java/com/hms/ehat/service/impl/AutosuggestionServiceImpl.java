package com.hms.ehat.service.impl;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.AutosuggestionConfDto;
import com.hms.ehat.dao.AutosuggestionDao;
import com.hms.ehat.dto.AutosugConfigDto;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.AutosuggestionService;
@Service
public class AutosuggestionServiceImpl implements AutosuggestionService {

	@Autowired
	AutosuggestionDao autosuggestion;
	
	@Override
	@Transactional
	public List<SubServiceDto> getlistSubService(String callform,
			HttpServletRequest request) {
		return autosuggestion.getlistSubService(callform);
	}

	@Override
	@Transactional
	public List<AutosugeestionDto> getlistService(String findingName,
			Integer unit, String unitlist, Integer depdocdeskid, String querytype,Integer serviceid ,HttpServletRequest request) {
 		HttpSession session = request.getSession();
		int userId = (Integer) session.getAttribute("userId1");
		return autosuggestion.getlistService(findingName, unit,unitlist,depdocdeskid,querytype,serviceid,userId);
	}

	
	/**
	 * @author Bilal
	 * @Date 22-JUN-2017
	 * @code For auto suggestion from configuration charges 
	 * ***/
	@Override
	@Transactional
	public List<AutosugConfigDto> getallchargesConfig(String findingName,
			HttpServletRequest request, int sponsorId, int chargesSlaveId, String sponsortabcall,
			int hallId, int hallSlaveId,int treatId) {
		// TODO Auto-generated method stub
		return autosuggestion.getallchargesConfig(findingName, request,
				sponsorId, chargesSlaveId, sponsortabcall, hallId, hallSlaveId,treatId);
	}

	/**
	 * @author Bilal
	 * @Date 28-JUN-2017
	 * @code For auto suggestion from configuration charges for IPD 
	 * ***/
	@Override
	@Transactional
	public List<AutosugConfigDto> getallchargesConfigForIPD(String findingName,
			HttpServletRequest request, int sponsorId, int chargesSlaveId,
			int hallId, int hallSlaveId) {
		// TODO Auto-generated method stub
		return autosuggestion.getallchargesConfigForIPD(findingName, request,
				sponsorId, chargesSlaveId, hallId, hallSlaveId);
	}

	@Override
	@Transactional
	public List<AutosuggestionConfDto> getallservicesConf(String findingName,
			Integer unit, String unitlist, Integer depdocdeskid,
			String querytype, Integer serviceid, HttpServletRequest request, int sponsorId, int chargesSlaveId,
			 int hallId, int hallSlaveId) {
		// TODO Auto-generated method stub
		
		HttpSession session = request.getSession();
		int userId = (Integer) session.getAttribute("userId1");
		return autosuggestion.getallservicesConf(findingName, unit,unitlist,depdocdeskid,querytype,serviceid,sponsorId,chargesSlaveId,userId,
				hallId,hallSlaveId);
	}

	@Override
	@Transactional
	public List<AutosugeestionDto> getlistpharmadetails(HttpServletRequest request, String storeId,String findingName,  String callform) {
	
		return autosuggestion. getlistpharmadetails(storeId,findingName,callform);
	}

	@Override
	@Transactional
	public double getcharges(int sponsorId, int chargesSlaveId, int hallId,
			int hallSlaveId, int serviceid,  int treatId, String toDate) {
		
		return autosuggestion.getcharges(sponsorId,chargesSlaveId,hallId,hallSlaveId, serviceid, treatId, toDate);
	}

	@Override
	@Transactional
	public double getchargessponsor(int sponsorId, int chargesSlaveId,
			int hallId, int hallSlaveId, int serviceid, int treatId) {
		
		return autosuggestion.getchargessponsor(sponsorId,chargesSlaveId,hallId,hallSlaveId, serviceid, treatId);
	}

	@Override
	@Transactional
	public List<ChargesMasterSlave> fetchSuperCatofchargesSlave(
			Integer chargesSlaveId) {
		return autosuggestion.fetchSuperCatofchargesSlave(chargesSlaveId);
	}

	@Override
	@Transactional
	public double getchargessponsorForQuotation(int sponsorId,
			int chargesSlaveId, int hallId, int hallSlaveId, int serviceid,
			int isComServId, int isComServlastId) {
		return autosuggestion.getchargessponsorForQuotation(sponsorId,chargesSlaveId,hallId,hallSlaveId, serviceid,isComServId,isComServlastId);
	}

	@Override
	@Transactional
	public double getyearwisecharges(int subserviceid) {
		
		return autosuggestion.getyearwisecharges(subserviceid);
	}

	@Override
	@Transactional
	public DemographicPatientDto fetchDemoPatientName(String letter,
			String call) {
		return autosuggestion.fetchDemoPatientName(letter,call);
	}

	@Override
	@Transactional
	public List<AutosugeestionDto> fetchOtSubInventoryProduct(HttpServletRequest request, Integer subInventoryId,String findingName) {
	
		return autosuggestion. fetchOtSubInventoryProduct(request,subInventoryId,findingName);
	}
	
	@Override
	@Transactional
	public List<AutosugeestionDto> getBatchDetailsOnSelect(HttpServletRequest request, Integer subInventoryId,Integer itemId) {
	
		return autosuggestion. getBatchDetailsOnSelect(request,subInventoryId,itemId);
	}

	@Override
	public String fetchPackageCharges(String packageId) {
		// TODO Auto-generated method stub
		return autosuggestion.fetchPackageCharges(packageId);
	}
	
}
