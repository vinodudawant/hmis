package com.hms.adminstrator.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.administrator.dto.AdminTalukaDTO;
import com.hms.administrator.dto.BusinessCustMasterDto;
import com.hms.adminstrator.dao.BusinessCustMasterDao;
import com.hms.common.dto.TmCmLookupDet;

@Service
@Transactional
public class BusinessCustMasterServiceImpl implements BusinessCustMasterService {
	
	@Autowired
	BusinessCustMasterDao businesscustmasterdao;

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<AdminStateDTO> getAllState() {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getAllState();
	}

	@Override
	public List<AdminDistrictDTO> getAllDistrict() {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getAllDistrict();
	}

	@Override
	public List<AdminTalukaDTO> getAllTaluka() {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getAllTaluka();
	}

	@Override
	public List<AdminCityDTO> getAllTown() {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getAllTown();
	}

	@Override
	public int saveBusinessCustMaster(BusinessCustMasterDto businessMasterDto, String businessMasterGeneralInfoDtoList,
			String businessMasterContactInfoDtoList, String businessMasterAddressInfoDtoList,
			String businessMasterPaymentInfoDtoList, String businessMasterTermsAndConditionInfoDtoList,
			String businessMasterContractInfoDtoList, String businessMasterUploadDocInfoDtoList,
			String businessMasterMarketingInfoDtoList, HttpServletRequest request) {
		String sql = "";
		if (businessMasterDto.getId() == 0) {

			businessMasterDto.setName(businessMasterDto.getName());

			sql = "SELECT count(*) from business_master_new p where p.deleted='N' and p.lab_name='"
					+ businessMasterDto.getName() + "' and p.reg_no ='"+businessMasterDto.getRegNo()+"' ";

			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			int count = ((Number) countQuery.uniqueResult()).intValue();
			if (count > 0) {
				return 3;
			} else {
				
				TmCmLookupDet custTypeObj = (TmCmLookupDet) sessionFactory.getCurrentSession().get(TmCmLookupDet.class, businessMasterDto.getLookupDetIdLay());
				businessMasterDto.setCustomerTypeName(custTypeObj.getLookupDetDescEn());
				
				int response = businesscustmasterdao.saveBusinessCustMaster(businessMasterDto,
						businessMasterGeneralInfoDtoList,
						businessMasterContactInfoDtoList,
						businessMasterAddressInfoDtoList, 
						businessMasterPaymentInfoDtoList,
						businessMasterTermsAndConditionInfoDtoList,
						businessMasterContractInfoDtoList,
						businessMasterUploadDocInfoDtoList,
						businessMasterMarketingInfoDtoList,request);
				
				/*sql = "select id from business_master_new p where p.deleted='N' and p.lab_name='"
						+ businessMasterDto.getName() + "'";
			
			     Query labQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			     int labId = ((Number)labQuery.setMaxResults(1).uniqueResult()).intValue();
			     
				 oAuthAccessService.generateAndSaveClientIdAndSecretForLab(labId);*/
				
				return response;
			}

		} else {
			
			TmCmLookupDet custTypeObj = (TmCmLookupDet) sessionFactory.getCurrentSession().get(TmCmLookupDet.class, businessMasterDto.getLookupDetIdLay());
			businessMasterDto.setCustomerTypeName(custTypeObj.getLookupDetDescEn());
			int response = businesscustmasterdao.saveBusinessCustMaster(businessMasterDto,
					businessMasterGeneralInfoDtoList,
					businessMasterContactInfoDtoList,
					businessMasterAddressInfoDtoList, 
					businessMasterPaymentInfoDtoList,
					businessMasterTermsAndConditionInfoDtoList, 
					businessMasterContractInfoDtoList,
					businessMasterUploadDocInfoDtoList,
					businessMasterMarketingInfoDtoList,request);
			return response;
		}
	}
	
	@Override
	public List<BusinessCustMasterDto> getAllBusinessLabMaster(HttpServletRequest request) {
		return businesscustmasterdao.getAllBusinessLabMaster(request);
	}

	@Override
	public BusinessCustMasterDto editBusinessMaster(Integer businessMasterId) {
		return businesscustmasterdao.editBusinessMaster(businessMasterId);
	}
	
	@Override
	public BusinessCustMasterDto businessMasterAutoSuggestion(String businessMasterName,Integer type,String flag,Integer unitId) {
		return businesscustmasterdao.businessMasterAutoSuggestion(businessMasterName, type, flag, unitId);
	}

	@Override
	public BusinessCustMasterDto getBusinessMasterById(Integer businessMasterId,String flag,Integer unitId) {
		return businesscustmasterdao.getBusinessMasterById(businessMasterId,flag,unitId);
	}

	@Override
	public boolean deleteBusinessMasterSlave(Integer businessMasterId,
			String Callfrom, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return businesscustmasterdao.deleteBusinessMasterSlave(businessMasterId, Callfrom, request);
	}

	@Override
	public List<BusinessCustMasterDto> getCustomersFromType(Integer type) {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getCustomersFromType(type);
	}

	@Override
	public List<BusinessCustMasterDto> getCustomersFromTypeByIds(String type) {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getCustomersFromTypeByIds(type);
	}
	
	@Override
	public List<BusinessCustMasterDto> getCustomerNameByUnitId(Integer unitId) {
		// TODO Auto-generated method stub
		return businesscustmasterdao.getCustomerNameByUnitId(unitId);
	}
}
