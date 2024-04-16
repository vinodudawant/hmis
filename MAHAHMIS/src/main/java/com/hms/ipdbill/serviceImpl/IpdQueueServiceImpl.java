package com.hms.ipdbill.serviceImpl;

import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ipdbill.dao.IpdQueueDao;
import com.hms.ipdbill.dto.AutosuggestionIpdQueueDto;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.ipdbill.service.IpdQueueService;

@Service
public class IpdQueueServiceImpl implements IpdQueueService {

	@Autowired
	IpdQueueDao ipdQueueDao;

	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String userAccessFlow = resourceBundleEhat.getObject("userAccessFlow").toString();

	/*
	 * ============= Code By : Badrinath Wagh Code For : autoSuggestationIpdQueue
	 * ================
	 */

	@Override
	@Transactional
	public List<AutosuggestionIpdQueueDto> autoSuggestationIpdQueue(Integer unit_id, String callFrom, String findText) {
		// TODO Auto-generated method stub
		return ipdQueueDao.autoSuggestationIpdQueue(unit_id, callFrom, findText);
	}

	@Override
	@Transactional
	public List<IpdQueueDTO> getIpdQueue(Integer unitId,Integer startIndex,String callFrom) {

		return ipdQueueDao.getIpdQueue(unitId,startIndex,callFrom);
	}

	@Override
	@Transactional
	public IpdQueueDTO getIpdQueuePatientByTreatmentId(Integer treatId) {

		return ipdQueueDao.getIpdQueuePatientByTreatmentId(treatId);
	}
	
	@Override
	@Transactional
	public List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,String usertype,HttpServletRequest request){
	if(usertype.equalsIgnoreCase("Y")){
		return ipdQueueDao.autosuggesstionviewIpdbillPatients(letter,finalBill,usertype,request);
	}else{
		return ipdQueueDao.autosuggesstionviewIpdbillPatients(letter,finalBill,request);
	}
	}

	@Override
	@Transactional
	public Integer getIpdPatientCount() {
		// TODO Auto-generated method stub
		return ipdQueueDao.getIpdPatientCount();
	}

}