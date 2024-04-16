package com.hms.users.serviceimpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.accessmanagement.controller.UserAccessManagementController;
import com.hms.accessmanagement.service.NewUserAccessService;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.dto.Doctor;
import com.hms.dto.ModuleMasterDto;
import com.hms.dto.NewUserAccessDto;
import com.hms.dto.Users;
import com.hms.ehat.dto.DocTypDto;
import com.hms.ehat.dto.LoginHistory;
import com.hms.rostermanagement.dto.NA;
import com.hms.users.dao.UsersDao;
import com.hms.users.service.UsersService;
import com.hms.utility.ApplicationContextUtils;

@Service
public class UsersServiceImpl implements UsersService {

	@Autowired
	UsersDao usersDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public int saveUser(Users Users, Doctor doctorDetails, HttpServletRequest request) {
		int response = 0;
		Session session1 = sessionFactory.getCurrentSession();
		String DoctorType=Users.getDoctorTypeIdList();
		DocTypDto  specializationDto=new DocTypDto();
		
		String Doctorname1 = "";
		
		Integer DoctypeTypeInteger = Integer.parseInt(DoctorType);
		
		if(DoctorType.equalsIgnoreCase("0") || DoctypeTypeInteger.equals(0) || DoctorType.equalsIgnoreCase("null")) {
			Users.setDoctorTypeIdList("0");
			
		}else {
			
			specializationDto = (DocTypDto) session1.get(DocTypDto.class, Integer.parseInt(Users.getDoctorTypeIdList()));
		       
		    Doctorname1=specializationDto.getDoctypeName();
		}
		
		if (doctorDetails.getDoctor_ID() == 0) {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			doctorDetails.setCreatedBy(userId);
			doctorDetails.setCreatedDate(new Date(new java.util.Date().getTime()));
			Users.setCreatedBy(userId);
			Users.setCreatedDate(new Date(new java.util.Date().getTime()));
			doctorDetails.setUserDetails(Users);
	  //   doctorDetails.setSpecializationName(specializationDto.getDoctypeName());
			 doctorDetails.setDoc_Type(Users.getUser_Type());
		
	       
	       
	  //     if(Doctorname1.equalsIgnoreCase("")) {
	    	   doctorDetails.setSpecializationName(doctorDetails.getSpecializationName());
	 //     } else {
	 //		       doctorDetails.setSpecializationName(specializationDto.getDoctypeName());
	 //	       }
	    
	
			response = usersDao.saveUser(doctorDetails, request);

		} else {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			doctorDetails.setCreatedBy(userId);
			doctorDetails.setCreatedDate(new Date(new java.util.Date().getTime()));
			Users.setCreatedBy(userId);
			Users.setCreatedDate(new Date(new java.util.Date().getTime()));
			doctorDetails.setUserDetails(Users);
			//doctorDetails.setSpecializationName(specializationDto.getDoctypeName());
			doctorDetails.setSpecializationName(doctorDetails.getSpecializationName());
			response = usersDao.saveUser(doctorDetails, request);
		}
		return response;
	}

	@Override
	@Transactional
	public List<Users> getUsersList(Integer startIndex) {
		return usersDao.getUsersList(startIndex);
	}

	@Override
	@Transactional
	public List<Users> getUsersListByUserName(String userName) {
		return usersDao.getUsersListByUserName(userName);
	}

	@Override
	@Transactional
	public List<Users> getUsersListByUserId(String userId) {
		return usersDao.getUsersListByUserId(userId);
	}

	@Override
	@Transactional
	public void updateUsers(Users Users, Doctor doctorDetails, HttpServletRequest request) {
		usersDao.updateUsers(Users, doctorDetails, request);
	}

	@Override
	@Transactional
	public boolean deleteUsers(Integer userId) {
		return usersDao.deleteUsers(userId);
	}

	@Override
	@Transactional
	public Users getUsersByUserId(Integer userId) {
		return usersDao.getUsersByUserId(userId);
	}

	@Override
	@Transactional
	public Doctor getDoctorDetails(Integer userId) {
		return usersDao.getDoctorDetails(userId);
	}

