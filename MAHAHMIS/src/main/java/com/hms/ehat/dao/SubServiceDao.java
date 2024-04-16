package com.hms.ehat.dao;

import java.util.List;

import com.hms.ehat.dto.EhatSubChargesView;
import com.hms.ehat.dto.EhatSubServiceview;
import com.hms.ehat.dto.SubServiceDto;

public interface SubServiceDao {

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code Declared methods in dao to communicate with data base
	 ***/

	int saveOrUpdateSubService(SubServiceDto subServiceDto,Integer hospitalUnitId);

	List<SubServiceDto> getSubService();

	List<SubServiceDto> getSubServiceCategory();
	
	boolean deleteSubService(Integer subId, Integer userId);

	List<SubServiceDto> getAutoSuggestionSubService(String letter, Integer masterId , Integer selfId);

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

	int importservices(String file);

	int importSubservices(String file);

	List<EhatSubServiceview> subservicelistfromview();

	List<EhatSubServiceview> getpServiceDetailsDatareport(int masterId,
			int selfId);

	List<EhatSubChargesView> getpChargesDetailsDatareport(int masterId,
			int selfId);

	List<SubServiceDto> fetchsup(Integer serviceId);

	List<SubServiceDto> getcateenservices(String letter);

	List<SubServiceDto> getcateenservicesbycode(String letter);
	
	public List<SubServiceDto> getSubServiceByUnitId(Integer masterId,
			Integer selfId ,Integer unitId);

	List<SubServiceDto> getmultipleSubservice(String masterId, Integer selfId);
}

