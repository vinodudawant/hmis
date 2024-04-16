package com.hms.bloodbank.dao.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.hms.administrator.dto.Beds;
import com.hms.bloodbank.dao.BloodIssueDao;
import com.hms.bloodbank.dto.BloodGroupTesting;
import com.hms.bloodbank.dto.BloodRequest;
import com.hms.bloodbank.dto.BloodRequestSlave;
import com.hms.bloodbank.dto.CompatibilityType;
import com.hms.bloodbank.dto.Component;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.CrossMatch;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.DonorTreatment;
import com.hms.bloodbank.dto.SampleDispatch;
import com.hms.bloodbank.dto.SampleTesting;
import com.hms.bloodbank.dto.SampleTesting_Slave;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.bloodbank.dto.TestRegisterSlave;
import com.hms.bloodbank.dto.TransfusionObservation;
import com.hms.bloodbank.dto.TransfusionReaction;
import com.hms.ehat.dto.ChargesMasterSlave;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.organdonation.dto.OrganCollectionDto;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.pharmacy.pojo.BatchMaster;
import com.hms.pharmacy.pojo.PackingMaster;
import com.hms.pharmacy.pojo.ProductMaster;
import com.hms.pharmacy.pojo.PurchaseMaster;
import com.hms.pharmacy.pojo.PurchaseSlave;
import com.hms.pharmacy.pojo.VendorAddress;
import com.hms.pharmacy.pojo.VendorMaster;


