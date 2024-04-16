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
import com.hms.organdonation.dao.OrganStockDiscardDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.dto.OrganStockDiscardDto;

@Repository
public class OrganStockDiscardDaoImpl implements OrganStockDiscardDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OrganStockDiscardDto organStockDiscardDto;
	
	@Autowired
	RegistrationDto registrationDto;
	
	@Autowired
	TreatmentDto treatmentDto;

	@Override
	public int saveOrganStockDiscard(OrganStockDiscardDto obj, Integer organDonorId,Integer organCollectionId,
			Integer organTreatmentId, Integer stockInwardId,HttpServletRequest request) {
		// TODO Auto-generated method stub

		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getStockDiscardId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto objLocal = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(objLocal);
				
				OrganDonorTreatmentDto treatmentDtoLocal = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorTreatmentDto.class,
								organTreatmentId);
				obj.setOrganDonorTreatment(treatmentDtoLocal);
				
				OrganCollectionDto organCollectionDto = (OrganCollectionDto) sessionFactory
						.getCurrentSession().get(
								OrganCollectionDto.class,
								organCollectionId);
				obj.setOrganCollectionDto(organCollectionDto);
				
				
				OrganDonorStockInwardDto organDonorStockInwardDto = (OrganDonorStockInwardDto) sessionFactory
				.getCurrentSession().get(
						OrganDonorStockInwardDto.class,
						stockInwardId);
					Integer stockQty = 0;
					if(organDonorStockInwardDto.getOrganAvailableQuantity()>0) {
						
						// stock quntity directly set to 0, aniket 26 FEB 22
						//stockQty = organDonorStockInwardDto.getOrganAvailableQuantity()- obj.getOrganDiscardedQuantity();
						
						organDonorStockInwardDto.setOrganAvailableQuantity(stockQty);
						
						if(stockQty == 0 && organDonorStockInwardDto.getIsDiscarded().equalsIgnoreCase("N")) {
							organDonorStockInwardDto.setIsDiscarded("Y");
						}
						
						
						sessionFactory.getCurrentSession().merge(organDonorStockInwardDto);
					}
					
				
				obj.setOrganDonorStockInwardDto(organDonorStockInwardDto);
				
				
				OrganStockDiscardDto dto = (OrganStockDiscardDto) sessionFactory
						.getCurrentSession().merge(obj);

				return 1;
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto objLocal = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(
								OrganDonationRegistrationDto.class,
								organDonorId);
				obj.setOrganDonationRegistrationDto(objLocal);
				
				OrganDonorTreatmentDto treatmentDtoLocal = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorTreatmentDto.class,
								organTreatmentId);
				obj.setOrganDonorTreatment(treatmentDtoLocal);
				
				OrganCollectionDto organCollectionDto = (OrganCollectionDto) sessionFactory
						.getCurrentSession().get(
								OrganCollectionDto.class,
								organCollectionId);
				obj.setOrganCollectionDto(organCollectionDto);
				
				OrganDonorStockInwardDto organDonorStockInwardDto = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorStockInwardDto.class,
								stockInwardId);
				Integer stockQty = 0;
				if(organDonorStockInwardDto.getOrganAvailableQuantity()>0) {
					
					// stock quntity directly set to 0, aniket 26 FEB 22
					// stockQty = organDonorStockInwardDto.getOrganAvailableQuantity()- obj.getOrganDiscardedQuantity();
					organDonorStockInwardDto.setOrganAvailableQuantity(stockQty);
					
				}
				if(stockQty == 0 && organDonorStockInwardDto.getIsDiscarded().equalsIgnoreCase("N")) {
					organDonorStockInwardDto.setIsDiscarded("Y");
				}
				sessionFactory
				.getCurrentSession().merge(organDonorStockInwardDto);
						obj.setOrganDonorStockInwardDto(organDonorStockInwardDto);
				
				OrganStockDiscardDto dto = (OrganStockDiscardDto) sessionFactory
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
	public OrganStockDiscardDto editOrganStockDiscard(Integer organStockDiscardId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganStockDiscardDto.class);
			criteria.add(Restrictions.eq("id", organStockDiscardId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organStockDiscardDto = (OrganStockDiscardDto) criteria
					.uniqueResult();
			return organStockDiscardDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organStockDiscardDto;
	}

	@Override
	public boolean deleteOrganStockDiscard(Integer organStockDiscardId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganStockDiscardDto obj = (OrganStockDiscardDto) sessionFactory
					.getCurrentSession().get(OrganStockDiscardDto.class,
							organStockDiscardId);
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
	public List<OrganStockDiscardDto> stockDiscardAutoSuggestion(Integer organStockDiscardId,
			String callFrom) {
		// TODO Auto-generated method stub
		String sql = "";
		List<OrganStockDiscardDto> lstOrganStockDiscardDto = new ArrayList<OrganStockDiscardDto>();
		try {
			
			if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_stock_discard b left join organ_donation_registration o on b.organ_donor_id=o.id where b.id= "
						+ organStockDiscardId + " and b.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_stock_discard b left join organ_donation_registration o on b.organ_donor_id=o.id where b.organ_donor_id= "
						+ organStockDiscardId + " and b.deleted='N' ";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganStockDiscardDto obj1 = new OrganStockDiscardDto();
				obj1.setStockDiscardId((Integer)row.get("id"));
				obj1.setPrefix((String)row.get("prefix"));
				obj1.setFirstName((String)row.get("first_name"));
				obj1.setMiddleName((String)row.get("middle_name"));
				obj1.setLastName((String)row.get("last_name"));
				lstOrganStockDiscardDto.add(obj1);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganStockDiscardDto;
	}

	@Override
	public List<OrganStockDiscardDto> getAllOrganStockDiscardList(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		List<OrganStockDiscardDto> lstOrganStockDiscardDto = new ArrayList<OrganStockDiscardDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria = sessionFactory.openSession()
			 * .createCriteria(OrganStockDiscardDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("stockDiscardId")); criteria.setMaxResults(15);
			 */
			
			
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_stockdiscard_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganStockDiscardDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			lstOrganStockDiscardDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganStockDiscardDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganDonorStockInwardDto> getContainerList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto=new ArrayList<OrganDonorStockInwardDto>();
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorStockInwardDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.gt("organAvailableQuantity",0));
			criteria.add(Restrictions.eq("isDiscarded","N"));
			lstOrganDonorStockInwardDto = criteria.list();
			return lstOrganDonorStockInwardDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganDonorStockInwardDto;
	}

	@Override
	public OrganDonorStockInwardDto getOrganDonorStockInwardById(Integer stockInwardId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		OrganDonorStockInwardDto obj = new OrganDonorStockInwardDto();
		try {
			
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorStockInwardDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("stockInwardId",stockInwardId));
			 obj = (OrganDonorStockInwardDto) criteria.uniqueResult();
			return obj;
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

}
