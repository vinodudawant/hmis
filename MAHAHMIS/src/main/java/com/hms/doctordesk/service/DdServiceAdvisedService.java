package com.hms.doctordesk.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.doctordesk.dto.DdServiceAdvisedDto;
import com.hms.dto.Doctor;


public interface DdServiceAdvisedService {

	List<Doctor> fetchDoctor();

	int saveHistory(DdServiceAdvisedDto service, HttpServletRequest request);

	List<DdServiceAdvisedDto> fetchService();

}
