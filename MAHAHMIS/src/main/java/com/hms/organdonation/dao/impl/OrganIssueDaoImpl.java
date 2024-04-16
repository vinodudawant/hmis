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
import com.hms.organdonation.dao.OrganIssueDao;
import com.hms.organdonation.dto.IntendOrganDonorMasterDto;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganIssueDto;
import com.hms.organdonation.dto.OrganRequestDto;

@Repository
public class OrganIssueDaoImpl implements OrganIssueDao {

	@Autowired
	SessionFactory sessionFactory;

	@Autowired
	OrganIssueDto organIssueDto;
	
	@Autowired
	RegistrationDto registrationDto;
	
	@Autowired
	TreatmentDto treatmentDto;

	@Override
	public int saveOrganIssue(OrganIssueDto obj, Integer crossMatchId,
			Integer requesterId, Integer organId,Integer stockInwardId, HttpServletRequest request) {
		// TODO Auto-generated method stub

		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getIssueId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganCrossMatchDto objLocal = (OrganCrossMatchDto) sessionFactory
						.getCurrentSession().get(
								OrganCrossMatchDto.class,
								crossMatchId);
				obj.setOrganCrossMatchDto(objLocal);
				
				OrganRequestDto organRequestDto = (OrganRequestDto) sessionFactory
						.getCurrentSession().get(
								OrganRequestDto.class,
								requesterId);
				obj.setOrganRequestDto(organRequestDto);
				
				IntendOrganDonorMasterDto intendOrganDonorMasterDto = (IntendOrganDonorMasterDto) sessionFactory
						.getCurrentSession().get(
								IntendOrganDonorMasterDto.class,
								organId);
				obj.setIntendOrganDonorMasterDto(intendOrganDonorMasterDto);
				
				OrganDonorStockInwardDto stockInwardObj = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorStockInwardDto.class,
								stockInwardId);
				Integer remainingQty=0;
				if(stockInwardObj.getOrganAvailableQuantity() > 0) {
					 remainingQty = (stockInwardObj.getOrganAvailableQuantity() - obj.getRequiredQty());
					stockInwardObj.setOrganAvailableQuantity(remainingQty);
					
					if(remainingQty == 0 && stockInwardObj.getIsDiscarded().equalsIgnoreCase("N")) {
						stockInwardObj.setIsDiscarded("Y");
					}
					sessionFactory
					.getCurrentSession().merge(stockInwardObj);
				}
				
				
				obj.setOrganDonorStockInwardDto(stockInwardObj);
								
				OrganIssueDto dto = (OrganIssueDto) sessionFactory
						.getCurrentSession().merge(obj);

				return 1;
				
			} else {
				
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganCrossMatchDto objLocal = (OrganCrossMatchDto) sessionFactory
						.getCurrentSession().get(
								OrganCrossMatchDto.class,
								crossMatchId);
				obj.setOrganCrossMatchDto(objLocal);
				
				OrganRequestDto organRequestDto = (OrganRequestDto) sessionFactory
						.getCurrentSession().get(
								OrganRequestDto.class,
								requesterId);
				obj.setOrganRequestDto(organRequestDto);
				
				IntendOrganDonorMasterDto intendOrganDonorMasterDto = (IntendOrganDonorMasterDto) sessionFactory
						.getCurrentSession().get(
								IntendOrganDonorMasterDto.class,
								organId);
				obj.setIntendOrganDonorMasterDto(intendOrganDonorMasterDto);
				
				OrganDonorStockInwardDto stockInwardObj = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().get(
								OrganDonorStockInwardDto.class,
								stockInwardId);
				obj.setOrganDonorStockInwardDto(stockInwardObj);
				
				OrganIssueDto dto = (OrganIssueDto) sessionFactory
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
	public OrganIssueDto editOrganIssue(Integer organIssueId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganIssueDto.class);
			criteria.add(Restrictions.eq("id", organIssueId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organIssueDto = (OrganIssueDto) criteria
					.uniqueResult();
			return organIssueDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organIssueDto;
	}

	@Override
	public boolean deleteOrganIssue(Integer organIssueId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganIssueDto obj = (OrganIssueDto) sessionFactory
					.getCurrentSession().get(OrganIssueDto.class,
							organIssueId);
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
	public List<OrganIssueDto> issueAutoSuggestion(Integer organIssueId,
			String callFrom) {
		// TODO Auto-generated method stub
		String sql = "";
		List<OrganIssueDto> lstOrganIssueDto = new ArrayList<OrganIssueDto>();
		try {

			if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_issue b left join organ_request_registration o on b.organ_requester_id=o.id where b.id= "
						+ organIssueId + " and b.deleted='N' ";
			}else if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT b.id,o.prefix,o.first_name,o.middle_name,o.last_name FROM organ_issue b left join organ_request_registration o on b.organ_requester_id=o.id where b.organ_requester_id= "
						+ organIssueId + " and b.deleted='N' ";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganIssueDto obj1 = new OrganIssueDto();
				obj1.setIssueId((Integer)row.get("id"));
				obj1.setPrefix((String)row.get("prefix"));
				obj1.setFirstName((String)row.get("first_name"));
				obj1.setMiddleName((String)row.get("middle_name"));
				obj1.setLastName((String)row.get("last_name"));
				lstOrganIssueDto.add(obj1);
				
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganIssueDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganIssueDto> getAllOrganIssueList(HttpServletRequest request,String fromDate,String lastDate) {
		List<OrganIssueDto> lstOrganIssueDto = new ArrayList<OrganIssueDto>();
		try {
		HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
//			Criteria criteria = sessionFactory.openSession()
//					.createCriteria(OrganIssueDto.class);
//			criteria.add(Restrictions.eq("deleted", "N"));
//			criteria.add(Restrictions.eq("unitId", unitId));
//			criteria.addOrder(Order.desc("issueId"));
//			criteria.setMaxResults(15);
//			lstOrganIssueDto = criteria.list();
			
/*
 * String hql = "from OrganIssueDto where deleted = 'N'"; // Query query =
 * sessionFactory.getCurrentSession().createQuery(hql); Query query =
 * sessionFactory.openSession().createQuery(hql);
 */
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_issue_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganIssueDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			lstOrganIssueDto = specialitySp.list();
			
			System.out.println("--- getAllOrganIssueList list size: " + lstOrganIssueDto.size());
			System.out.println("--- getAllOrganIssueList list : " + lstOrganIssueDto);
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganIssueDto;
	}
	
	
	@Override
	public OrganCrossMatchDto getOrganCrossMatchById(Integer requesterId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		OrganCrossMatchDto objNew=new OrganCrossMatchDto();
		try {
			
			OrganRequestDto organRequestDto = (OrganRequestDto) sessionFactory
					.getCurrentSession().get(
							OrganRequestDto.class,
							requesterId);
			
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganCrossMatchDto.class);
			criteria.add(Restrictions.eq("organRequestDto", organRequestDto));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isOrganIssued", "N"));
			objNew = (OrganCrossMatchDto) criteria
					.uniqueResult();
			return objNew;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return objNew;
	}

	@Override
	public List<OrganDonorStockInwardDto> getAllOrganContainerList(Integer organId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorStockInwardDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("organId", organId));
			criteria.add(Restrictions.gt("organAvailableQuantity",0));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstOrganDonorStockInwardDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganDonorStockInwardDto;
	}

}
