package com.hms.users.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.ehat.dto.LoginHistory;
import com.hms.rostermanagement.dto.NA;
import com.hms.users.service.UsersService;

@Controller
@RequestMapping(value ="/users")
public class UsersController {

	@Autowired
	UsersService  usersServices;

	static Logger log=Logger.getLogger(UsersController.class.getName());

	@RequestMapping(value = "/saveUser", method = RequestMethod.POST)
	@ResponseBody
	public int saveUser(Users Users ,Doctor doctorDetails,HttpServletRequest request){
		return usersServices.saveUser(Users,doctorDetails,request);

	}

	@RequestMapping(value = "/getUsersList", method = RequestMethod.GET)
	@ResponseBody
	public List<Users> getUsersList( @RequestParam ("startIndex")Integer startIndex){
		List<Users> UsersList=usersServices.getUsersList(startIndex);
		return UsersList;
	}

	@RequestMapping(value = "/getUsersListByUserName", method = RequestMethod.POST)
	@ResponseBody
	public Users getUsersListByUserName(@RequestParam("userName") String userName){
		List<Users> UsersList=usersServices.getUsersListByUserName(userName);
		Users userdto=new Users();
		userdto.setUsersList(UsersList);
		return userdto;
	}


	@RequestMapping(value = "/getUsersListByUserId", method = RequestMethod.POST)
	@ResponseBody
	public Users getUsersListByUserId(@RequestParam("userId") String userId){
		List<Users> UsersList=usersServices.getUsersListByUserId(userId);
		Users userdto=new Users();
		userdto.setUsersList(UsersList);
		return userdto;
	}

	@RequestMapping(value = "/getUsersByUserId", method = RequestMethod.POST)
	@ResponseBody
	public Users getUsersByUserId(@RequestParam Integer userId){
		Users Users=usersServices.getUsersByUserId(userId);
		return Users;
	}

	@RequestMapping(value = "/updateUsers", method = RequestMethod.POST)
	@ResponseBody
	public String updateUsers(Users Users ,Doctor doctorDetails,HttpServletRequest request){
		usersServices.updateUsers(Users,doctorDetails,request);
		return "";
	}

	@RequestMapping(value = "/deleteUsers", method = RequestMethod.POST)
	@ResponseBody
	public String deleteUsers(@RequestParam Integer userId){
		boolean response=usersServices.deleteUsers(userId);
		String msg = "";
		if (response == true) {
			msg = "Records Deleted Sucessfully";
		} else {
			msg = "Oops Some Problem Ocured";
		}
		return msg;
	}

	@RequestMapping(value = "/getDoctorDetails", method = RequestMethod.POST)
	@ResponseBody
	public Doctor getDoctorDetails(@RequestParam Integer userId){
		Doctor doctorDetail=usersServices.getDoctorDetails(userId);
		return doctorDetail;
	}

	@RequestMapping(value = "/checkUserLogin", method = RequestMethod.POST)
	@ResponseBody
	public Users checkUserLogin(@RequestParam("userName") String userName,@RequestParam("password") String password,
			@RequestParam("unitId") String unitId,@RequestParam("unitName") String unitName,HttpServletRequest request,HttpServletResponse response){

		Users UsersDto = usersServices.checkUserLogin(userName,password,unitId,unitName,request,response);
		return UsersDto;
	}

	@RequestMapping(value = "/logoutCurrentUser", method = RequestMethod.POST)	  
	@ResponseBody public String logoutCurrentUser(HttpServletRequest request,HttpServletResponse response){
	  
		String returnOnPage ="";
		HttpSession session = request.getSession(); 
		if(session == null) {
			
			returnOnPage = "index.jsp";
		}else {
			
			Integer userId = (Integer) session.getAttribute("userId1"); 
			String loginHistoryId = (String) session.getAttribute("loginHistoryId"); 
			LoginHistory objLoginHistory = new LoginHistory();
			objLoginHistory.setLoginHistoryId(Integer.parseInt(loginHistoryId));
			objLoginHistory.setUserId(userId.toString());
			objLoginHistory.setCreatedBy(userId);
			int result = usersServices.updateLoginHistory(objLoginHistory); 
			if (result > 0) {
			  
				session.setAttribute("userId", null); 
				session.setAttribute("userName", null);
				session.setAttribute("userType", null); 
				session.invalidate();
				returnOnPage = "index.jsp";
			}
		}		
		return returnOnPage; 
	}	
	
