package com.hms.inventory.service.impl;

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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.inventory.dao.PurchaseQuotationDao;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseQuotationDocUploadDto;
import com.hms.inventory.dto.PurchaseQuotationIntemInfoDto;
import com.hms.inventory.dto.PurchaseQuotationMasterDto;
import com.hms.inventory.dto.PurchaseQuotationTermAndConditionDto;
import com.hms.inventory.dto.TermsAndConditionInfoDto;
import com.hms.inventory.dto.UnitMasterDTONew;
import com.hms.inventory.service.PurchaseQutationMasterService;
//import com.hms.ehat.dto.PurchaseQuotationTermAndConditionDto;
import com.hms.patient.util.ConfigUIJSONUtility;
@Service
public class PurchaseQuotationServiceImpl implements PurchaseQutationMasterService{
	static Logger log=Logger.getLogger(PurchaseQuotationServiceImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	private PurchaseQuotationDao purchasedao;
	@Override
	@Transactional
	public int[] savePurchaseQuotationMaster(PurchaseQuotationMasterDto purchaseObj,String itemInfoDtoDetails,
			String purchasequotationContactInfoDtoDetails,	String purchaeQuotationAddressInfoDtoDetails,
			String  purchaeQuotationTermAndConditionInfoDtoDetails,HttpServletRequest request,Integer partyMasterId) {
			int[] status = new int[2];
			try {			
			if (purchaseObj.getPurchaseQutationId() == 0) {
				
				String sql="";
				sql="SELECT  c.state_name FROM state  c  where  c.status='Y' and idstate="+purchaseObj.getSupplierState() ;
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String stateName = ((String)countQuery.uniqueResult()).toString();
				System.err.println("stateName...."+stateName);
				
				HttpSession session = request.getSession(); 
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");				
				purchaseObj.setCreatedBy(userId); 
				purchaseObj.setUnitId(unitId);
				purchaseObj.setSupplierStateName(stateName);
				purchaseObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				// this is for set Item info				
				PurchaseQuotationIntemInfoDto itemobj = (PurchaseQuotationIntemInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemInfoDtoDetails, PurchaseQuotationIntemInfoDto.class);	
				List<PurchaseQuotationIntemInfoDto> lstpurchaseiteminfo = itemobj.getLstpurchaseitemInfoDto();
			
				List<PurchaseQuotationIntemInfoDto> newlst=new ArrayList<PurchaseQuotationIntemInfoDto>();
				for(PurchaseQuotationIntemInfoDto obj:lstpurchaseiteminfo){
					UnitMasterDTONew pobj=(UnitMasterDTONew) sessionFactory.getCurrentSession().get(UnitMasterDTONew.class, obj.getItemUnitId());
					obj.setItemUnitName(pobj.getUnitName());
					newlst.add(obj);
				}
				
				purchaseObj.setLstpurchaseitemInfoDto(newlst);
				// this is for term and condition info
//				PurchaseQuotationTermAndConditionDto ptermobj = (PurchaseQuotationTermAndConditionDto) ConfigUIJSONUtility
//						.getObjectFromJSON(purchaeQuotationTermAndConditionInfoDtoDetails, PurchaseQuotationTermAndConditionDto.class);	
//				
//				List<PurchaseQuotationTermAndConditionDto> lstpurchaseterm = ptermobj.getLstpurcaseTermConditionInfoDto();
//				purchaseObj.setLstpurcaseTermConditionInfoDto(lstpurchaseterm);
				
				PartyMasterDto pobj=(PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);

				// this is for set contact info
				PartyMasterContactInfoDto pcotactobj = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchasequotationContactInfoDtoDetails,PartyMasterContactInfoDto.class);
				
				List<PartyMasterContactInfoDto> lstpurchasecontact = pcotactobj.getPartyMasterContactInfoDto();
				//purchaseObj.setPartyMasterContactInfoDto(lstpurchasecontact);
				
				// this is for set address info
				PartyMasterAddressInfoDto paddobj = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaeQuotationAddressInfoDtoDetails, PartyMasterAddressInfoDto.class);	
				
				List<PartyMasterAddressInfoDto> lstpurchaseadd = paddobj.getPartyMasterAddressInfoDto();
				
				TermsAndConditionInfoDto termcondition = (TermsAndConditionInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaeQuotationTermAndConditionInfoDtoDetails, TermsAndConditionInfoDto.class);
				List<TermsAndConditionInfoDto> lsttermcondition = termcondition.getTermsAndConditionInfoDto();

				
				
				pobj.setPartyMasterContactInfoDto(lstpurchasecontact);
				pobj.setPartyMasterAddressInfoDto(lstpurchaseadd);
				pobj.setTermsAndConditionInfoDto(lsttermcondition);
				
				/*Integer id=(Integer) sessionFactory.getCurrentSession().save(partyMasterDto);
				PartyMasterDto masterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, id);*/
				
				//purchasedao.savePartyMaster(pobj);
				purchaseObj.setPartymasterdto(pobj);
				
				
				return purchasedao.savePurchaseQuotationMaster(purchaseObj);
				
			} else {
				
				String sql="";
				sql="SELECT  c.state_name FROM state  c  where  c.status='Y' and idstate="+purchaseObj.getSupplierState() ;
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String stateName = ((String)countQuery.uniqueResult()).toString();
				System.err.println("stateName...."+stateName);
				
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				purchaseObj.setUpdatedBy(userId);
				purchaseObj.setUnitId(unitId);
				purchaseObj.setSupplierStateName(stateName);
				purchaseObj.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));
				
