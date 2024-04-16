package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.BedStateMgtDao;

@Repository
public class BedStateMgtDaoImpl implements BedStateMgtDao{

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	@SuppressWarnings("unchecked")
	public List<ChargesMasterSlave> getHallMasterList() {
		
		LOGGER.info("BedStateMgtDaoImpl method getHallMasterList called");
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 2));
			criteria.add(Restrictions.eq("isCategory", "N"));
			ltChargesSlave = criteria.list();
			LOGGER.debug("Response--------> "+ltChargesSlave);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public Beds viewBedsOfHall(int hallId) {
		
		LOGGER.info("BedStateMgtDaoImpl method viewBedsOfHall called");
		List<Beds> lstBeds = new ArrayList<Beds>();
		Beds bedObj = new Beds();
		try {
			if(hallId > 0) {
				ChargesMasterSlave hall = (ChargesMasterSlave) sessionFactory.getCurrentSession().get(ChargesMasterSlave.class, hallId);
				lstBeds = hall.getListBeds().stream().filter(x -> x.getBedstate().equals("2")).collect(Collectors.toList());
			}else {
			
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Beds.class);
				criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("bedstate", "2"));
				lstBeds = criteria.list();
			}
			bedObj.setBedList(lstBeds);
			LOGGER.debug("Response--------> "+lstBeds);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return bedObj;
		}
		return bedObj;
	}
	
	@Override
	public int deallocateCleanedBeds(String bedIds, int userId) {
		
		LOGGER.info("BedStateMgtDaoImpl method saveOrUpdateBedMaster called");
		int	records = 0;
		try {
			
			String hql = "update Beds set bedstate=:bedState,updatedBy=:updatedBy where bed_ID IN ("+bedIds+")";
			Query qry = sessionFactory.getCurrentSession().createQuery(hql);
			qry.setParameter("bedState", "4");
			qry.setParameter("updatedBy", userId);
			qry.executeUpdate();
			
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return records;
		}
		return records;
	}
}
