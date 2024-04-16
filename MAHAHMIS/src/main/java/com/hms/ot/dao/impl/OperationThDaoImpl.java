package com.hms.ot.dao.impl;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.StringJoiner;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.hms.admin.util.HraTypeMaster;
import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.Chanelling_doctor;
import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.OTGroup;
import com.hms.administrator.dto.OperationChargehallwiseAdmin;
import com.hms.administrator.dto.Test;
import com.hms.dto.Assessment;
import com.hms.dto.ChartReport;
import com.hms.dto.ComplaintsDTO;
import com.hms.dto.Doctor;
import com.hms.dto.OTVitalMasterDto;
import com.hms.dto.OTVitalSlave;
import com.hms.dto.OperationChargehallwise;
import com.hms.dto.Patient;
import com.hms.dto.Treatment;
import com.hms.dto.Users;
import com.hms.ehat.controller.OTPercentageDTO;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ChargesMasterDto;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.EhatOTOperationNotes;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.inventory.dto.ChargeMasterDTO;
import com.hms.ipd.nurshing.dto.ChartReportDTO;
import com.hms.ot.dao.OperationThDao;
import com.hms.ot.dto.AssistantSurgeon;
import com.hms.ot.dto.ConductAnaesthesia;
import com.hms.ot.dto.FetchOtCount;
import com.hms.ot.dto.FetchScheduleOT;
import com.hms.ot.dto.HraTypeMasterDto;
import com.hms.ot.dto.OTCheckList;
import com.hms.ot.dto.OTDescription;
import com.hms.ot.dto.OTNotesFetchOperationDto;
import com.hms.ot.dto.OTType;
import com.hms.ot.dto.Operation;
import com.hms.ot.dto.OperationAnesthetist;
import com.hms.ot.dto.OperationDocTbl;
import com.hms.ot.dto.OperationTeam;
import com.hms.ot.dto.OperationTeamSlave;
import com.hms.ot.dto.OperationTypeTbl;
import com.hms.ot.dto.PatientDaignosisMaster;
import com.hms.ot.dto.PatientDaignosisSlave;
import com.hms.ot.dto.PreAnaesthetic;
import com.hms.ot.dto.PreOpPrep;
import com.hms.ot.dto.PtientOperation;
import com.hms.ot.dto.PtientRecord;
import com.hms.ot.dto.SurgicalKitMaster;
import com.hms.ot.dto.TreatmentOperations;
import com.hms.ot.dto.TreatmentOperationsManage;
import com.hms.ot.dto.UploadOTDocuments;
import com.hms.ot.dto.VitalSing;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.upload.FilePath;

//import io.swagger.models.auth.In;

