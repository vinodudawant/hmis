package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.PurchaseReturnDao;
import com.hms.inventory.dto.BatchMasterDto;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.GoodReceiptNoteItemDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseReturnItemInfoDto;
import com.hms.inventory.dto.PurchaseReturnMasterDto;

@Repository
public class PurchaseReturnDaoImpl implements PurchaseReturnDao {
	static Logger log=Logger.getLogger(PurchaseReturnDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	GoodReceiptNoteDto goodReceiptNoteDto;
	
	@Override
	public int savePurchaseReturnMaster(PurchaseReturnMasterDto purchaseObj) {
		try {
			if(purchaseObj.getPurchaseReturnMasterId()==0){
				sessionFactory.getCurrentSession().merge(purchaseObj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(purchaseObj);
				return 2;				
			}
		} catch (Exception e) {
			log.error("error for saving savePurchaseReturnMaster....",e);
			//e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<PurchaseReturnMasterDto> getAllPurchaseReturnMaster(Integer unitId, String call) {
		List<PurchaseReturnMasterDto> lstpurchasereturn = new ArrayList<PurchaseReturnMasterDto>();

		try{
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseReturnMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.addOrder(Order.desc("purchaseReturnMasterId"));
			lstpurchasereturn = criteria.list();
		}catch(Exception e){
			log.error("error for  getAllPurchaseReturnMaster....",e);
			return null;
			
		}
		return lstpurchasereturn;
	}

	@SuppressWarnings("unchecked")
	@Override
	public PurchaseReturnMasterDto editPurchaseReturnMaster(Integer pRId) {
		PurchaseReturnMasterDto pobj = new PurchaseReturnMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseReturnMasterDto.class);
			criteria.add(Restrictions.eq("purchaseReturnMasterId", pRId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (PurchaseReturnMasterDto) criteria.uniqueResult();

			//List<PurchaseQuotationTermAndConditionDto> lstterm=new ArrayList<PurchaseQuotationTermAndConditionDto>();
			List<PurchaseReturnItemInfoDto> lstitem=new ArrayList<PurchaseReturnItemInfoDto>();

		
			
			

			for (PurchaseReturnItemInfoDto iobj : pobj.getLstpurchasereturnitemInfoDto()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N")){
					 lstitem.add(iobj);
					 
				 }
				 
//					check return any stock this item added by vishant
					if(iobj.getItembatchCode()!=null||(!iobj.getItembatchCode().equalsIgnoreCase(""))) {
							
							List<BatchStockDto> batchMasterDto = sessionFactory.getCurrentSession().
									createCriteria(BatchStockDto.class).
									//add(Restrictions.eq("batchMasterId", g.getBatchId())).
									add(Restrictions.eq("itemMasterId",iobj.getInventoryItemId())).
									add(Restrictions.eq("deleted", "N")).
									add(Restrictions.eq("itemBatchCode",iobj.getItembatchCode())).list();
							
							//g.setCurrentItemQty(batchMasterDto.get(0).getItemQuantity());
							//g.setItemQuantity(batchMasterDto.get(0).getIssueQuantity());
						if(batchMasterDto.size()>0) {	
							iobj.setAvailableQuantity(batchMasterDto.get(0).getItemQuantity());
						}
						else {
							iobj.setAvailableQuantity(iobj.getItemQuantity());
						}
					}
					else {
						iobj.setAvailableQuantity(iobj.getItemQuantity());
					}
				
			}
			
			PartyMasterDto partyob=pobj.getPartymasterdto();
			List<PartyMasterAddressInfoDto> lstpartyadd=new ArrayList<PartyMasterAddressInfoDto>();
			List<PartyMasterContactInfoDto> lstpartycontact=new ArrayList<PartyMasterContactInfoDto>();

			for (PartyMasterAddressInfoDto paobj : partyob.getPartyMasterAddressInfoDto()) {
				 if(paobj.getDeleted().equalsIgnoreCase("N")){
					 lstpartyadd.add(paobj);
					 
				 }
				
			}
			
			for (PartyMasterContactInfoDto pcobj : partyob.getPartyMasterContactInfoDto()) {
				 if(pcobj.getDeleted().equalsIgnoreCase("N")){
					 lstpartycontact.add(pcobj);
					 
				 }
				
			}
			
			partyob.setPartyMasterAddressInfoDto(lstpartyadd);
			partyob.setPartyMasterContactInfoDto(lstpartycontact);
			
			//pobj.setLstpurcaseTermConditionInfoDto(lstterm);
			pobj.setLstpurchasereturnitemInfoDto(lstitem);
			pobj.setPartymasterdto(partyob);
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  editPurchaseReturnMaster....",e);
			//e.printStackTrace();
			return null;
		}
	}

	@Override
	public int updatePReturnContactQuotationMaster(	PartyMasterContactInfoDto cobj) {
		try {			
			sessionFactory.getCurrentSession().merge(cobj);
			return 1;
		}	catch (Exception e) {
			log.error("error for  updatePReturnContactQuotationMaster....",e);

		//e.printStackTrace();
		return 0;
	}	
	}

	@Override
	public List<PartyMasterContactInfoDto> getAllPReturnContactInfo(Integer unitId, Integer purchaseQtMasterId) {
		List<PartyMasterContactInfoDto> lstPurchasecontact=new ArrayList<PartyMasterContactInfoDto>();
		String sql = "";
		try{

			sql = "select * from inv_party_master_contact_info_slave where unit_id='"+unitId+"' and deleted='N' and party_master_id='"+purchaseQtMasterId+"'order by id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listPurchase = getMaster.list();	
			for(Map<String, Object> row : listPurchase){

				PartyMasterContactInfoDto obj = new PartyMasterContactInfoDto();	
				obj.setId((Integer)row.get("id"));
				obj.setContactName((String)row.get("party_contact_info_name"));
				obj.setContactDesignation((String)row.get("party_contact_info_designation"));
				obj.setContactAddress((String)row.get("party_contact_info_address"));
				obj.setContactGender((String)row.get("party_contact_info_gender"));
				obj.setContactDob((String)row.get("party_contact_info_dob"));
				obj.setContactPhoneNumber1((String)row.get("party_contact_info_phone_number1"));
				obj.setContactPhoneNumber2((String)row.get("party_contact_info_phone_number2"));
				obj.setContactEmail((String)row.get("party_contact_info_email"));
				lstPurchasecontact.add(obj);
				obj=null;
			}


		}catch(Exception e){
			log.error("error for  getAllPReturnContactInfo....",e);
			//e.printStackTrace();
		}
		return lstPurchasecontact;
	}

	@Override
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto aobj) {
		try {					
					sessionFactory.getCurrentSession().merge(aobj);
					return 1;
				}	catch (Exception e) {
					log.error("error for  updatePurchaseAddressInfo....",e);
		
				//e.printStackTrace();
				return 0;
			}	
	}

	@Override
	public List<PartyMasterAddressInfoDto> getAllPReturnAddressInfo(Integer unitId, Integer purchaseQtMasterId) {
		List<PartyMasterAddressInfoDto> lstPurchaseadd=new ArrayList<PartyMasterAddressInfoDto>();
		String sql = "";
		try{

			sql = "select * from inv_party_master_address_info_slave where unit_id='"+unitId+"' and deleted='N' and party_master_id='"+purchaseQtMasterId+"'order by id desc";
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listPurchase = getMaster.list();	
			for(Map<String, Object> row : listPurchase){

				PartyMasterAddressInfoDto obj = new PartyMasterAddressInfoDto();	
				obj.setId((Integer)row.get("id"));
				obj.setAddressType((String)row.get("address_type"));
				obj.setCompanyName((String)row.get("company_name"));
				obj.setAddress((String)row.get("address"));
				obj.setStreet((String)row.get("street"));
				obj.setArea((String)row.get("area"));
				obj.setCity((String)row.get("city"));
				obj.setPin((String)row.get("pin"));
				obj.setState((String)row.get("state"));
				obj.setCountry((String)row.get("country"));
				lstPurchaseadd.add(obj);
				obj=null;
			}


		}catch(Exception e){
			log.error("error for  getAllPReturnAddressInfo....",e);
			//e.printStackTrace();
		}
		return lstPurchaseadd;
	}

	@Override
	public List<PurchaseReturnMasterDto> getPurchaseReturnMaster(String vendorName) {
		List<PurchaseReturnMasterDto> lstpurchaseobj = new ArrayList<PurchaseReturnMasterDto>();
		try {
			String sql = "SELECT d.purchase_return_id, d.supplier_name FROM inv_purchase_return_master_new d where d.supplier_name like '"+vendorName+"%' and d.deleted='N' limit 20 ";

			SQLQuery getMaster = sessionFactory.getCurrentSession()	.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				PurchaseReturnMasterDto pm = new PurchaseReturnMasterDto();
				pm.setSupplierName((String) row.get("supplier_name"));
				pm.setPurchaseReturnMasterId((Integer) row.get("purchase_return_id"));
				lstpurchaseobj.add(pm);
				pm=null;
			}
			

		} catch (Exception e) {
			log.error("error for  getPurchaseReturnMaster....",e);

			//e.printStackTrace();
			return null;
		}
		return lstpurchaseobj;
	}
	
	
	//added by vishant
	@SuppressWarnings("unchecked")
	@Override
	public GoodReceiptNoteDto editGoodReceiptNote2(Integer goodReceiptNoteId,
			String call, HttpServletRequest request) {
		// TODO Auto-generated method stub

		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterContactInfoDto> partyMsterContact = new ArrayList<PartyMasterContactInfoDto>();
		List<PartyMasterAddressInfoDto> partyMsterAddress = new ArrayList<PartyMasterAddressInfoDto>();

		List<GoodReceiptNoteItemDto> lstGoodReceiptNoteItemDto = new ArrayList<GoodReceiptNoteItemDto>();

		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");

		if (call.equalsIgnoreCase("draft")) {
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("id", goodReceiptNoteId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isDraft", "DRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				goodReceiptNoteDto = (GoodReceiptNoteDto) criteria
						.uniqueResult();
				partyMasterDto = (PartyMasterDto) goodReceiptNoteDto
						.getPartyMasterDto();

				for (PartyMasterContactInfoDto c : partyMasterDto
						.getPartyMasterContactInfoDto()) {
					if (c.getDeleted().equalsIgnoreCase("N")) {
						partyMsterContact.add(c);
					}
				}

				for (GoodReceiptNoteItemDto g : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
					if (g.getDeleted().equalsIgnoreCase("N")) {
						if(g.getBatchMasterDto() !=null){
							g.setBatchId(g.getBatchMasterDto().getId());
						}else{
							List<BatchMasterDto>  lstBatchMasterDto = checkBatchAvailability2(g.getItemBatchNo().trim(),g.getItemId(),request);
							g.setBatchId(lstBatchMasterDto.get(0).getId());
							
						}
						lstGoodReceiptNoteItemDto.add(g);
					}
				}

				for (PartyMasterAddressInfoDto a : partyMasterDto
						.getPartyMasterAddressInfoDto()) {
					if (a.getDeleted().equalsIgnoreCase("N")) {
						partyMsterAddress.add(a);
					}
				}

				partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
				goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);
				goodReceiptNoteDto
						.setLstGoodReceiptNoteItemDto(lstGoodReceiptNoteItemDto);
				
				
//				
				
				
				
				

				return goodReceiptNoteDto;
			} catch (Exception e) {
				log.error("error for editGoodReceiptNote...." + e.getMessage());
				return null;
			}
		} else  if(call.equalsIgnoreCase("PENDING")){
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("id", goodReceiptNoteId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isPending", "Y"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				goodReceiptNoteDto = (GoodReceiptNoteDto) criteria
						.uniqueResult();
				partyMasterDto = (PartyMasterDto) goodReceiptNoteDto
						.getPartyMasterDto();

				for (PartyMasterContactInfoDto c : partyMasterDto
						.getPartyMasterContactInfoDto()) {
					if (c.getDeleted().equalsIgnoreCase("N")) {
						partyMsterContact.add(c);
					}
				}

				for (PartyMasterAddressInfoDto a : partyMasterDto
						.getPartyMasterAddressInfoDto()) {
					if (a.getDeleted().equalsIgnoreCase("N")) {
						partyMsterAddress.add(a);
					}
				}
				
				for (GoodReceiptNoteItemDto g : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
					if (g.getDeleted().equalsIgnoreCase("N")) {
						if(g.getBatchMasterDto() !=null){
							g.setBatchId(g.getBatchMasterDto().getId());
						}else{
							List<BatchMasterDto>  lstBatchMasterDto = checkBatchAvailability2(g.getItemBatchNo().trim(),g.getItemId(),request);
							g.setBatchId(lstBatchMasterDto.get(0).getId());
						}
						lstGoodReceiptNoteItemDto.add(g);
					}
				}

				partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
				goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);
				goodReceiptNoteDto
				.setLstGoodReceiptNoteItemDto(lstGoodReceiptNoteItemDto);


				return goodReceiptNoteDto;
			} catch (Exception e) {
				log.error("error for editGoodReceiptNote...." + e.getMessage());
				return null;
			}
		}else{
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(GoodReceiptNoteDto.class);
				criteria.add(Restrictions.eq("id", goodReceiptNoteId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("isPending", "N"));
				criteria.add(Restrictions.eq("isDraft", "NODRAFT"));
				criteria.add(Restrictions.eq("unitId", unitId));
				goodReceiptNoteDto = (GoodReceiptNoteDto) criteria
						.uniqueResult();
				partyMasterDto = (PartyMasterDto) goodReceiptNoteDto
						.getPartyMasterDto();

				for (PartyMasterContactInfoDto c : partyMasterDto
						.getPartyMasterContactInfoDto()) {
					if (c.getDeleted().equalsIgnoreCase("N")) {
						partyMsterContact.add(c);
					}
				}

				for (PartyMasterAddressInfoDto a : partyMasterDto
						.getPartyMasterAddressInfoDto()) {
					if (a.getDeleted().equalsIgnoreCase("N")) {
						partyMsterAddress.add(a);
					}
				}
				
				for (GoodReceiptNoteItemDto g : goodReceiptNoteDto
						.getLstGoodReceiptNoteItemDto()) {
					if (g.getDeleted().equalsIgnoreCase("N")) {
						
						if(g.getBatchMasterDto() !=null){
							g.setBatchId(g.getBatchMasterDto().getId());
							
						}else{
							List<BatchMasterDto>  lstBatchMasterDto = checkBatchAvailability2(g.getItemBatchNo().trim(),g.getItemId(),request);
							g.setBatchId(lstBatchMasterDto.get(0).getId());
						}
						
//				check return any stock this item added by vishant
					if(g.getBatchId()!=null) {
						
						List<BatchStockDto> batchMasterDto = sessionFactory.getCurrentSession().
								createCriteria(BatchStockDto.class).
								add(Restrictions.eq("batchMasterId", g.getBatchId())).
								add(Restrictions.eq("itemMasterId", g.getItemId())).
								add(Restrictions.eq("deleted", "N")).
								add(Restrictions.eq("itemBatchCode", g.getBatchMasterDto().getItemBatchCode())).list();
						
						//g.setCurrentItemQty(batchMasterDto.get(0).getItemQuantity());
						//g.setItemQuantity(batchMasterDto.get(0).getIssueQuantity());
					if(batchMasterDto.size()>0) {	
						g.setAvailableQuantity(batchMasterDto.get(0).getItemQuantity());
					}
					else {
						g.setAvailableQuantity(g.getCurrentItemQty());
					}
						
						
						
						/*
						 * List<PurchaseReturnItemInfoDto> list =
						 * sessionFactory.getCurrentSession().createCriteria(PurchaseReturnItemInfoDto.
						 * class).
						 * add(Restrictions.eq("itembatchCode",batchMasterDto.getItemBatchCode())).
						 * add(Restrictions.eq("deleted", "N")) .add(Restrictions.eq("inventoryItemId",
						 * g.getItemId())).list();
						 */
					}
						
						
						
						lstGoodReceiptNoteItemDto.add(g);
					}
				}

				partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
				partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
				goodReceiptNoteDto.setPartyMasterDto(partyMasterDto);
				goodReceiptNoteDto
				.setLstGoodReceiptNoteItemDto(lstGoodReceiptNoteItemDto);


				return goodReceiptNoteDto;
			} catch (Exception e) {
				log.error("error for editGoodReceiptNote...." + e.getMessage());
				return null;
			}
		}

	}
	
	//@Override
	public List<BatchMasterDto> checkBatchAvailability2(String batchCode,
			Integer itemMasterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<BatchMasterDto> batchMasters = new ArrayList<BatchMasterDto>();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BatchMasterDto.class);
			criteria.add(Restrictions.eq("unitId", unitId));
			if (batchCode != null) {
				criteria.add(Restrictions.eq("itemBatchCode", batchCode));
			}
			if (itemMasterId != null) {
				criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
			}
			ProjectionList proList = Projections.projectionList();
			proList.add(Projections.property("id"));

			proList.add(Projections.property("itemBatchCode"));
			proList.add(Projections.property("itemBatchExpDate"));
			criteria.setProjection(proList);

			List<Object[]> result = criteria.list();
			for (Object row[] : result) {
				BatchMasterDto batchMaster = new BatchMasterDto();
				if (row[0] != null) {
					batchMaster.setId(Integer.parseInt(row[0].toString()));
				} else {
					batchMaster.setId(0);
				}
				if (row[1] != null) {
					batchMaster.setItemBatchCode(row[1].toString());
				} else {
					batchMaster.setItemBatchCode("-");
				}
				if (row[2] != null) {
					batchMaster.setItemBatchExpDate((Date) row[2]);
				} else {
					batchMaster.setItemBatchExpDate(null);
				}
				batchMasters.add(batchMaster);
			}

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for checkBatchAvailability...." + e.getMessage());
			return batchMasters;
		}
		return batchMasters;

	}
	
	public PurchaseReturnMasterDto fetchPurchaseReturnByGRNID(Integer grnId){
		
		
		return null;
		
	}

}
