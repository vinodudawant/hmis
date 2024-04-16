package com.hms.ipdbill.daoImpl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipdbill.dao.IpdQueueDao;
import com.hms.ipdbill.dto.AutosuggestionIpdQueueDto;
import com.hms.ipdbill.dto.IpdBillPatientsDTO;
import com.hms.ipdbill.dto.IpdQueueDTO;

@Repository
public class IpdQueueDaoImpl implements IpdQueueDao {

	static Logger log = Logger.getLogger(IpdQueueDaoImpl.class.getName());
	static {
		System.out.println("IpdQueueDaoImpl is Loaded...!");
	}

	@Autowired
	SessionFactory sessionFactory;

	/*
	 * ============= Code By : Badrinath Wagh
	 *  Code For : autoSuggestationIpdQueue
	 * ================
	 */

	public List<AutosuggestionIpdQueueDto> autoSuggestationIpdQueue(Integer unit_id, String callFrom, String findText) {

		log.info("In IpdQueueDaoImpl autoSuggestationIpdQueue()");
		Session s = sessionFactory.getCurrentSession();
		try {

			Query prefixSp = s.createSQLQuery(
					"call sp_ipd_get_autosuggestion_ipd_queue(:unit_id,:patient_id,:patient_name,:mobile)");

			prefixSp.setParameter("unit_id", null);

			if (callFrom.equalsIgnoreCase("1")) {
				prefixSp.setParameter("patient_id", findText);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				prefixSp.setParameter("unit_id", unit_id);
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				prefixSp.setParameter("unit_id", unit_id);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(AutosuggestionIpdQueueDto.class));
			@SuppressWarnings("unchecked")
			List<AutosuggestionIpdQueueDto> ltIpdQueueDTO = prefixSp.list();
			log.debug("Response--------> " + ltIpdQueueDTO);
			return ltIpdQueueDTO;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/*
	 * ============= Code By : Badrinath Wagh
	 *  Code For : getIpdQueue Patients
	 * ================
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdQueueDTO> getIpdQueue(Integer unitId,Integer startIndex,String callFrom) {
		System.err.println("unitId...." + unitId);

		List<IpdQueueDTO> ltIpdQueue = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(IpdQueueDTO.class);
			criteria.setFirstResult(startIndex);
			criteria.setMaxResults(10);
			if (unitId > 0) {
				criteria.add(Restrictions.eq("unitId", unitId));
			}
			criteria.add(Restrictions.eq("deleted", "N"));
			//Added by Akshata - for not show hameodialysis record in IPD Queue
			if(callFrom.equalsIgnoreCase("0"))
			{
				criteria.add(Restrictions.not(Restrictions.eq("specialityId", 71)));
				criteria.addOrder(Order.desc("pId"));
				System.err.println("unitId....");
			}
			else if(callFrom.equalsIgnoreCase("4")) {
				criteria.add(Restrictions.eq("casualityFlag", "Y"));
				criteria.addOrder(Order.desc("pId"));
				System.err.println("unitId....");
			}
			else if(callFrom.equalsIgnoreCase("2")){
				criteria.add(Restrictions.eq("deptId", "2"));
				criteria.add(Restrictions.eq("casualityFlag", "N"));
				criteria.addOrder(Order.desc("pId"));
				System.err.println("unitId....");
			}
			
			
			
			ltIpdQueue = criteria.list();

		} catch (Exception e) {
			e.printStackTrace(); 
			System.err.println("ehatException:- Class Name :" + e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :" + e.getStackTrace()[0].getLineNumber());
			return ltIpdQueue;
		}
		return ltIpdQueue;
	}
	
	/*
	 * ============= Code By : Badrinath Wagh
	 *  Code For : getIpdQueuePatientByTreatmentId
	 * ================
	 */
	
	@Override
	public IpdQueueDTO getIpdQueuePatientByTreatmentId(Integer treatId) {
		IpdQueueDTO obj = new IpdQueueDTO();
		try {
			Criteria c = sessionFactory.getCurrentSession().createCriteria(IpdQueueDTO.class);
			c.add(Restrictions.eq("treatId", treatId));
			obj = (IpdQueueDTO) c.uniqueResult();
			;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}
	
	/*
	 * ============= Code By : Badrinath Wagh
	 *  Code For : autosuggesstionviewIpdbillPatients
	 * ================
	 */
	@SuppressWarnings("unchecked")
	@Override
	public List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,String usertype,HttpServletRequest request){
		List<IpdBillPatientsDTO> ltIpdbillPatients = null;
		try {
			

			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdBillPatientsDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", +unitId));
			if(finalBill.equalsIgnoreCase("finalBill")){
				
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}else{
				criteria.add(Restrictions.eq("invoiceFlag", "N"));
			}if(usertype.equalsIgnoreCase("Y")){
				
				criteria.add(Restrictions.like("inCount", "%" + letter + "%"));	
				
			}else{
			
			Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
			Criterion rest2= Restrictions.like("pIdd", "%" + letter + "%");
			Criterion rest3= Restrictions.like("mrnno", "%" + letter + "%");
			Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
			Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
			criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
			/*criteria.add(Restrictions
					.sqlRestriction("patient_name LIKE '%" + letter + "%' OR pIdd LIKE '%" + letter + "%'"));
			*/
			}
			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}
	
	/*
	 * ============= Code By : Badrinath Wagh
	 *  Code For : autosuggesstionviewIpdbillPatients
	 * ================
	 */

	@SuppressWarnings("unchecked")
	@Override
	public List<IpdBillPatientsDTO> autosuggesstionviewIpdbillPatients(String letter,String finalBill,HttpServletRequest request){
		List<IpdBillPatientsDTO> ltIpdbillPatients = null;
		try {
			
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			Integer unitId = (Integer) session.getAttribute("uId");
			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(IpdBillPatientsDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId", +unitId));
			
			if(finalBill.equalsIgnoreCase("finalBill")){
				
				criteria.add(Restrictions.eq("invoiceFlag", "Y"));
			}else if(finalBill.equalsIgnoreCase("all")){
				
			}else{
				criteria.add(Restrictions.eq("invoiceFlag", "N"));
			}
			
			Criterion rest1= Restrictions.like("patientName", "%" + letter + "%");
			Criterion rest3= Restrictions.like("pIdd", "%" + letter + "%");
			Criterion rest2= Restrictions.like("mrnno", "%" + letter + "%");
			Criterion rest4= Restrictions.like("mobile", "%" + letter + "%");
			Criterion rest5= Restrictions.like("opdipdno", "%" + letter + "%");
			criteria.add(Restrictions.or(rest1, rest2,rest3,rest4,rest5));
			/*criteria.add(Restrictions
					.sqlRestriction("patient_name LIKE '%" + letter + "%' OR patient_id LIKE '%" + letter + "%'OR mrnno LIKE '%" + letter + "%'"));
			*/

			criteria.addOrder(Order.desc("pId"));
			ltIpdbillPatients = criteria.list();
	
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException:- Class Name :"
					+ e.getStackTrace()[0].getClassName() + " Method Name : "
					+ e.getStackTrace()[0].getMethodName() + " Line No :"
					+ e.getStackTrace()[0].getLineNumber());
			return ltIpdbillPatients;
		}
		return ltIpdbillPatients;
	}
	
	@Override
	public Integer getIpdPatientCount() {
		// TODO Auto-generated method stub
		
		Integer result = 0;
		try {

			String sql = "SELECT " + 
					"    COUNT(*)" + 
					"FROM" + 
					"     ehat_ipd  where" + 
					"     deleted='N'"
					;
			SQLQuery sqlcount = sessionFactory.getCurrentSession().createSQLQuery(sql);
			result = ((Number) sqlcount.uniqueResult()).intValue();
			
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
}
