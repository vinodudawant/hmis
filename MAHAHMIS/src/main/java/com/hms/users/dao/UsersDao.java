package com.hms.users.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalDetails;
import com.hms.dto.Doctor;

import com.hms.dto.Users;
import com.hms.ehat.dto.LoginHistory;
import com.hms.rostermanagement.dto.NA;

public interface UsersDao {

	int saveUser( Doctor doctorDetails, HttpServletRequest request);
	List<Users> getUsersList(Integer startIndex);
	List<Users> getUsersListByUserName(String userName);
	List<Users> getUsersListByUserId(String userId);
	void updateUsers(Users Users, Doctor doctorDetails,HttpServletRequest request);
	boolean deleteUsers(Integer userId);
	Users getUsersByUserId(Integer userId);
	Doctor getDoctorDetails(Integer userId);
	Users checkUserLogin(String userName,String password,int unitId);
	int updateLoginHistory(LoginHistory objLoginHistory);
	Doctor getDoctorList(Integer unitId,Integer drDeptId,String callFrom);
	List<Doctor> getDoctorsDepDetails(int id);
	Doctor getDoctorListBySpecialization(Integer unitId,Integer drDeptId,String callFrom);
	Integer getHospitalId(String unitId,HttpServletRequest request);
	
	List<Doctor> fetchDocInfo(String Treatment_ID,String user_name);
	
	List<Doctor> fetchAllDoctorNS();
	
	List<Users> fetchAllDoctor();
	
	List<NA> fetchDoctorAvailable(NA Na);
	
	List<NA> fetchNA(NA Na);
	
	List<Doctor> fetchAuthorisedBy(int unitId);
	
	Users getUsersByUserIdForLISPrint(Integer userId);
	
	HospitalDetails getHospitalByUnitId(int unitId);
	
	String saveChangedUserPassword(String userName, String newPassword, int userID);
//	Integer getAllUserCount();
	List<Users> getUsersListpharmacy();
	
	Doctor getDoctorDetailsByDoctorId(Integer doctorId);
	List<Users> getUsersListByFullName(String userId);
}
