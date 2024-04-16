package com.hms.daoimpl;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.math.BigInteger;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import com.hms.administrator.dto.Test;
import com.hms.dao.RadiologyDetailDao;
import com.hms.dto.Doctor;
import com.hms.dto.RadiologyAssisgnTestDTO;
import com.hms.dto.RadiologyDTO;
import com.hms.dto.RadiologyTemplateReportDTO;
import com.hms.dto.RadiologyTestDto;
import com.hms.dto.RisImageUploadDTO;
import com.hms.dto.RisImageUploadDTONew;
import com.hms.dto.TestDTO;
import com.hms.dto.ViewRisRecordsDTO;
import com.hms.ehat.dto.AnswerDR;
import com.hms.ehat.dto.LabSlavePojo;
import com.hms.ehat.dto.PatientInvestigationsDTO;
import com.hms.ehat.dto.QuestionDR;
import com.hms.ehat.dto.QuestionMaster;
import com.hms.ehat.dto.RadiologyFileMasterDTO;
import com.hms.ehat.dto.RisTempateDto;
import com.hms.ehat.dto.TemplateIPDHistory;
import com.hms.ehat.dto.TemplateIPDHistoryDto;
import com.hms.pharmacy.upload.FilePath;

@Repository
public class RadiologyDetailDaoImpl implements RadiologyDetailDao{

