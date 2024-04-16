package com.hms.pathology.daoImpl;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.log4j.Logger;
import org.apache.xml.serialize.OutputFormat;
import org.apache.xml.serialize.XMLSerializer;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.hms.administrator.dto.HospitalDetails;
import com.hms.administrator.dto.LabPatchDto;
import com.hms.dto.Doctor;
import com.hms.pathology.dao.PathologySearchDao;
import com.hms.pathology.dto.LisTabCountDto;
import com.hms.pathology.dto.PathologySampleTransferDto;
import com.hms.pathology.dto.PathologySampleWiseMaster;
import com.hms.pathology.dto.PathologyTestReasonDto;

@Repository
public class PathologySearchDaoImpl implements PathologySearchDao {

	static Logger log=Logger.getLogger(phlebotomyDaoImpl.class.getName());

	@Autowired
	SessionFactory sessionfactory;
	
	@Autowired
	phlebotomyDaoImpl phlebotomyDaoImpl;
	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<PathologySampleWiseMaster> phelbotomyPatientAutoSuggestion(String searchText, String searchBy,
			String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			//String userCustomerType = (String) httpSession.getAttribute("userCustomerType");
			String userCustomerId = (String) httpSession.getAttribute("userCustomerId");
			String sql="";
			Query querySp = null;
			String fd = null;
			String td = null;
			
			if(callFrom.equalsIgnoreCase("phelbotomyAutoSugg") || callFrom.equalsIgnoreCase("appointmentAutoSugg")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_phelbotomy_autosugg(:unitId, :departmentId, :callFrom, :tabId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("callFrom", callFrom);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("searchText", searchText);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
				
			}else if(callFrom.equalsIgnoreCase("authorizationAutoSugg")) {
				if(tabId.equalsIgnoreCase("authorizationtemplatetest")) { // added by Rohini Ambhore.
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_authorization_autosugg_for_template(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				}else {
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_authorization_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				}
			}else if(callFrom.equalsIgnoreCase("outSourceAutoSugg")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_outsource_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(callFrom.equalsIgnoreCase("reportingAutoSugg")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_reporting_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(callFrom.equalsIgnoreCase("accessionTrackStatusAutoSugg")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_accessiontrackstatus_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(callFrom.equalsIgnoreCase("accessionTestAutoSugg") && tabId.equalsIgnoreCase("AL")){
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_accessiontest_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(tabId.equalsIgnoreCase("accessionPending")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_accession_pending(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(tabId.equalsIgnoreCase("collectionPending")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_collection_pending(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(tabId.equalsIgnoreCase("accessionDone") || (callFrom.equalsIgnoreCase("processingAutoSugg") && tabId.equalsIgnoreCase("AL"))) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_accession_done(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(tabId.equalsIgnoreCase("rejectedSample")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_rejected_sample(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(callFrom.equalsIgnoreCase("processingAutoSugg") && tabId.equalsIgnoreCase("accessionpatho")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_processing_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				
			}else if(callFrom.equalsIgnoreCase("BTOBRecollection") || callFrom.equalsIgnoreCase("BTOCRecollection")){
					
					if(tabId.equalsIgnoreCase("ALBToB")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}
					}else if(tabId.equalsIgnoreCase("rejectedSampleBToB")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}				
					}else if(tabId.equalsIgnoreCase("pathoRecollectionBToB")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}									
					}else if(tabId.equalsIgnoreCase("ALBToC")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}
					}else if(tabId.equalsIgnoreCase("rejectedSampleBToC")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}
					}else if(tabId.equalsIgnoreCase("pathoRecollectionBToC")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byName")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byId")) {
								sql="SELECT CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byBarcode")) {
								sql="SELECT ps.bar_code AS bar_code, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}else if(searchBy.equalsIgnoreCase("byMobile")) {
								sql="SELECT ep.mobile AS mobile, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id WHERE ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) GROUP BY ep.patient_id";
							}
						}
					}
							
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					
					if(emergencyFlag.equalsIgnoreCase("Y")) {
						query.setString(0, "Y");
						query.setString(1, "Y");
					}else if(emergencyFlag.equalsIgnoreCase("All")) {
						query.setString(0, "Y");
						query.setString(1, "N");
					}else {
						query.setString(0, "N");
						query.setString(1, "N");
					}
				
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();							
						obj.setPatientname((String)row.get("patient_name"));
				  		obj.setPatientId((Integer)row.get("patient_id"));
				  		obj.setMobile((String)row.get("mobile"));
				  		obj.setBarCode((String)row.get("bar_code"));
					labPatRecordlist.add(obj);			
				}
			}
			
			if(!(callFrom.equalsIgnoreCase("phelbotomyAutoSugg") || callFrom.equalsIgnoreCase("appointmentAutoSugg") || callFrom.equalsIgnoreCase("BTOBRecollection") || callFrom.equalsIgnoreCase("BTOCRecollection"))) {
				
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("searchText", searchText);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			log.error("phelbotomyPatientAutoSuggestion()...Error :"+e);
		}
		return labPatRecordlist;
	}	
	
	@SuppressWarnings("unchecked")
	@Override
	public List<PathologySampleWiseMaster> getPatientById(Integer patientId, String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		String sql="";
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();

		try{
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			String userCustomerId = (String) httpSession.getAttribute("userCustomerId");
			Query querySp = null;

			if(callFrom.equalsIgnoreCase("phelbotomyAutoSugg") || callFrom.equalsIgnoreCase("appointmentAutoSugg")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_phelbotomy_autosugg(:unitId, :departmentId, :callFrom, :tabId, :userType, :patientId, :custNameId, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("callFrom", callFrom);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("patientId", patientId);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
				
			}else if(callFrom.equalsIgnoreCase("accessionTestAutoSugg") || callFrom.equalsIgnoreCase("accessionTrackStatusAutoSugg") || callFrom.equalsIgnoreCase("processingAutoSugg")
					|| callFrom.equalsIgnoreCase("authorizationAutoSugg") || callFrom.equalsIgnoreCase("reportingAutoSugg") || callFrom.equalsIgnoreCase("outSourceAutoSugg")) {
				
				if(callFrom.equalsIgnoreCase("authorizationAutoSugg")) {
					if(tabId.equalsIgnoreCase("authorizationtemplatetest")) {
						querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_authorization_autosugg__for_template(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					}else {
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_authorization_autosugg(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					}
				}else if(callFrom.equalsIgnoreCase("reportingAutoSugg")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_reporting_autosugg(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("outSourceAutoSugg")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_outsource_autosugg(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTestAutoSugg") && tabId.equalsIgnoreCase("AL")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_accessiontest_autosugg(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTrackStatusAutoSugg")){
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_accessiontrackstatus_autosugg(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionPending")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_accession_pending(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("collectionPending")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_collection_pending(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionDone") || (callFrom.equalsIgnoreCase("processingAutoSugg") && tabId.equalsIgnoreCase("AL"))) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_accession_done(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("rejectedSample")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_rejected_sample(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("processingAutoSugg") && tabId.equalsIgnoreCase("accessionpatho")){
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_gpbi_processing_autosugg(:unitId, :departmentId, :userType, :patientId, :custNameId, :p_emergency_flag)");
				}
		
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("patientId", patientId);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
					
			}else if(callFrom.equalsIgnoreCase("BTOBRecollection") || callFrom.equalsIgnoreCase("BTOCRecollection")){
				//calling BtoB Record ReCollection Request	
				if(tabId.equalsIgnoreCase("ALBToB")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='1' and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='1' and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else if(tabId.equalsIgnoreCase("rejectedSampleBToB")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
					}else{
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(tabId.equalsIgnoreCase("pathoRecollectionBToB")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else if(tabId.equalsIgnoreCase("ALBToC")){//calling BtoC Record ReCollection Request
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
					}else{
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
					}
				}else if(tabId.equalsIgnoreCase("rejectedSampleBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else if(tabId.equalsIgnoreCase("pathoRecollectionBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}
				
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setMaxResults(10);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setTestReasonName((String)row.get("test_reason_name"));
					obj.setPatientmobile((String)row.get("mobile"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sample_type_id"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					
					// added by ROHIT AMBAWADE on 24Nov 2021
					obj.setPrintCount((Integer)row.get("printCount"));
					
					labPatRecordlist.add(obj);
				}
				//return labPatRecordlist;
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("getPatientById()...Error :"+e);
		}
		return labPatRecordlist;
	}
	
	private String getCenterName(Integer customerType, Integer customerId){
		Session session = null;
		String hql = null;
		try{
			session = sessionfactory.getCurrentSession();
			
			if(customerType.equals(0)){
				return "B2C";
			}else{
				if(customerType.equals(1) || customerType.equals(2)){
					hql = "SELECT name FROM BusinessCustMasterDto WHERE id=:id";
				}else if(customerType.equals(3)){
					hql = "SELECT hospitalName FROM AdminHospitalMasterDTO WHERE id=:id";
				}else if(customerType.equals(4)){
					hql = "SELECT clinicName FROM AdminClinicMasterDTO WHERE id=:id";
				}else if(customerType.equals(5)){
					hql = "SELECT collectionName FROM CollectionMasterDto WHERE id=:id";
				}
				
				Query qry = session.createQuery(hql);
					  qry.setParameter("id", customerId);
				String centerName = (String) qry.uniqueResult();
				
				return centerName;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return "-";
	}
	
	@SuppressWarnings("unchecked")
	//@Override
	//change method name, created and updated new one with same name by Rohini Ambhore for lis pagination date 20-09-2023
	public List<PathologySampleWiseMaster> searchLabTestPatient111(String custTypeId, String custNameId, String fromDate, String toDate,
			String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			//Integer userCustomerType = (Integer) httpSession.getAttribute("userCustomerType");
			//Integer userCustomerId = (Integer) httpSession.getAttribute("userCustomerId");
			
			if(callFrom.equalsIgnoreCase("phelbotomySearchBtn") || callFrom.equalsIgnoreCase("appointmentSearchBtn")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_phelbotomy_search_btn(:unitId, :departmentId, :callFrom, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("callFrom", callFrom);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				
				return querySp.list();
				
			}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn") || callFrom.equalsIgnoreCase("accessionTrackStatusSearchBtn") || callFrom.equalsIgnoreCase("processingSearchBtn")
					|| callFrom.equalsIgnoreCase("authorizationSearchBtn") || callFrom.equalsIgnoreCase("reportingSearchBtn") || callFrom.equalsIgnoreCase("outSourceSearchBtn")){
				
				Query querySp = null;
				
				if(callFrom.equalsIgnoreCase("authorizationSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_authorization_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("reportingSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_reporting_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("outSourceSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_out_source_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn") && tabId.equalsIgnoreCase("AL")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_test_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTrackStatusSearchBtn")){
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_track_status_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionPending")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_pending(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("collectionPending")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_collection_pending(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionDone") || (callFrom.equalsIgnoreCase("processingSearchBtn") && tabId.equalsIgnoreCase("AL"))) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_done(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("rejectedSample")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_rejected_sample(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("processingSearchBtn") && tabId.equalsIgnoreCase("accessionpatho")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_authorization_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				}
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				//querySp.setParameter("callFrom", callFrom);					
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				return querySp.list();
				
			}else if(callFrom.equalsIgnoreCase("BTOBRecollection") || callFrom.equalsIgnoreCase("BTOCRecollection")){
					String sql="";
					//calling BtoB Record ReCollection Request	
					if(tabId.equalsIgnoreCase("ALBToB")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}
					}else if(tabId.equalsIgnoreCase("rejectedSampleBToB")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}
						}
					}else if(tabId.equalsIgnoreCase("pathoRecollectionBToB")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}		
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}		
						}
					}
					//calling BtoC Record ReCollection Request
					else if(tabId.equalsIgnoreCase("ALBToC")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}
						}		
					}else if(tabId.equalsIgnoreCase("rejectedSampleBToC")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {			
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {			
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}
					}else if(tabId.equalsIgnoreCase("pathoRecollectionBToC")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}				
					}
						
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setFirstResult(startIndex);
				query.setMaxResults(10);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();	
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));				
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setTestReasonName((String)row.get("test_reason_name"));
					obj.setPatientmobile((String)row.get("mobile"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
				
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sample_type_id"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					
					// added by ROHIT AMBAWADE on 23 Nov 2021
					obj.setPrintCount((Integer)row.get("printCount"));
					
					labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}
		}catch (Exception e) {
			e.printStackTrace();
			log.error("searchLabTestPatient()...Error"+e);
		}
		return labPatRecordlist;
	}
	
	@Override
	public String getSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy,
			String tabId,  String emergencyFlag, HttpServletRequest request) {
		
		Integer count = 0;
		Session session = null;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			session = sessionfactory.getCurrentSession();
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			String sql="";
			
			if(callFrom.equalsIgnoreCase("phelbotomySearchBtn") || callFrom.equalsIgnoreCase("appointmentSearchBtn")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_phelbotomy_search_btn(:unitId, :departmentId, :callFrom, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("callFrom", callFrom);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				count = resultCount.get(0).getRecord_count().intValue();
				
			}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn") || callFrom.equalsIgnoreCase("accessionTrackStatusSearchBtn") || callFrom.equalsIgnoreCase("processingSearchBtn")
					|| callFrom.equalsIgnoreCase("authorizationSearchBtn") || callFrom.equalsIgnoreCase("reportingSearchBtn") || callFrom.equalsIgnoreCase("outSourceSearchBtn")){
				
				Query querySp = null;
				
				if(callFrom.equalsIgnoreCase("authorizationSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_authorization_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("reportingSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_reporting_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("outSourceSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_out_source_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn") && tabId.equalsIgnoreCase("AL")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_accession_test_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTrackStatusSearchBtn")){
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_accession_track_status_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionPending")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_accession_pending(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("collectionPending")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_collection_pending(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionDone") || (callFrom.equalsIgnoreCase("processingSearchBtn") && tabId.equalsIgnoreCase("AL"))) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_accession_done(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("rejectedSample")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_rejected_sample(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("processingSearchBtn") && tabId.equalsIgnoreCase("accessionpatho")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_src_processing_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}
				
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				count = resultCount.get(0).getRecord_count().intValue();
				
			}else if(callFrom.equalsIgnoreCase("BTOBRecollection") || callFrom.equalsIgnoreCase("BTOCRecollection")){
				if(tabId.equalsIgnoreCase("ALBToB")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}
					}else{
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
						}
					}
				}else if(tabId.equalsIgnoreCase("rejectedSampleBToB")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}
					}else{
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
						}
					}
				}else if(tabId.equalsIgnoreCase("pathoRecollectionBToB")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}		
					}else{
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}		
					}
				}else if(tabId.equalsIgnoreCase("ALBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}
					}else{
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						}
					}		
				}else if(tabId.equalsIgnoreCase("rejectedSampleBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {			
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}
					}else{
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {			
							//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}
					}
				}else if(tabId.equalsIgnoreCase("pathoRecollectionBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}
					}else{
						if(searchBy.equalsIgnoreCase("byDate")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
							//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byAll")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byType")) {
							//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}else if(searchBy.equalsIgnoreCase("byTypeName")) {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						}
					}				
				}
				SQLQuery query = session.createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				count = (Integer) query.list().size();
				return count.toString();
			}
			
			
		}catch (Exception e) {
			e.printStackTrace();
			log.error("searchLabTestPatient()...Error"+e);
		}
		return count.toString();
	}
	
	private Integer getTodaysCount(String userType,Integer unitId,String emergencyFlag) {
		String sql="";
		Session session = null;
		session = sessionfactory.getCurrentSession();
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		String todaysDate = dateFormat.format(date);
		if(userType.equalsIgnoreCase("admin")){
			sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+todaysDate+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+todaysDate+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
		}else {
			sql="SELECT ep.patient_id AS patient_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+todaysDate+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+todaysDate+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
		}
		SQLQuery query = session.createSQLQuery(sql);
		if(emergencyFlag.equalsIgnoreCase("Y")) {
			query.setString(0, "Y");
			query.setString(1, "Y");
		}else if(emergencyFlag.equalsIgnoreCase("All")) {
			query.setString(0, "Y");
			query.setString(1, "N");
		}else {
			query.setString(0, "N");
			query.setString(1, "N");
		}
		Integer count = (Integer) query.list().size();
		return count;
	}

	@Override
	public List<PathologySampleWiseMaster> getPhlebotomyPagination(String callFrom, Integer startIndex,
			String emergencyFlag, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		String sql="";
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		
		try{
			if(callFrom.equalsIgnoreCase("phlebotomy")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.business_type = '2' AND eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.treatment_id ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ep.age, SUBSTR(ps.created_date_time, 1, 10) as datetime,CONCAT(ep.prefix,' ', ep.f_name, ' ',ep.m_name,' ', ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name,'-') AS docname, GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,COUNT(DISTINCT ps.sample_type_id) AS samplecount,et.treatment_id AS treatment_id,et.department_id AS department_id,ps.phlebo_teststatus FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.business_type = '2' AND ps.customer_id IN ("+userCustomerId+") and eb.cancle = 'N' and ps.deleted='N' and  ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.treatment_id ORDER BY et.treatment_id DESC";
				}
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setFirstResult(startIndex);
				query.setMaxResults(10);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					    obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						//obj.setDocname((String)row.get("docname"));
						obj.setDocname((String)row.get("refdocname"));
						obj.setBarcodenumber((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setSamplenumber((BigInteger)row.get("samplecount"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setPhleboteststatus((String)row.get("phlebo_teststatus"));
						labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}else if(callFrom.equalsIgnoreCase("allBToB") || callFrom.equalsIgnoreCase("ARBToB") || callFrom.equalsIgnoreCase("PRBToB")
					|| callFrom.equalsIgnoreCase("allBToC") || callFrom.equalsIgnoreCase("ARBToC") || callFrom.equalsIgnoreCase("PRBToC")){
				if(callFrom.equalsIgnoreCase("allBToB")) {
					if(userType.equalsIgnoreCase("admin")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("ARBToB")) {
					if(userType.equalsIgnoreCase("admin")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
					}else{
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("PRBToB")) {
					if(userType.equalsIgnoreCase("admin")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("allBToC")) {
					if(userType.equalsIgnoreCase("admin")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
					}else{
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
					}
				}else if(callFrom.equalsIgnoreCase("ARBToC")) {
					if(userType.equalsIgnoreCase("admin")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("PRBToC")) {
					if(userType.equalsIgnoreCase("admin")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else{
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);

			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();	
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setTestReasonName((String)row.get("test_reason_name"));
				obj.setPatientmobile((String)row.get("mobile"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sample_type_id"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				
				labPatRecordlist.add(obj);
			}
				return labPatRecordlist;
			}else if(callFrom.equalsIgnoreCase("accession")  || callFrom.equalsIgnoreCase("accessionTrackStatus")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and  ps.in_out_house=0 AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
			}else if(callFrom.equalsIgnoreCase("accessionPending")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=2 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}
			}else if(callFrom.equalsIgnoreCase("collectionPending")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=1 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
			}else if(callFrom.equalsIgnoreCase("accessionDone") || callFrom.equalsIgnoreCase("processing")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
			}else if(callFrom.equalsIgnoreCase("rejectedSample")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}
			}else if(callFrom.equalsIgnoreCase("authorization")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}
			}else if(callFrom.equalsIgnoreCase("reporting")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
			}else if(callFrom.equalsIgnoreCase("outsource")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}
			}else if(callFrom.equalsIgnoreCase("accessionpathologist")) {
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}else{
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=5 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
				}
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);

			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = query.list();
			for (Map<String, Object> row : list) {
				PathologySampleWiseMaster obj = new PathologySampleWiseMaster();
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer) row.get("age"));
				obj.setPathologistId((Integer) row.get("pathologist_id"));
				obj.setPatientgander((String) row.get("gender"));
				obj.setMasterId((String) row.get("id"));
				obj.setTeststatus((Integer) row.get("test_status"));
				obj.setDatetime((String) row.get("datetime"));
				obj.setPatientname((String) row.get("patient_name"));
				obj.setPatientId((Integer) row.get("patient_id"));
				//obj.setDocname((String) row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String) row.get("pathologistName"));
				obj.setBarCode((String) row.get("barCode"));
				obj.setProfileName((String) row.get("testname"));
				obj.setTreatmentId((Integer) row.get("treatment_id"));
				obj.setDepartmentId((Integer) row.get("department_id"));
				obj.setSamplename((String) row.get("sample_name"));
				obj.setContainername((String) row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date) row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer) row.get("in_out_house"));
				obj.setSampleTypeId((Integer) row.get("sampleTypeId"));
				obj.setHeadingname((String) row.get("headingname"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));

				labPatRecordlist.add(obj);
			}
				return labPatRecordlist;
		}catch(Exception e){
			e.printStackTrace();
			log.error("getPhlebotomyPagination()...Error :"+e);
		}
		return labPatRecordlist;
	}
	
	@Override
	public String getRecordCount(HttpServletRequest request) {
		
		Integer openCount = 0;
		Integer collectionCount = 0;
		Integer partialCount = 0;

		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			
			String sql="";
			
			if(userType.equalsIgnoreCase("admin")){
				sql = "SELECT ep.patient_id AS patient_id, et.treatment_id AS treatment_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.unit_Id="+unitId+" AND ps.business_type='2' group by ps.treatment_id";	
			}else{
				sql = "SELECT ep.patient_id AS patient_id, et.treatment_id AS treatment_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.unit_Id="+unitId+" AND ps.business_type='2' group by ps.treatment_id";				
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			
			for(Map<String, Object> row : list){
				Integer patientId = (Integer)row.get("patient_id");
				Integer treatmentId = (Integer)row.get("treatment_id");
				
				String sql1 = "SELECT ps.test_status FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.unit_Id="+unitId+" and ps.patient_id="+patientId+" and ps.treatment_id="+treatmentId+" group by ps.sample_type_Id, ps.in_out_house, ps.test_status";				
				SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql1);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list1 = query1.list();
				
				boolean openStatus = false;
				boolean collectionStatus = false;
				
				for(Map<String, Object> r : list1){
					Integer testStatus = (Integer)r.get("test_status");
					if(testStatus.equals(1)) {
						openStatus = true;
					}else {
						collectionStatus = true;
					}
				}
				
				if(openStatus && collectionStatus)
					partialCount++;
				else if(openStatus && !collectionStatus)
					openCount++;
				else if(!openStatus && collectionStatus)
					collectionCount++;
			}
			return openCount+","+collectionCount+","+partialCount;
		} catch (Exception e) {
			e.printStackTrace();
			log.error("getRecordCount()...Error :"+e);
		}	
		return openCount+","+collectionCount+","+partialCount;
	}
	
	@Override
	public List<PathologySampleWiseMaster> getStatus(String masterId, HttpServletRequest request) {

		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		Session session = null;
		String sql = "";
		try{
			session = sessionfactory.getCurrentSession();
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");

			sql = "SELECT ps.test_status AS test_status, ps.in_out_house AS in_out_house, ps.created_date_time AS datetime, ps.created_by AS created_by, ps.accepted_by AS accepted_by, ps.accepted_datetime AS accepted_datetime, ps.collected_by AS collected_by, ps.collected_date AS collected_date, ps.rejected_by AS rejected_by, ps.rejected_date AS rejected_date, ps.unauthorized_by AS unauthorized_by, ps.unauthorized_date AS unauthorized_date, ps.authorized_by AS authorized_by, ps.authorized_date AS authorized_date, ps.post_by AS post_by, ps.post_date AS post_date FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id WHERE ps.unit_Id = "+unitId+" AND ps.id IN ("+masterId+") GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ";
			SQLQuery query = session.createSQLQuery(sql);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setCreateDate((Date)row.get("datetime"));

				if((Integer)row.get("created_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("created_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setCreatedByName((String)((userList.get(0)).get("user_name")));
				}else{
					obj.setCreatedByName("-");
				}

				obj.setAcceptedDateTime((Date)row.get("accepted_datetime"));

				if((Integer)row.get("accepted_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("accepted_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setAcceptedByName((String)((userList.get(0)).get("user_name")));
				}else{
					obj.setAcceptedByName("-");
				}

				
				obj.setCollecteddatetime((Date) row.get("collected_date"));
				
				if((Integer)row.get("collected_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("collected_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setCollectedByName((String)((userList.get(0)).get("user_name")));
					
				}else{
					obj.setCollectedByName("-");
				}
				
				obj.setRejecteddatetime((Date) row.get("rejected_date"));
				
				if((Integer)row.get("rejected_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("rejected_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setRejectedByName((String)((userList.get(0)).get("user_name")));
				}else{
					obj.setRejectedByName("-");
				}
				
				obj.setUnauthorizeddatetime((Date) row.get("unauthorized_date"));
				
				if((Integer)row.get("unauthorized_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("unauthorized_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setUnauthorizedByName((String)((userList.get(0)).get("user_name")));
				}else{
					obj.setUnauthorizedByName("-");
				}
				
				obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
				
				if((Integer)row.get("authorized_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("authorized_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setAuthorizedByName((String)((userList.get(0)).get("user_name")));
				}else{
					obj.setAuthorizedByName("-");
				}
				
				obj.setPostdatetime((Date) row.get("post_date"));
				
				if((Integer)row.get("post_by") != null){
					SQLQuery Userquery = session.createSQLQuery("Select CONCAT(u.f_name,' ',u.m_name,' ',u.l_name) AS user_name FROM users u WHERE User_ID = "+row.get("post_by")+" ");
					Userquery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> userList = Userquery.list();
					obj.setPostByName((String)((userList.get(0)).get("user_name")));
				}else{
					obj.setPostByName("-");
				}
				
				labPatRecordlist.add(obj);
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("getStatus()...Error :"+e);
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}
	
	@Override
	public String getRecollectionRecordCount(String callform, HttpServletRequest request) {
		
		Integer allBToBCount = 0;
		Integer ARBToBCount = 0;
		Integer PRBToBCount = 0;
		Integer allBToCCount = 0;
		Integer ARBToCCount = 0;
		Integer PRBToCCount = 0;

		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");

			String sql = "";
			
			if(callform.equalsIgnoreCase("BTOBRecollection")){
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.business_type='9' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					allBToBCount = query1.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query2 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					ARBToBCount = query2.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id,ps.treatment_id,ps.in_out_house, ps.test_status, ps.sample_count ";				
					SQLQuery query3 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					PRBToBCount = query3.list().size();
					
					return allBToBCount+","+ARBToBCount+","+PRBToBCount;
				}else{
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.business_type='9' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_id IN ("+userCustomerId+") group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					allBToBCount = query1.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_id IN ("+userCustomerId+") group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query2 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					ARBToBCount = query2.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_id IN ("+userCustomerId+") group by ps.sample_type_Id,ps.treatment_id,ps.in_out_house, ps.test_status, ps.sample_count ";				
					SQLQuery query3 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					PRBToBCount = query3.list().size();
				
					return allBToBCount+","+ARBToBCount+","+PRBToBCount;
				}
			}else if(callform.equalsIgnoreCase("BTOCRecollection")){
				if(userType.equalsIgnoreCase("admin")){
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					allBToCCount = query1.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query2 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					ARBToCCount = query2.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.re_collection= 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";				
					SQLQuery query3 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					PRBToCCount = query3.list().size();

					return allBToCCount+","+ARBToCCount+","+PRBToCCount;
				}else{
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_id IN ("+userCustomerId+") group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					allBToCCount = query1.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_id IN ("+userCustomerId+") group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.treatment_id,ps.sample_count ";				
					SQLQuery query2 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					ARBToCCount = query2.list().size();
				
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.re_collection= 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_id IN ("+userCustomerId+") group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ";				
					SQLQuery query3 = sessionfactory.getCurrentSession().createSQLQuery(sql);
					PRBToCCount = query3.list().size();

					return allBToCCount+","+ARBToCCount+","+PRBToCCount;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			log.error("getRecollectionRecordCount()...Error :"+e);
		}	
		return 0+","+0+","+0;
	}
	
	@Override
	public String getForcedOutsourceSearchRecordCount(Integer outSourceType,
			Integer outSourceTypeId, String fromDate, String toDate,
			String tabId, String searchBy, String emergencyFlag, HttpServletRequest request) {

		Integer rowCount = 0;
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
		
			if(searchBy.equalsIgnoreCase("byAll") || searchBy.equalsIgnoreCase("byDate")){
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}
			String sql="";		
			
	        if(userType.equalsIgnoreCase("admin")){
				if(tabId.equalsIgnoreCase("outsource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}	
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and  ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+"  and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";							
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";						
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";						
					}
				}			
			}else{				
				if(tabId.equalsIgnoreCase("outsource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}	
				}
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
					 rowCount = query.list().size();
			return rowCount.toString();
		} catch (Exception e) {
			e.printStackTrace();
			return rowCount.toString();
		}
	}

	@Override
	public List<PathologySampleWiseMaster> searchDateWiseOutSourced(
			Integer outSourceType, Integer outSourceTypeId, String tabId,
			String fromDate, String toDate, Integer startIndex, String searchBy, String emergencyFlag, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
		
			if(searchBy.equalsIgnoreCase("byAll") || searchBy.equalsIgnoreCase("byDate")){
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}
			String sql="";		
			
	        if(userType.equalsIgnoreCase("admin")){
				if(tabId.equalsIgnoreCase("outsource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and  SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";
					}	
					
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and  ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+"  and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";							
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";						
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";						
					}
				}			
			}else{				
				if(tabId.equalsIgnoreCase("outsource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";
					}
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";
					}	
				}
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setOutlabName((String)row.get("out_lab_name"));
				obj.setCarrierId((String)row.get("carrier_name"));
				obj.setCommentId((String)row.get("comment"));
				obj.setDispatchDate((String)row.get("dispatch_date"));
				obj.setDispatchTime((String)row.get("dispatch_time"));				
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue")); 
				obj.setTemplateWise((String)row.get("template_wise"));
				obj.setProfileId(((Number)row.get("profile_Id")).intValue());
				obj.setSubServiceId(((Number)row.get("sub_service_id")).intValue());

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
	}
	
	@Override
	public List<PathologySampleWiseMaster> getOutSourcePagination(String callFrom, Integer startIndex,
			 String emergencyFlag, HttpServletRequest request) {
		
		HttpSession session = request.getSession();
		Integer unitId = (Integer) session.getAttribute("uId");
		String userType = (String) session.getAttribute("userType");
		String userCustomerType = (String) session.getAttribute("userCustomerType");
		String userCustomerId = (String) session.getAttribute("userCustomerId");
		String sql="";
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		
		try{
			if(userType.equalsIgnoreCase("admin")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8  and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status =8  and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);

			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for (Map<String, Object> row : list) {
				PathologySampleWiseMaster obj = new PathologySampleWiseMaster();

				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setOutlabName((String) row.get("out_lab_name"));
				obj.setCarrierId((String) row.get("carrier_name"));
				obj.setCommentId((String) row.get("comment"));
				obj.setDispatchDate((String) row.get("dispatch_date"));
				obj.setDispatchTime((String) row.get("dispatch_time"));

				obj.setPatientage((Integer) row.get("age"));
				obj.setPatientgander((String) row.get("gender"));
				obj.setMasterId((String) row.get("id"));
				obj.setTeststatus((Integer) row.get("test_status"));
				obj.setDatetime((String) row.get("datetime"));
				obj.setPatientname((String) row.get("patient_name"));
				obj.setPatientId((Integer) row.get("patient_id"));
				//obj.setDocname((String) row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setBarCode((String) row.get("barCode"));
				obj.setProfileName((String) row.get("testname"));
				obj.setTreatmentId((Integer) row.get("treatment_id"));
				obj.setDepartmentId((Integer) row.get("department_id"));
				obj.setSamplename((String) row.get("sample_name"));
				obj.setContainername((String) row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date) row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer) row.get("in_out_house"));
				obj.setSampleTypeId((Integer) row.get("sampleTypeId"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));

				labPatRecordlist.add(obj);
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("getOutSourcePagination()...Error :"+e);
		}
		return labPatRecordlist;
	}
	
	@Override
	public List<PathologySampleWiseMaster> getOutsourceRecords(String callFrom,	HttpServletRequest request) {
		Session session = null;
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<>();
		String sql = "";
		try{
			session = sessionfactory.getCurrentSession();
			HttpSession Httpsession = request.getSession();
			Integer unitId = (Integer) Httpsession.getAttribute("uId");
			
			if(callFrom.equalsIgnoreCase("outsource")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";				
			
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setPatientage((Integer)row.get("age"));
						obj.setPathologistId((Integer)row.get("pathologist_id"));
						obj.setPatientgander((String)row.get("gender"));
						obj.setMasterId((String)row.get("id"));
						obj.setTeststatus((Integer)row.get("test_status"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						//obj.setDocname((String)row.get("docname"));
						obj.setDocname((String)row.get("refdocname"));
						obj.setPathlogistName((String)row.get("pathologistName"));
						obj.setBarCode((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setDepartmentId((Integer)row.get("department_id"));
						obj.setSamplename((String)row.get("sample_name"));
						obj.setContainername((String)row.get("conatiner_name"));
						//obj.setCollecteddatetime((Date)row.get("collected_date"));
						obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
						obj.setInOutHouse((Integer)row.get("in_out_house"));
						obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
						obj.setHeadingname((String)row.get("headingname"));
						obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
						obj.setCenterName((String)row.get("centerName"));

						labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}else if(callFrom.equals("forcedOutSource")){
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8 and ps.unit_Id="+unitId+" group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";						
				SQLQuery query = session.createSQLQuery(sql);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					
					obj.setOutlabName((String)row.get("out_lab_name"));
					obj.setCarrierId((String)row.get("carrier_name"));
					obj.setCommentId((String)row.get("comment"));
					obj.setDispatchDate((String)row.get("dispatch_date"));
					obj.setDispatchTime((String)row.get("dispatch_time"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));

					labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return labPatRecordlist;
	}

	@Override
	public String getPageCount(String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {

		String sql="";
		Integer count = 0;
		if(userType.equalsIgnoreCase("admin")) {
			sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
		}else{
			sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
		}

		try{
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			count = (Integer) query.list().size();
			return count.toString();
		}catch(Exception e){
			e.printStackTrace();
			log.error("getPageCount()...Error :"+e);
		}
		return count.toString();
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BCollectionsRecords(String emergencyFlag, Integer startIndex, 
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.runner_collected_by as collectedBy, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.runner_collected_by as collectedBy, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ps.transfered = 'N' AND ps.runner_assigned="+userId+") OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setTransferedToName(getUserName((Integer)row.get("collectedBy")));
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public boolean collectB2BSample(String masterIds, String testStatus, String barcode, Integer unitId, String userId) {
		
		try {
			/*HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			 */			
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer sampleCount = ((Number)query12.uniqueResult()).intValue();
				
			sampleCount++;
			
			List<String> myList = new ArrayList<String>(Arrays.asList(masterIds.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
				   numbers.add(Integer.parseInt(myList.get(i)));
			}
			
			Query qry1 = sessionfactory.getCurrentSession().createQuery("SELECT bilDetId FROM PathologySampleWiseMaster WHERE sampleWiseMasterId IN (:masterId)");
				  qry1.setParameterList("masterId", numbers);
				  
			List<Integer> billDetailsIds = qry1.list();
			
			Query qry2 = sessionfactory.getCurrentSession().createQuery("UPDATE BillDetailsDto set barCode =:barCode WHERE billDetailsId IN (:billDetailsId)");
				  qry2.setParameter("barCode", barcode);
				  qry2.setParameterList("billDetailsId", billDetailsIds);
				  qry2.executeUpdate();
			
			String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, barCode =:barCode, teststatus =:teststatus, runnerCollectedDate =:runnerCollectedDate, runnerCollectedBy =:runnerCollectedBy, collecteddatetime =:collecteddatetime, collectedBy =:collectedBy where sampleWiseMasterId IN (:sampleWiseMasterId)";
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    query.setParameter("runnerCollectedDate", new Date(new java.util.Date().getTime()));
			    query.setParameter("runnerCollectedBy", Integer.parseInt(userId));
			    query.setParameter("collecteddatetime", new Date(new java.util.Date().getTime()));
				query.setParameter("collectedBy", Integer.parseInt(userId));
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", Integer.parseInt(testStatus));
				query.setParameter("sampleCount", sampleCount);
				query.setParameter("barCode", barcode);
				query.executeUpdate();
				
				return true;
		    	
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@Override
	public boolean submitB2BSample(String masterIds, String testStatus, Integer unitId, String userId) {
		
		try {
			String[] masterId = masterIds.split("-");
			
			for(String ids : masterId) {
				List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));   
				}
				
				Integer countVal = 0;
				String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
				Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);        	 
				Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
						
				countVal = sampleCount + 1;
				
				String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, phleboteststatus =:phleboTestStatus, runnerSubmitDate =:runnerSubmitDate, runnerSubmitBy =:runnerSubmitBy where sampleWiseMasterId IN (:sampleWiseMasterId)";
				Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
					  query4.setParameter("runnerSubmitDate", new Date(new java.util.Date().getTime()));
					  query4.setParameter("runnerSubmitBy", Integer.parseInt(userId));
					  query4.setParameterList("sampleWiseMasterId", numbers);
					  query4.setParameter("teststatus", Integer.parseInt(testStatus));
					  query4.setParameter("phleboTestStatus", "U");
					  query4.setParameter("sampleCount", countVal);
					  query4.executeUpdate();
			}
			
			/*
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer sampleCount = ((Number)query12.uniqueResult()).intValue();
				
			sampleCount++;
			
			List<String> myList = new ArrayList<String>(Arrays.asList(masterIds.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			
			for(int i = 0; i < myList.size(); i++) {
				numbers.add(Integer.parseInt(myList.get(i)));   
			}
				
			String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, phleboteststatus =:phleboTestStatus, runnerSubmitDate =:runnerSubmitDate, runnerSubmitBy =:runnerSubmitBy where sampleWiseMasterId IN (:sampleWiseMasterId)";
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
			    query.setParameter("runnerSubmitDate", new Date(new java.util.Date().getTime()));
			    query.setParameter("runnerSubmitBy", Integer.parseInt(userId));
			    query.setParameterList("sampleWiseMasterId", numbers);
				query.setParameter("teststatus", Integer.parseInt(testStatus));
				query.setParameter("phleboTestStatus", "U");
				query.setParameter("sampleCount", sampleCount);
				query.executeUpdate();
			*/	
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<PathologySampleWiseMaster> searchB2BRecords(String custTypeId, String custNameId, String fromDate,
			String toDate, String searchBy, Integer startIndex, String emergencyFlag, String testStatus,
			Integer unitId, String userType, Integer userId) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		Session session = null;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			session = sessionfactory.getCurrentSession();
			/*HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");*/
			
			String sql="";
			if(userType.equalsIgnoreCase("admin")){
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}
			}else{
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where (ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where (ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND ps.deleted='N' and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where (ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}
			}
		
			SQLQuery query = session.createSQLQuery(sql);
				
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
				
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
		
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));

				labPatRecordlist.add(obj);
			}
			return labPatRecordlist;
		}catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
	}

	@Override
	public String getB2BSearchRecordCount(String custTypeId, String custNameId, String fromDate, String toDate,
			String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType, Integer userId) {
		
		Session session = null;
		Integer count = 0;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			session = sessionfactory.getCurrentSession();
			/*HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");*/
			
			String sql="";
			if(userType.equalsIgnoreCase("admin")){
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}
			}else{
				if(searchBy.equalsIgnoreCase("byDate")) {
					//sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					//sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND ps.deleted='N' and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					//sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}
			}
		
			SQLQuery query = session.createSQLQuery(sql);
				
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
				
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
		
			count = (Integer) query.list().size();
			return count.toString();
		}catch (Exception e) {
			e.printStackTrace();
			return count.toString();
		}
	}

	@Override
	public List<PathologySampleWiseMaster> b2BPatientAutoSuggestion(String searchText, String searchBy,
			String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			/*HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			Integer userCustomerType = (Integer) session.getAttribute("userCustomerType");
			Integer userCustomerId = (Integer) session.getAttribute("userCustomerId");*/
			
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				if(searchBy.equalsIgnoreCase("byName")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byId")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byBarcode")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byMobile")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}
			}else{
				if(searchBy.equalsIgnoreCase("byName")) {
					//sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byId")) {
					//sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ep.patient_id LIKE '%"+searchText+"%' AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byBarcode")) {
					//sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ps.bar_code LIKE '%"+searchText+"%' AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}else if(searchBy.equalsIgnoreCase("byMobile")) {
					//sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" and ep.mobile LIKE '%"+searchText+"%' AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
				}
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();							
					obj.setPatientname((String)row.get("patient_name"));
			  		obj.setPatientId((Integer)row.get("patient_id"));
				labPatRecordlist.add(obj);			
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BPatientById(Integer patientId, String emergencyFlag,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId, Integer userId) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) AND ep.patient_id="+patientId+" and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N' AND ep.patient_id="+patientId+") OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ep.patient_id="+patientId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public boolean rejectB2BSample(String masterIds, String testStatus, String reason, Integer rejectedFrom, Integer unitId, String userId) {
		try {
			/*HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			Integer userId = (Integer) session.getAttribute("userId1");*/
			
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer sampleCount = ((Number)query12.uniqueResult()).intValue();
			
			sampleCount++;
			
			List<String> myList = new ArrayList<String>(Arrays.asList(masterIds.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			
			for(int i = 0; i < myList.size(); i++) {
				numbers.add(Integer.parseInt(myList.get(i)));   
			}
			
			String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, rejecteddatetime =:rejecteddatetime, rejectedBy =:rejectedBy,remarks =:remarks, b2BRejectedFrom =:rejectedFrom where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
		    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
		    
		    query.setParameter("rejecteddatetime", new Date(new java.util.Date().getTime()));
		    query.setParameter("rejectedBy", Integer.parseInt(userId));
		    query.setParameter("remarks", reason);
		    query.setParameterList("sampleWiseMasterId", numbers);
			query.setParameter("teststatus", Integer.parseInt(testStatus));
			query.setParameter("sampleCount", sampleCount);
			query.setParameter("rejectedFrom", rejectedFrom);
			query.executeUpdate();
			
			phlebotomyDaoImpl.updateDeleteFlagForInvoice(numbers,unitId,Integer.parseInt(userId),"LISRunnerBoy");//Added by kishor for delete service from billing when test is rejected by LISRunnerBoy.
			return true;
			
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean unrejectB2BSample(String masterIds, String testStatus, Integer unitId) {
		try {
			/*HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");*/
			
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
			Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer sampleCount = ((Number)query12.uniqueResult()).intValue();
			
			sampleCount++;
			
			List<String> myList = new ArrayList<String>(Arrays.asList(masterIds.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			
			for(int i = 0; i < myList.size(); i++) {
				numbers.add(Integer.parseInt(myList.get(i)));   
			}
			
			if(testStatus.equals("101")) {
				String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus where sampleWiseMasterId IN (:sampleWiseMasterId)";
				Query query = sessionfactory.getCurrentSession().createQuery(sql1);
				    query.setParameterList("sampleWiseMasterId", numbers);
					query.setParameter("teststatus", Integer.parseInt(testStatus));
					query.setParameter("sampleCount", sampleCount);
					query.executeUpdate();
			}else if(testStatus.equals("102")) {
				String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus where sampleWiseMasterId IN (:sampleWiseMasterId)";
				Query query = sessionfactory.getCurrentSession().createQuery(sql1);
				    query.setParameterList("sampleWiseMasterId", numbers);
					query.setParameter("teststatus", Integer.parseInt(testStatus));
					query.setParameter("sampleCount", sampleCount);
					query.executeUpdate();
			}
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public boolean dropB2BSample(String masterIds, String userId) {
		try {
			/*HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");*/
		
			List<String> myList = new ArrayList<String>(Arrays.asList(masterIds.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			
			for(int i = 0; i < myList.size(); i++) {
				numbers.add(Integer.parseInt(myList.get(i)));   
			}
			
			String sql1 = "UPDATE PathologySampleWiseMaster set deleted =:deleted, deletedBy =:deletedBy, deleteddatetime =:deleteddatetime where sampleWiseMasterId IN (:sampleWiseMasterId)";
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
	    
			query.setParameter("deleteddatetime", new Date(new java.util.Date().getTime()));
			query.setParameter("deletedBy", Integer.parseInt(userId));
			query.setParameter("deleted", "Y");
			query.setParameterList("sampleWiseMasterId", numbers);
			query.executeUpdate();
		
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public String getB2BSamplesCount(String emergencyFlag, Integer unitId, String userType, String userCustomerType,
			String userCustomerId, Integer userId) {

		String b2BCollection = "0";
		String b2BCollected = "0";
		String b2BRejected = "0";
		try {
			if(userType.equalsIgnoreCase("admin")) {
				String collection = "SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status=101 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				SQLQuery collectionQuery = sessionfactory.getCurrentSession().createSQLQuery(collection);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					collectionQuery.setString(0, "Y");
					collectionQuery.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					collectionQuery.setString(0, "N");
					collectionQuery.setString(1, "Y");
				}else {
					collectionQuery.setString(0, "N");
					collectionQuery.setString(1, "N");
				}
				b2BCollection = ((Integer) collectionQuery.list().size()).toString();
					
			
				String collected = "SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status=102 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				SQLQuery collectedQuery = sessionfactory.getCurrentSession().createSQLQuery(collected);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					collectedQuery.setString(0, "Y");
					collectedQuery.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					collectedQuery.setString(0, "N");
					collectedQuery.setString(1, "Y");
				}else {
					collectedQuery.setString(0, "N");
					collectedQuery.setString(1, "N");
				}
				b2BCollected = ((Integer) collectedQuery.list().size()).toString();
			
				String rejected = "SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status=4 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				SQLQuery rejectedQuery = sessionfactory.getCurrentSession().createSQLQuery(rejected);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					rejectedQuery.setString(0, "Y");
					rejectedQuery.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					rejectedQuery.setString(0, "N");
					rejectedQuery.setString(1, "Y");
				}else {
					rejectedQuery.setString(0, "N");
					rejectedQuery.setString(1, "N");
				}
				b2BRejected = ((Integer) rejectedQuery.list().size()).toString();
			}else{
				//String sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				//String collection="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status=101 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				String collection="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN (101) and ps.unit_Id="+unitId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN (101) and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				SQLQuery collectionQuery = sessionfactory.getCurrentSession().createSQLQuery(collection);
			
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					collectionQuery.setString(0, "Y");
					collectionQuery.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					collectionQuery.setString(0, "N");
					collectionQuery.setString(1, "Y");
				}else {
					collectionQuery.setString(0, "N");
					collectionQuery.setString(1, "N");
				}
				b2BCollection = ((Integer) collectionQuery.list().size()).toString();
			
				//String collected="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status=102 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				String collected="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN (102) and ps.unit_Id="+unitId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN (102) and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				SQLQuery collectedQuery = sessionfactory.getCurrentSession().createSQLQuery(collected);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					collectedQuery.setString(0, "Y");
					collectedQuery.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					collectedQuery.setString(0, "N");
					collectedQuery.setString(1, "Y");
				}else {
					collectedQuery.setString(0, "N");
					collectedQuery.setString(1, "N");
				}
				b2BCollected = ((Integer) collectedQuery.list().size()).toString();
			
				//String rejected="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status=4 and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				String rejected="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where (ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN (4) and ps.unit_Id="+unitId+" AND ps.runner_assigned="+userId+" AND ps.transfered = 'N') OR (ps.transferee_id="+userId+" AND ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN (4) and ps.unit_Id="+unitId+") AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				SQLQuery rejectedQuery = sessionfactory.getCurrentSession().createSQLQuery(rejected);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					rejectedQuery.setString(0, "Y");
					rejectedQuery.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					rejectedQuery.setString(0, "N");
					rejectedQuery.setString(1, "Y");
				}else {
					rejectedQuery.setString(0, "N");
					rejectedQuery.setString(1, "N");
				}
				b2BRejected = ((Integer) rejectedQuery.list().size()).toString();
			}
		}catch (Exception e) {
			e.printStackTrace();
			return b2BCollection+","+b2BCollected+","+b2BRejected;
		}
		return b2BCollection+","+b2BCollected+","+b2BRejected;
	}
	
	@Override
	public List<PathologyTestReasonDto> getTestRejectionReasons(String reasonType) {
		List<PathologyTestReasonDto> reasonList = new ArrayList<PathologyTestReasonDto>();
		try {
            Criteria criteria = sessionfactory.getCurrentSession().createCriteria(PathologyTestReasonDto.class);
            criteria.add(Restrictions.eq("deleted", "N"));           
            criteria.add(Restrictions.eq("reasonType", reasonType));          
            criteria.addOrder(Order.asc("testReasonName"));
            reasonList = criteria.list();
            return  reasonList;      
        } catch(Exception e) {
            e.printStackTrace();
            return reasonList;
        }
	}
	
	/*@Override
	@SuppressWarnings("unchecked")	
	public List<CustomerTypeDto> getAllCustomerType(String userCustomerType, String userType){
		
		List<CustomerTypeDto> lstCustType = new ArrayList<CustomerTypeDto>();
		String[] ids = userCustomerType.split(",");
		
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(CustomerTypeDto.class);
			
			if(!userType.equalsIgnoreCase("admin")) {
				
				Set<Integer> custIds = new HashSet<Integer>();
				for(String id : ids) {
					
					custIds.add(Integer.parseInt(id));
				}
				criteria.add(Restrictions.in("id", custIds));
			}		
			
			lstCustType = criteria.list();
			
		} catch (Exception e) {
			log.error("error for  getAllCustomerType....",e);			
		}
		
		return lstCustType;
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<BusinessCustMasterDto> getAllCustomers(String userCustomerName, String userType, String customerType) {

		List<BusinessCustMasterDto> lstCust = new ArrayList<BusinessCustMasterDto>();
		String[] ids = userCustomerName.split(",");
		try {
			Criteria criteria = sessionfactory.getCurrentSession().createCriteria(BusinessCustMasterDto.class);
			
			if(!userType.equalsIgnoreCase("admin")) {
				
				ArrayList<Integer> custIds = new ArrayList<Integer>();
				for(String id : ids) {
					
					custIds.add(Integer.parseInt(id));
				}
				criteria.add(Restrictions.in("id", custIds));
			}
			
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("type", Integer.parseInt(customerType)));
			lstCust = criteria.list();
			
		} catch (Exception e) {
			log.error("error for  getAllCustomers....",e);			
		}
		
		return lstCust;
	}*/

	@Override
	public List<LabPatchDto> getAllPatches(Integer unitId) {
		Session session = null;
		List<LabPatchDto> patchList = new ArrayList<>();
		try {
			session = sessionfactory.getCurrentSession();
			
			Query qry1 = session.createQuery("Select patchId as patchId, patchName as patchName, patchLocation as patchLocation, patchLabs as labIds FROM LabPatchDto WHERE deleted =:deleted AND unitId =:unitId");
				  qry1.setParameter("deleted", "N");
				  qry1.setParameter("unitId", unitId);
				  
				  qry1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					
			List<Map<String, Object>> list = qry1.list();
			for(Map<String, Object> row : list){
				LabPatchDto obj = new LabPatchDto();
				obj.setPatchId((Integer)row.get("patchId"));
				obj.setPatchName((String)row.get("patchName"));
				obj.setPatchLocation((String)row.get("patchLocation"));
				obj.setPatchLabs((String)row.get("labIds"));
			
				patchList.add(obj);
			}
			return patchList;
		}catch (Exception e) {
			e.printStackTrace();
			return patchList;
		}
	}

	@Override
	public List<Doctor> getRunnerBoysByPatch(String patchId, Integer unitId) {
		Session session = null;
		List<Doctor> usersList = new ArrayList<>();
		
		try {
			session = sessionfactory.getCurrentSession();
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String userType =(resourceBundle.getObject("RunnerBoyUserType").toString());
			
			String[] ids = patchId.split(",");
			Set<Doctor> uniqueUsers = new HashSet<>();
			for(String id : ids) {
				Query qry = session.createSQLQuery("SELECT user_id as userId, CONCAT(f_name, ' ', m_name, ' ', l_name) AS fullName FROM users where FIND_IN_SET('"+id+"', customer_id) AND user_Type =:userType AND status =:status AND unitmaster_id =:unitId");
				  qry.setParameter("userType", userType);
				  qry.setParameter("status", "Y");
				  qry.setParameter("unitId", unitId);
				  
				  qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					
				List<Map<String, Object>> list = qry.list();
				for(Map<String, Object> row : list){
					Doctor obj = new Doctor();
						obj.setUser_ID((Integer)row.get("userId"));
						obj.setUser_Name((String)row.get("fullName"));
						uniqueUsers.add(obj);
				}
			}
			
			usersList = new ArrayList<>(uniqueUsers);
			
			return usersList;
		}catch (Exception e) {
			e.printStackTrace();
			return usersList;
		}
	}

	@Override
	public boolean assignB2BSamples(String masterIds, Integer testStatus, Integer unitId, Integer userId,
			Integer runnerBoyId) {
		try {
			String[] masterId = masterIds.split("-");
			
			for(String ids : masterId) {
				List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();		
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));   
				}

				Integer countVal = 0;
				String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
				Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);        	 
				Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
						
				countVal = sampleCount + 1;

				String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, runnerAssignedDate =:runnerAssignedDate, runnerAssignedBy =:runnerAssignedBy, runnerAssigned =:runnerAssigned where sampleWiseMasterId IN (:sampleWiseMasterId)";
				Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
					  query4.setParameter("runnerAssignedDate", new Date(new java.util.Date().getTime()));
					  query4.setParameter("runnerAssignedBy", userId);
					  query4.setParameter("runnerAssigned", runnerBoyId);
					  query4.setParameterList("sampleWiseMasterId", numbers);
					  query4.setParameter("teststatus", testStatus);
					  query4.setParameter("sampleCount", countVal);
					  query4.executeUpdate();
			}
			
			/*
 			List<Integer> masterIdList = Stream.of(masterIds.split(","))
					  .map(String::trim)
					  .map(Integer::parseInt)
					  .collect(Collectors.toList());		
			
			String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
			Query query1= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
			Integer sampleCount = ((Number)query1.uniqueResult()).intValue();
					
				sampleCount++;
				
				
			String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, runnerAssignedDate =:runnerAssignedDate, runnerAssignedBy =:runnerAssignedBy, runnerAssigned =:runnerAssigned where sampleWiseMasterId IN (:sampleWiseMasterId)";
			Query query = sessionfactory.getCurrentSession().createQuery(sql1);
				  query.setParameter("runnerAssignedDate", new Date(new java.util.Date().getTime()));
				  query.setParameter("runnerAssignedBy", userId);
				  query.setParameter("runnerAssigned", runnerBoyId);
				  query.setParameterList("sampleWiseMasterId", masterIdList);
				  query.setParameter("teststatus", testStatus);
				  query.setParameter("sampleCount", sampleCount);
				  query.executeUpdate();
			*/
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BSamplesByRunnerBoy(String emergencyFlag, Integer runnerBoyId, String testStatus, Integer unitId, String userType, 
			String userCustomerType, String userCustomerId) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ps.runner_assigned="+runnerBoyId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND ps.runner_assigned="+runnerBoyId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setPatientage((Integer)row.get("age"));
				obj.setPathologistId((Integer)row.get("pathologist_id"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));
				obj.setIsTransfered((String)row.get("isTransfered"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}
	
	@Override
	public List<Doctor> getAllRunnerBoys(Integer unitId) {
		Session session = null;
		List<Doctor> usersList = new ArrayList<>();
		
		try {
			session = sessionfactory.getCurrentSession();
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			String userType =(resourceBundle.getObject("RunnerBoyUserType").toString());
			Query qry = session.createSQLQuery("SELECT user_id as userId, CONCAT(f_name, ' ', m_name, ' ', l_name) AS fullName FROM users where user_Type =:userType AND status =:status AND unitmaster_id =:unitId");
				  qry.setParameter("userType", userType);
				  qry.setParameter("status", "Y");
				  qry.setParameter("unitId", unitId);
				  
				  qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					
			List<Map<String, Object>> list = qry.list();
			for(Map<String, Object> row : list){
				Doctor obj = new Doctor();
					obj.setUser_ID((Integer)row.get("userId"));
					obj.setUser_Name((String)row.get("fullName"));
					
					usersList.add(obj);
			}
			return usersList;
		}catch (Exception e) {
			e.printStackTrace();
			return usersList;
		}
	}
	
	@Override
	public boolean unassignB2BSample(String masterIds, String testStatus, Integer unitId, String userId) {
		try {
			String[] masterId = masterIds.split("-");
			
			for(String ids : masterId) {
				List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();			
				for(int i = 0; i < myList.size(); i++) {
					numbers.add(Integer.parseInt(myList.get(i)));   
				}
				
				String sql1 = "SELECT ep.patient_id AS patient_id, et.treatment_id AS treatment_id, ps.sample_type_Id AS sampleTypeId FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id WHERE ps.deleted=:deleted AND ps.id in (:ids) AND ps.unit_Id=:unitId GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count";
				SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql1);
				
				query1.setParameter("unitId", unitId);
				query1.setParameter("deleted", "N");
				query1.setParameterList("ids", numbers);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list = query1.list();
				
				for(Map<String, Object> row : list){
					Integer patientId = (Integer)row.get("patient_id");
					Integer treatmentId = (Integer)row.get("treatment_id");
					Integer sampleTypeId = (Integer)row.get("sampleTypeId");

					Integer countVal = 0;
					String sql2 = "SELECT ifnull(max(sample_count),0) FROM pathology_sample_wise_master WHERE deleted ='N' AND sample_type_id="+sampleTypeId+" AND patient_id="+patientId+" AND treatment_id="+treatmentId+" AND unit_Id="+unitId+" AND test_status="+testStatus+"";
					Query query2 = sessionfactory.getCurrentSession().createSQLQuery(sql2); 
					Integer rowCount = ((Number)query2.uniqueResult()).intValue();
				
					if(rowCount == 0){
						String sql3="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status="+testStatus+"";
						Query query3 = sessionfactory.getCurrentSession().createSQLQuery(sql3);        	 
						Integer sampleCount = ((Number)query3.uniqueResult()).intValue();
						
						countVal = sampleCount + 1;
					}else{
						countVal = rowCount;
					}
					
					String sql4 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, runnerUnassignedDate =:runnerUnassignedDate, runnerUnassignedBy =:runnerUnassignedBy, isTransfered =:isTransfered, transferedBy =:transferedBy, transfereeId =:transfereeId, transferrerId =:transferrerId where sampleWiseMasterId IN (:sampleWiseMasterId)";
					Query query4 = sessionfactory.getCurrentSession().createQuery(sql4);
					    query4.setParameter("runnerUnassignedDate", new Date(new java.util.Date().getTime()));
					    query4.setParameter("runnerUnassignedBy", Integer.parseInt(userId));
					    query4.setParameterList("sampleWiseMasterId", numbers);
						query4.setParameter("teststatus", Integer.parseInt(testStatus));
						query4.setParameter("sampleCount", countVal);
						query4.setParameter("isTransfered", "N");
						query4.setParameter("transferedBy", 0);
						query4.setParameter("transfereeId", 0);
						query4.setParameter("transferrerId", 0);
						query4.executeUpdate();
				}
			}
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public Integer transferB2BSamples(PathologySampleTransferDto pathologySampleTransferDto) {
		Session session = null;
		try{
			session = sessionfactory.getCurrentSession();
			
			String[] masterId = pathologySampleTransferDto.getMasterIds().split("-");
			
			//String oldDate = pathologySampleTransferDto.getfDate();
			Integer days = pathologySampleTransferDto.getDays();
			
			//StringBuffer fd = new StringBuffer();
			//String[] fDate = oldDate.split("/");
				//fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
			
			//Specifying date format that matches the given date
			//SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar c = Calendar.getInstance();
			
			Date fromDate = null;
			Date toDate = null;
			
			try{
			   //Setting the date to the given date
			   //c.setTime(sdf.parse(fd.toString()));
			   fromDate = c.getTime();
			}catch(Exception e){
				e.printStackTrace();
			 }
			//Number of Days to add
			c.add(Calendar.DAY_OF_MONTH, days);
			toDate = c.getTime();
			
			for(String ids : masterId) {
				PathologySampleTransferDto dto = new PathologySampleTransferDto();
					dto.setDays(pathologySampleTransferDto.getDays());
					dto.setMasterIds(ids);
					dto.setTransferedBy(pathologySampleTransferDto.getTransferedBy());
					dto.setTransfereeId(pathologySampleTransferDto.getTransfereeId());
					dto.setTransferrerId(pathologySampleTransferDto.getTransferrerId());
					dto.setUnitId(pathologySampleTransferDto.getUnitId());
					dto.setUserCustomerId(pathologySampleTransferDto.getUserCustomerId());
					dto.setUserCustomerType(pathologySampleTransferDto.getUserCustomerType());
					dto.setFromDate(fromDate);
					dto.setToDate(toDate);
					
					session.merge(dto);
			}
			
			String idList = pathologySampleTransferDto.getMasterIds().replaceAll("-", ",");
			List<String> myList = new ArrayList<String>(Arrays.asList(idList.split(",")));
			ArrayList<Integer> numbers = new ArrayList<Integer>();			
			for(int i = 0; i < myList.size(); i++) {
				   numbers.add(Integer.parseInt(myList.get(i)));   
			}
			
		    String sql1 = "UPDATE PathologySampleWiseMaster set transferrerId =:transferrerId, transfereeId =:transfereeId, days =:days, transferedBy =:transferedBy, fromDate =:fromDate, toDate =:toDate, isTransfered =:isTransfered where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
		    Query query = sessionfactory.getCurrentSession().createQuery(sql1);
		    
		    query.setParameter("transferrerId", pathologySampleTransferDto.getTransferrerId());
		    query.setParameter("transfereeId", pathologySampleTransferDto.getTransfereeId());
		    query.setParameterList("sampleWiseMasterId", numbers);
			query.setParameter("days", pathologySampleTransferDto.getDays());
			query.setParameter("transferedBy", pathologySampleTransferDto.getTransferedBy());
			query.setParameter("fromDate", fromDate);
			query.setParameter("toDate", toDate);
			query.setParameter("isTransfered", "Y");
			query.executeUpdate();
			
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	@Override
	public String getB2BAsssignAndTransferPageCount(String emergencyFlag, String testStatus, Integer unitId,
			String userType, String userCustomerType, String userCustomerId, Integer userId) {
		String sql="";
		Integer count = 0;
		if(userType.equalsIgnoreCase("admin")){
			sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
		}else{
			sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.customer_id IN ("+userCustomerId+") and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
		}
		
		try{
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			count = (Integer) query.list().size();
			return count.toString();
		}catch(Exception e){
			e.printStackTrace();
			log.error("getB2BAsssignAndTransferPageCount()...Error :"+e);
		}
		return count.toString();
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BAsssignAndTransferRecords(String emergencyFlag, Integer startIndex,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId,
			Integer userId) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setTransferedFromName(getUserName((Integer)row.get("transferrer_id")));
				obj.setTransferedToName(getUserName((Integer)row.get("transferee_id")));
				String isTransfered = (String)row.get("isTransfered");
				if(isTransfered.equalsIgnoreCase("Y"))
					obj.setIsTransfered(checkIsTransfered((String)row.get("isTransfered"), (String)row.get("transfer_from_date"), (String)row.get("transfer_to_date")));
				else
					obj.setIsTransfered(isTransfered);
				obj.setTransferedDate((Date)row.get("transfered_date_time"));
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}
	
	private String getUserName(Integer userId) {
		Session session = null;
		try {
			session = sessionfactory.getCurrentSession();
			Query qry = session.createSQLQuery("SELECT CONCAT(f_name, ' ', m_name, ' ', l_name) from users where user_id=:userId");
				qry.setParameter("userId", userId);
				
			return (String) qry.uniqueResult();
		}catch (Exception e) {
			e.printStackTrace();
			return "-";
		}
	}
	
	private String checkIsTransfered(String isTransfered, String fromDate, String toDate) throws ParseException {
		SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		String today = sdformat.format(c.getTime());
		
		if(today.compareTo(fromDate) >= 0 && today.compareTo(toDate) <= 0) {
	    	return "Y";
	    }
		return "N";
	}

	
	
	@Override
	public List<PathologySampleWiseMaster> getB2BTransferedSamplesByRunnerBoy(String emergencyFlag, Integer runnerBoyId,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId) {

		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) AND (ps.transfered = 'N' AND ps.runner_assigned ="+runnerBoyId+" OR ps.transferee_id ="+runnerBoyId+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.b2b_rejected_from AS rejectedFrom, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) AND (ps.transfered = 'N' AND ps.runner_assigned ="+runnerBoyId+" OR ps.transferee_id ="+runnerBoyId+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setTransferedFromName(getUserName((Integer)row.get("transferrer_id")));
				obj.setTransferedToName(getUserName((Integer)row.get("transferee_id")));
				String isTransfered = (String)row.get("isTransfered");
				Integer runnerAssigned = (Integer)row.get("runnerAssigned");
				if(isTransfered.equalsIgnoreCase("Y") && runnerAssigned.equals(runnerBoyId))
					obj.setIsTransfered(checkIsTransfered((String)row.get("isTransfered"), (String)row.get("transfer_from_date"), (String)row.get("transfer_to_date")));
				else if(isTransfered.equalsIgnoreCase("Y") && (!runnerAssigned.equals(runnerBoyId)))
					obj.setIsTransfered("N");
				else
					obj.setIsTransfered(isTransfered);
				obj.setTransferedDate((Date)row.get("transfered_date_time"));
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned(runnerAssigned);

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> b2BAssignAndTransferAutoSuggestion(String searchText, String searchBy,
			String emergencyFlag, String testStatus, Integer unitId, String userType, String userCustomerType,
			String userCustomerId) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			/*HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			Integer userCustomerType = (Integer) session.getAttribute("userCustomerType");
			Integer userCustomerId = (Integer) session.getAttribute("userCustomerId");*/
			
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				if(searchBy.equalsIgnoreCase("byName")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byId")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byBarcode")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byMobile")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}
			}else{
				if(searchBy.equalsIgnoreCase("byName")) {
					sql="SELECT CONCAT(ep.prefix,' ', ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and CONCAT(ep.prefix,' ',ep.f_name,' ',ep.m_name,' ',ep.l_name) LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byId")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.patient_id LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byBarcode")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.bar_code LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}else if(searchBy.equalsIgnoreCase("byMobile")) {
					sql="SELECT CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ep.mobile LIKE '%"+searchText+"%' AND et.emergency_flag IN (?,?) group by ep.patient_id";
				}
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();							
					obj.setPatientname((String)row.get("patient_name"));
			  		obj.setPatientId((Integer)row.get("patient_id"));
				labPatRecordlist.add(obj);			
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> getB2BAssignAndTransferPatientById(Integer patientId, String emergencyFlag,
			String testStatus, Integer unitId, String userType, String userCustomerType, String userCustomerId) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			String sql="";
			if(userType.equalsIgnoreCase("admin")) {
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' AND ep.patient_id="+patientId+" and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";				
			}else{
				sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' AND ep.patient_id="+patientId+" and ps.customer_id IN ("+userCustomerId+") and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
			}

			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")){
				query.setString(0, "N");
				query.setString(1, "Y");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setTransferedFromName(getUserName((Integer)row.get("transferrer_id")));
				obj.setTransferedToName(getUserName((Integer)row.get("transferee_id")));
				obj.setIsTransfered("N");
				obj.setTransferedDate((Date)row.get("transfered_date_time"));
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> searchB2BAssignAndTransferRecords(String custTypeId, String custNameId,
			String fromDate, String toDate, String searchBy, Integer startIndex, String emergencyFlag,
			String testStatus, Integer unitId, String userType) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		Session session = null;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			session = sessionfactory.getCurrentSession();
			
			String sql="";
			if(userType.equalsIgnoreCase("admin")){
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}
			}else{
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.transferrer_id, ps.transferee_id, ps.transfered as isTransfered, ps.transfered_date_time, SUBSTR(ps.transfer_from_date, 1, 10) as transfer_from_date, SUBSTR(ps.transfer_to_date, 1, 10) as transfer_to_date, CONCAT(usr.f_name, ' ', usr.m_name, ' ', usr.l_name) as assignedTo, ps.runner_assigned_date as runnerAssignedDate, ps.runner_assigned as runnerAssigned, ps.runner_collected_date AS runner_collected_date, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id left JOIN users usr ON usr.user_id = ps.runner_assigned JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}
			}
		
			SQLQuery query = session.createSQLQuery(sql);
				
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
				
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
		
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				obj.setTransferedFromName(getUserName((Integer)row.get("transferrer_id")));
				obj.setTransferedToName(getUserName((Integer)row.get("transferee_id")));
				obj.setIsTransfered("N");
				obj.setTransferedDate((Date)row.get("transfered_date_time"));
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setPathlogistName((String)row.get("pathologistName"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setHeadingname((String)row.get("headingname"));
				obj.setRunnerCollectedDate((Date)row.get("runner_collected_date"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setRunnerAssignedDate((Date)row.get("runnerAssignedDate"));
				obj.setRunnerAssignedName((String)row.get("assignedTo"));
				obj.setRunnerAssigned((Integer)row.get("runnerAssigned"));

				labPatRecordlist.add(obj);
			}
			return labPatRecordlist;
		}catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
		}
	}

	@Override
	public String getB2BAssignAndTransferRecordsCount(String custTypeId, String custNameId, String fromDate,
			String toDate, String searchBy, String emergencyFlag, String testStatus, Integer unitId, String userType) {
		
		Session session = null;
		Integer count = 0;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			session = sessionfactory.getCurrentSession();
			String sql="";
			if(userType.equalsIgnoreCase("admin")){
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}
			}else{
				if(searchBy.equalsIgnoreCase("byDate")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byAll")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}else if(searchBy.equalsIgnoreCase("byTypeName")) {
					sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.deleted='N' and ps.phlebo_teststatus='R' and ps.test_status IN ("+testStatus+") and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				}
			}
		
			SQLQuery query = session.createSQLQuery(sql);
				
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
				
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
		
			count = (Integer) query.list().size();
			return count.toString();
		}catch (Exception e) {
			e.printStackTrace();
			return count.toString();
		}
	}
	
	private Date getOldestCollectionDate(String masterIds) {
		List<Date> dateList = new ArrayList<>();
		Date dateToReturn = null;
		try {
			SQLQuery sql = null;
			sql = sessionfactory.getCurrentSession().createSQLQuery("SELECT id as id, IFNULL(trim(collection_date), '') as collection_date, IFNULL(trim(collection_time), '') as collection_time FROM pathology_sample_wise_master where id in("+masterIds+")");     
			sql.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = sql.list();
			for (Map<String, Object> rs : list) {
				Integer id = (Integer) rs.get("id");
				String collectionDate = (String) rs.get("collection_date");
				String collectionTime = (String) rs.get("collection_time");
				
				if(!collectionDate.equalsIgnoreCase("") || !collectionTime.equalsIgnoreCase("")) {
					StringBuffer fd = new StringBuffer();
					String[] fDate = collectionDate.split("/");
						fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
						SimpleDateFormat sdformat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

						Date d1 = sdformat.parse((fd.toString())+" "+collectionTime);
				
						dateList.add(d1);
				}
			}
			
			if(dateList.size() > 0) {
				Date d1 = dateList.get(0);
				
				for(int i = 0; i < dateList.size(); i++) {
					if(d1.compareTo(dateList.get(i)) > 0) {
						d1 = dateList.get(i);
					}
				}
				dateToReturn = d1;
			}
			return dateToReturn;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<PathologySampleWiseMaster> getSamplesByCollectedAt(String callFrom, String tabId, Integer startIndex,
			String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = txtFdate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
			String[] tDate = txtTdate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			
			String queryAppend = "";
			if(collectedAtId == 0) {
					
			}else {
				queryAppend += " AND et.ref_doc_id ="+collectedAtId;
			}

			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";
			
			if(callFrom.equalsIgnoreCase("phlebotomy") || callFrom.equalsIgnoreCase("appointment")) {
				if(callFrom.equalsIgnoreCase("phlebotomy")) {
					if(tabId.equalsIgnoreCase("open")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							sql="SELECT ifnull(et.appointment_id,0) as appointment_id, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,em.unit_name, ps.collected_flag, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.test_status=1 AND ps.business_type = '2' AND eb.cancle = 'N' AND ps.deleted = 'N' "+queryAppend+" AND ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}else {
							sql="SELECT ifnull(et.appointment_id,0) as appointment_id, em.unit_name, ps.collected_flag, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=1 AND ps.business_type = '2' and eb.cancle = 'N' and ps.deleted = 'N' AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}
					}else {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							sql="SELECT ifnull(et.appointment_id,0) as appointment_id, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,em.unit_name, ps.collected_flag, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.test_status > 1 AND ps.test_status <= 6 AND ps.business_type='2' and eb.cancle = 'N' and ps.deleted = 'N' "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}else {
							sql="SELECT ifnull(et.appointment_id,0) as appointment_id, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,em.unit_name, ps.collected_flag, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status > 1 AND ps.test_status <= 6 AND ps.business_type='2' and eb.cancle = 'N' and ps.deleted = 'N' AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}
					}
				}else {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ifnull(et.appointment_id,0) as appointment_id, ifnull(ep.email_id,'-') as email_id,ps.profile_Id, em.unit_name, ps.collected_flag, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.test_status=0 AND ps.business_type = '2' AND eb.cancle = 'N' AND ps.deleted = 'N' "+queryAppend+" AND ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(et.appointment_id,0) as appointment_id, ifnull(ep.email_id,'-') as email_id,ps.profile_Id, em.unit_name, ps.collected_flag, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=0 AND ps.business_type = '2' and eb.cancle = 'N' and ps.deleted = 'N' AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}
				
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					query.setString(0, "N");
					query.setString(1, "Y");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				query.setFirstResult(startIndex);
				query.setMaxResults(10);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setAppointmentId(((Number)row.get("appointment_id")).intValue());
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));
					obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
					obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPathologistId((Integer)row.get("pathologist_id"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setPathlogistName((String)row.get("pathologistName"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					obj.setUnitname((String)row.get("unit_name"));
					obj.setCollectedFlag((String)row.get("collected_flag"));

					labPatRecordlist.add(obj);
				}
			}else {
				if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("AL")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id, IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ps.b2b_rejected_from AS rejectedFrom, ps.phlebo_teststatus AS PhleboTestStatus, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("accessionPending")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=2 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("collectionPending")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=1 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=1 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("accessionDone")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=3 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("rejectedSample")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.deleted = 'N' AND ps.test_status=4 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("processing") && tabId.equalsIgnoreCase("AL")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=3 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	GROUP_CONCAT(DISTINCT e.category_name SEPARATOR ',') AS headingname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("authorization")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, ps.sample_type_Id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("outsource") && tabId.equalsIgnoreCase("outsource")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 AND ps.in_out_house=1 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("reporting")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("BTOCRecollection") && tabId.equalsIgnoreCase("ALBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("BTOCRecollection") && tabId.equalsIgnoreCase("rejectedSampleBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("BTOCRecollection") && tabId.equalsIgnoreCase("pathoRecollectionBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}
				
				if(!(sql.trim().isEmpty())) {
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
					if(emergencyFlag.equalsIgnoreCase("Y")) {
						query.setString(0, "Y");
						query.setString(1, "Y");
					}else if(emergencyFlag.equalsIgnoreCase("All")){
						query.setString(0, "N");
						query.setString(1, "Y");
					}else {
						query.setString(0, "N");
						query.setString(1, "N");
					}
				
					query.setFirstResult(startIndex);
					query.setMaxResults(10);
					query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setEmailId((String)row.get("email_id"));
						obj.setProfileId((Integer)row.get("profile_Id"));
						obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
						obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
						obj.setTestReasonName((String)row.get("test_reason_name"));
						obj.setPatientmobile((String)row.get("mobile"));
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setPathologistId((Integer)row.get("pathologist_id"));
						obj.setPatientgander((String)row.get("gender"));
						obj.setMasterId((String)row.get("id"));
						obj.setTeststatus((Integer)row.get("test_status"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						//obj.setDocname((String)row.get("docname"));
						obj.setDocname((String)row.get("refdocname"));
						obj.setPathlogistName((String)row.get("pathologistName"));
						obj.setBarCode((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setProfileId((Integer)row.get("profile_Id"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setDepartmentId((Integer)row.get("department_id"));
						obj.setSamplename((String)row.get("sample_name"));
						obj.setContainername((String)row.get("conatiner_name"));
						//obj.setCollecteddatetime((Date)row.get("collected_date"));
						obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
						obj.setInOutHouse((Integer)row.get("in_out_house"));
						obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
						obj.setHeadingname((String)row.get("headingname"));
						obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
						obj.setCenterName((String)row.get("centerName"));
					
						labPatRecordlist.add(obj);
					}
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return labPatRecordlist;
	}

	@Override
	public String getSamplesCountByCollectedAt(String callFrom, String tabId, String emergencyFlag,
			Integer collectedAtId, String txtFdate, String txtTdate, HttpServletRequest request) {

		Integer count = 0;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = txtFdate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
			String[] tDate = txtTdate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";
			
			String queryAppend = "";
			if(collectedAtId == 0) {
					
			}else {
				queryAppend += " AND et.ref_doc_id ="+collectedAtId;
			}
			
			if(callFrom.equalsIgnoreCase("phlebotomy") || callFrom.equalsIgnoreCase("appointment")) {
				if(callFrom.equalsIgnoreCase("phlebotomy")) {
					if(tabId.equalsIgnoreCase("open")) {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.test_status=1 AND ps.business_type = '2' AND eb.cancle = 'N' AND ps.deleted = 'N' "+queryAppend+" AND ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}else {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=1 AND ps.business_type = '2' and eb.cancle = 'N' and ps.deleted = 'N' AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}
					}else {
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.test_status > 1 AND ps.test_status <= 6 AND ps.business_type='2' and eb.cancle = 'N' and ps.deleted = 'N' "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}else {
							sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status > 1 AND ps.test_status <= 6 AND ps.business_type='2' and eb.cancle = 'N' and ps.deleted = 'N' AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
						}
					}
				}else {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.test_status=0 AND ps.business_type = '2' AND eb.cancle = 'N' AND ps.deleted = 'N' "+queryAppend+" AND ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id   JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id  JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN ehat_unit_master em ON em.unit_id = ps.unit_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=0 AND ps.business_type = '2' and eb.cancle = 'N' and ps.deleted = 'N' AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}

				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
					
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")){
					query.setString(0, "N");
					query.setString(1, "Y");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				count = (Integer) query.list().size();
				return count.toString();
			}else {
				if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("AL")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status!=8 and eb.cancle = 'N' and ps.deleted = 'N' and ps.unit_Id="+unitId+" and ps.in_out_house=0 "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("accessionPending")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=2 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=2 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("collectionPending")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=1 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=1 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("accessionDone")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=3 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("accession") && tabId.equalsIgnoreCase("rejectedSample")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.deleted = 'N' AND ps.test_status=4 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=4 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("processing") && tabId.equalsIgnoreCase("AL")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=3 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN ehat_subservice  e ON e.id=es.idheadings LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=3 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("authorization")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=5 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC ";
					}
				}else if(callFrom.equalsIgnoreCase("outsource") && tabId.equalsIgnoreCase("outsource")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 AND ps.in_out_house=1 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("reporting")) {
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status=6 and  ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("BTOCRecollection") && tabId.equalsIgnoreCase("ALBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status = '9' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status = '9' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("BTOCRecollection") && tabId.equalsIgnoreCase("rejectedSampleBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}else if(callFrom.equalsIgnoreCase("BTOCRecollection") && tabId.equalsIgnoreCase("pathoRecollectionBToC")){
					if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))) {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}else {
						sql="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = ps.reg_ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status='4' and ps.business_type='2' and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}
				
				if(!(sql.trim().isEmpty())) {
					SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
					if(emergencyFlag.equalsIgnoreCase("Y")) {
						query.setString(0, "Y");
						query.setString(1, "Y");
					}else if(emergencyFlag.equalsIgnoreCase("All")){
						query.setString(0, "N");
						query.setString(1, "Y");
					}else {
						query.setString(0, "N");
						query.setString(1, "N");
					}
				
					count = (Integer) query.list().size();
					return count.toString();
				}
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return count.toString();
	}
	
	@Override
	public String getDynamicTabCount(String custTypeId, String custNameId, String fromDate, String toDate, String callFrom, String searchBy,
			String emergencyFlag, HttpServletRequest request) {
		
		Integer count = 0;
		Session session = null;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			session = sessionfactory.getCurrentSession();
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			
			if(callFrom.equalsIgnoreCase("phelbotomySearchBtn")) {
		
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_dtc_phelbotomy_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				return resultCount.get(0).getRecord_count_str();
				
			}else if(callFrom.equalsIgnoreCase("authorizationSearchBtn")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_dtc_authorization_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				return resultCount.get(0).getRecord_count_str();
				
			} else if(callFrom.equalsIgnoreCase("reportingSearchBtn")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_dtc_reporting_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				return resultCount.get(0).getRecord_count_str();
				
			}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_dtc_accession_test_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				return resultCount.get(0).getRecord_count_str();
				
			}else if(callFrom.equalsIgnoreCase("processingSearchBtn")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_dtc_processing_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				return resultCount.get(0).getRecord_count_str();
				
			}else if(callFrom.equalsIgnoreCase("BTOCRecollection")){
				String sql1 = "";
				String sql2 = "";
				String sql3 = "";
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					if(searchBy.equalsIgnoreCase("byDate")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else if(searchBy.equalsIgnoreCase("byAll")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else if(searchBy.equalsIgnoreCase("byType")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else if(searchBy.equalsIgnoreCase("byTypeName")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}else{
					if(searchBy.equalsIgnoreCase("byDate")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
						//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
					}else if(searchBy.equalsIgnoreCase("byAll")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}else if(searchBy.equalsIgnoreCase("byType")) {
						//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
					}else if(searchBy.equalsIgnoreCase("byTypeName")) {
						sql1="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
						sql2="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
						sql3="SELECT ep.patient_id AS patient_id FROM pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where   pss.test_flag = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
					}
				}		
			
				SQLQuery query1 = session.createSQLQuery(sql1);
			
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query1.setString(0, "Y");
					query1.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query1.setString(0, "Y");
					query1.setString(1, "N");
				}else {
					query1.setString(0, "N");
					query1.setString(1, "N");
				}
			
				Integer allCount = (Integer) query1.list().size();
			
				SQLQuery query2 = session.createSQLQuery(sql2);
			
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query2.setString(0, "Y");
					query2.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query2.setString(0, "Y");
					query2.setString(1, "N");
				}else {
					query2.setString(0, "N");
					query2.setString(1, "N");
				}
				
				Integer rejectedCount = (Integer) query2.list().size();
				
				SQLQuery query3 = session.createSQLQuery(sql3);
		
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query3.setString(0, "Y");
					query3.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query3.setString(0, "Y");
					query3.setString(1, "N");
				}else {
					query3.setString(0, "N");
					query3.setString(1, "N");
				}
	
				Integer pathoRecollectionCount = (Integer) query3.list().size();
			
				return allCount.toString()+","+rejectedCount.toString()+","+pathoRecollectionCount.toString();
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			log.error("searchLabTestPatient()...Error"+e);
		}
		return count.toString();
	}

	@Override
	public String sendEmailByLifenityDomain(String emailId, String mailSubject, String mailBody, String filePath,
			String fileName, String createdBy) throws MalformedURLException, IOException {
		
		//Code to make a webservice HTTP request
		String responseString = "";
		String outputString = "";
		//String wsURL = "http://www.deeptraining.com/webservices/weather.asmx";
		String wsURL = "http://betadiagnostics.lifenitycare.com/WEBSERVICE/LifenityLab.asmx";
		URL url = new URL(wsURL);
		URLConnection connection = url.openConnection();
		HttpURLConnection httpConn = (HttpURLConnection)connection;
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		//System.out.println(httpConn.getResponseCode());
		
		String xmlInput =
			" <soap:Envelope xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:soap=\"http://schemas.xmlsoap.org/soap/envelope/\">\n" +
			//" <soapenv:Header/>\n" +
			" <soap:Body>\n" +
			" <SendEmailWithPDF xmlns=\"http://tempuri.org/\">\n" +
			" <!--Optional:-->\n" +
			" <EmailId>"+emailId+"</EmailId>\n" +
			" <MailSubject>"+mailSubject+"</MailSubject>\n" +
			" <MailBody>"+mailBody+"</MailBody>\n" +
			" <FilePath>"+filePath+"</FilePath>\n" +
			" <FileName>"+fileName+"</FileName>\n" +
			" <CreatedBy>"+createdBy+"</CreatedBy>\n" +
			" </SendEmailWithPDF>\n" +
			" </soap:Body>\n" +
			" </soap:Envelope>";
	 
		byte[] buffer = new byte[xmlInput.length()];
			buffer = xmlInput.getBytes();
			bout.write(buffer);
		byte[] b = bout.toByteArray();
		//String SOAPAction = "http://litwinconsulting.com/webservices/GetWeather";
		//String SOAPAction = "http://betadiagnostics.lifenitycare.com/WEBSERVICE/LifenityLab.asmx";
		//String SOAPAction = "http://betadiagnostics.lifenitycare.com/WEBSERVICE/LifenityLab.asmx?op=SendEmailWithPDF";
		String SOAPAction = "http://tempuri.org/SendEmailWithPDF";
		
		// Set the appropriate HTTP parameters.
		httpConn.setRequestProperty("Content-Length",
			String.valueOf(b.length));
		httpConn.setRequestProperty("Host", "betadiagnostics.lifenitycare.com");
		httpConn.setRequestProperty("Content-Type", "text/xml; charset=utf-8");
		httpConn.setRequestProperty("SOAPAction", SOAPAction);
		httpConn.setRequestMethod("GET");
		httpConn.setDoOutput(true);
		httpConn.setDoInput(true);
		OutputStream out = httpConn.getOutputStream();
		//Write the content of the request to the outputstream of the HTTP Connection.
		out.write(b);
		out.close();
		//Ready with sending the request.
	 
		//Read the response.
		InputStreamReader isr =
				new InputStreamReader(httpConn.getInputStream());
		BufferedReader in = new BufferedReader(isr);
		
		//Write the SOAP message response to a String.
		while ((responseString = in.readLine()) != null) {
			outputString = outputString + responseString;
		}
		String[] data = outputString.split("}");
		outputString = data[1];
		//Parse the String output to a org.w3c.dom.Document and be able to reach every node with the org.w3c.dom API.
		Document document = parseXmlFile(outputString);
		NodeList nodeLst = document.getElementsByTagName("SendEmailWithPDF");
		String weatherResult = "";//nodeLst.item(0).getTextContent();
		
		//Write the SOAP message formatted to the console.
		String formattedSOAPResponse = formatXML(outputString);
		return weatherResult;
	}
	
	//format the XML in your String
	public String formatXML(String unformattedXml) {
		try {
			Document document = parseXmlFile(unformattedXml);
			OutputFormat format = new OutputFormat(document);
				format.setIndenting(true);
				format.setIndent(3);
				format.setOmitXMLDeclaration(true);
			Writer out = new StringWriter();
			XMLSerializer serializer = new XMLSerializer(out, format);
				serializer.serialize(document);
			return out.toString();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
		 
	private Document parseXmlFile(String in) {
		try {
			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			InputSource is = new InputSource(new StringReader(in));
			return db.parse(is);
		} catch (ParserConfigurationException e) {
			throw new RuntimeException(e);
		} catch (SAXException e) {
			throw new RuntimeException(e);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	@Override
	public List<PathologySampleWiseMaster> reportingPatientAutoSuggestion(String searchText, String searchBy,
			String callFrom, String tabId, String emergencyFlag, String emailStatus, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			String userCustomerType = (String) httpSession.getAttribute("userCustomerType");
			String userCustomerId = (String) httpSession.getAttribute("userCustomerId");
			Query querySp = null;
			
			/*StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}*/
			
			searchText = (searchText.trim()).replaceAll("\\s", "%");
			
			if(tabId.equalsIgnoreCase("allTabLi") || tabId.equalsIgnoreCase("patientPrintTabLi") ) {
				
				//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rpas_all_tabLi(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_reporting_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("searchText", searchText);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
				
			}else if(tabId.equalsIgnoreCase("patientWiseTabLi")) {
				
				//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rpas_patient_wise_tabLi(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_ppas_reporting_autosugg(:unitId, :departmentId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("searchText", searchText);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
				
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				
				querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rpas_normal_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :searchText, :custNameId, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("searchText", searchText);
				querySp.setParameter("custNameId", userCustomerId);
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				labPatRecordlist = querySp.list();
			}
		}catch (Exception e) {
			e.printStackTrace();
			log.error("reportingPatientAutoSuggestion()...Error :"+e);
		}
		return labPatRecordlist;
	}	
	
	@Override
	public List<PathologySampleWiseMaster> getReportingPatientById(Integer patientId, String callFrom, String tabId, String emergencyFlag, HttpServletRequest request) {
		String sql="";
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();

		try{
			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			String userCustomerType = (String) httpSession.getAttribute("userCustomerType");
			String userCustomerId = (String) httpSession.getAttribute("userCustomerId");

			if(tabId.equalsIgnoreCase("allTabLi")) {
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
				
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
			
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));
					obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
					obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPathologistId((Integer)row.get("pathologist_id"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setPathlogistName((String)row.get("pathologistName"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
					obj.setCenterPatientId((String)row.get("center_patient_id"));
					// added by ROHIT AMBAWADE on 24 NOV 2021
					obj.setPrintCount((Integer)row.get("printCount"));

					labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}else if(tabId.equalsIgnoreCase("patientWiseTabLi")) {
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id, GROUP_CONCAT(DISTINCT ifnull(pl.sample_name, '-') SEPARATOR ',') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) group by et.treatment_id ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id, GROUP_CONCAT(DISTINCT ifnull(pl.sample_name, '-') SEPARATOR ',') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) group by et.treatment_id ORDER BY et.treatment_id DESC";
				}
				
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
			
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));
					obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
					obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPathologistId((Integer)row.get("pathologist_id"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setPathlogistName((String)row.get("pathologistName"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
					obj.setCenterPatientId((String)row.get("center_patient_id"));
					// added by ROHIT AMBAWADE on 24 NOV 2021
					obj.setPrintCount((Integer)row.get("printCount"));

					labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				//Map<String , String> routineValueMap=new HashMap<String,String>();
				LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

				String newSetString="";
				String sql1 = "";
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql1 = "select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status=6 and sm.deleted='N' AND sm.unit_Id="+unitId+" and ep.patient_id ="+patientId+" AND et.emergency_flag IN (?,?)";
				}else{
					sql1 = "select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status=6 and sm.deleted='N' and sm.customer_id IN ("+userCustomerId+") AND sm.unit_Id="+unitId+" and ep.patient_id ="+patientId+" AND et.emergency_flag IN (?,?)";
				}
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql1);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listsubservice3 = query.list();
				for(Map<String, Object> rs2 : listsubservice3) {
					Integer masterId =0;
					String testResultt = "";

					testResultt=(String) rs2.get("flag_mark");
					masterId=((Number) rs2.get("master_id")).intValue();
						 				 
					if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
						testResultt="-";
					} if(masterId == null){
						masterId=0;
					}
						
					if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
						cAbnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
						abnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
						normalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("H")) {// for High Value Check
						abnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
						cAbnormalSet.add(masterId);
					}
					if(!testResultt.equalsIgnoreCase("CL")
							&& !testResultt.equalsIgnoreCase("NE")
							&& !testResultt.equalsIgnoreCase("L")
							&& !testResultt.equalsIgnoreCase("N")
							&& !testResultt.equalsIgnoreCase("H")
							&& !testResultt.equalsIgnoreCase("CH")
							&& !testResultt.equalsIgnoreCase("Positive")
							&& !testResultt.equalsIgnoreCase("Detected")
							&& !testResultt.equalsIgnoreCase("Negative")
							&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text Value Check
							normalSet.add(masterId);
					}
				}
				abnormalSet.removeAll(cAbnormalSet);							
				normalSet.removeAll(cAbnormalSet);
				normalSet.removeAll(abnormalSet);
			
				if(tabId.equalsIgnoreCase("normalTabLi")){
					newSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}else if(tabId.equalsIgnoreCase("abnormalTabLi")){
					newSetString = abnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}else if(tabId.equalsIgnoreCase("cAbnormalTabLi")){
					newSetString = cAbnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}
				
				if(!(newSetString.trim()).isEmpty()) {
					String sql11="SELECT ps.authorized_date as authorized_date, ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.test_status=6 and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql11);
						query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query1.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
							obj.setProfileId((Integer)row.get("profile_Id"));
							obj.setEmergencyflag((String)row.get("emergencyflag"));
							obj.setPatientage((Integer)row.get("age"));
							obj.setPathologistId((Integer)row.get("pathologist_id"));
							obj.setPatientgander((String)row.get("gender"));
							obj.setMasterId((String)row.get("id"));
							obj.setTeststatus((Integer)row.get("test_status"));
							obj.setDatetime((String)row.get("datetime"));
							obj.setPatientname((String)row.get("patient_name"));
							obj.setPatientId((Integer)row.get("patient_id"));
							//obj.setDocname((String)row.get("docname"));
							obj.setDocname((String)row.get("refdocname"));
							obj.setPathlogistName((String)row.get("pathologistName"));
							obj.setBarCode((String)row.get("barCode"));
							obj.setProfileName((String)row.get("testname"));
							obj.setTreatmentId((Integer)row.get("treatment_id"));
							obj.setDepartmentId((Integer)row.get("department_id"));
							obj.setSamplename((String)row.get("sample_name"));
							obj.setContainername((String)row.get("conatiner_name"));
							//obj.setCollecteddatetime((Date)row.get("collected_date"));
							obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
							obj.setInOutHouse((Integer)row.get("in_out_house"));
							obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
							obj.setHeadingname((String)row.get("headingname"));
							obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
							obj.setCenterName((String)row.get("centerName"));
							obj.setEmailStatus((String)row.get("email_status"));
							obj.setEmailId((String)row.get("email_id"));
							obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
							obj.setCenterPatientId((String)row.get("center_patient_id"));
							
							// added by ROHIT AMBAWADE on 24 NOV 2021
							obj.setPrintCount((Integer)row.get("printCount"));
							
							labPatRecordlist.add(obj);
					}
				}
				return labPatRecordlist;
			}else if(tabId.equalsIgnoreCase("patientPrintTabLi")) {
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) group by  ps.treatment_id, ps.id  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount,ep.center_patient_id as center_patient_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" and ep.patient_id="+patientId+" AND et.emergency_flag IN (?,?) group by  ps.treatment_id, ps.id  ORDER BY ps.treatment_id,ps.id DESC";
				}
				
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
			
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));
					obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
					obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPathologistId((Integer)row.get("pathologist_id"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setPathlogistName((String)row.get("pathologistName"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
					obj.setCenterPatientId((String)row.get("center_patient_id"));
					// added by ROHIT AMBAWADE on 24 NOV 2021
					obj.setPrintCount((Integer)row.get("printCount"));

					labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}
		}catch(Exception e){
			e.printStackTrace();
			log.error("getReportingPatientById()...Error :"+e);
		}
		return labPatRecordlist;
	}

	@SuppressWarnings("unchecked")
	//@Override
	//updated and created new one for pagination by Rohini.
	public List<PathologySampleWiseMaster> searchReportingPatient111(String custTypeId, String custNameId, String fromDate,
			String toDate, String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag,
			String emailStatus, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			
			/*String emailStatusChkUpdated = "";
			
			if(emailStatus.equalsIgnoreCase("Y")) {
				emailStatusChkUpdated = " AND ps.email_status IN ('Success')";
			}else {
				emailStatusChkUpdated = " AND ps.email_status IN ('N', 'Fail')";
			}*/
			
			if(tabId.equalsIgnoreCase("allTabLi")  || tabId.equalsIgnoreCase("patientWiseTabLi")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_all_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
				
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_normal_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
				
			}else if(tabId.equalsIgnoreCase("templateTestTabLi")){
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_template_test_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
			}else if(tabId.equalsIgnoreCase("patientPrintTabLi") ) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_patient_print(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
				
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return labPatRecordlist;
	}

	@Override
	public String getReportingRecordCount(String custTypeId, String custNameId, String fromDate, String toDate,
			String callFrom, String searchBy, String tabId, String emergencyFlag, String emailStatus, HttpServletRequest request) {
		
		Integer recordCount = 0;
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			
			if(tabId.equalsIgnoreCase("allTabLi")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rrc_all_tabli(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));				
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				recordCount = resultCount.get(0).getRrc_all_record_count().intValue();
				
			}else if(tabId.equalsIgnoreCase("patientWiseTabLi")){
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rrc_normal_tabli(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));				
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				recordCount = resultCount.get(0).getRrc_all_record_count().intValue();
				
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_rrc_patient_wise_tabli(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(LisTabCountDto.class));				
				@SuppressWarnings("unchecked")
				List<LisTabCountDto> resultCount = querySp.list();				
				recordCount = resultCount.get(0).getRrc_all_record_count().intValue();	
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return recordCount.toString();
	}

	@Override
	public List<PathologySampleWiseMaster> getReportingSamplesByCollectedAt(String callFrom, String tabId,
			Integer startIndex, String emergencyFlag, Integer collectedAtId, String txtFdate, String txtTdate,
			String emailStatus, HttpServletRequest request) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = txtFdate.split("/");
			fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
						
			String[] tDate = txtTdate.split("/");
			td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
					
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";
					
			String queryAppend = "";
			if(collectedAtId == 0) {				
			
			}else {
				queryAppend += " AND et.ref_doc_id ="+collectedAtId;
			}
			
			if(tabId.equalsIgnoreCase("allTabLi")) {
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
			
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);

				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
			
				query.setFirstResult(startIndex);
				query.setMaxResults(10);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setEmailId((String)row.get("email_id"));
						obj.setProfileId((Integer)row.get("profile_Id"));
						obj.setB2BRejectedFrom((Integer)row.get("rejectedFrom"));
						obj.setPhleboteststatus((String)row.get("PhleboTestStatus"));
						obj.setEmergencyflag((String)row.get("emergencyflag"));
						obj.setPatientage((Integer)row.get("age"));
						obj.setPathologistId((Integer)row.get("pathologist_id"));
						obj.setPatientgander((String)row.get("gender"));
						obj.setMasterId((String)row.get("id"));
						obj.setTeststatus((Integer)row.get("test_status"));
						obj.setDatetime((String)row.get("datetime"));
						obj.setPatientname((String)row.get("patient_name"));
						obj.setPatientId((Integer)row.get("patient_id"));
						//obj.setDocname((String)row.get("docname"));
						obj.setDocname((String)row.get("refdocname"));
						obj.setPathlogistName((String)row.get("pathologistName"));
						obj.setBarCode((String)row.get("barCode"));
						obj.setProfileName((String)row.get("testname"));
						obj.setTreatmentId((Integer)row.get("treatment_id"));
						obj.setDepartmentId((Integer)row.get("department_id"));
						obj.setSamplename((String)row.get("sample_name"));
						obj.setContainername((String)row.get("conatiner_name"));
						//obj.setCollecteddatetime((Date)row.get("collected_date"));
				
						obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
						obj.setInOutHouse((Integer)row.get("in_out_house"));
						obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
						obj.setHeadingname((String)row.get("headingname"));
						obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
						obj.setCenterName((String)row.get("centerName"));
						obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
						
						labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

				String emailStatusChk = "";
				if(emailStatus.equalsIgnoreCase("Y")) {
					emailStatusChk = " AND sm.email_status IN ('Success')";
				}else {
					emailStatusChk = " AND sm.email_status IN ('N', 'Fail')";
				}
				
				String newSetString="";
				String sql1 = "";
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql1 = "select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status=6 and sm.deleted='N' AND sm.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' "+emailStatusChk+" AND et.emergency_flag IN (?,?)";
				}else{
					sql1 = "select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status=6 and sm.deleted='N' AND sm.customer_id IN ("+userCustomerId+") "+queryAppend+" AND sm.unit_Id="+unitId+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' "+emailStatusChk+" AND et.emergency_flag IN (?,?)";
				}
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql1);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listsubservice3 = query.list();
				for(Map<String, Object> rs2 : listsubservice3) {
					Integer masterId =0;
					String testResultt="";

					testResultt=(String) rs2.get("flag_mark");
					masterId=((Number) rs2.get("master_id")).intValue();
						 				 
					if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
						testResultt="-";
					} if(masterId == null){
						masterId=0;
					}
						
					if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
						cAbnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
						abnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
						normalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("H")) {// for High Value Check
						abnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
						cAbnormalSet.add(masterId);
					}
					if(!testResultt.equalsIgnoreCase("CL")
							&& !testResultt.equalsIgnoreCase("NE")
							&& !testResultt.equalsIgnoreCase("L")
							&& !testResultt.equalsIgnoreCase("N")
							&& !testResultt.equalsIgnoreCase("H")
							&& !testResultt.equalsIgnoreCase("CH")
							&& !testResultt.equalsIgnoreCase("Positive")
							&& !testResultt.equalsIgnoreCase("Detected")
							&& !testResultt.equalsIgnoreCase("Negative")
							&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text Value Check
							normalSet.add(masterId);
					}
				}
				abnormalSet.removeAll(cAbnormalSet);							
				normalSet.removeAll(cAbnormalSet);
				normalSet.removeAll(abnormalSet);
			
				if(tabId.equalsIgnoreCase("normalTabLi")){
					newSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}else if(tabId.equalsIgnoreCase("abnormalTabLi")){
					newSetString = abnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}else if(tabId.equalsIgnoreCase("cAbnormalTabLi")){
					newSetString = cAbnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}
				
				if(!(newSetString.trim()).isEmpty()) {
					String sql11="SELECT ps.authorized_date as authorized_date, ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.test_status=6 and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
				
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql11);
						query1.setFirstResult(startIndex);
						query1.setMaxResults(10);
						query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query1.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
							obj.setProfileId((Integer)row.get("profile_Id"));
							obj.setEmergencyflag((String)row.get("emergencyflag"));
							obj.setPatientage((Integer)row.get("age"));
							obj.setPathologistId((Integer)row.get("pathologist_id"));
							obj.setPatientgander((String)row.get("gender"));
							obj.setMasterId((String)row.get("id"));
							obj.setTeststatus((Integer)row.get("test_status"));
							obj.setDatetime((String)row.get("datetime"));
							obj.setPatientname((String)row.get("patient_name"));
							obj.setPatientId((Integer)row.get("patient_id"));
							//obj.setDocname((String)row.get("docname"));
							obj.setDocname((String)row.get("refdocname"));
							obj.setPathlogistName((String)row.get("pathologistName"));
							obj.setBarCode((String)row.get("barCode"));
							obj.setProfileName((String)row.get("testname"));
							obj.setTreatmentId((Integer)row.get("treatment_id"));
							obj.setDepartmentId((Integer)row.get("department_id"));
							obj.setSamplename((String)row.get("sample_name"));
							obj.setContainername((String)row.get("conatiner_name"));
							//obj.setCollecteddatetime((Date)row.get("collected_date"));
							obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
							obj.setInOutHouse((Integer)row.get("in_out_house"));
							obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
							obj.setHeadingname((String)row.get("headingname"));
							obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
							obj.setCenterName((String)row.get("centerName"));
							obj.setEmailStatus((String)row.get("email_status"));
							obj.setEmailId((String)row.get("email_id"));
							obj.setAuthorizeddatetime((Date) row.get("authorized_date"));
			  		
							labPatRecordlist.add(obj);
					}
				}
				return labPatRecordlist;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return labPatRecordlist;
	}

	@Override
	public String getReportingSamplesCountByCollectedAt(String callFrom, String tabId, String emergencyFlag,
			Integer collectedAtId, String txtFdate, String txtTdate, String emailStatus, HttpServletRequest request) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			String[] fDate = txtFdate.split("/");
			fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
						
			String[] tDate = txtTdate.split("/");
			td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
					
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String sql="";
					
			String queryAppend = "";
			if(collectedAtId == 0) {				
			
			}else {
				queryAppend += " AND et.ref_doc_id ="+collectedAtId;
			}
			
			if(tabId.equalsIgnoreCase("allTabLi")) {
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}else{
					sql="SELECT ps.authorized_date as authorized_date, ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN ehat_bill_details eb ON eb.bill_details_id = ps.bil_det_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where eb.deleted = 'N' AND ps.deleted = 'N' AND ps.test_status=6 and ps.in_out_house=0 and ps.unit_Id="+unitId+" AND ps.customer_id IN ("+userCustomerId+") "+queryAppend+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count  ORDER BY et.treatment_id DESC";
				}
			
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);

				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
			
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setPatientId((Integer)row.get("patient_id"));
					
					labPatRecordlist.add(obj);
				}
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
				LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

				String emailStatusChk = "";
				if(emailStatus.equalsIgnoreCase("Y")) {
					emailStatusChk = " AND sm.email_status IN ('Success')";
				}else {
					emailStatusChk = " AND sm.email_status IN ('N', 'Fail')";
				}
				
				String newSetString="";
				String sql1 = "";
				if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
					sql1 = "select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status=6 and sm.deleted='N' AND sm.unit_Id="+unitId+" "+queryAppend+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' "+emailStatusChk+" AND et.emergency_flag IN (?,?)";
				}else{
					sql1 = "select ssm.id as master_id,ifnull(ss.flag_mark,'-')as flag_mark from pathology_sample_wise_master sm join pathology_sample_wise_slave ss on (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON(ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) JOIN ehat_bill_details eb ON (eb.bill_details_id = sm.bil_det_id) where eb.deleted = 'N' AND ss.test_flag='N' and sm.test_status=6 and sm.deleted='N' AND sm.customer_id IN ("+userCustomerId+") "+queryAppend+" AND sm.unit_Id="+unitId+" and SUBSTR(sm.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(sm.created_date_time, 1, 10) <='"+td+"' "+emailStatusChk+" AND et.emergency_flag IN (?,?)";
				}
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql1);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listsubservice3 = query.list();
				for(Map<String, Object> rs2 : listsubservice3) {
					Integer masterId =0;
					String testResultt="";

					testResultt=(String) rs2.get("flag_mark");
					masterId=((Number) rs2.get("master_id")).intValue();
						 				 
					if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
						testResultt="-";
					} if(masterId == null){
						masterId=0;
					}
						
					if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
						cAbnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
						abnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
						normalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("H")) {// for High Value Check
						abnormalSet.add(masterId);
					}
					if(testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
						cAbnormalSet.add(masterId);
					}
					if(!testResultt.equalsIgnoreCase("CL")
							&& !testResultt.equalsIgnoreCase("NE")
							&& !testResultt.equalsIgnoreCase("L")
							&& !testResultt.equalsIgnoreCase("N")
							&& !testResultt.equalsIgnoreCase("H")
							&& !testResultt.equalsIgnoreCase("CH")
							&& !testResultt.equalsIgnoreCase("Positive")
							&& !testResultt.equalsIgnoreCase("Detected")
							&& !testResultt.equalsIgnoreCase("Negative")
							&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text Value Check
							normalSet.add(masterId);
					}
				}
				abnormalSet.removeAll(cAbnormalSet);							
				normalSet.removeAll(cAbnormalSet);
				normalSet.removeAll(abnormalSet);
			
				if(tabId.equalsIgnoreCase("normalTabLi")){
					newSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}else if(tabId.equalsIgnoreCase("abnormalTabLi")){
					newSetString = abnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}else if(tabId.equalsIgnoreCase("cAbnormalTabLi")){
					newSetString = cAbnormalSet.toString().replaceAll("(^\\[|\\]$)", "");
				}
				
				if(!(newSetString.trim()).isEmpty()) {
					String sql11="SELECT ps.authorized_date as authorized_date, ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ps.pathologist_id,ep.age,ep.gender AS gender, ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,IFNULL( dc.doc_name, '-') AS pathologistName, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.sample_type_Id AS sampleTypeId, ps.email_status AS email_status, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.test_status=6 and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
					
					SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql11);
					query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> list=query1.list();
					for(Map<String, Object> row : list){
						PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
						obj.setPatientId((Integer)row.get("patient_id"));
				  		
						labPatRecordlist.add(obj);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		Integer count =  labPatRecordlist.size();
		return count.toString();
	}

	@Override
	public List<PathologySampleWiseMaster> getAllPostedNoramlRecords(String todaysDate) {
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			LinkedHashSet<Integer> cAbnormalSet = new LinkedHashSet<Integer>();
			LinkedHashSet<Integer> abnormalSet = new LinkedHashSet<Integer>();
			LinkedHashSet<Integer> normalSet = new LinkedHashSet<Integer>();

			String newSetString = "";
			String sql1 = "SELECT ssm.id AS master_id, IFNULL(ss.flag_mark, '-') AS flag_mark FROM pathology_sample_wise_master sm JOIN pathology_sample_wise_slave ss ON (sm.id = ss.master_id) JOIN pathology_sample_wise_super_master ssm ON (ssm.id = sm.master_id) JOIN ehat_patient ep ON (ep.patient_id = sm.patient_id) JOIN ehat_treatment et ON (et.treatment_id = sm.treatment_id) WHERE ss.test_flag = 'N' AND sm.test_status = 6 AND sm.deleted = 'N' AND sm.unit_Id = 2 AND SUBSTR(sm.post_date, 1, 10) >= '"+todaysDate+"' AND SUBSTR(sm.post_date, 1, 10) <= '"+todaysDate+"' AND sm.email_status IN ('N', 'Fail')";
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql1);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> listsubservice3 = query.list();

			for(Map<String, Object> rs2 : listsubservice3) {
				Integer masterId =0;
				String testResultt="";

				testResultt=(String) rs2.get("flag_mark");
				masterId=((Number) rs2.get("master_id")).intValue();
					 				 
				if(testResultt.equalsIgnoreCase(null) || testResultt.equalsIgnoreCase("null") || testResultt.equalsIgnoreCase("")){
					testResultt="-";
				} if(masterId == null){
					masterId=0;
				}
					
				if(testResultt.equalsIgnoreCase("CL") || testResultt.equalsIgnoreCase("NE")) {// for critical Low Value Check
					cAbnormalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("L") || testResultt.equalsIgnoreCase("Positive") || testResultt.equalsIgnoreCase("Detected")) {// for Low Value Check
					abnormalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("N") || testResultt.equalsIgnoreCase("Negative") || testResultt.equalsIgnoreCase("Non Detected")) {// for Normal Value Check
					normalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("H")) {// for High Value Check
					abnormalSet.add(masterId);
				}
				if(testResultt.equalsIgnoreCase("CH")) {// for critical High Value Check
					cAbnormalSet.add(masterId);
				}
				if(!testResultt.equalsIgnoreCase("CL")
						&& !testResultt.equalsIgnoreCase("NE")
						&& !testResultt.equalsIgnoreCase("L")
						&& !testResultt.equalsIgnoreCase("N")
						&& !testResultt.equalsIgnoreCase("H")
						&& !testResultt.equalsIgnoreCase("CH")
						&& !testResultt.equalsIgnoreCase("Positive")
						&& !testResultt.equalsIgnoreCase("Detected")
						&& !testResultt.equalsIgnoreCase("Negative")
						&& !testResultt.equalsIgnoreCase("Non Detected")) {// for text Value Check
						normalSet.add(masterId);
				}
			}
			abnormalSet.removeAll(cAbnormalSet);							
			normalSet.removeAll(cAbnormalSet);
			normalSet.removeAll(abnormalSet);
		
			newSetString = normalSet.toString().replaceAll("(^\\[|\\]$)", "");
			
			if(!(newSetString.trim()).isEmpty()) {
				String sql11="SELECT ep.mobile as mobile, ep.gender AS gender, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name, ep.patient_id AS patient_id, et.treatment_id AS treatment_id, ep.email_id AS email_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id  LEFT JOIN doctor dc ON dc.Doctor_ID = ps.pathologist_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id JOIN pathology_sample_wise_super_master ssm ON(ssm.id = ps.master_id) where ps.test_status=6 and ps.in_out_house=0 AND ssm.id in("+newSetString+") group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count ORDER BY et.treatment_id DESC ";
			
				SQLQuery query1 = sessionfactory.getCurrentSession().createSQLQuery(sql11);
				query1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query1.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setEmailId((String)row.get("email_id"));
					obj.setPatientmobile((String)row.get("mobile"));
						
					labPatRecordlist.add(obj);
				}
			}
			return labPatRecordlist;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return labPatRecordlist;
	}

	@Override
	public HospitalDetails getHospitalInfo() {
		Session session = null;
		HospitalDetails dto = new HospitalDetails();
		try {
			session = sessionfactory.getCurrentSession();
			Query qry = session.createSQLQuery("SELECT hospitalName, hospitalCity, hospitalCountry, hospitalZip, hospitalEmail, hospitalAddress, hospitalContact, uploadImagePath, PanNo, website, txtGstNo FROM hospital");
			qry.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list = qry.list();
			for(Map<String, Object> row : list){
				dto.setHospitalName((String) row.get("hospitalName"));
				dto.setHospitalCity((String) row.get("hospitalCity"));
				dto.setHospitalZip((String) row.get("hospitalZip"));
				dto.setHospitalEmail((String) row.get("hospitalEmail"));
				dto.setHospitalAddress((String) row.get("hospitalAddress"));
				dto.setHospitalContact((String) row.get("hospitalContact"));
				dto.setUploadImagePath((String) row.get("uploadImagePath"));
				dto.setPanNo((String) row.get("PanNo"));
				dto.setWebsite((String) row.get("website"));
				dto.setTxtGstNo((String) row.get("txtGstNo"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dto;
	}

	@Override
	public boolean acceptInPhlebotomy(String idList, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");//This is unit id
			Integer userId = (Integer) session.getAttribute("userId1");//This is User Id
			
			String[] masterId = idList.split("-");
			
			for(String ids : masterId) {
				String sqlRef="select ifnull(max(sample_count),0) from pathology_sample_wise_master where deleted ='N' and unit_Id="+unitId+" and test_status=1";
				Query query12= sessionfactory.getCurrentSession().createSQLQuery(sqlRef);        	 
				Integer result = ((Number)query12.uniqueResult()).intValue();
					
				result++;
						
				List<String> myList = new ArrayList<String>(Arrays.asList(ids.split(",")));
				ArrayList<Integer> numbers = new ArrayList<Integer>();		
			
				for(int i = 0; i < myList.size(); i++) {
				   numbers.add(Integer.parseInt(myList.get(i)));   
				}
			
				Integer uId = (Integer) session.getAttribute("uId");	    
				String sql1 = "UPDATE PathologySampleWiseMaster set sampleCount =:sampleCount, teststatus =:teststatus, createDate =:createDate, updatedDate =:updatedDate where sampleWiseMasterId IN (:sampleWiseMasterId)" ;
				Query query = sessionfactory.getCurrentSession().createQuery(sql1);
					  query.setParameter("createDate", new Date(new java.util.Date().getTime()));
					  query.setParameter("updatedDate", new Date(new java.util.Date().getTime()));
					  query.setParameterList("sampleWiseMasterId", numbers);
					  query.setParameter("teststatus", 1);
					  query.setParameter("sampleCount", result);
			
				query.executeUpdate();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	// created and updated Rohini Ambhore for lis pagination on 20-09-2023
	@SuppressWarnings("unchecked")
	@Override
	public List<PathologySampleWiseMaster> searchLabTestPatient(String custTypeId, String custNameId, String fromDate, String toDate,
			String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			//Integer userCustomerType = (Integer) httpSession.getAttribute("userCustomerType");
			//Integer userCustomerId = (Integer) httpSession.getAttribute("userCustomerId");
			
			 int maxresult = 10;
			
			if(callFrom.equalsIgnoreCase("phelbotomySearchBtn") || callFrom.equalsIgnoreCase("appointmentSearchBtn")) {
				
             if(startIndex == 0) {
            	// startIndex =1;
             }
            
             
             if(callFrom.equalsIgnoreCase("phelbotomySearchBtn")) {
            	 
            	// Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_phelbotomy_search_btn(:unitId, :departmentId, :callFrom, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
            	Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_phelbotomy_search_btn_For_pagination(:unitId, :departmentId, :callFrom, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
            	querySp.setParameter("unitId", unitId);
 				querySp.setParameter("departmentId", null);
 				querySp.setParameter("callFrom", callFrom);
 				querySp.setParameter("tabId", tabId);
 				querySp.setParameter("userType", userType);
 				querySp.setParameter("searchBy", searchBy);
 				querySp.setParameter("custTypeId", custTypeId);
 				querySp.setParameter("custNameId", custNameId);
 				querySp.setParameter("fd", fd.toString());
 				querySp.setParameter("td", td.toString());
 				querySp.setParameter("p_emergency_flag", emergencyFlag);
 				querySp.setParameter("startIndex", startIndex);
 				querySp.setParameter("maxresult", maxresult);
 				
 				//querySp.setFirstResult(startIndex);		//querySp.setMaxResults(maxresult);
 				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
 				
 				return querySp.list();
 				
             }else {
            	 
            	 Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_phelbotomy_search_btn(:unitId, :departmentId, :callFrom, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
 				querySp.setParameter("unitId", unitId);
 				querySp.setParameter("departmentId", null);
 				querySp.setParameter("callFrom", callFrom);
 				querySp.setParameter("tabId", tabId);
 				querySp.setParameter("userType", userType);
 				querySp.setParameter("searchBy", searchBy);
 				querySp.setParameter("custTypeId", custTypeId);
 				querySp.setParameter("custNameId", custNameId);
 				querySp.setParameter("fd", fd.toString());
 				querySp.setParameter("td", td.toString());
 				querySp.setParameter("p_emergency_flag", emergencyFlag);
 				
 				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
 				
 				return querySp.list();            	 
             }
				
				
			}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn") || callFrom.equalsIgnoreCase("accessionTrackStatusSearchBtn") || callFrom.equalsIgnoreCase("processingSearchBtn")
					|| callFrom.equalsIgnoreCase("authorizationSearchBtn") || callFrom.equalsIgnoreCase("reportingSearchBtn") || callFrom.equalsIgnoreCase("outSourceSearchBtn")){
				
				Query querySp = null;
				
				if(callFrom.equalsIgnoreCase("authorizationSearchBtn")) {
					
					//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_authorization_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_authorization_search_btn_For_pagination(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
					
					querySp.setParameter("unitId", unitId);
					querySp.setParameter("departmentId", null);
					//querySp.setParameter("callFrom", callFrom);					
					querySp.setParameter("userType", userType);
					querySp.setParameter("searchBy", searchBy);
					querySp.setParameter("custTypeId", custTypeId);
					querySp.setParameter("custNameId", custNameId);
					querySp.setParameter("fd", fd.toString());
					querySp.setParameter("td", td.toString());
					querySp.setParameter("p_emergency_flag", emergencyFlag);
					querySp.setParameter("startIndex", startIndex);
					querySp.setParameter("maxresult", maxresult);
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
					return querySp.list();
					
				}else if(callFrom.equalsIgnoreCase("reportingSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_reporting_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("outSourceSearchBtn")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_out_source_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(callFrom.equalsIgnoreCase("accessionTestSearchBtn") && tabId.equalsIgnoreCase("AL")) {
					
					
					//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_test_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_test_search_btn_For_pagination(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
					
					querySp.setParameter("unitId", unitId);
					querySp.setParameter("departmentId", null);
					//querySp.setParameter("callFrom", callFrom);					
					querySp.setParameter("userType", userType);
					querySp.setParameter("searchBy", searchBy);
					querySp.setParameter("custTypeId", custTypeId);
					querySp.setParameter("custNameId", custNameId);
					querySp.setParameter("fd", fd.toString());
					querySp.setParameter("td", td.toString());
					querySp.setParameter("p_emergency_flag", emergencyFlag);
					querySp.setParameter("startIndex", startIndex);
					querySp.setParameter("maxresult", maxresult);
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
					return querySp.list();
					
				}else if(callFrom.equalsIgnoreCase("accessionTrackStatusSearchBtn")){
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_track_status_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					
				}else if(tabId.equalsIgnoreCase("accessionPending")) {
					
					//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_pending(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_pending_For_pagination(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
					
					querySp.setParameter("unitId", unitId);
					querySp.setParameter("departmentId", null);
					//querySp.setParameter("callFrom", callFrom);					
					querySp.setParameter("userType", userType);
					querySp.setParameter("searchBy", searchBy);
					querySp.setParameter("custTypeId", custTypeId);
					querySp.setParameter("custNameId", custNameId);
					querySp.setParameter("fd", fd.toString());
					querySp.setParameter("td", td.toString());
					querySp.setParameter("p_emergency_flag", emergencyFlag);
					querySp.setParameter("startIndex", startIndex);
					querySp.setParameter("maxresult", maxresult);
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
					return querySp.list();
					
				}else if(tabId.equalsIgnoreCase("collectionPending")) {
					
					//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_collection_pending(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_collection_pending_For_pagination(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
					
					querySp.setParameter("unitId", unitId);
					querySp.setParameter("departmentId", null);
					//querySp.setParameter("callFrom", callFrom);					
					querySp.setParameter("userType", userType);
					querySp.setParameter("searchBy", searchBy);
					querySp.setParameter("custTypeId", custTypeId);
					querySp.setParameter("custNameId", custNameId);
					querySp.setParameter("fd", fd.toString());
					querySp.setParameter("td", td.toString());
					querySp.setParameter("p_emergency_flag", emergencyFlag);
					querySp.setParameter("startIndex", startIndex);
					querySp.setParameter("maxresult", maxresult);
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
					return querySp.list();
					
				}else if(tabId.equalsIgnoreCase("accessionDone") || (callFrom.equalsIgnoreCase("processingSearchBtn") && tabId.equalsIgnoreCase("AL"))) {
					
					//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_done(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_accession_done_For_pagination(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
					
					querySp.setParameter("unitId", unitId);
					querySp.setParameter("departmentId", null);
					//querySp.setParameter("callFrom", callFrom);					
					querySp.setParameter("userType", userType);
					querySp.setParameter("searchBy", searchBy);
					querySp.setParameter("custTypeId", custTypeId);
					querySp.setParameter("custNameId", custNameId);
					querySp.setParameter("fd", fd.toString());
					querySp.setParameter("td", td.toString());
					querySp.setParameter("p_emergency_flag", emergencyFlag);
					querySp.setParameter("startIndex", startIndex);
					querySp.setParameter("maxresult", maxresult);
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
					return querySp.list();
					
				}else if(tabId.equalsIgnoreCase("rejectedSample")) {
					
					//querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_rejected_sample(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_rejected_sample_For_pagination(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag,:startIndex,:maxresult)");
					
					querySp.setParameter("unitId", unitId);
					querySp.setParameter("departmentId", null);
					//querySp.setParameter("callFrom", callFrom);					
					querySp.setParameter("userType", userType);
					querySp.setParameter("searchBy", searchBy);
					querySp.setParameter("custTypeId", custTypeId);
					querySp.setParameter("custNameId", custNameId);
					querySp.setParameter("fd", fd.toString());
					querySp.setParameter("td", td.toString());
					querySp.setParameter("p_emergency_flag", emergencyFlag);
					querySp.setParameter("startIndex", startIndex);
					querySp.setParameter("maxresult", maxresult);
					querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
					return querySp.list();
					
				}else if(callFrom.equalsIgnoreCase("processingSearchBtn") && tabId.equalsIgnoreCase("accessionpatho")) {
					
					querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_slp_authorization_search_btn(:unitId, :departmentId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag)");
				}
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				//querySp.setParameter("callFrom", callFrom);					
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));
				return querySp.list();
				
			}else if(callFrom.equalsIgnoreCase("BTOBRecollection") || callFrom.equalsIgnoreCase("BTOCRecollection")){
					String sql="";
					//calling BtoB Record ReCollection Request	
					if(tabId.equalsIgnoreCase("ALBToB")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and  ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status,ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}
					}else if(tabId.equalsIgnoreCase("rejectedSampleBToB")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status ,ps.sample_count ORDER BY et.treatment_id DESC";
							}
						}
					}else if(tabId.equalsIgnoreCase("pathoRecollectionBToB")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}		
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='1' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}		
						}
					}
					//calling BtoC Record ReCollection Request
					else if(tabId.equalsIgnoreCase("ALBToC")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where  ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status = '9' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC	 ";
							}
						}		
					}else if(tabId.equalsIgnoreCase("rejectedSampleBToC")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {			
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {			
								//sql="SELECT ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps  JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id  JOIN pathology_test_reason ts On ts.id=ps.remarks LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status='4' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}
					}else if(tabId.equalsIgnoreCase("pathoRecollectionBToC")){
						if(userType.equalsIgnoreCase("admin") || (!userType.equalsIgnoreCase("admin"))){
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}else{
							if(searchBy.equalsIgnoreCase("byDate")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeDate")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byAll")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" and SUBSTR(ps.created_date_time, 1, 10) >='"+fd+"' and SUBSTR(ps.created_date_time, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byType")) {
								//sql="SELECT ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, ps.customer_type, ps.customer_id FROM  pathology_sample_wise_master ps JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}else if(searchBy.equalsIgnoreCase("byTypeName")) {
								sql="SELECT ifnull(ep.email_id,'-') as email_id,ps.profile_Id,IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag,ts.test_reason_name,pss.re_collection,ep.mobile,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue, ps.print_count AS printCount FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN pathology_sample_wise_slave pss ON pss.master_id = ps.id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_test_reason ts ON ts.id = pss.re_collection_reason  LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where pss.re_collection = 'Y' and ps.business_type='2' and  ps.in_out_house=0 and ps.unit_Id="+unitId+" and ps.customer_type="+custTypeId+" and ps.customer_id="+custNameId+" AND et.emergency_flag IN (?,?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC ";
							}
						}				
					}
						
				SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
				
				if(emergencyFlag.equalsIgnoreCase("Y")) {
					query.setString(0, "Y");
					query.setString(1, "Y");
				}else if(emergencyFlag.equalsIgnoreCase("All")) {
					query.setString(0, "Y");
					query.setString(1, "N");
				}else {
					query.setString(0, "N");
					query.setString(1, "N");
				}
				
				query.setFirstResult(startIndex);
				query.setMaxResults(10);
				query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> list=query.list();
				for(Map<String, Object> row : list){
					PathologySampleWiseMaster obj=new PathologySampleWiseMaster();	
					obj.setEmailId((String)row.get("email_id"));
					obj.setProfileId((Integer)row.get("profile_Id"));				
					obj.setEmergencyflag((String)row.get("emergencyflag"));
					obj.setTestReasonName((String)row.get("test_reason_name"));
					obj.setPatientmobile((String)row.get("mobile"));
					obj.setPatientage((Integer)row.get("age"));
					obj.setPatientgander((String)row.get("gender"));
					obj.setMasterId((String)row.get("id"));
					obj.setTeststatus((Integer)row.get("test_status"));
					obj.setDatetime((String)row.get("datetime"));
					obj.setPatientname((String)row.get("patient_name"));
					obj.setPatientId((Integer)row.get("patient_id"));
					//obj.setDocname((String)row.get("docname"));
					obj.setDocname((String)row.get("refdocname"));
					obj.setBarCode((String)row.get("barCode"));
					obj.setProfileName((String)row.get("testname"));
					obj.setTreatmentId((Integer)row.get("treatment_id"));
					obj.setDepartmentId((Integer)row.get("department_id"));
					obj.setSamplename((String)row.get("sample_name"));
					obj.setContainername((String)row.get("conatiner_name"));
					//obj.setCollecteddatetime((Date)row.get("collected_date"));
				
					obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
					obj.setInOutHouse((Integer)row.get("in_out_house"));
					obj.setSampleTypeId((Integer)row.get("sample_type_id"));
					obj.setHeadingname((String)row.get("headingname"));
					obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue"));
					obj.setCenterName((String)row.get("centerName"));
					
					// added by ROHIT AMBAWADE on 23 Nov 2021
					obj.setPrintCount((Integer)row.get("printCount"));
					
					labPatRecordlist.add(obj);
				}
				return labPatRecordlist;
			}
		}catch (Exception e) {
			e.printStackTrace();
			log.error("searchLabTestPatient()...Error"+e);
		}
		return labPatRecordlist;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	//updated by Rohini.
	public List<PathologySampleWiseMaster> searchReportingPatient(String custTypeId, String custNameId, String fromDate,
			String toDate, String callFrom, String searchBy, String tabId, Integer startIndex, String emergencyFlag,
			String emailStatus, HttpServletRequest request) {
		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();
		try {
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			if(searchBy.equalsIgnoreCase("byDate") || searchBy.equalsIgnoreCase("byTypeDate") || searchBy.equalsIgnoreCase("byAll")) {
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}

			HttpSession httpSession = request.getSession();
			Integer unitId = (Integer) httpSession.getAttribute("uId");
			String userType = (String) httpSession.getAttribute("userType");
			
			/*String emailStatusChkUpdated = "";
			
			if(emailStatus.equalsIgnoreCase("Y")) {
				emailStatusChkUpdated = " AND ps.email_status IN ('Success')";
			}else {
				emailStatusChkUpdated = " AND ps.email_status IN ('N', 'Fail')";
			}*/
			
			
			if(startIndex == 0 || startIndex == null) {
           	// startIndex =1;
            }
			
			int maxresult = 10;
			
			if(tabId.equalsIgnoreCase("allTabLi")  || tabId.equalsIgnoreCase("patientWiseTabLi")) {
				
				//Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_all_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_all_tabli_For_pagination(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk,:startIndex,:maxresult)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setParameter("startIndex", startIndex);
 				querySp.setParameter("maxresult", maxresult);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
				
			}else if(tabId.equalsIgnoreCase("normalTabLi") || tabId.equalsIgnoreCase("abnormalTabLi") || tabId.equalsIgnoreCase("cAbnormalTabLi")) {
				
				//Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_normal_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_normal_tabli_For_pagination(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk,:startIndex,:maxresult)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setParameter("startIndex", startIndex);
 				querySp.setParameter("maxresult", maxresult);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
				
			}else if(tabId.equalsIgnoreCase("templateTestTabLi")){
				
				//Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_template_test_tabli(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_srp_template_test_tabli_For_pagination(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk,:startIndex,:maxresult)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setParameter("startIndex", startIndex);
 				querySp.setParameter("maxresult", maxresult);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
			}else if(tabId.equalsIgnoreCase("patientPrintTabLi") ) {
				
			//	Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_patient_print(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk)");
				Query querySp = sessionfactory.getCurrentSession().createSQLQuery("call sp_lab_patient_print_For_pagination(:unitId, :departmentId, :tabId, :userType, :searchBy, :custTypeId, :custNameId, :fd, :td, :p_emergency_flag, :p_emailstatuschk,:startIndex,:maxresult)");
				querySp.setParameter("unitId", unitId);
				querySp.setParameter("departmentId", null);
				querySp.setParameter("tabId", tabId);
				querySp.setParameter("userType", userType);
				querySp.setParameter("searchBy", searchBy);
				querySp.setParameter("custTypeId", custTypeId);
				querySp.setParameter("custNameId", custNameId);
				querySp.setParameter("fd", fd.toString());
				querySp.setParameter("td", td.toString());
				querySp.setParameter("p_emergency_flag", emergencyFlag);
				querySp.setParameter("p_emailstatuschk", emailStatus);
				querySp.setParameter("startIndex", startIndex);
 				querySp.setParameter("maxresult", maxresult);
				querySp.setResultTransformer(new AliasToBeanResultTransformer(PathologySampleWiseMaster.class));				
				labPatRecordlist = querySp.list();	
				
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return labPatRecordlist;
	}

	@Override
	public List<PathologySampleWiseMaster> searchDateWiseOutSourceLabReport(Integer outSourceType,
			Integer outSourceTypeId, String tabId, String fromDate, String toDate, Integer startIndex, String searchBy,
			String getTestName, String emergencyFlag,Integer departmentId, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			String TestName = "";
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
		
			if(searchBy.equalsIgnoreCase("byAll") || searchBy.equalsIgnoreCase("byDate")){
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}
			
			if(getTestName.equalsIgnoreCase("0"))
			{
				TestName = " ";
			} else {
				TestName = "AND es.profileName = '"+getTestName+"' ";
			}
			
			String deptIds="";
			if(departmentId == 0) {
				deptIds  = "1,2,3";
			}else {
				deptIds = departmentId.toString();
			}
			
			String sql="";		
			
	        if(userType.equalsIgnoreCase("admin")){
				if(tabId.equalsIgnoreCase("outsourcelabreport")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, po.out_lab_name AS lab_name, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, SUBSTR(ps.created_date_time, 1, 10) AS date, GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	poltm.test_rate AS test_rate FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN pathology_out_lab_test_master poltm ON es.profileName = poltm.test_name LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id WHERE ps.test_status = 8  and et.department_id in ("+deptIds +") AND ps.unit_Id = "+unitId+" AND SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' AND SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND ps.lab_center_id = "+outSourceTypeId+" "+TestName+" AND et.emergency_flag IN (? , ?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, po.out_lab_name AS lab_name, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, SUBSTR(ps.created_date_time, 1, 10) AS date, GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	poltm.test_rate AS test_rate FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN pathology_out_lab_test_master poltm ON es.profileName = poltm.test_name LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id WHERE ps.test_status = 8 and et.department_id in ("+deptIds +")  AND ps.unit_Id = "+unitId+" AND SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' AND SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (? , ?) "+TestName+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}			
			}else{				
				if(tabId.equalsIgnoreCase("outsourcelabreport")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, po.out_lab_name AS lab_name, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, SUBSTR(ps.created_date_time, 1, 10) AS date, GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	poltm.test_rate AS test_rate FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN pathology_out_lab_test_master poltm ON es.profileName = poltm.test_name LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id WHERE ps.test_status = 8 and et.department_id in ("+deptIds +") AND ps.unit_Id = "+unitId+" AND SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' AND SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND ps.lab_center_id = "+outSourceTypeId+" "+TestName+" AND et.emergency_flag IN (? , ?) GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id, ep.patient_id AS patient_id, po.out_lab_name AS lab_name, CONCAT(ep.prefix, ' ', ep.f_name, ' ', ep.m_name, ' ', ep.l_name) AS patient_name, SUBSTR(ps.created_date_time, 1, 10) AS date, GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname,	poltm.test_rate AS test_rate FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep ON ep.patient_id = ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN pathology_out_lab_test_master poltm ON es.profileName = poltm.test_name LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id WHERE ps.test_status = 8 and et.department_id in ("+deptIds +") AND ps.unit_Id = "+unitId+" AND SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' AND SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (? , ?) "+TestName+" GROUP BY ps.sample_type_Id , ps.in_out_house , ps.test_status , ps.sample_count ORDER BY et.treatment_id DESC";
					}
				}
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			// query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();

				obj.setPatientId((Integer)row.get("patient_id"));
				obj.setOutlabName((String)row.get("lab_name"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setDatetime((String)row.get("date"));
				obj.setTestName((String)row.get("testname"));
				obj.setTestRate((String)row.get("test_rate"));

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
}
	
	@Override
	public List<PathologySampleWiseMaster> searchDateWiseOutSourcedNew(
			Integer outSourceType, Integer outSourceTypeId, String tabId,
			String fromDate, String toDate, Integer startIndex, String searchBy, String emergencyFlag,Integer departmentId, HttpServletRequest request) {		
		List<PathologySampleWiseMaster> labPatRecordlist = new ArrayList<PathologySampleWiseMaster>();		
		try {
			HttpSession session = request.getSession();
			Integer unitId = (Integer) session.getAttribute("uId");
			String userType = (String) session.getAttribute("userType");
			String userCustomerType = (String) session.getAttribute("userCustomerType");
			String userCustomerId = (String) session.getAttribute("userCustomerId");
			StringBuffer fd = new StringBuffer();
			StringBuffer td = new StringBuffer();
			
			String deptIds="";
			if(departmentId == 0) {
				deptIds = "1,2,3";
			}else {
				deptIds = departmentId.toString();
			}
		
			if(searchBy.equalsIgnoreCase("byAll") || searchBy.equalsIgnoreCase("byDate")){
				String[] fDate = fromDate.split("/");
				fd.append(fDate[2]+"-"+fDate[1]+"-"+fDate[0]);
				
				String[] tDate = toDate.split("/");
				td.append(tDate[2]+"-"+tDate[1]+"-"+tDate[0]);
			}
			String sql="";		
			
	        if(userType.equalsIgnoreCase("admin")){
				if(tabId.equalsIgnoreCase("outsource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 "+" AND  et.department_id in ("+deptIds+")" +" and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 "+" AND  et.department_id in ("+deptIds+")" +" and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and  SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status !=4 "+" AND  et.department_id in ("+deptIds+")" +" and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";
					}	
					
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8 "+" AND  et.department_id in ("+deptIds+")" +" and ps.unit_Id="+unitId+" and  ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+"  and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";							
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8 "+" AND  et.department_id in ("+deptIds+")" +" and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";						
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM  pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.test_status =8 "+" AND  et.department_id in ("+deptIds+")" +" and ps.unit_Id="+unitId+" and ps.in_out_house="+outSourceType+" and ps.lab_center_id ="+outSourceTypeId+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id , ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time  ORDER BY et.treatment_id DESC";						
					}
				}			
			}else{				
				if(tabId.equalsIgnoreCase("outsource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 "+" AND  et.department_id in ("+deptIds+")" +" and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 "+" AND  et.department_id in ("+deptIds+")" +" and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, ps.pathologist_id,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,SUBSTR(ps.created_date_time, 1, 10) as datetime, CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house, bmn.lab_name as centerName, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN business_master_new bmn ON bmn.id = ps.customer_id JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") and ps.test_status !=4 "+" AND  et.department_id in ("+deptIds+")" +" and ps.test_status !=1 AND ps.test_status != 101 AND ps.test_status != 102 AND ps.test_status != 112 and ps.in_out_house=1 and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";
					}
				}else if(tabId.equalsIgnoreCase("forcedOutSource")) {
					if(searchBy.equalsIgnoreCase("byAll")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  "+" AND  et.department_id in ("+deptIds+")" +" and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byDate")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8  "+" AND  et.department_id in ("+deptIds+")" +"  and ps.unit_Id="+unitId+" and SUBSTR(ps.collected_date, 1, 10) >='"+fd+"' and SUBSTR(ps.collected_date, 1, 10) <='"+td+"' AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";	
					}else if(searchBy.equalsIgnoreCase("byType")){
						sql="SELECT IFNULL(CONCAT(cd.prefix,' ',cd.docName), '-') AS refdocname, et.emergency_flag AS emergencyflag, po.out_lab_name, ps.carrier_name,ps.dispatch_date,ps.dispatch_time,SUBSTR(ps.created_date_time, 1, 10) AS datetime,ps.comment,ep.age,ep.gender AS gender,ps.test_status AS test_status, GROUP_CONCAT(DISTINCT ps.id SEPARATOR ',') AS id,CONCAT(ep.prefix,' ',ep.f_name,  ' ',  ep.m_name, ' ',ep.l_name) AS patient_name,ep.patient_id AS patient_id,ifnull(dct.doc_name, '-') AS docname,GROUP_CONCAT(DISTINCT ps.bar_code SEPARATOR ',') AS barCode,GROUP_CONCAT(DISTINCT es.profileName SEPARATOR ',') AS testname, et.treatment_id AS treatment_id,et.department_id AS department_id,ifnull(pl.sample_name, '-') as sample_name,GROUP_CONCAT(DISTINCT ifnull(pc.conatiner_name, '-')) as conatiner_name,ps.collected_date,ps.in_out_house,ps.sample_type_id AS sampleTypeId, GROUP_CONCAT(es.time_sensitive_value SEPARATOR  ',')  as timeSensitiveValue,ifnull(ps.template_wise,'N') as template_wise,ifnull(ps.profile_Id,0) as profile_Id,ifnull(ps.sub_service_id,0) as sub_service_id FROM pathology_sample_wise_master ps JOIN ehat_treatment et ON et.treatment_id = ps.treatment_id JOIN ehat_patient ep on ep.patient_id=ps.patient_id JOIN pathology_labprofile es ON es.id = ps.profile_Id JOIN pathology_samplecontainer pc ON pc.id = ps.container_Id JOIN pathology_labsample pl ON pl.id = ps.sample_type_Id JOIN  pathology_out_lab_master po ON po.out_lab_id = ps.lab_center_id LEFT JOIN doctor dct ON dct.Doctor_ID = ps.ref_doc_id LEFT JOIN chanelling_doctor cd ON cd.channDocId = et.ref_doc_id where ps.customer_id IN ("+userCustomerId+") ps.test_status =8 "+" AND  et.department_id in ("+deptIds+")" +" and ps.unit_Id="+unitId+" and ps.lab_center_id ="+outSourceTypeId+" and ps.in_out_house="+outSourceType+" AND et.emergency_flag IN (?,?) group by ps.sample_type_Id, ps.in_out_house, ps.test_status, ps.sample_count, ps. created_date_time ORDER BY et.treatment_id DESC";
					}	
				}
			}
			SQLQuery query = sessionfactory.getCurrentSession().createSQLQuery(sql);
			
			if(emergencyFlag.equalsIgnoreCase("Y")) {
				query.setString(0, "Y");
				query.setString(1, "Y");
			}else if(emergencyFlag.equalsIgnoreCase("All")) {
				query.setString(0, "Y");
				query.setString(1, "N");
			}else {
				query.setString(0, "N");
				query.setString(1, "N");
			}
			
			query.setFirstResult(startIndex);
			query.setMaxResults(10);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			List<Map<String, Object>> list=query.list();
			for(Map<String, Object> row : list){
				PathologySampleWiseMaster obj=new PathologySampleWiseMaster();
				
				obj.setEmergencyflag((String)row.get("emergencyflag"));
				obj.setOutlabName((String)row.get("out_lab_name"));
				obj.setCarrierId((String)row.get("carrier_name"));
				obj.setCommentId((String)row.get("comment"));
				obj.setDispatchDate((String)row.get("dispatch_date"));
				obj.setDispatchTime((String)row.get("dispatch_time"));				
				obj.setPatientage((Integer)row.get("age"));
				obj.setPatientgander((String)row.get("gender"));
				obj.setMasterId((String)row.get("id"));
				obj.setTeststatus((Integer)row.get("test_status"));
				obj.setDatetime((String)row.get("datetime"));
				obj.setPatientname((String)row.get("patient_name"));
				obj.setPatientId((Integer)row.get("patient_id"));
				//obj.setDocname((String)row.get("docname"));
				obj.setDocname((String)row.get("refdocname"));
				obj.setBarCode((String)row.get("barCode"));
				obj.setProfileName((String)row.get("testname"));
				obj.setTreatmentId((Integer)row.get("treatment_id"));
				obj.setDepartmentId((Integer)row.get("department_id"));
				obj.setSamplename((String)row.get("sample_name"));
				obj.setContainername((String)row.get("conatiner_name"));
				//obj.setCollecteddatetime((Date)row.get("collected_date"));
				obj.setCollecteddatetime(getOldestCollectionDate(obj.getMasterId()));
				obj.setInOutHouse((Integer)row.get("in_out_house"));
				obj.setSampleTypeId((Integer)row.get("sampleTypeId"));
				obj.setCenterName((String)row.get("centerName"));
				obj.setTimeSensitiveValue((String)row.get("timeSensitiveValue")); 
				obj.setTemplateWise((String)row.get("template_wise"));
				obj.setProfileId(((Number)row.get("profile_Id")).intValue());
				obj.setSubServiceId(((Number)row.get("sub_service_id")).intValue());

				labPatRecordlist.add(obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return labPatRecordlist;
			}
		
		return labPatRecordlist;
	}
	
}