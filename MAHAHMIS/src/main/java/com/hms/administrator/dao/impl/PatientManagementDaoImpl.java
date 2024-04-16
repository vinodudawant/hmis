package com.hms.administrator.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.PatientManagementDao;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.dto.PatientTitle;
import com.hms.dto.SymptomsDetailsComp;

@Repository
public class PatientManagementDaoImpl implements PatientManagementDao{

	@Autowired
	SessionFactory sessionFactory;
	
	public PatientManagementDaoImpl() {
	
	}

	@Override
	public String insertPatientTitle(PatientTitle patientTitle) {
		
		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			
			Criteria criteria = session.createCriteria(PatientTitle.class);
			 criteria.add(Restrictions.eq("patientTitle", patientTitle.getPatientTitle()));
		 	 criteria.add(Restrictions.eq("patientTitleGender", patientTitle.getPatientTitleGender()));
		 	 criteria.add(Restrictions.eq("deleteStatus", "Y"));
		 	PatientTitle pt = (PatientTitle) criteria.uniqueResult();
	
		 	if(pt != null)
		 		return "The title is already present in the database...";
			
			if(patientTitle.getPatientTitleID() == 0){
					session.merge(patientTitle);
					return "Patient Title added successfully...";
			}else{
				PatientTitle obj = (PatientTitle) session.get(PatientTitle.class, patientTitle.getPatientTitleID());
				if(obj != null){
					obj.setPatientTitle(patientTitle.getPatientTitle());
					obj.setPatientTitleGender(patientTitle.getPatientTitleGender());
					obj.setUpdatedBy(patientTitle.getCreatedBy());
					
					session.merge(obj);
				}
				return "Patient Title updated successfully...";
			}
		}catch(Exception e){
			e.printStackTrace();
			return "Oops some problem occured while adding the Patient Title...";
		}
	}

	@Override
	public PatientTitle fetchAllPatientTitles() {
		
		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			
			Criteria criteria = session.createCriteria(PatientTitle.class);
					 criteria.add(Restrictions.eq("deleteStatus", "Y"));
					 criteria.addOrder(Order.desc("patientTitleID"));
					 
			PatientTitle pt = new PatientTitle();
						 pt.setListPatientTitle(criteria.list());
			return pt;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public PatientTitle getTitleById(Integer titleId) {
		Session session = null;
		PatientTitle dto = null;
		try {
			session = sessionFactory.getCurrentSession();
			dto = (PatientTitle) session.get(PatientTitle.class, titleId);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	
	@Override
	public boolean deletePatientTitle(int patientTitleId, int userId) {
		
		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();

			Query query = session.createQuery("update PatientTitle set deletedBy = :deletedBy, deleteStatus = :deleteStatus, deletedDate = :deletedDate where patientTitleID = :patientTitleID");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("deleteStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("patientTitleID", patientTitleId);
			query.executeUpdate();
			
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	
	
	@Override
	public String saveSymptomDetails(int specializationId, List<SymptomsDetailsComp> sysmDetailsDtos) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			HospitalSpecialisationDto dto = (HospitalSpecialisationDto) session.get(HospitalSpecialisationDto.class, specializationId);
			
			for(SymptomsDetailsComp symptomDetailsDto : sysmDetailsDtos) {
				symptomDetailsDto.setHospitalSpecialisationDto(dto);
				session.merge(symptomDetailsDto);
			}
			return "Symptoms Details Saved Successfully...";
		}catch(Exception e){
			e.printStackTrace();
		}
		return "Oops some problem occured while adding Symptoms Details...";
	}


	@Override
	public List<SymptomsDetailsComp> fetchSymptomDetails(int specializationId) {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			HospitalSpecialisationDto masterDto = (HospitalSpecialisationDto) session.get(HospitalSpecialisationDto.class, specializationId);
			Criteria criteria = session.createCriteria(SymptomsDetailsComp.class);
					 criteria.add(Restrictions.eq("status", "Y"));
					 criteria.add(Restrictions.eq("hospitalSpecialisationDto", masterDto));
					 
			List<SymptomsDetailsComp> list = criteria.list();
			
			return list;
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public boolean deleteSymptomDetails(int[] symptomDetailIds, int userId) {
		
		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();

			for(int id : symptomDetailIds){
				Query query = session.createQuery("update SymptomsDetailsComp set deletedBy = :deletedBy, status = :status, deletedDate = :deletedDate where idsymptomsDetails = :idsymptomsDetails");
					query.setParameter("deletedBy", userId);
					query.setParameter("status", "N");
					query.setParameter("deletedDate", new Date());
					query.setParameter("idsymptomsDetails", id);
				query.executeUpdate();
			}
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
}