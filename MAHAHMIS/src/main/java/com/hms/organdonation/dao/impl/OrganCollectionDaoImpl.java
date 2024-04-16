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

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.organdonation.dao.OrganCollectionDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.pharmacy.upload.FilePath;

@Repository
public class OrganCollectionDaoImpl implements OrganCollectionDao {

	@Autowired
	SessionFactory sessionFactory;
	
	static Logger log = Logger.getLogger(OrganCollectionDaoImpl.class.getName());
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Autowired
	OrganDonorCheckupListDto organDonorCheckupListDto;
	
	@Autowired
	OrganDonorTreatmentDto organDonorTreatmentDto;

	@Override
	public int saveOrganCollection(OrganCollectionDto obj, Integer organDonorId, Integer treatmentId,
			Integer checkupListId, MultipartFile[] organCollectionDocument, HttpServletRequest request) {
		
		log.info("in OrganCollectionDaoImpl : saveOrganCollection()");
		
		try {
			
			System.out.println("remarks:: "+obj.getRemarks());
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getOrganCollectionId() == 0) {
				
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(OrganDonationRegistrationDto.class,organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(OrganDonorTreatmentDto.class,treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				OrganDonorCheckupListDto organDonorCheckupListDto = (OrganDonorCheckupListDto) sessionFactory
						.getCurrentSession().get(OrganDonorCheckupListDto.class,checkupListId);
				obj.setDonorCheckupList(organDonorCheckupListDto);
				
				//aniket, 7 SEP, 22
				obj.setIsOrganCollected("Y");
				
				OrganCollectionDto dto = (OrganCollectionDto) sessionFactory.getCurrentSession().merge(obj);
				
				for (MultipartFile file : organCollectionDocument) {
					if (file.isEmpty()) {
						continue;
					}
					java.io.File uploadPath = new java.io.File(
							FilePath.getOrganCollectionFilesPath() + dto.getOrganCollectionId());
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
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(OrganDonationRegistrationDto.class,organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(OrganDonorTreatmentDto.class,treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				OrganDonorCheckupListDto organDonorCheckupListDto = (OrganDonorCheckupListDto) sessionFactory
						.getCurrentSession().get(OrganDonorCheckupListDto.class,checkupListId);
				obj.setDonorCheckupList(organDonorCheckupListDto);
				
				//aniket, 7 SEP, 22
				obj.setIsOrganCollected("Y");
				
				OrganCollectionDto dto = (OrganCollectionDto) sessionFactory.getCurrentSession().merge(obj);
				
				for (MultipartFile file : organCollectionDocument) {
					if (file.isEmpty()) {
						continue;
					}
					java.io.File uploadPath = new java.io.File(
							FilePath.getOrganCollectionFilesPath() + dto.getOrganCollectionId());
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
			
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganCollectionDto> getAllCollectedOrgans(HttpServletRequest request,String fromDate,String lastDate) {

		List<OrganCollectionDto> listOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria =
			 * sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("organCollectionId"));
			 * criteria.setMaxResults(15);
			 */
			
			
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_collection_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganCollectionDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			
			listOrganCollectionDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOrganCollectionDto;
	}

	@Override
	public OrganCollectionDto getCollectedOrganById(Integer organCollectionId) {
		
		OrganCollectionDto dto = new OrganCollectionDto();
		try {
			
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
			criteria.add(Restrictions.eq("organCollectionId", organCollectionId));
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.add(Restrictions.eq("isOrganCollected", "Y"));
			dto = (OrganCollectionDto) criteria.uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public boolean deleteCollectedOrganById(Integer organCollectionId, HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganCollectionDto obj = (OrganCollectionDto) sessionFactory.getCurrentSession().get(OrganCollectionDto.class, organCollectionId);
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
	public List<OrganCollectionDto> serachOrganContainerDetailsById(Integer searchParam) {
		// TODO Auto-generated method stub
		List<OrganCollectionDto> listOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		try {
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isOrganCollected", "N"));
			criteria.add(Restrictions.eq("organCollectionId",searchParam));
			listOrganCollectionDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOrganCollectionDto;
	}

	@Override
	public List<OrganCollectionDto> organCollectionAutoSuggestion(Integer organCollectionId, String callFrom) {
		// TODO Auto-generated method stub

		// TODO Auto-generated method stub
		String sql = "";
		List<OrganCollectionDto> lstOrganCollectionDto = new ArrayList<OrganCollectionDto>();
		try {

			if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_collection b left join organ_donation_registration o on b.organ_donor_id=o.id where b.id= "
						+ organCollectionId + " and b.deleted='N' and o.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_collection b left join organ_donation_registration o on b.organ_donor_id=o.id where b.organ_donor_id= "
						+ organCollectionId + " and b.deleted='N' and o.deleted='N' ";
			} 

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganCollectionDto obj1 = new OrganCollectionDto();
				obj1.setOrganCollectionId((Integer)row.get("id"));
				obj1.setPrefix((String)row.get("prefix"));
				obj1.setFirstName((String)row.get("first_name"));
				obj1.setMiddleName((String)row.get("middle_name"));
				obj1.setLastName((String)row.get("last_name"));
				lstOrganCollectionDto.add(obj1);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganCollectionDto;
	
	}

	@Override
	public OrganCollectionDto editCollectedOrganById(Integer organCollectionId) {
		// TODO Auto-generated method stub
		OrganCollectionDto dto = new OrganCollectionDto();
		try {
			
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
			criteria.add(Restrictions.eq("organCollectionId", organCollectionId));
			criteria.add(Restrictions.eq("deleted", "N"));
			dto = (OrganCollectionDto) criteria.uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
}
