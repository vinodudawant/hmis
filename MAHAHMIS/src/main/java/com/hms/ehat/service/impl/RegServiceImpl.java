package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.dto.Hall;
import com.hms.ehat.dao.RegDao;
import com.hms.ehat.dto.AdmissionReportSiddhiDTO;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.DemographicPatientDto;
import com.hms.ehat.dto.DoctorDto;
import com.hms.ehat.dto.DoctorWisePatientsCountDto;
import com.hms.ehat.dto.IpdBedDetailsDTO;
import com.hms.ehat.dto.MlcDetailsDto;
import com.hms.ehat.dto.MultipleSponsorDto;
import com.hms.ehat.dto.OpdQueManagmentViewDto;
import com.hms.ehat.dto.OtherBillingDto;
import com.hms.ehat.dto.PaymentResponsibleDto;
import com.hms.ehat.dto.PrefixDto;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegTreBillDto1;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationOtherDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ehat.dto.admissionReportViewDto;
import com.hms.ehat.service.RegService;

@Service
public class RegServiceImpl implements RegService {

	@Autowired
	RegDao regdao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	//@author : Vinod Udawant @date: 01-June-2019 @reason : To Save and Update patient
	public int savePatient(String patientDetails,String treatDetails,String billMaster,String billDetails,String queryType,
				Integer AppId,String paymentResponsibleDetails,String mlcDetails,HttpServletRequest request){
		
		int a = regdao.savePatient(patientDetails,treatDetails,billMaster,billDetails,queryType,AppId,paymentResponsibleDetails,mlcDetails,request);
		return a;
	}
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
	// Services
	@Override
	@Transactional
	public int savePatientRegDetails(RegistrationDto registrationDto,
			HttpServletRequest request, String queryType,Integer AppId) {

		// current login user id
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			registrationDto.setCreatedBy(userId);	
			registrationDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			registrationDto.setDeleted("N");

		} else if (queryType.equalsIgnoreCase("update") || queryType.equalsIgnoreCase("markvisit")) {// To Update Record

			registrationDto.setUpdatedBy(userId);
			registrationDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			registrationDto.setDeleted("N");

		}
						// call to function in DAO
		int a = regdao.savePatientRegDetails(registrationDto, queryType, userId,AppId);
		
