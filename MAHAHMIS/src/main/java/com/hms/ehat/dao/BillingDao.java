package com.hms.ehat.dao;

import java.util.List;

import com.hms.dto.Doctor;
import com.hms.dto.Patient;
import com.hms.dto.Users;

public interface BillingDao {

	List<Doctor> fetchAuthorisedBy();

	List<Users> fetchAvaStatus();

	List<Patient> showDiscountApproval(String searchOn, String searchBy, String value);

	List<Patient> showSurgeonDiscountApproval(String searchOn, String searchBy, String value);

}
