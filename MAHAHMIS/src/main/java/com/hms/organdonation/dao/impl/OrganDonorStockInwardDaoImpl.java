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
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.bloodbank.dto.BloodRequest;
import com.hms.organdonation.dao.OrganDonorStockInwardDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganCrossMatchDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorStockInwardDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.dto.OrganIssueDto;
import com.hms.organdonation.dto.OrganReactionDto;

@Repository
public class OrganDonorStockInwardDaoImpl implements OrganDonorStockInwardDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	OrganDonorStockInwardDto organDonorStockInwardDto;
	
	@Autowired
	OrganDonationRegistrationDto organDonationRegistrationDto;
	
	@Autowired
	OrganDonorCheckupListDto organDonorCheckupListDto;
	
	@Autowired
	OrganCollectionDto organCollectionDto;

	@Override
	public int saveOrganDonorStockInward(OrganDonorStockInwardDto obj,
			Integer organDonorId, Integer treatmentId,Integer organCollectionId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");

			if (obj.getStockInwardId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(OrganDonationRegistrationDto.class,organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(OrganDonorTreatmentDto.class,treatmentId);
				obj.setOrganDonorTreatment(organDonorTreatmentDto);
				
				OrganCollectionDto organCollectionDto = (OrganCollectionDto) sessionFactory
						.getCurrentSession().get(OrganCollectionDto.class,organCollectionId);
				
				if(organCollectionDto.getIsStockInward().equalsIgnoreCase("N")) {
					organCollectionDto.setIsStockInward("Y");
					sessionFactory
					.getCurrentSession().merge(organCollectionDto);
				}
				obj.setOrganCollectionDto(organCollectionDto);
				
				obj.setOrganCollectionId(organCollectionDto.getIsContainerStatus());
				obj.setUpdatedBy(organCollectionId);
				
				OrganDonorStockInwardDto dto = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().merge(obj);
				updateOrganReactionDto(treatmentId,organCollectionId);
				
				 //Added By Annapurna
				
				 
			 String hql="update OrganCollectionDto set isContainerStatus=3 where id=:Id "; 
			 Query query1 = sessionFactory.getCurrentSession().createQuery(hql); 
			 query1.setParameter("Id", obj.getOrganCollectionDto().getOrganCollectionId() );
			 query1.executeUpdate();
				 
				
				
				
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
				
				OrganCollectionDto organCollectionDto = (OrganCollectionDto) sessionFactory
						.getCurrentSession().get(OrganCollectionDto.class,organCollectionId);
				if(organCollectionDto.getIsStockInward().equalsIgnoreCase("N")) {
					organCollectionDto.setIsStockInward("Y");
					sessionFactory
					.getCurrentSession().merge(organCollectionDto);
				}
				obj.setOrganCollectionDto(organCollectionDto);
				
				OrganDonorStockInwardDto dto = (OrganDonorStockInwardDto) sessionFactory
						.getCurrentSession().merge(obj);
				updateOrganReactionDto(treatmentId,organCollectionId);
				
				 String hql="update OrganCollectionDto set isContainerStatus=3 where id=:Id "; 
				 Query query2 = sessionFactory.getCurrentSession().createQuery(hql); 
				 query2.setParameter("Id", obj.getOrganCollectionDto().getOrganCollectionId() );
				 query2.executeUpdate();
				return 2;
			}

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public OrganDonorStockInwardDto editOrganDonorStockInward(
			Integer stockInwardId) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorStockInwardDto.class);
			criteria.add(Restrictions.eq("id", stockInwardId));
			criteria.add(Restrictions.eq("deleted", "N"));
			organDonorStockInwardDto = (OrganDonorStockInwardDto) criteria
					.uniqueResult();
			return organDonorStockInwardDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organDonorStockInwardDto;
	}

	@Override
	public List<OrganDonorStockInwardDto> getAllOrganDonorStockInward(HttpServletRequest request,String fromDate,String lastDate) {
		// TODO Auto-generated method stub
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria = sessionFactory.openSession()
			 * .createCriteria(OrganDonorStockInwardDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("stockInwardId")); criteria.setMaxResults(15);
			 */
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_stockinward_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganDonorStockInwardDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			lstOrganDonorStockInwardDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganDonorStockInwardDto;
	}

	@Override
	public boolean deleteOrganDonorStockInward(Integer stockInwardId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			OrganDonorStockInwardDto obj = (OrganDonorStockInwardDto) sessionFactory
					.openSession().get(OrganDonorStockInwardDto.class,
							stockInwardId);
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
	public List<OrganDonorStockInwardDto> organDonorStockInwardAutoSuggestion(
			Integer stockInwardId, String callFrom) {
		// TODO Auto-generated method stub
		String sql = "";
		List<OrganDonorStockInwardDto> lstOrganDonorStockInwardDto = new ArrayList<OrganDonorStockInwardDto>();
		try {

			if (callFrom.equalsIgnoreCase("1")) {
				sql = "SELECT * FROM organ_donor_stock_inward b  where b.organ_donor_id= "
						+ stockInwardId + " and b.deleted='N' ";
			} else if (callFrom.equalsIgnoreCase("2")) {
				sql = "SELECT * FROM organ_donor_stock_inward b  where b.id= "
						+ stockInwardId + " and b.deleted='N' ";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession()
					.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {
				OrganDonorStockInwardDto obj =new OrganDonorStockInwardDto();
				obj.setDonorFName((String) row
						.get("donor_fname"));
				obj.setDonorMName((String) row
						.get("donor_mname"));
				obj.setDonorLName((String) row
						.get("donor_lname"));
				obj.setDonorId((Integer) row
						.get("organ_donor_id"));
				obj.setStockInwardId((Integer) row
						.get("id"));
				lstOrganDonorStockInwardDto.add(obj);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return lstOrganDonorStockInwardDto;
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

	@Override
	public List<OrganCollectionDto> getContainerList(HttpServletRequest request) {
		// TODO Auto-generated method stub
		List<OrganCollectionDto> lstOrganCollectionDto=new ArrayList<OrganCollectionDto>();
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganCollectionDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isOrganCollected", "N"));
			criteria.add(Restrictions.eq("isStockInward", "N"));
			criteria.add(Restrictions.eq("isOrganIssued", "N"));
			lstOrganCollectionDto = criteria.list();
			return lstOrganCollectionDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstOrganCollectionDto;
	}

	@Override
	public OrganCollectionDto getOrganCollectionById(Integer organCollectionId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganCollectionDto.class);
			criteria.add(Restrictions.eq("organCollectionId", organCollectionId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isOrganCollected", "Y"));
			criteria.add(Restrictions.eq("isOrganIssued", "N"));
			 criteria.add(Restrictions.eq("isContainerStatus", 1));//Added By Annapurna
			organCollectionDto = (OrganCollectionDto) criteria
					.uniqueResult();
			Integer preid= organCollectionDto.getPreservationMethodId();
			System.out.println("coldid--"+preid);
				Query querypreId=sessionFactory.getCurrentSession().createQuery("select preservationMethodName from PreservationMethodMasterDto where preservationMethodMasterId='"+preid+"'");
				String preservationMethodName =(String)querypreId.uniqueResult();
				System.out.println("preservationMethodName--"+preservationMethodName);
				organCollectionDto.setPreservationMethodName(preservationMethodName);
				
				Integer surgeryid= organCollectionDto.getSurgeryTechniqueId();
				System.out.println("coldid--"+surgeryid);
					Query querySurgeryId=sessionFactory.getCurrentSession().createQuery("select stName from SurgeryTechniqueDto where stId='"+surgeryid+"'");
					String stName =(String)querySurgeryId.uniqueResult();
					System.out.println("stName--"+stName);
					organCollectionDto.setStName(stName);
					
					Integer clodIschemiaTimeId= organCollectionDto.getColdIschemiaTimeId();
					System.out.println("coldid--"+surgeryid);
						Query queryColdId=sessionFactory.getCurrentSession().createQuery("select clodIschemiaTimeName from ClodIschemiaTimeDto where clodIschemiaTimeId='"+clodIschemiaTimeId+"'");
						String clodIschemiaTimeName =(String)queryColdId.uniqueResult();
						System.out.println("stName--"+clodIschemiaTimeName);
						organCollectionDto.setClodIschemiaTimeName(clodIschemiaTimeName);
						
						
						Integer usrId = organCollectionDto.getCollectedByUserId();
						System.out.println("usrId--" + usrId);
							Query usrQuery = sessionFactory.getCurrentSession().createQuery("select user_Name from Users where user_ID = '"+usrId+"'");
							String usrNameCollected = (String) usrQuery.uniqueResult();
							System.out.println("user name :--" + usrNameCollected);
							organCollectionDto.setCollectedByUsrName(usrNameCollected);
				
				return organCollectionDto;
				
				
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organCollectionDto;
	}
	
	@Override
	public OrganCollectionDto getOnSelectOrganCollectionById(Integer organCollectionId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		try {
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganCollectionDto.class);
			criteria.add(Restrictions.eq("organCollectionId", organCollectionId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isOrganIssued", "N"));
			organCollectionDto = (OrganCollectionDto) criteria
					.uniqueResult();
			return organCollectionDto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organCollectionDto;
	}
	
	
	@Override
	public boolean updateOrganReactionDto(Integer treatmentId, Integer organCollectionId) {
		// TODO Auto-generated method stub
		try {
			Query sqlElse = sessionFactory.getCurrentSession().createSQLQuery("UPDATE organ_reaction SET is_stock_inward='Y' WHERE organ_collection_id='"+organCollectionId+ "' AND organ_treatment_id='"+treatmentId + "' AND deleted='N'");
			sqlElse.executeUpdate();
			return true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}
	
	//Added By Annapurna
			@Override
			public List<OrganCollectionDto> getContainerListForOrgan_StockInward(HttpServletRequest request) {
				
				List<OrganCollectionDto> listOrganCollectionDto=new ArrayList<OrganCollectionDto>();
				try {
					
					Criteria criteria1 = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
					criteria1.add(Restrictions.eq("deleted", "N"));
					criteria1.add(Restrictions.eq("isContainerStatus", 2));
				
					listOrganCollectionDto = criteria1.list();
					
				} catch (Exception e) {
					e.printStackTrace();
				}
				return listOrganCollectionDto;
			}

			@Override
			public OrganCrossMatchDto getOrganContainerNameById(Integer id,HttpServletRequest request) {
				OrganCrossMatchDto dto = new OrganCrossMatchDto();
				try {
					
					Query query= sessionFactory.getCurrentSession().createSQLQuery("select s.containerName,s.dorgan_name as dorganName from organ_cross_match  c Join organ_donor_stock_inward s  On s.organ_size=c.organ_size where   is_organ_issued='N' And c.organ_requester_id="+id+" ");
					query.setResultTransformer(Transformers.aliasToBean(OrganCrossMatchDto.class));
					List<OrganCrossMatchDto>lst = query.list();
				
					dto.setListOrganCrossMatchDto(lst);					
					
				}catch(Exception e) {
					e.printStackTrace();
				}
			return dto;
			}

}
