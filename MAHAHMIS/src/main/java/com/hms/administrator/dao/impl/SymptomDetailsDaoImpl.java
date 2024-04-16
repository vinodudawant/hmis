package com.hms.administrator.dao.impl;

import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.SymptomDetailsDao;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.administrator.dto.SymptomsDetailsDto;

@Repository
public class SymptomDetailsDaoImpl implements SymptomDetailsDao{

	@Autowired
	SessionFactory SessionFactory;
	
	
	@Override
	public String saveSymptomDetails(int specializationId, List<SymptomsDetailsDto> sysmDetailsDtos) {

		Session session = null;
		try {
			session = SessionFactory.getCurrentSession();
			
			HospitalSpecialisationDto dto = (HospitalSpecialisationDto) session.get(HospitalSpecialisationDto.class, specializationId);
			
			for(SymptomsDetailsDto symptomDetailsDto : sysmDetailsDtos)
			{
				symptomDetailsDto.setHospitalSpecialisationDto(dto);
				session.merge(symptomDetailsDto);
			}
			
			return "Symptoms Details Saved Successfully...";
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return "Oops some problem occured while adding Symptoms Details...";
	}


	@Override
	public List<SymptomsDetailsDto> fetchSymptomDetails(int specializationId) {
		
		Session session = null;
		try {
			session = SessionFactory.getCurrentSession();
			
			HospitalSpecialisationDto masterDto = (HospitalSpecialisationDto) session.get(HospitalSpecialisationDto.class, specializationId);
			Criteria criteria = session.createCriteria(SymptomsDetailsDto.class);
					 criteria.add(Restrictions.eq("isDeleted", "N"));
					 criteria.add(Restrictions.eq("HospitalSpecialisationDto", masterDto));
					 
			List<SymptomsDetailsDto> list = criteria.list();
			
			return list;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return null;
	}


	@Override
	public boolean deleteSymptomDetails(int[] symptomDetailIds, int userId) {
		
		Session session = null;
		try{
			session = SessionFactory.getCurrentSession();

			for(int id : symptomDetailIds)
			{
				Query query = session.createQuery("update SymptomsDetailsDto set deletedBy = :deletedBy, isDeleted = :isDeleted, deletedDate = :deletedDate where symptomDetailsId = :symptomDetailsId");
					query.setParameter("deletedBy", userId);
					query.setParameter("isDeleted", "Y");
					query.setParameter("deletedDate", new Date());
					query.setParameter("symptomDetailsId", id);
				query.executeUpdate();
			}
			return true;
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return false;
	}
}