	@Autowired
	SessionFactory sessionFactory;
		
	
	public RadiologyDTO getAllRadiologyDetail(HttpServletRequest request,String tId,String type,String flag,int doctorId){

		RadiologyDTO risDetailList = new RadiologyDTO();
		try{
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);
	if(type.equalsIgnoreCase("onload")){
			if(flag.equals("1")){
				System.out.println("Current in onload");
				
				risDetailList=getAllRadiologyDetail1( request, tId, type, flag, doctorId);
				
				
				/*
				criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
                criteria.add(Restrictions.le("assignDate", new Date()));
                criteria.add(Restrictions.ge("assignDate", new Date()));
			    criteria.addOrder(Order.desc("assignDate"));
				
					  if(doctorId > 0) { criteria.add(Restrictions.eq("doctorId",doctorId)); }
					  criteria.setMaxResults(20); List<RadiologyDTO> radiologyDTO =
					  criteria.list(); risDetailList.setListRadiologyDTO(radiologyDTO);
					 */
				

			}else{
				System.out.println("Prev in onload");
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.addOrder(Order.desc("assignDate"));
				if(doctorId > 0) {
					criteria.add(Restrictions.eq("doctorId",doctorId));
				}
			    criteria.setMaxResults(20);
			    List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
				
				try {
					List<RadiologyDTO> testVerifyList = risDetailList.getListRadiologyDTO().stream()
					        .filter(risViewInstance -> getIsVerifyTest(risViewInstance.getTreatmentId()) >= 1)
					        .collect(Collectors.toList());
					risDetailList.getListRadiologyDTO().clear();
					risDetailList.setListRadiologyDTO(testVerifyList);
				} catch (Exception e) {
					e.printStackTrace();
					return risDetailList;
				}
			}
			
		}else{
			if(flag.equals("1")){
				criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				if(doctorId > 0) {
					criteria.add(Restrictions.eq("doctorId",doctorId));
				}
		//		criteria.add(Restrictions.eq("uhid", patId));				// added by aniket kanse, 26/8/22, to search patient against UHID
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}else{
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				if(doctorId > 0) {
					criteria.add(Restrictions.eq("doctorId",doctorId));
				}
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}
		}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	
	}
		return risDetailList;
	}
	
	
	private long getIsVerifyTest(int treatment_id) {
		Criteria viewRisInstance = sessionFactory.getCurrentSession().createCriteria(ViewRisRecordsDTO.class);
		viewRisInstance.add(Restrictions.eq("treatmentId", treatment_id));
		viewRisInstance.add(Restrictions.eq("verifyFlag", 'Y'));
		viewRisInstance.setProjection(Projections.rowCount());
		Long verifyTest = (Long) viewRisInstance.uniqueResult();
		return verifyTest != null ? verifyTest : 0;
	}


	public RadiologyDTO getAllRadiologyDetail1(HttpServletRequest request,String tId,String type,String flag,int doctorId) {
		RadiologyDTO risDetailList = new RadiologyDTO();
		  try {
			  
			  String fd="";
			  Date date = Calendar.getInstance().getTime();
			    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
			     fd = dateFormat.format(date);
			  
			  String sql="SELECT    etr.patient_id AS patientId, CONCAT(ep.prefix,' ', ep.f_name,' ', ep.m_name, ' ', ep.l_name) AS patientName, ep.center_patient_id AS uhid, ep.age AS patientAge, ep.gender AS patientGender, etr.t_flag AS treatmentFlag, etr.treatment_id AS treatmentId," + 
			  		"        rs.idradiology_test AS idradiologyTest,     rs.idtest_radiology AS idtestRadiology, rs.radiologyUrgentflag AS radUrgentFlag, rs.idradiology_test_name AS idradTestName, rs.radiologyTestStatus AS radTestStatus, rs.assign_date AS assignDate," + 
			  		"        rs.takenTime AS takenTime,  rs.arrivalTime AS arrivalTime,       rs.radiologyRISFlag AS radRISFlag,  rs.checkUpDoneFlag AS checkUpDoneFlag,es.category_name AS testName,etr.department_id AS deptId, IFNULL(ertr.status, '-') AS reportStatus,IFNULL(`cs`.`category_name`, 'Self') AS `categoryName`," + 
			  		"        (SELECT ehat_subservice.category_name  FROM  ehat_subservice  WHERE  (ehat_subservice.id = es.selfId)) AS groupName, IFNULL((SELECT   doctor.doc_name    FROM  doctor    WHERE (doctor.Doctor_ID = rs.doctor_id)),  '-') AS doctorName," + 
			  		"        rs.doctor_id AS doctorId   FROM  ((((((ehat_patient ep  JOIN ehat_treatment etr) JOIN radiology_file_master rm)  JOIN radiology_assign_test rs) JOIN ehat_subservice es)        LEFT JOIN ehat_radiology_test_report ertr ON ((ertr.radiology_test_id = rs.idradiology_test)))  LEFT JOIN `ehat_charges_master_slave` `cs` ON ((`etr`.`charges_slave_id` = `cs`.`id`)))  WHERE        "
			  		+ "    ((rm.idradiology_file_master = rs.idradiology_file_master)  AND (rs.idtest_radiology = es.id) AND (etr.treatment_id = rm.treatment_id)  AND (ep.patient_id = etr.patient_id)  AND (rs.ris_refund = 'N'))  and rs.radiologyTestStatus='Y' and SUBSTR(rs.assign_date, 1, 10) ='"+fd+"'  ";
			  		
			  		
			  // and  etr.t_flag='Y'
			 
			  if(doctorId > 0) {
			  			sql=sql+ " and rs.doctor_id="+doctorId+" ";
			  		}
			  		
			  		sql=sql+ "ORDER BY ep.patient_id DESC ";
			  
			  SQLQuery quersySp  = sessionFactory.getCurrentSession().createSQLQuery(sql);
			  quersySp.setResultTransformer(new AliasToBeanResultTransformer(RadiologyDTO.class));
			      @SuppressWarnings("unchecked")
				List<RadiologyDTO> lst = quersySp.list();
			      risDetailList.setListRadiologyDTO(lst);
			  
		  }catch (Exception e) {
			e.printStackTrace();
			
			 
		}
		return risDetailList;
	}
	
	public RadiologyDTO getAllFromBegining(HttpServletRequest request,String tId,String type,String flag){

		RadiologyDTO risDetailList = new RadiologyDTO();
		try{
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);
			if(flag.equals("1")){
			//	criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				 criteria.addOrder(Order.desc("assignDate"));
				
				criteria.setMaxResults(20);
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}
			else{
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.addOrder(Order.desc("assignDate"));
				
			    criteria.setMaxResults(20);
			    List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	

				try {
					List<RadiologyDTO> testVerifyList = risDetailList.getListRadiologyDTO().stream()
					        .filter(risViewInstance -> getIsVerifyTest(risViewInstance.getTreatmentId()) >= 1)
					        .collect(Collectors.toList());
					risDetailList.getListRadiologyDTO().clear();
					risDetailList.setListRadiologyDTO(testVerifyList);
				} catch (Exception e) {
					e.printStackTrace();
					return risDetailList;
				}
				
			}
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	
	}
		return risDetailList;
	}
	public RadiologyDTO getAllRadiologyDetailByDate(HttpServletRequest request,String todays_date,String type,String flag) {

		RadiologyDTO risDetailList = new RadiologyDTO();
		try{
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				"yyyy-MM-dd");
		Date todays_dt1 = formatter.parse(todays_date);
			if(flag.equals("1")){
			//	criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.ge("assignDate", todays_dt1));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}else{
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.ge("assignDate", todays_dt1));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}

	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
		return risDetailList;
	}
	
	public RadiologyDTO getAllRadiologyDetailByyestrDay(HttpServletRequest request,String yestrDay,String type,String flag) {

		RadiologyDTO risDetailList = new RadiologyDTO();
		try{
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);

		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
				"yyyy-MM-dd");
		Date tod_d = new Date(new java.util.Date().getTime());
		
		Date yestrDay1 = formatter.parse(yestrDay);
		String tod_dt = formatter.format(tod_d);
		Date toDay1 = formatter.parse(tod_dt);
		
			if(flag.equals("1")){
			//	criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.ge("assignDate", yestrDay1));
				criteria.add(Restrictions.lt("assignDate", toDay1));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}else{
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.ge("assignDate", yestrDay1));
				criteria.add(Restrictions.le("assignDate", toDay1));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}
		
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	
	}
		return risDetailList;
	}
	public RadiologyDTO searchPatienByName(HttpServletRequest request,String patName,String type,String flag,String textType,int patientId) {

		RadiologyDTO risDetailList = new RadiologyDTO();
		try{
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);
		if(patName != ""){
		if(textType.equalsIgnoreCase("inputString")){
			
			System.err.println("Vikas patName "+patName);
			
			if(flag.equals("1")){
			//	criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.like("patientName", "%"+patName+"%"));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}else{
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.like("patientName", "%"+patName+"%"));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}
		
		}else{
			
		//	int patId=Integer.parseInt(patName);
		//	System.err.println("Vikas patName "+patId);
			
			if(flag.equals("1")){
			//	criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.sqlRestriction(" patient_id LIKE '%"+patientId+"%' "));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}else{
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
				criteria.add(Restrictions.sqlRestriction(" patient_id LIKE '%"+patientId+"%' "));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}
			
			
		}	
		}
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	
	}
		
		return risDetailList;
	}
	
	public RadiologyDTO searchPatienBetweenDate1(HttpServletRequest request,String date1,String date2,String type,String flag) {

		RadiologyDTO risDetailList = new RadiologyDTO();
		List<RadiologyDTO> lstTest=new ArrayList<RadiologyDTO>();
		try{
		
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);
		
		
		
	   final java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	 
		date1 = date1  +" 00:00:00";
		date2 = date2 +" 23:59:59";
		 Date fDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date1);
         Date tDate = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(date2);
		System.out.println("date1>>>>>>>>>> "+fDate);
		System.out.println("date2>>>>>>>>>> "+tDate);
		
			if(flag.equals("1")){
				
				  System.out.println("Current in Srch");
				  criteria.add(Restrictions.eq("treatmentFlag", "Y"));
				  criteria.add(Restrictions.eq("radTestStatus", "Y"));
				 criteria.add(Restrictions.ge("assignDate", fDate));
				  criteria.add(Restrictions.le("assignDate", tDate));
				  //criteria.add(Restrictions.between("assignDate", fDate,tDate));
				  List<RadiologyDTO> radiologyDTO = criteria.list();
				  risDetailList.setListRadiologyDTO(radiologyDTO);
				 
			}else{
				System.out.println("Prev in Srch");
				criteria.add(Restrictions.eq("treatmentFlag", "N"));
				criteria.add(Restrictions.eq("radTestStatus", "Y"));
			//	criteria.add(Restrictions.between("assignDate", fDate,tDate)); 
				criteria.add(Restrictions.ge("assignDate", fDate)); 
				criteria.add(Restrictions.le("assignDate", tDate)); 
				//criteria.add(Restrictions.lt("assignDate", tDate));
				List<RadiologyDTO> radiologyDTO = criteria.list();	
				risDetailList.setListRadiologyDTO(radiologyDTO);	
			}
 }
		catch (Exception e) {
		e.printStackTrace();
		return null;
	
	}
		
		return  risDetailList;
	}
	
	public RadiologyDTO searchPatienBetweenDate(HttpServletRequest request,String date1,String date2,String type,String flag) {
		RadiologyDTO risDetailList = new RadiologyDTO();
		  try {
				if(flag.equals("1")) {
					 String sql="SELECT etr.patient_id AS patientId, CONCAT(ep.prefix,' ', ep.f_name,' ', ep.m_name, ' ', ep.l_name) AS patientName, ep.center_patient_id AS uhid, ep.age AS patientAge, ep.gender AS patientGender, etr.t_flag AS treatmentFlag, etr.treatment_id AS treatmentId," + 
						  		"        rs.idradiology_test AS idradiologyTest,     rs.idtest_radiology AS idtestRadiology, rs.radiologyUrgentflag AS radUrgentFlag, rs.idradiology_test_name AS idradTestName, rs.radiologyTestStatus AS radTestStatus, rs.assign_date AS assignDate," + 
						  		"        rs.takenTime AS takenTime,  rs.arrivalTime AS arrivalTime,       rs.radiologyRISFlag AS radRISFlag,  rs.checkUpDoneFlag AS checkUpDoneFlag,es.category_name AS testName,etr.department_id AS deptId, IFNULL(ertr.status, '-') AS reportStatus,IFNULL(`cs`.`category_name`, 'Self') AS `categoryName`," + 
						  		"        (SELECT ehat_subservice.category_name  FROM  ehat_subservice  WHERE  (ehat_subservice.id = es.selfId)) AS groupName, IFNULL((SELECT   doctor.doc_name    FROM  doctor    WHERE (doctor.Doctor_ID = rs.doctor_id)),  '-') AS doctorName," + 
						  		"        rs.doctor_id AS doctorId   FROM  ((((((ehat_patient ep  JOIN ehat_treatment etr) JOIN radiology_file_master rm)  JOIN radiology_assign_test rs) JOIN ehat_subservice es)        LEFT JOIN ehat_radiology_test_report ertr ON ((ertr.radiology_test_id = rs.idradiology_test))) LEFT JOIN `ehat_charges_master_slave` `cs` ON ((`etr`.`charges_slave_id` = `cs`.`id`)))  WHERE        "
						  		+ "    ((rm.idradiology_file_master = rs.idradiology_file_master)  AND (rs.idtest_radiology = es.id) AND (etr.treatment_id = rm.treatment_id)  AND (ep.patient_id = etr.patient_id)  AND (rs.ris_refund = 'N'))  and rs.radiologyTestStatus='Y' and SUBSTR(rs.assign_date, 1, 10) >='"+date1+"'and SUBSTR(rs.assign_date, 1, 10) <='"+date2+"'  ORDER BY ep.patient_id DESC ";
					 SQLQuery quersySp  = sessionFactory.getCurrentSession().createSQLQuery(sql);
					  quersySp.setResultTransformer(new AliasToBeanResultTransformer(RadiologyDTO.class));
					      @SuppressWarnings("unchecked")
						List<RadiologyDTO> lst = quersySp.list();
					      risDetailList.setListRadiologyDTO(lst);
					      
					      // and  etr.t_flag='Y'
				}
				else {
					 String sql="SELECT  etr.patient_id AS patientId, CONCAT(ep.prefix,' ', ep.f_name,' ', ep.m_name, ' ', ep.l_name) AS patientName, ep.center_patient_id AS uhid, ep.age AS patientAge, ep.gender AS patientGender, etr.t_flag AS treatmentFlag, etr.treatment_id AS treatmentId," + 
						  		"        rs.idradiology_test AS idradiologyTest,     rs.idtest_radiology AS idtestRadiology, rs.radiologyUrgentflag AS radUrgentFlag, rs.idradiology_test_name AS idradTestName, rs.radiologyTestStatus AS radTestStatus, rs.assign_date AS assignDate," + 
						  		"        rs.takenTime AS takenTime,  rs.arrivalTime AS arrivalTime,       rs.radiologyRISFlag AS radRISFlag,  rs.checkUpDoneFlag AS checkUpDoneFlag,es.category_name AS testName,etr.department_id AS deptId, IFNULL(ertr.status, '-') AS reportStatus,IFNULL(`cs`.`category_name`, 'Self') AS `categoryName`," + 
						  		"        (SELECT ehat_subservice.category_name  FROM  ehat_subservice  WHERE  (ehat_subservice.id = es.selfId)) AS groupName, IFNULL((SELECT   doctor.doc_name    FROM  doctor    WHERE (doctor.Doctor_ID = rs.doctor_id)),  '-') AS doctorName," + 
						  		"        rs.doctor_id AS doctorId   FROM  ((((((ehat_patient ep  JOIN ehat_treatment etr) JOIN radiology_file_master rm)  JOIN radiology_assign_test rs) JOIN ehat_subservice es)        LEFT JOIN ehat_radiology_test_report ertr ON ((ertr.radiology_test_id = rs.idradiology_test))) LEFT JOIN `ehat_charges_master_slave` `cs` ON ((`etr`.`charges_slave_id` = `cs`.`id`)))  WHERE        "
						  		+ "    ((rm.idradiology_file_master = rs.idradiology_file_master)  AND (rs.idtest_radiology = es.id) AND (etr.treatment_id = rm.treatment_id)  AND (ep.patient_id = etr.patient_id)  AND (rs.ris_refund = 'N')) and  etr.t_flag='N' and rs.radiologyTestStatus='Y' and SUBSTR(rs.assign_date, 1, 10) >='"+date1+"'and SUBSTR(rs.assign_date, 1, 10) <='"+date2+"'  ORDER BY ep.patient_id DESC ";
					 SQLQuery quersySp  = sessionFactory.getCurrentSession().createSQLQuery(sql);
					  quersySp.setResultTransformer(new AliasToBeanResultTransformer(RadiologyDTO.class));
					      @SuppressWarnings("unchecked")
						List<RadiologyDTO> lst = quersySp.list();
					      risDetailList.setListRadiologyDTO(lst);
				}
			  
			 				
			 
			  
		  }catch (Exception e) {
			e.printStackTrace();
		  }
		return risDetailList;
			 
		}
	
	
	
	public int sendToRis(RadiologyDTO radiologyDTO,LabSlavePojo labSlvpo,HttpServletRequest request){
		
		HttpSession session = request.getSession();
		
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		RadiologyFileMasterDTO  radmst = new RadiologyFileMasterDTO();
		//setting values
		radmst.setInsertedBy(userId);
		radmst.setInsertedDatetime(new Date(new java.util.Date().getTime()));
		radmst.setPatientId(radiologyDTO.getPatientId());
		radmst.setTreatmentId(radiologyDTO.getTreatmentId());
		radmst.setUnitId(unitId);
		
		try{
		for (LabSlavePojo lpojo : labSlvpo.getSubSrvList()) {
			String checkBillId="select * from radiology_assign_test where bill_details_id='"+lpojo.getBilDetId()+"' ";
			Query query = sessionFactory.getCurrentSession().createSQLQuery(checkBillId);
			if(query.list().size()>0){
				return -1;
			}
		}
		
		int  radMstId =(Integer) sessionFactory.getCurrentSession().save(radmst);
		
		for (LabSlavePojo lpojo : labSlvpo.getSubSrvList()) {
		
			if (lpojo.getServiceId()==12) {
				String servicecheck = "select count(*) from radiology_assign_test where bill_details_id='"+lpojo.getBilDetId()+"'"	+ " and idtest_radiology= '"+ lpojo.getSubSrvid() +"'";  // added Rohini
				Query q= sessionFactory.getCurrentSession().createSQLQuery(servicecheck);
			int serCount =	((BigInteger) q.uniqueResult()).intValue();
				
			if(serCount == 0 ) {
					
				SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery("" +
		  		 		 "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyUrgentflag,radiologyRISFlag,bill_details_id,doctor_id) values(?,?,?,?,?,?,?,?,?)");
		  		 		 insertQuery1.setParameter(0,radMstId);
		  		 		 insertQuery1.setParameter(1,lpojo.getSubSrvid());
		  				 insertQuery1.setParameter(2,lpojo.getTotalBillAmt() );
		  				 insertQuery1.setParameter(3, userId);
		  				 insertQuery1.setParameter(4,new Date());
		  				 insertQuery1.setParameter(5,radiologyDTO.getRadUrgentFlag());
		  				 insertQuery1.setParameter(6,'Y');
		  				 insertQuery1.setParameter(7,lpojo.getBilDetId());
		  				 insertQuery1.setParameter(8,lpojo.getDoctorId());
		  				 insertQuery1.executeUpdate();
		  				 
		  				 
		  				 
		  				 String deptSql=" select department_id from ehat_treatment where treatment_id="+radiologyDTO.getTreatmentId()+" ";
		  				Query deptQ = sessionFactory.getCurrentSession().createSQLQuery(deptSql);
				  		int deptId = ((Number) deptQ.uniqueResult()).intValue();
		  				 
		  				 if(deptId ==1 || deptId ==3  ) {
					  		String sql="update ehat_bill_details set sndtorisflag='Y' where bill_details_id='"+lpojo.getBilDetId()+"'";            
					  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
					  		int response = updateSql.executeUpdate();
		  				 }else if(deptId ==2) {
		  					String sql="update ehat_bill_details_ipd set sndtorisflag='Y' where bill_details_id='"+lpojo.getBilDetId()+"'";            
					  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
					  		int response = updateSql.executeUpdate();
		  				 }
			  }
			}
		}
		
	   /* String sql ="";
		try{
			for (LabSlavePojo lpojo : labSlvpo.getSubSrvList()) {
		
			 sql = "select count(*) from radiology_file_master where treatment_id = '"+radiologyDTO.getTreatmentId()+"'";
			 int count_id=((BigInteger)sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult()).intValue();
			 System.out.println("count_id "+count_id);
			 if (count_id < 1) {
				 System.out.println("count_id "+count_id);
				 SQLQuery sql2 = sessionFactory.getCurrentSession().createSQLQuery("INSERT INTO radiology_file_master(treatment_id,radio_total,idbill) values(?,?,?)");
				 sql2.setParameter(0,radiologyDTO.getTreatmentId());
				 sql2.setParameter(1,lpojo.getTotalBillAmt());
				 sql2.setParameter(2,lpojo.getBilDetId());
				 sql2.executeUpdate();
				 
			 }
			 
			 String sql1 = "select max(idradiology_file_master) from radiology_file_master where treatment_id='"+radiologyDTO.getTreatmentId()+"'";
			 int idradiology_file_master = ((Integer)sessionFactory.getCurrentSession().createSQLQuery(sql1).uniqueResult()).intValue();

			SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery("" +
	  		 		 "INSERT INTO radiology_assign_test(idradiology_file_master,idtest_radiology,test_amount,asign_by,assign_date,radiologyUrgentflag,radiologyRISFlag) values(?,?,?,?,?,?,?)");
	  		 		 insertQuery1.setParameter(0,idradiology_file_master);
	  		 		 insertQuery1.setParameter(1,lpojo.getSubSrvid());
	  				 insertQuery1.setParameter(2,lpojo.getTotalBillAmt() );
	  				 insertQuery1.setParameter(3, userId);
	  				 insertQuery1.setParameter(4,new Date());
	  				 insertQuery1.setParameter(5,radiologyDTO.getRadUrgentFlag());
	  				 insertQuery1.setParameter(6,'Y');
	  				 insertQuery1.executeUpdate();
	  				 
	  		sql="update ehat_bill_details set sndtorisflag='Y' where bill_details_id='"+lpojo.getBilDetId()+"'";            
	  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
	  		int response = updateSql.executeUpdate();
		}	*/
			
		}catch(Exception e){
			e.printStackTrace();
			return 0;
		}
		return 1;

	}
	
	public int setArrivalTime(RadiologyDTO radiologyDTO,int isSelected,HttpServletRequest request){
		
		int isInsert= 0;
		String sql = "";
		try{
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss aa");
			Calendar cal = Calendar.getInstance();
			String strDate = dateFormat.format(cal.getTime());
			
		if(radiologyDTO.getIdtestRadiology() != 0 && isSelected == 1){
			
			sql = "UPDATE radiology_assign_test SET arrivalTime='"+strDate+"' where idtest_radiology="+radiologyDTO.getIdtestRadiology()+" and idradiology_test="+radiologyDTO.getIdradiologyTest();
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			isInsert = query.executeUpdate();
			isInsert = 1;
		}else{

			sql = "UPDATE radiology_assign_test SET arrivalTime='0' where idtest_radiology="+radiologyDTO.getIdtestRadiology()+" and idradiology_test="+radiologyDTO.getIdradiologyTest();
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			isInsert = query.executeUpdate();
			isInsert = 2;
		}
		
		}catch(Exception e){
			System.out.println("database error...could not Update : "+ e.getMessage());
			e.printStackTrace();
			isInsert = 0;
		}
		return isInsert;
	}
	
