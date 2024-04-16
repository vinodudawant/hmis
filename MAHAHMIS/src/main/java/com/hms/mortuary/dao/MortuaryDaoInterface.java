package com.hms.mortuary.dao;


import java.util.List;

import com.hms.administrator.dto.CustomizeTemplate;
import com.hms.mortuary.dto.ColdRoomMasterDto;
import com.hms.mortuary.dto.Coldroommortuaryslave;
import com.hms.mortuary.dto.MortuaryBodyTrackingDto;
import com.hms.mortuary.dto.MortuaryDeathCertificateDto;
import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;
import com.hms.mortuary.dto.MortuaryPmReport;
import com.hms.mortuary.dto.ColdRoomBedStatus;

public interface MortuaryDaoInterface {
	
	public int saveDaoColdRoomMaster(ColdRoomMasterDto cold);
	
	public List<ColdRoomMasterDto> fechColdRoomMaster();
	public boolean deleteColdRoomMaster(Integer id,Integer userId);
	public ColdRoomMasterDto updateColdRoomMaster(Integer cold);
	public ColdRoomMasterDto getBedAvaColdRoomDao(Integer id);
	public MortuaryMasterDto fechMortuaryMasterDto(Integer id);

	public int saveColdroommortuaryslave(Integer mor_id, Integer cold_room_id, Integer bed_no, Integer userId);
	
	public List<ColdRoomBedStatus> listOfMortuaryMasterDtos(Integer cold_room_id);
	
	public Coldroommortuaryslave fechLastColdroommortuaryslave();
	public List<Object[]> getNoOfBeds(Integer id);
	
	public MortuaryMasterDto fetchMortuaryById(Integer mor_id);
	public int deallocateBed(Integer cold_room_slave_id, Integer userId );
	
	public List<MortuaryMasterDto> mortuaryAutoSugesstion(String str);
	
	public int saveBodyTrackingInfo(MortuaryBodyTrackingDto dto, int morId, Integer userId);
	

	public CustomizeTemplate mortuaryTemplateinformation(Integer id);
	
	public String pmreportSaveMethod(MortuaryPmReport report, int morId);
	
	public List<MortuaryMasterDto> autosuggestionpreviousMorturyDao(String str);
	
	//public List<MortuaryPmReport> updatePmReportDao(Integer pmreport_id);	//
	public MortuaryPmReport updatePmReportDao(Integer pmreport_id);	//
	public List<MortuaryPmReport> getPmReportforPrint(Integer pmreport);	//
	public MortuaryMasterDto singlePreviousMorturayDao(Integer morid);
	
	public List<MortuaryBodyTrackingDto> fetchBodyTrackingInfo(Integer morId);
	
	public int uploadDeathCertificates(List<MortuaryDeathCertificateDto> dtoList, Integer morId);

	public List<MortuaryDeathCertificateDto> fetchcertificates(int morId);

	public boolean deleteDeathCertificate(Integer certiId);
	
public MortuaryBodyTrackingDto previousBodyTracking(String str,Integer morid);
	
	public List<MortuaryFindingsDto> preBodyFinding(Integer morid);
	public List<MortuaryDocUploadDto> preImagesDisplay(Integer morid);
	
	public MortuaryBodyTrackingDto editBodyTrackingInfo(int id);

//added by Annapurna
	public MortuaryPmReport updatedPmreoprtbyid(Integer morId);
    CustomizeTemplate getTemplateListByTemplateId(Integer id);



	
}
