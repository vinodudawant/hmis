package com.hms.ivf.dao.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.GynaecologicalexamDao;
import com.hms.ivf.dto.GynoExamDto;

@Repository
public class GynaecologicalExamDao implements GynaecologicalexamDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveGynExamHistory11(List<GynoExamDto> objDto, HttpServletRequest request) {
		int Result = 0;
		try {

			for (GynoExamDto obj : objDto) {
				System.out.println("/////obj/////"+obj);
				sessionFactory.getCurrentSession().merge(obj);
				Result = 1;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		//System.out.println("Result........" + Result);
		return Result;

	}

	public List<GynoExamDto> fetchGynExamHisPrvData(int patientId, int treatmentId) {

		List<GynoExamDto> listGynData11 = null;
		try {
				
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(GynoExamDto.class);
			criteria.add(Restrictions.eq("patientId", patientId));
			criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			criteria.add(Restrictions.eq("deleted", "N"));
			//criteria.addOrder(Order.asc("gynoexamid"));
			listGynData11 = criteria.list();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return listGynData11;
	}


	


  @Override 
  public List<GynoExamDto> getlistGynExam(String patientId)
  {
  List<GynoExamDto> list = null; 
  
 // System.out.println("........list..................."+patientId);
  try { 
	  Criteria c = sessionFactory.getCurrentSession().createCriteria(GynoExamDto.class);
	 // String pid = null;
	int patientId1=Integer.parseInt(patientId);
  c.add(Restrictions.eq("ivf_treatmentId", patientId1));
  c.add(Restrictions.eq("deleted", "N")); 
  list = c.list(); 
  System.out.println("........list..................."+list);
  } 
  catch (Exception e) 
  { 
	  e.printStackTrace(); 
	  } 
  return list; 
  }


		
		
		@Override
		public String deleteRecordGynStudyBasicInfo(String ovampickupslaveids, int userId) {
			String sql="";
			String msg="";
			
			try{
				
				Query itemInfo = sessionFactory	.getCurrentSession().createSQLQuery("update gyno_exam_basic_info set deleted='Y',deleted_by="
						+ userId	+ ",deleted_date_time=now() where gynoexam_id in("+ovampickupslaveids+")");
				
				int iii=itemInfo.executeUpdate();
				
				msg="Record Deleted Successfully";
			}catch(Exception e){
				e.printStackTrace();
			}
			return msg;
		}
	}


 