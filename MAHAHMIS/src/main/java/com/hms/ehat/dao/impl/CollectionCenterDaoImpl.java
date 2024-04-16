package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.CollectionCenterDao;
import com.hms.ehat.dto.CollectionCenterMasterDto;
//import com.hms.ehat.dto.StateMasterDto;
import com.hms.ehat.dto.UnitMasterDto;

@Repository
public class CollectionCenterDaoImpl implements CollectionCenterDao{

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<UnitMasterDto> getAllUnitMaster() {
		List<UnitMasterDto> lstUnitMaster=new ArrayList<UnitMasterDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(UnitMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstUnitMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstUnitMaster;
	}

	@Override
	public int saveorUpdateCollectionCenterMaster(
			CollectionCenterMasterDto collectionCenterMasterDto) {
		try {
			if(collectionCenterMasterDto.getId()==0){	
				sessionFactory.getCurrentSession().merge(collectionCenterMasterDto);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(collectionCenterMasterDto);
				return 2;				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<CollectionCenterMasterDto> getAllCollectionCenterMasterRecords() {
		List<CollectionCenterMasterDto> lstCollectionCenterMaster=new ArrayList<CollectionCenterMasterDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CollectionCenterMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstCollectionCenterMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstCollectionCenterMaster;
	}

	@Override
	public CollectionCenterMasterDto editCollectionCenterMaster(Integer id) {
		CollectionCenterMasterDto collectionCenterMasterDto = new CollectionCenterMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(CollectionCenterMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			collectionCenterMasterDto = (CollectionCenterMasterDto) criteria.uniqueResult();
			return collectionCenterMasterDto;
		} catch (Exception e) {
			  e.printStackTrace();
		}
		return collectionCenterMasterDto;
	}

	@Override
	public boolean deleteCollectionCenterMaster(
			CollectionCenterMasterDto collectionCenterMasterDto) {
		try{
			sessionFactory.getCurrentSession().merge(collectionCenterMasterDto);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<CollectionCenterMasterDto> getAllCollectionCenterAutosuggestion(
			String centerName) {
		String sql = "";
		 List<CollectionCenterMasterDto> lstCollectionCenter=new ArrayList<CollectionCenterMasterDto>();
		 try{
				sql = "SELECT c.id, c.center_name FROM pathology_collection_center_master  c  where c.center_name like '"	+ centerName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					CollectionCenterMasterDto obj = new CollectionCenterMasterDto();
					obj.setCenterName((String) row.get("center_name"));
					obj.setId((Integer) row.get("id"));
					lstCollectionCenter.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
				e.printStackTrace();
			}
				 
		return lstCollectionCenter;
	}
	
}
