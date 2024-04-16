package com.hms.mortuary.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.mortuary.dto.ColdRoomBedStatus;
import com.hms.mortuary.dto.ColdRoomMasterDto;
import com.hms.mortuary.dto.Coldroommortuaryslave;
import com.hms.mortuary.dto.MortuaryBodyTrackingDto;
import com.hms.mortuary.dto.MortuaryDeathCertificateDto;
import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.mortuary.dto.MortuaryPmReport;
import com.hms.mortuary.service.MortuaryServiceInterface;
import com.hms.mortuary.dao.MortuaryDaoInterface;

@Service
public class MortuaryServiceImpl implements MortuaryServiceInterface {
	
	@Autowired
	MortuaryDaoInterface mortuatydaointerfcae;
	private Integer pmreport_id;
	
	@Transactional
	@Override
	public int saveColdRoomMaster(ColdRoomMasterDto cold) {
		
			int id=	mortuatydaointerfcae.saveDaoColdRoomMaster(cold);
		return id;
	}

	@Transactional
	@Override
	public List<ColdRoomMasterDto> fechColdRoomMasterService() {
		return mortuatydaointerfcae.fechColdRoomMaster();
		
	}
	
	@Transactional
	@Override
	public boolean deleteColdRoomMaster(int id,HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		System.out.println("DDDDDDDDDDDDDDDDDDDDDD......"+userId);
		return mortuatydaointerfcae.deleteColdRoomMaster(id, userId);
		
	}

	@Transactional
	@Override
	public ColdRoomMasterDto upadteColdRoomMaster(Integer cold) {
	
		
		return mortuatydaointerfcae.updateColdRoomMaster(cold);
	}
	
	@Transactional
	@Override
	public ColdRoomMasterDto getBedAvaColdRoomService(Integer id) {
		
		return mortuatydaointerfcae.getBedAvaColdRoomDao(id);
	}

	@Transactional
	@Override
	public MortuaryMasterDto fechMortuaryMasterService(Integer id) {
		
		return mortuatydaointerfcae.fechMortuaryMasterDto(id);
	}

	

	@Transactional
	@Override
	public int saveColdroommortuaryslave(Integer mor_id, Integer cold_room_id, Integer bed_no, Integer userId) {
		
		return mortuatydaointerfcae.saveColdroommortuaryslave(mor_id, cold_room_id, bed_no, userId);
	}

	@Transactional
	@Override
	public List<ColdRoomBedStatus> listOfmMasterDtos(Integer cold_room_id) {
		
		return mortuatydaointerfcae.listOfMortuaryMasterDtos(cold_room_id);
	}

	@Transactional
	@Override
	public Coldroommortuaryslave fetchColdroommortuaryslave() {

		return mortuatydaointerfcae.fechLastColdroommortuaryslave();
	}

	@Transactional
	@Override
	public List<Object[]> getNoOfBeds(Integer id) {

		return mortuatydaointerfcae.getNoOfBeds(id);
	}

	@Transactional
	@Override
	public MortuaryMasterDto getMortuaryById(Integer mor_id) {
		return mortuatydaointerfcae.fetchMortuaryById(mor_id);
	}

	@Transactional
	@Override
	public int beddeAllocation(int cold_room_slave_id, int userId) {
		
		return mortuatydaointerfcae.deallocateBed(cold_room_slave_id, userId);
	}

	@Transactional
	@Override
	public List<MortuaryMasterDto> mortuaryAutosuggestion(String str) {
	
		return mortuatydaointerfcae.mortuaryAutoSugesstion(str);
	}

	@Transactional
	@Override
	public int saveBodyTrackingInfo(MortuaryBodyTrackingDto dto, int morId, Integer userId) {
		
		return mortuatydaointerfcae.saveBodyTrackingInfo(dto, morId, userId);
	}
	
	@Transactional
	@Override
	public CustomizeTemplate mortuartyTempInformation(Integer id) {
	

		return mortuatydaointerfcae.mortuaryTemplateinformation(id);
	}

	@Transactional
	@Override
	public String pmreportSaveMethod(MortuaryPmReport report, int morId) {
		return mortuatydaointerfcae.pmreportSaveMethod(report, morId);
	}
	
	

	@Transactional
	@Override
	public List<MortuaryMasterDto> autosuggestionpreviousMorturySrevices(
			String str) {
	
		return mortuatydaointerfcae.autosuggestionpreviousMorturyDao(str);
	}

	/*@Transactional
	@Override
	public List<MortuaryPmReport> updatePmReportService(Integer pmreport) {
	
		return mortuatydaointerfcae.updatePmReportDao(pmreport);
	}*/
	@Transactional
	@Override
	public MortuaryPmReport updatePmReportService(Integer pmreport_id) {
	
		return mortuatydaointerfcae.updatePmReportDao(pmreport_id);
	}
	
	
	@Transactional
	@Override
	public MortuaryMasterDto singlePreviousMorturayServices(Integer morid) {
		
		return mortuatydaointerfcae.singlePreviousMorturayDao(morid);
	}

	@Transactional
	@Override
	public MortuaryBodyTrackingDto previousBodyTracking(String str,Integer morid) {
		
	return mortuatydaointerfcae.previousBodyTracking(str, morid);
	
	}

	@Transactional
	@Override
	public List<MortuaryFindingsDto> preBodyFinding(Integer morid) {
		
		return mortuatydaointerfcae.preBodyFinding(morid);
	}

	@Transactional
	@Override
	public List<MortuaryDocUploadDto> preImagesDisplay(Integer morid) {
	
		
		return mortuatydaointerfcae.preImagesDisplay(morid);
	}

	

	@Transactional
	@Override
	public List<MortuaryBodyTrackingDto> fetchBodyTrackingInfo(Integer morId) {
		return mortuatydaointerfcae.fetchBodyTrackingInfo(morId);
	}

	@Transactional
	@Override
	public int uploadDeathCertificates(List<MortuaryDeathCertificateDto> dtoList, Integer morId) {
		return mortuatydaointerfcae.uploadDeathCertificates(dtoList, morId);
	}

	@Transactional
	@Override
	public List<MortuaryDeathCertificateDto> fetchcertificates(int morId) {
		return mortuatydaointerfcae.fetchcertificates(morId);
	}

	@Transactional
	@Override
	public boolean deleteDeathCertificate(Integer certiId) {
		return mortuatydaointerfcae.deleteDeathCertificate(certiId);
	}
	
	@Transactional
	@Override
	public MortuaryBodyTrackingDto editBodyTrackingInfo(int id) {
		return mortuatydaointerfcae.editBodyTrackingInfo(id);
	}
	//Added By Annapurna
	@Override
	@Transactional
	public CustomizeTemplate getTemplateListByTemplId(Integer id) {
		return mortuatydaointerfcae.getTemplateListByTemplateId(id);
	}

	@Override
	@Transactional
	public List<MortuaryPmReport> getPmReportforPrint(Integer pmreport) {
		// TODO Auto-generated method stub
		return mortuatydaointerfcae.getPmReportforPrint(pmreport);
	}
	
	@Override
	@Transactional
	public MortuaryPmReport updatedPmreoprtbyid(Integer pmreport) {
		
		return mortuatydaointerfcae.updatedPmreoprtbyid(pmreport);
	}
}