public int setTakenTime(RadiologyDTO radiologyDTO,int isSelected,HttpServletRequest request){
		
		int isInsert= 0;
		String sql = "";
		try{
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss aa");
			Calendar cal = Calendar.getInstance();
			String strDate = dateFormat.format(cal.getTime());
			
		if(radiologyDTO.getIdtestRadiology() != 0 && isSelected == 1){
			
			sql = "UPDATE radiology_assign_test SET takenTime ='"+strDate+"' where idtest_radiology="+radiologyDTO.getIdtestRadiology()+" and idradiology_test="+radiologyDTO.getIdradiologyTest();
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			isInsert = query.executeUpdate();
			isInsert = 1;
		}else{

			sql = "UPDATE radiology_assign_test SET takenTime ='0' where idtest_radiology="+radiologyDTO.getIdtestRadiology()+" and idradiology_test="+radiologyDTO.getIdradiologyTest();
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			isInsert = query.executeUpdate();
			isInsert = 2;
		}
		
		}catch(Exception e){
			System.out.println("database error...could not Update : "+ e.getMessage());
			e.printStackTrace();
			isInsert = 0;
		}
		return isInsert;
	}



@Override
public List<TestDTO> getAllRadiologyDetail(HttpServletRequest request,
		String testType) {
	List<TestDTO> lstTest=new ArrayList<TestDTO>();
	
	 String sql="select * from ehat_radilogy_group where radiology_group_status='Y'";
	 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 
	 @SuppressWarnings("unchecked")
	List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for(Map<String, Object> row : listBillDetails){
			
			TestDTO objData=new TestDTO();
			
			objData.setTestID((Integer)row.get("id_radilogy_group"));
			objData.setTestName((String)row.get("radiology_group_name"));
			
			lstTest.add(objData);
		}
		return lstTest;
}

@Override
public List<TestDTO> fetchradiotest(HttpServletRequest request,String tId) {
	List<TestDTO> lstTest=new ArrayList<TestDTO>();
	
	 String sql="SELECT test.id, test.category_name, rat.idradiology_test FROM radiology_file_master f_m"
				+ " inner join radiology_assign_test rat on rat.idradiology_file_master = f_m.idradiology_file_master"
				+ " inner join ehat_subservice test on test.id = rat.idtest_radiology"
				+ " where rat.radiologyTestStatus = 'Y' and f_m.treatment_id ='"+tId+"'";
	 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 
	 @SuppressWarnings("unchecked")
	List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for(Map<String, Object> row : listBillDetails){
			
			TestDTO objData=new TestDTO();
			
			objData.setTestID((Integer)row.get("id"));
			objData.setTestName((String)row.get("category_name"));
			objData.setIdradiology_test((Integer)row.get("idradiology_test"));
			
			lstTest.add(objData);
		}
		return lstTest;
}


