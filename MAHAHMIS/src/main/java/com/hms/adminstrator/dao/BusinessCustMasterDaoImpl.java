package com.hms.adminstrator.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.administrator.dto.BusinessCustMasterAddressInfoDto;
import com.hms.administrator.dto.BusinessCustMasterContactInfoDto;
import com.hms.administrator.dto.BusinessCustMasterContractInfoDto;
import com.hms.administrator.dto.BusinessCustMasterDto;
import com.hms.administrator.dto.BusinessCustMasterGenralInfoDto;
import com.hms.administrator.dto.BusinessCustMasterMarketingInfoDto;
import com.hms.administrator.dto.BusinessCustMasterPaymentInfoDto;
import com.hms.administrator.dto.BusinessCustMasterTermsAndCondInfoDto;
import com.hms.administrator.dto.BusinessCustMasterUploadDocInfoDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class BusinessCustMasterDaoImpl implements BusinessCustMasterDao {
	
	@Autowired
	SessionFactory sessionfactory;

	@Override
	public List<AdminStateDTO> getAllState() {
		// TODO Auto-generated method stub
		
		List<AdminStateDTO> list = new ArrayList<>();
		try {
			Query query = sessionfactory.getCurrentSession().createQuery("from AdminStateDTO where status = 'Y' ");
			list = query.list();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public List<AdminDistrictDTO> getAllDistrict() {
		// TODO Auto-generated method stub

		List<AdminDistrictDTO> list = new ArrayList<>();
		try {
			Query query = sessionfactory.getCurrentSession().createQuery("from AdminDistrictDTO where status = 'Y' ");
			list = query.list();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public List<AdminTalukaDTO> getAllTaluka() {
		// TODO Auto-generated method stub

		List<AdminTalukaDTO> list = new ArrayList<>();
		try {
			Query query = sessionfactory.getCurrentSession().createQuery("from AdminTalukaDTO where status = 'Y' ");
			list = query.list();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public List<AdminCityDTO> getAllTown() {
		// TODO Auto-generated method stub

		List<AdminCityDTO> list = new ArrayList<>();
		try {
			Query query = sessionfactory.getCurrentSession().createQuery("from AdminCityDTO where status = 'Y' ");
			list = query.list();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public int saveBusinessCustMaster(BusinessCustMasterDto businessMasterDto, String businessMasterGeneralInfoDtoList,
			String businessMasterContactInfoDtoList, String businessMasterAddressInfoDtoList,
			String businessMasterPaymentInfoDtoList, String businessMasterTermsAndConditionInfoDtoList,
			String businessMasterContractInfoDtoList, String businessMasterUploadDocInfoDtoList,
			String businessMasterMarketingInfoDtoList, HttpServletRequest request) {
		try {

			if (businessMasterDto.getId() == 0) {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				Integer unitNameId = businessMasterDto.getUnit();

				// this is for set party master
				businessMasterDto.setCreatedBy(userId);
				businessMasterDto.setUnitId(unitNameId);
				businessMasterDto.setCreatedDate(new Date(new java.util.Date()
						.getTime()));
				businessMasterDto.setUnit(unitId);

				// this is for set general info
				BusinessCustMasterGenralInfoDto businessMasterGeneralInfoDto = (BusinessCustMasterGenralInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterGeneralInfoDtoList,
								BusinessCustMasterGenralInfoDto.class);

				List<BusinessCustMasterGenralInfoDto> listBusinessMasterGeneralInfoDto = businessMasterGeneralInfoDto
						.getBusinessMasterGeneralInfoDto();
				businessMasterDto
						.setBusinessMasterGeneralInfoDto(listBusinessMasterGeneralInfoDto);

				// this is for set contact info
				BusinessCustMasterContactInfoDto businessMasterContactInfoDto = (BusinessCustMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterContactInfoDtoList,
								BusinessCustMasterContactInfoDto.class);

				List<BusinessCustMasterContactInfoDto> listBusinessMasterContactInfoDto = businessMasterContactInfoDto
						.getBusinessMasterContactInfoDto();
				businessMasterDto
						.setBusinessMasterContactInfoDto(listBusinessMasterContactInfoDto);
				
				//this is for marketing info
				BusinessCustMasterMarketingInfoDto businessMasterMarketingInfoDto = (BusinessCustMasterMarketingInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterMarketingInfoDtoList,
								BusinessCustMasterMarketingInfoDto.class);

				List<BusinessCustMasterMarketingInfoDto> listBusinessMasterMarketingInfoDto = businessMasterMarketingInfoDto
						.getBusinessMasterMarketingInfoDto();
				businessMasterDto.setBusinessMasterMarketingInfoDto(listBusinessMasterMarketingInfoDto);
						

				// this is for set address info
				BusinessCustMasterAddressInfoDto businessMasterAddressInfoDto = (BusinessCustMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterAddressInfoDtoList,
								BusinessCustMasterAddressInfoDto.class);

				List<BusinessCustMasterAddressInfoDto> listBusinessMasterAddressInfoDto = businessMasterAddressInfoDto
						.getBusinessMasterAddressInfoDto();
				businessMasterDto
						.setBusinessMasterAddressInfoDto(listBusinessMasterAddressInfoDto);


				// this is for set payment info
				BusinessCustMasterPaymentInfoDto businessMasterPaymentInfoDto = (BusinessCustMasterPaymentInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterPaymentInfoDtoList,
								BusinessCustMasterPaymentInfoDto.class);

				List<BusinessCustMasterPaymentInfoDto> listBusinessMasterPaymentInfoDto = businessMasterPaymentInfoDto
						.getBusinessMasterPaymentInfoDto();
				businessMasterDto.setBusinessMasterPaymentInfoDto(listBusinessMasterPaymentInfoDto);
				
				

				// this is for set terms and condition info
				BusinessCustMasterTermsAndCondInfoDto termsAndConditionInfoDto = (BusinessCustMasterTermsAndCondInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterTermsAndConditionInfoDtoList,
								BusinessCustMasterTermsAndCondInfoDto.class);

				List<BusinessCustMasterTermsAndCondInfoDto> listTermsAndConditionInfoDto = termsAndConditionInfoDto
						.getTermsAndConditionInfoDto();
				businessMasterDto.setTermsAndConditionInfoDto(listTermsAndConditionInfoDto);
				
				
				// this is for set contract info
				BusinessCustMasterContractInfoDto contractInfoDto = (BusinessCustMasterContractInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterContractInfoDtoList, BusinessCustMasterContractInfoDto.class);
				
				List<BusinessCustMasterContractInfoDto> listContractInfoDto = contractInfoDto.getBusinessMasterContractInfo();
				businessMasterDto.setBusinessMasterContractInfo(listContractInfoDto);
				
				// this is for set upload documents info
				BusinessCustMasterUploadDocInfoDto uploadDocInfoDto = (BusinessCustMasterUploadDocInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterUploadDocInfoDtoList, BusinessCustMasterUploadDocInfoDto.class);
				
				List<BusinessCustMasterUploadDocInfoDto> listUploadDocInfoDto = uploadDocInfoDto.getBusinessMasterUploadDocInfo();
				businessMasterDto.setBusinessMasterUploadDocInfo(listUploadDocInfoDto);

				sessionfactory.getCurrentSession().merge(businessMasterDto);

				return 1;

			} else {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				Integer unitNameId = businessMasterDto.getUnit();
				
				businessMasterDto.setUpdatedBy(userId);
				businessMasterDto.setUnitId(unitNameId);
				businessMasterDto.setUpdatedDate(new Date(new java.util.Date()
						.getTime()));
				businessMasterDto.setUnit(unitId);

				// this is for set general info
				BusinessCustMasterGenralInfoDto businessMasterGeneralInfoDto = (BusinessCustMasterGenralInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterGeneralInfoDtoList,
								BusinessCustMasterGenralInfoDto.class);

				List<BusinessCustMasterGenralInfoDto> listBusinessMasterGeneralInfoDto = businessMasterGeneralInfoDto
						.getBusinessMasterGeneralInfoDto();
				businessMasterDto
						.setBusinessMasterGeneralInfoDto(listBusinessMasterGeneralInfoDto);

				// this is for set contact info
				BusinessCustMasterContactInfoDto businessMasterContactInfoDto = (BusinessCustMasterContactInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterContactInfoDtoList,
								BusinessCustMasterContactInfoDto.class);

				List<BusinessCustMasterContactInfoDto> listBusinessMasterContactInfoDto = businessMasterContactInfoDto
						.getBusinessMasterContactInfoDto();
				businessMasterDto
						.setBusinessMasterContactInfoDto(listBusinessMasterContactInfoDto);
				
				//this is for marketing info
				BusinessCustMasterMarketingInfoDto businessMasterMarketingInfoDto = (BusinessCustMasterMarketingInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterMarketingInfoDtoList,
								BusinessCustMasterMarketingInfoDto.class);

				List<BusinessCustMasterMarketingInfoDto> listBusinessMasterMarketingInfoDto = businessMasterMarketingInfoDto
						.getBusinessMasterMarketingInfoDto();
				businessMasterDto.setBusinessMasterMarketingInfoDto(listBusinessMasterMarketingInfoDto);

				// this is for set address info
				BusinessCustMasterAddressInfoDto businessMasterAddressInfoDto = (BusinessCustMasterAddressInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterAddressInfoDtoList,
								BusinessCustMasterAddressInfoDto.class);

				List<BusinessCustMasterAddressInfoDto> listBusinessMasterAddressInfoDto = businessMasterAddressInfoDto
						.getBusinessMasterAddressInfoDto();
				businessMasterDto
						.setBusinessMasterAddressInfoDto(listBusinessMasterAddressInfoDto);
				
				
				// this is for set payment info
				BusinessCustMasterPaymentInfoDto businessMasterPaymentInfoDto = (BusinessCustMasterPaymentInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterPaymentInfoDtoList,
								BusinessCustMasterPaymentInfoDto.class);

				List<BusinessCustMasterPaymentInfoDto> listBusinessMasterPaymentInfoDto = businessMasterPaymentInfoDto
						.getBusinessMasterPaymentInfoDto();
				businessMasterDto.setBusinessMasterPaymentInfoDto(listBusinessMasterPaymentInfoDto);
				
				// this is for set terms and condition info
				BusinessCustMasterTermsAndCondInfoDto termsAndConditionInfoDto = (BusinessCustMasterTermsAndCondInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterTermsAndConditionInfoDtoList,
								BusinessCustMasterTermsAndCondInfoDto.class);

				List<BusinessCustMasterTermsAndCondInfoDto> listTermsAndConditionInfoDto = termsAndConditionInfoDto
						.getTermsAndConditionInfoDto();
				businessMasterDto.setTermsAndConditionInfoDto(listTermsAndConditionInfoDto);
				
				// this is for set contract info
				BusinessCustMasterContractInfoDto contractInfoDto = (BusinessCustMasterContractInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterContractInfoDtoList, BusinessCustMasterContractInfoDto.class);
				
				List<BusinessCustMasterContractInfoDto> listContractInfoDto = contractInfoDto.getBusinessMasterContractInfo();
				businessMasterDto.setBusinessMasterContractInfo(listContractInfoDto);
				
				// this is for set upload documents info
				BusinessCustMasterUploadDocInfoDto uploadDocInfoDto = (BusinessCustMasterUploadDocInfoDto) ConfigUIJSONUtility
						.getObjectFromJSON(businessMasterUploadDocInfoDtoList, BusinessCustMasterUploadDocInfoDto.class);
				
				List<BusinessCustMasterUploadDocInfoDto> listUploadDocInfoDto = uploadDocInfoDto.getBusinessMasterUploadDocInfo();
				businessMasterDto.setBusinessMasterUploadDocInfo(listUploadDocInfoDto);

				sessionfactory.getCurrentSession().merge(businessMasterDto);

				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}
	@Override
	public List<BusinessCustMasterDto> getAllBusinessLabMaster(HttpServletRequest request) {
		List<BusinessCustMasterDto> businessMasterLabDtoList = new ArrayList<BusinessCustMasterDto>();
		try {
			HttpSession session = request.getSession();
			Integer type = Integer.parseInt(request.getParameter("type"));
			String status =  (String) request.getParameter("radioval");
			Integer startIndex = Integer.parseInt(request.getParameter("startIndex"));
			String userType = (String) session.getAttribute("userType");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			String sql = "select a.id as id, a.lab_name as name, a.lab_code as code, a.reg_no as regNo, a.payment_flag as paymentFlag, a.unit_id as unitId, eum.unit_name as unitName, a.status as status from business_master_new a left join ehat_unit_master eum on eum.unit_id = a.unit_id where a.deleted ='N'";

			if (!"ALL".equalsIgnoreCase(status)) {
			    sql += " and a.status = '" + status + "'";
			}

			if (!userType.equalsIgnoreCase("admin")) {
			    sql += " and a.type = " + type + " and a.unit_id = " + unitId;
			}

			sql += " order by a.id desc";

			SQLQuery getData = sessionfactory.getCurrentSession()
					.createSQLQuery(sql);
			getData.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			//getData.setFirstResult(startIndex);
			//getData.setMaxResults(10);
						 
			List<Map<String, Object>> masterRow = getData.list();
			for (Map<String, Object> row : masterRow) {
				BusinessCustMasterDto dto =new BusinessCustMasterDto();
				dto.setId((Integer)row.get("id"));
				dto.setCode((String)row.get("code"));
				dto.setName((String)row.get("name"));
				dto.setRegNo((String)row.get("regNo"));
				dto.setPaymentFlag((String)row.get("paymentFlag"));
				dto.setUnitId((Integer)row.get("unitId"));
				dto.setUnitName((String)row.get("unitName"));
				dto.setStatus((String)row.get("status"));;
				businessMasterLabDtoList.add(dto);
			}
			return businessMasterLabDtoList;
		} catch (Exception e) {
			return null;
		}
	}

	@Override
	public BusinessCustMasterDto editBusinessMaster(Integer businessMasterId) {
		BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
		List<BusinessCustMasterGenralInfoDto> businessMsterGeneral = new ArrayList<BusinessCustMasterGenralInfoDto>();
		List<BusinessCustMasterContactInfoDto> businessMsterContact = new ArrayList<BusinessCustMasterContactInfoDto>();
		List<BusinessCustMasterMarketingInfoDto> businessMsterMarketing = new ArrayList<BusinessCustMasterMarketingInfoDto>();
		List<BusinessCustMasterAddressInfoDto> businessMsterAddress = new ArrayList<BusinessCustMasterAddressInfoDto>();
		List<BusinessCustMasterPaymentInfoDto> businessMasterPayment = new ArrayList<BusinessCustMasterPaymentInfoDto>();
		List<BusinessCustMasterTermsAndCondInfoDto> businessMasterTermsAndCondition = new ArrayList<BusinessCustMasterTermsAndCondInfoDto>();
		List<BusinessCustMasterContractInfoDto> businessMsterAgreement = new ArrayList<BusinessCustMasterContractInfoDto>();
		List<BusinessCustMasterUploadDocInfoDto> businessMsterUploadDocs = new ArrayList<BusinessCustMasterUploadDocInfoDto>();
		
		try {
			Criteria criteria = sessionfactory.getCurrentSession()
					.createCriteria(BusinessCustMasterDto.class);
			criteria.add(Restrictions.eq("id", businessMasterId));
			criteria.add(Restrictions.eq("deleted","N"));
			businessMasterDto = (BusinessCustMasterDto) criteria.uniqueResult();
			for(BusinessCustMasterGenralInfoDto p : businessMasterDto.getBusinessMasterGeneralInfoDto()){
				 if(p.getDeleted().equalsIgnoreCase("N")){
					 businessMsterGeneral.add(p);
				 }
			}
			
			for(BusinessCustMasterContactInfoDto c : businessMasterDto.getBusinessMasterContactInfoDto()){
				 if(c.getDeleted().equalsIgnoreCase("N")){
					 businessMsterContact.add(c);
				 }
			}
			
			//marketing info
			for(BusinessCustMasterMarketingInfoDto m : businessMasterDto.getBusinessMasterMarketingInfoDto()){
				 if(m.getDeleted().equalsIgnoreCase("N")){
					 businessMsterMarketing.add(m);
				 }
			}
			
			for(BusinessCustMasterAddressInfoDto a : businessMasterDto.getBusinessMasterAddressInfoDto()){
				 if(a.getDeleted().equalsIgnoreCase("N")){
					 businessMsterAddress.add(a);
				 }
			}
			
			for(BusinessCustMasterTermsAndCondInfoDto t : businessMasterDto.getTermsAndConditionInfoDto()){
				 if(t.getDeleted().equalsIgnoreCase("N")){
					 businessMasterTermsAndCondition.add(t);
				 }
			}
			
			for(BusinessCustMasterPaymentInfoDto p : businessMasterDto.getBusinessMasterPaymentInfoDto()){
				 if(p.getDeleted().equalsIgnoreCase("N")){
					 businessMasterPayment.add(p);
				 }
			}
			
			for(BusinessCustMasterContractInfoDto p : businessMasterDto.getBusinessMasterContractInfo()){
				 if(p.getDeleted().equalsIgnoreCase("N")){
					 businessMsterAgreement.add(p);
				 }
			}
			
			for(BusinessCustMasterUploadDocInfoDto p : businessMasterDto.getBusinessMasterUploadDocInfo()){
				 if(p.getDeleted().equalsIgnoreCase("N")){
					 businessMsterUploadDocs.add(p);
				 }
			}
			
			businessMasterDto.setBusinessMasterGeneralInfoDto(businessMsterGeneral);
			businessMasterDto.setBusinessMasterContactInfoDto(businessMsterContact);
			businessMasterDto.setBusinessMasterAddressInfoDto(businessMsterAddress);
			businessMasterDto.setBusinessMasterPaymentInfoDto(businessMasterPayment);
			businessMasterDto.setTermsAndConditionInfoDto(businessMasterTermsAndCondition);
			businessMasterDto.setBusinessMasterContractInfo(businessMsterAgreement);
			businessMasterDto.setBusinessMasterUploadDocInfo(businessMsterUploadDocs);
			businessMasterDto.setBusinessMasterMarketingInfoDto(businessMsterMarketing);
			return businessMasterDto;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	public BusinessCustMasterDto businessMasterAutoSuggestion(String businessMasterName,Integer type,String flag,Integer unitId) {	
		BusinessCustMasterDto pm = new BusinessCustMasterDto();
		
		List<BusinessCustMasterDto> businessMasterDtoList = new ArrayList<BusinessCustMasterDto>();
		
		try {
			String sql = "";
				if(flag.equalsIgnoreCase("all")){
			sql = "SELECT p.id, p.lab_name as name , p.unit_id as unitId ,eum.unit_name as  unitName FROM business_master_new p  left join ehat_unit_master eum on eum.unit_id = p.unit_id where p.lab_name like '"
					+ businessMasterName + "%' and p.deleted='N' and p.unit_name_id="+unitId+" limit 20  ";
				}else if(flag.equalsIgnoreCase("Active")){
					sql = "SELECT p.id, p.lab_name as name , p.unit_id as unitId ,eum.unit_name as  unitName FROM business_master_new p   left join ehat_unit_master eum on eum.unit_id = p.unit_id where p.lab_name like '"
							+ businessMasterName + "%' and p.deleted='N' and p.unit_name_id="+unitId+" and p.status='Active' limit 20  ";
				}else if(flag.equalsIgnoreCase("InActive")){
					sql = "SELECT p.id, p.lab_name as name , p.unit_id as unitId ,eum.unit_name as  unitName  FROM business_master_new p  left join ehat_unit_master eum on eum.unit_id = p.unit_id where p.lab_name like '"
							+ businessMasterName + "%' and p.deleted='N' and p.unit_name_id="+unitId+" and p.status='InActive' limit 20  ";
				}

		SQLQuery getMaster = sessionfactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
				businessMasterDto.setName((String) row.get("name"));
				businessMasterDto.setId((Integer) row.get("id"));
				businessMasterDto.setUnitId((Integer)row.get("unitId"));
				businessMasterDto.setUnitName((String)row.get("unitName"));
				
				businessMasterDtoList.add(businessMasterDto);
			}
			pm.setBusinessMasterDto(businessMasterDtoList);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return pm;
	}
	
	@Override
	public BusinessCustMasterDto getBusinessMasterById(Integer businessMasterId ,String flag,Integer unitId) {
		BusinessCustMasterDto pm = new BusinessCustMasterDto();
		List<BusinessCustMasterDto> businessMasterDtoList = new ArrayList<BusinessCustMasterDto>();
		
		try {		
			String sql = "";
			if(flag.equalsIgnoreCase("all")){
				sql = "SELECT p.id, p.lab_name as name ,p.lab_code as code,p.reg_no as regNo, p.payment_flag as paymentFlag, p.unit_id as unitId ,eum.unit_name as  unitName FROM business_master_new p  left join ehat_unit_master eum on eum.unit_id = p.unit_id where p.id like '"
				+ businessMasterId + "%' and p.deleted='N' and p.unit_name_id="+unitId+" limit 20  ";
			}else if(flag.equalsIgnoreCase("Active")){
				sql = "SELECT p.id, p.lab_name as name ,p.lab_code as code,p.reg_no as regNo, p.payment_flag as paymentFlag, p.unit_id as unitId ,eum.unit_name as  unitName FROM business_master_new p   left join ehat_unit_master eum on eum.unit_id = p.unit_id where p.id like '"
						+ businessMasterId + "%' and p.deleted='N' and p.unit_name_id="+unitId+" and p.status='Active' limit 20  ";
			}else if(flag.equalsIgnoreCase("InActive")){
				sql = "SELECT p.id, p.lab_name as name ,p.lab_code as code,p.reg_no as regNo, p.payment_flag as paymentFlag, p.unit_id as unitId ,eum.unit_name as  unitName  FROM business_master_new p  left join ehat_unit_master eum on eum.unit_id = p.unit_id where p.id like '"
						+ businessMasterId + "%' and p.deleted='N' and p.unit_name_id="+unitId+" and p.status='InActive' limit 20  ";
			}

			SQLQuery getMaster = sessionfactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				BusinessCustMasterDto businessMasterDto = new BusinessCustMasterDto();
				
				businessMasterDto.setId((Integer) row.get("id"));
				businessMasterDto.setCode((String) row.get("code"));
				businessMasterDto.setName((String) row.get("name"));
				businessMasterDto.setRegNo((String) row.get("regNo"));
				businessMasterDto.setPaymentFlag((String) row.get("paymentFlag"));
				businessMasterDto.setUnitId((Integer) row.get("unitId"));
				businessMasterDto.setUnitName((String)row.get("unitName"));
				
				businessMasterDtoList.add(businessMasterDto);
			}

			pm.setBusinessMasterDto(businessMasterDtoList);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return pm;
	}
	
	@Override
	public boolean deleteBusinessMasterSlave(Integer businessMasterId,String Callfrom, HttpServletRequest request) {
			
		String sql="";
		try{
			if(Callfrom.equalsIgnoreCase("deleteGeneral")){
						sql="update BusinessCustMasterGenralInfoDto set deleted='Y' where id=:id ";
					Query q=	sessionfactory.getCurrentSession().createQuery(sql);
					q.setParameter("id",businessMasterId );
					q.executeUpdate();
					return true;
			}else if(Callfrom.equalsIgnoreCase("deleteContact")){
				sql="update BusinessCustMasterContactInfoDto set deleted='Y' where id=:id ";
				Query q=	sessionfactory.getCurrentSession().createQuery(sql);
				q.setParameter("id",businessMasterId );
				q.executeUpdate();
				return true;
				
			}else if(Callfrom.equalsIgnoreCase("deleteMarketingPerson")){
				sql="update BusinessCustMasterMarketingInfoDto set deleted='Y' where id=:id ";
				Query q=	sessionfactory.getCurrentSession().createQuery(sql);
				q.setParameter("id",businessMasterId );
				q.executeUpdate();
				return true;
				
			}
			else if(Callfrom.equalsIgnoreCase("deleteAddress")){
				sql="update BusinessCustMasterAddressInfoDto set deleted='Y' where id=:id ";
				Query q=	sessionfactory.getCurrentSession().createQuery(sql);
				q.setParameter("id",businessMasterId );
				q.executeUpdate();
				return true;
				
			}else if(Callfrom.equalsIgnoreCase("deletePayment")){
				
				sql="update BusinessCustMasterPaymentInfoDto set deleted='Y' where id=:id ";
				Query q=	sessionfactory.getCurrentSession().createQuery(sql);
				q.setParameter("id",businessMasterId );
				q.executeUpdate();
				return true;
				
			}else if(Callfrom.equalsIgnoreCase("deleteTermsAndCondition")){
				sql="update BusinessCustMasterTermsAndCondInfoDto set deleted='Y' where id=:id ";
				Query q=	sessionfactory.getCurrentSession().createQuery(sql);
				q.setParameter("id",businessMasterId );
				q.executeUpdate();
				return true;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}

	@Override
	@Transactional
	public List<BusinessCustMasterDto> getCustomersFromType(Integer type) {
		// TODO Auto-generated method stub
		
		List<BusinessCustMasterDto> lstBusinessCustMasterDto = new ArrayList<>();
		try {
			
			String sql = "SELECT lab_name, id,type FROM business_master_new where lookup_det_id_lay = "+type+" and deleted = 'N' and status = 'Active' ";
			SQLQuery sqlresult = sessionfactory.getCurrentSession().createSQLQuery(sql);
			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> list = sqlresult.list();
			
			for(Map<String, Object> rs : list)
			{
				BusinessCustMasterDto obj = new BusinessCustMasterDto();
				obj.setId((Integer) rs.get("id"));
				obj.setName((String) rs.get("lab_name"));
				obj.setType((Integer) rs.get("type"));
				lstBusinessCustMasterDto.add(obj);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return lstBusinessCustMasterDto;
	}

	@Override
	@Transactional
	public List<BusinessCustMasterDto> getCustomersFromTypeByIds(String type) {
		// TODO Auto-generated method stub
		
		List<BusinessCustMasterDto> lstBusinessCustMasterDto = new ArrayList<>();
		try {
			
			String sql = "SELECT lab_name, id FROM business_master_new where lookup_det_id_lay IN("+type+") and deleted = 'N' and status = 'Active' ";
			SQLQuery sqlresult = sessionfactory.getCurrentSession().createSQLQuery(sql);
			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> list = sqlresult.list();
			
			for(Map<String, Object> rs : list)
			{
				BusinessCustMasterDto obj = new BusinessCustMasterDto();
				obj.setId((Integer) rs.get("id"));
				obj.setName((String) rs.get("lab_name"));
				
				lstBusinessCustMasterDto.add(obj);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return lstBusinessCustMasterDto;
	}
	
	@Override
	public List<BusinessCustMasterDto> getCustomerNameByUnitId(Integer unitId) {
		// TODO Auto-generated method stub
		
		List<BusinessCustMasterDto> lstBusinessCustMasterDto = new ArrayList<>();
		try {
			
			String sql = "SELECT lab_name, id, type FROM business_master_new where unit_name_id = "+unitId+" and deleted = 'N' and status = 'Active' ";
			SQLQuery sqlresult = sessionfactory.getCurrentSession().createSQLQuery(sql);
			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			List<Map<String, Object>> list = sqlresult.list();			
			for(Map<String, Object> rs : list){
				
				BusinessCustMasterDto obj = new BusinessCustMasterDto();
				obj.setId((Integer) rs.get("id"));
				obj.setName((String) rs.get("lab_name"));
				obj.setType((Integer) rs.get("type"));
				lstBusinessCustMasterDto.add(obj);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return lstBusinessCustMasterDto;
	}

}
