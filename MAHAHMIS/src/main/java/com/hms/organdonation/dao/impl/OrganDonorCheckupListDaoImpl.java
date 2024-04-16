package com.hms.organdonation.dao.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.Doctor;
import com.hms.dto.FetchTitleDTO;
import com.hms.organdonation.dao.OrganDonorCheckupListDao;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;

@Repository
public class OrganDonorCheckupListDaoImpl implements OrganDonorCheckupListDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OrganDonorCheckupListDto organDonorCheckupListDto;
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Autowired
	OrganDonorTreatmentDto organDonorTreatmentDto;

	@Override
	public int saveOrganDonorCheckupList(OrganDonorCheckupListDto obj,
			Integer organDonorId, Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			if (obj.getCheckupListId() == 0 /*  && obj.getCheckup_deleted()=="null"*/) {
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorTreatmentDto.class,
								treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				sessionFactory.getCurrentSession().merge(obj);
				
				//update isCheckup coloum in organ treatment 
				String sql="UPDATE OrganDonorTreatmentDto set isCheckup='Y' where id="+treatmentId+" ";
				
				 Query q=  sessionFactory.getCurrentSession().createQuery(sql);
				 q.executeUpdate();
				
				return 1;
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorTreatmentDto.class,
								treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				
			 sessionFactory.getCurrentSession().merge(obj);
				//update isCheckup coloum in organ treatment 
			String sql="UPDATE OrganDonorTreatmentDto set isCheckup='Y' where id="+treatmentId+" ";
				
				 Query q=  sessionFactory.getCurrentSession().createQuery(sql);
				q.executeUpdate();
				return 2;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public OrganDonorCheckupListDto editOrganDonorCheckupList(
			Integer checkupListId) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorCheckupListDto.class);
			criteria.add(Restrictions.eq("checkupListId", checkupListId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organDonorCheckupListDto = (OrganDonorCheckupListDto) criteria
					.uniqueResult();
			return organDonorCheckupListDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organDonorCheckupListDto;
	}

	@Override
	public List<OrganDonorCheckupListDto> getAllOrganDonorCheckupList(	HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		List<OrganDonorCheckupListDto> lstOrganDonorCheckupListDto = new ArrayList<OrganDonorCheckupListDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria = sessionFactory.openSession()
			 * .createCriteria(OrganDonorCheckupListDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * //criteria.add(Restrictions.eq("checkupStatus", "Accept"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("checkupListId")); criteria.setMaxResults(15);
			 */
			
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_checkuplist_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganDonorCheckupListDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			lstOrganDonorCheckupListDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganDonorCheckupListDto;
	}

	@Override
	public boolean deleteOrganDonorCheckupList(Integer checkupListId,Integer donarTreatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganDonorCheckupListDto obj = (OrganDonorCheckupListDto) sessionFactory
					.getCurrentSession().get(OrganDonorCheckupListDto.class,
							checkupListId);
			obj.setDeleted("Y");
			//obj.setCheckup_deleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			
			//update isCheckup coloum in organ treatment 
			String sql="UPDATE OrganDonorTreatmentDto set isCheckup='N' where id="+donarTreatmentId+" ";
			
			 Query q=  sessionFactory.getCurrentSession().createQuery(sql);
			 q.executeUpdate();
			
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;

	}

	@Override
	public List<FetchTitleDTO> getAllTitle(HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<FetchTitleDTO> titleList = new ArrayList<FetchTitleDTO>();
		String sql = "";
		try {
			sql = "SELECT * FROM patient_title where status='Y'";
			System.err.println("-------" + sql);
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				FetchTitleDTO objTitle = new FetchTitleDTO();
				objTitle.setfTitle((String) row.get("title"));
				titleList.add(objTitle);
				objTitle = null;
			}
			return titleList;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Doctor> getAllDoctors(HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<Doctor> liDoctor = new ArrayList<Doctor>();
		try {
			 
			String sql = "SELECT Doctor_ID,doc_name FROM doctor  WHERE doc_Type='doctor' and status='Y' ";
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> doctorDetails = getMaster.list();
			for (Map rs : doctorDetails) {
				Doctor objDoctor = new Doctor();
				objDoctor.setDoc_name((String) rs.get("doc_name"));
				objDoctor.setDoctor_ID((Integer) rs.get("Doctor_ID"));
				liDoctor.add(objDoctor);
				objDoctor=null;
			}
			return liDoctor;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	@Override
	public List<OrganDonorCheckupListDto> organDonorCheckupListAutoSuggestion(
			Integer checklistId, String callFrom) {
		// TODO Auto-generated method stub
		 String sql = "";
		 List<OrganDonorCheckupListDto> lstOrganDonorCheckupListDto=new ArrayList<OrganDonorCheckupListDto>();
		 try{
			 
			 	if(callFrom.equalsIgnoreCase("2")){
			 		sql = "SELECT * FROM organ_donor_checkup_list b  where b.id= "	+ checklistId +  " and b.deleted='N' " ;
			 				/*and checkup_status='Accept' ";	*/
		 	}else if(callFrom.equalsIgnoreCase("1")){
			 		sql = "SELECT * FROM organ_donor_checkup_list b  where b.organ_donor_id= "+checklistId+" and b.deleted='N' " ;
			 			/*	+ "and checkup_status='Accept' "; */
			 	}
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					OrganDonorCheckupListDto obj= new OrganDonorCheckupListDto();
					obj.setDonorFName((String) row.get("donor_fname"));
					obj.setDonorMName((String) row.get("donor_mname"));
					obj.setDonorLName((String) row.get("donor_lname"));
					obj.setDonorId((Integer) row.get("organ_donor_id"));
					obj.setCheckupListId((Integer) row.get("id"));
					lstOrganDonorCheckupListDto.add(obj);
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return lstOrganDonorCheckupListDto;
	}

	@Override
	public OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId,
			HttpServletRequest request) {
		
		OrganDonationRegistrationDto dto = new OrganDonationRegistrationDto();
		
		System.out.println("OrganDonorCheckupListDaoImpl : getOrganDonorById() for organDonorId : " + organDonorId);
		try {
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganDonationRegistrationDto.class);
			criteria.add(Restrictions.eq("id", organDonorId));
			criteria.add(Restrictions.eq("deleted", "N"));
			
			dto = (OrganDonationRegistrationDto) criteria.uniqueResult();
			
			System.out.println("OrganDonorCheckupListDaoImpl : getOrganDonorById() for organDonorId OBJ :: " + dto); 
			
			return dto;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public OrganDonorTreatmentDto getOrganDonorByIdAndPatientId(
			Integer organDonorId, Integer patientId,Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			
			/*RegistrationDto registrationDto =new RegistrationDto();
			Criteria criteriaDonor = sessionFactory.getCurrentSession()
					.createCriteria(OrganDonationRegistrationDto.class);
			criteriaDonor.add(Restrictions.eq("id", organDonorId));
			criteriaDonor.add(Restrictions.eq("deleted", "N"));
			organDonationRegistrationDto = (OrganDonationRegistrationDto) criteriaDonor
					.uniqueResult();
			
			Criteria criteriaPatient = sessionFactory.getCurrentSession()
					.createCriteria(RegistrationDto.class);
			criteriaPatient.add(Restrictions.eq("patientId", patientId));
			criteriaPatient.add(Restrictions.eq("deleted", "N"));
			registrationDto = (RegistrationDto) criteriaPatient
					.uniqueResult();*/
			
			Criteria criteriaFinal = sessionFactory.openSession()
					.createCriteria(OrganDonorTreatmentDto.class);
			//criteriaFinal.add(Restrictions.eq("organDonationRegistrationDto", organDonationRegistrationDto));
			//criteriaFinal.add(Restrictions.eq("patientRegistered", registrationDto));
			criteriaFinal.add(Restrictions.eq("organDonorTreatmentId",treatmentId));
			criteriaFinal.add(Restrictions.eq("deleted", "N"));
			organDonorTreatmentDto = (OrganDonorTreatmentDto) criteriaFinal
					.uniqueResult();
			return organDonorTreatmentDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organDonorTreatmentDto;
	}

	@Override
	public List<IntendOrganDonorMasterDto> getOrgansAgainstCheckupList(Integer checkupListId, HttpServletRequest request) {
		
		List<IntendOrganDonorMasterDto> orgsList = new ArrayList<IntendOrganDonorMasterDto>();
		
		String organs = "";
		
		try {
			String sql = "select intend_to_donate_organ_id from organ_donor_checkup_list where id = "+checkupListId+"";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);				 
			organs = (String) query.uniqueResult();
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
		
		
		Integer treatmentid = 0;
		
		try {
			String treatsql = "select organ_donor_treatment_id from organ_donor_checkup_list where id = "+checkupListId+"";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(treatsql);				 
			treatmentid = (Integer) query.uniqueResult();
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
		
	//	System.out.println("----getOrgansAgainstCheckupList--"+ checkupListId +"---->" + organs);
		
		List<String> organIdList = Arrays.asList(organs.split(","));
	//	System.out.println("----organIdList---size--->"+ organIdList.size());
		
		List<Integer> finIds = new ArrayList<>();
		for(String id : organIdList) {
			finIds.add(Integer.parseInt(id));
		}
		
		System.out.println("----INT finIds---size--->"+ finIds.size());
		System.out.println("----INT finIds--list--->"+ finIds);
		
		boolean organCollectedFlag;
		
		OrganCollectionDto orgnCollectionDto = null;
		
		List<String> finalOrganIds = new ArrayList<>();
		
		for(String id : organIdList) {
			
			String hql="select count (organDonorTreatment.organDonorTreatmentId) from OrganCollectionDto where organDonorTreatment.organDonorTreatmentId='"+treatmentid+"'";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			Long count = (Long) query.uniqueResult();
			
			System.out.println("----count : organDonorTreatmentId--->"+ count);
			
			if(count > 0) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OrganCollectionDto.class);
				criteria.add(Restrictions.eq("isOrganCollected", "Y"));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("organId", Integer.parseInt(id)));
				Integer treatId= treatmentid.intValue();
				criteria.add(Restrictions.eq("organDonorTreatment.organDonorTreatmentId",treatId));
			//	LogicalExpression andExp= Restrictions.and(lhs, rhs)
				orgnCollectionDto = (OrganCollectionDto) criteria.uniqueResult();
				
				if(orgnCollectionDto != null) {
					finIds.remove(orgnCollectionDto.getOrganId());
				}
			}
			
			
		}
		
		System.out.println("----INT finIds---size--->"+ finIds.size());
		System.out.println("----INT finIds--list--->"+ finIds);
		
		for(Integer id : finIds) {
			
			IntendOrganDonorMasterDto obj = new IntendOrganDonorMasterDto();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IntendOrganDonorMasterDto.class);
			criteria.add(Restrictions.eq("intendId", id));
			criteria.add(Restrictions.eq("deleted", "N"));
			obj = (IntendOrganDonorMasterDto) criteria.uniqueResult();
			
			orgsList.add(obj);
			
		}
		
		
	//	System.out.println("----organIdList------>"+ orgsList);
		return orgsList;
	}


}
