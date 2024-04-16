package com.hms.administrator.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

public interface HospitalDetailAdminDao  {
	
		 Integer savehospitalInfo(String hospitalInfo,String hospitalId ,HttpServletRequest request);
		 HospitalDetails getListHospitalDetails();
		 HospitalDetails getListHospitalDetailsNew(Integer hospitalUnitId);
		
		 int saveHospitalSpcialization(String hospitalSpecialization,HttpServletRequest request,Integer UnitId);
		 HospitalSpecialisationDto getHospitalspecilizationList();
	
		 HospitalSpecialisationDto gethospitalspcializationListByUnitId(Integer unitId);
		 boolean deletehospitalspcialization(Integer specialisationId,HttpServletRequest request);
		 
		 int savehospitaldeaprtment(String HospitalDepartment, Integer unitId,HttpServletRequest request);
		 HospitalDepartmentDto getListDepartments(); 
		 HospitalDepartmentDto getListDepartmentsByUnitId(Integer unitId); 
		 boolean deletehospitalhospitaldepartment(Integer departmentId,HttpServletRequest request);
			
		 int saveHospitalHoliday(String date,String reason, int idHospitalHoliday,HttpServletRequest request);
		 HospitalHolidaysDto getListHospitalHoliday(String selYear);
		 HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHoliday,HttpServletRequest request);
		 boolean deleteHospitalHoliday(Integer idHospitalHoliday);
		 
		 int savehospitalownerdetail(String savehospitalownerdetail,HttpServletRequest request);
		 HospitalOwnerDetailDto getListhospitalownerdetail();
		 HospitalOwnerDetailDto edithospitalownerdetail(Integer idhospitalOwner,HttpServletRequest request);
		 boolean delethospitalownerdetail(Integer idhospitalOwner, HttpServletRequest request);
		HospitalDetails gethospitalinfoadmin1(int hospitalId);
		
		
}
