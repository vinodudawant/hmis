package com.hms.ehat.dao.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.NursingStationDao;
import com.hms.ehat.dto.DVTScoreDTO;
import com.hms.ehat.dto.GlasgowComaScoreDTO;
import com.hms.ehat.dto.GlasgowComaScorePage4DTO;
import com.hms.ehat.dto.HygieneChecklistDTO;
import com.hms.ehat.dto.InterventionDTO;
import com.hms.ehat.dto.InvasionSiteCareDTO;
import com.hms.ehat.dto.MFRAScoreDTO;
import com.hms.ehat.dto.MFRAScorePage4DTO;
import com.hms.ehat.dto.NursingCarePlanDTO;
import com.hms.ehat.dto.NursingCarePlanPage4DTO;
import com.hms.ehat.dto.NursingReAssessment1DayDTO;
import com.hms.ehat.dto.OneDayAssessmentDTO;
import com.hms.ehat.dto.OutputDTO;
import com.hms.ehat.dto.PersonalHygieneChartDTO;
import com.hms.ehat.dto.PlanTreatDTO;
import com.hms.ehat.dto.PrePostDetailsDTO;
import com.hms.ehat.dto.UlcerRiskScoreDTO;
import com.hms.ehat.dto.UlcerRiskScorePage4DTO;
import com.hms.ehat.dto.VIPScoreDTO;
import com.hms.ehat.dto.SASScoreDTO;
import com.hms.ehat.dto.VerbalDTO;
import com.hms.ehat.dto.assessmentpediatric2DTO;
import com.hms.ehat.dto.assessmentpediatric3DTO;
import com.hms.ehat.dto.assessmentpediatricDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingthreeDTO;
import com.hms.ehat.dto.nursingtwoDTo;


@Repository
@SuppressWarnings("unchecked")
public class NursingStationDaoImpl implements NursingStationDao{

	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public int savePersonalHygieneChart(PersonalHygieneChartDTO objDTO, HttpServletRequest request){

		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				for(PersonalHygieneChartDTO objDTO1 : objDTO.getListPHC()){
					
					int id = objDTO1.getPersonalHygieneId();
					String AllRecords[] =objDTO1.getAllInstructions().split("@#");
					String Times="";
					String Shifts="";
					String Procedures="";
					String Signs = "";
					String mIns = objDTO1.getMorningInstructions();
					String eIns = objDTO1.getEveningInstructions();
					String nIns = objDTO1.getNightInstructions();
					
					for(String singleRecord : AllRecords){
						
						String[] fields = singleRecord.split("_,");
						String time = fields[1];
						String shift = fields[0];
						String procedure = fields[2];
						String sign = fields[3];
						
						Shifts = Shifts + shift+",";
						Times = Times +  time+",";
						Procedures =Procedures + procedure +",";
						Signs =Signs + sign +",";
							
					}
					objDTO1.setEveningInstructions(eIns);
					objDTO1.setMorningInstructions(mIns);
					objDTO1.setNightInstructions(nIns);
					objDTO1.setProcedure(Procedures);
					objDTO1.setTimes(Times);
					objDTO1.setShifts(Shifts);
					objDTO1.setSignatures(Signs);
					
					if(id==0){
						objDTO1.setAddedby(UserId);
						objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
						sessionFactory.getCurrentSession().save(objDTO1);
						result=1;
					}else{
						objDTO1.setUpdatedby(UserId);
						objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
						sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
						result=2;
					}
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
	}
	
	public List<PersonalHygieneChartDTO> fetchPersonalHygieneChart(int treatmentId, String date){
		
		List<PersonalHygieneChartDTO> listPHC = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PersonalHygieneChartDTO.class);
			
				if(!date.equalsIgnoreCase("allDates")){
					criteria.add(Restrictions.eq("date", date));
				}
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("status", "Y"));
					