				// this is for set Item info				
				PurchaseQuotationIntemInfoDto itemobj = (PurchaseQuotationIntemInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(itemInfoDtoDetails, PurchaseQuotationIntemInfoDto.class);	
				
				
				List<PurchaseQuotationIntemInfoDto> newlst=new ArrayList<PurchaseQuotationIntemInfoDto>();
				List<PurchaseQuotationIntemInfoDto> lstpurchaseiteminfo = itemobj.getLstpurchaseitemInfoDto();
				for(PurchaseQuotationIntemInfoDto obj:lstpurchaseiteminfo){
					UnitMasterDTONew pobj=(UnitMasterDTONew) sessionFactory.getCurrentSession().get(UnitMasterDTONew.class, obj.getItemUnitId());
					obj.setItemUnitName(pobj.getUnitName());
					newlst.add(obj);
				}
				
				
				
				purchaseObj.setLstpurchaseitemInfoDto(newlst);
				
				
				
				
				// this is for term and condition info
//				PurchaseQuotationTermAndConditionDto ptermobj = (PurchaseQuotationTermAndConditionDto) ConfigUIJSONUtility
//						.getObjectFromJSON(purchaeQuotationTermAndConditionInfoDtoDetails, PurchaseQuotationTermAndConditionDto.class);	
//				
//				List<PurchaseQuotationTermAndConditionDto> lstpurchaseterm = ptermobj.getLstpurcaseTermConditionInfoDto();
//				purchaseObj.setLstpurcaseTermConditionInfoDto(lstpurchaseterm);
				
				PartyMasterDto pobj=(PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, partyMasterId);

				// this is for set contact info
				PartyMasterContactInfoDto pcotactobj = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchasequotationContactInfoDtoDetails,PartyMasterContactInfoDto.class);
				
				List<PartyMasterContactInfoDto> lstpurchasecontact = pcotactobj.getPartyMasterContactInfoDto();
				//purchaseObj.setPartyMasterContactInfoDto(lstpurchasecontact);
				