@Override
public List<TestDTO> fetchtestrisdetails(HttpServletRequest request,int testId) {
	List<TestDTO> lstTest=new ArrayList<TestDTO>();
	
	 String sql="select  radiologyInstruction,radiologyClinicalNote,idradiology_test_name"
				+ " FROM radiology_assign_test  where idtest_radiology = '"+testId+"'";
	 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 
	 @SuppressWarnings("unchecked")
	List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for(Map<String, Object> row : listBillDetails){
			
			TestDTO objData=new TestDTO();
			
			objData.setRadiologyInstruction((String)row.get("radiologyInstruction"));
			objData.setRadiologyClinicalNote((String)row.get("radiologyClinicalNote"));
			objData.setIdradiology_test((Integer)row.get("idradiology_test_name"));
			
			lstTest.add(objData);
		}
		return lstTest;
}

@Override
public int saveOrUpdateRisTemplate(RisTempateDto risTempateDto) {
	try {
		sessionFactory.getCurrentSession().merge(risTempateDto);
	} catch (Exception e) {
		e.printStackTrace();
		return 0;
	}
	return 1;
}
@Override
public List<RisTempateDto> getRisTempData() {
	List<RisTempateDto> ltRisTempdetails = null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(RisTempateDto.class);
		criteria.add(Restrictions.eq("status", "Y"));
		//criteria.setMaxResults(10);
		ltRisTempdetails = criteria.list();
		} catch (Exception e) {
		e.printStackTrace();
		return ltRisTempdetails;
	}
	return ltRisTempdetails;
}

@Override
public List<RisTempateDto> getRisTemplateDataforID(Integer templateId) {
	List<RisTempateDto> ltRisTempdetails = null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(RisTempateDto.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("templateId", templateId));
		//criteria.setMaxResults(10);
		ltRisTempdetails = criteria.list();
		} catch (Exception e) {
		e.printStackTrace();
		return ltRisTempdetails;
	}
	return ltRisTempdetails;
}

