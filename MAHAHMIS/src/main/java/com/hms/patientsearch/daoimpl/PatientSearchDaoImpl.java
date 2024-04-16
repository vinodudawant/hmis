package com.hms.patientsearch.daoimpl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dto.RegistrationViewDto;
import com.hms.patientsearch.dao.PatientSearchDao;
import com.hms.patientsearch.entity.PatientSearchDTO;

@Repository
public class PatientSearchDaoImpl implements PatientSearchDao {
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public RegistrationViewDto getPatientAutoDetails(PatientSearchDTO obj) {
		String findingName=obj.getSearchText();
		int patSearchType=obj.getSearchType();
		RegistrationViewDto mv = new RegistrationViewDto();
		List<RegistrationViewDto> patList = new ArrayList<RegistrationViewDto> ();
		try {
			String sql = "";
			
			if(obj.getCallFrom().equals("reg")){
			
				sql = getSqlQueryMarkvisit(findingName,patSearchType);
				
			}else if(obj.getCallFrom().equals("prevOpd")){
				
				sql = getSqlQueryPrevOpd(findingName,patSearchType);
				
			}else if(obj.getCallFrom().equals("prevIpd")){
				
				sql = getSqlQueryPrevIpd(findingName,patSearchType);
				
			}
			else if(obj.getCallFrom().equals("prevDiagnostic")) {
				sql = getSqlQueryPrevDiagnostic(findingName,patSearchType);
			}
			else if(obj.getCallFrom().equals("opd")){
				
				sql = getSqlQueryOpd(findingName,patSearchType);
				
			}else if(obj.getCallFrom().equals("ipd")){
				
				sql = getSqlQueryIpd(findingName,patSearchType);
				
			}else if(obj.getCallFrom().equals("diag")){
				
				sql = getSqlQueryDiag(findingName,patSearchType);
				
			}else if(obj.getCallFrom().equals("ivf")){
				
				sql = getSqlQueryIvf(findingName,patSearchType);
				
			}else if(obj.getCallFrom().equals("prevIvf")){
				
				sql = getSqlQueryPreviousIvf(findingName,patSearchType);
			}			
			
			SQLQuery getMaster = sessionFactory.getCurrentSession().createSQLQuery(sql);
			getMaster.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);			   
			List<Map<String, Object>> masterRow = getMaster.list();		          
		    for(Map<String, Object> row : masterRow){
	    		
		    	RegistrationViewDto obj1 = new RegistrationViewDto();
		    	obj1.setPatientName((String)row.get("patient_name"));
		    	obj1.setPtId((Integer)row.get("patient_id"));
		    	obj1.setCenterPatientId((String)row.get("center_patient_id"));
		    	obj1.setMobile((String)row.get("mobile"));
		    	patList.add(obj1);		    	
	    	}
		    mv.setLstRegviewDto(patList);
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return mv;
	}
	
	
String getSqlQueryMarkvisit(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql="SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile FROM ehat_patient p where p.patient_id like '"+findingName+"%' and p.deleted='N' limit 20";
		
		}else if(patSearchType == 2){
			
			sql="SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile FROM ehat_patient p where "
				+" (p.f_name like '"+findingName+"%' "
				+" OR p.l_name like '"+findingName+"%' "
				+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
				+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
				+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
				+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') "
				+" and p.deleted = 'N' limit 20";						
		
		}else if(patSearchType == 3){
			
			sql="SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile FROM ehat_patient p where p.mobile like '"+findingName+"%' and p.deleted='N' limit 20";
		}
		
		return sql;
	}
	
	String getSqlQueryPrevOpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=1 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where  t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}

	String getSqlQueryPrevIpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.t_flag = 'N' and t.department_id=2 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.t_flag = 'N' and t.department_id=2 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.t_flag = 'N' and t.department_id=2 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
String getSqlQueryPrevDiagnostic(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.t_flag = 'N' and t.department_id=3 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.t_flag = 'N' and t.department_id=3 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.t_flag = 'N' and t.department_id=2 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryOpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=1 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}

	String getSqlQueryIpd(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=2 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=2 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=2 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryDiag(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" where t.department_id=3 and (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' and t.t_flag='Y' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryIvf(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" JOIN ehat_ivf_treatment i ON (i.treatment_id = t.treatment_id) "
					+" where (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' and t.ivf_treat_flag='Y' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}
	
	String getSqlQueryPreviousIvf(String findingName,int patSearchType){
		
		String sql = "";
		if(patSearchType == 1){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
				 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
				 +" where t.department_id=1 and p.patient_id like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
			
		}else if(patSearchType == 2){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					+" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					+" JOIN ehat_ivf_treatment i ON (i.treatment_id = t.treatment_id) "
					+" where (p.f_name like '"+findingName+"%' "
					+" OR p.l_name like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name,' ',p.l_name) like '"+findingName+"%' "
					+" OR concat(p.f_name,' ',p.m_name) like '"+findingName+"%' "
					+" OR concat(p.m_name,' ',p.l_name) like '"+findingName+"%') and p.deleted = 'N' and t.ivf_treat_flag='N' group by t.patient_id limit 20";								
		
		}else if(patSearchType == 3){
			
			sql = " SELECT p.patient_id AS patient_id,concat(p.prefix,'',p.f_name,' ',p.m_name,' ',p.l_name) AS patient_name,p.center_patient_id,p.mobile AS mobile"
					 +" FROM ehat_patient p left join ehat_treatment t ON (p.patient_id = t.patient_id) "
					 +" where t.department_id=1 and p.mobile like '"+findingName+"%' and p.deleted = 'N' group by t.patient_id limit 20";
				
		}
		
		return sql;
	}


	@Override
	public PatientSearchDTO getPatientDetailsByLegacyUHIDNumber(PatientSearchDTO pobj) {
		
		PatientSearchDTO obj=new PatientSearchDTO();
		 int patientID=0;
		  try {
			  String sql="";
			        if(pobj.getSearchType() ==3) {
			        	 sql="select patient_id from ehat_patient where mobile='"+pobj.getSearchText()+"' and deleted='N'  limit 1 ";
			        }else if(pobj.getSearchType()== 4) {
			        	sql="select patient_id from ehat_patient where adharcardNo='"+pobj.getSearchText()+"' and deleted='N'  limit 1 ";
			        }else if(pobj.getSearchType()== 5) {
			        	sql="select patient_id from ehat_patient where legacy_uhid_number='"+pobj.getSearchText()+"' and deleted='N'  limit 1 ";
			        }
			       
		   SQLQuery	q  = sessionFactory.getCurrentSession().createSQLQuery(sql);
                 patientID=((Number) q.uniqueResult()).intValue();
                 obj.setPatientId(patientID);
   }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
		
	}


}
