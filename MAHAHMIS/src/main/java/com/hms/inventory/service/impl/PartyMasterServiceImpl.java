package com.hms.inventory.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PartyMasterDao;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.service.PartyMasterService;

@Service
public class PartyMasterServiceImpl implements PartyMasterService {

	@Autowired
	PartyMasterDao partyMasterDao;

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public int savePartyMaster(PartyMasterDto partyMasterDto,
			String partyMasterGeneralInfoDtoList,
			String partyMasterContactInfoDtoList,
			String partyMasterAddressInfoDtoList, 
			String partyMasterPaymentInfoDtoList, 
			String partyMasterTermsAndConditionInfoDtoList,  HttpServletRequest request) {
		// TODO Auto-generated method stub

		String sql = "";
		if (partyMasterDto.getId() == 0) {

			partyMasterDto.setName(partyMasterDto.getName());

			sql = "SELECT count(*) from inv_party_master_new p where p.deleted='N' and p.party_master_name='"
					+ partyMasterDto.getName() + "'";

			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			int count = ((Number) countQuery.uniqueResult()).intValue();
			if (count > 0) {
				return 3;
			} else {
				int response = partyMasterDao.savePartyMaster(partyMasterDto,
						partyMasterGeneralInfoDtoList,
						partyMasterContactInfoDtoList,
						partyMasterAddressInfoDtoList, 
						partyMasterPaymentInfoDtoList,
						partyMasterTermsAndConditionInfoDtoList, request);
				return response;
			}

		} else {
			
			int response = partyMasterDao.savePartyMaster(partyMasterDto,
					partyMasterGeneralInfoDtoList,
					partyMasterContactInfoDtoList,
					partyMasterAddressInfoDtoList, 
					partyMasterPaymentInfoDtoList,
					partyMasterTermsAndConditionInfoDtoList, request);
			return response;
		}
	}

	@Override
	@Transactional
	public List<PartyMasterDto> getAllPartyMaster(HttpServletRequest request,Integer unitId) {
		// TODO Auto-generated method stub
		return partyMasterDao.getAllPartyMaster(unitId);

	}

	@Override
	@Transactional
	public PartyMasterDto editPartyMaster(Integer partyMasterId) {
		// TODO Auto-generated method stub
		return partyMasterDao.editPartyMaster(partyMasterId);
	}

	@Override
	@Transactional
	public boolean deletePartyMaster(Integer partyMasterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return partyMasterDao.deletePartyMaster(partyMasterId, request);
	}

	@Override
	@Transactional
	public PartyMasterDto partyMasterAutoSuggestion(String partyMasterName) {
		// TODO Auto-generated method stub
		return partyMasterDao.partyMasterAutoSuggestion(partyMasterName);
	}

	@Override
	@Transactional
	public PartyMasterDto getPartyMasterById(Integer partyMasterId) {
		// TODO Auto-generated method stub
		return partyMasterDao.getPartyMasterById(partyMasterId);
	}

	@Override
	@Transactional
	public boolean deletePartyMasterSlave(Integer partyMasterSlaveId,Integer partyMasterId,
			String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return partyMasterDao.deletePartyMasterSlave(partyMasterSlaveId, partyMasterId, callFrom, request);
	}

	@Override
	@Transactional
	public Integer getPageCountAllPartyMaster() {
		return partyMasterDao.getPageCountAllPartyMaster();
	}

}
