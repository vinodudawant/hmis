package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.RackMasterDao;
import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;

@Repository
public class RackMasterDaoImpl implements RackMasterDao{
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveorUpdateRackMaster(RackMasterDto rackmaster) {
		try {
			if(rackmaster.getRackId()==0)
			{
			sessionFactory.getCurrentSession().merge(rackmaster);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(rackmaster);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<RackMasterDto> getAllRackMaster() {
		List<RackMasterDto> lstRackMaster=new ArrayList<RackMasterDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RackMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		lstRackMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		// TODO Auto-generated method stub
		return lstRackMaster;
	}

	@Override
	public RackMasterDto editRackDoc(Integer roomId) {
		RackMasterDto obj=new RackMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RackMasterDto.class);
			criteria.add(Restrictions.eq("rackId", roomId));
			obj=(RackMasterDto) criteria.uniqueResult();
			return obj;
			}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteRackMaster(RackMasterDto rackmaster) {
		try
		{
			sessionFactory.getCurrentSession().merge(rackmaster);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

}