	@Override
	@Transactional
	public Users checkUserLogin(String userName, String password, String unitId, String unitName,
			HttpServletRequest request, HttpServletResponse response) {

		Users obj = usersDao.checkUserLogin(userName,password,Integer.parseInt(unitId));
	//	System.err.println(obj.toString());
		//if((obj.getUsersList() != null)){		
		if((obj.getUsersList() != null) && !obj.getUsersList().equals(" ") && obj.getUsersList().size() > 0){   // change by ROhini Ambhore for case sensitive login.

			String uId = unitId;//request.getParameter("uId");
			String uname = unitName;//request.getParameter("uname");

			if (null != userName && null != password && null != uId) {

				//String userId = String.valueOf(obj.getUsersList().get(0).getUserid());
				//List<Users> userList = getUsersListByUserId(userId);
				String sqlRef="select concat(LPAD(state_id, 2, 0),LPAD(district_id, 2, 0),type_name,year) " + 
						" As center_patient_id from ehat_unit_master where deleted='N' and unit_id = "+uId;
				Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlRef);
				String UHPrefix = (String)refQuery.uniqueResult();
				
				obj.setObjDoctor(obj.getUsersList().get(0).getObjDoctor());
				Users user = obj.getUsersList().get(0);
				try {
					try {
						if (null != user && userName.equalsIgnoreCase(user.getUser_Name()) && password.equalsIgnoreCase((user.getPassword()))) {
							
							ResourceBundle hospitalAccess = ResourceBundle.getBundle("hospitalaccess");
							String expriryDateForLogin = (String)hospitalAccess.getString("expriryDateForLogin");   
							
							// Check Software Validation
							Calendar calendar = Calendar.getInstance();
							SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
							String todays_date = formatter.format(calendar.getTime());
							SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
							Date date1 = sdf.parse(todays_date);
							//Date date2 = sdf.parse("2023-12-28");
							Date date2 = sdf.parse(expriryDateForLogin);
							
							if (date1.before(date2)) {

								if(user.getSoftwareUsed().equals("Y")){

									UserAccessManagementController userAccessManagementController= (ApplicationContextUtils.getApplicationContext()).getBean(UserAccessManagementController.class);
									JSONObject jsonObject = userAccessManagementController.getUser(Integer.toString(user.getUser_ID()), request);
									String loginHistoryId = userAccessManagementController.saveLoginHistory(Integer.toString(user.getUser_ID()), request);
									
									
									HttpSession session = request.getSession(true);
									
									NewUserAccessService fetchSubModules = (ApplicationContextUtils.getApplicationContext()).getBean(NewUserAccessService.class);
									
									ModuleMasterDto objModileDto = fetchSubModules.getModuleList();
									session.setAttribute("moduleListObj", objModileDto);
									
									NewUserAccessDto objDto = fetchSubModules.getUserAccess(0);
									session.setAttribute("currentPageIdListObj", objDto);
									
									
									String privilegeType = (String)jsonObject.get("privilegeType");
									String moduleViewAccessIds = null;
									HashSet<String> moduleViewHashSet = new HashSet<String>();
									HashSet<String> moduleEditHashSet = new HashSet<String>();
									HashSet<String> moduleDeleteHashSet = new HashSet<String>();
									HashSet<String> subModuleViewHashSet = new HashSet<String>();
									HashSet<String> subModuleEditHashSet = new HashSet<String>();
									HashSet<String> subModuleDeleteHashSet = new HashSet<String>();
									HashSet<String> subModuleOnOffHashSet = new HashSet<String>();

									if(privilegeType.equals("3")){

										JSONArray roleAccessArray = userAccessManagementController.getRoleAccessByRole((String)jsonObject.get("roleId"));
										for(int i=0;i<roleAccessArray.size();i++){

											JSONObject jsonObject2 = (JSONObject) roleAccessArray.get(i);

											String moduleView = (String) jsonObject2.get("userModuleAccessView");
											if(moduleView!=null && moduleView!=""){
												String[] moduleViewSplit = moduleView.split(",");
												for(int j=0;j<moduleViewSplit.length;j++){
													moduleViewHashSet.add(moduleViewSplit[j]);
												}
												moduleViewAccessIds = moduleView;
											}

											String moduleEdit = (String) jsonObject2.get("userModuleAccessEdit");
											if(moduleEdit!=null && moduleEdit!=""){
												String[] moduleEditSplit = moduleEdit.split(",");
												for(int j=0;j<moduleEditSplit.length;j++){
													moduleEditHashSet.add(moduleEditSplit[j]);
												}
											}

											String moduleDelete = (String) jsonObject2.get("userModuleAccessDelete");
												if(moduleDelete!=null && moduleDelete!=""){
												String[] moduleDeleteSplit = moduleDelete.split(",");
												for(int j=0;j<moduleDeleteSplit.length;j++){
													moduleDeleteHashSet.add(moduleDeleteSplit[j]);
												}
											}

											String subModuleView = (String) jsonObject2.get("userSubModuleAccessView");
												if(subModuleView!=null && subModuleView!=""){
												String[] subModuleViewSplit = subModuleView.split(",");
												for(int j=0;j<subModuleViewSplit.length;j++){
													subModuleViewHashSet.add(subModuleViewSplit[j]);
												}
											}

											String subModuleEdit = (String) jsonObject2.get("userSubModuleAccessEdit");
												if(subModuleEdit!=null && subModuleEdit!=""){
												String[] subModuleEditSplit = subModuleEdit.split(",");
												for(int j=0;j<subModuleEditSplit.length;j++){
													subModuleEditHashSet.add(subModuleEditSplit[j]);
												}
											}

											String subModuleDelete = (String) jsonObject2.get("userSubModuleAccessDelete");
												if(subModuleDelete!=null && subModuleDelete!=""){
												String[] subModuleDeleteSplit = subModuleDelete.split(",");
												for(int j=0;j<subModuleDeleteSplit.length;j++){
													subModuleDeleteHashSet.add(subModuleDeleteSplit[j]);
												}
											}

											String subModuleOnOff = (String) jsonObject2.get("userSubModuleAccessOnOff");
												if(subModuleOnOff!=null && subModuleOnOff!=""){
												String[] subModuleOnOffSplit = subModuleOnOff.split(",");
												for(int j=0;j<subModuleOnOffSplit.length;j++){
													subModuleOnOffHashSet.add(subModuleOnOffSplit[j]);
												}
											}

										}
									}
									else if(privilegeType.equals("1")){
										JSONArray profileAccessArray = userAccessManagementController.getProfileAccessByProfile((String)jsonObject.get("profileId"));
										for(int i=0;i<profileAccessArray.size();i++){
											JSONObject jsonObject2 = (JSONObject) profileAccessArray.get(i);

											String moduleView = (String) jsonObject2.get("userModuleAccessView");
											if(moduleView!=null && moduleView!=""){
												String[] moduleViewSplit = moduleView.split(",");
												for(int j=0;j<moduleViewSplit.length;j++){
													moduleViewHashSet.add(moduleViewSplit[j]);
												}
												moduleViewAccessIds = moduleView;
											}

											String moduleEdit = (String) jsonObject2.get("userModuleAccessEdit");
											if(moduleEdit!=null && moduleEdit!=""){
												String[] moduleEditSplit = moduleEdit.split(",");
												for(int j=0;j<moduleEditSplit.length;j++){
													moduleEditHashSet.add(moduleEditSplit[j]);
												}
											}

											String moduleDelete = (String) jsonObject2.get("userModuleAccessDelete");
											if(moduleDelete!=null && moduleDelete!=""){
												String[] moduleDeleteSplit = moduleDelete.split(",");
												for(int j=0;j<moduleDeleteSplit.length;j++){
													moduleDeleteHashSet.add(moduleDeleteSplit[j]);
												}
											}

											String subModuleView = (String) jsonObject2.get("userSubModuleAccessView");
											if(subModuleView!=null && subModuleView!=""){
												String[] subModuleViewSplit = subModuleView.split(",");
												for(int j=0;j<subModuleViewSplit.length;j++){
													subModuleViewHashSet.add(subModuleViewSplit[j]);
												}
											}

											String subModuleEdit = (String) jsonObject2.get("userSubModuleAccessEdit");
											if(subModuleEdit!=null && subModuleEdit!=""){
												String[] subModuleEditSplit = subModuleEdit.split(",");
												for(int j=0;j<subModuleEditSplit.length;j++){
													subModuleEditHashSet.add(subModuleEditSplit[j]);
												}
											}

											String subModuleDelete = (String) jsonObject2.get("userSubModuleAccessDelete");
											if(subModuleDelete!=null && subModuleDelete!=""){
												String[] subModuleDeleteSplit = subModuleDelete.split(",");
												for(int j=0;j<subModuleDeleteSplit.length;j++){
													subModuleDeleteHashSet.add(subModuleDeleteSplit[j]);
												}
											}

											String subModuleOnOff = (String) jsonObject2.get("userSubModuleAccessOnOff");
											if(subModuleOnOff!=null && subModuleOnOff!=""){
												String[] subModuleOnOffSplit = subModuleOnOff.split(",");
												for(int j=0;j<subModuleOnOffSplit.length;j++){
													subModuleOnOffHashSet.add(subModuleOnOffSplit[j]);
												}
											}

										}
									}
									else if(privilegeType.equals("2")){
										JSONObject jsonObject2 = jsonObject;

										String moduleView = (String) jsonObject2.get("userModuleAccessView");
										if(moduleView!=null && moduleView!=""){
											String[] moduleViewSplit = moduleView.split(",");
											for(int j=0;j<moduleViewSplit.length;j++){
												moduleViewHashSet.add(moduleViewSplit[j]);
											}
											moduleViewAccessIds = moduleView;
										}

										String moduleEdit = (String) jsonObject2.get("userModuleAccessEdit");
										if(moduleEdit!=null && moduleEdit!=""){
											String[] moduleEditSplit = moduleEdit.split(",");
											for(int j=0;j<moduleEditSplit.length;j++){
												moduleEditHashSet.add(moduleEditSplit[j]);
											}
										}

										String moduleDelete = (String) jsonObject2.get("userModuleAccessDelete");
										if(moduleDelete!=null && moduleDelete!=""){
											String[] moduleDeleteSplit = moduleDelete.split(",");
											for(int j=0;j<moduleDeleteSplit.length;j++){
												moduleDeleteHashSet.add(moduleDeleteSplit[j]);
											}
										}

										String subModuleView = (String) jsonObject2.get("userSubModuleAccessView");
										if(subModuleView!=null && subModuleView!=""){
											String[] subModuleViewSplit = subModuleView.split(",");
											for(int j=0;j<subModuleViewSplit.length;j++){
												subModuleViewHashSet.add(subModuleViewSplit[j]);
											}
										}

										String subModuleEdit = (String) jsonObject2.get("userSubModuleAccessEdit");
										if(subModuleEdit!=null && subModuleEdit!=""){
											String[] subModuleEditSplit = subModuleEdit.split(",");
											for(int j=0;j<subModuleEditSplit.length;j++){
												subModuleEditHashSet.add(subModuleEditSplit[j]);
											}
										}

										String subModuleDelete = (String) jsonObject2.get("userSubModuleAccessDelete");
										if(subModuleDelete!=null && subModuleDelete!=""){
											String[] subModuleDeleteSplit = subModuleDelete.split(",");
											for(int j=0;j<subModuleDeleteSplit.length;j++){
												subModuleDeleteHashSet.add(subModuleDeleteSplit[j]);
											}
										}

										String subModuleOnOff = (String) jsonObject2.get("userSubModuleAccessOnOff");
										if(subModuleOnOff!=null && subModuleOnOff!=""){
											String[] subModuleOnOffSplit = subModuleOnOff.split(",");
											for(int j=0;j<subModuleOnOffSplit.length;j++){
												subModuleOnOffHashSet.add(subModuleOnOffSplit[j]);
											}
										}
									}

									JSONObject showAccessObject = userAccessManagementController.showAccess(subModuleViewHashSet.toString()+","+subModuleEditHashSet.toString()+","+subModuleDeleteHashSet.toString()+","+subModuleOnOffHashSet.toString());
									String moduleView = (String) showAccessObject.get("moduleView");
									String subModuleView = (String) showAccessObject.get("subModuleView");

									if(moduleView!=null && moduleView!=""){
										String[] moduleViewSplit = moduleView.split(",");
										for(int j=0;j<moduleViewSplit.length;j++){
											moduleViewHashSet.add(moduleViewSplit[j]);
										}
									}
									if(subModuleView!=null && subModuleView!=""){
										String[] subModuleViewSplit = subModuleView.split(",");
										for(int j=0;j<subModuleViewSplit.length;j++){
											subModuleViewHashSet.add(subModuleViewSplit[j]);
										}
									}

								//	HttpSession session = request.getSession(true);
									session.setAttribute("moduleViewAccessIds",moduleViewAccessIds);
									session.setAttribute("moduleViewHashSet",moduleViewHashSet);
									session.setAttribute("moduleEditHashSet",moduleEditHashSet);
									session.setAttribute("moduleDeleteHashSet",moduleDeleteHashSet);
									session.setAttribute("subModuleViewHashSet",subModuleViewHashSet);
									session.setAttribute("subModuleEditHashSet",subModuleEditHashSet);
									session.setAttribute("subModuleDeleteHashSet",subModuleDeleteHashSet);
									session.setAttribute("subModuleOnOffHashSet",subModuleOnOffHashSet);
									session.setAttribute("loginHistoryId", loginHistoryId);
									session.setAttribute("currentPageId", "0");
									session.setAttribute("userId1", user.getUser_ID());
									session.setAttribute("userId", user.getObjDoctor().getDoctor_ID());
									session.setAttribute("UHPrefix", UHPrefix);
									session.setAttribute("userName", user.getUser_Name());
									session.setAttribute("userLoginName", user.getUser_Name());
									session.setAttribute("userType", user.getUser_Type());
									session.setAttribute("userPassword", user.getPassword());
									session.setAttribute("specialisationName", user.getObjDoctor().getSpecializationName());
									session.setAttribute("qualification", user.getObjDoctor().getQualification());
									session.setAttribute("designation", user.getObjDoctor().getDesignation());
									session.setAttribute("regNo", user.getObjDoctor().getRegNo());
									
									session.setAttribute("doctorId", user.getObjDoctor().getDoctor_ID());
									
									Integer hospitalState = usersDao.getHospitalId( unitId,request);
									session.setAttribute("userState", hospitalState);

									int uID=Integer.parseInt(uId);
									
									// fetch hospital details added by vishant
									HospitalDetails hospitalByUnitId = usersDao.getHospitalByUnitId(uID);
									if(hospitalByUnitId != null) {										
									
										session.setAttribute("hospitalName", hospitalByUnitId.getHospitalName());
										session.setAttribute("hospitalHIPUnitId","HMIS-"+hospitalByUnitId.getHospitalUnitId());
									}else {
										
										session.setAttribute("hospitalName", "-");
										session.setAttribute("hospitalHIPUnitId","0");
									}
									
									session.setAttribute("uId", uID);
									session.setAttribute("uname", uname);
									
									session.setAttribute("userCustomerType", "0");
									session.setAttribute("userCustomerId", "0");
									session.setAttribute("userInhouseId", "0");
									session.setAttribute("userUnitId", user.getMulSelunit());
									session.setAttribute("userCustomerList", "");
									session.setAttribute("collectedAt", "");
									session.setAttribute("userFor", "other");
									
									session.setAttribute("signOne", "");
									session.setAttribute("signOneDoctor", "");
									session.setAttribute("signTwo", "");
									session.setAttribute("signTwoDoctor", "");

									//AccessMgmtController accessMgmtController = (ApplicationContextUtils.getApplicationContext()).getBean(AccessMgmtController.class);
									//accessMgmtController.setUserAccessSession(request, response);

									obj.setLogedInStatus("dashboard1.jsp");

									/*if(onlyForHealthBayFlow.equalsIgnoreCase("on")){
										response.getWriter().write("Dashboard1.jsp");
									}else{
										response.getWriter().write("Dashboard.jsp");
									}*/

								} else {
									request.setAttribute("message","Your username and password is not activated yet...!");
									//response.getWriter().write("index.jsp");
									obj.setLogedInStatus("index.jsp");
								}

							} else {
								request.setAttribute("message","Your software is exprired. Please contact with Administrator");
								//response.getWriter().write("index.jsp");
								obj.setLogedInStatus("index.jsp");
							}

						} else {
							request.setAttribute("message", "Invalid credentials.");
							//response.getWriter().write("index.jsp");
							obj.setLogedInStatus("index.jsp");
						}
					} catch (ParseException ex) {
						ex.printStackTrace();
					}
				}catch (Exception e) {

					e.printStackTrace();
				}
			}
		}
		else{ //((obj.getUsersList() == null)){  
			request.setAttribute("message", "Invalid credentials.");
			//response.getWriter().write("index.jsp");
			obj.setLogedInStatus("index.jsp");
		}
		return obj;
	}

	
	@Override
	@Transactional
	public int updateLoginHistory(LoginHistory objLoginHistory) {

		int result = usersDao.updateLoginHistory(objLoginHistory);
		return result;
	}
	
	@Override
	@Transactional
	public Doctor getDoctorList(Integer unitId,Integer drDeptId,String callFrom) {
		return usersDao.getDoctorList(unitId,drDeptId,callFrom);
	}
	
	@Override
	@Transactional
	public List<Doctor> getDoctorsDepDetails(int id) {
		List<Doctor> listDoctor = usersDao.getDoctorsDepDetails(id);
		return listDoctor;
	}
	
	@Override
	@Transactional
	public Doctor getDoctorListBySpecialization(Integer unitId,Integer drDeptId,String callFrom) {
		return usersDao.getDoctorListBySpecialization(unitId,drDeptId,callFrom);
	}
	
	@Override
	@Transactional
	public List<Doctor> fetchDocInfo(String Treatment_ID,String user_name) {
		return usersDao.fetchDocInfo(Treatment_ID,user_name);
	}
	
	@Override
	@Transactional
	public List<Doctor> fetchAllDoctorNS() {
		List<Doctor> listDoctor = usersDao.fetchAllDoctorNS();
		return listDoctor;
	}
	
	@Override
	@Transactional
	public List<Users> fetchAllDoctor() {
		List<Users> listDoctor = usersDao.fetchAllDoctor();
		return listDoctor;
	}
	
	@Override
	@Transactional
	public List<NA> fetchDoctorAvailable(String docId) {
		
		NA objNATemp = new NA();

		objNATemp.setUser_id(Integer.parseInt(docId));
		objNATemp.setNa_status("Y");
		List<NA> listDoctor = usersDao.fetchDoctorAvailable(objNATemp);
		return listDoctor;
	}
	
	@Override
	@Transactional
	public List<NA> fetchNA(String docId) {
		
		NA objNATemp = new NA();

		objNATemp.setUser_id(Integer.parseInt(docId));
		objNATemp.setNa_status("Y");
		List<NA> listDoctor = usersDao.fetchNA(objNATemp);
		return listDoctor;
	}
	
	@Override
	@Transactional
	public List<Doctor> fetchAuthorisedBy(int unitId){
		
		return usersDao.fetchAuthorisedBy(unitId);
	}

	@Override
	@Transactional
	public Users getUsersByUserIdForLISPrint(Integer userId) {
		SQLQuery sql = null;
	List<Users> listDoctor1 = new ArrayList<Users>();
	Users uobj=new Users();
	try {
		sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT sign_one,sign_one_doctor,sign_two,sign_two_doctor FROM users where User_ID="+userId+"  ");
		sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listDoctor2 = sql.list();

		for (Map<String, Object> rs1 : listDoctor2) {
			Users dto = new Users();
			dto.setSign_one((String) rs1.get("sign_one"));
			dto.setSign_one_doctor((String) rs1.get("sign_one_doctor"));
			dto.setSign_two((String) rs1.get("sign_two"));
			dto.setSign_two_doctor((String) rs1.get("sign_two_doctor"));
			listDoctor1.add(dto);
		}
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	uobj.setUsersList(listDoctor1);
	return uobj;
	
	}

	@Override
	@Transactional
	public String saveChangedUserPassword(String userName, String newPassword, int userID) {
		// TODO Auto-generated method stub
		return usersDao.saveChangedUserPassword(userName,newPassword,userID);
	}

	@Override
	@Transactional
	public List<Users> getUsersListpharmacy() {
		
		return usersDao.getUsersListpharmacy();
	}

	@Override
	@Transactional
	public Doctor getDoctorDetailsByDoctorId(Integer doctorId) {
		return usersDao.getDoctorDetailsByDoctorId(doctorId);
	}

	/*
	 * @Override
	 * 
	 * @Transactional public Integer getAllUserCount() { // TODO Auto-generated
	 * method stub return usersDao.getAllUserCount(); }
	 */
	
	@Override
	@Transactional
	public List<Users> getUsersListByFullName(String userId) {
		return usersDao.getUsersListByFullName(userId);
	}
}
