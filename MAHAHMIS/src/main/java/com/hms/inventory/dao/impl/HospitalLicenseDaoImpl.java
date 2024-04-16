package com.hms.inventory.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
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

import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.inventory.dao.HospitalLicenseDao;
import com.hms.inventory.dto.HospitalLicenseDocUploadDto;
import com.hms.inventory.dto.HospitalLicenseDto;
import com.hms.inventory.service.HospitalLicenseService;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class HospitalLicenseDaoImpl implements HospitalLicenseDao {
	
	static Logger log = Logger
			.getLogger(HospitalLicenseDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	HospitalLicenseDto hospitalLicenseDto;
	
	@Autowired
	HospitalLicenseService hlservice;

	@Override
	public int[] saveHospitalLicense(String obj, HttpServletRequest request) {
		int[] status = new int[2];
		try {
			
			
			HospitalLicenseDto obj1 = (HospitalLicenseDto) ConfigUIJSONUtility
					.getObjectFromJSON(obj,
							HospitalLicenseDto.class);
			HospitalLicenseDto listHospitalLicenseDto = obj1.getLstHospitalLicenseDto().get(0);
			
				if (listHospitalLicenseDto.getId() == 0) {
					
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					listHospitalLicenseDto.setCreatedBy(userId);
					listHospitalLicenseDto.setUnitId(unitId);
					HospitalLicenseDto dto = (HospitalLicenseDto) sessionFactory
							.getCurrentSession().merge(listHospitalLicenseDto);
	
					Integer masterId = dto.getId();
					
					status[0] = 1;
					status[1] = masterId;
				} else {
	
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					Integer unitId = (Integer) session.getAttribute("uId");
					listHospitalLicenseDto.setUpdatedBy(userId);
					listHospitalLicenseDto.setUnitId(unitId);
					HospitalLicenseDto dto = (HospitalLicenseDto) sessionFactory
							.getCurrentSession().merge(listHospitalLicenseDto);
	
					Integer masterId = dto.getId();
					
					status[0] = 2;
					status[1] = masterId;
				}
		
			} catch (Exception e) {
				log.error("error for saveHospitalLicense...." + e.getMessage());
				status[0] = 0;
				status[1] = 0;
				return status;
			}
		return status;
	}

	@Override
	public List<HospitalLicenseDto> getAllHospitalLicense(
			HttpServletRequest request) {
		// TODO Auto-generated method stub

		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		List<HospitalLicenseDto> hospitalLicenseDtoListNew = new ArrayList<HospitalLicenseDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(HospitalLicenseDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
				criteria.setMaxResults(10);
				hospitalLicenseDtoList = criteria.list();
				for (HospitalLicenseDto hospitalLicenseDto : hospitalLicenseDtoList) {
					hospitalLicenseDto.setUserName(getUserName(hospitalLicenseDto.getCreatedBy(),request));
					hospitalLicenseDto.setLastLoggedInDateTime(getUserLogedInDateTime(hospitalLicenseDto.getCreatedBy(),request));
					HospitalLicenseDocUploadDto hospitalLicenseDocUploadDto = getUploadedHospitalLicenseDocuments(hospitalLicenseDto.getId(),request);
					hospitalLicenseDto.setLstHospitalLicenseDocUploadDto(hospitalLicenseDocUploadDto.getLstHospitalLicenseDocUploadDto());
					String callFrom = "";
					Date date = new Date();
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
					String currentDate = sdf.format(date);
					if(hospitalLicenseDto.getIsSendActionAlert().equalsIgnoreCase("N")){
						callFrom = "ActionAlert";
						DateFormat dateFormat = new SimpleDateFormat(
								"yyyy-MM-dd");
						String strActionAlertDate= "";
						if(hospitalLicenseDto.getActionAlertDate() !=null){
							strActionAlertDate = dateFormat.format(hospitalLicenseDto.getActionAlertDate());
							if(strActionAlertDate.equalsIgnoreCase(currentDate)){
								sendMailHospitalLicense(hospitalLicenseDto,callFrom, request);
							}
						}
					}
					
					if(hospitalLicenseDto.getIsSendValidTill().equalsIgnoreCase("N")){
						callFrom = "ValidTill";
						DateFormat dateFormat = new SimpleDateFormat(
								"yyyy-MM-dd");
						String strValidTillDate = "";
						if(hospitalLicenseDto.getValidTillDate() !=null){
							dateFormat.format(hospitalLicenseDto.getValidTillDate());
							if(strValidTillDate.equalsIgnoreCase(currentDate)){
								sendMailHospitalLicense(hospitalLicenseDto,callFrom, request);
							}	
						}
					}
					
					if(hospitalLicenseDto.getIsSendRenewalSub().equalsIgnoreCase("N")){
						callFrom = "RenewalSub";
						DateFormat dateFormat = new SimpleDateFormat(
								"yyyy-MM-dd");
						String strRenewalSubmissionDate = "";
						if(hospitalLicenseDto.getRenewalSubmissionDate() !=null){
							dateFormat.format(hospitalLicenseDto.getRenewalSubmissionDate());
							
							if(strRenewalSubmissionDate.equalsIgnoreCase(currentDate)){
								sendMailHospitalLicense(hospitalLicenseDto,callFrom, request);
							}
						}
					}
					
					hospitalLicenseDtoListNew.add(hospitalLicenseDto);
				}
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllHospitalLicense...." + e.getMessage());
			return null;
		}
		return hospitalLicenseDtoListNew;
	}

	@Override
	public HospitalLicenseDto editHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request) {
			try {
				HttpSession session = request.getSession();
				Integer unitId = (Integer) session.getAttribute("uId"); 
				
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(HospitalLicenseDto.class);
				criteria.add(Restrictions.eq("id", hospitalLicenseId));
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				hospitalLicenseDto = (HospitalLicenseDto) criteria
						.uniqueResult();
				
	
				return hospitalLicenseDto;
			} catch (Exception e) {
				log.error("error for editHospitalLicense...." + e.getMessage());
				return null;
			}
	}
	
	@Override
	public int deleteHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request) {
		try{
			
			HospitalLicenseDto obj=	(HospitalLicenseDto)sessionFactory.getCurrentSession().get(HospitalLicenseDto.class, hospitalLicenseId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new java.util.Date());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
			HospitalLicenseDto dto1 = (HospitalLicenseDto) sessionFactory.getCurrentSession().merge(obj);
			log.debug("this is for deleteHospitalLicense "+dto1);
			if(dto1.getDeleted().equalsIgnoreCase("Y")){
				return 1;	
			}else{
				return 0;
			}
			
		}catch(Exception e){
			log.error("this is for deleteHospitalLicense "+e.getMessage());
			e.printStackTrace();
			return 0;	
		}
		// TODO Auto-generated method stub
	}
	
	@Override
	public int uploadHospitalLicenseDocument(String document,
			HttpServletRequest request) {
		int res = 0;
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			HospitalLicenseDocUploadDto hospitalLicenseDocUploadDto = (HospitalLicenseDocUploadDto) ConfigUIJSONUtility
					.getObjectFromJSON(document,
							HospitalLicenseDocUploadDto.class);
			HospitalLicenseDocUploadDto obj = hospitalLicenseDocUploadDto.getLstHospitalLicenseDocUploadDto().get(0);

			if (obj.getId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				obj.setDeleted("N");
				sessionFactory.getCurrentSession().merge(obj);
				res = 1;
			} else {
				obj.setUpdatedBy(userId);
				obj.setDeleted("N");
				obj.setUnitId(unitId);
				sessionFactory.getCurrentSession().merge(obj);
				res = 2;
			}
		} catch (Exception e) {
			log.error("error for uploadHospitalLicenseDocument...." + e.getMessage());
			e.printStackTrace();
			return res;
		}
		return res;
	}

	@Override
	public HospitalLicenseDocUploadDto getUploadedHospitalLicenseDocuments(
			Integer hospitalLicenseId, HttpServletRequest request) {

		List<HospitalLicenseDocUploadDto> list = new ArrayList<HospitalLicenseDocUploadDto>();
		HospitalLicenseDocUploadDto obj = new HospitalLicenseDocUploadDto();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");

			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalLicenseDocUploadDto.class);
			criteria.add(Restrictions.eq("hospitalLicenseMasterId", hospitalLicenseId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));

			criteria.addOrder(Order.desc("updatedDate"));
			list = criteria.list();
			if (list.size() > 0) {
				obj.setLstHospitalLicenseDocUploadDto(list);
			}
		} catch (Exception e) {
			log.error("error for getUploadedHospitalLicenseDocuments...." + e.getMessage());
			e.printStackTrace();
		}
		return obj;

	}

	@Override
	public HospitalLicenseDto getHospitalLicensePagination(Integer startIndex,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		List<HospitalLicenseDto> hospitalLicenseDtoListNew = new ArrayList<HospitalLicenseDto>();
		try {

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(HospitalLicenseDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			hospitalLicenseDtoList = criteria.list();
			for (HospitalLicenseDto hospitalLicenseDto : hospitalLicenseDtoList) {
				hospitalLicenseDto.setUserName(getUserName(hospitalLicenseDto.getCreatedBy(),request));
				hospitalLicenseDto.setLastLoggedInDateTime(getUserLogedInDateTime(hospitalLicenseDto.getCreatedBy(),request));
				HospitalLicenseDocUploadDto hospitalLicenseDocUploadDto = getUploadedHospitalLicenseDocuments(hospitalLicenseDto.getId(),request);
				hospitalLicenseDto.setLstHospitalLicenseDocUploadDto(hospitalLicenseDocUploadDto.getLstHospitalLicenseDocUploadDto());
				hospitalLicenseDtoListNew.add(hospitalLicenseDto);
			}
			
			hospitalLicenseDto.setLstHospitalLicenseDto(hospitalLicenseDtoListNew);
		} catch (Exception e) {
			log.error("error for getHospitalLicensePagination...." + e.getMessage());
			e.printStackTrace();
		}
		return hospitalLicenseDto;
	}

	@Override
	public Integer getAllPageCountHospitalLicense(HttpServletRequest request) {
		// TODO Auto-generated method stub
		Integer countNew = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String sql = "";
			sql = "SELECT count(*) FROM hospital_license_records as grn WHERE deleted != 'Y' and unit_id="
					+ unitId;
			Query countQuery = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			countNew = ((Number) countQuery.uniqueResult()).intValue();
		} catch (Exception e) {
			log.error("error for getAllPageCountHospitalLicense...." + e.getMessage());
			e.printStackTrace();
		}
		return countNew;
	}
	
	@Override
	public String  getUserName(Integer userId , HttpServletRequest request) {
		Users obj = (Users)sessionFactory.getCurrentSession().get(Users.class,  userId);
		String userName = obj.getTitle()+" "+obj.getUser_Name();
		return userName;
	}
	
	@Override
	public String  getUserLogedInDateTime(Integer userId , HttpServletRequest request) {
		Users obj = (Users) sessionFactory.getCurrentSession().get(Users.class,  userId);
		String userLogedInDateTime = obj.getCurrent_loged_in_date_time();
		return userLogedInDateTime;
	}

	@Override
	public List<HospitalLicenseDto> getAllHospitalLicenseReports(
			HttpServletRequest request) {
		// TODO Auto-generated method stub

		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		List<HospitalLicenseDto> hospitalLicenseDtoListNew = new ArrayList<HospitalLicenseDto>();
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(HospitalLicenseDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.addOrder(Order.desc("id"));
				hospitalLicenseDtoList = criteria.list();
				for (HospitalLicenseDto hospitalLicenseDto : hospitalLicenseDtoList) {
					hospitalLicenseDto.setUserName(getUserName(hospitalLicenseDto.getCreatedBy(),request));
					hospitalLicenseDto.setLastLoggedInDateTime(getUserLogedInDateTime(hospitalLicenseDto.getCreatedBy(),request));
					hospitalLicenseDtoListNew.add(hospitalLicenseDto);
				}
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for getAllHospitalLicenseReports...." + e.getMessage());
			return null;
		}
		return hospitalLicenseDtoListNew;
	}

	@Override
	public HospitalLicenseDto searchHospitalLicense(String searchByDate,
			String fromDate, String toDate, String searchByDocument,
			String documentName, String licenseNo, String status,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		String sqlParam = "select * FROM hospital_license_records as p where ";
			if(searchByDate != "0" && searchByDate.equalsIgnoreCase("All")){
				if((searchByDate != "0" && searchByDate.equalsIgnoreCase("All") && searchByDocument == "0" && status == "0")){
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("All") && searchByDocument.equalsIgnoreCase("All")){
					if(((fromDate !="" && fromDate.equalsIgnoreCase("0")) && (toDate !="" && toDate.equalsIgnoreCase("0")))){
						sqlParam  = sqlParam  + " p.deleted='N'";	
					}else{
						sqlParam  = sqlParam  + " Date_Format(p.created_date_time,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.created_date_time,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') AND p.deleted='N'";
					}
					
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("All") && searchByDocument.equalsIgnoreCase("Document Name")  && documentName !="" && licenseNo == ""  ){
					sqlParam  = sqlParam  + " p.document_name like '" + documentName + "%' and p.deleted='N'";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("All") && searchByDocument.equalsIgnoreCase("License No") && licenseNo!="" && documentName == ""){
					sqlParam  = sqlParam  + " p.reg_no_license_no like '" + licenseNo + "%' and p.deleted='N'";
				}else {
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}
				// this is entry date filter
			}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Entry Date")){
			
				if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Entry Date") && searchByDocument == "0")){
					sqlParam  = sqlParam  +" Date_Format(p.created_date_time,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.created_date_time,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') And p.deleted='N' ";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Entry Date") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("All")){
					sqlParam  = sqlParam  + " Date_Format(p.created_date_time,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.created_date_time,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.deleted='N'";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Entry Date") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("Document Name")  && documentName !=""){
					sqlParam  = sqlParam  + " Date_Format(p.created_date_time,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.created_date_time,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.document_name like '" + documentName + "%' and p.deleted='N'";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Entry Date") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("License No") && licenseNo !="" ){
					sqlParam  = sqlParam  + " Date_Format(p.created_date_time,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.created_date_time,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.reg_no_license_no like '" + licenseNo + "%' and p.deleted='N'";
				}else {
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}
				// this is valid from date filter
			}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid from"))){
				
				if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid from") && searchByDocument == "0")){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_from_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_from_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') And p.deleted='N' ";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid from") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("All")  ){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_from_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_from_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.deleted='N'";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid from") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("Document Name") && documentName !="" ){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_from_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_from_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.document_name like '" + documentName + "%' and p.deleted='N'";
				}else if(searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid from") && searchByDocument.equalsIgnoreCase("License No")  && licenseNo !="" ){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_from_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_from_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.reg_no_license_no like '" + licenseNo + "%' and p.deleted='N'";
				}else {
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}
				// this is valid till date filter 
			}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid till"))){
				
				if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid till") && searchByDocument == "0" )){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_till_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_till_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') And p.deleted='N' ";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid till") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("All"))){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_till_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_till_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and  p.deleted='N'";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid till") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("Document Name") && documentName !="")){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_till_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_till_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.document_name like '" + documentName + "%' and p.deleted='N'";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Valid till") && searchByDocument.equalsIgnoreCase("License No") && licenseNo !="")){
					sqlParam  = sqlParam  + "  Date_Format(p.valid_till_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.valid_till_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.reg_no_license_no like '" + licenseNo + "%' and p.deleted='N'";
				}else {
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}
				// this is renewal submission date filter 
			}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Renewal Submission"))){
				
				if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Renewal Submission") && searchByDocument == "0")){
					sqlParam  = sqlParam  + "  Date_Format(p.renewal_submission_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.renewal_submission_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') And p.deleted='N' ";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Renewal Submission") && searchByDocument.equalsIgnoreCase("All"))){
					sqlParam  = sqlParam  + "  Date_Format(p.renewal_submission_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.renewal_submission_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.deleted='N'";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Renewal Submission") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("Document Name") &&  documentName !="" )){
					sqlParam  = sqlParam  + "  Date_Format(p.renewal_submission_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.renewal_submission_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.document_name like '" + documentName + "%' and p.deleted='N'";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Renewal Submission") && searchByDocument.equalsIgnoreCase("License No") && licenseNo !="")){
					sqlParam  = sqlParam  + "  Date_Format(p.renewal_submission_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.renewal_submission_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.reg_no_license_no like '" + licenseNo + "%' and p.deleted='N'";
				}else {
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}
			}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Action Alert"))){
				
				if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Action Alert") && searchByDocument == "0")){
					sqlParam  = sqlParam  + "  Date_Format(p.action_alert_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.action_alert_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') And p.deleted='N' ";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Action Alert") && searchByDocument.equalsIgnoreCase("All"))){
					sqlParam  = sqlParam  + "  Date_Format(p.action_alert_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.action_alert_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.deleted='N'";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Action Alert") && searchByDocument != "0" && searchByDocument.equalsIgnoreCase("Document Name") &&  documentName !="" )){
					sqlParam  = sqlParam  + "  Date_Format(p.action_alert_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.action_alert_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.document_name like '" + documentName + "%' and p.deleted='N'";
				}else if((searchByDate != "0" && searchByDate.equalsIgnoreCase("Action Alert") && searchByDocument.equalsIgnoreCase("License No") && licenseNo !="")){
					sqlParam  = sqlParam  + "  Date_Format(p.action_alert_date,'%Y-%m-%d') >= Date_Format('"+fromDate+"','%Y-%m-%d') AND Date_Format(p.action_alert_date,'%Y-%m-%d') <= Date_Format('"+toDate+"','%Y-%m-%d') and p.reg_no_license_no like '" + licenseNo + "%' and p.deleted='N'";
				}else {
					sqlParam  = sqlParam  + " p.deleted='N' ";
				}
			}
			
			if(status.equalsIgnoreCase("Expired")){
				sqlParam  = sqlParam + " and p.status = '" + status + "'";
			}else if(status.equalsIgnoreCase("Valid")){
				sqlParam  = sqlParam + " and p.status = '" + status + "'";
			}if(status.equalsIgnoreCase("NA")){
				sqlParam  = sqlParam + " and p.status = '" + status + "'";
			}
		sqlParam  = sqlParam + " order by id desc ";
		System.out.println("this is query "+sqlParam);
		SQLQuery getMaster = sessionFactory.getCurrentSession()
				.createSQLQuery(sqlParam);
		getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> masterRow = getMaster.list();
		
		for (Map<String, Object> row : masterRow) {
			HospitalLicenseDto obj = new HospitalLicenseDto();
			obj.setId((Integer) row.get("id"));
			obj.setDocumentName((String) row.get("document_name"));
			obj.setDescClauseNoDetails((String) row.get("desc_clause_no_details"));
			obj.setRegNoLicenseNo((String) row.get("reg_no_license_no"));
			obj.setIssuedOnDate((String) row.get("issued_on_date"));
			obj.setIssuingAuthOfficeName((String) row.get("issuing_auth_office_name"));
			obj.setIssuingAuthOfficeAddress((String) row.get("issuing_auth_office_address"));
			obj.setIsApplicable((String) row.get("is_applicable"));
			obj.setIssuingAuthorityContactPerson((String) row.get("issuing_auth_contact_person"));
			obj.setIssuingAuthorityContactNO((String) row.get("issuing_auth_contact_no"));
			obj.setIssuingAuthorityContactEmail((String) row.get("issuing_auth_contact_email"));
			obj.setValidFromDate((Date) row.get("valid_from_date"));
			obj.setValidTillDate((Date) row.get("valid_till_date"));
			obj.setRenewalSubmissionDate((Date) row.get("renewal_submission_date"));
			obj.setActionAlertDate((Date) row.get("action_alert_date"));
			obj.setStatus((String) row.get("status"));
			obj.setNote((String) row.get("note"));
			//obj.setImagePath((String)row.get(" image_path"));
			//obj.setImageStatus((String)row.get("image_status"));
			obj.setUserId((Integer)row.get("user_id"));
			obj.setUserName(getUserName((Integer)row.get("created_by"),request));
			obj.setLastLoggedInDateTime(getUserLogedInDateTime((Integer)row.get("created_by"),request));
			obj.setUnitId((Integer)row.get("unit_id"));
			obj.setDeletedDate((Date) row.get("delete_date_time"));
			obj.setDeleted((String) row.get("deleted"));
			obj.setDeletedBy((Integer)row.get("deleted_by"));
			obj.setCreatedBy((Integer)row.get("created_by"));
			obj.setCreatedDate((Date) row.get("created_date_time"));
			obj.setUpdatedBy((Integer)row.get("updated_by"));
			obj.setUpdatedDate((Date) row.get("updated_date_time"));
			hospitalLicenseDtoList.add(obj);
			obj = null;
		}
		List<HospitalLicenseDto> hospitalLicenseDtoListNew = new ArrayList<HospitalLicenseDto>();
		for (HospitalLicenseDto obj1 : hospitalLicenseDtoList) {
			HospitalLicenseDocUploadDto hospitalLicenseDocUploadDto = getUploadedHospitalLicenseDocuments(obj1.getId(),request);
			obj1.setLstHospitalLicenseDocUploadDto(hospitalLicenseDocUploadDto.getLstHospitalLicenseDocUploadDto());
			hospitalLicenseDtoListNew.add(obj1);
		}
		hospitalLicenseDto.setLstHospitalLicenseDto(hospitalLicenseDtoListNew);
		return hospitalLicenseDto;
	}
	
	@Override
	public HospitalLicenseDto hospitalLicenseDocumentAutoSuggestion(
			String documentName,  HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		try {

			String sql = "";
			
				sql = "SELECT p.id, p.document_name as name  FROM hospital_license_records p where p.document_name like '"
						+ documentName + "%' and p.deleted='N'";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();

			for (Map<String, Object> row : masterRow) {
				HospitalLicenseDto obj = new HospitalLicenseDto();
				obj
						.setDocumentName((String) row.get("name"));
				obj.setId((Integer) row.get("id"));
				hospitalLicenseDtoList.add(obj);
				obj = null;
			}
			hospitalLicenseDto.setLstHospitalLicenseDto(hospitalLicenseDtoList);

		} catch (Exception e) {
			log.error("error for hospitalLicenseAutoSuggestion...."
					+ e.getMessage());
			return null;
		}
		return hospitalLicenseDto;
	}
	
	@Override
	public HospitalLicenseDto hospitalLicenseRegNOLicenseNOAutoSuggestion(
			String regNolicenseNo,  HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<HospitalLicenseDto> hospitalLicenseDtoList = new ArrayList<HospitalLicenseDto>();
		try {

			String sql = "";
			
			sql = "SELECT p.id, p.reg_no_license_no as name  FROM hospital_license_records p where p.reg_no_license_no like '"+regNolicenseNo+"%' and p.deleted='N'";

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();

			for (Map<String, Object> row : masterRow) {
				HospitalLicenseDto obj = new HospitalLicenseDto();
				obj.setRegNoLicenseNo((String) row.get("name"));
				obj.setId((Integer) row.get("id"));
				hospitalLicenseDtoList.add(obj);
				obj = null;
			}
			hospitalLicenseDto.setLstHospitalLicenseDto(hospitalLicenseDtoList);

		} catch (Exception e) {
			log.error("error for hospitalLicenseAutoSuggestion...."
					+ e.getMessage());
			return null;
		}
		return hospitalLicenseDto;
	}

	@Override
	public String sendMailHospitalLicense(HospitalLicenseDto hospitalLicenseDto,String callFrom,
			HttpServletRequest request) {
		try {
			
			List<Doctor> userList = hlservice.getAllAdminUser(request);
			
			for (Doctor doctor : userList) {
				
				if(doctor !=null && doctor.getEmail_Id() !=null && doctor.getEmail_Id() !="undefined"){
					if(doctor.getDoc_Type().equalsIgnoreCase("admin")){
						
						String host = "smtp.gmail.com";
				        String port = "587";//"465";
				        final String mailFrom = "noreply.ltahc@gmail.com";
				        final String password ="qneytkrmbdfjboht";
				        //final String password ="wkmbqgmigrbzsjge";
				        // message info
				        String mailTo = doctor.getEmail_Id();
				       // String mailCC = "thorat1091@gmail.com";
				        String subject = hospitalLicenseDto.getDocumentName()+" Renewal Alert ";
				        DateFormat dateFormat = new SimpleDateFormat(
								"yyyy-MM-dd");
				        String  mailBody = " Hello Admin,"+
			                	" 	 \n <br> " +
			                	" 	 \n <br> " +
			                	" 	 \n <br>" +
			                	"	 \n The license - "+hospitalLicenseDto.getDocumentName() +", License no. - "+hospitalLicenseDto.getRegNoLicenseNo()+" is due for renewal, valid from "+dateFormat.format(hospitalLicenseDto.getValidFromDate())+" and to "+dateFormat.format(hospitalLicenseDto.getValidTillDate())+". " +
			                	" 	 \n <br>" +
			                	" 	 \n <br>" +
			                	" 	 \n Your renewal submission date is - "+dateFormat.format(hospitalLicenseDto.getRenewalSubmissionDate())+"." +
			                	" 	 \n <br>" +
			                	" 	 \n <br>" +
			                	" 	 \n <br>" +
			                	"	 \n Regards, " +
			                	"	 \n <br> L&T Health Centre, " +
			                	"	 \n <br> Andheri, Mumbai. " +
			                	"	 \n <br> 022 - 6725 1455/56";
				            		  
				        // sets SMTP server properties
				        Properties properties = new Properties();
				        properties.put("mail.smtp.host", host);
				        properties.put("mail.smtp.port", port);
				        properties.put("mail.smtp.auth", "true");
				        properties.put("mail.smtp.starttls.enable", "true");
				        properties.put("mail.user", mailFrom);
				        properties.put("mail.password", password);
				       
				        // creates a new session with an authenticator
				        Authenticator auth = new Authenticator() {
				                  
				        public PasswordAuthentication getPasswordAuthentication() {
				                      return new PasswordAuthentication(mailFrom, password);
				                }
				          };
				         Session mailSession = Session.getInstance(properties, auth);       
				              // creates a new e-mail message
				         Message msg = new MimeMessage(mailSession);       
				         msg.setFrom(new InternetAddress(mailFrom));
				         InternetAddress[] toAddresses = { new InternetAddress(mailTo) };
				              //InternetAddress[] CCAddresses = { new InternetAddress(mailCC) };
				         msg.setRecipients(Message.RecipientType.TO, toAddresses);
				        // msg.setRecipients(Message.RecipientType.CC,InternetAddress.parse(mailCC));
				              //msg.setRecipients(Message.RecipientType.CC, CCAddresses );
				         msg.setSubject(subject);
				         msg.setSentDate(new Date());       
				              // creates message part
				         MimeBodyPart messageBodyPart = new MimeBodyPart();
				         messageBodyPart.setContent(mailBody, "text/html");	       
				              // creates multi-part
				         Multipart multipart = new MimeMultipart();
				         multipart.addBodyPart(messageBodyPart);			
				        /* MimeBodyPart attachPart = new MimeBodyPart();
				          	 attachPart.attachFile(DEST);
				             multipart.addBodyPart(attachPart);	*/		                   
				              // sets the multi-part as e-mail's content
				             msg.setContent(multipart);
				       
				              // sends the e-mail
				            Transport.send(msg);
						
				            HospitalLicenseDto obj=(HospitalLicenseDto)sessionFactory.getCurrentSession().get(HospitalLicenseDto.class, hospitalLicenseDto.getId());
				            if(callFrom.equalsIgnoreCase("ActionAlert")){
				            	obj.setIsSendActionAlert("Y");
				            }else if( callFrom.equalsIgnoreCase("ValidTill") ){
				            	obj.setIsSendValidTill("Y");
				            }else if(callFrom.equalsIgnoreCase("RenewalSub")){
				            	obj.setIsSendRenewalSub("Y");
				            }
				  			HttpSession session = request.getSession();
				  			Integer userId = (Integer) session.getAttribute("userId1");
				  			obj.setDeletedBy(userId);
				  			HospitalLicenseDto dto1 = (HospitalLicenseDto) sessionFactory.getCurrentSession().merge(obj);
						}
					}
			}
	              
		} catch (Exception e) {
			
			// TODO: handle exception
		}
		return null;
	}

	@Override
	public int deleteUploadedDocumentHospitalLicense(Integer hospitalLicenseId,
			HttpServletRequest request) {
		try{
			
			HospitalLicenseDocUploadDto obj=	(HospitalLicenseDocUploadDto)sessionFactory.getCurrentSession().get(HospitalLicenseDocUploadDto.class, hospitalLicenseId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new java.util.Date());
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeletedBy(userId);
			HospitalLicenseDocUploadDto dto1 = (HospitalLicenseDocUploadDto) sessionFactory.getCurrentSession().merge(obj);
			log.debug("this is for deleteUploadedDocumentHospitalLicense "+dto1);
			if(dto1.getDeleted().equalsIgnoreCase("Y")){
				return 1;	
			}else{
				return 0;
			}
			
		}catch(Exception e){
			log.error("this is for deleteHospitalLicense "+e.getMessage());
			e.printStackTrace();
			return 0;	
		}
		// TODO Auto-generated method stub
	}

	@Override
	public List<Doctor> getAllAdminUser(HttpServletRequest request) {
		// TODO Auto-generated method stub
		try{
			
			String sql = "SELECT * FROM doctor WHERE doc_Type='admin'";
		
			List<Doctor> liDoctor = new ArrayList<Doctor>();
		
			
			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
		
			for (Map<String, Object> row : masterRow) {
				Doctor objDoctor = new Doctor();
				objDoctor.setEmail_Id((String) row.get("email_Id"));
				objDoctor.setDoctor_ID((Integer) row.get("Doctor_ID"));
				objDoctor.setDoc_Type((String) row.get("doc_Type"));
				liDoctor.add(objDoctor);
				objDoctor = null;
			}
		
			return liDoctor;
			
		}catch(Exception e){
			log.error("this is for getAllAdminUser "+e.getMessage());
			e.printStackTrace();
			return null;	
		}
	}
}
