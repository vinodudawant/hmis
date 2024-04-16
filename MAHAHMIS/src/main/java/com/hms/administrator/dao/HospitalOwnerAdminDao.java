package com.hms.administrator.dao;

import javax.servlet.http.HttpServletRequest;

import com.hms.administrator.dto.HospitalOwnerDetailDto;

public interface HospitalOwnerAdminDao {
	int savehospitalownerdetail(String savehospitalownerdetail,HttpServletRequest request);
	HospitalOwnerDetailDto getListhospitalownerdetail();
	boolean delethospitalownerdetail(Integer idhospitalOwner, HttpServletRequest request);
	HospitalOwnerDetailDto edithospitalownerdetail(Integer idhospitalOwner,HttpServletRequest request);
}
