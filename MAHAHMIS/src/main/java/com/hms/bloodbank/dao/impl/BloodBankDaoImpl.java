package com.hms.bloodbank.dao.impl;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.hms.bloodbank.dao.BloodBankDao;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.bloodbank.dto.TestRegisterSlave;
import com.hms.inventory.dto.InvReportDto;
import com.hms.pharmacy.pojo.PurchaseSlave;

@Repository
@Transactional
public class BloodBankDaoImpl implements BloodBankDao {
	
	@Autowired
	SessionFactory sessionFactory;
	
	@SuppressWarnings("unchecked")
	@Override
	public List<DonorBloodBagDetails> getAllBloodBagCollectionDonorList(Integer unitId, HttpServletRequest request) {
		List<DonorBloodBagDetails> lstDonorCheckupDto = new ArrayList<DonorBloodBagDetails>();
		try {
			
			//Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id,b.bloodbag_details_id as bloodBagDetailsId,b.blood_bag_details as bloodBagDetails,b.collected_by as collectedBy,b.type_of_blood_bag as typeOfBloodBag, concat( d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.created_datetime as createdDate from bb_donor_blood_bag_details b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y'");
			Query query= sessionFactory.getCurrentSession().createSQLQuery("call sp_bb_get_all_bloodbag_collection_details(:p_unit_id)");
			query.setParameter("p_unit_id", unitId);
			query.setResultTransformer(Transformers.aliasToBean(DonorBloodBagDetails.class));
			lstDonorCheckupDto = query.list();
			
			//lstDonorCheckupDto = null;
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstDonorCheckupDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public DonorBloodBagDetails editBloodBagCollectionDonorList(Integer donorTreatmentId, HttpServletRequest request) {
		DonorBloodBagDetails DonorBloodBagDto = new DonorBloodBagDetails();
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT c.bloodbag_details_id AS bloodBagDetailsId,c.blood_bag_details AS bloodBagDetails,c.collected_by AS collectedBy,c.type_of_blood_bag AS typeOfBloodBag,c.blood_bag_details_remarks AS bloodBagDetailsRemarks,c.blood_group AS bloodGroup,c.blood_item_name AS bloodItemName,c.volume_of_collection AS volumeOfCollection,c.donor_treatment_id AS donorTreatmentId,c.created_datetime AS createdDate,d.Patient_title_name as Patient_title_name,d.first_name AS first_name,d.middle_name AS middle_name,d.last_name AS last_name,d.donor_id,c.quantity as quantity FROM bb_donor_blood_bag_details  c JOIN bb_donor_treatment t ON c.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id WHERE c.status = 'Y' and t.collectionStatus='Y' AND c.donor_treatment_id ='"+donorTreatmentId+"';");
			//Query query= sessionFactory.getCurrentSession().createSQLQuery("call sp_bb_get_checkup_list_details(:p_unit_id,:p_donor_treatment_id)");
			//query.setParameter("p_unit_id", 1);
			//query.setParameter("p_donor_treatment_id", donorTreatmentId);
			query.setResultTransformer(Transformers.aliasToBean(DonorBloodBagDetails.class));
			//query.setParameter("donor_treatment_id", donorId);
			List<DonorBloodBagDetails>lstDonorBloodBagDto = query.list();
			DonorBloodBagDto.setListDonorBloodBagDetails(lstDonorBloodBagDto);
			
			//lstDonorCheckupDto = null;
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return DonorBloodBagDto;
	}

	@Override
	public boolean deletedBloodBagCollectionDonorList(Integer donorTreatmentId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
//			DonorBloodBagDetails obj = (DonorBloodBagDetails) sessionFactory.getCurrentSession()
//					.get(DonorBloodBagDetails.class, donorTreatmentId);
//
//			obj.setStatus("N");
//			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
//			obj.setDeletedBy(userId);
//			sessionFactory.getCurrentSession().merge(obj);
			Date date = new Date(new java.util.Date().getTime());
			Query query =sessionFactory.getCurrentSession().createQuery("update DonorBloodBagDetails set status='N', deletedDate='"+date+"', deletedBy='"+userId+"' where donorTreatment.donorTreatmentId='"+donorTreatmentId+"'  ");
			query.executeUpdate();
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DonorReaction> getAllDonorReaction(Integer unitId, HttpServletRequest request) {
		List<DonorReaction> lstDonorReactionDto = new ArrayList<DonorReaction>();
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.reaction_id as donorReactionId,b.created_date as createdDate,b.remark as remark,concat( d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.testingStatus from bb_donor_reaction b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y' order by b.reaction_id desc");
			query.setResultTransformer(Transformers.aliasToBean(DonorReaction.class));
			lstDonorReactionDto = query.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstDonorReactionDto;
	}

	@Override
	public DonorReaction editDonorReaction(Integer donorTreatmentId, HttpServletRequest request) {
		DonorReaction DonorReactionDto = new DonorReaction();
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.reaction_id as donorReactionId,b.allergy_reaction as allergyReaction,b.allergy_reaction_details as allergyReactionDetails,b.outcome as outcome,b.outcome_details as outcomeDetails,b.pain as pain,b.pain_details as painDetails,b.created_date as createdDate,b.remark as remark,d.title as title, d.first_name as firstName,d.middle_name middleName,d.last_name AS lastName ,d.donor_id from bb_donor_reaction b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y' and b.donor_treatment_id='"+donorTreatmentId+"'");
			//Query query= sessionFactory.getCurrentSession().createSQLQuery("call sp_bb_get_checkup_list_details(:p_unit_id,:p_donor_treatment_id)");
			//query.setParameter("p_unit_id", 1);
			//query.setParameter("p_donor_treatment_id", donorTreatmentId);
			query.setResultTransformer(Transformers.aliasToBean(DonorReaction.class));
			//query.setParameter("donor_treatment_id", donorId);
			List<DonorReaction>lstDonorReactionDto = query.list();
			DonorReactionDto.setLstDonorReactionDto(lstDonorReactionDto);
			
			//lstDonorCheckupDto = null;
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return DonorReactionDto;
	}

	@Override
	public boolean deleteDonorReaction(Integer donorReactionId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			DonorReaction obj = (DonorReaction) sessionFactory.getCurrentSession()
					.get(DonorReaction.class, donorReactionId);

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

	@Override
	public List<BloodGroupTesting> getAllBloodGroupTestingList(Integer unitId, HttpServletRequest request) {
		List<BloodGroupTesting> lstBloodGroupTestingDto = new ArrayList<BloodGroupTesting>();
		try {
			
			//Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.blood_group_testing_id as bloodGroupTestingId, b.blood_bag_number as bloodBagNumber,b.blood_cell_grouping as bloodCellGrouping, b.blood_serum_grouping as bloodSerumGrouping,b.blood_group_testing_remark as bloodGroupTestingRemark,b.created_datetime as createdDate,concat(d.title,' ', d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id from bb_blood_group_testing b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y' order by b.blood_group_testing_id desc ");
			//Added By Annapurna
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.blood_group_testing_id as bloodGroupTestingId, b.blood_bag_number as bloodBagNumber,b.blood_cell_grouping as bloodCellGrouping, b.blood_serum_grouping as bloodSerumGrouping,b.blood_group_testing_remark as bloodGroupTestingRemark,b.created_datetime as createdDate,concat(d.Patient_title_name,' ', d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id from bb_blood_group_testing b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y' order by b.blood_group_testing_id desc ");
			query.setResultTransformer(Transformers.aliasToBean(BloodGroupTesting.class));
			lstBloodGroupTestingDto = query.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstBloodGroupTestingDto;
	}

	@Override
	public BloodGroupTesting editBloodGroupTesting(Integer donorTreatmentId, HttpServletRequest request) {
		BloodGroupTesting BloodGroupTestingDto = new BloodGroupTesting();
		try {
			
			//Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.blood_group_testing_id as bloodGroupTestingId,b.blood_group as bloodGroup, b.blood_bag_number as bloodBagNumber,b.blood_cell_grouping as bloodCellGrouping, b.blood_serum_grouping as bloodSerumGrouping,b.blood_group_testing_remark as bloodGroupTestingRemark,b.created_datetime as createdDate,concat(d.title,'-', d.first_name,'-',d.middle_name,'-',d.last_name) AS donor_name,d.donor_id from bb_blood_group_testing b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y' AND b.donor_treatment_id='"+donorTreatmentId+"'");
			//Added By Annapurna 
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.blood_group_testing_id as bloodGroupTestingId,b.blood_group as bloodGroup, b.blood_bag_number as bloodBagNumber,b.blood_group_testing_remark as bloodGroupTestingRemark, bg.blood_item_name, bg.type_of_blood_bag, b.blood_cell_grouping AS bloodCellGrouping, b.blood_serum_grouping AS bloodSerumGrouping,  bg.volume_of_collection,bg.created_datetime AS CollectedDate,  bg.blood_bag_details_remarks,concat(d.Patient_title_name,'-', d.first_name,'-',d.middle_name,'-',d.last_name) AS  donor_name,d.donor_id from bb_blood_group_testing b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id JOIN bb_donor_blood_bag_details bg ON bg.donor_treatment_id = b.donor_treatment_id where b.status='Y' and t.collectionStatus='Y' AND b.donor_treatment_id='"+donorTreatmentId+"'");
			
			query.setResultTransformer(Transformers.aliasToBean(BloodGroupTesting.class));
			List<BloodGroupTesting>lstBloodGroupTestingDto = query.list();
			BloodGroupTestingDto.setLstBloodGroupTestingDto(lstBloodGroupTestingDto);
			
			//lstDonorCheckupDto = null;
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return BloodGroupTestingDto;
	}

	@Override
	public boolean deleteBloodGroupTesting(Integer bloodGroupTestingId, HttpServletRequest request) {
		try {
		 HttpSession session = request.getSession(); Integer userId = (Integer)
			 session.getAttribute("userId1");
			 
			BloodGroupTesting obj = (BloodGroupTesting) sessionFactory.getCurrentSession().get(BloodGroupTesting.class, bloodGroupTestingId);

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
	public List<TestRegister> getAllTestRegister(Integer unitId, HttpServletRequest request) {
		List<TestRegister> lstBloodGroupTestingDto = new ArrayList<TestRegister>();
		try {
			//Added by Annapurna Patient_title_name 
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.test_register_id as testRegisterId,b.blood_bag_no as bloodBagNumber, b.sel_component_seperation_id As sel_component_seperation,b.created_date as createdDate,b.date_bag_collection as dateOfBagCollection,b.donor_treatment_id as donorTreatmentId,CONCAT(d.Patient_title_name,' ',d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.blood_group as bloodGroup FROM bb_test_register b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  WHERE b.status = 'Y' " + 
					"");
			query.setResultTransformer(Transformers.aliasToBean(TestRegister.class));
			lstBloodGroupTestingDto = query.list();
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return lstBloodGroupTestingDto;
	}

	@Override
	public boolean deleteTestRegister(Integer testRegisterId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			TestRegister obj = (TestRegister) sessionFactory.getCurrentSession()
					.get(TestRegister.class, testRegisterId);

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

	@Override
	public TestRegister editTestRegister(Integer testRegisterId, HttpServletRequest request) {
		TestRegister testRegisterDto = new TestRegister();
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.test_register_id as testRegisterId,b.blood_bag_no as bloodBagNumber, b.sel_component_seperation_id AS sel_component_seperation,b.created_date as createdDate,b.date_bag_collection as dateOfBagCollection,b.donor_treatment_id as donorTreatmentId,CONCAT(d.title,'-',d.first_name,'-',d.middle_name,'-',d.last_name) AS donor_name,d.donor_id,b.blood_group as bloodGroupName FROM bb_test_register b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  WHERE b.status = 'Y' AND b.test_register_id='"+testRegisterId+"' ");
			
			query.setResultTransformer(Transformers.aliasToBean(TestRegister.class));
			testRegisterDto = (TestRegister) query.uniqueResult();
			
			
			
			  List<TestRegisterSlave> testRegisterSlaves = new ArrayList<TestRegisterSlave>();
			  Query query1= sessionFactory.getCurrentSession().createSQLQuery("select slave.date_time as dateTime,slave.test_slave_id as testSlaveId,slave.remark as remark,slave.test_name as testName,slave.test_result as testResult FROM bb_test_register_slave slave JOIN bb_test_register b ON slave.test_master_id=b.test_register_id WHERE b.test_register_id ='"+testRegisterDto.getTestRegisterId()+"'");
				
			 // query1.setResultTransformer(Transformers.aliasToBean(TestRegisterSlave.class));
			  @SuppressWarnings("unchecked")
			  List<Object[]> lstTestRegisterSlave = query1.list();
			  for (Object[] row : lstTestRegisterSlave) {
				  TestRegisterSlave Slave = new TestRegisterSlave();
				  if (row[0] != null)
					  Slave.setDateTime(row[0].toString());
	                else
	                	Slave.setDateTime("0");
				  
				  if (row[1] != null)
					  Slave.setTestSlaveId(Integer.parseInt(row[1].toString()));
	                else
	                	Slave.setTestSlaveId(0);
				  
				  if (row[2] != null)
					  Slave.setRemark(row[2].toString());
	                else
	                	Slave.setRemark("");
				  if (row[3] != null)
					  Slave.setTestName(row[3].toString());
	                else
	                	Slave.setTestName("");
				  
				  if (row[4] != null)
					  Slave.setTestResult(row[4].toString());
	                else
	                	Slave.setTestResult("");
				  testRegisterSlaves.add(Slave);
			  }
			 
			  testRegisterDto.setTestRegisterSlave(testRegisterSlaves);
			
			
			//lstDonorCheckupDto = null;
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return testRegisterDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ComponentSeperation> getAllComponentSeperationList(Integer unitId, HttpServletRequest request) {
		List<ComponentSeperation> componentSeperation = new  ArrayList<ComponentSeperation>();
		try {
			
			// Query query = sessionFactory.getCurrentSession().createSQLQuery("SELECT b.id as componentSeperationId,b.blood_bag_no as bloodBagNumber, b.donor_treatment_id as donorTreatmentId,b.component_name as componentName,b.expiry_date as expiryDate, b.volume as volume,bag.blood_bag_name as bagname, b.date_bag_collection as dateOfBagCollection,CONCAT(d.title,' ',d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.blood_group   AS bagDetails,b.blood_bag_status as bloodBagStatus  FROM bb_component_seperation b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN bb_blood_bag_master bag ON  bag.idblood_bag = b.blood_bag_no WHERE b.status = 'Y'");
      //Added By Annapurna
					
				SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date cdate= new java.util.Date();
			 String nowDate = dateFormat.format(cdate );

			 String sql = ("SELECT b.id as componentSeperationId,b.blood_bag_no as bloodBagNumber, b.donor_treatment_id as donorTreatmentId,b.component_name as componentName,b.expiry_date as expiryDate, b.volume as volume,bag.blood_bag_details as blood_bag_details, b.date_bag_collection as dateOfBagCollection,CONCAT(d.title,' ',d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.blood_group   AS bagDetails,b.blood_bag_status as bloodBagStatus   FROM bb_component_seperation b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN  bb_donor_blood_bag_details bag ON bag.bloodbag_details_id = b.blood_bag_no WHERE b.status = 'Y' AND  date(b.expiry_date) >='"+nowDate+"' ");
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);

				List<Map<String, Object>> map = query.list();
			for(Map<String, Object> rs : map)
			{
				ComponentSeperation obj = new ComponentSeperation();
					obj.setDonorTreatmentId((Integer) rs.get("donorTreatmentId"));
					obj.setComponentSeperationId((Integer) rs.get("componentSeperationId"));
					obj.setBloodBagNumber((Integer) rs.get("bloodBagNumber"));
				
					obj.setComponentName((String) rs.get("componentName"));
				
					obj.setExpiryDate((String) rs.get("expiryDate"));
				
					obj.setBlood_bag_details((String) rs.get("blood_bag_details"));
				
					obj.setVolume((String) rs.get("volume"));
				
					obj.setDateOfBagCollection((String) rs.get("dateOfBagCollection"));
				
					obj.setBloodGroup((String) rs.get("blood_group"));
					componentSeperation.add(obj);
				}

			componentSeperation = query.list();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return componentSeperation;
	}

	@Override
	public boolean deleteComponentSeperation(Integer componentSeperationId, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			ComponentSeperation obj = (ComponentSeperation) sessionFactory.getCurrentSession()
					.get(ComponentSeperation.class, componentSeperationId);

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

	@Override
	public ComponentSeperation editComponentSeperation(Integer donorTreatmentId, Integer componentSeperationId,
			HttpServletRequest request) {
		ComponentSeperation componentSeperation = new ComponentSeperation();
		try {
			Query query = sessionFactory.getCurrentSession().createSQLQuery("SELECT b.id as componentSeperationId,b.blood_bag_no as bloodBagNumber, b.component_remark as componentRemark, b.remark as componentSeperationRemark,  b.donor_treatment_id as donorTreatmentId,b.component_name as componentName,b.expiry_date as expiryDate, b.volume as volume,bag.blood_bag_name as bagname, b.date_bag_collection as dateOfBagCollection,CONCAT(d.title,'-',d.first_name,'-',d.middle_name,'-',d.last_name) AS donor_name,d.donor_id,  b.blood_group AS bloodGroup,b.blood_bag_status as bloodBagStatus FROM bb_component_seperation b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN bb_blood_bag_master bag ON  bag.idblood_bag = b.blood_bag_no WHERE b.status = 'Y'  AND b.id='"+componentSeperationId+"' AND b.donor_treatment_id='"+donorTreatmentId+"'");
			query.setResultTransformer(Transformers.aliasToBean(ComponentSeperation.class));
			componentSeperation = (ComponentSeperation) query.uniqueResult();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return componentSeperation;
	}

	@Override
	public BloodGroupTesting getDonorDetailsByIdBloodTesting(int id, HttpServletRequest request) {
		BloodGroupTesting bloodGroupTesting = new BloodGroupTesting();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.blood_group_testing_id as bloodGroupTestingId, b.blood_bag_number as bloodBagNumber,b.blood_cell_grouping as bloodCellGrouping, b.blood_serum_grouping as bloodSerumGrouping,b.blood_group_testing_remark as bloodGroupTestingRemark,b.created_datetime as createdDate,concat(d.Patient_title_name,' ', d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id from bb_blood_group_testing b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id where b.status='Y' and t.collectionStatus='Y' and  d. donor_id= "+id+" order by b.blood_group_testing_id desc ");
			query.setResultTransformer(Transformers.aliasToBean(BloodGroupTesting.class));
			List<BloodGroupTesting>lstBloodGroupTesting = query.list();
		
			bloodGroupTesting.setLstBloodGroupTestingDto(lstBloodGroupTesting);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return bloodGroupTesting;
	}
	
	@Override
	public TestRegister getDonorDetailsByIdTestRegister(int id, HttpServletRequest request) {
		TestRegister testRegister = new TestRegister();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.test_register_id as testRegisterId,b.blood_bag_no as bloodBagNumber, b.sel_component_seperation_id As sel_component_seperation,b.created_date as createdDate,b.date_bag_collection as dateOfBagCollection,b.donor_treatment_id as donorTreatmentId,CONCAT(d.Patient_title_name,' ',d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.blood_group as bloodGroup FROM bb_test_register b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN bb_blood_sample_dispatch s ON t.donor_treatment_id = s.blood_sample_dispatch_id WHERE b.status = 'Y'  and testStatus='Y' and  d.donor_id= "+id+" ");
			query.setResultTransformer(Transformers.aliasToBean(TestRegister.class));
			List<TestRegister>lstTestREgister = query.list();
		
			testRegister.setTestRegister(lstTestREgister);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return testRegister;
	}

	@Override
	public ComponentSeperation getPatientDetailsByIdComponentsepration(int id, HttpServletRequest request) {
		ComponentSeperation componentSeperation = new ComponentSeperation();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT b.id as componentSeperationId,b.blood_bag_no as bloodBagNumber, b.donor_treatment_id as donorTreatmentId,b.component_name as componentName,b.expiry_date as expiryDate, b.volume as volume,bag.blood_bag_details as blood_bag_details, b.date_bag_collection as dateOfBagCollection,CONCAT(d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.blood_group   AS bloodGroup,b.blood_bag_status as bloodBagStatus  FROM bb_component_seperation b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON t.donor_id = d.donor_id  JOIN  bb_donor_blood_bag_details bag ON bag.bloodbag_details_id = b.blood_bag_no WHERE b.status = 'Y'and  d.donor_id= "+id+"  ");
			query.setResultTransformer(Transformers.aliasToBean(ComponentSeperation.class));
			List<ComponentSeperation>lstComponentSeperation = query.list();
		
			componentSeperation.setLstComponentseperation(lstComponentSeperation);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return componentSeperation;
	}

	@Override
	public DonorReaction getDonorDetailsByIdOrganDonation(int id, HttpServletRequest request) {
		DonorReaction donorReaction = new DonorReaction();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("select b.donor_treatment_id as donorTreatmentId,b.reaction_id as donorReactionId,b.created_date as createdDate,b.remark as remark,concat( d.first_name,' ',d.middle_name,' ',d.last_name) AS donor_name,d.donor_id,b.testingStatus from bb_donor_reaction b JOIN bb_donor_treatment t ON b.donor_treatment_id = t.donor_treatment_id JOIN bb_donor_master d ON  t.donor_id= d.donor_id  JOIN bb_donor_blood_bag_details bg ON bg.donor_treatment_id=b.donor_treatment_id where b.status='Y' and bg.reactionStatus='Y'  AND d.donor_id="+id+" order by b.reaction_id desc");
			query.setResultTransformer(Transformers.aliasToBean(DonorReaction.class));
			List<DonorReaction>lstOrganReaction = query.list();
		
			donorReaction.setLstDonorReactionDto(lstOrganReaction);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return donorReaction;
	}

	
}
