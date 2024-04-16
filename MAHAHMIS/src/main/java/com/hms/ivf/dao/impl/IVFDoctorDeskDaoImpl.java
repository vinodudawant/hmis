package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dao.IVFDoctorDeskDao;
import com.hms.ivf.dto.IVFAutoSummaryDischargeDTO;
import com.hms.ivf.dto.IVFCpoeServdetails;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.dto.IVFOTNotesDTO;
import com.hms.ivf.dto.IVFRegPatientDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfBillDetailsDto;
@Repository
public class IVFDoctorDeskDaoImpl implements IVFDoctorDeskDao {
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public List<IVFRegPatientDTO> getListIVFRegPatientDTO(String pageName) {
		List<IVFRegPatientDTO> listregpatientivf=new ArrayList<IVFRegPatientDTO>();
		try{
			Criteria c=	sessionFactory.getCurrentSession().createCriteria(IVFRegPatientDTO.class);
			if(pageName.equalsIgnoreCase("current")) {
				c.add(Restrictions.eq("ivf_status", "Y"));
			}else {
				c.add(Restrictions.eq("ivf_status", "N"));
			}
			 
			 listregpatientivf = c.list();
			return listregpatientivf;
		}catch(Exception e){
			e.printStackTrace();
		}
		return listregpatientivf;
	}
	@Override
	public IVFRegPatientDTO getIvfPatientInfoByIVFTreatId(Integer ivfTreatId) {
		
		IVFRegPatientDTO obj=new IVFRegPatientDTO();
		try{
			Criteria c=	sessionFactory.getCurrentSession().createCriteria(IVFRegPatientDTO.class);
			 c.add(Restrictions.eq("ivf_treat_id", ivfTreatId));
			 obj= (IVFRegPatientDTO) c.uniqueResult();
			
			 return obj;
		}catch(Exception e){
			e.printStackTrace();
		}
	
		return obj;
	}

