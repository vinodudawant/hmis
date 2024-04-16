package com.hms.mortuary.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.mortuary.dto.MortuaryDocUploadDto;
import com.hms.mortuary.dto.MortuaryFindingsDto;
import com.hms.mortuary.dto.MortuaryMasterDto;

public interface MortuaryRegisterservice {

	
	public int saveMortuaryRegisterData(MortuaryMasterDto mortuaryegister);
	public MortuaryMasterDto getInternalPatientData(Integer patientid);

	public List<MortuaryMasterDto> getAllMortuaryRegisterPatient(String callform) ;

	public MortuaryMasterDto editmortuarydetails(Integer morId);

	public List<MortuaryMasterDto> autosuggesationMortuaryPatient(
			String findingName,String type);

	public boolean deletemortuarydetails(MortuaryMasterDto morturay);
	
	public List<MortuaryMasterDto> getDatewiseData(String from_date,
			String to_date,String type);

	public int saveFindings(String listfindingsmortuary,int morId,
			HttpServletRequest request);

	public List<MortuaryFindingsDto> fetchfindings(int mortuaryId);
	
	public int UploadMortuaryimages(List<MortuaryDocUploadDto> docList,int morId);

	public List<MortuaryDocUploadDto> fetchDoc(int mortuaryId);

	public String deletedocmortuary(int imgid, int userId);
	
	public boolean deleteFindings(String findingsId,HttpServletRequest request);
	
	
}
