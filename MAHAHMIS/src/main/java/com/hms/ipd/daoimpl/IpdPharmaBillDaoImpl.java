package com.hms.ipd.daoimpl;

import java.lang.invoke.MethodHandles;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.Beds;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.IpdPharmaBillDao;

@Repository
public class IpdPharmaBillDaoImpl implements IpdPharmaBillDao{

	private static final Logger LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass().getSimpleName());
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);
	
	String autoLimitservices = (String) resourceBundleEhat.getString("autoLimitservices");
	Integer listLimit = Integer.parseInt(autoLimitservices);
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveOrUpdateBedMaster(ChargesMasterSlave chargesMasterSlave) {
		
		LOGGER.info("BedMasterDaoImpl method saveOrUpdateBedMaster called");
		int	records = 0; 
		try {
			
			int slaveId = chargesMasterSlave.getSlaveId();
			if (slaveId > 0) {
				
				ChargesMasterSlave objChargesSlave = (ChargesMasterSlave) sessionFactory.getCurrentSession().get(ChargesMasterSlave.class, slaveId);
				if(objChargesSlave.getCategoryName().equalsIgnoreCase(chargesMasterSlave.getCategoryName())) {
					
					sessionFactory.getCurrentSession().merge(chargesMasterSlave);
					records=2;
				}else {
					
					Query bet = sessionFactory.getCurrentSession().createQuery
							("SELECT count(*) FROM ChargesMasterSlave WHERE deleted='N' AND categoryName= :categoryName AND isCategory= :isCategory");
					bet.setParameter("categoryName", chargesMasterSlave.getCategoryName());
					bet.setParameter("isCategory", chargesMasterSlave.getIsCategory());
					long count =(Long) bet.uniqueResult();
				
					if (count == 0) {
						
						//Hibernate.initialize(chargesMasterSlave.getListBeds());
						//List<Beds> lstBeds = chargesMasterSlave.getListBeds();
						//chargesMasterSlave.setListBeds(lstBeds);
						sessionFactory.getCurrentSession().merge(chargesMasterSlave);
						records=2;
					}else{
						records=3;
					}
				}				
				
			}else {
				
				Query bet = sessionFactory.getCurrentSession().createQuery
						("SELECT count(*) FROM ChargesMasterSlave WHERE deleted='N' AND categoryName= :categoryName AND isCategory= :isCategory");
				bet.setParameter("categoryName", chargesMasterSlave.getCategoryName());
				bet.setParameter("isCategory", chargesMasterSlave.getIsCategory());
				long count =(Long) bet.uniqueResult();
			
				if (count == 0) {
					
					//Hibernate.initialize(chargesMasterSlave.getListBeds());
					//List<Beds> lstBeds = chargesMasterSlave.getListBeds();
					//chargesMasterSlave.setListBeds(lstBeds);
					sessionFactory.getCurrentSession().merge(chargesMasterSlave);
					records=1;
				}else{
					records=3;
				}
			}
			LOGGER.debug("Response--------> "+records);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return records;
		}
		return records;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<ChargesMasterSlave> getBedMasterList() {
		
		LOGGER.info("BedMasterDaoImpl method getBedMasterList called");
		List<ChargesMasterSlave> ltChargesSlave = new ArrayList<ChargesMasterSlave>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 2));
			criteria.addOrder(Order.desc("slaveId"));
			//criteria.setMaxResults(listLimit);
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
	public int deleteHallById(int hallId, HttpServletRequest request) {
		
		LOGGER.info("BedMasterDaoImpl method deleteHallById called");
		int	records = 0; 
		boolean isDeletable = true;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			ChargesMasterSlave hall = (ChargesMasterSlave) sessionFactory.getCurrentSession().get(ChargesMasterSlave.class, hallId);
			
			if(hall.getIsCategory().equalsIgnoreCase("Y")) {
				
				String sqlRef = "select count(*) from beds b where b.idbedstate=3 and b.Hall_ID in(select GROUP_CONCAT(id) as hallId from ehat_charges_master_slave cms where deleted='N' and isCategory ='N' and selfId="+hallId+")";
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				int bedCount = ((Number)refQuery.uniqueResult()).intValue();
				
				if(bedCount > 0)
					isDeletable = false;
			}else {
				
				for(Beds b : hall.getListBeds()) {
					
					if(b.getBedstate().equalsIgnoreCase("3"))
						isDeletable = false;
				}
			}
			
			if(isDeletable == true) {
				hall.setDeleted("Y");
				hall.setDeletedBy(userId);
				hall.setDeletedDate(new Date());
				
				records = 1;
			}else {
				
				records = 2;
			}
			
			LOGGER.debug("Response--------> "+records);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return records;
		}
		return records;
	}
	
	@Override
	public ChargesMasterSlave viewBedsOfHall(int hallId) {
		
		LOGGER.info("BedMasterDaoImpl method getBedMasterList called");
		ChargesMasterSlave objChargesSlave = null;
		try {
			//sessionFactory.getCurrentSession().enableFilter("filtDel").setParameter("deleted", "N");
			objChargesSlave = (ChargesMasterSlave) sessionFactory.getCurrentSession().get(ChargesMasterSlave.class, hallId);
			
			LOGGER.debug("Response--------> "+objChargesSlave);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return objChargesSlave;
		}
		return objChargesSlave;
	}
	
	@Override
	public int deleteBedById(int hallId, int bedId, HttpServletRequest request) {
		
		LOGGER.info("BedMasterDaoImpl method deleteBedById called");
		int	records = 0; 
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			
			Beds bed = (Beds) sessionFactory.getCurrentSession().get(Beds.class, bedId);
			String bedState = bed.getBedstate();
			if(!(bedState.equalsIgnoreCase("3"))) {
				
				bed.setDeleted("Y");
				//bed.setStatus("N");
				bed.setDeletedBy(userId);
				bed.setDeletedDate(new Date());
				
				ChargesMasterSlave hall = (ChargesMasterSlave) sessionFactory.getCurrentSession().get(ChargesMasterSlave.class, hallId);
				int noOfBeds = hall.getNoOfBeds();
				hall.setNoOfBeds(noOfBeds-1);
				records = 1;
			}else {
				
				records = 2;
			}
			LOGGER.debug("Response--------> "+records);
			
		} catch (Exception e) {
			
			e.printStackTrace();
			LOGGER.error(e.getMessage());
			return records;
		}
		return records;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<ChargesMasterSlave> autoSuggestionsubCharges(String letter) {
		
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 2));
			criteria.addOrder(Order.desc("slaveId"));
			criteria.add(Restrictions.like("categoryName", letter + "%"));
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltChargesSlave;
		}
		return ltChargesSlave;
	}
}
