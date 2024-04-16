package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.DoctorDeskInstructionDao;
import com.hms.doctordesk.dto.DoctorDeskInstructionDto;
import com.hms.doctordesk.dto.Doctordeskopderdto;
import com.hms.doctordesk.dto.GroupInstructionMaster;
import com.hms.doctordesk.dto.GroupTemplateMaster;
import com.hms.doctordesk.dto.IndividualTreatmentInstructionDto;
import com.hms.doctordesk.dto.OPDReportInstructionDTO;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
public class DoctorDeskInstructionDaoImpl implements DoctorDeskInstructionDao {

	@Autowired
	SessionFactory sessionfactory;

	static Logger log=Logger.getLogger(DoctorDeskInstructionDaoImpl.class.getName());
	@Override
	public List<GroupInstructionMaster> fetchGroupInstructionMaster(String value) {
		List<GroupInstructionMaster> list=new ArrayList<GroupInstructionMaster> ();
		try {
		
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
			criteria.add(Restrictions.ilike("englishInstruction", value, MatchMode.ANYWHERE));
			criteria.add(Restrictions.eq("deleted", "N"));
			list = criteria.list();
		}
		catch (Exception e) {
			log.error("Excetion...> ", e);
		}
		
		return list;
	}
	@Override
	public List<GroupTemplateMaster> fetchGroupTemplateInstructionMaster(String value) {
		List<GroupTemplateMaster> list=new ArrayList<GroupTemplateMaster>();
	
		try {
			
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(GroupTemplateMaster.class);
			criteria.add(Restrictions.ilike("tempLateName", value, MatchMode.ANYWHERE));
			criteria.add(Restrictions.eq("deleted", "N"));
			list = criteria.list();
			
		} catch (Exception e) {
			log.error("Excetion...> ", e);
		}
		return list;
	}
	@Override
	public GroupTemplateMaster fetchtamplategroup(String value) {
		GroupTemplateMaster GroupTemplateMaster=new GroupTemplateMaster();
		List<GroupInstructionMaster> list=new ArrayList<GroupInstructionMaster>();
		try {
			int templateId=Integer.parseInt(value);
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(GroupTemplateMaster.class);
			criteria.add(Restrictions.eq("id", templateId));
			criteria.add(Restrictions.eq("deleted", "N"));
			GroupTemplateMaster = (GroupTemplateMaster) criteria.uniqueResult();
			String str=GroupTemplateMaster.getInstructionId();
			for(String id:str.split(","))
			{
				int instructionId=Integer.parseInt(id);
				Criteria c = sessionfactory.getCurrentSession().createCriteria(GroupInstructionMaster.class);
				c.add(Restrictions.eq("id", instructionId));
				c.add(Restrictions.eq("deleted", "N"));
				GroupInstructionMaster obj=(GroupInstructionMaster) c.uniqueResult();
				list.add(obj);
			}
			GroupTemplateMaster.setGroupInstructionMaster(list);
			
		} catch (Exception e) {
		e.printStackTrace();
			log.error("Excetion...> ", e);
		}
		return GroupTemplateMaster;
	}
	@Override
	public Integer saveInstructionDd(String obj) {
		try {
			
			Session session = sessionfactory.getCurrentSession();
			DoctorDeskInstructionDto doctordeskinstructiondto = (DoctorDeskInstructionDto) ConfigUIJSONUtility.getObjectFromJSON(obj, DoctorDeskInstructionDto.class);
			for (int i = 0; i < doctordeskinstructiondto.getDoctordeskinstructiondtolist().size(); i++) {
				
				DoctorDeskInstructionDto slave = new DoctorDeskInstructionDto();
				slave = doctordeskinstructiondto.getDoctordeskinstructiondtolist().get(i);
				
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(DoctorDeskInstructionDto.class);
				criteria.add(Restrictions.eq("instruction_name",slave.getInstruction_name()));
				criteria.add(Restrictions.eq("treatment_id",slave.getTreatment_id()));
				criteria.setProjection(Projections.rowCount());
				Long count = (Long) criteria.uniqueResult();
				
				if(count == 0)
				{
					if(slave.getInstruction_id() == 0)
					{
					 session.merge(slave);
					}
					else
					{
					 session.merge(slave);
					}
				}
				
			}
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Excetion...> ", e);
		}
		return 0;
	}
	@Override
	public List<DoctorDeskInstructionDto> fetchInstruction(Integer tid) {
		 List<DoctorDeskInstructionDto> list=new ArrayList<DoctorDeskInstructionDto>();
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(DoctorDeskInstructionDto.class);
			criteria.add(Restrictions.eq("treatment_id",tid ));
			criteria.add(Restrictions.eq("deleted", "N"));
			list = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Excetion...> ", e);
		}
		return list;
	}
	@Override
	public Doctordeskopderdto coverShitInformationPatient(Integer t_id, Integer d_id) {
		Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
		try {
			if(d_id == 1 || d_id == 3)
			{
			
				String sql="SELECT     " + 
						"    `p`.`patient_id` AS `patient_id`,    " + 
						"    `p`.`center_patient_id` AS `center_patient_id`,    " + 
						"    `p`.`gender` AS `gender`,    " + 
						"    `p`.`age` AS `age`,    " + 
						"    `r`.`bill_id` AS `bill_id`,    " + 
						"    `t`.`treatment_id` AS `treatment_id`,    " + 
						"    `t`.`opdipdno` AS `opdipdno`,    " + 
						"    `r`.`created_date_time` AS `created_date_time`,    " + 
						"    CONCAT(`p`.`prefix`,    " + 
						"            ' ',    " + 
						"            `p`.`f_name`,    " + 
						"            ' ',    " + 
						"            `p`.`m_name`,    " + 
						"            ' ',    " + 
						"            `p`.`l_name`) AS `patient_name`,    " + 
						"    GROUP_CONCAT(IFNULL(`d`.`doc_name`, 'NONE')    " + 
						"        SEPARATOR ',') AS `doc_name`,    " + 
						"    (SELECT     " + 
						"            IFNULL(`category_name`, '-')    " + 
						"        FROM    " + 
						"            ehat_charges_master_slave cm    " + 
						"        WHERE    " + 
						"            `cm`.`id` = `r`.`charges_slave_id`) AS sponsor,    " + 
						"    (SELECT     " + 
						"            IFNULL(`cd`.`docName`, '-')    " + 
						"        FROM    " + 
						"            chanelling_doctor cd    " + 
						"        WHERE    " + 
						"            `cd`.`channDocId` = `t`.`ref_doc_id`) AS ref_doc,    " + 
						"            `p`.`mrnno` As `mrnnop`,    " + 
						"             `p`.`dob` As `dob`,    " +
						"	p.image_name as image_name"+
						"            ,    " + 
						"	p.age_months as age_months"+
						"            ,    " + 
						"	p.age_days as age_days"+
						"                " + 
						"	FROM    " + 
						"    ehat_bill_details r,    " + 
						"    ehat_patient p,    " + 
						"    ehat_treatment t,    " + 
						"    doctor d,    " + 
						"    ehat_subservice s    " + 
						"	WHERE    " + 
						"    `r`.`patient_id` = `p`.`patient_id`    " + 
						"        AND `r`.`treatment_id` = `t`.`treatment_id`    " + 
						"        AND `d`.`Doctor_ID` = `r`.`doctor_id`    " + 
						"        AND `s`.`id` = `r`.`sub_service_id`    " + 
						"        AND (`r`.`deleted` = 'N')    " + 
						"          " + 
						"        AND t.treatment_id = ?    " + 
						"        AND t.department_id = ?";
				
				
				
				Query query=sessionfactory.getCurrentSession().createSQLQuery(sql);
				
					  query.setParameter(0,  t_id);
					  query.setParameter(1,  d_id);
					  System.out.println(query);
				Object[] obj=(Object[]) query.uniqueResult();
				regtrebilldto.setPatientId((int) obj[0]);
				regtrebilldto.setCenterPatientId((String) obj[1]);
				regtrebilldto.setGender((String) obj[2] );
				String page=Integer.toString((int) obj[3]);
				regtrebilldto.setAge(page);
				regtrebilldto.setBillId((int) obj[4]);
				regtrebilldto.setTreatmentId((int) obj[5]);
				regtrebilldto.setOpdipdno((String) obj[6]);
				regtrebilldto.setCreatedDateTime((Date) obj[7]);
				regtrebilldto.setPatientName((String) obj[8]);
				regtrebilldto.setDocName((String) obj[9]);
				regtrebilldto.setCategoryName((String) obj[10]);
				regtrebilldto.setRef_doc_name((String) obj[11]);
				regtrebilldto.setMrnno((String) obj[12]);
				regtrebilldto.setDob((String) obj[13]);
				regtrebilldto.setImageName((String) obj[14]);
				regtrebilldto.setAge_months((int) obj[15] );
				regtrebilldto.setAge_days((int) obj[16] );
			
				
			}
			else if(d_id == 2)
			{
				String sql="SELECT     " + 
						"    `p`.`patient_id` AS `patient_id`,    " + 
						"    `p`.`center_patient_id` AS `center_patient_id`,    " + 
						"    `p`.`gender` AS `gender`,    " + 
						"    `p`.`age` AS `age`,    " + 
						"    `r`.`bill_id` AS `bill_id`,    " + 
						"    `r`.`treatment_id` AS `treatment_id`,    " + 
						"    `t`.`opdipdno` AS `opdipdno`,    " + 
						"    `r`.`created_date_time` AS `created_date_time`,    " + 
						"    CONCAT(`p`.`prefix`,    " + 
						"            ' ',    " + 
						"            `p`.`f_name`,    " + 
						"            ' ',    " + 
						"            `p`.`m_name`,    " + 
						"            ' ',    " + 
						"            `p`.`l_name`) AS `patient_name`,    " + 
						"    GROUP_CONCAT(IFNULL(`d`.`doc_name`, 'NONE')    " + 
						"        SEPARATOR ',') AS `doc_name`,    " + 
						"    (SELECT     " + 
						"            IFNULL(`category_name`, '-')    " + 
						"        FROM    " + 
						"            ehat_charges_master_slave cm    " + 
						"        WHERE    " + 
						"            `cm`.`id` = `r`.`charges_slave_id`) AS sponsor,    " + 
						"    (SELECT     " + 
						"            IFNULL(`cd`.`docName`, '-')    " + 
						"        FROM    " + 
						"            chanelling_doctor cd    " + 
						"        WHERE    " + 
						"            `cd`.`channDocId` = `t`.`ref_doc_id`) AS ref_doc,    " + 
						"            `p`.`mrnno` As `mrnnop`,    " + 
						"             `p`.`dob` As `dob`,    " +
						"	p.image_name as image_name"+
						"            ,    " + 
						"	p.age_months as age_months"+
						"            ,    " + 
						"	p.age_days as age_days"+
						"                " + 
						"	FROM    " + 
						"    ehat_bill_details_ipd r,    " + 
						"    ehat_patient p,    " + 
						"    ehat_treatment t,    " + 
						"    doctor d,    " + 
						"    ehat_subservice s    " + 
						"	WHERE    " + 
						"    `r`.`patient_id` = `p`.`patient_id`    " + 
						"        AND `r`.`treatment_id` = `t`.`treatment_id`    " + 
						"        AND `d`.`Doctor_ID` = `r`.`doctor_id`    " + 
						"        AND `s`.`id` = `r`.`sub_service_id`    " + 
						"        AND (`r`.`deleted` = 'N')    " + 
						"          " + 
						"        AND t.treatment_id = ?    " + 
						"        AND t.department_id = ?";
			Query query=sessionfactory.getCurrentSession().createSQLQuery(sql);
				  query.setParameter(0,  t_id);
				  query.setParameter(1,  d_id);
			Object[] obj=(Object[]) query.uniqueResult();
			regtrebilldto.setPatientId((int) obj[0]);
			regtrebilldto.setCenterPatientId((String) obj[1]);
			regtrebilldto.setGender((String) obj[2] );
			String page=Integer.toString((int) obj[3]);
			regtrebilldto.setAge(page);
			regtrebilldto.setBillId((int) obj[4]);
			regtrebilldto.setTreatmentId((int) obj[5]);
			regtrebilldto.setOpdipdno((String) obj[6]);
			regtrebilldto.setCreatedDateTime((Date) obj[7]);
			regtrebilldto.setPatientName((String) obj[8]);
			regtrebilldto.setDocName((String) obj[9]);
			regtrebilldto.setCategoryName((String) obj[10]);
			regtrebilldto.setRef_doc_name((String) obj[11]);
			regtrebilldto.setMrnno((String) obj[12]);
			regtrebilldto.setDob((String) obj[13]);
			regtrebilldto.setImageName((String) obj[14]);
			regtrebilldto.setAge_months((int) obj[15] );
			regtrebilldto.setAge_days((int) obj[16] );
			}
			else if(d_id == -5)
			{
				String sql="SELECT     " + 
						"    `p`.`patient_id` AS `patient_id`,    " + 
						"    `p`.`center_patient_id` AS `center_patient_id`,    " + 
						"    `p`.`gender` AS `gender`,    " + 
						"    `p`.`age` AS `age`,    " + 
						"    `r`.`bill_id` AS `bill_id`,    " + 
						"    `t`.`treatment_id` AS `treatment_id`,    " + 
						"    `t`.`opdipdno` AS `opdipdno`,    " + 
						"    `r`.`created_date_time` AS `created_date_time`,    " + 
						"    CONCAT(`p`.`prefix`,    " + 
						"            ' ',    " + 
						"            `p`.`f_name`,    " + 
						"            ' ',    " + 
						"            `p`.`m_name`,    " + 
						"            ' ',    " + 
						"            `p`.`l_name`) AS `patient_name`,    " + 
						"    GROUP_CONCAT(IFNULL(`d`.`doc_name`, 'NONE')    " + 
						"        SEPARATOR ',') AS `doc_name`,    " + 
						"    (SELECT     " + 
						"            IFNULL(`category_name`, '-')    " + 
						"        FROM    " + 
						"            ehat_charges_master_slave cm    " + 
						"        WHERE    " + 
						"            `cm`.`id` = `r`.`charges_slave_id`) AS sponsor,    " + 
						"    (SELECT     " + 
						"            IFNULL(`cd`.`docName`, '-')    " + 
						"        FROM    " + 
						"            chanelling_doctor cd    " + 
						"        WHERE    " + 
						"            `cd`.`channDocId` = `t`.`ref_doc_id`) AS ref_doc,    " + 
						"            `p`.`mrnno` As `mrnnop`,    " + 
						"             `p`.`dob` As `dob`,    " +
						"	p.image_name as image_name"+
						"            ,    " + 
						"	p.age_months as age_months"+
						"            ,    " + 
						"	p.age_days as age_days"+
						"                " + 
						"FROM    " + 
						"    ehat_bill_details_ipd r,    " + 
						"    ehat_patient p,    " + 
						"    ehat_treatment t,    " + 
						"    doctor d,    " + 
						"    ehat_subservice s    " + 
						"WHERE    " + 
						"    `r`.`patient_id` = `p`.`patient_id`    " + 
						"        AND `r`.`treatment_id` = `t`.`treatment_id`    " + 
						"        AND `d`.`Doctor_ID` = `r`.`doctor_id`    " + 
						"        AND `s`.`id` = `r`.`sub_service_id`    " + 
						"        AND (`r`.`deleted` = 'N')    " + 
						"         AND (`p`.`emergency` = 'Y')    " + 
						"        AND t.treatment_id = ?    " + 
						"      ";
				Query query=sessionfactory.getCurrentSession().createSQLQuery(sql);
				  query.setParameter(0,  t_id);
			Object[] obj=(Object[]) query.uniqueResult();
			regtrebilldto.setPatientId((int) obj[0]);
			regtrebilldto.setCenterPatientId((String) obj[1]);
			regtrebilldto.setGender((String) obj[2] );
			String page=Integer.toString((int) obj[3]);
			regtrebilldto.setAge(page);
			regtrebilldto.setBillId((int) obj[4]);
			regtrebilldto.setTreatmentId((int) obj[5]);
			regtrebilldto.setOpdipdno((String) obj[6]);
			regtrebilldto.setCreatedDateTime((Date) obj[7]);
			regtrebilldto.setPatientName((String) obj[8]);
			regtrebilldto.setDocName((String) obj[9]);
			regtrebilldto.setCategoryName((String) obj[10]);
			regtrebilldto.setRef_doc_name((String) obj[11]);
			regtrebilldto.setMrnno((String) obj[12]);
			regtrebilldto.setDob((String) obj[13]);
			regtrebilldto.setImageName((String) obj[14]);
			regtrebilldto.setAge_months((int) obj[15] );
			regtrebilldto.setAge_days((int) obj[16] );
			
			}
			else if(d_id == 4)
			{
				String sql="SELECT     " + 
						"    `p`.`patient_id` AS `patient_id`,    " + 
						"    `p`.`center_patient_id` AS `center_patient_id`,    " + 
						"    `p`.`gender` AS `gender`,    " + 
						"    `p`.`age` AS `age`,    " + 
						"    `r`.`bill_id` AS `bill_id`,    " + 
						"    `t`.`treatment_id` AS `treatment_id`,    " + 
						"    `t`.`opdipdno` AS `opdipdno`,    " + 
						"    `r`.`created_date_time` AS `created_date_time`,    " + 
						"    CONCAT(`p`.`prefix`,    " + 
						"            ' ',    " + 
						"            `p`.`f_name`,    " + 
						"            ' ',    " + 
						"            `p`.`m_name`,    " + 
						"            ' ',    " + 
						"            `p`.`l_name`) AS `patient_name`,    " + 
						"    GROUP_CONCAT(IFNULL(`d`.`doc_name`, 'NONE')    " + 
						"        SEPARATOR ',') AS `doc_name`,    " + 
						"    (SELECT     " + 
						"            IFNULL(`category_name`, '-')    " + 
						"        FROM    " + 
						"            ehat_charges_master_slave cm    " + 
						"        WHERE    " + 
						"            `cm`.`id` = `r`.`charges_slave_id`) AS sponsor,    " + 
						"    (SELECT     " + 
						"            IFNULL(`cd`.`docName`, '-')    " + 
						"        FROM    " + 
						"            chanelling_doctor cd    " + 
						"        WHERE    " + 
						"            `cd`.`channDocId` = `t`.`ref_doc_id`) AS ref_doc,    " + 
						"            `p`.`mrnno` As `mrnnop`,    " + 
						"             `p`.`dob` As `dob`,    " +
						"	p.image_name as image_name"+
						"            ,    " + 
						"	p.age_months as age_months"+
						"            ,    " + 
						"	p.age_days as age_days"+
						"                " + 
						"	FROM    " + 
						"    ehat_bill_details r,    " + 
						"    ehat_patient p,    " + 
						"    ehat_treatment t,    " + 
						"    doctor d,    " + 
						"    ehat_subservice s    " + 
						"	WHERE    " + 
						"    `r`.`patient_id` = `p`.`patient_id`    " + 
						"        AND `r`.`treatment_id` = `t`.`treatment_id`    " + 
						"        AND `d`.`Doctor_ID` = `r`.`doctor_id`    " + 
						"        AND `s`.`id` = `r`.`sub_service_id`    " + 
						"        AND (`r`.`deleted` = 'N')    " + 
						"        AND t.treatment_id = ?    " + 
						"      ";
				Query query=sessionfactory.getCurrentSession().createSQLQuery(sql);
				  query.setParameter(0,  t_id);
			Object[] obj=(Object[]) query.uniqueResult();
			regtrebilldto.setPatientId((int) obj[0]);
			regtrebilldto.setCenterPatientId((String) obj[1]);
			regtrebilldto.setGender((String) obj[2] );
			String page=Integer.toString((int) obj[3]);
			regtrebilldto.setAge(page);
			regtrebilldto.setBillId((int) obj[4]);
			regtrebilldto.setTreatmentId((int) obj[5]);
			regtrebilldto.setOpdipdno((String) obj[6]);
			regtrebilldto.setCreatedDateTime((Date) obj[7]);
			regtrebilldto.setPatientName((String) obj[8]);
			regtrebilldto.setDocName((String) obj[9]);
			regtrebilldto.setCategoryName((String) obj[10]);
			regtrebilldto.setRef_doc_name((String) obj[11]);
			regtrebilldto.setMrnno((String) obj[12]);
			regtrebilldto.setDob((String) obj[13]);
			regtrebilldto.setImageName((String) obj[14]);
			regtrebilldto.setAge_months((int) obj[15] );
			regtrebilldto.setAge_days((int) obj[16] );
			
				
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Excetion...> ", e);
		}
		System.out.println(regtrebilldto);
		return regtrebilldto;
	}
	
	
	@Override
	public int saveIndivisualInstruction(OPDReportInstructionDTO obj) {
		try {
			
			  if(obj.getReportInstructionID()==0) {
				  sessionfactory.getCurrentSession().merge(obj);
				  return 1;
				  
			  }else {
				  sessionfactory.getCurrentSession().merge(obj);
				  return 2;
			  }
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}
	@Override
	public List<OPDReportInstructionDTO> getListOfIndivisualInstruction() {
		List<OPDReportInstructionDTO> list=new ArrayList<OPDReportInstructionDTO>();
		try {
		 Criteria c=sessionfactory.getCurrentSession().createCriteria(OPDReportInstructionDTO.class);
		 c.add(Restrictions.eq("deleted", "N"));
		 list= c.list();
		 
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	@Override
	public int deleteIndivisualInstruction(String instructionId, Integer userId) {
		int msg=0;
		try{
			
			Query itemInfo = sessionfactory.getCurrentSession().createSQLQuery("update reportinstruction set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where reportInstructionID in("+instructionId+")");
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}
	@Override
	public OPDReportInstructionDTO editIndivisualInstruction(Integer instructionId) {
		OPDReportInstructionDTO obj=new OPDReportInstructionDTO();
		try {
			
			obj=	(OPDReportInstructionDTO) sessionfactory.getCurrentSession().get(OPDReportInstructionDTO.class, instructionId);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	@Override
	public List<OPDReportInstructionDTO> getIndivisualInstructions(Integer unitId, Integer treatmentId) {
		// TODO Auto-generated method stub
		
		List<OPDReportInstructionDTO> list = new ArrayList<OPDReportInstructionDTO>();
		
		try {
			
			String sql = "SELECT    " + 
					"	m.*    " + 
					"FROM    " + 
					"(    " + 
					"SELECT     " + 
					"    DISTINCT r.reportInstructionID,    " + 
					"    r.reportInstruction,    " + 
					"    r.mandatoryInstFlag    " + 
					"FROM    " + 
					"    reportinstruction r    " + 
					"        LEFT JOIN    " + 
					"    dd_individualtreatmentinstruction dd ON (dd.reportInstruction_ID_FK = r.reportInstructionID)    " + 
					"WHERE    " + 
					"   dd.treatmentId =   " + treatmentId +
					"       " + 
					"	UNION ALL    " + 
					"    " + 
					"SELECT     " + 
					"    DISTINCT reportInstructionID,    " + 
					"    reportInstruction,    " + 
					"    mandatoryInstFlag AS status    " + 
					"FROM    " + 
					"	reportinstruction    " + 
					"WHERE     " + 
					"	unit_id =   " + unitId +
					"		AND    " + 
					"	reportInstructionID NOT IN (SELECT CONCAT(reportInstruction_ID_FK) FROM dd_individualtreatmentinstruction WHERE treatmentId = "+treatmentId+")    " + 
					") m ORDER BY m.reportInstructionID";
			SQLQuery sqlresult = sessionfactory.getCurrentSession().createSQLQuery(sql);
			sqlresult.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> sqllist = sqlresult.list();
			
			for(Map<String, Object> rs : sqllist)
			{
				OPDReportInstructionDTO obj = new OPDReportInstructionDTO();
				
				obj.setReportInstructionID((Integer) rs.get("reportInstructionID"));
				obj.setReportInstruction((String) rs.get("reportInstruction"));
				obj.setMandatoryInstFlag((String) rs.get("mandatoryInstFlag"));
				
				
				 Integer reportInstructionID =(Integer) rs.get("reportInstructionID");
				 
				 Query queryCnt = sessionfactory.getCurrentSession().createQuery("select count(*) from IndividualTreatmentInstructionDto where treatmentId='" + treatmentId + "' "
				 		+ "AND reportInstruction_ID_FK = "+reportInstructionID);
				 Long cnt = (Long) queryCnt.uniqueResult();
				 if(cnt!=0) {
					 
					 obj.setMandatoryCheckedFlag("Y");
				 }
				 if(cnt==0) {
					 obj.setMandatoryCheckedFlag("N");
				 }
				 
				 
				
				
				list.add(obj);
			}
			
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
	
	
}
