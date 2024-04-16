package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.StockTransferDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.MrnMasterDTO;
import com.hms.inventory.dto.MrnMasterItemInfoDTO;
import com.hms.inventory.dto.StockTransferItemInfoDTO;
import com.hms.inventory.dto.StockTransferMasterDTO;

@Repository
public class StockTransferDaoImpl implements StockTransferDao {
	static Logger log=Logger.getLogger(StockTransferDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int savestockTransperMaster(StockTransferMasterDTO sobj) {
		try {
					
					sessionFactory.getCurrentSession().merge(sobj);
					return 1;
						
				} catch (Exception e) {
					log.error("error for saving savestockTransperMaster....",e);
					e.printStackTrace();
					return 0;
				}	
	}

	@Override
	public StockTransferMasterDTO editstockTransperMaster(Integer stockId,Integer unitId) {
		StockTransferMasterDTO pobj = new StockTransferMasterDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(StockTransferMasterDTO.class);
			criteria.add(Restrictions.eq("stockId", stockId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (StockTransferMasterDTO) criteria.uniqueResult();

			List<StockTransferItemInfoDTO> lstitem=new ArrayList<StockTransferItemInfoDTO>();

		
			

			for (StockTransferItemInfoDTO iobj : pobj.getLststocktrasiteminfo()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N") ){
					 lstitem.add(iobj);
					 
				 }
				
			}
			
			
			
			//pobj.setLstpurcaseTermConditionInfoDto(lstterm);
			pobj.setLststocktrasiteminfo(lstitem);
			
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  editstockTransperMaster....",e);
			//e.printStackTrace();
			return null;
			}
	}

	@Override
	public MrnMasterDTO reviewPurchaseRequestMasterForSTO(Integer mrnId,Integer unitId) {
		MrnMasterDTO pobj = new MrnMasterDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("mrnId", mrnId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (MrnMasterDTO) criteria.uniqueResult();

			//List<PurchaseQuotationTermAndConditionDto> lstterm=new ArrayList<PurchaseQuotationTermAndConditionDto>();
			List<MrnMasterItemInfoDTO> lstitem=new ArrayList<MrnMasterItemInfoDTO>();
			
			List<BatchStockDto> lstbatchcode=new ArrayList<BatchStockDto>();

		
			

			for (MrnMasterItemInfoDTO iobj : pobj.getLstMrniteminfo()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N") && iobj.getItemStoStatus().equalsIgnoreCase("Y")){
					 lstitem.add(iobj);
					 lstbatchcode= getBatchStockInfoOfItem(iobj.getItemMasterId());
					 System.err.println("batchode lenght...."+lstbatchcode.size());
					 pobj.setLstbatchcode(lstbatchcode);
					 
				 }
				
			}
		
			pobj.setLstMrniteminfo(lstitem);
			
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  reviewPurchaseRequestMasterForSTO....",e);
			//e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<StockTransferMasterDTO> getAllStockId(Integer subInvId) {
		List<StockTransferMasterDTO> lststock = new ArrayList<StockTransferMasterDTO>();
		try {
			String sql = "SELECT d.stock_id,si.subinventory_name FROM inv_stock_transper_master d inner join inv_stock_transper_item_info si on(d.stock_id=si.stock_id) where d.deleted='N' and d.subinventory_id="+subInvId;

			SQLQuery getMaster = sessionFactory.getCurrentSession()	.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				StockTransferMasterDTO st = new StockTransferMasterDTO();
				
				st.setStockId((Integer) row.get("stock_id"));
				st.setReceiveSubInvName((String) row.get("subinventory_name"));
				lststock.add(st);
				st=null;
			}
			

		} catch (Exception e) {
			log.error("error for  getAllStockId....",e);

			//e.printStackTrace();
			return null;
		}
		return lststock;
	}

	@Override
	public MrnMasterDTO reviewPurchaseRequestMasterForPO(Integer mrnId,	Integer unitId) {
		MrnMasterDTO pobj = new MrnMasterDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(MrnMasterDTO.class);
			criteria.add(Restrictions.eq("mrnId", mrnId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (MrnMasterDTO) criteria.uniqueResult();

			//List<PurchaseQuotationTermAndConditionDto> lstterm=new ArrayList<PurchaseQuotationTermAndConditionDto>();
			List<MrnMasterItemInfoDTO> lstitem=new ArrayList<MrnMasterItemInfoDTO>();

		
			

			for (MrnMasterItemInfoDTO iobj : pobj.getLstMrniteminfo()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N") && iobj.getItemPoStatus().equalsIgnoreCase("Y")){
					 lstitem.add(iobj);
					 
				 }
				
			}
		
			pobj.setLstMrniteminfo(lstitem);
			
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  reviewPurchaseRequestMasterForPO....",e);
			//e.printStackTrace();
			return null;
		}
	}
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

	/*added for getting info about item batch stock info */
	 public List<BatchStockDto> getBatchStockInfoOfItem(Integer itemId){
		System.err.println("itemId..."+itemId);
		 List<BatchStockDto> listitem=new ArrayList<BatchStockDto>();
		 String sql="";
		 try{
		 sql="SELECT  si.id,si.item_batch_code from inv_batch_stock_new as  si where si.deleted='N' and si.current_sub_inventory_stock > 0 and si.item_master_id="+itemId ;
		 Query spDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);			
		   spDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		   
		   @SuppressWarnings("unchecked")
			List<Map<String, Object>> listSpDetails = spDetailsQuery.list();			
			for(Map<String, Object> row : listSpDetails){	    	
				BatchStockDto obj = new BatchStockDto();	    	
			    	
			   	    obj.setId((Integer)row.get("id"));
			   	 obj.setItemBatchCode((String)row.get("item_batch_code"));
				
				
			   	listitem.add(obj);
	          	obj=null;	    	
			}
			
		 }catch(Exception e){
			 e.printStackTrace();
			 return null;
		 }
		 return listitem;
		 
	 }

	@Override
	public int savestockTransperItemSlave(StockTransferItemInfoDTO sobj) {
		try {
			
			sessionFactory.getCurrentSession().merge(sobj);
			return 1;
				
		} catch (Exception e) {
			log.error("error for saving savestockTransperMaster....",e);
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public int savesBatchStockInfo(BatchStockDto bobj) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<StockTransferMasterDTO> getAllStockMasterForView(Integer unitId) {
		List<StockTransferMasterDTO> lststockMaster=new ArrayList<StockTransferMasterDTO>();
		try
		{
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(StockTransferMasterDTO.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("itemAcceptStatus", "Y"));
		lststockMaster=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
			log.error("error for  getAllStockMasterForView....",e);

		}
	
		return lststockMaster;
	}

	@Override
	public StockTransferMasterDTO viewstockTransperMaster(Integer stockId,Integer unitId) {
		StockTransferMasterDTO pobj = new StockTransferMasterDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(StockTransferMasterDTO.class);
			criteria.add(Restrictions.eq("stockId", stockId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (StockTransferMasterDTO) criteria.uniqueResult();

			//List<PurchaseQuotationTermAndConditionDto> lstterm=new ArrayList<PurchaseQuotationTermAndConditionDto>();
			List<StockTransferItemInfoDTO> lstitem=new ArrayList<StockTransferItemInfoDTO>();

		
			

			for (StockTransferItemInfoDTO iobj : pobj.getLststocktrasiteminfo()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N")){
					 lstitem.add(iobj);
					 
				 }
				
			}
		
			pobj.setLststocktrasiteminfo(lstitem);
			
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  viewstockTransperMaster....",e);
			//e.printStackTrace();
			return null;
		}
	}
}
