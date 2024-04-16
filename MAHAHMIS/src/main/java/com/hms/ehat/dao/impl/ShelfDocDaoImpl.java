package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.ShelfDocDao;
import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.ShelfDocDto;

@Repository
public class ShelfDocDaoImpl implements ShelfDocDao{

	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveorUpdateShelDoc(ShelfDocDto bodypartMaster) {
		System.err.println("bodypartMaster id..."+bodypartMaster.getSelfDocId());
		try {
			if(bodypartMaster.getSelfDocId()==0)
			{
			sessionFactory.getCurrentSession().merge(bodypartMaster);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(bodypartMaster);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	
	}
	@Override
	public List<ShelfDocDto> getAllShelDoc() {
		
		List<ShelfDocDto> lstShelDoc=new ArrayList<ShelfDocDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ShelfDocDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		lstShelDoc=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		// TODO Auto-generated method stub
		return lstShelDoc;
	}
	@Override
	public ShelfDocDto editShelfDoc(Integer selfDocId) {
		// TODO Auto-generated method stub
		ShelfDocDto obj=new ShelfDocDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ShelfDocDto.class);
			criteria.add(Restrictions.eq("selfDocId", selfDocId));
			obj=(ShelfDocDto) criteria.uniqueResult();
			return obj;
			}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}
	@Override
	public boolean deleteShelfDoc(ShelfDocDto shelfdocobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(shelfdocobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
	@Override
	public List<RackMasterDto> getAllRackByRoomId(Integer roomID) {
		List<RackMasterDto> lstrackDoc=new ArrayList<RackMasterDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RackMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("roomId", roomID));
		lstrackDoc=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		// TODO Auto-generated method stub
		return lstrackDoc;
	}
	@Override
	public List<ShelfDocDto> getAllShelfByRackId(Integer rackId) {
		List<ShelfDocDto> lstShelDoc=new ArrayList<ShelfDocDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ShelfDocDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("rackId",rackId));
		
		lstShelDoc=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		// TODO Auto-generated method stub
		return lstShelDoc;
	}

}
