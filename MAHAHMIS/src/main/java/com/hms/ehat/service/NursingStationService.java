package com.hms.ehat.service;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;

import org.springframework.web.bind.annotation.RequestParam;

import com.hms.ehat.dto.NursingReAssessment1DayDTO;
import com.hms.ehat.dto.OneDayAssessmentDTO;
import com.hms.ehat.dto.PersonalHygieneChartDTO;
import com.hms.ehat.dto.GlasgowComaScorePage4DTO;
import com.hms.ehat.dto.DVTScoreDTO;
import com.hms.ehat.dto.GlasgowComaScoreDTO;
import com.hms.ehat.dto.HygieneChecklistDTO;
import com.hms.ehat.dto.InvasionSiteCareDTO;
import com.hms.ehat.dto.MFRAScoreDTO;
import com.hms.ehat.dto.MFRAScorePage4DTO;
import com.hms.ehat.dto.NursingCarePlanDTO;
import com.hms.ehat.dto.NursingCarePlanPage4DTO;
import com.hms.ehat.dto.PlanTreatDTO;
import com.hms.ehat.dto.PrePostDetailsDTO;
import com.hms.ehat.dto.SASScoreDTO;
import com.hms.ehat.dto.UlcerRiskScoreDTO;
import com.hms.ehat.dto.UlcerRiskScorePage4DTO;
import com.hms.ehat.dto.VIPScoreDTO;
import com.hms.ehat.dto.assessmentpediatric2DTO;
import com.hms.ehat.dto.assessmentpediatric3DTO;
import com.hms.ehat.dto.assessmentpediatricDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingthreeDTO;
import com.hms.ehat.dto.nursingtwoDTo;


public interface NursingStationService {
	
		
	//@author Sufiyan @date 3-March-2018 @code for Patient Personal Hygiene Information
	public int savePersonalHygieneChart(PersonalHygieneChartDTO objDTO, HttpServletRequest request);	
	
	//@author Sufiyan @date 3-March-2018 @code for Patient Personal Hygiene Information
	public List<PersonalHygieneChartDTO> fetchPersonalHygieneChart(int treatmentId, String date);
	
	//@author Sufiyan @date 3-March-2018 @code for save Invasion Site Care
	public int saveInvasionSiteCare(InvasionSiteCareDTO objDTO, HttpServletRequest request);
	
	//@author Sufiyan @date 10-March-2018 @code for save Invasion Site Care
	public int deleteInvasiveSiteCareRecord(int id, HttpServletRequest request);
	
	//@author Sufiyan @date 10-March-2018 @code for save Invasion Site Care
	public int deleteHandHygieneRecord(int id, HttpServletRequest request);
	
	//@author Sufiyan @date 10-March-2018 @code for save Invasion Site Care
	public int deleteNursingCarePlanRecord(int id, HttpServletRequest request);
	
	//@author Sufiyan @date 10-March-2018 @code for save Invasion Site Care
	public int deleteSASRecord(int id, HttpServletRequest request);
	
	//@author Sufiyan @date 10-March-2018 @code for save Invasion Site Care
	public int deleteNCPPage4Record(int id, HttpServletRequest request);
	
	//@author Sufiyan @date 3-March-2018 @code for fetch Invasion Site Care
	public List<InvasionSiteCareDTO> fetchInvasionSiteCareInformation(int treatmentId, String date);
	
	//@author Sufiyan @date 5-March-2018 @code for save Nursing Care Plan
	public int saveNursingCarePlan(NursingCarePlanDTO objDTO,HttpServletRequest request);
	
	//@author Sufiyan @date 3-March-2018 @code for fetch Nursing Care Plan
	public List<NursingCarePlanDTO> fetchNursingCarePlan(int treatmentId, String date);

	//@author Sufiyan @date 5-March-2018 @code for save Hand Hygiene Checklist
	public int saveHygieneChecklist(HygieneChecklistDTO objDTO,HttpServletRequest request);
		
	//@author Sufiyan @date 5-March-2018 @code for fetch Hand Hygiene Checklist
	public List<HygieneChecklistDTO> fetchHandHygieneChecklist(int treatmentId,String date);
	
