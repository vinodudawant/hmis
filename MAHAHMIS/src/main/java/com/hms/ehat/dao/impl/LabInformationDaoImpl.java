package com.hms.ehat.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.LabInformationDao;
import com.hms.ehat.dto.LabInformationDTO;

@SuppressWarnings("unchecked")
@Repository
public class LabInformationDaoImpl implements LabInformationDao {

	@Autowired
	SessionFactory sessionFactory;

	
	@Override
	public String saveLabInfo(LabInformationDTO dto) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			session.merge(dto);
			
			if(dto.getIdOwnLab() == 0)
				return "Lab information saved.";
			else
				return "Lab information updated.";
		}catch(Exception e) {
			e.printStackTrace();
		}
		return "Oops some problem occured while adding Lab information";
	}

	@Override
	public LabInformationDTO getLabInfo() {
		
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			Criteria criteria = session.createCriteria(LabInformationDTO.class);
					 criteria.add(Restrictions.eq("deleted", "N"));
			
			return(LabInformationDTO) criteria.uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}


}
