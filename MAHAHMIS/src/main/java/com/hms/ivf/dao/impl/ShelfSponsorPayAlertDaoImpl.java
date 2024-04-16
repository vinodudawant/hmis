package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

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
import com.hms.patient.util.ConfigUIJSONUtility;
@Repository
public class ShelfSponsorPayAlertDaoImpl implements ShelfSponsorPayAlertDao{
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public Double getSumAssueredAmountByTreatmentId(Integer treatmentId) {
		String sql="";
		Double sumAssueredAmt=0.0;
		try{
			sql="Select sumassuredAmt as massuredAmt from TreatmentDto where treatmentId=:treatmentId";
		Query query=sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter("treatmentId", treatmentId);
		 sumAssueredAmt=(Double) query.uniqueResult();
		}catch(Exception e){
			e.printStackTrace();
		}
		return sumAssueredAmt;
	}

	@Override
	public BillMasterDto getTotalBillInfoByTreatmentId(Integer treatmentId) {
		String sql="";
		BillMasterDto obj=new BillMasterDto();
		
		try{
			sql="from BillMasterDto where treatmentId=:treatmentId";
			Query query=sessionFactory.getCurrentSession().createQuery(sql);
			query.setParameter("treatmentId", treatmentId);
			obj=(BillMasterDto) query.uniqueResult();
		}catch(Exception e){
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String updateShelfSponserFlagByTreatmentId(String call,Integer treatmentId) {
		String sql="";
		String msg="";
		try{
			sql="update  TreatmentDto set selfSponserPayAlertFlag='"+call+"' where treatmentId=:treatmentId";
		Query query=sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter("treatmentId", treatmentId);
		query.executeUpdate();
		msg="Record Update Successfully";
		}catch(Exception e){
			e.printStackTrace();
			msg="Network Issue";
		}
		return msg;
	}

	@Override
	public IVFFollicularStudy getBasicStudyDataForFollucularStudy(Integer masterFollicularStudyId) {
		IVFFollicularStudy objstudy =new IVFFollicularStudy();
		String sql="";
		try{
			sql ="select * from ehat_follicular_study_slave where status='Y' AND idehat_follicular_study_slave=" +masterFollicularStudyId;
			//List<Map<String, Object>> list = getJdbcTemplate().queryForList(sql);
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listofpatients = query.list();
			for (Map<String, Object> rs : listofpatients) {
				
				objstudy.setStudyid((Integer) rs.get("idehat_follicular_study_slave"));
				objstudy.setPatientId((Integer) rs.get("Patient_ID"));
				objstudy.setStart_date((String) rs.get("start_date"));
				objstudy.setEnd_date((String) rs.get("end_date"));
				objstudy.setStatus((String) rs.get("study_status"));
				
				objstudy.setAge((String) rs.get("age"));
				objstudy.setWeight((String) rs.get("weight"));
				objstudy.setHeight((String) rs.get("height"));
				
				objstudy.setBmi((String) rs.get("bmi"));
				objstudy.setAfc((String) rs.get("afc"));
				
				objstudy.setRx((String) rs.get("rx"));
				objstudy.setHsg((String) rs.get("hsg"));
				objstudy.setHsa((String) rs.get("hsa"));
				
				objstudy.setAmhDate((String) rs.get("amh_date"));
				objstudy.setLhDate((String) rs.get("lh_date"));
				objstudy.setFshDate((String) rs.get("fsh_date"));
				objstudy.setTshDate((String) rs.get("tsh_date"));
				objstudy.setPrlDate((String) rs.get("prl_date"));
				
				objstudy.setProtocoloF((String) rs.get("protocol_f"));
				
				objstudy.setLmpdate((String) rs.get("lmp_date"));
				objstudy.setSaveFrom((String) rs.get("save_from"));
				
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return objstudy;
	}

	@Override
	public int saveFollicualrStudyBasicInfo(String follicularBasicinfoDetails) {
		// this is for set Item info	
		int res=0;
		try{
			FollicularStudyBasicInfoDTO fbj = (FollicularStudyBasicInfoDTO) ConfigUIJSONUtility
				.getObjectFromJSON(follicularBasicinfoDetails, FollicularStudyBasicInfoDTO.class);	
		List<FollicularStudyBasicInfoDTO> lstfollicuarinfo = fbj.getGetListForFollicularStudy();
		for(FollicularStudyBasicInfoDTO obj:lstfollicuarinfo){
			sessionFactory.getCurrentSession().merge(obj);
			
		}
		res=1;
		}catch(Exception e){
			e.printStackTrace();
			
		}
		return res;
	}

	@Override
	public List<FollicularStudyBasicInfoDTO> getListForFollicularStudy(Integer masterFollicularStudyId) {
		List<FollicularStudyBasicInfoDTO> list=null;
		try{
		Criteria c= sessionFactory.getCurrentSession().createCriteria(FollicularStudyBasicInfoDTO.class);
		c.add(Restrictions.eq("masterMollicularId", masterFollicularStudyId));
		c.add(Restrictions.eq("deleted", "N"));
		list=c.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public String deleteFollicularBasicInfo(Integer studyidRF, Integer userId) {
		String sql="";
		String msg="";
		try{
			sql="update  FollicularStudyBasicInfoDTO set deleted='Y',deletedBy="+userId+",deletedDateTime=now() where follicularId=:studyidRF";
		Query query=sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter("studyidRF", studyidRF);
		query.executeUpdate();
		msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
			msg="Network Issue";
		}
		return msg;
	}

	@Override
	public List<IVFFollicularStudy> fetchFollicularStudyInfoForIVF(Integer patId) {
		String sql="";
		List<IVFFollicularStudy> StudyList = new ArrayList<IVFFollicularStudy>();
		try{
			sql ="select * from ehat_follicular_study_slave where status='Y' AND couple_id > 0 AND Patient_ID=" +patId;
			
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listofpatients = query.list();
			
			for (Map<String, Object> rs : listofpatients) {
				IVFFollicularStudy objstudy = new IVFFollicularStudy();
				objstudy.setStudyid((Integer) rs.get("idehat_follicular_study_slave"));
				objstudy.setPatientId((Integer) rs.get("Patient_ID"));
				objstudy.setStart_date((String) rs.get("start_date"));
				objstudy.setEnd_date((String) rs.get("end_date"));
				objstudy.setStatus((String) rs.get("study_status"));
				
				objstudy.setAge((String) rs.get("age"));
				objstudy.setWeight((String) rs.get("weight"));
				objstudy.setHeight((String) rs.get("height"));
				
				objstudy.setBmi((String) rs.get("bmi"));
				objstudy.setAfc((String) rs.get("afc"));
				
				objstudy.setRx((String) rs.get("rx"));
				objstudy.setHsg((String) rs.get("hsg"));
				objstudy.setHsa((String) rs.get("hsa"));
				
				objstudy.setAmhDate((String) rs.get("amh_date"));
				objstudy.setLhDate((String) rs.get("lh_date"));
				objstudy.setFshDate((String) rs.get("fsh_date"));
				objstudy.setTshDate((String) rs.get("tsh_date"));
				objstudy.setPrlDate((String) rs.get("prl_date"));
				
				objstudy.setSaveFrom((String) rs.get("save_from"));
				
				objstudy.setCoupleId((String) rs.get("couple_id"));
				
				StudyList.add(objstudy);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return StudyList;
	}

	@Override
	public Integer getCoupleIdForIVF(Integer patientId) {
		Integer coupleId=0;
		try{
			String sql="";
			
			try{
				sql="Select ivfCoupleId as ivfCoupleId from IVFCoupleDTO where femalePatientId=:femalePatientId";
			Query query=sessionFactory.getCurrentSession().createQuery(sql);
			query.setParameter("femalePatientId", patientId);
			coupleId=(Integer) query.uniqueResult();
			}catch(Exception e){
				e.printStackTrace();
			}
			return coupleId;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return coupleId;
	}

	@Override
	public int saveCalenderInfoIVF(String ivfCalenderBasicInfoDetails) {
		int res=0;
		try{
			IVFCalenderInfoDTO fbj = (IVFCalenderInfoDTO) ConfigUIJSONUtility
				.getObjectFromJSON(ivfCalenderBasicInfoDetails, IVFCalenderInfoDTO.class);	
		List<IVFCalenderInfoDTO> lstfollicuarinfo = fbj.getGetListOfIvfCalenderInfo();
		for(IVFCalenderInfoDTO obj:lstfollicuarinfo){
			sessionFactory.getCurrentSession().merge(obj);
			
		}
		res=1;
		}catch(Exception e){
			e.printStackTrace();
			
		}
		return res;
	}

	@Override
	public List<IVFCalenderInfoDTO> getIvfCalenderInfo(Integer masterFollicularStudyId) {
		List<IVFCalenderInfoDTO> list=null;
		try{
		Criteria c= sessionFactory.getCurrentSession().createCriteria(IVFCalenderInfoDTO.class);
		c.add(Restrictions.eq("masterMollicularId", masterFollicularStudyId));
		c.add(Restrictions.eq("deleted", "N"));
		list=c.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public String deleteIvfCalenderBasicInfo(Integer studyidIvF, Integer userId) {
		String sql="";
		String msg="";
		try{
			sql="update  IVFCalenderInfoDTO set deleted='Y',deletedBy="+userId+",deletedDateTime=now() where ivfCalenderId=:studyidIvF";
		Query query=sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter("studyidIvF", studyidIvF);
		query.executeUpdate();
		msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
			msg="Network Issue";
		}
		return msg;
	}

	@Override
	public String cancelStudyRecordForIVF(Integer masterFollicularStudyId,Integer userId, String narration,String enddate) {
		String sql="";
		String msg="";
		try{
			sql ="update  ehat_follicular_study_slave set study_status='Canceled',cancel_by="+userId+",narration_ivf = '"+narration+"',cancel_date_time=now(),end_date='"+enddate+"' where idehat_follicular_study_slave="+masterFollicularStudyId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			query.executeUpdate();
			msg="Record Canceled Successfully";
			
		}catch(Exception e){
			e.printStackTrace();
			msg="Network Issue";
		}
		return msg;
	}

	@Override
	public String getStudyCommitByReportId(Integer follicularstudyReportId) {
		String commit="";
		String sql="";
		try{
			sql="Select studyComment from ehat_follicular_study_report where idehat_follicular_study_report="+follicularstudyReportId;
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			commit=(String) query.uniqueResult();
		}catch(Exception e){
			e.printStackTrace();
		}
		return commit;
	}

	@Override
	public String deleteBasicInfoIVFCalender(String ivfcalenderIds,Integer userId) {
		String sql="";
		String msg="";
		try{
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update ivf_calender_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where ivf_calender_id in("+ivfcalenderIds+")");
			
			itemInfo.executeUpdate();
			
			msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public String deleteBasicFollicularInfo(String follicularIds,Integer userId) {
		String sql="";
		String msg="";
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update follicular_basic_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where follicular_id in("+follicularIds+")");
			
			itemInfo.executeUpdate();
			msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public String getHusbandNameForOvamPickup(Integer femalePatientId) {
		Integer malePatientId=0;
		String sql="";
		String hName="";
		//Integer femalePatientId=0;
		try{
			/*
			 * sql="Select patient_id from ehat_treatment where treatment_id="+treatId;
			 * SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery( sql);
			 * femalePatientId=(Integer) query.uniqueResult();
			 */
			
			
			sql="Select male_patient_id from ehat_ivf_couple where female_patient_id="+femalePatientId;
			SQLQuery query11 = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			malePatientId=(Integer) query11.uniqueResult();
			
			
			sql="Select   CONCAT(`p`.`prefix`, ' ',`p`.`f_name`,' ',`p`.`m_name`, ' ', `p`.`l_name`) AS `patient_name` from ehat_patient p where patient_id="+malePatientId;
			
			SQLQuery queryHname = sessionFactory.getCurrentSession().createSQLQuery(
					sql);
			
		
			hName=(String) queryHname.uniqueResult();
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return hName;
	}

	@Override
	public List<Doctor> getDoctorListForOvamPickUp() {
		String sql="";
		List<Doctor> arrDoctor = new ArrayList<Doctor>();
		try{
			 sql = "select * from doctor where status='Y' and doc_Type='doctor' ";
			 
			 SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(
						sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> doctorDetails = query.list();
				
				
				for (Map<String, Object> rs : doctorDetails) {

					Doctor objdoctorDetails = new Doctor();
					
					objdoctorDetails.setDoc_name((String) rs.get("doc_name"));
					
					objdoctorDetails.setDoctor_ID((Integer) rs.get("Doctor_ID"));
					
					
					arrDoctor.add(objdoctorDetails);
				}
				
			 
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		return arrDoctor;
	}

	@Override
	public int saveOvamPickUpForm(OvamPickMasterDTO obj) {
		try{
			if(obj.getOvamPickUpMasterId()==0){
			sessionFactory.getCurrentSession().merge(obj);
			return 1;
			}else{
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}
		}catch (Exception e){
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public OvamPickMasterDTO getOvamPickUpMasterInfo(Integer patientId,String cycleNo) {
		
		 OvamPickMasterDTO obj =new OvamPickMasterDTO();
		try{
		    Criteria c=sessionFactory.getCurrentSession().createCriteria(OvamPickMasterDTO.class);
		    c.add(Restrictions.eq("patientId", patientId));
		    c.add(Restrictions.eq("cycleNo", cycleNo));
		     obj= (OvamPickMasterDTO) c.uniqueResult();
		    return obj;
		}catch (Exception e){
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String deleteOvamPickupSlaveInfo(String follicularIds, Integer userId) {
		String sql="";
		String msg="";
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update ovam_pickup_slave_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where ovam_pickup_slave_id in("+follicularIds+")");
			
			itemInfo.executeUpdate();
			msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public int saveEmbryoTransperForm(EmbryoTransferMasterDTO obj) {
		try{
			if(obj.getEmbryoTransferMasterId()==0){
			sessionFactory.getCurrentSession().merge(obj);
			return 1;
			}else{
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
			}
		}catch (Exception e){
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public EmbryoTransferMasterDTO getEmbryoMasterInfo(Integer patientId,String cycleNo) {
		
		List<EmbryoFreshSlaveDTO> newlstfreshembryo=new ArrayList<EmbryoFreshSlaveDTO>();
		List<EmbryoFrozenSlaveDTO> newlstfrozenembryo=new ArrayList<EmbryoFrozenSlaveDTO>();
		EmbryoTransferMasterDTO obj =new EmbryoTransferMasterDTO();
		try{
		    Criteria c=sessionFactory.getCurrentSession().createCriteria(EmbryoTransferMasterDTO.class);
		    c.add(Restrictions.eq("patientId", patientId));
		    c.add(Restrictions.eq("cycleNo", cycleNo));
		     obj= (EmbryoTransferMasterDTO) c.uniqueResult();
		     
		    if(obj !=null){
		    	
			    List<EmbryoFreshSlaveDTO> lstfreshembryo=obj.getGetListOfEmbryoFreshSlaveDTO();
			    for(EmbryoFreshSlaveDTO objslave:lstfreshembryo){
			    	if(objslave.getDeleted().equalsIgnoreCase("N")){
			    		newlstfreshembryo.add(objslave);
			    	}
			    }
			    
			    List<EmbryoFrozenSlaveDTO> lstfrozenembryo=obj.getGetListOfEmbryoFrozenSlaveDTO();
			    for(EmbryoFrozenSlaveDTO objslave:lstfrozenembryo){
			    	if(objslave.getDeleted().equalsIgnoreCase("N")){
			    		newlstfrozenembryo.add(objslave);
			    	}
			    }
		   
		    obj.setGetListOfEmbryoFreshSlaveDTO(newlstfreshembryo);
		    obj.setGetListOfEmbryoFrozenSlaveDTO(newlstfrozenembryo);
		   
		    }
		    return obj;
		}catch (Exception e){
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String deletefreshEmbryoSlaveInfo(String freshEmbryoSlaveIds,Integer userId) {
		String msg="";
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update embryo_fresh_slave_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where fresh_embryo_slave_id in("+freshEmbryoSlaveIds+")");
			
			itemInfo.executeUpdate();
			msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public String deletefrozenEmbryoSlaveInfo(String frozenEmbryoSlaveIds,Integer userId) {
		String msg="";
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update embryo_frozen_slave_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where frozen_embryo_slave_id in("+frozenEmbryoSlaveIds+")");
			
			itemInfo.executeUpdate();
			msg="Record Deleted Successfully";
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public IVFFollicularStudy getBasicStudyDataForFollucularStudyOnPrint(Integer masterFollicularStudyId) {
		IVFFollicularStudy objstudy =new IVFFollicularStudy();
		
		try{
			
			objstudy=(IVFFollicularStudy) sessionFactory.getCurrentSession().get(IVFFollicularStudy.class, masterFollicularStudyId);
				
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return objstudy;
	}

	@Override
	public OvamPickMasterDTO getOvamPickUpMasterInfoOnPrint(Integer patientId, String cycleNo) {
		
		 OvamPickMasterDTO obj =new OvamPickMasterDTO();
		try{
		    Criteria c=sessionFactory.getCurrentSession().createCriteria(OvamPickMasterDTO.class);
		    c.add(Restrictions.eq("patientId", patientId));
		    c.add(Restrictions.eq("cycleNo", cycleNo));
		     obj= (OvamPickMasterDTO) c.uniqueResult();
		    return obj;
		}catch (Exception e){
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public OvamPickUpSlaveDTO getOvamPickUpSalveList(Integer patientId, String cycleNo) {
		
		OvamPickUpSlaveDTO obj=new OvamPickUpSlaveDTO();
		
		List<OvamPickUpSlaveDTO> list=new ArrayList<OvamPickUpSlaveDTO>();
		try {
			 Criteria c=   sessionFactory.getCurrentSession().createCriteria(OvamPickUpSlaveDTO.class);
			 c.add(Restrictions.eq("patientId",Integer.toString(patientId)));
			 c.add(Restrictions.eq("cycleNo", cycleNo));
			 c.add(Restrictions.eq("deleted", "N"));
			 list= c.list();
			obj.setGetListOfOvamPickUpSlaveDTO(list);
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return obj;
	}

	@Override
	public String getOvamPickupDate(Integer patientId, String cycleNo) {
		String ovamDate="";
		try {
			String hql="Select dateOfOvamPickUp from OvamPickMasterDTO where patientId="+patientId+" and cycleNo="+cycleNo+" ";
			
			Query q=  sessionFactory.getCurrentSession().createQuery(hql);
			ovamDate=(String) q.uniqueResult();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return ovamDate;
	}

	@Override
	public String getEmbryoTransperDate(Integer patientId, String cycleNo) {
		String ovamDate="";
		try {
			String hql="Select dateofEmbryoTransper from EmbryoTransferMasterDTO where patientId="+patientId+" and cycleNo="+cycleNo+" ";
			
			Query q=  sessionFactory.getCurrentSession().createQuery(hql);
			ovamDate=(String) q.uniqueResult();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return ovamDate;
	}

}
