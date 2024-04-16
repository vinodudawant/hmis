package com.hms.ipdbill.daoImpl;

import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipdbill.dao.IpdBillComparisonDao;
import com.hms.ipdbill.dto.BillComparisonDto;
@Repository
public class IpdBillComparisonDaoImpl implements IpdBillComparisonDao{
	
	static Logger log = Logger.getLogger(IpdBillComparisonDaoImpl.class.getName());
	static {
		System.out.println("IpdBillComparisonDaoImpl is Loaded...!");
	}


	/* =============
	  Code By  : Badrinath Wagh
	  Code For : autoSuggestation for Ipd bill Comparison
	================*/

	@Autowired
	SessionFactory sessionFactory;

	public List<BillComparisonDto> ipdBillComparison(Integer unitId, String callFrom,
			String findText,int wardType,int wardName) {

		log.info("In IpdBillComparisonDaoImpl ipdBillComparison()");
		Session s = sessionFactory.getCurrentSession();
		try {

			Query prefixSp = s.createSQLQuery(
					"call sp_ipd_bill_comparison(:unit_id,:patient_id,:patient_name,:mobile,:wardType,:wardName)");

			prefixSp.setParameter("unit_id", unitId);
			if(wardType > 0)
				prefixSp.setParameter("wardType", wardType);
			else
				prefixSp.setParameter("wardType", null);
			if(wardName > 0)
				prefixSp.setParameter("wardName", wardName);
			else
				prefixSp.setParameter("wardName", null);
			
			if (callFrom.equalsIgnoreCase("1")) {
				prefixSp.setParameter("patient_id", findText);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", "search");
			} else if (callFrom.equalsIgnoreCase("2")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", findText);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", "search");
			} else if (callFrom.equalsIgnoreCase("3")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", findText);
				//prefixSp.setParameter("hallTypeId", null);
			   //prefixSp.setParameter("callFrom", "search");
				
			} else if (callFrom.equalsIgnoreCase("onload")) {
				prefixSp.setParameter("patient_id", null);
				prefixSp.setParameter("patient_name", null);
				prefixSp.setParameter("mobile", null);
				//prefixSp.setParameter("hallTypeId", null);
				//prefixSp.setParameter("callFrom", callFrom);
			}

			prefixSp.setResultTransformer(new AliasToBeanResultTransformer(BillComparisonDto.class));
			@SuppressWarnings("unchecked")
			List<BillComparisonDto> ltBillComparisonDto = prefixSp.list();
			log.debug("Response--------> " + ltBillComparisonDto);
			return ltBillComparisonDto;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}	


}