	@Override
	public int setProvisinalOrConfirmDignosisType(Integer ivfdignoMasterId,	String dignosisType) {
		String sql="";
		int res=0;
		try{
			sql="update  IVFDignosisDTO i set i.diagnosisType=:diagnosisType where i.dignosisMasterId=:dignosisMasterId";
		Query query=sessionFactory.getCurrentSession().createQuery(sql);
		query.setParameter("diagnosisType", dignosisType);
		query.setParameter("dignosisMasterId", ivfdignoMasterId);
		query.executeUpdate();
		res=1;
		
		}catch(Exception e){
			e.printStackTrace();
			
		}
		return res;
	}
	@Override
	public int saveIVFDiet(IVFDietDTO obj) {
		try{
			if(obj.getDietMasterId()==0){
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
	public List<IVFDietDTO> getListOfIVFDiet(Integer ivfTreatId, Integer unitId) {
		List<IVFDietDTO> lstivfdiet=new ArrayList<IVFDietDTO>();
		try{
			Criteria c=sessionFactory.getCurrentSession().createCriteria(IVFDietDTO.class);
			c.add(Restrictions.eq("ivfTreatId", ivfTreatId));
			c.add(Restrictions.eq("deleted", "N"));
			lstivfdiet=c.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstivfdiet;
	}
	@Override
	public int deleteIVFDiet(String ivfdietMasterId, Integer userId) {
	
		int msg=0;
		try{
			
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update ivf_diet_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where diet_master_id in("+ivfdietMasterId+")");
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}
	@Override
	public IVFDietDTO editIVFDiet(Integer ivfdietMasterId) {
		IVFDietDTO obj=new IVFDietDTO();
		try{
			obj=(IVFDietDTO) sessionFactory.getCurrentSession().get(IVFDietDTO.class, ivfdietMasterId);
			return obj;
		}catch(Exception e){
			e.printStackTrace();
		}
		return obj;
	}
	@Override
	public List<IVFDietDTO> getIVFDietListForPrint(String ivfdietMasterIds) {
		
		List<IVFDietDTO> lstivfdiet=new ArrayList<IVFDietDTO>();
		try{
			List<Integer> ivfIds=new ArrayList<Integer>();
			String ivfids[]=ivfdietMasterIds.split(",");
			for(String ivfID:ivfids){
				ivfIds.add(Integer.parseInt(ivfID));
			}
			Criteria c=sessionFactory.getCurrentSession().createCriteria(IVFDietDTO.class);
			c.add(Restrictions.in("dietMasterId", ivfIds));
			
			lstivfdiet=c.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstivfdiet;
	}
	@Override
	public int savecpoe(IvfBillDetailsDto billDetailsDto, String queryType) {
		// TODO Auto-generated method stub
		return 0;
	}
	@Override
	public List<IVFCpoeServdetails> getlistbiil(Integer tID, String callform, Integer servid) {

		List<IVFCpoeServdetails>tlistbiilall=new ArrayList<IVFCpoeServdetails>();
		
		try {
			
			   if(callform.equalsIgnoreCase("coversheet")){
				   
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(IVFCpoeServdetails.class);
					criteria.add(Restrictions.eq("treatmentid", tID));
					System.out.println("treatmentid="+tID);
					criteria.add(Restrictions.eq("serviceid", servid));
					criteria.setMaxResults(10);
					tlistbiilall = criteria.list();
				   
				   
			   }else{
				   
			/*Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CpoeServdetails.class);
			criteria.add(Restrictions.eq("treatmentid", tID));
			//criteria.add(Restrictions.eq("drdeskFlag","D"));
			criteria.setMaxResults(10);
			tlistbiilall = criteria.list();*/
			
				   IVFCpoeServdetails objCpoe=new IVFCpoeServdetails();
			
			//List<CpoeIPDdetails> tlistbiilall=new ArrayList<CpoeIPDdetails>();
					
			String fetchId="";
			Calendar postDate = Calendar.getInstance();
			ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");

			int packageID = Integer.parseInt((String)resourceBundleEhat.getString("labHeadingID"));//13
			int serviceId = Integer.parseInt((String)resourceBundleEhat.getString("packageID"));//11
			int investigation = Integer.parseInt((String)resourceBundleEhat.getString("investigation"));//12
			int casuality = Integer.parseInt((String)resourceBundleEhat.getString("casuality"));
			int physiotherapy = Integer.parseInt((String)resourceBundleEhat.getString("physiotherapy"));
			int otherservices = Integer.parseInt((String)resourceBundleEhat.getString("otherservices"));
			int radiationId = Integer.parseInt((String)resourceBundleEhat.getString("radiationId"));
				//String sql="select a.bill_details_id AS bill_details_ipd_id, a.treatment_id AS treatment_id,b.service_id AS service_id, b.service_name AS service_name, t.id AS id, t.category_name AS category_name, t.charges  AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions from ehat_bill_details_ipd a join ehat_subservice t ON t.service_id = a.service_id and t.id = a.sub_service_id  join ehat_service_master b ON b.service_id = t.service_id  left join doctor ON doctor.Doctor_ID = a.doctor_id  where a.delete_from='B' or a.delete_from='-' and t.isCategory = 'N' and t.deleted = 'N'  and b.deleted = 'N' and t.service_id in(11,12,13,31,28) and a.treatment_id='"+tID+"'  and (a.ot_flag = 'N') and (t.deleted = 'N') and (b.deleted = 'N') order by a.bill_details_id desc";
				String sql="select a.sndtolabflag,a.sndtorisflag,a.bill_details_id AS bill_details_id, a.emrPer AS emrPer, a.rate AS rate, a.treatment_id AS treatment_id, b.service_id AS service_id, b.service_name AS service_name, t.id AS id, a.drdesk_flag AS drdesk_flag, t.category_name AS category_name, t.charges AS category_charges, a.quantity AS quantity, ifnull(doctor.doc_name, '-') AS docName, a.created_date_time AS created_date_time, a.paid_flag AS paid_flag, a.doctor_id AS doctor_id, a.clinical_notes AS clinical_notes, a.instructions AS instructions, a.created_date_time AS inserted_date_time ,a.deleted AS deleted,a.cancle AS cancel from (((ivf_ehat_bill_details a join ehat_subservice t ON (((t.service_id = a.service_id) and (t.id = a.sub_service_id)))) join ehat_service_master b ON ((b.service_id = t.service_id))) left join doctor ON ((doctor.Doctor_ID = a.doctor_id))) where (a.delete_from='B' or a.delete_from='-') and t.isCategory = 'N' and t.deleted = 'N'  and b.deleted = 'N' and t.service_id in("+serviceId+","+investigation+","+packageID+","+physiotherapy+","+casuality+","+otherservices+","+radiationId+") and a.treatment_id='"+tID+"' order by a.bill_details_id desc";
						System.out.println(sql);
				Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> result = query.list();
				//tlistbiilall= query.list();
				for(Map<String, Object> row : result){
					IVFCpoeServdetails obj=new IVFCpoeServdetails();
					obj.setBilldetailsid((Integer)row.get("bill_details_id"));
					obj.setTreatmentid((Integer)row.get("treatment_id"));
					obj.setServiceid((Integer)row.get("service_id"));
					obj.setPaid_flag((String)row.get("paid_flag"));
					obj.setDoctor_id((Integer)row.get("doctor_id"));
					obj.setClinical_notes((String)row.get("clinical_notes"));
					obj.setInstructions((String)row.get("instructions"));
					obj.setServicename((String)row.get("service_name"));
					obj.setCategoryid((Integer)row.get("id"));
					obj.setCategoryName((String)row.get("category_name"));
					obj.setCategorycharges((Double)row.get("category_charges"));
					obj.setQuantity(((Double)row.get("quantity")).intValue());
					obj.setDocName((String)row.get("docName"));
					obj.setInserted_date_time((Date)row.get("created_date_time"));
					obj.setEmrPer((Double)row.get("emrPer"));
					obj.setRate((Double)row.get("rate"));
					obj.setDeleted((String)row.get("deleted"));
					obj.setCancel((String)row.get("cancel"));
					obj.setSndtolabflag((String)row.get("sndtolabflag"));
					obj.setSndtorisflag((String)row.get("sndtorisflag"));
					java.util.Calendar cal = Calendar.getInstance();
					cal.setTime(obj.getInserted_date_time());
					cal.set(Calendar.HOUR_OF_DAY, 0);
					cal.set(Calendar.MINUTE, 0);
					cal.set(Calendar.SECOND, 0);
					cal.set(Calendar.MILLISECOND, 0);    
					java.sql.Date sqlDate = new java.sql.Date(cal.getTime().getTime());
					
					obj.setCreated_date_time(sqlDate);
					tlistbiilall.add(obj);
				}
			}
				
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
		
		return tlistbiilall;
	}
	@Override
	public int deleteservdetails(String labservicelist, Integer userId, String callform) {
		String[] ary = labservicelist.split(",");
		try {
			if(callform.equalsIgnoreCase("OTP")){
				OTPercentageDTO TPercentageDTO = new OTPercentageDTO();
				TPercentageDTO = (OTPercentageDTO) sessionFactory
						.getCurrentSession().get(OTPercentageDTO.class, Integer.parseInt(labservicelist));
				
				TPercentageDTO.setConfugrationflag("Y");
				TPercentageDTO.setUpdatedBy(userId);
				TPercentageDTO.setUpdatedDateTime((new Date(new java.util.Date().getTime())));
		     }else if(callform.equalsIgnoreCase("IPD")){
		    	//Added by Laxman for deletefrom flag.
		    	 String deleteFromFlag="D";
				System.out.println("id isssss="+ labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsIpdDto billDetailsDto = new BillDetailsIpdDto();
					billDetailsDto = (BillDetailsIpdDto) sessionFactory
							.getCurrentSession().get(BillDetailsIpdDto.class, Integer.parseInt(ary[i]));
					
					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					billDetailsDto.setDeleteFrom(deleteFromFlag);
					//billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
					//sessionFactory.getCurrentSession().update(billDetailsDto);
				}
					
			    }else if(callform.equals("OT") ||callform.equals("OC") ){
				System.out.println("id isssss="+ labservicelist);
				for (int i = 0; i < ary.length; i++) {
					System.err.println(ary[i]);
					BillDetailsIpdDto billDetailsDto = new BillDetailsIpdDto();
					billDetailsDto = (BillDetailsIpdDto) sessionFactory
							.getCurrentSession().get(BillDetailsIpdDto.class, Integer.parseInt(ary[i]));
					
					billDetailsDto.setDeleted("Y");
					billDetailsDto.setDeletedBy(userId);
					billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
					//billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
					//sessionFactory.getCurrentSession().update(billDetailsDto);
				}
					
			    }else{
			    	//Added by Laxman for deletefrom flag.
			    	String deleteFromFlag="B";
						if(callform.equalsIgnoreCase("DR") || callform.equalsIgnoreCase("Diagno"))
						{
							deleteFromFlag="D";
						}
		    System.out.println("id isssss="+ labservicelist);
	    	for (int i = 0; i < ary.length; i++) {
			System.err.println(ary[i]);
			IvfBillDetailsDto billDetailsDto = new IvfBillDetailsDto();
			billDetailsDto = (IvfBillDetailsDto) sessionFactory
					.getCurrentSession().get(IvfBillDetailsDto.class, Integer.parseInt(ary[i]));
			
			billDetailsDto.setDeleted("Y");
			billDetailsDto.setDeletedBy(userId);
			billDetailsDto.setDeletedDateTime((new Date(new java.util.Date().getTime())));
			billDetailsDto.setDeleteFrom(deleteFromFlag);
			//billDetailsDto.setBillDetailsId(Integer.parseInt(ary[i]));
			//sessionFactory.getCurrentSession().update(billDetailsDto);
		}
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
		
		return 1;
	}
	@Override
	public int saveAutoIvfDischargeSummery(IVFAutoSummaryDischargeDTO obj) {
		try {
			sessionFactory.getCurrentSession().merge(obj);
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	@Override
	public IVFAutoSummaryDischargeDTO getIvfAutoSummary(Integer ivfTreatId) {
		IVFAutoSummaryDischargeDTO obj=new IVFAutoSummaryDischargeDTO();
		try{
			Criteria c=	sessionFactory.getCurrentSession().createCriteria(IVFAutoSummaryDischargeDTO.class);
			 c.add(Restrictions.eq("ivftreatmentId", ivfTreatId));
			 obj= (IVFAutoSummaryDischargeDTO) c.uniqueResult();
			
			 return obj;
		}catch(Exception e){
			e.printStackTrace();
		}
	
		return obj;
	}
	@Override
	public List<IVFRegPatientDTO> getIvfPreviousAutoSummaryList() {
		String sql="";
		List<IVFRegPatientDTO> listregpatientivf=new ArrayList<IVFRegPatientDTO>();
		try {
			sql="select ifnull(mobile,0)as mobile ,ifnull(patient_id,0) as patient_id,ifnull(patient_name,'') as patient_name  ,ifnull(center_patient_id,0) as center_patient_id,ifnull(created_date_time,'') as created_date_time   from ivf_patient_records_details where ivf_treat_flag='N' group by patient_id";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();
			for(Map<String, Object> row : result){
				IVFRegPatientDTO obj=new IVFRegPatientDTO();
				obj.setPatientId(((Number)row.get("patient_id")).intValue());
				obj.setPatientName((String)row.get("patient_name"));
				//obj.setCreatedDateTime((Date)row.get("created_date_time"));
				obj.setCreatedate((String)row.get("created_date_time"));
				obj.setMobile((String)row.get("mobile"));
				obj.setCenter_patient_id((String)row.get("center_patient_id"));
				listregpatientivf.add(obj);
				obj=null;
			}
			return listregpatientivf;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return listregpatientivf;
	}
	@Override
	public List<IVFRegPatientDTO> getIvfTreatmentListByPatientId(Integer patinetId) {
		
		List<IVFRegPatientDTO> listregpatientivf=new ArrayList<IVFRegPatientDTO>();
		try{
			 Criteria c=sessionFactory.getCurrentSession().createCriteria(IVFRegPatientDTO.class);
			 c.add(Restrictions.eq("ivf_treat_flag", "N"));
			 c.add(Restrictions.eq("patientId", patinetId));
			 listregpatientivf= c.list();
			return listregpatientivf;
		}catch(Exception e){
			e.printStackTrace();
		}
		return listregpatientivf;
	}
	@Override
	public List<IVFRegPatientDTO> autoSuggestionForPriviousAuttosummary(String searchText) {
		String sql="";
		List<IVFRegPatientDTO> listregpatientivf=new ArrayList<IVFRegPatientDTO>();
		try {
			sql="select ifnull(mobile,0)as mobile ,ifnull(patient_id,0) as patient_id,ifnull(patient_name,'') as patient_name  ,ifnull(center_patient_id,0) as center_patient_id,ifnull(created_date_time,'') as created_date_time   from ivf_patient_records_details where ivf_treat_flag='N' and patient_name like '%"+searchText+"%'  group by patient_id";
			
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();
			for(Map<String, Object> row : result){
				IVFRegPatientDTO obj=new IVFRegPatientDTO();
				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setPatientName((String)row.get("patient_name"));
				//obj.setCreatedDateTime((Date)row.get("created_date_time"));
				obj.setCreatedate((String)row.get("created_date_time"));
				obj.setMobile((String)row.get("mobile"));
				obj.setCenter_patient_id((String)row.get("center_patient_id"));
				listregpatientivf.add(obj);
				obj=null;
			}
			return listregpatientivf;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return listregpatientivf;
	}
	@Override
	public IVFRegPatientDTO getPatientInfoByPatientId(Integer patientId) {
		String sql="";
		IVFRegPatientDTO obj=new IVFRegPatientDTO();
		try { 
			sql="select ifnull(mobile,0)as mobile ,ifnull(patient_id,0) as patient_id,concat(prefix,' ',f_name,' ',m_name,' ',l_name) as patient_name  ,ifnull(center_patient_id,0) as center_patient_id,ifnull(created_date_time,'') as created_date_time   from ehat_patient where  patient_id="+patientId+" ";
			
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> result = query.list();
			for(Map<String, Object> row : result){
			
				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setPatientName((String)row.get("patient_name"));
				//obj.setCreatedDateTime((Date)row.get("created_date_time"));
				obj.setCreatedate((String)row.get("created_date_time"));
				obj.setMobile((String)row.get("mobile"));
				obj.setCenter_patient_id((String)row.get("center_patient_id"));
			
				
			}
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	@Override
	public List<IVFTreatmentDTO> getPrevIvfPatdetails(Integer patientId) {
		List<IVFTreatmentDTO> ltPatientRecord = new ArrayList<IVFTreatmentDTO>();
		try {
			  
			Session session = sessionFactory.getCurrentSession();
		
			 Date d=new Date(new java.util.Date().getTime());
			
			 String hql = "from IVFTreatmentDTO  WHERE patientId =:patientId and ivfStatus=:ivfStatus";
				Query query = session.createQuery(hql);
				query.setParameter("patientId",patientId);  
				query.setParameter("ivfStatus","N");  

				ltPatientRecord=query.list();
				
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltPatientRecord;
		}
		return ltPatientRecord;
	}
	
	
	@Override
	public RegistrationViewDto autoSuggestionOfPrevIvfPatient(String findingName, int patSearchType, String callFrom) {

		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto> ();
		try {
			String sql = "";
			
			if(callFrom.equals("IvfDoctorDesk")){
			
				sql = getSqlQueryIvfDoctorDesk(findingName,patSearchType);
				
			}else if(callFrom.equals("prevIvf")){
				
				sql = getSqlQueryPrevIvf(findingName,patSearchType);
				
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto obj = new RegistrationViewDto();
		    	obj.setPatientName((String)row.get("patient_name"));
		    	obj.setPtId((Integer)row.get("patient_id"));
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	obj.setMobile((String)row.get("mobile"));
		    	patList.add(obj);		    	
	    	}
		    mv.setLstRegviewDto(patList);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}
	
     String getSqlQueryIvfDoctorDesk(String findingName,int patSearchType){
		
    	 String sql = "";
 		if(patSearchType == 1){
 			
 			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
 				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) "
 				 +" where it.ivf_status = 'Y' and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
 			
 		}else if(patSearchType == 2){
 			
 			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
 					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) "
 					+" where it.ivf_status = 'Y' and (p.f_name like '"+findingName+"%' "
 					+" OR p.l_name like '"+findingName+"%' "
 					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
 					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
 					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
 					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
 		
 		}else if(patSearchType == 3){
 			
 			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
 					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) "
 					 +" where it.ivf_status = 'Y' and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
 				
 		}
		
		return sql;
	}
	

   String getSqlQueryPrevIvf(String findingName,int patSearchType){
	
	   String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) "
				 +" where it.ivf_status = 'N' and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) "
					+" where it.ivf_status = 'N' and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) LEFT JOIN ehat_ivf_treatment it ON (it.treatment_id = t.treatment_id) "
					 +" where it.ivf_status = 'N' and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
	
	return sql;
}

	@Override
	public List<IVFRegPatientDTO> getPreviousIvfPatientTreatment(String letter, String usertype, Integer unitId) {
		List<IVFRegPatientDTO> ltIVFPrevPatientDTO = new ArrayList<IVFRegPatientDTO>();
        
		Session session = sessionFactory.getCurrentSession();
		try {
			
			String hql = "from IVFRegPatientDTO  WHERE patientId =:patientId and ivf_status=:ivf_status";
			Query query = session.createQuery(hql);
			query.setParameter("patientId",Integer.parseInt(letter));  
			query.setParameter("ivf_status","N");  

			ltIVFPrevPatientDTO=query.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltIVFPrevPatientDTO;
	}
	@Override
	public List<IVFRegPatientDTO> getIvfPatientTreatmentForDD(String letter, String usertype, Integer unitId) {
     List<IVFRegPatientDTO> ltIVFRegPatientDTO = new ArrayList<IVFRegPatientDTO>();
        
		Session session = sessionFactory.getCurrentSession();
		try {
			
			String hql = "from IVFRegPatientDTO  WHERE patientId =:patientId and ivf_status=:ivf_status";
			Query query = session.createQuery(hql);
			query.setParameter("patientId",Integer.parseInt(letter));  
			query.setParameter("ivf_status","Y");  

			ltIVFRegPatientDTO=query.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			//return ltRegistrationViewDto;
		}
		return ltIVFRegPatientDTO;
	}
	@Override
	public int saveIvfAutoSummaryOTNotes(IVFOTNotesDTO obj) {
		try {
			sessionFactory.getCurrentSession().merge(obj);
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	@Override
	public IVFOTNotesDTO getIvfOTNotes(Integer ivfTreatId) {
		IVFOTNotesDTO obj=new IVFOTNotesDTO();
		try{
			Criteria c=	sessionFactory.getCurrentSession().createCriteria(IVFOTNotesDTO.class);
			 c.add(Restrictions.eq("ivftreatmentId", ivfTreatId));
			 obj= (IVFOTNotesDTO) c.uniqueResult();
			
			 return obj;
		}catch(Exception e){
			e.printStackTrace();
		}
	
		return obj;
	}
	
	
	@Override
	public List<IVFRegPatientDTO> getPatientOnIvfDoctorDesk(String fromDate, String toDate, String page) {
		List<IVFRegPatientDTO> list=new ArrayList<IVFRegPatientDTO>();
		
		try {
			String sql = "";
			
			if(page.equalsIgnoreCase("current")) {
				 //sql = "SELECT * FROM ivf_patient_records_details where date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and ivf_status='Y' and ivf_pay_flag='Y' order by patient_id desc ";
				sql = "SELECT * FROM ivf_patient_records_details where date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and ivf_status='Y' and ivf_pay_flag='Y'  order by patient_id desc ";
			}else {
				//sql = "SELECT * FROM ivf_patient_records_details where date(created_date_time) >= '"+fromDate+"' and date(created_date_time) <= '"+toDate+"' and ivf_status='N'  order by patient_id desc ";
				sql = "SELECT * FROM ivf_patient_records_details where  ivf_status='N'  order by patient_id desc ";
			}
			
			Query ltCoupleResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);

			ltCoupleResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> Couplelist = ltCoupleResQuery.list();
			for (Map<String, Object> row : Couplelist) {
					IVFRegPatientDTO obj=new IVFRegPatientDTO();
					
					obj.setPatientId((Integer) row.get("patient_id"));
					obj.setMrnno((String) row.get("mrnno"));
					obj.setCreatedDateTime((Date) row.get("created_date_time"));
					obj.setPatientName((String) row.get("patient_name"));
					obj.setAge((String) row.get("patient_age"));
					obj.setGender((String) row.get("gender"));
					obj.setIvf_treat_id((Integer) row.get("ivf_treat_id"));
					obj.setTreatmentId((Integer) row.get("treatment_id"));
					list.add(obj);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return list;
	}
	
	
}
