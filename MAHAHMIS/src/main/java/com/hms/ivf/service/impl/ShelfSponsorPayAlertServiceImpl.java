package com.hms.ivf.service.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ivf.dao.ShelfSponsorPayAlertDao;
import com.hms.ivf.dto.EmbryoFreshSlaveDTO;
import com.hms.ivf.dto.EmbryoFrozenSlaveDTO;
import com.hms.ivf.dto.EmbryoTransferMasterDTO;
import com.hms.ivf.dto.FollicularStudyBasicInfoDTO;
import com.hms.ivf.dto.IVFCalenderInfoDTO;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.OvamPickMasterDTO;
import com.hms.ivf.dto.OvamPickUpSlaveDTO;
import com.hms.ivf.service.ShelfSponsorPayAlertService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.treatment.util.FollicularStudy;
@Service
public class ShelfSponsorPayAlertServiceImpl implements ShelfSponsorPayAlertService{

	@Autowired
	ShelfSponsorPayAlertDao sdao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@Transactional
	public Double getSumAssueredAmountByTreatmentId(Integer treatmentId) {
		return sdao.getSumAssueredAmountByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public BillMasterDto getTotalBillInfoByTreatmentId(Integer treatmentId) {
		return sdao.getTotalBillInfoByTreatmentId(treatmentId);
	}

	@Override
	@Transactional
	public String updateShelfSponserFlagByTreatmentId(String call,Integer treatmentId) {
		return sdao.updateShelfSponserFlagByTreatmentId(call, treatmentId);
	}

	@Override
	@Transactional
	public IVFFollicularStudy getBasicStudyDataForFollucularStudy(Integer masterFollicularStudyId) {
		
		return sdao.getBasicStudyDataForFollucularStudy(masterFollicularStudyId);
	}

	@Override
	@Transactional
	public int saveFollicualrStudyBasicInfo(String follicularBasicinfoDetails) {
		
		return sdao.saveFollicualrStudyBasicInfo(follicularBasicinfoDetails) ;
	}

	@Override
	@Transactional
	public List<FollicularStudyBasicInfoDTO> getListForFollicularStudy(
			Integer masterFollicularStudyId) {
		
		return sdao.getListForFollicularStudy(masterFollicularStudyId);
	}

	@Override
	@Transactional
	public String deleteFollicularBasicInfo(Integer studyidRF, Integer userId) {
		// TODO Auto-generated method stub
		return sdao.deleteFollicularBasicInfo(studyidRF, userId);
	}

	@Override
	@Transactional
	public List<IVFFollicularStudy> fetchFollicularStudyInfoForIVF(Integer patId) {
		
		return sdao.fetchFollicularStudyInfoForIVF(patId);
	}

	@Override
	@Transactional
	public Integer getCoupleId(Integer patientId) {
		
		return sdao.getCoupleIdForIVF(patientId);
	}

	@Override
	@Transactional
	public int saveCalenderInfoIVF(String ivfCalenderBasicInfoDetails) {
		
		return sdao.saveCalenderInfoIVF(ivfCalenderBasicInfoDetails);
	}

	@Override
	@Transactional
	public List<IVFCalenderInfoDTO> getIvfCalenderInfo(Integer masterFollicularStudyId) {
		
		return sdao.getIvfCalenderInfo(masterFollicularStudyId);
	}

	@Override
	@Transactional
	public String deleteIvfCalenderBasicInfo(Integer studyidIvF, Integer userId) {
		
		return sdao.deleteIvfCalenderBasicInfo(studyidIvF, userId);
	}

	@Override
	@Transactional
	public String cancelStudyRecordForIVF(Integer masterFollicularStudyId,Integer userId, String narration,String enddate) {
		
		return sdao.cancelStudyRecordForIVF(masterFollicularStudyId, userId, narration,enddate);
	}

	@Override
	@Transactional
	public String getStudyCommitByReportId(Integer follicularstudyReportId) {
	
		return sdao.getStudyCommitByReportId(follicularstudyReportId);
	}

	@Override
	@Transactional
	public String deleteBasicInfoIVFCalender(String ivfcalenderIds,Integer userId) {
		
		return sdao.deleteBasicInfoIVFCalender(ivfcalenderIds,userId);
	}

	@Override
	@Transactional
	public String deleteBasicFollicularInfo(String follicularIds,Integer userId) {
		
		return sdao.deleteBasicFollicularInfo(follicularIds,userId);
	}

	@Override
	@Transactional
	public String getHusbandNameForOvamPickup(Integer patId) {
		
		return sdao.getHusbandNameForOvamPickup(patId);
	}

	@Override
	@Transactional
	public List<Doctor> getDoctorListForOvamPickUp() {
	
		return sdao.getDoctorListForOvamPickUp();
	}

	@Override
	@Transactional
	public int saveOvamPickUpForm(OvamPickMasterDTO obj) {
	
		return sdao.saveOvamPickUpForm(obj);
	}

	@Override
	@Transactional
	public OvamPickMasterDTO getOvamPickUpMasterInfo(Integer patientId,String cycleNo) {
		
		return sdao.getOvamPickUpMasterInfo(patientId, cycleNo);
	}

	@Override
	@Transactional
	public String deleteOvamPickupSlaveInfo(String follicularIds, Integer userId) {
		
		return sdao.deleteOvamPickupSlaveInfo(follicularIds, userId);
	}

	@Override
	@Transactional
	public int saveEmbryoTransperForm(EmbryoTransferMasterDTO obj,	String freshEmbryoSlaveList, String frozenEmbryoSlaveList) {
		
		EmbryoFreshSlaveDTO freshobj = (EmbryoFreshSlaveDTO) ConfigUIJSONUtility
				.getObjectFromJSON(freshEmbryoSlaveList, EmbryoFreshSlaveDTO.class);	
		List<EmbryoFreshSlaveDTO> lstfreshembryo = freshobj.getGetListOfEmbryoFreshSlaveDTO();
		
		EmbryoFrozenSlaveDTO frozenobj = (EmbryoFrozenSlaveDTO) ConfigUIJSONUtility
				.getObjectFromJSON(frozenEmbryoSlaveList, EmbryoFrozenSlaveDTO.class);	
		List<EmbryoFrozenSlaveDTO> lstfrozenembryo = frozenobj.getGetListOfEmbryoFrozenSlaveDTO();
		
		obj.setGetListOfEmbryoFreshSlaveDTO(lstfreshembryo);
		
		obj.setGetListOfEmbryoFrozenSlaveDTO(lstfrozenembryo);
		
		return sdao.saveEmbryoTransperForm(obj);
	}

	@Override
	@Transactional
	public EmbryoTransferMasterDTO getEmbryoMasterInfo(Integer patientId,String cycleNo) {
		
		return sdao.getEmbryoMasterInfo(patientId, cycleNo);
	}

	@Override
	@Transactional
	public String deletefreshEmbryoSlaveInfo(String freshEmbryoSlaveIds,Integer userId) {
		
		return sdao.deletefreshEmbryoSlaveInfo(freshEmbryoSlaveIds, userId);
	}

	@Override
	@Transactional
	public String deletefrozenEmbryoSlaveInfo(String frozenEmbryoSlaveIds,	Integer userId) {
		
		return sdao.deletefrozenEmbryoSlaveInfo(frozenEmbryoSlaveIds, userId);
	}

	@Override
	@Transactional
	public IVFFollicularStudy getBasicStudyDataForFollucularStudyOnPrint(Integer masterFollicularStudyId) {
		// TODO Auto-generated method stub
		return sdao.getBasicStudyDataForFollucularStudyOnPrint(masterFollicularStudyId);
	}

	@Override
	@Transactional
	public OvamPickMasterDTO getOvamPickUpMasterInfoOnPrint(Integer patientId, String cycleNo) {
		// TODO Auto-generated method stub
		return sdao.getOvamPickUpMasterInfoOnPrint(patientId, cycleNo);
	}
	
	@Override
	@Transactional
	public int saveOvamPickUpSlaveInfo(String ovamPickUpSlaveList) {
		OvamPickUpSlaveDTO objslave = (OvamPickUpSlaveDTO) ConfigUIJSONUtility
				.getObjectFromJSON(ovamPickUpSlaveList, OvamPickUpSlaveDTO.class);	
		List<OvamPickUpSlaveDTO> lstovampickup = objslave.getGetListOfOvamPickUpSlaveDTO();
		
		int res=0;
		try {
		  for( OvamPickUpSlaveDTO obj :lstovampickup) {
			  
			  sessionFactory.getCurrentSession().merge(obj);
			  res=1;
		  }
		}catch (Exception e) {
			e.printStackTrace();
			res=0;
		}
		
		
		return res;
	}

	@Override
	@Transactional
	public OvamPickUpSlaveDTO getOvamPickUpSalveList(Integer patientId, String cycleNo) {
		
		return sdao.getOvamPickUpSalveList(patientId, cycleNo);
	}

	@Override
	@Transactional
	public String getOvamPickupDate(Integer patientId, String cycleNo) {
		
		return sdao.getOvamPickupDate(patientId, cycleNo);
	}

	@Override
	@Transactional
	public String getEmbryoTransperDate(Integer patientId, String cycleNo) {
		
		return sdao.getEmbryoTransperDate(patientId, cycleNo);
	}

}
