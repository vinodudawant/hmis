package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.OpdCoverSheetLabDao;
import com.hms.doctordesk.dto.OPDIPDLabTestResultDTO;
import com.hms.doctordesk.dto.OpdPatientDetailsDto;
import com.hms.dto.RisImageUploadDTO;
import com.hms.pathology.dto.PathologyTemplateRotineValueDTO;

@Repository
public class OpdCoverSheetLabDaoImpl implements OpdCoverSheetLabDao {
	
	@Autowired
	SessionFactory sessionfactory;

	@Override
	public List<RisImageUploadDTO> fetchInvestigationXrayImage(Integer treatmentId, Integer testId,
			Integer billdetailsid) {
		// TODO Auto-generated method stub
		List<RisImageUploadDTO> lstTest = new ArrayList<RisImageUploadDTO>();
		try {
			String query = "select idradiology_test from radiology_assign_test where bill_details_id = " + billdetailsid;
			int idRadiologyTest = ((Integer) sessionfactory.getCurrentSession().createSQLQuery(query).uniqueResult())
					.intValue();
			
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(RisImageUploadDTO.class);
			criteria.add(Restrictions.eq("radiologyTestId",idRadiologyTest));
			criteria.add(Restrictions.eq("testId",testId));
			criteria.add(Restrictions.eq("treatmentId",treatmentId));
			lstTest = criteria.list();
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return lstTest;
	}

	@Override
	public OPDIPDLabTestResultDTO getOPDIPDLabtestResult(int treatmentId, int billDetailsId, String age, String ageIn,String sexType) {
		
		List<OPDIPDLabTestResultDTO> lstOPDIPDLabtestresult = new ArrayList<OPDIPDLabTestResultDTO>();
		OPDIPDLabTestResultDTO obj = new OPDIPDLabTestResultDTO();
		
		try {
			Query q = sessionfactory.getCurrentSession().createSQLQuery("CALL sp_fetch_lis_result_on_opd_ipd_coversheet(:treatmentId,:billDetailsId,:fromAge,:toAge,:ageIn,:sexType)");
			q.setParameter("treatmentId", treatmentId);
			q.setParameter("billDetailsId", billDetailsId);
			q.setParameter("fromAge", age);
			q.setParameter("toAge", age);
			q.setParameter("ageIn", ageIn);
			q.setParameter("sexType", sexType);
			q.setResultTransformer(Transformers.aliasToBean(OPDIPDLabTestResultDTO.class));
			//obj = (OpdPatientDetailsDto) q.uniqueResult();
			lstOPDIPDLabtestresult = q.list();
			obj.setLstOPDIPDLabtestresult(lstOPDIPDLabtestresult);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
		
	}

	@Override
	public PathologyTemplateRotineValueDTO getTemplateWistTestResult(int treatmentId, int billDetailsId) {
		String sql="";
		PathologyTemplateRotineValueDTO obj=new PathologyTemplateRotineValueDTO();
		List<PathologyTemplateRotineValueDTO> list=new ArrayList<PathologyTemplateRotineValueDTO>();
		try {
			int masterid=0;
			  String msql=" select id from  pathology_sample_wise_master where bil_det_id="+billDetailsId+" and treatment_id="+treatmentId+"  ";
			  SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(msql);
			  masterid=((Number) query1.uniqueResult()).intValue();
			  
	          sql=" Select ps.template_id as template_id,ps.template_name as template_name,CONVERT(template_data USING utf8) as template_data  from pathology_sample_wise_slave ps where ps.master_id="+masterid+" ";		
	          SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
	          query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list1 = query.list();
				for (Map<String, Object> row : list1) {
					PathologyTemplateRotineValueDTO obj1=new PathologyTemplateRotineValueDTO();
					obj1.setTemplateId((Integer)row.get("template_id"));
					obj1.setTemplateName((String)row.get("template_name"));
					obj1.setTemplateData((String)row.get("template_data"));
				//Blob b=	(Blob)row.get("template_data");
					//Blob blob = rs.getBlob(cloumnName[i]);
					//byte[] bdata = b.getBytes(1, (int) b.length());
					//String s = new String(bdata);
					//obj1.setTemplateData(s);
					list.add(obj1);
				}
				obj.setListtemplateinfo(list);
				return obj;
		}catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

}