public int saveOrUpdateTestDetails(RadiologyTestDto radiologyDTO,HttpServletRequest request){
	String sql = "";
    int isInsert= 0;
    String date = "0";
	HttpSession session = request.getSession();
    Integer userId = (Integer) session.getAttribute("userId1");
    
	
	try{
		String query="select COUNT(*) from ehat_radiology_test_details where pat_id = "+radiologyDTO.getPatId()+" and test_id = "+radiologyDTO.getTestId()+" and treat_id = "+radiologyDTO.getTreatId();
		int isAvailable=((BigInteger)sessionFactory.getCurrentSession().createSQLQuery(query).uniqueResult()).intValue();
		
	if(isAvailable == 0){
		
		SQLQuery insertQuery1 = sessionFactory.getCurrentSession().createSQLQuery("" +
 		 		 "INSERT INTO ehat_radiology_test_details (co_relation,redo_scan,related_reaction,error,history,test_id,pat_id,treat_id,created_by,created_date) values (?,?,?,?,?,?,?,?,?,?)");
 		 		 insertQuery1.setParameter(0,radiologyDTO.getCoRelation());
 		 		 insertQuery1.setParameter(1,radiologyDTO.getRedoScan());
 				 insertQuery1.setParameter(2,radiologyDTO.getRelatedReaction());
 				 insertQuery1.setParameter(3, radiologyDTO.getError());
 				 insertQuery1.setParameter(4,radiologyDTO.getHistory());
 				 insertQuery1.setParameter(5,radiologyDTO.getTestId());
 				 insertQuery1.setParameter(6,radiologyDTO.getPatId());
 				 insertQuery1.setParameter(7, radiologyDTO.getTreatId());
				 insertQuery1.setParameter(8,userId);
				 insertQuery1.setParameter(9,new Date());
 				 insertQuery1.executeUpdate();
 				 
		isInsert = 1;
	}else{

		Timestamp  fromTimestamp = new  java.sql.Timestamp(new java.util.Date().getTime());
		sql = "update ehat_radiology_test_details set co_relation = '"+radiologyDTO.getCoRelation()+"',redo_scan = '"+radiologyDTO.getRedoScan()+"', related_reaction = '"+radiologyDTO.getRelatedReaction()+"', error = '"+radiologyDTO.getError()+"', history = '"+radiologyDTO.getHistory()+"',updated_by = "+userId+", updated_date = '"+fromTimestamp+"' where test_id= "+radiologyDTO.getTestId()+" and pat_id ="+radiologyDTO.getPatId()+" and treat_id ="+radiologyDTO.getTreatId();
		SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
		isInsert = query1.executeUpdate();
		isInsert = 2;
	}
	
	}catch(Exception e){
		System.out.println("database error...could not Update : "+ e.getMessage());
		e.printStackTrace();
		isInsert = 0;
	}
	return isInsert;
}
@Override
public List<Test> getRisTemplateTypes() {
	List<Test> lstTest=new ArrayList<Test>();
	
	 String sql="select * from radilogygroup";
	 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 
	 @SuppressWarnings("unchecked")
	List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for(Map<String, Object> row : listBillDetails){
			
			Test objData=new Test();
			
			objData.setGroupId((Integer)row.get("idradiologyGroup"));
			objData.setGroupName((String)row.get("radiologyGroupName"));
			
			lstTest.add(objData);
		}
		return lstTest;
}
@Override
public int saveCrtTemplateReport(RadiologyTemplateReportDTO radiologyTemplateReportDTO,HttpServletRequest request) {
	
	HttpSession session = request.getSession();
	Integer userId = (Integer) session.getAttribute("userId1");
	
	String sql = "SELECT * FROM ehat_radiology_test_report where patient_id = "+radiologyTemplateReportDTO.getPatientId()+" and test_id="+radiologyTemplateReportDTO.getTestId()+" and treatment_id="+radiologyTemplateReportDTO.getTreatmentId()+
			" and radiology_test_id="+radiologyTemplateReportDTO.getRadiologyTestId()+"";
    SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
    query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
    List<Map<String, Object>> data = query.list();	
    System.err.println(""+data.size());
   
    if(data.size() == 0){
	
	radiologyTemplateReportDTO.setTemplateId(radiologyTemplateReportDTO.getTemplateId());
	radiologyTemplateReportDTO.setTestId(radiologyTemplateReportDTO.getTestId());
	radiologyTemplateReportDTO.setTreatmentId(radiologyTemplateReportDTO.getTreatmentId());
	radiologyTemplateReportDTO.setTemplateTypeId(radiologyTemplateReportDTO.getTemplateTypeId());
	radiologyTemplateReportDTO.setPatientId(radiologyTemplateReportDTO.getPatientId());
	radiologyTemplateReportDTO.setTemplateData(radiologyTemplateReportDTO.getTemplateData());
	radiologyTemplateReportDTO.setRadiologyTestId(radiologyTemplateReportDTO.getRadiologyTestId());
	radiologyTemplateReportDTO.setStatus("Y");
	radiologyTemplateReportDTO.setCreatedBy(userId);
	radiologyTemplateReportDTO.setCreatedDate(new Date(new java.util.Date().getTime()));
	radiologyTemplateReportDTO.setNuclearData(radiologyTemplateReportDTO.getNuclearData());
	radiologyTemplateReportDTO.setNuclearCreatedBy(userId);
	radiologyTemplateReportDTO.setNuclearCreatedDate(new Date(new java.util.Date().getTime()));
	
	try {
		sessionFactory.getCurrentSession().merge(radiologyTemplateReportDTO);
	} catch (Exception e) {
		e.printStackTrace();
		return 0;
	}

   }else if(data.size() > 0){
   
   
   
   String hql = "UPDATE RadiologyTemplateReportDTO set templateData =:tempData, updatedBy =:updatedBy, updatedDate =:updatedDT,templateTypeId =:templateTypeId,templateId =:templateId,nuclearData =:nuclearData,nuclearCreatedBy =:nuclearCreatedBy,nuclearCreatedDate =:nuclearCreatedDate WHERE treatmentId =:trid and patientId =:patid and testId =:testid and radiologyTestId =:radiologyId";
   System.err.println("hql...Vikas "+hql+" rtid"+radiologyTemplateReportDTO.getRadiologyTestId());
   	Query query1 = sessionFactory.getCurrentSession().createQuery(hql);
	query1.setParameter("tempData",radiologyTemplateReportDTO.getTemplateData());  
	query1.setParameter("updatedBy", userId);
	query1.setParameter("updatedDT", new Date(new java.util.Date().getTime()));
	query1.setParameter("templateTypeId", radiologyTemplateReportDTO.getTemplateTypeId());
	query1.setParameter("templateId", radiologyTemplateReportDTO.getTemplateId());
	query1.setParameter("trid", radiologyTemplateReportDTO.getTreatmentId());
	query1.setParameter("patid", radiologyTemplateReportDTO.getPatientId());
	query1.setParameter("testid", radiologyTemplateReportDTO.getTestId());
	query1.setParameter("radiologyId", radiologyTemplateReportDTO.getRadiologyTestId());
	query1.setParameter("nuclearData", radiologyTemplateReportDTO.getNuclearData());
	query1.setParameter("nuclearCreatedBy", userId);
	query1.setParameter("nuclearCreatedDate", new Date(new java.util.Date().getTime()));
	 
	query1.executeUpdate();
	   
	   /*Timestamp  fromTimestamp = new  java.sql.Timestamp(new java.util.Date().getTime());
	   Query updateSql = sessionFactory
				.getCurrentSession()
				.createSQLQuery("update ehat_radiology_test_report set note='"+radiologyTemplateReportDTO.getTemplateData()+"', updated_by="+userId+", updated_date_time='"+fromTimestamp+"',"
								+ " template_type_id="+radiologyTemplateReportDTO.getTemplateTypeId()+", template_id="+radiologyTemplateReportDTO.getTemplateId()+" where treatment_id="+radiologyTemplateReportDTO.getTreatmentId()+" and patient_id="+radiologyTemplateReportDTO.getPatientId()+" and test_id="+radiologyTemplateReportDTO.getTestId()+" and radiology_test_id="+radiologyTemplateReportDTO.getRadiologyTestId()+"");
	   
	   System.err.println("updateSql..."+updateSql);
	   updateSql.executeUpdate();*/
	   
  }
    return 1;
	
}
	@Override
	public int saveUploadedPhotoRis(RisImageUploadDTO risTempateDto,HttpServletRequest request) {
		try {
			sessionFactory.getCurrentSession().save(risTempateDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}
	 
		
		@Override
		public List<RadiologyTestDto> fetchTestDetails(HttpServletRequest request,Integer treatId,Integer testId,Integer patId) {
			
			List<RadiologyTestDto> lstTest=new ArrayList<RadiologyTestDto>();
			
			 String sql="select * from ehat_radiology_test_details where pat_id = "+patId+" and test_id = "+testId+" and treat_id = "+treatId;
			 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 
			 @SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillDetails = tsetDetails.list();
				for(Map<String, Object> row : listBillDetails){
					
					RadiologyTestDto objData=new RadiologyTestDto();
					
					objData.setCoRelation((String)row.get("co_relation"));
					objData.setRedoScan((String)row.get("redo_scan"));
					objData.setRelatedReaction((String)row.get("related_reaction"));
					objData.setError((String)row.get("error"));
					objData.setHistory((String)row.get("history"));
					
					lstTest.add(objData);
				}
				return lstTest;
		}
		
		@SuppressWarnings("unchecked")
		@Override
		public List<RisImageUploadDTO> fetchImageTest(Integer treatId,Integer testId,Integer idRadiologyTest,HttpServletRequest request) {
			
			
//			
//			List<RisImageUploadDTO> lstTest=new ArrayList<RisImageUploadDTO>();
//			
//			 //String sql="select idradiology_image_master,image_name,created_date_time,treatment_id from ehat_radiology_image_master where radiology_test_id = "+idRadiologyTest+" and test_id = "+testId+" and treatment_id = "+treatId+" and status = 'N'";
//			 
//			String sql = "select * from ehat_radiology_image_master where radiology_test_id = "+idRadiologyTest+" and test_id = "+testId+" and treatment_id = "+treatId+" and status = 'N'"; 
//			
//			 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
//			 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
//			 
//			 @SuppressWarnings("unchecked")
//			List<Map<String, Object>> listBillDetails = tsetDetails.list();
//				for(Map<String, Object> row : listBillDetails){
//					
//					RisImageUploadDTO objData=new RisImageUploadDTO();
//					
//					objData.setIdRadiologyTestReport((Integer)row.get("idradiology_image_master"));
//					objData.setDocumentName((String)row.get("document_name"));
//					objData.setComment((String)row.get("comment"));
//					objData.setImageName((String)row.get("image_name"));
//					objData.setCreatedDate((Date)row.get("created_date_time"));
//					objData.setTreatmentId((Integer)row.get("treatment_id"));
//					objData.setCreatedByUser((String)row.get("created_by_user"));
//					objData.setPatientId((Integer)row.get("patient_id"));
//					
//					lstTest.add(objData);
//				}
//				
//				//System.out.println("---doc ris objects-- " + lstTest.get(2));
//				return lstTest;
				
				List<RisImageUploadDTO> lstTest = new ArrayList<RisImageUploadDTO>();
				
				try {
					Criteria criteria=sessionFactory.getCurrentSession().createCriteria(RisImageUploadDTO.class);
					
					criteria.add(Restrictions.eq("radiologyTestId", idRadiologyTest));
					criteria.add(Restrictions.eq("testId", testId));
					criteria.add(Restrictions.eq("treatmentId", treatId));
					criteria.add(Restrictions.eq("status", "N")); 
					
					lstTest = criteria.list();
					
				}catch(Exception e) {
					e.printStackTrace();
				}
				return lstTest;
				
		}
		@Override
		public RadiologyTemplateReportDTO getRadiologyTestReports(int patientId,int testId,int radiologyTestId,int treatmentId) {
				List<RadiologyTemplateReportDTO> ltTestRadiologyReports = null;
				RadiologyTemplateReportDTO obj=new RadiologyTemplateReportDTO();
				try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(RadiologyTemplateReportDTO.class);
					criteria.add(Restrictions.eq("status", "Y"));
					criteria.add(Restrictions.eq("patientId", patientId));
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					criteria.add(Restrictions.eq("testId", testId));
					criteria.add(Restrictions.eq("radiologyTestId", radiologyTestId));
					criteria.setMaxResults(10);
					ltTestRadiologyReports = criteria.list();
					
					String sql="SELECT essm.underSubSer FROM ehat_service_subserv_master essm,ehat_radiology_test_report etr where etr.test_id = essm.id and essm.isCategory = 'N' and essm.deleted = 'N'and essm.service_id = '12' and etr.treatment_id="+treatmentId+" and etr.radiology_test_id="+radiologyTestId+" and patient_id="+patientId+"";
					Query groupNameSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
					String  groupName=(String) groupNameSql.uniqueResult();
					
					sql="select ifnull(doctor_id,0) as doc_id from ehat_bill_details where treatment_id = "+treatmentId+" and sub_service_id = "+testId+" and deleted = 'N' and cancle = 'N' ";
					Query docSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
					Object o = docSql.uniqueResult();
					Integer docId=0;
					if(o != null){
						 docId= ((Number) o).intValue();
					}
					
					if(docId==null){
						docId=0;
					}
					
					obj.setListRadiologyTempReportDTO(ltTestRadiologyReports);
					obj.setGroupName(groupName);
					obj.setDoctorId(docId);
					
					} catch (Exception e) {
					e.printStackTrace();
					return obj;
				}
				return obj;
				}
		@SuppressWarnings("unchecked")
		@Override
		public List<RisTempateDto> getTemplateListById(int templateId) {
			List<RisTempateDto> ltRisTemplates = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RisTempateDto.class);
				criteria.add(Restrictions.eq("templateId", templateId));
				criteria.setMaxResults(10);
				ltRisTemplates = criteria.list();
				} catch (Exception e) {
				e.printStackTrace();
				return ltRisTemplates;
			}
			return ltRisTemplates;
			}
		
		@SuppressWarnings("unchecked")
		@Override
		public List<RadiologyTemplateReportDTO> getRisTestReportAll(int treatmentId) {
				List<RadiologyTemplateReportDTO> ltTestRadiologyReports = null;
				try {
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(RadiologyTemplateReportDTO.class);
					criteria.add(Restrictions.eq("status", "Y"));
					criteria.add(Restrictions.eq("treatmentId", treatmentId));
					ltTestRadiologyReports = criteria.list();
					} catch (Exception e) {
					e.printStackTrace();
					return ltTestRadiologyReports;
				}
				return ltTestRadiologyReports;
				}
		
		@SuppressWarnings("null")
		@Override
		public List<RadiologyTemplateReportDTO> getRadiologyTestReports1(
				int patientId, int treatmentId) {
			List<RadiologyTemplateReportDTO> ltTestRadiologyReports = new ArrayList<RadiologyTemplateReportDTO>();
			try {/*
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RadiologyTemplateReportDTO.class);
				criteria.add(Restrictions.eq("status", "Y"));
				criteria.add(Restrictions.eq("patientId", patientId));
				criteria.add(Restrictions.eq("treatmentId", treatmentId));
				criteria.setMaxResults(10);
				ltTestRadiologyReports = criteria.list();
				*/
			
				String sql="select tr.*,es.category_name from ehat_radiology_test_report tr, ehat_subservice es where tr.test_id = es.id and tr.treatment_id ="+treatmentId;
				Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
				tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> listInvestigation = tsetDetails.list();
					for(Map<String, Object> row : listInvestigation){
						
						RadiologyTemplateReportDTO objData=new RadiologyTemplateReportDTO();
						
						objData.setIdRadiologyTestReport((Integer)row.get("idradiology_test_report"));
						objData.setCreatedDate((Date)row.get("created_date_time"));
						objData.setRadiologyTestId((Integer)row.get("radiology_test_id"));
						objData.setTemplateData((String)row.get("note"));
						objData.setTestId((Integer)row.get("test_id"));
						objData.setTreatmentId((Integer)row.get("treatment_id"));
						objData.setPatientId((Integer)row.get("patient_id"));
						objData.setTestName((String)row.get("category_name"));						
						ltTestRadiologyReports.add(objData);
					}
			
			} catch (Exception e) {
				e.printStackTrace();
				return ltTestRadiologyReports;
			}
			return ltTestRadiologyReports;
			}
		
		@Override
		public List<TestDTO> risTestgroupBy() {
			List<TestDTO> lstTest=new ArrayList<TestDTO>();
			
			 String sql="SELECT distinct(underSubSer) FROM ehat_service_subserv_master where service_id='12' and iscategory='N' and deleted='N';";
			 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
			 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			 
			 @SuppressWarnings("unchecked")
			List<Map<String, Object>> listBillDetails = tsetDetails.list();
				for(Map<String, Object> row : listBillDetails){
					
					TestDTO objData=new TestDTO();
					
					objData.setUnderSubSer((String)row.get("underSubSer"));
					
					lstTest.add(objData);
				}
				return lstTest;
		}
		@Override
		public RadiologyDTO searchByGropuName(HttpServletRequest request,String groupTestName,String type,String flag) {

			RadiologyDTO risDetailList = new RadiologyDTO();
			try{
			
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyDTO.class);
				if(flag.equals("1")){
					criteria.add(Restrictions.eq("treatmentFlag", "Y"));
					criteria.add(Restrictions.eq("radTestStatus", "Y"));
					 criteria.addOrder(Order.desc("assignDate"));
					criteria.add(Restrictions.like("groupName", groupTestName));
	
					List<RadiologyDTO> radiologyDTO = criteria.list();	
					risDetailList.setListRadiologyDTO(radiologyDTO);	
				}else{
					criteria.add(Restrictions.eq("treatmentFlag", "N"));
					criteria.add(Restrictions.eq("radTestStatus", "Y"));
					 criteria.addOrder(Order.desc("assignDate"));
					criteria.add(Restrictions.like("groupName", groupTestName));
		
					List<RadiologyDTO> radiologyDTO = criteria.list();	
					risDetailList.setListRadiologyDTO(radiologyDTO);	
				}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		
		}
			
			return risDetailList;
		}