@Repository
public class OperationThDaoImpl implements OperationThDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	@SuppressWarnings("unchecked")
	public List<OperationTypeTbl> fetchPTName() {

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationTypeTbl.class);
		criteria.add(Restrictions.eq("status", "Y"));
		List<OperationTypeTbl> list = criteria.list();
		return list;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OTGroup> fetchGroupDetails() {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTGroup.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.addOrder(Order.asc("groupName"));
		List<OTGroup> list = criteria.list();
		return list;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OTType> fetchOTName() {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTType.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.addOrder(Order.asc("ot_name"));
		return criteria.list();
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Operation> fetchOperationName(String opType, String department) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Operation.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.addOrder(Order.asc("operName"));
		return criteria.list();
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OperationTeam> fetchOperationTeamList(String searchQuery, String callFrom) {
		List<OperationTeam> Opteamli = new ArrayList<>();
		OperationTeam teamopObj = new OperationTeam();

		try {
			if (callFrom.equals("TeamSearch")) {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationTeam.class);
				criteria.add(Restrictions.ilike("teamName", searchQuery, MatchMode.ANYWHERE));
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.addOrder(Order.asc("teamName"));
				Opteamli = criteria.list();

			} else {
				Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationTeam.class);
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.addOrder(Order.asc("teamName"));
				Opteamli = criteria.list();

			}

			for (OperationTeam listopTeam : Opteamli) {
				List<Doctor> doclist = new ArrayList<>();
				List<OperationTeamSlave> team = listopTeam.getLtSlave();
				for (OperationTeamSlave litopTeam : team) {
					String usertype = litopTeam.getType();
					String findingName = litopTeam.getUserName();

					List<Doctor> arrDoctor = setAutoCompleteForDoctorName(findingName, usertype);
					if (arrDoctor.size() > 0)
						doclist.add(arrDoctor.get(0));

				}
				listopTeam.setDoclist(doclist);
			}

		} catch (HibernateException e) {
			e.printStackTrace();
		}
		return Opteamli;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Operation> fetchOperation() {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Operation.class);
		criteria.add(Restrictions.eq("status", "Y"));
		return criteria.list();
	}

	@Override
	public int newOperationID() {
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery("SELECT max(Operation_id) FROM operation;");
		Integer maxid = (Integer) query.uniqueResult();
		if (maxid == null) {
			maxid =0;
		}
		return ++maxid;
	}

	@Override
	public String saveOTGroupDetails(OTGroup obj) {
		String msg="";
		Session session = sessionFactory.openSession(); //create session object from the session factory
		session.beginTransaction();
		if (obj.getIdGroupDetails() > 0) {
			OTGroup op = (OTGroup) sessionFactory
					.getCurrentSession().get(OTGroup.class, obj.getIdGroupDetails());
			op.setStatus("Y");
			op.setGroupName(obj.getGroupName());
			op.setGroupType(obj.getGroupType());
			msg ="Operation group updated successfully.";
		}else {
			obj.setStatus("Y");
			session.save(obj);
			msg ="Operation group saved successfully.";
		}
		session.getTransaction().commit(); //commit the transaction
		session.close();
		return msg;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OTGroup> searchGroupDetails(String searchText, String searhFlag) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTGroup.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.like("groupName", "%"+searchText+"%"));
		List<OTGroup> list = criteria.list();
		return list;
	}

	@Override
	public String saveOTDetails(OTType obj) {
		String msg="";
		Session session = sessionFactory.openSession(); //create session object from the session factory
		session.beginTransaction();
		if (obj.getIdOT_name() > 0) {
			OTType op = (OTType) sessionFactory
					.getCurrentSession().get(OTType.class, obj.getIdOT_name());
			op.setColor(obj.getColor());
			op.setOt_name(obj.getOt_name());
			op.setTheaterCharges(obj.getTheaterCharges());
			msg ="Operation type updated successfully";
		}else {
			obj.setStatus("Y");
			session.save(obj);
			msg ="Operation type saved successfully";
		}
		session.getTransaction().commit(); //commit the transaction
		session.close();
		return msg;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OTType> searchOTDetails(String strValue) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTType.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.like("ot_name", "%"+strValue+"%"));
		return criteria.list();
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OTCheckList> fetchCheckList(String byName, String type) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTCheckList.class);
		if(type.equals("onload")){
			criteria.add(Restrictions.eq("status", "Y"));
		}else if(type.equals("search")){
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("CheckListName", "%"+byName+"%"));
		}
		return criteria.list();
	}

	@Override
	public int maxIDofList() {
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery("SELECT max(idehat_preoperative_checklist_master) FROM ehat_preoperative_checklist_master;");
		Integer maxid = (Integer) query.uniqueResult();
		if (maxid == null) {
			maxid =0;
		}
		return ++maxid;
	}

	@Override
	public String insertCheckList(OTCheckList obj) {
		String msg="";
		Session session = sessionFactory.openSession(); //create session object from the session factory
		session.beginTransaction();
		if (obj.getIdCheckList() > 0) {
			OTCheckList op = (OTCheckList) sessionFactory.getCurrentSession().get(OTCheckList.class, obj.getIdCheckList());
			op.setStatus("Y");
			op.setCheckListName(obj.getCheckListName());
			op.setCheckListRemark(obj.getCheckListRemark());
			msg ="Check List updated successfully.";
		}else {
			obj.setStatus("Y");
			session.save(obj);
			msg ="Check List saved successfully.";
		}
		session.getTransaction().commit(); //commit the transaction
		session.close();
		return msg;
	}

	@Override
	public String deleteChkList(int txtListID) {
		OTCheckList object = (OTCheckList) sessionFactory.getCurrentSession().get(OTCheckList.class,txtListID);
		object.setStatus("N");
		return "Data is deleted Successfully ...";
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SurgicalKitMaster> fetchTempTopicList(String pageName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(SurgicalKitMaster.class);
	    criteria.add(Restrictions.eq("status", "Y"));
	    criteria.addOrder(Order.asc("topicName"));
		return criteria.list();
	}

	@Override
	public String saveTemplate(SurgicalKitMaster obj) {
		String msg="";
		if (obj.getIdTempTopic() > 0) {
			sessionFactory.getCurrentSession().merge(obj);
			msg ="Data updated successfully.";
		}else {
			sessionFactory.getCurrentSession().merge(obj);
			msg ="Data saved successfully.";
		}
		return msg;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<String> manageOperationPatient(String findingName, String autoType) {
		List<String> patientName = new ArrayList<String>();
		String query1 = "select p.f_name,p.m_name,p.l_name,p.patient_id from  ehat_patient p,ehat_treatment t,treatment_operations top "
				+" where  p.patient_id = t.Patient_ID And t.t_flag = 'ACTIVE' and t.treatment_id = top.Treatment_ID and top.opStatus ='Y' and (p.f_name like '"+ findingName + "%'  or p.l_name like '" + findingName + "%') group by p.patient_id";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(query1);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> data = query.list();
		for (Map<String, Object> rs : data) {
			String fname = (String) rs.get("f_name");
			String mName = (String) rs.get("m_name");
			String lname = (String) rs.get("l_name");
			Integer patId = (Integer) rs.get("patient_id");

			String name = fname + " " + mName + " " + lname + "_" + patId;

			patientName.add(name);
		}
//		String q="select p.fName, p.mName, p.lName from RegistrationDto p,TreatmentDto t,TreatmentOperations top "
//				+"where p.patientId = t.Patient_ID And t.t_flag = 'ACTIVE' and t.treatment_id = top.Treatment_ID and top.opStatus ='Y' ";
//		Query q1 = sessionFactory.getCurrentSession().createQuery("select p.fName, p.mName, p.lName from RegistrationDto p,TreatmentDto t,TreatmentOperations top");
//		
		return patientName;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Doctor> setAutoCompleteForDoctorName(String findingName, String usertype) {
		
		String sql = "";
		List<Doctor> arrDoctor = null;
		
		if(usertype == "doctor"){
			sql = "SELECT d.Doctor_ID,d.User_ID,d.doc_name,d.mobileNo,d.email_Id, "
					+ "IF(d.department = '0', '-', (Select department_name from hospital_departments where idhospital_departments = d.department)) department_name, "
					+ "IF(d.specialisation = '0', '-', (Select specialization_name from hospital_specialization where idhospital_Specialization = d.specialisation)) specialization_name, "
					+ "IF(d.speciality = 'select', '-', (Select spl_name from doctor_specilities where iddoctor_specilities = d.speciality)) spl_name "
					+ "FROM doctor d "
					+ "where (doc_Type = 'doctor' || doc_Type = 'rmo' || doc_Type = 'visitingdoctor') and status='Y' and (d.doc_name like '%"
					+ findingName + "%' ) order by doc_name ASC";
		}else{
			sql = "SELECT d.Doctor_ID,d.User_ID,d.doc_name,d.mobileNo,d.email_Id, "
					+ "IF(d.department = '0', '-', (Select department_name from hospital_departments where idhospital_departments = d.department)) department_name, "
					+ "IF(d.specialisation = '0', '-', hs.specialization_name) specialization_name, "
					+ "IF(d.speciality = '0', '-', (Select spl_name from doctor_specilities where iddoctor_specilities = d.speciality)) spl_name "
					+ "FROM doctor d LEFT JOIN hospital_specialization hs ON FIND_IN_SET(hs.idhospital_Specialization, REPLACE(d.specialisation, ' ', '')) > 0" 
					+ " where doc_Type = '" + usertype
					+ "' and d.status='Y' and (d.doc_name like '%"
					+ findingName + "%' ) order by doc_name ASC";
		}
		SQLQuery getOpPatient = sessionFactory.getCurrentSession().createSQLQuery(sql);
		getOpPatient.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	    @SuppressWarnings("unchecked")
		List<Map<String, Object>> doctorDetails =  getOpPatient.list();
		arrDoctor = fetchdoctorDetails(doctorDetails);
		return arrDoctor;
	}

	
	public List<Doctor> fetchdoctorDetails(List<Map<String, Object>> doctorDetails)
	{

//		 Map<String, Object> map = doctorDetails.get(0);
//		 Integer object = (Integer) map.get("User_ID");
		
		List<Doctor> arrDoctor = new ArrayList<Doctor>();
		for (Map rs2 : doctorDetails) {
			Doctor objDoc = new Doctor();
			objDoc.setUser_ID((Integer) rs2.get("User_ID"));
			objDoc.setDoctor_ID((Integer) rs2.get("Doctor_ID"));
			objDoc.setDoc_name((String) rs2.get("doc_name"));
			objDoc.setMobileNo((String) rs2.get("mobileNo"));
			objDoc.setEmail_Id((String) rs2.get("email_Id"));
			objDoc.setSpeciality((String) rs2.get("specialization_name"));
			objDoc.setDepartmentName((String) rs2.get("department_name"));
			//objDoc.setDepartmentName(null != ((String) rs2.get("department_name")) ? ((String) rs2.get("department_name")) : "");
			objDoc.setSpecializationName((String) rs2.get("spl_name"));
			arrDoctor.add(objDoc);
		}

		return arrDoctor;

	}
	@Override
	@SuppressWarnings("unchecked")
	public List<Users> fetchUser(String callFrom, String byName) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Users.class);
		if (callFrom.equals("UserManagement") || callFrom.equals("HRDashboard")) {
			
		}else if (callFrom.equals("OTManagement")) {
		    criteria.add(Restrictions.eq("status", "Y"));
		}else if (callFrom.equals("EmployeeForm")) {
			
		}else if (callFrom.equals("userSalsaryDash")
				|| callFrom.equals("userDashSearch")) {
			
		}
		return criteria.list();
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<String> getUserNameFromType(String type, String letter) {
		List<String> listName = new ArrayList<String>();

		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Users.class, "user");
		criteria.setProjection(Projections.projectionList().add(Projections.property("user.f_name"), "f_name")
				.add(Projections.property("user.m_name"), "m_name").add(Projections.property("user.l_name"), "l_name")
				.add(Projections.property("user.user_ID"), "user_ID"));
		criteria.createAlias("user.objDoctor", "objDoctor");
		criteria.add(Restrictions.eqProperty("user.user_ID", "objDoctor.UserDetails.user_ID"));
		criteria.add(Restrictions.eq("user.status", "Y"));
		if(type!=null && !type.equals("select") && !type.isEmpty()) {
			criteria.add(Restrictions.eq("user.user_Type", type));
		}
		else if(letter != null && !letter.isEmpty()) {
			criteria.add(Restrictions.like("user.f_name", "%"+letter+"%"));
			criteria.add(Restrictions.like("user.m_name", "%"+letter+"%"));
			criteria.add(Restrictions.like("user.l_name", "%"+letter+"%"));
		}
		criteria.setResultTransformer(Transformers.aliasToBean(Users.class));

		List<Users> list = criteria.list();
		for (Users rs : list) {
			String testName = "";
			if (null != rs.getF_name()) {
				testName = rs.getF_name() + " " + rs.getM_name() + " " + rs.getL_name() + "_" + rs.getUser_ID();
			} else {
				testName = rs.getF_name() + "_" + rs.getUser_ID();
			}
			listName.add(testName);
		}
		return listName;
	}

	@Override
	@SuppressWarnings({  "unchecked" })
	public List<Patient> displayOperationPat(String otDate, String page_name, String searchBy, String strValue) {
		List<Patient> arrPatient = null;
		String strValue2 = "";
		int length = 0;
		if (page_name.equals("Search")) {
			if (searchBy.equals("byId")) {
				strValue2 = "";
				String[] str = strValue.split("@");
				strValue = str[0];
				if (str.length > 1) {
				}
				try {
					Query storedPro = sessionFactory.getCurrentSession().createSQLQuery(
							"call sp_display_OperationPat_Search(:otDate,:pageName,:searchBy,:strValue,:length,:strValue2)");
					storedPro.setParameter("otDate", otDate).setParameter("pageName", page_name)
							.setParameter("searchBy", searchBy).setParameter("strValue", strValue)
							.setParameter("length", length).setParameter("strValue2", null);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> list= storedPro.list();
					arrPatient = fetchOperationDetails(list, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else if (searchBy.equals("byName")) {
				String TempValue = strValue;
				String[] NewValue = TempValue.split(" ");
				length = NewValue.length;
				if (length == 1) {
					strValue = NewValue[0];
				} else {
					strValue = "";
					length = NewValue.length;
					if (length == 2) {
						strValue = NewValue[1];
						strValue2 = NewValue[2];
					} else {
						strValue = NewValue[1];
						strValue2 = NewValue[3];
					}
				}
				try {
					
					
					Query storedPro = sessionFactory.getCurrentSession().createSQLQuery(
							"call sp_display_OperationPat_Search(:otDate,:pageName,:searchBy,:strValue,:length,:strValue2)");
					storedPro.setParameter("otDate", otDate).setParameter("pageName", page_name)
							.setParameter("searchBy", searchBy).setParameter("strValue", strValue)
							.setParameter("length", length).setParameter("strValue2", strValue2);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> data= storedPro.list();
					arrPatient = fetchOperationDetails(data, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else {
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
			String todays_date = formatter.format(currentDate.getTime());
			if (!otDate.equals("")) {
				todays_date = otDate;
			}

			if (page_name.equals("updateScheduleOT")) {
				try {
					Query storedPro = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_display_OperationPat_updateScheduleOT(:otDate,:id)");
					storedPro.setParameter("otDate", todays_date);
					storedPro.setParameter("id", strValue);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> data= storedPro.list();
					arrPatient = fetchOperationDetails(data, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			else if (page_name.equals("OTSchedule")) {
				try {
					Query storedPro = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_display_OperationPat_OTSchedule(:otDate)");
					storedPro.setParameter("otDate", todays_date);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> list = storedPro.list();
					arrPatient = fetchOperationDetails(list, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			else if (page_name.equals("operation")) {
				try {
					Query storedPro = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_display_OperationPat_operation(:otDate,:searchBy,:strValue)");
					storedPro.setParameter("otDate", todays_date).setParameter("searchBy", searchBy)
							.setParameter("strValue", strValue);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> data= storedPro.list();
					arrPatient = fetchOperationDetails(data, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			else if (page_name.equals("PrevOperationDashboard")) {
				
				try {
					Query storedPro = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_display_OperationPat_PrevOperationDashboard(:searchBy,:strValue)");
					storedPro.setParameter("searchBy", searchBy)
							.setParameter("strValue", strValue);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> data= storedPro.list();
					arrPatient = fetchOperationDetails(data, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
				/*
				 * try { Query storedPro = sessionFactory.getCurrentSession()
				 * .createSQLQuery("call sp_display_OperationPat_PrevOperationDashboard()");
				 * storedPro.setResultTransformer(new AliasToBeanResultTransformer(List.class));
				 * // arrPatient = storedPro.list(); List<Map<String, Object>> data =
				 * storedPro.list(); arrPatient = fetchPreAnaestheticDetails(data); } catch
				 * (Exception e) { e.printStackTrace(); }
				 */
			} else {
				try {
					Query storedPro = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_display_OperationPat_last(:otDate)");
					storedPro.setParameter("otDate", todays_date);
					storedPro.setResultTransformer(new AliasToBeanResultTransformer(FetchScheduleOT.class));
					List<FetchScheduleOT> data = storedPro.list();
					arrPatient = fetchOperationDetails(data, page_name);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return arrPatient;
	}
	
	@SuppressWarnings({"rawtypes","unchecked"})
	private List fetchOperationDetails(List<FetchScheduleOT> list, String page_name) {
		List<Patient> arrTopPat = new ArrayList<Patient>();
		//List<TreatmentOperations> treatmentOperationslist=new ArrayList<>();
		for (FetchScheduleOT rs : list) {

			Patient objpatientDetails = new Patient();
			Treatment objTreatment = new Treatment();
			TreatmentOperations objTreatOperation = new TreatmentOperations();
			objTreatOperation.setId(rs.getID());
			objTreatOperation.setDate(rs.getDate());
			objTreatOperation.setOtid(rs.getOt_id());
			objTreatOperation.setCriticalFlag(rs.getCriticalFlag());
			objTreatOperation.setEmergencyFlag(rs.getEmergencyFlag());
			objTreatOperation.setEnd_Time(rs.getEnd_Time());
			objTreatOperation.setEndTime(rs.getEnd_Time());
			objTreatOperation.setStartTime(rs.getStart_Time());
			objTreatOperation.setStart_Time(rs.getStart_Time());
			
			// TreatMentBeds objTreatmentBeds = new TreatMentBeds();
			Beds objBeds = new Beds();
			// Hall objhHall = new Hall();

			Query storedPro = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_billid(:treatmentid)");
			storedPro.setParameter("treatmentid", rs.getTreatment_id());
			// storedPro.setResultTransformer(new
			// AliasToBeanResultTransformer(Integer.class));
			Integer biid = (Integer) storedPro.uniqueResult();
			if (biid == null) {
				biid = 0;
			}
			objpatientDetails.setBillid(biid);
			objpatientDetails.setCenterPatientId(rs.getCenter_patient_id());
			objpatientDetails.setAddressLine1("");
			objpatientDetails.setAddressLine2("");
			objpatientDetails.setAddressLine3("");
			String age = (rs.getAge()).toString();
			String months = (rs.getAge_months()).toString();
			String days = (rs.getAge_days()).toString();
			objpatientDetails.setAge(age);
			objpatientDetails.setMonth(months);
			objpatientDetails.setDays(days);
			objpatientDetails.setBmi(1.1);
			objpatientDetails.setBloodGroup("O+");
			objpatientDetails.setDob(rs.getDob());
			objpatientDetails.setEmergencyContactDetails("Chikhali");
			objpatientDetails.setfName(rs.getF_name());
			objpatientDetails.setlName(rs.getL_name());
			objpatientDetails.setmName(rs.getM_name());
			objpatientDetails.setMobile(rs.getMobile());
			objpatientDetails.setmStatus("Married");
			objpatientDetails.setAgeType("Yr");
			objpatientDetails.setOfficeNumber("");
			objpatientDetails.setPatient_ID(rs.getPatient_id());
			objpatientDetails.setRelative_name("");
			objpatientDetails.setSex( rs.getGender());
			objpatientDetails.setImg( rs.getImage_name());

			if (page_name.equals("OTSchedule") || page_name.equals("updateScheduleOT")) {
				Query storedPro1 = sessionFactory.getCurrentSession()
						.createSQLQuery("call sp_fetch_treatmentCount(:treatmentid,:patientid)");
				storedPro1.setParameter("treatmentid", rs.getTreatment_id());
				storedPro1.setParameter("patientid", rs.getPatient_id());
				storedPro1.setResultTransformer(new AliasToBeanResultTransformer(PtientRecord.class));
				List<PtientRecord> opmanageDetails = storedPro1.list();

				for (PtientRecord rs1 : opmanageDetails) {
					int charges_master_slave_id = rs1.getCharges_master_slave_id();
					String trcount = rs1.getTrcount();
					objTreatment.setTreatmentCount(trcount);
					int sourceid = rs1.getSource_type_id();
					if (charges_master_slave_id > 0) {

						Criteria criteria1 = sessionFactory.getCurrentSession()
								.createCriteria(ChargesMasterSlave.class);
						criteria1.add(Restrictions.eq("slaveId", charges_master_slave_id));
						criteria1.add(Restrictions.eq("deleted", "N"));
						ProjectionList proList1 = Projections.projectionList();
						proList1.add(Projections.property("categoryName"));
						criteria1.setProjection(proList1);
						criteria1.setMaxResults(1);
						String cname = (String) criteria1.uniqueResult();

						Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(ChargeMasterDTO.class);
						criteria2.add(Restrictions.eq("chargeId", sourceid));
						criteria2.add(Restrictions.eq("deleted", "N"));
						ProjectionList proList2 = Projections.projectionList();
						proList2.add(Projections.property("chargeName"));
						criteria2.setProjection(proList2);
						criteria2.setMaxResults(1);
						String sourcename = (String) criteria2.uniqueResult();

						objTreatment.setBillCategory_Name(sourcename);
						objTreatment.setCompanyid(charges_master_slave_id);
						objTreatment.setCompanyname(cname);
					} else {
						objTreatment.setBillCategory_Name("Self");
						objpatientDetails.setRefby("self");
						objTreatment.setCompanyid(0);
						objTreatment.setCompanyname("-");
					}
				}

			} else {
				Query storedPro1 = sessionFactory.getCurrentSession()
						.createSQLQuery("call sp_fetch_treatmentCount(:treatmentid,:patientid)");
				storedPro1.setParameter("treatmentid", rs.getTreatment_id());
				storedPro1.setParameter("patientid", rs.getPatient_id());
				storedPro1.setResultTransformer(new AliasToBeanResultTransformer(PtientRecord.class));
				List<PtientRecord> opmanageDetails = storedPro1.list();

				for (PtientRecord rs1 : opmanageDetails) {
					int charges_master_slave_id = rs1.getCharges_master_slave_id();
					String trcount = rs1.getTrcount();
					objTreatment.setTreatmentCount(trcount);
					int sourceid = rs1.getSource_type_id();
					if (charges_master_slave_id > 0) {

						Criteria criteria1 = sessionFactory.getCurrentSession()
								.createCriteria(ChargesMasterSlave.class);
						criteria1.add(Restrictions.eq("slaveId", charges_master_slave_id));
						criteria1.add(Restrictions.eq("deleted", "N"));
						ProjectionList proList1 = Projections.projectionList();
						proList1.add(Projections.property("categoryName"));
						criteria1.setProjection(proList1);
						criteria1.setMaxResults(1);
						String cname = (String) criteria1.uniqueResult();

						Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(ChargeMasterDTO.class);
						criteria2.add(Restrictions.eq("chargeId", sourceid));
						criteria2.add(Restrictions.eq("deleted", "N"));
						ProjectionList proList2 = Projections.projectionList();
						proList2.add(Projections.property("chargeName"));
						criteria2.setProjection(proList2);
						criteria2.setMaxResults(1);
						String sourcename = (String) criteria2.uniqueResult();

						objTreatment.setBillCategory_Name(sourcename);
						objTreatment.setCompanyid(charges_master_slave_id);
						objTreatment.setCompanyname(cname);
					} else {
						objTreatment.setBillCategory_Name("Self");
						objpatientDetails.setRefby("self");
						objTreatment.setCompanyid(0);
						objTreatment.setCompanyname("-");
					}
				}
			}
			objBeds.setHall_ID(1);
			objBeds.setBed_ID(2);
			objpatientDetails.setObjBeds(objBeds);
			objpatientDetails.setRefByMob("0");
			objpatientDetails.setRefto("ipd");
			objpatientDetails.setWeight(rs.getWeight().toString());
			objpatientDetails.setSymptoms("fever");
			objpatientDetails.setmStatus("Married");
			objpatientDetails.setTreatment_id(rs.getTreatment_id());
			objpatientDetails.setFiles_name("");// (String) rs.get("files_name")
			objpatientDetails.setFiles_path("");// rs.get("files_path")
			objpatientDetails.setTitle(rs.getPrefix());

			String admit = "";// (String) rs.get("admit_under");
			if (null == admit || "".equals(admit) || "undefined".equals(admit)) {
				try {
					int docid = 0;

					if (docid != 0) {
						Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
						criteria2.add(Restrictions.eq("Doctor_ID", docid));
						ProjectionList proList2 = Projections.projectionList();
						proList2.add(Projections.property("doc_name"));
						criteria2.setProjection(proList2);
						criteria2.setMaxResults(1);
						String Docname = (String) criteria2.uniqueResult();
						objpatientDetails.setAdmit_under(Docname);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				objpatientDetails.setAdmit_under(admit);
			}
			String docname = "-";

			Criteria criteria2 = sessionFactory.getCurrentSession().createCriteria(Chanelling_doctor.class);
			criteria2.add(Restrictions.eq("channDocId", rs.getRef_doc_id()));
			ProjectionList proList2 = Projections.projectionList();
			proList2.add(Projections.property("docName"));
			criteria2.setProjection(proList2);
			criteria2.setMaxResults(1);
			docname = (String) criteria2.uniqueResult();
			objpatientDetails.setRefby(docname);
			objTreatment.setTstartDate(((java.sql.Timestamp) rs.getCreated_date_time()).toString());
			objTreatment.setWeight(rs.getWeight().toString());
			objTreatment.setReferedBy(docname);
			objpatientDetails.setObjTreatment(objTreatment);

			Criteria criteriaa = sessionFactory.getCurrentSession().createCriteria(TreatmentOperationsManage.class);
			criteriaa.add(Restrictions.eq("iD", rs.getID()));
			criteriaa.add(Restrictions.eq("operationStatus", "Y"));
			List<TreatmentOperationsManage> troplist = criteriaa.list();
			List<TreatmentOperations> litrop =new ArrayList<>();
			for (TreatmentOperationsManage rs1 : troplist) {
				Operation op = new Operation();
				TreatmentOperations obj=new TreatmentOperations();
				obj.setTreatmentOperationsManageID(rs1.getTreatmentOperationsManageID());
				obj.setId(rs1.getiD());
				obj.setEmergencyFlag(rs.getEmergencyFlag());
				obj.setCriticalFlag(rs.getCriticalFlag());
				obj.setInfectionFlag(rs.getInfectionFlag());
				String st = rs.getStart_Time();
				String et = rs.getEnd_Time();
				obj.setStart_Time(st);
				obj.setEnd_Time(et);
				obj.setDate(rs.getDate());
				obj.setOtid(rs.getOt_id());

				obj.setDepartment(rs1.getDepartment());
				// obj.setObjOperation(rs1.getObjOperation());
				obj.setObjOperation(op);

				obj.setDoc_names(rs1.getDoc_names());
				obj.setOperationCharge(rs1.getOperationCharge());
				obj.setEquipments_Used(rs1.getEquipments_Used());
				obj.setComments(rs1.getComments());
				obj.setStatus(rs1.getStatus());
				obj.setRoute(rs1.getRoute());
				obj.setAnesthesia(rs1.getAnesthesia());

				obj.setAnechargetype(rs1.getAnachargetype());
				obj.setStent_detail(rs1.getStent_detail());
				obj.setFinding( rs1.getFinding());
				obj.setSuggestedBy(rs1.getSuggestedBy());
				obj.setProvlon(rs1.getProvlon());
				obj.setVeesel_det(rs1.getVeesel_det());
				obj.setSurInstrumentCharge(rs1
						.getSurInstrumentCharge());
				obj.setOhr(rs1.getOhr());
				obj.setChr( rs1.getChr());
				obj.setObp( rs1.getObp());
				obj.setCbp( rs1.getCbp());
				obj.setSheet_remove_by(rs1.getSheet_remove_by());
				obj.setOpcat( rs1.getOpcat());
				// obj.setKitName((String) rs.get("kit_ids"));

				obj.setAsstSurgeonName( rs1.getAsstSurgeonName());

				// services list creation
				obj.setGasAndMonitorService( rs1
						.getGasAndMonitorService());
				obj.setInstrumentAndEquipementService( rs1
						.getInsrumentAndEquipemntServices());
				obj.setBedSideService( rs1.getBedSideService());
				obj.setAnesthesiaType( rs1.getAnesthesiaType());
				
				String operationString = "0#";
				String opname = "";
				Criteria criteriaP = sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
				criteriaP.add(Restrictions.eq("treatmentOperationsManage", rs1.getTreatmentOperationsManageID()));
				criteriaP.add(Restrictions.eq("status", "Y"));
				List<PtientOperation> patientOperationList = criteriaP.list();

				for (PtientOperation rs3 : patientOperationList) {
					Integer operationId = rs3.getOperation_ID();
					String operationName = rs3.getOperationName();
					operationString = operationString + operationId + "@" + operationName + "#";
					opname = opname + "," +  rs3.getOperationName();
				}
				obj.setOperName("cancer1");
				
				obj.setScheduledProcedure(operationString);
				obj.setRemark( rs1.getRemark());
				obj.setPrecaution( rs1.getPrecaution());
				obj.setSurgeryDescription( rs1
						.getSurgeryDescription());
				obj.setIndicationForSurgery( rs1
						.getIndicationForSurgery());
				obj.setTeamId(rs1.getTeamId());
				obj.setBookedBy(rs1.getBookedBy());
				obj.setOtherReference( rs1.getOtherReference());
				obj.setContactOfReference( rs1
						.getContactOfReference());
				obj.setEmailOfReference( rs1.getEmailOfReference());
				List<Test> listTest = new ArrayList<Test>();

				Query storedPro3 = sessionFactory.getCurrentSession()
						.createSQLQuery("call sp_fetch_billid(:treatmentid)");
				storedPro3.setParameter("treatmentid", rs.getTreatment_id());
				Integer bill_id = (Integer) storedPro3.uniqueResult();
				if (bill_id == null) {
					bill_id = 0;
				}

				Query storedPro5 = sessionFactory.getCurrentSession()
						.createSQLQuery("call sp_fetch_ipdbilldetails(:treatmentid,:billid,:serviceId)");
				storedPro5.setParameter("treatmentid", rs.getTreatment_id());
				storedPro5.setParameter("billid", bill_id);
				storedPro5.setParameter("serviceId", 7);
				storedPro5.setResultTransformer(new AliasToBeanResultTransformer(PtientRecord.class));
				List<PtientRecord> monitorMap = storedPro5.list();

				if (null != rs1.getGasAndMonitorService() && !(rs1.getGasAndMonitorService()).equals("")) {
					String monitorArr[] = (rs1.getGasAndMonitorService()).split("\n");
					for (int i = 0; i < monitorArr.length; i++) {
						// String gasesId[] = monitorArr[i].split("-");
						for (PtientRecord monitor : monitorMap) {
							Test objTest = new Test();
							objTest.setTest_ID(monitor.getId());
							objTest.setTName(monitor.getCategory_name());
							objTest.setIpdservicetype("g");
							double qty = monitor.getQuantity();
							objTest.setQty((float) qty);
							objTest.setIpdbillid( monitor.getBill_details_id());
							listTest.add(objTest);
						}
					}
				}

				storedPro5.setParameter("serviceId", 6);
				storedPro5.setResultTransformer(new AliasToBeanResultTransformer(PtientRecord.class));
				List<PtientRecord> bedserv = storedPro5.list();
				for (int i = 0; i < bedserv.size(); i++) {
					for (PtientRecord bed : bedserv) {
						Test objTest = new Test();
						objTest.setTest_ID(bed.getId());
						objTest.setTName(bed.getCategory_name());
						objTest.setIpdservicetype("b");
						double qty = bed.getQuantity();
						objTest.setQty((float) qty);
						objTest.setIpdbillid(bed.getBill_details_id());
						listTest.add(objTest);
					}
				}
				Test objTest1 = new Test();
				objTest1.setBillid(bill_id);
				listTest.add(objTest1);

				storedPro5.setParameter("serviceId", 8);
				storedPro5.setResultTransformer(new AliasToBeanResultTransformer(PtientRecord.class));
				List<PtientRecord> instrumentMap = storedPro5.list();
				if (null != rs1.getInstrumentAndEquipementService()
						&& !(rs1.getInstrumentAndEquipementService()).equals("")) {
					String instrumentArr[] = (rs1.getInstrumentAndEquipementService()).split("\n");
					for (int i = 0; i < instrumentArr.length; i++) {
						// String instruId[] = instrumentArr[i].split("-");
						for (PtientRecord instrument : instrumentMap) {
							Test objTest = new Test();
							objTest.setTest_ID(instrument.getId());
							objTest.setTName(instrument.getCategory_name());
							objTest.setIpdservicetype("i");
							double qty = instrument.getQuantity();
							objTest.setQty((float) qty);
							objTest.setIpdbillid(instrument.getBill_details_id());
							listTest.add(objTest);
						}
					}
				}

				Query storedPro01 = sessionFactory.getCurrentSession()
						.createSQLQuery("call sp_count_ipd_ot_manage_surgeryconsumable(:id)")
						.setParameter("id", rs1.getTreatmentOperationsManageID());
				Integer count =((BigInteger) storedPro01.uniqueResult()).intValue();
				if (count > 0) {
					Query storedPro02 = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_fetch_ipd_ot_manage_surgeryconsumable(:id)");
					storedPro02.setParameter("id", rs1.getTreatmentOperationsManageID());
					storedPro02.setResultTransformer(new AliasToBeanResultTransformer(List.class));
					List<Map<String, Object>> equipmentMap = storedPro02.list();

					for (Map equipment : equipmentMap) {
						Test objTest = new Test();
						objTest.setTest_ID((Integer) equipment.get("item_id"));
						objTest.setTName((String) equipment.get("item_name"));
						objTest.setIpdservicetype("c");
						int qty = (Integer) equipment.get("item_qty");
						float QTY = (float) qty;
						objTest.setQty(QTY);
						listTest.add(objTest);
					}

				}
				obj.setListTest(listTest);
				// end services list creation

				Criteria criteriav = sessionFactory.getCurrentSession().createCriteria(OperationDocTbl.class);
				criteriav.add(Restrictions.eq("status", "Y"));
				criteriav.add(Restrictions.eq("idtreatmentOperationManage", rs1.getTreatmentOperationsManageID()));
				List<OperationDocTbl> listDocd = criteriav.list();
				List<OperationDocTbl> listDocDetails=new ArrayList<OperationDocTbl>();
				for (OperationDocTbl rset : listDocd) {
					OperationDocTbl objOperationDocTbl = new OperationDocTbl();
					System.out.println("id**** "+(Integer) rset.getIdoperationDocTbl());
					objOperationDocTbl.setIdoperationDocTbl((Integer) rset.getIdoperationDocTbl());

					Query storedPro6 = sessionFactory.getCurrentSession()
							.createSQLQuery("call sp_fetch_doctorlist(:userId)");
					storedPro6.setParameter("userId", rset.getDocId());
					storedPro6.setResultTransformer(new AliasToBeanResultTransformer(Doctor.class));
					List<Doctor> docList = storedPro6.list();
					for (Doctor rs2 : docList) {
						Doctor objDoc = new Doctor();
						objDoc.setDoctor_ID(rs2.getDoctor_ID());
						objDoc.setDoc_name(rs2.getDoc_name());
						objDoc.setMobileNo(rs2.getMobileNo());
						objDoc.setEmail_Id(rs2.getEmail_Id());
						objDoc.setSpeciality(rs2.getSpeciality());
						objDoc.setDepartmentName(rs2.getDepartmentName());
						objOperationDocTbl.setObjDoctor(objDoc);
						
						objOperationDocTbl.setDocId(rs2.getDoctor_ID());
						objOperationDocTbl.setDocName(rs2.getDoc_name());
						objOperationDocTbl.setSurgeonType(rset.getSurgeonType());
						objOperationDocTbl.setDocType(rset.getDocType());
						
					}
					listDocDetails.add(objOperationDocTbl);
				}
				obj.setListOperationDoc(listDocDetails);
				litrop.add(obj);
			}
			//treatmentOperationslist.add(objTreatOperation);
			//objpatientDetails.setListTop(treatmentOperationslist);
			//arrTopPat.add(objpatientDetails);
			objpatientDetails.setListTop(litrop);
			arrTopPat.add(objpatientDetails);
		}
		return arrTopPat;
	}
	
	@SuppressWarnings({"rawtypes","unchecked"})
	private List fetchPreAnaestheticDetails(List<Map<String, Object>> data) {
		List<Patient> arrTopPat = new ArrayList<Patient>();
		for (Map rs : data) {
			Patient objpatientDetails = new Patient();
			objpatientDetails.setCenterPatientId((String)rs.get("patientCenterId "));
			objpatientDetails.setfName((String) rs.get("fName"));
			objpatientDetails.setlName((String) rs.get("lName"));
			objpatientDetails.setmName((String) rs.get("mName"));
			objpatientDetails.setRegDate((String) rs.get("reg_date"));
			objpatientDetails.setPatient_ID((Integer) rs.get("Patient_ID"));
			objpatientDetails.setAge((String) rs.get("age"));
			objpatientDetails.setTitle((String) rs.get("title"));
			objpatientDetails.setSex((String) rs.get("sex"));
			objpatientDetails.setRefto((String) rs.get("referedTo"));
			objpatientDetails.setAgeType((String) rs.get("ageType"));
			Date dateNow = null;
			Treatment objTreatment = new Treatment();
			objTreatment.setWeight((String) rs.get("weight"));
			objTreatment.setReferedTo((String) rs.get("referedTo"));
			objTreatment.setTreatmentCount((String) rs.get("treatmentCount"));
			String rby = (String) rs.get("referedBy");
			if (null == rby || "".equals(rby) || rby.equals("select")
					|| rby.equals("0")) {
				objpatientDetails.setRefby((String) rs.get("referedBy"));
			} else {
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(Chanelling_doctor.class);
				criteria2.add(Restrictions.eq("channDocId", rs.get("referedBy")));
				ProjectionList proList2 = Projections.projectionList();
				proList2.add(Projections.property("docName"));
				criteria2.setProjection(proList2);
				criteria2.setMaxResults(1);
				String docname = (String) criteria2.uniqueResult();
				objpatientDetails.setRefby(docname);
			}
			String admit = (String) rs.get("admit_under");
			if (null == admit || "".equals(admit)) {
				objpatientDetails
						.setAdmit_under((String) rs.get("admit_under"));
			} else {
				Criteria criteria2 = sessionFactory.getCurrentSession()
						.createCriteria(Doctor.class);
				criteria2.add(Restrictions.eq("Doctor_ID", rs.get("admit_under")));
				ProjectionList proList2 = Projections.projectionList();
				proList2.add(Projections.property("doc_name"));
				criteria2.setProjection(proList2);
				criteria2.setMaxResults(1);
				String admitname =(String) criteria2.uniqueResult();
				objpatientDetails.setAdmit_under(admitname);
			}
			objpatientDetails.setObjTreatment(objTreatment);

			Query storedPro7 = sessionFactory.getCurrentSession()
					.createSQLQuery("call sp_fetchpre_anaesthetic(:patientId)");
			storedPro7.setParameter("patientId",objpatientDetails.getPatient_ID());
			storedPro7.setResultTransformer(new AliasToBeanResultTransformer(List.class));
			List<Map<String, Object>> opmanageDetails = storedPro7.list();
			
			List<PreAnaesthetic> arrPreanaesthetic = new ArrayList<PreAnaesthetic>();
			for (Map rs1 : opmanageDetails) {
				PreAnaesthetic objPreAnaesthetic = new PreAnaesthetic();

				objPreAnaesthetic.setPreAnaesthetic_ID((Integer) rs1.get("idpre_anaesthetic"));
				objPreAnaesthetic.setChk_anaesthetic_status((String) rs1.get("chk_anaesthetic"));
				objPreAnaesthetic.setRadio_anaesthetic_status((String) rs1.get("radio_anaesthetic"));
				objPreAnaesthetic.setprevanaes_exp((String) rs1.get("prevanaes_exp"));
				objPreAnaesthetic.setPulse((String) rs1.get("pulse"));
				objPreAnaesthetic.setBP((String) rs1.get("BP"));
				objPreAnaesthetic.setResp((String) rs1.get("Resp"));
				objPreAnaesthetic.setPallor((String) rs1.get("Pallor"));
				objPreAnaesthetic.setIcterus((String) rs1.get("Icterus"));
				objPreAnaesthetic.setClub((String) rs1.get("Club"));
				objPreAnaesthetic.setOedema((String) rs1.get("Oedema"));
				objPreAnaesthetic.setVein((String) rs1.get("Vein"));
				objPreAnaesthetic.setObesity((String) rs1.get("Obesity"));
				objPreAnaesthetic.setNeckobj((String) rs1.get("Neck"));
				objPreAnaesthetic.setTeethobj((String) rs1.get("Teeth"));
				objPreAnaesthetic.setSpineobj((String) rs1.get("Spine"));
				objPreAnaesthetic.setBHTobj((String) rs1.get("BHT"));
				objPreAnaesthetic.setCVSobj((String) rs1.get("CVS"));
				objPreAnaesthetic.setRSobj((String) rs1.get("RS"));
				objPreAnaesthetic.setCVSobj((String) rs1.get("CVS"));
				objPreAnaesthetic.setCNSobj((String) rs1.get("CNS"));
				objPreAnaesthetic.setHBobj((String) rs1.get("Hb"));
				objPreAnaesthetic.setTCobj((String) rs1.get("TC"));
				objPreAnaesthetic.setPobj((String) rs1.get("P"));
				objPreAnaesthetic.setLobj((String) rs1.get("L"));
				objPreAnaesthetic.setEobj((String) rs1.get("E"));
				objPreAnaesthetic.setMobj((String) rs1.get("M"));
				objPreAnaesthetic.setBoneobj((String) rs1.get("Bone"));
				objPreAnaesthetic.setSmearobj((String) rs1.get("Smear"));
				objPreAnaesthetic.setPlateletobj((String) rs1.get("platelets"));
				objPreAnaesthetic.setESRobj((String) rs1.get("ESR"));
				objPreAnaesthetic.setUrineobj((String) rs1.get("urine"));
				objPreAnaesthetic.setBUNobj((String) rs1.get("BUN"));
				objPreAnaesthetic.setHIVobj((String) rs1.get("HIV"));
				objPreAnaesthetic.setBSLobj((String) rs1.get("BSL"));
				objPreAnaesthetic.setFobj((String) rs1.get("F"));
				objPreAnaesthetic.setPPobj((String) rs1.get("PP"));
				objPreAnaesthetic.setnaElectolytes((String) rs1.get("NaElectolytes"));
				objPreAnaesthetic.setkElectolytes((String) rs1.get("KElectrolytes"));
				objPreAnaesthetic.setclElectolytes((String) rs1.get("ClElectrolytes"));
				objPreAnaesthetic.setBonetwoobj((String) rs1.get("Btwo"));
				objPreAnaesthetic.setCTobj((String) rs1.get("CT"));
				objPreAnaesthetic.setPTobj((String) rs1.get("PT"));
				objPreAnaesthetic.setScreatobj((String) rs1.get("Screat"));
				objPreAnaesthetic.setECGobj((String) rs1.get("ECG"));
				objPreAnaesthetic.setOther((String) rs1.get("Other"));
				objPreAnaesthetic.setRisk_assess((String) rs1.get("risk_assess"));
				objPreAnaesthetic.setProposed_plan((String) rs1.get("proposed_plan"));
				objPreAnaesthetic.setPre_operativeinstuct((String) rs.get("pre_operativeinstuct"));
				objPreAnaesthetic.setPre_medication((String) rs1.get("pre_medication"));
				objPreAnaesthetic.setXray_chest((String) rs1.get("xray"));
				objPreAnaesthetic.setJawobj((String) rs1.get("Jaw"));
				objPreAnaesthetic.setCyanosis((String) rs1.get("Cyanosis"));
				objPreAnaesthetic.setBloodgroup((String) rs1.get("bloodgroup"));
				objPreAnaesthetic.setCreated_Date((String) rs.get("Date"));
				objPreAnaesthetic.setOtherpresentMedication((String) rs.get("otherpresentmed"));
				objPreAnaesthetic.setProposedSurgery((String) rs.get("proposed_surgery"));
				objPreAnaesthetic.setIpd_Number((String) rs
						.get("treatmentCount"));

				arrPreanaesthetic.add(objPreAnaesthetic);
			}
			objpatientDetails.setObjPreList(arrPreanaesthetic);

			Query storedPro8 = sessionFactory.getCurrentSession()
					.createSQLQuery("call sp_anaesthesia_conduct(:patientId)");
			storedPro8.setParameter("patientId",objpatientDetails.getPatient_ID());
			storedPro8.setResultTransformer(new AliasToBeanResultTransformer(List.class));
			List<Map<String, Object>> conductdetails = storedPro8.list();
			List<ConductAnaesthesia> Conductanaesthesialist = new ArrayList<ConductAnaesthesia>();
			String datetostring1 = "";
			for (Map rs1 : conductdetails) {

				ConductAnaesthesia objConductAnaesthesiaMaster = new ConductAnaesthesia();
				objConductAnaesthesiaMaster.setTreatment_ID((Integer) rs1
						.get("Treatment_ID"));
				objConductAnaesthesiaMaster.setInduction((String) rs1
						.get("induction"));
				objConductAnaesthesiaMaster.setRelaxant((String) rs1
						.get("relaxant"));
				objConductAnaesthesiaMaster.setPostOPpulse((String) rs1
						.get("postOPpulse"));
				objConductAnaesthesiaMaster.setPostOPbp((String) rs1
						.get("postOPbp"));
				objConductAnaesthesiaMaster.setPostOPrr((String) rs1
						.get("postOPrr"));
				objConductAnaesthesiaMaster.setPostOPcolor((String) rs1
						.get("postOPcolor"));
				objConductAnaesthesiaMaster.setChk_anesthesia((String) rs1
						.get("chkAnesthesia"));
				objConductAnaesthesiaMaster.setChkpostoperative((String) rs1
						.get("chkPostOperative"));
				objConductAnaesthesiaMaster
						.setIdanaesthesia_conduct((Integer) rs1
								.get("idanaesthesia_conduct"));
				dateNow = ((Date) rs1.get("Date"));
				SimpleDateFormat dateformatJava = new SimpleDateFormat(
						"yyyy-MM-dd");
				if (dateNow != null) {
					datetostring1 = dateformatJava.format(dateNow);
				}
				objConductAnaesthesiaMaster.setDate((String) datetostring1);
				List<VitalSing> objVitalSing = new ArrayList<VitalSing>();
				
				Query storedPro9= sessionFactory.getCurrentSession()
						.createSQLQuery("call sp_anaesthesia_conduct(:teatmentId)");
				storedPro9.setParameter("teatmentId",(Integer) rs1.get("Treatment_ID"));
				storedPro9.setResultTransformer(new AliasToBeanResultTransformer(List.class));
				List<Map<String, Object>> liVitalSingTemp = storedPro9.list();
				
				for (Map rs2 : liVitalSingTemp) {
					VitalSing objVitalSingSlave = new VitalSing();

					objVitalSingSlave.setTtime((String) rs2.get("time"));
					objVitalSingSlave.setTpulse((String) rs2.get("tpulse"));
					objVitalSingSlave.setBps((String) rs2.get("bps"));
					objVitalSingSlave.setBpd((String) rs2.get("bpd"));
					objVitalSingSlave.setBpm((String) rs2.get("bpm"));
					objVitalSingSlave.setTrr((String) rs2.get("trr"));
					objVitalSingSlave.setEtco2((String) rs2.get("etco2"));
					objVitalSingSlave.setUo((String) rs2.get("uo"));
					objVitalSingSlave.setFluidone((String) rs2.get("fluidone"));
					objVitalSingSlave.setFluidtwo((String) rs2.get("fluidtwo"));
					objVitalSingSlave.setInfusion((String) rs2.get("infusion"));
					objVitalSingSlave.setBolus((String) rs2.get("bolus"));
					objVitalSingSlave.setEvent((String) rs2.get("event"));
					objVitalSingSlave.setEmpty((String) rs2.get("empty"));
					objVitalSingSlave.setSao2((String) rs2.get("sao2"));
					objVitalSingSlave.setIdvital_sing((Integer) rs2
							.get("idvital_sing"));
					objVitalSing.add(objVitalSingSlave);

				}

				objConductAnaesthesiaMaster.setVitalslavelist(objVitalSing);
				Conductanaesthesialist.add(objConductAnaesthesiaMaster);
			}

			// objpatientDetails.setListTop(litrop);
			objpatientDetails.setObjConductList(Conductanaesthesialist);
			arrTopPat.add(objpatientDetails);

		}
		return arrTopPat;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OperationTypeTbl> searchPT(String strValue) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationTypeTbl.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.like("name", "%"+strValue+"%"));
		List<OperationTypeTbl> list = criteria.list();
		return list;
	}

	@Override
	public String saveEditOperationTeam(OperationTeam obj) {
		String msg="";
		Session session = sessionFactory.openSession(); 
		session.beginTransaction();
		if (obj.getTeamId() > 0) {
			OperationTeam op = (OperationTeam) sessionFactory
					.getCurrentSession().get(OperationTeam.class, obj.getTeamId());
			op.setStatus("Y");
			op.setTeamName(obj.getTeamName());
			//op.setLtSlave(obj.getLtSlave());
			msg ="Operation Team updated successfully...";
		}else {
			obj.setStatus("Y");
			session.save(obj);
			msg ="Operation Team Saved successfully...";
		}
		session.getTransaction().commit(); //commit the transaction
		session.close();
		return msg;
	}

	@Override
	public String SaveOperationDetails(Operation obj,String queryType) {
		String msg="";
		Session session = sessionFactory.openSession(); 
		session.beginTransaction();
		if (obj.getOperation_id() > 0 && queryType.equals("update")) {
			Operation op = (Operation) sessionFactory.getCurrentSession().get(Operation.class, obj.getOperation_id());
			op.setStatus("Y");
			op.setOperName(obj.getOperName());
			op.setOpType(obj.getOpType());
			op.setRisk(obj.getRisk());
			op.setEquipments(obj.getEquipments());
			op.setCharges(obj.getCharges());
			op.setEPrice(obj.getEPrice());
			op.setECharges(obj.getECharges());
			op.setStatus(obj.getStatus());
			op.setOpstate(obj.getOpstate());
			op.setOpgrade(obj.getOpgrade());
			op.setSpeName(obj.getSpeName());
			op.setCathlab(obj.getCathlab());
			msg = "Operation updated successfully...";
		}else {
			obj.setStatus("Y");
			session.save(obj);
			msg ="Operation Saved successfully...";
		}
		session.getTransaction().commit(); 
		session.close();
		return msg;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Operation> searchOperation(String strValue) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Operation.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.like("operName", "%"+strValue+"%"));
		List<Operation> list = criteria.list();
		return list;
	}

	@Override
	public String scheduleOperation(TreatmentOperations obj, String queryType) {
		String msg="";
		String surgeonName = "";
		String assistantSurgeonName = "";
		String anestheticDoctor = "";
		String surgery = "";
		//String patientName = "";
		//String mobileNo = "";
		Integer treatmentoperationid=0;
		Session session = sessionFactory.getCurrentSession();
		
		RegistrationDto patient = (RegistrationDto) sessionFactory
				.getCurrentSession().get(RegistrationDto.class, obj.getPatientId());
		//mobileNo =patient.getMobile();
		//patientName = patient.getfName()+" "+patient.getmName()+" "+patient.getlName();
		
		Query storedPro3 = sessionFactory.getCurrentSession()
				.createSQLQuery("call sp_fetch_treatment_id(:patientid)");
		storedPro3.setParameter("patientid", obj.getPatientId());
		int treatmentId=(int) storedPro3.uniqueResult();
		
		TreatmentDto treatment= (TreatmentDto) sessionFactory
				.getCurrentSession().get(TreatmentDto.class, treatmentId);
		String allDocName = "";
		for (OperationDocTbl li : obj.getListOperationDoc()) {
			Users users = (Users) sessionFactory.getCurrentSession().get(Users.class, li.getDocId());
			String docName = "";
			docName = users.getTitle()
					+ users.getF_name() + " "
					+ users.getM_name() + " "
					+ users.getL_name();
			allDocName = allDocName + "," + docName;
		}
		if (obj.getId() > 0 && queryType.equals("update")) {
			TreatmentOperations op = (TreatmentOperations) sessionFactory.getCurrentSession().get(TreatmentOperations.class, obj.getId());
			op.setStatus("Y");
			op.setOpStatus("Y");
			op.setScheduleFlag("OT");
			op.setStart_Time(obj.getStartTime());
			op.setEnd_Time(obj.getEndTime());
			op.setDate(obj.getDate());
			op.setOtid(obj.getOtid());
			op.setEmergencyFlag(obj.getEmergencyFlag());
			op.setRegistrationDto(patient);
			op.setTreatmentDto(treatment);
			op.setStartTime(obj.getStartTime());
			op.setEndTime(obj.getEndTime());
			
			TreatmentOperationsManage tom = (TreatmentOperationsManage) sessionFactory.getCurrentSession().get(TreatmentOperationsManage.class, obj.getTreatmentOperationsManageID());
			tom.setiD(obj.getId());
			tom.setDoc_names(allDocName);
			tom.setOperation_ID(obj.getOperation_ID());
			tom.setDepartment(obj.getDepartment());
			tom.setScheduledProcedure(obj.getScheduledProcedure());
			tom.setRemark(obj.getRemark());
			tom.setPrecaution(obj.getPrecaution());
			tom.setSurgeryDescription(obj.getSurgeryDescription());
			tom.setIndicationForSurgery(obj.getIndicationForSurgery());
			tom.setTeamId(obj.getTeamId());
			tom.setBookedBy(obj.getBookedBy());
			tom.setAnesthesiaType(obj.getAnesthesiaType());
			tom.setSuggestedBy(obj.getSuggestedBy());
			tom.setOtherReference(obj.getOtherReference());
			tom.setContactOfReference(obj.getContactOfReference());
			tom.setEmailOfReference(obj.getEmailOfReference());
			tom.setOpcat(obj.getOpcat());
			tom.setStatus("Y");
			tom.setOpStatus("Y");
			tom.setOperationStatus("Y");
			tom.setUnitId(obj.getUnitId());
			
			String sqlBill="select idpatient_operation FROM patient_operation where treatmentOperationsManageID="+obj.getTreatmentOperationsManageID();
			Query deptQuery = session.createSQLQuery(sqlBill);	
			deptQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> patOpIdList = deptQuery.list();
			
			for(Map<String, Object> rs : patOpIdList)
			{
				Integer patOpId = (Integer) rs.get("idpatient_operation");
				if(patOpId > 0) {
					
					PtientOperation pod = (PtientOperation) session.get(PtientOperation.class, patOpId);
					session.delete(pod);
				}
			}
			
			String str = obj.getScheduledProcedure();
			String str1[] = str.split("#");
			for (int i = 1; i < str1.length; i++) {
				String str2[] = str1[i].split("@");
				surgery = surgery +","+ str2[1];
				//int count = 1;
				PtientOperation po=new PtientOperation();

				/*if (count > 0) {
				} else {*/
					po.setTreatmentOperationsManage(obj.getTreatmentOperationsManageID());
					po.setOperation_ID(Integer.parseInt(str2[0]));
					po.setOperationName(str2[1]);
					po.setStatus("Y");
					po.setUnitId(obj.getUnitId());
					session.save(po);
				//}
			}
			
			OperationDocTbl docd=new OperationDocTbl();
			docd.setIdtreatmentOperationManage(obj.getTreatmentOperationsManageID());
			session.delete(docd);
			
			SQLQuery updateres = sessionFactory.getCurrentSession().createSQLQuery("update operation_doc_tbl set status = 'N' where treatmentOperationsManageID ="+obj.getTreatmentOperationsManageID());
			updateres.executeUpdate();
			
			for (int i = 0; i < obj.getListOperationDoc().size(); i++) {
				OperationDocTbl doc=new OperationDocTbl();
				
				String sql = "select count(*) from operation_doc_tbl where idoperation_doc_tbl ="+obj.getListOperationDoc().get(i).getIdoperationDocTbl();
				SQLQuery sqlres = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int cnt = ((Number) sqlres.uniqueResult()).intValue();
				
				if(obj.getListOperationDoc().get(i).getIdoperationDocTbl() == 0 || cnt == 1)
				{
					System.out.println("obj.getListOperationDoc().get(i).getIdoperationDocTbl()*** "+obj.getListOperationDoc().get(i).getIdoperationDocTbl());
					
					doc.setIdoperationDocTbl(obj.getListOperationDoc().get(i).getIdoperationDocTbl());
					
					doc.setIdtreatmentOperationManage(obj.getTreatmentOperationsManageID());
					doc.setDocId(obj.getListOperationDoc().get(i).getDocId());
					doc.setDocType(obj.getListOperationDoc().get(i).getDocType());
					doc.setDocName(obj.getListOperationDoc().get(i).getDocName());
					doc.setSurgeonType(obj.getListOperationDoc().get(i).getSurgeonType());
					doc.setStatus("Y");
					if((obj.getListOperationDoc().get(i).getSurgeonType().equals("surgeon"))){
						surgeonName = surgeonName +","+obj.getListOperationDoc().get(i).getDocName();
					}
					else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("asssurgeon"))){
						assistantSurgeonName = assistantSurgeonName +","+obj.getListOperationDoc().get(i).getDocName();
					}
					else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("anesthetist"))){
						anestheticDoctor = anestheticDoctor +","+obj.getListOperationDoc().get(i).getDocName();
					}
					doc.setUnitId(obj.getUnitId());
					//session.save(doc);
					session.merge(doc);
				}
			}
			
			msg = "OT updated successfully...";
		}else {
			obj.setRegistrationDto(patient);
			obj.setTreatmentDto(treatment);
			obj.setStatus("Y");
			obj.setOpStatus("Y");
			obj.setScheduleFlag("OT");
			treatmentoperationid =(Integer) session.save(obj);
			
			TreatmentOperationsManage tom=new TreatmentOperationsManage();
			tom.setiD(treatmentoperationid);
			tom.setDoc_names(allDocName);
			tom.setOperation_ID(obj.getOperation_ID());
			tom.setDepartment(obj.getDepartment());
			tom.setScheduledProcedure(obj.getScheduledProcedure());
			tom.setRemark(obj.getRemark());
			tom.setPrecaution(obj.getPrecaution());
			tom.setSurgeryDescription(obj.getSurgeryDescription());
			tom.setIndicationForSurgery(obj.getIndicationForSurgery());
			tom.setTeamId(obj.getTeamId());
			tom.setBookedBy(obj.getBookedBy());
			tom.setAnesthesiaType(obj.getAnesthesiaType());
			tom.setSuggestedBy(obj.getSuggestedBy());
			tom.setOtherReference(obj.getOtherReference());
			tom.setContactOfReference(obj.getContactOfReference());
			tom.setEmailOfReference(obj.getEmailOfReference());
			tom.setOpcat(obj.getOpcat());
			tom.setStatus("Y");
			tom.setOpStatus("Y");
			tom.setOperationStatus("Y");
			tom.setUnitId(obj.getUnitId());
			int tre_manageId = (int) session.save(tom);
			
			String operationString = obj.getScheduledProcedure();
			String[] arrayOperation = operationString.split("#");
			for (int i = 1; i < arrayOperation.length; i++) {
				String[] array = arrayOperation[i].split("@");
				PtientOperation po=new PtientOperation();
				//tom.setTreatmentOperationsManageID(tre_manageId);
				//po.setTreatmentOperationsManage(tom);
				po.setTreatmentOperationsManage(tre_manageId);
				po.setOperation_ID(Integer.parseInt(array[0]));
				po.setOperationName(array[1]);
				po.setStatus("Y");
				po.setUnitId(obj.getUnitId());
				surgery = surgery +","+ array[1];
				session.save(po);
			}
			for (int i = 0; i < obj.getListOperationDoc().size(); i++) {
				OperationDocTbl doc=new OperationDocTbl();
				doc.setIdtreatmentOperationManage(tre_manageId);
				doc.setDocId(obj.getListOperationDoc().get(i).getDocId());
				doc.setDocType(obj.getListOperationDoc().get(i).getDocType());
				doc.setDocName(obj.getListOperationDoc().get(i).getDocName());
				doc.setSurgeonType(obj.getListOperationDoc().get(i).getSurgeonType());
				doc.setStatus("Y");
				if((obj.getListOperationDoc().get(i).getSurgeonType().equals("surgeon"))){
					surgeonName = surgeonName +","+obj.getListOperationDoc().get(i).getDocName();
				}
				else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("asssurgeon"))){
					assistantSurgeonName = assistantSurgeonName +","+obj.getListOperationDoc().get(i).getDocName();
				}
				else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("anesthetist"))){
					anestheticDoctor = anestheticDoctor +","+obj.getListOperationDoc().get(i).getDocName();
				}
				doc.setUnitId(obj.getUnitId());
				session.save(doc);
			}
			msg ="OT Scheduled successfully...";
		}
		return msg;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OperationDocTbl> fetchOperationDocList(Integer tomId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationDocTbl.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("idtreatmentOperationManage", tomId));
		List<OperationDocTbl> list = criteria.list();
		List<OperationDocTbl> newli=new ArrayList<OperationDocTbl>();
		for (OperationDocTbl doc : list) {
			Doctor op = (Doctor) sessionFactory
					.getCurrentSession().get(Doctor.class, doc.getDocId());
			if(doc.getConfirmTime() == null || doc.getArrivalTime() == null)
			{
				doc.setConfirmTime("-");
				doc.setArrivalTime("-");
			}
			doc.setObjDoc(op);
			newli.add(doc);
		}
		return newli;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<PreOpPrep> fetchPreOpPre(Integer tomId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PreOpPrep.class);
		criteria.add(Restrictions.eq("status", "N"));
		criteria.add(Restrictions.eq("treatmentOperationsManageID", tomId));
		List<PreOpPrep> list = criteria.list();
		return list;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<UploadOTDocuments> fetchOTDoc(Integer tomId, Integer patId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(UploadOTDocuments.class);
		criteria.add(Restrictions.eq("status", "N"));
		criteria.add(Restrictions.eq("treatmentOperationsManageID", tomId));
		criteria.add(Restrictions.eq("PatientID", patId));
		List<UploadOTDocuments> list = criteria.list();
		return list;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<OTDescription> fetchOTDescription(Integer tomId) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OTDescription.class);
		criteria.add(Restrictions.eq("status", "N"));
		criteria.add(Restrictions.eq("treatmentOperationsManageID", tomId));
		List<OTDescription> list = criteria.list();
		return list;
	}

	@Override
	public String addDocNameToList1(OperationDocTbl obj) {
		String msg = "";
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction();
		obj.setStatus("Y");
		session.save(obj);
		msg = "Doctor Added successfully.";
		session.getTransaction().commit(); // commit the transaction
		session.close();
		return msg;
	}

	@Override
	public String deleteDocRecord(OperationDocTbl obj) {
		OperationDocTbl op = (OperationDocTbl) sessionFactory.getCurrentSession().get(OperationDocTbl.class,
				obj.getIdoperationDocTbl());
		op.setStatus("N");
		op.setRemove("Y");
		op.setNarration(obj.getNarration());
		op.setRemovedMarkBy(obj.getRemovedMarkBy());
		return "Data is Deleted Successfully .";
	}

	@Override
	public String absentDoc(OperationDocTbl obj) {
		OperationDocTbl op = (OperationDocTbl) sessionFactory.getCurrentSession().get(OperationDocTbl.class,
				obj.getIdoperationDocTbl());
		op.setConfirm("N");
		op.setConfirmedMarkBy(obj.getRemovedMarkBy());
		op.setArrival("N");
		op.setArrivalMarkBy(obj.getRemovedMarkBy().toString());
		op.setAbsent("N");
		op.setAbsentMarkBy(obj.getRemovedMarkBy().toString());
		op.setNarration(obj.getNarration());
		return "Absent Doctor Data is Saved Successfully .";
	}

	@Override
	public String confirmDoc(OperationDocTbl obj, Integer userId) {
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todays_date = formatter.format(currentDate.getTime());
		OperationDocTbl op = (OperationDocTbl) sessionFactory.getCurrentSession().get(OperationDocTbl.class,
				obj.getIdoperationDocTbl());
		op.setConfirm("Y");
		op.setConfirmedMarkBy(userId);
		op.setAbsent("N");
		op.setAbsentMarkBy(userId.toString());
		op.setConfirmTime(todays_date);
		return "Doctor's Availability Confirmed Successfully .";
	}

	@Override
	public String arrivalDoc(OperationDocTbl obj, Integer userId) {
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todays_date = formatter.format(currentDate.getTime());

		OperationDocTbl op = (OperationDocTbl) sessionFactory.getCurrentSession().get(OperationDocTbl.class,
				obj.getIdoperationDocTbl());
		op.setArrival("Y");
		op.setArrivalMarkBy(userId.toString());
		op.setAbsent("N");
		op.setAbsentMarkBy(userId.toString());
		op.setArrivalTime(todays_date);
		return "Doctor's Arrival Time Saved Successfully .";
	}

	@SuppressWarnings("unlikely-arg-type")
	@Override
	public String savePreOpPrep(String popString, PreOpPrep objdrr, Integer userid) {
		String msg = "";
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction();

		if (objdrr!=null && !objdrr.equals("")) {
			List<PreOpPrep> drrlist = objdrr.getListpreOpPrep();
			for (PreOpPrep drr : drrlist) {
				int prepID = drr.getIdpre_op_prep_details();

				if (prepID == 0) {

				} else {
					PreOpPrep op = (PreOpPrep) sessionFactory.getCurrentSession().get(PreOpPrep.class,
							drr.getIdpre_op_prep_details());
					op.setChecklistName(drr.getChecklistName());
					op.setConfirm(drr.getConfirm());
					op.setConfirmedMarkBy(userid.toString());
					op.setConfirmedTime(drr.getConfirmedTime());
					op.setRemark(drr.getRemark());
					op.setStatus("N");
				}
			}
			msg = "Pre-Op PrevCheck List is Saved successfully...";
		}
		if (!popString.equals("")) {
			String[] Tr = popString.split("@");
			int i = 0;
			for (String str : Tr) {
				String[] finalValues = str.split(",");
				PreOpPrep op = new PreOpPrep();
				if (i == 0) {

				} else {
					String popId = finalValues[4];
					if (Integer.parseInt(popId) != 0) {
						op.setTreatmentOperationsManageID(Integer.parseInt(popId));
						op.setChecklistName(finalValues[0]);
						op.setConfirm(finalValues[1]);
						op.setConfirmedMarkBy(userid.toString());
						op.setConfirmedTime(finalValues[2]);
						op.setRemark(finalValues[3]);
						op.setStatus("N");
						session.save(op);
					}
				}
				i++;
			}
			msg = "Pre-Op PrevCheck List is Saved successfully...";
		}
		session.getTransaction().commit(); //commit the transaction
		session.close();
		
		return msg;
	}

	@Override
	public String saveOTDescription(Integer tomId, String descr, Integer userid) {
		Session session = sessionFactory.openSession(); // create session object from the session factory
		session.beginTransaction();
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todays_date = formatter.format(currentDate.getTime());
		OTDescription ot=new OTDescription();
		ot.setTreatmentOperationsManageID(tomId);
		ot.setDescription(descr);
		ot.setCreatedBy(userid);
		ot.setCreatedTime(todays_date);
		ot.setStatus("N");
		session.save(ot);
		session.getTransaction().commit(); //commit the transaction
		session.close();
		return "OT Description is Saved successfully.";
	}

	@Override
	public String saveOTDocument(MultipartFile[] uploadfiles,Integer userid, Integer patId, Integer tomId, String filePath, String note,
			Date date) {
//		Session session = sessionFactory.openSession(); // create session object from the session factory
//		session.beginTransaction();
//		UploadOTDocuments up= new UploadOTDocuments();
//		up.setPatientID(patId);
//		up.setTreatmentOperationsManageID(tomId);
//		up.setOTDocName(filePath);
//		up.setNotes(note);
//		up.setDate(date.toString());
//		up.setAssignedBy(userid.toString());
//		up.setStatus("N");
//		session.save(up);
//		session.getTransaction().commit(); //commit the transaction
//		session.close();
//		return "OT Document Saved successfully.";
		
		

		// TODO Auto-generated method stub
		//HttpSession session = request.getSession();
		//Integer userId = (Integer) session.getAttribute("userId1");
		//Integer unitId = (Integer) session.getAttribute("uId");
		try {

			Session session = sessionFactory.openSession(); // create session object from the session factory
			session.beginTransaction();
			UploadOTDocuments up= new UploadOTDocuments();
			up.setPatientID(patId);
			up.setTreatmentOperationsManageID(tomId);
			up.setOTDocName(filePath);
			up.setNotes(note);
			up.setDate(date.toString());
			up.setAssignedBy(userid.toString());
			up.setStatus("N");
			session.save(up);
			session.getTransaction().commit(); //commit the transaction
			session.close();
				String documentPath="";
				for (MultipartFile file : uploadfiles) {
					if (file.isEmpty()) {
						continue;
					}
				
					//documentPath = FilePath.getDoctorDeskUploadFilesPath() +""+ dto.getDocumentId();
					documentPath = FilePath.getDoctorDeskUploadFilesPath() ;
					Path path = Paths.get(documentPath);
					java.io.File uploadPath = new java.io.File(documentPath);	
					if (!uploadPath.exists()) {
						Files.createDirectories(path);
					}
					
					String fileName = file.getOriginalFilename();
					String filepath = Paths.get(uploadPath.toString(), fileName).toString();
					BufferedOutputStream stream;

					stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
					stream.write(file.getBytes());
					stream.close();
				}
				return "OT Document Saved successfully.";

			 
		} catch (Exception e) {
			
			e.printStackTrace();
			return "Something went wrong.";
		}
	



}

	@Override
	public String delOTDocument(Integer id, Integer patId, Integer userid) {
		UploadOTDocuments op = (UploadOTDocuments) sessionFactory
				.getCurrentSession().get(UploadOTDocuments.class, id);
		op.setStatus("Y");
		op.setDeletedBy(userid.toString());
		return "Deleted Successfully.";
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Assessment> fetchAssessment(Integer treatmentId) {
		
		List<Assessment> li=new ArrayList<>();
		Query bet = sessionFactory.getCurrentSession().createQuery
				("SELECT count(*) FROM PatientDaignosisMaster WHERE treatmentId= :treatmentId ");
		bet.setParameter("treatmentId", treatmentId);
		long count =(Long) bet.uniqueResult();
		if (count > 0) {
			Query q = sessionFactory.getCurrentSession().createQuery
					("SELECT max(id) FROM PatientDaignosisMaster WHERE status='Y' AND treatmentId= :treatmentId ");
			q.setParameter("treatmentId", treatmentId);
			long patientdaignosismasterId=(Long) bet.uniqueResult();
			int pdm=(int) patientdaignosismasterId;
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientDaignosisSlave.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("patient_daignosis_masterId", pdm));
			List<PatientDaignosisSlave> list = criteria.list();
			for (PatientDaignosisSlave ot : list) {
				int diagnosed_by=Integer.parseInt(ot.getDiagnosed_by());
				Users users = (Users) sessionFactory.getCurrentSession().get(Users.class, diagnosed_by);
				String userName = "";
				userName = users.getTitle()
						+ users.getF_name() + " "
						+ users.getM_name() + " "
						+ users.getL_name();
				Assessment obj=new Assessment();
				obj.setDiagno_slave_id(ot.getId());
				obj.setDiagnosis(ot.getDiagnosis());
				obj.setDiagno_description(ot.getDiagno_description());
				obj.setIcd10_code(ot.getIcd10_code());
				obj.setDate(ot.getDate());
				obj.setDiagno_type(ot.getDiagno_type());
				obj.setComment(ot.getComment());
				obj.setDiagnosed_by(userName);
				li.add(obj);
			}
		}
		return li;
	}

	@Override
	@SuppressWarnings("unchecked")
	public CustomizeTemplate fetchCustomizeTemplateList(Integer departmentid,String selectTemplateType) {
		CustomizeTemplate obj=new CustomizeTemplate();
		List<CustomizeTemplate> list=new ArrayList<>();
		try {
			Criteria c=   sessionFactory.getCurrentSession().createCriteria(CustomizeTemplate.class);
			// c.add(Restrictions.eq("departmentId", departmentid));
			c.add(Restrictions.or(
				    Restrictions.eq("departmentId", departmentid),
				    Restrictions.eq("departmentId", 4)
				));
			c.add(Restrictions.eq("selectTemplateType", selectTemplateType));
			list=c.list();
			obj.setCustomizeTemplateList(list);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<HraTypeMaster> fetchhraList(String byName, String type) {
		List<HraTypeMaster> mainlist=new ArrayList<>();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HraTypeMasterDto.class);
		if (type.equals("onload")) {
			criteria.add(Restrictions.eq("hra_type_master_delete_flag", "Y"));
		} else if (type.equals("search")) {
			criteria.add(Restrictions.eq("hra_type_master_delete_flag", "Y"));
			criteria.add(Restrictions.like("hra_type_name", "%"+byName+"%"));
		}
		List<HraTypeMasterDto> list = criteria.list();
		for (HraTypeMasterDto d : list) {
			HraTypeMaster obj=new HraTypeMaster();
			obj.setIdhra(d.getIdhra());
			obj.setHraType(d.getHraType());
			mainlist.add(obj);
		}
		return mainlist;
	}

	@Override
	public String saveAssessmentOpd(Assessment objAssessment) {
		String msg="";
		Query bet = sessionFactory.getCurrentSession().createQuery
				("SELECT count(*) FROM PatientDaignosisMaster WHERE treatmentId= :treatmentId ");
		bet.setParameter("treatmentId", objAssessment.getTreatmentId());
		long count =(Long) bet.uniqueResult();
		int daignosisMasterID = 0;
		if (count == 0) {
			PatientDaignosisMaster pm=new PatientDaignosisMaster();
			pm.setTreatmentId(objAssessment.getTreatmentId());
			pm.setStatus("Y");
			daignosisMasterID =(int) sessionFactory.getCurrentSession().save(pm);
		}else {
			Query q = sessionFactory.getCurrentSession().createQuery
					("SELECT id FROM PatientDaignosisMaster WHERE status='Y' AND treatmentId= :treatmentId ");
			q.setParameter("treatmentId", objAssessment.getTreatmentId());
			//daignosisMasterID=(int) bet.uniqueResult();
			int patientdaignosismasterId=(int) q.uniqueResult();
			daignosisMasterID=patientdaignosismasterId;
		}
		
		if (objAssessment.getDiagno_slave_id() == 0) {
			PatientDaignosisSlave slave=new PatientDaignosisSlave();
			slave.setPatient_daignosis_masterId(daignosisMasterID);
			slave.setDiagnosis(objAssessment.getDiagnosis());
			slave.setDiagno_description(objAssessment.getDiagno_description());
			slave.setIcd10_code(objAssessment.getIcd10_code());
			slave.setDate(objAssessment.getDate());
			slave.setDiagno_type(objAssessment.getDiagno_type());
			slave.setComment(objAssessment.getComment());
			slave.setStatus("Y");
			slave.setDiagnosed_by(objAssessment.getDiagnosed_by() );
			sessionFactory.getCurrentSession().save(slave);
			msg="Saved successfully. ";
		}else {
			PatientDaignosisSlave slave = (PatientDaignosisSlave) 
					sessionFactory.getCurrentSession().get(PatientDaignosisSlave.class, objAssessment.getDiagno_slave_id() );
			slave.setDiagnosis(objAssessment.getDiagnosis());
			slave.setDiagno_description(objAssessment.getDiagno_description());
			slave.setIcd10_code(objAssessment.getIcd10_code());
			slave.setDate(objAssessment.getDate());
			slave.setDiagno_type(objAssessment.getDiagno_type());
			slave.setComment(objAssessment.getComment());
			slave.setStatus("Y");
			slave.setDiagnosed_by(objAssessment.getDiagnosed_by() );
			msg="Updated successfully. ";
		}
		
		return msg;
	}

	@Override
	public String deleteAssessment(Integer diagnoslaveid) {
		PatientDaignosisSlave slave = (PatientDaignosisSlave) 
				sessionFactory.getCurrentSession().get(PatientDaignosisSlave.class, diagnoslaveid);
		slave.setStatus("N");
		return "Deleted Sucessfully. ";
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<String> fetchUserList(String letter) {
		List<String> listName = new ArrayList<String>();
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Users.class);
		criteria.add(Restrictions.eq("status", "Y"));
		if (letter != null && !letter.isEmpty()) {
			criteria.add(Restrictions.like("f_name", "%" + letter + "%"));
			criteria.add(Restrictions.like("m_name", "%" + letter + "%"));
			criteria.add(Restrictions.like("l_name", "%" + letter + "%"));
		}
		List<Users> list = criteria.list();

		for (Users rs : list) {
			String testName = "";
			if (null != rs.getF_name()) {
				testName = rs.getF_name() + " " + rs.getM_name() + " " + rs.getL_name() + "_" + rs.getUser_ID();
			} else {
				testName = rs.getF_name() + "_" + rs.getUser_ID();
			}
			listName.add(testName);
		}
		return listName;
	}

	@Override
	public String saveOTNotesData(EhatOTOperationNotes obj) {
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss aa");
		String todays_date = formatter.format(currentDate.getTime());
		String msg="";
		if(obj.getIdEhatOTOperationNotes() !=null && obj.getIdEhatOTOperationNotes() >0) {
			EhatOTOperationNotes upobj = (EhatOTOperationNotes) 
					sessionFactory.getCurrentSession().get(EhatOTOperationNotes.class, obj.getIdEhatOTOperationNotes());
			upobj.setTreatmentOperationsManageID(obj.getTreatmentOperationsManageID());
			upobj.setEstimatedBLoodLoss(obj.getEstimatedBLoodLoss());
			upobj.setActualBloodLoss(obj.getActualBloodLoss());
			upobj.setInstrumentCount(obj.getInstrumentCount());
			upobj.setRecordedBy(obj.getRecordedBy());
			upobj.setMopCountRecordedBy(obj.getMopCountRecordedBy());
			upobj.setComment(obj.getComment());
			upobj.setTemplateID(obj.getTemplateID());
			upobj.setChkEditerdata(obj.getChkEditerdata());
			upobj.setImplantDetails(obj.getImplantDetails());
			upobj.setUpdatedTime(todays_date);
			msg="OT Notes is Updated successfully.";
		}else {
			obj.setUpdatedTime(todays_date);
			sessionFactory.getCurrentSession().save(obj);
			msg="OT Notes is Saved successfully.";
		}
		
		return msg;
	}

	@Override
	public List<EhatOTOperationNotes> fetchOTNotesData(int tomId){
		
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(EhatOTOperationNotes.class);
			criteria.add(Restrictions.eq("treatmentOperationsManageID", tomId));
			criteria.add(Restrictions.eq("status", "N"));
			
			@SuppressWarnings("unchecked")
			List<EhatOTOperationNotes> mainlist = criteria.list();
			return mainlist;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public String deleteOperation(Integer opId, Integer treatId) {

		Integer billcount = 0;
		Integer treatmentId = 0;
		Integer toid = 0;
		Integer otcount = 0;
		Query storedPro6 = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_ipd_bill_count(:id)");
		storedPro6.setParameter("id", opId);
		storedPro6.setResultTransformer(new AliasToBeanResultTransformer(FetchOtCount.class));
		List<FetchOtCount> countList = storedPro6.list();
		for (FetchOtCount rs : countList) {
			treatmentId = rs.getTreatment_ID();
			toid = rs.getToid();
		}
		String hql="select count(ei.billDetailsId) as count from BillDetailsIpdDto ei, "
				+ "TreatmentOperationsManage tm , TreatmentOperations to1  where  ei.treatmentId =to1.treatmentDto.treatmentId"
				+ "  and  ei.paidFlag='Y' and  ei.ot_flag='Y' and to1.id=tm.iD and  tm.treatmentOperationsManageID= :treatmentOperationsManageID";
		Query ff = sessionFactory.getCurrentSession().createQuery(hql);
		ff.setParameter("treatmentOperationsManageID", opId);
		Long ccount =  (Long) ff.uniqueResult();
		billcount =ccount.intValue();
		
		if (billcount == 0) {
			Query bet = sessionFactory.getCurrentSession().createQuery("SELECT count(*) FROM BillDetailsIpdDto WHERE treatmentId= :treatmentId AND ot_flag= :ot_flag AND countot= :countot");
			bet.setParameter("treatmentId", treatmentId);
			bet.setParameter("ot_flag", "Y");
			bet.setParameter("countot", toid);
			Long billCount = (Long) bet.uniqueResult();
			otcount = billCount.intValue();

			Query bet1 = sessionFactory.getCurrentSession().createQuery("SELECT count(*) FROM TreatmentOperationsManage WHERE iD= :iD ");
			bet1.setParameter("iD", opId);
			long count = (Long) bet1.uniqueResult();

			Query bet2 = sessionFactory.getCurrentSession().createQuery("SELECT treatmentOperationsManageID FROM TreatmentOperationsManage WHERE operationStatus='Y' AND status='Y' AND iD= :iD ");
			bet2.setParameter("iD", opId);
			int treatmentOperationsManageID = (int) bet2.uniqueResult();

			if (count != 0) {
				TreatmentOperations upobj = (TreatmentOperations) sessionFactory.getCurrentSession().get(TreatmentOperations.class, opId);
				upobj.setOpStatus("N");

				TreatmentOperationsManage upobj1 = (TreatmentOperationsManage) sessionFactory.getCurrentSession().get(TreatmentOperationsManage.class, treatmentOperationsManageID);
				upobj1.setFlag("N");
				upobj1.setOpStatus("N");
				upobj1.setOperationStatus("N");

				//String sql="Update PtientOperation set status='N' where treatmentOperationsManage.treatmentOperationsManageID="+treatmentOperationsManageID+" ";
				//Query q=  sessionFactory.getCurrentSession().createQuery(sql);
				//int res = q.executeUpdate();

				Criteria c = (Criteria) sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
				c.add(Restrictions.eq("treatmentOperationsManage",treatmentOperationsManageID));
				PtientOperation obj = (PtientOperation) c.uniqueResult();
				obj.setStatus("N");
				sessionFactory.getCurrentSession().merge(obj);

				Query sp = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_na(:id)");
				sp.setParameter("id", opId);
				sp.executeUpdate();

				Query sp1 = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_ipdbill_operation_slave(:id)");
				sp1.setParameter("id", treatmentOperationsManageID);
				sp1.executeUpdate();

				Query sp2 = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_ipdbill_operationtheater_charges(:id)");
				sp2.setParameter("id", opId);
				sp2.executeUpdate();

				Query sp3 = sessionFactory.getCurrentSession().createSQLQuery("call sp_update_ipdbill_operationservice_slave(:id)");
				sp3.setParameter("id", treatmentOperationsManageID);
				sp3.executeUpdate();
				if (otcount > 0) {
					Criteria cciteria = (Criteria) sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class);
					cciteria.add(Restrictions.eq("treatmentId", treatmentId));
					cciteria.add(Restrictions.eq("ot_flag", "Y"));
					cciteria.add(Restrictions.eq("countot", toid));
					BillDetailsIpdDto ipdobj = (BillDetailsIpdDto) cciteria.uniqueResult();
					ipdobj.setDeleted("Y");
					sessionFactory.getCurrentSession().merge(obj);
				}

			} else {
				TreatmentOperations upobj = (TreatmentOperations) sessionFactory.getCurrentSession().get(TreatmentOperations.class, opId);
				upobj.setOpStatus("N");

				TreatmentOperationsManage upobj1 = (TreatmentOperationsManage) sessionFactory.getCurrentSession().get(TreatmentOperationsManage.class, treatmentOperationsManageID);
				upobj1.setFlag("N");
				upobj1.setOperationStatus("N");

				Criteria c = (Criteria) sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
				c.add(Restrictions.eq("treatmentOperationsManage",treatmentOperationsManageID));
				PtientOperation obj = (PtientOperation) c.uniqueResult();
				obj.setStatus("N");
				sessionFactory.getCurrentSession().merge(obj);
			}
		}
		return "Operation Deleted Successfully.";
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<OperationChargehallwiseAdmin> featchGrpCatWiseProCharge(OperationChargehallwise operationchargehallwise) {
		List<OperationChargehallwiseAdmin> list = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(OperationChargehallwiseAdmin.class);
			criteria.add(Restrictions.eq("operationCatId", operationchargehallwise.getOperationCatId()));
			criteria.add(Restrictions.eq("operation_id", operationchargehallwise.getOperation_id()));
			criteria.add(Restrictions.eq("sponser_id", operationchargehallwise.getSponser_id()));
			list = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<ChargesMasterSlave> fetchHallTypeProchargeOpration() {
		
		List<ChargesMasterSlave> ltChargesSlave = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ChargesMasterSlave.class);
			criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
			criteria.add(Restrictions.eq("isCategory", "Y"));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("chargesMasterDto", 2));
			ltChargesSlave = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltChargesSlave;
	}

	@Override
	public Integer saveGroupCatWiseproCharges(String opcharge) {
		try {
			Session session = sessionFactory.getCurrentSession();
			OperationChargehallwiseAdmin chaslave = (OperationChargehallwiseAdmin) ConfigUIJSONUtility.getObjectFromJSON(opcharge, OperationChargehallwiseAdmin.class);
			
			for (int i = 0; i < chaslave.getOperationchargehall().size(); i++) {
				
				OperationChargehallwiseAdmin admincharges = new OperationChargehallwiseAdmin();
				admincharges = chaslave.getOperationchargehall().get(i);

				Criteria c = sessionFactory.getCurrentSession().createCriteria(OperationChargehallwiseAdmin.class);
				c.add(Restrictions.eq("halltypeid", admincharges.getHalltypeid()));
				c.add(Restrictions.eq("operationCatId", admincharges.getOperationCatId()));
				c.add(Restrictions.eq("sponser_id", admincharges.getSponser_id()));
				c.add(Restrictions.eq("operation_id", admincharges.getOperation_id()));
				c.setProjection(Projections.rowCount());
				Long count = (Long) c.uniqueResult();
				if (count == 0){
					//session.merge(admincharges);
					session.saveOrUpdate(admincharges);
				}else {
					String hql = "update operationchargehallwise o set o.surgeoncharge="
							+ admincharges.getSurgeoncharge() + " where o.halltypeid=" + admincharges.getHalltypeid()
							+ " and o.operationCatId=" + admincharges.getOperationCatId() + " and" + " o.sponser_id="
							+ admincharges.getSponser_id() + " and o.operation_id=" + admincharges.getOperation_id() + "";
					SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(hql);
					query.executeUpdate();
				}
			}
			return 1;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<RegTreBillDto> fetchPateintNameAutosugg(String patientName, String typeOfpatient) {
			List<RegTreBillDto> ltPatientRecord = null;
		try {
			
				Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(RegTreBillDto.class);
				criteria.add(Restrictions.eq("tFlag", "Y"));
				criteria.add(Restrictions.like("patientName", "%" + typeOfpatient + "%"));		
				ltPatientRecord = criteria.list();
				return ltPatientRecord;
				
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return null;
		}
		
	}
	
	@Override
	public String removePreOpPrep(PreOpPrep objPreOpPrep) {
		PreOpPrep slave = (PreOpPrep) sessionFactory.getCurrentSession().get(PreOpPrep.class, objPreOpPrep.getIdpre_op_prep_details());
		slave.setStatus("Y");
		return "Deleted Sucessfully. ";
	}

	@Override
	public String scheduleMangeOperation(TreatmentOperations obj) {
		String msg="";
		String surgeonName = "";
		String assistantSurgeonName = "";
		String anestheticDoctor = "";
		String surgery = "";
		//String patientName = "";
		//String mobileNo = "";
	//	Integer treatmentoperationid=0;
		Session session = sessionFactory.getCurrentSession();
		
		RegistrationDto patient = (RegistrationDto) sessionFactory
				.getCurrentSession().get(RegistrationDto.class, obj.getPatientId());
		//mobileNo =patient.getMobile();
		//patientName = patient.getfName()+" "+patient.getmName()+" "+patient.getlName();
		
		Query storedPro3 = sessionFactory.getCurrentSession()
				.createSQLQuery("call sp_fetch_treatment_id(:patientid)");
		storedPro3.setParameter("patientid", obj.getPatientId());
		int treatmentId=(int) storedPro3.uniqueResult();
		
		TreatmentDto treatment= (TreatmentDto) sessionFactory
				.getCurrentSession().get(TreatmentDto.class, treatmentId);
		String allDocName = "";
		for (OperationDocTbl li : obj.getListOperationDoc()) {
			Users users = (Users) sessionFactory.getCurrentSession().get(Users.class, li.getDocId());
			String docName = "";
			docName = users.getTitle()
					+ users.getF_name() + " "
					+ users.getM_name() + " "
					+ users.getL_name();
			allDocName = allDocName + "," + docName;
		}
		
			TreatmentOperations op = (TreatmentOperations) sessionFactory.getCurrentSession().get(TreatmentOperations.class, obj.getId());
			int topId=op.getId();
			op.setStatus("Y");
			op.setOpStatus("Y");
			op.setScheduleFlag("OT");
			op.setStart_Time(obj.getStartTime());
			op.setEnd_Time(obj.getEndTime());
			op.setDate(obj.getDate());
			op.setOtid(obj.getOtid());
			op.setEmergencyFlag(obj.getEmergencyFlag());
			op.setRegistrationDto(patient);
			op.setTreatmentDto(treatment);
			op.setStartTime(obj.getStartTime());
			op.setEndTime(obj.getEndTime());
			op.setCriticalFlag(obj.getCriticalFlag());
			op.setInfectionFlag(obj.getInfectionFlag());
			
			TreatmentOperationsManage tom = (TreatmentOperationsManage) sessionFactory.getCurrentSession().get(TreatmentOperationsManage.class, obj.getTreatmentOperationsManageID());
			
			tom.setiD(obj.getId());
			tom.setDoc_names(allDocName);
			tom.setOperation_ID(obj.getOperation_ID());
			tom.setDepartment(obj.getDepartment());
			tom.setScheduledProcedure(obj.getScheduledProcedure());
			tom.setRemark(obj.getRemark());
			tom.setPrecaution(obj.getPrecaution());
			tom.setSurgeryDescription(obj.getSurgeryDescription());
			tom.setIndicationForSurgery(obj.getIndicationForSurgery());
			tom.setTeamId(obj.getTeamId());
			tom.setAnesthesiaType(obj.getAnesthesiaType());		
			tom.setOpcat(obj.getOpcat());
			tom.setStatus("Y");
			tom.setOpStatus("Y");
			tom.setOperationStatus("Y");
			tom.setUnitId(obj.getUnitId());
			tom.setOhr(obj.getOhr());   // added Rohini
			tom.setChr(obj.getChr());
			tom.setObp(obj.getObp());
			tom.setCbp(obj.getCbp());
			tom.setOperationCharge(obj.getOperationCharge());
			tom.setEmailOfReference(obj.getEmailOfReference());
			tom.setContactOfReference(obj.getContactOfReference());
			tom.setOtherReference(obj.getOtherReference());
			
			
					
			String sqlBill="select idpatient_operation FROM patient_operation where treatmentOperationsManageID='"+ obj.getTreatmentOperationsManageID() +"' limit 1";
			Query deptQuery = session.createSQLQuery(sqlBill);		
			Integer patOpId = (Integer) deptQuery.uniqueResult();
			
		/*	if(patOpId > 0) { // commited by Rohini
				
				PtientOperation pod = (PtientOperation) session.get(PtientOperation.class, patOpId);
				session.delete(pod);
			}*/
			
			String str = obj.getScheduledProcedure();
			//String str1[] = str.split("#");
			String str1[] = str.split(",");
			
			// added by Rohini
			String procedurSql = " select operation_ID  from patient_operation where treatmentOperationsManageID ="+obj.getTreatmentOperationsManageID();
			Query q = sessionFactory.getCurrentSession().createSQLQuery(procedurSql);
		    List<Integer>  pids =	q.list();     
			
			//for (int i = 1; i < str1.length; i++) {
		    for (int i = 0; i < str1.length; i++) {
				//String str2[] = str1[i].split("@");
				//surgery = surgery +","+ str2[1];
		    	 String num=str1[i];
				int operationId=Integer.parseInt(num);
				
			    //if(pids.contains(Integer.parseInt(str2[0]))){  
				if(pids.contains(operationId)){
				      // System.out.println(".........duplicate procedure Name......"+Integer.parseInt(str2[0]));
			    }else{
			    
				PtientOperation po=new PtientOperation();

				
					po.setTreatmentOperationsManage(obj.getTreatmentOperationsManageID());
					//po.setOperation_ID(Integer.parseInt(str2[0]));
					//po.setOperationName(str2[1]);
					po.setOperation_ID(operationId);
					 
					String sqlOpname=" select  OName from operation where Operation_id="+operationId+" ";
					
				   SQLQuery	qOPeration= sessionFactory.getCurrentSession().createSQLQuery(sqlOpname);
				 String operationName= (String) qOPeration.uniqueResult();
					
					po.setOperationName(operationName);
					po.setStatus("Y");
					po.setUnitId(obj.getUnitId());
					session.save(po);
				//}
			    }
			}
			
			OperationDocTbl docd=new OperationDocTbl();
			docd.setIdtreatmentOperationManage(obj.getTreatmentOperationsManageID());
			session.delete(docd);
			
			// added by Rohini Ambhore
			String sql = "select doc_id from operation_doc_tbl where treatmentOperationsManageID ="+obj.getTreatmentOperationsManageID();
			Query docids = sessionFactory.getCurrentSession().createSQLQuery(sql);
                   // .setParameter("TreatmentOperationsManageID", billDetailsIpdDto.getBillId())
                   // .setParameter("serviceId", 2);
            List<Integer> rows = docids.list();
			
			for (int i = 0; i < obj.getListOperationDoc().size(); i++) {
				
		     if (rows.contains(obj.getListOperationDoc().get(i).getDocId())) {   // added by Rohini Ambhore
		             //  System.out.println("............duplicate doc "+obj.getListOperationDoc().get(i).getDocId() );
		      }else{
				OperationDocTbl doc=new OperationDocTbl();
				doc.setIdtreatmentOperationManage(obj.getTreatmentOperationsManageID());
				doc.setDocId(obj.getListOperationDoc().get(i).getDocId());
				doc.setDocType(obj.getListOperationDoc().get(i).getDocType());
				doc.setDocName(obj.getListOperationDoc().get(i).getDocName());
				doc.setSurgeonType(obj.getListOperationDoc().get(i).getSurgeonType());
				doc.setStatus("Y");
				if((obj.getListOperationDoc().get(i).getSurgeonType().equals("surgeon"))){
					surgeonName = surgeonName +","+obj.getListOperationDoc().get(i).getDocName();
				}
				else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("asssurgeon"))){
					assistantSurgeonName = assistantSurgeonName +","+obj.getListOperationDoc().get(i).getDocName();
				}
				else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("anesthetist"))){
					anestheticDoctor = anestheticDoctor +","+obj.getListOperationDoc().get(i).getDocName();
				}
				doc.setUnitId(obj.getUnitId());
				session.save(doc);
			 }///
			}
			
			
			
			msg = "OT updated successfully...";
			if(obj.getOperationCharge() > 0) {
			// added for update automatic charges in billing
			//int categoryId=Integer.parseInt(obj.getOpcat());
			ResourceBundle resourceEhat = ResourceBundle.getBundle("OT_Service");
            String MainSurgan = resourceEhat.getObject("MainSurgan").toString();
            String AsistanSurgan = resourceEhat.getObject("AsistanSurgan").toString();
           String OTTheator = resourceEhat.getObject("OTTheator").toString();
            String AnethesiaNormal = resourceEhat.getObject("AnethesiaNormal").toString();
            String AnethesiaStandBy = resourceEhat.getObject("AnethesiaStandBy").toString();
            String AnethesiaASAIV = resourceEhat.getObject("AnethesiaASAIV").toString();
            List<Integer> lstIds=new ArrayList<>();
            
               String sqlBill1=" select bill_id from ehat_bill_master  where treatment_id="+treatmentId+" order by bill_id desc limit 1 ";
             SQLQuery q1= sessionFactory.getCurrentSession().createSQLQuery(sqlBill1);
                 int billId=((Number) q1.uniqueResult()).intValue();
                 
                 String sqlSponsor=" select charges_master_slave_id from ehat_bill_master  where treatment_id="+treatmentId+" order by bill_id desc limit 1 ";
                 SQLQuery qSponsor= sessionFactory.getCurrentSession().createSQLQuery(sqlSponsor);
                     int sponsorId=((Number) qSponsor.uniqueResult()).intValue();
            
                 String sqldoctorIds= "select  group_concat( doctor_id) from ehat_bill_details_ipd where treatment_id="+treatmentId+" and service_id=4";
                 Query doctorIds = sessionFactory.getCurrentSession().createSQLQuery(sqldoctorIds);
                 // .setParameter("TreatmentOperationsManageID", billDetailsIpdDto.getBillId())
                 // .setParameter("serviceId", 2);
             List<Integer> rowsDoctorIds = doctorIds.list();
                     
             try {
            	 for (int i = 0; i < obj.getListOperationDoc().size(); i++) {
            		 
            		 System.out.println("type===="+(obj.getListOperationDoc().get(i).getSurgeonType()));
     				
        		    // if (rows.contains(obj.getListOperationDoc().get(i).getDocId())) {   // added by Rohini Ambhore
        		             //  System.out.println("............duplicate doc "+obj.getListOperationDoc().get(i).getDocId() );
        		     // }else{
            		 System.out.println("type===="+(obj.getListOperationDoc().get(i).getDocId()));
            		   if(rowsDoctorIds.contains(obj.getListOperationDoc().get(i).getDocId())) {
            			   
		               }else {
		            		   
		        		    	  double perAmt=0.0;
		        				
		        				BillDetailsIpdDto bObj=new BillDetailsIpdDto();
		        				bObj.setPatienttId(obj.getPatientId());
		        				bObj.setTreatmentId(treatmentId);
		        				bObj.setDepartmentId(treatment.getDepartmentId());
		        				bObj.setChargesSlaveId(treatment.getSponsorId());
		        				bObj.setServiceId(4);
		        				bObj.setBillId(billId);
		        				bObj.setDoctorId(obj.getListOperationDoc().get(i).getDocId());
		        				bObj.setOtprocedure(obj.getScheduledProcedure());
		        				bObj.setOt_flag("Y");
		        				bObj.setCountot(op.getId());// treatment operation id 
		        				if((obj.getListOperationDoc().get(i).getSurgeonType().startsWith(("surgeon")))){
		        					//surgeonName = surgeonName +","+obj.getListOperationDoc().get(i).getDocName();
		        					 perAmt=fetchOperationCount( treatmentId, Integer.parseInt(MainSurgan), topId, obj.getPatientId());
		        					 bObj.setSubServiceId(Integer.parseInt(MainSurgan));
		        					 lstIds.add(Integer.parseInt(MainSurgan));
		        					 
		        					 if(sponsorId == 0) {
		        					 bObj.setAmount(perAmt);
		        					 bObj.setCoPay(perAmt);
		        					 bObj.setQuantity(1);
		        					 bObj.setRate(perAmt);
		        					 }else if(sponsorId > 0) {
		        					//	 bObj.setOtherConcession(perAmt);
		        						 bObj.setOtherAmount(perAmt);
		        						 bObj.setOtherPay(perAmt);
		        						 bObj.setOtherRate(perAmt);
		        					 }
		        					 
		        					 sessionFactory.getCurrentSession().merge(bObj);
		        				}
		        				else if((obj.getListOperationDoc().get(i).getSurgeonType().startsWith("assSurgeon"))){
		        					//assistantSurgeonName = assistantSurgeonName +","+obj.getListOperationDoc().get(i).getDocName();
		        					 bObj.setSubServiceId(Integer.parseInt(AsistanSurgan));
		        					 perAmt=fetchOperationCount( treatmentId, Integer.parseInt(AsistanSurgan), topId, obj.getPatientId());
		        					 if(sponsorId == 0) {
		            					 bObj.setAmount(perAmt);
		            					 bObj.setCoPay(perAmt);
		            					 bObj.setQuantity(1);
		            					 bObj.setRate(perAmt);
		            					 }else if(sponsorId > 0) {
		            					//	 bObj.setOtherConcession(perAmt);
		            						 bObj.setOtherAmount(perAmt);
		            						 bObj.setOtherPay(perAmt);
		            						 bObj.setOtherRate(perAmt);
		            					 }
		        					 lstIds.add(Integer.parseInt(AsistanSurgan));
		        					 
		        					 sessionFactory.getCurrentSession().merge(bObj);
		        				}
		        				else if((obj.getListOperationDoc().get(i).getSurgeonType().contains("anesthetist")) || (obj.getListOperationDoc().get(i).getSurgeonType().startsWith("anaesthesiologist"))){
		        					//anestheticDoctor = anestheticDoctor +","+obj.getListOperationDoc().get(i).getDocName();
		        					 bObj.setSubServiceId(Integer.parseInt(AnethesiaNormal));
		        					 perAmt=fetchOperationCount( treatmentId, Integer.parseInt(AnethesiaNormal), topId, obj.getPatientId());
		        					 if(sponsorId == 0) {
		            					 bObj.setAmount(perAmt);
		            					 bObj.setCoPay(perAmt);
		            					 bObj.setQuantity(1);
		            					 bObj.setRate(perAmt);
		            					 }else if(sponsorId > 0) {
		            						// bObj.setOtherConcession(perAmt);
		            						 bObj.setOtherAmount(perAmt);
		            						 bObj.setOtherPay(perAmt);
		            						 bObj.setOtherRate(perAmt);
		            					 }
		        					 lstIds.add(Integer.parseInt(AnethesiaNormal));
		        					 
		        					 sessionFactory.getCurrentSession().merge(bObj);
		        				}
		        				 
		        				
		            		   }
        			 //}
        			}
            	 
            	 //added for those services not configured with team
            	 List<OTPercentageDTO> listOtPer = fetchOTPercentage();
            	 List<Integer> lstAllOtPer=new ArrayList<>();// add all surgen charges services 
            	  for(OTPercentageDTO pobj: listOtPer) {
            		  lstAllOtPer.add(pobj.getChildSubServiceId());
            	  }
            	  
            	  for(int pserviceId :lstAllOtPer) {
            		    if(lstIds.contains(pserviceId)) {
            		    	continue;
            		    }else {
            		    	 double perAmt=0.0;
             				
             				BillDetailsIpdDto bObj=new BillDetailsIpdDto();
             				bObj.setPatienttId(obj.getPatientId());
             				bObj.setTreatmentId(treatmentId);
             				bObj.setDepartmentId(treatment.getDepartmentId());
             				bObj.setChargesSlaveId(treatment.getSponsorId());
             				bObj.setServiceId(4);
             				bObj.setBillId(billId);
             				bObj.setDoctorId(0);
             				bObj.setOtprocedure(obj.getScheduledProcedure());
             				 perAmt=fetchOperationCount( treatmentId, pserviceId, topId, obj.getPatientId());
             				 if(sponsorId == 0) {
            					 bObj.setAmount(perAmt);
            					 bObj.setCoPay(perAmt);
            					 bObj.setQuantity(1);
            					 bObj.setRate(perAmt);
            					 }else if(sponsorId > 0) {
            						// bObj.setOtherConcession(perAmt);
            						 bObj.setOtherAmount(perAmt);
            						 bObj.setOtherPay(perAmt);
            						 bObj.setOtherRate(perAmt);
            					 }
        					 bObj.setSubServiceId(pserviceId);
        					 bObj.setOt_flag("Y");
             				bObj.setCountot(op.getId());// treatment operation id 
             				bObj.setQuantity(1);
       					 bObj.setRate(perAmt);
        					 sessionFactory.getCurrentSession().merge(bObj);
            		    }
            	  }
				      
			}catch (Exception e) {
				
			}
             msg = "OT Save successfully...";
             // end for automatic charges
			}
		
		return msg;
	}
	
	@SuppressWarnings("unused")
	@Override
	@Transactional
	public String savePreAnaestheticDetails(PreAnaesthetic anaestheticRequest) {
		String bloodGrp = anaestheticRequest.getBlood();
		String sql="";
		String msg="";
		String sql1 = "";
		if(!bloodGrp.equals("")){
			sql = "update ehat_patient set blood_group_id='"+Integer.parseInt(bloodGrp) +"' where Patient_ID ="+anaestheticRequest.getPatID()+"";
			Session session = sessionFactory.getCurrentSession();
			SQLQuery updateSQLQuery = session.createSQLQuery(sql);
			int executeUpdate = updateSQLQuery.executeUpdate();
		}
		
		//int count =0;
		sql1 = "select count(*) from pre_anaesthetic where Treatment_ID= "+ anaestheticRequest.getTretID();
		Session session = sessionFactory.getCurrentSession();
		SQLQuery updateSQLQuery = session.createSQLQuery(sql);
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PreAnaesthetic.class);
		criteria.add(Restrictions.eq("tretID", anaestheticRequest.getTretID()));
		PreAnaesthetic preAnaestheticDTO = (PreAnaesthetic) criteria.uniqueResult();
		//count = criteria.list().size();
	
		if (preAnaestheticDTO == null) {

			sql = "INSERT INTO pre_anaesthetic (cough_qty,cough_time,dyspnoea_qty,dyspnoea_time,giddiness_qty,giddiness_time,chestpain_qty,chestpain_time,present_medication_other,prevanaes_exp, pulse, BP, Resp, Pallor, Icterus, Cyanosis , Club,Oedema,Vein,Obesity,Neck,Jaw,Teeth,Spine,BHT,CVS,RS,CNS,Hb,TC,P,L,E,M,Bone,Smear,platelets,ESR,urine,BUN,HIV,BSL,F,PP,NaElectolytes,KElectrolytes,ClElectrolytes,Btwo,CT,PT,Screat,ECG,Other,risk_assess,proposed_plan,pre_operativeinstuct,pre_medication,Date,otherpresentmed,proposed_surgery,Treatment_ID,chk_anaesthetic,radio_anaesthetic,xray,bloodgroup) VALUES (?,?,?,?, ?, ?, ?, ?,?,?,?,?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

			try {
			Session session1 = sessionFactory.getCurrentSession();
			anaestheticRequest.setStatus("Y");
			int id = (Integer)session1.save(anaestheticRequest);
			if(id>0) {
				msg = "Pre Anaesthetic Assessment Report is registered...";
			}
			} catch (Exception e) {
				System.out.println("database error...could not insert: "
						+ e.getMessage());

			}
		} else {
			
			//BeanUtils.copyProperties(anaestheticRequest, preAnaestheticDTO);
		//	sql = "UPDATE pre_anaesthetic SET cough_qty=?,cough_time=?,dyspnoea_qty=?,dyspnoea_time=?,giddiness_qty=?,giddiness_time=?,chestpain_qty=?,chestpain_time=?,present_medication_other=?,prevanaes_exp=?, pulse=?, BP=?, Resp=?, Pallor=?, Icterus=?, Cyanosis=?,Club=?,Oedema=?,Vein=?,Obesity=?,Neck=?,Jaw=?,Teeth=?,Spine=?,BHT=?,CVS=?,RS=?,CNS=?,Hb=?,TC=?,P=?,L=?,E=?,M=?,Bone=?,Smear=?,platelets=?,ESR=?,urine=?,BUN=?,HIV=?,BSL=?,F=?,PP=?,NaElectolytes=?,KElectrolytes=?,ClElectrolytes=?,Btwo=?,CT=?,PT=?,Screat=?,ECG=?,Other=?,risk_assess=?,proposed_plan=?,pre_operativeinstuct=?,pre_medication=?,Date=?,otherpresentmed=?,proposed_surgery=?,chk_anaesthetic=?,radio_anaesthetic=?,xray=?,bloodgroup=?  WHERE Treatment_ID=?";
			
//			Session currentSession = sessionFactory.getCurrentSession();
//			Criteria c = sessionFactory.getCurrentSession().createCriteria(PreAnaesthetic.class);
//			c.add(Restrictions.eq("tretID", anaestheticRequest.getTretID()));
//			c.setProjection(Projections.rowCount());
//			Long count1 = (Long) c.uniqueResult();
			
			try {
//			if (count1 == 1){
				anaestheticRequest.setPreanaesthetic_ID(preAnaestheticDTO.getPreanaesthetic_ID());
				anaestheticRequest.setStatus("Y");
				session.merge(anaestheticRequest);
				msg = "Pre Anaesthetic Assessment Report is Updated...";
//			}
						
			}
				catch (Exception e) {
				System.out.println("database error...could not insert: "
						+ e.getMessage());
			}
		}
		return msg;
	}
	
	@Override
	@Transactional
	public List<PreAnaesthetic> fetchPreAnaestheticReport(String tretID,
			String anaesID) {

		List<PreAnaesthetic> arrPreAnaesthetic = new ArrayList<PreAnaesthetic>();
		String sql="";
		Session currentSession = sessionFactory.getCurrentSession();
		
	//old 	
	/*	sql = "SELECT pre.*,t.treatmentCount,t.Treatment_ID FROM pre_anaesthetic pre,treatment t where pre.status='Y' and pre.Treatment_ID=t.Treatment_ID and pre.Treatment_ID="
				+ tretID;*/
		sql = "SELECT pre.*,t.trcount,t.treatment_id FROM pre_anaesthetic pre,ehat_treatment t where pre.status='Y' and pre.Treatment_ID=t.treatment_id and pre.Treatment_ID="
				+ tretID;
		
		SQLQuery createSQLQuery = currentSession.createSQLQuery(sql);
		createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> preAnaestheticDetails = createSQLQuery.list();
		System.err.println("sql.........."+sql);
		Date dateNow = null;
//		List<Map<String, Object>> preAnaestheticDetails = getJdbcTemplate()
//				.queryForList(sql);

		for (Map<?, ?> rs : preAnaestheticDetails) {
			PreAnaesthetic objPreAnaesthetic = new PreAnaesthetic();
			objPreAnaesthetic.setCoughQty((Integer) rs.get("cough_qty"));
			objPreAnaesthetic.setCoughTime((String) rs.get("cough_time"));
			objPreAnaesthetic.setDyspnoeaQty((Integer) rs.get("dyspnoea_qty"));
			objPreAnaesthetic.setDyspnoeaTime((String) rs.get("dyspnoea_time"));
			objPreAnaesthetic.setGiddinessQty((Integer) rs.get("giddiness_qty"));
			objPreAnaesthetic.setGiddinessTime((String) rs.get("giddiness_time"));
			objPreAnaesthetic.setChestPainQty((Integer) rs.get("chestpain_qty"));
			objPreAnaesthetic.setChestPainTime((String) rs.get("chestpain_time"));
			objPreAnaesthetic.setTxtPresMedOther((String) rs.get("present_medication_other"));
			objPreAnaesthetic.setPreAnaesthetic_ID((Integer) rs
					.get("idpre_anaesthetic"));
			objPreAnaesthetic.setChk_anaesthetic_status((String) rs
					.get("chk_anaesthetic"));
//			objPreAnaesthetic.setRadio_anaesthetic_status((String) rs
//					.get("radio_anaesthetic"));
			objPreAnaesthetic.setRadio_anaesthetic_status((String) rs
					.get("pre_anaesthetic"));
			objPreAnaesthetic
					.setprevanaes_exp((String) rs.get("prevanaes_exp"));
			objPreAnaesthetic.setPulse((String) rs.get("pulse"));
			objPreAnaesthetic.setBP((String) rs.get("BP"));
			objPreAnaesthetic.setResp((String) rs.get("Resp"));
			objPreAnaesthetic.setPallor((String) rs.get("Pallor"));
			objPreAnaesthetic.setIcterus((String) rs.get("Icterus"));
			objPreAnaesthetic.setClub((String) rs.get("Club"));
			objPreAnaesthetic.setOedema((String) rs.get("Oedema"));
			objPreAnaesthetic.setVein((String) rs.get("Vein"));
			objPreAnaesthetic.setObesity((String) rs.get("Obesity"));
			objPreAnaesthetic.setNeckobj((String) rs.get("Neck"));
			objPreAnaesthetic.setTeethobj((String) rs.get("Teeth"));
			objPreAnaesthetic.setSpineobj((String) rs.get("Spine"));
			objPreAnaesthetic.setBHTobj((String) rs.get("BHT"));
			objPreAnaesthetic.setCVSobj((String) rs.get("CVS"));
			objPreAnaesthetic.setRSobj((String) rs.get("RS"));
			objPreAnaesthetic.setCVSobj((String) rs.get("CVS"));
			objPreAnaesthetic.setCNSobj((String) rs.get("CNS"));
			//objPreAnaesthetic.setHBobj((String) rs.get("Hb"));
			objPreAnaesthetic.setHBobj((String) rs.get("HB"));
			objPreAnaesthetic.setTCobj((String) rs.get("TC"));
			objPreAnaesthetic.setPobj((String) rs.get("P"));
			objPreAnaesthetic.setLobj((String) rs.get("L"));
			objPreAnaesthetic.setEobj((String) rs.get("E"));
			objPreAnaesthetic.setMobj((String) rs.get("M"));
			objPreAnaesthetic.setBoneobj((String) rs.get("Bone"));
			objPreAnaesthetic.setSmearobj((String) rs.get("Smear"));
			objPreAnaesthetic.setPlateletobj((String) rs.get("platelets"));
			objPreAnaesthetic.setESRobj((String) rs.get("ESR"));
			objPreAnaesthetic.setUrineobj((String) rs.get("urine"));
			objPreAnaesthetic.setBUNobj((String) rs.get("BUN"));
			objPreAnaesthetic.setHIVobj((String) rs.get("HIV"));
			objPreAnaesthetic.setBSLobj((String) rs.get("BSL"));
			objPreAnaesthetic.setFobj((String) rs.get("F"));
			objPreAnaesthetic.setPPobj((String) rs.get("PP"));
			objPreAnaesthetic
					.setnaElectolytes((String) rs.get("NaElectolytes"));
			objPreAnaesthetic.setkElectolytes((String) rs.get("KElectrolytes"));
			objPreAnaesthetic.setclElectolytes((String) rs
					.get("ClElectrolytes"));
			objPreAnaesthetic.setBonetwoobj((String) rs.get("Btwo"));
			objPreAnaesthetic.setCTobj((String) rs.get("CT"));
			objPreAnaesthetic.setPTobj((String) rs.get("PT"));
			objPreAnaesthetic.setScreatobj((String) rs.get("Screat"));
			objPreAnaesthetic.setECGobj((String) rs.get("ECG"));
			objPreAnaesthetic.setOther((String) rs.get("Other"));
			objPreAnaesthetic.setRisk_assess((String) rs.get("risk_assess"));
			objPreAnaesthetic
					.setProposed_plan((String) rs.get("proposed_plan"));
			objPreAnaesthetic.setPre_operativeinstuct((String) rs
					.get("pre_operativeinstuct"));
			objPreAnaesthetic.setPre_medication((String) rs
					.get("pre_medication"));
			objPreAnaesthetic.setXray_chest((String) rs.get("xray"));
			objPreAnaesthetic.setJawobj((String) rs.get("Jaw"));
			objPreAnaesthetic.setCyanosis((String) rs.get("Cyanosis"));
			//objPreAnaesthetic.setBloodgroup((String) rs.get("bloodgroup"));
			//code for change blood id to bloodgroupname
			String bloodGroupName="";
			if(Integer.parseInt((String) rs.get("bloodgroup")) > 0) {
			  String sqlBlood="Select  blood_group_name from bb_blood_group_master where idblood_group="+Integer.parseInt((String) rs.get("bloodgroup"))+"";
			 SQLQuery qb=sessionFactory.getCurrentSession().createSQLQuery(sqlBlood);
			 bloodGroupName=(String) qb.uniqueResult();
			
			}
			objPreAnaesthetic.setBloodgroup(bloodGroupName);
			
		/*	SimpleDateFormat dateformatJava = new SimpleDateFormat("dd/MM/yyyy");
			
			dateNow = ((Date) rs.get("Date"));
			if (dateNow != null)
				datetostring = dateformatJava.format(dateNow);*/
			objPreAnaesthetic.setCreated_Date((String) rs.get("Date"));
			
			// objPreAnaesthetic.setCreated_Date((String) rs.get("Date"));
			objPreAnaesthetic.setOtherpresentMedication((String) rs
					.get("otherpresentmed"));
			objPreAnaesthetic.setProposedSurgery((String) rs
					.get("proposed_surgery"));
			objPreAnaesthetic.setIpd_Number((String) rs.get("trcount"));
			/*
			 * objTreament.setOpd((String) rs.get("opd"));
			 * objPreAnaesthetic.setObj_Treat(objTreament);
			 */
//			List<Doctor> liDoctor = new ArrayList<Doctor>();
//			
//			sql = "SELECT doc_name,Doctor_ID FROM doctor WHERE Doctor_ID="
//					+ anaesID;
//			SQLQuery createSQLQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
//			
//			try {
////				List<Map<String, Object>> doctorDetails = getJdbcTemplate()
////						.queryForList(sql);
//				
//				List<Map<String, Object>> doctorDetails = createSQLQuery2.list();
//
//				for (Map rs1 : doctorDetails) {
//					Doctor objDoctor = new Doctor();
//					objDoctor.setDoc_name((String) rs1.get("doc_name"));
//					objDoctor.setDoctor_ID((Integer) rs1.get("Doctor_ID"));
//					liDoctor.add(objDoctor);
//
//				}
//
//				objPreAnaesthetic.setDoctorlist(liDoctor);
//			}
//
//			catch (Exception e) {
//
//				e.printStackTrace();
//			}
//
			arrPreAnaesthetic.add(objPreAnaesthetic);
		}

		return arrPreAnaesthetic;

	}

	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public ChartReport defaultOTVitalsView(String cType, String tomId, String tretId, String defaultDate) {
		
		ChartReport ChartLi = new ChartReport();
		String sql = "select * from chart_slave where status='Y' and cType=" + cType;
		
		SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String, Object>> chartDetails = createSQLQuery.list();
				
		ChartLi = fetchOTVitalsDetails(chartDetails, defaultDate, tretId , tomId);
		return ChartLi;
	}
	
	@SuppressWarnings("unchecked")
	private ChartReport fetchOTVitalsDetails(List<Map<String, Object>> chartDetails, String date, String tid ,String tomId) {
		List<ComplaintsDTO> otSlaveList = new ArrayList<ComplaintsDTO>();
		List<Operation> chartNameList = new ArrayList<Operation>();
		ComplaintsDTO objChartReport =null;
		Operation operation = null;
		ChartReport chartReport = new ChartReport();
		for (Map<String, Object> rs : chartDetails) {
			operation = new Operation();
			operation.setStatus((String) rs.get("cName"));
			operation.setToId((Integer) rs.get("idchart_slave"));
			chartNameList.add(operation);
		}
		String sql= "SELECT evm.id_ot_vital_master,evm.date,evm.status,evm.time,evm.treatmentOperationsManageID,evm.treatment_id,evm.type,\n" + 
				"    evs.idehat_ot_vital_slave,evs.idchart_slave,evs.vitals_value FROM  ehat_ot_vital_master evm right join ehat_ot_vital_slave evs ON evm.id_ot_vital_master = evs.id_ot_vital_master"
					+" where treatment_id= "+tid+" and treatmentOperationsManageID ="+tomId;
		
		SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> vitalsDetails = createSQLQuery.list();
				
				//getJdbcTemplate().queryForList(sql);
		for (Map<?,?> rs1 : vitalsDetails) {
			objChartReport = new ComplaintsDTO();
			//objChartReport.setTreatment_ID((Integer) rs1.get("treatment_id"));
			objChartReport.setIdcomplaintMaser((Integer) rs1.get("id_ot_vital_master"));
			objChartReport.setCommentType((String) rs1.get("type"));
			objChartReport.setDate((String) rs1.get("date"));
			objChartReport.setTime((String) rs1.get("time"));
			objChartReport.setLoginUserId((Integer) rs1.get("idchart_slave"));
			objChartReport.setStatus((String) rs1.get("vitals_value"));
			otSlaveList.add(objChartReport);
		}
		chartReport.setListOtSlaveList(chartNameList);
		chartReport.setListChartSlave(otSlaveList);
		List<Operation> listOtSlaveList = chartReport.getListOtSlaveList();
		List<ComplaintsDTO> listChartSlave = chartReport.getListChartSlave();
		
		//listChartSlave.stream().filter(complaint->listOtSlaveList.stream().anyMatch(operation->operation.getToId()))
		
		/*
		 * listChartSlave.stream() .filter(complaint -> listOtSlaveList.stream()
		 * .anyMatch(operation ->
		 * operation.getToid().equals(complaint.getLoginUserId()))) .flatMap(complaint
		 * -> listOtSlaveList.stream() .filter(operation ->
		 * operation.getToid().equals(complaint.getLoginUserId()))
		 * .map(com.hms.ot.dto.Operation::getToid)) .collect(Collectors.toList());
		 */
		
		return chartReport;
	}

	@Override
	public String masterDeleteOperation(int oid) {
		Operation object = (Operation) sessionFactory.getCurrentSession().get(Operation.class,oid);
			object.setStatus("N");
			return "Operation is deleted Successfully ...";
		
	}

	@Override
	public List<TreatmentOperations> fetchOTDetailsbyTreatmentId(Integer treatId) {
		// TODO Auto-generated method stub
		
		List<TreatmentOperations> list = new ArrayList<TreatmentOperations>();
		
		try {			
			
			String sql = "SELECT * FROM treatment_operations WHERE treatment_id = "+treatId;
			SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);

			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list1 = sqlresult.list();
			for (Map<String, Object> rs : list1) {
			
				TreatmentOperations obj = new TreatmentOperations();
				
				obj.setDate((String) rs.get("date"));
				obj.setStartTime((String) rs.get("Start_Time"));
				obj.setEndTime((String) rs.get("End_Time"));
				obj.setOtid((Integer) rs.get("ot_id"));
				
				
				//added by vishant
				Integer  id =(Integer) rs.get("ID");
				
			if(id!=null) {	
				Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(TreatmentOperationsManage.class);
				createCriteria.add(Restrictions.eq("iD", id));
				List<TreatmentOperationsManage> operationsManageList = createCriteria.list();
				obj.setTreatmentOperationsManageList(operationsManageList);
				
				String scheduledProcedure = obj.getTreatmentOperationsManageList().get(0).getScheduledProcedure();
				boolean contains = scheduledProcedure.contains("@");
				
				if(!contains)
				{
					StringBuilder nameBuilder = new StringBuilder();
					String[] split = scheduledProcedure.split(",");
					for (int i = 0; i < split.length; i++) {
						 createCriteria =  sessionFactory.getCurrentSession().createCriteria(Operation.class);
						createCriteria.add(Restrictions.eq("operation_id",Integer.parseInt(split[i])));
						List<Operation> operationList = createCriteria.list();
						String operName = operationList.get(0).getOperName();
						split[i] = operName;
						if (split.length > 0 ) {
					
							String n = split[i];
								nameBuilder.append("").append(n.replace("'", "")).append(",");
							

						}
					}
					String string = nameBuilder.toString();
					obj.setScheduledProcedure(string);

				}
				/*
				 * String[] arrProcedures = scheduledProcedure.split("#"); for ( int i = 1; i <
				 * (arrProcedures.length); i++) { String[] arrPro =
				 * (arrProcedures[i]).split("@"); scheduledProcedure = scheduledProcedure +
				 * "<option value='" + arrPro[0] + "'>" + arrPro[1] + "</option>"; }
				 */
				
			}
				
				list.add(obj);
				
			}
			
			System.out.println("*****OT patient.list.......... "+list.size());
			
		} catch(Exception e) {
			
			e.printStackTrace();
		}
		
		return list;
	}

	@Override
	public List<Patient> displayOpeSummary(String trid,Integer startIndex) {
		
		List<Patient> arrOperation = null;
		String sql="";
		if (trid.equals("trid")) {
			// get previous operation patient list old
			int maxresult = 10;
			
			sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,\n" + 
			 		"    p.mobile,p.gender,t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,\n" + 
			 		"    t.collection_date,t.collection_time,t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,\n" + 
			 		"    tom.doc_names\n" + 
			 		"\n" + 
			 		"FROM\n" + 
			 		"    ehat_patient p,\n" + 
			 		"    ehat_treatment t,\n" + 
			 		"    treatment_operations trop,\n" + 
			 		"    treatmentoperationsmanage tom\n" + 
			 		"WHERE\n" + 
			 		"		p.patient_id = t.patient_id\n" + 
			 		"        AND trop.treatment_id = t.Treatment_ID\n" + 
			 		"        AND trop.opStatus = 'Y'\n" + 
			 		"        AND tom.treatmentOperationsID = trop.ID\n" + 
			 		"        AND t.t_flag = 'N' group by t.treatment_id ORDER BY p.patient_id desc limit "+startIndex+", "+maxresult;
			
			

			SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> operationDetails =  createSQLQuery.list();
			
			arrOperation = fetchOperationDetailsForPre(operationDetails,trid);

		} else {
			
			sql = "select *, p.center_patient_id as patientCenterId from  patient p,treatment t,treatment_operations trop,operation op,treatmentoperationsmanage tom where  p.Patient_ID = t.Patient_ID And t.TFlag = 'ACTIVE' AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' AND t.Treatment_ID = ? and op.Operation_ID = tom.Operation_ID and  trop.ID=tom.treatmentOperationsID";
			
			SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			//arrOperation = fetchOperationDetails(operationDetails);
		}

		return arrOperation;
	}
	
	@Override
	public List<Patient> showSearchOperSum1(String searchBy, String patient_ID,
			String pageName, String fdate, String todate, int surganname,int surgerytype) {

		List<Patient> arrOperation = null;
		String sql="";
		 if (pageName.equals("all")){
			 
			 if(searchBy.equals("byName") || searchBy.equals("byId")){

				 sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,\n" + 
				 		"    p.mobile,p.gender,t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,\n" + 
				 		"    t.collection_date,t.collection_time,t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,\n" + 
				 		"    tom.doc_names\n" + 
				 		"\n" + 
				 		"FROM\n" + 
				 		"    ehat_patient p,\n" + 
				 		"    ehat_treatment t,\n" + 
				 		"    treatment_operations trop,\n" + 
				 		"    treatmentoperationsmanage tom\n" + 
				 		"WHERE\n" + 
				 		"		p.patient_id = t.patient_id\n" + 
				 		"        AND trop.treatment_id = t.Treatment_ID\n" + 
				 		"        AND trop.opStatus = 'Y'\n" + 
				 		"        AND tom.treatmentOperationsID = trop.ID\n" + 
				 		"        AND t.t_flag = 'N'";

					if (searchBy.equals("byId")) {
						int parseInt = Integer.parseInt(patient_ID);
						sql = sql + "and p.patient_id = " + parseInt;
						
						SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
						createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						List<Map<String, Object>> operationDetails =  createSQLQuery.list();
						arrOperation = fetchOperationDetailsForPre(operationDetails,pageName);
					} else if (searchBy.equals("byName")) {

						String TempValue = patient_ID;
					if(TempValue!="") {	
						sql = sql + " AND (p.f_name like" + "'%" + patient_ID
								+ "%' || p.m_name like" + "'%" + patient_ID
								+ "%' || p.l_name like" + "'%" + patient_ID + "%')  ";
					}
						
					/*
					 * if (TempValue == 1) { sql = sql + " AND (p.f_name like" + "'%" + patient_ID +
					 * "%' || p.m_name like" + "'%" + patient_ID + "%' || p.l_name like" + "'%" +
					 * patient_ID + "%')  "; } else { patient_ID=0;
					 * 
					 * if (TempValue == 2) { sql = sql + "AND (p.f_name like" + "'%" + patient_ID +
					 * "%' && p.l_name like" + "'%" + patient_ID + "%')  "; } else { sql = sql +
					 * "AND (p.f_name like" + "'%" + patient_ID + "%' && p.m_name like" + "'%" +
					 * patient_ID + "%' && p.l_name like" + "'%" + patient_ID + "%') "; } }
					 */

					
					}
				}else{

					 if(fdate.length() > 0 && surgerytype > 0 && surganname > 0 && todate.length() > 0){

						 //sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom ,  patient_operation po ,operation_doc_tbl ot where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N' and  tom.flag='N' ";
						//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy;
						 sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,p.mobile,p.gender,\n" + 
						 		"	t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,t.collection_date,t.collection_time,\n" + 
						 		"    t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,tom.doc_names\n" + 
						 		"FROM\n" + 
						 		"    ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom,patient_operation po,operation_doc_tbl ot\n" + 
						 		"WHERE\n" + 
						 		"    p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID AND trop.opStatus = 'Y' AND tom.treatmentOperationsID = trop.ID AND t.t_flag = 'N'";
						 sql = sql + "and trop.date BETWEEN  '"+ fdate +"' and '"+ todate +"' and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and po.Operation_ID="+ surgerytype +" ";
						 sql = sql + "and tom.treatmentOperationsManageID = ot.treatmentOperationsManageID and ot.doc_id="+ surganname +" ";
					 }else{
						 if(fdate.length() > 0 && todate.length() > 0){
							 if(surgerytype > 0){

								 //sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom, patient_operation po where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N'  and  tom.flag='N'  ";
								//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy;
								 sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,p.mobile,p.gender,\n" + 
								 		"	t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,t.collection_date,t.collection_time,\n" + 
								 		"    t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,tom.doc_names\n" + 
								 		"FROM\n" + 
								 		"    ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom,patient_operation po\n" + 
								 		"WHERE\n" + 
								 		"    p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID AND trop.opStatus = 'Y' AND tom.treatmentOperationsID = trop.ID AND t.t_flag = 'N'";
								 sql = sql + "and trop.date BETWEEN  '"+ fdate +"' and '"+ todate +"' and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and po.Operation_ID="+ surgerytype +" ";
							 
							 }else if(surganname > 0){

								 //sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom ,operation_doc_tbl ot where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N'  and  tom.flag='N'  ";
								//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy;
								 sql ="SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,p.mobile,p.gender,\n" + 
								 		"	t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,t.collection_date,t.collection_time,\n" + 
								 		"    t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,tom.doc_names\n" + 
								 		"FROM\n" + 
								 		"    ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom,operation_doc_tbl ot\n" + 
								 		"WHERE\n" + 
								 		"    p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID AND trop.opStatus = 'Y' AND tom.treatmentOperationsID = trop.ID AND t.t_flag = 'N'";
								 sql = sql + "and trop.date BETWEEN  '"+ fdate +"' and '"+ todate +"'  ";
								 sql = sql + "and tom.treatmentOperationsManageID = ot.treatmentOperationsManageID and ot.doc_id="+ surganname +" ";
							 }else{
								 
								 
								 	String fromArray[] = fdate.split("/");
									String toArray[] = todate.split("/");
									StringBuffer fromReult = new StringBuffer();
									fromReult = fromReult.append(fromArray[2] + "-" + fromArray[1] + "-" + fromArray[0]);

									StringBuffer toReult = new StringBuffer();
									toReult = toReult.append(toArray[2] + "-" + toArray[1] + "-" + toArray[0]);
								// sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N' and  tom.flag='N' ";
									/*
									 * sql=
									 * "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,\n"
									 * +
									 * "    p.mobile,p.gender,t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,\n"
									 * +
									 * "    t.collection_date,t.collection_time,t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,\n"
									 * +
									 * "    tom.doc_names FROM ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom WHERE p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID AND trop.opStatus = 'Y' AND tom.treatmentOperationsID = trop.ID AND t.t_flag = 'N'and p.patient_id AND trop.date BETWEEN '"
									 * + fdate +"' and '"+ todate +"' ";
									 */
									//added by vishant
									
									sql= "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,\n" + 
									 		"    p.mobile,p.gender,t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,\n" + 
									 		"    t.collection_date,t.collection_time,t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,\n" + 
									 		"    tom.doc_names FROM ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom WHERE p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID AND trop.opStatus = 'Y' AND tom.treatmentOperationsID = trop.ID AND t.t_flag = 'N'and p.patient_id AND DATE_FORMAT(STR_TO_DATE(trop.date,'%d/%m/%Y'),'%Y-%m-%d') BETWEEN '"+ fromReult +"' and '"+ toReult +"' ";
										
									
									//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy; 
									// sql = sql + "and trop.date BETWEEN  '"+ fdate +"' and '"+ todate +"' "; 
							 }
						
						 }else if(surgerytype > 0){
							 if(surganname > 0){
								 //sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom, patient_operation po,operation_doc_tbl ot where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N'   and  tom.flag='N' ";
									//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy; 
								 sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,\n" + 
									 		"    p.mobile,p.gender,t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,\n" + 
									 		"    t.collection_date,t.collection_time,t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,\n" + 
									 		"    tom.doc_names\n" + 
									 		"\n" + 
									 		"FROM\n" + 
									 		"    ehat_patient p,\n" + 
									 		"    ehat_treatment t,\n" + 
									 		"    treatment_operations trop,\n" + 
									 		"    treatmentoperationsmanage tom,\n" +
									 		"    patient_operation po,\n" +
									 		"    operation_doc_tbl ot\n" +
									 		"WHERE\n" + 
									 		"		p.patient_id = t.patient_id\n" + 
									 		"        AND trop.treatment_id = t.Treatment_ID\n" + 
									 		"        AND trop.opStatus = 'Y'\n" + 
									 		"        AND tom.treatmentOperationsID = trop.ID\n" + 
									 		"        AND t.t_flag = 'N'";
									 sql = sql + "and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and po.Operation_ID="+ surgerytype +" ";
									 sql = sql + "and tom.treatmentOperationsManageID = ot.treatmentOperationsManageID and ot.doc_id="+ surganname +" ";
							 }else{
								 //sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom, patient_operation po where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N'    and  tom.flag='N'      ";
									//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy;
								 sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,p.mobile,p.gender,\n" + 
								 		"	t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,t.collection_date,t.collection_time,\n" + 
								 		"    t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,tom.doc_names\n" + 
								 		"FROM\n" + 
								 		"    ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom,patient_operation po\n" + 
								 		"WHERE\n" + 
								 		"    p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID AND trop.opStatus = 'Y' AND tom.treatmentOperationsID = trop.ID AND t.t_flag = 'N'";
									 sql = sql + "and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and po.Operation_ID="+ surgerytype +" "; 
							 }
							
						 }else if(surganname > 0){
							 //sql = "select distinct(p.patient_id),p.*,t.*,trop.*,tom.* from  ehat_patient p,ehat_treatment t,treatment_operations trop,treatmentoperationsmanage tom, operation_doc_tbl po where p.patient_id = t.patient_id AND trop.treatment_id = t.Treatment_ID and trop.opStatus = 'Y' and  tom.flag='N' and  tom.treatmentOperationsID=trop.ID  and t.t_flag='N'  and  tom.flag='N'  ";
							//	sql = sql + "and p.patient_id = " + strValue + " and trop.ID = "+searchBy;
							 sql = "SELECT DISTINCT p.patient_id,p.address,p.age,p.center_patient_id,p.created_date_time,p.dob,p.prefix,p.f_name,p.m_name,p.l_name,\n" + 
								 		"    p.mobile,p.gender,t.treatment_id,t.speciality_id,t.created_by,t.department_id,t.doctor_id,t.opdipdno,t.referred_by,t.trcount,\n" + 
								 		"    t.collection_date,t.collection_time,t.narration,trop.ID,trop.Start_Time,trop.End_Time,trop.opStatus,tom.treatmentOperationsManageID,\n" + 
								 		"    tom.doc_names\n" + 
								 		"\n" + 
								 		"FROM\n" + 
								 		"    ehat_patient p,\n" + 
								 		"    ehat_treatment t,\n" + 
								 		"    treatment_operations trop,\n" + 
								 		"    treatmentoperationsmanage tom,\n" +
								 		"    operation_doc_tbl po\n" +
								 		"WHERE\n" + 
								 		"		p.patient_id = t.patient_id\n" + 
								 		"        AND trop.treatment_id = t.Treatment_ID\n" + 
								 		"        AND trop.opStatus = 'Y'\n" + 
								 		"        AND tom.treatmentOperationsID = trop.ID\n" + 
								 		"        AND t.t_flag = 'N'";
							 sql = sql + "and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and po.doc_id="+ surganname +" ";
						 }
					 }
				}
			 
			
				
			 	SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> operationDetails =  createSQLQuery.list();
				arrOperation = fetchOperationDetailsForPre(operationDetails,"all");
		}else{


	//		sql = "select p.*,t.*,top.ID,top.Start_Time,top.End_Time,top.date,top.opStatus,top.emergencyFlag,top.infectionFlag,top.ot_id,top.criticalFlag from  ehat_patient p,ehat_treatment t,treatment_operations top,treatment_beds tb where  p.patient_id = top.Patient_ID and p.patient_id=t.patient_id And t.t_flag = 'Y' and t.treatment_id=tb.Treatment_ID and tb.status = 'Y' and top.opStatus ='Y' and top.scheduleFlag = 'OT' and top.date =? and  tb.bedAllocatedFor='P' ";
		//	sql = "select top.*,tom.* ,po.operation_name , om.name from  ehat_patient p,ehat_treatment t,treatment_operations top,treatment_beds tb , treatmentoperationsmanage tom ,patient_operation po ,operation_team_master om where  p.patient_id = top.Patient_ID and p.patient_id=t.patient_id And t.t_flag = 'Y' and t.treatment_id=tb.Treatment_ID and tb.status = 'Y' and top.opStatus ='Y' and top.scheduleFlag = 'OT' and   tb.bedAllocatedFor='P' and tom.treatmentOperationsID=top.ID";
            sql="select top.*,tom.* ,po.operation_name , om.name , ott.ot_name from treatment_operations top, treatmentoperationsmanage tom ,patient_operation po ,operation_team_master om , ot_type ott  where   top.opStatus ='Y' and top.scheduleFlag = 'OT' and tom.treatmentOperationsID=top.ID  and top.date = '"+ fdate +"' and tom.treatmentOperationsManageID = po.treatmentOperationsManageID and  om.idoperation_team_master = tom.surgery_team  and om.status='Y' and ott.idot_name = top.ot_id and ott.status='Y' ";
           
            SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			createSQLQuery.setResultTransformer(new AliasToBeanResultTransformer(Patient.class));
			@SuppressWarnings("unchecked")
			List<Patient> lstpatientdto = createSQLQuery.list();
			
			//arrOperation = fetchOperationDetailsFodasboard(operationDetails,"previousOperation");
			
		}
			/*	List<Map<String, Object>> operationDetails = getJdbcTemplate()
						.queryForList(sql);
				arrOperation = fetchOperationDetails(operationDetails);*/
		
		
		return arrOperation;
	}

	private List<Patient> fetchOperationDetailsForPre(
			List<Map<String, Object>> operationDetails, String pageName) {
		List<Integer> patId = new ArrayList();
		List<Patient> arrTopPat = new ArrayList<Patient>();
		for (Map<String, Object> rs : operationDetails) {

			if (!patId.contains((Integer) rs.get("patient_id"))) {

				patId.add((Integer) rs.get("patient_id"));
				Patient objpatientDetails = new Patient();
				Treatment objTreatment = new Treatment();

				objpatientDetails.setPatient_ID((Integer) rs.get("patient_id"));
				objpatientDetails.setCenterPatientId(Integer.toString((Integer)rs.get("patient_id")));
				objpatientDetails.setAge( Integer.toString((Integer)rs.get("age")));
				objpatientDetails.setDob((String) rs.get("dob"));
				objpatientDetails.setfName((String) rs.get("f_name"));
				objpatientDetails.setlName((String) rs.get("l_name"));
				objpatientDetails.setmName((String) rs.get("m_name"));
				objpatientDetails.setMobile((String) rs.get("mobile"));
				objpatientDetails.setTitle((String) rs.get("prefix"));
				objTreatment.setTstartDate( ((java.sql.Timestamp) rs.get("created_date_time")).toString());
				Integer yr= (Integer) rs.get("age");
				Integer age_days= (Integer) rs.get("age_days");
				Integer age_months= (Integer) rs.get("age_months");
				String age= yr+"Y/" + age_months +"M/"+ age_days+"D";
				objpatientDetails.setAge(age);
				
				
				String doctor_id=((String) rs.get("doctor_id"));
				
				String docname="-";
				String sql = "select * from doctor where Doctor_ID in("+doctor_id+")";
				SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> doctorlist =createSQLQuery.list();
				int user_id =0;
				for (Map<String, Object> rs1 : doctorlist) {
					 docname = (String) rs1.get("doc_name");
					  user_id = (((Number) rs1.get("User_ID"))).intValue();
				}
				objpatientDetails.setRefby(docname);

				objpatientDetails.setSex((String) rs.get("gender"));
				objpatientDetails.setWeight((String) rs.get("weight"));
				//objpatientDetails.setSymptoms((String) rs.get("symptoms"));
				//objpatientDetails.setmStatus((String) rs.get("mStatus"));
				objpatientDetails.setTreatment_id((Integer) rs.get("treatment_id"));

				int patient_id = ((Integer) rs.get("patient_id"));
				int treatment_id = ((Integer) rs.get("treatment_id"));
				sql = "select trcount,charges_master_slave_id , source_type_id from patient_records_details where  treatment_id="+treatment_id+" and patient_id	="+patient_id+"";
				
				SQLQuery createSQLQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				createSQLQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> opmeDetails= createSQLQuery1.list();
				/*
				 * for(Map<String, Object> rs2 : opmeDetails) { treatment_id = (Integer)
				 * rs2.get("treatment_id"); patient_id = (Integer) rs.get("patient_id"); }
				 */
				List<TreatmentOperations> litr = new ArrayList<TreatmentOperations>();
				
				for (Map<String, Object> rs1 : opmeDetails) {
					int charges_master_slave_id = (Integer) rs1
							.get("charges_master_slave_id");
					String trcount = (String) rs1.get("trcount");
					objTreatment.setTreatmentCount(trcount);
					// objTreatment.setTstartDate();
					int sourceid = (Integer) rs1.get("source_type_id");
					if (charges_master_slave_id > 0) {
						String sql1 = "select category_name from ehat_charges_master_slave where  id="
								+ charges_master_slave_id + " and deleted='N'";
						String cname = (String)(sql1);
						String sql2 = "select charges_name from ehat_charges_master where  charges_id="
								+ sourceid + " and deleted='N'";
						String sourcename =(String)(sql2);
						objTreatment.setBillCategory_Name(sourcename);
						objTreatment.setCompanyid(charges_master_slave_id);
						objTreatment.setCompanyname(cname);

					} else {
						objTreatment.setBillCategory_Name("Self");
						objTreatment.setCompanyid(0);
						objTreatment.setCompanyname("-");
					}
				}

			
			
				objTreatment.setTreatmentCount((String) rs
						.get("trcount"));
				objpatientDetails.setObjTreatment(objTreatment);
				int intopId = ((Integer) rs.get("ID"));
				
				/* query changed by Kavita 17/01/2017 */
				if(pageName.equals("previousOperation")){
					sql = "select * from ehat_treatment t,treatmentoperationsmanage tom, treatment_operations top where t.treatment_id=top.Treatment_ID and t.t_flag='N' AND top.ID = tom.treatmentOperationsID"
							+ " and tom.operation_status='Y' and top.Patient_ID = "+patient_id+" and top.ID = "+intopId+" group by top.ID";
				
				}else{
					sql = "SELECT \n" + 
							"    tom.treatmentOperationsManageID,top.date,t.treatment_id,top.ot_id,top.emergencyFlag,top.criticalFlag,top.infectionFlag,tom.scheduled_procedure\n" + 
							"FROM\n" + 
							"    ehat_treatment t,\n" + 
							"    treatmentoperationsmanage tom,\n" + 
							"    treatment_operations top\n" + 
							"WHERE\n" + 
							"    t.treatment_id = top.Treatment_ID\n" + 
							"        AND t.t_flag = 'N'\n" + 
							"        AND top.ID = tom.treatmentOperationsID\n" + 
							"        AND tom.operation_status = 'Y'\n" + 
							"        AND top.Patient_ID = "+patient_id+"\n" + 
							"GROUP BY top.ID";
				
				}
				
				SQLQuery createSQLQuery2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
				createSQLQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> opmanageDetails1 = createSQLQuery2.list();
				
				List<TreatmentOperations> litrop1 = new ArrayList<TreatmentOperations>();
				for (Map<String, Object> rs11 : opmanageDetails1) {

					TreatmentOperations top1 = new TreatmentOperations();
					top1.setTreatmentOperationsManageID((Integer) rs11
							.get("treatmentOperationsManageID"));
					top1.setDate((String) rs11.get("date"));
					top1.setTreatment_ID((Integer) rs11.get("treatment_id"));
					top1.setOtid((Integer) rs11.get("ot_id"));
				//	top1.setiD((Integer) rs11.get("treatmentOperationsID"));
				//	System.err.println("topid = "+top1.getiD());
					top1.setScheduledProcedure((String) rs11.get("scheduled_procedure"));
					System.err.println("otid = "+top1.getOtid());

					sql = "SELECT \n" + 
							"    top.treatment_id,top.ot_id,tom.treatmentOperationsManageID,tom.department,tom.Operation_ID,tom.doc_names,tom.operationCharge,tom.Equipments_Used,\n" + 
							"    tom.Comments,tom.Status,tom.route,tom.anesthesia,tom.anachargetype,tom.stent_detail,tom.finding,tom.provlon,tom.veesel_det,\n" + 
							"    tom.surInstrumentCharge,tom.ohr,tom.chr,tom.obp,tom.cbp,tom.sheet_remove_by,tom.asstSurgeonName,tom.remark,tom.precaution,\n" + 
							"    tom.surgery_description,tom.indication_for_surgery,tom.surgery_team,tom.bookedBy,tom.gasAndMonitorServices,tom.insrumentAndEquipemntServices,\n" + 
							"    tom.bedSideServices,tom.anesthesiaType\n" + 
							"FROM\n" + 
							"    treatment_operations top,\n" + 
							"    treatmentoperationsmanage tom\n" + 
							"WHERE\n" + 
							"    top.ID = tom.treatmentOperationsID\n" + 
							"        AND tom.operation_status = 'Y'\n" + 
							"        AND top.ID="+intopId+"";
					
					
					SQLQuery createSQLQuery3 = sessionFactory.getCurrentSession().createSQLQuery(sql);
					createSQLQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> opmanageDetails = createSQLQuery3.list();
					List<TreatmentOperations> litrop = new ArrayList<TreatmentOperations>();
					for (Map<String, Object> rs1 : opmanageDetails) {
						Operation op = new Operation();
						TreatmentOperations top = new TreatmentOperations();
						top.setTreatmentOperationsManageID((Integer) rs1
								.get("treatmentOperationsManageID"));
						
						top.setDate((String) rs11.get("date"));
						top.setTreatment_ID((Integer) rs1.get("treatment_id"));
						top.setOtid((Integer) rs1.get("ot_id"));
					//	top.setiD((Integer) rs.get("ID"));
						top.setEmergencyFlag((String) rs11.get("emergencyFlag"));
						top.setCriticalFlag((String) rs11.get("criticalFlag"));
						top.setInfectionFlag((String) rs11.get("infectionFlag"));
						
				//		String st = ((Time) rs.get("Start_Time")).toString();
				//		String et = ((Time) rs.get("End_Time")).toString();
				//		top.setStart_Time(st);
				//		top.setEnd_Time(et);
						
						top.setDate((String) rs.get("date"));
						top.setDepartment((String) rs1.get("department"));
						top.setOperation_ID((Integer) rs1.get("Operation_ID"));
						
						top.setDoc_names((String) rs1.get("doc_names"));
						top.setOperationCharge((Integer) rs1.get("operationCharge"));
						top.setEquipments_Used((String) rs1.get("Equipments_Used"));

						top.setComments((String) rs1.get("Comments"));
						top.setStatus((String) rs1.get("Status"));
						top.setRoute((String) rs1.get("route"));
						top.setAnesthesia((String) rs1.get("anesthesia"));

						top.setAnechargetype((String) rs1.get("anachargetype"));
						top.setStent_detail((String) rs1.get("stent_detail"));
						top.setFinding((String) rs1.get("finding"));

						top.setProvlon((String) rs1.get("provlon"));
						top.setVeesel_det((String) rs1.get("veesel_det"));
						top.setSurInstrumentCharge((String) rs1.get("surInstrumentCharge"));
						top.setOhr((String) rs1.get("ohr"));
						top.setChr((String) rs1.get("chr"));
						top.setObp((String) rs1.get("obp"));
						top.setCbp((String) rs1.get("cbp"));
						top.setSheet_remove_by((Integer) rs1.get("sheet_remove_by"));
						top.setAsstSurgeonName((String) rs1.get("asstSurgeonName"));
						

						top.setRemark((String) rs1.get("remark"));
						top.setPrecaution((String) rs1.get("precaution"));
						top.setSurgeryDescription((String) rs1
								.get("surgery_description"));
						top.setIndicationForSurgery((String) rs1
								.get("indication_for_surgery"));
						top.setTeamId((Integer) rs1.get("surgery_team"));
						top.setBookedBy((Integer) rs1.get("bookedBy"));
						System.err.println("team = "+top.getTeamId());

						// services list creation
						top.setGasAndMonitorService((String) rs1
								.get("gasAndMonitorServices"));
						top.setInstrumentAndEquipementService((String) rs1
								.get("insrumentAndEquipemntServices"));
						top.setBedSideService((String) rs1
								.get("bedSideServices"));
						top.setAnesthesiaType((String) rs1
								.get("anesthesiaType"));
						

						List<Test> listTest = new ArrayList<Test>();

						if (null != top.getGasAndMonitorService()
								&& !(top.getGasAndMonitorService()).equals("")) {
							String monitorArr[] = (top
									.getGasAndMonitorService()).split("\n");

							for (int i = 0; i < monitorArr.length; i++) {
								String gasesId[] = monitorArr[i].split("-");
								sql = "select idipdservices, ipdservicename,ipdservicetype from ipdservices where idipdservices=?";
								List<Map<String, Object>> monitorMap = new ArrayList<Map<String,Object>>();
								for (Map<String, Object> monitor : monitorMap) {
									Test objTest = new Test();
									objTest.setTest_ID((Integer) monitor
											.get("idipdservices"));
									objTest.setTName((String) monitor
											.get("ipdservicename"));
									objTest.setIpdservicetype((String) monitor
											.get("ipdservicetype"));
									objTest.setQty(Float.parseFloat(gasesId[1]));
									listTest.add(objTest);
								}

							}
						}

						if (null != top.getBedSideService()
								&& !(top.getBedSideService()).equals("")) {
							String bedArr[] = (top.getBedSideService())
									.split("\n");

							for (int i = 0; i < bedArr.length; i++) {
								String bedId[] = bedArr[i].split("-");
								sql = "select idipdservices, ipdservicename,ipdservicetype from ipdservices where idipdservices=?";
								
								List<Map<String, Object>> bedMap = new ArrayList<Map<String,Object>>();
								for (Map<String, Object> bed : bedMap) {
									Test objTest = new Test();
									objTest.setTest_ID((Integer) bed
											.get("idipdservices"));
									objTest.setTName((String) bed
											.get("ipdservicename"));
									objTest.setIpdservicetype((String) bed
											.get("ipdservicetype"));
									objTest.setQty(Float.parseFloat(bedId[1]));
									listTest.add(objTest);
								}

							}
						}

						if (null != top.getInstrumentAndEquipementService()
								&& !(top.getInstrumentAndEquipementService())
										.equals("")) {
							String instrumentArr[] = (top
									.getInstrumentAndEquipementService())
									.split("\n");

							for (int i = 0; i < instrumentArr.length; i++) {
								String instruId[] = instrumentArr[i].split("-");
								sql = "select idipdservices, ipdservicename,ipdservicetype from ipdservices where idipdservices=?";
								List<Map<String, Object>> instrumentMap = new ArrayList<Map<String,Object>>();
								for (Map<String, Object> instrument : instrumentMap) {
									Test objTest = new Test();
									objTest.setTest_ID((Integer) instrument
											.get("idipdservices"));
									objTest.setTName((String) instrument
											.get("ipdservicename"));
									objTest.setIpdservicetype((String) instrument
											.get("ipdservicetype"));
									objTest.setQty(Float
											.parseFloat(instruId[1]));
									listTest.add(objTest);
								}

							}
						}
						/***************** surgery consubales by @author husen ********/
						
						sql = "select count(*) from ipd_ot_manage_surgeryconsumable where treatment_operation_manage_id="
								+ top1.getOtid();
						int count =0;
						if (count > 0) {
							sql = "SELECT cons.*,cons.item_qty, inv.item_name, inv.item_id FROM ipd_ot_manage_surgeryconsumable cons,inv_item_master inv "
									+ "WHERE cons.item_id = inv.item_id AND cons.treatment_operation_manage_id =? AND cons.status = 'Y' "
									+ "and inv.item_master_delete_flag=0";
							List<Map<String, Object>> equipmentMap = new ArrayList<Map<String,Object>>();
							for (Map<String, Object> equipment : equipmentMap) {
								Test objTest = new Test();
								objTest.setTest_ID((Integer) equipment
										.get("item_id"));
								objTest.setTName((String) equipment
										.get("item_name"));
							
								// equipment.get("item_name"));
								objTest.setIpdservicetype("c");
								int qty = (Integer) equipment.get("item_qty");
								float QTY = (float) qty;
								objTest.setQty(QTY);
								listTest.add(objTest);
								
							}

						}

						top.setListTest(listTest);

						sql = "SELECT * FROM patient_operation where treatmentOperationsManageID=? and status=?";
						String operationString = "0#";
						List<Map<String, Object>> patientOperationList = new ArrayList<Map<String,Object>>();
						for (Map<String, Object> rs3 : patientOperationList) {
							Integer operationId = (Integer) rs3
									.get("operation_ID");
							String operationName = (String) rs3
									.get("operation_name");
							operationString = operationString + operationId
									+ "@" + operationName + "#";
						}

						top.setScheduledProcedure(operationString);
						/*
						 * top.setScheduledProcedure((String) rs1
						 * .get("scheduled_procedure"));
						 */


						// end services list creation

						sql = "select * from operation_doc_tbl where treatmentOperationsManageID=? and status=?";
						
						List<Map<String, Object>> docDetails = new ArrayList<Map<String,Object>>();
								
						List<OperationDocTbl> listDocDetails = new ArrayList<OperationDocTbl>();
						for (Map<String, Object> rset : docDetails) {
							OperationDocTbl objOperationDocTbl = new OperationDocTbl();
							objOperationDocTbl.setDocId((Integer) rset.get("doc_id"));
							objOperationDocTbl.setIdoperationDocTbl((Integer) rset.get("idoperation_doc_tbl"));
							objOperationDocTbl.setDocType((String) rset.get("docType"));
							objOperationDocTbl.setDocName((String) rset.get("docName"));
							objOperationDocTbl.setSurgeonType((String) rset.get("surgeontype"));
							
							String sqlForDocDetails = "SELECT d.Doctor_ID,d.doc_name,d.mobileNo,d.email_Id,"
									+ "IF(d.speciality = 'select', '-', (Select spl_name from doctor_specilities where iddoctor_specilities = d.speciality)) spl_name, "
									+ "IF(d.department = '0', '-', (Select department_name from hospital_departments where idhospital_departments = d.department)) department_name, "
									+ "IF(d.specialisation = '0', '-', (Select specialization_name from hospital_specialization where idhospital_Specialization = d.specialisation)) specialization_name "
									+ "FROM doctor d where d.User_ID ="+user_id+"";
							
							List<Map<String, Object>> docList = new ArrayList<Map<String,Object>>();
							
							for (Map<String, Object> rs2 : docList) {
								Doctor objDoc = new Doctor();
								objDoc.setDoctor_ID((Integer) rs2.get("Doctor_ID"));
								objDoc.setDoc_name((String) rs2.get("doc_name"));
								objDoc.setMobileNo((String) rs2.get("mobileNo"));
								objDoc.setEmail_Id((String) rs2.get("email_Id"));
								objDoc.setSpeciality((String) rs2.get("spl_name"));
								objDoc.setDepartmentName((String) rs2.get("department_name"));
								//objDoc.setDepartmentName(null != ((String) rs2.get("department_name")) ? ((String) rs2.get("department_name")) : "");
//								objDoc.setSpecialisationName((String) rs2.get("specialization_name"));
								objOperationDocTbl.setObjDoctor(objDoc);
								objDoc = null;
							}
							
							listDocDetails.add(objOperationDocTbl);
							objOperationDocTbl = null;
						}
						top.setListOperationDoc(listDocDetails);

						sql = "select * from operation_anesthetist where treatment_operation_id=? and status=?";
						List<Map<String, Object>> anesthetistDetails = new ArrayList<Map<String,Object>>();
						List<OperationAnesthetist> listanesthetistDetails = new ArrayList<OperationAnesthetist>();
						for (Map<String, Object> rset : anesthetistDetails) {
							OperationAnesthetist objOperationAnesthetist = new OperationAnesthetist();
							/*objOperationAnesthetist
									.setAnesthetist_id((Integer) rset
											.get("anesthetist_id"));
							objOperationAnesthetist
									.setIdoperationAnesthetist((Integer) rset
											.get("idoperation_anesthetist"));
							listanesthetistDetails.add(objOperationAnesthetist);*/
						}
						top.setListOperationAnesthetist(listanesthetistDetails);

						sql = "select * from assistant_surgeon where treatment_operation_id=? and status=?";
						List<Map<String, Object>> asstSurgeonDetails = new ArrayList<Map<String,Object>>();
						List<AssistantSurgeon> listAsstSurgeonDetail = new ArrayList<AssistantSurgeon>();
						for (Map<String, Object> rse : asstSurgeonDetails) {
							AssistantSurgeon objAssistantSurgeon = new AssistantSurgeon();
							objAssistantSurgeon.setAsstDocId((Integer) rse
									.get("doc_id"));
							objAssistantSurgeon.setIdAsstSurgeon((Integer) rse
									.get("idassistant_surgeon"));
							listAsstSurgeonDetail.add(objAssistantSurgeon);
						}
						top.setListAssistantSurgeon(listAsstSurgeonDetail);
						top.setObjOperation(op);
						litrop.add(top);
					}
					top1.setListtreatmentoperation(litrop);
					litrop1.add(top1);
				}
				objpatientDetails.setListTop(litrop1);
				// objpatientDetails.setListTop1(litrop1);
				arrTopPat.add(objpatientDetails);

			} else {

				// adasdasd
			}

		}
		return arrTopPat;

	}
	
	public int saveOTVitals(ChartReport objChart, Integer userId, String type ,String tomId,String tid) {
		
		int flag = 1;
		int isInserted = 0;
		int id_ot_vital_master = 0;
		ChartReportDTO objChart1 =new ChartReportDTO();
		ChartReport chr = new ChartReport();
		List<Operation> chartReport2 = objChart.getListOtSlaveList();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
		Date date = new Date();
		String datestring = dateFormat.format(date); 
		String dt[] = datestring.split(" ");
			String queryType = "";
			String sql = "";
			OTVitalMasterDto lstOTvitalMaster = new OTVitalMasterDto();
			try {
					Session session1 = sessionFactory.getCurrentSession();
				
					sql = "INSERT INTO ehat_ot_vital_master (treatment_id,treatmentOperationsManageID,type,date,time,status,user_id,user_ip) VALUES (?,?,?,?,?,?,?,?)";
					
					lstOTvitalMaster.setUser_id("1");
					lstOTvitalMaster.setTreatment_id(Integer.parseInt(tid));
					lstOTvitalMaster.setTreatmentOperationsManageID(Integer.parseInt(tomId));
					lstOTvitalMaster.setType(type);
					lstOTvitalMaster.setDate(dt[0]);
					lstOTvitalMaster.setTime(dt[1]);
					lstOTvitalMaster.setStatus("Y");
					
					session1.save(lstOTvitalMaster);
					
					objChart1.setLstOTvitalmasterdto(lstOTvitalMaster);
					
					int id = (Integer) session1.save(objChart1);
					if (id > 0) {
					isInserted = 1;
				}

			} catch (Exception e) {

				System.out.println("database error...could not insert: " + e.getMessage());
				e.printStackTrace();
				return 0;
			}
					
					id_ot_vital_master = lstOTvitalMaster.getId_ot_vital_master();
					
					OTVitalSlave lstOTvitalSlave = new OTVitalSlave();
					
					for(int i=0; i< chartReport2.size();i++) {
					 if(!(chartReport2.get(i).getStatus()).equals("")) {
					  
					  sql = "INSERT INTO ehat_ot_vital_slave (id_ot_vital_master,idchart_slave,vitals_value) VALUES (?,?,?)";
					  
					  lstOTvitalSlave.setId_ot_vital_master(id_ot_vital_master);
					  lstOTvitalSlave.setIdchart_slave(chartReport2.get(i).getToId());
					  lstOTvitalSlave.setVitals_value(chartReport2.get(i).getStatus());
					  
					  try {
						  
						  	Session session1 = sessionFactory.getCurrentSession();
						  	
						  	session1.save(lstOTvitalSlave);
						  	
						  	//if ( i % 20 == 0 ) {
			                    session1.flush();
			                    session1.clear();
			                 //}
						  	
						  	objChart1.setLstOTvitalslavedto(lstOTvitalSlave);
						  	
						  	int id =(Integer)session1.save(objChart1);
						  	if(id>0) {
						  				isInserted = 1;
						  			}
					  
					  } catch (Exception e) {
						  
						 System.out.println("database error...could not insert: " + e.getMessage());
					  
						 e.printStackTrace(); 
						 
						 return 0; 
					  } 
					}
				}
					 

		return flag;
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public CustomizeTemplate fetchCustomizeTemplateListByDeptId(Integer departmentid) {
		CustomizeTemplate obj=new CustomizeTemplate();
		List<CustomizeTemplate> list=new ArrayList<>();
		try {
			Criteria c=   sessionFactory.getCurrentSession().createCriteria(CustomizeTemplate.class);
		if(departmentid==1){
			Integer arr[]= {departmentid,3,4};
			c.add(Restrictions.in("departmentId", arr));
		}
		else {
			c.add(Restrictions.eq("departmentId", departmentid));
		}
			//c.add(Restrictions.eq("selectTemplateType", selectTemplateType));
			list=c.list();
			obj.setCustomizeTemplateList(list);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public String deleteOperationTeamList(Integer teamId) {
		try {
			OperationTeam object = (OperationTeam) sessionFactory.getCurrentSession().get(OperationTeam.class, teamId);
			object.setStatus("N");
			return "Data is deleted Successfully ...";
		} catch (Exception e) {
			e.printStackTrace();
			return "something went wrong..";
		}

	}

	@Override
	public OperationTeam fetchTeambyId(Integer teamId) {
		// TODO Auto-generated method stub
		
		OperationTeam obj = new OperationTeam();
		Users objuser = new Users();
		HospitalDepartmentDto objDept = new HospitalDepartmentDto();
		List<OperationTeamSlave> list = new ArrayList<>();
		
		try {
			
			obj = (OperationTeam) sessionFactory.getCurrentSession().get(OperationTeam.class, teamId);
			
			for(OperationTeamSlave ots : obj.getLtSlave())
			{
				OperationTeamSlave objots = new OperationTeamSlave();
				objuser = (Users) sessionFactory.getCurrentSession().get(Users.class, ots.getUser_ID());
				
				Integer deptId = Integer.parseInt(objuser.getObjDoctor().getDepartment());
				if(deptId > 0) {
					objDept = (HospitalDepartmentDto) sessionFactory.getCurrentSession().get(HospitalDepartmentDto.class, deptId);
				}
				else {
					objDept=null;
				}
				objots.setUserName(ots.getUserName());
				objots.setType(ots.getType());
				objots.setSpeciality(objuser.getObjDoctor().getSpecializationName());
//				objots.setDepartment(objuser.getObjDoctor().getDepartmentName());
				if(objDept != null) {
					objots.setDepartment(objDept.getDepartmentName());
				}else {
					objots.setDepartment("-");
				}
				objots.setDoctor_type(objuser.getObjDoctor().getDoc_Type());
				objots.setContact_no(objuser.getObjDoctor().getMobileNo());
				objots.setEmail_id(objuser.getObjDoctor().getEmail_Id());
				objots.setDoctype(ots.getDoctype());
				objots.setUser_ID(objuser.getUser_ID());
				
				list.add(objots);
			}
			
			obj.setListTeamSlave(list);
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return obj;
	}
	
	@Override
	public List<ConductAnaesthesia> fetchAddConductAnaesthesia(String tretID,String anaesID)
	{
		String sql = "SELECT * FROM anaesthesia_conduct where Treatment_ID='"+tretID+"' order by idanaesthesia_conduct  desc ";

		List<ConductAnaesthesia> Conductanaesthesialist = new ArrayList<ConductAnaesthesia>();
//		List<Map<String, Object>> liAnaesthesiaHistoryMasterTemp = getJdbcTemplate()
//				.queryForList(sql, new Object[] { tretID });
		SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String, Object>> liAnaesthesiaHistoryMasterTemp = createSQLQuery.list();
		String datetostring = "";
		Date dateNow = null;
		for (Map rs : liAnaesthesiaHistoryMasterTemp) {
			ConductAnaesthesia objConductAnaesthesiaMaster = new ConductAnaesthesia();
			objConductAnaesthesiaMaster.setTreatment_ID((Integer) rs
					.get("Treatment_ID"));
			objConductAnaesthesiaMaster.setInduction((String) rs
					.get("induction"));
			objConductAnaesthesiaMaster
					.setRelaxant((String) rs.get("relaxant"));
			objConductAnaesthesiaMaster.setPostOPpulse((String) rs
					.get("postOPpulse"));
			objConductAnaesthesiaMaster
					.setPostOPbp((String) rs.get("postOPbp"));
			objConductAnaesthesiaMaster
					.setPostOPrr((String) rs.get("postOPrr"));
			objConductAnaesthesiaMaster.setPostOPcolor((String) rs
					.get("postOPcolor"));
			objConductAnaesthesiaMaster.setChk_anesthesia((String) rs
					.get("chkAnesthesia"));
			objConductAnaesthesiaMaster.setChkpostoperative((String) rs
					.get("chkPostOperative"));

			objConductAnaesthesiaMaster
					.setReversal((String) rs.get("reversal"));
			objConductAnaesthesiaMaster.setPreOfNotes((String) rs.get("pre_of_notes"));
			objConductAnaesthesiaMaster.setRemark((String) rs.get("remark"));
			objConductAnaesthesiaMaster.setApprovalStatus((String) rs.get("approval_status"));
			dateNow = ((Date) rs.get("Date"));
			SimpleDateFormat dateformatJava = new SimpleDateFormat("dd-MM-yyyy");
			if (dateNow != null) {
				datetostring = dateformatJava.format(dateNow);
			}
			objConductAnaesthesiaMaster.setDate((String) datetostring);

			/*
			 * String sqlSlave =
			 * "SELECT * FROM vital_sing where Treatment_ID='"+tretID+"' and status='Y' ";
			 * List<VitalSing> objVitalSing = new ArrayList<VitalSing>(); //List<Map<String,
			 * Object>> liVitalSingTemp = getJdbcTemplate() // .queryForList(sqlSlave, new
			 * Object[] { tretID });
			 * 
			 * SQLQuery createSQLQuery2 =
			 * sessionFactory.getCurrentSession().createSQLQuery(sqlSlave);
			 * createSQLQuery2.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * 
			 * List<Map<String, Object>> liVitalSingTemp = createSQLQuery2.list(); for (Map
			 * rs2 : liVitalSingTemp) { VitalSing objVitalSingSlave = new VitalSing();
			 * 
			 * objVitalSingSlave.setTtime((String) rs2.get("time"));
			 * objVitalSingSlave.setTpulse((String) rs2.get("tpulse"));
			 * objVitalSingSlave.setBps((String) rs2.get("bps"));
			 * objVitalSingSlave.setBpd((String) rs2.get("bpd"));
			 * objVitalSingSlave.setBpm((String) rs2.get("bpm"));
			 * objVitalSingSlave.setTrr((String) rs2.get("trr"));
			 * objVitalSingSlave.setEtco2((String) rs2.get("etco2"));
			 * objVitalSingSlave.setUo((String) rs2.get("uo"));
			 * objVitalSingSlave.setFluidone((String) rs2.get("fluidone"));
			 * objVitalSingSlave.setFluidtwo((String) rs2.get("fluidtwo"));
			 * objVitalSingSlave.setInfusion((String) rs2.get("infusion"));
			 * objVitalSingSlave.setBolus((String) rs2.get("bolus"));
			 * objVitalSingSlave.setEvent((String) rs2.get("event"));
			 * objVitalSingSlave.setEmpty((String) rs2.get("empty"));
			 * objVitalSingSlave.setSao2((String) rs2.get("sao2"));
			 * objVitalSingSlave.setIdvital_sing((Integer) rs2 .get("idvital_sing"));
			 * objVitalSing.add(objVitalSingSlave); int i; String sql2 = ""; String[] anesid
			 * = anaesID.split(","); List<Doctor> liDoctor = new ArrayList<Doctor>(); for (i
			 * = 0; i < anesid.length; i++) { sql2 =
			 * "SELECT doc_name,Doctor_ID FROM doctor WHERE Doctor_ID='" + anesid[i] + "'";
			 * try { //List<Map<String, Object>> doctorDetails = getJdbcTemplate()
			 * //.queryForList(sql);
			 * 
			 * SQLQuery createSQLQuery3 =
			 * sessionFactory.getCurrentSession().createSQLQuery(sql2);
			 * createSQLQuery3.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 * 
			 * List<Map<String, Object>> doctorDetails = createSQLQuery3.list();
			 * 
			 * for (Map rs1 : doctorDetails) { Doctor objDoctor = new Doctor();
			 * objDoctor.setDoc_name((String) rs1.get("doc_name"));
			 * objDoctor.setDoctor_ID((Integer) rs1 .get("Doctor_ID"));
			 * liDoctor.add(objDoctor); }
			 * objConductAnaesthesiaMaster.setDoctorlist(liDoctor); } catch (Exception e) {
			 * e.printStackTrace(); } } }
			 * objConductAnaesthesiaMaster.setVitalslavelist(objVitalSing);
			 */
			Conductanaesthesialist.add(objConductAnaesthesiaMaster);
		}
		return Conductanaesthesialist;
	}
	
	public double fetchOperationCount(Integer treatmentId, Integer categoryId,Integer topId,Integer patientId) { 
		int res = 0;
		int finalCount=0;
		int percentage=0;
		double finalAmount=0;
		double amount=0;
	try {
	       String sql ="Select  count(*) from treatment_operations where treatment_id="+treatmentId + " and unit_id="+1+" ";
	        Query q  =sessionFactory.getCurrentSession().createSQLQuery(sql);
	         res=((Number) q.uniqueResult()).intValue();
	         
	         TreatmentDto treatmentDto = (TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,treatmentId);
	         
	         
	         Criteria createCriteria = sessionFactory.getCurrentSession().createCriteria(TreatmentOperations.class);
	         createCriteria.add(Restrictions.eq("treatmentDto", treatmentDto));
	         createCriteria.add(Restrictions.eq("unitId", 1));
	         List<TreatmentOperations> list = createCriteria.list();
	         
	         
	         List<PtientOperation> patientOperationlist = new ArrayList<PtientOperation>();
	         for (TreatmentOperations treatmentOperations : list) {
	        	 
	        if(treatmentOperations.getId()==topId) { 
	        	 Criteria createCriteria2 = sessionFactory.getCurrentSession().createCriteria(PtientOperation.class);
	        	 createCriteria2.add(Restrictions.eq("treatmentOperationsManage", topId));
	        	 List<PtientOperation> pOperationlist = createCriteria2.list();
	        	 int countStep=1;
					for (int i = 0; i < pOperationlist.size(); i++) {
						
						
						
						String hallwisechargeOTAll = hallwisechargeOTAll(treatmentId, pOperationlist.get(i).getOperation_ID(), "hall",patientId);
					if(!hallwisechargeOTAll.equalsIgnoreCase("")) {
						amount = Double.parseDouble(hallwisechargeOTAll);
					}
					
					int percentageDetails = getPercentageDetails(categoryId, 1);
					
					
					
					if(percentageDetails!=0) {
						amount = amount*percentageDetails/100;
					}else {
						// added for if Ot services charges not configured set default charges
						String sql1 = "Select charges from ehat_subservice where id=" + categoryId;
						Query q1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
						double res1 = ((Double) q1.uniqueResult()).intValue();
						amount=res1;
					}
					
					
					
						Integer count = ((Number) sessionFactory.getCurrentSession().createSQLQuery("SELECT COUNT(*) "
								+ "FROM ehat_operationmaster where  step =" + countStep + " and unit=1 and status='N' ")
								.uniqueResult()).intValue();
					if(count!=0) {
						SQLQuery q7 = sessionFactory.getCurrentSession()
								.createSQLQuery("SELECT percentage FROM ehat_operationmaster where  step =" + countStep
										+ " and unit=" + 1 + " and status='N' ");
						percentage = ((Number) q7.uniqueResult()).intValue();
						
						finalAmount = finalAmount + amount*percentage/100;
					}
					else {
						finalAmount = finalAmount + amount;
					}
						countStep++;
					}
		    	
			}
	         }    
	       
	         // added for emergency charges
				SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss");
				Calendar calendar = Calendar.getInstance();
				String currentTime = dateFormat.format(calendar.getTime());
				System.out.println("currentTime==="+currentTime);
				
				String sqlEmergency = "SELECT if(operationTmForEmergeancyFrom > operationTmForEmergeancyTo,'Y','N') as count FROM hospitalaccinfo";
				String status = sessionFactory.getCurrentSession().createSQLQuery(sqlEmergency).uniqueResult().toString();
				
				if (status.equals("Y")) {
					// used sql query becz of where condition difficult to manage using hibernate
					// criteria
					sqlEmergency = "select count(*) from hospitalaccinfo where (CAST( '" + currentTime
							+ "' as time) >= operationTmForEmergeancyFrom or CAST( '" + currentTime
							+ "' as time) < operationTmForEmergeancyTo) ";

				} else {
					sqlEmergency = "select count(*) from hospitalaccinfo where CAST( '" + currentTime
							+ "' as time) BETWEEN CAST(operationTmForEmergeancyFrom as time) AND CAST(operationTmForEmergeancyTo as time)";
				}
				HospitalAccDetails listHospitalAccount = null;
				Integer emergencyTimeFlag = ((Number) sessionFactory.getCurrentSession().createSQLQuery(sqlEmergency).uniqueResult()).intValue();
				if (emergencyTimeFlag != 0) {
					listHospitalAccount = (HospitalAccDetails) sessionFactory.getCurrentSession().get(HospitalAccDetails.class, 1);
					float perAmt=listHospitalAccount.getOperationEmergencyCharges();
					finalAmount=finalAmount+(finalAmount/100)*perAmt;
				}
				// end for emergency charges

	         
		}catch (Exception e) {
			e.printStackTrace();
		}
		return finalAmount;
}
	
	
	//added by vishant
		@SuppressWarnings("unchecked")
		public String hallwisechargeOTAll(Integer trId,
				Integer scheduledProcedure, String callfrom,Integer patientId) {

			int count=0;
			String opcharge="";
			int charges_slave_id=0;
	       try {
	           // SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT  h.Htype from treatment_beds tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.Bed_ID  and   tb.Treatment_ID=? ");  
		     if(callfrom.equals("hall")){
		    	  	
		    	 	List<BillDetailsIpdDto> list = sessionFactory.getCurrentSession().createCriteria(BillDetailsIpdDto.class).
		    	 	add(Restrictions.eq("treatmentId",trId)).list();
		    	 	charges_slave_id = list.get(0).getChargesSlaveId();
		    	 	
					
		    	 	if(charges_slave_id !=0)
					{		 
		    	 		int wardId = ((Number) sessionFactory.getCurrentSession().createSQLQuery(
		    	 			    "SELECT IFNULL((SELECT selfid FROM ehat_charges_master_slave WHERE ehat_charges_master_slave.id = beds.Hall_ID LIMIT 1), 0) AS ward_id " +
		    	 			    "FROM ehat_patient p " +
		    	 			    "JOIN ehat_treatment t ON p.patient_id = t.patient_id " +
		    	 			    "JOIN ehat_bill_master x ON t.treatment_id = x.treatment_id " +
		    	 			    "JOIN ehat_bill_details_ipd ON t.treatment_id = ehat_bill_details_ipd.treatment_id " +
		    	 			    "JOIN beds ON ehat_bill_details_ipd.sub_service_id = beds.Bed_ID AND ehat_bill_details_ipd.deleted = 'N' " +
		    	 			    "JOIN ehat_service_master ON ehat_bill_details_ipd.service_id = ehat_service_master.service_id " +
		    	 			    "LEFT JOIN ehat_charges_master_slave cm ON x.charges_master_slave_id = cm.id " +
		    	 			    "WHERE t.t_flag = 'Y' " +
		    	 			    "AND p.deleted = 'N' " +
		    	 			    "AND t.department_id = 2 " +
		    	 			    "AND ehat_bill_details_ipd.deleted = 'N' " +
		    	 			    "AND ehat_bill_details_ipd.on_bed_flag = 'Y' " +
		    	 			    "AND t.treatment_id ="+ trId +
		    	 			    " GROUP BY t.treatment_id, x.charges_master_slave_id, beds.Hall_ID;").uniqueResult()).intValue();

		    	 		
		    	 		
						int cnt = ((Number) sessionFactory.getCurrentSession().createSQLQuery(
								"select count(*) from operationchargehallwise where sponser_id=" + charges_slave_id+" and halltypeid=" +wardId)
								.uniqueResult()).intValue();

						if (cnt == 0) {
							charges_slave_id = ((Number) sessionFactory.getCurrentSession()
									.createSQLQuery(
											"select selfId from ehat_charges_master_slave where id=" + charges_slave_id)
									.uniqueResult()).intValue();
						}
					}
					
					
					 
		    	 	
					/*
					 * int count2 = ((Number) sessionFactory.getCurrentSession().
					 * createSQLQuery("select count(*) from ehat_multiple_sponsor where patient_id="
					 * +patientId).uniqueResult()).intValue(); if(count2!=0) { charges_slave_id =
					 * ((Number) sessionFactory.getCurrentSession().
					 * createSQLQuery("select charges_slave_id from ehat_multiple_sponsor where patient_id="
					 * +patientId).uniqueResult()).intValue(); }
					 */
		    	 	
		    		String opid =  "";
		    		String pId =  "";
		    		ResourceBundle bundle = ResourceBundle.getBundle("hospitalaccess");
		    		String hospitalName = bundle.getObject("hospitalname").toString();
					if (hospitalName.equalsIgnoreCase("Siddhivinayak")) {
						
						
			            //SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT  h.Htype from ehat_bill_details_ipd tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id="+ trId +" and tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");
			    		SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
			    				 + " AND tb.treatment_id = "+trId+" AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
			    		List<Integer> Hall_ID =  q.list();
			    		StringJoiner sb = new StringJoiner(",");
						if (Hall_ID.size() > 0) {
							for (Integer objArr : Hall_ID) {
					        	sb.add(String.valueOf(objArr));
					        }
						}
			    		//Object[] Hall_ID=result.get(0);
			            if(scheduledProcedure>0){
			            	SQLQuery q1 = null;
			            	
			            	String sql="SELECT opgrade,opstate FROM  operation where Operation_id="+ scheduledProcedure +" and status='Y' ";
			    			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			    			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			    		    List<Map<String, Object>> data = query.list();
			    		    for(Map<String, Object> row : data){
			    		    	pId = (String)row.get("opgrade");
			    		    	opid = (String)row.get("opstate");
			    		    }	
			    		    String query1 = "SELECT surgeoncharge FROM operationchargehallwise WHERE halltypeid IN("+ sb.toString() 
									+") AND operationCatId ="+pId 
									+" AND operation_id ="+ opid +" AND sponser_id ="+ charges_slave_id;
			            	Query q2= sessionFactory.getCurrentSession().createSQLQuery(query1);
			    		  

							List<Float>  list2= q2.list();
							Float surgeoncharge = list2.stream().max(Comparator.naturalOrder()).get();
					        
						      //Float surgeoncharge=(Float) q1.uniqueResult(); 
						      if(surgeoncharge ==null){
						    	  surgeoncharge = (float) 0.0;
						      }
						      opcharge =Float.toString( surgeoncharge);
			            }
					
						

					}else {	
		            //SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT  h.Htype from ehat_bill_details_ipd tb,beds bd, hall h where  h.Hall_ID = bd.Hall_ID   and  bd.Bed_ID=tb.sub_service_id  and   tb.treatment_id="+ trId +" and tb.on_bed_flag='Y' and tb.service_id="+ 3 +" ");
		    		SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery("SELECT h.selfId FROM ehat_bill_details_ipd tb, beds bd, ehat_charges_master_slave h WHERE h.id = bd.Hall_ID AND bd.Bed_ID = tb.sub_service_id "
		    				 + " AND tb.treatment_id = "+trId+" AND tb.on_bed_flag = 'Y' AND tb.service_id = 3 AND tb.sub_service_id > 0 ");
		            int Hall_ID= (Integer) q.uniqueResult(); 
		            if(scheduledProcedure>0){
		            	SQLQuery q1 = null;
		            	
		            	String sql="SELECT opgrade,opstate FROM  operation where Operation_id="+ scheduledProcedure +" and status='Y' ";
		    			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
		    			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		    		    List<Map<String, Object>> data = query.list();
		    		    for(Map<String, Object> row : data){
		    		    	pId = (String)row.get("opgrade");
		    		    	opid = (String)row.get("opstate");
		    		    }	

		            	q1=sessionFactory.getCurrentSession().createSQLQuery("SELECT surgeoncharge from operationchargehallwise  where  halltypeid=? and   operationCatId=? and operation_id=?  and sponser_id=?");  
				        q1.setParameter(0,Hall_ID); 
				        q1.setParameter(1,Integer.parseInt(pId) );
				        q1.setParameter(2,Integer.parseInt(opid));	
				        q1.setParameter(3,charges_slave_id);	
				        
					      Float surgeoncharge=(Float) q1.uniqueResult(); 
					      if(surgeoncharge ==null){
					    	  surgeoncharge = (float) 0.0;
					      }
					      opcharge =Float.toString( surgeoncharge);
		            }
				}
		     }
	           
			
				
			
			 
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return opcharge;
		}

		public int getPercentageDetails(int subserviceId, int unitId) {
			 int res=0;
			try {
				       String sql ="Select  percentage as percentage from ehat_otpercentageconfiguration where confugration_flag='N' and childsubservice_id="+subserviceId+" ";
				        SQLQuery q  =sessionFactory.getCurrentSession().createSQLQuery(sql);
				         res=(int) q.uniqueResult();
				       
			   }catch (Exception e) {
				e.printStackTrace();
			}
			return res;
		}
		
		public List<OTPercentageDTO> fetchOTPercentage() {
			// TODO Auto-generated method stub
			int count=0;
			Query query = sessionFactory.getCurrentSession().createQuery("from OTPercentageDTO p where p.confugrationflag = :confugrationflag").setString("confugrationflag", "N"); 
			List<OTPercentageDTO> list = query.list();
			for(OTPercentageDTO list1 : list){
				String Subservicesname = (String) sessionFactory.getCurrentSession().createQuery("select e.categoryName from SubServiceDto e where e.subId = :id").setInteger("id",list1.getChildSubServiceId()).uniqueResult();
				list.get(count).setSubservicesname(Subservicesname);
			count++;
			}
			return list;

		}
		
		@SuppressWarnings("unchecked")
		@Override
		public List<PreAnaesthetic> fetchAnaestheticDetails(String treatmentID) {
			
			try {
				List<PreAnaesthetic> list = sessionFactory.getCurrentSession().createCriteria(PreAnaesthetic.class)
				.add(Restrictions.eq("tretID", treatmentID)).list();
				return list;
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			return null;
		}

		@Override
		public List<ChargesMasterSlave> getSubChargesById(Integer masterId, Integer selfId) {
		    Session session = sessionFactory.getCurrentSession();
		    String query = "from ChargesMasterSlave c "
		        + "where c.deleted = :deleted "
		        + "and c.selfId = :masterId "
		        + "and c.isCategory = :isCategory";
		    Query hqlQuery = session.createQuery(query);
		    hqlQuery.setParameter("deleted", "N");
		    hqlQuery.setParameter("masterId", masterId);
		    hqlQuery.setParameter("isCategory", "N");
		    List<ChargesMasterSlave> subCharges = hqlQuery.list();
		    return subCharges;
		}

		@Override
		public ChargesMasterDto fetchServiceListCom(HttpServletRequest request) {

			ChargesMasterDto objService = new ChargesMasterDto();
			try {
				List<ChargesMasterDto> ltServiceMasters = null;
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(ChargesMasterDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.addOrder(Order.desc("serviceId"));
				//criteria.setMaxResults(10);
				ltServiceMasters = criteria.list();

				objService.setLstCharges(ltServiceMasters);

			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return objService;
		}

		@Override
		@Transactional
		public ChartReport defaultOTVitalsView2(String cType, String tomId, String tretId, String defaultDate) {ChartReport ChartLi = new ChartReport();
		String sql = "select * from chart_slave where status='Y' and cType=" + cType;
		
		SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String, Object>> chartDetails = createSQLQuery.list();
				
		ChartLi = fetchOTVitalsDetails2(chartDetails, defaultDate, tretId , tomId);
		return ChartLi;
		}
		
		@Transactional
		@SuppressWarnings("unchecked")
		private ChartReport fetchOTVitalsDetails2(List<Map<String, Object>> chartDetails, String date, String tid ,String tomId) {
			List<ComplaintsDTO> otSlaveList = new ArrayList<ComplaintsDTO>();
			List<Operation> chartNameList = new ArrayList<Operation>();
			ComplaintsDTO objChartReport =null;
			Operation operation = null;
			ChartReport chartReport = new ChartReport();
			for (Map<String, Object> rs : chartDetails) {
				operation = new Operation();
				operation.setStatus((String) rs.get("cName"));
				operation.setToId((Integer) rs.get("idchart_slave"));
				chartNameList.add(operation);
			}
			String sql= "SELECT chart.cName,evm.id_ot_vital_master,evm.date,evm.status,evm.time,evm.treatmentOperationsManageID,evm.treatment_id,evm.type,\n" + 
					"    evs.idehat_ot_vital_slave,evs.idchart_slave,evs.vitals_value FROM  ehat_ot_vital_master evm right join ehat_ot_vital_slave evs ON evm.id_ot_vital_master = evs.id_ot_vital_master"
						+" left join chart_slave chart on (chart.idchart_slave=evs.idchart_slave)"
						+" where treatment_id= "+tid+" and treatmentOperationsManageID ="+tomId;
			
			SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			createSQLQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> vitalsDetails = createSQLQuery.list();
					
					//getJdbcTemplate().queryForList(sql);
			for (Map<?,?> rs1 : vitalsDetails) {
				objChartReport = new ComplaintsDTO();
				//objChartReport.setTreatment_ID((Integer) rs1.get("treatment_id"));
				objChartReport.setIdcomplaintMaser((Integer) rs1.get("id_ot_vital_master"));
				objChartReport.setCommentType((String) rs1.get("type"));
				objChartReport.setDate((String) rs1.get("date"));
				objChartReport.setTime((String) rs1.get("time"));
				
				//set temprory to chart name into login username 
				objChartReport.setLoginUserId((Integer) rs1.get("idchart_slave"));
				objChartReport.setLoginUserName((String) rs1.get("cName"));
				objChartReport.setStatus((String) rs1.get("vitals_value"));
				otSlaveList.add(objChartReport);
			}
			chartReport.setListOtSlaveList(chartNameList);
			chartReport.setListChartSlave(otSlaveList);
			
			return chartReport;
		}

		@Override
		public Integer getPrevOperationCount() {
			// TODO Auto-generated method stub
			
			Integer result = 0;
			try {

				String sql = " SELECT 	" + 
						"    COUNT(DISTINCT t.treatment_id)		" + 
						"FROM		" + 
						"    ehat_patient p,		" + 
						"    ehat_treatment t,	" + 
						"    treatment_operations trop,	" + 
						"    treatmentoperationsmanage tom	" + 
						"WHERE	" + 
						"    p.patient_id = t.patient_id	" + 
						"        AND trop.treatment_id = t.Treatment_ID		" + 
						"        AND trop.opStatus = 'Y'	" + 
						"        AND tom.treatmentOperationsID = trop.ID	" + 
						"        AND t.t_flag = 'N'		";
				SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
				result = ((Number) sqlcount.uniqueResult()).intValue();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			return result;
		}

		@Override
		@Transactional
		public List<Doctor> getPatientOperationDoctors(int operationManageId) {
			
			String sql = "";
			List<Doctor> Opdoclist = new ArrayList<>();
			List<Doctor> doclist = new ArrayList<>();
			try {
				@SuppressWarnings("unchecked")
				List<OperationDocTbl> operationDocList = sessionFactory.getCurrentSession()
				    .createQuery("FROM OperationDocTbl WHERE idtreatmentOperationManage = :operationManageId")
				    .setParameter("operationManageId", operationManageId)
				    .list();

				for (OperationDocTbl operationDocInstance : operationDocList) {
					String docName = operationDocInstance.getDocName();

					sql = "SELECT d.Doctor_ID,d.User_ID,d.doc_name,d.mobileNo,d.email_Id, "
							+ "IF(d.department = '0', '-', (Select department_name from hospital_departments where idhospital_departments = d.department)) department_name, "
							+ "IF(d.specialisation = '0', '-', hs.specialization_name) specialization_name, "
							+ "IF(d.speciality = '0', '-', (Select spl_name from doctor_specilities where iddoctor_specilities = d.speciality)) spl_name "
							+ "FROM doctor d LEFT JOIN hospital_specialization hs ON FIND_IN_SET(hs.idhospital_Specialization, REPLACE(d.specialisation, ' ', '')) > 0"
							+ " where   d.status='Y' and (d.doc_name like '%" + docName
							+ "%' ) order by doc_name ASC";
					
					SQLQuery getOpPatient = sessionFactory.getCurrentSession().createSQLQuery(sql);
					getOpPatient.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					@SuppressWarnings("unchecked")
					List<Map<String, Object>> doctorDetails = getOpPatient.list();
					Opdoclist = fetchdoctorDetails(doctorDetails);
					doclist.addAll(Opdoclist);
					
				}
				
				

			} catch (HibernateException e) {
				e.printStackTrace();
			}
			return doclist;

		}
		
		
		@Override
		public OTNotesFetchOperationDto getOtNotesDataByOtId(int otNotesId, String callFrom) {
			// TODO Auto-generated method stub
			
			OTNotesFetchOperationDto OTNotes = new OTNotesFetchOperationDto();
			List<OTNotesFetchOperationDto> otNotesdto= new ArrayList<OTNotesFetchOperationDto>();
			
		try {
			String sql="";
			
			sql ="select * from ehat_otoperationnotes where idehat_OTOperationNotes="+otNotesId;
			
			Query OtNotesResQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
			
			OtNotesResQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listOTNotes = OtNotesResQuery.list();
	         for (Map<String, Object> row : listOTNotes) {

	        	 OTNotesFetchOperationDto obj = new OTNotesFetchOperationDto();

				obj.setIdOTOPNotes((Integer) row.get("idehat_OTOperationNotes"));
				obj.setTomID((Integer) row.get("treatmentOperationsManageID"));
				obj.setEstimatedBLoodLoss((String) row.get("estimatedBLoodLoss"));
				obj.setActualBLoodLoss((String) row.get("actualBloodLoss"));
				obj.setInstrumentCount((Integer) row.get("instrumentCount"));
				obj.setRecordedBy((String) row.get("recordedBy"));
				obj.setMopCountRecordedBy((String) row.get("mopCountRecordedBy"));
				obj.setComment((String) row.get("comment"));
				obj.setTemplateID((Integer) row.get("templateID"));
				obj.setChkData((String) row.get("chkEditerdata"));
				obj.setImplantdetails((String) row.get("implantDetails"));
				obj.setUpdatedDateTime((String) row.get("updatedTime"));
				
				
				otNotesdto.add(obj);
			
	         }
	         OTNotes.setListOTNotes(otNotesdto);

			} catch (Exception e) {

				e.printStackTrace();

				return null;

			}
				return OTNotes;
						
		}


}
