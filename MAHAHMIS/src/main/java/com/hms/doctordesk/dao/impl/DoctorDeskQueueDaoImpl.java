package com.hms.doctordesk.dao.impl;

import java.math.BigInteger;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.DoctorDeskQueueDao;
import com.hms.doctordesk.dto.DoctorDeskCountDto;
import com.hms.doctordesk.dto.Doctordeskipddto;
import com.hms.doctordesk.dto.Doctordeskopderdto;

@Repository
public class DoctorDeskQueueDaoImpl implements DoctorDeskQueueDao {

	@Autowired
	SessionFactory sessionfactory;
	static Logger log = Logger.getLogger(DoctorDeskQueueDaoImpl.class.getName());

	@Override
	public List<Doctordeskopderdto> fetchDoctorDeskDeshboard(Integer depid, Integer unitId, Integer userId1,
			String userType,Integer startIndex) {
		ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");
		String doctorDeskFlag =resourceBundle.getObject("doctorDeskFlag").toString();
		List<Doctordeskopderdto> list = new ArrayList<Doctordeskopderdto>();
		String s=userId1.toString();
		try {
			if (userType.equalsIgnoreCase("doctor") || userType.equalsIgnoreCase("admin")) {			
				if (depid == 1 || depid == 3) {
				
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
					Disjunction or = Restrictions.disjunction();
					or.add(Restrictions.eq("departmentId", depid));
					or.add(Restrictions.eq("departmentId", 3));
					criteria.add(or);
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					
					//code for show list on doctordesk usertype doctor wise
					if(userType.equalsIgnoreCase("doctor")) {
						criteria.add(Restrictions.eq("doctorId", s));
					}
					criteria.addOrder(Order.desc("createdDateTime"));
					if(doctorDeskFlag.equalsIgnoreCase("off")) {
						criteria.add(Restrictions.gt("totPaid", 0.0));
					}
					criteria.setFirstResult(startIndex);
					criteria.setMaxResults(10);
					list = criteria.list();
					
					
				} else if (depid == -5) {
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
					criteria.add(Restrictions.eq("departmentId", depid));
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.addOrder(Order.desc("createdDateTime"));
					criteria.setFirstResult(startIndex);
					criteria.setMaxResults(10);
					list = criteria.list();
				}
				else if (depid == 4) {
				String sql1=" SELECT DISTINCT\n" + 
						"    p.patient_id,\n" +  
						"    CONCAT(IFNULL(p.prefix, ''),\n" + 
						"            ' ',\n" + 
						"            IFNULL(p.f_name, ''),\n" + 
						"            ' ',\n" + 
						"            IFNULL(p.m_name, ''),\n" + 
						"            ' ',\n" + 
						"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
						"    CONCAT(p.age,\n" + 
						"            'Y/',\n" + 
						"            p.age_months,\n" + 
						"            'M/',\n" + 
						"            p.age_days,\n" + 
						"            'D') AS patient_age,\n" + 
						"    p.gender,\n" + 
						"    p.age,\n" + 
						"    p.mobile,\n" + 
						"    p.mrnno,\n" + 
						"    t.created_date_time AS register,\n" + 
						"    t.department_id,\n" + 
						"    t.treatment_id AS treatment_id,\n" + 
						"    p.center_patient_id\n" +
						"FROM\n" + 
						"    ehat_patient p\n" + 
						"        INNER JOIN\n" + 
						"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
						"WHERE\n" + 
						"    t.t_flag = 'N'\n" + 
						"    order by t.created_date_time desc\n" + 
						"LIMIT "+startIndex+",10\n" ; 
						
						
						Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
						List<Object[]> obj=query.list();
						for(Object[] reg : obj)
						{
							Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
							regtrebilldto.setPatientId((int) reg[0]);
							regtrebilldto.setPatientName((String) reg[1]);
							regtrebilldto.setAge((String) reg[2]);
							regtrebilldto.setGender((String) reg[3]);
							regtrebilldto.setP_age((int) reg[4]);
							regtrebilldto.setMobile((String) reg[5]);
							regtrebilldto.setMrnno((String) reg[6]);
							regtrebilldto.setCreatedDateTime((Date) reg[7]);
							regtrebilldto.setDepartmentId((int) reg[8]);
							regtrebilldto.setTreatmentId((int) reg[9]);
							regtrebilldto.setCenterPatientId((String) reg[10]);
							list.add(regtrebilldto);
						}
						for(Doctordeskopderdto o:list)
						{
							String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
							Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
								  query1.setParameter(0, o.getTreatmentId());
								  Object[] tri=(Object[]) query1.uniqueResult();
								  if(tri != null)
								  {
									  Integer idm=(Integer) tri[0];
									  String mlc = Integer.toString(idm); 
									  o.setMlc_id(mlc);
								  }
								  
							String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
							Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
							  query2.setParameter(0, o.getTreatmentId());
							  Object[] tn=(Object[]) query2.uniqueResult();
							  if(tn != null)
							  {
								  Integer tid=(Integer) tn[0];
								  String tokan = Integer.toString(tid); 
								  o.setTokenno(tokan);
							  }
							 
						}
				}
			}
			else {
				
				if (depid == 1 || depid == 3) {
				
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
					Disjunction or = Restrictions.disjunction();
					or.add(Restrictions.eq("departmentId", depid));
					or.add(Restrictions.eq("departmentId", 3));
					criteria.add(or);
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					
					//code for show list on doctordesk usertype doctor wise
					if(userType.equalsIgnoreCase("doctor")) {
						criteria.add(Restrictions.eq("doctorId", s));
					}
					criteria.addOrder(Order.desc("createdDateTime"));
					if(doctorDeskFlag.equalsIgnoreCase("off")) {
						criteria.add(Restrictions.gt("totPaid", 0.0));
					}
					criteria.setFirstResult(startIndex);
					criteria.setMaxResults(10);
					list = criteria.list();
					
					
				} else if (depid == -5) {
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
					criteria.add(Restrictions.eq("departmentId", depid));
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.addOrder(Order.desc("createdDateTime"));
					criteria.setFirstResult(startIndex);
					criteria.setMaxResults(10);
					list = criteria.list();
				}
				else if (depid == 4) {
				String sql1=" SELECT DISTINCT\n" + 
						"    p.patient_id,\n" +  
						"    CONCAT(IFNULL(p.prefix, ''),\n" + 
						"            ' ',\n" + 
						"            IFNULL(p.f_name, ''),\n" + 
						"            ' ',\n" + 
						"            IFNULL(p.m_name, ''),\n" + 
						"            ' ',\n" + 
						"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
						"    CONCAT(p.age,\n" + 
						"            'Y/',\n" + 
						"            p.age_months,\n" + 
						"            'M/',\n" + 
						"            p.age_days,\n" + 
						"            'D') AS patient_age,\n" + 
						"    p.gender,\n" + 
						"    p.age,\n" + 
						"    p.mobile,\n" + 
						"    p.mrnno,\n" + 
						"    t.created_date_time AS register,\n" + 
						"    t.department_id,\n" + 
						"    t.treatment_id AS treatment_id,\n" + 
						"    p.center_patient_id\n" +
						"FROM\n" + 
						"    ehat_patient p\n" + 
						"        INNER JOIN\n" + 
						"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
						"WHERE\n" + 
						"    t.t_flag = 'N'\n" + 
						"    order by t.created_date_time desc\n" + 
						"LIMIT "+startIndex+",10\n" ; 
						
						
						Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
						List<Object[]> obj=query.list();
						for(Object[] reg : obj)
						{
							Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
							regtrebilldto.setPatientId((int) reg[0]);
							regtrebilldto.setPatientName((String) reg[1]);
							regtrebilldto.setAge((String) reg[2]);
							regtrebilldto.setGender((String) reg[3]);
							regtrebilldto.setP_age((int) reg[4]);
							regtrebilldto.setMobile((String) reg[5]);
							regtrebilldto.setMrnno((String) reg[6]);
							regtrebilldto.setCreatedDateTime((Date) reg[7]);
							regtrebilldto.setDepartmentId((int) reg[8]);
							regtrebilldto.setTreatmentId((int) reg[9]);
							regtrebilldto.setCenterPatientId((String) reg[10]);
							list.add(regtrebilldto);
						}
						for(Doctordeskopderdto o:list)
						{
							String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
							Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
								  query1.setParameter(0, o.getTreatmentId());
								  Object[] tri=(Object[]) query1.uniqueResult();
								  if(tri != null)
								  {
									  Integer idm=(Integer) tri[0];
									  String mlc = Integer.toString(idm); 
									  o.setMlc_id(mlc);
								  }
								  
							String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
							Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
							  query2.setParameter(0, o.getTreatmentId());
							  Object[] tn=(Object[]) query2.uniqueResult();
							  if(tn != null)
							  {
								  Integer tid=(Integer) tn[0];
								  String tokan = Integer.toString(tid); 
								  o.setTokenno(tokan);
							  }
							 
						}
				}
			
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Exception ..> ", e);
		}
		return list;
	}

	@Override
	public List<Doctordeskipddto> fetchIpdDoctorDeskDeshboard(Integer depid, Integer unitId, Integer userId1,
			String userType,Integer startIndex) {
		List<Doctordeskipddto> list = new ArrayList<Doctordeskipddto>();
		String s1=userId1.toString();
		try {			
			if (userType.equalsIgnoreCase("doctor") || userType.equalsIgnoreCase("admin")) {
				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
				criteria.add(Restrictions.eq("departmentId", depid));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.eq("tFlag", "Y"));
				
				//code for show list on doctordesk usertype doctorwise
				if(userType.equalsIgnoreCase("doctor")) {
					criteria.add(Restrictions.eq("doctorId", s1));
				}

				criteria.addOrder(Order.desc("createdDateTime"));
				criteria.setFirstResult(startIndex);
				criteria.setMaxResults(10);
				list = criteria.list();
			}
			else {

				Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
				criteria.add(Restrictions.eq("departmentId", depid));
				criteria.add(Restrictions.eq("unitId", unitId));
				criteria.add(Restrictions.eq("tFlag", "Y"));
				
				//code for show list on doctordesk usertype doctorwise
				if(userType.equalsIgnoreCase("doctor")) {
					criteria.add(Restrictions.eq("doctorId", s1));
				}

				criteria.addOrder(Order.desc("createdDateTime"));
				criteria.setFirstResult(startIndex);
				criteria.setMaxResults(10);
				list = criteria.list();
			
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("Exception ..> ", e);
		}
		return list;
	}

	@Override
	public List<Doctordeskopderdto> serachDoctorDeskDeshboard(Integer depid, Integer unitId, Integer userId1,
			String userType, Integer selectsearchby, String value) {
		List<Doctordeskopderdto> list = new ArrayList<Doctordeskopderdto>();
		try {
			if (userType.equalsIgnoreCase("doctor") || userType.equalsIgnoreCase("admin")) {
				if (depid == 1|| depid == 3) {
					if (value.isEmpty()) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else {
						if (selectsearchby == 1) {
							/* Integer patientId = Integer.parseInt(value); */
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("mrnno", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();
						} else if (selectsearchby == 2) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("patientName", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();
						} else if (selectsearchby == 3) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("mobile", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						} else if (selectsearchby == 4) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("age", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						} else if (selectsearchby == 5) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.le("age", value));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						} else if (selectsearchby == 6) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ge("age", value));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						}
					}
				} else if (depid == -5) {
					if (value.isEmpty()) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.add(Restrictions.eq("emergency", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else {

						if (selectsearchby == 1) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("mrnno", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.eq("emergency", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();
						} else if (selectsearchby == 2) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("patientName", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.eq("emergency", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();
						} else if (selectsearchby == 3) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("mobile", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.eq("emergency", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						} else if (selectsearchby == 4) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ilike("age", value, MatchMode.ANYWHERE));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.eq("emergency", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						} else if (selectsearchby == 5) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.le("age", value));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.eq("emergency", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						} else if (selectsearchby == 6) {
							Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
							criteria.add(Restrictions.ge("age", value));
							criteria.add(Restrictions.eq("departmentId", depid));
							criteria.add(Restrictions.eq("unitId", unitId));
							criteria.add(Restrictions.eq("tFlag", "Y"));
							criteria.add(Restrictions.eq("emergency", "Y"));
							criteria.setMaxResults(10);
							list = criteria.list();

						}

					}
				}
				if(depid == 4)
				{
					if(value.isEmpty())
					{

						String sql1=" SELECT DISTINCT\n" + 
								"    p.patient_id,\n" + 
								"    CONCAT(IFNULL(p.prefix, ''),\n" + 
								"            ' ',\n" + 
								"            IFNULL(p.f_name, ''),\n" + 
								"            ' ',\n" + 
								"            IFNULL(p.m_name, ''),\n" + 
								"            ' ',\n" + 
								"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
								"    CONCAT(p.age,\n" + 
								"            'Y/',\n" + 
								"            p.age_months,\n" + 
								"            'M/',\n" + 
								"            p.age_days,\n" + 
								"            'D') AS patient_age,\n" + 
								"    p.gender,\n" + 
								"    p.age,\n" + 
								"    p.mobile,\n" + 
								"    p.mrnno,\n" + 
								"    t.created_date_time AS register,\n" + 
								"    t.department_id,\n" + 
								"    t.treatment_id AS treatment_id,\n" +
								"    p.center_patient_id\n" +
								"FROM\n" + 
								"    ehat_patient p\n" + 
								"        INNER JOIN\n" + 
								"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
								"WHERE\n" + 
								"    t.t_flag = 'N' \n" + 
								"    order by t.created_date_time desc\n" + 
								"LIMIT 10\n" ; 
								
								
								Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
								List<Object[]> obj=query.list();
								
								for(Object[] reg : obj)
								{
									Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
									regtrebilldto.setPatientId((int) reg[0]);
									regtrebilldto.setPatientName((String) reg[1]);
									regtrebilldto.setAge((String) reg[2]);
									regtrebilldto.setGender((String) reg[3]);
									regtrebilldto.setP_age((int) reg[4]);
									regtrebilldto.setMobile((String) reg[5]);
									regtrebilldto.setMrnno((String) reg[6]);
									regtrebilldto.setCreatedDateTime((Date) reg[7]);
									regtrebilldto.setDepartmentId((int) reg[8]);
									regtrebilldto.setTreatmentId((int) reg[9]);
									regtrebilldto.setCenterPatientId((String) reg[10]);
									list.add(regtrebilldto);
								}
								for(Doctordeskopderdto o:list)
								{
									String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
									Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
										  query1.setParameter(0, o.getTreatmentId());
										  Object[] tri=(Object[]) query1.uniqueResult();
										  if(tri != null)
										  {
											  Integer idm=(Integer) tri[0];
											  String mlc = Integer.toString(idm); 
											  o.setMlc_id(mlc);
										  }
										  
									String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
									Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
									  query2.setParameter(0, o.getTreatmentId());
									  Object[] tn=(Object[]) query2.uniqueResult();
									  if(tn != null)
									  {
										  Integer tid=(Integer) tn[0];
										  String tokan = Integer.toString(tid); 
										  o.setTokenno(tokan);
									  }
									 
								}
					}
					else
					{
						if(selectsearchby == 1)
						{

							String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N' AND p.patient_id=?\n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									      query.setParameter(0, value);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
							
						
						}
						else if(selectsearchby == 2)
						{
							String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N'  AND CONCAT(IFNULL(p.prefix, ''),' ',IFNULL(p.f_name, ''),' ',IFNULL(p.m_name, ''),' ',IFNULL(p.l_name, '')) LIKE '%"+value+"%' \n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
							
						}
						else if(selectsearchby == 3)
						{
							String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N'  AND p.mobile LIKE '%"+value+"%' \n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
							
						}
						else if(selectsearchby == 4)
						{
							
							String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N'  AND p.age=? \n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									 query.setParameter(0, value);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
						}
							
						else if(selectsearchby == 5)
						{

							String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N'  AND p.age<=? \n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									 query.setParameter(0, value);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
						}
						else if(selectsearchby == 6)
						{
							String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N' AND p.age>=?\n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									 query.setParameter(0, value);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
							
						}
					}
				}

			}

		} catch (Exception e) {
			e.printStackTrace();
			log.error("Exception ..> ", e);
		}
		return list;
	}

	@Override
	public List<Doctordeskipddto> serachDoctorDeskDeshboardIpd(Integer depid, Integer unitId, Integer userId1,
			String userType, Integer selectsearchby, String value) {
		List<Doctordeskipddto> list = new ArrayList<Doctordeskipddto>();
		try {
			if (userType.equalsIgnoreCase("doctor") || userType.equalsIgnoreCase("admin")) {

				if (value.isEmpty())

				{
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
					criteria.add(Restrictions.eq("departmentId", depid));
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.setMaxResults(10);
					list = criteria.list();
				} else {
					if (selectsearchby == 1) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
						criteria.add(Restrictions.ilike("mrnno", value, MatchMode.ANYWHERE));
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else if (selectsearchby == 2) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
						criteria.add(Restrictions.ilike("patientName", value, MatchMode.ANYWHERE));
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else if (selectsearchby == 3) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
						criteria.add(Restrictions.ilike("mobile", value, MatchMode.ANYWHERE));
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else if (selectsearchby == 4) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
						criteria.add(Restrictions.ilike("age", value, MatchMode.ANYWHERE));
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else if (selectsearchby == 5) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
						criteria.add(Restrictions.le("age", value));
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					} else if (selectsearchby == 6) {
						Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
						criteria.add(Restrictions.ge("age", value));
						criteria.add(Restrictions.eq("departmentId", depid));
						criteria.add(Restrictions.eq("unitId", unitId));
						criteria.add(Restrictions.eq("tFlag", "Y"));
						criteria.setMaxResults(10);
						list = criteria.list();
					}
				}

			}

		} catch (Exception e) {
			log.error("Exception ..> ", e);
		}

		return list;
	}

