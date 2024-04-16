package com.hms.model;

import java.util.ArrayList;
import java.util.List;

//import org.springframework.getContext().ApplicationContext;
//import org.springframework.getContext().support.ClassPathXmlApplicationContext;

import com.hms.dao.UserDAO;
import com.hms.dto.Patient;
import com.hms.dto.Users;
import com.hms.utility.ApplicationContextUtils;

public class UserModel extends AbstractModel {

	public Users getUserDetails(String userName, String password) {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		Users user = userDAO.findByUserNameAndPwd(userName, password);
		return user;
	}

	public boolean setUserDetails(Patient objPatient) {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		boolean isInserted = userDAO.insert(objPatient);
		return isInserted;
	}

	public int findNewRegNo() {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		int regNo = userDAO.findNewRegNo();
		return regNo;
	}

	public ArrayList showTopPat() {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		ArrayList arrTopPat = userDAO.fetchTopPat();
		return arrTopPat;
	}

	public List<Users> fetchAllDoctor(String deptid) {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		List<Users> liDoctor = userDAO.fetchAllDoctor(deptid);
		return liDoctor;
	}

	public String fetchDocNameByDocId(int docid) {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		String dname = userDAO.fetchDocNameByDocId(docid);
		return dname;
	}

	public Users fetchCurrentUserDetails(int userid) {
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		Users dname = userDAO.fetchCurrentUserDetails(userid);
		return dname;
	}
	
	//touheed code for fetching user name
	public String fetchUserName(int userId){
		UserDAO userDAO = (UserDAO) getContext().getBean("userDAO");
		String uname = userDAO.fetchUserName(userId);
		return uname;
	}
}