	@RequestMapping(value = "/getDoctorList", method = RequestMethod.POST)
	@ResponseBody
	public Doctor getDoctorList(@RequestParam("unitId") Integer unitId,@RequestParam("drDeptId") Integer drDeptId,
			@RequestParam("callFrom") String callFrom){
		Doctor doctorDetail=usersServices.getDoctorList(unitId,drDeptId,callFrom);
		return doctorDetail;
	}
	
	@RequestMapping(value = "/getDoctorListBySpecialization", method = RequestMethod.POST)
	@ResponseBody
	public Doctor getDoctorListBySpecialization(@RequestParam("unitId") Integer unitId,@RequestParam("drDeptId") Integer drDeptId,
			@RequestParam("callFrom") String callFrom){
		Doctor doctorDetail=usersServices.getDoctorListBySpecialization(unitId,drDeptId,callFrom);
		return doctorDetail;
	}
	
	@RequestMapping(value = "/fetchAllDoctorNS", method = RequestMethod.GET)
	@ResponseBody
	public List<Doctor> fetchAllDoctorNS(){
		List<Doctor> UsersList=usersServices.fetchAllDoctorNS();
		return UsersList;
	}
	
	@RequestMapping(value = "/fetchAllDoctor", method = RequestMethod.GET)
	@ResponseBody
	public List<Users> fetchAllDoctor(){
		List<Users> UsersList=usersServices.fetchAllDoctor();
		return UsersList;
	}
	
	@RequestMapping(value = "/fetchDoctorAvailable", method = RequestMethod.GET)
	@ResponseBody
	public List<NA> fetchDoctorAvailable(@RequestParam("selDocNmForDA") String selDocId){
		List<NA> UsersList=usersServices.fetchDoctorAvailable(selDocId);
		return UsersList;
	}
	
	@RequestMapping(value = "/fetchNA", method = RequestMethod.GET)
	@ResponseBody
	public List<NA> fetchNA(@RequestParam("selDocNm") String selDocId){
		List<NA> UsersList=usersServices.fetchNA(selDocId);
		return UsersList;
	}
	
	@RequestMapping(value = "/fetchAuthorisedBy", method = RequestMethod.GET)
	@ResponseBody
	public List<Doctor> fetchAuthorisedBy(@RequestParam("unitId") int unitId){
		return usersServices.fetchAuthorisedBy(unitId);
	}
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : update user password
	================*/
	@RequestMapping(value = "/saveChangedUserPassword", method = RequestMethod.POST)
	@ResponseBody
	public String saveChangedUserPassword(@RequestParam("userName") String userName,@RequestParam("newPassword") String newPassword,
			@RequestParam("userID") int userID){
		return usersServices.saveChangedUserPassword(userName,newPassword,userID);
	}
	
	@RequestMapping(value = "/getUsersListpharmacy", method = RequestMethod.GET)
	@ResponseBody
	public List<Users> getUsersListpharmacy(){
		List<Users> UsersList=usersServices.getUsersListpharmacy();
		return UsersList;
	}
	
	@RequestMapping(value = "/getDoctorDetailsByDoctorId", method = RequestMethod.POST)
	@ResponseBody
	public Doctor getDoctorDetailsByDoctorId(@RequestParam Integer doctorId){
		Doctor doctorDetail=usersServices.getDoctorDetailsByDoctorId(doctorId);
		return doctorDetail;
	}
	
	@RequestMapping(value = "/getUsersListByFullName", method = RequestMethod.POST)
	@ResponseBody
	public Users getUsersListByFullName(@RequestParam("userId") String userId){
		List<Users> UsersList=usersServices.getUsersListByFullName(userId);
		Users userdto=new Users();
		userdto.setUsersList(UsersList);
		return userdto;
	}
	
	
}