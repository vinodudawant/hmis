package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.OPDHistoryDao;
import com.hms.doctordesk.dto.OPDBmiMasterDTO;
import com.hms.doctordesk.dto.OPDDietMasterDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.ehat.dto.TreatmentDto;

@Repository
public class OPDHistoryDaoImpl implements OPDHistoryDao {

	@Autowired
	SessionFactory sf;
	
	@Override
	public int saveOPDHistory(OPDHistoryMasterDTO obj) {
		try {
			 if(obj.getHistoryId()==0) {
				 sf.getCurrentSession().merge(obj);
				 return 1;
			 }else {
				 sf.getCurrentSession().merge(obj);
				 return 2;
			 }
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public OPDHistoryMasterDTO getOPDHistory(Integer treatmentId) {
		OPDHistoryMasterDTO obj=new OPDHistoryMasterDTO();
		TreatmentDto tobj=(TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
		List<OPDHistorySlaveDTO> list =new ArrayList<OPDHistorySlaveDTO>();
		
		try {
			Criteria c=  sf.getCurrentSession().createCriteria(OPDHistoryMasterDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			obj=(OPDHistoryMasterDTO) c.uniqueResult();
			
			if(obj !=null) {
				list=	obj.getGetListOfHistorySlaveDTO();
				 List<OPDHistorySlaveDTO> newlist= list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
				obj.setGetListOfHistorySlaveDTO(newlist);
			}
		
		
		
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public OpdPatientDetailsDto getPatientInfoByTreatmentId(Integer treatmentId) {
		
		List<OpdPatientDetailsDto> lstOpdPatientDetailsDto = new ArrayList<OpdPatientDetailsDto>();
		OpdPatientDetailsDto obj = new OpdPatientDetailsDto();
		
		try {
			Query q = sf.getCurrentSession().createSQLQuery("CALL sp_get_patient_info_by_treatment_id(:treatmentId)");
			q.setParameter("treatmentId", treatmentId);
			q.setResultTransformer(Transformers.aliasToBean(OpdPatientDetailsDto.class));
			//obj = (OpdPatientDetailsDto) q.uniqueResult();
			lstOpdPatientDetailsDto = q.list();
			obj.setListOpdPatientDetailsDto(lstOpdPatientDetailsDto);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
		
	}
	@Override
	public int saveOPDiet(OPDDietMasterDTO obj) {
		 try {
			 if(obj.getDietMasterId() == 0) {
				 sf.getCurrentSession().merge(obj);
				 return 1;
			 }else {
				 sf.getCurrentSession().merge(obj);
				 return 2;
			 }
			 
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public OPDDietMasterDTO editOPDDiet(Integer dietMasterId) {
		OPDDietMasterDTO obj=new OPDDietMasterDTO();
		try {
			obj= (OPDDietMasterDTO) sf.openSession().get(OPDDietMasterDTO.class, dietMasterId);
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public List<OPDDietMasterDTO> getOPDDietListByTreatmentId(Integer treatmentId) {
		List<OPDDietMasterDTO> list=new ArrayList<OPDDietMasterDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDDietMasterDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public int deleteOPDDiet(String dietMasterIds, Integer userId) {
		int msg=0;
		try{
			
			
			Query itemInfo = sf	.getCurrentSession().createQuery("update OPDDietMasterDTO set deleted='Y',deletedBy="
					+ userId	+ ",deletedDateTime=now() where dietMasterId in("+dietMasterIds+")");//hql
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

	@Override
	public List<OPDDietMasterDTO> getOPDDietListByDietIds(String dietIds) {
		System.err.println("dietIds opd...."+dietIds);
		List<OPDDietMasterDTO> lstdiet=new ArrayList<OPDDietMasterDTO>();
		try{
			List<Integer> Ids=new ArrayList<Integer>();
			String ids[]=dietIds.split(",");
			for(String dietID:ids){
				Ids.add(Integer.parseInt(dietID));
			}
			Criteria c=sf.openSession().createCriteria(OPDDietMasterDTO.class);
			c.add(Restrictions.in("dietMasterId", Ids));
			
			lstdiet=c.list();
			System.err.println("lstdiet opd...."+lstdiet);
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstdiet;
	}

	@Override
	public int saveOPDPatientBMI(OPDBmiMasterDTO obj) {
		 try {
			 if(obj.getOpdBmiMasterId() == 0) {
				 sf.getCurrentSession().merge(obj);
				 return 1;
			 }else {
				 sf.getCurrentSession().merge(obj);
				 return 2;
			 }
			 
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<OPDBmiMasterDTO> getOPDBMIListByTreatmentId(Integer treatmentId) {
		List<OPDBmiMasterDTO> list=new ArrayList<OPDBmiMasterDTO>();
		TreatmentDto tobj=(TreatmentDto) sf.openSession().get(TreatmentDto.class, treatmentId);
		try {
			Criteria c=  sf.openSession().createCriteria(OPDBmiMasterDTO.class);
			c.add(Restrictions.eq("treatObj", tobj));
			c.add(Restrictions.eq("deleted", "N"));
			list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public OPDBmiMasterDTO editOPDBMI(Integer opdBmiMasterId) {
		OPDBmiMasterDTO obj=new OPDBmiMasterDTO();
		try {
			obj= (OPDBmiMasterDTO) sf.openSession().get(OPDBmiMasterDTO.class, opdBmiMasterId);
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int getPrefixIdByValue(String deptName, String value) {
		int id=0;
		   try {
			      String sql="select   fn_get_prefix_detail_id_by_value('"+deptName+"','"+value+"') as id";
			   SQLQuery q    =sf.getCurrentSession().createSQLQuery(sql);
			  id= (int) q.uniqueResult();
			   return id;
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return id;
	}

}
