package com.hms.rostermanagement.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.rostermanagement.dao.ConsultingRoomDao;
import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;
import com.hms.rostermanagement.service.ConsultingRoomService;

@Service
@Transactional
public class ConsultingRoomServiceImpl implements ConsultingRoomService {
	
	   @Autowired
	   ConsultingRoomDao rdao;
	   
	   @Autowired
	   SessionFactory sf;

	@Override
	public int saveConsultingRoom(ConsultingRoomMaterDTO obj) {
		
		if(obj.getRoomMasterId()==0) {
			
			
			Criteria crit = sf.getCurrentSession().createCriteria(ConsultingRoomMaterDTO.class);
			
			crit.add( Restrictions.eq("roomName", obj.getRoomName()));
			crit.add( Restrictions.eq("deleted", "N"));
			crit.setProjection(Projections.rowCount());
			Integer count = ((Number)crit.uniqueResult()).intValue();
				
						  if(count==0) {
							  return rdao.saveConsultingRoom(obj);
						  }else {
							  return 3;
						  }
		
		}else {
			
			List<Integer> nlist=new ArrayList<>();
			nlist.add(obj.getRoomMasterId());
			
			Criteria crit = sf.getCurrentSession().createCriteria(ConsultingRoomMaterDTO.class);
			
			crit.add( Restrictions.eq("roomName", obj.getRoomName()));
			crit.add(Restrictions.not(Restrictions.in("roomMasterId",nlist)));
			crit.add( Restrictions.eq("deleted", "N"));
			crit.setProjection(Projections.rowCount());
			Integer count = ((Number)crit.uniqueResult()).intValue();
			
			if(count==0) {
				  return rdao.saveConsultingRoom(obj);
			  }else {
				  return 3;
			  }
			
		}
		
	}

	@Override
	public List<ConsultingRoomMaterDTO> getAllConsultingRoom(Integer unitId) {
		
		return rdao.getAllConsultingRoom(unitId);
	}

	@Override
	public int deleteConsultingRoom(Integer roomId, Integer userId) {
		
		return rdao.deleteConsultingRoom(roomId, userId);
	}

	@Override
	public ConsultingRoomMaterDTO editConsultingRoom(Integer roomId) {
		
		return rdao.editConsultingRoom(roomId);
	}

}
