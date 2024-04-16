package com.hms.ipd.daoimpl;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ipd.dao.IPDManagementDAO;
import com.hms.ipd.dto.DischargeSummaryListDTO;
import com.hms.ipd.dto.DischargeSummaryListDTO2;
import com.hms.ipd.dto.OTTypeDTO;
import com.hms.ipd.dto.OperatianSummaryListDTO;

@Repository
public class IPDManagementDAOImpl implements IPDManagementDAO{

	private static final Logger LOG=Logger.getLogger(IPDManagementDAOImpl.class.getName());
	
	@Autowired
	private SessionFactory sessionFactory;
	
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getAvailableBed(int unitId) {
		
		LOG.info("IPDManagementDAOImpl method getAvailableBed called. ");
		List<ChargesMasterSlave> listHall=new ArrayList<>();
		List<ChargesMasterSlave> listHallparent=new ArrayList<>();
		List<ChargesMasterSlave> finallistHall=new ArrayList<>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
		//criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("selfId", 0));
		criteria.add(Restrictions.eq("chargesMasterDto", 2));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("isCategory", "Y"));
		
		listHallparent=	criteria.list();
		
		
		/*
		 * for(ChargesMasterSlave obj :listHall ) { if(obj.getSelfId()==0) {
		 * listHallparent.add(obj); }
		 * 
		 * }
		 */
		
		//listHallparent=listHall.stream().filter(x-> x.getSelfId()==0 && x.getIsCategory().equalsIgnoreCase("N") && x.getDeleted().equalsIgnoreCase("N") && x.getChargesMasterDto() ==0 ).collect(Collectors.toList());
		