	@Override
	public List<Doctordeskopderdto> serachDateWiseQuque(Integer depid, Integer unitId, Integer userId1, String userType,
			String fdate,String tdate) {
		List<Doctordeskopderdto> list = new ArrayList<Doctordeskopderdto>();

		try {
			if (userType.equalsIgnoreCase("doctor") || userType.equalsIgnoreCase("admin")) {
				DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
				Date fromdate = (Date) df2.parse(fdate);
				Date todate = (Date) df2.parse(tdate);
				
				 Calendar c = Calendar.getInstance();
			        c.setTime(todate);
			        c.add(Calendar.DAY_OF_MONTH, 1);
			        Date currentDatePlusOne = c.getTime();
			//	System.out.println("currentDatePlusOne:"+currentDatePlusOne);
				System.out.println("date: " + fromdate+"----- "+df2.format(fromdate));
				
				if (depid == 1 || depid == 3) {
			
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
					
					criteria.add(Restrictions.gt("createdDateTime",df2.parse(fdate)));
					criteria.add(Restrictions.lt("createdDateTime",currentDatePlusOne));
					criteria.add(Restrictions.eq("departmentId", depid));
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.setMaxResults(10);
					list = criteria.list();
					//System.err.println(list);
				
					
				} else if (depid == -5) {

					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskopderdto.class);
					criteria.add(Restrictions.ge("createdDateTime",df2.parse(fdate)));
					criteria.add(Restrictions.le("createdDateTime",currentDatePlusOne));
					criteria.add(Restrictions.eq("departmentId", depid));
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.add(Restrictions.eq("emergency", "Y"));
					criteria.setMaxResults(10);
					list = criteria.list();
					//System.err.println(list);
				}
				 else if (depid == 4) {
					 {
						 String adddate=df2.format(currentDatePlusOne);
						 String sql1=" SELECT DISTINCT\n" + 
									"    p.patient_id,\n" + 
									"    CONCAT(IFNULL(p.prefix, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.f_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.m_name, ''),\n" + 
									"            ' ',\n" + 
									"            IFNULL(p.l_name, '')) AS pat_Name,\n" + 
									"    CONCAT(p.age,\n" + 
									"            'Y/',\n" + 
									"            p.age_months,\n" + 
									"            'M/',\n" + 
									"            p.age_days,\n" + 
									"            'D') AS patient_age,\n" + 
									"    p.gender,\n" + 
									"    p.age,\n" + 
									"    p.mobile,\n" + 
									"    p.mrnno,\n" + 
									"    t.created_date_time AS register,\n" + 
									"    t.department_id,\n" + 
									"    t.treatment_id AS treatment_id,\n" +
									"    p.center_patient_id\n" +
									"FROM\n" + 
									"    ehat_patient p\n" + 
									"        INNER JOIN\n" + 
									"    ehat_treatment t ON (p.patient_id = t.patient_id)\n" + 
									"WHERE\n" + 
									"    t.t_flag = 'N' AND t.created_date_time BETWEEN '"+df2.format(fromdate)+"' AND '"+adddate+"'\n" + 
									"    order by t.created_date_time desc\n" + 
									"LIMIT 10\n" ; 
									
									
									Query query=sessionfactory.getCurrentSession().createSQLQuery(sql1);
									List<Object[]> obj=query.list();
									
									for(Object[] reg : obj)
									{
										Doctordeskopderdto regtrebilldto=new Doctordeskopderdto();
										regtrebilldto.setPatientId((int) reg[0]);
										regtrebilldto.setPatientName((String) reg[1]);
										regtrebilldto.setAge((String) reg[2]);
										regtrebilldto.setGender((String) reg[3]);
										regtrebilldto.setP_age((int) reg[4]);
										regtrebilldto.setMobile((String) reg[5]);
										regtrebilldto.setMrnno((String) reg[6]);
										regtrebilldto.setCreatedDateTime((Date) reg[7]);
										regtrebilldto.setDepartmentId((int) reg[8]);
										regtrebilldto.setTreatmentId((int) reg[9]);
										regtrebilldto.setCenterPatientId((String) reg[10]);
										list.add(regtrebilldto);
									}
									for(Doctordeskopderdto o:list)
									{
										String sql="SELECT mlc_id,mlc_first_name FROM ehat_mlc_details where treatmentId=?";
										Query query1=sessionfactory.getCurrentSession().createSQLQuery(sql);
											  query1.setParameter(0, o.getTreatmentId());
											  Object[] tri=(Object[]) query1.uniqueResult();
											  if(tri != null)
											  {
												  Integer idm=(Integer) tri[0];
												  String mlc = Integer.toString(idm); 
												  o.setMlc_id(mlc);
											  }
											  
										String sqlt="SELECT token,narration FROM token_number where treatment_id=?"; 
										Query query2=sessionfactory.getCurrentSession().createSQLQuery(sqlt);
										  query2.setParameter(0, o.getTreatmentId());
										  Object[] tn=(Object[]) query2.uniqueResult();
										  if(tn != null)
										  {
											  Integer tid=(Integer) tn[0];
											  String tokan = Integer.toString(tid); 
											  o.setTokenno(tokan);
										  }
										 
									}
						 
					 }
				 }
			}
		} catch (Exception e) {
			log.error("Exception ..> ", e);
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<Doctordeskipddto> serachDateWiseQuqueIpd(Integer depid, Integer unitId, Integer userId1, String userType,
			String fdate,String tdate) {
		List<Doctordeskipddto> list = new ArrayList<Doctordeskipddto>();
		try {
			DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
			Date fromdate = (Date) df2.parse(fdate);
			Date todate = (Date) df2.parse(tdate);
			
			 Calendar c = Calendar.getInstance();
		        c.setTime(todate);
		        c.add(Calendar.DAY_OF_MONTH, 1);
		        Date currentDatePlusOne = c.getTime();
			if (userType.equalsIgnoreCase("doctor") || userType.equalsIgnoreCase("admin")) {

				if (depid == 2) {
					Criteria criteria = sessionfactory.getCurrentSession().createCriteria(Doctordeskipddto.class);
					criteria.add(Restrictions.ge("createdDateTime",df2.parse(fdate)));
					criteria.add(Restrictions.le("createdDateTime",currentDatePlusOne ));
					criteria.add(Restrictions.eq("departmentId", depid));
					criteria.add(Restrictions.eq("unitId", unitId));
					criteria.add(Restrictions.eq("tFlag", "Y"));
					criteria.setMaxResults(10);
					list = criteria.list();
					System.err.println(list);
				}
			}
		} catch (Exception e) {
			log.error("Exception ..> ", e);
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public DoctorDeskCountDto doctorDeskPatientCount(Integer unitid) {
		DoctorDeskCountDto DoctorDeskCountDto=new DoctorDeskCountDto();
		
		
		try {
			String hqlopd=
					//Added By Annapurna
					"SELECT  COUNT(*)FROM  doctordesk_queueopder_details p  WHERE  p.department_Id in(1) and p.unit_id="+unitid+" AND t_flag = 'Y'   ";
				//commented By Annapurna
			//	"SELECT  COUNT(*)FROM  doctordesk_queueopder_details p  WHERE  p.department_Id in(1) AND t_flag = 'Y'  and total_paid>0 ";
			/* SELECT COUNT(*) FROM ehat_patient p JOIN ehat_treatment t ON p.patient_id = t.patient_id WHERE  p.unit_id=? AND t.department_Id in(1,3) AND t_flag = 'Y' ;*/
			
			Query query=sessionfactory.getCurrentSession().createSQLQuery(hqlopd);
				  //query.setParameter(0, unitid);
			BigInteger countopd=(BigInteger) query.uniqueResult();
			  long longValueopd = countopd.longValue(); 
			DoctorDeskCountDto.setOpdcount(longValueopd);
			String hqlipd="SELECT \n" + 
					"    count(*)\n" + 
					"	FROM\n" + 
					"    ehat_patient p\n" + 
					"        JOIN\n" + 
					"    ehat_treatment t ON p.patient_id = t.patient_id\n" + 
					"      join \n" + 
					"	treatment_beds tb on t.treatment_id = tb.Treatment_ID\n" + 
					"      \n" + 
					"	WHERE\n" + 
					"    p.unit_id = ? AND t.department_Id = 2\n" + 
					"        AND t_flag = 'Y' and tb.status = 'Y'";
			Query query1=sessionfactory.getCurrentSession().createSQLQuery(hqlipd);
			      query1.setParameter(0, unitid);
			BigInteger countipd=(BigInteger) query1.uniqueResult();
			  long longValueipd = countipd.longValue(); 
			DoctorDeskCountDto.setIpdcount(longValueipd);
			String hqler="SELECT \n" + 
					"    COUNT(*)\n" + 
					"	FROM\n" + 
					"    ehat_patient p\n" + 
					"        JOIN\n" + 
					"    ehat_treatment t ON p.patient_id = t.patient_id\n" + 
					"	WHERE\n" + 
					"    p.unit_id=? AND t.department_Id=-5\n" + 
					"        AND t_flag = 'Y'";
			Query query2=sessionfactory.getCurrentSession().createSQLQuery(hqler);
			      query2.setParameter(0, unitid);
			BigInteger counter=(BigInteger) query2.uniqueResult();
			  long longValueer= counter.longValue();
				DoctorDeskCountDto.setErcount(longValueer);
			String hqlclosed="SELECT \n" + 
					"    COUNT(*)\n" + 
					"	FROM\n" + 
					"    ehat_patient p\n" + 
					"        JOIN\n" + 
					"    ehat_treatment t ON p.patient_id = t.patient_id\n" + 
					"	WHERE\n" + 
					"    p.unit_id=? \n" + 
					"        AND t_flag = 'N'";
			Query query3=sessionfactory.getCurrentSession().createSQLQuery(hqlclosed);
				  query3.setParameter(0, unitid);
			BigInteger countclosed=(BigInteger) query3.uniqueResult();
			  long longValueclosed= countclosed.longValue();
			DoctorDeskCountDto.setClosedcount(longValueclosed);
		}
		catch(Exception e)	
		{
			e.printStackTrace();
	log.error("Exception ..> ", e);
	}
		return DoctorDeskCountDto;
	}
}
