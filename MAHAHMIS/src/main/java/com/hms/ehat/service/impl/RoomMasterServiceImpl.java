package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.RoomMasterDao;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.service.RoomMasterService;

@Service
public class RoomMasterServiceImpl implements RoomMasterService{

	@Autowired
	RoomMasterDao roommasterdao;
	@Autowired
	SessionFactory sessionFactory;
	@Override
	@Transactional
	public int saveorUpdateRoomMaster(RoomMasterDto roommsater,
			HttpServletRequest request) {
		String sql="";
		if (roommsater.getRoomId() == 0)
		{
			roommsater.setRoomName(roommsater.getRoomName());
			sql="SELECT r.room_name from ehat_room_master r where r.deleted='N'";
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {		    	
				   RoomMasterDto obj = new RoomMasterDto();	    	
		    	
				 String roomName= ((String)row.get("room_name"));
				if(roomName.equalsIgnoreCase(roommsater.getRoomName()))
				 {
					 return 3;
				 }
			   }
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			roommsater.setCreatedBy(userId);
			roommsater.setCreatedBy(roommsater.getCreatedBy());
			roommsater.setCreatedDate(new Date(new java.util.Date().getTime()));
			
			int response = roommasterdao.saveorUpdateRoomMaster(roommsater);
			
			return response;
		}
		else{
			sql="SELECT r.room_name from ehat_room_master r where r.deleted='N'";
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {
		    	
				   RoomMasterDto obj = new RoomMasterDto();	    	
		    	
				 String roomName= ((String)row.get("room_name"));
				 System.err.println("foldeName...."+roomName);
				 if(roomName.equalsIgnoreCase(roommsater.getRoomName()))
				 {
					 System.err.println("inside if....");

					 return 3;
				 }
			   }
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			roommsater.setUpdatedBy(userId);
			roommsater.setUpdatedBy(roommsater.getUpdatedBy());
			roommsater.setUpdatedDate(new Date(new java.util.Date().getTime()));
			
			int response = roommasterdao.saveorUpdateRoomMaster(roommsater);
			
			return response;
		}
	}

	@Override
	@Transactional
	public List<RoomMasterDto> getAllRoomMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return roommasterdao.getAllRoomMaster();
	}

	@Override
	@Transactional
	public RoomMasterDto editRoomDoc(Integer roomId) {
		// TODO Auto-generated method stub
		return roommasterdao.editRoomDoc(roomId);
	}

	@Override
	@Transactional
	public boolean deleteRoomMaster(Integer roomId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		String sql="SELECT count(*) FROM ehat_rack_master WHERE deleted='N' and room_id ="+roomId;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		
		if(count >0){
			return false;
		}else{
			
			RoomMasterDto obj=	(RoomMasterDto)sessionFactory.getCurrentSession().get(RoomMasterDto.class, roomId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
		
			return roommasterdao.deleteRoomMaster(obj);
		}
		
	}
}
