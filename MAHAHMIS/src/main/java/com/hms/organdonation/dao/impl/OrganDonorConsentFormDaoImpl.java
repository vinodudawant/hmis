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

import com.hms.organdonation.dao.OrganDonorConsentFormDao;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorConsentFormDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.pharmacy.upload.FilePath;

@Repository
public class OrganDonorConsentFormDaoImpl implements OrganDonorConsentFormDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	OrganDonorConsentFormDto organDonorConsentFormDto;
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Autowired
	OrganDonorCheckupListDto organDonorCheckupListDto;

	@Override
	public int saveOrganDonorConsentForm(OrganDonorConsentFormDto obj,
			Integer organDonorId, Integer treatmentId,Integer checkupListId,
			MultipartFile[] uploadConsentFormDocs, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getConsentFormId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorTreatmentDto.class,
								treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				OrganDonorCheckupListDto organDonorCheckupListDto = (OrganDonorCheckupListDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorCheckupListDto.class,
								checkupListId);
				if(organDonorCheckupListDto.getIsConsentGiven().equalsIgnoreCase("N")) {
					organDonorCheckupListDto.setIsConsentGiven("Y");
					sessionFactory
					.getCurrentSession().merge(organDonorCheckupListDto);
				}
				obj.setOrganDonorCheckupListDto(organDonorCheckupListDto);
				
				OrganDonorConsentFormDto dto = (OrganDonorConsentFormDto) sessionFactory
						.getCurrentSession().merge(obj);

				for (MultipartFile file : uploadConsentFormDocs) {
					if (file.isEmpty()) {
						continue;
					}
					java.io.File uploadPath = new java.io.File(
							FilePath.getConsentFormFilesPath()
									+ dto.getConsentFormId());
					if (!uploadPath.exists())
						uploadPath.mkdirs();
					String fileName = file.getOriginalFilename();
					String filepath = Paths
							.get(uploadPath.toString(), fileName).toString();
					BufferedOutputStream stream = new BufferedOutputStream(
							new FileOutputStream(new java.io.File(filepath)));
					stream.write(file.getBytes());
					stream.close();
				}
				return 1;
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorTreatmentDto.class,
								treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				OrganDonorCheckupListDto organDonorCheckupListDto = (OrganDonorCheckupListDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorCheckupListDto.class,
								checkupListId);
				if(organDonorCheckupListDto.getIsConsentGiven().equalsIgnoreCase("N")) {
					organDonorCheckupListDto.setIsConsentGiven("Y");
					sessionFactory
					.getCurrentSession().merge(organDonorCheckupListDto);
				}
				obj.setOrganDonorCheckupListDto(organDonorCheckupListDto);
				
				OrganDonorConsentFormDto dto = (OrganDonorConsentFormDto) sessionFactory
						.getCurrentSession().merge(obj);

				for (MultipartFile file : uploadConsentFormDocs) {
					if (file.isEmpty()) {
						continue;
					}
					java.io.File uploadPath = new java.io.File(
							FilePath.getConsentFormFilesPath()
									+ dto.getConsentFormId());
					if (!uploadPath.exists())
						uploadPath.mkdirs();
					String fileName = file.getOriginalFilename();
					String filepath = Paths
							.get(uploadPath.toString(), fileName).toString();
					BufferedOutputStream stream = new BufferedOutputStream(
							new FileOutputStream(new java.io.File(filepath)));
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
	public OrganDonorConsentFormDto editOrganDonorConsentForm(
			Integer consentFormId) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorConsentFormDto.class);
			criteria.add(Restrictions.eq("id", consentFormId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organDonorConsentFormDto = (OrganDonorConsentFormDto) criteria
					.uniqueResult();
			return organDonorConsentFormDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organDonorConsentFormDto;
	}

	@Override
	public List<OrganDonorConsentFormDto> getAllOrganDonorConsentForm(
			HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		List<OrganDonorConsentFormDto> lstOrganDonorConsentFormDto = new ArrayList<OrganDonorConsentFormDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria = sessionFactory.openSession()
			 * .createCriteria(OrganDonorConsentFormDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("consentFormId")); criteria.setMaxResults(15);
			 */

			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_consent_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganDonorConsentFormDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			lstOrganDonorConsentFormDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganDonorConsentFormDto;
	}

	@Override
	public boolean deleteOrganDonorConsentForm(Integer consentFormId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganDonorConsentFormDto obj = (OrganDonorConsentFormDto) sessionFactory
					.getCurrentSession().get(OrganDonorConsentFormDto.class,
							consentFormId);
			obj.setDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public List<OrganDonorConsentFormDto> organDonorConsentFormAutoSuggestion(
			Integer consentFormId, String callFrom) {
		// TODO Auto-generated method stub
		String sql = "";
		List<OrganDonorConsentFormDto> lstOrganDonorConsentFormDto = new ArrayList<OrganDonorConsentFormDto>();
		try {

			if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT * FROM organ_donor_consent_form b  where b.id= "
						+ consentFormId + " and b.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT * FROM organ_donor_consent_form b  where b.organ_donor_id= "
						+ consentFormId + " and b.deleted='N' ";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganDonorConsentFormDto obj=new OrganDonorConsentFormDto();
				obj.setConsentFormId((Integer) row
						.get("id"));
				obj.setDonorFName((String) row
						.get("donor_fname"));
				obj.setDonorMName((String) row
						.get("donor_mname"));
				obj.setDonorLName((String) row
						.get("donor_lname"));
				obj.setDonorId((Integer) row
						.get("organ_donor_id"));
				lstOrganDonorConsentFormDto.add(obj);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstOrganDonorConsentFormDto;
	}

	@Override
	public OrganDonationRegistrationDto getOrganDonorById(Integer organDonorId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(OrganDonationRegistrationDto.class);
			criteria.add(Restrictions.eq("id", organDonorId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organDonationRegistrationDto = (OrganDonationRegistrationDto) criteria
					.uniqueResult();
			return organDonationRegistrationDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organDonationRegistrationDto;
	}

	@Override
	public OrganDonorCheckupListDto getOrganDonorCheckupListByCheckupListIdAndOrganDonorIdAndTreatmentId(
			Integer organDonorId, Integer checkupListId, Integer treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		Criteria criteriaFinal = sessionFactory.openSession()
				.createCriteria(OrganDonorCheckupListDto.class);
		criteriaFinal.add(Restrictions.eq("checkupListId",checkupListId));
		criteriaFinal.add(Restrictions.eq("deleted", "N"));
		organDonorCheckupListDto = (OrganDonorCheckupListDto) criteriaFinal
				.uniqueResult();
		return organDonorCheckupListDto;
	}

	

}
