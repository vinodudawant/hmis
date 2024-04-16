package com.hms.bloodbank.dao.impl;

import java.math.BigInteger;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.DonorDao;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.DonorTreatment;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.doctordesk.dto.DdHistoryDto;
import com.hms.organdonation.dto.OrganDonationRegistrationDto;
import com.hms.organdonation.dto.OrganDonorTreatmentDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.PurchaseHistory;

import net.sf.jasperreports.engine.xml.JRPenFactory.Left;

@Repository
@Transactional
public class DonorDaoImpl implements DonorDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveDonor(DonorMaster donor, HttpServletRequest request) {
		try {
			if (donor.getDonorId() == 0) {
				sessionFactory.getCurrentSession().merge(donor);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(donor);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<DonorMaster> searchDonorByName(String name, String callfrom, Integer unitId) {
		try {
			String sql = "";
			List<DonorMaster> donorList = new ArrayList<DonorMaster>();
			if (callfrom.equals("reg")) {

				sql = "select donor_id,first_name,last_name,contact_no1 from bb_donor_master where (donor_id like '"
						+ name + "%' or first_name like '" + name + "%' or " + " middle_name like '" + name
						+ "%' or last_name like '" + name + "%' or contact_no1 like '" + name
						+ "%' or contact_no2 like '" + name + "%') and status='Y' and treatmentFlag='N' and unit_id ='"
						+ unitId + "'";
			} else if (callfrom.equals("checkup")) {
				//Add Status n join chheckuplist table 
				sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1,treat.donor_treatment_id from bb_donor_master master join bb_donor_treatment treat on master.donor_id = treat.donor_id  JOIN  bb_donor_checkup_list c ON treat.donor_treatment_id = c.donor_treatment_id where (master.donor_id like '"
						+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
						+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
						+ "%' or master.contact_no2 like '" + name
						+ "%') and master.status='Y' and treat.checkupStatus='Y' and c.status = 'Y' and master.unit_id ='" + unitId + "'";
			} else if (callfrom.equals("reaction")) {
				sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1, treat.donor_treatment_id from bb_donor_master master join bb_donor_treatment treat on master.donor_id = treat.donor_id  where (master.donor_id like '"
						+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
						+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
						+ "%' or master.contact_no2 like '" + name
						+ "%') and master.status='Y' and treat.collectionStatus='Y' and master.unit_id ='" + unitId
						+ "'";
			} 
			//Added
			 else if (callfrom.equals("bloodReaction")) {
					sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1, treat.donor_treatment_id from bb_donor_master master join bb_donor_treatment treat on master.donor_id = treat.donor_id  JOIN bb_donor_blood_bag_details bg ON treat.donor_treatment_id = bg.donor_treatment_id  where (master.donor_id like '"
							+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
							+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
							+ "%' or master.contact_no2 like '" + name
							+ "%') and master.status='Y' and treat.collectionStatus='Y'and reactionStatus='Y' and master.unit_id ='" + unitId
							+ "'";
				} 

			//Added 
			else if (callfrom.equals("bloodTesting")) {
				sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1, treat.donor_treatment_id FROM bb_donor_master master JOIN bb_donor_treatment treat ON master.donor_id = treat.donor_id JOIN bb_blood_group_testing b ON treat.donor_treatment_id = b.donor_treatment_id JOIN bb_donor_blood_bag_details bg ON treat.donor_treatment_id = bg.donor_treatment_id" + 
						" where (master.donor_id like '"
						+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
						+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
						+ "%' or master.contact_no2 like '" + name
						+ "%')  AND master.status = 'Y'AND bg.reactionStatus = 'Y'AND b.status = 'Y' and master.unit_id ='" + unitId
						+ "'";
			} 
			
			//Added 
			else if (callfrom.equals("testRegister")) {
				sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1, treat.donor_treatment_id from bb_donor_master master join bb_donor_treatment treat on master.donor_id = treat.donor_id  JOIN bb_test_register test ON treat.donor_treatment_id = test.donor_treatment_id JOIN bb_blood_sample_dispatch s ON test.donor_treatment_id= s.blood_sample_dispatch_id" + 
						" where (master.donor_id like '"
						+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
						+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
						+ "%' or master.contact_no2 like '" + name
						+ "%') and master.status='Y'   AND s.testStatus = 'Y' AND test.status = 'Y' and master.unit_id ='" + unitId
						+ "'";
			} 
			//Added 
			else if (callfrom.equals("componentSepration")) {
				sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1, treat.donor_treatment_id from bb_donor_master master join bb_donor_treatment treat on master.donor_id = treat.donor_id  JOIN bb_test_register test ON master.donor_id = test.donor_treatment_id JOIN bb_blood_sample_dispatch s ON master.donor_id = s.blood_sample_dispatch_id   JOIN bb_component_seperation c ON master.donor_id = c.id"  + 
						" where (master.donor_id like '"
						+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
						+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
						+ "%' or master.contact_no2 like '" + name
						+ "%') and master.status='Y'   AND s.testStatus = 'Y' AND c.status = 'Y' and master.unit_id ='" + unitId
						+ "'";
			} 


			else {
				sql = "select master.donor_id,master.first_name,master.last_name,master.contact_no1,treat.donor_treatment_id from bb_donor_master master join bb_donor_treatment treat on master.donor_id = treat.donor_id where (master.donor_id like '"
						+ name + "%' or master.first_name like '" + name + "%' or " + " master.middle_name like '"
						+ name + "%' or master.last_name like '" + name + "%' or master.contact_no1 like '" + name
						+ "%' or master.contact_no2 like '" + name + "%') and master.status='Y' and  master.unit_id ='"
						+ unitId + "'";
			}
			Session currentSession = sessionFactory.getCurrentSession();
			SQLQuery getMaster = currentSession.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				DonorMaster obj = new DonorMaster();
				obj.setDonorId((Integer) row.get("donor_id"));
				obj.setTitle((String) row.get("title"));
				obj.setDonorFname((String) row.get("first_name"));
				obj.setDonorLname((String) row.get("last_name"));
				obj.setContactNumber1((String) row.get("contact_no1"));
				if (!callfrom.equals("reg")) {
					obj.setMaxDonorTreatmentId((Integer) row.get("donor_treatment_id"));
				}
				donorList.add(obj);
				obj = null;
			}
			return donorList;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public DonorMaster getDonorById(Integer id, HttpServletRequest request) {
		try {
			DonorMaster donor = new DonorMaster();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorMaster.class);
			criteria.add(Restrictions.eq("donorId", id));
			criteria.add(Restrictions.eq("status", "Y"));
			donor = (DonorMaster) criteria.uniqueResult();

			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(DonorTreatment.class);
			criteriaMax.add(Restrictions.eq("donorMaster.donorId", id));
			criteriaMax.setProjection(Projections.max("donorTreatmentId"));
			Integer donorTreatmentId = (Integer) criteriaMax.uniqueResult();
			// System.out.println(donorTreatmentId);
			// String sql="SELECT MAX(donor_treatment_id) as id FROM
			// rbmh02_refund.bb_donor_treatment where donor_id="+id+"";
			// SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			donor.setMaxDonorTreatmentId(donorTreatmentId);
			return donor;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public int saveDonorTreatment(DonorTreatment donor, HttpServletRequest request) {
		try {
			DonorMaster donorMaster = (DonorMaster) sessionFactory.getCurrentSession().get(DonorMaster.class,
					donor.getDonorId());
			donor.setDonorMaster(donorMaster);
			Query query = sessionFactory.getCurrentSession().createQuery(
					"update DonorMaster set treatmentFlag='Y' where donorId= '" + donor.getDonorId() + "'");
			int result = query.executeUpdate();
			System.out.println("result-----" + result);
			if (donor.getDonorTreatmentId() == 0) {

				// donor.setCheckupStatus("Y");
				sessionFactory.getCurrentSession().merge(donor);
				return 1;
			} else {
				// donor.setCheckupStatus("Y");
				sessionFactory.getCurrentSession().merge(donor);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public DonorCheckupList getCheckUpByTreatmentId(Integer id, HttpServletRequest request) {
		try {
			DonorCheckupList donor = new DonorCheckupList();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorCheckupList.class);
			criteria.add(Restrictions.eq("donorTreatment.donorTreatmentId", id));
			criteria.add(Restrictions.eq("status", "Y"));
			donor = (DonorCheckupList) criteria.uniqueResult();
			return donor;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int saveDonorReaction(DonorReaction donor, HttpServletRequest request) {
		try {

			Query query = sessionFactory.getCurrentSession().createQuery(
					"update DonorBloodBagDetails set reactionStatus='Y' where donorTreatment.donorTreatmentId= '"
							+ donor.getDonorTreatmentId() + "'");
			int result = query.executeUpdate();
			if (donor.getDonorReactionId() == 0) {
				SQLQuery sql = sessionFactory.getCurrentSession()
						.createSQLQuery("Select count(*) from bb_donor_reaction where donor_treatment_id ='"
								+ donor.getDonorTreatmentId() + "'");
				BigInteger count = (BigInteger) sql.uniqueResult();
				int count1 = count.intValue();
				if (count1 == 0) {
					sessionFactory.getCurrentSession().merge(donor);
					return 1;
				} else {
					return 3;
				}

			} else {
				sessionFactory.getCurrentSession().merge(donor);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<DonorSampleDispatch> getBloodBagIdBySectionId(Integer id, HttpServletRequest request) {
		try {
			List<DonorSampleDispatch> donor = new ArrayList<DonorSampleDispatch>();
			String sql = "";
			if (id != 0 && id != 3) {
				sql = "SELECT * FROM bb_blood_sample_dispatch WHERE status='Y' AND sample_item_name=" + id
						+ " AND ackRemarks = 'Y' AND testStatus='N'  GROUP BY sample_blood_bag_id";
			} else if (id == 0) {
				sql = "SELECT * FROM bb_blood_sample_dispatch WHERE status='Y' AND sample_item_name='3' AND testStatus='N' GROUP BY sample_blood_bag_id ";
			}

			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();

			for (Map<String, Object> row : list) {
				DonorSampleDispatch sampleDispatch = new DonorSampleDispatch();
				sampleDispatch.setSampleBloodBagNumber((String) row.get("sample_blood_bag_Number"));
				sampleDispatch.setSampleBloodBagId((Integer) row.get("sample_blood_bag_id"));
				donor.add(sampleDispatch);
				sampleDispatch = null;
			}
			return donor;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public DonorMaster getDonorByBloodBagId(Integer bloodBagId, HttpServletRequest request) {
		try {
			DonorMaster obj = new DonorMaster();
			String sql = "SELECT d.donor_id,d.first_name,d.middle_name,d.last_name,d.title,bm.blood_group_name , b.bloodbag_details_id,(SELECT Max(donor_treatment_id) FROM bb_donor_treatment WHERE donor_id = d.donor_id) as maxId "
					+ "FROM bb_donor_blood_bag_details b "
					+ "LEFT JOIN bb_donor_master d ON d.donor_id = (SELECT donor_id FROM bb_donor_treatment WHERE donor_treatment_id = b.donor_treatment_id) join bb_blood_group_master bm on b.blood_group = bm.idblood_group "
					+ "WHERE bloodbag_details_id = " + bloodBagId + "";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				obj.setTitle((String) row.get("title"));
				obj.setDonorMname((String) row.get("middle_name"));
				obj.setDonorFname((String) row.get("first_name"));
				obj.setDonorLname((String) row.get("last_name"));
				obj.setDonorId((Integer) row.get("donor_id"));
				obj.setBloodGroup((String) row.get("blood_group_name"));
				obj.setMaxDonorTreatmentId((Integer) row.get("maxId"));

			}
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int saveTestRegister(TestRegister testRegister, HttpServletRequest request) {
		try {
			Query query1 = sessionFactory.getCurrentSession()
					.createQuery("update DonorSampleDispatch set testStatus='Y' where  sampleItemName ='"
							+ testRegister.getSel_component_seperation() + "' AND sampleTreatmentId= '"
							+ testRegister.getDonorTreatmentId() + "'");
			int result = query1.executeUpdate();

			if (testRegister.getTestRegisterId() == 0) {
				sessionFactory.getCurrentSession().merge(testRegister);
				return 1;
			} else {
				sessionFactory.getCurrentSession().merge(testRegister);
				return 2;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

	}

	@Override
	public DonorBloodBagDetails getDetailsByBloodBag(Integer bloodBagId, HttpServletRequest request) {
		try {
			DonorBloodBagDetails donor = new DonorBloodBagDetails();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorBloodBagDetails.class);
			criteria.add(Restrictions.eq("bloodBagDetailsId", bloodBagId));
			donor = (DonorBloodBagDetails) criteria.uniqueResult();
			return donor;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public int saveComponentSeperation(String componentSeperation, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			System.out.println("list" + componentSeperation);

			ComponentSeperation componentSeperationDto = (ComponentSeperation) ConfigUIJSONUtility
					.getObjectFromJSON(componentSeperation, ComponentSeperation.class);

			for (int i = 0; i < componentSeperationDto.getLstComponentseperation().size(); i++) {
				ComponentSeperation mainObj = new ComponentSeperation();
				mainObj = componentSeperationDto.getLstComponentseperation().get(i);
				mainObj.setCreatedBy(userId);
				mainObj.setUpdatedBy(userId);
				mainObj.setUnitId(unitId);
				mainObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				mainObj.setBloodBagStatus(1);
				Query query1 = sessionFactory.getCurrentSession().createQuery(
						"update DonorSampleDispatch set testStatus='Y' where  sampleItemName ='3' AND sampleTreatmentId= '"
								+ mainObj.getDonorTreatmentId() + "'");
				int result = query1.executeUpdate();
				if (mainObj.getComponentSeperationId() == null) {
					Integer compID = mainObj.getComponentSeperationId();
					compID = 0;
					if (compID == 0) {

						sessionFactory.getCurrentSession().merge(mainObj);
					}
				} else {

					sessionFactory.getCurrentSession().merge(mainObj);
					return 2;
				}

			}
			return 1;
			/*
			 * if(componentSeperation.getComponentSeperationId() == 0) {
			 * sessionFactory.getCurrentSession().merge(componentSeperation); return 1; }
			 * else { sessionFactory.getCurrentSession().merge(componentSeperation);
			 * 
			 * }
			 */
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public List<ComponentSeperation> getBloodBagsInComponent() {
		try {
			List<ComponentSeperation> list1 = new ArrayList<ComponentSeperation>();
			String sql = "SELECT DISTINCT c.blood_bag_no,c.blood_bag_status,b.blood_bag_details "
					+ "FROM bb_component_seperation c LEFT JOIN bb_donor_blood_bag_details b ON c.blood_bag_no=b.bloodbag_details_id WHERE c.blood_bag_status=1 ";
			// + "WHERE c.blood_bag_status=1";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				ComponentSeperation obj = new ComponentSeperation();
				// obj.setComponentSeperationId((Integer)row.get("id"));
				obj.setBloodBagNumber((Integer) row.get("blood_bag_no"));
				obj.setBloodBagStatus((Integer) row.get("blood_bag_status"));
				obj.setBagDetails((String) row.get("blood_bag_details"));
				list1.add(obj);
				obj = null;
			}
			return list1;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<ComponentSeperation> getBloodBagsInStocks() {
		try {
			List<ComponentSeperation> list1 = new ArrayList<ComponentSeperation>();
			/*
			 * String
			 * sql="SELECT DISTINCT c.blood_bag_no,c.blood_bag_status,b.blood_bag_details "
			 * +
			 * "FROM bb_component_seperation c LEFT JOIN bb_donor_blood_bag_details b ON c.blood_bag_no=b.bloodbag_details_id "
			 * + "WHERE c.blood_bag_status=2";
			 */
			// Added By Annapurna fetching bags
			String sql = " SELECT DISTINCT c.blood_bag_no, c.blood_bag_status, b.blood_bag_details FROM bb_component_seperation c LEFT JOIN bb_donor_blood_bag_details b ON c.blood_bag_no = b.bloodbag_details_id LEFT JOIN bb_stock_register s ON  c.blood_bag_no=s.bag_id WHERE c.blood_bag_status =2 OR discarddeleted='Y'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				ComponentSeperation obj = new ComponentSeperation();
				// obj.setComponentSeperationId((Integer)row.get("id"));
				obj.setBloodBagNumber((Integer) row.get("blood_bag_no"));
				obj.setBloodBagStatus((Integer) row.get("blood_bag_status"));
				obj.setBagDetails((String) row.get("blood_bag_details"));
				list1.add(obj);
				obj = null;
			}
			return list1;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ComponentSeperation> getComponentByBloodBagId(Integer bloodBagId, String callfrom,
			HttpServletRequest request) {
		try {
			List<ComponentSeperation> c = new ArrayList<ComponentSeperation>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ComponentSeperation.class);
			criteria.add(Restrictions.eq("bloodBagNumber", bloodBagId));
			if (callfrom.equals("stock")) {
				criteria.add(Restrictions.eq("bloodBagStatus", 1));
				criteria.add(Restrictions.eq("status", "Y"));
				c = criteria.list();
			} else if (callfrom.equals("discard")) {
				// criteria.add(Restrictions.eq("bloodBagStatus", 2));
				/*
				 * String
				 * sql="select c.component_name,c.volume,c.expiry_date,c.blood_bag_status,s.inward_date,c.id from bb_component_seperation c join\r\n"
				 * + "bb_stock_register s on c.id = s.stock_id Where c.blood_bag_status='2'";
				 */
				// Added By Annapurna
				String sql = "select c.component_name,c.volume,c.expiry_date,c.blood_bag_status,s.inward_date,c.id , s.stock_id,c.blood_bag_no from bb_component_seperation c   Left JOIN bb_stock_register s on c.blood_bag_no = s.bag_id Where c.blood_bag_status>='2'   AND  c.component_name=+s.component_sep_id and c.blood_bag_no="
						+ bloodBagId;
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
					ComponentSeperation obj = new ComponentSeperation();
					if (rs[0] != null)
						if (rs[0] != null)
							obj.setComponentName(rs[0].toString());
					if (rs[1] != null)
						obj.setVolume(rs[1].toString());
					if (rs[2] != null)
						obj.setExpiryDate(rs[2].toString());
					if (rs[3] != null)
						obj.setBloodBagStatus(Integer.parseInt(rs[3].toString()));
					if (rs[4] != null)
						obj.setInwardDate(rs[4].toString());
					if (rs[5] != null)
						obj.setComponentSeperationId(Integer.parseInt(rs[5].toString()));
					if (rs[6] != null)
						obj.setStockId(Integer.parseInt(rs[6].toString()));
					if (rs[7] != null)
						obj.setBloodBagNumber(Integer.parseInt(rs[7].toString()));

					c.add(obj);

				}
			}

			// c=(ComponentSeperation) criteria.uniqueResult();

			return c;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	@Override
	public int saveStock(String componentSeperation, HttpServletRequest request) {
		try {

			System.out.println("list" + componentSeperation);
			StockRegister componentSeperationDto = (StockRegister) ConfigUIJSONUtility
					.getObjectFromJSON(componentSeperation, StockRegister.class);
			// ComponentSeperation component = (ComponentSeperation)
			// sessionFactory.getCurrentSession().get(ComponentSeperation.class,componentSeperation.getComponentSeperationId());
			for (int i = 0; i < componentSeperationDto.getLstStockRegister().size(); i++) {

				StockRegister mainObj = new StockRegister();
				mainObj = componentSeperationDto.getLstStockRegister().get(i);
				Integer Id = mainObj.getBagId();
				Integer stockId = mainObj.getStockId();
				System.out.println("Id==>>" + Id);
				mainObj.setInwardDate(mainObj.getInwardDate());
				mainObj.setStock_remark(mainObj.getStock_remark());
				mainObj.setCompReamrk(mainObj.getCompReamrk());
				mainObj.setStockDate(new Date(new java.util.Date().getTime()));
				mainObj.setBagId(mainObj.getBagId());
				mainObj.setCompSepId(mainObj.getCompSepId());
				mainObj.setDonorTreatmentId(mainObj.getDonorTreatmentId());
				mainObj.setDateOfBagCollection(mainObj.getDateOfBagCollection());

				String hql = "Update ComponentSeperation set bloodBagStatus='2' where bloodBagNumber= :Id";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.setParameter("Id", Id);
				query.executeUpdate();
				if (mainObj.getStockId() == null) {
					stockId = 0;
					if (stockId == 0) {

						sessionFactory.getCurrentSession().merge(mainObj);
					}
				} else {
					sessionFactory.getCurrentSession().merge(mainObj);
					return 2;
				}

			}
			
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/*
	 * @Override public int discardStock(String listDiscardStockObj,
	 * HttpServletRequest request) { try { ComponentSeperation component =
	 * (ComponentSeperation)
	 * sessionFactory.getCurrentSession().get(ComponentSeperation.class,c.
	 * getComponentSeperationId());
	 * component.setDateOfStockDiscard(c.getDateOfStockDiscard());
	 * component.setPlasmaDiscardDate(c.getPlasmaDiscardDate());
	 * component.setFfpDiscardDate(c.getFfpDiscardDate());
	 * component.setRcellDiscardDate(c.getRcellDiscardDate());
	 * component.setPlasmaDiscardReason(c.getPlasmaDiscardReason());
	 * component.setFfpDiscardReason(c.getFfpDiscardReason());
	 * component.setRcellDiscardReason(c.getRcellDiscardReason());
	 * component.setPlasmaAuthorizedBy(c.getPlasmaAuthorizedBy());
	 * component.setFfpAuthorizedBy(c.getFfpAuthorizedBy());
	 * component.setRcellAuthorizedBy(c.getRcellAuthorizedBy());
	 * component.setDiscardRemark(c.getDiscardRemark());
	 * component.setBloodBagStatus(3);//discard status
	 * 
	 * sessionFactory.getCurrentSession().merge(component); StockRegister stockDto =
	 * (StockRegister)ConfigUIJSONUtility.getObjectFromJSON(listDiscardStockObj,
	 * StockRegister.class); for(int i=0; i<stockDto.getLstStockRegister().size();
	 * i++) { StockRegister obj = new StockRegister();
	 * obj=stockDto.getLstStockRegister().get(i); HttpSession session =
	 * request.getSession(); Integer userId = (Integer)
	 * session.getAttribute("userId1"); Integer unitId = (Integer)
	 * session.getAttribute("uId");
	 * 
	 * String
	 * hql="update StockRegister set  discardReason= '"+obj.getDiscardReason()
	 * +"',discardRemark= '"+obj.getDiscardRemark()+"', discardDate= '"+obj.
	 * getDiscardDate()+"', discardby= '"+obj.getDiscardby()
	 * +"' , discardStatus='1',deletedBy= '"+userId+"' where stockId= '"+obj.
	 * getStockId()+"'"; Query query =
	 * sessionFactory.getCurrentSession().createQuery(hql); Query query =
	 * sessionFactory.getCurrentSession().
	 * createQuery("update bb_stock_register set discardReason="+obj.
	 * getDiscardReason()
	 * +",discardRemark=obj.getDiscardRemark(), discardDate=obj.getDiscardDate(), discardby=obj.getDiscardby(),discardStatus='1', where stockId= +Id"
	 * ); query.setParameter("reason", obj.getDiscardReason());
	 * query.setParameter("remark", obj.getDiscardRemark());
	 * query.setParameter("date", obj.getDiscardDate());
	 * query.setParameter("discardby", obj.getDiscardby());
	 * query.setParameter("useid", userId);
	 * query.setParameter("Id",obj.getStockId()); query.executeUpdate();
	 * 
	 * }
	 * 
	 * 
	 * return 1; }catch(Exception e) { e.printStackTrace(); return 0; } }
	 */

//Added By Annapurna
	@Override
	public int discardStock(String listDiscardStockObj, HttpServletRequest request) {
		try {

			StockRegister stockDto = (StockRegister) ConfigUIJSONUtility.getObjectFromJSON(listDiscardStockObj,
					StockRegister.class);
			for (int i = 0; i < stockDto.getLstStockRegister().size(); i++) {
				StockRegister obj = new StockRegister();
				obj = stockDto.getLstStockRegister().get(i);
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				Integer unitId = (Integer) session.getAttribute("uId");
				String hql = "update StockRegister set  discardReason= '" + obj.getDiscardReason()
						+ "',discardRemark= '" + obj.getDiscardRemark() + "', discardDate= '" + obj.getDiscardDate()
						+ "', discardby= '" + obj.getDiscardby() + "' , discardStatus='1',deletedBy= '" + userId
						+ "' where stockId= '" + obj.getStockId() + "'";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.executeUpdate();

				String hqlStatus = "Update ComponentSeperation set bloodBagStatus='3' where bloodBagNumber= :Id";
				Query query1 = sessionFactory.getCurrentSession().createQuery(hqlStatus);
				query1.setParameter("Id", obj.getBagId());
				query1.executeUpdate();

				String hqlStatus1 = "Update StockRegister set discarddeleted='N' where bagId= :Id";
				Query query2 = sessionFactory.getCurrentSession().createQuery(hqlStatus1);
				query2.setParameter("Id", obj.getBagId());
				query2.executeUpdate();

			}

			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public DonorBloodBagDetails getbagDetailsByTreatmentId(int id, HttpServletRequest request) {
		try {
			DonorBloodBagDetails donor = new DonorBloodBagDetails();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DonorBloodBagDetails.class);
			criteria.add(Restrictions.eq("donorTreatment.donorTreatmentId", id));
			criteria.add(Restrictions.eq("status", "Y"));
			donor = (DonorBloodBagDetails) criteria.uniqueResult();
			return donor;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<TestRegister> getTestRegsiterDetails(Integer bloodBagId, HttpServletRequest request) {

		try {
			List<TestRegister> list1 = new ArrayList<TestRegister>();
			String sql = "select slave.test_result,slave.remark,slave.date_time,slave.test_name from bb_test_register_slave slave join  bb_test_register master on slave.test_master_id = master.test_register_id where master.blood_bag_no='"
					+ bloodBagId + "'  and master.status='Y'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				TestRegister obj = new TestRegister();
				obj.setTest_result((String) row.get("test_result"));
				obj.setTestremark((String) row.get("remark"));
				obj.setDate_time((String) row.get("date_time"));
				obj.setTest_name((String) row.get("test_name"));
				list1.add(obj);
				obj = null;
			}
			return list1;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DonorMaster> getBloodDonorDetailsList(Integer unitId, HttpServletRequest request) {
		List<DonorMaster> lstBloodDonorTreatmentDto = new ArrayList<DonorMaster>();
		try {

			Session session = sessionFactory.openSession();
			Criteria criteria = session.createCriteria(DonorMaster.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("treatmentFlag", "N"));
			criteria.add(Restrictions.eq("unitId", unitId));

			lstBloodDonorTreatmentDto = criteria.list();
			session.flush();
			session.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstBloodDonorTreatmentDto;
	}

	@Override
	public DonorMaster editBloodDonor(Integer donorId, Integer unitId, HttpServletRequest request) {
		DonorMaster dto = new DonorMaster();
		try {
			Criteria criteria = sessionFactory.openSession().createCriteria(DonorMaster.class);
			criteria.add(Restrictions.eq("donorId", donorId));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.eq("unitId", unitId));

			dto = (DonorMaster) criteria.uniqueResult();
			return dto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public boolean deleteBloodDonor(Integer donorId, Integer unitId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			DonorMaster obj = (DonorMaster) sessionFactory.getCurrentSession().get(DonorMaster.class, donorId);

			obj.setStatus("N");
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
	public List<DonorTreatment> getAllBloodDonorsTreatmentList(Integer unitId, HttpServletRequest request) {
		List<DonorTreatment> lstDonorTreatmentDto = new ArrayList<DonorTreatment>();
		try {

			Criteria criteria = sessionFactory.openSession().createCriteria(DonorTreatment.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.addOrder(Order.desc("donorTreatmentId"));
			criteria.add(Restrictions.eq("unitId", unitId));
			lstDonorTreatmentDto = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstDonorTreatmentDto;
	}

	@Override
	public DonorTreatment editBloodDonorTreatment(Integer donorId, Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		DonorTreatment dto = new DonorTreatment();
		try {
			Criteria criteria = sessionFactory.openSession().createCriteria(DonorTreatment.class);
			criteria.add(Restrictions.eq("donorMaster.donorId", donorId));
			criteria.add(Restrictions.eq("unitId", unitId));
			criteria.add(Restrictions.eq("status", "Y"));
			dto = (DonorTreatment) criteria.uniqueResult();
			return dto;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public DonorMaster getBloodDonorTreatmentDetailsById(Integer donorId, String callform, HttpServletRequest request) {
		try {
			String sql = "";
			DonorMaster obj = new DonorMaster();
			if (callform.equals("bloodBagCollection")) {
				sql = "select d.donor_id,d.title,  d.Patient_title_name,d.first_name,d.middle_name,d.last_name,d.contact_no1,t.donor_treatment_id from bb_donor_master d join bb_donor_treatment t on d.donor_id =t.donor_id  where t.donor_id='"
						+ donorId + "' and t.checkupStatus='Y' and d.treatmentFlag='Y' ";
			} else {
				sql = "select d.donor_id,d.title,  d.Patient_title_name,d.first_name,d.middle_name,d.last_name,d.contact_no1,t.donor_treatment_id,t.checkupStatus from bb_donor_master d join bb_donor_treatment t on d.donor_id =t.donor_id  where t.donor_id='"
						+ donorId + "' and d.treatmentFlag='Y' ";
			}
			Session currentSession = sessionFactory.getCurrentSession();
			SQLQuery getMaster = currentSession.createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> masterRow = getMaster.list();
			for (Map<String, Object> row : masterRow) {

				// DonorMaster obj = new DonorMaster();
				obj.setDonorId((Integer) row.get("donor_id"));
				obj.setTitle((String) row.get("title"));
				obj.setPatient_title_name((String) row.get("Patient_title_name"));
				obj.setDonorFname((String) row.get("first_name"));
				obj.setDonorMname((String) row.get("middle_name"));
				obj.setDonorLname((String) row.get("last_name"));
				obj.setContactNumber1((String) row.get("contact_no1"));
				obj.setMaxDonorTreatmentId((Integer) row.get("donor_treatment_id"));
				obj.setStatus((String) row.get("checkupStatus"));
				// donorList.add(obj);

				// obj = null;
			}
			// return donorList;
			return obj;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public boolean deleteBloodDonorTreatment(Integer donorTreatmentId, Integer UnitId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			DonorTreatment obj = (DonorTreatment) sessionFactory.getCurrentSession().get(DonorTreatment.class,
					donorTreatmentId);

			obj.setStatus("N");
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
	public List<DonorCheckupList> getAllBloodDonorCheckupList(Integer unitId, HttpServletRequest request) {
		List<DonorCheckupList> lstDonorCheckupDto = new ArrayList<DonorCheckupList>();
		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT c.donor_checkup_id as donorCheckupId,c.donor_treatment_id as donorTreatmentId, c.created_datetime as createdDate,doc.doc_name as doc_name,CONCAT(d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,t.collectionStatus as collectionStatus FROM bb_donor_checkup_list c JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id join doctor doc on c.donor_check_up_done_by=doc.Doctor_ID WHERE c.status = 'Y' and t.checkupStatus = 'Y';");
			query.setResultTransformer(Transformers.aliasToBean(DonorCheckupList.class));
			lstDonorCheckupDto = query.list();

			// lstDonorCheckupDto = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstDonorCheckupDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public DonorCheckupList editBloodDonorCheckup(Integer donorId, HttpServletRequest request) {
		DonorCheckupList DonorCheckupDto = new DonorCheckupList();
		try {

			// Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT
			// c.donor_checkup_id as donorCheckupId, c.donor_felling_good as
			// donorFellingGood,c.donor_allergy_record as donorAllergyRecord,
			// c.donor_previous_health_issue as donorPreviousHealthIssue,c.donor_any_habit
			// as donorAnyHabit, c.donor_weight as donorWeight, c.donor_height as
			// donorHeight, c.donor_temprature as donorTemprature, c.donor_blood_pressure as
			// donorBloodPressure,c.donor_pulse as donorPulse , c.donor_hemoglobin as
			// donorHemoglobin, c.donor_checkup_remark as donorCheckupRemark
			// ,c.donor_check_up_done_by as donorCheckUpDoneBy, c.donor_treatment_id as
			// donorTreatmentId, c.created_datetime as createdDate,doc.doc_name as
			// doc_name,d.title,d.first_name as first_name ,d.middle_name as
			// middle_name,d.last_name as last_name ,d.donor_id FROM bb_donor_checkup_list c
			// JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN
			// bb_donor_master d ON t.donor_id = d.donor_id join doctor doc on
			// c.donor_check_up_done_by=doc.Doctor_ID WHERE c.status = 'Y' and
			// c.donor_treatment_id='"+donorId+"';");
			Query query = sessionFactory.getCurrentSession()
					.createSQLQuery("call sp_bb_get_checkup_list_details(:p_unit_id,:p_donor_treatment_id)");
			query.setParameter("p_unit_id", 1);
			query.setParameter("p_donor_treatment_id", donorId);
			query.setResultTransformer(Transformers.aliasToBean(DonorCheckupList.class));
			// query.setParameter("donor_treatment_id", donorId);
			List<DonorCheckupList> lstDonorCheckupDto = query.list();
			DonorCheckupDto.setLstDonorCheckupList(lstDonorCheckupDto);

			// lstDonorCheckupDto = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return DonorCheckupDto;
	}

	@Override
	public boolean deleteBloodDonorCheckup(Integer donorCheckupId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			DonorCheckupList obj = (DonorCheckupList) sessionFactory.getCurrentSession().get(DonorCheckupList.class,
					donorCheckupId);

			obj.setStatus("N");
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
	public DonorCheckupList getCheckuplistDonorTreatmentById(Integer id, HttpServletRequest request) {
		DonorCheckupList lstDonorCheckupDto = new DonorCheckupList();
		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"SELECT c.donor_checkup_id as donorCheckupId,c.donor_treatment_id as donorTreatmentId, c.created_datetime as createdDate,doc.doc_name as doc_name,CONCAT(d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id FROM bb_donor_checkup_list c JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id join doctor doc on c.donor_check_up_done_by=doc.Doctor_ID WHERE c.status = 'Y' and t.checkupStatus = 'Y' and c.donor_treatment_id='"
							+ id + "';");
			query.setResultTransformer(Transformers.aliasToBean(DonorCheckupList.class));
			lstDonorCheckupDto = (DonorCheckupList) query.uniqueResult();

			// lstDonorCheckupDto = null;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return lstDonorCheckupDto;
	}

	@Override
	public List<StockRegister> getAllStockList(Integer unitId) {
		List<StockRegister> listOfStock = new ArrayList<StockRegister>();
		try {
			try {

				SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
				java.util.Date cdate= new java.util.Date();
				 String nowDate = dateFormat.format(cdate );
				
				String sql = "select s.stock_id as stockId, s.component_sep_id as compSepId,s.inward_date as inwardDate,c.volume as volume,c.blood_group as blood_group,c.expiry_date as expiry_date,b.blood_bag_details as blood_bag_details, s.stock_used as stockUsed from bb_stock_register s join "
						+ "bb_component_seperation c on c.blood_bag_no = s.bag_id "
						+ "JOIN bb_donor_blood_bag_details b ON s.bag_id=b.bloodbag_details_id where s.status ='Y'  AND DATE(c.expiry_date) >='"+nowDate+"' group by s.stock_id";
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				
				List<Map<String, Object>> map = query.list();
				
				for(Map<String, Object> rs : map)
				{
					StockRegister obj = new StockRegister();
					obj.setStockId((Integer) rs.get("stockId"));
					
						obj.setCompSepId((String) rs.get("compSepId"));
					
						obj.setInwardDate((String) rs.get("inwardDate"));
					
						obj.setVolume((String) rs.get("volume"));
					
						obj.setBlood_group((String) rs.get("blood_group"));
					obj.setExpiry_date((String) rs.get("expiry_date"));
					
						obj.setBlood_bag_details((String) rs.get("blood_bag_details"));
						listOfStock.add(obj);
					}
				listOfStock = query.list();
				
				
				

				return listOfStock;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfStock;
	}

	@Override
	public StockRegister getStockListById(int id, HttpServletRequest request) {
		StockRegister stockRegister = new StockRegister();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select s.stock_id as stockId, s.component_sep_id as compSepId,s.inward_date as inwardDate,c.volume as volume,c.blood_group as blood_group,c.expiry_date as expiry_date,b.blood_bag_details as blood_bag_details, s.stock_used as stockUsed from bb_stock_register s join bb_component_seperation c on c.blood_bag_no = s.bag_id JOIN bb_donor_blood_bag_details b ON s.bag_id=b.bloodbag_details_id where s.bag_id='"+id+"' and s.status='Y'");
			query.setResultTransformer(Transformers.aliasToBean(StockRegister.class));
			List<StockRegister>lstStock = query.list();
		
			stockRegister.setLstStockRegister(lstStock);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return stockRegister;
	}


	@Override
	public boolean deleteStock(Integer id, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			StockRegister obj = (StockRegister) sessionFactory.getCurrentSession().get(StockRegister.class, id);

			obj.setStatus("N");
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
	public StockRegister editStock(Integer id, HttpServletRequest request) {
		StockRegister stockofList = new StockRegister();
		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"select s.stock_id as stockId, s.component_sep_id as compSepId,s.inward_date as inwardDate,c.volume as volume,c.blood_group as blood_group,c.expiry_date as expiry_date,b.blood_bag_details as blood_bag_details,s.dateOfBagCollection,d.title,d.first_name AS first_name,d.middle_name AS middle_name,d.last_name  AS last_name,d.donor_id,s.stock_reamrk as stock_remark,c.component_remark as component_remark,s.donorTreatmentId as donorTreatmentId,s.bag_id as bagId  from bb_stock_register s join bb_component_seperation c on c.blood_bag_no = s.bag_id JOIN bb_donor_treatment t  ON s.donorTreatmentId = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id JOIN bb_donor_blood_bag_details b ON s.bag_id=b.bloodbag_details_id where s.stock_id='"
							+ id + "' group by s.stock_id");
			query.setResultTransformer(Transformers.aliasToBean(StockRegister.class));
			List<StockRegister> lstDonorDto = query.list();
			stockofList.setLstStockRegister(lstDonorDto);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockofList;
	}

//Added By Annapurna
	@Override
	public List<StockRegister> getAllDiscardStockList(Integer unitId) {
		List<StockRegister> listOfDiscardStock = new ArrayList<StockRegister>();
		try {
			try {

				String sql = "select s.stock_id as stockId, s.component_sep_id as compSepId,s.inward_date as inwardDate,c.volume as volume,c.blood_group as blood_group,c.expiry_date as expiry_date,b.blood_bag_details as blood_bag_details, s.stock_used as stockUsed from bb_stock_register s join bb_component_seperation c on c.blood_bag_no = s.bag_id JOIN bb_donor_blood_bag_details b ON s.bag_id=b.bloodbag_details_id where  s.discarddeleted='N'  and s.discard_status ='1'  group by s.stock_id ";
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Transformers.aliasToBean(StockRegister.class));
				listOfDiscardStock = query.list();

				return listOfDiscardStock;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listOfDiscardStock;
	}
	@Override
	public StockRegister getDiscardStockListById(int id, HttpServletRequest request) {
		StockRegister stockRegister = new StockRegister();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select s.stock_id as stockId, s.component_sep_id as compSepId,s.inward_date as inwardDate,c.volume as volume,c.blood_group as blood_group,c.expiry_date as expiry_date,b.blood_bag_details as blood_bag_details, s.stock_used as stockUsed from bb_stock_register s join bb_component_seperation c on c.blood_bag_no = s.bag_id JOIN bb_donor_blood_bag_details b ON s.bag_id=b.bloodbag_details_id where  s.discarddeleted='N'  and s.discard_status ='1' and s.bag_id= '"+id+"' group by s.stock_id ");
			query.setResultTransformer(Transformers.aliasToBean(StockRegister.class));
			List<StockRegister>lstStock = query.list();
		
			stockRegister.setLstStockRegister(lstStock);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return stockRegister;
	}

	// Added By Annapurna

	@Override
	public boolean deleteDiscardStock(Integer id, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			StockRegister obj = (StockRegister) sessionFactory.getCurrentSession().get(StockRegister.class, id);

			obj.setDiscarddeleted("Y");
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
	public StockRegister editDiscardStock(Integer id, HttpServletRequest request) {
		StockRegister DiscardstockList = new StockRegister();
		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(
					"select s.stock_id as stockId,  s.dateOfBagCollection,s.component_sep_id as compSepId,s.inward_date as inwardDate,c.volume as volume,c.blood_group as blood_group,c.expiry_date as expiry_date,b.blood_bag_details as blood_bag_details,d.title,d.first_name AS first_name,d.middle_name AS middle_name,d.last_name  AS last_name,d.donor_id,s.bag_id as bagId ,  DATE_FORMAT(s.discard_date, '%Y-%m-%d') AS discardDate, s.discard_reason AS discardReason,s.discard_remark AS discardRemark,s.discard_by AS discardby from bb_stock_register s join bb_component_seperation c on c.blood_bag_no = s.bag_id JOIN bb_donor_treatment t  ON s.donorTreatmentId = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id JOIN bb_donor_blood_bag_details b ON s.bag_id=b.bloodbag_details_id where s.stock_id='"
							+ id + "' group by s.stock_id");
			query.setResultTransformer(Transformers.aliasToBean(StockRegister.class));
			List<StockRegister> lstDonorDto = query.list();
			DiscardstockList.setLstStockRegister(lstDonorDto);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return DiscardstockList;
	}

}