				listPHC = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listPHC;
	}
	
	
	@Override
	public int saveInvasionSiteCare(InvasionSiteCareDTO objDTO,
			HttpServletRequest request){
		int result =0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				
				for(InvasionSiteCareDTO objDTO1 : objDTO.getListISC()){
					
					int id = objDTO1.getInvasiveSiteCareId();
					
					if(id==0){
						objDTO1.setAddedby(UserId);
						objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
						sessionFactory.getCurrentSession().save(objDTO1);
						result=1;
					}else{
						objDTO1.setUpdatedby(UserId);
						objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
						sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
						result=2;
					}
				}
				
			} catch (Exception e) {
				e.printStackTrace();
				result=0;
			}
			
		return result;
		
	}
	
	@Override
	public int deleteInvasiveSiteCareRecord(int id,HttpServletRequest request){
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			System.err.println("id :"+id);
				if(id!=0){
					String sql = "update ehat_ipd_invasive_site_care set status ='N',updated_by="+
									UserId+" where ipd_invasive_site_care_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	
}
	
	@Override
	public int deleteHandHygieneRecord(int id, HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_ipd_hygiene_checklist set status ='N',updated_by="+
									UserId+" where ipd_hygiene_checklist_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}
	
	
	@Override
	public int deleteSASRecord(int id, HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_ipd_sas_score set status ='N',updated_by="+
									UserId+" where ipd_sas_score_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}

	
	@Override
	public int deleteNCPPage4Record(int id, HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					
					String sql = "update ehat_ipd_nursing_care_plan_page4 set status ='N',updated_by="+
									UserId+" where ipd_nursing_care_plan_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}
	@Override
	public int deleteNursingCarePlanRecord(int id, HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
				if(id!=0){
					String sql = "update ehat_ipd_nursing_care_plan set status ='N',updated_by="+
									UserId+" where ipd_nursing_care_plan_id="+id;                    
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
				
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}
	@Override
	public List<InvasionSiteCareDTO> fetchInvasionSiteCareInformation(int treatmentId, String date){
		
		List<InvasionSiteCareDTO> listISC = null;
		try {
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(InvasionSiteCareDTO.class);
			
				if(!date.equalsIgnoreCase("allDates")){
					criteria.add(Restrictions.eq("date", date));
				}
				
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.add(Restrictions.eq("status", "Y"));
				listISC = criteria.list();	
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listISC;
	}

	@Override
	public int saveNursingCarePlan(NursingCarePlanDTO objDTO, HttpServletRequest request){
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(NursingCarePlanDTO objDTO1 : objDTO.getListNCP()){
				
				int id = objDTO1.getNursingCarePlanId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}
	
	
	@Override
	public List<NursingCarePlanDTO> fetchNursingCarePlan(int treatmentId, String date){

		List<NursingCarePlanDTO> listNCP = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(NursingCarePlanDTO.class);
					
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
					criteria.add(Restrictions.eq("status", "Y"));
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					listNCP = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listNCP;
	}
	
	
	@Override
	public int saveHygieneChecklist(HygieneChecklistDTO objDTO, HttpServletRequest request){
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(HygieneChecklistDTO objDTO1 : objDTO.getListHHC()){
				
				int id = objDTO1.getHygieneId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}
	
	@Override
	public List<HygieneChecklistDTO> fetchHandHygieneChecklist(int treatmentId, String date){

		List<HygieneChecklistDTO> listHHC = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(HygieneChecklistDTO.class);
					
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						
						criteria.add(Restrictions.eq("treatmentId", treatmentId));	
						criteria.add(Restrictions.eq("status", "Y"));
					listHHC = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listHHC;
	}
	
	@Override
	public int saveUlcerRiskScore(UlcerRiskScoreDTO objDto,HttpServletRequest request){
		
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(UlcerRiskScoreDTO objDTO1 : objDto.getListURS()){
				
				int id = objDTO1.getUlcerRiskScoreId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
		
	}
	
	@Override
	public List<UlcerRiskScoreDTO>fetchUlcerRiskScore(int treatmentId,String date ){
		
		List<UlcerRiskScoreDTO> listURS = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(UlcerRiskScoreDTO.class);
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						criteria.add(Restrictions.eq("treatmentId", treatmentId));
						criteria.add(Restrictions.eq("status", "Y"));
						
					listURS = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listURS;
	}
	
	
	@Override
	public int saveGlasgowComaScore(GlasgowComaScoreDTO objDto,HttpServletRequest request){

		
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(GlasgowComaScoreDTO objDTO1 : objDto.getListGCS()){
				
				int id = objDTO1.getGlasgowComaScoreId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;

	}

	@Override
	public List<GlasgowComaScoreDTO>fetchGlasgowComaScore(int glassgowScoreId,
			int treatmentId,String date ){

		
		List<GlasgowComaScoreDTO> listGCS = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(GlasgowComaScoreDTO.class);
					if(date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						criteria.add(Restrictions.eq("treatmentId", treatmentId));
						criteria.add(Restrictions.eq("status", "Y"));
					listGCS = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listGCS;
	
	}
	
	
	@Override
	public int saveVIPScoreAndActionTaken(VIPScoreDTO objDto ,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(VIPScoreDTO objDTO1 : objDto.getListVIP()){
				
				int id = objDTO1.getVipScoreId();
				
				if(id==0){
					objDTO1.setAddedBy(UserId);
					objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedBy(UserId);
					objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}
	
	
	@Override
	public List <VIPScoreDTO>fetchVIPScore(int treatmentId,String date){

		List<VIPScoreDTO> listVIP = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(VIPScoreDTO.class);
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						criteria.add(Restrictions.eq("treatmentId", treatmentId));
						criteria.add(Restrictions.eq("status", "Y"));
			
					listVIP = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listVIP;
	
	}
	
	@Override
	public int saveDVTScore(DVTScoreDTO objDto ,HttpServletRequest request){
		int result =0;
		
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			String clinicalFeatures="";
			String Times="";
			
			for(DVTScoreDTO objDTO1 : objDto.getListDVT()){
				
				int id = objDTO1.getDvtScoreId();
				String[] recordsArr = objDTO1.getRecord().split("#");
			
				for(String singleRecord : recordsArr){
					
					String[] fields = singleRecord.split(",");
					String time = fields[1];
					String cf  = fields[0];
						
					Times = Times+  time+",";
					clinicalFeatures =clinicalFeatures + cf +",";
						
				}
				
				if(id==0){
					
					objDTO1.setClinicalFeatures(clinicalFeatures);
					objDTO1.setTimes(Times);
					objDTO1.setAddedBy(UserId);
					objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					
					objDTO1.setClinicalFeatures(clinicalFeatures);
					objDTO1.setTimes(Times);
					objDTO1.setUpdatedBy(UserId);
					objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}
	
	@Override
	public List <DVTScoreDTO>fetchDVTScore(int treatmentId,String date){

		List<DVTScoreDTO> listDVT = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(DVTScoreDTO.class);
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						criteria.add(Restrictions.eq("treatmentId", treatmentId));
						criteria.add(Restrictions.eq("status", "Y"));
					
					listDVT= criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listDVT;
	}
	
	@Override	
	public int saveMFRAScore(MFRAScoreDTO objDto,HttpServletRequest request){

		int result =0;
		
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			String Factors="";
			String Times="";
			String Scores="";
			
			for(MFRAScoreDTO objDTO1 : objDto.getListMFRA()){
				
				int id = objDTO1.getMfraScoreId();
				String[] recordsArr = objDTO1.getRecords().split("#");
			
				for(String singleRecord : recordsArr){
					
					String[] fields = singleRecord.split(",");
					String time = fields[2];
					String score = fields[1];
					String factor = fields[0];
					
					Scores = Scores + score+",";
					Times = Times +  time+",";
					Factors =Factors + factor +",";
						
				}
				
				if(id==0){
					objDTO1.setScores(Scores);
					objDTO1.setFactors(Factors);
					objDTO1.setTimes(Times);
					objDTO1.setAddedBy(UserId);
					objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setScores(Scores);
					objDTO1.setFactors(Factors);
					objDTO1.setTimes(Times);
					objDTO1.setUpdatedBy(UserId);
					objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}
	
	@Override
	public List <MFRAScoreDTO>fetchMFRAScore(int treatmentId,String date){

		List<MFRAScoreDTO> listMFRA = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(MFRAScoreDTO.class);
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						criteria.add(Restrictions.eq("treatmentId", treatmentId));
						criteria.add(Restrictions.eq("status", "Y"));
					
					listMFRA= criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listMFRA;
	
	}
	
	@Override
	public int saveSASScore(SASScoreDTO objDto,HttpServletRequest request){

		int result =0;
		
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(SASScoreDTO objDTO1 : objDto.getListSAS()){
				
				int id = objDTO1.getSasScoreId();
				
				if(id==0){
					objDTO1.setAddedBy(UserId);
					objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedBy(UserId);
					objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	
	}
	
	public List <SASScoreDTO>fetchSASScore(int treatmentId,String date){

		List<SASScoreDTO> listSAS = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(SASScoreDTO.class);
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
						criteria.add(Restrictions.eq("treatmentId", treatmentId));
						criteria.add(Restrictions.eq("status", "Y"));
					
					listSAS= criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listSAS;
	}
	

	@Override
	public int saveGlasgowComaScorePage4(GlasgowComaScorePage4DTO objDto,HttpServletRequest request){

		
		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(GlasgowComaScorePage4DTO objDTO1 : objDto.getListGCS()){
				
				int id = objDTO1.getGlasgowComaScoreId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;

	}
	
	@Override
	public List <GlasgowComaScorePage4DTO>fetchGlasgowComaScorePage4(int treatmentId,String date){

		List<GlasgowComaScorePage4DTO> listGCS = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(GlasgowComaScorePage4DTO.class);
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("status", "Y"));
					
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
					
					listGCS = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listGCS;
	}

	@Override	
	public int saveMFRAScorePage4(MFRAScorePage4DTO objDto,HttpServletRequest request){

		int result =0;
		
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			String Factors="";
			String Times="";
			String Scores="";
			
			for(MFRAScorePage4DTO objDTO1 : objDto.getListMFRA()){
				
				int id = objDTO1.getMfraScoreId();
				String[] recordsArr = objDTO1.getRecords().split("#");
			
				for(String singleRecord : recordsArr){
					
					String[] fields = singleRecord.split(",");
					String time = fields[2];
					String score = fields[1];
					String factor = fields[0];
					
					Scores = Scores + score+",";
					Times = Times +  time+",";
					Factors =Factors + factor +",";
						
				}
				
				if(id==0){
					objDTO1.setScores(Scores);
					objDTO1.setFactors(Factors);
					objDTO1.setTimes(Times);
					objDTO1.setAddedBy(UserId);
					objDTO1.setAddedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setScores(Scores);
					objDTO1.setFactors(Factors);
					objDTO1.setTimes(Times);
					objDTO1.setUpdatedBy(UserId);
					objDTO1.setUpdatedDate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
	return result;
	}
	
	@Override	
	public List <MFRAScorePage4DTO>fetchMFRAScorePage4(int treatmentId,String date){

		List<MFRAScorePage4DTO> listMFRA = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(MFRAScorePage4DTO.class);
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("status", "Y"));
					
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
					listMFRA= criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listMFRA;
	}
	
	@Override	
	public int saveUlcerRiskScorePage4(UlcerRiskScorePage4DTO objDto,HttpServletRequest request){

		int result =0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(UlcerRiskScorePage4DTO objDTO1 : objDto.getListURS()){
				
				int id = objDTO1.getUlcerRiskScoreId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}
	
	
	@Override
	public List <UlcerRiskScorePage4DTO>fetchUlcerRiskScorePage4(int treatmentId,String date){
		
		List<UlcerRiskScorePage4DTO> listURS = null;
		try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(UlcerRiskScorePage4DTO.class);
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("status", "Y"));
					if(!date.equalsIgnoreCase("allDates")){
						criteria.add(Restrictions.eq("date", date));
					}
					listURS = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listURS;
	}
	
	@Override
	public int saveNursingCarePlanPage4(NursingCarePlanPage4DTO objDTO,
			HttpServletRequest request){
		int result =0;
		
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			for(NursingCarePlanPage4DTO objDTO1 : objDTO.getListNCP()){
				
				int id = objDTO1.getNursingCarePlanId();
				
				if(id==0){
					objDTO1.setAddedby(UserId);
					objDTO1.setAddeddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().save(objDTO1);
					result=1;
				}else{
					objDTO1.setUpdatedby(UserId);
					objDTO1.setUpdateddate(new Date(new java.util.Date().getTime()));
					sessionFactory.getCurrentSession().saveOrUpdate(objDTO1);
					result=2;
				}
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}

	@Override
	public List<NursingCarePlanPage4DTO> fetchNursingCarePlanPage4(int treatmentId, String date){

		List<NursingCarePlanPage4DTO> listNCP = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(NursingCarePlanPage4DTO.class);
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("status", "Y"));
					
						if(!date.equalsIgnoreCase("allDates")){
							criteria.add(Restrictions.eq("date", date));
						}
					listNCP = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listNCP;
	}
	
	@Override
	public int saveNursingAssessmentData03(nursingthreeDTO objDto,HttpServletRequest request){
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			int id =objDto.getIdNursingInitialAssessmentThree();
                if(id==0){
                	objDto.setAddedBy(UserId);
                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().save(objDto);
                    Result=1;
                }else{
                	objDto.setUpdatedBy(UserId);
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
	return Result;
	}
	
	@Override
	public List<nursingthreeDTO> NursingA3fetchData(int patientId,int treatmentId){
		
		
		List<nursingthreeDTO> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(nursingthreeDTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listInitial;
	}
	
	
	@Override
	public int saveOneDayAssessment(OneDayAssessmentDTO objDto,HttpServletRequest request){
				int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id = objDto.getIdnursing_assessment_one_day();
				
                    if(id==0){
                    	objDto.setAddedBy(UserId);
                    	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().save(objDto);
                        
                        int recordId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(
                        		"select max(idnursing_assessment_one_day) from ehat_nursing_assessment_one_day where patient_id ="+objDto.getpId()+"  and treatment_id = "+objDto.gettId()
                        		).uniqueResult()).intValue();
                        
                        
                        
                        if ((!objDto.getOtData().equals("")) && (!objDto.getOtData().equalsIgnoreCase(null))) {
							String[] vbfrdata = objDto.getOtData().split("#");
							int i = 0;
							
								for (String str : vbfrdata) {
									String[] finalValues = str.split("_");
									
									OutputDTO verbObj = new OutputDTO();
									verbObj.setIdnursing_assessment_one_day(recordId);
									verbObj.setTime(finalValues[0]);
									verbObj.setIv(finalValues[1]);
									verbObj.setAmt(finalValues[2]);
									verbObj.setUrine(finalValues[3]);
									verbObj.setStatus("Y");
									sessionFactory.getCurrentSession().save(verbObj);									
									
									i++;
							}
							
						}

						id = ((Integer)sessionFactory.getCurrentSession().createSQLQuery("SELECT max(idnursing_assessment_one_day) from ehat_nursing_assessment_one_day")
                        		.uniqueResult()).intValue();
                        for(NursingReAssessment1DayDTO objSlave : objDto.getReAssessmentList()){
                        	objSlave.setMasterId(id);
                        	sessionFactory.getCurrentSession().saveOrUpdate(objSlave);
                        }
                        
                        
                        Result=1;
                    }else{
                    	objDto.setUpdatedBy(UserId);
                    	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    	
                        sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                        
                        int recordId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(
                        		"select max(idnursing_assessment_one_day) from ehat_nursing_assessment_one_day where patient_id ="+objDto.getpId()+"  and treatment_id = "+objDto.gettId()
                        		).uniqueResult()).intValue();
                        
                        
                        
                        if ((!objDto.getOtData().equals("")) && (!objDto.getOtData().equalsIgnoreCase(null))) {
							String[] vbfrdata = objDto.getOtData().split("#");
							int i = 0;
							
								for (String str : vbfrdata) {
									String[] finalValues = str.split("_");
									
									OutputDTO verbObj = new OutputDTO();
									verbObj.setIdnursing_assessment_one_day(recordId);
									verbObj.setTime(finalValues[0]);
									verbObj.setIv(finalValues[1]);
									verbObj.setAmt(finalValues[2]);
									verbObj.setUrine(finalValues[3]);
									verbObj.setIdOutput((Integer.parseInt(finalValues[4])));
									verbObj.setStatus("Y");
									sessionFactory.getCurrentSession().saveOrUpdate(verbObj);									
									
									i++;
							}
							
						}
                        for(NursingReAssessment1DayDTO objSlave : objDto.getReAssessmentList()){
                        	objSlave.setMasterId(id);
                        	sessionFactory.getCurrentSession().saveOrUpdate(objSlave);
                        }
                        Result=2;
                    }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
	
	
	
	@Override
	public OneDayAssessmentDTO fetchAssessmentOneDayInformation(int patientId,int treatmentId){
		OneDayAssessmentDTO obj=new OneDayAssessmentDTO();
		List<OutputDTO> slavlist = null;
		List<OneDayAssessmentDTO> listOneDay = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(OneDayAssessmentDTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listOneDay = criteria.list();
			
					if(listOneDay.size()!= 0){
						int recordId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(
	                    		"select idnursing_assessment_one_day from ehat_nursing_assessment_one_day where patient_id="+patientId+" and treatment_id="+treatmentId
	                    		).uniqueResult()).intValue();
						
						
						Criteria criteria1 = sessionFactory.getCurrentSession()
								.createCriteria(OutputDTO.class);
						criteria1.add(Restrictions.eq("idnursing_assessment_one_day", recordId));
						criteria1.add(Restrictions.eq("status", "Y"));
						slavlist = criteria1.list();
					}
					obj.setListOneDay(listOneDay);
					obj.setoTList(slavlist);
					
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return obj;
	}
	
	
	@Override
	public int saveAssessmentPediatric(assessmentpediatricDTO objDto,HttpServletRequest request){
				int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdnursing_assessment_paediatric();
				
				   
				 if(id==0){
                    	objDto.setAddedBy(UserId);
                    	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().save(objDto);
                        Result=1;
                    }else{
                    	objDto.setUpdatedBy(UserId);
                    	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                        Result=2;
                    }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
	
	@Override
	public List<assessmentpediatricDTO> fetchInitalNursingAssessment(int patientId,int treatmentId){
		
		
		List<assessmentpediatricDTO> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(assessmentpediatricDTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}
	
	@Override
	public int saveAssessmentPediatric2(assessmentpediatric2DTO objDto,HttpServletRequest request){
				int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdnursing_assessment_paediatric_page_two();
				
                   
				 if(id==0){
                    	objDto.setAddedBy(UserId);
                    	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().save(objDto);
                        Result=1;
                    }else{
                    	objDto.setUpdatedBy(UserId);
                    	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    	
                        sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                        Result=2;
                    }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}

	@Override
	public List<assessmentpediatric2DTO> fetchInitalNursingAssessment2(int patientId,int treatmentId){
		
		
		List<assessmentpediatric2DTO> listInitial2 = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(assessmentpediatric2DTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial2 = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial2;
	}
	
	@Override
	public int saveAssessmentPediatric3(assessmentpediatric3DTO objDto,HttpServletRequest request){
				int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdnursing_assessment_paediatric_page_three();
				
				   
				 if(id==0){
					 
                    	objDto.setAddedBy(UserId);
                    	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().save(objDto);
                        
            int recordId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(
            		"select max(idnursing_assessment_paediatric_page_three) from ehat_nursing_assessment_paediatric_page_three where patient_id ="+objDto.getpId()+"  and treatment_id = "+objDto.gettId()
            		).uniqueResult()).intValue();
                        if ((!objDto.getvBFRData007().equals("")) && (!objDto.getvBFRData007().equalsIgnoreCase(null))) {
							String[] vbfrdata = objDto.getvBFRData007().split("#");
							int i = 0;
							
								for (String str : vbfrdata) {
									String[] finalValues = str.split("_");
									
									VerbalDTO verbObj = new VerbalDTO();
									verbObj.setIdnursing_assessment_paediatric_page_three(recordId);
									verbObj.setTimeForVerbal(finalValues[0]);
									verbObj.setConsultingNameForVerbal(finalValues[1]);
									verbObj.setPrimiaryNurseVerbal(finalValues[2]);
									verbObj.setDoctorVerbal(finalValues[3]);
									verbObj.setDurationVerbal(finalValues[4]);
									verbObj.setStatus("Y");
									sessionFactory.getCurrentSession().save(verbObj);									
									
									i++;
							}
							
						}
                       
                        if ((!objDto.getStaffInterventionData().equals("")) && (!objDto.getStaffInterventionData().equalsIgnoreCase(null))) {
							String[] vbfrdata = objDto.getStaffInterventionData().split("#");
							int i = 0;
							
								for (String str : vbfrdata) {
									String[] finalValues = str.split("_");
									
									InterventionDTO verbObj = new InterventionDTO();
									verbObj.setIdnursing_assessment_paediatric_page_three(recordId);
									verbObj.setBehaviourInven(finalValues[2]);
									verbObj.setIntervention(finalValues[3]);
									verbObj.setRemarksInven(finalValues[4]);
									verbObj.setShiftInven(finalValues[0]);
									verbObj.setTimeInven(finalValues[1]);
									verbObj.setStatus("Y");
									sessionFactory.getCurrentSession().save(verbObj);									
									
									i++;
							}
						}
                        
                        Result=1;
                    }else{ 
                    	objDto.setUpdatedBy(UserId);
                    	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                        int recordId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(
                        		"select idnursing_assessment_paediatric_page_three from ehat_nursing_assessment_paediatric_page_three where patient_id ="+objDto.getpId()+"  and treatment_id = "+objDto.gettId()
                        		).uniqueResult()).intValue();
                                    if ((!objDto.getStaffInterventionData().equals("")) && (!objDto.getStaffInterventionData().equalsIgnoreCase(null))) {
            							String[] vbfrdata = objDto.getStaffInterventionData().split("#");
            							int i = 0;
            							
            								for (String str : vbfrdata) {
            									String[] finalValues = str.split("_");
            									
            									InterventionDTO verbObj = new InterventionDTO();
            									verbObj.setIdnursing_assessment_paediatric_page_three(recordId);
            									verbObj.setBehaviourInven(finalValues[2]);
            									verbObj.setIntervention(finalValues[3]);
            									verbObj.setRemarksInven(finalValues[4]);
            									verbObj.setShiftInven(finalValues[0]);
            									verbObj.setTimeInven(finalValues[1]);
            									verbObj.setStatus("Y");
            									verbObj.setIdIntervention(Integer.parseInt(finalValues[5]));
            									sessionFactory.getCurrentSession().saveOrUpdate(verbObj);									
            									i++;
            							}
            							
            						}
                                    
                                    if ((!objDto.getvBFRData007().equals("")) && (!objDto.getvBFRData007().equalsIgnoreCase(null))) {
            							String[] vbfrdata = objDto.getvBFRData007().split("#");
            							
            								for (String str : vbfrdata) {
            									String[] finalValues = str.split("_");
            									
            									VerbalDTO verbObj = new VerbalDTO();
            									verbObj.setIdnursing_assessment_paediatric_page_three(recordId);
            									verbObj.setTimeForVerbal(finalValues[0]);
            									verbObj.setConsultingNameForVerbal(finalValues[1]);
            									verbObj.setPrimiaryNurseVerbal(finalValues[2]);
            									verbObj.setDoctorVerbal(finalValues[3]);
            									verbObj.setDurationVerbal(finalValues[4]);
            									verbObj.setIdVerbal(Integer.parseInt(finalValues[5]));
            									verbObj.setStatus("Y");
            									sessionFactory.getCurrentSession().saveOrUpdate(verbObj);									
            							}
            							
            						}
                                    
                        Result=2;
                    }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
	
	@Override
	public assessmentpediatric3DTO fetchInitalNursing3Page(int patientId,int treatmentId){
		assessmentpediatric3DTO obj=new assessmentpediatric3DTO();
		List<VerbalDTO> slavlist = null;
		List<InterventionDTO> slavlist2 = null;
		List<assessmentpediatric3DTO> listInitial2 = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(assessmentpediatric3DTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial2 = criteria.list();
					
					
					if(listInitial2.size()!= 0){
					int recordId = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(
                    		"select idnursing_assessment_paediatric_page_three from ehat_nursing_assessment_paediatric_page_three where patient_id="+patientId+" and treatment_id="+treatmentId
                    		).uniqueResult()).intValue();
					
					
					Criteria criteria1 = sessionFactory.getCurrentSession()
							.createCriteria(VerbalDTO.class);
					criteria1.add(Restrictions.eq("idnursing_assessment_paediatric_page_three", recordId));
					criteria1.add(Restrictions.eq("status", "Y"));
					slavlist = criteria1.list();
					
					Criteria criteria2 = sessionFactory.getCurrentSession()
							.createCriteria(InterventionDTO.class);
					criteria2.add(Restrictions.eq("idnursing_assessment_paediatric_page_three", recordId));
					criteria2.add(Restrictions.eq("status", "Y"));
					slavlist2 = criteria2.list();
					}
					obj.setListpediatric3(listInitial2);
					obj.setVerbalList(slavlist);
					obj.setInterventionList(slavlist2);
					
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return obj;
	}
	
	@Override
	public int deleteVerbalData(String idVerbal,HttpServletRequest request){
				int Result = 0;
			try {
				String idList[]=idVerbal.split("_");
				
				for(String ids:idList){
					
					int id= Integer.parseInt(ids);
					
					if(id!=0)
					{
					String sql = "update ehat_verbal_order_slave set status ='N' where idverbal_order_slave="+id;
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					}
					Result = 1;
				}
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
	
	@Override
	public int deleteInterventionData(String idIntervention,HttpServletRequest request){
		int Result = 0;
	try {
		String idList[]=idIntervention.split("_");
		
		for(String ids:idList){
			
			int id= Integer.parseInt(ids);
			
			if(id!=0)
			{
			String sql = "update ehat_intervention_slave set status ='N' where idintervention_slave="+id;
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.executeUpdate();
			}
			Result = 1;
		}
	} catch (Exception e) {
		e.printStackTrace();
		return Result;
	}
	
	return Result;

	}
	
	
	@Override
	public int savePrePostData(PrePostDetailsDTO objDto,HttpServletRequest request){
				int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdpre_post_checklist();
				  if(id==0){
                    	objDto.setAddedBy(UserId);
                    	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().save(objDto);
                        Result=1;
                    }else{
                    	objDto.setUpdatedBy(UserId);
                    	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                        Result=2;
                    }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
	
	@Override
	public List<PrePostDetailsDTO> fetchprepostData(int patientId,int treatmentId){
		
		
		List<PrePostDetailsDTO> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(PrePostDetailsDTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}
	@Override
	public int saveNursingAssessmentData01(nursingAsmentDataDTO objDto,HttpServletRequest request){
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			int id =objDto.getIdNursingInitialAssessment();
                if(id==0){
                	objDto.setAddedBy(UserId);
                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().save(objDto);
                    Result=1;
                }else{
                	objDto.setUpdatedBy(UserId);
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
	return Result;
	
}

	@Override
	public List<nursingAsmentDataDTO> fetchNursingAs(int patientId,int treatmentId){
		
		
		List<nursingAsmentDataDTO> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(nursingAsmentDataDTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}
	
	
	@Override
	public int saveNursingAssessmentData02(nursingtwoDTo objDto,HttpServletRequest request){
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			int id =objDto.getIdNursingInitialAssessmentTwo();
                if(id==0){
                	objDto.setAddedBy(UserId);
                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().save(objDto);
                    Result=1;
                }else{
                	objDto.setUpdatedBy(UserId);
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
	return Result;
	
	}
	
	@Override
	public List<nursingtwoDTo> NursingA2fetchData(int patientId,int treatmentId){
		
		
		List<nursingtwoDTo> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(nursingtwoDTo.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}
	
	@Override
	public int savePlanTreatDetail(PlanTreatDTO objDto,HttpServletRequest request){
		int Result = 0;
		try {
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			int id =objDto.getIdplan();
                if(id==0){
                	objDto.setAddedBy(UserId);
                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().save(objDto);
                    Result=1;
                }else{
                	objDto.setUpdatedBy(UserId);
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                    sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
	return Result;
	
	}
	
	
	@Override
	public List<PlanTreatDTO> fetchPlanTreatData(int patientId,int treatmentId){
		
		
		List<PlanTreatDTO> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(PlanTreatDTO.class);
					criteria.add(Restrictions.eq("pid", patientId));
					criteria.add(Restrictions.eq("tid", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}
	
	
	@Override
	public int deleteOtRowData(String idVerbal,HttpServletRequest request){
				int Result = 0;
			try {
				String idList[]=idVerbal.split("_");
				
				for(String ids:idList){
					
					int id= Integer.parseInt(ids);
					
					if(id!=0)
					{
					String sql = "update ehat_output_order_slave set status ='N' where idoutput_slave="+id;
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					}
					Result = 1;
				}
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
	}
	
public int deleteNRARecord(int id,HttpServletRequest request){

		int result =0;
		try {
			
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
				if(id!=0){
					String sql = "update ehat_nursing_re_assessment_one_day set status ='N' where re_assessment_id="+id;
					Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					query.executeUpdate();
					result=1;
				}else{
					result=2;
				}
		
		} catch (Exception e) {
			e.printStackTrace();
			result=0;
		}
		
	return result;
	}
	
	@Override
	public List<NursingReAssessment1DayDTO> fetchReAssessment(int id){
		
		List<NursingReAssessment1DayDTO> list = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(NursingReAssessment1DayDTO.class);
					criteria.add(Restrictions.eq("masterId", id));
					criteria.add(Restrictions.eq("status", "Y"));
					list = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return list;
	}
	
	
}