		for(ChargesMasterSlave obj    :listHallparent ) {
			int totalBeds=0;
			int allocateBedCount=0;
			int finalallocateBedCount=0;
			int cleaningCount=0;
			int finalcleaningCount=0;
			   List<ChargesMasterSlave> chall=new ArrayList<>();
			  Criteria c= sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			  c.add(Restrictions.eq("selfId", obj.getSlaveId()));
			  c.add(Restrictions.eq("deleted", "N"));
			  chall=  c.list();
			  System.out.println("length  chall=== "+chall.size());
			   for( ChargesMasterSlave cobj : chall) {
				   String sql="select count(*) from beds where Hall_ID="+cobj.getSlaveId()+" and idbedstate='3' ";
					String sql1="select count(*) from beds where Hall_ID="+cobj.getSlaveId()+" and idbedstate='2' ";
					
					SQLQuery q			=sessionFactory.getCurrentSession().createSQLQuery(sql);
		              allocateBedCount= ((Number) q.uniqueResult()).intValue();
		              finalallocateBedCount=finalallocateBedCount+allocateBedCount;
		              
		              SQLQuery qc=sessionFactory.getCurrentSession().createSQLQuery(sql1);
		              cleaningCount=((Number) qc.uniqueResult()).intValue();
		             
		              finalcleaningCount=finalcleaningCount+cleaningCount;
		              
		              totalBeds=totalBeds+cobj.getNoOfBeds();
		             
		              
		            
			   }
			      
			   obj.setNoOfBeds(totalBeds);
			  int deacllocate =totalBeds-(finalallocateBedCount+finalcleaningCount);
			  obj.setAllocateCount(finalallocateBedCount);
              obj.setDeallocateCount(deacllocate);
              obj.setCleaningCount(cleaningCount);
			   finallistHall.add(obj);
			
			
             
		}
		LOG.info("Hall List size is:" + listHall.size());
		}catch(Exception e){
			e.printStackTrace();
			LOG.error("defaultViewDoctorSpeciality....."+e);

		}
		return finallistHall;
	}

	@Override
	public List<DischargeSummaryListDTO> dischargeSummaryList() {
		LOG.info("IPDManagementDAOImpl method dischargeSummaryList called. ");
		Session session = sessionFactory.openSession();
		try {
			
			Query storedPro = session.createSQLQuery("call sp_get_discharge_summary_list()");
			storedPro.setResultTransformer(new AliasToBeanResultTransformer(DischargeSummaryListDTO2.class));
			@SuppressWarnings("unchecked")
			List<DischargeSummaryListDTO> lstPrefix = storedPro.list();	
			LOG.info("DischargeSummaryList List size:"+ lstPrefix.size());
			session.flush();
			session.close();
			return lstPrefix;
			
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("dischargeSummaryList....."+e);
			return null;
		}	
	}



	@Override
	public List<OperatianSummaryListDTO> operatianSummaryList() {
		LOG.info("IPDManagementDAOImpl method operatianSummaryList called. ");
		Session session = sessionFactory.openSession();
		try {
			
			Query storedPro = session.createSQLQuery("call operatian_summary_list()");
			storedPro.setResultTransformer(new AliasToBeanResultTransformer(OperatianSummaryListDTO.class));
			@SuppressWarnings("unchecked")
			List<OperatianSummaryListDTO> lstPrefix = storedPro.list();	
			LOG.info("OperatianSummaryListDTO List size:"+ lstPrefix.size());
			session.flush();
			session.close();
			return lstPrefix;
			
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error("OperatianSummaryListDTO....."+e);
			return null;
		}	
	}



	@SuppressWarnings("unchecked")
	@Override
	public List<OTTypeDTO> fetchOTName() {
		LOG.info("IPDManagementDAOImpl method fetchOTName called. ");
		List<OTTypeDTO> list=new ArrayList<>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(OTTypeDTO.class);
		criteria.add(Restrictions.eq("status", "Y"));
		list=	criteria.list();
		LOG.info("OT Type size is:" + list.size());
		}catch(Exception e){
			e.printStackTrace();
			LOG.error("fetchOTName....."+e);
		}
		return list;
	
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<ChargesMasterSlave> getBedStacticsData(Integer unitId) {
		
		List<ChargesMasterSlave> listHall=new ArrayList<>();
		List<ChargesMasterSlave> listHallparent=new ArrayList<>();
		List<ChargesMasterSlave> finallistHall=new ArrayList<>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
		//criteria.add(Restrictions.eq("unitId", unitId));
		criteria.add(Restrictions.eq("chargesMasterDto", 2));
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("isCategory", "N"));
		
		listHallparent=	criteria.list();
		
		
			
		for(ChargesMasterSlave obj    :listHallparent ) {
			int totalBeds=0;
			int allocateBedCount=0;
			int finalallocateBedCount=0;
			int cleaningCount=0;
			int finalcleaningCount=0;
			   List<ChargesMasterSlave> chall=new ArrayList<>();
			  Criteria c= sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			  c.add(Restrictions.eq("selfId", obj.getSlaveId()));
			  c.add(Restrictions.eq("deleted", "N"));
			  chall=  c.list();
			  System.out.println("length  chall=== "+chall.size());
			   for( ChargesMasterSlave cobj : chall) {
				   String sql="select count(*) from beds where Hall_ID="+cobj.getSlaveId()+" and idbedstate='3' ";
					String sql1="select count(*) from beds where Hall_ID="+cobj.getSlaveId()+" and idbedstate='2' ";
					
					SQLQuery q			=sessionFactory.getCurrentSession().createSQLQuery(sql);
		              allocateBedCount= ((Number) q.uniqueResult()).intValue();
		              finalallocateBedCount=finalallocateBedCount+allocateBedCount;
		              
		              SQLQuery qc=sessionFactory.getCurrentSession().createSQLQuery(sql1);
		              cleaningCount=((Number) qc.uniqueResult()).intValue();
		             
		              finalcleaningCount=finalcleaningCount+cleaningCount;
		              
		              totalBeds=totalBeds+cobj.getNoOfBeds();
		             
		              
		            
			   }
			      
			   obj.setNoOfBeds(totalBeds);
			  int deacllocate =totalBeds-(finalallocateBedCount+finalcleaningCount);
			  obj.setAllocateCount(finalallocateBedCount);
              obj.setDeallocateCount(deacllocate);
              obj.setCleaningCount(cleaningCount);
			   finallistHall.add(obj);
			
			
             
		}
		LOG.info("Hall List size is:" + listHall.size());
		}catch(Exception e){
			e.printStackTrace();
			LOG.error("defaultViewDoctorSpeciality....."+e);
		}
		return finallistHall;
		
	}
}