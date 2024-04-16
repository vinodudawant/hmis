package com.hms.ivf.service.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IvfHistoryDao;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfHistorySlaveDto;
import com.hms.ivf.dto.IvfHistoryTempMasterDto;
import com.hms.ivf.service.IvfHistoryService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class IvfHistoryServiceImpl implements IvfHistoryService {
	
	@Autowired
	IvfHistoryDao opddao;
	
	@Autowired
	SessionFactory sf;

	@Override
	@Transactional
	public int saveIVFHistory(IvfHistoryTempMasterDto obj, String historySlaveList, Integer patientId,Integer treatmentId, Integer ivftreatmentId) {
		
		IvfHistorySlaveDto historySlaveobj = (IvfHistorySlaveDto) ConfigUIJSONUtility
				.getObjectFromJSON(historySlaveList, IvfHistorySlaveDto.class);	
		List<IvfHistorySlaveDto> lsthistoryslave = historySlaveobj.getGetListOfHistorySlaveDTO();
		
		RegistrationDto pobj=(RegistrationDto) sf.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		IVFTreatmentDTO ivftobj=(IVFTreatmentDTO) sf.getCurrentSession().get(IVFTreatmentDTO.class, ivftreatmentId);
		obj.setPatientObj(pobj);
		obj.setTreatObj(tobj);
		obj.setIvfTreatObj(ivftobj);
		
		obj.setGetListOfHistorySlaveDTO(lsthistoryslave);
		
		return opddao.saveIVFHistory(obj);
	}

	@Override
	@Transactional
	public IvfHistoryTempMasterDto getIVFHistory(Integer ivftreatmentId) {
	
		return opddao.getIVFHistory(ivftreatmentId);
	}

	@Override
	@Transactional
	public int deleteHistorySalve(String historySlaveId, Integer userId) {
		int msg=0;
		try{
			
			/*
			 * Query itemInfo = sf .getCurrentSession().
			 * createSQLQuery("update opd_history_slave set deleted='Y',deleted_by=" +
			 * userId +
			 * ",deleted_date_time=now() where history_slave_id in("+historySlaveId+")");
			 */
			
			Query itemInfo =sf .getCurrentSession().createQuery("UPDATE IvfHistorySlaveDto set deleted='Y',deletedBy="+userId+",deletedDateTime=now() where historySalveId in("+historySlaveId+") ");
			   
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

}
