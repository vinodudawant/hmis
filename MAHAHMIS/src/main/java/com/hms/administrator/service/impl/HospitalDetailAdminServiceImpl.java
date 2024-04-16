package com.hms.administrator.service.impl;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.administrator.dao.HospitalDetailAdminDao;
import com.hms.administrator.dto.HospitalDepartmentDto;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.dto.HospitalHolidaysDto;
import com.hms.administrator.dto.HospitalOwnerDetailDto;
import com.hms.administrator.service.HospitalDetailAdminService;
import com.hms.ehat.dto.HospitalSpecialisationDto;

@Service
@Transactional
public class HospitalDetailAdminServiceImpl implements HospitalDetailAdminService {

@Autowired
HospitalDetailAdminDao admindao;
	
/*********************************************
* @author	:Dnyaneshwar Kadam
* @date		: 14-Jan-2020
* @codeFor	: Save Hospital Infomartion Detail
 **********************************************/	
	@Override
	public Integer savehospitalInfo(String hospitalInfo,String hospitalId ,HttpServletRequest request) {
		
		return admindao.savehospitalInfo(hospitalInfo,hospitalId, request);
	}	
	
	@Override
	public HospitalDetails getListHospitalDetails() {
		return admindao.getListHospitalDetails();
	}
	
	@Override
	public int saveHospitalSpcialization(String hospitalSpecialization,
			HttpServletRequest request,Integer unitId) {
	
		return admindao.saveHospitalSpcialization(hospitalSpecialization, request, unitId);
	}

	@Override
	public HospitalSpecialisationDto gethospitalspcializationListByUnitId(Integer unitId) {
	
		return admindao.gethospitalspcializationListByUnitId(unitId);
	}
	
	@Override
	public HospitalSpecialisationDto gethospitalspcializationList() {
	
		return admindao.getHospitalspecilizationList();
	}
	
	@Override
	public boolean deletehospitalspcialization(Integer specialisationId,
			HttpServletRequest request) {
		
		return admindao.deletehospitalspcialization(specialisationId, request);
	}
	
	
	@Override
	public int savehospitaldeaprtment(String HospitalDepartment, Integer unitId,
			HttpServletRequest request) {
	
		return admindao.savehospitaldeaprtment(HospitalDepartment, unitId,request);
	}
	
	
	@Override
	public HospitalDepartmentDto getListDepartmentsByUnitId(Integer unitId) {
	
		return admindao.getListDepartmentsByUnitId(unitId);
	}
	
	@Override
	public HospitalDepartmentDto getListDepartments() {
	
		return admindao.getListDepartments();
	}


	@Override
	public boolean deletehospitalhospitaldepartment(Integer departmentId,
			HttpServletRequest request) {
		
		return admindao.deletehospitalhospitaldepartment(departmentId, request);
	}
		
/*************************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 15-Jan-2020
	* @codeFor	: savehospitalownerdetail
*************************************************/	
	@Override
	public int savehospitalownerdetail(String savehospitalownerdetail,
			HttpServletRequest request) {
	
		return admindao.savehospitalownerdetail(savehospitalownerdetail, request);
	}

	@Override
	public HospitalOwnerDetailDto getListhospitalownerdetail() {
		
		
		return admindao.getListhospitalownerdetail();
	}

	@Override
	public HospitalOwnerDetailDto edithospitalownerdetail(Integer idhospitalOwner,
			HttpServletRequest request) {
		
		return admindao.edithospitalownerdetail(idhospitalOwner, request);
	}

	@Override
	public boolean delethospitalownerdetail(Integer idhospitalOwner,
			HttpServletRequest request) {
	
		return admindao.delethospitalownerdetail(idhospitalOwner, request);
	}

/*****************************************
	* @author	:Dnyaneshwar Kadam
	* @date		: 17-Jan-2020
	* @codeFor	: SaveHospitalHolidayMaster
********************************************/
	@Override
	public int saveHospitalHoliday(String date, String reason,int idHospitalHolidays,
			HttpServletRequest request) {
	
		return admindao.saveHospitalHoliday(date, reason,idHospitalHolidays, request);
	}

	@Override
	public HospitalHolidaysDto getListHospitalHoliday(String selYear) {
		
		return admindao.getListHospitalHoliday(selYear);
	}

	@Override
	public HospitalHolidaysDto editHospitalHoliday(Integer idHospitalHolidays,
			HttpServletRequest request) {
		
		return admindao.editHospitalHoliday(idHospitalHolidays , request);
	}

	@Override
	public boolean deleteHospitalHoliday(Integer idHospitalHolidays,HttpServletRequest request) {
		
		return admindao.deleteHospitalHoliday(idHospitalHolidays);
	}

	@Override
	public HospitalDetails gethospitalinfoadmin1(int hospitalId) {
		// TODO Auto-generated method stub
		return admindao.gethospitalinfoadmin1(hospitalId);
	}

	@Override
	public HospitalDetails getListHospitalDetailsNew(Integer hospitalUnitId) {
		// TODO Auto-generated method stub
		return admindao.getListHospitalDetailsNew( hospitalUnitId);
	}
	
}
