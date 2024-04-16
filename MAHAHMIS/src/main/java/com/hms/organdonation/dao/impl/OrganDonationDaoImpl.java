package com.hms.organdonation.dao.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dto.AdminCityDTO;
import com.hms.administrator.dto.AdminDistrictDTO;
import com.hms.administrator.dto.AdminStateDTO;
import com.hms.bloodbank.dto.BloodGroupMaster;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.organdonation.dao.OrganDonationDao;
import com.hms.organdonation.dto.DonorTypeMasterDto;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.registration.dto.SpecializationDto;

@Repository
public class OrganDonationDaoImpl implements OrganDonationDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Override
	public int saveOrganDonation(OrganDonationRegistrationDto obj,Integer patientId,
			HttpServletRequest request) {
		
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getId() == 0) {
				
				RegistrationDto registrationDto1 = (RegistrationDto) sessionFactory	.getCurrentSession().get(
								RegistrationDto.class,
								patientId);
				
				Criteria criteria=sessionFactory.getCurrentSession().createCriteria(OrganDonationRegistrationDto.class);
				criteria.add(Restrictions.eq("deleted", "N"));
				criteria.add(Restrictions.eq("patientId", obj.getPatientId()));
				//criteria.add(Restrictions.eq("patientRegistered", registrationDto1));
				OrganDonationRegistrationDto checkDuplicate =(OrganDonationRegistrationDto) criteria.uniqueResult();
				
				if(checkDuplicate !=null){
					return 3;
				}
				
				/*
				 * if(checkDuplicate !=null){ Integer patientIdExiting =
				 * checkDuplicate.getPatientRegistered().getPatientId(); if(patientId ==
				 * patientIdExiting){ return 3; } }
				 */
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				/*
				 * RegistrationDto registrationDto = (RegistrationDto) sessionFactory
				 * .getCurrentSession().get( RegistrationDto.class, patientId);
				 * obj.setPatientRegistered(registrationDto);
				 */
				
				sessionFactory.getCurrentSession().merge(obj);
				return 1;
				
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				/*
				 * RegistrationDto registrationDto = (RegistrationDto) sessionFactory
				 * .getCurrentSession().get( RegistrationDto.class, patientId);
				 * obj.setPatientRegistered(registrationDto);
				 */
				
				sessionFactory.getCurrentSession().merge(obj);
				return 2;
				
			}

		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	
	
	@Override
	public int saveOrganDonationTreatment(OrganDonorTreatmentDto obj,Integer organDonorId,Integer patientId,
			HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			if (obj.getOrganDonorTreatmentId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				RegistrationDto registrationDto = (RegistrationDto) sessionFactory
				.getCurrentSession().get(
						RegistrationDto.class,
						patientId);
			//	obj.setPatientRegistered(registrationDto);
				
				OrganDonorTreatmentDto rganDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory.getCurrentSession().merge(obj);
				
				//update is_treatment_generated='Y' in organ_donation_registration table
				
				String hql="UPDATE OrganDonationRegistrationDto set isTreatmentGenerated='Y' where id="+organDonorId+" ";
				
			    Query q= 	sessionFactory.getCurrentSession().createQuery(hql);
			    
			    q.executeUpdate();
			    //end
				
				return 1;
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				RegistrationDto registrationDto = (RegistrationDto) sessionFactory
				.getCurrentSession().get(
						RegistrationDto.class,
						patientId);
			//	obj.setPatientRegistered(registrationDto);
				System.err.println("obj.............."+obj.getIntendToDonateOrganId());
				
				OrganDonorTreatmentDto rganDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory.getCurrentSession().merge(obj);
				
				//update is_treatment_generated='Y' in organ_donation_registration table
				
				String hql="UPDATE OrganDonationRegistrationDto set isTreatmentGenerated='Y' where id="+organDonorId+" ";
				
			    Query q= 	sessionFactory.getCurrentSession().createQuery(hql);
			    
			    q.executeUpdate();
			    //end
				
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
		

	@SuppressWarnings("unchecked")
	@Override
	public List<IntendOrganDonorMasterDto> getAllOrgansIntendedToDonate(HttpServletRequest request) {
		
		List<IntendOrganDonorMasterDto> listIntendOrganDonorMasterDto = new ArrayList<IntendOrganDonorMasterDto>();
		
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(IntendOrganDonorMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			listIntendOrganDonorMasterDto = criteria.list();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return listIntendOrganDonorMasterDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DonorTypeMasterDto> getAllDonorTypeList(HttpServletRequest request) {

		List<DonorTypeMasterDto> lstDonorTypeMasterDto=new ArrayList<DonorTypeMasterDto>();
		try {
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(DonorTypeMasterDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstDonorTypeMasterDto = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstDonorTypeMasterDto;
	}
	
	
	@Override
	public List<AdminCityDTO> getCityList(HttpServletRequest request) {

		List<AdminCityDTO> listCityDetails = new ArrayList<AdminCityDTO>();
		try{
			String sqlString = "";
		//	sqlString = "select * from city where status ='Y' AND taluka_id ="+talukaId;
			
			sqlString = "select * from city where status ='Y'";
			Query getCityDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlString);
			getCityDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listCityDBRecord = getCityDetailsQuery.list();
			for(Map<String, Object> row : listCityDBRecord){
				
				AdminCityDTO cityObject = new AdminCityDTO();
				
				cityObject.setCity_ID((Integer)row.get("idcity"));
				cityObject.setCityName((String)row.get("city_name"));
				listCityDetails.add(cityObject);
			}
		}
		catch(Exception e){
			System.out.println(e.getMessage());
			 e.printStackTrace();
		 }
		return listCityDetails;

	}

	@Override
	public List<AdminDistrictDTO> getDistrictList(HttpServletRequest request) {
		
		List<AdminDistrictDTO> listDistricts = new ArrayList<AdminDistrictDTO>();
		try{
			String sqlString = "";
		//	sqlString = "select * from district where status ='Y' AND state_id ="+stateId;
			sqlString = "select * from district where status ='Y'";
			Query getDistrictsDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlString);
			getDistrictsDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listDistrictsDBRecord = getDistrictsDetailsQuery.list();
			for(Map<String, Object> row : listDistrictsDBRecord){
				
				AdminDistrictDTO districtObject = new AdminDistrictDTO();
				
				districtObject.setDistrict_ID((Integer)row.get("iddistrict"));
				districtObject.setDistrictName((String)row.get("dis_name"));
				listDistricts.add(districtObject);
			}
		}
		catch(Exception e){
			System.out.println(e.getMessage());
			 e.printStackTrace();
		 }
		return listDistricts;
	}

	@Override
	public List<AdminStateDTO> getStateList(HttpServletRequest request) {
			
		List<AdminStateDTO> listAdminStateDTO = new ArrayList<AdminStateDTO>();
		try{
			String sqlString = "";
		//	sqlString = "select * from district where status ='Y' AND state_id ="+stateId;
			sqlString = "select * from state where status ='Y'";
			Query getStates = sessionFactory.getCurrentSession().createSQLQuery(sqlString);
			getStates.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listStates = getStates.list();
			for(Map<String, Object> row : listStates){
				
				AdminStateDTO state = new AdminStateDTO();
				
				state.setState_ID((Integer)row.get("idstate"));
				state.setStateName((String)row.get("state_name"));
				listAdminStateDTO.add(state);
			}
		}
		catch(Exception e){
			System.out.println(e.getMessage());
			 e.printStackTrace();
		 }
		return listAdminStateDTO;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BloodGroupMaster> getBloodGroupList(HttpServletRequest request) {
		
		List<BloodGroupMaster> lstBloodGroupMaster = new ArrayList<BloodGroupMaster>();
		try {
			
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(BloodGroupMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			lstBloodGroupMaster = criteria.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstBloodGroupMaster;
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganDonationRegistrationDto> getAllDonorsList(HttpServletRequest request,String fromDate,String lastDate) {

				List<OrganDonationRegistrationDto> lstOrganDonationRegistrationDto = new ArrayList<OrganDonationRegistrationDto>();
				try {
					HttpSession session = request.getSession();
					int unitId = (int) session.getAttribute("uId");
					/*
					 * Criteria criteria=sessionFactory.openSession().createCriteria(
					 * OrganDonationRegistrationDto.class); criteria.add(Restrictions.eq("deleted",
					 * "N")); criteria.add(Restrictions.eq("unitId", unitId));
					 * criteria.add(Restrictions.eq("isTreatmentGenerated", "N"));
					 * criteria.addOrder(Order.desc("id")); criteria.setMaxResults(15);
					
					lstOrganDonationRegistrationDto = criteria.list();
					 */
					
					Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_registration_details(:unitId,:fromDate,:lastDate)");
					specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganDonationRegistrationDto.class));
					specialitySp.setParameter("unitId", unitId);
					specialitySp.setParameter("fromDate", fromDate);
					specialitySp.setParameter("lastDate", lastDate);
					lstOrganDonationRegistrationDto = specialitySp.list();
					
				}catch(Exception e) {
					e.printStackTrace();
				}		
				return lstOrganDonationRegistrationDto;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<OrganDonorTreatmentDto> getAllDonorsTreatmentList(HttpServletRequest request,String fromDate,String lastDate) {

				List<OrganDonorTreatmentDto> lstOrganDonorTreatmentDto = new ArrayList<OrganDonorTreatmentDto>();
				try {
					HttpSession session = request.getSession();
					int unitId = (int) session.getAttribute("uId");
					
//					Criteria criteria=sessionFactory.getCurrentSession().createCriteria(OrganDonorTreatmentDto.class);
					
					/*
					 * Criteria
					 * criteria=sessionFactory.openSession().createCriteria(OrganDonorTreatmentDto.
					 * class); criteria.add(Restrictions.eq("deleted", "N"));
					 * criteria.add(Restrictions.eq("isTreatmentClosed", "N"));
					 * criteria.add(Restrictions.eq("unitId", unitId));
					 * criteria.addOrder(Order.desc("organDonorTreatmentId"));
					 * 
					 * lstOrganDonorTreatmentDto = criteria.list();
					 */
					
				//	Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_treatment_details(:unitId,:fromDate,:lastDate)");
					//Added By Annapurna fetching treatmentdatewise data
					Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_treatment_details_fortreatmentdate(:unitId,:fromDate,:lastDate)");
					specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganDonorTreatmentDto.class));
					specialitySp.setParameter("unitId", unitId);
					specialitySp.setParameter("fromDate", fromDate);
					specialitySp.setParameter("lastDate", lastDate);
					lstOrganDonorTreatmentDto = specialitySp.list();
					
					
					
				}catch(Exception e) {
					e.printStackTrace();
				}		
				return lstOrganDonorTreatmentDto;
	}
	

	@Override
	public List<OrganDonationRegistrationDto> donorAutoSuggestion(String findText, String callFrom) {
		
		String sql = "";
		 List<OrganDonationRegistrationDto> listOrganDonationRegistrationDto = new ArrayList<OrganDonationRegistrationDto>();
		 try{
			 
			 	if(callFrom.equalsIgnoreCase("1")){
			 		
			 		sql = "SELECT p.id AS id, concat(p.prefix,'',p.first_name,' ',p.middle_name,' ',p.last_name) AS donor_name, p.contact_1 AS mobile FROM organ_donation_registration p where p.id = " + findText + " and p.deleted='N' limit 20";
			 		
			 	}else if(callFrom.equalsIgnoreCase("2")){

			 		sql = "SELECT p.id AS id, concat(p.prefix,'',p.first_name,' ',p.middle_name,' ',p.last_name) AS donor_name, p.contact_1 AS mobile FROM organ_donation_registration p where "
			 				
					+" (p.first_name like '"+findText+"%' "
					+" OR p.last_name like '"+findText+"%' "
					+" OR concat(p.first_name,' ',p.last_name) like '"+findText+"%' "
					+" OR concat(p.first_name,' ',p.middle_name,' ',p.last_name) like '"+findText+"%' "
					+" OR concat(p.first_name,' ',p.middle_name) like '"+findText+"%' "
					+" OR concat(p.middle_name,' ',p.last_name) like '"+findText+"%') "
					+" and p.deleted = 'N' limit 20";	
			 	}
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				System.err.println("----donor autosuggestion sql query : " + sql);
				
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					
					organDonationRegistrationDto.setId((Integer)row.get("id"));
					organDonationRegistrationDto.setDonorName((String)row.get("donor_name"));
					organDonationRegistrationDto.setMobile((String)row.get("mobile"));
			    	
					System.err.println("----donor autosuggestion object : " + organDonationRegistrationDto);
					listOrganDonationRegistrationDto.add(organDonationRegistrationDto);
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listOrganDonationRegistrationDto;
		
	}

	@Override
	public boolean deleteOrganDonor(Integer donorId, HttpServletRequest request) {
		
		Integer id = donorId;
		
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganDonationRegistrationDto obj = (OrganDonationRegistrationDto) sessionFactory.getCurrentSession()
					.get(OrganDonationRegistrationDto.class, id);
			
			obj.setDeleted("Y");
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;

	}



	@SuppressWarnings("unchecked")
	@Override
	public RegistrationViewDto searchPatientByStoredProcedure(String findText, int patSearchType, String callFrom, Integer fromYear) {
		
		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto>();
		
		
		Query query = null;
		
		if(patSearchType == 1) {
			
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_id_OD(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by ID query :: " + query);
			
		} else if(patSearchType == 2) {
			
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_name_for_OD(:fromyear, :toyear, :findText)");
			

			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by name query :: " + query);
			
		} else if(patSearchType == 3) {
			
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_mobile(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by mobile query :: " + query);
			
		}
		
		try {
			
			List<Object[]> queryResult  = query.list();
			
			System.out.println("stored procedure query result size:: " + queryResult.size());
			for (Object[] aRow :queryResult) {
				
				RegistrationViewDto regView = new RegistrationViewDto();

                Integer patId  = (Integer) aRow[0];
                String patientName = (String) aRow[1];
                String center_patient_id = (String) aRow[2];
                String mobile = (String) aRow[3];
                
                regView.setPtId(patId);
                regView.setPatientName(patientName);
                regView.setMobile(mobile);
                
                patList.add(regView);
                System.out.println("patId: "+patId+" ,patientName: "+patientName+" ,center_patient_id: "+center_patient_id+" ,mobile: "+mobile);
            
             }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		mv.setLstRegviewDto(patList);
		System.out.println("patList ---> " + patList);
		return mv;
	}



	@Override
	public OrganDonationRegistrationDto editOrganDonor(Integer organDonorId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		OrganDonationRegistrationDto dto = new OrganDonationRegistrationDto();
		try {
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganDonationRegistrationDto.class);
			criteria.add(Restrictions.eq("id", organDonorId));
			criteria.add(Restrictions.eq("deleted", "N"));
			dto = (OrganDonationRegistrationDto) criteria.uniqueResult();
			return dto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}



	@Override
	public boolean deleteOrganDonorTreatment(Integer donorTreatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganDonorTreatmentDto obj = (OrganDonorTreatmentDto) sessionFactory.getCurrentSession()
					.get(OrganDonorTreatmentDto.class, donorTreatmentId);

			obj.setDeleted("Y");
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}



	@Override
	public List<IntendOrganDonorMasterDto> getOrgansAgainstTreatment(Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<IntendOrganDonorMasterDto> orgsList = new ArrayList<IntendOrganDonorMasterDto>();
		String organs = "";
		
		try {
			
			OrganDonorTreatmentDto obj = new OrganDonorTreatmentDto();
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganDonorTreatmentDto.class);
			criteria.add(Restrictions.eq("organDonorTreatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			obj = (OrganDonorTreatmentDto) criteria.uniqueResult();
			organs = obj.getIntendToDonateOrganId();
			List<String> organIdList = Arrays.asList(organs.split(","));
			for(String id : organIdList) {
				IntendOrganDonorMasterDto obj1 = new IntendOrganDonorMasterDto();
				Criteria criteria1 = sessionFactory.openSession().createCriteria(IntendOrganDonorMasterDto.class);
				criteria1.add(Restrictions.eq("intendId", Integer.parseInt(id)));
				criteria1.add(Restrictions.eq("deleted", "N"));
				obj1 = (IntendOrganDonorMasterDto) criteria1.uniqueResult();
				
				orgsList.add(obj1);
			}
			
		}catch (Exception e) {
			
			e.printStackTrace();
		}
		
		
		return orgsList;
	}



	@Override
	public List<OrganDonorTreatmentDto> donorTreatAutoSuggestion(String findText, String callFrom) {
		
		String sql = "";
		 List<OrganDonorTreatmentDto> listOrganDonationRegistrationDto = new ArrayList<OrganDonorTreatmentDto>();
		 try{
			 
			 	if(callFrom.equalsIgnoreCase("1")){
			 		
			 		sql = "SELECT p.id AS id, concat(p.prefix,'',p.first_name,' ',p.middle_name,' ',p.last_name) AS donor_name, p.contact_1 AS mobile, p.organ_donor_id as organ_donor_id FROM organ_donor_treatment p where p.organ_donor_id = " + findText + " and p.deleted='N' limit 20";
			 		
			 	}
			 	//Added 
			 	else if(callFrom.equalsIgnoreCase("2")){

			 		sql = "SELECT p.id AS id, concat(p.prefix,'',p.first_name,' ',p.middle_name,' ',p.last_name) AS donor_name, p.contact_1 AS mobile FROM organ_donor_treatment p where "
			 				
					+" (p.first_name like '"+findText+"%' "
					+" OR p.last_name like '"+findText+"%' "
					+" OR concat(p.first_name,' ',p.last_name) like '"+findText+"%' "
					+" OR concat(p.first_name,' ',p.middle_name,' ',p.last_name) like '"+findText+"%' "
					+" OR concat(p.first_name,' ',p.middle_name) like '"+findText+"%' "
					+" OR concat(p.middle_name,' ',p.last_name) like '"+findText+"%') "
					+" and p.deleted = 'N' limit 20";	
			 	}
				
				
				SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
				System.err.println("----donor autosuggestion sql query : " + sql);
				
				getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> masterRow = getMaster.list();
				for (Map<String, Object> row : masterRow) {
					
					OrganDonorTreatmentDto obj=new OrganDonorTreatmentDto();
					
					obj.setOrganDonorTreatmentId((Integer)row.get("id"));
					obj.setDonorName((String)row.get("donor_name"));
					obj.setMobile((String)row.get("mobile"));
					obj.setDonorId((Integer)row.get("organ_donor_id"));
			    	
					System.err.println("----donor autosuggestion object : " + organDonationRegistrationDto);
					listOrganDonationRegistrationDto.add(obj);
				}				
		 
		 }catch (Exception e) {
			 e.printStackTrace();
		}
				 
		return listOrganDonationRegistrationDto;
		
	}



	@Override
	public OrganDonorTreatmentDto editOrganDonorTreatment(Integer organTreatId) {
		 OrganDonorTreatmentDto  obj=new  OrganDonorTreatmentDto ();
		try {
			obj=(OrganDonorTreatmentDto) sessionFactory.openSession().get(OrganDonorTreatmentDto.class, organTreatId);
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	//Added BY Annapurna
	@SuppressWarnings("unchecked")
	@Override
	public RegistrationViewDto searchPatientByStoredProcedurefororganrequest(String findText, int patSearchType, String callFrom, Integer fromYear) {
		
		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto>();
		
		
		Query query = null;
		
		if(patSearchType == 1) {
			
			
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_id_for_OR(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by ID query :: " + query);
			
		} else if(patSearchType == 2) {
			
			
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_name_for_OR(:fromyear, :toyear, :findText)");

			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by name query :: " + query);
			
		} else if(patSearchType == 3) {
			
			
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_mobile_for_OR(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by mobile query :: " + query);
			
		}
		
		try {
			
			List<Object[]> queryResult  = query.list();
			
			System.out.println("stored procedure query result size:: " + queryResult.size());
			for (Object[] aRow :queryResult) {
				
				RegistrationViewDto regView = new RegistrationViewDto();

                Integer patId  = (Integer) aRow[0];
                String patientName = (String) aRow[1];
                String center_patient_id = (String) aRow[2];
                String mobile = (String) aRow[3];
                
                regView.setPtId(patId);
                regView.setPatientName(patientName);
                regView.setMobile(mobile);
                
                patList.add(regView);
                System.out.println("patId: "+patId+" ,patientName: "+patientName+" ,center_patient_id: "+center_patient_id+" ,mobile: "+mobile);
            
             }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		mv.setLstRegviewDto(patList);
		System.out.println("patList ---> " + patList);
		return mv;
	}


	//Added By Annapurna Search By Organ Donor
	@SuppressWarnings("unchecked")
	@Override
	public RegistrationViewDto searchPatientByStoredProcedurefororganDonor(String findText, int patSearchType, String callFrom, Integer fromYear) {
		
		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto>();
		
		
		Query query = null;
		
		if(patSearchType == 1) {
			
			//query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_id(:fromyear, :toyear, :findText)");
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_id_OD(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by ID query :: " + query);
			
		} else if(patSearchType == 2) {
			
			//query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_name(:fromyear, :toyear, :findText)");
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_name_for_OD(:fromyear, :toyear, :findText)");

			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by name query :: " + query);
			
		} else if(patSearchType == 3) {
			
			//query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_mobile(:fromyear, :toyear, :findText)");
			query = sessionFactory.getCurrentSession().createSQLQuery( "CALL sp_search_patient_by_mobile_for_OD(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", fromYear );
			query.setParameter("toyear", null );
			query.setParameter("findText", findText );
			
			System.out.println("stored procedure by mobile query :: " + query);
			
		}
		
		try {
			
			List<Object[]> queryResult  = query.list();
			
			System.out.println("stored procedure query result size:: " + queryResult.size());
			for (Object[] aRow :queryResult) {
				
				RegistrationViewDto regView = new RegistrationViewDto();

                Integer patId  = (Integer) aRow[0];
                String patientName = (String) aRow[1];
                String center_patient_id = (String) aRow[2];
                String mobile = (String) aRow[3];
                
                regView.setPtId(patId);
                regView.setPatientName(patientName);
                regView.setMobile(mobile);
                
                patList.add(regView);
                System.out.println("patId: "+patId+" ,patientName: "+patientName+" ,center_patient_id: "+center_patient_id+" ,mobile: "+mobile);
            
             }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		mv.setLstRegviewDto(patList);
		System.out.println("patList ---> " + patList);
		return mv;
	}
}
