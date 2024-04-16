package com.hms.pathology.serviceImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dao.OutLabMasterDao;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.service.OutLabMasterService;

@Service
@Transactional
public class OutLabMasterServiceImpl implements OutLabMasterService {

	@Autowired
	OutLabMasterDao outlabdao;
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<SubServiceDto> autoSuggestionForTestName(String testname) {
		return outlabdao.autoSuggestionForTestName(testname);
	}

	@Override
	public int saveOutLabMaster(OutLabMasterDto outLabMasterDto,
			String outlabrGeneralInfoDtoList, String outlabContactInfoDtoList,
			String outlabAddressInfoDtoList, String outlabPaymentInfoDtoList,
			String outlabTermsAndConditionInfoDtoList,
			String outlabTestInfoDetails, HttpServletRequest request) {
		// TODO Auto-generated method stub

		String sql = "";
		if (outLabMasterDto.getId() == 0) {

			outLabMasterDto.setName(outLabMasterDto.getName());
			sql = "SELECT count(*) from pathology_out_lab_master p where p.deleted='N' and p.out_lab_name='"+ outLabMasterDto.getName() + "'";
			Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			int count = ((Number) countQuery.uniqueResult()).intValue();
			if (count > 0) {
				return 3;
			} else {
				int response = outlabdao.saveOutLabMaster(outLabMasterDto,
						outlabrGeneralInfoDtoList,
						outlabContactInfoDtoList,
						outlabAddressInfoDtoList, 
						outlabPaymentInfoDtoList,
						outlabTermsAndConditionInfoDtoList,outlabTestInfoDetails, request);
				return response;
			}

		} else {
			
			int response = outlabdao.saveOutLabMaster(outLabMasterDto,
					outlabrGeneralInfoDtoList,
					outlabContactInfoDtoList,
					outlabAddressInfoDtoList, 
					outlabPaymentInfoDtoList,
					outlabTermsAndConditionInfoDtoList,outlabTestInfoDetails, request);
			return response;
		}
	}

	@Override
	public List<OutLabMasterDto> getAllOutLabMaster() {
		
		return outlabdao.getAllOutLabMaster();
	}

	@Override
	public boolean deleteOutLabMasterId(Integer outlabmasterId,
			HttpServletRequest request) {
		
		return outlabdao.deleteOutLabMasterId(outlabmasterId, request);
	}

	@Override
	public OutLabMasterDto editOutLabMasterById(Integer outlabmasterId) {
	
		return outlabdao.editOutLabMasterById(outlabmasterId);
	}

	@Override
	public boolean deleteOutLabMasterSlave(Integer outlabslaveId,
			Integer labMasterId, String callFrom, HttpServletRequest request) {
		return outlabdao.deleteOutLabMasterSlave(outlabslaveId, labMasterId, callFrom, request);
	}

	@Override
	public OutLabMasterDto outLabMasterAutoSuggestion(String outLabName, HttpServletRequest request) {
		return outlabdao.outLabMasterAutoSuggestion(outLabName, request);
	}

	@Override
	public OutLabMasterDto getOutLabLabMasterById(Integer outlabmasterId, HttpServletRequest request) {
		return outlabdao.getOutLabLabMasterById(outlabmasterId, request);
	}

	@Override
	public List<OutLabMasterDto> getAllOutLabMasterByTestId(int testId) {
		
		return outlabdao.getAllOutLabMasterByTestId(testId);
	}
}