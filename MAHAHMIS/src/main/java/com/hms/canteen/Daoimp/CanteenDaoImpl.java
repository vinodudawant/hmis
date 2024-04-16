package com.hms.canteen.Daoimp;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.canteen.Dao.CanteenDao;
import com.hms.canteen.dto.CanteenDietView;
import com.hms.canteen.dto.CanteenMaster;
import com.hms.canteen.dto.CanteenPurDto;
import com.hms.canteen.dto.CanteenPurSlaveDto;
import com.hms.canteen.dto.CanteenPurchaseM;
import com.hms.canteen.dto.CanteenSaleSlave;
import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.canteen.dto.DietMaster;
import com.hms.canteen.dto.PatientDueDto;

import com.hms.dto.Hall;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.BillMasterDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class CanteenDaoImpl implements CanteenDao {

	@Autowired
	SessionFactory sessionFactory;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);
	
	String canteenid = (String) resourceBundleEhat.getString("canteenid");
	Integer canteenids = Integer.parseInt(canteenid);
	
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :For save or update CANTEEN data 
	 * **********/
	@Override
	public int saveOrUpdateCanteen(CanteenMaster canteenMaster,
			HttpServletRequest request) {
		int records=0;
		int canteenid=0;
		try {

			
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId =(Integer) sessionss.getAttribute("uId");
			
			//getting max count column
			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(CanteenMaster.class);
			criteriaMax.setProjection(Projections.max("count"));
			Integer maxcount = (Integer)criteriaMax.uniqueResult();
			if (maxcount == null ) {
				maxcount =0;
			}
			maxcount = maxcount + 1;
			
			//getting max token number using date 
			Criteria criteriatoken = sessionFactory.getCurrentSession().createCriteria(CanteenMaster.class);
			criteriatoken.setProjection(Projections.max("tokenNo"));
			criteriatoken.add(Restrictions.eq("createdDateTime", new Date(new java.util.Date().getTime())));
			Integer maxtokenNo = (Integer)criteriaMax.uniqueResult();
			
			if (maxtokenNo == null ) {
				maxtokenNo =0;
			}
			maxtokenNo = maxtokenNo + 1;
			
			
			canteenMaster.setUnitId(unitId);
			canteenMaster.setDeleted("N");
			String ipdflag=canteenMaster.getIpdeffect();
			int patientId =canteenMaster.getPatientId();
			int id =canteenMaster.getCanteenId();
			
			for(CanteenSaleSlave slave : canteenMaster.getLtCanteenSlave()){
				int subId=slave.getSubserviceid();
				if (subId > 0) {
					
				}else{
					//calling insert method of sub service 
					@SuppressWarnings("unused")
					int serid =insertincanteen(slave.getSubserviceName(),userId,unitId,slave.getRate());
					
					//getting max id of sub service 
					int subserviceId = getmaxIdOfColumn("id",
							"ehat_subservice", "category_name",
					slave.getSubserviceName());
					slave.setSubserviceid(subserviceId);
					
				}
				slave.setServiceid(canteenids);
			}
			
			
			Session session = sessionFactory.openSession(); //create session object from the session factory
			session.beginTransaction();
			if (id > 0) {
				
				CanteenMaster obj = (CanteenMaster) sessionFactory
						.getCurrentSession().get(CanteenMaster.class, id);
			    obj.setDeleted("Y");
			    obj.setDeletedBy(userId);
			    obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			}
			
			canteenMaster.setCreatedBy(userId);
			canteenMaster.setCreatedDateTime(new Date(new java.util.Date().getTime()));
			canteenMaster.setCount(maxcount);
			canteenMaster.setTokenNo(maxtokenNo);
			
			
			canteenid = (Integer)session.save(canteenMaster);
			records = canteenid;
			
			session.getTransaction().commit(); //commit the transaction
			session.close();
			
			//IPD Effect 
			if (ipdflag.equals("Y") && patientId > 0 && id == 0) {
				
				saveipdbilldetails(canteenMaster,unitId,userId);
				
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}
	
	/********
	 * @author     :BILAL
	 * @param slave 
	 * @Date       :21-03-2018
	 * @Code       :inserting into IPD billing   
	 * **********/
	private void saveipdbilldetails( CanteenMaster canteenMaster, Integer unitId, Integer userId) {
		
		try {
			for(CanteenSaleSlave slave : canteenMaster.getLtCanteenSlave()){
				
				
				BillDetailsIpdDto billDetailsIpdDto = new BillDetailsIpdDto();
				int billid = canteenMaster.getBillId();
				BillMasterDto obj = (BillMasterDto) sessionFactory
						.getCurrentSession().get(BillMasterDto.class, billid);

				billDetailsIpdDto.setPatienttId(canteenMaster.getPatientId());
				billDetailsIpdDto.setPerticularSName(slave.getSubserviceName());
				billDetailsIpdDto.setServiceId(slave.getServiceid());
				billDetailsIpdDto.setDoctorId(0);
				billDetailsIpdDto
						.setTreatmentId(canteenMaster.getTreatmentId());
				billDetailsIpdDto.setDepartmentId(2);
				billDetailsIpdDto.setBillId(canteenMaster.getBillId());

				// sponsor id's
				//billDetailsIpdDto.setSourceTypeId(obj.getSourceTypeId());
				//billDetailsIpdDto.setChargesSlaveId(obj.getSponsorId());

				billDetailsIpdDto.setRate(slave.getRate());
				billDetailsIpdDto.setConcession(0.0);
				billDetailsIpdDto.setConcessionPer(0.0);
				billDetailsIpdDto.setQuantity(slave.getQuantity());
				billDetailsIpdDto.setAmount(slave.getAmountslave()+slave.getGstamtSlave());
				billDetailsIpdDto.setPay(slave.getAmountslave());
				billDetailsIpdDto.setCoPay(slave.getAmountslave());
				billDetailsIpdDto.setSubServiceId(slave.getSubserviceid());
				billDetailsIpdDto.setUnitId(unitId);
				billDetailsIpdDto.setCreatedDateTime(new Date(
						new java.util.Date().getTime()));
				billDetailsIpdDto.setRecSlaveIdIPD(0);
				billDetailsIpdDto.setUrgentFlag("N");
				billDetailsIpdDto.setCallfrom("Canteen");
				billDetailsIpdDto.setMasterReceiptId(0);
				billDetailsIpdDto.setSubservicesname(slave.getSubserviceName());
				// sponsor id's
				//billDetailsIpdDto.setSponsorId(obj.getSourceTypeId());

				billDetailsIpdDto.setOtherRate(slave.getRate());
				billDetailsIpdDto.setOtherAmount(slave.getAmountslave());
				billDetailsIpdDto.setOtherCoPay(slave.getAmountslave());
				billDetailsIpdDto.setOtherPay(slave.getAmountslave());
				billDetailsIpdDto.setOtherConcession(0.0);
				billDetailsIpdDto.setIscombination("N");
				billDetailsIpdDto.setNarrationidBill("-");
				billDetailsIpdDto.setDeleted("N");
				billDetailsIpdDto.setCreatedBy(userId);

				Session session = sessionFactory.openSession(); // create
																// session
																// object from
																// the session
																// factory
				session.beginTransaction();
				session.merge(billDetailsIpdDto);
					
						
				session.getTransaction().commit(); // commit the transaction
				session.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		
	}

	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :For getting list of CANTEEN  
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenMaster> getlist() {
		List<CanteenMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenMaster.class);
			 criteria.add(Restrictions.eq("deleted", "N"));

			criteria.addOrder(Order.desc("canteenId"));
			criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :For getting CANTEEN list by ID  
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenMaster> getlistbyId(int canteenId) {
		List<CanteenMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenMaster.class);
			criteria.add(Restrictions.eq("canteenId", canteenId));
			criteria.add(Restrictions.eq("deleted", "N"));

			criteria.addOrder(Order.desc("canteenId"));
			criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :if service is not exist then inserting into masters 
	 * **********/
	public int insertincanteen(String categoryName,int createdBy,int unitId,double charges) {//checking duplicate service in sub service master 
		Query bet = sessionFactory
				.getCurrentSession()
				.createQuery(
						"SELECT count(*) FROM SubServiceDto WHERE deleted='N' AND categoryName= :categoryName AND serviceId= :serviceId");
		bet.setParameter("categoryName", categoryName);
		bet.setParameter("serviceId", canteenids);
		long count = (Long) bet.uniqueResult();
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		String date = dateFormat.format(new java.util.Date());
		
		//if count equals zero than service will insert 
		if (count == 0) {
			String query =

			"insert into ehat_subservice (category_name,code_name,created_by,created_date_time,deleted,isCategory,selfId,service_id,charges,isModify,iscombination,cgscode) values('"
					+ categoryName
					+ "' , '"
					+ categoryName
					+ "', '"
					+ createdBy
					+ "', '"
					+ date
					+ "', '"
					+ 'N'
					+ "', '"
					+ 'N' 
					+ "', '" 
					+ 0
					
					+ "', '" 
					+ canteenids
					
					+ "', '" 
					+ charges
					
					+ "', '" 
					+ 'N'
					
					+ "', '" 
					+ 'N'
					
					+ "', '" 
					+ categoryName

					+ "')";
			SQLQuery queryservice = sessionFactory
					.getCurrentSession().createSQLQuery(
							query);
			queryservice.executeUpdate();

		}
		return 1;
		
	}

	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :For getting id from any table  
	 * **********/
	public int getmaxIdOfColumn(String idname, String tableName,
			 String columnName, String columnValue) {
		
		
		Integer anyId =0;
		try {
			String queryser = "SELECT max("+idname+") FROM "+tableName+" where deleted='N' and "+columnName+"='"
					+ columnValue + "'";

			SQLQuery queryservice = sessionFactory.getCurrentSession().createSQLQuery(
					queryser);

			anyId = (Integer) queryservice
					.uniqueResult();
			if (anyId == null) {
				anyId =0;
			}
		} catch (Exception e) {
			
			anyId=0;
			e.printStackTrace();
		}
		
		return anyId;
	}

	/*******
	 * @author      :BILAL
	 * @DATE        :17-03-2018
	 * @Code        :For getting list of CANTEEN data for report 
	 * ********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenMaster> getlistbyforreport(Date fromDate, Date toDate, int subId) {
		List<CanteenMaster> ltmaster = null;
		try {
			

			String query=
					("FROM CanteenMaster AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate ");
			/*if (subId > 0) {
				query= query+ " AND ltCanteenSlave.subserviceid= :subserviceid";
			}*/
			
			Query bet = sessionFactory.getCurrentSession().createQuery(query);
			bet.setDate("stDate", fromDate);
			bet.setDate("edDate", toDate);
			/*if (subId > 0) {
				bet.setParameter("ltCanteenSlave.subserviceid", subId);
			}*/
			ltmaster = bet.list();
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

	/*******
	 * @author      :BILAL
	 * @DATE        :17-03-2018
	 * @Code        :For delete the CANTEEN details  
	 * ********/
	@Override
	public int deletebyId(int canteenId, HttpServletRequest request) {
		int record=0;
		try {
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			
			CanteenMaster obj = (CanteenMaster) sessionFactory
						.getCurrentSession().get(CanteenMaster.class, canteenId);
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			record=1;
		} catch (Exception e) {
			record=0;
			e.printStackTrace();
		}
		return record;
	}
	/*******
	 * @author      :BILAL
	 * @DATE        :17-03-2018
	 * @Code        :search by patient name  
	 * ********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenMaster> getcustomerlist(String letter) {
		List<CanteenMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenMaster.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("patientName", letter + "%"));
			
			
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/*******
	 * @author      :BILAL
	 * @DATE        :17-03-2018
	 * @Code        :search by Bill number 
	 * ********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenMaster> getlistbyletter(int letter) {
		List<CanteenMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenMaster.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.add(Restrictions.like("count", letter + "%"));
			criteria.add(Restrictions.sqlRestriction(" count LIKE '%"+letter+"%' "));
			
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :saving diet 
	 * **********/
	@Override
	public int savediet(DietMaster dietMaster, HttpServletRequest request) {
		int records = 0;

		try {
			
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");

			dietMaster.setUnitId(unitId);
			dietMaster.setDeleted("N");

			int id = dietMaster.getDietId();

			Session session = sessionFactory.openSession(); // create session
															// object from the
															// session factory
			session.beginTransaction();
			if (id > 0) {
				dietMaster.setUpdatedBy(userId);
				dietMaster.setUpdatedDateTime(new Date(new java.util.Date()
						.getTime()));
				records = 2;

			} else {
				dietMaster.setCreatedBy(userId);
				dietMaster.setCreatedDateTime(new Date(new java.util.Date()
						.getTime()));
				records = 1;
			}

			session.merge(dietMaster);

			session.getTransaction().commit(); // commit the transaction
			session.close();

		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :getting list of diet 
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<DietMaster> getdietlist(int treatmentId, int patientId,int deptId) {
		List<DietMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DietMaster.class);
			 criteria.add(Restrictions.eq("deleted", "N"));
			 
			 criteria.add(Restrictions.eq("treatmentId", treatmentId));
			 criteria.add(Restrictions.eq("patientId", patientId));
			 criteria.add(Restrictions.eq("deptid",deptId));

			criteria.addOrder(Order.desc("dietId"));
			criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :getting list of diet 
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenDietView> getDietDataByDate(String callForm) {
		List<CanteenDietView> ltmaster = new ArrayList<CanteenDietView>();
		
		try {
			
			java.util.Date date = Calendar.getInstance().getTime();
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			String strDate = dateFormat.format(date);
			System.out.println("Converted String: " + strDate);
			String[] todaysDate = strDate.split(" ");
			System.out.println("Converted String: " + todaysDate[0]);
			String sql = "";
			if (callForm.equalsIgnoreCase("onload")) {
				/*
				 * sql =
				 * "SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName,"
				 * +" (SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)) AS bed_name,"
				 * +" (SELECT Hname FROM beds b,treatment_beds tb,hall h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.Hall_ID) AS Hname "
				 * +" FROM ehat_diet_master em, ehat_patient p, ehat_treatment t "
				 * +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_id = (SELECT MAX(diet_id) FROM ehat_diet_master WHERE treatment_id = t.Treatment_ID)"
				 * ;
				 */
                sql="SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName,t.department_id, ifnull((SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)),'-') AS bed_name, ifnull((SELECT category_name FROM beds b,treatment_beds tb,ehat_charges_master_slave h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.id),'-') AS Hname  FROM opd_diet_master em, ehat_patient p, ehat_treatment t  WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N'  AND t.department_id in (1, 2,3) ";
	
				
				System.err.println("sql------------"+sql);
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listofpatients = query.list();
				for (Map<String, Object> row : listofpatients) {
					CanteenDietView DietPatientDetails = new CanteenDietView();
					DietPatientDetails.setDietId((Integer) row.get("diet_master_id"));
					//DietPatientDetails.setBillId((Integer) row.get("bill_id"));
					//DietPatientDetails.setCount((Integer) row.get("count"));
					DietPatientDetails.setCustomizeTempid((Integer) row.get("template_id"));
					DietPatientDetails.setDeptid((Integer) row.get("department_id"));
					DietPatientDetails.setDierdata((String) row.get("template_data"));
					DietPatientDetails.setFrom_date((String) row.get("from_date"));
					DietPatientDetails.setPatientId((Integer) row.get("patient_id"));
					DietPatientDetails.setSelDocid((Integer) row.get("user_id"));
					DietPatientDetails.setTempName((String) row.get("template_name"));
					DietPatientDetails.setTo_date((String) row.get("to_date"));
					DietPatientDetails.setTreatmentId((Integer) row.get("treatment_id"));
					DietPatientDetails.setPatientName((String) row.get("patientName"));
					DietPatientDetails.setBedName((String) row.get("bed_name"));
					DietPatientDetails.setHName((String) row.get("Hname"));
					//list.add(DietPatientDetails);
					ltmaster.add(DietPatientDetails);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :getting list of customized template 
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CustomizeTemplateDto> getcustomizelist() {
		List<CustomizeTemplateDto> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CustomizeTemplateDto.class);
		    
			criteria.add(Restrictions.eq("type", "c"));
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :getting list of customized template by id
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CustomizeTemplateDto> getcustomizelistByid(int templateId) {
		List<CustomizeTemplateDto> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CustomizeTemplateDto.class);
		    
			//criteria.add(Restrictions.eq("dietflag", "Y"));
			criteria.add(Restrictions.eq("idCustomizeTemplate", templateId));
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :for deleting diets 
	 * **********/
	@Override
	public int deletedietbyId(int dietId, HttpServletRequest request) {
		int record=0;
		try {
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			
			DietMaster obj = (DietMaster) sessionFactory
						.getCurrentSession().get(DietMaster.class, dietId);
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			record=1;
		} catch (Exception e) {
			record=0;
			e.printStackTrace();
		}
		return record;
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :for saving patient dues 
	 * **********/
	@Override
	public int savePatientDue(String duemaster, 
			HttpServletRequest request) {
		
		int val=0;
		int i=0;
		Session session = sessionFactory.openSession(); //create session object from the session factory
		session.beginTransaction(); //initialize the transaction object from session
		try {

			HttpSession sessions = request.getSession();
			Integer userId = (Integer) sessions.getAttribute("userId1");
			Integer unitId = (Integer) sessions.getAttribute("uId");

			PatientDueDto obj = (PatientDueDto) ConfigUIJSONUtility
					.getObjectFromJSON(duemaster, PatientDueDto.class);

			for (PatientDueDto obj2 : obj.getLstdue()) {

				obj2.setCreatedBy(userId);
				obj2.setUnitId(unitId);
				obj2.setCreatedDateTime(new Date(new java.util.Date().getTime()));

				session.merge(obj2);

				if (i % 20 == 0) { // Same as the JDBC batch size
					// flush a batch of inserts and release memory:
					session.flush();
					session.clear();
				}
				i++;
			}

			session.getTransaction().commit(); // commit the transaction
			session.close();
			val=1;
		} catch (Exception e) {
			e.printStackTrace();
			val=0;
			session.getTransaction().rollback();
		}
		return val;
	}
	/********
	 * @author     :BILAL
	 * @Date       :17-03-2018
	 * @Code       :for getting list of patient dues 
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<PatientDueDto> getpatientduelist() {
		List<PatientDueDto> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(PatientDueDto.class);
			 criteria.add(Restrictions.eq("deleted", "N"));

			
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for saving purchase master 
	 * **********/
	@Override
	public int savepurchase(CanteenPurchaseM canteenPurchaseM,
			HttpServletRequest request) {
		int record=0;
		try {
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId = (Integer) sessionss.getAttribute("uId");
			canteenPurchaseM.setCreatedBy(userId);
			canteenPurchaseM.setCreatedDateTime(new Date(new java.util.Date()
					.getTime()));
			canteenPurchaseM.setUnitId(unitId);
			canteenPurchaseM.setDeleted("N");
			sessionFactory.getCurrentSession().merge(canteenPurchaseM);
			if (canteenPurchaseM.getPurId() > 0) {
				record=2;
			}else{
				record=1;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			record=0;
		}
		return record;
	}
	
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of purchase master 
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurchaseM> getlistpurchasem() {
		List<CanteenPurchaseM> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurchaseM.class);
			 criteria.add(Restrictions.eq("deleted", "N"));

			 criteria.addOrder(Order.desc("purId"));
			 criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for deleting  purchase master record  
	 * **********/
	@Override
	public boolean deletepurchase(Integer subId, HttpServletRequest request) {
		try {
			
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			CanteenPurchaseM purchase = (CanteenPurchaseM) sessionFactory
					.getCurrentSession().get(CanteenPurchaseM.class, subId);

			purchase.setDeleted("Y");
			purchase.setDeletedBy(userId);
			purchase.setDeletedDateTime(new Date(new java.util.Date().getTime()));

		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of purchase master categories only
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurchaseM> getAllcategory() {
		List<CanteenPurchaseM> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurchaseM.class);
			 criteria.add(Restrictions.eq("deleted", "N"));
			 criteria.add(Restrictions.eq("isCategory", "Y"));
			 criteria.add(Restrictions.eq("selfId", 0));
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of purchase master by self Id
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurchaseM> getpurBySelfId(int selfId) {
		List<CanteenPurchaseM> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurchaseM.class);
			 criteria.add(Restrictions.eq("deleted", "N"));
			 criteria.add(Restrictions.eq("isCategory", "Y"));
			 criteria.add(Restrictions.eq("selfId", selfId));
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of purchase master from stored procedure 
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurchaseM> fetchSuperCatogoires(int purId) {
		List<CanteenPurchaseM> ltSubService = new ArrayList<CanteenPurchaseM>();

		// Calling stored procedure
		Query query = sessionFactory.getCurrentSession()
				.createSQLQuery("CALL fetchCanteen (:purId)")
				.setParameter("purId", purId);
		String result = (String) query.uniqueResult();
		String[] ary = result.split(",");

		// converting string object into Integer
		List<Integer> ae = new ArrayList<Integer>();
		for (int i = 0; i < ary.length; i++) {
			ae.add(Integer.parseInt(ary[i]));
		}

		// First checking the Length should be greater then zero
		if (ae.size() > 0) {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurchaseM.class);
			
			criteria.add(Restrictions.in("purId", ae));
			ltSubService = criteria.list();
			
		}
		
		return ltSubService;
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of purchase master By letter
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurchaseM> getbyleter(String findingName) {
		List<CanteenPurchaseM> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurchaseM.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("itemName", findingName + "%"));
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of deit
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<DietMaster> getdietlistbyid(int dietId) {
		List<DietMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DietMaster.class);
			criteria.add(Restrictions.eq("dietId", dietId));
			criteria.add(Restrictions.eq("deleted", "N"));
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :03-04-2018
	 * @Code       :for getting list of purchase master By letter whose category is N
	 * **********/
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurchaseM> getitemByLetter(String findingName) {
		List<CanteenPurchaseM> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurchaseM.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			
			criteria.add(Restrictions.like("itemName", findingName + "%"));
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	/********
	 * @author     :BILAL
	 * @Date       :05-04-2018
	 * @Code       :for save or update CANTEEN purchase item
	 * **********/
	@Override
	public int saveOrUpdatepur(CanteenPurDto canteenPurDto,
			HttpServletRequest request) {
		int records=0;
		try {

			
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			Integer unitId =(Integer) sessionss.getAttribute("uId");
			
			//getting max count column
			Criteria criteriaMax = sessionFactory.getCurrentSession().createCriteria(CanteenPurDto.class);
			criteriaMax.setProjection(Projections.max("count"));
			Integer maxcount = (Integer)criteriaMax.uniqueResult();
			if (maxcount == null ) {
				maxcount =0;
			}
			maxcount = maxcount + 1;
			
			canteenPurDto.setUnitId(unitId);
			canteenPurDto.setDeleted("N");
			
			int id =canteenPurDto.getPurchId();
			
			for(CanteenPurSlaveDto slave : canteenPurDto.getLtCanteenSlave()){
				int itemId=slave.getItemid();
				if (itemId > 0) {
					
				}else{
					//calling insert method of sub service 
					@SuppressWarnings("unused")
					int serid =insertinitem(slave.getItemName(),userId,unitId);
				
					//getting max id of sub service 
					int subitemId = getmaxIdOfColumn("pur_id",
							"ehat_canteen_purchaseM", "itemName",slave.getItemName());
					
					slave.setItemid(subitemId);
					
				}
			}
			
			Session session = sessionFactory.openSession(); //create session object from the session factory
			session.beginTransaction();
			if (id > 0) {
				canteenPurDto.setUpdatedBy(userId);
				canteenPurDto.setUpdatedDateTime(new Date(new java.util.Date().getTime()));
				records = 2;
			
			}else{
				canteenPurDto.setCreatedBy(userId);
				canteenPurDto.setCreatedDateTime(new Date(new java.util.Date().getTime()));
				canteenPurDto.setCount(maxcount);
				records = 1;
			}
			
			session.merge(canteenPurDto);
			
			session.getTransaction().commit(); //commit the transaction
			session.close();
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return records;
		}
		return records;
	}
	/********
	 * @author     :BILAL
	 * @Date       :05-04-2018
	 * @Code       :for inserting into purchase item master 
	 * **********/
	private int insertinitem(String itemName, Integer userId, Integer unitId) {
		int record=0;
		try {
			CanteenPurchaseM canteenPurchaseM=new CanteenPurchaseM();
			canteenPurchaseM.setCreatedBy(userId);
			canteenPurchaseM.setCreatedDateTime(new Date(new java.util.Date()
					.getTime()));
			canteenPurchaseM.setUnitId(unitId);
			canteenPurchaseM.setDeleted("N");
			canteenPurchaseM.setItemName(itemName);
			canteenPurchaseM.setItemCode(itemName);
			canteenPurchaseM.setSelfId(1);
			canteenPurchaseM.setIsCategory("N");
			
			sessionFactory.getCurrentSession().merge(canteenPurchaseM);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			record=0;
		}
		return record;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurDto> getpurlist() {
		List<CanteenPurDto> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurDto.class);
			 criteria.add(Restrictions.eq("deleted", "N"));

			criteria.addOrder(Order.desc("purchId"));
			criteria.setMaxResults(autoLimit);
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurDto> getpurlistbyId(int purchId) {
		List<CanteenPurDto> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurDto.class);
			 criteria.add(Restrictions.eq("deleted", "N"));
			 criteria.add(Restrictions.eq("purchId", purchId));
			 
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

	@Override
	public int deletepurbyId(int purId, HttpServletRequest request) {
		int record=0;
		try {
			HttpSession sessionss = request.getSession();
			Integer userId = (Integer) sessionss.getAttribute("userId1");
			
			CanteenPurDto obj = (CanteenPurDto) sessionFactory
						.getCurrentSession().get(CanteenPurDto.class, purId);
			obj.setDeleted("Y");
			obj.setDeletedBy(userId);
			obj.setDeletedDateTime(new Date(new java.util.Date().getTime()));
			record=1;
		} catch (Exception e) {
			record=0;
			e.printStackTrace();
		}
		return record;
	}

	
	
	@Override
	public List<CanteenPurDto> getlistforpurchasereport(Date fromDate,
			Date toDate, int subId) {
		List<CanteenPurDto> ltmaster = null;
		try {
			

			String query=
					("FROM CanteenPurDto AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate ");
			/*if (subId > 0) {
				query= query+ " AND ltCanteenSlave.subserviceid= :subserviceid";
			}*/
			
			Query bet = sessionFactory.getCurrentSession().createQuery(query);
			bet.setDate("stDate", fromDate);
			bet.setDate("edDate", toDate);
			/*if (subId > 0) {
				bet.setParameter("ltCanteenSlave.subserviceid", subId);
			}*/
			ltmaster = bet.list();
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenPurDto> getlistbyletterPur(int letter) {
		List<CanteenPurDto> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(CanteenPurDto.class);
			
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.add(Restrictions.like("purchId", letter + "%"));
			criteria.add(Restrictions.sqlRestriction(" pur_id LIKE '%"+letter+"%' "));
			
			
			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

	@Override
	public List<DietMaster> getFordietlist(int treatmentId, int patientId,int deptId, int dietID) {
		
		List<DietMaster> ltmaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DietMaster.class);
			 criteria.add(Restrictions.eq("deleted", "N"));
			 
			 criteria.add(Restrictions.eq("treatmentId", treatmentId));
			 criteria.add(Restrictions.eq("patientId", patientId));
			 criteria.add(Restrictions.eq("deptid",deptId));
			 criteria.add(Restrictions.eq("dietId",dietID));

			ltmaster = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
			//return ltmaster;
		}
		return ltmaster;
	}
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenDietView> searchByTemplateName(int letter,String fromDate,String toDate) {
List<CanteenDietView> ltmaster = new ArrayList<CanteenDietView>();
		
		try {
			
			java.util.Date date = Calendar.getInstance().getTime();
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			String strDate = dateFormat.format(date);
			System.out.println("Converted String: " + strDate);
			String[] todaysDate = strDate.split(" ");
			System.out.println("Converted String: " + todaysDate[0]);
			String sql = "";
			if (letter != 0) {
				sql = "SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName,"
						+" (SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)) AS bed_name,"
						+" (SELECT Hname FROM beds b,treatment_beds tb,hall h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.Hall_ID) AS Hname "
						+" FROM ehat_diet_master em, ehat_patient p,ehat_treatment t "  
						+" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_id = (SELECT MAX(diet_id) FROM ehat_diet_master WHERE treatment_id = t.Treatment_ID)"
						+" AND em.customizeTempid = "+letter+" ";
						//+ "AND em.created_date_time like '"+todaysDate[0]+"%'";
			}else {
				sql = "SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName," 
						+" (SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)) AS bed_name,"
						+" (SELECT Hname FROM beds b,treatment_beds tb,hall h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.Hall_ID) AS Hname "
						+" FROM ehat_diet_master em, ehat_patient p,ehat_treatment t "  
						+" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_id = (SELECT MAX(diet_id) FROM ehat_diet_master WHERE treatment_id = t.Treatment_ID)"
						+" AND em.created_date_time like '"+todaysDate[0]+"%'";
			}
			
			System.err.println("sql------------"+sql);
			
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listofpatients = query.list();
			for (Map<String, Object> row : listofpatients) {
				CanteenDietView DietPatientDetails = new CanteenDietView();
				DietPatientDetails.setDietId((Integer) row.get("diet_id"));
				DietPatientDetails.setBillId((Integer) row.get("bill_id"));
				DietPatientDetails.setCount((Integer) row.get("count"));
				DietPatientDetails.setCustomizeTempid((Integer) row.get("customizeTempid"));
				DietPatientDetails.setDeptid((Integer) row.get("deptid"));
				DietPatientDetails.setDierdata((String) row.get("dierdata"));
				DietPatientDetails.setFromDate((Date) row.get("fromDate"));
				DietPatientDetails.setPatientId((Integer) row.get("patient_id"));
				DietPatientDetails.setSelDocid((Integer) row.get("selDoc"));
				DietPatientDetails.setTempName((String) row.get("tempName"));
				DietPatientDetails.setToDate((Date) row.get("toDate"));
				DietPatientDetails.setTreatmentId((Integer) row.get("treatment_id"));
				DietPatientDetails.setPatientName((String) row.get("patientName"));
				DietPatientDetails.setBedName((String) row.get("bed_name"));
				DietPatientDetails.setHName((String) row.get("Hname"));
				ltmaster.add(DietPatientDetails);
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenDietView> searchByDateWiseDietList(String fromDate,String toDate, int templateId) {
		List<CanteenDietView> ltmaster = new ArrayList<CanteenDietView>();
		
		try {
			
			java.util.Date date = Calendar.getInstance().getTime();
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			String strDate = dateFormat.format(date);
			System.out.println("Converted String: " + strDate);
			String[] todaysDate = strDate.split(" ");
			System.out.println("Converted String: " + todaysDate[0]);
			String sql = "";
			
			/*
			 * sql =
			 * "SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName,"
			 * +" (SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)) AS bed_name,"
			 * +" (SELECT Hname FROM beds b,treatment_beds tb,hall h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.Hall_ID) AS Hname "
			 * +" FROM ehat_diet_master em, ehat_patient p,ehat_treatment t ";
			 */
			
			/*
			 * sql =
			 * "SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName,"
			 * +" (SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)) AS bed_name,"
			 * +" (SELECT Hname FROM beds b,treatment_beds tb,hall h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.Hall_ID) AS Hname "
			 * +" FROM opd_diet_master em, ehat_patient p,ehat_treatment t where t.department_id='2'"
			 * ;
			 */
			sql = "SELECT em.*,CONCAT(p.prefix,' ', p.f_name,' ',p.m_name,' ',p.l_name) AS patientName,t.department_id," 
					+" ifnull((SELECT bed_name FROM beds b, treatment_beds tb WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id)),'-') AS bed_name,"
					+" ifnull((SELECT category_name FROM beds b,treatment_beds tb,ehat_charges_master_slave h WHERE tb.treatment_id = em.treatment_id AND b.Bed_ID = tb.Bed_ID AND tb.ID = (SELECT MAX(ID) FROM treatment_beds WHERE Treatment_ID = em.treatment_id) AND b.Hall_ID = h.id),'-') AS Hname "
					+" FROM opd_diet_master em, ehat_patient p, ehat_treatment t " ; 
					//+" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND t.department_id ='2'";
					//+" AND em.created_date_time like '"+todaysDate[0]+"%'";
			
			if (templateId != 0) {
				if(null == toDate || null == fromDate) {
					sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_id = (SELECT MAX(diet_master_id) FROM opd_diet_master WHERE treatment_id = t.Treatment_ID)"
							+" AND em.customizeTempid = "+templateId;
				}else {
					sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N'"
							+" AND em.template_id = "+templateId+" AND date(em.created_date_time) between '"+fromDate+"' and  '"+toDate+"'";
				}
				
			}else if(!fromDate.equals(todaysDate[0]) || !toDate.equals(todaysDate[0])){
				//if(fromDate!=todaysDate[0] || toDate != todaysDate[0]){
				sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N'"
						+" AND date(em.created_date_time) between '"+fromDate+"' and  '"+toDate+"'";
			}else if(templateId == 0){
				//sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_id = (SELECT MAX(diet_id) FROM ehat_diet_master WHERE treatment_id = t.Treatment_ID)";
			//	sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_master_id = (SELECT MAX(diet_master_id) FROM opd_diet_master WHERE treatment_id = t.Treatment_ID) AND t.department_id ='2'";
				sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N'	";
			}else {
				sql = sql +" WHERE p.patient_id = em.patient_id AND p.patient_id = t.patient_id AND t.t_flag = 'Y' AND em.deleted = 'N' AND em.diet_master_id = (SELECT MAX(diet_master_id) FROM opd_diet_master WHERE treatment_id = t.Treatment_ID) AND t.department_id ='2'";
				//+" AND date(em.created_date_time) between '"+fromDate+"' and  '"+toDate+"'";
	       }
			
			System.err.println("sql----------"+sql);
				
				SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listofpatients = query.list();
				for (Map<String, Object> row : listofpatients) {
					CanteenDietView DietPatientDetails = new CanteenDietView();
					DietPatientDetails.setDietId((Integer) row.get("diet_master_id"));
					//DietPatientDetails.setBillId((Integer) row.get("bill_id"));
					//DietPatientDetails.setCount((Integer) row.get("count"));
					DietPatientDetails.setCustomizeTempid((Integer) row.get("template_id"));
					DietPatientDetails.setDeptid((Integer) row.get("department_id"));
					DietPatientDetails.setDierdata((String) row.get("template_data"));
					DietPatientDetails.setFrom_date((String) row.get("from_date"));
					DietPatientDetails.setPatientId((Integer) row.get("patient_id"));
					//DietPatientDetails.setSelDocid((Integer) row.get("selDoc"));
					DietPatientDetails.setTempName((String) row.get("template_name"));
					DietPatientDetails.setTo_date((String) row.get("to_date"));
					DietPatientDetails.setTreatmentId((Integer) row.get("treatment_id"));
					DietPatientDetails.setPatientName((String) row.get("patientName"));
					DietPatientDetails.setBedName((String) row.get("bed_name"));
					DietPatientDetails.setHName((String) row.get("Hname"));
					//list.add(DietPatientDetails);
					ltmaster.add(DietPatientDetails);
				}

		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<CanteenDietView> getDailyDietReportdata(Date fromDate, Date toDate) {
		List<CanteenDietView> ltmaster = null;
		try {
			

			String query=
					("FROM CanteenDietView AS c WHERE c.deleted='N'  AND DATE_FORMAT(c.createdDateTime, '%Y-%m-%d') BETWEEN :stDate AND :edDate ");
			
			Query bet = sessionFactory.getCurrentSession().createQuery(query);
			bet.setDate("stDate", fromDate);
			bet.setDate("edDate", toDate);
			
			ltmaster = bet.list();
			
			
		} catch (Exception e) {
			e.printStackTrace();
			return ltmaster;
		}
		return ltmaster;
		
	}

}
