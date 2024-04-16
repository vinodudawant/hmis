package com.hms.organdonation.dao.impl;

import java.util.ArrayList;
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

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.organdonation.dao.OrganRequestDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganRequestDto;

@Repository
public class OrganRequestDaoImpl implements OrganRequestDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OrganRequestDto organRequestDto;
	
	@Autowired
	RegistrationDto registrationDto;
	
	@Autowired
	TreatmentDto treatmentDto;

	@Override
	public int saveOrganRequest(OrganRequestDto obj, Integer patientId,
			Integer treatmentId, HttpServletRequest request) {
		// TODO Auto-generated method stub

		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getRequestId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				RegistrationDto objLocal = (RegistrationDto) sessionFactory
						.openSession().get(
								RegistrationDto.class,
								patientId);
				obj.setPatientRegistered(objLocal);
				
				TreatmentDto treatmentDtoLocal = (TreatmentDto) sessionFactory
						.openSession().get(
								TreatmentDto.class,
								treatmentId);
				obj.setTreatmentDto(treatmentDtoLocal);
				
				OrganRequestDto dto = (OrganRequestDto) sessionFactory
						.getCurrentSession().merge(obj);

				return 1;
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				RegistrationDto objLocal = (RegistrationDto) sessionFactory
						.openSession().get(
								RegistrationDto.class,
								patientId);
				obj.setPatientRegistered(objLocal);
				
				TreatmentDto treatmentDtoLocal = (TreatmentDto) sessionFactory
						.openSession().get(
								TreatmentDto.class,
								treatmentId);
				obj.setTreatmentDto(treatmentDtoLocal);
				
				OrganRequestDto dto = (OrganRequestDto) sessionFactory
						.getCurrentSession().merge(obj);

				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public OrganRequestDto editOrganRequest(Integer organRequestId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganRequestDto.class);
			criteria.add(Restrictions.eq("id", organRequestId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organRequestDto = (OrganRequestDto) criteria
					.uniqueResult();
			return organRequestDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organRequestDto;
	}

	@Override
	public boolean deleteOrganRequest(Integer organRequestId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganRequestDto obj = (OrganRequestDto) sessionFactory
					.openSession().get(OrganRequestDto.class,
							organRequestId);
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
	public List<OrganRequestDto> requestAutoSuggestion(Integer organRequestId,
			String callFrom) {
		// TODO Auto-generated method stub
		String sql = "";
		List<OrganRequestDto> lstOrganRequestDto = new ArrayList<OrganRequestDto>();
		try {

			if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT * FROM organ_request_registration b  where b.id= "
						+ organRequestId + " and b.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT * FROM organ_request_registration b  where b.patient_id= "
						+ organRequestId + " and b.deleted='N' ";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganRequestDto obj1 = new OrganRequestDto();
				obj1.setRequestId((Integer)row.get("id"));
				obj1.setPrefix((String)row.get("prefix"));
				obj1.setFirstName((String)row.get("first_name"));
				obj1.setMiddleName((String)row.get("middle_name"));
				obj1.setLastName((String)row.get("last_name"));
				lstOrganRequestDto.add(obj1);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganRequestDto;
	}

	@Override
	public List<OrganRequestDto> getAllOrganRequestList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		List<OrganRequestDto> lstOrganRequestDto = new ArrayList<OrganRequestDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria = sessionFactory.openSession()
			 * .createCriteria(OrganRequestDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("requestId")); criteria.setMaxResults(15);
			 */
			
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_request_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganRequestDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			lstOrganRequestDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganRequestDto;
	}

	@Override
	public RegistrationDto getPatientDetailsWithMaxTreatmentId(
			Integer patientId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		List<RegistrationDto> lstRegistrationDto = new ArrayList<RegistrationDto>();

		try {

			Query query = null;
			query = sessionFactory.getCurrentSession().createSQLQuery(
					"CALL sp_search_patient_by_id(:fromyear, :toyear, :findText)");
			query.setParameter("fromyear", null);
			query.setParameter("toyear", null);
			query.setParameter("findText", patientId);
			List<Object[]> queryResult = query.list();

			System.out.println("stored procedure query result size:: "
					+ queryResult.size());
			for (Object[] aRow : queryResult) {

				RegistrationDto obj = new RegistrationDto();

				 
				obj.setPatientId((Integer) aRow[0]);
				String patientName = (String) aRow[1];
				
				obj.setCenterPatientId((String) aRow[2]);
				obj.setMobile((String) aRow[3]);
				obj.setfName((String) aRow[4]);
				obj.setmName((String) aRow[5]);
				obj.setlName((String) aRow[6]);
				obj.setGender((String) aRow[7]);
				obj.setAge((Integer) aRow[8]);
				obj.setBloodGroupId((Integer) aRow[9]);
				String bloodGroupName = ((String) aRow[10]);
				obj.setMaxTreatmentId((Integer) aRow[11]);
				obj.setPrefix((String) aRow[12]);
				lstRegistrationDto.add(obj);
			}
			registrationDto.setPatientList(lstRegistrationDto);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return registrationDto;
	}
	
	

}
