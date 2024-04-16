package com.hms.ehat.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.InventoryNewDao;
import com.hms.ehat.dto.DischargeAllPatientsDto;
import com.hms.ehat.dto.EhatIpdBillFinalEstimateDto;
import com.hms.ehat.dto.InventoryNewDto;
import com.hms.ehat.dto.SponsorSummaryDetailsDto;
import com.hms.ehat.dto.WardWiseDetaisDto;
import com.hms.ehat.service.InventoryNewService;

@Service
public class InventoryNewServiceImpl implements InventoryNewService{
	
	@Autowired
	InventoryNewDao inventoryNewDao;
	


	@Override
	@Transactional
	public List<InventoryNewDto> getDispachlist(Integer unitId,
			Integer userId1, String callfrom, String callPartyName,String startDate, String endDate,String letter) {
		// TODO Auto-generated method stub
		return inventoryNewDao.getDispachlist(unitId,userId1,callfrom,callPartyName,startDate,endDate,letter);
	}


	
	
	@Override
	@Transactional
	public int saveDispachlist(String docId, Integer unitId, Integer userId1) {
			
		// TODO Auto-generated method stub
		return inventoryNewDao.saveDispachlist(docId,unitId,userId1);
		
	}




	@Override
	@Transactional
	public List<InventoryNewDto> getPartyDetailsfromDate(String startDate,
			String endDate, Integer unitId, Integer userId1) {
		// TODO Auto-generated method stub
		return inventoryNewDao.getPartyDetailsfromDate(startDate,endDate,unitId,userId1);
	}




	@Override
	@Transactional
	public List<InventoryNewDto> getPartyNameForSelectList(Integer unitId,
			Integer userId1) {
		// TODO Auto-generated method stub
		return inventoryNewDao.getPartyNameForSelectList(unitId,userId1);
	}




	@Override
	@Transactional
	public List<WardWiseDetaisDto> getWardWisePatientsDetails(Integer unitId,
			Integer userId1, Integer hallId, Integer hallSlaveId,
			Integer docId, String startDate, String endDate, String letter) {
		 return inventoryNewDao.getWardWisePatientsDetails(unitId,userId1,
					hallId,hallSlaveId,docId,startDate,endDate,letter);
		
	}




	@Override
	@Transactional
	public List<DischargeAllPatientsDto> getDischargePatientsDetails(
			Integer unitId, Integer userId1, Integer chargesId,
			Integer chargesSlaveId, String typeOf, String startDate,
			String endDate, String letter) {
		return inventoryNewDao.getDischargePatientsDetails(unitId,userId1,
				chargesId,chargesSlaveId,typeOf,startDate,endDate,letter);
	}
	
	
	@Override
	@Transactional
	public List<SponsorSummaryDetailsDto> getSponsorSummaryDetails(
			Integer unitId, Integer userId1, Integer chargesId,
			Integer chargesSlaveId, String typeOf, String startDate,
			String endDate, String letter) {
		return inventoryNewDao.getSponsorSummaryDetails(unitId,userId1,
				chargesId,chargesSlaveId,typeOf,startDate,endDate,letter);
	}

	@Override
	@Transactional
	public List<EhatIpdBillFinalEstimateDto> getIpdbillingEstimateReport(
			 String typeOf, String startDate,String endDate, String letter) {
		return inventoryNewDao.getIpdbillingEstimateReport(typeOf,startDate,endDate,letter);
	}


	
}
