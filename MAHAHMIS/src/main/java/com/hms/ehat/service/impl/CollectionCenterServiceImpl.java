package com.hms.ehat.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import org.hibernate.SessionFactory;
import org.hibernate.Query;
import java.sql.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.ehat.dao.CollectionCenterDao;
import com.hms.ehat.dto.CollectionCenterMasterDto;
import com.hms.ehat.dto.UnitMasterDto;
import com.hms.ehat.service.CollectionCenterService;
import javax.servlet.http.HttpSession;

@Service
public class CollectionCenterServiceImpl implements CollectionCenterService{

	@Autowired
	private CollectionCenterDao collectionCenterDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public List<UnitMasterDto> getAllUnitMaster() {
		return collectionCenterDao.getAllUnitMaster();
	}

	@Override
	@Transactional
	public int saveorUpdateCollectionCenterMaster(
			CollectionCenterMasterDto collectionCenterMasterDto,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");		
		int response = collectionCenterDao.saveorUpdateCollectionCenterMaster(collectionCenterMasterDto);
		return response;
	}

	@Override
	@Transactional
	public List<CollectionCenterMasterDto> getAllCollectionCenterMasterRecords(
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return collectionCenterDao.getAllCollectionCenterMasterRecords();
	}

	@Override
	@Transactional
	public CollectionCenterMasterDto editCollectionCenterMaster(Integer id) {
		// TODO Auto-generated method stub
		return collectionCenterDao.editCollectionCenterMaster(id);
	}

	@Override
	@Transactional
	public boolean deleteCollectionCenterMaster(Integer id,
			HttpServletRequest request) {
		String sql="SELECT count(*) FROM pathology_collection_center_master WHERE deleted='N' and id ="+id;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if(count <0){
			return false;
		}else{CollectionCenterMasterDto obj=	(CollectionCenterMasterDto)sessionFactory.getCurrentSession().get(CollectionCenterMasterDto.class, id);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
		
			return collectionCenterDao.deleteCollectionCenterMaster(obj);
		}
	}

	@Override
	@Transactional
	public List<CollectionCenterMasterDto> getAllCollectionCenterAutosuggestion(
			String centerName) {
		return collectionCenterDao.getAllCollectionCenterAutosuggestion(centerName);
	}
	
}
