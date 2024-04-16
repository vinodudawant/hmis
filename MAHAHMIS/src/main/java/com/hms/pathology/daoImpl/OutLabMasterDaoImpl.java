package com.hms.pathology.daoImpl;

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

import com.hms.ehat.dto.SubServiceDto;
import com.hms.pathology.dao.OutLabMasterDao;
import com.hms.pathology.dto.OutLabAddressInfoDto;
import com.hms.pathology.dto.OutLabContactInfoDto;
import com.hms.pathology.dto.OutLabGeneralInfoDto;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.dto.OutLabPaymentInfoDto;
import com.hms.pathology.dto.OutLabTermsAndConditionInfoDto;
import com.hms.pathology.dto.OutLabTestmasterDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class OutLabMasterDaoImpl implements OutLabMasterDao {

	static Logger log=Logger.getLogger(OutLabMasterDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionfactory;
	
	@Override
	public List<SubServiceDto> autoSuggestionForTestName(String testname) {
		SQLQuery sql = null;
		List<SubServiceDto> listsubservice = new ArrayList<SubServiceDto>();
		try {		
		sql = sessionfactory.getCurrentSession().createSQLQuery("SELECT id,category_name,charges FROM ehat_subservice where isCategory='N' and service_id='11' and  category_name  like '"+testname+"%' limit 500");
		sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice2 = sql.list();
			for (Map<String, Object> rs1 : listsubservice2) {
				SubServiceDto dto = new SubServiceDto();
				dto.setTestId((Integer) rs1.get("id"));
				dto.setCategoryname((String) rs1.get("category_name"));
				dto.setTestRate((Double) rs1.get("charges"));
				listsubservice.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();

		}
		return listsubservice;
	}

	@Override
	public int saveOutLabMaster(OutLabMasterDto outLabMasterDto,
			String outlabrGeneralInfoDtoList, String outlabContactInfoDtoList,
			String outlabAddressInfoDtoList, String outlabPaymentInfoDtoList,
			String outlabTermsAndConditionInfoDtoList,
			String outlabTestInfoDetails, HttpServletRequest request) {
		// TODO Auto-generated method stub

		try {

			if (outLabMasterDto.getId() == 0) {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");

				// this is for set party master
				outLabMasterDto.setCreatedBy(userId);
				outLabMasterDto.setUnitId(unitId);
				outLabMasterDto.setCreatedDate(new Date(new java.util.Date().getTime()));

				// this is for set general info
				OutLabGeneralInfoDto outLabGeneralInfoDto = (OutLabGeneralInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabrGeneralInfoDtoList,OutLabGeneralInfoDto.class);

				List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList1 = outLabGeneralInfoDto.getOutlabrGeneralInfoDtoList();
				outLabMasterDto.setOutlabrGeneralInfoDtoList(outlabrGeneralInfoDtoList1);

				// this is for set contact info
				OutLabContactInfoDto outLabContactInfoDto = (OutLabContactInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabContactInfoDtoList,OutLabContactInfoDto.class);

				List<OutLabContactInfoDto> outlabContactInfoDtoList1 = outLabContactInfoDto.getOutlabContactInfoDtoList();
				outLabMasterDto.setOutlabContactInfoDtoList(outlabContactInfoDtoList1);

				// this is for set address info
				OutLabAddressInfoDto outLabAddressInfoDto = (OutLabAddressInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabAddressInfoDtoList,OutLabAddressInfoDto.class);

				List<OutLabAddressInfoDto> outlabAddressInfoDtoList1 = outLabAddressInfoDto.getOutlabAddressInfoDtoList();
				outLabMasterDto.setOutlabAddressInfoDtoList(outlabAddressInfoDtoList1);


				// this is for set payment info
				OutLabPaymentInfoDto outLabPaymentInfoDto = (OutLabPaymentInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabPaymentInfoDtoList,OutLabPaymentInfoDto.class);

				List<OutLabPaymentInfoDto> outlabPaymentInfoDtoList1 = outLabPaymentInfoDto.getOutlabPaymentInfoDtoList();
				outLabMasterDto.setOutlabPaymentInfoDtoList(outlabPaymentInfoDtoList1);
				
				

				// this is for set terms and condition info
				OutLabTermsAndConditionInfoDto termsAndConditionInfoDto = (OutLabTermsAndConditionInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabTermsAndConditionInfoDtoList,OutLabTermsAndConditionInfoDto.class);

				List<OutLabTermsAndConditionInfoDto> outlabTermsAndConditionInfoDtoList1 = termsAndConditionInfoDto.getOutlabTermsAndConditionInfoDtoList();
				outLabMasterDto.setOutlabTermsAndConditionInfoDtoList(outlabTermsAndConditionInfoDtoList1);		

				// this is for set out test lab info
				OutLabTestmasterDto outLobTestmasterDto = (OutLabTestmasterDto) ConfigUIJSONUtility.getObjectFromJSON(outlabTestInfoDetails,OutLabTestmasterDto.class);

				List<OutLabTestmasterDto> outlabTestInfoDetailsList = outLobTestmasterDto.getOutlabTestInfoDetailsList();
				outLabMasterDto.setOutlabTestInfoDetailsList(outlabTestInfoDetailsList);
				
				sessionfactory.getCurrentSession().merge(outLabMasterDto);

				return 1;

			} else {

				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				outLabMasterDto.setUpdatedBy(userId);
				outLabMasterDto.setUnitId(unitId);
				outLabMasterDto.setUpdatedDate(new Date(new java.util.Date().getTime()));

				// this is for set general info
				OutLabGeneralInfoDto outLabGeneralInfoDto = (OutLabGeneralInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabrGeneralInfoDtoList,OutLabGeneralInfoDto.class);

				List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList1 = outLabGeneralInfoDto.getOutlabrGeneralInfoDtoList();
				outLabMasterDto.setOutlabrGeneralInfoDtoList(outlabrGeneralInfoDtoList1);

				// this is for set contact info
				OutLabContactInfoDto outLabContactInfoDto = (OutLabContactInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabContactInfoDtoList,OutLabContactInfoDto.class);

				List<OutLabContactInfoDto> outlabContactInfoDtoList1 = outLabContactInfoDto.getOutlabContactInfoDtoList();
				outLabMasterDto.setOutlabContactInfoDtoList(outlabContactInfoDtoList1);

				// this is for set address info
				OutLabAddressInfoDto outLabAddressInfoDto = (OutLabAddressInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabAddressInfoDtoList,OutLabAddressInfoDto.class);

				List<OutLabAddressInfoDto> outlabAddressInfoDtoList1 = outLabAddressInfoDto.getOutlabAddressInfoDtoList();
				outLabMasterDto.setOutlabAddressInfoDtoList(outlabAddressInfoDtoList1);


				// this is for set payment info
				OutLabPaymentInfoDto outLabPaymentInfoDto = (OutLabPaymentInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabPaymentInfoDtoList,OutLabPaymentInfoDto.class);

				List<OutLabPaymentInfoDto> outlabPaymentInfoDtoList1 = outLabPaymentInfoDto.getOutlabPaymentInfoDtoList();
				outLabMasterDto.setOutlabPaymentInfoDtoList(outlabPaymentInfoDtoList1);
				
				

				// this is for set terms and condition info
				OutLabTermsAndConditionInfoDto termsAndConditionInfoDto = (OutLabTermsAndConditionInfoDto) ConfigUIJSONUtility.getObjectFromJSON(outlabTermsAndConditionInfoDtoList,OutLabTermsAndConditionInfoDto.class);

				List<OutLabTermsAndConditionInfoDto> outlabTermsAndConditionInfoDtoList1 = termsAndConditionInfoDto.getOutlabTermsAndConditionInfoDtoList();
				outLabMasterDto.setOutlabTermsAndConditionInfoDtoList(outlabTermsAndConditionInfoDtoList1);		
				
				// this is for set out test lab info
				OutLabTestmasterDto outLobTestmasterDto = (OutLabTestmasterDto) ConfigUIJSONUtility.getObjectFromJSON(outlabTestInfoDetails,OutLabTestmasterDto.class);

				List<OutLabTestmasterDto> outlabTestInfoDetailsList = outLobTestmasterDto.getOutlabTestInfoDetailsList();
				outLabMasterDto.setOutlabTestInfoDetailsList(outlabTestInfoDetailsList);
				

				sessionfactory.getCurrentSession().merge(outLabMasterDto);

				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			log.error("error for saving outlab Master....",e);
			return 0;
		}
	}

	@Override
	public List<OutLabMasterDto> getAllOutLabMaster() {
		List<OutLabMasterDto> outlabmasterList = null;
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(OutLabMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.addOrder(Order.asc("id"));
			criteria.setMaxResults(10);
			outlabmasterList = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return outlabmasterList;
	}

	@Override
	public boolean deleteOutLabMasterId(Integer outlabmasterId,
			HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try {
			OutLabMasterDto outlabtDto = (OutLabMasterDto) sessionfactory.getCurrentSession().get(OutLabMasterDto.class,outlabmasterId);
			outlabtDto.setDeleted("Y");
			outlabtDto.setDeletedDate(new Date(new java.util.Date().getTime()));
			outlabtDto.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public OutLabMasterDto editOutLabMasterById(Integer outlabmasterId) {
		OutLabMasterDto lab = new OutLabMasterDto();
		
		List<OutLabGeneralInfoDto> outlabrGeneralInfoDtoList=new ArrayList<OutLabGeneralInfoDto>();
		List<OutLabContactInfoDto> outlabContactInfoDtoList=new ArrayList<OutLabContactInfoDto>();
		List<OutLabAddressInfoDto> outlabAddressInfoDtoList=new ArrayList<OutLabAddressInfoDto>();
		
		List<OutLabPaymentInfoDto> outlabPaymentInfoDtoList=new ArrayList<OutLabPaymentInfoDto>();
		List<OutLabTermsAndConditionInfoDto> outlabTermsAndConditionInfoDtoList=new ArrayList<OutLabTermsAndConditionInfoDto>();
		List<OutLabTestmasterDto> outlabTestInfoDetailsList=new ArrayList<OutLabTestmasterDto>();
		try {
			lab = (OutLabMasterDto) sessionfactory.getCurrentSession().get(OutLabMasterDto.class,outlabmasterId);
			
			for (OutLabGeneralInfoDto dto : lab.getOutlabrGeneralInfoDtoList()) {
				 if(dto.getDeleted().equalsIgnoreCase("N")){
					 outlabrGeneralInfoDtoList.add(dto);
				 }
			}
			
			for(OutLabContactInfoDto dto :lab.getOutlabContactInfoDtoList()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					outlabContactInfoDtoList.add(dto);
				}
			}
			
			for(OutLabAddressInfoDto dto : lab.getOutlabAddressInfoDtoList()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					outlabAddressInfoDtoList.add(dto);
				}
			}
			
			
			for (OutLabPaymentInfoDto dto : lab.getOutlabPaymentInfoDtoList()) {
				 if(dto.getDeleted().equalsIgnoreCase("N")){
					 outlabPaymentInfoDtoList.add(dto);
				 }
			}
			
			for(OutLabTermsAndConditionInfoDto dto :lab.getOutlabTermsAndConditionInfoDtoList()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					outlabTermsAndConditionInfoDtoList.add(dto);
				}
			}
			
			for(OutLabTestmasterDto dto : lab.getOutlabTestInfoDetailsList()) {
				if(dto.getDeleted().equalsIgnoreCase("N")) {
					outlabTestInfoDetailsList.add(dto);
				}
			}

			lab.setOutlabrGeneralInfoDtoList(outlabrGeneralInfoDtoList);
			lab.setOutlabContactInfoDtoList(outlabContactInfoDtoList);
			lab.setOutlabAddressInfoDtoList(outlabAddressInfoDtoList);
			

			lab.setOutlabPaymentInfoDtoList(outlabPaymentInfoDtoList);
			lab.setOutlabTermsAndConditionInfoDtoList(outlabTermsAndConditionInfoDtoList);
			lab.setOutlabTestInfoDetailsList(outlabTestInfoDetailsList);
			
			return lab;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lab;
	}

	@Override
	public boolean deleteOutLabMasterSlave(Integer outlabslaveId,
			Integer labMasterId, String callFrom, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		try {
			
			if(callFrom.equals("deleteGeneral"))
			{
				OutLabGeneralInfoDto generalDto = (OutLabGeneralInfoDto) sessionfactory.getCurrentSession().get(OutLabGeneralInfoDto.class,outlabslaveId);
				generalDto.setDeleted("Y");
				generalDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				generalDto.setDeletedBy(userId);
			}else if(callFrom.equals("deleteContact"))
			{
				OutLabContactInfoDto contactDto = (OutLabContactInfoDto) sessionfactory.getCurrentSession().get(OutLabContactInfoDto.class,outlabslaveId);
				contactDto.setDeleted("Y");
				contactDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				contactDto.setDeletedBy(userId);
				
			}else if(callFrom.equals("deleteAddress"))
			{
				OutLabAddressInfoDto addressDto = (OutLabAddressInfoDto) sessionfactory.getCurrentSession().get(OutLabAddressInfoDto.class,outlabslaveId);
				addressDto.setDeleted("Y");
				addressDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				addressDto.setDeletedBy(userId);
				
			}else if(callFrom.equals("deletePayment"))
			{
				OutLabPaymentInfoDto paymentDto = (OutLabPaymentInfoDto) sessionfactory.getCurrentSession().get(OutLabPaymentInfoDto.class,outlabslaveId);
				paymentDto.setDeleted("Y");
				paymentDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				paymentDto.setDeletedBy(userId);
				
			}else if(callFrom.equals("deleteTermsAndCondition"))
			{
				OutLabTermsAndConditionInfoDto termsAndConditionDto = (OutLabTermsAndConditionInfoDto) sessionfactory.getCurrentSession().get(OutLabTermsAndConditionInfoDto.class,outlabslaveId);
				termsAndConditionDto.setDeleted("Y");
				termsAndConditionDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				termsAndConditionDto.setDeletedBy(userId);
				
			}else if(callFrom.equals("deleteOutLab"))
			{
				OutLabTestmasterDto outLabDto = (OutLabTestmasterDto) sessionfactory.getCurrentSession().get(OutLabTestmasterDto.class,outlabslaveId);
				outLabDto.setDeleted("Y");
				outLabDto.setDeletedDate(new Date(new java.util.Date().getTime()));
				outLabDto.setDeletedBy(userId);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public OutLabMasterDto outLabMasterAutoSuggestion(String outLabName, HttpServletRequest request) {
		OutLabMasterDto dto = new OutLabMasterDto();
		List<OutLabMasterDto> outLabMasterDtoList = new ArrayList<OutLabMasterDto>();
		try {
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			
			Query qry = sessionfactory.getCurrentSession().createQuery("SELECT id AS id, name AS name FROM OutLabMasterDto WHERE name like concat('%',:outLabName,'%') AND deleted =:deleted AND unitId =:unitId"); 
		  	  qry.setMaxResults(20); 
		  	  qry.setParameter("outLabName", outLabName);
		  	  qry.setParameter("deleted", "N");
		  	qry.setParameter("unitId", unitId);
			
			
			qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = qry.list();
			for (Map<String, Object> row : masterRow) {
				OutLabMasterDto outLabMasterDto = new OutLabMasterDto();
				outLabMasterDto.setName((String) row.get("name"));
				outLabMasterDto.setId((Integer) row.get("id"));
				outLabMasterDtoList.add(outLabMasterDto);
			}
			dto.setOutLabMasterDtoList(outLabMasterDtoList);

		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for  outLabMasterAutoSuggestion....",e);
			return dto;
		}
		return dto;
	}

	@Override
	public OutLabMasterDto getOutLabLabMasterById(Integer outlabmasterId, HttpServletRequest request) {
		OutLabMasterDto dto = new OutLabMasterDto();
		List<OutLabMasterDto> outLabMasterDtoList = new ArrayList<OutLabMasterDto>();
		
		try {
			OutLabMasterDto masterDto = (OutLabMasterDto) sessionfactory.getCurrentSession().get(OutLabMasterDto.class, outlabmasterId);
			outLabMasterDtoList.add(masterDto);
			
			dto.setOutLabMasterDtoList(outLabMasterDtoList);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public List<OutLabMasterDto> getAllOutLabMasterByTestId(int testId) {
		
		List<OutLabMasterDto> outlabmasterList = new ArrayList<>();
		try {
			   String sql="select om.out_lab_name as name ,om.out_lab_id as id from pathology_out_lab_master  om left join  pathology_out_lab_test_master oslave\n" + 
			   		"on om.out_lab_id =oslave.out_lab_id where om.deleted='N' and oslave.test_id="+testId+"";
			   
			   SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			   query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			   List<Map<String, Object>> list=query.list();
			   for(Map<String, Object> row : list){
				   OutLabMasterDto obj=new OutLabMasterDto();
				   obj.setId(((Number)row.get("id")).intValue());
				   obj.setName((String)row.get("name"));
				   outlabmasterList.add(obj);
			   }
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return outlabmasterList;
	}
}