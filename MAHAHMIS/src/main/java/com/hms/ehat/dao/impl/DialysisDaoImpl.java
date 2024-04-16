package com.hms.ehat.dao.impl;

import java.math.BigInteger;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.DialysisDao;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.BloodTransfusionDTO;
import com.hms.ehat.dto.DialysisAdviceDto;
import com.hms.ehat.dto.DialysisDto;
import com.hms.ehat.dto.DialysisSchedulerDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ehat.dto.HaeRecordModialtsisDTO;
import com.hms.ehat.dto.HemodialysisCarePlanDto;
import com.hms.ehat.dto.InformedConsentFormDto;
import com.hms.ehat.dto.PostDialysisAssesmentDTO;
import com.hms.ehat.dto.PostDialysisTableDTO;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.UploadDocumentDialysisDto;
import com.hms.ehat.dto.VirologyVaccinationDTO;
import com.hms.ipdbill.dto.IpdBillPatientsBedsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class DialysisDaoImpl implements DialysisDao {
	static Logger log=Logger.getLogger(DialysisDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdQueueDTO> getAlldialysisPatient() {
		log.info("In DialysisDaoImpl getAlldialysisPatient()");
		List<IpdQueueDTO> ltIpdQueue = null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdQueueDTO.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("specialityId", 71));
		criteria.addOrder(Order.desc("pId"));
		ltIpdQueue = criteria.list();

	} catch (Exception e) {
		log.error("Exception--> ",e);
		return ltIpdQueue;
	}
	return ltIpdQueue;
	}

	@Override
	public List<IpdBillPatientsBedsDTO> viewIpdbillPatientsBedsWithDialysis() {
		log.info("In DialysisDaoImpl viewIpdbillPatientsBedsWithDialysis()");
		List<IpdBillPatientsBedsDTO> ltPatientRecord = new ArrayList<IpdBillPatientsBedsDTO>();
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		String query1 ="";
		try {
			query1 = "select p.mrnno AS mrnno,ifnull(concat(p.prefix, ' ',  p.f_name,' ',p.m_name,' ',p.l_name),'-') AS patient_name,ifnull(e.patient_id, 0) AS patient_id,p.mobile AS mobile,ifnull(p.age, '-') AS age,t.weight AS weight,t.opdipdno AS opdipdno,p.created_date_time AS created_date_time,ifnull(t.doctor_id, 0) AS doctor_id,ht.hall_type_name AS ht_name,h.Hname AS h_name,(select cast(b.bed_name as unsigned)) AS bname,ifnull(t.treatment_id, 0) AS treatment_id, ifnull(t.specialityId, 0) AS specialityId,t.t_flag from hall_type ht join hall h join beds b ON ht.idhall_type = h.Htype and h.Hall_ID = b.Hall_ID and b.status = 'Y' left join ehat_bill_details_ipd e ON e.sub_service_id = b.Bed_ID and e.sub_service_id <> 0 and e.service_id = 3 and e.on_bed_flag = 'Y' left join ehat_treatment t ON e.treatment_id = t.treatment_id and t.t_flag = 'Y'and t.department_id = 2 left join ehat_patient p ON p.patient_id = e.patient_id and p.deleted = 'N' left join  ehat_bill_master bm ON bm.treatment_id = e.treatment_id and bm.deleted = 'N' and bm.department_id = 2 left join ehat_charges_master_slave cm ON bm.charges_master_slave_id = cm.id where specialityId = '71' ORDER BY t.treatment_id DESC ";
		    
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List<Map<String, Object>> data = query.list();
	        for(Map<String, Object> row : data){ 
	        	IpdBillPatientsBedsDTO objDTO =new IpdBillPatientsBedsDTO();
	        	 objDTO.setMrnno((String)row.get("mrnno"));
	        	 objDTO.setPatientName((String)row.get("patient_name"));
	        	 objDTO.setPatientID((BigInteger)row.get("patient_id"));
	        	 objDTO.setMobile((String)row.get("mobile"));
	        	 objDTO.setPatientAge((String)row.get("age"));
	        	 objDTO.setWeight1((String)row.get("weight"));
	        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
	        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));	   
	        	 objDTO.setDoctorId((String)row.get("doctor_id"));
	        	 objDTO.setHallTypeName((String)row.get("ht_name"));
	        	 objDTO.setHname((String)row.get("h_name"));
	        	 objDTO.setBedname((BigInteger)row.get("bname"));
	         	 objDTO.setTreatID((BigInteger)row.get("treatment_id"));
	          	 objDTO.setSpecID((BigInteger)row.get("specialityId"));
	          	 objDTO.setTreatmentFlag((String)row.get("t_flag"));
	     
	             ltPatientRecord.add(objDTO);
	            
	            /* Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(DoctorDto.class);
	             ltDoctorDto=criteria2.list();*/
	  
	            objDTO=null;
	         }	    
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltPatientRecord;
	
}

	@Override
	public int saveDialysisAdvice(DialysisAdviceDto dialysisdto,
			HttpServletRequest request) {	
		log.info("In DialysisDaoImpl saveDialysisAdvice()");
		try {
			dialysisdto.setCreatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().merge(dialysisdto);
			} catch (Exception e) {
				log.error("Exception--> ",e);
				return 0;
			}
			return 1;
		}

	@Override
	public List<DialysisAdviceDto> getDialysisAdviceList(Integer treatmentId) {
		log.info("In DialysisDaoImpl getDialysisAdviceList()");
		List<DialysisAdviceDto> listDialysisAdvice = null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DialysisAdviceDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		listDialysisAdvice = criteria.list();

	} catch (Exception e) {
		log.error("Exception--> ",e);
		return listDialysisAdvice;
	}
	return listDialysisAdvice;
	}

	@Override
	public int saveHaeRecordModialtsis(String preDialysis,String postDialysis,HttpServletRequest request) {
		log.info("In DialysisDaoImpl saveHaeRecordModialtsis()");
		int res;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");			
			
			
			String sqlForUnitId="select ifnull((unit_id),0) from ehat_unit_master where deleted='N' and active_flag='Y'";
			Query unitIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlForUnitId);
			int centerUnitId = ((Number)unitIdQuery.uniqueResult()).intValue();
			
			HaeRecordModialtsisDTO haeRecordModialtsisList=(HaeRecordModialtsisDTO) ConfigUIJSONUtility.getObjectFromJSON(preDialysis,HaeRecordModialtsisDTO.class);	
			HaeRecordModialtsisDTO	preDto=haeRecordModialtsisList.getPreDialysisList().get(0);
			
			PostDialysisAssesmentDTO postDilDialysisAssesmentList=(PostDialysisAssesmentDTO) ConfigUIJSONUtility.getObjectFromJSON(postDialysis,PostDialysisAssesmentDTO.class);
			PostDialysisAssesmentDTO postDto=postDilDialysisAssesmentList.getPostDialysisList().get(0);
		   
		    if(preDto.getIdPreDialysis()==0 && postDto.getIdPostDialysisAssesment()==0)
		    {
		    	     preDto.setCreatedBy(userId);
		    	     preDto.setDeleted("N");
		    	     preDto.setUnitId(centerUnitId);
		    	     preDto.setCreatedDate(new Date(new java.util.Date().getTime()));								
					sessionFactory.getCurrentSession().merge(preDto);				
					//set and get Record for PostDialysisAssesmentDTO  
					postDto.setCreatedBy(userId);
					postDto.setDeleted("N");
					postDto.setUnitId(centerUnitId);
					postDto.setCreatedDate(new Date(new java.util.Date().getTime()));					
					sessionFactory.getCurrentSession().merge(postDto);	
					res=1;
			}else{
				preDto.setIdPreDialysis(haeRecordModialtsisList.getPreDialysisList().get(0).getIdPreDialysis());
				preDto.setUpdatedBy(userId);
				preDto.setDeleted("N");
				//preDto.setUpdatedDate(new Date(new java.util.Date().getTime()));			
				sessionFactory.getCurrentSession().merge(preDto);			
				//set and get Record for PostDialysisAssesmentDTO  
				postDto.setUpdatedBy(userId);
				postDto.setDeleted("N");
				postDto.setUpdatedDate(new Date(new java.util.Date().getTime()));				
				sessionFactory.getCurrentSession().merge(postDto);
				res=2;
			}
		} 
	catch (Exception e) 
	{
		log.error("Exception--> ",e);
		return 0;
	}
		return res;
	}
	

	@Override
	public int saveOnDialysisTable(String tableDialysis,
			HttpServletRequest request) {
		log.info("In DialysisDaoImpl saveOnDialysisTable()");
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		try {	
			
			
			String sqlForUnitId="select ifnull((unit_id),0) from ehat_unit_master where deleted='N' and active_flag='Y'";
			Query unitIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlForUnitId);
			int centerUnitId = ((Number)unitIdQuery.uniqueResult()).intValue();
		
			PostDialysisTableDTO postDialysisTableList = (PostDialysisTableDTO) ConfigUIJSONUtility.getObjectFromJSON(tableDialysis,PostDialysisTableDTO.class);
				for(int i=0; i < postDialysisTableList.getPostDialysisTableList().size(); i++)
 {
				PostDialysisTableDTO postTable = new PostDialysisTableDTO();
				postTable = postDialysisTableList.getPostDialysisTableList().get(i);
				if (postTable.getIdPostDialysisTable() == 0) {
					if(centerUnitId>0)
					{
						postTable.setUnitId(centerUnitId);
	
					}
					postTable.setCreatedBy(userId);
					postTable.setDeleted("N");
					postTable.setCreatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().merge(postTable);
				} else {
					
					if(centerUnitId>0)
					{
						postTable.setUnitId(centerUnitId);
	
					}
					postTable.setUpdatedBy(userId);
					postTable.setDeleted("N");
					postTable.setUpdatedDate(new Date(new java.util.Date()
							.getTime()));
					sessionFactory.getCurrentSession().merge(postTable);
				}

			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
			return 0;
		}
		return 1;
	}
	
	// added by Ganesh :get  dialysis list
	@Override
	public HaeRecordModialtsisDTO getDialysisListById(Integer treatmentId) {
		log.info("In DialysisDaoImpl getDialysisListById()");
		List<HaeRecordModialtsisDTO> gethaemoRecord = null;
		List<PostDialysisAssesmentDTO> postDialysisAssesmentList = null;
		HaeRecordModialtsisDTO records = new HaeRecordModialtsisDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HaeRecordModialtsisDTO.class);
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("idPreDialysis"));
			gethaemoRecord = criteria.list();
			// call Post Dialysis and PostDialysisTable
			List<PostDialysisAssesmentDTO> getPostDialysisRecord = getPostDialysisById(treatmentId);
			

			if (getPostDialysisRecord.size() > 0 && gethaemoRecord.size() > 0) {
				records.setPreDialysisList(gethaemoRecord);
				records.setPostDialysisAssesmentList(getPostDialysisRecord);
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return records;
	}
	
	
	// added by Ganesh :get dialysis list
	public List<PostDialysisAssesmentDTO> getPostDialysisById(Integer treatmentId) {
		log.info("In DialysisDaoImpl getPostDialysisById()");
		List<PostDialysisAssesmentDTO> getPostDialysisAssesmentRecord = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PostDialysisAssesmentDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.addOrder(Order.asc("idPostDialysisAssesment"));// PostDialysisAssesmentDTO by id
			getPostDialysisAssesmentRecord = criteria.list();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return getPostDialysisAssesmentRecord;
	}
	
	// added by Ganesh :get On dialysis list
	@Override
	public List<PostDialysisTableDTO> getOnDialysisTableListById(Integer treatmentId) {
		log.info("In DialysisDaoImpl getOnDialysisTableListById()");
		List<PostDialysisTableDTO> onDialysisList=null; 
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PostDialysisTableDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.addOrder(Order.asc("idPostDialysisTable"));// PostDialysisTableDTO
																// id mapping
			onDialysisList =  criteria.list();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return onDialysisList;
	}

	// added by Ganesh :delete On dialysis Table  list Row
	@Override
	public boolean deleteTableRows(String idTables, HttpServletRequest request) {
		log.info("In DialysisDaoImpl deleteTableRows()");
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
            String id[] = idTables.split(",");                    
        
			for (int i = 0; i < id.length; i++) {	
			int id1 = Integer.parseInt(id[i]);	
			PostDialysisTableDTO dilysisTableDto =(PostDialysisTableDTO) sessionFactory.getCurrentSession().get(PostDialysisTableDTO.class,id1);
			dilysisTableDto.setDeleted("Y");
			dilysisTableDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			dilysisTableDto.setDeletedBy(userId);
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
			return false;
		}
		return true;
	}

	@Override
	public int saveCarePlan(HemodialysisCarePlanDto hemodialysiscareplandto,
			HttpServletRequest request) {
		log.info("In DialysisDaoImpl saveCarePlan()");
		try {
			
			String sqlForUnitId="select ifnull((unit_id),0) from ehat_unit_master where deleted='N' and active_flag='Y'";
			Query unitIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlForUnitId);
			int centerUnitId = ((Number)unitIdQuery.uniqueResult()).intValue();
			if(centerUnitId > 0){
				hemodialysiscareplandto.setUnitId(centerUnitId);
			}
			sessionFactory.getCurrentSession().merge(hemodialysiscareplandto);
		} catch (Exception e) {
			log.error("Exception--> ",e);
			return 0;
		}
		return 1;
	}
			
	@Override
	public List<HemodialysisCarePlanDto> getListCarePlanDialysis(Integer treatmentId) {
		log.info("In DialysisDaoImpl getListCarePlanDialysis()");
		List<HemodialysisCarePlanDto> listCarePlan = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HemodialysisCarePlanDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			listCarePlan = criteria.list();

		} catch (Exception e) {
			log.error("Exception--> ",e);
		}

		return listCarePlan;
	}

	
	@Override
	public int saveBloodtransfusionList(String bloodList,
			HttpServletRequest request) {
		log.info("In DialysisDaoImpl saveBloodtransfusionList()");
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		
		try {
			String sqlForUnitId="select ifnull((unit_id),0) from ehat_unit_master where deleted='N' and active_flag='Y'";
			Query unitIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlForUnitId);
			int centerUnitId = ((Number)unitIdQuery.uniqueResult()).intValue();	
			
			
			BloodTransfusionDTO bloodTransfusionTableList = (BloodTransfusionDTO) ConfigUIJSONUtility.getObjectFromJSON(bloodList,BloodTransfusionDTO.class);
			for(int i=0; i < bloodTransfusionTableList.getListBloodTransfusion().size(); i++)
			{
				BloodTransfusionDTO bloodTransfusionDTO=new BloodTransfusionDTO();
				bloodTransfusionDTO=bloodTransfusionTableList.getListBloodTransfusion().get(i);
				if (bloodTransfusionDTO.getBloodTransfusionId() == 0) {			
					
					if(centerUnitId > 0){
						bloodTransfusionDTO.setUnitId(centerUnitId);
				}	
					bloodTransfusionDTO.setCreatedBy(userId);
					bloodTransfusionDTO.setDeleted("N");
					bloodTransfusionDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().merge(bloodTransfusionDTO);					
				}else{
					if(centerUnitId > 0){
						bloodTransfusionDTO.setUnitId(centerUnitId);
				}	
					bloodTransfusionDTO.setUpdatedBy(userId);
					bloodTransfusionDTO.setDeleted("N");
					bloodTransfusionDTO.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().merge(bloodTransfusionDTO);	
				}
			}
			return 1;
	}catch (Exception e) {
		log.error("Exception--> ",e);
	}
	return 0;
}

	@Override
	public int savevirologyVaccinationList(String virologyVaccinationList,
			HttpServletRequest request) {
		log.info("In DialysisDaoImpl savevirologyVaccinationList()");
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try {
			
			String sqlForUnitId="select ifnull((unit_id),0) from ehat_unit_master where deleted='N' and active_flag='Y'";
			Query unitIdQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlForUnitId);
			int centerUnitId = ((Number)unitIdQuery.uniqueResult()).intValue();	
			
			VirologyVaccinationDTO virologyVaccinationTableList = (VirologyVaccinationDTO) ConfigUIJSONUtility.getObjectFromJSON(virologyVaccinationList,VirologyVaccinationDTO.class);		
			
			for(int i=0; i < virologyVaccinationTableList.getListVirologyVaccination().size(); i++)
			{
				VirologyVaccinationDTO virologyVaccinationDTO=new VirologyVaccinationDTO();
				virologyVaccinationDTO=virologyVaccinationTableList.getListVirologyVaccination().get(i);
				if (virologyVaccinationDTO.getVirologyVaccinationId() == 0) {
				
					if(centerUnitId > 0){
						virologyVaccinationDTO.setUnitId(centerUnitId);
				}				
     				virologyVaccinationDTO.setCreatedBy(userId);
					virologyVaccinationDTO.setDeleted("N");
					virologyVaccinationDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().merge(virologyVaccinationDTO);
				}else{
					
					if(centerUnitId > 0){
						virologyVaccinationDTO.setUnitId(centerUnitId);
				    }	
					virologyVaccinationDTO.setUpdatedBy(userId);
					virologyVaccinationDTO.setDeleted("N");
					virologyVaccinationDTO.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().merge(virologyVaccinationDTO);	
				}
			}
			return 1;
	}catch (Exception e) {
		log.error("Exception--> ",e);
	}
		return 0;
	}	
	
	
	@Override
	public List<BloodTransfusionDTO> getBloodTransfusionListById(Integer treatmentId) {
		log.info("In DialysisDaoImpl getBloodTransfusionListById()");
		List<BloodTransfusionDTO> bTList=null; 
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BloodTransfusionDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.addOrder(Order.asc("bloodTransfusionId"));// BloodTransfusionDTO
																// id mapping
			bTList =  criteria.list();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		
		
		return bTList;
	}

	@Override
	public List<VirologyVaccinationDTO> getVirologyVaccninationListById(Integer treatmentId) {
		log.info("In DialysisDaoImpl getVirologyVaccninationListById()");
		List<VirologyVaccinationDTO> VVList=null; 
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(VirologyVaccinationDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.addOrder(Order.asc("virologyVaccinationId"));// VirologyVaccinationDTO
																// id mapping
			VVList =  criteria.list();
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return VVList;
	}

	@Override
	public boolean deleteForBloodTransfution(String idTables,
			HttpServletRequest request) {
		log.info("In DialysisDaoImpl getVirologyVaccninationListById()");
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
            String id[] = idTables.split(",");
       
			for (int i = 0; i < id.length; i++) {
				
				  int id1 = Integer.parseInt(id[i]);	
			
			BloodTransfusionDTO bTDto =(BloodTransfusionDTO) sessionFactory.getCurrentSession().get(BloodTransfusionDTO.class,id1);
			bTDto.setDeleted("Y");
			bTDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			bTDto.setDeletedBy(userId);
			
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
			return false;
		}
		return true;
	}

	@Override
	public boolean deleteForVirologyVaccination(String idTables,
			HttpServletRequest request) {
		log.info("In DialysisDaoImpl getVirologyVaccninationListById()");
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
            String id[] = idTables.split(",");
         
            
              
			for (int i = 0; i < id.length; i++) {
				
				  int id1 = Integer.parseInt(id[i]);	
			
			VirologyVaccinationDTO vvDto =(VirologyVaccinationDTO) sessionFactory.getCurrentSession().get(VirologyVaccinationDTO.class,id1);
			vvDto.setDeleted("Y");
			vvDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			vvDto.setDeletedBy(userId);
			
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
			return false;
		}
		return true;
	}
	
	
	@Override
	public int uploadDocumentOnDialysis(UploadDocumentDialysisDto updocs) {
		log.info("In DialysisDaoImpl uploadDocumentOnDialysis()");
		try {
			updocs.setDate(new Date(new java.util.Date().getTime()));
			sessionFactory.getCurrentSession().merge(updocs);
		} catch (Exception e) {
			log.error("Exception--> ",e);
			return 0;
		}
		return 1;
	}

	@Override
	public List<UploadDocumentDialysisDto> fetchuploadDocument(Integer treatmentId) {
		log.info("In DialysisDaoImpl fetchuploadDocument()");
		List<UploadDocumentDialysisDto> ltoutsource = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UploadDocumentDialysisDto.class);
			criteria.add(Restrictions.eq("del", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.addOrder(Order.asc("upid"));
			ltoutsource = criteria.list();

		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltoutsource;
	}

	@Override
	public boolean deleteuploadDocument(Integer upid, HttpServletRequest request) {
		log.info("In DialysisDaoImpl deleteuploadDocument()");
		try {

			UploadDocumentDialysisDto uploadDocuments = (UploadDocumentDialysisDto) sessionFactory
					.getCurrentSession().get(UploadDocumentDialysisDto.class,
							upid);
			uploadDocuments.setDel("Y");

			uploadDocuments.setDate(new Date(new java.util.Date().getTime()));
		

		} catch (Exception e) {
			log.error("Exception--> ",e);
			return false;
		}
		return true;
	}


	@Override
	public List<DialysisAdviceDto> getwardtypeName() {
		log.info("In DialysisDaoImpl getwardtypeName()");
		List<DialysisAdviceDto> ltwardName = new ArrayList<DialysisAdviceDto>();
		try {
			
			 String quey="";
			
			 quey="SELECT Hall_ID,Hname FROM hall where Htype ='21' and status = 'Y' ";
			
		     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 DialysisAdviceDto objDTO =new DialysisAdviceDto();
	        
	        	 objDTO.setHallId((Integer)row.get("Hall_ID"));
	        	 objDTO.setWardName((String)row.get("Hname"));
	       
	        	 ltwardName.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		
		}
		return ltwardName;
	
	}

	@Override
	public List<IpdBillPatientsBedsDTO> getwardtypeNameofBedNo(Integer wardId) {
		log.info("In DialysisDaoImpl getwardtypeNameofBedNo()");
		List<IpdBillPatientsBedsDTO> ltPatientRecord = new ArrayList<IpdBillPatientsBedsDTO>();
	    String query1="";
		try {
			query1 = "select (select cast(b.bed_name as unsigned)) AS bname from hall_type ht join hall h join beds b ON ht.idhall_type = h.Htype and h.Hall_ID = b.Hall_ID and b.status = 'Y' left join ehat_bill_details_ipd e ON e.sub_service_id = b.Bed_ID and e.sub_service_id <> 0 and e.service_id = 3 and e.on_bed_flag = 'Y' left join ehat_treatment t ON e.treatment_id = t.treatment_id and t.t_flag = 'Y'and t.department_id = 2 left join ehat_patient p ON p.patient_id = e.patient_id and p.deleted = 'N' left join  ehat_bill_master bm ON bm.treatment_id = e.treatment_id and bm.deleted = 'N' and bm.department_id = 2 left join ehat_charges_master_slave cm ON bm.charges_master_slave_id = cm.id where h.Hall_ID = '"+wardId+"'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List<Map<String, Object>> data = query.list();
	        for(Map<String, Object> row : data){ 
	        	IpdBillPatientsBedsDTO objDTO =new IpdBillPatientsBedsDTO();  
	        	objDTO.setBedname((BigInteger)row.get("bname"));      
	            ltPatientRecord.add(objDTO);
	            objDTO=null;
	         }
	         
	        
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
			}
		return ltPatientRecord;
	
}

	@Override
	public List<DialysisAdviceDto> autoSuggestionPatientNameDialysis(String patiename) {
		log.info("In DialysisDaoImpl autoSuggestionPatientNameDialysis()");
		SQLQuery sql = null;
		List<DialysisAdviceDto> listpatient = new ArrayList<DialysisAdviceDto>();
		try {
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT patient_id,concat(f_name,' ', m_name,' ',l_name) AS patient_name,mobile  FROM ehat_patient where  (f_name like '"+patiename+"%' or m_name like '"+ patiename	+ "%' or l_name like '"+ patiename+ "%') and deleted = 'N' group by(patient_id) DESC limit 500");
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listuser2 = sql.list();
			for (Map<String, Object> rs1 : listuser2) {
				DialysisAdviceDto dto = new DialysisAdviceDto();
				dto.setPatientId((Integer) rs1.get("patient_id"));
				dto.setPatientname((String) rs1.get("patient_name"));
				dto.setMobile((String) rs1.get("mobile"));
			    listpatient.add(dto);
			}

		} catch (Exception e) {
			log.error("Exception--> ",e);
			}
		return listpatient;
	}

	@Override
	public int saveDialysisScheduler(DialysisSchedulerDto dialysisdto,
			HttpServletRequest request) {	
		log.info("In DialysisDaoImpl saveDialysisScheduler()");
		try {
			dialysisdto.setCreatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().merge(dialysisdto);
			} catch (Exception e) {
				log.error("Exception--> ",e);
				return 0;
			}
			return 1;
		}

	@Override
	public List<DialysisSchedulerDto> getPatientNameListAlreadyPresent(String schedulerDate, String wardId, String wardBedId) {
		log.info("In DialysisDaoImpl getPatientNameListAlreadyPresent()");
		List<DialysisSchedulerDto> ltwardName = new ArrayList<DialysisSchedulerDto>();
		
		try {
			
			 String quey="";
			
			 quey="SELECT es.patient_id,concat(p.f_name,' ', p.m_name,' ',p.l_name) AS patient_name,es.scheduler_Date,es.startTime,es.endTime,es.patMob,es.ward_Id,es.ward_BedId,es.details,es.scheduler_Id FROM ehat_patient p inner join ehat_dialysis_Scheduler es ON es.patient_Id =p.patient_id  where es.scheduler_Date ='"+schedulerDate+"' and ward_Id = '"+wardId+"' and ward_BedId='"+wardBedId+"' ";
			
		     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 DialysisSchedulerDto objDTO =new DialysisSchedulerDto();
	        
	        	 objDTO.setPatientId((String)row.get("patient_id"));
	        	 objDTO.setPatientname((String)row.get("patient_name"));
	             objDTO.setSchedulerDate((String)row.get("scheduler_Date"));
	             objDTO.setStartTime((String)row.get("startTime"));
	             objDTO.setEndTime((String)row.get("endTime"));
	             objDTO.setPatMob((String)row.get("patMob"));
	             objDTO.setWardid((String)row.get("ward_Id"));
	             objDTO.setWardBedId((String)row.get("ward_BedId"));
	             objDTO.setDetails((String)row.get("details"));
	             objDTO.setSchedulerId((Integer)row.get("scheduler_Id"));
	             
	        	 ltwardName.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltwardName;
	
	}

	@Override
	public List<DialysisSchedulerDto> getPatientNameListDateWise(
			String schedulerDate) {
		log.info("In DialysisDaoImpl getPatientNameListDateWise()");
		List<DialysisSchedulerDto> ltwardName = new ArrayList<DialysisSchedulerDto>();
		
		try {
			
			 String quey="";
			
			 quey="SELECT es.patient_id,concat(p.f_name,' ', p.m_name,' ',p.l_name) AS patient_name,es.scheduler_Date,es.startTime,es.endTime FROM ehat_patient p inner join ehat_dialysis_Scheduler es ON es.patient_Id =p.patient_id  where es.scheduler_Date ='"+schedulerDate+"'";
			
		     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 DialysisSchedulerDto objDTO =new DialysisSchedulerDto();
	        
	        	 objDTO.setPatientId((String)row.get("patient_id"));
	        	 objDTO.setPatientname((String)row.get("patient_name"));
	             objDTO.setSchedulerDate((String)row.get("scheduler_Date"));
	             objDTO.setStartTime((String)row.get("startTime"));
	             objDTO.setEndTime((String)row.get("endTime"));
	        	 ltwardName.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltwardName;
	
	}

	@Override
	public List<DialysisSchedulerDto> getPatientNameListDateAndWardWise(
			String schedulerDate, String wardId) {
		log.info("In DialysisDaoImpl getPatientNameListDateAndWardWise()");
		List<DialysisSchedulerDto> ltwardName = new ArrayList<DialysisSchedulerDto>();
		
		try {
			
			 String quey="";
			
			 quey="SELECT es.patient_id,concat(p.f_name,' ', p.m_name,' ',p.l_name) AS patient_name,es.scheduler_Date,es.startTime,es.endTime FROM ehat_patient p inner join ehat_dialysis_Scheduler es ON es.patient_Id =p.patient_id  where es.scheduler_Date ='"+schedulerDate+"' and ward_Id = '"+wardId+"' ";
			
		     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 DialysisSchedulerDto objDTO =new DialysisSchedulerDto();
	        
	        	 objDTO.setPatientId((String)row.get("patient_id"));
	        	 objDTO.setPatientname((String)row.get("patient_name"));
	             objDTO.setSchedulerDate((String)row.get("scheduler_Date"));
	             objDTO.setStartTime((String)row.get("startTime"));
	             objDTO.setEndTime((String)row.get("endTime"));
	        	 ltwardName.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltwardName;
	
	}

	@Override
	public List<DialysisSchedulerDto> getPatientNameListDateAndWardAndChairWise(
			String schedulerDate, String wardId, String wardBedId) {
		log.info("In DialysisDaoImpl getPatientNameListDateAndWardAndChairWise()");
		List<DialysisSchedulerDto> ltwardName = new ArrayList<DialysisSchedulerDto>();
		
		try {
			
			 String quey="";
			
			 quey="SELECT es.patient_id,concat(p.f_name,' ', p.m_name,' ',p.l_name) AS patient_name,es.scheduler_Date,es.startTime,es.endTime FROM ehat_patient p inner join ehat_dialysis_Scheduler es ON es.patient_Id =p.patient_id  where es.scheduler_Date ='"+schedulerDate+"' and ward_Id = '"+wardId+"' and ward_BedId='"+wardBedId+"' ";
			
		     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 DialysisSchedulerDto objDTO =new DialysisSchedulerDto();
	        
	        	 objDTO.setPatientId((String)row.get("patient_id"));
	        	 objDTO.setPatientname((String)row.get("patient_name"));
	             objDTO.setSchedulerDate((String)row.get("scheduler_Date"));
	             objDTO.setStartTime((String)row.get("startTime"));
	             objDTO.setEndTime((String)row.get("endTime"));
	        	 ltwardName.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltwardName;
	
	}

	@Override
	public List<DialysisAdviceDto> getdoctorName() {
		log.info("In DialysisDaoImpl getdoctorName()");
		List<DialysisAdviceDto> ltwardName = new ArrayList<DialysisAdviceDto>();
		try {
			
			 String quey="";
			
			 quey="SELECT Doctor_ID,doc_name  FROM doctor where doc_Type='doctor' and status='Y' ";
			
		     SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(quey);
	         query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	         List<Map<String, Object>> data = query.list();
	       
	         for(Map<String, Object> row : data){
	        	 DialysisAdviceDto objDTO =new DialysisAdviceDto();
	        
	        	 objDTO.setDoctorId((Integer)row.get("Doctor_ID"));
	        	 objDTO.setDoctorname((String)row.get("doc_name"));
	       
	        	 ltwardName.add(objDTO);
	        	 objDTO=null;
	         }
	         
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltwardName;
	
	}

	@Override
	public List<AutosugeestionDto> autoSuggestionForTestNameDialysis(
			String testname) {
		log.info("In DialysisDaoImpl autoSuggestionForTestNameDialysis()");
		List<AutosugeestionDto> listpatient = new ArrayList<AutosugeestionDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AutosugeestionDto.class);
			criteria.add(Restrictions.eq("categorydeleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("servicdeleted", "N"));
			criteria.add(Restrictions.like("categoryName", "%"+testname+"%"));
			criteria.setMaxResults(15);
			listpatient = criteria.list();
		 } catch (Exception e) {
			 log.error("Exception--> ",e);
		}
		return listpatient;
	}

	@Override
	public List<RegTreBillDto> fetchPatientsRecordByOnDialysisTreatmentId(
			Integer treatmentId) {
		log.info("In DialysisDaoImpl fetchPatientsRecordByOnDialysisTreatmentId()");	
		List<RegTreBillDto> lstMainList = new ArrayList<RegTreBillDto>();
		List<RegTreBillDto> ltPatientRecord = null;
		List<EhatBillPrefix> ltBillPrefix = null;
		try {
		
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RegTreBillDto.class);		
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			criteria.setMaxResults(10);
			ltPatientRecord = criteria.list();
			
			 String docId=ltPatientRecord.get(0).getDoctorId();
			
			 String sql = "select doc_name from doctor where Doctor_ID='"+docId+"' ";
			 SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 String docDeptId = (String) query1.uniqueResult();
			  
			 ltPatientRecord.get(0).setDocName(docDeptId);
			  

		} catch (Exception e) {
			log.error("Exception--> ",e);
			return lstMainList;
		}
		return lstMainList;
	}

	@Override
	public List<IpdBillPatientsBedsDTO> getDialysisPatinetDateWise(String fromDate,String lastDate) {
		log.info("In DialysisDaoImpl getDialysisPatinetDateWise()");	
		List<IpdBillPatientsBedsDTO> ltPatientRecord = new ArrayList<IpdBillPatientsBedsDTO>();
		List<DoctorDto> ltDoctorDto = new ArrayList<DoctorDto>();
		String query1 ="";
		try {
			query1 = "select p.mrnno AS mrnno,ifnull(concat(p.prefix, ' ',  p.f_name,' ',p.m_name,' ',p.l_name),'-') AS patient_name,ifnull(e.patient_id, 0) AS patient_id,p.mobile AS mobile,ifnull(p.age, '-') AS age,t.weight AS weight,t.opdipdno AS opdipdno,p.created_date_time AS created_date_time,ifnull(t.doctor_id, 0) AS doctor_id,ht.hall_type_name AS ht_name,h.Hname AS h_name,(select cast(b.bed_name as unsigned)) AS bname,ifnull(t.treatment_id, 0) AS treatment_id, ifnull(t.specialityId, 0) AS specialityId from hall_type ht join hall h join beds b ON ht.idhall_type = h.Htype and h.Hall_ID = b.Hall_ID and b.status = 'Y' left join ehat_bill_details_ipd e ON e.sub_service_id = b.Bed_ID and e.sub_service_id <> 0 and e.service_id = 3 and e.on_bed_flag = 'Y' left join ehat_treatment t ON e.treatment_id = t.treatment_id and t.t_flag = 'Y'and t.department_id = 2 left join ehat_patient p ON p.patient_id = e.patient_id and p.deleted = 'N' left join  ehat_bill_master bm ON bm.treatment_id = e.treatment_id and bm.deleted = 'N' and bm.department_id = 2 left join ehat_charges_master_slave cm ON bm.charges_master_slave_id = cm.id where specialityId = '71' and  STR_TO_DATE(t.created_date_time, '%Y-%m-%d') between '"+fromDate+"' and '"+lastDate+"' ORDER BY t.treatment_id DESC ";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List<Map<String, Object>> data = query.list();
	        for(Map<String, Object> row : data){ 
	        	IpdBillPatientsBedsDTO objDTO =new IpdBillPatientsBedsDTO();
	        	 objDTO.setMrnno((String)row.get("mrnno"));
	        	 objDTO.setPatientName((String)row.get("patient_name"));
	        	 objDTO.setPatientID((BigInteger)row.get("patient_id"));
	        	 objDTO.setMobile((String)row.get("mobile"));
	        	 objDTO.setPatientAge((String)row.get("age"));
	        	 objDTO.setWeight1((String)row.get("weight"));
	        	 objDTO.setOpdipdno((String)row.get("opdipdno"));
	        	 objDTO.setCreatedDateTime((Date)row.get("created_date_time"));	   
	        	 objDTO.setDoctorId((String)row.get("doctor_id"));
	        	 objDTO.setHallTypeName((String)row.get("ht_name"));
	        	 objDTO.setHname((String)row.get("h_name"));
	        	 objDTO.setBedname((BigInteger)row.get("bname"));
	         	 objDTO.setTreatID((BigInteger)row.get("treatment_id"));
	          	 objDTO.setSpecID((BigInteger)row.get("specialityId"));
	             ltPatientRecord.add(objDTO);	         
	            objDTO=null;
	         }	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltPatientRecord;
	
}

	@Override
	public int saveinformedconsentForm(InformedConsentFormDto fromdto,
			HttpServletRequest request) {	
		log.info("In DialysisDaoImpl saveinformedconsentForm()");	
		try {
			fromdto.setCreatedDate(new Date(new java.util.Date().getTime()));
				sessionFactory.getCurrentSession().merge(fromdto);
			} catch (Exception e) {
				log.error("Exception--> ",e);
				return 0;
			}
			return 1;
		}

	@Override
	public List<InformedConsentFormDto> getinformedconsentForm(
			Integer treatmentId) {
		log.info("In DialysisDaoImpl getinformedconsentForm()");	
		List<InformedConsentFormDto> listinformed = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(InformedConsentFormDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatmentId", treatmentId));
			listinformed = criteria.list();

		} catch (Exception e) {
			log.error("Exception--> ",e);
		}

		return listinformed;
	}

	@Override
	public List<IpdBillPatientsBedsDTO> getpatinetName(Integer patientId) {
		log.info("In DialysisDaoImpl getpatinetName()");	
		List<IpdBillPatientsBedsDTO> ltPatientRecord = new ArrayList<IpdBillPatientsBedsDTO>();
		String query1 ="";
		try {
			query1 = "select ifnull(concat(p.prefix, ' ',  p.f_name,' ',p.m_name,' ',p.l_name),'-') AS patient_name,ifnull(p.patient_id, 0) AS patient_id,p.mobile AS mobile from ehat_patient p where p.patient_id='"+patientId+"'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
		    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	        List<Map<String, Object>> data = query.list();
	        for(Map<String, Object> row : data){ 
	        	IpdBillPatientsBedsDTO objDTO =new IpdBillPatientsBedsDTO();
	        	 objDTO.setPatientName((String)row.get("patient_name"));
	        	 objDTO.setPatientID((BigInteger)row.get("patient_id"));
	        	 objDTO.setMobile((String)row.get("mobile"));
	             ltPatientRecord.add(objDTO);	         
	            objDTO=null;
	         }   
	         
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return ltPatientRecord;
	
}

	@Override
	public List<DialysisAdviceDto> autoSuggestionPatientByNameDialysis(
			String patiename) {
		
		log.info("In DialysisDaoImpl autoSuggestionPatientNameDialysis()");
		SQLQuery sql = null;
		List<DialysisAdviceDto> listpatientname = new ArrayList<DialysisAdviceDto>();
		
		try {
			sql = sessionFactory.getCurrentSession().createSQLQuery("select ifnull(concat(p.prefix, ' ',  p.f_name,' ',p.m_name,' ',p.l_name),'-') AS patient_name,p.patient_id from hall_type ht join hall h join beds b ON ht.idhall_type = h.Htype and h.Hall_ID = b.Hall_ID and b.status = 'Y' left join ehat_bill_details_ipd e ON e.sub_service_id = b.Bed_ID and e.sub_service_id <> 0 and e.service_id = 3 and e.on_bed_flag = 'Y' left join ehat_treatment t ON e.treatment_id = t.treatment_id and t.t_flag = 'Y' and t.department_id = 2 left join ehat_patient p ON p.patient_id = e.patient_id and p.deleted = 'N' left join  ehat_bill_master bm ON bm.treatment_id = e.treatment_id and bm.deleted = 'N' and bm.department_id = 2 left join ehat_charges_master_slave cm ON bm.charges_master_slave_id = cm.id where t.specialityId = '71' and t.department_id = 2 and (f_name like '"+patiename+"%' or m_name like '"+patiename+"%' or l_name like '"+patiename+"%') limit 500");
			System.out.println(sql+"sql");
			
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listuser2 = sql.list();
			for (Map<String, Object> rs1 : listuser2) {
				
				DialysisAdviceDto dto = new DialysisAdviceDto();
				
				dto.setPatientname((String) rs1.get("patient_name"));
				dto.setPid((Integer) rs1.get("patient_id"));
			    
				listpatientname.add(dto);
				dto=null;
			}
		} catch (Exception e) {
			log.error("Exception--> ",e);
		}
		return listpatientname;
	}

	@Override
	public List<DialysisDto> getDialysisPreviousPatienttDetails(Integer patientId) {

		log.info("In DialysisDaoImpl getDialysisPatinetDateWise()");
		List<DialysisDto> ltPatientRecord = new ArrayList<DialysisDto>();
		String query = "";
		try {

			query = " select ifnull(concat(p.prefix, ' ',  p.f_name,' ',p.m_name,' ',p.l_name),'-') AS patient_name,t.treatment_id, t.patient_Id,  ifnull(pre.bp,'-') as pre_bp,  ifnull(pre.objective_wt,'-')as pre_weight,ifnull(post.bp,'-') as post_bp,  ifnull(post.post_dialysis_wt,'-') as post_wieight,ifnull(d.dialysis_started_at, '-') as dialysis_started_at,ifnull(d.dialysis_terminated_at,'-') as dialysis_terminated_at,TIMEDIFF(d.dialysis_terminated_at,d.dialysis_started_at) as duration,ifnull(d.v_pressure,'-') as vp,ifnull(d.a_pressure,'-') as ap, ifnull(d.blood_flow,'-') as bf,ifnull(d.herapine_dose,'-') as herapine_dose,ifnull(d.remark,'-') as remark,t.t_flag,t.created_date_time from ehat_treatment t inner join ehat_dialysis_predialysis pre ON pre.id_treatment = t.treatment_id inner join ehat_dialysis_postDialysis post ON post.id_treatment = t.treatment_id inner join  ehat_dialysis_onDialysis d ON d.id_treatment = t.treatment_id  inner join ehat_patient p ON p.patient_id = t.patient_id where t.t_flag='N' and t.patient_id='"
					+ patientId + "'";
			
			SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(query);
			
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			List<Map<String, Object>> data = query1.list();		
			for (Map<String, Object> row : data) {
				DialysisDto obj = new DialysisDto();
				obj.setPatientName((String) row.get("patient_name"));
				obj.setTreatmentId((Integer) row.get("treatment_id"));
				obj.setPatientId((Integer) row.get("patient_Id"));
				obj.setPrebp((String) row.get("pre_bp"));
				obj.setPreweight((String) row.get("pre_weight"));
				obj.setPostbp((String) row.get("post_bp"));
				obj.setPostwieight((String) row.get("post_wieight"));
				obj.setDialysisstartTime((String) row.get("dialysis_started_at"));
				obj.setDialysisendTime((String) row.get("dialysis_terminated_at"));
				
				Time duration=((Time) row.get("duration"));
				obj.setDuration(duration);
				obj.setVp((String) row.get("vp"));
				obj.setAp((String) row.get("ap"));
				obj.setBf((String) row.get("bf"));
				obj.setHerapine_dose((String) row.get("herapine_dose"));
				obj.setRemark((String) row.get("remark"));
				obj.setTflag((String) row.get("t_flag"));
				obj.setDate((Date) row.get("created_date_time"));
				ltPatientRecord.add(obj);
				obj = null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Exception--> ", e);
		}
		return ltPatientRecord;

	}
	
	
}