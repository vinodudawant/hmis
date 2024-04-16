package com.hms.organdonation.service.impl;

import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.organdonation.controller.OrganDonationController;
import com.hms.organdonation.dao.OrganCollectionDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.service.OrganCollectionService;

@Service
@Transactional
public class OrganCollectionServiceImpl implements OrganCollectionService {
	
	static Logger log = Logger.getLogger(OrganCollectionServiceImpl.class.getName());
	
	@Autowired
	OrganCollectionDao organCollectionDao;

	@Override
	public int saveOrganCollection(OrganCollectionDto obj, Integer organDonorId, Integer treatmentId,
			Integer checkupListId, MultipartFile[] organCollectionDocument, HttpServletRequest request) {
		
		log.info(" in OrganCollectionServiceImpl : saveOrganCollection()");
		return organCollectionDao.saveOrganCollection(obj, organDonorId, treatmentId, checkupListId, organCollectionDocument, request);
	}

	@Override
	public List<OrganCollectionDto> getAllCollectedOrgans(HttpServletRequest request,String fromDate,String lastDate) {
		return organCollectionDao.getAllCollectedOrgans(request, fromDate, lastDate);
	}

	@Override
	public OrganCollectionDto getCollectedOrganById(Integer organCollectionId) {
		return organCollectionDao.getCollectedOrganById(organCollectionId);
	}

	@Override
	public boolean deleteCollectedOrganById(Integer organCollectionId, HttpServletRequest request) {
		return organCollectionDao.deleteCollectedOrganById(organCollectionId, request);
	}

	@Override
	public List<OrganCollectionDto> serachOrganContainerDetailsById(Integer searchParam) {
		// TODO Auto-generated method stub
		return organCollectionDao.serachOrganContainerDetailsById(searchParam);
	}

	@Override
	public List<OrganCollectionDto> organCollectionAutoSuggestion(Integer organCollectionId, String callFrom) {
		// TODO Auto-generated method stub
		return organCollectionDao.organCollectionAutoSuggestion(organCollectionId, callFrom);
	}

	@Override
	public OrganCollectionDto editCollectedOrganById(Integer organCollectionId) {
		// TODO Auto-generated method stub
		return organCollectionDao.editCollectedOrganById(organCollectionId);
	}

}
