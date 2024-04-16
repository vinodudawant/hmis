package com.hms.rostermanagement.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.rostermanagement.dao.ConsultingRoomDao;
import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;

@Repository
public class ConsultingRoomDaoImpl implements ConsultingRoomDao {

	 @Autowired
	 SessionFactory sf;
	
	@Override
	public int saveConsultingRoom(ConsultingRoomMaterDTO obj) {
		  try {
			  if(obj.getRoomMasterId()==0) {
				  sf.getCurrentSession().merge(obj);
				  return 1;
			  }else {
				  sf.getCurrentSession().merge(obj);
				  return 2;
			  }
			  
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<ConsultingRoomMaterDTO> getAllConsultingRoom(Integer unitId) {
		  List<ConsultingRoomMaterDTO> list=new ArrayList<>();     
		try {
		Criteria c= sf.getCurrentSession().createCriteria(ConsultingRoomMaterDTO.class);
		c.add(Restrictions.eq("deleted", "N"));
		c.add(Restrictions.eq("unitId", unitId));
		
		list=c.list();
		    	 
		     }catch (Exception e) {
				e.printStackTrace();
			}
		return list;
	}

	@Override
	public int deleteConsultingRoom(Integer roomId, Integer userId) {
		  try {
			  String sql="";
			  sql="UPDATE ConsultingRoomMaterDTO set deleted='Y',status='N',deletedBy="+userId+",deletedDateTime=now() where roomMasterId="+roomId+"  ";
			  
			 Query q=   sf.getCurrentSession().createQuery(sql);
			 q.executeUpdate();
			 return 1;
			  
		  }catch (Exception e) {
			 e.printStackTrace();
		}
		return 0;
	}

	@Override
	public ConsultingRoomMaterDTO editConsultingRoom(Integer roomId) {
		ConsultingRoomMaterDTO obj=new ConsultingRoomMaterDTO(); 
		try {
			obj=(ConsultingRoomMaterDTO) sf.getCurrentSession().get(ConsultingRoomMaterDTO.class, roomId);
			return obj;
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

}
