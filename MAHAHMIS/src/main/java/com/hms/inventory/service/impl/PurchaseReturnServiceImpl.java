package com.hms.inventory.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseReturnDao;
import com.hms.inventory.dto.BatchStockDto;
import com.hms.inventory.dto.GoodReceiptNoteDto;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseReturnItemInfoDto;
import com.hms.inventory.dto.PurchaseReturnMasterDto;
import com.hms.inventory.service.PurchaseReturnService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class PurchaseReturnServiceImpl  implements PurchaseReturnService{

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private PurchaseReturnDao  purchasedao;
	
	@Override
	@Transactional
	public int savePurchaseReturnMaster(PurchaseReturnMasterDto purchaseObj,
			String itemInfoDtoDetails, String partyMasterContactInfoDtoDetails,
			String parytyMasterAddressInfoDtoDetails,HttpServletRequest request, Integer partyMasterId) {
		int reponse=0;
		try {		
			System.err.println("id..."+purchaseObj.getPurchaseReturnMasterId());
		if (purchaseObj.getPurchaseReturnMasterId() == 0) {
			
			HttpSession session = request.getSession(); 
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");				
			purchaseObj.setCreatedBy(userId); 
			purchaseObj.setUnitId(unitId);
			purchaseObj.setCreatedDate(new Date(new java.util.Date().getTime()));
			// this is for set Item info				
			PurchaseReturnItemInfoDto itemobj = (PurchaseReturnItemInfoDto) ConfigUIJSONUtility
					.getObjectFromJSON(itemInfoDtoDetails, PurchaseReturnItemInfoDto.class);	
			List<PurchaseReturnItemInfoDto> lstpurchaseiteminfo = itemobj.getLstpurchasereturnitemInfoDto();
			purchaseObj.setLstpurchasereturnitemInfoDto(lstpurchaseiteminfo);

			
			for(PurchaseReturnItemInfoDto probj:lstpurchaseiteminfo){
			String	batchCode=probj.getItembatchCode();
			Date batchExpDate=probj.getExpiryDate();
			System.err.println("batchExpDate..."+batchExpDate);
			
			DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd"); 
			//String newdate= "";
		if(batchExpDate!=null) {	
			//newdate = dateFormat.format(batchExpDate);  
		}
	        
			Integer itemMasterId=probj.getItemMasterId();
			System.err.println("batchCode..."+batchCode);
			System.err.println("batchExpDate..."+batchExpDate);
			System.err.println("itemMasterId..."+itemMasterId);
			//System.err.println("newdate..."+newdate);

			Integer total=0;
				if(batchCode.equalsIgnoreCase("null") ||batchCode.equalsIgnoreCase(null) ||batchCode.equals("")){
					Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
					
					criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
					BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
					Integer cuurentBatchStock=bobj.getItemQuantity();
					total=cuurentBatchStock-probj.getItemQuantity();
					bobj.setItemQuantity(total);
					sessionFactory.getCurrentSession().merge(bobj);
					}else{
						Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
						criteria.add(Restrictions.eq("itemBatchCode", batchCode));
						criteria.add(Restrictions.eq("itemBatchExpDate", batchExpDate));
						criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
						BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
						System.err.println("bobj..."+bobj);
						Integer cuurentBatchStock=bobj.getItemQuantity();
						System.err.println("current stock..."+cuurentBatchStock);
						total=cuurentBatchStock-probj.getItemQuantity();
						bobj.setItemQuantity(total);
						sessionFactory.getCurrentSession().merge(bobj);
					}
						
			}
			
			
			
			
			PartyMasterDto pobj=(PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);

			// this is for set contact info
			PartyMasterContactInfoDto pcotactobj = (PartyMasterContactInfoDto) ConfigUIJSONUtility
					.getObjectFromJSON(partyMasterContactInfoDtoDetails,PartyMasterContactInfoDto.class);
			
			List<PartyMasterContactInfoDto> lstpurchasecontact = pcotactobj.getPartyMasterContactInfoDto();
			//purchaseObj.setPartyMasterContactInfoDto(lstpurchasecontact);
			
			// this is for set address info
			PartyMasterAddressInfoDto paddobj = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
					.getObjectFromJSON(parytyMasterAddressInfoDtoDetails, PartyMasterAddressInfoDto.class);	
			
			List<PartyMasterAddressInfoDto> lstpurchaseadd = paddobj.getPartyMasterAddressInfoDto();
			pobj.setPartyMasterContactInfoDto(lstpurchasecontact);
			pobj.setPartyMasterAddressInfoDto(lstpurchaseadd);
			
			/*Integer id=(Integer) sessionFactory.getCurrentSession().save(partyMasterDto);
			PartyMasterDto masterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, id);*/
			
			//purchasedao.savePartyMaster(pobj);
			purchaseObj.setPartymasterdto(pobj);
			reponse=purchasedao.savePurchaseReturnMaster(purchaseObj);
			
			return reponse;
			
		} else {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			purchaseObj.setUpdatedBy(userId);
			purchaseObj.setUnitId(unitId);
			purchaseObj.setUpdatedDate(new Date(new java.util.Date()
					.getTime()));
			
			PurchaseReturnItemInfoDto itemobj = (PurchaseReturnItemInfoDto) ConfigUIJSONUtility
					.getObjectFromJSON(itemInfoDtoDetails, PurchaseReturnItemInfoDto.class);	
			List<PurchaseReturnItemInfoDto> lstpurchaseiteminfo = itemobj.getLstpurchasereturnitemInfoDto();
			purchaseObj.setLstpurchasereturnitemInfoDto(lstpurchaseiteminfo);
			// this is for term and condition info
//			PurchaseQuotationTermAndConditionDto ptermobj = (PurchaseQuotationTermAndConditionDto) ConfigUIJSONUtility
//					.getObjectFromJSON(purchaeQuotationTermAndConditionInfoDtoDetails, PurchaseQuotationTermAndConditionDto.class);	
//			
//			List<PurchaseQuotationTermAndConditionDto> lstpurchaseterm = ptermobj.getLstpurcaseTermConditionInfoDto();
//			purchaseObj.setLstpurcaseTermConditionInfoDto(lstpurchaseterm);
			
			
			for(PurchaseReturnItemInfoDto probj:lstpurchaseiteminfo){
				String	batchCode=probj.getItembatchCode();
				Date batchExpDate=probj.getExpiryDate();
				Integer itemMasterId=probj.getItemMasterId();
				System.err.println("batchCode..."+batchCode);
				System.err.println("batchExpDate..."+batchExpDate);
				System.err.println("itemMasterId..."+itemMasterId);
				DateFormat dateFormat = new SimpleDateFormat("yyyy-mm-dd"); 
				
				//String newdate = dateFormat.format(batchExpDate);  

				Integer total=0;
					if(batchCode.equalsIgnoreCase("null") ||batchCode.equalsIgnoreCase(null) ||batchCode.equals("")){
						Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
						
						criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
						BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
						Integer cuurentBatchStock=bobj.getItemQuantity();
						total=cuurentBatchStock-probj.getItemQuantity();
						bobj.setItemQuantity(total);
						sessionFactory.getCurrentSession().merge(bobj);
						}else{
							Criteria criteria=	 sessionFactory.getCurrentSession().createCriteria(BatchStockDto.class);
							criteria.add(Restrictions.eq("itemBatchCode", batchCode));
							criteria.add(Restrictions.eq("itemBatchExpDate", batchExpDate));
							criteria.add(Restrictions.eq("itemMasterId", itemMasterId));
							BatchStockDto bobj = (BatchStockDto)criteria.uniqueResult();
							Integer cuurentBatchStock=bobj.getItemQuantity();
							
							PurchaseReturnMasterDto masterDto = (PurchaseReturnMasterDto) sessionFactory.getCurrentSession().get(PurchaseReturnMasterDto.class, purchaseObj.getPurchaseReturnMasterId());
							Double totalItemQty = masterDto.getTotalItem();
							Double itemQuantity = Double.valueOf(probj.getItemQuantity());
							double totalQty =0;
							
							if(totalItemQty<itemQuantity) {
								
								Double finalQuantity = itemQuantity - totalItemQty;
								totalQty = cuurentBatchStock + finalQuantity;
							}
							else if(totalItemQty>itemQuantity) {
								Double finalQuantity = totalItemQty - itemQuantity;
								totalQty = cuurentBatchStock + finalQuantity;
							}
							
							total = (int) totalQty;
							//total=cuurentBatchStock-probj.getItemQuantity();
							bobj.setItemQuantity(total);
							sessionFactory.getCurrentSession().merge(bobj);
						}
							
				}
			
			
			
			PartyMasterDto pobj=(PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);

			// this is for set contact info
			PartyMasterContactInfoDto pcotactobj = (PartyMasterContactInfoDto) ConfigUIJSONUtility
					.getObjectFromJSON(partyMasterContactInfoDtoDetails,PartyMasterContactInfoDto.class);
			
			List<PartyMasterContactInfoDto> lstpurchasecontact = pcotactobj.getPartyMasterContactInfoDto();
			//purchaseObj.setPartyMasterContactInfoDto(lstpurchasecontact);
			
			// this is for set address info
			PartyMasterAddressInfoDto paddobj = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
					.getObjectFromJSON(parytyMasterAddressInfoDtoDetails, PartyMasterAddressInfoDto.class);	
			
			List<PartyMasterAddressInfoDto> lstpurchaseadd = paddobj.getPartyMasterAddressInfoDto();
			pobj.setPartyMasterContactInfoDto(lstpurchasecontact);
			pobj.setPartyMasterAddressInfoDto(lstpurchaseadd);
			
			/*Integer id=(Integer) sessionFactory.getCurrentSession().save(partyMasterDto);
			PartyMasterDto masterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, id);*/
			
			//purchasedao.savePartyMaster(pobj);
			purchaseObj.setPartymasterdto(pobj);
			reponse=purchasedao.savePurchaseReturnMaster(purchaseObj);
			
			return reponse;
		}

	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
		return 0;
	}
		
		
	}

	@Override
	@Transactional
	public List<PurchaseReturnMasterDto> getAllPurchaseReturnMaster(HttpServletRequest request, Integer unitId, String call) {
		
		return purchasedao.getAllPurchaseReturnMaster(unitId, call);
	}

	@Override
	@Transactional
	public PurchaseReturnMasterDto editPurchaseReturnMaster(Integer pRId) {
		
		return purchasedao.editPurchaseReturnMaster(pRId);
	}

	@Override
	@Transactional
	public int updatePurchaseReturnContactMaster(PartyMasterContactInfoDto cobj, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		cobj.setUpdatedBy(userId);
		cobj.setUnitId(unitId);
		cobj.setUpdatedDate(new Date(new java.util.Date().getTime()));
		// TODO Auto-generated method stub
		return purchasedao.updatePReturnContactQuotationMaster(cobj);
	}

	@Override
	@Transactional
	public List<PartyMasterContactInfoDto> getAllPReturnContactInfo(HttpServletRequest request, Integer unitId,	Integer purchaseQtMasterId) {
		
		return purchasedao.getAllPReturnContactInfo(unitId, purchaseQtMasterId);
	}

	@Override
	@Transactional
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto cobj,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		cobj.setUpdatedBy(userId);
		cobj.setUnitId(unitId);
		cobj.setUpdatedDate(new Date(new java.util.Date().getTime()));
		return purchasedao.updatePurchaseAddressInfo(cobj);
	}

	@Override
	@Transactional
	public List<PartyMasterAddressInfoDto> getAllPReturnAddressInfo(HttpServletRequest request, Integer unitId,
			Integer purchaseQtMasterId) {
		
		return purchasedao.getAllPReturnAddressInfo(unitId, purchaseQtMasterId);
	}

	@Override
	@Transactional
	public boolean deletePurchaseReturnSlaveInfo(Integer purchaseSlaveId,Integer purchaseMasterId, String callFrom,
			HttpServletRequest request) {
		boolean isDeleted=false;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			if(callFrom.equalsIgnoreCase("deletecontact")){
				
				Query queryGeneral = sessionFactory	.getCurrentSession().createSQLQuery("update inv_party_master_contact_info_slave set deleted='Y',deleted_by="
				+ userId	+ ",delete_date_time=now() where id="	+ purchaseSlaveId ) ;
queryGeneral.executeUpdate();
				isDeleted = true;
			}else if(callFrom.equalsIgnoreCase("deleteaddress")){

				Query queryContact = sessionFactory	.getCurrentSession().createSQLQuery("update inv_party_master_address_info_slave set deleted='Y',deleted_by="
						+ userId+ ",delete_date_time=now() where id="+ purchaseSlaveId);
				queryContact.executeUpdate();
				isDeleted = true;
			}
			return isDeleted;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	@Transactional
	public boolean deletePurchaseReturnMaster(Integer pQId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	@Transactional
	public List<PurchaseReturnMasterDto> getPurchaseReturnMaster(String vendorName) {
		
		return purchasedao.getPurchaseReturnMaster(vendorName);
	}

	@Override
	@Transactional
	public PurchaseReturnMasterDto getPurchaseReturnMasterDetailsById(Integer pRId, Integer unitId) {
		// TODO Auto-generated method stub
		PurchaseReturnMasterDto pobj=(PurchaseReturnMasterDto) sessionFactory.getCurrentSession().get(PurchaseReturnMasterDto.class, pRId);

		return pobj;
	}
	
	@Override
	@Transactional
	public GoodReceiptNoteDto editGoodReceiptNote2(Integer goodReceiptNoteId,String call,HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchasedao.editGoodReceiptNote2(goodReceiptNoteId,call,request);
	}
	

}
