package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.LabProfileDao;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabProfileTestCompDTO;
import com.hms.ehat.dto.LabTestMethodDTO;
import com.hms.ehat.dto.ServiceMasterDto;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.inventory.dto.ItemMasterDto;
import com.hms.pathology.dto.LabProfileReagentDetailsDTO;
import com.hms.pathology.dto.LabReagentDetailsDTO;
import com.hms.pathology.dto.LabTestDTO;
import com.hms.pathology.dto.LabTestSampleDTO;
import com.hms.pathology.dto.LabUnitTypeDTO;
import com.hms.pathology.dto.OutLabMasterDto;
import com.hms.pathology.dto.ProfileOutLabDTO;
import com.hms.pathology.dto.SampleContainerDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class LabProfileDaoImpl implements LabProfileDao {

	static Logger log=Logger.getLogger(LabProfileDaoImpl.class.getName());
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public LabProfileDTO getLabProfiles(String searchText, String type,Integer startIndex) { 
		Session session = null;
		List<LabProfileDTO> list = new ArrayList<>();
		LabProfileDTO dto = new LabProfileDTO();
		try {
            session = sessionFactory.getCurrentSession();
            
            if(type.equalsIgnoreCase("onload")){
            	Query qry = session.createQuery("FROM LabProfileDTO WHERE profileStatus =:profileStatus ORDER BY idprofile DESC");
            	      qry.setFirstResult(startIndex);
                      qry.setMaxResults(10);
                      qry.setParameter("profileStatus", "Y");
                list = qry.list();
            	Integer labProfileCount=getLabProfileCount();
            	dto.setLabProfileCount(labProfileCount);
            }else if(type.equalsIgnoreCase("searchBtn")){
                Criteria criteria = session.createCriteria(LabProfileDTO.class);
                         criteria.add(Restrictions.eq("profileStatus", "Y"));
                         criteria.add(Restrictions.ilike("profileName", searchText, MatchMode.ANYWHERE));
                list = criteria.list();
            }else{
            	Query qry = session.createQuery("SELECT idprofile as id, profileName as name FROM LabProfileDTO WHERE profileName like concat('%',:profileName,'%') AND profileStatus =:profileStatus"); 
				  	  qry.setMaxResults(20);
				  	  qry.setParameter("profileName", searchText);
				  	  qry.setParameter("profileStatus", "Y");
				  	  
				  	qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> profileList = qry.list();
					for(Map<String, Object> row : profileList){
						LabProfileDTO obj = new LabProfileDTO();
						obj.setIdprofile((Integer)row.get("id"));
						obj.setProfileName((String)row.get("name"));

						list.add(obj);
					}
            }
            dto.setProfileli(list);
        }catch(Exception e){
            e.printStackTrace();
            log.error("getLabProfiles()...Error :"+e);
        }
    return dto;
}
	
	/* =============
	  Code By  : Badrinath Wagh
	  Code For : For Previous Bill Patients count
	================*/
//	@Override
	public Integer getLabProfileCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = " select count(*) from pathology_labprofile where profileStatus='Y'" + 
					"  "
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}	
	
	public LabTestDTO fetchTestUnderHeading(Integer headingId) {

		LabTestDTO dto = new LabTestDTO();
		Session session = null;
		
		try {
			session = sessionFactory.getCurrentSession();
			
			if(headingId == 0){
				Query hqlQry = session.createQuery("From LabTestDTO WHERE status = :status");
					  hqlQry.setParameter("status", "Y");
					  
					  dto.setLabTestList(hqlQry.list());
				return dto;
				}else{
					SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, headingId);
					Query hqlQry = session.createQuery("From LabTestDTO WHERE status = :status AND subService = :subService");
						  hqlQry.setParameter("status", "Y");
						  hqlQry.setParameter("subService", subServiceDto);
					  
						  dto.setLabTestList(hqlQry.list());
				return dto;
				}
			}catch(Exception e) {
			e.printStackTrace();
			log.error("fetchTestUnderHeading()...Error :"+e);
		}
		return dto;
	}

	@Override
	public String saveLabProfiles(LabProfileDTO dto, String testList, String outLabDetails, String reagentDetails) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			if(dto.getIdprofile() == 0) {
				SubServiceDto autosugeestionDto = (SubServiceDto) session.get(SubServiceDto.class, dto.getSubServiceID());
				Query hql = session.createQuery("FROM LabProfileDTO WHERE (profileName=:profileName OR autosugeestionDto=:dto) AND profileStatus=:profileStatus ");
					  hql.setParameter("profileName", dto.getProfileName());
					  hql.setParameter("profileStatus", "Y");
					  hql.setParameter("dto", autosugeestionDto);
		 
		 		 if(hql.uniqueResult() != null)
		 			 return "This profile is already exist.";
		
		 		//SubServiceDto autosugeestionDto = (SubServiceDto) session.get(SubServiceDto.class, dto.getSubServiceID());
				SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, dto.getIdheadings());
				ServiceMasterDto serviceMasterDto = (ServiceMasterDto) session.get(ServiceMasterDto.class, dto.getServiceID());
				LabUnitTypeDTO labUnit = (LabUnitTypeDTO) session.get(LabUnitTypeDTO.class, dto.getIdLabUnit());
				SampleContainerDTO sampleContainer = (SampleContainerDTO) session.get(SampleContainerDTO.class, dto.getIdSampleContainer());
				LabTestSampleDTO labTestSample = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, dto.getIdTestSample());
				ProfileOutLabDTO labOutlabDTO = (ProfileOutLabDTO) ConfigUIJSONUtility.getObjectFromJSON(outLabDetails, ProfileOutLabDTO.class);
				LabProfileReagentDetailsDTO labProfileReagentDetailsDTO = (LabProfileReagentDetailsDTO) ConfigUIJSONUtility.getObjectFromJSON(reagentDetails, LabProfileReagentDetailsDTO.class);
				
				List<LabProfileTestCompDTO> labTestCompList = new ArrayList<LabProfileTestCompDTO>();
				
				if(!dto.getCallFrom().equalsIgnoreCase("Microbiology") && !dto.getCallFrom().equalsIgnoreCase("Histopath")) {
					
					int sequence = 1;
					String testArr[] = testList.split(",");
					for (int i = 0; i < testArr.length; i++) {
						String testId = testArr[i];
						if(testId.charAt(0) != '0'){
							LabTestDTO labTestDTO = (LabTestDTO) session.get(LabTestDTO.class, Integer.parseInt(testId));
							LabProfileTestCompDTO labProfileTestCompDTO = new LabProfileTestCompDTO();
								labProfileTestCompDTO.setLabTestDTO(labTestDTO);
								labProfileTestCompDTO.setSequence(sequence);
							labTestCompList.add(labProfileTestCompDTO);
						}else{
							String head = testId.substring(2);
							LabProfileTestCompDTO labProfileTestCompDTO = new LabProfileTestCompDTO();
							labProfileTestCompDTO.setHeadName(head);
							labProfileTestCompDTO.setSequence(sequence);
							labTestCompList.add(labProfileTestCompDTO);
						}
						sequence++;
					}
				}
				
				List<ProfileOutLabDTO> outLabList = new ArrayList<ProfileOutLabDTO>();
				for(ProfileOutLabDTO outlabDTO : labOutlabDTO.getOutlabList()) {
					OutLabMasterDto masterDto = (OutLabMasterDto) sessionFactory.getCurrentSession().get(OutLabMasterDto.class, outlabDTO.getLabId());
					outlabDTO.setDto(masterDto);
					outLabList.add(outlabDTO);
				}
				
				List<LabProfileReagentDetailsDTO> reagentList = new ArrayList<>();
				for(LabProfileReagentDetailsDTO reagentDto : labProfileReagentDetailsDTO.getLabProfileReagentDetailsList()) {
					ItemMasterDto itemName = (ItemMasterDto) session.get(ItemMasterDto.class, reagentDto.getReagentId());
					//ItemMasterDto machineName = (ItemMasterDto) session.get(ItemMasterDto.class, reagentDto.getAssestId());
					LabTestMethodDTO testMethod = (LabTestMethodDTO) session.get(LabTestMethodDTO.class, reagentDto.getLabTestMethodId());
					
					//reagentDto.setItemMasterReagent(itemName);
					//reagentDto.setItemMasterAsset(machineName);
					reagentDto.setLabTestMethod(testMethod);
					
					reagentList.add(reagentDto);
				}
				
				dto.setAutosugeestionDto(autosugeestionDto);
				dto.setSubServiceDto(subServiceDto);
				dto.setServiceMasterDto(serviceMasterDto);
				dto.setLabUnit(labUnit);
				dto.setSampleContainer(sampleContainer);
				dto.setLabTestSample(labTestSample);
				dto.setLabProfileTestCompDTO(labTestCompList);
				dto.setProfileOutLabList(outLabList);
				dto.setLabProfileReagentDetailsDTO(reagentList);
				
			int idprile= (Integer) session.save(dto);
			String templatewise="";
			String temp="";
				if(dto.getCallFrom().equalsIgnoreCase("Microbiology")) {
					temp=Integer.toString(idprile);
					templatewise="M"+temp;
				}else if(dto.getCallFrom().equalsIgnoreCase("Histopath")) {
					temp=Integer.toString(idprile);
					templatewise="H"+temp;
				}
			
		//	dto.setTemplateWise(templatewise);
				return "Lab profile registered succssefully.";
			} else {
				SubServiceDto autosugeestionDto = (SubServiceDto) session.get(SubServiceDto.class, dto.getSubServiceID());
				String hqlQuery = "SELECT COUNT(*) FROM LabProfileDTO WHERE idprofile NOT IN (:idprofile) AND profileStatus=:profileStatus AND (profileName =:profileName OR autosugeestionDto=:dto)";
				Query qry = session.createQuery(hqlQuery);
					  qry.setParameter("idprofile", dto.getIdprofile());
					  qry.setParameter("profileName", dto.getProfileName());
					  qry.setParameter("profileStatus", "Y");
					  qry.setParameter("dto", autosugeestionDto);
					  
				Long rowCount = (Long) qry.uniqueResult();
				if(rowCount > 0)
					return "This profile is already exist.";
				
				LabProfileDTO labProfileDTO = (LabProfileDTO) session.get(LabProfileDTO.class, dto.getIdprofile());
				List<LabProfileTestCompDTO> labTestCompList = labProfileDTO.getLabProfileTestCompDTO();
				List<LabProfileTestCompDTO> list = new ArrayList<LabProfileTestCompDTO>();
				
				//SubServiceDto autosugeestionDto = (SubServiceDto) session.get(SubServiceDto.class, dto.getSubServiceID());
				ServiceMasterDto serviceMasterDto = (ServiceMasterDto) session.get(ServiceMasterDto.class, dto.getServiceID());
				LabUnitTypeDTO labUnit = (LabUnitTypeDTO) session.get(LabUnitTypeDTO.class, dto.getIdLabUnit());
				SampleContainerDTO sampleContainer = (SampleContainerDTO) session.get(SampleContainerDTO.class, dto.getIdSampleContainer());
				ProfileOutLabDTO labOutlabDTO = (ProfileOutLabDTO) ConfigUIJSONUtility.getObjectFromJSON(outLabDetails, ProfileOutLabDTO.class);
				LabProfileReagentDetailsDTO labProfileReagentDetailsDTO = (LabProfileReagentDetailsDTO) ConfigUIJSONUtility.getObjectFromJSON(reagentDetails, LabProfileReagentDetailsDTO.class);
				LabTestSampleDTO labSampleDTO = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, dto.getIdTestSample());
				
				labProfileDTO.setAutosugeestionDto(autosugeestionDto);
				labProfileDTO.setServiceMasterDto(serviceMasterDto);
				labProfileDTO.setLabUnit(labUnit);
				labProfileDTO.setSampleContainer(sampleContainer);
				labProfileDTO.setLabTestSample(labSampleDTO);
				
				if(!dto.getCallFrom().equalsIgnoreCase("Microbiology") && !dto.getCallFrom().equalsIgnoreCase("Histopath")) {
					
					int sequence = 1;
					String testArr[] = testList.split(",");
					if(labProfileDTO.getSubServiceDto().getSubId().equals(dto.getIdheadings())) {
						for(String testId : testArr) {
							boolean status = false;
							for(LabProfileTestCompDTO labTestcomp : labProfileDTO.getLabProfileTestCompDTO()) {
								if(testId.charAt(0) != '0' && labTestcomp.getLabTestDTO() != null){
									if(labTestcomp.getLabTestDTO().getIdTest() == Integer.parseInt(testId)) {
										status = true;
										labTestcomp.setSequence(sequence);
									}
								}else if(testId.charAt(0) == '0' && labTestcomp.getLabTestDTO() == null){
									if(labTestcomp.getHeadName().equalsIgnoreCase(testId.substring(2))) {
										status = true;
										labTestcomp.setSequence(sequence);
									}
								}
								labTestcomp.setLabProfileTestStatus("Y");
								list.add(labTestcomp);
							}
							
							if(!status) {
								if(testId.charAt(0) != '0'){
									LabTestDTO obj = (LabTestDTO) session.get(LabTestDTO.class, Integer.parseInt(testId));
									LabProfileTestCompDTO labProfileTestCompDTO = new LabProfileTestCompDTO();
														  labProfileTestCompDTO.setLabTestDTO(obj);
														  labProfileTestCompDTO.setSequence(sequence);
									list.add(labProfileTestCompDTO);
								}else{
									String head = testId.substring(2);
									LabProfileTestCompDTO labProfileTestCompDTO = new LabProfileTestCompDTO();
														  labProfileTestCompDTO.setHeadName(head);
														  labProfileTestCompDTO.setSequence(sequence);
									list.add(labProfileTestCompDTO);
								}
							}
							sequence++;
						}
						
						for(LabProfileTestCompDTO labTestcomp : labProfileDTO.getLabProfileTestCompDTO()) {
							boolean status = false;
							for(String testId : testArr) {
								if(labTestcomp.getLabTestDTO() == null && testId.charAt(0) == '0'){
									if(labTestcomp.getHeadName().equalsIgnoreCase(testId.substring(2))) {
										status = true;
									}
								}else if(labTestcomp.getLabTestDTO() != null && testId.charAt(0) != '0'){
									if(labTestcomp.getLabTestDTO().getIdTest() == Integer.parseInt(testId)) {
										status = true;
									}
								}
							}
							
							if(!status) {
								labTestcomp.setLabProfileTestStatus("N");
								labTestcomp.setSequence(0);
								list.add(labTestcomp);
							}
						}
						labTestCompList.clear();
						labTestCompList.addAll(list);
						labProfileDTO.setLabProfileTestCompDTO(labTestCompList);
					}else {
						SubServiceDto subServiceDto1 = (SubServiceDto) session.get(SubServiceDto.class, dto.getIdheadings());
						//LabTestSampleDTO labSampleDTO = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, dto.getIdTestSample());
						labProfileDTO.setSubServiceDto(subServiceDto1);
						//labProfileDTO.setLabTestSample(labSampleDTO);
						
						for(int i = 0; i < labProfileDTO.getLabProfileTestCompDTO().size(); i++) {
							labProfileDTO.getLabProfileTestCompDTO().get(i).setLabProfileTestStatus("N");
							labProfileDTO.getLabProfileTestCompDTO().get(i).setSequence(0);
						}
						for(String testId : testArr) {
							boolean status = false;
							for(LabProfileTestCompDTO labTestcomp : labProfileDTO.getLabProfileTestCompDTO()) {
								if(testId.charAt(0) != '0' && labTestcomp.getLabTestDTO() != null){
									if(labTestcomp.getLabTestDTO().getIdTest() == Integer.parseInt(testId))
										status = true;
								}else if(testId.charAt(0) == '0' && labTestcomp.getLabTestDTO() == null){
									if(labTestcomp.getHeadName().equalsIgnoreCase(testId.substring(2)))
										status = true;
								}
							}
							
							if(!status) {
								if(testId.charAt(0) != '0'){
									LabTestDTO obj = (LabTestDTO) session.get(LabTestDTO.class, Integer.parseInt(testId));
									LabProfileTestCompDTO labProfileTestCompDTO = new LabProfileTestCompDTO();
														  labProfileTestCompDTO.setLabTestDTO(obj);
														  labProfileTestCompDTO.setSequence(sequence);
									list.add(labProfileTestCompDTO);
								}else{
									String head = testId.substring(2);
									LabProfileTestCompDTO labProfileTestCompDTO = new LabProfileTestCompDTO();
														  labProfileTestCompDTO.setHeadName(head);
														  labProfileTestCompDTO.setSequence(sequence);
									list.add(labProfileTestCompDTO);
								}
							}
							sequence++;
						}
						labProfileDTO.getLabProfileTestCompDTO().addAll(list);
					}
				}
				
				if(dto.getProcessAtOutlab().equalsIgnoreCase("Y")){
					List<ProfileOutLabDTO> outLabList = new ArrayList<ProfileOutLabDTO>();
					for(ProfileOutLabDTO outlabDTO : labOutlabDTO.getOutlabList()) {
						OutLabMasterDto masterDto = (OutLabMasterDto) sessionFactory.getCurrentSession().get(OutLabMasterDto.class, outlabDTO.getLabId());
						outlabDTO.setDto(masterDto);
						outLabList.add(outlabDTO);
					}
					labProfileDTO.setProfileOutLabList(outLabList);
				}else{
					List<ProfileOutLabDTO> outLabList = new ArrayList<ProfileOutLabDTO>();
					for(ProfileOutLabDTO obj : labProfileDTO.getProfileOutLabList()){
						obj.setDeleted("Y");
						outLabList.add(obj);
					}
					labProfileDTO.setProfileOutLabList(outLabList);
				}
				
				List<LabProfileReagentDetailsDTO> reagentList = new ArrayList<>();
				for(LabProfileReagentDetailsDTO reagentDto : labProfileReagentDetailsDTO.getLabProfileReagentDetailsList()) {
					ItemMasterDto itemName = (ItemMasterDto) session.get(ItemMasterDto.class, reagentDto.getReagentId());
					//ItemMasterDto machineName = (ItemMasterDto) session.get(ItemMasterDto.class, reagentDto.getAssestId());
					LabTestMethodDTO testMethod = (LabTestMethodDTO) session.get(LabTestMethodDTO.class, reagentDto.getLabTestMethodId());
					
					//reagentDto.setItemMasterReagent(itemName);
					//reagentDto.setItemMasterAsset(machineName);
					reagentDto.setLabTestMethod(testMethod);
					
					reagentList.add(reagentDto);
				}
				labProfileDTO.setLabProfileReagentDetailsDTO(reagentList);
				
				labProfileDTO.setProfileName(dto.getProfileName());
				labProfileDTO.setProfileInterpretation(dto.getProfileInterpretation());
				labProfileDTO.setProfileComments(dto.getProfileComments());
				
				labProfileDTO.setIsTest(dto.getIsTest());
				labProfileDTO.setVolume(dto.getVolume());
				labProfileDTO.setFasting(dto.getFasting());
				labProfileDTO.setTurnAroundTime(dto.getTurnAroundTime());
				
				labProfileDTO.setTempratureSensitivity(dto.getTempratureSensitivity());
				labProfileDTO.setMinTemp(dto.getMinTemp());
				labProfileDTO.setMaxTemp(dto.getMaxTemp());
				
				labProfileDTO.setTimeSensitivity(dto.getTimeSensitivity());
				labProfileDTO.setTimeSensitiveValue(dto.getTimeSensitiveValue());
				labProfileDTO.setDrugSensitivity(dto.getDrugSensitivity());
				labProfileDTO.setIsNabl(dto.getIsNabl());
				labProfileDTO.setProcessAtOutlab(dto.getProcessAtOutlab());
				labProfileDTO.setApplyFormula(dto.getApplyFormula());
				labProfileDTO.setHistopathLab(dto.getHistopathLab());

				labProfileDTO.setInterpretationCheck(dto.getInterpretationCheck());
				labProfileDTO.setCommentCheck(dto.getCommentCheck());
				labProfileDTO.setDisclaimerCheck(dto.getDisclaimerCheck());
				labProfileDTO.setProfileDisclaimer(dto.getProfileDisclaimer());
				
				labProfileDTO.setUpdatedBy(dto.getProfilecreatedBy());
				labProfileDTO.setUpdatedDate(new Date());
				labProfileDTO.setTemplateWise(dto.getTemplateWise());
				labProfileDTO.setCallFrom(dto.getCallFrom());
				labProfileDTO.setIdheadings(dto.getIdheadings());
				session.merge(labProfileDTO);
				
				return "Lab profile updated successfully.";
			}
		}catch (Exception e) {
			e.printStackTrace();
			log.error("saveLabProfiles()...Error :"+e);
		}
		return "error while adding profile";
	}

	@Override
	public boolean deleteLabProfile(Integer profileId, Integer userId) {

		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			Query query = session.createQuery("update LabProfileDTO set deletedBy = :deletedBy, profileStatus = :profileStatus, deletedDate = :deletedDate where idprofile = :idprofile");
				  query.setParameter("deletedBy", userId);
				  query.setParameter("profileStatus", "N");
				  query.setParameter("deletedDate", new Date());
				  query.setParameter("idprofile", profileId);
				  query.executeUpdate();
				  
			return true;
		}catch(Exception e){
			e.printStackTrace();
			log.error("deleteLabProfile()...Error :"+e);
		}
		return false;
	}

	@Override
	public LabProfileDTO getProfileById(Integer profileId) {

		Session session = null;
		LabProfileDTO dto = new LabProfileDTO();
		List<LabProfileTestCompDTO> list = new ArrayList<LabProfileTestCompDTO>();
		List<ProfileOutLabDTO> outLabList = new ArrayList<ProfileOutLabDTO>();
		try {
			session = sessionFactory.getCurrentSession();
			Query qry = session.createQuery("FROM LabProfileDTO WHERE idprofile =:idprofile");
			qry.setParameter("idprofile", profileId);

			dto = (LabProfileDTO) qry.uniqueResult();

			for (LabProfileTestCompDTO obj : dto.getLabProfileTestCompDTO()) {
				if (obj.getLabProfileTestStatus().equalsIgnoreCase("Y"))
					list.add(obj);
			}
			
			for (ProfileOutLabDTO obj : dto.getProfileOutLabList()) {
				if (obj.getDeleted().equalsIgnoreCase("N"))
					outLabList.add(obj);
			}
			dto.getLabProfileTestCompDTO().clear();
			Collections.sort(list);
			dto.setLabProfileTestCompDTO(list);
			
			dto.getProfileOutLabList().clear();
			dto.setProfileOutLabList(outLabList);
			return dto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("getProfileById()...Error :"+e);
		}
		return dto;
	}

	@Override
	public LabTestDTO filterTestsUnderHeading(Integer headingId, Integer sampleId) {

		LabTestDTO dto = new LabTestDTO();
		Session session = null;
		
		try {
			session = sessionFactory.getCurrentSession();
			
			if(sampleId == 0){
				Query hqlQry = session.createQuery("From LabTestDTO WHERE status = :status");
					  hqlQry.setParameter("status", "Y");
					  
					  dto.setLabTestList(hqlQry.list());
				return dto;
				}else{
					SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, headingId);
					LabTestSampleDTO labTestSampleDTO = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, sampleId);
					Query hqlQry = session.createQuery("From LabTestDTO WHERE status = :status AND subService = :subService AND labTestSample = :labTestSample");
						  hqlQry.setParameter("status", "Y");
						  hqlQry.setParameter("subService", subServiceDto);
						  hqlQry.setParameter("labTestSample", labTestSampleDTO);
					  
						  dto.setLabTestList(hqlQry.list());
				return dto;
				}
			}catch(Exception e) {
			e.printStackTrace();
			log.error("filterTestsUnderHeading()... Error :"+e);
		}
		return dto;
	}
	
	@Override
	public boolean deleteOutlabById(String idTables, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
            String id[] = idTables.split(",");
       
			for (int i = 0; i < id.length; i++) {
				  int id1 = Integer.parseInt(id[i]);	
				  Query qry = sessionFactory.getCurrentSession().createQuery("UPDATE ProfileOutLabDTO set deleted=:deleted, deletedBy=:deletedBy, updatedDate=:updatedDate WHERE idOutlab=:idOutlab");
				  		qry.setParameter("deleted", "Y");
				  		qry.setParameter("deletedBy", userId);
				  		qry.setParameter("updatedDate", new Date(new java.util.Date().getTime()));
				  		qry.setParameter("idOutlab", id1);
				  qry.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@Override
	public boolean deleteLabProfileReagentById(Integer id, HttpServletRequest request) {
		try {
			LabProfileReagentDetailsDTO obj = (LabProfileReagentDetailsDTO) sessionFactory.getCurrentSession().get(LabReagentDetailsDTO.class,id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error("error for deleteReagentById...."+e.getMessage());
			return false;
		}
		return true;
	}

	@Override
	public SubServiceDto getAllPathologyServices(String searchText) {
		Session session = null;
		SubServiceDto dto = new SubServiceDto();
		List<SubServiceDto> subServicesList = new ArrayList<>();
		try{
			session = sessionFactory.getCurrentSession();
			Query qry = session.createQuery("SELECT subId AS id, categoryName AS categoryName, charges AS categoryCharges, codeName AS codeName FROM SubServiceDto WHERE deleted =:deleted AND isCategory =:isCategory AND serviceId =:serviceId AND categoryName like concat('%',:categoryName,'%')"); 
		  	  	  qry.setParameter("deleted", "N");
		  	  	  qry.setParameter("isCategory", "N");
		  	  	  qry.setParameter("serviceId", 11);
		  	  	  qry.setParameter("categoryName", searchText);
		  	
		  	  	qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = qry.list();
				for(Map<String, Object> row : list){
					SubServiceDto obj = new SubServiceDto();
					obj.setSubId((Integer)row.get("id"));
					obj.setCategoryName((String)row.get("categoryName"));
					obj.setCharges((Double)row.get("categoryCharges"));
					obj.setCodeName((String)row.get("codeName"));
					
					subServicesList.add(obj);
				}
			dto.setLstSubService(subServicesList); 	  
		}catch(Exception e){
			e.printStackTrace();
			log.error("getAllPathologyServices()...Error :"+e);
		}
		return dto;
	}

	@Override
	public String validateLabProfile(Integer profileId, String profileName, Integer subServiceId) {
		Session session = null;
		String response = null;
		try {
			session = sessionFactory.getCurrentSession();

			SubServiceDto autosugeestionDto = (SubServiceDto) session.get(SubServiceDto.class, subServiceId);
			if(profileId == 0) {
				Query hql = session.createQuery("FROM LabProfileDTO WHERE (profileName=:profileName OR autosugeestionDto=:dto) AND profileStatus=:profileStatus ");
					  hql.setParameter("profileName", profileName);
					  hql.setParameter("profileStatus", "Y");
					  hql.setParameter("dto", autosugeestionDto);
		 
		 		 if(hql.uniqueResult() != null)
		 			response = "This profile is already exist.";
			}else {
				String hqlQuery = "SELECT COUNT(*) FROM LabProfileDTO WHERE idprofile NOT IN (:idprofile) AND profileStatus=:profileStatus AND (profileName =:profileName OR autosugeestionDto=:dto)";
				Query qry = session.createQuery(hqlQuery);
					  qry.setParameter("idprofile", profileId);
					  qry.setParameter("profileName", profileName);
					  qry.setParameter("profileStatus", "Y");
					  qry.setParameter("dto", autosugeestionDto);
					  
				Long rowCount = (Long) qry.uniqueResult();
				if(rowCount > 0)
					response = "This profile is already exist.";
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return response;
	}

	@Override
	public Integer updateSequence(Integer profileId, String list) {
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			
			LabProfileDTO dto = (LabProfileDTO) session.get(LabProfileDTO.class, profileId);
			
			String[] testIds = list.split(",");
			for(String ids : testIds) {
				String[] data = ids.split("-");
				Integer testId = Integer.parseInt(data[0]);
				Integer sequenceNo = Integer.parseInt(data[1]);
				
				for(LabProfileTestCompDTO labProfileTestCompDTO : dto.getLabProfileTestCompDTO()) {
					if(testId.equals(labProfileTestCompDTO.getIdlabProfileTestComp())) {
						labProfileTestCompDTO.setSequence(sequenceNo);
						
						break;
					}
				}
			}
			session.merge(dto);
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public LabTestDTO searchTestInDragFromTable(String searchName, Integer headingId, Integer sampleId,
			HttpServletRequest request) {
		Session session = null;
		LabTestDTO dto = new LabTestDTO();
		System.out.println("Dao - searchTestInDragFromTable");
		try {
			session = sessionFactory.getCurrentSession();
			SubServiceDto subServiceDto = (SubServiceDto) session.get(SubServiceDto.class, headingId);
			LabTestSampleDTO labTestSampleDTO = (LabTestSampleDTO) session.get(LabTestSampleDTO.class, sampleId);
			Query hqlQry = session.createQuery("From LabTestDTO WHERE status = :status AND subService = :subService AND testName like concat('%',:testName,'%')");
				  hqlQry.setParameter("status", "Y");
				  hqlQry.setParameter("subService", subServiceDto);
				//  hqlQry.setParameter("labTestSample", labTestSampleDTO);
				  hqlQry.setParameter("testName", searchName);
			  
				  dto.setLabTestList(hqlQry.list());
		return dto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
}