@Override
		public RadiologyDTO getautoSuggestionNuclearTest(String letter) {
			RadiologyDTO obj = new RadiologyDTO();
			List<RadiologyDTO> ltNuclearTemplate = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(RadiologyDTO.class);
				criteria.add(Restrictions.like("patientName", "%"+letter+"%"));
				//criteria.setMaxResults(10); 
				 ltNuclearTemplate = criteria.list();
				obj.setListRadiologyDTO(ltNuclearTemplate);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
			return obj;
		}

@Override
public List<TestDTO> getClinicalInstructionNote(HttpServletRequest request,int idRadiologyTest) {
	List<TestDTO> lstTest=new ArrayList<TestDTO>();
	
	 String sql="select  radiologyInstruction,radiologyClinicalNote"
				+ " FROM radiology_assign_test  where idradiology_test = "+idRadiologyTest;
	 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 
	 @SuppressWarnings("unchecked")
	List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for(Map<String, Object> row : listBillDetails){
			
			TestDTO objData=new TestDTO();
			
			objData.setRadiologyInstruction((String)row.get("radiologyInstruction"));
			objData.setRadiologyClinicalNote((String)row.get("radiologyClinicalNote"));
			
			lstTest.add(objData);
		}
		return lstTest;
}

@Override
public Map<String, String> Saveipdhistorytemp(TemplateIPDHistory master) {
	Map<String, String> result = new HashMap<String, String>();
	result = new HashMap<String, String>();
	try {


	  
		sessionFactory.getCurrentSession().merge(master);
		result.put("result", "Record Save Succesfully");
	  
  

		
		/* saveBatchStockDetails(patientSaleBillMaster); */

	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}

@Override
public List<TemplateIPDHistory> fetchTemplateIPDHistory(String value) {
	List<TemplateIPDHistory> list=null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(TemplateIPDHistory.class);
		criteria.add(Restrictions.eq("id_ipdhistorymaster", Integer.parseInt(value)));
		
		list = criteria.list();
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return list;
}

@Override
public Map<String, String> fetchTemplateIPD(String customizeTemplateName) {
	Map<String, String> result1 = new HashMap<String, String>();
		try {
		String sql="select  id_ipdhistorymaster,templatename"
				+ " FROM ehat_template_ipd_history_master ";
	 Query tsetDetails = sessionFactory.getCurrentSession().createSQLQuery(sql);
	 tsetDetails.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	 
	 @SuppressWarnings("unchecked")
	List<Map<String, Object>> listBillDetails = tsetDetails.list();
		for(Map<String, Object> row : listBillDetails){
			Map<String, String> result = new HashMap<String, String>();
			result = new HashMap<String, String>();
			String id_ipdhistorymaster = ((Integer)row.get("id_ipdhistorymaster")).toString();
			result.put(id_ipdhistorymaster,(String)row.get("templatename"));
			
			result1.putAll(result);
		
		}
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return result1;
}

@Override
public Map<String, String> Savequestionmaster(QuestionMaster master , HttpServletRequest request) {
	Map<String, String> result = new HashMap<String, String>();
	result = new HashMap<String, String>();
	try {
		HttpSession session = request.getSession(true);
		Integer userId=(Integer)session.getAttribute("userId1");
		
		java.text.SimpleDateFormat dateFormat1 = new SimpleDateFormat("HH:mm:ss");
		java.util.Calendar cal = java.util.Calendar.getInstance();
		for(QuestionMaster obj : master.getListquestionmaster()){
			obj.setId_question_master(obj.getId_question_master());
			obj.setQuestion_header(obj.getQuestion_header());
			obj.setCreatedBy(userId);
			if(obj.getId_question_master() > 0){
				obj.setCreatedDateTime(cal.getTime())	;
			}else{
				obj.setUpdatedDateTime(cal.getTime());
			}
	     sessionFactory.getCurrentSession().merge(obj);
	     Integer qmid=0;
       if(obj.getId_question_master() ==0){
 	      SQLQuery queryid = sessionFactory.getCurrentSession().createSQLQuery("SELECT max(id_question_master) FROM ehat_question_master where status='N'  ");
		   qmid    = (Integer) queryid.uniqueResult();

       }else{
    	   qmid =obj.getId_question_master();
       }
		  if(qmid!=null){
			  for(QuestionDR obj1 : master.getListQuestion()){
				  obj1.setId_question(obj1.getId_question());
				  obj1.setQuestion_name(obj1.getQuestion_name());
				  obj1.setId_question_master(qmid);
				  sessionFactory.getCurrentSession().merge(obj1);
				  Integer questionid =0;
				  if(obj1.getId_question() ==0){
					  SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery("SELECT max(id_question) FROM ehat_question_list where status='N'  ");
					   questionid     = (Integer) query1.uniqueResult(); 
				  }else{
					  questionid = obj1.getId_question();
				  }
				
				  for(AnswerDR obj2 : obj1.getListAnswerDR()){
				//	  if(obj1.getQno()==obj2.getQno()){
						  obj2.setId_answer(obj2.getId_answer());
						  obj2.setAnswer_name(obj2.getAnswer_name());
						  obj2.setId_question(questionid);
						  sessionFactory.getCurrentSession().merge(obj2);  
					//  }
					 
  
				  }
			  }
		  }
		
		}
		result.put("result", "Record Save Succesfully");
	  
	/* saveBatchStockDetails(patientSaleBillMaster); */

	} catch (Exception e) {
		e.printStackTrace();
	}
	return result;
}
public QuestionMaster    fetchQuestionMaster(String callfrom,String letter) {
	QuestionMaster obj=new QuestionMaster();
	List<QuestionMaster> list  = new ArrayList<QuestionMaster>();
	List<QuestionDR>    list1  = new ArrayList<QuestionDR>();
	List<AnswerDR>      list2  = new ArrayList<AnswerDR>();
	List<QuestionMaster>list3 = new ArrayList<QuestionMaster>();
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(QuestionMaster.class);
		criteria.add(Restrictions.eq("status", "N"));
		if(callfrom.equals("search")){
			criteria.add(Restrictions.like("question_header",letter+"%"));

		}
		list = criteria.list();
		for(QuestionMaster obj1 : list){
			Criteria criteriaqlist = sessionFactory.getCurrentSession()
					.createCriteria(QuestionDR.class);
			criteriaqlist.add(Restrictions.eq("status", "N"));
			criteriaqlist.add(Restrictions.eq("id_question_master", obj1.getId_question_master()));
            list1 = criteriaqlist.list();
            QuestionMaster objmaster=new QuestionMaster();
            objmaster.setId_question_master(obj1.getId_question_master());
            objmaster.setQuestion_header(obj1.getQuestion_header());
            objmaster.setText(obj1.getText());
        	List<QuestionDR>    list4  = new ArrayList<QuestionDR>();

        for(QuestionDR obj2 : list1){
				Criteria criteriaanslist = sessionFactory.getCurrentSession().createCriteria(AnswerDR.class);
				criteriaqlist.add(Restrictions.eq("status", "N"));
               	criteriaanslist.add(Restrictions.eq("id_question", obj2.getId_question()));
				list2 = criteriaanslist.list();
				QuestionDR obj3 =new QuestionDR ();
				obj3.setId_question(obj2.getId_question());
				obj3.setId_question_master(obj2.getId_question_master());
				obj3.setQuestion_name(obj2.getQuestion_name());
				obj3.setListAnswerDR(list2);
				
				list4.add(obj3);
        }
		objmaster.setListQuestion(list4);
		  list3.add(objmaster) ;    
	//	list4.clear();

      
		}
		obj.setListquestionmaster(list3);
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return obj;
}

@Override
public int deletequestionmaster(String callfrom, String id,HttpServletRequest request) {
	HttpSession session = request.getSession(true);
	Integer userId=(Integer)session.getAttribute("userId1");
	try {
	QuestionMaster obj = (QuestionMaster) sessionFactory
			.getCurrentSession().get(QuestionMaster.class, Integer.parseInt(id));
	obj.setStatus("Y");
	obj.setDeletedBy(userId);
	obj.setDeletedDateTime((new Date(new java.util.Date().getTime())));
} catch (Exception e) {
	e.printStackTrace();
	return 0;
}
	return 1;
}

@Override //aniket/21/01/2020
public RadiologyDTO searchPatientByTest(HttpServletRequest request,String testName, String type, String flag, String textType) {
	List<RadiologyDTO> risDetailList = new ArrayList<RadiologyDTO>();
	RadiologyDTO radioDTO = new RadiologyDTO();
	try {
		if (testName != null) {

				if (flag.equals("1")) {
						
					String sqls = "SELECT * FROM ehat_ris_records_details p where p.test_name like '"+testName+"%' and p.trt_flag='Y' limit 20";
					SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sqls);
					getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);	
					List<Map<String, Object>> masterRow = getMaster.list();		
					
					for(Map<String, Object> row : masterRow){
			    		
						RadiologyDTO radiologyDTO = new RadiologyDTO();
				    	radiologyDTO.setPatientId((Integer)row.get("patient_id"));//
				    	radiologyDTO.setPatientName((String)row.get("patient_name"));//
				    	radiologyDTO.setTreatmentId((Integer)row.get("treatment_id"));
				    	radiologyDTO.setPatientAge((Integer)row.get("patient_age"));
				    	radiologyDTO.setPatientGender((String)row.get("patient_gender"));//
				    	radiologyDTO.setIdradiologyTest((Integer)row.get("idradiology_test"));//
				    	radiologyDTO.setTreatmentFlag((String)row.get("trt_flag"));
				    	radiologyDTO.setIdtestRadiology((Integer)row.get("idtest_radiology"));//
				    	radiologyDTO.setRadUrgentFlag((String)row.get("radUrgentflag"));//
				    	radiologyDTO.setIdradTestName((Integer)row.get("idrad_test_name"));
				    	radiologyDTO.setRadTestStatus((String)row.get("radTestStatus"));
				    	radiologyDTO.setAssignDate((Date)row.get("assign_date"));
				    	radiologyDTO.setArrivalTime((String)row.get("arrivalTime"));//
				    	radiologyDTO.setTakenTime((String)row.get("takenTime"));//
				    	radiologyDTO.setRadRISFlag((String)row.get("radRISFlag"));
				    	radiologyDTO.setTestName((String)row.get("test_name"));//
				    	radiologyDTO.setDeptId((Integer)row.get("dept_id"));//
				    	//radiologyDTO.setAssign_dt((java.sql.Timestamp)row.get("assign_dt"));
				    	radiologyDTO.setGroupName((String)row.get("group_name"));//
				    	radiologyDTO.setReportStatus((String)row.get("report_status"));//
				    	radiologyDTO.setCheckUpDoneFlag((String)row.get("checkUpDoneFlag"));
				    	
				    	risDetailList.add(radiologyDTO);
			    	}
					radioDTO.setListRadiologyDTO(risDetailList);
				}
		}

	} catch (Exception e) {
		e.printStackTrace();
	}
	return radioDTO;
}

