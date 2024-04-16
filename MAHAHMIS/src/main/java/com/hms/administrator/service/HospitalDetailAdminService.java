package com.hms.administrator.service;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.ehat.dto.HospitalSpecialisationDto;

public interface HospitalDetailAdminService  {

			Integer savehospitalInfo(String hospitalInfo ,String hospitalId ,HttpServletRequest request);
			HospitalDetails getListHospitalDetailsNew(Integer hospitalUnitId);
			HospitalDetails getListHospitalDetails();
		
			int saveHospitalSpcialization(String hospitalSpecialization,HttpServletRequest request,Integer unitId);
			HospitalSpecialisationDto gethospitalspcializationList();
			HospitalSpecialisationDto gethospitalspcializationListByUnitId(Integer unitId);
			
			boolean deletehospitalspcialization(Integer specialisationId,HttpServletRequest request);
		
			int savehospitaldeaprtment(String hospitalDepartment, Integer unitId,HttpServletRequest request);
			HospitalDepartmentDto getListDepartments();
			HospitalDepartmentDto getListDepartmentsByUnitId(Integer unitId);
			boolean deletehospitalhospitaldepartment(Integer departmentId,HttpServletRequest request);
			
			int saveHospitalHoliday(String date,String reason,int idHospitalHoliday,HttpServletRequest request);
			HospitalHolidaysDto getListHospitalHoliday(String selYear);
			boolean deleteHospitalHoliday(Integer idHospitalHoliday,HttpServletRequest request);
			HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHoliday,HttpServletRequest request);
		
			int savehospitalownerdetail(String savehospitalownerdetail,HttpServletRequest request);
			HospitalOwnerDetailDto getListhospitalownerdetail();
			boolean delethospitalownerdetail(Integer idhospitalOwner, HttpServletRequest request);
		    HospitalOwnerDetailDto edithospitalownerdetail(Integer idhospitalOwner,HttpServletRequest request);
			HospitalDetails gethospitalinfoadmin1(int hospitalId);
		
}
