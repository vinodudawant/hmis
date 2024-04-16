package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dao.TempDao;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.TempMasterDto;
import com.hms.ehat.service.TempService;

@Service
public class TempServiceImpl implements TempService {

	@Autowired
	TempDao tempdao;
	/*******************************************************************************
	 * @author Kishor Lokhande
	 * @date 16_May_2017 
	 * @Code This is all impletented save or update methods. 
	 ******************************************************************************/
	@Override
	@Transactional
	public int saveOrUpdateTemp(TempMasterDto tempMaster,HttpServletRequest request) {
		if (tempMaster.getTempId() == 0) {
			tempMaster.setTempName(tempMaster.getTempName());
			tempMaster.setTempCode(tempMaster.getTempCode());
			tempMaster.setServId(tempMaster.getServId());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			tempMaster.setCreatedBy(userId);
			//System.out.println("userid>>>>>" + userId);
			// HttpSession obj= chargesMaster.setCreatedBy();

			tempMaster.setCreatedBy(tempMaster.getCreatedBy());
			tempMaster.setDeleted("N");
			//tempMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			tempMaster.setCreatedBy(userId);
			
			tempMaster.setUpdatedBy(tempMaster.getUpdatedBy());
			tempMaster.setDeleted("N");
			tempMaster.setUpdatedBy(userId);
			
			tempMaster.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
		}

		
		if (tempdao.saveOrUpdateTemp(tempMaster)==1) 
		{
			if(tempMaster.getTempId() == 0)
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
	
	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/

	@Override
	@Transactional
	public List<TempMasterDto> getTemp() {
		// TODO Auto-generated method stub
		return tempdao.getTemp();
	}	
	
	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	
	@Override
	@Transactional
	public boolean deleteTemp(Integer tempId,HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		ChargesMasterDto chargesMasterdao = new ChargesMasterDto();
		

		tempdao.deleteTemp(tempId, userId);
		return true;
	}	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	
	@Override
	@Transactional
	public List<TempMasterDto> getAutoSuggestionTempNames(String letter) {
		// TODO Auto-generated method stub
		return tempdao.getAutoSuggestionTempNames(letter);
	}	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<TempMasterDto> getTempById(Integer tempId) {
		// TODO Auto-generated method stub
		return tempdao.getTempById(tempId);
	}	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/

	@Override
	@Transactional
	public List<TempMasterDto> getAllTemp() {
		// TODO Auto-generated method stub
		return tempdao.getAllTemp();
	}
	

	/**
	 * @author: Kishor Lokhande 
	 * @date 16_May_2017 
	 * @Code This Methods is used to used to call dao methods
	 * ***/
	@Override
	@Transactional
	public List<TempMasterDto> getAllTempwithDeleted() {
		// TODO Auto-generated method stub
		return tempdao.getAllTempwithDeleted();
	}

	/**
	 * @author: Kishor Lokhabde
	 *  @date 22_May_2017 this Methods is used to call dao methods
	 * ***/
	@Transactional
	public Long getTempCount() {
		// TODO Auto-generated method stub
		
		
		return (long) tempdao.getTempCount();
	}


}
