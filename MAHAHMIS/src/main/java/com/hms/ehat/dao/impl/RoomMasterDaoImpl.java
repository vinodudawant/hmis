package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.RoomMasterDao;
import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.dto.ShelfDocDto;
@Repository
public class RoomMasterDaoImpl implements RoomMasterDao{
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveorUpdateRoomMaster(RoomMasterDto roommaster) {
		try {
			if(roommaster.getRoomId()==0)
			{
			sessionFactory.getCurrentSession().merge(roommaster);
			return 1;
			}
			else
			{
				sessionFactory.getCurrentSession().merge(roommaster);
			return 2;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<RoomMasterDto> getAllRoomMaster() {
		List<RoomMasterDto> lstRoomMaster=new ArrayList<RoomMasterDto>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RoomMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		lstRoomMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		
		// TODO Auto-generated method stub
		return lstRoomMaster;
	}

	@Override
	public RoomMasterDto editRoomDoc(Integer roomId) {
		RoomMasterDto obj=new RoomMasterDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RoomMasterDto.class);
			criteria.add(Restrictions.eq("roomId", roomId));
			obj=(RoomMasterDto) criteria.uniqueResult();
			return obj;
			}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteRoomMaster(RoomMasterDto roommaster) {
		// TODO Auto-generated method stub
		try
		{
			sessionFactory.getCurrentSession().merge(roommaster);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
}
