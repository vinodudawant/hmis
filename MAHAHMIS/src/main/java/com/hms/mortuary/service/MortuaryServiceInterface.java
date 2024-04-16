package com.hms.mortuary.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

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
//import com.sun.org.apache.bcel.internal.generic.LSTORE;

public interface MortuaryServiceInterface {

	public int saveColdRoomMaster(ColdRoomMasterDto cold);
	public List<ColdRoomMasterDto> fechColdRoomMasterService();
	public boolean deleteColdRoomMaster(int id,HttpServletRequest request);
	public ColdRoomMasterDto upadteColdRoomMaster(Integer cold);
	public ColdRoomMasterDto getBedAvaColdRoomService(Integer id);
	public MortuaryMasterDto fechMortuaryMasterService(Integer id);
	
	public int saveColdroommortuaryslave(Integer mor_id, Integer cold_room_id, Integer bed_no, Integer userId);
	public List<ColdRoomBedStatus> listOfmMasterDtos(Integer cold_room_id);
	
	public Coldroommortuaryslave fetchColdroommortuaryslave();
	public List<Object[]> getNoOfBeds(Integer id);
	
	public MortuaryMasterDto getMortuaryById(Integer mor_id);
	
	public int beddeAllocation(int cold_room_slave_id, int beddeAllocation);
	
	public List<MortuaryMasterDto> mortuaryAutosuggestion(String str);
	
	public int saveBodyTrackingInfo(MortuaryBodyTrackingDto dto, int morId, Integer userId);
	
    public CustomizeTemplate mortuartyTempInformation(Integer id);
	
	public String pmreportSaveMethod(MortuaryPmReport report, int morId);
	
	public List<MortuaryMasterDto> autosuggestionpreviousMorturySrevices(String str);
	
	//public List<MortuaryPmReport> updatePmReportService(Integer pmreport);//
	public MortuaryPmReport updatePmReportService(Integer pmreport_id);//
	public List<MortuaryPmReport> getPmReportforPrint(Integer pmreport);//
	
	public MortuaryMasterDto singlePreviousMorturayServices(Integer morid);
	
	public List<MortuaryBodyTrackingDto> fetchBodyTrackingInfo(Integer morId);
	
	 public int uploadDeathCertificates(List<MortuaryDeathCertificateDto> certiList, Integer morId);
	public List<MortuaryDeathCertificateDto> fetchcertificates(int morId);
	public boolean deleteDeathCertificate(Integer certiId);
	public MortuaryBodyTrackingDto previousBodyTracking(String str, Integer morid);
	public List<MortuaryFindingsDto> preBodyFinding(Integer morid);
	public List<MortuaryDocUploadDto> preImagesDisplay(Integer morid);
	
	public MortuaryBodyTrackingDto editBodyTrackingInfo(int id);
	//Added By Annapurna
	public CustomizeTemplate getTemplateListByTemplId(Integer id);	
	public MortuaryPmReport updatedPmreoprtbyid(Integer morId);
}
