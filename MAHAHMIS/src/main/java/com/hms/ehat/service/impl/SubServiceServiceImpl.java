package com.hms.ehat.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.ehat.dao.SubServiceDao;

import com.hms.ehat.dto.EhatSubChargesView;
import com.hms.ehat.dto.EhatSubServiceview;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.ehat.service.SubServiceService;

/**
 * @author Bilal
 * @date 26_May_2017
 * @code Service implementation for sub services
 ***/
@Service
public class SubServiceServiceImpl implements SubServiceService {

	@Autowired
	SubServiceDao subServiceDao;

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For saving or updating records
	 ***/
	@Override
	@Transactional
	public int saveOrUpdateSubService(SubServiceDto subServiceDto,Integer hospitalUnitId,HttpServletRequest request) {

 		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		if (subServiceDto.getSubId() == 0) { // To Insert Record

			subServiceDto.setCreatedBy(userId);
		    subServiceDto.setDeleted("N");
			subServiceDto.setCreatedDate(new Date(new java.util.Date().getTime()));
			subServiceDto.setHospitalUnitId(hospitalUnitId);
			
			//subServiceDto.setServiceId(serviceMasterDto.getServiceId());
			//subServiceDto.setSelfId(selfId);

		} else {// To Update Record

			subServiceDto.setUpdatedBy(userId);
			subServiceDto.setDeleted("N");
			subServiceDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
			subServiceDto.setHospitalUnitId(hospitalUnitId);
			
			//subServiceDto.setSelfId(selfId);
			//subServiceDto.setServiceId(serviceMasterDto.getServiceId());

		}

		// call dao interface methods
		int a = subServiceDao.saveOrUpdateSubService(subServiceDto,hospitalUnitId);

		int val=0;
		if (a==3) {
			val=3;
		} else {
			 val=((a == 1) ? (subServiceDto.getSubId() == 0 ? 1 : 2) : 0);
		}
		// Set value accordingly insert =1 and update =2
		return val;
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching Sub Services
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubService() {

		return subServiceDao.getSubService( );
	}
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching Sub Services
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceCategory() {

		return subServiceDao.getSubServiceCategory();
	}
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For deleting sub service
	 ***/
	@Override
	@Transactional
	public boolean deleteSubService(Integer subId, HttpServletRequest request) {

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		return subServiceDao.deleteSubService(subId, userId);// call dao method
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For getting auto suggestion of sub service name
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getAutoSuggestionSubService(String letter, Integer masterId, Integer selfId ) {

		return subServiceDao.getAutoSuggestionSubService(letter, masterId, selfId);
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching sub services with id
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceById(Integer masterId,
			Integer selfId) {

		return subServiceDao.getSubServiceById(masterId, selfId);
	}

	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching sub services with id
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceIsCat(Integer masterId,
			Integer selfId) {

		return subServiceDao.getSubServiceIsCat(masterId, selfId);
	}
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For getting all sub service
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getAllSubService() {

		return subServiceDao.getAllSubService();
	}
	
	/********
	 * @author	Touheed
	 * @base 	Fetching super master of service based on there id
	 * @since	1st-June-2017
	 ********/
	@Override
	@Transactional
	public List<SubServiceDto> fetchSuperCatogoires(Integer serviceId) {

		return subServiceDao.fetchSuperCatogoires(serviceId);
	}

	/**
	 * @author Bilal
	 * @date 7_Jun_2017
	 * @code For fetching Sub Services List Whose category is Y
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceCatY() {

		return subServiceDao.getSubServiceCatY();
	}
	/**
	 * @author Bilal
	 * @date 8_Jun_2017
	 * @code For fetching Sub Services List Whose category is N
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceCatN() {

		return subServiceDao.getSubServiceCatN();
	}
	
	/**
	 * @author Bilal
	 * @date 26_May_2017
	 * @code For fetching sub services with id
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceIsCatY(Integer masterId,
			Integer selfId) {

		return subServiceDao.getSubServiceIsCatY(masterId, selfId);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceIsCatForSearch(Integer masterId,
			Integer selfId, String letter) {
		// TODO Auto-generated method stub
		return subServiceDao.getSubServiceIsCatForSearch(masterId, selfId, letter);
	}

	/**
	 * @author Bilal
	 * @date 05-JULY-2017
	 * @code For AutoSuggestion sub services with id
	 ***/
	@Override
	@Transactional
	public List<SubServiceDto> getAutoSuggestionSubServiceMaster(String letter) {
		return subServiceDao.getAutoSuggestionSubServiceMaster(letter);
	}

	@Override
	@Transactional
	public Long getSubServiceCount() {
		
		return subServiceDao.getSubServiceCount();
	}

	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceByIdcom(Integer masterId,
			Integer selfId) {
		
		return subServiceDao.getSubServiceByIdcom(masterId, selfId);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getAmountofService(Integer isComServlastId) {
		return subServiceDao.getAmountofService(isComServlastId);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getAmountofConfiguredPkg(Integer congiguredId) {
		return subServiceDao.getAmountofConfiguredPkg(congiguredId);
	}
	
	@Override
	@Transactional
	public List<SubServiceDto> getSubServicesFoprofees(Integer masterId,
			Integer selfId) {
		return subServiceDao.getSubServicesFoprofees(masterId,selfId);
	}

	@Override
	@Transactional
	public int importservices(String file) {
		
		return subServiceDao.importservices(file);
	}
	@Override
	@Transactional
	public int importSubservices(String file) {
		
		return subServiceDao.importSubservices(file);
	}

	@Override
	@Transactional
	public List<EhatSubServiceview> subservicelistfromview() {
		
		return subServiceDao.subservicelistfromview();
	}

	@Override
	@Transactional
	public List<EhatSubServiceview> getpServiceDetailsDatareport(
			int masterId, int selfId) {
		
		return subServiceDao.getpServiceDetailsDatareport(masterId,selfId);
	}

	@Override
	@Transactional
	public List<EhatSubChargesView> getpChargesDetailsDatareport(int masterId,
			int selfId) {
		
		return subServiceDao.getpChargesDetailsDatareport(masterId,selfId);
	}

	@Override
	@Transactional
	public List<SubServiceDto> fetchsup(Integer serviceId) {
		
		return subServiceDao.fetchsup(serviceId);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getcateenservices(String letter) {
		
		return subServiceDao.getcateenservices(letter);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getcateenservicesbycode(String letter) {
		return subServiceDao.getcateenservicesbycode(letter);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getSubServiceByUnitId(Integer masterId,
			Integer selfId ,Integer unitId) {
		
		return subServiceDao.getSubServiceByUnitId(masterId, selfId ,unitId);
	}

	@Override
	@Transactional
	public List<SubServiceDto> getmultipleSubservice(String masterId, Integer selfId) {
		return subServiceDao.getmultipleSubservice(masterId, selfId);
	}
	
}

