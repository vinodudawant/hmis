package com.hms.administrator.service.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.administrator.dao.ICD10CodeMgmtDao;
import com.hms.administrator.service.ICD10CodeMgmtService;
import com.hms.administrator.dto.ICD10_L;
@Service
@Transactional
public class Icd10CodeMgmtServiceImpl implements  ICD10CodeMgmtService{
	@Autowired
	ICD10CodeMgmtDao icd10da0;
	
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveICDDiagnosisLevel1(ICD10_L iobj, HttpServletRequest request) {
		String sql="";
		sql="SELECT count(*) from icd10_l r where r.deleted='N' and r.icd_code_L='"+iobj.getIcd_code_L()+"' " ;
		Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		int count = ((Number)countQuery.uniqueResult()).intValue();
		if (iobj.getIdicd10_L() == 0){			
			
				if(count > 0){
					return 3;
				}
				else{
				HttpSession session = request.getSession();
				Integer userId = (Integer) session.getAttribute("userId1");
				iobj.setCreatedBy(userId);
				iobj.setIcdStatus("Y");
				iobj.setCreatedDate(new Date(new java.util.Date().getTime()));
				int response = icd10da0.saveICDDiagnosisLevel1(iobj);			
				return response;
				}
		}
		else{
			
				String sql1="";
				sql1="SELECT count(*) from icd10_l r where r.deleted='N' and r.icd_code_L='"+iobj.getIcd_code_L()+"' and r.idicd10_L not in("+iobj.getIdicd10_L()+")";
				Query countQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
				
				int count1 = ((Number)countQuery1.uniqueResult()).intValue();
				if(count1 >0){
					return 3;
				}else{
					HttpSession session = request.getSession();
					Integer userId = (Integer) session.getAttribute("userId1");
					iobj.setUpdatedBy(userId);
					iobj.setUpdatedBy(userId);
					iobj.setIcdStatus("Y");
					iobj.setUpdatedDate(new Date(new java.util.Date().getTime()));			
					int response = icd10da0.saveICDDiagnosisLevel1(iobj);			
					return response;
			  }
		}
	}

	@Override
	public List<ICD10_L> fetchICD10Level1(Integer unitId,HttpServletRequest request) {
		return icd10da0.fetchICD10Level1(unitId);
	}

	@Override
	public ICD10_L editIcd10CodeMgmt(Integer icdId) {
		return icd10da0.editIcd10CodeMgmt(icdId);
	}

	@Override
	public boolean deleteIcd10CodeMgmt(Integer icdId, HttpServletRequest request) {
		ICD10_L obj=	(ICD10_L)sessionFactory.getCurrentSession().get(ICD10_L.class, icdId);
		obj.setDeleted("Y");
		obj.setIcdStatus("N");
		obj.setDeletedDate(new Date(new java.util.Date().getTime()));
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		obj.setDeletedBy(userId);
		return icd10da0.deleteIcd10CodeMgmt(obj);
		
	}

	@Override
	public List<ICD10_L> icd10CodeMgmtAutoSuggestion(String icdCode,String icdFlag) {
		return icd10da0.icd10CodeMgmtAutoSuggestion(icdCode,icdFlag);
	}

	@Override
	public List<ICD10_L> getICD10ListByType(int type) {
		
		return icd10da0.getICD10ListByType(type);
	}

	@Override
	public List<ICD10_L> ic10AutoSuggByType(int type, String searchText) {
		
		return icd10da0.ic10AutoSuggByType(type, searchText);
	}

	@Override
	public int deleteICD10(String id, int userId) {
		
		return icd10da0.deleteICD10(id, userId);
	}

}
