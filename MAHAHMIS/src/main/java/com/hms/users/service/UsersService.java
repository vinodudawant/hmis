package com.hms.users.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestParam;

import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.ehat.dto.LoginHistory;
import com.hms.rostermanagement.dto.NA;


public interface UsersService {

	int saveUser(Users Users, Doctor doctorDetails, HttpServletRequest request);
    
	List<Users> getUsersList(Integer startIndex);
	
    List<Users> getUsersListByUserName(String userName);
	
	List<Users> getUsersListByUserId(String userId);
	
	void updateUsers(Users Users, Doctor doctorDetails, HttpServletRequest request);
	
	boolean deleteUsers(Integer userId);
	
	Users getUsersByUserId(Integer userId);
	
	Doctor getDoctorDetails(Integer userId);
	
	Users checkUserLogin(String userName,String password,String unitId,String unitName,HttpServletRequest request,HttpServletResponse response);
	
	int updateLoginHistory(LoginHistory objLoginHistory);
	
	Doctor getDoctorList(Integer unitId,Integer drDeptId,String callFrom);
	
	List<Doctor> getDoctorsDepDetails(int id);
	
	Doctor getDoctorListBySpecialization(Integer unitId,Integer drDeptId,String callFrom);
	
	List<Doctor> fetchDocInfo(String Treatment_ID,String user_name);
	
	List<Doctor> fetchAllDoctorNS();
	
	List<Users> fetchAllDoctor();
	
	List<NA> fetchDoctorAvailable(String docId);
	
	List<NA> fetchNA(String docId);
	
	List<Doctor> fetchAuthorisedBy(int unitId);
	
	Users getUsersByUserIdForLISPrint(Integer userId);

	String saveChangedUserPassword(String userName, String newPassword, int userID);

	List<Users> getUsersListpharmacy();

	Doctor getDoctorDetailsByDoctorId(Integer doctorId);

	List<Users> getUsersListByFullName(String userId);

//	Integer getAllUserCount();
}
