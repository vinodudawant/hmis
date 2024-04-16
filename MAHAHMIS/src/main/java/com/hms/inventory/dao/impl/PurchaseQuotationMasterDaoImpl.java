package com.hms.inventory.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.inventory.dao.PurchaseQuotationDao;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PurchaseQuotationDocUploadDto;
import com.hms.inventory.dto.PurchaseQuotationIntemInfoDto;
import com.hms.inventory.dto.PurchaseQuotationMasterDto;
import com.hms.inventory.dto.PurchaseQuotationTermAndConditionDto;
import com.hms.inventory.dto.TermsAndConditionInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;
//import com.hms.ehat.dto.PurchaseQuotationTermAndConditionDto;
@Repository
public class PurchaseQuotationMasterDaoImpl implements PurchaseQuotationDao {
	static Logger log=Logger.getLogger(PurchaseQuotationMasterDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int[] savePurchaseQuotationMaster(PurchaseQuotationMasterDto purchaseObj) {
		int[] status = new int[2];
		try {
			if(purchaseObj.getPurchaseQutationId()==0){
				PurchaseQuotationMasterDto dto = (PurchaseQuotationMasterDto) sessionFactory.getCurrentSession().merge(purchaseObj);
				Integer masterId = dto.getPurchaseQutationId();
				status[0] = 1;
				status[1] = masterId;
				return status;
			}else{
				PurchaseQuotationMasterDto dto = (PurchaseQuotationMasterDto) sessionFactory.getCurrentSession().merge(purchaseObj);
				Integer masterId = dto.getPurchaseQutationId();
				status[0] = 2;
				status[1] = masterId;
				return status;				
			}
		} catch (Exception e) {
			log.error("error for saving savePurchaseQuotationMaster....",e);
			//e.printStackTrace();
			status[0] = 0;
			status[1] = 0;
			return status;
		}	
	}

	@Override
	public List<PurchaseQuotationMasterDto> getAllPurchaseQuotationMaster(Integer unitId,String call) {
		
     String sql="";
		List<PurchaseQuotationMasterDto> lstpurchasequotation = new ArrayList<PurchaseQuotationMasterDto>();
		try {
			if(call.equalsIgnoreCase("all")){
				sql = "SELECT d.purchase_quotation_id, d.supplier_name,d.quotation_expiry_date,d.is_approved  FROM inv_purchase_quotation_master d where (DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') >= CURDATE() OR d.quotation_expiry_date IS null OR d.quotation_expiry_date ='') and d.deleted='N' order BY d.purchase_quotation_id DESC limit 20 ";
			}
			else if(call.equalsIgnoreCase("PO"))//PO stands for purchase order
			{
				sql = "SELECT pq.purchase_quotation_id, pq.supplier_name, pq.quotation_expiry_date,pq.is_approved FROM inv_purchase_quotation_master pq  where DATE_FORMAT(str_to_date(pq.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') >= CURDATE() AND pq.deleted='N' AND pq.is_approved='Y' and pq.is_pq_used='N' order by pq.purchase_quotation_id desc";
			}
			else 
			{
				sql = "SELECT d.purchase_quotation_id, d.supplier_name,d.quotation_expiry_date,d.is_approved  FROM inv_purchase_quotation_master d where DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') < CURDATE()  and d.deleted='N' limit 20 ";
				
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession()	.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				PurchaseQuotationMasterDto pm = new PurchaseQuotationMasterDto();
				pm.setSupplierName((String) row.get("supplier_name"));
				pm.setPurchaseQutationId((Integer) row.get("purchase_quotation_id"));
				pm.setQuotationExDate((String) row.get("quotation_expiry_date"));
				pm.setIsApproved((String) row.get("is_approved"));
				lstpurchasequotation.add(pm);
				pm=null;
			}
			
			
		} catch (Exception e) {
			log.error("error for  getAllPurchaseQuotationMaster....",e);

			//e.printStackTrace();
			return null;
		}
		return lstpurchasequotation;
     }

	@Override
	public PurchaseQuotationMasterDto editPurchaseQuotationMaster(Integer pQId) {
		PurchaseQuotationMasterDto pobj = new PurchaseQuotationMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PurchaseQuotationMasterDto.class);
			criteria.add(Restrictions.eq("purchaseQutationId", pQId));
			criteria.add(Restrictions.eq("deleted", "N"));
			pobj = (PurchaseQuotationMasterDto) criteria.uniqueResult();
			List<PurchaseQuotationIntemInfoDto> lstitem=new ArrayList<PurchaseQuotationIntemInfoDto>();
			for (PurchaseQuotationIntemInfoDto iobj : pobj.getLstpurchaseitemInfoDto()) {
				 if(iobj.getDeleted().equalsIgnoreCase("N")){
					 lstitem.add(iobj);
					 
				 }
				
			}
			PartyMasterDto partyob=pobj.getPartymasterdto();
			List<PartyMasterAddressInfoDto> lstpartyadd=new ArrayList<PartyMasterAddressInfoDto>();
			List<PartyMasterContactInfoDto> lstpartycontact=new ArrayList<PartyMasterContactInfoDto>();
			List<TermsAndConditionInfoDto> partyMasterTermsAndCondition = new ArrayList<TermsAndConditionInfoDto>();
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
			
			for(TermsAndConditionInfoDto t : partyob.getTermsAndConditionInfoDto()){
				 if(t.getDeleted().equalsIgnoreCase("N")){
					 partyMasterTermsAndCondition.add(t);
				 }
			}
			partyob.setPartyMasterAddressInfoDto(lstpartyadd);
			partyob.setPartyMasterContactInfoDto(lstpartycontact);
			partyob.setTermsAndConditionInfoDto(partyMasterTermsAndCondition);
			pobj.setLstpurchaseitemInfoDto(lstitem);
			pobj.setPartymasterdto(partyob);
			
			return pobj;
		} catch (Exception e) {
			log.error("error for  editPurchaseQuotationMaster....",e);
			//e.printStackTrace();
			return null;
		}
	}

	

	@Override
	public int updatePuContactQuotationMaster(PartyMasterContactInfoDto cobj) {
		try {
			
				sessionFactory.getCurrentSession().merge(cobj);
				return 1;
			}	catch (Exception e) {
				log.error("error for  updatePuContactQuotationMaster....",e);

			//e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<PartyMasterContactInfoDto> getAllPQuationContactInfo(	Integer unitId,Integer purchaseQtMasterId) {
			
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
			log.error("error for  getAllPQuationContactInfo....",e);
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
	public List<PartyMasterAddressInfoDto> getAllPQuationAddressInfo(	Integer unitId, Integer purchaseQtMasterId) {
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
			log.error("error for  getAllPQuationAddressInfo....",e);
			//e.printStackTrace();
		}
		return lstPurchaseadd;
	}

	@Override
	public int updatePurchaseTermInfo(PurchaseQuotationTermAndConditionDto tobj) {
				try {	
						sessionFactory.getCurrentSession().merge(tobj);
						return 1;
					}	catch (Exception e) {
						log.error("error for  updatePurchaseTermInfo....",e);
					//e.printStackTrace();
					return 0;
					}	
	}

	@Override
	public List<PurchaseQuotationTermAndConditionDto> getAllPQuationTermAndConditionInfo(Integer unitId, Integer purchaseQtMasterId) {
				List<PurchaseQuotationTermAndConditionDto> lstPurchaseterm=new ArrayList<PurchaseQuotationTermAndConditionDto>();
				String sql = "";
				try{
		
					sql = "select * from inv_purchase_quotation_termandcondition_info where unit_id='"+unitId+"' and deleted='N' and quotation_master_id='"+purchaseQtMasterId+"'order by term_cond_id desc";
					SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
					getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> listPurchase = getMaster.list();	
					for(Map<String, Object> row : listPurchase){
		
						PurchaseQuotationTermAndConditionDto obj = new PurchaseQuotationTermAndConditionDto();	
						obj.setTermConditionId((Integer)row.get("term_cond_id"));
						obj.setTermConditionAddress((String)row.get("term_condition_address"));				
						lstPurchaseterm.add(obj);
						obj=null;
					}
		
		
				}catch(Exception e){
					log.error("error for  getAllPQuationTermAndConditionInfo....",e);

					e.printStackTrace();
				}
				return lstPurchaseterm;
			}

	@Override
	public boolean deletePurchaseQuotationMaster(PurchaseQuotationMasterDto pobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(pobj);
			return true;
		}catch(Exception e){
			log.error("error for  deletePurchaseQuotationMaster....",e);
			//e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<PartyMasterDto> inventoryPartyMasterAutoSuggestion(	String partyName) {
		
		List<PartyMasterDto> lstparty = new ArrayList<PartyMasterDto>();
		try {
			String sql = "SELECT d.id, d.party_master_name FROM inv_party_master_new d where d.party_master_name like '"+partyName+"%' and d.deleted='N' limit 20 ";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				PartyMasterDto pm = new PartyMasterDto();
				pm.setName((String) row.get("party_master_name"));
				pm.setId((Integer) row.get("id"));
				lstparty.add(pm);
				pm=null;
			}
			

		} catch (Exception e) {
			log.error("error for  inventoryPartyMasterAutoSuggestion....",e);
			//e.printStackTrace();
			return null;
		}
		return lstparty;
	}

	@Override
	public int savePartyMaster(PartyMasterDto pobj) {
		try
		{
			sessionFactory.getCurrentSession().merge(pobj);
			return 1;
		}catch(Exception e){
			log.error("error for  savePartyMaster....",e);
			//e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<PurchaseQuotationMasterDto> getQuatationMaster(String vendorName,String call) {
		
		List<PurchaseQuotationMasterDto> lstpurchaseobj = new ArrayList<PurchaseQuotationMasterDto>();
		try {
			String sql="";
			
			if(call.equalsIgnoreCase("all")){
				sql = "SELECT d.purchase_quotation_id, d.supplier_name,d.is_approved FROM inv_purchase_quotation_master d where d.supplier_name like '"+vendorName+"%' and (DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') >= CURDATE() OR d.quotation_expiry_date IS null OR d.quotation_expiry_date ='') and d.deleted='N' limit 20 ";
			}else if(call.equalsIgnoreCase("expired")){
				sql = "SELECT d.purchase_quotation_id, d.supplier_name, d.is_approved FROM inv_purchase_quotation_master d where d.supplier_name like '"+vendorName+"%' and DATE_FORMAT(str_to_date(d.quotation_expiry_date, '%d/%m/%Y'), '%Y-%m-%d') <= CURDATE()   and d.deleted='N' limit 20 ";
			}
			SQLQuery getMaster = sessionFactory.getCurrentSession()	.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			
			for (Map<String, Object> row : masterRow) {
				
				PurchaseQuotationMasterDto pm = new PurchaseQuotationMasterDto();
				pm.setSupplierName((String) row.get("supplier_name"));
				pm.setPurchaseQutationId((Integer) row.get("purchase_quotation_id"));
				pm.setIsApproved((String) row.get("is_approved"));
				lstpurchaseobj.add(pm);
				pm=null;
			}
			

		} catch (Exception e) {
			log.error("error for  getQuatationMaster....",e);

			//e.printStackTrace();
			return null;
		}
		return lstpurchaseobj;
	}

	@Override
	public int uploadPurchaseQuotationDocument(String document,
			HttpServletRequest request) {
		int res = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			PurchaseQuotationDocUploadDto purchaseQuotationDocUploadDto = (PurchaseQuotationDocUploadDto) ConfigUIJSONUtility
					.getObjectFromJSON(document,
							PurchaseQuotationDocUploadDto.class);
			
			PurchaseQuotationDocUploadDto lstPurchaseQuotationDocUploadDto = purchaseQuotationDocUploadDto
					.getLstPurchaseQuotationDocUploadDto().get(0);

			if (lstPurchaseQuotationDocUploadDto.getId() == 0) {
				lstPurchaseQuotationDocUploadDto.setCreatedBy(userId);
				lstPurchaseQuotationDocUploadDto.setUnitId(unitId);
				lstPurchaseQuotationDocUploadDto.setDeleted("N");
				sessionFactory.getCurrentSession().merge(
						lstPurchaseQuotationDocUploadDto);
				res = 1;
			} else {
				lstPurchaseQuotationDocUploadDto.setUpdatedBy(userId);
				lstPurchaseQuotationDocUploadDto.setDeleted("N");
				lstPurchaseQuotationDocUploadDto.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(
						lstPurchaseQuotationDocUploadDto);
				res = 2;
			}
		} catch (Exception e) {
			log.error("error for uploadPurchaseQuotationDocument...." + e.getMessage());
			e.printStackTrace();
			return res;
		}
		return res;
	}

	@Override
	public PurchaseQuotationDocUploadDto getUploadedDocuments(
			Integer pqMasterId, HttpServletRequest request) {

		List<PurchaseQuotationDocUploadDto> list = new ArrayList<PurchaseQuotationDocUploadDto>();
		PurchaseQuotationDocUploadDto purchaseQuotationDocUploadDto = new PurchaseQuotationDocUploadDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PurchaseQuotationDocUploadDto.class);
			criteria.add(Restrictions.eq("purchaseQuotationId", pqMasterId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));

			criteria.addOrder(Order.desc("id"));
			list = criteria.list();
			if (list.size() > 0) {
				purchaseQuotationDocUploadDto.setLstPurchaseQuotationDocUploadDto(list);
			}
		} catch (Exception e) {
			log.error("error for getUploadedDocuments...." + e.getMessage());
			e.printStackTrace();
		}
		return purchaseQuotationDocUploadDto;

	}
	
	@Override
	public List<PurchaseQuotationMasterDto> checkUserNameandPassword(String userName, String userPassword,HttpServletRequest request) {
		String sql="";
		List<PurchaseQuotationMasterDto> lstbatch = new ArrayList<PurchaseQuotationMasterDto>();
		try{
		sql="SELECT count(*) as countu ,f.User_ID from users f where f.status='Y' and f.User_Name='"+userName+"'and f.password='"+userPassword+"' group by f.User_ID ";

		 SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				
				PurchaseQuotationMasterDto pm = new PurchaseQuotationMasterDto();
				pm.setCount(((Number) row.get("countu")).intValue());
				pm.setApprovedById((Integer) row.get("User_ID"));
				
				lstbatch.add(pm);
				pm=null;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return lstbatch;
	}

	@Override
	public int approvePurchaseQuotation(String approvedByName, Integer approvedById,
			String isApproved, Integer purchaseQutationId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		int status = 0;
		try {
			PurchaseQuotationMasterDto obj=	(PurchaseQuotationMasterDto)sessionFactory.getCurrentSession().get(PurchaseQuotationMasterDto.class, purchaseQutationId);
			obj.setApprovedById(approvedById);
			obj.setApprovedByName(approvedByName);
			obj.setIsApproved(isApproved);
			sessionFactory.getCurrentSession().merge(obj);
		    status = 1;
		} catch (Exception e) {
			// TODO: handle exception
			return status;
		}
		return status;
	}
	
}
