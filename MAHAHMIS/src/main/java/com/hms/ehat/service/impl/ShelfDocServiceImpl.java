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

import com.hms.ehat.dao.ShelfDocDao;
import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.dto.ShelfDocDto;
import com.hms.ehat.service.ShelfDocService;

@Service
public class ShelfDocServiceImpl implements ShelfDocService {
	@Autowired
	ShelfDocDao shelfdocdao;
	@Autowired
	SessionFactory sessionFactory;
	@Override
	@Transactional
	public int saveorUpdateShelDoc(ShelfDocDto shelfDocMaster,
			HttpServletRequest request) {
		String sql="";
		sql="SELECT count(*) from ehat_shelf_doc s  where s.deleted='N' and s.shelf_doc_name='"+shelfDocMaster.getShelDocName()+"'and s.room_id="+shelfDocMaster.getRoomId()+" and s.rack_id="+shelfDocMaster.getRackId();
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (shelfDocMaster.getSelfDocId() == 0)
		{
			shelfDocMaster.setShelDocName(shelfDocMaster.getShelDocName());
			  /* spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {	
				 String shelfName= ((String)row.get("shelf_doc_name"));
				 if(shelfName.equalsIgnoreCase(shelfDocMaster.getShelDocName()))
				 {
					 return 3;
				 }
			   }*/
			
			if(count > 0)
			{
				return 3;
			}
			else
			{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			shelfDocMaster.setCreatedBy(userId);
			shelfDocMaster.setCreatedBy(shelfDocMaster.getCreatedBy());
			shelfDocMaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			RoomMasterDto rmobj=(RoomMasterDto) sessionFactory.getCurrentSession().get(RoomMasterDto.class, shelfDocMaster.getRoomId());
			RackMasterDto rackobj=(RackMasterDto) sessionFactory.getCurrentSession().get(RackMasterDto.class, shelfDocMaster.getRackId());
			shelfDocMaster.setRoomName(rmobj.getRoomName());
			shelfDocMaster.setRackName(rackobj.getRackName());
			int response = shelfdocdao.saveorUpdateShelDoc(shelfDocMaster);			
			return response;
			}
		}
		else{
			/*sql="SELECT s.shelf_doc_name from ehat_shelf_doc s  where s.deleted='N' and s.room_id="+shelfDocMaster.getRoomId()+"and s.rack_id="+shelfDocMaster.getRackId()+" and s.shelf_doc_id="+shelfDocMaster.getSelfDocId();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {	
				 String shelfName= ((String)row.get("shelf_doc_name"));
				 if(shelfName.equalsIgnoreCase(shelfDocMaster.getShelDocName()))
				 {
					 return 3;
				 }
			   }*/
			String sql1="";
			sql1="SELECT count(*) from ehat_shelf_doc s  where s.deleted='N' and s.shelf_doc_name='"+shelfDocMaster.getShelDocName()+"' and s.room_id="+shelfDocMaster.getRoomId()+" and s.rack_id="+shelfDocMaster.getRackId()+" and  s.shelf_doc_id not in("+shelfDocMaster.getSelfDocId()+")";
			Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			
			int count1 = ((Number)countQuery1.uniqueResult()).intValue();
			if(count1 >0){
				return 3;
			}else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			shelfDocMaster.setUpdatedBy(userId);
			shelfDocMaster.setUpdatedBy(shelfDocMaster.getUpdatedBy());
			shelfDocMaster.setUpdatedDate(new Date(new java.util.Date().getTime()));
			RoomMasterDto rmobj=(RoomMasterDto) sessionFactory.getCurrentSession().get(RoomMasterDto.class, shelfDocMaster.getRoomId());
			RackMasterDto rackobj=(RackMasterDto) sessionFactory.getCurrentSession().get(RackMasterDto.class, shelfDocMaster.getRackId());
			shelfDocMaster.setRoomName(rmobj.getRoomName());
			shelfDocMaster.setRackName(rackobj.getRackName());
			int response = shelfdocdao.saveorUpdateShelDoc(shelfDocMaster);			
			return response;
			}
			
		}
	}

	@Override
	@Transactional
	public List<ShelfDocDto> getAllShelDoc(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return shelfdocdao.getAllShelDoc();
	}

	@Override
	@Transactional
	public ShelfDocDto editShelfDoc(Integer selfDocId) {
		// TODO Auto-generated method stub
		return shelfdocdao.editShelfDoc(selfDocId);
	}

	@Override
	@Transactional
	public boolean deleteShelfDoc(Integer selfDocId, HttpServletRequest request) {
		String sql="SELECT count(*) FROM ehat_patient_doc_master   WHERE deleted='N' and shelf_id ="+selfDocId;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count > 0)
		{
			return false;
		}
		else
		{
		ShelfDocDto obj=	(ShelfDocDto)sessionFactory.getCurrentSession().get(ShelfDocDto.class, selfDocId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return shelfdocdao.deleteShelfDoc(obj);
	}
	}

	@Override
	@Transactional
	public List<RackMasterDto> getAllRackByRoomId(Integer roomID) {
		// TODO Auto-generated method stub
		return shelfdocdao.getAllRackByRoomId(roomID);
	}

	@Override
	@Transactional
	public List<ShelfDocDto> getAllShelfByRackId(Integer rackId) {
		// TODO Auto-generated method stub
		return shelfdocdao.getAllShelfByRackId(rackId);
	}

}