@SuppressWarnings("unchecked")
@Override
public List<Doctor> getAllRadiologistsList() {
	
	List<Doctor> listDoctors = new ArrayList<Doctor>();
	
	try{
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(Doctor.class);
		criteria.add(Restrictions.eq("status", "Y"));
	
		Disjunction or = Restrictions.disjunction();
		or.add(Restrictions.eq("specializationName", "Radiologist"));
		or.add(Restrictions.eq("specializationName", "Cardiologist"));
		String[] specializationArray = {"Radiologist", "Cardiologist"}; 
		for (String specialization : specializationArray) {
			or.add(Restrictions.like("specializationName", "%" + specialization + "%"));
		    }
		criteria.add(Restrictions.or(or));
		listDoctors = criteria.list();
		
		System.out.println("--getAllRadiologistsList-- listSize :: " + listDoctors.size());
	}catch(Exception e){
		e.printStackTrace();
	}
	
	return listDoctors;
}

@Override
public RadiologyAssisgnTestDTO getTakenArrivalDateTime(
		Integer idTestRadiology, Integer idRadiologyTest) {
	RadiologyAssisgnTestDTO radio = new RadiologyAssisgnTestDTO();
	
	try{
	/*Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyAssisgnTestDTO.class);
	criteria.add(Restrictions.eq("idTestRadiology", idTestRadiology));
	criteria.add(Restrictions.eq("idRadiologyTest", idRadiologyTest));
	
	Object result = criteria.uniqueResult();*/
		Object result = (RadiologyAssisgnTestDTO) sessionFactory.getCurrentSession().get(RadiologyAssisgnTestDTO.class, idTestRadiology);
	
		if(result != null){
			radio = (RadiologyAssisgnTestDTO) result;
			String str = radio.getArrivalTime();
			String[] splits = str.split("\\s+");
		}
	}catch(Exception e){
		e.printStackTrace();
	}
	return radio;
}

@Override
public int saveRisReportRecords(ViewRisRecordsDTO viewRisRecordsDTO) {
	
	try {
		String sql = "select bill_details_id from radiology_assign_test where idradiology_test ="+viewRisRecordsDTO.getIdRadiologyTest();
		SQLQuery sqlresult = sessionFactory.getCurrentSession().createSQLQuery(sql);
		Integer billDetId = ((Number) sqlresult.uniqueResult()).intValue();
		
		viewRisRecordsDTO.setBillDetId(billDetId);
		
		sessionFactory.getCurrentSession().merge(viewRisRecordsDTO);
	} catch (Exception e) {
		e.printStackTrace();
		return 0;
	}
	
	return 1;
}

@SuppressWarnings("unchecked")
@Override
public List<ViewRisRecordsDTO> fetchRisReportRecordByPatientId(Integer idRadiologyTest) {
	
	List<ViewRisRecordsDTO> listRisReports = new ArrayList<>();
	
	try{
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(ViewRisRecordsDTO.class);
		criteria.add(Restrictions.eq("idRadiologyTest", idRadiologyTest));
		criteria.add(Restrictions.eq("isDeleted", 'N'));
		criteria.addOrder(Order.desc("id"));
		listRisReports = criteria.list();
		
	}catch(Exception e){
		e.printStackTrace();
	}
	
	return listRisReports;
}

@Override
public Integer verifyRisReportRecord(Integer id) {
		
	Integer response = 0;
	
//	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss aa");		// edit by aniket / 16 DEC 2020
	SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy hh:mm aa");		// edit by aniket / 16 DEC 2020
	Calendar cal = Calendar.getInstance();
	String strDate = dateFormat.format(cal.getTime());
	
	try{
		
		String sql = "update ehat_view_ris_records set verify_flag = 'Y', verified_date_time = '"+strDate+"' where id = "+id;            
  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
  		response = updateSql.executeUpdate();
	}catch(Exception e){
		e.printStackTrace();
	}
	return response;
}

@Override
public Integer deleteRisReportRecord(Integer id) {
	Integer response = 0;
	
	try{
		
		String sql = "update ehat_view_ris_records set is_deleted = 'Y' where id = "+id;            
  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
  		response = updateSql.executeUpdate();
  		
	}catch(Exception e){
		e.printStackTrace();
	}
	return response;
}

@SuppressWarnings("unchecked")
@Override
public RadiologyTemplateReportDTO getRisReportRecordForPrint(
		Integer patientId, Integer testId, Integer radiologyTestId,
		Integer treatmentId, Integer idRadiologyTestReport) {
	
	List<RadiologyTemplateReportDTO> ltTestRadiologyReports = null;
	RadiologyTemplateReportDTO obj=new RadiologyTemplateReportDTO();
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyTemplateReportDTO.class);
		criteria.add(Restrictions.eq("status", "Y"));
		criteria.add(Restrictions.eq("patientId", patientId));
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("testId", testId));
		criteria.add(Restrictions.eq("radiologyTestId", radiologyTestId));
		criteria.add(Restrictions.eq("idRadiologyTestReport", idRadiologyTestReport));
		criteria.setMaxResults(10);
		
		System.out.println("getRisReportRecordForPrint... criteria  :: " + criteria);
		ltTestRadiologyReports = criteria.list();
		
		//String sql="SELECT essm.underSubSer FROM ehat_service_subserv_master essm,ehat_radiology_test_report etr where etr.test_id = essm.id and essm.isCategory = 'N' and essm.deleted = 'N'and essm.service_id = '12' and etr.treatment_id="+treatmentId+" and etr.radiology_test_id="+radiologyTestId+" and patient_id="+patientId+"";
		String sql="SELECT distinct essm.underSubSer FROM ehat_service_subserv_master essm,ehat_radiology_test_report etr where etr.test_id = essm.id and essm.isCategory = 'N' and essm.deleted = 'N'and essm.service_id = '12' and etr.treatment_id="+treatmentId+" and etr.radiology_test_id="+radiologyTestId+" and patient_id="+patientId+"";
		Query groupNameSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
		
		System.out.println("getRisReportRecordForPrint... SQL  :: " + groupNameSql);
		
//		List<String> groupnames = groupNameSql.list();
//		String  groupName = groupnames.get(0);
		String  groupName = (String) groupNameSql.uniqueResult();
		
		if(groupName == null || groupName == "") {
			groupName = "-";
		}
		
		obj.setListRadiologyTempReportDTO(ltTestRadiologyReports);
		obj.setGroupName(groupName);
		System.err.println("groupName Vikas "+groupName);
		
		} catch (Exception e) {
			e.printStackTrace();
	}
	return obj;
	
}

