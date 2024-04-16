package com.hms.admin.util;

import java.util.ArrayList;
import java.util.List;

import com.hms.administrator.dto.HospitalDetails;
//import com.hms.dto.HospitalDetails;
import com.hms.ehat.dto.RegTreBillDto;
import com.hms.model.AbstractModel;
import com.hms.model.AdminModel;

public class FetchHospitalDetails extends AbstractModel {

	public static List<HospitalDetails> getHospDetails(String corporateId){
		AdminModel objAdminModel = (AdminModel) getContext().getBean("adminModel");

		List<HospitalDetails> arrHospitalDetails = new ArrayList<HospitalDetails>();

		arrHospitalDetails = objAdminModel.fetchHodspitalDetails(corporateId);

		HospitalDetails objHospitalDetails = new HospitalDetails();

		objHospitalDetails.setListHospitalDetails(arrHospitalDetails);
		return arrHospitalDetails;
	}
	
	
	public static int depid(int trid){
		
		AdminModel objAdminModel = (AdminModel) getContext().getBean("adminModel");
		int dpid=objAdminModel.getdepid(trid);
		
		return dpid;
	}
}