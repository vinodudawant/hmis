package com.hms.ehat.service.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.LabProfile;
import com.hms.dto.LabTest;
import com.hms.ehat.dto.LabProfileDTO;
import com.hms.ehat.dto.LabSlaveWorksheetViewDto;
import com.hms.ehat.dto.LabWorksheetViewDto;
import com.hms.ehat.service.LabWorkSheetService;

@Service
public class LabWorkSheetServiceImpl implements LabWorkSheetService{
	
	@Autowired
	SessionFactory sessionFactory;
	
		
	@SuppressWarnings("unchecked")
	@Override
	@Transactional
	public LabWorksheetViewDto getLabWorksheetDash(String txtFdate,
			String txtTdate, Integer frmRecNo, Integer toRecNo, String type,
			HttpServletRequest request) {

		
		

        final LabWorksheetViewDto labWorksheetObj = new LabWorksheetViewDto();
        List<LabWorksheetViewDto> labWorksheetObjLst = new ArrayList<LabWorksheetViewDto>();
        try {
            final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            if (type.equals("onload")) {
                final Date date = new Date();
                final String currentDate = formatter.format(date);
                final Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria((Class)LabWorksheetViewDto.class);
                criteria.add((Criterion)Restrictions.eq("receiptDate", (Object)currentDate));
                labWorksheetObjLst = (List<LabWorksheetViewDto>)criteria.list();
            }
            else if (type.equals("show")) {
                final Date fDate = new SimpleDateFormat("dd/MM/yyyy").parse(txtFdate);
                final Date tDate = new SimpleDateFormat("dd/MM/yyyy").parse(txtTdate);
                txtFdate = formatter.format(fDate);
                txtTdate = formatter.format(tDate);
                final Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria((Class)LabWorksheetViewDto.class);
                criteria.add((Criterion)Restrictions.ge("receiptDate", (Object)txtFdate));
                criteria.add((Criterion)Restrictions.le("receiptDate", (Object)txtTdate));
                if (frmRecNo != 0 && frmRecNo != null && toRecNo != 0 && toRecNo != null) {
                    criteria.add((Criterion)Restrictions.ge("billReceiptId", (Object)frmRecNo));
                    criteria.add((Criterion)Restrictions.le("billReceiptId", (Object)toRecNo));
                }
                labWorksheetObjLst = (List<LabWorksheetViewDto>)criteria.list();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        labWorksheetObj.setListLabWorksheetView((List)labWorksheetObjLst);
        System.err.println("---------------->>>>>>>" + labWorksheetObjLst.toString());
        return labWorksheetObj;
    
	

}
			
	@SuppressWarnings({ "unused", "unchecked" })
	@Override
	@Transactional
	public LabWorksheetViewDto getLabWorksheetReportData(String txtFdate, String txtTdate,
			Integer frmRecNo, Integer toRecNo, String type,
			HttpServletRequest request) {
		
		
		
		 final LabWorksheetViewDto labWorksheetObj = new LabWorksheetViewDto();
	        final List<LabWorksheetViewDto> ObjLst = new ArrayList<LabWorksheetViewDto>();
	        List<LabWorksheetViewDto> labWorksheetObjLst = new ArrayList<LabWorksheetViewDto>();
	        final DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
	        final Calendar currentDate1 = Calendar.getInstance();
	        final String todays_date = dateFormat.format(currentDate1.getTime());
	        String sql = "";
	        try {
	            final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	            if (type.equals("onload")) {
	                final Date date = new Date();
	                final String currentDate2 = formatter.format(date);
	                final Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria((Class)LabWorksheetViewDto.class);
	                criteria.add((Criterion)Restrictions.eq("receiptDate", (Object)currentDate2));
	                labWorksheetObjLst = (List<LabWorksheetViewDto>)criteria.list();
	            }
	            else if (type.equals("show")) {
	                final Date fDate = new SimpleDateFormat("dd/MM/yyyy").parse(txtFdate);
	                final Date tDate = new SimpleDateFormat("dd/MM/yyyy").parse(txtTdate);
	                txtFdate = formatter.format(fDate);
	                txtTdate = formatter.format(tDate);
	                final Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria((Class)LabWorksheetViewDto.class);
	                criteria.add((Criterion)Restrictions.ge("receiptDate", (Object)txtFdate));
	                criteria.add((Criterion)Restrictions.le("receiptDate", (Object)txtTdate));
	                if (frmRecNo != 0 && frmRecNo != null && toRecNo != 0 && toRecNo != null) {
	                    criteria.add((Criterion)Restrictions.ge("billReceiptId", (Object)frmRecNo));
	                    criteria.add((Criterion)Restrictions.le("billReceiptId", (Object)toRecNo));
	                }
	                labWorksheetObjLst = (List<LabWorksheetViewDto>)criteria.list();
	            }
	            else if (type.equalsIgnoreCase("print")) {
	                final Date fDate = new SimpleDateFormat("dd/MM/yyyy").parse(txtFdate);
	                final Date tDate = new SimpleDateFormat("dd/MM/yyyy").parse(txtTdate);
	                txtFdate = formatter.format(fDate);
	                txtTdate = formatter.format(tDate);
	                final Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria((Class)LabWorksheetViewDto.class);
	                criteria.add((Criterion)Restrictions.ge("receiptDate", (Object)txtFdate));
	                criteria.add((Criterion)Restrictions.le("receiptDate", (Object)txtTdate));
	                if (frmRecNo != 0 && frmRecNo != null && toRecNo != 0 && toRecNo != null) {
	                    criteria.add((Criterion)Restrictions.ge("billReceiptId", (Object)frmRecNo));
	                    criteria.add((Criterion)Restrictions.le("billReceiptId", (Object)toRecNo));
	                }
	                criteria.addOrder(Order.asc("billReceiptId"));
	                labWorksheetObjLst = (List<LabWorksheetViewDto>)criteria.list();
	            }
	            for (final LabWorksheetViewDto obj : labWorksheetObjLst) {
	                final List<LabProfile> arrLabProfile = new ArrayList<LabProfile>();
	                int profilecount = 0;
	                
	                
	                
	                sql = "SELECT distinct lp.profileCode AS profileName,lp.profileName AS report_heading,lp.id AS idprofile, lp.template_wise AS template_wise FROM ehat_bill_details ebd " + 
	                		"LEFT JOIN pathology_sample_wise_master pswm ON (ebd.bill_details_id = pswm.bil_det_id) LEFT JOIN pathology_labprofile lp  ON (pswm.profile_Id = lp.id) WHERE lp.id in(" + obj.getLabslaveId() + ") and pswm.treatment_id ='" + obj.getTreatmentId() + "' AND ebd.deleted = 'N'  AND ebd.cancle = 'N'";
	                final Query userDtls = (Query)this.sessionFactory.getCurrentSession().createSQLQuery(sql);
	                userDtls.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	                final List<Map<String, Object>> userDetails = (List<Map<String, Object>>)userDtls.list();
	                for (final Map<String, Object> rs : userDetails) {
	                    final List<LabTest> arrLabTest = new ArrayList<LabTest>();
	                    ++profilecount;
	                    final LabProfile objLabProfile = new LabProfile();
	                    objLabProfile.setProfileName((String)rs.get("profileName"));
	                    objLabProfile.setReportHeading((String)rs.get("report_heading"));
	                    objLabProfile.setTemplate_wise((String)rs.get("template_wise"));
	                    final int porId = (int) rs.get("idprofile");
	                    sql = "SELECT ifnull(idTest,0) as idTest  FROM pathology_labprofiletestcomp where idprofile ='" + porId + "'order by sequence;";
	                    final Query procoQuery = (Query)this.sessionFactory.getCurrentSession().createSQLQuery(sql);
	                    procoQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	                    final List<Map<String, Object>> proco = (List<Map<String, Object>>)procoQuery.list();
	                    for (final Map<String, Object> rs2 : proco) {
	                        final LabTest objLabTest1 = new LabTest();
	                        final int idTest = ((Number) rs2.get("idTest")).intValue();
	                        objLabTest1.setIdTest(idTest);
	                        if (idTest != 0) {
	                            sql = "select testName,testCode from pathology_lab_test where testStatus='Y' and idTest ='" + idTest + "'";
	                            final Query tesQuery = (Query)this.sessionFactory.getCurrentSession().createSQLQuery(sql);
	                            tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
	                            final List<Map<String, Object>> tes = (List<Map<String, Object>>)tesQuery.list();
	                            for (final Map<String, Object> t : tes) {
	                                final String testName = (String) t.get("testName");
	                                final String testCode = (String) t.get("testCode");
	                                objLabTest1.setTestName(testName);
	                                objLabTest1.setTestCode(testCode);
	                                arrLabTest.add(objLabTest1);
	                            }
	                        }
	                    }
	                    objLabProfile.setTestli((List)arrLabTest);
	                    arrLabProfile.add(objLabProfile);
	                }
	                obj.setListLabProfile((List)arrLabProfile);
	                ObjLst.add(obj);
	            }
	        }
	        catch (Exception e) {
	            e.printStackTrace();
	        }
	        labWorksheetObj.setListLabSlaveWorksheetView((List)ObjLst);
	        return labWorksheetObj;
	}
	
	@SuppressWarnings({ "unused", "unchecked" })
	@Override
	@Transactional
	public List<LabProfileDTO> checkTestIsTemplate()
	{
		List<LabProfileDTO> labobj = new ArrayList<LabProfileDTO>();
		String sql = "";
		try
		{
			sql = "select profileCode,histopath_lab,template_wise from pathology_labprofile WHERE (template_wise LIKE '%H%')";
            final Query tesQuery = (Query)this.sessionFactory.getCurrentSession().createSQLQuery(sql);
            tesQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
            labobj = tesQuery.list();
        }catch(Exception e)
		{
			e.printStackTrace();
		}
		
		return labobj;
		
	}
	

	
}
