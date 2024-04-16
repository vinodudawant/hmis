package com.hms.ivf.dao;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.ehat.dto.RegistrationViewDto2;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ivf.dto.IVFAutoSummaryDischargeDTO;
import com.hms.ivf.dto.IVFCpoeServdetails;
import com.hms.ivf.dto.IVFDietDTO;
import com.hms.ivf.dto.IVFDignosisDTO;
import com.hms.ivf.dto.IVFOTNotesDTO;
import com.hms.ivf.dto.IVFRegPatientDTO;
import com.hms.ivf.dto.IVFTreatmentDTO;
import com.hms.ivf.dto.IvfBillDetailsDto;

public interface IVFDoctorDeskDao {
	List<IVFRegPatientDTO> getListIVFRegPatientDTO(String pageName);
	
	IVFRegPatientDTO getIvfPatientInfoByIVFTreatId(Integer ivfTreatId);
	

	
	int setProvisinalOrConfirmDignosisType(Integer ivfdignoMasterId,String dignosisType);
	
	int saveIVFDiet(IVFDietDTO obj);
	
	List<IVFDietDTO> getListOfIVFDiet(Integer ivfTreatId,Integer unitId);
	
	int deleteIVFDiet(String  ivfdietMasterId,Integer userId);
	
	IVFDietDTO editIVFDiet(Integer ivfdietMasterId);
	
	List<IVFDietDTO> getIVFDietListForPrint(String ivfdietMasterIds);
	
	int savecpoe(IvfBillDetailsDto billDetailsDto, String queryType);
	
	List<IVFCpoeServdetails> getlistbiil(Integer pID, String callform, Integer servid);
	
	int deleteservdetails(String labservicelist, Integer userId, String callform);
	
int saveAutoIvfDischargeSummery(IVFAutoSummaryDischargeDTO obj);
	
	IVFAutoSummaryDischargeDTO getIvfAutoSummary(Integer ivfTreatId);
	
	List<IVFTreatmentDTO> getPrevIvfPatdetails(Integer patientId);
	
	RegistrationViewDto autoSuggestionOfPrevIvfPatient(String findingName,int patSearchType,String callFrom);
	
	List<IVFRegPatientDTO> getPreviousIvfPatientTreatment(String letter, String usertype, Integer unitId);
	
	List<IVFRegPatientDTO> getIvfPatientTreatmentForDD(String letter, String usertype, Integer unitId);
	
List<IVFRegPatientDTO> getIvfPreviousAutoSummaryList();
	
	List<IVFRegPatientDTO> getIvfTreatmentListByPatientId(Integer patinetId);
	
List<IVFRegPatientDTO> autoSuggestionForPriviousAuttosummary(String searchText);
	
	IVFRegPatientDTO getPatientInfoByPatientId(Integer patientId);
	
int saveIvfAutoSummaryOTNotes(IVFOTNotesDTO obj);
	
	IVFOTNotesDTO getIvfOTNotes(Integer ivfTreatId);
	
	public List<IVFRegPatientDTO> getPatientOnIvfDoctorDesk(String fromDate,String toDate ,String  page);
	
}
