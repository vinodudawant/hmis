package com.hms.ehat.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.ehat.dto.GlasgowComaScorePage4DTO;
import com.hms.ehat.dao.NursingStationDao;
import com.hms.ehat.dto.DVTScoreDTO;
import com.hms.ehat.dto.GlasgowComaScoreDTO;
import com.hms.ehat.dto.HygieneChecklistDTO;
import com.hms.ehat.dto.InvasionSiteCareDTO;
import com.hms.ehat.dto.MFRAScoreDTO;
import com.hms.ehat.dto.MFRAScorePage4DTO;
import com.hms.ehat.dto.NursingCarePlanDTO;
import com.hms.ehat.dto.NursingCarePlanPage4DTO;
import com.hms.ehat.dto.NursingReAssessment1DayDTO;
import com.hms.ehat.dto.OneDayAssessmentDTO;
import com.hms.ehat.dto.PersonalHygieneChartDTO;
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
import com.hms.ehat.service.NursingStationService;


@Service
public class NursingStationServiceImpl implements NursingStationService{
	
	@Autowired
	NursingStationDao NursingStationDao;
	
	
	@Override
	@Transactional
	public int savePersonalHygieneChart(PersonalHygieneChartDTO objDTO, HttpServletRequest request){
		
		return NursingStationDao.savePersonalHygieneChart(objDTO, request);
	}
	
	@Override
	@Transactional
	public List<PersonalHygieneChartDTO> fetchPersonalHygieneChart(int treatmentId, String date){
		
		return NursingStationDao.fetchPersonalHygieneChart(treatmentId, date);
	}
	
	
	@Override
	@Transactional
	public int saveInvasionSiteCare(InvasionSiteCareDTO objDTO,
			HttpServletRequest request) {

		return NursingStationDao.saveInvasionSiteCare(objDTO, request);
	}
	
	@Override
	@Transactional
	public int deleteInvasiveSiteCareRecord(int id,HttpServletRequest request){
		
		return NursingStationDao.deleteInvasiveSiteCareRecord(id,request);
	}
	
	@Override
	@Transactional
	public List<InvasionSiteCareDTO> fetchInvasionSiteCareInformation(int treatmentId, String date
			){
		
		return NursingStationDao.fetchInvasionSiteCareInformation(treatmentId, date);
	}
	
	@Override
	@Transactional
	public int saveNursingCarePlan(NursingCarePlanDTO objDTO,HttpServletRequest request) {

		return NursingStationDao.saveNursingCarePlan(objDTO, request);
	}
	
	@Override
	@Transactional
	public List<NursingCarePlanDTO> fetchNursingCarePlan(int treatmentId, String date){
		
		return NursingStationDao.fetchNursingCarePlan(treatmentId, date);
	}
	
	@Override
	@Transactional
	public int saveHygieneChecklist(HygieneChecklistDTO objDTO,HttpServletRequest request) {

		return NursingStationDao.saveHygieneChecklist(objDTO, request);
	}
	
	@Override
	@Transactional
	public List<HygieneChecklistDTO> fetchHandHygieneChecklist(int treatmentId,String date) {

		return NursingStationDao.fetchHandHygieneChecklist(treatmentId,date);
	}

	@Override
	@Transactional
	public int saveUlcerRiskScore(UlcerRiskScoreDTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveUlcerRiskScore(objDto,request);
	}
	