@Override
public int saveUpdateCreatedRISReport(RadiologyTemplateReportDTO radiologyTemplateReportDTO) {
	
	RadiologyTemplateReportDTO objectJustPersisted;
	Integer response = null;
	try {
		 objectJustPersisted = (RadiologyTemplateReportDTO) sessionFactory.getCurrentSession().merge(radiologyTemplateReportDTO);
	} catch (Exception e) {
		e.printStackTrace();
		return 0;
	}
	
	response = objectJustPersisted.getIdRadiologyTestReport();
	
	if(response <= 0){
		return 0;
	}else 
		
	return response;
}

@SuppressWarnings("unchecked")
@Override
public RadiologyTemplateReportDTO viewRisReportRecord(Integer idRadiologyTestReport) {
	
	List<RadiologyTemplateReportDTO> listRadiologyTemplateReportDTOs = null;
	RadiologyTemplateReportDTO radiologyTemplateReportDTO = new RadiologyTemplateReportDTO();
	
	try {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(RadiologyTemplateReportDTO.class);
		criteria.add(Restrictions.eq("idRadiologyTestReport", idRadiologyTestReport));
		listRadiologyTemplateReportDTOs = criteria.list();
		//System.out.println("viewRisReportRecord list size :: " + listRadiologyTemplateReportDTOs.size());
		radiologyTemplateReportDTO.setListRadiologyTempReportDTO(listRadiologyTemplateReportDTOs);
		
	}catch(Exception e){
		e.printStackTrace();
	}
	return radiologyTemplateReportDTO;
}

@Override
public ViewRisRecordsDTO getSingleRISRecord(Integer id) {
	
	ViewRisRecordsDTO obj = (ViewRisRecordsDTO) sessionFactory.getCurrentSession().get(ViewRisRecordsDTO.class, id);
	//System.err.println(obj + "---" + obj.toString());
	return obj;
}

@Override
public Integer deleteRisDocuments(Integer idRadiologyTestReport) {
	
	Integer response = 0;
	try{
		
		String sql = "update ehat_radiology_image_master set status = 'Y' where idradiology_image_master = "+idRadiologyTestReport;            
  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
  		response = updateSql.executeUpdate();
  		
	}catch(Exception e){
		e.printStackTrace();
	}
	return response;
}

@Override
public Integer setPostFlag(Integer testReportId) {
	
Integer response = 0;
	try{
		
		String sql = "update ehat_view_ris_records set post_flag = 'Y' where test_report_id = "+testReportId;            
  		Query updateSql = sessionFactory.getCurrentSession().createSQLQuery(sql);
  		response = updateSql.executeUpdate();
	}catch(Exception e){
		e.printStackTrace();
	}
	return response;
}

@Override
public int Saveipdhistorytemp(TemplateIPDHistoryDto master,
		HttpServletRequest request) {
	try {
		if(master.getId_ipdhistorymaster() == 0){
			sessionFactory.getCurrentSession().merge(master);
			return 1;
		}else{
			sessionFactory.getCurrentSession().merge(master);
			return 2;
		}
		
	} catch (Exception e) {
		e.printStackTrace();
		return 0;
	}
}

@Override
public List<TemplateIPDHistoryDto> fetchTemplateIPDHistoryNew(String value) {
	List<TemplateIPDHistoryDto> list=null;
	try {
		Criteria criteria = sessionFactory.getCurrentSession()
				.createCriteria(TemplateIPDHistoryDto.class);
		criteria.add(Restrictions.eq("id_ipdhistorymaster", Integer.parseInt(value)));
		
		list = criteria.list();
	} catch (Exception e) {
		e.printStackTrace();
		return null;
	}
	return list;
}

@Override
public List<Test> fetchRisTemplateTypeList(HttpServletRequest request) {
	
	List<Test> listTests = new ArrayList<Test>();
	try {
		
		Criteria criteria=sessionFactory.getCurrentSession().createCriteria(Test.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		listTests = criteria.list();
	}catch(Exception e) {
		e.printStackTrace();
	}		
	return listTests;
}

@Override
public int uploadRisDocs(RisImageUploadDTONew obj, Integer patientId, Integer treatmentId,
		MultipartFile[] uploadRisDocument, HttpServletRequest request) {
	

	// TODO Auto-generated method stub
	HttpSession session = request.getSession();
	Integer userId = (Integer) session.getAttribute("userId1");
	Integer unitId = (Integer) session.getAttribute("uId");
	String user_name = (String) session.getAttribute("userName");		//aniket_kanse/ 24NOV2020
	
	System.out.println("RisImageUploadDTONew uploadRisDocs user_name : " + user_name);
	try {

		if (obj.getIdRadiologyTestReport() == 0) {

			obj.setCreatedBy(userId);
			obj.setCreatedByUser(user_name);
			obj.setPatientId(patientId);
			obj.setTreatmentId(treatmentId);

			RisImageUploadDTONew dto = (RisImageUploadDTONew) sessionFactory.getCurrentSession().merge(obj);
			
			String documentPath="";
			for (MultipartFile file : uploadRisDocument) {
				if (file.isEmpty()) {
					continue;
				}
				/*java.io.File uploadPath = new java.io.File(
						FilePath.getDoctorDeskUploadFilesPath() + dto.getDocumentId());*/
				documentPath = FilePath.getRisUploadFilesPath() +""+ dto.getIdRadiologyTestReport();
				
				System.err.println(" RISPATH aniket " + documentPath);
				
				Path path = Paths.get(documentPath);
				java.io.File uploadPath = new java.io.File(documentPath);	
				if (!uploadPath.exists()) {
					Files.createDirectories(path);
				}
				
				String fileName = file.getOriginalFilename();
				String filepath = Paths.get(uploadPath.toString(), fileName).toString();
				BufferedOutputStream stream;

				stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
				stream.write(file.getBytes());
				stream.close();
			}
			return 1;

		} else {

			obj.setUpdatedBy(userId);
			obj.setPatientId(patientId);
			obj.setTreatmentId(treatmentId);

			RisImageUploadDTONew dto = (RisImageUploadDTONew) sessionFactory.getCurrentSession().merge(obj);

			for (MultipartFile file : uploadRisDocument) {
				if (file.isEmpty()) {
					continue;
				}
				java.io.File uploadPath = new java.io.File(
						FilePath.getRisUploadFilesPath() + dto.getIdRadiologyTestReport());
				
				System.err.println(" RISPATH aniket " + uploadPath);
				
				if (!uploadPath.exists())
					uploadPath.mkdirs();
				String fileName = file.getOriginalFilename();
				String filepath = Paths.get(uploadPath.toString(), fileName).toString();
				BufferedOutputStream stream;

				stream = new BufferedOutputStream(new FileOutputStream(new java.io.File(filepath)));
				stream.write(file.getBytes());
				stream.close();
			}
			return 2;
		}
	
	
	} catch (Exception e) {
		e.printStackTrace();
		return 0;
	}

}

@SuppressWarnings("unchecked")
@Override
public List<RisImageUploadDTONew> fetchRISDocuments(Integer testId, Integer treatmentId, Integer idRadiologyTest, HttpServletRequest request) {
	
	System.out.println("Current RIS daoimpl");
	
	List<RisImageUploadDTONew> list = new ArrayList<RisImageUploadDTONew>();
	try {
		
		Criteria criteria = sessionFactory.openSession().createCriteria(RisImageUploadDTONew.class);
		
		criteria.add(Restrictions.eq("status", "N"));
		criteria.add(Restrictions.eq("testId", testId ));
		criteria.add(Restrictions.eq("treatmentId", treatmentId));
		criteria.add(Restrictions.eq("radiologyTestId", idRadiologyTest));
		list = criteria.list();
		
		System.out.println("RisImageUploadDTONew fetchRISDocuments list size : " + list.size());
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return list;
}

@SuppressWarnings("unchecked")
@Override
public List<PatientInvestigationsDTO> fetchInvestigations(Integer tID, Integer patientId, String callform, Integer servid,
		HttpServletRequest request) {
	
	List<PatientInvestigationsDTO> list = new ArrayList<PatientInvestigationsDTO>();
	try {
		
//		Criteria criteria = sessionFactory.openSession().createCriteria(PatientInvestigationsDTO.class);
//		criteria.add(Restrictions.eq("treatmentId", tID));
//		criteria.add(Restrictions.eq("patientId", patientId));
//		list = criteria.list();
		
		String sqlString = "";
		sqlString = "select * from ehat_view_doc_desk_investigations where treatment_id ='"+tID+"' AND patient_id = "+patientId;
		Query getInvestigations = sessionFactory.getCurrentSession().createSQLQuery(sqlString);
		getInvestigations.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> listRecords = getInvestigations.list();
		for(Map<String, Object> row : listRecords){
			
			PatientInvestigationsDTO dto = new PatientInvestigationsDTO();
			
			dto.setPatientId((Integer)row.get("patient_id"));
			dto.setTemplateId((Integer)row.get("template_id"));
			dto.setTemplateName((String)row.get("template_name"));
			dto.setTreatmentId((Integer)row.get("treatment_id"));
			dto.setInvestigation((String)row.get("investigation"));
			dto.setTestReportId((Integer)row.get("test_report_id"));
			dto.setIdRadiologyTest((Integer)row.get("idradiology_test"));
			dto.setPkViewRisRecordsDTO((Integer)row.get("pkViewRisRecordsDTO"));
			dto.setTestId((Integer)row.get("test_id"));
			
			list.add(dto);
		}
		
		System.out.println("RisImageUploadDTONew fetchRISDocuments list size : " + list.size());
		
	} catch (Exception e) {
		e.printStackTrace();
	}
	
	return list;
}

}