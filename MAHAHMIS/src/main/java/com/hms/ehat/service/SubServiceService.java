package com.hms.ehat.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;


import com.hms.ehat.dto.EhatSubChargesView;
import com.hms.ehat.dto.EhatSubServiceview;
import com.hms.ehat.dto.SubServiceDto;

public interface SubServiceService {

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code Methods declared for sub services
	 ***/

	int saveOrUpdateSubService(SubServiceDto subServiceDto,Integer hospitalUnitId, HttpServletRequest request);

	List<SubServiceDto> getSubService();

	List<SubServiceDto> getSubServiceCategory();

	boolean deleteSubService(Integer subId, HttpServletRequest request);

	List<SubServiceDto> getAutoSuggestionSubService(String letter, Integer masterId, Integer selfId);

	List<SubServiceDto> getSubServiceById(Integer masterId, Integer selfId);

	List<SubServiceDto> getSubServiceIsCat(Integer masterId, Integer selfId);

	List<SubServiceDto> getAllSubService();

	List<SubServiceDto> fetchSuperCatogoires(Integer serviceId);
	
	List<SubServiceDto> getSubServiceCatY();
	
	List<SubServiceDto> getSubServiceCatN();
	
	List<SubServiceDto> getSubServiceIsCatY(Integer masterId, Integer selfId);
	
	List<SubServiceDto> getSubServiceIsCatForSearch(Integer masterId,
			Integer selfId,String letter);

	List<SubServiceDto> getAutoSuggestionSubServiceMaster(String letter);

	Long getSubServiceCount();

	List<SubServiceDto> getSubServiceByIdcom(Integer masterId, Integer selfId);

	List<SubServiceDto> getAmountofService(Integer isComServlastId);
	
	List<SubServiceDto> getAmountofConfiguredPkg(Integer configuredId);

	List<SubServiceDto> getSubServicesFoprofees(Integer masterId, Integer selfId);

	int importservices(String string);

	int importSubservices(String string);

	List<EhatSubServiceview> subservicelistfromview();

	List<EhatSubServiceview> getpServiceDetailsDatareport(int masterId,
			int selfId);

	List<EhatSubChargesView> getpChargesDetailsDatareport(int masterId,
			int selfId);

	List<SubServiceDto> fetchsup(Integer serviceId);

	List<SubServiceDto> getcateenservices(String letter);

	List<SubServiceDto> getcateenservicesbycode(String letter);
	
	List<SubServiceDto> getSubServiceByUnitId(Integer masterId, Integer selfId ,Integer unitId);

	List<SubServiceDto> getmultipleSubservice(String masterId, Integer selfId);
	
	
}


