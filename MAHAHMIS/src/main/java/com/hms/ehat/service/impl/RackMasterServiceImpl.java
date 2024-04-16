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

import com.hms.ehat.dao.RackMasterDao;
import com.hms.ehat.dto.RackMasterDto;
import com.hms.ehat.dto.RoomMasterDto;
import com.hms.ehat.service.RackMasterService;

@Service
public class RackMasterServiceImpl implements RackMasterService{

	@Autowired
	RackMasterDao rackmasterdao;
	@Autowired
	SessionFactory sessionFactory;
	@Override
	@Transactional
	public int saveorUpdateRackMaster(RackMasterDto rackmaster,
			HttpServletRequest request) {
		String sql="";
		sql="SELECT count(*) from ehat_rack_master r where r.deleted='N' and r.rack_name='"+rackmaster.getRackName()+"' and  r.room_id="+rackmaster.getRoomId();
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		System.err.println("rackid..."+rackmaster.getRackId());
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (rackmaster.getRackId() == 0){
			rackmaster.setRackName(rackmaster.getRackName());
			//Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			  // spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			  /* @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {	
				 String rackName= ((String)row.get("rack_name"));
				 if(rackName.equalsIgnoreCase(rackmaster.getRackName()))
				 {	
					 return 3;
				 }
			   }
			*/
			
			if(count > 0){
				return 3;
			}
			else{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			rackmaster.setCreatedBy(userId);
			rackmaster.setCreatedBy(rackmaster.getCreatedBy());
			rackmaster.setCreatedDate(new Date(new java.util.Date().getTime()));
			RoomMasterDto rmobj=(RoomMasterDto) sessionFactory.getCurrentSession().get(RoomMasterDto.class, rackmaster.getRoomId());
			rackmaster.setRoomName(rmobj.getRoomName());			  
			int response = rackmasterdao.saveorUpdateRackMaster(rackmaster);			
			return response;
			}
		}
		else{
			/*sql="SELECT r.rack_name from ehat_rack_master r where r.deleted='N' and r.room_id="+rackmaster.getRoomId();
			Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
			   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			   @SuppressWarnings("unchecked")
			   List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			   for(Map<String, Object> row : listSpDetails)
			   {	
				 String rackName= ((String)row.get("rack_name"));
				 if(rackName.equalsIgnoreCase(rackmaster.getRackName()))
				 {
					 return 3;
				 }
			   }
			*/
			
			     /* sql="SELECT count(*) from ehat_rack_master r where r.deleted='N' and r.rack_name='"+rackmaster.getRackName()+"' and  r.room_id="+rackmaster.getRoomId();
			      Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
			      System.err.println("rackid..."+rackmaster.getRackId());
			      int count1 = ((Number)countQuery1.uniqueResult()).intValue();
			
			      System.err.println("count1..."+count1);
			
			      if(count1 == 1){
			    	  return 3;
			      }else{*/
			String sql1="";
			sql1="SELECT count(*) from ehat_rack_master r where r.deleted='N' and r.rack_name='"+rackmaster.getRackName()+"' and r.room_id="+rackmaster.getRoomId()+" and r.rack_id not in("+rackmaster.getRackId()+")";
			Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
			
			int count1 = ((Number)countQuery1.uniqueResult()).intValue();
			if(count1 >0){
				return 3;
			}else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				rackmaster.setUpdatedBy(userId);
				RoomMasterDto rmobj=(RoomMasterDto) sessionFactory.getCurrentSession().get(RoomMasterDto.class, rackmaster.getRoomId());
				rackmaster.setRoomName(rmobj.getRoomName());
				rackmaster.setUpdatedBy(rackmaster.getUpdatedBy());
				rackmaster.setUpdatedDate(new Date(new java.util.Date().getTime()));			
				int response = rackmasterdao.saveorUpdateRackMaster(rackmaster);			
				return response;
		  }
		}
	}

	@Override
	@Transactional
	public List<RackMasterDto> getAllRackMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return rackmasterdao.getAllRackMaster();
	}

	@Override
	@Transactional
	public RackMasterDto editRackDoc(Integer rackId) {
		// TODO Auto-generated method stub
		return rackmasterdao.editRackDoc(rackId);
	}

	@Override
	@Transactional
	public boolean deleteRackMaster(Integer rackId, HttpServletRequest request) {
	
		String sql="SELECT count(*) FROM ehat_shelf_doc  WHERE deleted='N' and rack_id ="+rackId;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count > 0)
		{
			return false;
		}
		else
		{
		RackMasterDto obj=	(RackMasterDto)sessionFactory.getCurrentSession().get(RackMasterDto.class, rackId);
		obj.setDeleted("Y");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		
		return rackmasterdao.deleteRackMaster(obj);
	}
	}
	

}
