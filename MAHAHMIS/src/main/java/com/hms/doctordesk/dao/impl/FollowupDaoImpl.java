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


import com.hms.doctordesk.dao.FollowupDao;
import com.hms.doctordesk.dto.FollowupDto;
import com.hms.doctordesk.dto.NotesDto;


@SuppressWarnings("unchecked")
@Repository
public class FollowupDaoImpl implements FollowupDao {
	
	@Autowired
	SessionFactory sessionFactory;

	static Logger log=Logger.getLogger(FollowupDaoImpl.class.getName());

	@Override
	public int saveFollowup(FollowupDto follow, HttpServletRequest request) {
		try {
			sessionFactory.getCurrentSession().merge(follow);
			
            return 1;
		
		} catch(Exception e) {
			log.error("Exception--> ",e);
        }
        return 0;
	}

	@Override
	public List<FollowupDto> getFollowup(int treatmentId) {
		List<FollowupDto> lstFollowUp=new ArrayList<FollowupDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FollowupDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("treatment_id", treatmentId));
			System.out.println("treatmentId="+treatmentId);
			lstFollowUp = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstFollowUp;
	}

}