		 return a;
	}
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
		// Treatment
		@Override
		@Transactional
		public int saveTreatmentDetails(TreatmentDto treatmentDto,
				HttpServletRequest request, String queryType) {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current
																		// login
				String s1=request.getParameter("BMI");
				String s2=request.getParameter("BSA");														 
				String s3=request.getParameter("HCIM");														 
				double bmi=Double.valueOf(s1);
				double bsa=Double.valueOf(s2);
				double hcim=Double.valueOf(s3);
 
			if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) { // To Insert Record
				treatmentDto.setBMI(bmi);
				treatmentDto.setBSA(bsa);
				treatmentDto.setHCIM(hcim);
				treatmentDto.setCreatedBy(userId);	
				treatmentDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				treatmentDto.setDeleted("N");

			} else if (queryType.equalsIgnoreCase("update")) {// To Update Record
				treatmentDto.setBMI(bmi);
				treatmentDto.setBSA(bsa);
				treatmentDto.setHCIM(hcim);
				treatmentDto.setUpdatedBy(userId);
				treatmentDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				treatmentDto.setDeleted("N");

			}
							// call to function in DAO
			int a = 0;//regdao.saveTreatmentDetails(treatmentDto, queryType, userId);
			
			//returning treatment Id
			 return a;
		}
		
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
	// bill
	@Override
	@Transactional
	public int saveBillMaster(BillMasterDto billMasterDto,
			HttpServletRequest request, String queryType) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current
																	// login
																	// user id

		if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) { // To Insert Record
			
			billMasterDto.setCreatedBy(userId);
			billMasterDto.setCreatedDateTime(new Date(new java.util.Date()
					.getTime()));
			billMasterDto.setDeleted("N");

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

			billMasterDto.setUpdatedBy(userId);
			billMasterDto.setUpdatedDateTime(new Date(new java.util.Date()
					.getTime()));
			billMasterDto.setDeleted("N");

		}
		// call to function in DAO
		int a = 0;//regdao.saveBillMaster(billMasterDto, queryType, userId);

		//returning bill id
		return a;
	}	
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
		// opd_bill
		@Override
		@Transactional
		public int saveBillDetails(BillDetailsDto billDetailsDto,
				HttpServletRequest request, String queryType, String doctorIdList) {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current
																		// login
																		// user id

			if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) { // To Insert Record
				
				billDetailsDto.setCreatedBy(userId);
				billDetailsDto.setCreatedDateTime(new Date(new java.util.Date()
						.getTime()));
				billDetailsDto.setDeleted("N");

			} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

				billDetailsDto.setUpdatedBy(userId);
				billDetailsDto.setUpdatedDateTime(new Date(new java.util.Date()
						.getTime()));
				//billDetailsDto.setDeleted("N");

			}
			// call to function in DAO
			int a = 0;//regdao.saveBillDetails(billDetailsDto, queryType, userId, doctorIdList);

			//returning bill id
			return a;
		}	
	
	// @author : Irfan Khan @date: 17-May-2017 @reason : To Save and Update
	// ipd_bill
	@Override
	@Transactional
	public int saveBillDetailsIpd(BillDetailsIpdDto billDetailsIpdDto,
			Integer userId, String queryType, String doctorIdList) {

		/*HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current
																	// login
																	// user id
*/
		if (queryType.equalsIgnoreCase("insert") || queryType.equalsIgnoreCase("markvisit")) { // To Insert Record

			billDetailsIpdDto.setCreatedBy(userId);
			billDetailsIpdDto.setCreatedDateTime(new Date(new java.util.Date()
					.getTime()));
			billDetailsIpdDto.setDeleted("N");

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

			billDetailsIpdDto.setUpdatedBy(userId);
			billDetailsIpdDto.setUpdatedDateTime(new Date(new java.util.Date()
					.getTime()));
			billDetailsIpdDto.setDeleted("N");

		}
		// call to function in DAO
		int a = 0;//regdao.saveBillDetailsIpd(billDetailsIpdDto, queryType, userId,	doctorIdList);

		// returning bill id
		return a;
	}
		
		
	//@author : Irfan Khan @date: 17-May-2017 @reason : To Fetch Records List
		@Override
		@Transactional
		public RegTreBillDto getAllRecords() {
			return regdao.getAllRecords();
		}
		
	//@author : Irfan Khan @date: 31-May-2017 @reason : To Fetch Records List
		@Override
		@Transactional
		public RegistrationDto getAllPatientList() {
			return regdao.getAllPatientList();
		}
		 
		// @author : Irfan Khan @date: 29-May-2017 @reason : To Save and Update
		// Prefix
		@Override
		@Transactional
		public int saveUpdatePrefix(PrefixDto prefixDto,
				HttpServletRequest request, String queryType) {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");// current
																		// login
																		// user id

			if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

				prefixDto.setPrefixName(prefixDto.getPrefixName());
				prefixDto.setPrefixGender(prefixDto.getPrefixGender());
				prefixDto.setCreatedBy(userId);
				prefixDto.setCreatedBy(prefixDto.getCreatedBy());

				prefixDto.setDeleted("N");
				prefixDto.setCreatedDateTime(new Date(new java.util.Date()
						.getTime()));

			} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

				prefixDto.setPrefixId(prefixDto.getPrefixId());
				prefixDto.setPrefixName(prefixDto.getPrefixName());
				prefixDto.setPrefixGender(prefixDto.getPrefixGender());
				prefixDto.setUpdatedBy(userId);
				prefixDto.setUpdatedDateTime(new Date(new java.util.Date()
						.getTime()));

				prefixDto.setDeleted("N");

			}

			int a = regdao
					.saveUpdatePrefix(prefixDto, queryType, userId);// call
																				// to
																				// function
																				// in
																				// DAO

			// Set value accordinly insert =1 , update =2 , delete =3
			return (a == 1) ? queryType.equalsIgnoreCase("insert") ? 1 : queryType
					.equalsIgnoreCase("update") ? 2 : queryType
					.equalsIgnoreCase("delete") ? 3 : 0 : 0;
			// return a;
		}
		
		/*******************************************************************************
		 * @author Kishor Lokhande
		 * @date 3_June_2017 
		 * @Code Fetching patient data bye id.
		 ******************************************************************************/
		@Override
		@Transactional
		public List<RegTreBillDto> fetchPatientsRecordByTreatmentId(Integer treatmentId) {
 			return regdao.fetchPatientsRecordByTreatmentId(treatmentId);
		}
		 

		@Override
		@Transactional
		public List<RegTreBillDto> getAllRecordsDeptwise(Integer deptId, Integer unitId,Integer userId1, String userType) {
			
			return regdao.getAllRecordsDeptwise(deptId,unitId,userId1,userType);
		}
		
		
		@Override
		@Transactional
		public List<RegTreBillDto1> getAllRecordsDeptwise1(Integer deptId, Integer unitId,Integer userId1, String userType) {
			
			return regdao.getAllRecordsDeptwise1(deptId,unitId,userId1,userType);
		}
		
		
		//@author : Abhijit Jadhav @date: 21-jun-2019 @reason : To Fetch Departmentwise details 
		@Override
		@Transactional
		public List<RegTreBillDto> getAllRecordsDeptwise12(Integer deptId, Integer unitId,Integer userId1, String userType, String patientId) {
			
			return regdao.getAllRecordsDeptwise12(deptId,unitId,userId1,userType,patientId);
		}
		
		
		
		
		
		//@author : Sagar Kadam @date: 16-jun-2017 @reason : To Fetch sponsor details 
		@Override
		@Transactional
			public ChargesMasterSlave fetchSponsorRecords(Integer chargesMasterDto) {
			return regdao.fetchSponsorRecords(chargesMasterDto);
				}
		
		//@author : Sagar Kadam @date: 27-jun-2017 @reason : for auto sugession
		@Override
		@Transactional
		public RegTreBillDto getAllRecordsDeptwiseWithAuto(Integer deptId,String letter,String usertype, Integer unitId) {
			
			return regdao.getAllRecordsDeptwiseWithAuto(deptId,letter,usertype, unitId);
		}
		
		@Transactional
		public RegTreBillDto1 getAllRecordsDeptwiseWithAuto1(Integer deptId,String letter,String usertype, Integer unitId) {
			
			return regdao.getAllRecordsDeptwiseWithAuto1(deptId,letter,usertype, unitId);
		}
		
		//Added by Laxman on 15-Jan-2018 for OPDQueue Patients and Queue Management.
		@Override
		@Transactional
		public OpdQueManagmentViewDto getAllOpdRecordsDeptwiseWithAuto(Integer deptId,String letter,String usertype, Integer unitId) {
			
			return regdao.getAllOpdRecordsDeptwiseWithAuto(deptId,letter,usertype, unitId);
		}

		//@author : Sagar Kadam @date: 28-jun-2017 @reason : for auto summary

		@Override
		@Transactional
		public List<RegTreBillDto> getAllForAutoSummary(String letter,String type) {
			
			return regdao.getAllForAutoSummary(letter,type);
		}

		@Override
		@Transactional
		public IpdBedDetailsDTO getIpdBedDetailsForTid(Integer tid) {
			return regdao.getIpdBedDetailsForTid(tid);
		}
		
		// @author : Sagar Kadam @date: 28-jun-2017 @reason : for Scheduler
		@Override
		@Transactional
		public RegTreBillDto getAllRecordsForScheduler(String letter) {
	
			return regdao.getAllRecordsForScheduler(letter);
		}
		
		
		// @author :Sagar @date: 14-july-2017 @reason : To Fetch Records List
		//Modify by Laxman on 12-Jan-2018 for OPDQueue Patients and Queue Management.
		@Override
		@Transactional
		public RegTreBillDto getAllRecordsforOPDque1(Integer deptid,Integer unitId,String userType, Integer userId1) {	
			
				return regdao.getAllRecordsforOPDque1(deptid,unitId,userType,userId1);
		}
		
		//Modify by Laxman on 12-Jan-2018 for OPDQueue Patients and Queue Management.
		@Override
		@Transactional
		public OpdQueManagmentViewDto getAllRecordsForOPDqueue1(Integer deptid,Integer unitId,String userType, Integer userId1) {	
			
				return regdao.getAllRecordsForOPDqueue1(deptid,unitId,userType,userId1);
		}
		
		
		
		@Override
		@Transactional
		public OpdQueManagmentViewDto getAllRecordsForOPDqueue12(Integer deptId, Integer unitId, String userType, Integer userId1, Integer invoiceCount)
		{
			return regdao.getAllRecordsForOPDqueue12(deptId,unitId,userType,userId1,invoiceCount);
		}
		
		// @author :Sagar @date: 14-july-2017 @reason : To Fetch Records List
				@Override
				@Transactional
				public RegistrationOtherDto getAllRecordsForOPDqueOther(Integer deptid,Integer unitId) {	
					
						return regdao.getAllRecordsForOPDqueOther(deptid,unitId);
					
				}
		
		// @author : Sagar Kadam @date:20-july-2017 @reason : To Fetch Record of charges master list
				@Override
				@Transactional
				public ChargesMasterDto getSponsorTypeList() {
					return regdao.getSponsorTypeList();
				}
				
				// @author : Sagar Kadam @date:02-aug-2017 @reason : To Fetch Record of user name by user id 
				@Override
				@Transactional
				public String getUserNameByUserid(Integer userid) {
					
					return regdao.getUserNameByUserid(userid);
				}
				
				
				//@author : Sagar Kadam @date: 07/aug/2017 @reason : To save other record details in table
 				@Override
				@Transactional
				public int saveOtherPatientRegDetails(RegistrationOtherDto registrationDto,
						HttpServletRequest request, String queryType) {

					// current login user id
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");

					if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

						registrationDto.setCreatedBy(userId);	
						registrationDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
						registrationDto.setDeleted("N");

					} else if (queryType.equalsIgnoreCase("update") || queryType.equalsIgnoreCase("markvisit")) {// To Update Record

						registrationDto.setUpdatedBy(userId);
						registrationDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
						registrationDto.setDeleted("N");

					}
									// call to function in DAO
					int a = regdao.saveOtherPatientRegDetails(registrationDto, queryType, userId);
					
					 return a;
				}
				
				
				
				
				//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record list
				@Override
				@Transactional
				public RegistrationOtherDto getOthetRecords() {
					return regdao.getOthetRecords();
				}
				
				//@author : Sagar Kadam @date: 07/aug/2017 @reason : To Fetch other record by id for edit
				@Override
				@Transactional
				public RegistrationOtherDto getOthetRecordsById(int pid) {
					return regdao.getOthetRecordsById(pid);
				}	
				
				//@author : Sagar Kadam @date: 07/aug/2017 @reason : Autosuggestion for  other record in registration
				@Override
				@Transactional
				public RegistrationOtherDto autosuggesstionForOtherRecords(String  letter,String usertype) {
					return regdao.autosuggesstionForOtherRecords(letter,usertype);
				}

				// @author : Irfan Khan @date: 29-May-2017 @reason : To delete Patient
				@Override
				@Transactional
				public int deletePatientReg(int pId, Integer userId) {
					return regdao.deletePatientReg(pId,userId);
				}

				@Override
				@Transactional
				public List<RegistrationDto> getPatientRecordsbypatientId(
						Integer patientId) {
					
					return regdao.getPatientRecordsbypatientId(patientId);
				}

				@Override
				@Transactional
				public List<TreatmentDto> gettreatment(Integer treatmentId) {
					return regdao.gettreatment(treatmentId);
				}

	// @author : Irfan Khan @date: 8-Nov-2017 @reason : To Check registration access			
	@Override
	@Transactional
	public boolean getRegAccessAuth(Integer userId) {
		// TODO Auto-generated method stub
		return regdao.getRegAccessAuth(userId);
	}

	// @author : Laxman Nikam @date: 05-Jan-2018 @reason : Check OPD send patiend Limit.
	@Override
	@Transactional
	public String checkSendPatientLimit(int doctorId) {
		// TODO Auto-generated method stub
		return regdao.checkSendPatientLimit(doctorId);
	}
	
	
	@Override
	@Transactional
	public DoctorDto getDocListUnitWise(Integer unitId, String callfrom) {
				
			return regdao.getDocListUnitWise(callfrom,unitId);
		
	}

	// @author : Irfan Khan @date: 15-Feb-2018 @reason : To block Patient
	@Override
	@Transactional
	public int blockPatient(int pid,String blockFlag,String narration,Integer userId,String userLoginName) {
		
		return regdao.blockPatient(pid,blockFlag,narration,userId,userLoginName);
	}

	//@author :Irfan khan@Date :7-03-2018@Code :To fetch records of Admission report
	@Override
	@Transactional
	public List<admissionReportViewDto> fetchAdmissionReport(Date fromDate,
			Date toDate,Integer doctorId,Integer refDocId,Integer caseTypeId,Integer mediclaimType) {
		return regdao.fetchAdmissionReport(fromDate,toDate,doctorId,refDocId,caseTypeId,mediclaimType);
	}
	

	@Override
	@Transactional
	public DoctorDto getConsultantDrName(Integer treatmentId) {
		return regdao.getConsultantDrName(treatmentId);
	}


	@Override
	@Transactional
	public DoctorDto getAllRefDocNew(Integer unitId, String callfrom) {
		return regdao.getAllRefDocNew(callfrom,unitId);
		
	}

	//irfan khan - 4-april-2018: fetch advertisement images
	@Override
	@Transactional
	public ArrayList<String> fetchAdvertisementImgNames() {
		
		return regdao.fetchAdvertisementImgNames();
	}

	//irfan khan 18-may-2018 fetch the difference between 2 dates in days
	@Override
	@Transactional
	public long fetchDifferenceInDays(Date fromDate, Date toDate) {
		return regdao.fetchDifferenceInDays(fromDate,toDate);
	}
	
	/**
	 * @author Tarique Aalam
	 * @date 28/12/2017
	 * @code to save  pay response records
	 * **/
	@Override
	@Transactional
	public int savePayRespo(PaymentResponsibleDto paymentDto,
			HttpServletRequest request, String queryType) {

		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			paymentDto.setCreatedBy(userId);	
			paymentDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			paymentDto.setDeleted("N");

		} else if (queryType.equalsIgnoreCase("update") || queryType.equalsIgnoreCase("markvisit")) {// To Update Record

			paymentDto.setUpdatedBy(userId);
			paymentDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			paymentDto.setDeleted("N");

		}
						// call to function in DAO
		int a = 0;//regdao.savePayRespo(paymentDto, queryType, userId);
		
		 return a;
	}

	/**
	 * @author Tarique Aalam
	 * @date 28/12/2017
	 * @code to fetch pay response
	 * **/
	@Override
	@Transactional
	public List<PaymentResponsibleDto> fetchPayResp(Integer patientId) {
		return regdao.fetchPayResp(patientId);
	}
	
	/**
	 * @author Tarique Aalam
	 * @date 29/12/2017
	 * @code to delete pay respnse record
	 * **/
	@Override
	@Transactional
	public int deletePayResponse(int pId, int tId, Integer userId) {
		return regdao.deletePayResponse(pId,tId,userId);
		}
	
	@Override
	@Transactional
	public List<Hall> fetchPatientsBedRecords(Integer treatmentId) {
		return regdao.fetchPatientsBedRecords(treatmentId);
	}

	@Override
	@Transactional
	public DemographicPatientDto getDemoPatientDetails(Integer patientId) {
		
		return regdao.getDemoPatientDetails(patientId);
	}

	@Override
	@Transactional
	public int checkIsOldPatientAvilable(String oldPatientId) {
		// TODO Auto-generated method stub
		return regdao.checkIsOldPatientAvilable(oldPatientId);
	}
	
    @Override
    @Transactional
    public String fetchPatientsDischargeDateByTreatmentId(Integer treatmentId) {
        // TODO Auto-generated method stub
        return regdao.fetchPatientsDischargeDateByTreatmentId(treatmentId);

    }

    @Override
    @Transactional
	public int saveMlcDetails(MlcDetailsDto mlcDto2,
			HttpServletRequest request, String queryType) {

		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");

		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			mlcDto2.setCreatedBy(userId);	
			mlcDto2.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			mlcDto2.setDeleted("N");

		} else if (queryType.equalsIgnoreCase("update") || queryType.equalsIgnoreCase("markvisit")) {// To Update Record

			mlcDto2.setUpdatedBy(userId);
			mlcDto2.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			mlcDto2.setDeleted("N");

		}
						// call to function in DAO
		int a = 0;//regdao.saveMlcDetails(mlcDto2, queryType, userId);
		
		 return a;
	}

    @Override
    @Transactional
	public List<MlcDetailsDto> fetchMlcDetails(Integer patientId) {
		return regdao.fetchMlcDetails(patientId);
		}

	@Override
	@Transactional
	public int saveMultipleSponsor(MultipleSponsorDto multipleSponsorDto,
			HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		if (multipleSponsorDto.getMulSponsorId() == 0) {
			
			multipleSponsorDto.setCreatedBy(userId);
			multipleSponsorDto.setDeleted("N");
			multipleSponsorDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			multipleSponsorDto.setUnitId(unitId);
		} else {
			
			multipleSponsorDto.setUpdatedBy(userId);
			multipleSponsorDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			multipleSponsorDto.setUnitId(unitId);
		}
		return regdao.saveMultipleSponsor(multipleSponsorDto,request);
	}

	@Override
	@Transactional
	public MultipleSponsorDto getMultilpleSponsorList(Integer treatmentId,
			HttpServletRequest request) {
		
		return regdao.getMultilpleSponsorList(treatmentId,request);
	}

	@Override
	@Transactional
	public MultipleSponsorDto getMulSponsorData(Integer treatmentId,
			Integer chargesSlaveId, HttpServletRequest request) {
		
		return regdao.getMulSponsorData(treatmentId,chargesSlaveId,request);
	}

	@Override
	@Transactional
	public int deleteMultipleSponsor(Integer treatmentId,
			Integer mulSponsorId, HttpServletRequest request) {

		return regdao.deleteMultipleSponsor(treatmentId,mulSponsorId,request);
	}

	@Override
	@Transactional
	public int setPrimarySponsor(Integer treatmentId, Integer mulSponsorId,
			HttpServletRequest request) {
		
		return regdao.setPrimarySponsor(treatmentId,mulSponsorId,request);
	}

	@Override
	@Transactional
	public int saveSponsorDetails(int treatId, Integer sponsorId,String queryType,
			HttpServletRequest request) {
		
		return regdao.saveSponsorDetails(treatId,sponsorId,queryType,request);
	}
	
	// @author : Irfan Khan @date: 10-Oct-2018 @reason : To UnBlock Patient
	@Override
	@Transactional
	public int unBlockPatient(int pid, String blockFlag, String narration, Integer userId, String userLoginName) {

		return regdao.unBlockPatient(pid, blockFlag, narration, userId, userLoginName);
	}

	//irfan khan 11-oct-2018 fetch patient counts
	@Override
	@Transactional
	public List<Integer> patientQueueListOnDashb() {
		// TODO Auto-generated method stub
		return regdao.patientQueueListOnDashb();
	}
	
	@Override
	@Transactional	
	//@author : Vinod Udawant @date: 01-April-2019 @reason : To Save and Update Other patient
	public int saveOtherBillDetails(OtherBillingDto billDetailsDto, String queryType, HttpServletRequest request){
		
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
			billDetailsDto.setCreatedBy(userId);
			billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setUnitId(unitId);		
		
			return regdao.saveOtherBillDetails(billDetailsDto,queryType);
	}
	
	@Override
	@Transactional	
	//@author : Vinod Udawant @date: 03-April-2019 @reason : To Save bill details from appointment
	public int saveFromOtherBillDetails(BillDetailsDto billDetailsDto,HttpServletRequest request, String queryType,
					List<OtherBillingDto> lstOtherBill,String doctorIdList){
		
		return regdao.saveFromOtherBillDetails(billDetailsDto,request,queryType,lstOtherBill,doctorIdList);
	}
	
	@Override
	@Transactional	
	//@author : Vinod Udawant @date: 13-April-2019 @reason : Add new consultant doctor
	public int addNewConsultantOpd(BillDetailsDto billDetailsDto,String queryType){
		
		return regdao.addNewConsultantOpd(billDetailsDto,queryType);
	}
	
	@Override
	@Transactional	
	//@author : Vinod Udawant @date: 04-May-2019 @reason : Get appointment type
	public String getAppointmentType(int appId){
		
		return regdao.getAppointmentType(appId);
	}

	@Override
	@Transactional	
	//@author : Vinod Udawant @date: 13-Sept-2019 @reason : Get doctor wise patient count
	public DoctorWisePatientsCountDto getDoctorWisePatientCount(String callFrom,Integer deptId,Integer unitId,Integer userId){
		
		return regdao.getDoctorWisePatientCount(callFrom,deptId,unitId,userId);
	}

	@Override
	@Transactional
	//@author : Sandip Shinde @date: 02-feb-2023 @reason : Get Hall Name on print
	public List<ChargesMasterSlave> fetchPatientsBedRecords1(Integer treatmentId) {
		
		return regdao.fetchPatientsBedRecords1(treatmentId);
	}

	@Override
	@Transactional
	public int checkDuplicatePatientName(RegistrationDto regDto, HttpServletRequest request) {
		
		int response=0;
		Session s = sessionFactory.getCurrentSession();
		try {
			
			Query duplicateCheckQuery = s.createSQLQuery("select count(*) from ehat_patient where prefix='"+regDto.getPrefix()+"' and f_name='"+regDto.getfName()+"' and m_name='"+regDto.getmName()+"' and l_name='"+regDto.getlName()+"' and mobile='"+regDto.getMobile()+"' ");//s.createStoredProcedureQuery("sp_get_dropdown_list_by_prefix_name", PrefixDto.class);
			return ((Number) duplicateCheckQuery.uniqueResult()).intValue();
			
		} catch (Exception e) {
			e.printStackTrace();
			return response;
		}
	}

	@Override
	public List<AdmissionReportSiddhiDTO> fetchAdmissionReportSiddhivinayak(Date fromDate, Date toDate, Integer doctorId,
			Integer refDocId, Integer caseTypeId, Integer mediclaimType,Integer chargesId, Integer chargesSlaveId ) {
		return regdao.fetchAdmissionReportSiddhivinayak(fromDate, toDate, doctorId, refDocId, caseTypeId, mediclaimType,chargesId,chargesSlaveId);}

	@Override
	@Transactional
	public DoctorDto getSourceDoctor(String isSourceType) {
		
		return regdao.getSourceDoctor(isSourceType);
	}
	
	
	@Override
	@Transactional
		public ChargesMasterSlave fetchSponsorRecordsRegMaster(Integer chargesMasterDto) {
		return regdao.fetchSponsorRecordsRegMaster(chargesMasterDto);
			}
	
}
