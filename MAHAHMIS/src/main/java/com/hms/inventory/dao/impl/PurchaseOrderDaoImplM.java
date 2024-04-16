package com.hms.inventory.dao.impl;

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

import com.hms.inventory.dao.PurchaseOrderDaoM;
import com.hms.inventory.dto.ItemMaintenanceSlaveDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseOrderDocUploadDto;
import com.hms.inventory.dto.PurchaseOrderDto;
import com.hms.inventory.dto.PurchaseOrderItemSlaveDto;
import com.hms.inventory.dto.PurchaseQuotationMasterDto;
import com.hms.inventory.dto.TermsAndConditionInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class PurchaseOrderDaoImplM implements PurchaseOrderDaoM{

	@Autowired
	SessionFactory sessionFactory;
	static Logger log=Logger.getLogger(PurchaseOrderDaoImplM.class.getName());
	
	/**
	 * 
	 */
	@Override
	public ItemMasterDto searchByItemMasterId(Integer id,
			HttpServletRequest request) {
		ItemMasterDto lstItemMaster=new ItemMasterDto();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(ItemMasterDto.class);
			criteria.add(Restrictions.eq("id",id));
			lstItemMaster=	(ItemMasterDto) criteria.uniqueResult();
			}
		 catch (Exception e) {
				e.printStackTrace();
		}
		return lstItemMaster;
	}

	/**
	 * 
	 */
	@Override
	public int[] savePurchaseOrder(PurchaseOrderDto purchaseOrderDto,
			String purchaseOrderItemSlaveDetails,String purchaseOrderPartyContactDetails,
			Integer partyMasterId,String purchaseOrderPartyAddressDetails,String partyMasterTermsAndConditionInfoDtoDetails,HttpServletRequest request
			) {
		int[] status = new int[2];
		try {
			if(purchaseOrderDto.getId() == 0)
			{
				System.out.println("purchaseObj slave lsit"+purchaseOrderItemSlaveDetails);
				PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);

				PurchaseOrderItemSlaveDto purchaseOrderItemSlaveDto = (PurchaseOrderItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseOrderItemSlaveDetails, PurchaseOrderItemSlaveDto.class);
				List<PurchaseOrderItemSlaveDto> purchaseOrderItemSlaveDtos = purchaseOrderItemSlaveDto.getLstPurchaseOrderItemSlaveDto();
				
				PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseOrderPartyContactDetails, PartyMasterContactInfoDto.class);
				List<PartyMasterContactInfoDto> partyMasterContactInfoDtos = partyMasterContactInfoDto.getPartyMasterContactInfoDto();
				
				PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseOrderPartyAddressDetails, PartyMasterAddressInfoDto.class);
				List<PartyMasterAddressInfoDto> partyMasterAddressInfoDtos = partyMasterAddressInfoDto.getPartyMasterAddressInfoDto();
				
				
				TermsAndConditionInfoDto termcondition = (TermsAndConditionInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(partyMasterTermsAndConditionInfoDtoDetails, TermsAndConditionInfoDto.class);
				List<TermsAndConditionInfoDto> lsttermcondition = termcondition.getTermsAndConditionInfoDto();

				partyMasterDto.setPartyMasterContactInfoDto(partyMasterContactInfoDtos);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMasterAddressInfoDtos);
				partyMasterDto.setTermsAndConditionInfoDto(lsttermcondition);
				purchaseOrderDto.setPurchaseOrderItemSlaveDto(purchaseOrderItemSlaveDtos);
				purchaseOrderDto.setPartyMasterDtos(partyMasterDto);
				Integer purchaseQuotationId = 0;
				if (purchaseOrderDto.getGetQuotation()!= null
						&& purchaseOrderDto.getPurchaseQuotationNumber() != ""
						&& Integer.parseInt(purchaseOrderDto
								.getGetQuotation()) != 0) {
					purchaseQuotationId = Integer.parseInt(purchaseOrderDto.getGetQuotation());
					PurchaseQuotationMasterDto purchaseQuotationDto = (PurchaseQuotationMasterDto) sessionFactory
							.getCurrentSession()
							.get(PurchaseQuotationMasterDto.class, purchaseQuotationId);
					purchaseQuotationDto.setIsPqUsed("Y");
					sessionFactory.getCurrentSession().merge(
							purchaseQuotationDto);
				}
				
				PurchaseOrderDto dto = (PurchaseOrderDto) sessionFactory.getCurrentSession().merge(purchaseOrderDto);
				Integer masterId = dto.getId();
				status[0] = 1;
				status[1] = masterId;
				return status;
			}
			else{
				
				PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);

				PurchaseOrderItemSlaveDto purchaseOrderItemSlaveDto = (PurchaseOrderItemSlaveDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseOrderItemSlaveDetails, PurchaseOrderItemSlaveDto.class);
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				purchaseOrderItemSlaveDto.setCreatedBy(userId);
				purchaseOrderItemSlaveDto.setUnitId(unitId);
				//purchaseOrderItemSlaveDto
				List<PurchaseOrderItemSlaveDto> purchaseOrderItemSlaveDtos = purchaseOrderItemSlaveDto.getLstPurchaseOrderItemSlaveDto();
				
				PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseOrderPartyContactDetails, PartyMasterContactInfoDto.class);
				List<PartyMasterContactInfoDto> partyMasterContactInfoDtos = partyMasterContactInfoDto.getPartyMasterContactInfoDto();
				
				PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaseOrderPartyAddressDetails, PartyMasterAddressInfoDto.class);
				List<PartyMasterAddressInfoDto> partyMasterAddressInfoDtos = partyMasterAddressInfoDto.getPartyMasterAddressInfoDto();
				
				TermsAndConditionInfoDto termcondition = (TermsAndConditionInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(partyMasterTermsAndConditionInfoDtoDetails, TermsAndConditionInfoDto.class);
				List<TermsAndConditionInfoDto> lsttermcondition = termcondition.getTermsAndConditionInfoDto();

				partyMasterDto.setPartyMasterContactInfoDto(partyMasterContactInfoDtos);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMasterAddressInfoDtos);
				partyMasterDto.setTermsAndConditionInfoDto(lsttermcondition);
				purchaseOrderDto.setPurchaseOrderItemSlaveDto(purchaseOrderItemSlaveDtos);
				purchaseOrderDto.setPartyMasterDtos(partyMasterDto);
				
				Integer purchaseQuotationId = 0;
				if (purchaseOrderDto.getGetQuotation()!= null
						&& purchaseOrderDto.getPurchaseQuotationNumber() != ""
						&& Integer.parseInt(purchaseOrderDto
								.getGetQuotation()) != 0) {
					purchaseQuotationId = Integer.parseInt(purchaseOrderDto.getGetQuotation());
					PurchaseQuotationMasterDto purchaseQuotationDto = (PurchaseQuotationMasterDto) sessionFactory
							.getCurrentSession()
							.get(PurchaseQuotationMasterDto.class, purchaseQuotationId);
					purchaseQuotationDto.setIsPqUsed("Y");
					sessionFactory.getCurrentSession().merge(
							purchaseQuotationDto);
				}
				
				PurchaseOrderDto dto = (PurchaseOrderDto) sessionFactory.getCurrentSession().merge(purchaseOrderDto);
				Integer masterId = dto.getId();
				status[0] = 1;
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

	/**
	 * 
	 */
	@Override
	public PartyMasterContactInfoDto editPartyContactPOSlave(Integer id) {
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
	/**
	 * 
	 */
	@Override
	public int updatePartyContactPODetails(
			PartyMasterContactInfoDto partyMasterContactInfoDto) {
		sessionFactory.getCurrentSession().merge(partyMasterContactInfoDto);
		return 1;	
	}
	/**
	 * 
	 */
	@Override
	public int updatePartyAddressPODetails(
			PartyMasterAddressInfoDto partyMasterAddressInfoDto) {
		sessionFactory.getCurrentSession().merge(partyMasterAddressInfoDto);
		return 1;	

	}
	/**
	 * 
	 */
	@Override
	public PartyMasterAddressInfoDto editPartyAddressPOSlave(Integer id) {
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
	public List<PurchaseOrderDto> getAllPurchaseOrderRecords() {
		List<PurchaseOrderDto> purchaseOrderDtos=new ArrayList<PurchaseOrderDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(PurchaseOrderDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.desc("id"));
			purchaseOrderDtos=	criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}
		return purchaseOrderDtos;
	}

	@Override
	public PurchaseOrderDto editPurchaseOrder(Integer id) {
		PurchaseOrderDto purchaseOrderDto = new PurchaseOrderDto();
		PartyMasterDto partyMasterDto =  new PartyMasterDto();
		List<PartyMasterAddressInfoDto> partyMasterAddressInfoDtos = new ArrayList<PartyMasterAddressInfoDto>();
		List<PartyMasterContactInfoDto> partyMasterContactInfoDtos = new ArrayList<PartyMasterContactInfoDto>();
		List<TermsAndConditionInfoDto> partyMasterTermsAndCondition = new ArrayList<TermsAndConditionInfoDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseOrderDto.class);
			criteria.add(Restrictions.eq("id",id));
			purchaseOrderDto = (PurchaseOrderDto) criteria.uniqueResult();
			
			List<PurchaseOrderItemSlaveDto> slaveDtos = new ArrayList<PurchaseOrderItemSlaveDto>();
			for(PurchaseOrderItemSlaveDto purchaseOrderItemSlaveDto : purchaseOrderDto.getPurchaseOrderItemSlaveDto()){
				if(purchaseOrderItemSlaveDto.getDeleted().equalsIgnoreCase("N")){
					slaveDtos.add(purchaseOrderItemSlaveDto);
				}
			}
			
			partyMasterDto=(PartyMasterDto) purchaseOrderDto.getPartyMasterDtos();
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
			purchaseOrderDto.setPartyMasterDtos(partyMasterDto);
			purchaseOrderDto.setPurchaseOrderItemSlaveDto(slaveDtos);
			return purchaseOrderDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return purchaseOrderDto;
	}
	/**
	 * @author Rohit Sandbhor
	 * @since 02-12-2019
	 * @comment This method is created for to get auto fill search on item master by passing item name as parameter
	 * @param itemName
	 * @return
	 */
	@Override
	public PurchaseOrderDto autoFillSearchPurchaseOrder(String supplierName) {
		PurchaseOrderDto purchaseOrderDto = new PurchaseOrderDto();
		List<PurchaseOrderDto> purchaseOrderDtos = new ArrayList<PurchaseOrderDto> ();
		try {
			String sql = "SELECT po.id AS id,po.supplier_name " +
					"AS supplier_name, po.created_date_time as created_date_time, po.is_po_used FROM inv_purchase_order_new po where po.supplier_name like '"+supplierName+"%' " +
					"and po.deleted='N' limit 20";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				PurchaseOrderDto obj = new PurchaseOrderDto();
				obj.setSupplierName((String)row.get("supplier_name"));
				obj.setId((Integer)row.get("id"));
				obj.setIsPoUsed((String)row.get("is_po_used"));
				obj.setCreatedDateTime((Date)row.get("created_date_time"));
				purchaseOrderDtos.add(obj);
				
			}
			purchaseOrderDto.setPurchaseOrderDtos(purchaseOrderDtos);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return purchaseOrderDto;
	}

	@Override
	public boolean deletePurchaseOrder(Integer id, HttpServletRequest request) {
		try {
			PurchaseOrderDto purchaseOrderDto = (PurchaseOrderDto) sessionFactory
					.getCurrentSession().get(PurchaseOrderDto.class, id);
			purchaseOrderDto.setDeleted("Y");
			purchaseOrderDto.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			purchaseOrderDto.setDeleted_by(userId);
			
			Query queryPurchase = sessionFactory.getCurrentSession().createSQLQuery("update inv_purchase_order_item_slave set deleted='Y',deleted_by="+userId+",delete_date_time=now() where purchase_order_master_id="+id);
			queryPurchase.executeUpdate();
			
			sessionFactory.getCurrentSession().merge(purchaseOrderDto);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean deletePurchaseOrderItemInfoSlave(String itemSlaveId,
			HttpServletRequest request) {
		boolean isDeleted=false;
		try{
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update inv_purchase_order_item_slave set deleted='Y',deleted_by="
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
	public ItemMaintenanceSlaveDto getMaintenanceDetailsByItemMasterId(
			Integer masterId, HttpServletRequest request) {
		ItemMaintenanceSlaveDto obj = new ItemMaintenanceSlaveDto();
		try {
			String sql = "SELECT im.id AS id,im.warranty_with_product " +
					"AS warranty_with_product,im.warranty_with_product_duration,im.amccmc_free_text_duration AS amccmc_free_text_duration,im.amc_cmc_duration as amc_cmc_duration,im.preventive_maintenance_free_text_duration as preventive_maintenance_free_text_duration,im.preventive_maintenance_duration as preventive_maintenance_duration FROM inv_item_maintenance_slave im where im.item_master_id = '"+masterId+"%' " +
					"and im.deleted='N'";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
			for(Map<String, Object> row : masterRow){
				obj.setWarrantyWithProduct((String)row.get("warranty_with_product"));
				obj.setWarrantyWithProductDuration((Integer)row.get("warranty_with_product_duration"));
				obj.setAmccmcFreeTextDuration((Integer)row.get("amccmc_free_text_duration"));
				obj.setAmccmcDuration((String)row.get("amc_cmc_duration"));
				obj.setPreventiveMaintenanceFreeTextDuration((Integer)row.get("preventive_maintenance_free_text_duration"));
				obj.setPreventiveMaintenanceDuration((String)row.get("preventive_maintenance_duration"));
				obj.setMaintenanceId((Integer)row.get("id"));
			}
		} catch (Exception e) {
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int uploadPurchaseOrderDocument(String document,
			HttpServletRequest request) {
		int res = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			PurchaseOrderDocUploadDto purchaseOrderDocUploadDto = (PurchaseOrderDocUploadDto) ConfigUIJSONUtility
					.getObjectFromJSON(document,
							PurchaseOrderDocUploadDto.class);
			
			PurchaseOrderDocUploadDto lstPurchaseOrderDocUploadDto = purchaseOrderDocUploadDto
					.getLstPurchaseOrderDocUploadDto().get(0);

			if (lstPurchaseOrderDocUploadDto.getId() == 0) {
				lstPurchaseOrderDocUploadDto.setCreatedBy(userId);
				lstPurchaseOrderDocUploadDto.setUnitId(unitId);
				lstPurchaseOrderDocUploadDto.setDeleted("N");
				sessionFactory.getCurrentSession().merge(
						lstPurchaseOrderDocUploadDto);
				res = 1;
			} else {
				lstPurchaseOrderDocUploadDto.setUpdatedBy(userId);
				lstPurchaseOrderDocUploadDto.setDeleted("N");
				lstPurchaseOrderDocUploadDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(
						lstPurchaseOrderDocUploadDto);
				res = 2;
			}
		} catch (Exception e) {
			log.error("error for uploadPurchaseOrderDocument...." + e.getMessage());
			e.printStackTrace();
			return res;
		}
		return res;
	}

	@Override
	public PurchaseOrderDocUploadDto getUploadedDocuments(Integer poMasterId,
			HttpServletRequest request) {

		List<PurchaseOrderDocUploadDto> list = new ArrayList<PurchaseOrderDocUploadDto>();
		PurchaseOrderDocUploadDto purchaseOrderDocUploadDto = new PurchaseOrderDocUploadDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseOrderDocUploadDto.class);
			criteria.add(Restrictions.eq("purchaseOrderId", poMasterId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));

			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if (list.size() > 0) {
				purchaseOrderDocUploadDto
						.setLstPurchaseOrderDocUploadDto(list);
			}
		} catch (Exception e) {
			log.error("error for getUploadedDocuments...." + e.getMessage());
			e.printStackTrace();
		}
		return purchaseOrderDocUploadDto;

	}
}