				// this is for set address info
				PartyMasterAddressInfoDto paddobj = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaeQuotationAddressInfoDtoDetails, PartyMasterAddressInfoDto.class);	
				
				List<PartyMasterAddressInfoDto> lstpurchaseadd = paddobj.getPartyMasterAddressInfoDto();
				//purchaseObj.setPartyMasterAddressInfoDto(lstpurchaseadd);
				TermsAndConditionInfoDto termcondition = (TermsAndConditionInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(purchaeQuotationTermAndConditionInfoDtoDetails, TermsAndConditionInfoDto.class);
				List<TermsAndConditionInfoDto> lsttermcondition = termcondition.getTermsAndConditionInfoDto();
				
				
				System.out.println("this is party address"+lstpurchaseadd);
				
				pobj.setPartyMasterContactInfoDto(lstpurchasecontact);
				pobj.setPartyMasterAddressInfoDto(lstpurchaseadd);
				pobj.setTermsAndConditionInfoDto(lsttermcondition);
				
				/*Integer id=(Integer) sessionFactory.getCurrentSession().save(partyMasterDto);
				PartyMasterDto masterDto = (PartyMasterDto) sessionFactory.getCurrentSession().get(PartyMasterDto.class, id);*/
				
				//purchasedao.savePartyMaster(pobj);
				purchaseObj.setPartymasterdto(pobj);
				
				return purchasedao.savePurchaseQuotationMaster(purchaseObj);
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			status[0] = 0;
			status[1] = 0;
			return status;
		}
	}

	@Override
	@Transactional
	public List<PurchaseQuotationMasterDto> getAllPurchaseQuotationMaster(HttpServletRequest request,Integer unitId,String call) {
		
		return purchasedao.getAllPurchaseQuotationMaster(unitId, call);
	}

	@Override
	@Transactional
	public PurchaseQuotationMasterDto editPurchaseQuotationMaster(Integer pQId) {
		
		return purchasedao.editPurchaseQuotationMaster(pQId);
	}
	

	@Override
	@Transactional
	public int updatePuContactQuotationMaster(PartyMasterContactInfoDto cobj, HttpServletRequest request) {
		
		return purchasedao.updatePuContactQuotationMaster(cobj);
	}

	@Override
	@Transactional
	public List<PartyMasterContactInfoDto> getAllPQuationContactInfo(	HttpServletRequest request, Integer unitId,Integer purchaseQtMasterId) {
		// TODO Auto-generated method stub
		return purchasedao.getAllPQuationContactInfo(unitId,purchaseQtMasterId);
	}

	@Override
	@Transactional
	public int updatePurchaseAddressInfo(PartyMasterAddressInfoDto aobj,HttpServletRequest request) {
		
		return purchasedao.updatePurchaseAddressInfo(aobj);
	}

	@Override
	@Transactional
	public List<PartyMasterAddressInfoDto> getAllPQuationAddressInfo(	HttpServletRequest request, Integer unitId,	Integer purchaseQtMasterId) {
		
		return purchasedao.getAllPQuationAddressInfo(unitId, purchaseQtMasterId);
	}

	@Override
	@Transactional
	public int updatePurchaseTermInfo(PurchaseQuotationTermAndConditionDto tobj,HttpServletRequest request) {
		
		return purchasedao.updatePurchaseTermInfo(tobj);
	}

	@Override
	@Transactional
	public List<PurchaseQuotationTermAndConditionDto> getAllPQuationTermAndConditionInfo(HttpServletRequest request, Integer unitId,Integer purchaseQtMasterId) {
		
		return purchasedao.getAllPQuationTermAndConditionInfo(unitId, purchaseQtMasterId);
	}

	@Override
	@Transactional
	public boolean deletePurchaseQuotationSlaveInfo(Integer purchaseSlaveId,Integer purchaseMasterId, String callFrom,HttpServletRequest request) {
		
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
				/*Query queryContact = sessionFactory	.getCurrentSession().createSQLQuery("update inv_purchase_quotation_address_info set deleted='Y',deleted_by="
										+ userId+ ",delete_date_time=now() where address_id="
										+ purchaseSlaveId+" and quotation_master_id="+purchaseMasterId);*/
				Query queryContact = sessionFactory	.getCurrentSession().createSQLQuery("update inv_party_master_address_info_slave set deleted='Y',deleted_by="
						+ userId+ ",delete_date_time=now() where id="+ purchaseSlaveId);
				queryContact.executeUpdate();
				isDeleted = true;
			}else if(callFrom.equalsIgnoreCase("deleteterm")){
				Query queryAddress = sessionFactory.getCurrentSession().createSQLQuery(	"update inv_purchase_quotation_termandcondition_info set deleted='Y',deleted_by="
										+ userId
										+ ",delete_date_time=now() where term_cond_id="
										+ purchaseSlaveId+" and quotation_master_id="+purchaseMasterId);
				queryAddress.executeUpdate();
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
	public boolean deletePurchaseQuotationMaster(Integer pQId,HttpServletRequest request) {
		boolean reponse=false;
		try{
		PurchaseQuotationMasterDto pobj=(PurchaseQuotationMasterDto) sessionFactory.getCurrentSession().get(PurchaseQuotationMasterDto.class, pQId);
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		pobj.setDeleted("Y");
		pobj.setDeletedDate(new Date(new java.util.Date().getTime()));
		pobj.setDeletedBy(userId);
		
		PartyMasterDto partymaster=pobj.getPartymasterdto();
		
			/*Query queryGeneral = sessionFactory	.getCurrentSession().createSQLQuery("update inv_party_master_contact_info_slave set deleted='Y',deleted_by="
									+ userId	+ ",delete_date_time=now() where  party_master_id="+partymaster.getId());
			queryGeneral.executeUpdate();
			
		
			Query queryContact = sessionFactory	.getCurrentSession().createSQLQuery("update inv_party_master_address_info_slave set deleted='Y',deleted_by="
									+ userId+ ",delete_date_time=now() where  party_master_id="+partymaster.getId());
			queryContact.executeUpdate();
			
		
			
			
			Query itemInfo = sessionFactory.getCurrentSession().createSQLQuery(	"update inv_purchase_quotation_item_info set deleted='Y',deleted_by="
					+ userId
					+ ",delete_date_time=now() where  quotation_master_id="+pQId);
					itemInfo.executeUpdate();*/
			
			reponse=purchasedao.deletePurchaseQuotationMaster(pobj);
			    
			
		}catch(Exception e){
			e.printStackTrace();
		}
		return reponse;
	}

	@Override
	@Transactional
	public List<PartyMasterDto> inventoryPartyMasterAutoSuggestion(	String partyName) {
		// TODO Auto-generated method stub
		return purchasedao.inventoryPartyMasterAutoSuggestion(partyName);
	}

	@Override
	@Transactional
	public List<PurchaseQuotationMasterDto> getQuatationMaster(String vendorName,String call) {
		// TODO Auto-generated method stub
		return purchasedao.getQuatationMaster(vendorName,call);
	}

	@Override
	@Transactional
	public PurchaseQuotationMasterDto getPurchaseQuotationMasterDetailsById(Integer pQId, Integer unitId,String call) {
		//PurchaseQuotationMasterDto pobj=(PurchaseQuotationMasterDto) sessionFactory.getCurrentSession().get(PurchaseQuotationMasterDto.class, pQId);
		System.err.println("call..."+call);
		PurchaseQuotationMasterDto pm = new PurchaseQuotationMasterDto();
		try {
			//sql = "SELECT d.purchase_quotation_id, d.supplier_name,d.quotation_expiry_date  FROM inv_purchase_quotation_master d where (DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') >= CURDATE() OR d.quotation_expiry_date IS null OR d.quotation_expiry_date ='') and d.deleted='N' limit 20 ";
			String sql="";
			
			if(call.equalsIgnoreCase("all")){
				sql = "SELECT d.purchase_quotation_id, d.supplier_name,d.quotation_expiry_date,d.is_approved FROM inv_purchase_quotation_master d where d.purchase_quotation_id ="+pQId+" and (DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') >= CURDATE() OR d.quotation_expiry_date IS null OR d.quotation_expiry_date ='') and d.deleted='N' limit 20 ";
			}else if(call.equalsIgnoreCase("expired")){
				sql = "SELECT d.purchase_quotation_id, d.supplier_name,d.quotation_expiry_date,d.is_approved FROM inv_purchase_quotation_master d where d.purchase_quotation_id ="+pQId+" and DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') <= CURDATE()   and d.deleted='N' limit 20 ";
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession()	.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				
				pm.setSupplierName((String) row.get("supplier_name"));
				pm.setPurchaseQutationId((Integer) row.get("purchase_quotation_id"));
				pm.setQuotationExDate((String) row.get("quotation_expiry_date"));
				pm.setIsApproved((String) row.get("is_approved"));
				
			}
			

		} catch (Exception e) {
			log.error("error for  getPurchaseQuotationMasterDetailsById....",e);

			//e.printStackTrace();
			return null;
		}
		return pm;
		
		
	}

	@Override
	@Transactional
	public boolean deletePurchaseQuotationItemInfoSlave(String itemId,HttpServletRequest request) {
		
		boolean isDeleted=false;
		try{
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update inv_purchase_quotation_item_info set deleted='Y',deleted_by="
					+ userId	+ ",delete_date_time=now() where item_id in("+itemId+")");
					itemInfo.executeUpdate();
						isDeleted = true;
				
			
		}catch(Exception e){
			e.printStackTrace();
			return isDeleted;
		}
		return isDeleted;
	}

	@Override
	@Transactional
	public int uploadPurchaseQuotationDocument(String document,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchasedao.uploadPurchaseQuotationDocument(document, request);
	}

	@Override
	@Transactional
	public PurchaseQuotationDocUploadDto getUploadedDocuments(
			Integer pqMasterId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchasedao.getUploadedDocuments(pqMasterId, request);
	}
	
	@Override
	@Transactional
	public List<PurchaseQuotationMasterDto> checkUserNameandPassword(String userName, String userPassword,HttpServletRequest request) {
		return purchasedao.checkUserNameandPassword(userName, userPassword, request);
	}

	@Override
	@Transactional
	public int approvePurchaseQuotation(String userName, Integer approvedById,
			String isApproved, Integer purchaseQutationId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return purchasedao.approvePurchaseQuotation(userName, approvedById, isApproved, purchaseQutationId, request);
	}
	
}
