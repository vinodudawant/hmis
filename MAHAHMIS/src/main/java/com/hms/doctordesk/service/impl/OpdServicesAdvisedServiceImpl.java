package com.hms.doctordesk.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.OpdServicesAdvisedDao;
import com.hms.doctordesk.service.OpdServicesAdvisedService;
import com.hms.dto.RisImageUploadDTO;
import com.hms.ehat.controller.CpoeIPDdetails;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.CpoeServdetails;
import com.hms.ehat.dto.DoctorDto;
import com.hms.opdbill.dto.PatientSubServiceDetailsDto;

@Service
@Transactional
public class OpdServicesAdvisedServiceImpl implements OpdServicesAdvisedService {

	@Autowired
	OpdServicesAdvisedDao OpdServicesAdvisedDao;

	@Override
	public int saveOpdServicesAdvised(BillDetailsDto billDetailsDto, HttpServletRequest request, String queryType) {
		// TODO Auto-generated method stub

		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");// current login user id
		String usertype = (String) session.getAttribute("userType");
		String a = billDetailsDto.getCallfrom();

		Integer sponsorId = billDetailsDto.getSponsorId();
		Integer chargesSlaveId = billDetailsDto.getChargesSlaveId();
		String iscombination = billDetailsDto.getIscombination();
		int subId = billDetailsDto.getSubServiceId();

		if (queryType.equalsIgnoreCase("insert")) { // To Insert Record

			billDetailsDto.setCreatedBy(userId);
			billDetailsDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");

			if (billDetailsDto.getSndToLabFlag().equals(null) || billDetailsDto.getSndToLabFlag() == null) {
				billDetailsDto.setSndToLabFlag("N");
			}

			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				billDetailsDto.setPaidFlag("Y");
			}

			if (billDetailsDto.getDoctorId() == 0) {

				if (usertype.equalsIgnoreCase("doctor") || usertype.equalsIgnoreCase("Doctor")
						|| usertype.equalsIgnoreCase("Dr") || usertype.equalsIgnoreCase("dr")) {
					billDetailsDto.setDoctorId(userId);

				}

			}

		} else if (queryType.equalsIgnoreCase("update")) {// To Update Record

			billDetailsDto.setUpdatedBy(userId);
			billDetailsDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
			billDetailsDto.setDeleted("N");
			billDetailsDto.setAccountStatusOpdDiagno("N");

			if (a.equals("reciept") || a.equals("addToOPDreciept")) {
				billDetailsDto.setPaidFlag("Y");
			}

			if (billDetailsDto.getDoctorId() == 0) {

				if (usertype.equalsIgnoreCase("doctor") || usertype.equalsIgnoreCase("Doctor")
						|| usertype.equalsIgnoreCase("Dr") || usertype.equalsIgnoreCase("dr")) {
					billDetailsDto.setDoctorId(userId);

				}

			}

		}

		if (iscombination.equals("Y")) {

			return OpdServicesAdvisedDao.saveToOtherBilling(billDetailsDto, queryType, sponsorId, chargesSlaveId, a,
					request);

		} else {
			return OpdServicesAdvisedDao.saveOpdServicesAdvised(billDetailsDto, queryType);
		}

	}

	@Override
	public List<DoctorDto> fetchDoctorList(String doctodType) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.fetchDoctorList(doctodType);
	}

	@Override
	public List<CpoeIPDdetails> getAllOpdServicesAdvised(Integer treatmentId, String callform,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.getAllOpdServicesAdvised(treatmentId, callform, request);
	}

	@Override
	public int deleteOpdServicesAdvised(String labservicelist, String callform, HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		BillDetailsDto billDetailsDto = new BillDetailsDto();

		billDetailsDto.setDeletedBy(userId);
		return OpdServicesAdvisedDao.deleteOpdServicesAdvised(labservicelist, userId, callform);
	}

	@Override
	public List<CpoeServdetails> getListBill(Integer pID, String callform, Integer servid, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.getListBill(pID, callform, servid);
	}

	@Override
	public int cancelInvestigationTest(String billDetId, String cancleType, String callform,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.cancelInvestigationTest(billDetId,cancleType, callform, request);
	}

	@Override
	public int cancelLabTest(String billDetId, String cancleType, Integer deptId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.cancelLabTest(billDetId,cancleType, deptId, request);
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetails(Integer treatmentId) {
		System.err.println("service treatmentId======="+treatmentId);
		return OpdServicesAdvisedDao.getPatientSubServiceDetails(treatmentId);
	}

	@Override
	public int addPathologyPackageFromBilling(BillDetailsDto billDetailsDto, HttpServletRequest request,
			String queryType, String module, String sampleWiseBarcodes) {
		
		return OpdServicesAdvisedDao.addPathologyPackageFromBilling(billDetailsDto, request, queryType, module, sampleWiseBarcodes);
	}

	@Override
	public PatientSubServiceDetailsDto getPatientSubServiceDetailsOnIPD(PatientSubServiceDetailsDto objDto) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.getPatientSubServiceDetailsOnIPD(objDto);
	}

	@Override
	public int deleteIpdServicesAdvised(String labservicelist, int userId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.deleteIpdServicesAdvised(labservicelist, userId);
	}
	
	@Override
	public List<CpoeServdetails> getListBillIPD(Integer pID, String callform, Integer servid, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return OpdServicesAdvisedDao.getListBillIPD(pID, callform, servid);
	}

}
