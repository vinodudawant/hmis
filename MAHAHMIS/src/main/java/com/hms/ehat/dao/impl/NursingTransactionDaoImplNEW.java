package com.hms.ehat.dao.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.NursingTransactionDaoNEW;
import com.hms.ehat.dto.PrePostChecklistDTO;
import com.hms.ehat.dto.nursingAsmentDataDTO;
import com.hms.ehat.dto.nursingAsmentTwoDataDTO;

@Repository
@SuppressWarnings("unchecked")
public class NursingTransactionDaoImplNEW implements NursingTransactionDaoNEW
{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int savePrePostData(PrePostChecklistDTO objDto,HttpServletRequest request){
				int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdpre_post_checklist();
				  if(id==0){
                    	objDto.setAddedBy(UserId);
                    	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().save(objDto);
                        Result=1;
                    }else{
                    	objDto.setUpdatedBy(UserId);
                    	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
                        sessionFactory.getCurrentSession().saveOrUpdate(objDto);
                        Result=2;
                    }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
	
	@Override
	public List<PrePostChecklistDTO> fetchprepostData(int patientId,int treatmentId){
		
		
		List<PrePostChecklistDTO> listInitial = null;
		try {
			
					Criteria criteria = sessionFactory.getCurrentSession()
							.createCriteria(PrePostChecklistDTO.class);
					criteria.add(Restrictions.eq("pId", patientId));
					criteria.add(Restrictions.eq("tId", treatmentId));
					listInitial = criteria.list();
			
		} catch (Exception e) {
			e.printStackTrace();
			
		}
		return listInitial;
	}
	
	
		@Override
		public int saveNursingAssessmentData01(nursingAsmentDataDTO objDto,HttpServletRequest request){
			int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdNursingInitialAssessment();
	                if(id==0){
	                	objDto.setAddedBy(UserId);
	                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
	                    sessionFactory.getCurrentSession().save(objDto);
	                    Result=1;
	                }else{
	                	objDto.setUpdatedBy(UserId);
	                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
	                    sessionFactory.getCurrentSession().saveOrUpdate(objDto);
	                    Result=2;
	                }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
		
		@Override
		public List<nursingAsmentDataDTO> fetchNursingAs(int patientId,int treatmentId){
			
			
			List<nursingAsmentDataDTO> listInitial = null;
			try {
				
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(nursingAsmentDataDTO.class);
						criteria.add(Restrictions.eq("pId", patientId));
						criteria.add(Restrictions.eq("tId", treatmentId));
						listInitial = criteria.list();
				
			} catch (Exception e) {
				e.printStackTrace();
				
			}
			return listInitial;
		}
		
		
		@Override
		public int saveNursingAssessmentData02(nursingAsmentTwoDataDTO objDto,HttpServletRequest request){
			int Result = 0;
			try {
				HttpSession session = request.getSession();
				int UserId =(Integer)session.getAttribute("userId");
				int id =objDto.getIdNursingSecondAssessment();
	                if(id==0){
	                	objDto.setAddedBy(UserId);
	                	objDto.setAddedDate(new Date(new java.util.Date().getTime()));
	                    sessionFactory.getCurrentSession().save(objDto);
	                    Result=1;
	                }else{
	                	objDto.setUpdatedBy(UserId);
	                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime()));
	                    sessionFactory.getCurrentSession().saveOrUpdate(objDto);
	                    Result=2;
	                }
				
			} catch (Exception e) {
				e.printStackTrace();
				return Result;
			}
			
		return Result;
		
	}
		
		@Override
		public List<nursingAsmentTwoDataDTO> fetchNursingAs02(int patientId,int treatmentId){
			
			
			List<nursingAsmentTwoDataDTO> listInitial = null;
			try {
				
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(nursingAsmentTwoDataDTO.class);
						criteria.add(Restrictions.eq("pId", patientId));
						criteria.add(Restrictions.eq("tId", treatmentId));
						listInitial = criteria.list();
				
			} catch (Exception e) {
				e.printStackTrace();
				
			}
			return listInitial;
		}
}
