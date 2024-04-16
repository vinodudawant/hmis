package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.ChannelDoctorMgmtDao;
import com.hms.administrator.dto.Chanelling_doctor;

@Repository
public class ChannelDoctorMgmtDaoImpl  implements ChannelDoctorMgmtDao{
	static Logger log=Logger.getLogger(ChannelDoctorMgmtDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveReferToDoc(Chanelling_doctor cobj) {
		try {
			if(cobj.getChannDocId()==0)
			{
				System.err.println("Inside dao");
			sessionFactory.getCurrentSession().merge(cobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(cobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveReferToDoc....."+e);
			return 0;
		}
	}

	@Override
	public List<Chanelling_doctor> setExistingDoctorTemp(Integer unitId) {
		List<Chanelling_doctor> lstdoctor=new ArrayList<Chanelling_doctor>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Chanelling_doctor.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		lstdoctor=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("setExistingDoctorTemp....."+e);

		}
		
	
		return lstdoctor;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Chanelling_doctor> setExistingDoctorTemp1() {
		List<Chanelling_doctor> lstdoctor=new ArrayList<Chanelling_doctor>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Chanelling_doctor.class).setMaxResults(15);
		criteria.add(Restrictions.eq("deleted", "N"));
	//	criteria.add(Restrictions.eq("unitId", unitId));
		lstdoctor=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("setExistingDoctorTemp....."+e);

		}
		
	
		return lstdoctor;
	}

	@Override
	public Chanelling_doctor editChannelDoctorMgmt(Integer doctorId) {
		Chanelling_doctor obj=	(Chanelling_doctor)sessionFactory.getCurrentSession().get(Chanelling_doctor.class, doctorId);
		return obj;
	}

	@Override
	public boolean deleteChannelDoctorMgmt(Chanelling_doctor cobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(cobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			log.error("deleteChannelDoctorMgmt....."+e);
		}
		return false;
	}

	@Override
	public List<Chanelling_doctor> channelDoctorAutoSuggestion(String doctorName,Integer unitId) {
		List<Chanelling_doctor> lstdoctor=new ArrayList<Chanelling_doctor>();
		Criteria query = sessionFactory.getCurrentSession().createCriteria(Chanelling_doctor.class);
		query.add(Restrictions.eq("unitId", unitId));
		query.add(Restrictions.like("docName",doctorName, MatchMode.START));
		lstdoctor=query.list();
		return lstdoctor;
	}

	@Override
	public Integer setnewDocTemp() {
		Criteria query = sessionFactory.getCurrentSession().createCriteria(Chanelling_doctor.class);
//		query.add(Restrictions.eq("unitId", unitId));
//		query.add(Restrictions.like("docName",doctorName, MatchMode.START));
		Integer count = query.list().size();
		return count;
	}
}
