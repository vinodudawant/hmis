package com.hms.organdonation.dao.impl;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Paths;
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
import org.springframework.web.multipart.MultipartFile;

import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.organdonation.dao.OrganCrossMatchDao;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganRequestDto;
import com.hms.pharmacy.upload.FilePath;

@Repository
public class OrganCrossMatchDaoImpl implements OrganCrossMatchDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OrganCrossMatchDto organCrossMatchDto;
	
	@Autowired
	RegistrationDto registrationDto;
	
	@Autowired
	TreatmentDto treatmentDto;

	@Override
	public int saveOrganCrossMatch(OrganCrossMatchDto obj, Integer patientId,
			Integer treatmentId,Integer organId,Integer stockInwardId,Integer rquestId, MultipartFile[]  testResultDocument,HttpServletRequest request) {
		// TODO Auto-generated method stub

		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getCrossMatchId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				RegistrationDto objLocal = (RegistrationDto) sessionFactory
						.getCurrentSession().get(
								RegistrationDto.class,
								patientId);
				obj.setPatientRegistered(objLocal);
				
				TreatmentDto treatmentDtoLocal = (TreatmentDto) sessionFactory
						.getCurrentSession().get(
								TreatmentDto.class,
								treatmentId);
				obj.setTreatmentDto(treatmentDtoLocal);
				
				IntendOrganDonorMasterDto intendOrganDonorMasterDto = (IntendOrganDonorMasterDto) sessionFactory
						.getCurrentSession().get(
								IntendOrganDonorMasterDto.class,
								organId);
				obj.setIntendOrganDonorMasterDto(intendOrganDonorMasterDto);
				
				OrganDonorStockInwardDto organStockDiscardDto = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorStockInwardDto.class,
								stockInwardId);
				obj.setOrganDonorStockInwardDto(organStockDiscardDto);
				
				
				OrganRequestDto organRequestDto = (OrganRequestDto) sessionFactory
						.getCurrentSession().get(
								OrganRequestDto.class,
								rquestId);
				obj.setOrganRequestDto(organRequestDto);
				
				OrganCrossMatchDto dto = (OrganCrossMatchDto) sessionFactory
						.getCurrentSession().merge(obj);
				
					for (MultipartFile file : testResultDocument) {
						if (file.isEmpty()) {
							continue;
						}
						java.io.File uploadPath = new java.io.File(
								FilePath.getOrganCrossMatchFilesPath() +dto.getCrossMatchId());
						if (!uploadPath.exists())
							uploadPath.mkdirs();
						String fileName = file.getOriginalFilename();
						String filepath = Paths.get(uploadPath.toString(), fileName).toString();
						BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
						stream.write(file.getBytes());
						stream.close();
					}

				return 1;
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				RegistrationDto objLocal = (RegistrationDto) sessionFactory
						.getCurrentSession().get(
								RegistrationDto.class,
								patientId);
				obj.setPatientRegistered(objLocal);
				
				TreatmentDto treatmentDtoLocal = (TreatmentDto) sessionFactory
						.getCurrentSession().get(
								TreatmentDto.class,
								treatmentId);
				obj.setTreatmentDto(treatmentDtoLocal);
				
				IntendOrganDonorMasterDto intendOrganDonorMasterDto = (IntendOrganDonorMasterDto) sessionFactory
						.getCurrentSession().get(
								IntendOrganDonorMasterDto.class,
								organId);
				obj.setIntendOrganDonorMasterDto(intendOrganDonorMasterDto);
				
				OrganDonorStockInwardDto organStockInwardDto = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorStockInwardDto.class,
								stockInwardId);
				obj.setOrganDonorStockInwardDto(organStockInwardDto);
				
				
				OrganRequestDto organRequestDto = (OrganRequestDto) sessionFactory
						.getCurrentSession().get(
								OrganRequestDto.class,
								rquestId);
				obj.setOrganRequestDto(organRequestDto);
				
				OrganCrossMatchDto dto = (OrganCrossMatchDto) sessionFactory
						.getCurrentSession().merge(obj);
				
					for (MultipartFile file : testResultDocument) {
						if (file.isEmpty()) {
							continue;
						}
						java.io.File uploadPath = new java.io.File(
								FilePath.getOrganCrossMatchFilesPath() +dto.getCrossMatchId());
						if (!uploadPath.exists())
							uploadPath.mkdirs();
						String fileName = file.getOriginalFilename();
						String filepath = Paths.get(uploadPath.toString(), fileName).toString();
						BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
						stream.write(file.getBytes());
						stream.close();
					}

				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public OrganCrossMatchDto editOrganCrossMatch(Integer organCrossMatchId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganCrossMatchDto.class);
			criteria.add(Restrictions.eq("id", organCrossMatchId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organCrossMatchDto = (OrganCrossMatchDto) criteria
					.uniqueResult();
			return organCrossMatchDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organCrossMatchDto;
	}

	@Override
	public boolean deleteOrganCrossMatch(Integer organCrossMatchId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganCrossMatchDto obj = (OrganCrossMatchDto) sessionFactory
					.getCurrentSession().get(OrganCrossMatchDto.class,
							organCrossMatchId);
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
	public List<OrganCrossMatchDto> crossMatchAutoSuggestion(Integer organCrossMatchId,
			String callFrom) {
		// TODO Auto-generated method stub
		String sql = "";
		List<OrganCrossMatchDto> lstOrganCrossMatchDto = new ArrayList<OrganCrossMatchDto>();
		try {

			if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_cross_match b left join organ_request_registration o on b.organ_requester_id=o.id where b.id= "
						+ organCrossMatchId + " and b.deleted='N' and o.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_cross_match b left join organ_request_registration o on b.organ_requester_id=o.id where b.patient_id= "
						+ organCrossMatchId + " and b.deleted='N' and o.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("3")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_cross_match b left join organ_request_registration o on b.organ_requester_id=o.id where b.organ_requester_id= "
						+ organCrossMatchId + " and b.deleted='N' ";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganCrossMatchDto obj1 = new OrganCrossMatchDto();
				obj1.setCrossMatchId((Integer)row.get("id"));
				obj1.setPrefix((String)row.get("prefix"));
				obj1.setFirstName((String)row.get("first_name"));
				obj1.setMiddleName((String)row.get("middle_name"));
				obj1.setLastName((String)row.get("last_name"));
				lstOrganCrossMatchDto.add(obj1);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganCrossMatchDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganCrossMatchDto> getAllOrganCrossMatchList(HttpServletRequest request,String fromDate,String lastDate) {
		List<OrganCrossMatchDto> lstOrganCrossMatchDto = new ArrayList<OrganCrossMatchDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria = sessionFactory.openSession()
			 * .createCriteria(OrganCrossMatchDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("crossMatchId")); criteria.setMaxResults(15);
			 */
			
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_crossmatch_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganCrossMatchDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			lstOrganCrossMatchDto = specialitySp.list();
			
			System.out.println("--lstOrganCrossMatchDto-- size : " + lstOrganCrossMatchDto.size());
			System.out.println("--lstOrganCrossMatchDto--  : " + lstOrganCrossMatchDto);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		return lstOrganCrossMatchDto;
	}

}
