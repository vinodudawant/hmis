package com.hms.ivf.dao.impl;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.IVFCalenderDao;
import com.hms.ivf.dto.IVFFollicularStudy;

@Repository
public class IVFCalenderDaoImpl implements IVFCalenderDao {

	@Autowired
	SessionFactory sf;
	@Override
	public int saveIvfCalender(IVFFollicularStudy obj) {
		try {
			String sql="UPDATE IVFFollicularStudy set age='"+obj.getAge()+"',weight='"+obj.getWeight()+"',height='"+obj.getHeight()+"',bmi='"+obj.getBmi()+"',afc='"+obj.getAfc()+"',rx='"+obj.getRx()+"',hsg='"+obj.getHsg()+"',hsa='"+obj.getHsa()+"',protocoloF='"+obj.getProtocoloF()+"' where studyid=:studyid ";
		  
		  Query q=	sf.getCurrentSession().createQuery(sql);
		  q.setParameter("studyid", obj.getStudyid());
		  
		  q.executeUpdate();
		  
		  return 1;
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return 0;
	}

}