	//@author Sufiyan @date 6-March-2018 @code for save Ulcer Risk Score
	public int saveUlcerRiskScore(UlcerRiskScoreDTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 6-March-2018 @code for fetch Ulcer Risk Score
	public List <UlcerRiskScoreDTO>fetchUlcerRiskScore(int ulcerRiskScoreId,
			int treatmentId,String date);
	
	//@author Sufiyan @date 6-March-2018 @code for save Glasgow Coma Score
	public int saveGlasgowComaScore(GlasgowComaScoreDTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 6-March-2018 @code for fetch Ulcer Risk Score
	public List <GlasgowComaScoreDTO>fetchGlasgowComaScore(int glassgowScoreId,
				int treatmentId,String date);
		
	//@author Sufiyan @date 6-March-2018 @code for save VIP Score
	public int saveVIPScoreAndActionTaken(VIPScoreDTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 6-March-2018 @code for fetch VIP Score
	public List <VIPScoreDTO>fetchVIPScore(int treatmentId,String date);	
	
	//@author Sufiyan @date 7-March-2018 @code for save DVT Score
	public int saveDVTScore(DVTScoreDTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 7-March-2018 @code for fetch DVT Score 
	public List <DVTScoreDTO>fetchDVTScore(int treatmentId,String date);	
	
	//@author Sufiyan @date 7-March-2018 @code for save MFRA Score 
	public int saveMFRAScore(MFRAScoreDTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 7-March-2018 @code for fetch MFRA Score 
	public List <MFRAScoreDTO>fetchMFRAScore(int treatmentId,String date);	
	
	//@author Sufiyan @date 7-March-2018 @code for save SAS Score 
	public int saveSASScore(SASScoreDTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 7-March-2018 @code for fetch SAS Score 
	public List <SASScoreDTO>fetchSASScore(int treatmentId,String date);
	
	//@author Sufiyan @date 8-March-2018 @code for save Glasgow Coma Score for Page 4
	public int saveGlasgowComaScorePage4(GlasgowComaScorePage4DTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 8-March-2018 @code for fetch Glasgow Coma Score for Page 4
	public List <GlasgowComaScorePage4DTO>fetchGlasgowComaScorePage4(int treatmentId,String date);
	
	//@author Sufiyan @date 8-March-2018 @code for save MFRA Score for Page 4
	public int saveMFRAScorePage4(MFRAScorePage4DTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 8-March-2018 @code for fetch MFRA Score 
	public List <MFRAScorePage4DTO>fetchMFRAScorePage4(int treatmentId,String date);	
	
	//@author Sufiyan @date 8-March-2018 @code for save Ulcer Risk Score for page 4
	public int saveUlcerRiskScorePage4(UlcerRiskScorePage4DTO objDto,HttpServletRequest request);
	
	//@author Sufiyan @date 8-March-2018 @code for fetch  Ulcer Risk Score for page 4
	public List <UlcerRiskScorePage4DTO>fetchUlcerRiskScorePage4(int treatmentId,String date);
	
	//@author Sufiyan @date 8-March-2018 @code for save Nursing Care Plan for page 4
	public int saveNursingCarePlanPage4(NursingCarePlanPage4DTO objDTO,
			HttpServletRequest request);
	
	//@author Sufiyan @date 8-March-2018 @code for fetch Nursing Care Plan for page 4
	public List<NursingCarePlanPage4DTO> fetchNursingCarePlanPage4(int treatmentId, String date);
	
	
	public int saveNursingAssessmentData03(nursingthreeDTO objDto,HttpServletRequest request);
	
	public List<nursingthreeDTO> NursingA3fetchData(int patientId,int treatmentId);
	

	public int saveOneDayAssessment(OneDayAssessmentDTO objDto,HttpServletRequest request);

	public OneDayAssessmentDTO fetchAssessmentOneDayInformation(int patientId,int treatmentId);

	public int saveAssessmentPediatric(assessmentpediatricDTO objDto,HttpServletRequest request);
	
	public List<assessmentpediatricDTO> fetchInitalNursingAssessment(int patientId,int treatmentId);

	public int saveAssessmentPediatric2(assessmentpediatric2DTO objDto,HttpServletRequest request);
	
	public List<assessmentpediatric2DTO> fetchInitalNursingAssessment2(int patientId,int treatmentId);

	public int saveAssessmentPediatric3(assessmentpediatric3DTO objDto,HttpServletRequest request);
	
	public assessmentpediatric3DTO fetchInitalNursing3Page(int patientId,int treatmentId);

	public int deleteVerbalData(String idVerbal,HttpServletRequest request);
	
	public int deleteInterventionData(String idIntervention,HttpServletRequest request);
	
	public int savePrePostData(PrePostDetailsDTO objDto,HttpServletRequest request);
	
	public List<PrePostDetailsDTO> fetchprepostData(int patientId,int treatmentId);

	public int saveNursingAssessmentData01(nursingAsmentDataDTO objDto,HttpServletRequest request);
	
	public List<nursingAsmentDataDTO> fetchNursingAs(int patientId,int treatmentId);

	public int saveNursingAssessmentData02(nursingtwoDTo objDto,HttpServletRequest request);
	
	public List<nursingtwoDTo> NursingA2fetchData(int patientId,int treatmentId);

	public int savePlanTreatDetail(PlanTreatDTO objDto,HttpServletRequest request);

	public List<PlanTreatDTO> fetchPlanTreatData(int patientId,int treatmentId);

	public int deleteOtRowData(String idVerbal,HttpServletRequest request);
	
public int deleteNRARecord(int id,HttpServletRequest request);
	
	public List<NursingReAssessment1DayDTO> fetchReAssessment(int id);
	
}