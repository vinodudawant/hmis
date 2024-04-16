package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.PurchaseRequestDao;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;
import com.hms.inventory.dto.ProcessPurchaseOrderDTO;

@Repository
public class PurchaseRequestDaoImpl implements PurchaseRequestDao{
	static Logger log=Logger.getLogger(PurchaseRequestDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int savePurchaseRequestMaster(MrnMasterDTO mrnobj) {
		try {
			
			if(mrnobj.getMrnId()==0){
				
				sessionFactory.getCurrentSession().merge(mrnobj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(mrnobj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("error for saving savePurchaseRequestMaster....",e);
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<MrnMasterDTO> getAllPurchaseRequestMaster(Integer unitId,String call) {
		
		List<MrnMasterDTO> lstpurchasereuest = new ArrayList<MrnMasterDTO>();

		try{
			if(call.equalsIgnoreCase("open")){
				
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("mrnRejectionStatus", "N"));
			criteria.add(Restrictions.eq("mrnReviewStatus", "N"));
			criteria.add(Restrictions.eq("mrnpurchaseRequestStatus", "Y"));
			criteria.addOrder(Order.desc("mrnId"));
			lstpurchasereuest = criteria.list();
			}else if(call.equalsIgnoreCase("close")){
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.eq("mrnReviewStatus", "Y"));
				criteria.addOrder(Order.desc("mrnId"));
				lstpurchasereuest = criteria.list();
				
				
				
			}else if(call.equalsIgnoreCase("rejection")){				
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.eq("mrnRejectionStatus", "Y"));
				criteria.addOrder(Order.desc("mrnId"));
				lstpurchasereuest = criteria.list();
				
			}else if(call.equalsIgnoreCase("po")){				
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.eq("itemPoStatus", "Y"));
				criteria.addOrder(Order.desc("mrnId"));
				lstpurchasereuest = criteria.list();
				
			}else if(call.equalsIgnoreCase("so")){				
				
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.eq("itemStoStatus", "Y"));
				criteria.addOrder(Order.desc("mrnId"));
				lstpurchasereuest = criteria.list();
				
			}
			
		}catch(Exception e){
			log.error("error for  getAllPurchaseRequestMaster....",e);
			return null;
			
		}
		System.err.println("lstpurchasereuest........"+lstpurchasereuest);
		return lstpurchasereuest;
	}

	@Override
	public boolean rejectPurchaseRequestMaster(MrnMasterDTO mrnobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(mrnobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
		}

	@Override
	public MrnMasterDTO reviewPurchaseRequestMaster(Integer mrnId) {
		MrnMasterDTO pobj = new MrnMasterDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("mrnId", mrnId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (MrnMasterDTO) criteria.uniqueResult();

			//List<PurchaseQuotationTermAndConditionDto> lstterm=new ArrayList<PurchaseQuotationTermAndConditionDto>();
			List<MrnMasterItemInfoDTO> lstitem=new ArrayList<MrnMasterItemInfoDTO>();
			List<MrnMasterItemInfoDTO> lstforsubinventoryInfo=new ArrayList<MrnMasterItemInfoDTO>();


		
			

			for (MrnMasterItemInfoDTO iobj : pobj.getLstMrniteminfo()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N")){
					 lstitem.add(iobj);
					 lstforsubinventoryInfo= getListForSubInventoryInfo(iobj.getItemMasterId(),pobj.getMrnSubinventoryId());
					 pobj.setLstforsubInventoryInfo(lstforsubinventoryInfo);
					 
				 }
				
			}
			
			
			
			//pobj.setLstpurcaseTermConditionInfoDto(lstterm);
			pobj.setLstMrniteminfo(lstitem);
			
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  reviewPurchaseRequestMaster....",e);
			//e.printStackTrace();
			return null;
		}
	}

	@Override
	public int saveProcessPurchaseOrderMaster(ProcessPurchaseOrderDTO pobj) {
		try {
			
			sessionFactory.getCurrentSession().merge(pobj);
			return 1;
				
		} catch (Exception e) {
			log.error("error for saving saveProcessPurchaseOrderMaster....",e);
			e.printStackTrace();
			return 0;
		}	
	}
	/*added for getting info about subinventory */
 public List<MrnMasterItemInfoDTO> getListForSubInventoryInfo(Integer itemId,Integer masterSubInvId){
	
	 List<MrnMasterItemInfoDTO> listitem=new ArrayList<MrnMasterItemInfoDTO>();
	 String sql="";
	 try{
	 sql="SELECT  si.sub_inventory_id,si.sub_inventory_name,si.current_subinventory_stock from inv_mrn_master_new as  m  inner join inv_mrn_item_info_slave_new as si on(m.mrn_id = si.mrn_id) where si.deleted='N' and si.current_subinventory_stock > 0 and si.item_master_id="+itemId+" and si.sub_inventory_id not in("+masterSubInvId+")" ;
	 Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
	   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	   
	   @SuppressWarnings("unchecked")
		List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
		for(Map<String, Object> row : listSpDetails){	    	
			MrnMasterItemInfoDTO obj = new MrnMasterItemInfoDTO();	    	
		    	
		   	    obj.setSunInventoryId((Integer)row.get("sub_inventory_id"));
		   	 obj.setSubinventoryName((String)row.get("sub_inventory_name"));
		   	obj.setCurrentSubInventoryStock((Integer)row.get("current_subinventory_stock"));
			
			
		   	listitem.add(obj);
          	obj=null;	    	
		}
		
	 }catch(Exception e){
		 e.printStackTrace();
		 return null;
	 }
	 return listitem;
	 
 }
}
