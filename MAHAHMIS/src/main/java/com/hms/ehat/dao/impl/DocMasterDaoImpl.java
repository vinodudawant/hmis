package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.DocMasterDto;
import com.hms.dto.DocUploadDto;
import com.hms.ehat.dao.DocMasterDao;
import com.hms.ehat.dto.DocChecklistDto;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.PatientDocMasterDto;
import com.hms.ehat.dto.PatientDocSlaveDto;

@Repository
public class DocMasterDaoImpl implements DocMasterDao{

	@Autowired
	SessionFactory sessionfactory;
	@Override
	public List<DocMasterDto> getAllTreatMentByPatientId(Integer deptId,Integer patID, String callFrom) {
		
		List<FolderDocDto> lstFolderDoc=new ArrayList<FolderDocDto>();		
		List<DocMasterDto> tlist=new ArrayList<DocMasterDto>();
		String sql = "";
		try{					
			if(callFrom.equals("previous")){
				
				sql = "Select e.patient_id,e.treatment_id,e.department_id,e.created_date_time,e.opdipdno from ehat_treatment e where e.patient_id = "+patID+" and e.t_flag ='N' and e.department_id ="+deptId;
			
			}else if(callFrom.equals("current")){
				
				sql = "Select e.patient_id,e.treatment_id,e.department_id,e.created_date_time,e.opdipdno from ehat_treatment e where e.patient_id = "+patID+" and e.t_flag ='Y' and e.department_id ="+deptId;
			
			}else{
				
				if(deptId > 0){
					
					sql = "Select e.patient_id,e.department_id,e.treatment_id,e.created_date_time,e.opdipdno from ehat_treatment e where e.patient_id = "+patID+" and e.department_id ="+deptId;
				}else{
					
					sql = "Select e.patient_id,e.department_id,e.treatment_id,e.created_date_time,e.opdipdno from ehat_treatment e where e.patient_id = "+patID;
				}				
			}
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
		    	
				DocMasterDto obj = new DocMasterDto();
		    	
		    	obj.setPatId((Integer)row.get("patient_id"));
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setDepartmentId((Integer)row.get("department_id"));
		    	obj.setCreateddate((Date)row.get("created_date_time"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	tlist.add(obj);
		    	obj=null;	    	
			}
			
			if(tlist.size() > 0){
				
				Criteria criteria=sessionfactory.getCurrentSession().createCriteria(FolderDocDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				lstFolderDoc = criteria.list();
				tlist.get(0).setLstFoldermaster(lstFolderDoc);
			}
			
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return tlist;
	}
	@Override
	public List<DocUploadDto> getPatientDocDeatil(String fromDate, String toDate,String callform,DocUploadDto docobj, String byname1, String patSearchType){
		
		List<DocUploadDto> tlist=new ArrayList<DocUploadDto>();
		String sql="";
		
		try{
		   if(callform.equals("recent")){
			   
			   sql = " SELECT concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,d.doc_name,d.doc_id,d.created_date_time,d.patient_id,d.folder_id,f.folder_name,d.doc_path"
				 +" FROM ehat_doc_upload d left join ehat_patient p ON (d.patient_id = p.patient_id) left join ehat_folder_doc f on(d.folder_id=f.folder_doc_id) where d.deleted='N' and date(d.created_date_time) between '"+ fromDate + "' and '" + toDate + "' ";
			   
		   }else if(callform.equals("bytreatment")){
			   
			   sql = " SELECT concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,d.doc_name,d.doc_id,d.created_date_time,d.patient_id,d.folder_id,f.folder_name,d.doc_path"
						 +" FROM ehat_doc_upload d left join ehat_patient p ON (d.patient_id = p.patient_id) left join ehat_folder_doc f on(d.folder_id=f.folder_doc_id) where d.deleted='N' and d.treatment_id="+docobj.getTreatmentId();   
		  
		   }else if(callform.equals("byFolder")){
			   
			   sql = " SELECT concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,d.doc_name,d.doc_id,d.created_date_time,d.patient_id,d.folder_id,f.folder_name,d.doc_path"
						 +" FROM ehat_doc_upload d left join ehat_patient p ON (d.patient_id = p.patient_id) left join ehat_folder_doc f on(d.folder_id=f.folder_doc_id) where d.deleted='N' and d.treatment_id="+docobj.getTreatmentId()+" and d.folder_id="+docobj.getFolderId();   
		   }
		   
		   Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
		   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		   @SuppressWarnings("unchecked")
		   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
		   for(Map<String, Object> row : listSpDetails){
	    	
			   	DocUploadDto obj = new DocUploadDto();	    	
	    	
			   	obj.setPatientId((Integer)row.get("patient_id"));
			   	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	obj.setPatientName((String)row.get("patient_name"));
		    	obj.setDocName((String)row.get("doc_name"));
		    	obj.setDocId((Integer)row.get("doc_id"));
		    	obj.setDocPath((String)row.get("doc_path"));
		    	obj.setFolderId((Integer)row.get("folder_id"));
		    	obj.setFolderName((String)row.get("folder_name"));
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));
		    	tlist.add(obj);
		    	obj=null;	    	
		   }	
		   
			if(callform.equals("recent") && patSearchType.equals("1"))
			{
				int searchValue = Integer.parseInt(byname1);
				return tlist.stream().filter(dto -> dto instanceof DocUploadDto   && searchValue == ((DocUploadDto) dto).getPatientId())
				.collect(Collectors.toList());
			}else if(callform.equals("recent") && patSearchType.equals("2"))
			{
				return tlist.stream().filter(dto -> dto instanceof DocUploadDto   && ((DocUploadDto) dto).getPatientName().toLowerCase().contains(byname1.toLowerCase()))
				.collect(Collectors.toList());
			}else
			{
				return tlist;
			}
		
		}catch(Exception e){
			
			e.printStackTrace();
		}		
		return tlist;
	}
	
	@Override
	public int savePatientDocument(DocUploadDto docobj) {
		
		for(DocUploadDto obj:docobj.getLstDocUpload()){
		
			obj.setCreatedDateTime(new Date());
			sessionfactory.getCurrentSession().merge(obj);	
		}			
		return 1;
	}
	
	@Override
	public boolean deleteDocDetails(DocUploadDto docobj) {
		try
		{
			sessionfactory.getCurrentSession().merge(docobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	@Override
	public List<PatientDocSlaveDto> getPatientDetailsByTreatment(Integer treatmentId) {
		// TODO Auto-generated method stub
		List<PatientDocSlaveDto> tlist=new ArrayList<PatientDocSlaveDto>();
		String sql="";
		try{		
			sql = " SELECT m.room_id,m.rack_id,m.filetype,m.duration, m.patient_id,m.patient_name,m.shelf_id,m.treatment_id,m.barcode,m.patient_doc_id,s.doc_id,s.doc_name"
					 +" FROM ehat_patient_doc_master m left join ehat_patient_doc_slave s on(m.patient_doc_id=s.master_id)  where m.deleted='N' and m.treatment_id="+treatmentId;   
	
	
	
		  Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
		   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		   @SuppressWarnings("unchecked")
		   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
		   for(Map<String, Object> row : listSpDetails){
	    	
			   PatientDocSlaveDto obj = new PatientDocSlaveDto();	    	
	    	
			  
			   	obj.setPatientId((Integer)row.get("patient_id"));
		    	obj.setPatientName((String)row.get("patient_name"));
		    	obj.setDocId((Integer)row.get("doc_id"));
		    	obj.setDocName((String)row.get("doc_name"));
		    	
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setPatientDocId((Integer)row.get("patient_doc_id"));
               obj.setBarcode((String)row.get("barcode"));
               obj.setShelFId((Integer)row.get("shelf_id"));
               
		    	tlist.add(obj);
		    	obj=null;	    	
		   }		
	
	
	}catch(Exception e)
	{
		e.printStackTrace();
	}
		return tlist;
		}
	@Override
	public List<PatientDocMasterDto> getAllPatientDocDeatil(String fromDate,
			String toDate, String byname1, String patSearchType) {
		List<PatientDocMasterDto> tlist=new ArrayList<PatientDocMasterDto>();
		String sql="";
		try
		{
			sql = " SELECT e.patient_doc_id,p.center_patient_id,e.patient_id,e.treatment_id,e.patient_name,e.created_date_time from ehat_patient_doc_master e left join ehat_patient p on (e.patient_id=p.patient_id) where e.deleted='N' and date(e.created_date_time) between '"+ fromDate + "' and '" + toDate + "'   ORDER by e.patient_doc_id DESC ";
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
		    	
				PatientDocMasterDto obj = new PatientDocMasterDto();		    	
		    	
		    	obj.setPatientId((Integer)row.get("patient_id"));
		    	obj.setCenterPatientId((String)row.get("center_patient_id"));
		    	obj.setPatientName((String)row.get("patient_name"));		    	
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setCreatedDate((Date)row.get("created_date_time"));
		    	obj.setPatientDocId((Integer)row.get("patient_doc_id"));
		    	tlist.add(obj);
		    	obj=null;		
			}
		
			if(patSearchType.equals("1"))
			{
				int searchValue = Integer.parseInt(byname1);
				return tlist.stream().filter(dto -> dto instanceof PatientDocMasterDto   && searchValue == ((PatientDocMasterDto) dto).getPatientId())
				.collect(Collectors.toList());
			}else if(patSearchType.equals("2"))
			{
				return tlist.stream().filter(dto -> dto instanceof PatientDocMasterDto   && ((PatientDocMasterDto) dto).getPatientName().toLowerCase().contains(byname1.toLowerCase()))
				.collect(Collectors.toList());
			}else
			{
				return tlist;
			}
		
		}catch(Exception e)
		{
			
		}
		return tlist;
	}
	@Override
	public List<DocUploadDto> getAllTreatmentDetailsByPatientId(
			Integer patientId) {
		List<DocUploadDto> tlist=new ArrayList<DocUploadDto>();
		String sql="";
		try{		
			sql = "SELECT concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,d.doc_name,d.folder_id,d.doc_id,d.created_date_time,d.patient_id,f.folder_name "
				+ "FROM ehat_doc_upload d left join ehat_patient p ON (d.patient_id = p.patient_id) left join ehat_folder_doc f on(d.folder_id = f.folder_doc_id)  where  d.patient_id="+patientId+" and d.deleted='N' and d.shelf_status='N'";
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
		    	
				DocUploadDto obj = new DocUploadDto();		    	
		    	
		    	obj.setPatientId((Integer)row.get("patient_id"));
		    	obj.setPatientName((String)row.get("patient_name"));
		    	obj.setDocName((String)row.get("doc_name"));
		    	obj.setDocId((Integer)row.get("doc_id"));
		    	obj.setFolderId((Integer)row.get("folder_id"));
		    	obj.setFolderName((String)row.get("folder_name"));
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setCreatedDateTime((Date)row.get("created_date_time"));
		    	tlist.add(obj);
		    	obj=null;		
			}
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return tlist;
	}
	@Override
	public boolean deletePatientDocByPatientDocId(
			PatientDocMasterDto obj) {
		try
		{
			sessionfactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public List<DocChecklistDto> getPatientDetailsByTreatment1(
			Integer treatmentId) {
		List<DocChecklistDto> tlist=new ArrayList<DocChecklistDto>();

		String sql="SELECT e.department_id FROM ehat_treatment e  WHERE e.deleted='N' and e.treatment_id ="+treatmentId;
		Query countQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
		int departmentId = ((Number)countQuery.uniqueResult()).intValue();
		
		try
		{
		Criteria criteria=sessionfactory.getCurrentSession().createCriteria(DocChecklistDto.class);
		criteria.add(Restrictions.eq("departMent", departmentId));
		criteria.add(Restrictions.eq("deleted", "N"));
		
		tlist=criteria.list();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		return tlist;
	}
	@Override
	public DocChecklistDto getAllUploadDocDetailBytreatment(
			Integer treatmentId) {
		DocChecklistDto cobj=new DocChecklistDto();
		List<DocChecklistDto> tlist=new ArrayList<DocChecklistDto>();
		List<PatientDocSlaveDto> lstSlave=new ArrayList<PatientDocSlaveDto>();

		String sql1="SELECT m.patient_doc_id,m.patient_id,m.patient_name,m.room_id,m.rack_id,m.shelf_id,m.filetype,m.duration,m.barcode,m.treatment_id,s.doc_id,s.doc_name,m. created_date_time from ehat_patient_doc_master m left join ehat_patient_doc_slave s  on m.patient_doc_id=s.master_id where s.deleted='N' and m.treatment_id="+treatmentId;
		
		
		Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql1);			
		spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
		for(Map<String, Object> row : listSpDetails){
	    	
			PatientDocSlaveDto obj = new PatientDocSlaveDto();		    	
			obj.setPatientDocId((Integer)row.get("patient_doc_id"));
	    	obj.setDocName((String)row.get("doc_name"));
	    	obj.setDocId((Integer)row.get("doc_id"));
	    	obj.setPatientId((Integer)row.get("patient_id"));
	    	obj.setPatientName((String)row.get("patient_name"));
	    	obj.setRoomID((Integer)row.get("room_id"));
	    	obj.setRackId((Integer)row.get("rack_id"));
	    	obj.setShelFId((Integer)row.get("shelf_id"));
	    	obj.setFiletype((Integer)row.get("filetype"));
	    	obj.setDuration((String)row.get("duration"));
	    	obj.setTreatmentId((Integer)row.get("treatment_id"));
	    	obj.setBarcode((String)row.get("barcode"));
	    	obj.setCreatedDate((Date)row.get("created_date_time"));
	    	lstSlave.add(obj);
	    	obj=null;		
		}
		
		
		
		
		
		
		String sql="SELECT e.department_id FROM ehat_treatment e  WHERE e.deleted='N' and e.treatment_id ="+treatmentId;
		Query countQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
		int departmentId = ((Number)countQuery.uniqueResult()).intValue();
		
		try
		{
		Criteria criteria=sessionfactory.getCurrentSession().createCriteria(DocChecklistDto.class);
		criteria.add(Restrictions.eq("departMent", departmentId));
		criteria.add(Restrictions.eq("deleted", "N"));
		
		tlist=criteria.list();
		}catch(Exception e)
		{
			e.printStackTrace();
		}
		cobj.setLstChecklistDoc(tlist);
		cobj.setLstSalve(lstSlave);
		return cobj;
	}
	@Override
	public List<DocMasterDto> fetchPatientsRecordByTreatmentIdForBarcode(
			Integer treatmentId) {
		List<DocMasterDto> tlist=new ArrayList<DocMasterDto>();
		String sql = "";
		try{
			//sql = "Select  concat(`p`.`age`, 'Y/',`p`.`age_months`,'M/','D') AS `patient_age`,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name, p.age,p.age_days,p.age_months,e.patient_id,e.treatment_id,e.created_date_time,e.opdipdno from ehat_treatment e  left join ehat_patient p on (p.patient_id=e.patient_id) where e.treatment_id = "+treatmentId+" ";

			// updated by Annapurna 
			sql = "Select  concat(`p`.`age`, 'Y/',`p`.`age_months`,'M/', `p`.`age_days`,'D') AS `patient_age`,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name, p.age,p.age_days,p.age_months,e.patient_id,e.treatment_id,e.created_date_time,e.opdipdno from ehat_treatment e  left join ehat_patient p on (p.patient_id=e.patient_id) where e.treatment_id = "+treatmentId+" ";
			
			Query spDetailsQuery = sessionfactory.getCurrentSession().createSQLQuery(sql);			
			spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){
		    	
				DocMasterDto obj = new DocMasterDto();
		    	
		    	obj.setPatId((Integer)row.get("patient_id"));
		    	obj.setTreatmentId((Integer)row.get("treatment_id"));
		    	obj.setCreateddate((Date)row.get("created_date_time"));
		    	obj.setOpdipdno((String)row.get("opdipdno"));
		    	obj.setAge((Integer)row.get("age"));
		    	obj.setAgedays((Integer)row.get("age_days"));
		    	obj.setAgemonths((Integer)row.get("age_days"));
		    	obj.setPatientAge((String)row.get("patient_age"));
		    	obj.setPatientName((String)row.get("patient_name"));
		    	tlist.add(obj);
		    	obj=null;	    	
			}
			
			
			
		}catch(Exception e){
			
			e.printStackTrace();
		}
		return tlist;
	}
}
