package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.controller.RadiationMasterController;
import com.hms.doctordesk.dao.RadiationMasterDao;
import com.hms.doctordesk.dto.RadiationDto;
import org.hibernate.Transaction;
import org.hibernate.Session;
import org.hibernate.Query;

@SuppressWarnings("unchecked")
@Repository
public class RadiationMasterDaoImpl implements RadiationMasterDao {

	static Logger log=Logger.getLogger(RadiationMasterController.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<RadiationDto> getAllRadiationMaster() {
		List<RadiationDto> lstRadiationMaster=new ArrayList<RadiationDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RadiationDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstRadiationMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstRadiationMaster;
	}
	@Override
	public int saveRadiationMaster(RadiationDto radio, HttpServletRequest request) {
		try {
		sessionFactory.getCurrentSession().merge(radio);
        return 1;
	
	} catch(Exception e) {
		log.error("Exception----> ",e);
    }
    return 0;
	}
	@Override
	public RadiationDto editRadiationMaster(Integer radiationId) {
		RadiationDto obj=new RadiationDto();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RadiationDto.class);
			criteria.add(Restrictions.eq("radiationId", radiationId));
			obj=(RadiationDto) criteria.uniqueResult();
			return obj;
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}
	@Override
	public boolean deleteRadiationMaster(Integer radiationId, Integer userId) {
		try {
			RadiationDto obj=	(RadiationDto)sessionFactory.getCurrentSession().get(RadiationDto.class, radiationId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}
	@Override
	public List<RadiationDto> getAllRadiationMasterAutosuggestion(String radiationName) {
		 String sql = "";
		 List<RadiationDto> lstorganMaster=new ArrayList<RadiationDto>();
		 try{
				sql = "SELECT c.idradiation, c.radiation_name FROM radiation_tech_master c  where c.radiation_name like '"	+ radiationName + "%' and c.deleted='N' limit 20 ";
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					RadiationDto obj = new RadiationDto();
					obj.setRadiationName((String) row.get("radiation_name"));
					obj.setRadiationId((Integer) row.get("idradiation"));
					lstorganMaster.add(obj);
					obj=null;
				}				
		 
		 }catch (Exception e) {
			 log.error("Exception----> ",e);
			}
				 
		return lstorganMaster;
	}
	@Override
	public String getNextRadiationMasterID() {
		Session session=sessionFactory.openSession();
		Transaction tx=session.beginTransaction();
		String hql="select MAX(radiationId) from RadiationDto";
		try{
		Query query=session.createQuery(hql);
		Integer id = (int) query.list().get(0) + 1;
		System.out.println("ID :"+id);
		//tx.commit();
		return new String(""+id);
		}
		catch(Exception e)
		{
		tx.rollback();
		session.close();
		log.error("Exception----> ",e);
		return new String("");
		}
		}
}