	@Override
	@Transactional
	public List <UlcerRiskScoreDTO>fetchUlcerRiskScore(int ulcerRiskScoreId,
			int treatmentId,String date){
		
		return NursingStationDao.fetchUlcerRiskScore(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveGlasgowComaScore(GlasgowComaScoreDTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveGlasgowComaScore(objDto ,request);
	}
	
	@Override
	@Transactional
	public List <GlasgowComaScoreDTO>fetchGlasgowComaScore(int glassgowScoreId,
			int treatmentId,String date){
		
		return NursingStationDao.fetchGlasgowComaScore(glassgowScoreId,treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveVIPScoreAndActionTaken(VIPScoreDTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveVIPScoreAndActionTaken(objDto ,request);
	}
	
	@Override
	@Transactional	
	public List <VIPScoreDTO>fetchVIPScore(int treatmentId,String date){
		
		return NursingStationDao.fetchVIPScore(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveDVTScore(DVTScoreDTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveDVTScore(objDto ,request);
	}
	
	@Override
	@Transactional	
	public List <DVTScoreDTO>fetchDVTScore(int treatmentId,String date ){
		
		return NursingStationDao.fetchDVTScore(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveMFRAScore(MFRAScoreDTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveMFRAScore(objDto ,request);
	}
	
	@Override
	@Transactional	
	public List <MFRAScoreDTO>fetchMFRAScore(int treatmentId,String date ){
		
		return NursingStationDao.fetchMFRAScore(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveSASScore(SASScoreDTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveSASScore(objDto ,request);
	}
	
	@Override
	@Transactional	
	public List <SASScoreDTO>fetchSASScore(int treatmentId,String date ){
		
		return NursingStationDao.fetchSASScore(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveGlasgowComaScorePage4(GlasgowComaScorePage4DTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveGlasgowComaScorePage4(objDto ,request);
	}
	
	@Override
	@Transactional
	public List <GlasgowComaScorePage4DTO>fetchGlasgowComaScorePage4(int treatmentId,String date){
		
		return NursingStationDao.fetchGlasgowComaScorePage4(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveMFRAScorePage4(MFRAScorePage4DTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveMFRAScorePage4(objDto ,request);
	}
	
	@Override
	@Transactional
	public List <MFRAScorePage4DTO>fetchMFRAScorePage4(int treatmentId,String date )	{
		
		return NursingStationDao.fetchMFRAScorePage4(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveUlcerRiskScorePage4(UlcerRiskScorePage4DTO objDto,HttpServletRequest request){
		
		return NursingStationDao.saveUlcerRiskScorePage4(objDto ,request);
	}
	
	@Override
	@Transactional
	public List <UlcerRiskScorePage4DTO>fetchUlcerRiskScorePage4(int treatmentId,String date){
		
		return NursingStationDao.fetchUlcerRiskScorePage4(treatmentId,date);
	}
		
	@Override
	@Transactional
	public int saveNursingCarePlanPage4(NursingCarePlanPage4DTO objDTO,
			HttpServletRequest request){
		
		return NursingStationDao.saveNursingCarePlanPage4(objDTO ,request);
	}
	
		
	@Override
	@Transactional
	public List<NursingCarePlanPage4DTO> fetchNursingCarePlanPage4(int treatmentId, String date){
		
		return NursingStationDao.fetchNursingCarePlanPage4(treatmentId,date);
	}
	
	@Override
	@Transactional
	public int saveNursingAssessmentData03(nursingthreeDTO objDto,HttpServletRequest request) {

		return NursingStationDao.saveNursingAssessmentData03(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<nursingthreeDTO> NursingA3fetchData(int patientId,int treatmentId){
		
		return NursingStationDao.NursingA3fetchData(patientId, treatmentId);
		
	}
			
	@Override
	@Transactional
	public int saveOneDayAssessment(OneDayAssessmentDTO objDto,HttpServletRequest request) {

		return NursingStationDao.saveOneDayAssessment(objDto,request);
		
	}
	
	
	@Override
	@Transactional
	public OneDayAssessmentDTO fetchAssessmentOneDayInformation(int patientId,int treatmentId){
		
		return NursingStationDao.fetchAssessmentOneDayInformation(patientId, treatmentId);
		
	}

	@Override
	@Transactional
	public int saveAssessmentPediatric(assessmentpediatricDTO objDto,HttpServletRequest request) {

		return NursingStationDao.saveAssessmentPediatric(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<assessmentpediatricDTO> fetchInitalNursingAssessment(int patientId,int treatmentId){
		
		return NursingStationDao.fetchInitalNursingAssessment(patientId, treatmentId);
		
	}

	@Override
	@Transactional
	public int saveAssessmentPediatric2(assessmentpediatric2DTO objDto,HttpServletRequest request) {

		return NursingStationDao.saveAssessmentPediatric2(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<assessmentpediatric2DTO> fetchInitalNursingAssessment2(int patientId,int treatmentId){
		
		return NursingStationDao.fetchInitalNursingAssessment2(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int saveAssessmentPediatric3(assessmentpediatric3DTO objDto,HttpServletRequest request) {

		return NursingStationDao.saveAssessmentPediatric3(objDto,request);
		
	}
	
	@Override
	@Transactional
	public assessmentpediatric3DTO fetchInitalNursing3Page(int patientId,int treatmentId){
		
		return NursingStationDao.fetchInitalNursing3Page(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int deleteVerbalData(String idVerbal,HttpServletRequest request) {

		return NursingStationDao.deleteVerbalData(idVerbal,request);
		
	}
	
	@Override
	@Transactional
	public int deleteInterventionData(String idIntervention,HttpServletRequest request) {

		return NursingStationDao.deleteInterventionData(idIntervention,request);
		
	}
	
	
	@Override
	@Transactional
	public int savePrePostData(PrePostDetailsDTO objDto,HttpServletRequest request) {

		return NursingStationDao.savePrePostData(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<PrePostDetailsDTO> fetchprepostData(int patientId,int treatmentId){
		
		return NursingStationDao.fetchprepostData(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int saveNursingAssessmentData01(nursingAsmentDataDTO objDto,HttpServletRequest request) {

		return NursingStationDao.saveNursingAssessmentData01(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<nursingAsmentDataDTO> fetchNursingAs(int patientId,int treatmentId){
		
		return NursingStationDao.fetchNursingAs(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int saveNursingAssessmentData02(nursingtwoDTo objDto,HttpServletRequest request) {

		return NursingStationDao.saveNursingAssessmentData02(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<nursingtwoDTo> NursingA2fetchData(int patientId,int treatmentId){
		
		return NursingStationDao.NursingA2fetchData(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int deleteHandHygieneRecord(int id, HttpServletRequest request){
		
		return NursingStationDao.deleteHandHygieneRecord(id,request);
		
	}
	
	@Override
	@Transactional
	public int deleteNursingCarePlanRecord(int id, HttpServletRequest request){
		
		return NursingStationDao.deleteNursingCarePlanRecord(id,request);
		
	}
	
	@Override
	@Transactional
	public int deleteSASRecord(int id, HttpServletRequest request){
		
		return NursingStationDao.deleteSASRecord(id,request);
		
	}	
	
	@Override
	@Transactional
	public int deleteNCPPage4Record(int id, HttpServletRequest request){
		
		return NursingStationDao.deleteNCPPage4Record(id,request);
		
	}
	
	@Override
	@Transactional
	public int savePlanTreatDetail(PlanTreatDTO objDto,HttpServletRequest request) {

		return NursingStationDao.savePlanTreatDetail(objDto,request);
		
	}
	
	@Override
	@Transactional
	public List<PlanTreatDTO> fetchPlanTreatData(int patientId,int treatmentId){
		
		return NursingStationDao.fetchPlanTreatData(patientId, treatmentId);
		
	}
	
	@Override
	@Transactional
	public int deleteOtRowData(String idVerbal,HttpServletRequest request) {

		return NursingStationDao.deleteOtRowData(idVerbal,request);
		
	}

@Override
	@Transactional
	public int deleteNRARecord(int id,HttpServletRequest request){

		return NursingStationDao.deleteNRARecord(id,request);
		
	}
	
	@Override
	@Transactional
	public List<NursingReAssessment1DayDTO> fetchReAssessment(int id){
		
		return NursingStationDao.fetchReAssessment(id);
		
	}

}