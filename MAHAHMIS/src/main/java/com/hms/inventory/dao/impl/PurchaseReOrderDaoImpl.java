package com.hms.inventory.dao.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.PurchaseReOrderDao;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.ItemPurchaseSlaveDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseReOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseReOrderDto;
import com.hms.inventory.dto.PurchaseReOrderItemSlaveDto;
import com.hms.inventory.dto.TermsAndConditionInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class PurchaseReOrderDaoImpl implements PurchaseReOrderDao{

	@Autowired
	SessionFactory sessionFactory;
	static Logger log=Logger.getLogger(PurchaseReOrderDaoImpl.class.getName());
	@Override
	public int uploadPurchaseReOrderDocument(String document,
			HttpServletRequest request) {
		int res = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			PurchaseReOrderDocUploadDto purchaseReOrderDocUploadDto = (PurchaseReOrderDocUploadDto) ConfigUIJSONUtility
					.getObjectFromJSON(document,
							PurchaseReOrderDocUploadDto.class);
			
			PurchaseReOrderDocUploadDto lstPurchaseReOrderDocUploadDto = purchaseReOrderDocUploadDto
					.getLstPurchaseReOrderDocUploadDto().get(0);

			if (lstPurchaseReOrderDocUploadDto.getId() == 0) {
				lstPurchaseReOrderDocUploadDto.setCreatedBy(userId);
				lstPurchaseReOrderDocUploadDto.setUnitId(unitId);
				lstPurchaseReOrderDocUploadDto.setDeleted("N");
				sessionFactory.getCurrentSession().merge(
						lstPurchaseReOrderDocUploadDto);
				res = 1;
			} else {
				lstPurchaseReOrderDocUploadDto.setUpdatedBy(userId);
				lstPurchaseReOrderDocUploadDto.setDeleted("N");
				lstPurchaseReOrderDocUploadDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(
						lstPurchaseReOrderDocUploadDto);
				res = 2;
			}
		} catch (Exception e) {
			log.error("error for uploadPurchaseReOrderDocument...." + e.getMessage());
			e.printStackTrace();
			return res;
		}
		return res;
	}
	@Override
	public PurchaseReOrderDocUploadDto getUploadedDocuments(
			Integer proMasterId, HttpServletRequest request) {

		List<PurchaseReOrderDocUploadDto> list = new ArrayList<PurchaseReOrderDocUploadDto>();
		PurchaseReOrderDocUploadDto purchaseReOrderDocUploadDto = new PurchaseReOrderDocUploadDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseReOrderDocUploadDto.class);
			criteria.add(Restrictions.eq("purchaseOrderId", proMasterId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));

			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if (list.size() > 0) {
				purchaseReOrderDocUploadDto
						.setLstPurchaseReOrderDocUploadDto(list);
			}
		} catch (Exception e) {
			log.error("error for getUploadedDocuments...." + e.getMessage());
			e.printStackTrace();
		}
		return purchaseReOrderDocUploadDto;

	}
	@Override
	public boolean deletePurchaseReOrderItemInfoSlave(String itemSlaveId,
			HttpServletRequest request) {
		boolean isDeleted=false;
		try{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update inv_purchase_reorder_item_slave set deleted='Y',deleted_by="
						+ userId	+ ",delete_date_time=now() where id in("+itemSlaveId+")");
						itemInfo.executeUpdate();
						isDeleted = true;
			
		}catch(Exception e){
			e.printStackTrace();
			return isDeleted;
		}
		return isDeleted;
	}
	@Override
	public boolean deletePurchaseReOrder(Integer id, HttpServletRequest request) {
		try {
			PurchaseReOrderDto purchaseReOrderDto = (PurchaseReOrderDto) sessionFactory
					.getCurrentSession().get(PurchaseReOrderDto.class, id);
			purchaseReOrderDto.setDeleted("Y");
			purchaseReOrderDto.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			purchaseReOrderDto.setDeleted_by(userId);
			
			Query queryPurchase = sessionFactory.getCurrentSession().createSQLQuery("update inv_purchase_reorder_item_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where purchase_reorder_master_id="+id);
			queryPurchase.executeUpdate();
			
			sessionFactory.getCurrentSession().merge(purchaseReOrderDto);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	@Override
	public PurchaseReOrderDto autoFillSearchPurchaseReOrder(String supplierName) {
		PurchaseReOrderDto purchaseReOrderDto = new PurchaseReOrderDto();
		List<PurchaseReOrderDto> purchaseReOrderDtos = new ArrayList<PurchaseReOrderDto> ();
		try {
			String sql = "SELECT po.id AS id,po.supplier_name " +
					"AS supplier_name,po.created_date_time as created_date_time, po.is_po_used  FROM inv_purchase_reorder_new po where po.supplier_name like '"+supplierName+"%' " +
					"and po.deleted='N' limit 20";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				PurchaseReOrderDto obj = new PurchaseReOrderDto();
				obj.setSupplierName((String)row.get("supplier_name"));
				obj.setId((Integer)row.get("id"));
				obj.setCreatedDateTime((Date)row.get("created_date_time"));
				obj.setIsPoUsed((String)row.get("is_po_used"));
				purchaseReOrderDtos.add(obj);		    	
			}
			purchaseReOrderDto.setPurchaseReOrderDtos(purchaseReOrderDtos);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return purchaseReOrderDto;
	}
	@Override
	public PurchaseReOrderDto editPurchaseReOrder(Integer id) {
		PurchaseReOrderDto purchaseReOrderDto = new PurchaseReOrderDto();
		PartyMasterDto partyMasterDto =  new PartyMasterDto();
		List<PartyMasterAddressInfoDto> partyMasterAddressInfoDtos = new ArrayList<PartyMasterAddressInfoDto>();
		List<PartyMasterContactInfoDto> partyMasterContactInfoDtos = new ArrayList<PartyMasterContactInfoDto>();
		List<TermsAndConditionInfoDto> partyMasterTermsAndCondition = new ArrayList<TermsAndConditionInfoDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseReOrderDto.class);
			criteria.add(Restrictions.eq("id",id));
			purchaseReOrderDto = (PurchaseReOrderDto) criteria.uniqueResult();
			
			List<PurchaseReOrderItemSlaveDto> slaveDtos = new ArrayList<PurchaseReOrderItemSlaveDto>();
			for(PurchaseReOrderItemSlaveDto purchaseReOrderItemSlaveDto : purchaseReOrderDto.getPurchaseReOrderItemSlaveDto()){
				if(purchaseReOrderItemSlaveDto.getDeleted().equalsIgnoreCase("N")){
					slaveDtos.add(purchaseReOrderItemSlaveDto);
				}
			}
			
			partyMasterDto=(PartyMasterDto) purchaseReOrderDto.getPartyMasterDtos();
			for (PartyMasterAddressInfoDto partyMasterAddressInfoDto : partyMasterDto.getPartyMasterAddressInfoDto()) {
				if(partyMasterAddressInfoDto.getDeleted().equalsIgnoreCase("N")){
					partyMasterAddressInfoDtos.add(partyMasterAddressInfoDto);
				}
				
			}
			for (PartyMasterContactInfoDto partyMasterContactInfoDto : partyMasterDto.getPartyMasterContactInfoDto()) {
				if(partyMasterContactInfoDto.getDeleted().equalsIgnoreCase("N")){
					partyMasterContactInfoDtos.add(partyMasterContactInfoDto);
				}
				
			}
			
			for(TermsAndConditionInfoDto t : partyMasterDto.getTermsAndConditionInfoDto()){
				 if(t.getDeleted().equalsIgnoreCase("N")){
					 partyMasterTermsAndCondition.add(t);
				 }
			}
			
			partyMasterDto.setPartyMasterAddressInfoDto(partyMasterAddressInfoDtos);
			partyMasterDto.setPartyMasterContactInfoDto(partyMasterContactInfoDtos);
			partyMasterDto.setTermsAndConditionInfoDto(partyMasterTermsAndCondition);
			purchaseReOrderDto.setPartyMasterDtos(partyMasterDto);
			purchaseReOrderDto.setPurchaseReOrderItemSlaveDto(slaveDtos);
			return purchaseReOrderDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseReOrderDto;
	}
	@Override
	public List<PurchaseReOrderDto> getAllPurchaseReOrderRecords(
			HttpServletRequest request) {
		List<PurchaseReOrderDto> purchaseReOrderDtos=new ArrayList<PurchaseReOrderDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PurchaseReOrderDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			purchaseReOrderDtos = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return purchaseReOrderDtos;
	}
	@Override
	public int updatePartyAddressPRODetails(
			PartyMasterAddressInfoDto partyMasterAddressInfoDto,
			HttpServletRequest request) {
		sessionFactory.getCurrentSession().merge(partyMasterAddressInfoDto);
		return 1;	
	}
	@Override
	public int updatePartyContactPRODetails(
			PartyMasterContactInfoDto partyMasterContactInfoDto,
			HttpServletRequest request) {
		sessionFactory.getCurrentSession().merge(partyMasterContactInfoDto);
		return 1;	
	}
	@Override
	public PartyMasterAddressInfoDto editPartyAddressPROSlave(Integer id) {
		PartyMasterAddressInfoDto partyMasterAddressInfoDto = new PartyMasterAddressInfoDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PartyMasterAddressInfoDto.class);
			criteria.add(Restrictions.eq("id",id));
			partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) criteria.uniqueResult();
			return partyMasterAddressInfoDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return partyMasterAddressInfoDto;
	}
	@Override
	public PartyMasterContactInfoDto editPartyContactPROSlave(Integer id) {
		PartyMasterContactInfoDto partyMasterContactInfoDto = new PartyMasterContactInfoDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PartyMasterContactInfoDto.class);
			criteria.add(Restrictions.eq("id",id));
			partyMasterContactInfoDto = (PartyMasterContactInfoDto) criteria.uniqueResult();
			return partyMasterContactInfoDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return partyMasterContactInfoDto;
	}
	@Override
	public int[] savePurchaseReOrder(PurchaseReOrderDto purchaseReOrderDto,
			String purchaseReOrderItemSlaveDetails,
			String purchaseReOrderPartyContactDetails, Integer partyMasterId,
			String purchaseReOrderPartyAddressDetails,
			String partyMasterTermsAndConditionInfoDtoDetails,
			HttpServletRequest request) {
			System.out.println(purchaseReOrderItemSlaveDetails);
			int[] status = new int[2];
			try {
					if(purchaseReOrderDto.getId() == 0)	{
						PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);
		
						PurchaseReOrderItemSlaveDto purchaseReOrderItemSlaveDto = (PurchaseReOrderItemSlaveDto) ConfigUIJSONUtility
								.getObjectFromJSON(purchaseReOrderItemSlaveDetails, PurchaseReOrderItemSlaveDto.class);
						List<PurchaseReOrderItemSlaveDto> purchaseReOrderItemSlaveDtos = purchaseReOrderItemSlaveDto.getLstPurchaseReOrderItemSlaveDto();
						if(purchaseReOrderItemSlaveDto.getLstPurchaseReOrderItemSlaveDto() !=null){
							for (PurchaseReOrderItemSlaveDto purchaseReOrderItemSlaveDto2 : purchaseReOrderItemSlaveDto.getLstPurchaseReOrderItemSlaveDto()) {
								if(purchaseReOrderItemSlaveDto2.getItem_master_id() !=null && purchaseReOrderItemSlaveDto2.getItem_master_id() !=0){
									ItemMasterDto itemMasterDto = (ItemMasterDto) sessionFactory.getCurrentSession().get(ItemMasterDto.class, purchaseReOrderItemSlaveDto2.getItem_master_id());
									itemMasterDto.setIsReordered("Y");
									sessionFactory.getCurrentSession().merge(itemMasterDto);
								}
							}
						}
						PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
								.getObjectFromJSON(purchaseReOrderPartyContactDetails, PartyMasterContactInfoDto.class);
						List<PartyMasterContactInfoDto> partyMasterContactInfoDtos = partyMasterContactInfoDto.getPartyMasterContactInfoDto();
						
						PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
								.getObjectFromJSON(purchaseReOrderPartyAddressDetails, PartyMasterAddressInfoDto.class);
						List<PartyMasterAddressInfoDto> partyMasterAddressInfoDtos = partyMasterAddressInfoDto.getPartyMasterAddressInfoDto();
						
						
						TermsAndConditionInfoDto termcondition = (TermsAndConditionInfoDto) ConfigUIJSONUtility
								.getObjectFromJSON(partyMasterTermsAndConditionInfoDtoDetails, TermsAndConditionInfoDto.class);
						List<TermsAndConditionInfoDto> lsttermcondition = termcondition.getTermsAndConditionInfoDto();
		
						partyMasterDto.setPartyMasterContactInfoDto(partyMasterContactInfoDtos);
						partyMasterDto.setPartyMasterAddressInfoDto(partyMasterAddressInfoDtos);
						partyMasterDto.setTermsAndConditionInfoDto(lsttermcondition);
						purchaseReOrderDto.setPurchaseReOrderItemSlaveDto(purchaseReOrderItemSlaveDtos);
						purchaseReOrderDto.setPartyMasterDtos(partyMasterDto);
						
						
						PurchaseReOrderDto dto = (PurchaseReOrderDto) sessionFactory.getCurrentSession().merge(purchaseReOrderDto);
						Integer masterId = dto.getId();
						status[0] = 1;
						status[1] = masterId;
						return status;
					}else{
						
						PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);
		
						PurchaseReOrderItemSlaveDto purchaseReOrderItemSlaveDto = (PurchaseReOrderItemSlaveDto) ConfigUIJSONUtility
								.getObjectFromJSON(purchaseReOrderItemSlaveDetails, PurchaseReOrderItemSlaveDto.class);
						HttpSession session = request.getSession();
						Integer userId = (Integer) session.getAttribute("userId1");
						Integer unitId = (Integer) session.getAttribute("uId");
						purchaseReOrderItemSlaveDto.setCreatedBy(userId);
						purchaseReOrderItemSlaveDto.setUnitId(unitId);
						//purchaseOrderItemSlaveDto
						List<PurchaseReOrderItemSlaveDto> purchaseReOrderItemSlaveDtos = purchaseReOrderItemSlaveDto.getLstPurchaseReOrderItemSlaveDto();
						
						PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
								.getObjectFromJSON(purchaseReOrderPartyContactDetails, PartyMasterContactInfoDto.class);
						List<PartyMasterContactInfoDto> partyMasterContactInfoDtos = partyMasterContactInfoDto.getPartyMasterContactInfoDto();
						
						PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
								.getObjectFromJSON(purchaseReOrderPartyAddressDetails, PartyMasterAddressInfoDto.class);
						List<PartyMasterAddressInfoDto> partyMasterAddressInfoDtos = partyMasterAddressInfoDto.getPartyMasterAddressInfoDto();
						
						TermsAndConditionInfoDto termcondition = (TermsAndConditionInfoDto) ConfigUIJSONUtility
								.getObjectFromJSON(partyMasterTermsAndConditionInfoDtoDetails, TermsAndConditionInfoDto.class);
						List<TermsAndConditionInfoDto> lsttermcondition = termcondition.getTermsAndConditionInfoDto();
		
						partyMasterDto.setPartyMasterContactInfoDto(partyMasterContactInfoDtos);
						partyMasterDto.setPartyMasterAddressInfoDto(partyMasterAddressInfoDtos);
						partyMasterDto.setTermsAndConditionInfoDto(lsttermcondition);
						purchaseReOrderDto.setPurchaseReOrderItemSlaveDto(purchaseReOrderItemSlaveDtos);
						purchaseReOrderDto.setPartyMasterDtos(partyMasterDto);
						
						
						PurchaseReOrderDto dto = (PurchaseReOrderDto) sessionFactory.getCurrentSession().merge(purchaseReOrderDto);
						Integer masterId = dto.getId();
						status[0] = 2;
						status[1] = masterId;
						return status;
					}
				//return 1;
			} catch (Exception e) {
				e.printStackTrace();
				status[0] = 0;
				status[1] = 0;
				return status;
			}
	}
	@Override
	public ItemMasterDto searchByItemMasterId(Integer id,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(
			Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public List<ItemMasterDto> getAllItemStockBelowMinimunLevel(
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		List<ItemMasterDto> lstItemMasterDto = new ArrayList<ItemMasterDto>();
		
		try {

			String sql = " SELECT " +
					"itemMaster.id, " +
					"itemMaster.item_name, " +
					"itemMaster.reorder_stock as reorderStock, " +
					"itemMaster.max_stock as maxStock," +
					"itemMaster.order_stock as orderStock," +
					"itemMaster.is_reordered as isReordered," +
					"itemMaster.status as status," + 
					"itemMaster.gst_code as gstCode," + 
					"itemMaster.hsn_name as hsnName," + 
					"itemMaster.hsn_name_value as hsnNameValue," + 
					"itemMaster.cgst as cgst," + 
					"itemMaster.sgst as sgst," + 
					"itemMaster.tax_name as taxName," + 
					"itemMaster.tax_rate as taxRate," + 
					"FLOOR(SUM(batchStock.item_quantity)) AS item_quantity " +
					"FROM inv_item_master_new itemMaster " +
					"INNER JOIN inv_batch_stock_new batchStock " +
					"ON batchStock.item_master_id=itemMaster.id " +
					"INNER JOIN inv_item_purchase_slave purchaseSlave " +
					"ON purchaseSlave.item_master_id=itemMaster.id " +
					"WHERE batchStock.deleted='N' AND itemMaster.deleted='N' AND purchaseSlave.deleted='N' AND batchStock.unit_id="+unitId+" AND itemMaster.unit_id="+unitId+" group by itemMaster.id Having SUM(batchStock.item_quantity) < itemMaster.reorder_stock";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				ItemMasterDto pm = new ItemMasterDto();
				List<ItemPurchaseSlaveDto> lstitemPurchaseSlaveDto = new ArrayList<ItemPurchaseSlaveDto>();
				String sql1 = "";
				sql1 = "select * from inv_item_purchase_slave where item_master_id='"+(Integer) row.get("id")+"' AND deleted='N' order by id desc";
				SQLQuery getMaster1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				getMaster1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listPurchase = getMaster1.list();	
				for(Map<String, Object> row1 : listPurchase){

					ItemPurchaseSlaveDto obj = new ItemPurchaseSlaveDto();	
					obj.setId((Integer)row1.get("id"));
					obj.setPurchaseUnitPrice1((Double)row1.get("purchase_unit_price_1"));
					obj.setPurchaseUnitPrice2((Double)row1.get("purchase_unit_price_2"));
					obj.setPurchaseUnitPrice3((Double)row1.get("purchase_unit_price_3"));
					obj.setPurchaseUnitPrice4((Double)row1.get("purchase_unit_price_4"));
					obj.setPurchaseUomFactor1((Integer)row1.get("purchase_uom_factor_1"));
					obj.setPurchaseUomFactor2((Integer)row1.get("purchase_uom_factor_2"));
					obj.setPurchaseUomFactor3((Integer)row1.get("purchase_uom_factor_3"));
					obj.setPurchaseUomFactor4((Integer)row1.get("purchase_uom_factor_4"));
					obj.setUomUnitOneName((String)row1.get("uom_unit_one_name"));
					obj.setUomUnitTwoName((String)row1.get("uom_unit_two_name"));
					obj.setUomUnitThreeName((String)row1.get("uom_unit_three_name"));
					obj.setUomUnitFourName((String)row1.get("uom_unit_four_name"));
					obj.setPurchaseFactorUom1((Integer)row1.get("purchase_factor_uom_1"));
					obj.setPurchaseFactorUom2((Integer)row1.get("purchase_factor_uom_2"));
					obj.setPurchaseFactorUom3((Integer)row1.get("purchase_factor_uom_3"));
					obj.setPurchaseFactorUom4((Integer)row1.get("purchase_factor_uom_4"));
					lstitemPurchaseSlaveDto.add(obj);
					obj=null;
				}
				pm.setId((Integer) row.get("id"));
				pm.setItemName((String) row.get("item_name"));
				pm.setMaxStock((Integer) row.get("reorderStock"));
				pm.setReorderStock((Integer) row.get("maxStock"));
				pm.setOrderStock((Integer) row.get("orderStock"));
				pm.setStatus((String) row.get("status"));
				pm.setGstCode((String) row.get("gstCode"));
				pm.setHsnName((String) row.get("hsnName"));
				pm.setHsnNameValue((String) row.get("hsnNameValue"));
				pm.setSgst((Float) row.get("sgst"));
				pm.setCgst((Float) row.get("cgst"));
				pm.setTaxName((String) row.get("taxName"));
				pm.setTaxRate((Float) row.get("taxRate"));
				pm.setCurrentSubInventoryStock((BigDecimal) row.get("item_quantity"));
				pm.setIsReordered((String) row.get("isReordered"));
				pm.setItemPurchaseSlaveDto(lstitemPurchaseSlaveDto);
				lstItemMasterDto.add(pm);
				pm=null;
			}
				
			}catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return lstItemMasterDto;
		
	}
	
	
}
