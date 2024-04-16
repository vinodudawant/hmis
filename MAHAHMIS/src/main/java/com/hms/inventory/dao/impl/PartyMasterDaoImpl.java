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

import com.hms.inventory.dao.PartyMasterDao;
import com.hms.inventory.dto.PartyMasterAddressInfoDto;
import com.hms.inventory.dto.PartyMasterContactInfoDto;
import com.hms.inventory.dto.PartyMasterDto;
import com.hms.inventory.dto.PartyMasterGeneralInfoDto;
import com.hms.inventory.dto.PartyMasterPaymentInfoDto;
import com.hms.inventory.dto.TermsAndConditionInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class PartyMasterDaoImpl implements PartyMasterDao {
	static Logger log=Logger.getLogger(PartyMasterDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int savePartyMaster(PartyMasterDto partyMasterDto,
			String partyMasterGeneralInfoDtoList,
			String partyMasterContactInfoDtoList,
			String partyMasterAddressInfoDtoList,
			String partyMasterPaymentInfoDtoList,
			String partyMasterTermsAndConditionInfoDtoList, HttpServletRequest request) {
		// TODO Auto-generated method stub

		try {

			if (partyMasterDto.getId() == 0) {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");

				// this is for set party master
				partyMasterDto.setCreatedBy(userId);
				partyMasterDto.setUnitId(unitId);
				partyMasterDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));

				// this is for set general info
				PartyMasterGeneralInfoDto partyMasterGeneralInfoDto = (PartyMasterGeneralInfoDto) ConfigUIJSONUtility.getObjectFromJSON(partyMasterGeneralInfoDtoList,PartyMasterGeneralInfoDto.class);

				List<PartyMasterGeneralInfoDto> listPartyMasterGeneralInfoDto = partyMasterGeneralInfoDto
						.getPartyMasterGeneralInfoDto();
				partyMasterDto
						.setPartyMasterGeneralInfoDto(listPartyMasterGeneralInfoDto);

				// this is for set contact info
				PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility.getObjectFromJSON(partyMasterContactInfoDtoList,PartyMasterContactInfoDto.class);

				List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
						.getPartyMasterContactInfoDto();
				partyMasterDto.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);

				// this is for set address info
				PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility.getObjectFromJSON(partyMasterAddressInfoDtoList,PartyMasterAddressInfoDto.class);

				List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto.getPartyMasterAddressInfoDto();
				partyMasterDto.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);


				// this is for set payment info
				PartyMasterPaymentInfoDto partyMasterPaymentInfoDto = (PartyMasterPaymentInfoDto) ConfigUIJSONUtility.getObjectFromJSON(partyMasterPaymentInfoDtoList,PartyMasterPaymentInfoDto.class);

				List<PartyMasterPaymentInfoDto> listPartyMasterPaymentInfoDto = partyMasterPaymentInfoDto.getPartyMasterPaymentInfoDto();
				partyMasterDto.setPartyMasterPaymentInfoDto(listPartyMasterPaymentInfoDto);
				
				

				// this is for set terms and condition info
				TermsAndConditionInfoDto termsAndConditionInfoDto = (TermsAndConditionInfoDto) ConfigUIJSONUtility.getObjectFromJSON(partyMasterTermsAndConditionInfoDtoList,TermsAndConditionInfoDto.class);

				List<TermsAndConditionInfoDto> listTermsAndConditionInfoDto = termsAndConditionInfoDto.getTermsAndConditionInfoDto();
				partyMasterDto.setTermsAndConditionInfoDto(listTermsAndConditionInfoDto);		

				PartyMasterDto dto = (PartyMasterDto) sessionFactory.getCurrentSession().merge(partyMasterDto);
				log.debug("this is for savePartyMaster "+dto);
				return 1;

			} else {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				partyMasterDto.setUpdatedBy(userId);
				partyMasterDto.setUnitId(unitId);
				partyMasterDto.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));

				// this is for set general info
				PartyMasterGeneralInfoDto partyMasterGeneralInfoDto = (PartyMasterGeneralInfoDto) ConfigUIJSONUtility.getObjectFromJSON(partyMasterGeneralInfoDtoList,PartyMasterGeneralInfoDto.class);

				List<PartyMasterGeneralInfoDto> listPartyMasterGeneralInfoDto = partyMasterGeneralInfoDto.getPartyMasterGeneralInfoDto();
				partyMasterDto.setPartyMasterGeneralInfoDto(listPartyMasterGeneralInfoDto);

				// this is for set contact info
				PartyMasterContactInfoDto partyMasterContactInfoDto = (PartyMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(partyMasterContactInfoDtoList,
								PartyMasterContactInfoDto.class);

				List<PartyMasterContactInfoDto> listPartyMasterContactInfoDto = partyMasterContactInfoDto
						.getPartyMasterContactInfoDto();
				partyMasterDto
						.setPartyMasterContactInfoDto(listPartyMasterContactInfoDto);

				// this is for set address info
				PartyMasterAddressInfoDto partyMasterAddressInfoDto = (PartyMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(partyMasterAddressInfoDtoList,
								PartyMasterAddressInfoDto.class);

				List<PartyMasterAddressInfoDto> listPartyMasterAddressInfoDto = partyMasterAddressInfoDto
						.getPartyMasterAddressInfoDto();
				partyMasterDto
						.setPartyMasterAddressInfoDto(listPartyMasterAddressInfoDto);
				
				
				// this is for set payment info
				PartyMasterPaymentInfoDto partyMasterPaymentInfoDto = (PartyMasterPaymentInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(partyMasterPaymentInfoDtoList,
								PartyMasterPaymentInfoDto.class);

				List<PartyMasterPaymentInfoDto> listPartyMasterPaymentInfoDto = partyMasterPaymentInfoDto
						.getPartyMasterPaymentInfoDto();
				partyMasterDto.setPartyMasterPaymentInfoDto(listPartyMasterPaymentInfoDto);

				// this is for set terms and condition info
				TermsAndConditionInfoDto termsAndConditionInfoDto = (TermsAndConditionInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(partyMasterTermsAndConditionInfoDtoList,
								TermsAndConditionInfoDto.class);

				List<TermsAndConditionInfoDto> listTermsAndConditionInfoDto = termsAndConditionInfoDto.getTermsAndConditionInfoDto();
				partyMasterDto.setTermsAndConditionInfoDto(listTermsAndConditionInfoDto);	

				PartyMasterDto dto = (PartyMasterDto) sessionFactory.getCurrentSession().merge(partyMasterDto);

				log.debug("this is for updatePartyMaster "+dto);
				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			log.error("error for saving savePartyMaster....",e);
			return 0;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<PartyMasterDto> getAllPartyMaster(Integer unitId) {
		// TODO Auto-generated method stub
		List<PartyMasterDto> partyMasterDtoList = new ArrayList<PartyMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartyMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId ));
			criteria.addOrder(Order.desc("id"));
			criteria.setMaxResults(10);
			
			partyMasterDtoList = criteria.list();
			log.debug("this is for getAllPartyMaster "+partyMasterDtoList);
			return partyMasterDtoList;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getAllPartyMaster....",e);
			return null;
		}
	}

	@Override
	public PartyMasterDto editPartyMaster(Integer partyMasterId) {
		// TODO Auto-generated method stub
		PartyMasterDto partyMasterDto = new PartyMasterDto();
		List<PartyMasterGeneralInfoDto> partyMsterGeneral = new ArrayList<PartyMasterGeneralInfoDto>();
		List<PartyMasterContactInfoDto> partyMsterContact = new ArrayList<PartyMasterContactInfoDto>();
		List<PartyMasterAddressInfoDto> partyMsterAddress = new ArrayList<PartyMasterAddressInfoDto>();
		List<PartyMasterPaymentInfoDto> partyMasterPayment = new ArrayList<PartyMasterPaymentInfoDto>();
		List<TermsAndConditionInfoDto> partyMasterTermsAndCondition = new ArrayList<TermsAndConditionInfoDto>();
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartyMasterDto.class);
			criteria.add(Restrictions.eq("id", partyMasterId));
			criteria.add(Restrictions.eq("deleted","N"));
			partyMasterDto = (PartyMasterDto) criteria.uniqueResult();
			for(PartyMasterGeneralInfoDto p : partyMasterDto.getPartyMasterGeneralInfoDto()){
				 if(p.getDeleted().equalsIgnoreCase("N")){
					 partyMsterGeneral.add(p);
				 }
			}
			
			for(PartyMasterContactInfoDto c : partyMasterDto.getPartyMasterContactInfoDto()){
				 if(c.getDeleted().equalsIgnoreCase("N")){
					 partyMsterContact.add(c);
				 }
			}
			
			for(PartyMasterAddressInfoDto a : partyMasterDto.getPartyMasterAddressInfoDto()){
				 if(a.getDeleted().equalsIgnoreCase("N")){
					 partyMsterAddress.add(a);
				 }
			}
			
			for(TermsAndConditionInfoDto t : partyMasterDto.getTermsAndConditionInfoDto()){
				 if(t.getDeleted().equalsIgnoreCase("N")){
					 partyMasterTermsAndCondition.add(t);
				 }
			}
			
			for(PartyMasterPaymentInfoDto p : partyMasterDto.getPartyMasterPaymentInfoDto()){
				 if(p.getDeleted().equalsIgnoreCase("N")){
					 partyMasterPayment.add(p);
				 }
			}
			
			partyMasterDto.setPartyMasterGeneralInfoDto(partyMsterGeneral);
			partyMasterDto.setPartyMasterContactInfoDto(partyMsterContact);
			partyMasterDto.setPartyMasterAddressInfoDto(partyMsterAddress);
			partyMasterDto.setPartyMasterPaymentInfoDto(partyMasterPayment);
			partyMasterDto.setTermsAndConditionInfoDto(partyMasterTermsAndCondition);
			
			log.debug("this is for editPartyMaster "+partyMasterDto);
			
			return partyMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  editPartyMaster....",e);

			return null;
		}
	}

	@Override
	public boolean deletePartyMaster(Integer partyMasterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub

		try {

			PartyMasterDto partyMasterDto = (PartyMasterDto) sessionFactory
					.getCurrentSession().get(PartyMasterDto.class,
							partyMasterId);
			partyMasterDto.setDeleted("Y");
			partyMasterDto.setDeletedDate(new Date(new java.util.Date()
					.getTime()));
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			partyMasterDto.setDeletedBy(userId);
			Query queryGeneral = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update inv_party_master_general_info_slave set deleted='Y',deleted_by="
									+ userId
									+ ",delete_date_time=now() where party_master_id="
									+ partyMasterId);
			queryGeneral.executeUpdate();

			Query queryContact = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update inv_party_master_contact_info_slave set deleted='Y',deleted_by="
									+ userId
									+ ",delete_date_time=now() where party_master_id="
									+ partyMasterId);
			queryContact.executeUpdate();

			Query queryAddress = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update inv_party_master_address_info_slave set deleted='Y',deleted_by="
									+ userId
									+ ",delete_date_time=now() where party_master_id="
									+ partyMasterId);
			queryAddress.executeUpdate();
			
			Query queryPayment = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update inv_party_master_payment_info_slave set deleted='Y',deleted_by="
									+ userId
									+ ",delete_date_time=now() where party_master_id="
									+ partyMasterId);
			queryPayment.executeUpdate();

			Query queryTermsAndCondition = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"update inv_party_master_terms_condition_info_slave set deleted='Y',deleted_by="
									+ userId
									+ ",delete_date_time=now() where party_master_id="
									+ partyMasterId);
			queryTermsAndCondition.executeUpdate();
			
			PartyMasterDto dto = (PartyMasterDto)  sessionFactory.getCurrentSession().merge(partyMasterDto);
			
			log.debug("this is for deletePartyMaster "+dto);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  deletePartyMaster....",e);
			return false;
		}
	}

	@Override
	public PartyMasterDto partyMasterAutoSuggestion(String partyMasterName) {
		// TODO Auto-generated method stub

		PartyMasterDto pm = new PartyMasterDto();
		List<PartyMasterDto> partyMasterDtoList = new ArrayList<PartyMasterDto>();
		try {

			String sql = "";

			sql = "SELECT p.id, p.party_master_name as name  FROM inv_party_master_new p where p.party_master_name like '%"
					+ partyMasterName + "%' and p.deleted='N' and p.party_master_status='Continue'";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				PartyMasterDto partyMasterDto = new PartyMasterDto();
				partyMasterDto.setName((String) row.get("name"));
				partyMasterDto.setId((Integer) row.get("id"));
				partyMasterDtoList.add(partyMasterDto);
			}
			pm.setPartyMasterDto(partyMasterDtoList);
			log.debug("this is for partyMasterAutoSuggestion "+pm);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  partyMasterAutoSuggestion....",e);
			return null;
		}
		return pm;

	}

	@Override
	public PartyMasterDto getPartyMasterById(Integer partyMasterId) {
		// TODO Auto-generated method stub

		PartyMasterDto partyMasterDto = new PartyMasterDto();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PartyMasterDto.class);
			criteria.add(Restrictions.eq("id", partyMasterId));
			criteria.add(Restrictions.eq("deleted","N"));
			criteria.add(Restrictions.eq("status","Continue"));
			partyMasterDto = (PartyMasterDto) criteria.uniqueResult();
			
			List<PartyMasterAddressInfoDto> lstAddressDto = new ArrayList<PartyMasterAddressInfoDto>();
			List<PartyMasterContactInfoDto> lstContactDto = new ArrayList<PartyMasterContactInfoDto>();
			List<PartyMasterGeneralInfoDto> lstGeneralDto = new ArrayList<PartyMasterGeneralInfoDto>();
			List<PartyMasterPaymentInfoDto> lstPaymentDto = new ArrayList<PartyMasterPaymentInfoDto>();
			List<TermsAndConditionInfoDto> lstTermsConditioDto = new ArrayList<TermsAndConditionInfoDto>();
			
			for(PartyMasterAddressInfoDto dto :partyMasterDto.getPartyMasterAddressInfoDto()){
				if(dto.getDeleted().equalsIgnoreCase("N")){
					lstAddressDto.add(dto);
				}
			}
			
			for(PartyMasterContactInfoDto dto :partyMasterDto.getPartyMasterContactInfoDto()){
				if(dto.getDeleted().equalsIgnoreCase("N")){
					lstContactDto.add(dto);
				}
			}
			
			for(PartyMasterGeneralInfoDto dto :partyMasterDto.getPartyMasterGeneralInfoDto()){
				if(dto.getDeleted().equalsIgnoreCase("N")){
					lstGeneralDto.add(dto);
				}
			}
			
			for(PartyMasterPaymentInfoDto dto :partyMasterDto.getPartyMasterPaymentInfoDto()){
				if(dto.getDeleted().equalsIgnoreCase("N")){
					lstPaymentDto.add(dto);
				}
			}
			
			for(TermsAndConditionInfoDto dto :partyMasterDto.getTermsAndConditionInfoDto()){
				if(dto.getDeleted().equalsIgnoreCase("N")){
					lstTermsConditioDto.add(dto);
				}
			}
			
			partyMasterDto.setPartyMasterAddressInfoDto(lstAddressDto);
			partyMasterDto.setPartyMasterContactInfoDto(lstContactDto);
			partyMasterDto.setPartyMasterGeneralInfoDto(lstGeneralDto);
			partyMasterDto.setPartyMasterPaymentInfoDto(lstPaymentDto);
			partyMasterDto.setTermsAndConditionInfoDto(lstTermsConditioDto);
			
			log.debug("this is for getPartyMasterById "+partyMasterDto);
			
			return partyMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  getPartyMasterById....",e);

			return null;
		}
	}

	@Override
	public boolean deletePartyMasterSlave(Integer partyMasterSlaveId,Integer partyMasterId,
			String callFrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		boolean isDeleted=false;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			if(callFrom.equalsIgnoreCase("deleteGeneral")){
				Query queryGeneral = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"update inv_party_master_general_info_slave set deleted='Y',deleted_by="
										+ userId
										+ ",delete_date_time=now() where id="
										+ partyMasterSlaveId +" and party_master_id="+partyMasterId);
				queryGeneral.executeUpdate();
				isDeleted = true;
			}else if(callFrom.equalsIgnoreCase("deleteContact")){
				Query queryContact = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"update inv_party_master_contact_info_slave set deleted='Y',deleted_by="
										+ userId
										+ ",delete_date_time=now() where id="
										+ partyMasterSlaveId+" and party_master_id="+partyMasterId);
				queryContact.executeUpdate();
				isDeleted = true;
			}else if(callFrom.equalsIgnoreCase("deleteAddress")){
				Query queryAddress = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"update inv_party_master_address_info_slave set deleted='Y',deleted_by="
										+ userId
										+ ",delete_date_time=now() where id="
										+ partyMasterSlaveId+" and party_master_id="+partyMasterId);
				queryAddress.executeUpdate();
				isDeleted = true;
			}else if(callFrom.equalsIgnoreCase("deletePayment")){
				Query queryAddress = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"update inv_party_master_payment_info_slave set deleted='Y',deleted_by="
										+ userId
										+ ",delete_date_time=now() where id="
										+ partyMasterSlaveId+" and party_master_id="+partyMasterId);
				queryAddress.executeUpdate();
				isDeleted = true;
			}else if(callFrom.equalsIgnoreCase("deleteTermsAndCondition")){
				Query queryAddress = sessionFactory
						.getCurrentSession()
						.createSQLQuery(
								"update inv_party_master_terms_condition_info_slave set deleted='Y',deleted_by="
										+ userId
										+ ",delete_date_time=now() where id="
										+ partyMasterSlaveId+" and party_master_id="+partyMasterId);
				queryAddress.executeUpdate();
				isDeleted = true;
			}
			log.debug("this is for deletePartyMasterSlave "+isDeleted);
			return isDeleted;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  deletePartyMasterSlave....",e);

			return false;
		}
	}

	@Override
	public Integer getPageCountAllPartyMaster() {
		Integer countNew = 0;
		try {
			String sql="";
			sql = "SELECT count(*) FROM inv_party_master_new as sub WHERE deleted != 'Y'";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			countNew = ((Number)countQuery.uniqueResult()).intValue();
			log.debug("this is for getPageCountAllPartyMaster "+countNew);
		} catch (Exception e) {
			log.error("this is for getPageCountAllPartyMaster "+e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}

	
}
