package com.hms.users.daoimpl;

import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.ehat.dto.LoginHistory;
import com.hms.rostermanagement.dto.NA;
import com.hms.users.dao.UsersDao;


@Repository
public class UsersDaoImpl implements UsersDao {

	@Autowired
	SessionFactory sessionFactory;
	static Logger log = Logger.getLogger(UsersDaoImpl.class.getName());

	@Override
	public int saveUser(Doctor doctorDetails, HttpServletRequest request) {

		Session session = sessionFactory.getCurrentSession();
		try {
			//HospitalSpecialisationDto specializationDto = (HospitalSpecialisationDto) session.get(HospitalSpecialisationDto.class, Integer.parseInt(doctorDetails.getSpecialisation()));
			//doctorDeta ils.setHospitalSpecialisationDto(specializationDto);
			 int count=0;
			if (doctorDetails.getDoctor_ID() == 0) {
				
				 String sql="Select count(*) from users where User_Name='"+doctorDetails.getUser_Name()+"' ";
				 SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 count= ((Number) q.uniqueResult()).intValue();
				
				if(count ==0) {
					sessionFactory.getCurrentSession().merge(doctorDetails); 
				}else {
					return 3;
				}
				//session.merge(doctorDetails);
				return 1;
			} else {
				 String sql="Select count(*) from users where User_Name='"+doctorDetails.getUser_Name()+"' and User_ID not in("+doctorDetails.getUser_ID()+")  ";
				 SQLQuery q = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 count= ((Number) q.uniqueResult()).intValue();
				
				session.merge(doctorDetails);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
		}
		return 0;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Users> getUsersList(Integer startIndex) {
		Session session = sessionFactory.getCurrentSession();
		List<Users> usersList = null;
		List<Users> usersListNew = new ArrayList<>();
		try {
			int maxresult = 10;
			Query q = session.createQuery("FROM Users u where u.deleted='N' order by u.user_ID desc ");
			q.setFirstResult(startIndex);
			q.setMaxResults(maxresult);
			usersList = q.list();
			
			Integer cnt = getAllUserCount();
			
			for(Users rs : usersList)
			{
				rs.setUsersCount(cnt);
				usersListNew.add(rs);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return usersListNew;
	}

	@Override
	public List<Users> getUsersListByUserName(String userName) {
		SQLQuery sql = null;
		List<Users> listDoctor1 = new ArrayList<Users>();

		try {
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT User_ID,User_Name,l_name FROM users where deleted='N' and User_Name like '%" + userName + "%' ");
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listDoctor2 = sql.list();

			for (Map<String, Object> rs1 : listDoctor2) {
				Users dto = new Users();
				dto.setUserid((Integer) rs1.get("User_ID"));
				dto.setUser_Name((String) rs1.get("User_Name"));
				dto.setL_name((String) rs1.get("l_name"));
				listDoctor1.add(dto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listDoctor1;
	}

	@Override
	public List<Users> getUsersListByUserId(String userId) {
		/* * // TODO Auto-generated method stub log.
		 * info("In  UsersDaoImpl In getUsersListByUserId  Method..................!!!!"
		 * ); Session session =
		 * sessionFactory.getCurrentSession();
		 * List<Users> usersList = null;
		 * List<Users> listDoctor1 = new
		 * ArrayList<Users>(); try { log.
		 * info("In UsersDaoImpl In getUsersListByUserId Method   In Try...................!!!!"
		 * ); Query sql = session.
		 * createQuery("SELECT User_ID,User_Name  FROM users where  deleted='N' and User_ID like '%"
		 * + userId + "%' "); System.out.println(sql +
		 * "sql"); sql.setResultTransformer(Criteria.
		 * ALIAS_TO_ENTITY_MAP); List<Map<String, Object>>
		 * listDoctor2 = sql.list();
		 *
		 * for (Map<String, Object> rs1 : listDoctor2) {
		 * Users dto = new Users();
		 * dto.setUserid((Integer) rs1.get("User_ID"));
		 * dto.setUsername((String) rs1.get("User_Name"));
		 * listDoctor1.add(dto);
		 *
		 * } //usersList = (List<Users>) q.list();
		 *
		 * log.
		 * info("out UsersDaoImpl getUsersListByUserId  method  successfully ...................!!!!"
		 * ); }
		 *
		 * catch (Exception e) { log.
		 * error("out getUsersListByUserName  UsersDaoImpl In Exception...................!!!!"
		 * ); e.printStackTrace(); } finally {
		 *
		 * } return usersList;
		 */

		/*
		SQLQuery sql = null;
		List<Users> listDoctor1 = new ArrayList<Users>();

		try {

			String hql = "FROM Doctor where User_ID="+Integer.parseInt(userId);
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			List<Doctor> lstDoctor = query.list();

			String hql2 = "FROM Users where User_ID="+Integer.parseInt(userId);
			Query query2 = sessionFactory.getCurrentSession().createQuery(hql2);
			List<Users> lstUsers = query2.list();

			Users userobj = lstUsers.get(0);
			userobj.setObjDoctor(lstDoctor.get(0));
*/
			//Users userobj=(Users) sessionFactory.getCurrentSession().get(Users.class, Integer.parseInt(userId));
			//Doctor objDoctor = (Doctor) sessionFactory.getCurrentSession().get(Doctor.class, Integer.parseInt(userId));
			//Users userobj = objDoctor.getUserDetails();
			//userobj.setObjDoctor(objDoctor);
	//		listDoctor1.add(userobj);
			/*sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT User_ID,User_Name  FROM users where  deleted='N' and User_ID like '%" + userId + "%' ");
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listDoctor2 = sql.list();

			for (Map<String, Object> rs1 : listDoctor2) {
				Users dto = new Users();
				dto.setUserid((Integer) rs1.get("User_ID"));
				dto.setUsername((String) rs1.get("User_Name"));
				listDoctor1.add(dto);

			}*/
		/*} catch (Exception e) {
			e.printStackTrace();
		}
		*/
		List<Users> listDoctor1 = new ArrayList<Users>();
		Session session = null;
		try{
			session = sessionFactory.getCurrentSession();
			//Query query = session.createQuery("FROM Users WHERE user_ID like concat('%',:userId,'%')");
			Query query = session.createQuery("FROM Users WHERE user_ID like concat('%',:userId,'%') and deleted='N'");
			query.setParameter("userId", userId);
			listDoctor1 = query.list();
			return listDoctor1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return listDoctor1;
	}

	@Override
	public void updateUsers(Users Users, Doctor doctorDetails, HttpServletRequest request) {
		Session session = sessionFactory.getCurrentSession();
		try {
			doctorDetails.setUserDetails(Users);
			session.merge(Users);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean deleteUsers(Integer userId) {
		try {
			Users Users = (Users) sessionFactory.getCurrentSession().get(Users.class, userId);
			Users.setDeleted("Y");
			Users.setStatus("N");
			Users.setDeletedBy(userId);
			Users.setDeletedDate(new Date());

			Doctor doctor = Users.getObjDoctor();
			doctor.setDeleted("Y");
			doctor.setStatus("N");
			doctor.setDeletedBy(userId);
			doctor.setDeletedDate(new Date());

			sessionFactory.getCurrentSession().merge(Users);

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public Users getUsersByUserId(Integer userId) {
		Users Users = (Users) sessionFactory.getCurrentSession().get(Users.class, userId);
		return Users;
	}

	@Override
	public Doctor getDoctorDetails(Integer userId) {
		Session session = sessionFactory.getCurrentSession();
		Query q = session.createQuery("FROM Doctor u where u.UserDetails.user_ID=" + userId);
		//change by Rohini Ambhore .
	//	Query q = session.createQuery("FROM Doctor u where u.Doctor_ID=" + userId);
		q.list();
		return (Doctor) q.uniqueResult();
	}

	@Override
	public Users checkUserLogin(String userName,String password,int unitId) {

		Users dto = new Users();
		try {
			Integer userIdCount = ((Number)sessionFactory.getCurrentSession().createSQLQuery("select count(User_ID) from users where user_Name='"+ userName+"' and password='"+password+"' and FIND_IN_SET('"+unitId+"', unitmaster_id) ").uniqueResult()).intValue();
			
			if(userIdCount > 0) {
				
				//Query q = sessionFactory.getCurrentSession().createQuery("FROM Users u where user_Name='"+ userName+"' and password='"+password+"' ");
			
				//change by Rohini Ambhore for case sensitive login.  
				Query q = sessionFactory.getCurrentSession().createQuery("FROM Users u where binary(user_Name)='"+ userName+"' and binary(password)='"+password+"' ");
				@SuppressWarnings("unchecked")
				List<Users> userlist = q.list();			
				dto.setUsersList(userlist);			
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	
	@Override
	public int updateLoginHistory(LoginHistory objLoginHistory) {

		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	    Date date = new Date();

	    LoginHistory objLogHistory = (LoginHistory) sessionFactory.getCurrentSession().get(LoginHistory.class, objLoginHistory.getLoginHistoryId());
	    objLogHistory.setDeleted("Y");
	    objLogHistory.setStatus("N");
	    objLogHistory.setDeletedBy(Integer.parseInt(objLoginHistory.getUserId()));
	    objLogHistory.setDeletedDate(new Date());
		objLoginHistory.setSignOutTime(formatter.format(date));
		return 1;
	}	
	
	@SuppressWarnings("unchecked")
	@Override
	public Doctor getDoctorList(Integer unitId,Integer drDeptId,String callFrom) {
		Session session = sessionFactory.getCurrentSession();
		Query q = session.createQuery("FROM Doctor where deleted='N' ");
		Doctor objDoc = new Doctor();
		objDoc.setDoctorList(q.list());
		return objDoc;
	}
	
	@Override
	public List<Doctor> getDoctorsDepDetails(int id) {
		List<Doctor> doc = new ArrayList<Doctor>();
		Doctor objliObject = new Doctor();
		String sign = ""; 
		if(id!=0){
			
			String queryForDoctors = "SELECT ifnull(department,'0') as department,specializationName,doc_name FROM doctor WHERE Doctor_ID="+id;
			Query query4 = sessionFactory.getCurrentSession().createSQLQuery(queryForDoctors);
			query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
			List<Map<String, Object>> doctorDetails =  query4.list();
			for (Map rs1 : doctorDetails) {
				objliObject.setDoc_name((String) rs1.get("doc_name"));
				objliObject.setDepartment((String) rs1.get("department"));
				objliObject.setSpecializationName((String) rs1.get("specializationName"));
				if(!objliObject.getDepartment().equals("0")) {
					
					String queryFordep = "SELECT department_name FROM hospital_departments WHERE idhospital_departments="+objliObject.getDepartment();
					Query query5 = sessionFactory.getCurrentSession().createSQLQuery(queryFordep);
					query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			
					List<Map<String, Object>> doctorDetails1 =  query5.list();
					for (Map rs2 : doctorDetails1) {
							objliObject.setDepartmentName((String) rs2.get("department_name"));
					}
				}
				doc.add(objliObject);
			}
		} else {
			objliObject.setDoc_name("");
			objliObject.setDepartment("");
			objliObject.setSpecializationName("");
			objliObject.setDepartmentName("");
			doc.add(objliObject);
		}
		return doc;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public Doctor getDoctorListBySpecialization(Integer unitId,Integer drDeptId,String callFrom) {
		Session session = sessionFactory.getCurrentSession();
		Query q = session.createQuery("FROM Doctor where deleted='N' and specialisation='"+drDeptId+"' ");
		Doctor objDoc = new Doctor();
		objDoc.setDoctorList(q.list());
		return objDoc;
	}

	@Override
	public Integer getHospitalId(String unitId ,HttpServletRequest request) {
		// TODO Auto-generated method stub
		String hospitalState = ((String)sessionFactory.getCurrentSession().createSQLQuery("select hospitalState from hospital where deleted='N' and hospital_unit_id='"+unitId+"' ").uniqueResult());
		//String hospitalState = ((String)sessionFactory.getCurrentSession().createSQLQuery("select hospitalState from hospital where deleted='N'").uniqueResult());

		Integer hospitalStateId =  Integer.parseInt(hospitalState);
		return hospitalStateId;
		
	}
	
	@Override
	public List<Doctor> fetchDocInfo(String Treatment_ID,String user_name) {
		
		List<Doctor> doctordto = new ArrayList<Doctor>();
		try {
			String sqlQuery ="SELECT d.signature,d.regNo,d.qualification,d.doc_name from ehat_treatment t,doctor d where t.doctor_id = d.Doctor_ID and Treatment_ID ="+Treatment_ID;
			Query query4 = sessionFactory.getCurrentSession().createSQLQuery(sqlQuery);
			query4.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> docDetails = query4.list();
			for (Map rs : docDetails) {
				Doctor objDocType = new Doctor();
	
				objDocType.setQualification((String) (rs.get("qualification")));
				objDocType.setRegNo((String) (rs.get("regNo")));
				objDocType.setDocsign((String) (rs.get("signature")));
				objDocType.setDoc_name((String) (rs.get("doc_name")));
				
				doctordto.add(objDocType);
			}
			
			String UserDetails ="SELECT d.signature,d.regNo,d.qualification,d.doc_name from doctor d where doc_name = '" +user_name + "'";
			Query query5 = sessionFactory.getCurrentSession().createSQLQuery(UserDetails);
			query5.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> UserDetail = query5.list();
			for (Map rs : UserDetail) {
				Doctor objUserType = new Doctor();
	
				objUserType.setEducation((String) (rs.get("qualification")));
				objUserType.setuserRegNo((String) (rs.get("regNo")));
				
				doctordto.add(objUserType);
			}
		}catch(Exception e) {
			
			e.printStackTrace();
		}
		return doctordto;		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Doctor> fetchAllDoctorNS() {
		
		List<Doctor> doctorSlotList = new ArrayList<>();
		Session session = sessionFactory.getCurrentSession();
		Query q = session.createQuery("FROM Users where deleted='N' ");
		Doctor objDoc = new Doctor();
		List<Users> list = q.list();
		
		for (Users list1 : list) {
			Doctor doctorSlotDTO = new Doctor();
			// doctorSlotDTO.setDoctor_ID((Integer) rs.get("Doctor_ID"));
			// doctorSlotDTO.setDoc_name((String) rs.get("doc_name"));
			doctorSlotDTO.setDoctor_ID((Integer) list1.getUser_ID());
			String tit = list1.getTitle();
			String fname = list1.getF_name();
			String lname = list1.getL_name();

			doctorSlotDTO.setDoc_name(tit + fname + " " + lname);

			doctorSlotList.add(doctorSlotDTO);
		}

		return doctorSlotList;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<Users> fetchAllDoctor() {
		List<Users> liDoctor = new ArrayList<Users>();
		ObjectMapper oMapper = new ObjectMapper();
		
		String sql = "SELECT doc_name,d.User_ID  FROM users u,doctor d WHERE u.User_ID=d.User_ID and (u.user_Type='doctor' or u.user_Type='rmo' or u.user_Type='visitingdoctor')  and u.status='Y' and d.status='Y'";
		Session session = sessionFactory.getCurrentSession();
		Query q = session.createSQLQuery(sql);
		
		try {
			List<Object> doctorDetails = q.list();
			
			for (Object object : doctorDetails) {
				
				Users objDoctor = new Users();
				List<?> map = oMapper.convertValue(object, List.class);
				System.out.println(map);
				objDoctor.setDoc_name((String) map.get(0));
				objDoctor.setUser_ID((Integer) map.get(1));
				liDoctor.add(objDoctor);
			}
			 
//			doctorDetails.get(0)

			
			return liDoctor;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	@Override
	public List<NA> fetchDoctorAvailable(NA objNATemp) {
		// TODO Auto-generated method stub
		List<NA> arrNA = new ArrayList<NA>();

		String sql = "select * from doctor_availability where User_ID=? and status=?";
		
		Session session = sessionFactory.getCurrentSession();
		Query query1 = session.createSQLQuery(sql);
		try {
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listNA = query1.list();
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			for (Map<String, Object> rs : listNA) {
				NA objTempNA = new NA();
				try {
					objTempNA.setNa_id((Integer) rs.get("iddoctor_availability"));
					objTempNA.setDate((String) rs.get("date"));
					String st = ((Time) rs.get("from_time")).toString();
					String et = ((Time) rs.get("to_time")).toString();
					java.util.Date d1;
					java.util.Date d2;
					DateFormat f1 = new SimpleDateFormat("hh:mm:ss");
					d1 = f1.parse((st));
					d2 = f1.parse(et);
					DateFormat f2 = new SimpleDateFormat("h:mm a");
					objTempNA.setFrom_time(f2.format(d1).toLowerCase());
					objTempNA.setTo_time(f2.format(d2).toLowerCase());
					objTempNA.setNote((String) rs.get("note"));
					objTempNA.setUser_id((Integer) rs.get("User_ID"));
					objTempNA.setNa_status((String) rs.get("status"));

					arrNA.add(objTempNA);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			return arrNA;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<NA> fetchNA(NA objNA) {
		// TODO Auto-generated method stub
		List<NA> arrNA = new ArrayList<NA>();
		
		int user_id = objNA.getUser_id();
		String na_status2 = objNA.getNa_status();

		String sql = "select * from na where User_ID="+user_id + " and na_status=" +na_status2;
		
		Session session = sessionFactory.getCurrentSession();
		Query query1 = session.createSQLQuery(sql);
		try {
			List<Map<String, Object>> listNA = query1.list();
			query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

			for (Map<String, Object> rs : listNA) {
				NA objTempNA = new NA();
				try {
					objTempNA.setNa_id((Integer) rs.get("na_id"));
					objTempNA.setDate((String) rs.get("date"));
					String st = ((Time) rs.get("from_time")).toString();
					String et = ((Time) rs.get("to_time")).toString();
					java.util.Date d1;
					java.util.Date d2;
					DateFormat f1 = new SimpleDateFormat("hh:mm:ss");
					d1 = f1.parse((st));
					d2 = f1.parse(et);
					DateFormat f2 = new SimpleDateFormat("h:mm a");
					objTempNA.setFrom_time(f2.format(d1).toLowerCase());
					objTempNA.setTo_time(f2.format(d2).toLowerCase());
					objTempNA.setNote((String) rs.get("note"));
					objTempNA.setUser_id((Integer) rs.get("user_id"));
					objTempNA.setNa_status((String) rs.get("na_status"));

					arrNA.add(objTempNA);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			return arrNA;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	@SuppressWarnings("unchecked")
	public List<Doctor> fetchAuthorisedBy(int unitId){
		
		try {
			
			Criteria docDetails = sessionFactory.getCurrentSession().createCriteria(Doctor.class);			
			docDetails.add(Restrictions.eq("status", "Y"));					
			docDetails.add(Restrictions.eq("motivatorAuthorisation", "Authorised"));	
			return docDetails.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
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
	public HospitalDetails getHospitalByUnitId(int unitId) {
		
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HospitalDetails.class);			
			criteria.add(Restrictions.eq("sandboxIntegrationFlag", 'Y'));	
			HospitalDetails hospitalDetails = (HospitalDetails) criteria.uniqueResult();
			return hospitalDetails;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	
	}

	/* =============
	  Code By  : Badrinath Wagh
	  Code For : update user password
	================*/
	@Override
	public String saveChangedUserPassword(String userName, String newPassword, int userID) {
			
		try {
			//String sql = "SELECT User_ID FROM doctor where Doctor_ID=?";
			
			//Doctor dc=new Doctor();
			Session session = sessionFactory.getCurrentSession();
			
			Users tobj=(Users) sessionFactory.openSession().get(Users.class, userID);
			
			System.out.println("tobj.getUser_ID()**** "+tobj.getUser_ID());
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Doctor.class);			
			criteria.add(Restrictions.eq("UserDetails.user_ID", tobj.getUser_ID()));		
			criteria.add(Restrictions.eq("status", "Y"));	
			criteria.add(Restrictions.eq("deleted", "N"));	
			
			Doctor docObject = (Doctor) criteria.uniqueResult();
			
			int user_ID = docObject.getUserDetails().getUser_ID();
			
			String sql1 = "UPDATE Users SET user_Name=:userName, password=:newPassword WHERE user_ID="+user_ID ;
			Query sql1result = session.createQuery(sql1);
			sql1result.setParameter("userName", userName);
			sql1result.setParameter("newPassword", newPassword);
			
			sql1result.executeUpdate();
			
			return "Password Updated Successfully";
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e);
			return "Something Went Wrong";
		}
		
	
	}
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : User list count
	================*/
	//@Override
	public Integer getAllUserCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from users where deleted='N'" ;
			
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	//Added By Rahul

	@Override
	public List<Users> getUsersListpharmacy() {
		Session session = sessionFactory.getCurrentSession();
		List<Users> usersList = null;
		try {	
			Criteria createCriteria = session.createCriteria(Users.class);
			createCriteria.add(Restrictions.eq("deleted", "N"));
			usersList=createCriteria.list();
			usersList = usersList.stream().sorted((a,b)->(a.getUser_ID()>b.getUser_ID())?-1:(a.getUser_ID()<b.getUser_ID())?1:0).collect(Collectors.toList());
			//usersList = q.list();	
			System.out.println(usersList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return usersList;
		
	}

	@Override
	public Doctor getDoctorDetailsByDoctorId(Integer doctorId) {
		Session session = sessionFactory.getCurrentSession();
		Query q = session.createQuery("FROM Doctor u where u.Doctor_ID=" + doctorId);
		q.list();
		return (Doctor) q.uniqueResult();
	}
	
	//Added By Badrinath For Fetching User full name
	@Override
	public List<Users> getUsersListByFullName(String userId) {
		SQLQuery sql = null;
		List<Users> listDoctor1 = new ArrayList<Users>();

		try {
			sql = sessionFactory.getCurrentSession().createSQLQuery("SELECT concat(f_name,' ',m_name,' ',l_name) username, user_ID FROM users where deleted='N' and concat(f_name,' ',m_name,' ',l_name) like '%" + userId + "%' ");
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listDoctor2 = sql.list();

			for (Map<String, Object> rs1 : listDoctor2) {
				Users dto = new Users();
				dto.setUserid((Integer) rs1.get("user_ID"));
				dto.setUsername((String) rs1.get("username"));
				listDoctor1.add(dto);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listDoctor1;
	}
}
