package com.hms.organdonation.dao.impl;

import java.util.ArrayList;
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

import com.hms.organdonation.dao.OrganReactionDao;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorCheckupListDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.organdonation.dto.OrganReactionDto;

@Repository
public class OrganReactionDaoImpl implements OrganReactionDao {
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public List<OrganDonorCheckupListDto> searchDonorFromCheckList(String findText, String callFrom) {
		
		String sql = "";
		List<OrganDonorCheckupListDto> listOrganDonorCheckupListDto = new ArrayList<OrganDonorCheckupListDto>();
		try {

			if (callFrom.equalsIgnoreCase("1")) {
				/*
				 * sql =
				 * "SELECT p.id AS id, concat(p.title,'',p.donor_fname,' ',p.donor_mname,' ',p.donor_lname) AS donor_name FROM organ_donor_checkup_list p where p.organ_donor_id = "
				 * + findText + " and p.deleted='N' and p.is_consent_given='Y' limit 20";
				 */
				//Added By Annapurna
				sql = "SELECT p.id AS id, concat(p.title,'',p.donor_fname,' ',p.donor_mname,' ',p.donor_lname) AS donor_name FROM organ_donor_checkup_list p where p.id = "
						+ findText + " and p.deleted='N' and p.is_consent_given='Y' limit 20";

			} else if (callFrom.equalsIgnoreCase("2")) {

				sql = "SELECT p.id AS id, concat(p.title,'',p.donor_fname,' ',p.donor_mname,' ',p.donor_lname) AS donor_name FROM organ_donor_checkup_list p where "

						+ " (p.donor_fname like '" + findText + "%' " + " OR p.donor_lname like '" + findText + "%' "
						+ " OR concat(p.donor_fname,' ',p.donor_lname) like '" + findText + "%' "
						+ " OR concat(p.donor_fname,' ',p.donor_mname,' ',p.donor_lname) like '" + findText + "%' "
						+ " OR concat(p.donor_fname,' ',p.donor_mname) like '" + findText + "%' "
						+ " OR concat(p.donor_mname,' ',p.donor_lname) like '" + findText + "%') "
						+ " and p.deleted = 'N' and p.is_consent_given = 'Y' limit 20";
			}

			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			System.err.println("----donor chechkupList autosuggestion sql query : " + sql);

			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				OrganDonorCheckupListDto dto = new OrganDonorCheckupListDto();
				dto.setCheckupListId((Integer) row.get("id"));
				dto.setDonorName((String) row.get("donor_name"));

				System.err.println("----checkup List autosuggestion object : " + dto);
				listOrganDonorCheckupListDto.add(dto);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listOrganDonorCheckupListDto;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganCollectionDto> getContainerListByChckpId(Integer checkupListId, HttpServletRequest request) {
		
		System.err.println("----OrganCollectionDto : " + checkupListId);
		
		List<OrganCollectionDto> listOrganCollectionDto=new ArrayList<OrganCollectionDto>();
		try {
			
			OrganDonorCheckupListDto obj=new OrganDonorCheckupListDto();
			Criteria criteria = sessionFactory.openSession()
					.createCriteria(OrganDonorCheckupListDto.class);
			criteria.add(Restrictions.eq("checkupListId", checkupListId));
			criteria.add(Restrictions.eq("deleted", "N"));
			obj = (OrganDonorCheckupListDto) criteria
					.uniqueResult();
			
			Criteria criteria1 = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
			criteria1.add(Restrictions.eq("deleted", "N"));
			criteria1.add(Restrictions.eq("donorCheckupList", obj));
			criteria1.add(Restrictions.eq("isOrganCollected", "Y"));
			listOrganCollectionDto = criteria1.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOrganCollectionDto;
	}

	@Override
	public int saveOrganReaction(OrganReactionDto obj, Integer organCollectionId, Integer organDonorId,
			Integer treatmentId, Integer checkupListId, HttpServletRequest request) {
		

		// TODO Auto-generated method stub
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			if (obj.getOrganReactionId() == 0) {
				obj.setCreatedBy(userId);
				obj.setUnitId(unitId);
				
				//organCollectionDto
				OrganCollectionDto organCollectionDto = (OrganCollectionDto) sessionFactory.getCurrentSession()
							.get(OrganCollectionDto.class, organCollectionId);
				obj.setOrganCollectionDto(organCollectionDto);
				
				if(organCollectionDto.getIsOrganCollected().equalsIgnoreCase("Y")) {
					organCollectionDto.setIsOrganCollected("N");
					sessionFactory.getCurrentSession().merge(organCollectionDto);
				}
				
				//organDonationRegistrationDto
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(OrganDonationRegistrationDto.class, organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				//organCheckuplistDto
				OrganDonorCheckupListDto organDonorCheckupListDto = (OrganDonorCheckupListDto) sessionFactory
						.getCurrentSession().get(OrganDonorCheckupListDto.class, checkupListId);
				obj.setOrganDonorCheckupListDto(organDonorCheckupListDto);
				
				if(organDonorCheckupListDto.getIsOrganCollected().equalsIgnoreCase("N")) {
					organDonorCheckupListDto.setIsOrganCollected("Y");
					sessionFactory.getCurrentSession().merge(organDonorCheckupListDto);
				}
				
				//organDonorTreatmentDto
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(OrganDonorTreatmentDto.class, treatmentId);
				obj.setOrganDonorTreatmentDto(organDonorTreatmentDto);
				
				if(organDonorTreatmentDto.getIsTreatmentClosed().equalsIgnoreCase("N")) {
					organDonorTreatmentDto.setIsTreatmentClosed("Y");
					sessionFactory.getCurrentSession().merge(organDonorTreatmentDto);	
				}
				
				sessionFactory.getCurrentSession().merge(obj);
				 

				 
				 String hql="update OrganCollectionDto set isContainerStatus=2 where id=:Id "; 
				 Query query1 = sessionFactory.getCurrentSession().createQuery(hql); 
				 query1.setParameter("Id", obj.getOrganCollectionDto().getOrganCollectionId() );
				 query1.executeUpdate();
				return 1;
				

				
			} else {
				obj.setUpdatedBy(userId);
				obj.setUnitId(unitId);
				
				//organCollectionDto
				OrganCollectionDto organCollectionDto = (OrganCollectionDto) sessionFactory.getCurrentSession()
							.get(OrganCollectionDto.class, organCollectionId);
				obj.setOrganCollectionDto(organCollectionDto);
				
				if(organCollectionDto.getIsOrganCollected().equalsIgnoreCase("Y")) {
					organCollectionDto.setIsOrganCollected("N");
					sessionFactory.getCurrentSession().merge(organCollectionDto);
				}
				
				//organDonationRegistrationDto
				OrganDonationRegistrationDto organDonationRegistrationDto = (OrganDonationRegistrationDto) sessionFactory
						.getCurrentSession().get(OrganDonationRegistrationDto.class, organDonorId);
				obj.setOrganDonationRegistrationDto(organDonationRegistrationDto);
				
				//organCheckuplistDto
				OrganDonorCheckupListDto organDonorCheckupListDto = (OrganDonorCheckupListDto) sessionFactory
						.getCurrentSession().get(OrganDonorCheckupListDto.class, checkupListId);
				obj.setOrganDonorCheckupListDto(organDonorCheckupListDto);
				
				if(organDonorCheckupListDto.getIsOrganCollected().equalsIgnoreCase("N")) {
					organDonorCheckupListDto.setIsOrganCollected("Y");
					sessionFactory.getCurrentSession().merge(organDonorCheckupListDto);
				}
				
				//organDonorTreatmentDto
				OrganDonorTreatmentDto organDonorTreatmentDto = (OrganDonorTreatmentDto) sessionFactory
						.getCurrentSession().get(OrganDonorTreatmentDto.class, treatmentId);
				obj.setOrganDonorTreatmentDto(organDonorTreatmentDto);
				
				if(organDonorTreatmentDto.getIsTreatmentClosed().equalsIgnoreCase("N")) {
					organDonorTreatmentDto.setIsTreatmentClosed("Y");
					sessionFactory.getCurrentSession().merge(organDonorTreatmentDto);	
				}
				
				sessionFactory.getCurrentSession().merge(obj);
				
				 //Added By Annapurna
				 
				 String hql="update OrganCollectionDto set isContainerStatus=2 where id=:Id "; 
				 Query query1 = sessionFactory.getCurrentSession().createQuery(hql); 
				 query1.setParameter("Id", obj.getOrganCollectionDto().getOrganCollectionId() );
				 query1.executeUpdate();
				return 2;
			}
			

		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<OrganReactionDto> getAllOrganReactions(HttpServletRequest request,String fromDate, String  lastDate) {

		List<OrganReactionDto> listOrganReactionDto = new ArrayList<OrganReactionDto>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			/*
			 * Criteria criteria =
			 * sessionFactory.openSession().createCriteria(OrganReactionDto.class);
			 * criteria.add(Restrictions.eq("deleted", "N"));
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.addOrder(Order.desc("organReactionId")); criteria.setMaxResults(15);
			 */
			
			Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_reaction_details(:unitId,:fromDate,:lastDate)");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganReactionDto.class));
			specialitySp.setParameter("unitId", unitId);
			specialitySp.setParameter("fromDate", fromDate);
			specialitySp.setParameter("lastDate", lastDate);
			
			listOrganReactionDto = specialitySp.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOrganReactionDto;
	}

	@Override
	public OrganReactionDto editDonorReactions(Integer organReactionId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		OrganReactionDto organReactionDto = new OrganReactionDto();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganReactionDto.class);
			criteria.add(Restrictions.eq("organReactionId", organReactionId));
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));
			organReactionDto = (OrganReactionDto) criteria.uniqueResult();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return organReactionDto;
	}
//Added By Annapurna
	@Override
	public List<OrganCollectionDto> getContainerListNew(HttpServletRequest request) {
		
		List<OrganCollectionDto> listOrganCollectionDto=new ArrayList<OrganCollectionDto>();
		try {
			
			Criteria criteria1 = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
			criteria1.add(Restrictions.eq("deleted", "N"));
			//criteria1.add(Restrictions.eq("isOrganCollected", "Y"));
			
			listOrganCollectionDto = criteria1.list();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOrganCollectionDto;
	}
	//Added By Annapurna
	@SuppressWarnings("unchecked")
	@Override
	public List<OrganReactionDto> organReactionAutoSuggestion(HttpServletRequest request,Integer organReactionId, String callFrom) {


		List<OrganReactionDto> listOrganReactionDto = new ArrayList<OrganReactionDto>();
		try {
			if (callFrom.equalsIgnoreCase("1")) {
			  HttpSession session = request.getSession(); int unitId = (int)
			  session.getAttribute("uId"); Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_reaction_details_serachbyid(:unitId,:organReactionId)"); 
			  specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganReactionDto.class));
			  specialitySp.setParameter("unitId", unitId);
			 specialitySp.setParameter("organReactionId", organReactionId);
			 listOrganReactionDto = specialitySp.list();

			}
			else if(callFrom.equalsIgnoreCase("2")) {
				 HttpSession session = request.getSession(); int unitId = (int)
						  session.getAttribute("uId"); Query specialitySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_fetch_organ_reaction_detailsbyReactionId(:unitId,:organReactionId)"); 
						  specialitySp.setResultTransformer(new AliasToBeanResultTransformer(OrganReactionDto.class));
						  specialitySp.setParameter("unitId", unitId);
						 specialitySp.setParameter("organReactionId", organReactionId);
						 listOrganReactionDto = specialitySp.list();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOrganReactionDto;
	
	}
	//Added By Annapurna
	@Override
	public OrganReactionDto getOrganReactionById(Integer organReactionId) {
		
		OrganReactionDto dto = new OrganReactionDto();
		try {
			
			Criteria criteria = sessionFactory.openSession().createCriteria(OrganReactionDto.class);
			criteria.add(Restrictions.eq("organReactionId", organReactionId));
			criteria.add(Restrictions.eq("deleted", "N"));	
			dto = (OrganReactionDto) criteria.uniqueResult();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	//Added By Annapurna
		@Override
		public List<OrganCollectionDto> getContainerListfororgan_reaction(HttpServletRequest request) {
			
			List<OrganCollectionDto> listOrganCollectionDto=new ArrayList<OrganCollectionDto>();
			try {
				
				Criteria criteria1 = sessionFactory.openSession().createCriteria(OrganCollectionDto.class);
				criteria1.add(Restrictions.eq("deleted", "N"));
				criteria1.add(Restrictions.eq("isContainerStatus", 1));
			
				listOrganCollectionDto = criteria1.list();
				
			} catch (Exception e) {
				e.printStackTrace();
			}
			return listOrganCollectionDto;
		}

}