@SuppressWarnings("unchecked")
@Repository
@Transactional
public class BloodIssueDaoImpl implements BloodIssueDao {

static Logger log=Logger.getLogger(BloodIssueDaoImpl.class.getName());
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public List<RegistrationDto> searchpatientDetails(String searchParam) {
		List<RegistrationDto> List = new ArrayList<RegistrationDto>();
		/*String sql="SELECT \r\n" + 
				"    p.patient_id,t.treatment_id,p.f_name,p.m_name,p.l_name where (p.patient_id like '"+searchParam+"%' or p.f_name like '"+searchParam+"%' or p.m_name like '"+searchParam+"%')"
				+ "FROM ehat_patient p JOIN ehat_treatment t ON p.patient_id = t.patient_id WHERE t.t_flag = 'Y'";*/
		String sql="select p.patient_id,t.treatment_id, p.prefix,p.f_name,p.m_name,p.l_name from ehat_patient p JOIN ehat_treatment t ON p.patient_id = t.patient_id where (p.patient_id like '"+searchParam+"%' or p.f_name like '"+searchParam+"%' or "
				+ " p.m_name like '"+searchParam+"%' or p.l_name like '"+searchParam+"%') and t.t_flag='Y'";
		try {
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> doctorDetails = query.list();
			for (Object[] rs : doctorDetails) {
				System.out.println("list>>"+rs.toString());
				RegistrationDto obj = new RegistrationDto();
				if(rs[0]!=null)
					obj.setPatient_ID(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					obj.setTreatment_id(Integer.parseInt(rs[1].toString()));
				if(rs[2]!=null)
					obj.setfName(rs[2].toString());
				if(rs[3]!=null)
					obj.setmName(rs[3].toString());
				if(rs[4]!=null)
					obj.setlName(rs[4].toString());
				List.add(obj);

			}
			return List;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	@Override
	public RegistrationDto getPatientDetailsById(int id, HttpServletRequest request) {
		RegistrationDto obj = new RegistrationDto();
		String sql="";
		String deptsql="select department_id from ehat_treatment where patient_id='"+id+"'";
		SQLQuery deptId=sessionFactory.getCurrentSession().createSQLQuery(deptsql);
		int departmentId=(int) deptId.uniqueResult();
		try {
			if(departmentId==1) {
			sql="select p.patient_id,t.treatment_id,p.f_name,p.m_name,p.l_name,concat(p.age,'Y','/',p.age_months,'M','/',p.age_days,'D') AS age," + 
						"t.weight,t.height,p.blood_group_id,t.department_id,p.mobile,p.relative_mb,p.gender,p.prefix from ehat_patient p join ehat_treatment t on p.patient_id=t.patient_id where t.t_flag='Y' AND t.patient_id='"+id+"'";
			}else {
			 sql="select p.patient_id,t.treatment_id,p.f_name,p.m_name,p.l_name,concat(p.age,'Y','/',p.age_months,'M','/',p.age_days,'D') AS age,\r\n" + 
					"t.weight,t.height,p.blood_group_id,t.department_id,p.mobile,p.relative_mb,p.gender,p.prefix,CONCAT(IFNULL(`hall`.`Hname`, '-'),' ',IFNULL(`hall_type`.`hall_type_name`,'-')) AS `BedHall`,\r\n" + 
					"IFNULL(`hall`.`Hname`, '-') AS `hname`,IFNULL(`hall_type`.`hall_type_name`,'-') AS `hall_type_name`,IFNULL(`hall`.`Hall_ID`, 0) AS `Hall_ID`,\r\n" + 
					"IFNULL(`hall`.`ehat_hallid`,0) AS `ehat_hallid`,IFNULL(`hall_type`.`idhall_type`,0) AS `idhall_type`,IFNULL(`hall_type`.`ehat_halltype_id`,0) AS `ehat_halltype_id`,\r\n" + 
					"IFNULL(`beds`.`bed_name`, 0) AS `bed_name`,IFNULL(`treatment_beds`.`status`,'-') AS `status` from ehat_patient p join ehat_treatment t on p.patient_id=t.patient_id\r\n" + 
					"AND `t`.`treatment_id` IN (SELECT `treatment_beds`.`Treatment_ID` FROM `treatment_beds`) JOIN `treatment_beds` ON ((`t`.`treatment_id` = `treatment_beds`.`Treatment_ID`))\r\n" + 
					"JOIN `beds` ON ((`treatment_beds`.`Bed_ID` = `beds`.`Bed_ID`)) JOIN `hall` ON ((`beds`.`Hall_ID` = `hall`.`Hall_ID`)) JOIN `hall_type` ON ((`hall`.`Htype` = `hall_type`.`idhall_type`))\r\n" + 
					"where t.t_flag='Y' and t.patient_id='"+id+"'";
			}
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> doctorDetails = query.list();
			for (Object[] rs : doctorDetails) {
				
				if(rs[0]!=null)
					obj.setPatient_ID(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					obj.setTreatment_id(Integer.parseInt(rs[1].toString()));
				if(rs[2]!=null)
					obj.setfName(rs[2].toString());
				if(rs[3]!=null)
					obj.setmName(rs[3].toString());
				if(rs[4]!=null)
					obj.setlName(rs[4].toString());
				if(rs[5]!=null)
					obj.setAge1(rs[5].toString());
				if(rs[6]!=null)
					obj.setWeight(rs[6].toString());
				if(rs[7]!=null)
					obj.setHeight(Double.parseDouble(rs[7].toString()));
				if(rs[8]!=null)
					obj.setBloodGroup(rs[8].toString());
				if(rs[10]!=null)
					obj.setMobile(rs[10].toString());
				if(rs[11]!=null)
					obj.setOfficeNumber(rs[11].toString());
				if(rs[12]!=null)
					obj.setSex(rs[12].toString());
				if(rs[13]!=null)
					obj.setTitle(rs[13].toString());
		if(departmentId==2) {
				if(rs[14]!=null)
					obj.setWtType(rs[14].toString());
				else
					obj.setWtType("-");
				if(rs[20]!=null)
					obj.setBedNo(rs[20].toString());
				else
					obj.setBedNo("-");
				}
			}
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public int saveBloodRequest(BloodRequest bloodRequestDetails,String listCompObj, HttpServletRequest request) {

		try {

			if (bloodRequestDetails.getBloodRequestId() == 0) {
				//bloodRequestDetails.setPriority_name("");
			
				sessionFactory.getCurrentSession().merge(bloodRequestDetails);
				return 1;
			} else {

				sessionFactory.getCurrentSession().merge(bloodRequestDetails);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	@Override
	public List<BloodRequest> searchPatientDetailsById(String searchParam , String callform,HttpServletRequest request) {
	
		List<BloodRequest> patientList = new ArrayList<BloodRequest>();
		String sql="";
		
		   SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			 java.util.Date cdate= new java.util.Date();
			 String nowDate = dateFormat.format(cdate );
			 
			 
		
		if(callform.equalsIgnoreCase("crossMatch")) {
			//sql="SELECT br.idblood_request, br.patient_name FROM bb_blood_request br JOIN bb_bloodrequest_sample_testing s ON s.blood_requestid=br.idblood_request WHERE (br.patient_name LIKE '%"+searchParam+"%'OR br.idblood_request LIKE '%"+searchParam+"%') AND s.status = 'Y'   AND (`br`.`created_datetime` >= ('"+nowDate+"' - INTERVAL 4 DAY))" ;
			sql="select idblood_request,patient_name from bb_blood_request where (patient_name like '%"+searchParam+"%' OR idblood_request like '%"+searchParam+"%' ) and status='Y'";
		}
		else if (callform.equalsIgnoreCase("bloodRequsition")) {
			
		sql="SELECT  br.idblood_request, br.patient_name FROM bb_blood_request br JOIN bb_cross_match c ON c.bloodRequestId = br.idblood_request WHERE (br.patient_name LIKE '%"+searchParam+"%' OR br.idblood_request LIKE '%"+searchParam+"%') AND c.status = 'Y' AND  DATE(c.expiry_date) >= '"+nowDate+"' AND (`br`.`created_datetime` >= ('"+nowDate+"' - INTERVAL 4 DAY))";

		}
		else if (callform.equalsIgnoreCase("bloodIssue")) {
		sql= "SELECT br.idblood_request, br.patient_name FROM bb_blood_request br JOIN bb_cross_match c ON c.bloodRequestId = br.idblood_request WHERE (br.patient_name LIKE '%"+searchParam+"%' OR br.idblood_request LIKE '%"+searchParam+"%') AND c.requ_status = '2' AND DATE(c.expiry_date) >= '"+nowDate+"' AND (`br`.`created_datetime` >= ('"+nowDate+"' - INTERVAL 4 DAY))";
	
		}
		else if	(callform.equalsIgnoreCase("transfusion")) {
			sql="SELECT br.idblood_request, br.patient_name FROM bb_blood_request br JOIN bb_cross_match c ON c.bloodRequestId = br.idblood_request WHERE (br.patient_name LIKE '%"+searchParam+"%' OR br.idblood_request LIKE '%"+searchParam+"%') AND c.requ_status = '3' AND DATE(c.expiry_date) >= '"+nowDate+"' AND (`br`.`created_datetime` >= ('"+nowDate+"' - INTERVAL 4 DAY))";

		}
		else {
			sql="select idblood_request,patient_name from bb_blood_request where (patient_name like '%"+searchParam+"%' OR idblood_request like '%"+searchParam+"%' ) and status='Y'";

		}
		try {
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> doctorDetails = query.list();
			for (Object[] rs : doctorDetails) {
				System.out.println("list>>"+rs.toString());
				BloodRequest obj = new BloodRequest();
				if(rs[0]!=null)
					obj.setBloodRequestId(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					obj.setPatientName(rs[1].toString());
				patientList.add(obj);
 
			}
			return patientList;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	@Override
	public BloodRequest getPatientDetailsByRequestId(int id, HttpServletRequest request) {
		BloodRequest obj = new BloodRequest();
		String sql="select b.idblood_request,b.patient_name,b.age,contact_no1,b.contact_no2,bg.blood_group_name,b.gender,b.haemoglobin,b.height,b.Weight,b.Ward_name,b.bed_number,b.priority , b.title from bb_blood_request b join  bb_blood_group_master bg On bg.idblood_group=b.blood_group where b.idblood_request='"+id+"' and b.status='Y'";
		try {
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> Details = query.list();
			for (Object[] rs :  Details) {
				if(rs[0]!=null)
					obj.setBloodRequestId(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					obj.setPatientName(rs[1].toString());
				if(rs[2]!=null)
					obj.setAge(rs[2].toString());
				if(rs[3]!=null)
					obj.setContactNo1(rs[3].toString());
				if(rs[4]!=null)
					obj.setContactNo2(rs[4].toString());
				if(rs[5]!=null)
					obj.setBloodgroupname(rs[5].toString());
				if(rs[6]!=null)
					obj.setGender(Integer.parseInt(rs[6].toString()));
				if(rs[7]!=null)
					obj.setHaemoglobin(rs[7].toString());
				if(rs[8]!=null)
					obj.setHeight(rs[8].toString());
				if(rs[9]!=null)
					obj.setWeight(rs[9].toString());
				if(rs[10]!=null)
					obj.setWardName(rs[10].toString());
				if(rs[11]!=null)
					obj.setBedNumber(rs[11].toString());
				if(rs[12]!=null)
					obj.setPriority(Integer.parseInt(rs[12].toString()));
				/*
				 * //Added By Annapurna if (rs[25] != null) obj.setTitle(Integer.parseInt(rs[25]
				 * .toString()));
				 */
                           
                

			}
			return obj;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	@Override
	public int saveBloodRequest(SampleDispatch sampleDispatchDetails, HttpServletRequest request) {
		try {
			sampleDispatchDetails.setSampleStatus(1);
			if (sampleDispatchDetails.getSampleDispatchId() == 0) {

				sessionFactory.getCurrentSession().merge(sampleDispatchDetails);
				return 1;
			} else {

				sessionFactory.getCurrentSession().merge(sampleDispatchDetails);
				return 2;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	@Override
	public List<SampleDispatch> getDetails(Integer status, String formDate, String toDate, String callform,
			Integer requestNo, HttpServletRequest request) {
		List<SampleDispatch> listDetails = new ArrayList<SampleDispatch>();
		if(requestNo==0) {
			try {
				String sql="select s.patient_name,p.priority,s.blood_requestid,s.ward_name,s.sample_dispatch_id,s.sample_status,s.remarks from bb_bloodrequest_sample_dispatch s " + 
						"join bb_blood_request b on s.blood_requestid = b.idblood_request join bb_priority_master p on b.priority = p.id_priority where s.sample_status='"+status+"' and Date(s.date)>='"+formDate+"' and Date(s.date)<='"+toDate+"' and s.status='Y' and s.send_status='Y'";
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				System.out.println(sql);
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
			    	System.out.println("row"+rs.toString());
			    	SampleDispatch SampleDispatch = new SampleDispatch();
			    	if(rs[0] !=null)
			    		if(rs[0]!=null)
			    			SampleDispatch.setPatientName(rs[0].toString());
						if(rs[1]!=null)
							SampleDispatch.setPriority(rs[1].toString());
						if(rs[2]!=null)
							SampleDispatch.setBloodRequestId(Integer.parseInt(rs[2].toString()));
						if(rs[3]!=null)
							SampleDispatch.setWardName(rs[3].toString());
						if(rs[4]!=null)
							SampleDispatch.setSampleDispatchId(Integer.parseInt(rs[4].toString()));
						if(rs[5]!=null)
			    			SampleDispatch.setSampleStatus(Integer.parseInt(rs[5].toString()));
						if(rs[6]!=null)
			    			SampleDispatch.setRemarks(rs[6].toString());
						else
							SampleDispatch.setRemarks(" ");
						
							Date date =new Date();
							SampleDispatch.setCreatedDate(date);
							listDetails.add(SampleDispatch);
							SampleDispatch=null;

				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}else {

			try {
				String sql="select s.patient_name,p.priority,s.blood_requestid,s.ward_name,s.sample_dispatch_id from bb_bloodrequest_sample_dispatch s\r\n" + 
						"join bb_blood_request b on s.blood_requestid = b.idblood_request join bb_priority_master p on b.priority = p.id_priority where s.sample_status='"+status+"' and s.blood_requestid='"+requestNo+"' and Date(s.date)>='"+formDate+"' and Date(s.date)<='"+toDate+"' and s.status='Y' and s.send_status='Y'";
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				System.out.println(sql);
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
			    	System.out.println("row"+rs.toString());
			    	SampleDispatch SampleDispatch = new SampleDispatch();
			    	if(rs[0] !=null)
			    		if(rs[0]!=null)
			    			SampleDispatch.setPatientName(rs[0].toString());
						if(rs[1]!=null)
							SampleDispatch.setPriority(rs[1].toString());
						if(rs[2]!=null)
							SampleDispatch.setBloodRequestId(Integer.parseInt(rs[2].toString()));
						if(rs[3]!=null)
							SampleDispatch.setWardName(rs[3].toString());
						if(rs[4]!=null)
							SampleDispatch.setSampleDispatchId(Integer.parseInt(rs[4].toString()));
							Date date =new Date();
							SampleDispatch.setCreatedDate(date);
							listDetails.add(SampleDispatch);
							SampleDispatch=null;

				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		
		}
		return listDetails;
	}

	@Override
	public int savePatientSampleAcknowledge(int sampleDispatchId, int sampleStatus, String remarks,
			HttpServletRequest request) {
		String hql="Update SampleDispatch set sampleStatus= :sampleStatus , remarks= :remarks where SampleDispatchId = :sampleDispatchId";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("sampleStatus", sampleStatus );
		query.setParameter("sampleDispatchId", sampleDispatchId );
		query.setParameter("remarks", remarks);
		int result =query.executeUpdate();
		
		
		return result;
	}


	@Override
	public List<BloodRequestSlave> getRequestComponentDetailsByID(int id, HttpServletRequest request) {
		List<BloodRequestSlave> lstbloodRequestSlave = new ArrayList<BloodRequestSlave>();
		
		try {
		 String sql="select Component_id,component_name,collection_volume from bb_blood_request_slave where blood_request_master_id='"+id+"'";
			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);

			List<Object[]> Details = query.list();
			for (Object[] rs : Details) {
				System.out.println("list>>"+rs.toString());
				BloodRequestSlave bloodRequestSlave = new BloodRequestSlave();
				if(rs[0]!=null)
					bloodRequestSlave.setComponentId(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					bloodRequestSlave.setComponentName(rs[1].toString());
				if(rs[2]!=null)
					bloodRequestSlave.setCollectionVolume(rs[2].toString());
				lstbloodRequestSlave.add(bloodRequestSlave);

			}
			return lstbloodRequestSlave;
			
		}catch(Exception e) {
			e.printStackTrace();
			log.error("Exception----> ",e);
			return null;
		}		
		
	}

	@Override
	public int saveCrossMatch(CrossMatch crossMatchDetails, HttpServletRequest request) {
		
		try {

			if (crossMatchDetails.getCrossMatchId() == 0) {

				CrossMatch obj=	(CrossMatch) sessionFactory.getCurrentSession().merge(crossMatchDetails);
				return obj.getBloodRequestId();
			} else {

				CrossMatch obj =(CrossMatch) sessionFactory.getCurrentSession().merge(crossMatchDetails);
				return obj.getBloodRequestId();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	@Override
	public List<CrossMatch> getCrossMatchListByID(Integer bloodRequestId,String callfrom,HttpServletRequest request) {
		List<CrossMatch> lstCrossMatchMaster=new ArrayList<CrossMatch>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CrossMatch.class);
			 if(callfrom.equals("crossmatch")) {
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				criteria.add(Restrictions.eq("bloodRequestId",bloodRequestId));
			// criteria.add(Restrictions.eq("requStatus",1));
			}
			else if(callfrom.equals("bloodRequsition")) {
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				criteria.add(Restrictions.eq("bloodRequestId",bloodRequestId));
				criteria.add(Restrictions.eq("requStatus",1));
			}else if(callfrom.equals("bloodIssue")) {
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				criteria.add(Restrictions.eq("bloodRequestId",bloodRequestId));
				criteria.add(Restrictions.eq("requStatus",2));
			}else if(callfrom.equals("transfusion")) {
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				criteria.add(Restrictions.eq("bloodRequestId",bloodRequestId));
				criteria.add(Restrictions.eq("requStatus",3));
			}
			else if(callfrom.equals("getDataOnedit")){		
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				//criteria.add(Restrictions.eq("bloodRequestId",bloodRequestId));
				criteria.add(Restrictions.eq("crossMatchId",bloodRequestId));
				//criteria.add(Restrictions.eq("requStatus",1));
			
			}
			else {		
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("unitId",unitId));
				criteria.add(Restrictions.eq("crossMatchId",bloodRequestId));
			}
			/*if(callfrom.equals("getDataOneditBloodIssue"))
			 * else { criteria.add(Restrictions.eq("status", "Y"));
			 * criteria.add(Restrictions.eq("unitId",unitId));
			 * criteria.add(Restrictions.eq("bloodRequestId",bloodRequestId));
			 * criteria.add(Restrictions.eq("requStatus",1)); }
			 */
			lstCrossMatchMaster = criteria.list();
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}		
		return lstCrossMatchMaster;
	}

	@Override
	public boolean deleteCrossMatch(Integer id, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			CrossMatch obj =	(CrossMatch)sessionFactory.getCurrentSession().get(CrossMatch.class, id);
			obj.setStatus("N");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}

	@Override
	public CrossMatch editCrossMatch(Integer id) {
		CrossMatch obj=new CrossMatch();
		BloodRequestSlave objc=new BloodRequestSlave();
		CompatibilityType com =new CompatibilityType();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CrossMatch.class);
			criteria.add(Restrictions.eq("crossMatchId", id));
			obj=(CrossMatch) criteria.uniqueResult();
			 
			Criteria c = sessionFactory.getCurrentSession().createCriteria(BloodRequestSlave.class);
			c.add(Restrictions.eq("componentName", obj.getComponentName()));
			c.add(Restrictions.eq("bloodRequest.bloodRequestId", obj.getBloodRequestId()));
			objc=(BloodRequestSlave) c.uniqueResult();
			obj.setComponentId(objc.getComponentId());
			
		
			 Criteria cri=
			 sessionFactory.getCurrentSession().createCriteria(CompatibilityType.class);
			 cri.add(Restrictions.eq("compatibilityType" , obj.getCompatibleType()));
			 com=(CompatibilityType) cri.uniqueResult();
			 obj.setCompatibilityTypeId(com.getCompatibilityTypeId());
			 
			
			return obj;
			
		}catch(Exception e) {
			log.error("Exception----> ",e);
		}
		return obj;
	}

	@Override
	public int saveBloodRequisiton(String listbloodreq, HttpServletRequest request) {
		try {
		CrossMatch crossDetails = (CrossMatch)ConfigUIJSONUtility.getObjectFromJSON(listbloodreq,CrossMatch.class);	
		System.err.println("Size>>>>"+crossDetails.getLstCrossMatch().size());
		for(int i=0; i<crossDetails.getLstCrossMatch().size(); i++) {
			CrossMatch obj = new CrossMatch();
			obj=crossDetails.getLstCrossMatch().get(i);
			String hql="update CrossMatch set requisitionQty= :qty , requPriority= :priority , requStatus='2', requRemark= :remark where crossMatchId= :id";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);
			query.setParameter("qty", obj.getRequisitionQty());
			query.setParameter("priority",obj .getRequPriority());
			query.setParameter("remark", obj.getRequRemark());
			query.setParameter("id", obj.getCrossMatchId());
			query.executeUpdate();
		}
		return 1;
	}catch(Exception e) {
		e.printStackTrace();
		return 0;
	}

		
	}

	@Override
	public int saveBloodIssue(String listbloodissue, HttpServletRequest request) {
		try {
			CrossMatch crossDetails = (CrossMatch)ConfigUIJSONUtility.getObjectFromJSON(listbloodissue,CrossMatch.class);	
			System.err.println("Size>>>>"+crossDetails.getLstCrossMatch().size());
			for(int i=0; i<crossDetails.getLstCrossMatch().size(); i++) {
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				CrossMatch obj = new CrossMatch();
				obj=crossDetails.getLstCrossMatch().get(i);
				int bagId=obj.getBloodBagId();
				System.out.println("issueQty>>"+bagId);
				String hql="update CrossMatch set issueQty= :qty , issueRemark= :remark , requStatus='3', issuedBy= :usedid where crossMatchId= :id";
				Query query = sessionFactory.getCurrentSession().createQuery(hql);
				query.setParameter("qty", obj.getIssueQty());
				query.setParameter("remark",obj.getIssueRemark());
				query.setParameter("usedid", userId);
				query.setParameter("id", obj.getCrossMatchId());
				query.executeUpdate();
				
				//update stock of bloodbag
				
				String sql="select sum(volume) from bb_component_seperation where blood_bag_no='"+obj.getBloodBagId()+"' and component_name='"+obj.getComponentName()+"'";
				SQLQuery volumeque= sessionFactory.getCurrentSession().createSQLQuery(sql);
				Double result =(Double) volumeque.uniqueResult();	
				int result1=result.intValue();
				int IssueQty=Integer.parseInt(obj.getIssueQty());
				int Qty=(result1 - IssueQty);
				System.out.println("Qty>>>>>>"+Qty);
				
				String sql2 = "select count(*) from bb_stock_register";
				SQLQuery que = sessionFactory.getCurrentSession().createSQLQuery(sql2);
				BigInteger count = (BigInteger) que.uniqueResult();
				
				if(count.intValue() > 0) {
					for(int j=1;j<count.intValue();j++) {
					String sql3="update bb_stock_register set  stock_used='N' where  bag_id='"+obj.getBloodBagId()+"'";
					SQLQuery query3 = sessionFactory.getCurrentSession().createSQLQuery(sql3);
					query3.executeUpdate();
					}
				}
				
				String sql1="update bb_component_seperation set  volume='"+Qty+"' where  blood_bag_no='"+obj.getBloodBagId()+"' and component_name='"+obj.getComponentName()+"'";
				SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				query1.executeUpdate();
			}
			return 1;
		}catch(Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	@Override
	public int addtransfusiuon(String listtranfusion, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			System.out.println("list"+listtranfusion);
			TransfusionReaction obj = new TransfusionReaction();
			TransfusionReaction transfusionDetails = (TransfusionReaction)ConfigUIJSONUtility.getObjectFromJSON(listtranfusion,TransfusionReaction.class);	
			System.err.println("Size>>>>"+transfusionDetails.getLstTransfusion().size());
			for(int i=0; i<transfusionDetails.getLstTransfusion().size(); i++) {
				TransfusionReaction mainObj = new TransfusionReaction();
				mainObj=transfusionDetails.getLstTransfusion().get(i);
				mainObj.setCreatedBy(userId);
				mainObj.setUnitId(unitId);
				mainObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				String ipaddress = request.getRemoteAddr();
				mainObj.setIpAddress(ipaddress);
				obj=(TransfusionReaction) sessionFactory.getCurrentSession().merge(mainObj);
				
			}
			
			 obj.getBloodRequestId();
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		
	} 
	/*
	//Added By Annapurna
	@Override
	public int addtransfusiuon(String listtranfusion,String listobservation, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			System.out.println("list"+listtranfusion);
			
			System.out.println("list"+listobservation);
			TransfusionReaction obj = new TransfusionReaction();
			TransfusionReaction transfusionDetails = (TransfusionReaction)ConfigUIJSONUtility.getObjectFromJSON(listtranfusion,TransfusionReaction.class);	

			TransfusionObservation transfusionObservation = (TransfusionObservation) ConfigUIJSONUtility.getObjectFromJSON(listobservation,TransfusionObservation.class);
			List<TransfusionObservation> listObs = transfusionObservation.getLstTransfusionObservation();
			
			System.err.println("Size>>>>"+transfusionDetails.getLstTransfusion().size());
			for(int i=0; i<transfusionDetails.getLstTransfusion().size(); i++) {
				TransfusionReaction mainObj = new TransfusionReaction();
				mainObj=transfusionDetails.getLstTransfusion().get(i);
				mainObj.setCreatedBy(userId);
				mainObj.setUnitId(unitId);
				mainObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				String ipaddress = request.getRemoteAddr();
				mainObj.setIpAddress(ipaddress);
				obj=(TransfusionReaction) sessionFactory.getCurrentSession().merge(mainObj);
				
				for(TransfusionObservation rs : listObs)
				{
					TransfusionReaction objTrans = new TransfusionReaction();
					objTrans.setTransfusionId(obj.getTransfusionId());
					
					rs.setTransfusionReaction(objTrans);
					
					sessionFactory.getCurrentSession().merge(rs);
				}
				
			}
			return obj.getBloodRequestId();
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

		
	}
      */

	@Override
	public TransfusionReaction editTransfusionDetail(Integer transfusionId) {
		TransfusionReaction obj=new TransfusionReaction();
		List<TransfusionReaction>list= new ArrayList <TransfusionReaction>();
			try {

				Query query = sessionFactory.getCurrentSession().createSQLQuery("  SELECT t.idtransfusion as transfusionId,t.component_name as componentName ,t.blood_bag as bloodBag ,t.component_volume as componentVolume ,t.expiry_date as expiryDate,t.issue_qty as issueQty ,t.compatible_type as compatibleType,t.start_time as startTime ,t.end_time as endTime ,t. rateid as rateId ," + 
						"t.rate ,t.trans_qty as transQty,c.idcrossmatch as crossMatchId,t.status, br. age,br. idblood_request AS bloodRequestId,br.Ward_name as wardName,br.Weight,br.bed_number AS bedNumber,br.bloodgroupname,br. contact_no1 AS contactNo1,br.contact_no2 AS contactNo2,br. gender,br.haemoglobin,br.height,br.patient_name AS patientName,br.title ,t.observation1 ,t.pre_transfusion1 as preTransfusion1 ,t.post_transfusion1 as postTransfusion1 , t.during_transfusion1 as duringTransfusion1 ,t.observation2 ,t.pre_transfusion2 as preTransfusion2 , t.post_transfusion2 as postTransfusion2 ,t.during_transfusion2 as duringTransfusion2 ,t.observation3 , t.pre_transfusion3 as preTransfusion3 ,t.during_transfusion3 as duringTransfusion3 ,t.post_transfusion3 as postTransfusion3 ,t.remark FROM bb_transfusion_reaction t JOIN bb_blood_request br ON br.idblood_request = t.bloodRequestId Join bb_cross_match c on c.bloodRequestId=br.idblood_request where t.idtransfusion="+transfusionId+" ");
				query.setResultTransformer(Transformers.aliasToBean(TransfusionReaction.class));
				obj = (TransfusionReaction) query.uniqueResult();
			} catch (Exception e) {
				e.printStackTrace();
			}
			return obj;
			
			/*
			 * Criteria criteria=sessionFactory.getCurrentSession().createCriteria(
			 * TransfusionReaction.class); criteria.add(Restrictions.eq("transfusionId",
			 * transfusionId)); obj=(TransfusionReaction) criteria.uniqueResult();
			 * 
			 * return obj;
			 */		
	}

	@Override
	public boolean deleteTransfusionDetail(Integer transfusionId, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			int userId = (int) session.getAttribute("userId1");
			TransfusionReaction obj =	(TransfusionReaction)sessionFactory.getCurrentSession().get(TransfusionReaction.class, transfusionId);
			obj.setStatus("N");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}

	@Override
	public int saveObservation(String listobservation, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			System.out.println("list"+listobservation);
			
			TransfusionObservation observationDetails = (TransfusionObservation)ConfigUIJSONUtility.getObjectFromJSON(listobservation,TransfusionObservation.class);	
			System.err.println("Size>>>>"+observationDetails.getLstTransfusionObservation().size());
			for(int i=0; i<observationDetails.getLstTransfusionObservation().size(); i++) {
				TransfusionObservation mainObj = new TransfusionObservation();
				mainObj=observationDetails.getLstTransfusionObservation().get(i);
				mainObj.setCreatedBy(userId);
				mainObj.setUnitId(unitId);
				mainObj.setCreatedDate(new Date(new java.util.Date().getTime()));
				String ipaddress = request.getRemoteAddr();
				mainObj.setIpAddress(ipaddress);
				sessionFactory.getCurrentSession().merge(mainObj);
				
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}

	}

	@Override
	public List<ComponentSeperation> getAllComponentByComponentName(Integer bloodBagNumber,Integer componentId, HttpServletRequest request) {
		List<ComponentSeperation> lstcomponentSepreation = new ArrayList<ComponentSeperation>();
		//String compNamesql="select component_name from bb_component_seperation where id='"+componentId+"'";

     String compNamesql="select component_name from bb_blood_request_slave where Component_id='"+componentId+"'"; //Added By Annapurna
		SQLQuery compQuery = sessionFactory.getCurrentSession().createSQLQuery(compNamesql);
		String componentName = (String)compQuery.uniqueResult();
		
		try {
			
			String sql="SELECT  c.component_name,c.blood_bag_no, c.volume, c.expiry_date FROM bb_component_seperation c where c.blood_bag_status='2' and c.status='Y'and c.component_name='"+componentName+"' and c.blood_bag_no='"+bloodBagNumber+"'" ;
			//b.status='Y'
			//"        JOIN\r\n" + 
			//"    bb_blood_bag_master b ON c.blood_bag_no = b.idblood_bag\r\n" + 
			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			List<Object[]> Details = query.list();
			for (Object[] rs : Details) {
				System.out.println("list>>"+rs.toString());
				ComponentSeperation obj = new ComponentSeperation();
				if(rs[0]!=null)
					obj.setComponentName(rs[0].toString());
				if(rs[1]!=null)
					obj.setBloodBagNumber(Integer.parseInt(rs[1].toString()));
				if(rs[2]!=null)
					obj.setVolume(rs[2].toString());
				if(rs[3]!=null)
					obj.setExpiryDate(rs[3].toString());
				lstcomponentSepreation.add(obj);

			}
		return lstcomponentSepreation;	
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

	@Override
	public List<ComponentSeperation> getAllBagDetailsbyComponentId(Integer componentId,String bloodGroup,Integer bloodRequestId, HttpServletRequest request) {
		List<ComponentSeperation> lstcomponentSepreation = new ArrayList<ComponentSeperation>();
		try {
				
	        String compNamesql="select component_name from bb_blood_request_slave where Component_id='"+componentId+"'";//Added By Annapurna
			SQLQuery compQuery = sessionFactory.getCurrentSession().createSQLQuery(compNamesql);
			String componentName = (String)compQuery.uniqueResult();

		     SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
			 java.util.Date cdate= new java.util.Date();
			 String nowDate = dateFormat.format(cdate );
		 String sql="SELECT DISTINCT c.blood_bag_no,  bag.bloodbag_details_id, bag.blood_bag_details FROM bb_stock_register s JOIN bb_component_seperation c ON c.blood_bag_no=s.bag_id JOIN bb_donor_blood_bag_details bag ON c.blood_bag_no =  bag.bloodbag_details_id JOIN bb_blood_request b ON b.blood_group = bag.blood_group  WHERE c.blood_bag_status<='2'  AND s.status = 'Y'" + 
			"AND c.component_name='"+componentName+"' AND bag.blood_group_name='"+bloodGroup+"' AND DATE(c.expiry_date) >= '"+nowDate+"' AND NOT bag.bloodbag_details_id IN (SELECT ifnull(GROUP_CONCAT(blood_bagid),0)  AS id FROM bb_cross_match WHERE component_name = '"+componentName+"' AND bloodRequestId = '"+bloodRequestId+"') ";
		//	String sql="SELECT DISTINCT c.blood_bag_no,  bag.bloodbag_details_id, bag.blood_bag_details FROM bb_stock_register s JOIN bb_component_seperation c ON c.blood_bag_no=s.bag_id JOIN bb_donor_blood_bag_details bag ON c.blood_bag_no =  bag.bloodbag_details_id JOIN bb_blood_request b ON b.blood_group = bag.blood_group  JOIN bb_cross_match cm ON cm.bloodRequestId=b.idblood_request WHERE s.status = 'Y'" + 
		//	 		 "AND c.component_name='"+componentName+"' AND bag.blood_group_name='"+bloodGroup+"' ";
			
			SQLQuery query=sessionFactory.getCurrentSession().createSQLQuery(sql);
			List<Object[]> Details = query.list();
			for (Object[] rs : Details) {
				System.out.println("list>>"+rs.toString());
				ComponentSeperation obj = new ComponentSeperation();
			
				
				
			       if(rs[0]!=null) obj.setBloodBagNumber
		       	 (Integer.parseInt(rs[0].toString()));	 
				if(rs[1]!=null)
					obj.setBloodBagDetailsId(Integer.parseInt(rs[1].toString()));	
				if(rs[2]!=null)
					obj.setBloodBagDetails((rs[2].toString()));
				/*
				 * if(rs[0]!=null) obj.setBloodBagStatus(Integer.parseInt(rs[0].toString()));
				 */
		
					obj.setComponentSeperationId(componentId);
					obj.setComponentName(componentName);
				lstcomponentSepreation.add(obj);

			}
		return lstcomponentSepreation;	
		}catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public List<SampleDispatch> getSampleAckDetails(String from, String to, String callform) {

		List<SampleDispatch> listDetails = new ArrayList<SampleDispatch>();
		if(callform.equals("accept")) {
			try {
				String sql="select s.patient_name,p.priority,s.blood_requestid,s.ward_name,s.sample_dispatch_id from bb_bloodrequest_sample_dispatch s" + 
						"join bb_blood_request b on s.blood_requestid = b.idblood_request join bb_priority_master p on b.priority = p.id_priority where s.sample_status='2' and Date(s.date)>='"+from+"' and Date(s.date)<='"+to+"' and s.status='Y' and s.send_status='Y'";
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				System.out.println(sql);
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
			    	System.out.println("row"+rs.toString());
			    	SampleDispatch SampleDispatch = new SampleDispatch();
			    	if(rs[0] !=null)
			    		if(rs[0]!=null)
			    			SampleDispatch.setPatientName(rs[0].toString());
						if(rs[1]!=null)
							SampleDispatch.setPriority(rs[1].toString());
						if(rs[2]!=null)
							SampleDispatch.setBloodRequestId(Integer.parseInt(rs[2].toString()));
						if(rs[3]!=null)
							SampleDispatch.setWardName(rs[3].toString());
						if(rs[4]!=null)
							SampleDispatch.setSampleDispatchId(Integer.parseInt(rs[4].toString()));
							Date date =new Date();
							SampleDispatch.setCreatedDate(date);
							listDetails.add(SampleDispatch);
							SampleDispatch=null;

				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}else if(callform.equals("reject")){

			try {
				String sql="select s.patient_name,p.priority,s.blood_requestid,s.ward_name,s.sample_dispatch_id from bb_bloodrequest_sample_dispatch s\r\n" + 
						"join bb_blood_request b on s.blood_requestid = b.idblood_request join bb_priority_master p on b.priority = p.id_priority where s.sample_status='3'  and Date(s.date)>='"+from+"' and Date(s.date)<='"+to+"' and s.status='Y' and s.send_status='Y'";
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				System.out.println(sql);
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
			    	System.out.println("row"+rs.toString());
			    	SampleDispatch SampleDispatch = new SampleDispatch();
			    	if(rs[0] !=null)
			    		if(rs[0]!=null)
			    			SampleDispatch.setPatientName(rs[0].toString());
						if(rs[1]!=null)
							SampleDispatch.setPriority(rs[1].toString());
						if(rs[2]!=null)
							SampleDispatch.setBloodRequestId(Integer.parseInt(rs[2].toString()));
						if(rs[3]!=null)
							SampleDispatch.setWardName(rs[3].toString());
						if(rs[4]!=null)
							SampleDispatch.setSampleDispatchId(Integer.parseInt(rs[4].toString()));
							Date date =new Date();
							SampleDispatch.setCreatedDate(date);
							listDetails.add(SampleDispatch);
							SampleDispatch=null;

				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		
		}else if(callform.equals("pending")) {
			
			try {
				String sql="select s.patient_name,p.priority,s.blood_requestid,s.ward_name,s.sample_dispatch_id from bb_bloodrequest_sample_dispatch s\r\n" + 
						"join bb_blood_request b on s.blood_requestid = b.idblood_request join bb_priority_master p on b.priority = p.id_priority where s.sample_status='1'  and Date(s.date)>='"+from+"' and Date(s.date)<='"+to+"' and s.status='Y' and s.send_status='Y'";
				Session session =sessionFactory.getCurrentSession();
				SQLQuery query = session.createSQLQuery(sql);
				System.out.println(sql);
				List<Object[]> Details = query.list();
				for (Object[] rs : Details) {
			    	System.out.println("row"+rs.toString());
			    	SampleDispatch SampleDispatch = new SampleDispatch();
			    	if(rs[0] !=null)
			    		if(rs[0]!=null)
			    			SampleDispatch.setPatientName(rs[0].toString());
						if(rs[1]!=null)
							SampleDispatch.setPriority(rs[1].toString());
						if(rs[2]!=null)
							SampleDispatch.setBloodRequestId(Integer.parseInt(rs[2].toString()));
						if(rs[3]!=null)
							SampleDispatch.setWardName(rs[3].toString());
						if(rs[4]!=null)
							SampleDispatch.setSampleDispatchId(Integer.parseInt(rs[4].toString()));
							Date date =new Date();
							SampleDispatch.setCreatedDate(date);
							listDetails.add(SampleDispatch);
							SampleDispatch=null;

				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		return listDetails;
	
	}

	@Override
	public List<BloodRequest> getAllBloodRequestList(Integer unitId, HttpServletRequest request) {

		List<BloodRequest> lst = new ArrayList<BloodRequest>();

			 try {
				 //select s.idblood_request as bloodRequestId, s.blood_group as bloodGroup,s.patient_name as patientName,c.priority as priority_name from bb_blood_request s join bb_priority_master c on c.id_priority = s.priority   where s.status ='Y'
				//Added by Annapurna
				/* String sql="select s.idblood_request as bloodRequestId, s.blood_group as bloodGroup,s.patient_name as patientName,c.priority as priority_name ,  p.title AS  patient_title,  b. blood_group_name As bloodgroupname ,  s.title from bb_blood_request s join "
				 		+ "bb_priority_master c on c.id_priority = s.priority    JOIN " + 
				 		"    bb_blood_group_master b ON b.idblood_group = s.blood_group   JOIN" + 
				 		"    patient_title p ON p.patient_title_id = s.title  where s.status ='Y'";*/
				 String sql="select s.idblood_request as bloodRequestId, s.blood_group as bloodGroup,s.patient_name as patientName,c.priority as priority_name ,  b. blood_group_name As bloodgroupname  from bb_blood_request s join bb_priority_master c on c.id_priority = s.priority    JOIN bb_blood_group_master b ON b.idblood_group = s.blood_group    where s.status ='Y' ";
				 	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				 	query.setResultTransformer(Transformers.aliasToBean(BloodRequest.class));
				 	lst = query.list();
					
		            return lst;      
		        } catch(Exception e) {
		            e.printStackTrace();
		            return null;
		        }
	}

	@Override
	public boolean deleteBloodRequestetail(Integer id, HttpServletRequest request) {
		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			BloodRequest obj = (BloodRequest) sessionFactory.getCurrentSession()
					.get(BloodRequest.class, id);

			//obj.setStatus("N");
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;

		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	@Override
	public BloodRequest editRequestDetails(Integer id, HttpServletRequest request) {
      
		BloodRequest bloodRequest = new BloodRequest();
		
		List<BloodRequest> list = new ArrayList<BloodRequest>();
		
      Query query1=sessionFactory.getCurrentSession().createSQLQuery("select s.* from bb_blood_request s where s.status ='Y'  and s.idblood_request="+id);
      List<Object[]> result = query1.list();
        try {
            for (Object[] row : result) {

                if (row[0] != null)
                	bloodRequest
                            .setBloodRequestId(Integer.parseInt(row[0].toString()));
                else
                	bloodRequest.setBloodRequestId(0);

                if (row[1] != null) {
                	bloodRequest.setAge(row[1].toString());
                } else
                	bloodRequest.setAge("");

                if (row[2] != null) {
                	bloodRequest.setBedNumber(row[2].toString());

                }else 
                	bloodRequest.setBedNumber("");
              

                if (row[3] != null)
                	bloodRequest.setBloodGroup(row[3].toString());
              

                if (row[4] != null)
                	bloodRequest.setContactNo1(row[4].toString());
                else
                	bloodRequest.setContactNo1("");

                if (row[5] != null)
                	bloodRequest.setContactNo2(row[5]
                            .toString());
                else
                	bloodRequest.setContactNo2("");

                if (row[10] != null)
                	bloodRequest.setGender(Integer.parseInt(row[10]
                            .toString()));
                else
                	bloodRequest.setGender(0);

                if (row[11] != null)
                	bloodRequest.setHaemoglobin(row[11]
                            .toString());
                else
                	bloodRequest.setHaemoglobin("");
                
                if (row[12] != null)
                	bloodRequest.setHeight(row[12]
                            .toString());
                else
                	bloodRequest.setHeight("");
                
                if (row[12] != null)
                	bloodRequest.setHeight(row[12]
                            .toString());
                else
                	bloodRequest.setHeight("");
                
                if (row[14] != null)
                	bloodRequest.setPatientName(row[14]
                            .toString());
                else
                	bloodRequest.setPatientName("");
                
                if (row[15] != null)
                	bloodRequest.setPriority(Integer.parseInt(row[15]
                            .toString()));
                else
                	bloodRequest.setPriority(0);
                
                if (row[16] != null)
                	bloodRequest.setRemarks(row[16]
                            .toString());
                else
                	bloodRequest.setRemarks("");
                
                if (row[21] != null)
                	bloodRequest.setWardName(row[21]
                            .toString());
                else
                	bloodRequest.setWardName("");
                
                if (row[22] != null)
                	bloodRequest.setWeight(row[22]
                            .toString());
                else
                	bloodRequest.setWeight("");
               //Added By Annapurna
                if (row[25] != null)
                	bloodRequest.setWardName(row[25]
                            .toString());               
                else
                	bloodRequest.setTitle("");
                      // Added By Annapurna Fetching Component Data
                String sqlnew = "SELECT collection_volume FROM bb_blood_request_slave WHERE blood_request_master_id = "+bloodRequest.getBloodRequestId();
                SQLQuery sqlnewresult = sessionFactory.getCurrentSession().createSQLQuery(sqlnew);
                sqlnewresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
                
                list = sqlnewresult.list();
                
                bloodRequest.setLstBloodRequest(list);
                
            }
            
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<BloodRequestSlave> bloodRequestSlave = new ArrayList<BloodRequestSlave>();
        try {
            SQLQuery query = sessionFactory
                    .getCurrentSession()
                    .createSQLQuery(
                    
                            "select b.* from bb_blood_request s join bb_blood_request_slave b on b.blood_request_master_id = s.idblood_request where s.idblood_request ='"+ id +"'");
          
            List<Object[]> rows = query.list();
            for (Object[] row : rows) {
            	BloodRequestSlave bloodRequestSlave1 = new BloodRequestSlave();

                if (row[0] != null)
                	bloodRequestSlave1.setComponentId(Integer.parseInt(row[0]
                            .toString()));
                else
                	bloodRequestSlave1.setComponentId(0);

                if (row[1] != null)
                	bloodRequestSlave1.setCollectionVolume(row[1]
                            .toString());

                if (row[2] != null)
                	bloodRequestSlave1.setComponentName(row[2]
                            .toString());

                


                bloodRequestSlave.add(bloodRequestSlave1);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        bloodRequest.setBloodRequestSlave(bloodRequestSlave);

        return bloodRequest;

    }
	//Added By Annapurna 
	@Override
	public RegistrationDto getPatientDetailsByIdBloodrequest(int id, HttpServletRequest request) {
		RegistrationDto obj = new RegistrationDto();
		String sql="";
		String deptsql="select department_id from ehat_treatment where patient_id='"+id+"'";
		SQLQuery deptId=sessionFactory.getCurrentSession().createSQLQuery(deptsql);
		int departmentId=(int) deptId.uniqueResult();
		try {
			if(departmentId>0) {
			sql="select p.patient_id,t.treatment_id,p.f_name,p.m_name,p.l_name,concat(p.age,'Y','/',p.age_months,'M','/',p.age_days,'D') AS age," + 
						"t.weight,t.height,p.blood_group_id,t.department_id,p.mobile,p.relative_mb,p.gender,p.prefix from ehat_patient p join ehat_treatment t on p.patient_id=t.patient_id where t.t_flag='Y' AND t.patient_id='"+id+"'";
			}
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> doctorDetails = query.list();
			for (Object[] rs : doctorDetails) {
				
				if(rs[0]!=null)
					obj.setPatient_ID(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					obj.setTreatment_id(Integer.parseInt(rs[1].toString()));
				if(rs[2]!=null)
					obj.setfName(rs[2].toString());
				if(rs[3]!=null)
					obj.setmName(rs[3].toString());
				if(rs[4]!=null)
					obj.setlName(rs[4].toString());
				if(rs[5]!=null)
					obj.setAge1(rs[5].toString());
				if(rs[6]!=null)
					obj.setWeight(rs[6].toString());
				if(rs[7]!=null)
					obj.setHeight(Double.parseDouble(rs[7].toString()));
				if(rs[8]!=null)
					obj.setBloodGroup(rs[8].toString());
				if(rs[10]!=null)
					obj.setMobile(rs[10].toString());
				if(rs[11]!=null)
					obj.setOfficeNumber(rs[11].toString());
				if(rs[12]!=null)
					obj.setSex(rs[12].toString());
				if(rs[13]!=null)
					obj.setPrefix(rs[13].toString());
		
			}
			return obj;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}
	
	//Added
	@Override
	public BloodRequest getPatientDetailsByIdBloodrequestlist(int id, HttpServletRequest request) {
		BloodRequest bloodrequest = new BloodRequest();
		
		try {
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT s.idblood_request AS bloodRequestId,s.blood_group AS bloodGroup,s.patient_name AS patientName,c.priority AS priority_name,b.blood_group_name AS bloodgroupname " + 
					"FROM bb_blood_request s JOIN bb_priority_master c ON c.id_priority = s.priority JOIN bb_blood_group_master b ON b.idblood_group = s.blood_group WHERE s.idblood_request ='"+id+"' ");
			query.setResultTransformer(Transformers.aliasToBean(BloodRequest.class));
			List<BloodRequest>lstBloodRequest = query.list();
		
			bloodrequest.setLstBloodRequest(lstBloodRequest);
			
			
		}catch(Exception e) {
			e.printStackTrace();
		}		
		return bloodrequest;
	}
	@SuppressWarnings("unchecked")
	@Override
	public List<SampleDispatch> getAllBloodRequestSampleDispatchList(HttpServletRequest request,String fromDate,String lastDate) {

		List<SampleDispatch> listSampleDispatch = new ArrayList<SampleDispatch>();
		try {
			HttpSession session = request.getSession();
			int unitId = (int) session.getAttribute("uId");
			
			  Criteria criteria =
			  sessionFactory.getCurrentSession().createCriteria(SampleDispatch.class);	
			 criteria.add(Restrictions.eq("unitId", unitId));
			 criteria.add(Restrictions.eq("status", "Y"));
			 criteria.add(Restrictions.between("date", fromDate, lastDate));
			// criteria.add(Restrictions.eq("date", lastDate));
		
			 listSampleDispatch = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return listSampleDispatch;
	}

	
	@Override
	public int saveSampleTesting(SampleTesting sampleTesting, String listSampleObj, HttpServletRequest request) {
		try {
			Query query1 = sessionFactory.getCurrentSession()
					.createQuery("Update SampleDispatch set sampleTestingStatus='Y' where blood_requestid=' "+sampleTesting.getBloodRequestId()+"' ");
			query1.executeUpdate();
				
					if (sampleTesting.getSampletestingid() == 0) {
						sessionFactory.getCurrentSession().merge(sampleTesting);
						return 1;
					}
				
				else {
					
				//	listsampleTesting.setUpdatedBy(userId);
						 sessionFactory.getCurrentSession().merge(sampleTesting);
				            return 2;
					 }

			
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		return 0;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<SampleTesting> getAllBloodRequestSampleTestingList(HttpServletRequest request,Integer unitId) {

		
		List<SampleTesting> listSampleTesting = new ArrayList<SampleTesting>();
		SampleTesting stesting= new SampleTesting();
		List<BloodRequest> listBloodRequest = new ArrayList<BloodRequest>();
		
		try {
			/*
			 * HttpSession session = request.getSession(); //int unitId = (int)
			 * session.getAttribute("uId");
			 * 
			 * Criteria criteria =
			 * sessionFactory.getCurrentSession().createCriteria(SampleTesting.class);
			 * criteria.add(Restrictions.eq("unitId", unitId));
			 * criteria.add(Restrictions.eq("status", "Y"));
			 * criteria.add(Restrictions.eq("deleted", "N")); listSampleTesting =
			 * criteria.list();
			 * 
			 * for(SampleTesting row : listSampleTesting) {
			 * 
			 * Criteria criteria1 =
			 * sessionFactory.getCurrentSession().createCriteria(BloodRequest.class);
			 * criteria.add(Restrictions.eq("bloodRequestId", row.getBloodRequestId()));
			 * criteria.add(Restrictions.eq("status", "Y"));
			 * listBloodRequest = criteria1.list();
			 * 
			 * String patientName = listBloodRequest.get(0).getPatientName();
			 * 
			 * row.setPatient_name(patientName);
			 * 
			 * list.add(row);
			 * 
			 * }
			 * 
			 */		
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT st.sample_testing_id AS sampletestingid,br.idblood_request AS bloodRequestId,st.created_datetime AS createdDate,br.patient_name AS patientName FROM bb_bloodrequest_sample_testing st JOIN bb_blood_request br ON br.idblood_request = st.blood_requestid WHERE st.status = 'Y' AND deleted = 'N'");
			query.setResultTransformer(Transformers.aliasToBean(SampleTesting.class));
			listSampleTesting = query.list();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return listSampleTesting;
	}

	@Override
	public SampleTesting getBloodRequestSampleTesingListById(Integer bloodRequestId) {
		
		SampleTesting dto = new SampleTesting();
		try {
			/*
			 * Criteria criteria =
			 * sessionFactory.openSession().createCriteria(SampleTesting.class);
			 * criteria.add(Restrictions.eq("sampletestingid", sampletestingid));
			 * criteria.add(Restrictions.eq("deleted", "N")); dto = (SampleTesting)
			 * criteria.uniqueResult();
			 */
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT st.sample_testing_id AS sampletestingid,br.idblood_request AS bloodRequestId,st.created_datetime AS createdDate,br.patient_name AS patientName FROM bb_bloodrequest_sample_testing st JOIN bb_blood_request br ON br.idblood_request = st.blood_requestid WHERE st.status = 'Y' AND deleted = 'N' AND st.blood_requestid =  '"+bloodRequestId+"'");
			query.setResultTransformer(Transformers.aliasToBean(SampleTesting.class));
			List<SampleTesting>lstsampleTesting = query.list();
			
			dto.setListsampleTesting(lstsampleTesting);


		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public SampleTesting editSampleTesting(Integer sampletestingid,HttpServletRequest request) {
		// TODO Auto-generated method stub
		SampleTesting dto = new SampleTesting();
		try {
			
		//	Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT sb. sample_testing_id AS sampletestingid,br. patient_name  AS patientName,br.idblood_request As bloodRequestId , br.contact_no1 As contactNo1 , br.contact_no2 As contactNo2 , br.age , br.gender ,  bg.blood_group_name as bloodGrouptName ,   br.Weight ,   br.Ward_name As wardName,br.bed_number As bedNumber,br.height , br.haemoglobin  FROM bb_bloodrequest_sample_testing sb  JOIN  bb_blood_request br ON br.idblood_request = sb.blood_requestid  JOIN   bb_bloodrequest_sample_dispatch sd ON sd.blood_requestid = br.idblood_request JOIN bb_blood_group_master bg ON bg.idblood_group = br.blood_group WHERE sb.status = 'Y'AND sd.sampleTestingStatus = 'Y' AND   sb.deleted='N' AND sb.sample_testing_id = '"+sampletestingid+"' ");			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT sb. sample_testing_id AS sampletestingid,br. patient_name  AS patientName,br.idblood_request As bloodRequestId , br.contact_no1 As contactNo1 , br.contact_no2 As contactNo2 , br.age , br.gender , br.blood_group As bloodGroup ,   br.Weight ,   br.Ward_name As wardName,br.bed_number As bedNumber,br.height , br.haemoglobin  FROM bb_bloodrequest_sample_testing sb  JOIN  bb_blood_request br ON br.idblood_request = sb.blood_requestid  JOIN   bb_bloodrequest_sample_dispatch sd ON sd.blood_requestid = br.idblood_request WHERE sb.status = 'Y'AND sd.sampleTestingStatus = 'Y' AND   sb.deleted='N' AND sb.sample_testing_id =  '"+sampletestingid+"' ");
			query.setResultTransformer(Transformers.aliasToBean(SampleTesting.class));
			dto = (SampleTesting) query.uniqueResult();
			
			
			
			  List<SampleTesting_Slave> listsampleTestingSlave = new ArrayList<SampleTesting_Slave>();
			  Query query1= sessionFactory.getCurrentSession().createSQLQuery("SELECT  slave.sampletest_slave_id, slave.date , slave.remark AS remark,slave.result  , slave.test_name AS testName FROM bloodrequest_sampletesting_Slave slave JOIN bb_bloodrequest_sample_testing b ON slave.sampletest_master_id = b.sample_testing_id WHERE  slave.sampletest_master_id = '"+sampletestingid+"'");
				
			  @SuppressWarnings("unchecked")
			  List<Object[]> sampleTesting_Slavelist = query1.list();
			  for (Object[] row : sampleTesting_Slavelist) {
				  SampleTesting_Slave slave = new SampleTesting_Slave();
				  if (row[0] != null)
					  slave.setSampletestslaveid (Integer.parseInt(row[0].toString()));
					 
	                else
				  slave.setSampletestslaveid(0);

				  if (row[1] != null)
					  slave.setDate(row[1].toString());					 
	                else
	                	slave.setDate("");				  
				  if (row[2] != null)
				  slave.setRemark(row[2].toString());
	                else
				  slave.setRemark("");
				  
				  if (row[3] != null)
				  slave.setResult(row[3].toString());
	                else 
				  slave.setResult("");

				  if (row[4] != null)
				  slave.setTestName(row[4].toString());
	                else
				  slave.setTestName("");
				  

				  listsampleTestingSlave.add(slave);
			  }
			 
			  dto.setSampleTesting_Slave(listsampleTestingSlave);
		

			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}
	@Override
	public boolean deleteSampleTesting(Integer sampletestingid, HttpServletRequest request) {

		try {

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			SampleTesting obj = (SampleTesting) sessionFactory.getCurrentSession().get(SampleTesting.class, sampletestingid);
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
	public List<BloodRequest> searchDonorRequesterDetailsById(String searchParam,String callfrom,HttpServletRequest request) {
		List<BloodRequest> patientList = new ArrayList<BloodRequest>();
		String sql="";
		

		try {
			SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date cdate= new java.util.Date();
			 String nowDate = dateFormat.format(cdate );

			 if(callfrom.equalsIgnoreCase("crossMatchList")) {
				 sql="SELECT b. idblood_request, b. patient_name FROM bb_blood_request b   Join bb_component_seperation c ON c.blood_group=b.bloodgroupname Join bb_bloodrequest_sample_dispatch sd ON sd.blood_requestid=b.idblood_request WHERE (b.patient_name LIKE '%"+searchParam+"%' OR b.idblood_request LIKE '%"+searchParam+"%') AND sd.sampleTestingStatus = 'Y'  AND DATE(c.expiry_date) >='"+nowDate+"' GROUP BY c.id ";

				}
				else if (callfrom.equalsIgnoreCase("bloodRequsitionList")) {
					
				sql="SELECT b.idblood_request, b.patient_name FROM bb_blood_request b JOIN bb_component_seperation c ON c.blood_group = b.bloodgroupname JOIN bb_cross_match cr ON cr.bloodRequestId = b.idblood_request WHERE (b.patient_name LIKE '%"+searchParam+"%' OR b.idblood_request LIKE '%"+searchParam+"%') AND cr.requ_status >= '2' AND DATE(c.expiry_date) >= '"+nowDate+"' GROUP BY c.id";

				}
				else if (callfrom.equalsIgnoreCase("bloodIssueList")) {
				sql= "SELECT b.idblood_request, b.patient_name FROM bb_blood_request b JOIN bb_component_seperation c ON c.blood_group = b.bloodgroupname JOIN bb_cross_match cr ON cr.bloodRequestId = b.idblood_request WHERE (b.patient_name LIKE '%"+searchParam+"%' OR b.idblood_request LIKE '%"+searchParam+"%') AND cr.requ_status = '3'  AND cr.issueDeleted='N' AND DATE(c.expiry_date) >= '"+nowDate+"' GROUP BY c.id";

			
				}
				else if	(callfrom.equalsIgnoreCase("transfusionList")) {
					sql="SELECT distinct b.idblood_request, b.patient_name FROM bb_blood_request b JOIN bb_component_seperation c ON c.blood_group = b.bloodgroupname JOIN bb_transfusion_reaction t ON t.bloodRequestId = b.idblood_request WHERE (b.patient_name LIKE '%"+searchParam+"%' OR b.idblood_request LIKE '%"+searchParam+"%') AND t.status = 'Y' AND DATE(c.expiry_date) >= '"+nowDate+"' GROUP BY c.id";

				}
				else {
					sql="select idblood_request,patient_name from bb_blood_request where (patient_name like '%"+searchParam+"%' OR idblood_request like '%"+searchParam+"%' ) and status='Y'";
				}
			 
			Session session =sessionFactory.getCurrentSession();
			SQLQuery query = session.createSQLQuery(sql);
			List<Object[]> doctorDetails = query.list();
			for (Object[] rs : doctorDetails) {
				System.out.println("list>>"+rs.toString());
				BloodRequest obj = new BloodRequest();
				if(rs[0]!=null)
					obj.setBloodRequestId(Integer.parseInt(rs[0].toString()));
				if(rs[1]!=null)
					obj.setPatientName(rs[1].toString());
				patientList.add(obj);
			}
			return patientList;
		}
		 catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	//	return patientList;
	}
	@Override
	public List<CrossMatch> getAllCrossMatchList(Integer unitId, HttpServletRequest request) {

		List<CrossMatch> lst = new ArrayList<CrossMatch>();

			 try {
				 
				   SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
					 java.util.Date cdate= new java.util.Date();
					 String nowDate = dateFormat.format(cdate );

					HttpSession session = request.getSession();
				//	int unitId = (int) session.getAttribute("unitId");
					Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CrossMatch.class);

					criteria.add(Restrictions.eq("status", "Y"));
					criteria.add(Restrictions.eq("unitId",unitId));
					criteria.add(Restrictions.ge("requStatus",1));
				//	criteria.add( Restrictions.ge("expiryDate", nowDate) );
					lst = criteria.list();

				/*	Criteria cri= sessionFactory.getCurrentSession().createCriteria(CompatibilityType.class);
							 cri.add(Restrictions.eq("compatibilityType" , obj.getCompatibleType()));
							 com=(CompatibilityType) cri.uniqueResult();
							 obj.setCompatibilityTypeId(com.getCompatibilityTypeId());
							 */
					
					return lst;
	        } catch(Exception e) {
		            e.printStackTrace();
		            return null;
		        }
			
	}


	@Override
	public List<CrossMatch> getAllBloodRequisitonList(Integer unitId, HttpServletRequest request) {

		List<CrossMatch> lstBloodRequisition = new ArrayList<CrossMatch>();

 try {
	 
	 SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
	 java.util.Date cdate= new java.util.Date();
	 String nowDate = dateFormat.format(cdate );

		HttpSession session = request.getSession();
	//	int unitId = (int) session.getAttribute("unitId");
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CrossMatch.class);

		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("unitId",unitId));
		criteria.add(Restrictions.ge("requStatus",2));
		criteria.add(Restrictions.ge("expiryDate", nowDate) );
		lstBloodRequisition = criteria.list();
        return lstBloodRequisition;
	        } catch(Exception e) {
		            e.printStackTrace();
		            return null;
		        }
			
	}

	@Override
	public CrossMatch editBloodRequisiton(Integer id, HttpServletRequest request) {
		CrossMatch lst = new CrossMatch();
		try {

			Query query = sessionFactory.getCurrentSession().createSQLQuery(" SELECT br.Ward_name as wardName, br.Weight,br.age,br.idblood_request AS bloodRequestId,br.bed_number AS bedNumber,br.bloodgroupname,br.contact_no1 AS contactNo1,br.contact_no2 AS contactNo2,br.gender,br.haemoglobin,br.height,br.patient_name AS patientName,br.title,c.requisition_qty AS requisitionQty,c.requ_priority AS requPriority,p.priority , c.idcrossmatch as crossMatchId ,br.remarks FROM bb_cross_match c Join bb_blood_request br  on br.idblood_request=c.bloodRequestId Join bb_priority_master p on p.id_priority=br.priority WHERE c.idcrossmatch="+id+" ");
			query.setResultTransformer(Transformers.aliasToBean(CrossMatch.class));
			  lst = (CrossMatch) query.uniqueResult();
		

		} catch (Exception e) {
			e.printStackTrace();
		}
		return lst;
	}

	@Override
	public boolean deleteBloodRequisiton(Integer id, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			CrossMatch obj =	(CrossMatch)sessionFactory.getCurrentSession().get(CrossMatch.class, id);
			obj.setRequdDeleted("Y");
			obj.setDeletedDate(new Date(new java.util.Date().getTime()));
			obj.setDeletedBy(userId);
			sessionFactory.getCurrentSession().merge(obj);
			return true;
		}catch(Exception e){
			log.error("Exception----> ",e);
		}
		return false;
	}

	@Override
	public CrossMatch getBloodRequisitionById(Integer bloodRequestId) {
		
		List<CrossMatch> listBloodRequisition = new ArrayList<CrossMatch>();
		CrossMatch dto= new CrossMatch();
		try {
			 					
			
			Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT  c. idcrossmatch as crossMatchId, c.bloodRequestId as bloodRequestId, c.component_name as componentName , c.blood_bag as bloodBag , c.requ_priority as requPriority,c.requisition_qty  as requisitionQty ,c.expiry_date as expiryDate  from bb_cross_match c WHERE c.requ_status >= '2'  AND c.bloodRequestId ="+bloodRequestId+" ");
			query.setResultTransformer(Transformers.aliasToBean(CrossMatch.class));
			List<CrossMatch>lstcrossmatch = query.list();
			
			dto.setLstCrossMatch (lstcrossmatch);
 

		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
		
	}
	


		@Override
		public int deleteBloosIssueById(@RequestParam("id") int id, HttpServletRequest request) {
			
			try {
			
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				CrossMatch objb =	(CrossMatch)sessionFactory.getCurrentSession().get(CrossMatch.class, id);
				objb.setIssueDeleted("Y");
				objb.setDeletedDate(new Date(new java.util.Date().getTime()));
				objb.setDeletedBy(userId);
				sessionFactory.getCurrentSession().merge(objb);
				return 1;
			
		
		
	} catch (Exception e) {
		
		e.printStackTrace();
		
		return 2;
	}
}

		@Override
		public List<CrossMatch> getAllBloodIssueList(Integer unitId, HttpServletRequest request) {

			List<CrossMatch> lstBloodIssue = new ArrayList<CrossMatch>();

	 try {
		 
		 SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
		 java.util.Date cdate= new java.util.Date();
		 String nowDate = dateFormat.format(cdate );

			HttpSession session = request.getSession();
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(CrossMatch.class);

		    criteria.add(Restrictions.eq("issueDeleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("requStatus",3));
	      	criteria.add(Restrictions.ge("expiryDate", nowDate) );
			lstBloodIssue = criteria.list();
	        return lstBloodIssue;
		        } catch(Exception e) {
			            e.printStackTrace();
			            return null;
			        }
				
		}
		
		@Override
		public CrossMatch getBloodIssueById(Integer bloodRequestId) {
			
			List<CrossMatch> objlist = new ArrayList<CrossMatch>();
			CrossMatch obj= new CrossMatch();
			try {
				 					
				
				Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT c.idcrossmatch AS crossMatchId, c.bloodRequestId AS bloodRequestId,c.component_name AS componentName,c.blood_bag AS bloodBag,c.require_qty AS requireQty,c.requisition_qty AS requisitionQty,c.expiry_date AS expiryDate ,c.issue_qty As  issueQty ,c.issue_remark As issueRemark FROM bb_cross_match c WHERE c.requ_status = '3'   AND c.issueDeleted='N' AND c.bloodRequestId = "+bloodRequestId +" ");
				query.setResultTransformer(Transformers.aliasToBean(CrossMatch.class));
				List<CrossMatch>lstcrossmatch = query.list();
				
				obj.setLstCrossMatch (lstcrossmatch);
	 

			} catch (Exception e) {
				e.printStackTrace();
			}
			return obj;
			
		}
		
		@Override
		public List<TransfusionReaction> getTransfusionDetails(Integer id,HttpServletRequest request) {
			List<TransfusionReaction> objt=new ArrayList<TransfusionReaction>();

			try {
				/*
				 * HttpSession session = request.getSession(); int unitId = (int)
				 * session.getAttribute("uId"); Criteria
				 * criteria=sessionFactory.getCurrentSession().createCriteria(
				 * TransfusionReaction.class); criteria.add(Restrictions.eq("status", "Y"));
				 * criteria.add(Restrictions.eq("unitId",unitId));
				 * criteria.add(Restrictions.eq("bloodRequestId", id)); 
				 * lsttransfusionDetails = criteria.list();
				 */
				
				Query query= sessionFactory.getCurrentSession().createSQLQuery("SELECT distinct t.idtransfusion As transfusionId,c.idcrossmatch AS crossMatchId, t.bloodRequestId AS bloodRequestId,t.component_name AS componentName,t.blood_bag AS bloodBag,t.expiry_date AS expiryDate,t.component_volume As componentVolume ,t.issue_qty AS issueQty,t.trans_qty AS transQty FROM bb_transfusion_reaction t JOIN  bb_cross_match c On c.bloodRequestId=t.bloodRequestId WHERE t.status='Y' AND t.deleted_by = 0 AND c.bloodRequestId="+id+"  group by t.idtransfusion ");
				query.setResultTransformer(Transformers.aliasToBean(TransfusionReaction.class));
				objt = query.list();
					
				
	 
			}catch(Exception e) {
				log.error("Exception----> ",e);
			}
			return objt;
		
			
		}
		
		@Override
		public List<TransfusionReaction> getAllBloodTransfusionList(Integer unitId, HttpServletRequest request) {

			List<TransfusionReaction> lstBloodTransfusion = new ArrayList<TransfusionReaction>();

	 try {
		 
		 SimpleDateFormat dateFormat= new SimpleDateFormat("yyyy-MM-dd");
		 java.util.Date cdate= new java.util.Date();
		 String nowDate = dateFormat.format(cdate );

			 String sql="SELECT distinct t.idtransfusion As transfusionId,c.idcrossmatch AS crossMatchId, t.bloodRequestId AS bloodRequestId,t.component_name AS componentName,t.blood_bag AS bloodBag,t.expiry_date AS expiryDate,t.component_volume As componentVolume ,t.issue_qty AS issueQty,t.trans_qty AS transQty FROM bb_transfusion_reaction t JOIN  bb_cross_match c On c.bloodRequestId=t.bloodRequestId WHERE t.status='Y' AND t.deleted_by = 0  AND  DATE(c.expiry_date) >= '"+nowDate+"'   group by t.idtransfusion";
			 	SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 	query.setResultTransformer(Transformers.aliasToBean(TransfusionReaction.class));
			 	lstBloodTransfusion = query.list();

		        } catch(Exception e) {
			            e.printStackTrace();
			            return null;
			        }
	return lstBloodTransfusion;
				
		}
		@Override
		public int deleteBloodTransfusionById(@RequestParam("id") int id, HttpServletRequest request) {
			
			try {
			
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				TransfusionReaction objb =	(TransfusionReaction)sessionFactory.getCurrentSession().get(TransfusionReaction.class, id);
				objb.setDeletedDate(new Date(new java.util.Date().getTime()));
				objb.setDeletedBy(userId);
				sessionFactory.getCurrentSession().merge(objb);
				return 1;
			
		
		
	} catch (Exception e) {
		
		e.printStackTrace();
		
		return 2;
	}
}

		@Override
		public CrossMatch editBloodIssueDeatils(Integer id, HttpServletRequest request) {
			CrossMatch lst = new CrossMatch();
			try {

				Query query = sessionFactory.getCurrentSession().createSQLQuery(" SELECT br.Ward_name as wardName, br.Weight,br.age,br.idblood_request AS bloodRequestId,br.bed_number AS bedNumber,br.bloodgroupname,br.contact_no1 AS contactNo1,br.contact_no2 AS contactNo2,br.gender,br.haemoglobin,br.height,br.patient_name AS patientName,br.title,c.requisition_qty AS requisitionQty,c.requ_priority AS requPriority,p.priority , c.idcrossmatch as crossMatchId ,br.remarks,  c.issue_qty as issueQty,c.issue_remark as issueRemark FROM bb_cross_match c Join bb_blood_request br  on br.idblood_request=c.bloodRequestId Join bb_priority_master p on p.id_priority=br.priority WHERE c.idcrossmatch="+id+" ");
				query.setResultTransformer(Transformers.aliasToBean(CrossMatch.class));
				  lst = (CrossMatch) query.uniqueResult();
			

			} catch (Exception e) {
				e.printStackTrace();
			}
			return lst;
		}

		@Override
		public Integer validateCrossMatchRecord(String compName, Integer bloodBagid, Integer bloodrequestId) {
			// TODO Auto-generated method stub
			
			Integer result = 0;
			try {
				
				String sql = "SELECT COUNT(*) FROM bb_cross_match WHERE componentName = '"+compName+"' AND bloodRequestId = '"+bloodrequestId+"' AND bloodBagId = '"+bloodBagid+"' AND status = 'Y'";
				System.out.println("sqll**** "+sql);
				Query sqlresult = sessionFactory.getCurrentSession().createQuery(sql);
				result = ((Number) sqlresult.uniqueResult()).intValue();
				
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			return result;
		}


}
	
	
	