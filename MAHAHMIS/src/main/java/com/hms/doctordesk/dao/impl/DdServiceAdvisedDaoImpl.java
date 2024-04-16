package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.doctordesk.dao.DdServiceAdvisedDao;
import com.hms.doctordesk.dto.DdServiceAdvisedDto;
import com.hms.dto.Doctor;


@SuppressWarnings("unchecked")
@Repository
public class DdServiceAdvisedDaoImpl implements DdServiceAdvisedDao {
	
	static Logger log=Logger.getLogger(DdServiceAdvisedDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Doctor> fetchDoctor() {
		List<Doctor> listDoctorDetails=new ArrayList<Doctor>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Doctor.class);
			criteria.add(Restrictions.eq("doc_Type", "doctor"));
			listDoctorDetails = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
			log.error("Exception----> ",e);
		}		
		return listDoctorDetails;
	}

	@Override
	public int saveHistory(DdServiceAdvisedDto service, HttpServletRequest request) {
	try {
			sessionFactory.getCurrentSession().merge(service);
            return 1;
		
		} catch(Exception e) {
	            log.error("Exception----> ",e);
        }
        return 0;
	}

	@Override
	public List<DdServiceAdvisedDto> fetchService() {
		List<DdServiceAdvisedDto> lstServiceMaster=new ArrayList<DdServiceAdvisedDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DdServiceAdvisedDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstServiceMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstServiceMaster;
	}
}
