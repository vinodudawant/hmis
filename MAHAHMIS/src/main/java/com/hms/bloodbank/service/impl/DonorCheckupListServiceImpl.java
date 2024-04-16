package com.hms.bloodbank.service.impl;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.DonorCheckupListDao;
import com.hms.bloodbank.dto.BloodBagMaster;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodTypeMaster;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.service.DonorCheckupListService;
import com.hms.dto.Doctor;
import com.hms.dto.Users;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.pharmacy.upload.FilePath;
import com.itextpdf.text.Document;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Rectangle;
import com.itextpdf.text.pdf.Barcode128;
import com.itextpdf.text.pdf.PdfWriter;


@Service
@Transactional
public class DonorCheckupListServiceImpl implements DonorCheckupListService {
	
	@Autowired
	DonorCheckupListDao donorCheckupListDao;
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<Doctor> fetchDoctor() {
		// TODO Auto-generated method stub
		return donorCheckupListDao.fetchDoctor();
	}

	@Override
	public int saveCheckuplist(DonorCheckupList checkuplist, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		checkuplist.setCreatedBy(userId);
		checkuplist.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		checkuplist.setIpAddress(ipaddress);
		return donorCheckupListDao.saveCheckuplist(checkuplist,request);
	}
	
	@Override
	public int saveBloodBagDetails(DonorBloodBagDetails BloodBagDetails, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		BloodBagDetails.setCreatedBy(userId);
		BloodBagDetails.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		BloodBagDetails.setIpAddress(ipaddress);
		
		return donorCheckupListDao.saveBloodBagDetails(BloodBagDetails,request);
	
				
	}

	@Override
	public DonorBloodBagDetails getDonorDetailsByTreatmentId(int id, String callform,  HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getDonorDetailsByTreatmentId(id, callform , request);
	}

	@Override
	public List<DonorBloodBagDetails> serachBloodBagDetailsById(String searchParam,String callform) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.serachBloodBagDetailsById(searchParam,callform);
	}

	@Override
	public DonorCheckupList getDonorCheckupListDetailsByTreatmentId(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getDonorCheckupListDetailsByTreatmentId(id,request);
	}

	@Override
	public int saveBloodGroupTesting(BloodGroupTesting bloodGroupTesting, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		bloodGroupTesting.setCreatedBy(userId);
		bloodGroupTesting.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		bloodGroupTesting.setIpAddress(ipaddress);
		return donorCheckupListDao.saveBloodGroupTesting(bloodGroupTesting,request);
	}
	
	@Override
	public int saveSampleDispatch(DonorSampleDispatch donorSampleDispatchDetails, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		donorSampleDispatchDetails.setCreatedBy(userId);
		donorSampleDispatchDetails.setUpdatedBy(userId);
		String ipaddress = request.getRemoteAddr();
		donorSampleDispatchDetails.setIpAddress(ipaddress);
		donorSampleDispatchDetails.setSampleStatus(1);
		return donorCheckupListDao.saveSampleDispatch(donorSampleDispatchDetails,request);
	}

	@Override
	public List<DonorSampleDispatch> getSampleDetails(Integer sampleStatus,String formDate, String toDate,String callform,Integer sampleSection,Integer sampleBloodBagNo) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getSampleDetails(sampleStatus,formDate,toDate,callform,sampleSection,sampleBloodBagNo);
	}

	@Override
	public int saveSampleAcknowledge(int bloodDispatchId, int sampleStatus,String remarks,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.saveSampleAcknowledge(bloodDispatchId,sampleStatus,remarks,request);
	}

	@Override
	public List<DonorBloodBagDetails> getBagDetails(Integer masterId) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getBagDetails(masterId);
	}

	@Override
	public List<BloodTypeMaster> getAllBloodTypeMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getAllBloodTypeMaster(request);
	}

	@Override
	public List<BloodBagMaster> getAllBloodBagMaster(HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getAllBloodBagMaster(request);
	}

	@Override
	public List<DonorCheckupList> getAllBloodDonorsCheckupList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getAllBloodDonorsCheckupList(unitId,request);
	}

	@Override
	public DonorCheckupList editBloodDonorCheckupList(Integer donorId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.editBloodDonorCheckupList(donorId,request);
	}

	@Override
	public DonorCheckupList getDonorByIdCheckup(Integer donorId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorCheckupListDao.getDonorByIdCheckup(donorId,request);
	}
	
	@Override
	public List<DonorSampleDispatch> getAllSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate) {
		return donorCheckupListDao.getAllSampleDispatchList(request, fromDate, lastDate);
	}

}
