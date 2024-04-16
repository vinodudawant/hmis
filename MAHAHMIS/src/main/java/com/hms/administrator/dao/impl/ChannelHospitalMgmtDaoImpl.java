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

import com.hms.administrator.dao.ChannelHospitalMgmtDao;
import com.hms.administrator.dto.HospitalDetailsDTO;
@Repository
public class ChannelHospitalMgmtDaoImpl implements ChannelHospitalMgmtDao {
	static Logger log=Logger.getLogger(ChannelHospitalMgmtDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveHospitaldetails(HospitalDetailsDTO hobj) {
		try {
			if(hobj.getHosId()==0)
			{
			sessionFactory.getCurrentSession().merge(hobj);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(hobj);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("saveHospitaldetails....."+e);
			return 0;
		}
	}

	@Override
	public List<HospitalDetailsDTO> setExistingHospitalTemp(Integer unitId) {
		List<HospitalDetailsDTO> lsthospital=new ArrayList<HospitalDetailsDTO>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(HospitalDetailsDTO.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("unitId", unitId));
		lsthospital=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("setExistingHospitalTemp....."+e);

		}
		
	
		return lsthospital;
	}

	@Override
	public HospitalDetailsDTO editChannelHospitalMgmt(Integer hosId) {
		HospitalDetailsDTO obj=	(HospitalDetailsDTO)sessionFactory.getCurrentSession().get(HospitalDetailsDTO.class, hosId);
		return obj;
	}

	@Override
	public boolean deleteChannelHospitalMgmt(HospitalDetailsDTO obj) {
		try
		{
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
			log.error("deleteChannelHospitalMgmt....."+e);
		}
		return false;
	}

	@Override
	public List<HospitalDetailsDTO> channelHospitalAutoSuggestion(String hospitalName, Integer unitId) {
		
		List<HospitalDetailsDTO> lsthospital=new ArrayList<HospitalDetailsDTO>();
		Criteria query = sessionFactory.getCurrentSession().createCriteria(HospitalDetailsDTO.class);
		query.add(Restrictions.eq("unitId", unitId));
		query.add(Restrictions.like("Hos_name",hospitalName, MatchMode.START));
		lsthospital=query.list();
		return lsthospital;
	
	}

}
