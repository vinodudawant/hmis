package com.hms.dao;

import java.util.ArrayList;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Patient;
import com.hms.dto.Users;

@Transactional
public interface UserDAO {
	public Users findByUserId(int userId);

	public Users findByUserNameAndPwd(String userName, String password);

	public boolean insert(Patient objPatient);

	public int findNewRegNo();

	public ArrayList fetchTopPat();

	public boolean updateByUserId(Users user);

	public boolean deleteByUserId(int userId);

	public List<Users> fetchAllDoctor(String deptid);

	String fetchDocNameByDocId(int docid);

	public Users fetchCurrentUserDetails(int userid);
	//touheed code for fetching user name
	public String fetchUserName(int userId);
}
