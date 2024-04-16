package com.hms.ivf.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.IvfFmStudyDao;
import com.hms.ivf.dto.FmFollicularData;
import com.hms.ivf.dto.IVFFollicularStudy;
import com.hms.ivf.dto.IVFFollicularSutdyRecord;

@Repository
public class IvfFmStudyDaoImpl implements IvfFmStudyDao{
	
	@Autowired
	SessionFactory sf;

	@Override
	public int saveFmStudy(IVFFollicularStudy obj) {
		try {
			if(obj.getStudyid() == 0) {
				 sf.getCurrentSession().merge(obj);
				 return 1;
			 }else {
				
				// sf.getCurrentSession().merge(obj);
				 
				 String sql="Update  IVFFollicularStudy set study_status='"+obj.getStudy_status()+"' where studyid=:studyid ";
				Query q= sf.getCurrentSession().createQuery(sql);
				q.setParameter("studyid", obj.getStudyid());
				q.executeUpdate();
				 
				 return 2;
			 }
		}catch (Exception e) {
			e.printStackTrace();
		}
		 
		return 0;
	}

	@Override
	public List<IVFFollicularStudy> lstIVFFolicularStudy(Integer patientId) {
		List<IVFFollicularStudy> list=new ArrayList<>();
		try {
		Criteria c=	 sf.getCurrentSession().createCriteria(IVFFollicularStudy.class);
		c.add(Restrictions.eq("patientId", patientId));
		list=c.list();
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public List<IVFFollicularSutdyRecord> fetchStudyRecord(String inidate, Integer patientId) {
		
		List<IVFFollicularSutdyRecord> StudyList = new ArrayList<IVFFollicularSutdyRecord>();
		
		    try {
		        
		        String[] strDate = inidate.split("/");
		        int Year = Integer.parseInt(strDate[2]);
		        int Month = Integer.parseInt(strDate[1]);
		        int Date = Integer.parseInt(strDate[0]);
		        
		        List arrId = new ArrayList();
		        int ct=0;
		    
		    String    sqlTemp ="select idehat_follicular_study_report,initiate_date from ehat_follicular_study_report where del_status='N' AND Patient_ID="+ patientId;
		    
		  //  List<Map<String, Object>> temp = getJdbcTemplate().queryForList(sqlTemp);
		    SQLQuery q1=   sf.getCurrentSession().createSQLQuery(sqlTemp);
            q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            List<Map<String, Object>> temp=q1.list();
		    
		    for (Map<String, Object> rs1 : temp) {
		        
		        String date=null;
		        int id = 0;
		        int yy,mm,dd = 0;
		        
		        id=((Integer) rs1.get("idehat_follicular_study_report"));
		        date = ((String) rs1.get("initiate_date"));
		        
		        String[] strDateTemp = date.split("/");
		        dd =Integer.parseInt(strDateTemp[0]);
		        mm =Integer.parseInt(strDateTemp[1]);
		        yy =Integer.parseInt(strDateTemp[2]);
		        
		        if(yy == Year)
		        {
		            if(mm == Month)
		            {
		                if((dd < Date)||(dd == Date))
		                {
		                    arrId.add(id);
		                    ct++;
		                }
		            }else if(mm < Month)
		            {
		                arrId.add(id);
		                ct++;
		            }
		                    
		        }else if((yy < Year)){
		            arrId.add(id);
		            ct++;
		            
		        }
		    }
		            for (Object id : arrId) {
		               String sql ="select * from ehat_follicular_study_report where idehat_follicular_study_report="+ id;
		                
		                System.err.println("fetchStudyReport :SQL \n"+sql +id);
		               // List<Map<String, Object>> list = getJdbcTemplate().queryForList(sql);
		                SQLQuery q=   sf.getCurrentSession().createSQLQuery(sql);
		                q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		                List<Map<String, Object>> list=q.list();
		                
		                for (Map<String, Object> rs : list) {
		                	IVFFollicularSutdyRecord objstudy = new IVFFollicularSutdyRecord();
		                    objstudy.setStudyid((Integer) rs.get("idehat_follicular_study_report"));
		                    objstudy.setInitiate_date((String) rs.get("initiate_date"));
		                    objstudy.setStudy_date((String) rs.get("study_date"));
		                    objstudy.setLmpdate((String) rs.get("lmpdate"));
		                    objstudy.setDays((String) rs.get("days"));
		                    objstudy.setRtov((String) rs.get("rtov"));
		                    objstudy.setLtov((String) rs.get("ltov"));
		                    objstudy.setEndo((String) rs.get("endo"));
		                    objstudy.setDrug((String) rs.get("drug"));
		                    objstudy.setPod((String) rs.get("pod"));
		                    objstudy.setDose((String) rs.get("dose"));
		                    objstudy.setStudyComment((String) rs.get("studyComment"));
		                    StudyList.add(objstudy);
		                }
		            }
		        } catch (Exception e) {
		            e.printStackTrace();
		        }
		        return StudyList;
		
}

	@Override
	public int saveFmStudyRecordData(IVFFollicularSutdyRecord obj) {
		try {
			if(obj.getReportId() == 0) {
				 sf.getCurrentSession().merge(obj);
				 return 1;
			 }else {
				
				 sf.getCurrentSession().merge(obj);
				 return 2;
			 }
		}catch (Exception e) {
			e.printStackTrace();
		}
		 
		return 0;
	}

	@Override
	public int addCommentsInStudyRecord(int recordId, String comments) {
		try {
			String sql="Update IVFFollicularSutdyRecord set studyComment='"+comments+"' where reportId=:reportId  ";
		   Query q= 	sf.getCurrentSession().createQuery(sql);
		   q.setParameter("reportId", recordId);
		   q.executeUpdate();
		   
		   return 1;
			
		}catch (Exception e) {
			
		}
		return 0;
	}

	@Override
	public int deleteStudyRecord(int userId, int recordId) {
		try {
			String sql="Update IVFFollicularSutdyRecord set delStatus='Y',deletedBy="+userId+",deletedDateTime=now() where reportId=:recordId  ";
		   Query q= 	sf.getCurrentSession().createQuery(sql);
		   q.setParameter("recordId", recordId);
		   q.executeUpdate();
		   
		   return 1;
			
		}catch (Exception e) {
			
		}
		return 0;
		
	}

	@Override
	public int cancelOrCloseCycle(int masterFollicularStudyId, String cycleStatus,String endDate) {
		try {
			String sql="Update IVFFollicularStudy set study_status='"+cycleStatus+"',end_date='"+endDate+"' where studyid=:masterFollicularStudyId  ";
		   Query q= 	sf.getCurrentSession().createQuery(sql);
		   q.setParameter("masterFollicularStudyId", masterFollicularStudyId);
		   q.executeUpdate();
		   
		   return 1;
			
		}catch (Exception e) {
			
		}
		return 0;
		
	}

	@Override
	public int saveFollicularData(FmFollicularData obj) {
		int res=0;
		try {
			sf.getCurrentSession().merge(obj);
			res=1;
		}catch (Exception e) {
			e.printStackTrace();
			res=0;
		}
		return 0;
	}

	@Override
	public List<FmFollicularData> getLisOfFmData(Integer patientId, String masterFollicularStudyId) {
		List<FmFollicularData> list=new ArrayList<FmFollicularData>();
		
		try {
		     Criteria c=	sf.getCurrentSession().createCriteria(FmFollicularData.class);
		    // c.add(Restrictions.eq("patientId", patientId));
		     c.add(Restrictions.eq("masterFollicularStudyId", masterFollicularStudyId));
		     c.add(Restrictions.eq("deleted", "N"));
		     list=c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return list;
	}
	

}
