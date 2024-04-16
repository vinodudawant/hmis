package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.NarrationDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.NarrationDto;
import com.hms.ehat.dto.TempMasterDto;
import com.hms.ehat.service.NarrationService;

@Service
public class NarrationServiceImpl implements NarrationService{
	
	@Autowired
	NarrationDao narrationDao;
	
	
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all impletented save or update methods. 
	 ******************************************************************************/
	@Override
	@Transactional
	public int saveOrUpdateTemp(NarrationDto narrsMaster, HttpServletRequest request) {
		if (narrsMaster.getNarrId() == 0) {
			narrsMaster.setNarrName(narrsMaster.getNarrName());
			narrsMaster.setNarrCode(narrsMaster.getNarrCode());
			//narrsMaster.setServId(narrsMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			narrsMaster.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			narrsMaster.setCreatedBy(narrsMaster.getCreatedBy());
			narrsMaster.setDeleted("N");
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			narrsMaster.setCreatedBy(userId);
			
			narrsMaster.setUpdatedBy(narrsMaster.getUpdatedBy());
			narrsMaster.setDeleted("N");
			narrsMaster.setUpdatedBy(userId);
			
			narrsMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
		if (narrationDao.saveOrUpdateTemp(narrsMaster)==1) 
		{
			if(narrsMaster.getNarrId() == 0)
			{
				return 1;
			}else{
				return 2;
			}
		} else 
		{
			return 0;
		}
	}


	@Override
	@Transactional
	public List<NarrationDto> getAllNarrations() {
		// TODO Auto-generated method stub
		return narrationDao.getAllNarrations();
	}

	@Override
	@Transactional
	public boolean deleteNarrMaster(Integer narrId, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		narrationDao.deleteTemp(narrId, userId);
		return true;
	}

	@Override
	@Transactional
	public List<NarrationDto> getautoSuggestionNarrationMasterNames(String letter) {
		// TODO Auto-generated method stub
		return narrationDao.getautoSuggestionNarrationMasterNames(letter);
	}


	@Override
	@Transactional
	public Long getNarrationCount() {
		// TODO Auto-generated method stub
		return (long) narrationDao.getNarrationCount();
	}	

	
}
