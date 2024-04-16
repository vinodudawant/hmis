package com.hms.administrator.dao.impl;

import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.HospitalAccessDao;
import com.hms.administrator.dto.HospitalAccDetails;
import com.hms.administrator.dto.HospitalDetails;
import com.hms.ehat.dto.EhatBillPrefix;
import com.hms.ehat.dto.SubServiceDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Repository
@Transactional
public class HospitalAccDaoImpl implements HospitalAccessDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	
	@Override
	public String SaveHospitalAccessDetails(HospitalAccDetails hospitalAccDetails,String listEhatBillPrefix) {
		// TODO Auto-generated method stub
		EhatBillPrefix billDto = (EhatBillPrefix) ConfigUIJSONUtility.getObjectFromJSON(listEhatBillPrefix, EhatBillPrefix.class);		
		hospitalAccDetails.setListEhatBillPrefix(billDto.getListEhatBillPrefix());
      sessionFactory.getCurrentSession().merge(hospitalAccDetails);
      if(hospitalAccDetails.getIdhospitalAccInfo()==0){
    	  return "Data Saved SuccessFully";
      }
		return "Data updated SuccessFully";
	}
	public List<HospitalAccDetails> fetchHospitalAccDetails(String corporateId) {

		List<HospitalAccDetails> arrHospitalAccDetails = new ArrayList<HospitalAccDetails>();
		List<EhatBillPrefix> lstEhatBillPrefix = new ArrayList<EhatBillPrefix>();
		List<SubServiceDto> subServiceobj = new ArrayList<SubServiceDto>();
		String hql ="";
		
		if (Integer.parseInt(corporateId) == 0) {
			
			hql = "FROM EhatBillPrefix";
			Query query = sessionFactory.getCurrentSession().createQuery(hql);		
			List<EhatBillPrefix> lstEhatBillPrefix1 =  query.list();
			
			for (EhatBillPrefix rs : lstEhatBillPrefix1) {
				
				EhatBillPrefix obj=new EhatBillPrefix();
				obj.setDepId((Integer)rs.getDepId());
				obj.setBillPrefix((String)rs.getBillPrefix());
				obj.setBillMiddle((String) rs.getBillMiddle());
				obj.setBillSuffix((String)rs.getBillSuffix());
				obj.setBillRecBoth((Integer)rs.getBillRecBoth());
				lstEhatBillPrefix.add(obj);
				obj=null;
			}
			
			hql = "FROM HospitalAccDetails";
			Query query1 = sessionFactory.getCurrentSession().createQuery(hql);
			List<HospitalAccDetails> list1 = query1.list();
			
			
			for (HospitalAccDetails rs : list1) {
				HospitalAccDetails objHospitalAccDetails = new HospitalAccDetails();
				
				 objHospitalAccDetails.setIdhospital((Integer) rs.getIdhospital());
				 
				objHospitalAccDetails.setIdhospitalAccInfo((Integer)rs.getIdhospitalAccInfo());
				objHospitalAccDetails.setIPDFee((Float) rs.getIPDFee());

				objHospitalAccDetails.setAdminChrg((Float) rs
						.getAdminChrg());
				objHospitalAccDetails.setChrgType((String) rs
						.getChrgType());
				objHospitalAccDetails.setDocRdFrmTime((Time) rs
						.getDocRdFrmTime());
				objHospitalAccDetails.setDocRdToTime((Time) rs
						.getDocRdToTime());
				objHospitalAccDetails.setOTFrmTime((Time) rs.getOTFrmTime());
				objHospitalAccDetails.setOTToTime((Time) rs.getOTToTime());
				objHospitalAccDetails.setOTcharge((Float) rs.getOTcharge());
				objHospitalAccDetails.setOTafterOTtime((Float) rs
						.getOTafterOTtime());
				objHospitalAccDetails.setOTEmerchrg((Float) rs
						.getOTEmerchrg());
				objHospitalAccDetails.setOpEmerFrmTime((Time) rs
						.getOpEmerFrmTime());
				objHospitalAccDetails.setOpEmerToTime((Time) rs
						.getOpEmerToTime());
				objHospitalAccDetails.setPreanechrg((Float) rs
						.getPreanechrg());
				objHospitalAccDetails
						.setTPAChr((Float) rs.getTPAChr());
				objHospitalAccDetails
						.setDoctorRoundChargesAfterRoundTime((Float) rs
								.getDoctorRoundChargesAfterRoundTime());
				objHospitalAccDetails.setOperationEmergencyCharges((Float) rs
						.getOperationEmergencyCharges());
				objHospitalAccDetails.setAneNormal((Float) rs
						.getAneNormal());
				objHospitalAccDetails.setAneStandBy((Float) rs
						.getAneStandBy());
				objHospitalAccDetails.setAneAsaIv((Float) rs
						.getAneAsaIv());
				objHospitalAccDetails.setAstSurgeonChrg((Float) rs
						.getAstSurgeonChrg());
				objHospitalAccDetails.setTypeOfBilling((String) rs
						.getTypeOfBilling());
				objHospitalAccDetails.setTDS((Float) rs.getTDS());
				objHospitalAccDetails.setBedHours((Integer) rs.getBedHours());
				objHospitalAccDetails.setEmrAdmChrg((Float) rs.getEmrAdmChrg());
				objHospitalAccDetails.setEmrStartTime((Time) rs.getEmrStartTime());
				objHospitalAccDetails.setEmrEndTime((Time) rs.getEmrEndTime());
				objHospitalAccDetails.setEmrAdmChrgFlag((Integer) rs.getEmrAdmChrgFlag());
				objHospitalAccDetails.setRefDocPer((Double)rs.getRefDocPer());
				objHospitalAccDetails.setPpnPer((Double)rs.getPpnPer());
				objHospitalAccDetails.setEmrChrPer((Double)rs.getEmrChrPer());
				// Added by vinod
				objHospitalAccDetails.setAdminServiceid((String)rs.getAdminServiceid());
				objHospitalAccDetails.setAdminSubServiceid((String)rs.getAdminSubServiceid());
				objHospitalAccDetails.setListEhatBillPrefix(lstEhatBillPrefix);			
				// Added by vinod
				objHospitalAccDetails.setCurrencyId((Integer) rs.getCurrencyId());
				objHospitalAccDetails.setAdminChargesFlag((String) rs.getAdminChargesFlag());
				objHospitalAccDetails.setHospitalUnitId((Integer) rs.getHospitalUnitId());
				
				String adminSubServiceid = rs.getAdminSubServiceid();
				String[] adminSubServ =  adminSubServiceid.split(",");
				
				if(adminSubServ.length > 0)
				{
					for(String adminSubService : adminSubServ)
					{
						Criteria criteria = sessionFactory.getCurrentSession()
								.createCriteria(SubServiceDto.class);
						criteria.add(Restrictions.eq("subId", Integer.parseInt(adminSubService) ));
						criteria.add(Restrictions.eq("deleted", "N"));
						criteria.add(Restrictions.eq("isCategory", "N"));
						criteria.addOrder(Order.desc("subId"));
						SubServiceDto obj = (SubServiceDto) criteria.uniqueResult();
						subServiceobj.add(obj);
						

					}
				}
				
				objHospitalAccDetails.setListSubServiceDto(subServiceobj);
				arrHospitalAccDetails.add(objHospitalAccDetails);
				
			}
			
		
			
			
			return arrHospitalAccDetails;
		} else {

			String sqlSelect;
			sqlSelect = "Select corporateAccId from corporatehospitalaccounting where corporateAccId='"
					+ corporateId + "'";
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sqlSelect);
			query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			if (query.list().isEmpty()) {
				hql = "FROM HospitalAccDetails";
				Query query2 = sessionFactory.getCurrentSession().createQuery(hql);
				List<HospitalAccDetails> list2 = query2.list();
				

				for (HospitalAccDetails rs : list2) {
					HospitalAccDetails objHospitalAccDetails = new HospitalAccDetails();
					
					
					 
					objHospitalAccDetails
							.setIPDFee((Float) rs.getIPDFee());

					objHospitalAccDetails.setAdminChrg((Float) rs
							.getAdminChrg());
					objHospitalAccDetails.setChrgType((String) rs
							.getChrgType());
					objHospitalAccDetails.setDocRdFrmTime((Time) rs
							.getDocRdFrmTime());
					objHospitalAccDetails.setDocRdToTime((Time) rs
							.getDocRdToTime());
					objHospitalAccDetails.setOTFrmTime((Time) rs
							.getOTFrmTime());
					objHospitalAccDetails
							.setOTToTime((Time) rs.getOTToTime());
					objHospitalAccDetails.setOTcharge((Float) rs
							.getOTcharge());
					objHospitalAccDetails.setOTafterOTtime((Float) rs
							.getOTafterOTtime());
					objHospitalAccDetails.setOTEmerchrg((Float) rs
							.getOTEmerchrg());
					objHospitalAccDetails.setOpEmerFrmTime((Time) rs
							.getOpEmerFrmTime());
					objHospitalAccDetails.setOpEmerToTime((Time) rs
							.getOpEmerToTime());
					objHospitalAccDetails.setPreanechrg((Float) rs
							.getPreanechrg());
					objHospitalAccDetails.setTPAChr((Float) rs
							.getTPAChr());
					objHospitalAccDetails
							.setDoctorRoundChargesAfterRoundTime((Float) rs
									.getDoctorRoundChargesAfterRoundTime());
					objHospitalAccDetails
							.setOperationEmergencyCharges((Float) rs
									.getOperationEmergencyCharges());
					objHospitalAccDetails.setAneNormal((Float) rs
							.getAneNormal());
					objHospitalAccDetails.setAneStandBy((Float) rs
							.getAneStandBy());
					objHospitalAccDetails.setAneAsaIv((Float) rs
							.getAneAsaIv());
					objHospitalAccDetails.setEmrAdmChrg((Float) rs.getEmrAdmChrg());
					objHospitalAccDetails.setEmrStartTime((Time) rs.getEmrStartTime());
					objHospitalAccDetails.setEmrEndTime((Time) rs.getEmrEndTime());
					arrHospitalAccDetails.add(objHospitalAccDetails);
				}
			} else {
				String sql12 = "SELECT * FROM corporatehospitalaccounting where corporateAccId=?";
				List<HospitalDetails> arrHospitalDetails = new ArrayList<HospitalDetails>();
				SQLQuery querylist = sessionFactory.getCurrentSession().createSQLQuery(sql12);
				querylist.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				List<Map<String, Object>> listofquery = querylist.list();
				for (Map<String, Object> rs : listofquery) {
					HospitalAccDetails objHospitalAccDetails = new HospitalAccDetails();

					objHospitalAccDetails
							.setIPDFee((Float) rs.get("ipdRegFee"));

					objHospitalAccDetails.setAdminChrg((Float) rs
							.get("administrativeCharge"));
					objHospitalAccDetails.setChrgType((String) rs
							.get("administrativeChargeType"));

					objHospitalAccDetails.setDocRdFrmTime((Time) rs
							.get("doctorRoundFrom"));
					objHospitalAccDetails.setDocRdToTime((Time) rs
							.get("doctorRoundTo"));
					objHospitalAccDetails.setOTFrmTime((Time) rs
							.get("otTimeFrom"));
					objHospitalAccDetails
							.setOTToTime((Time) rs.get("otTimeTo"));
					objHospitalAccDetails.setOTcharge((Float) rs
							.get("otCharges"));
					objHospitalAccDetails.setOTafterOTtime((Float) rs
							.get("otChargesAfterOtTime"));
					objHospitalAccDetails.setOTEmerchrg((Float) rs
							.get("otEmergencyCharge"));
					objHospitalAccDetails.setOpEmerFrmTime((Time) rs
							.get("operationTmForEmergeancyFrom"));
					objHospitalAccDetails.setOpEmerToTime((Time) rs
							.get("operationTmForEmergeancyTo"));
					objHospitalAccDetails.setPreanechrg((Float) rs
							.get("preanesthesiaCharge"));
					objHospitalAccDetails.setTPAChr((Float) rs
							.get("tpaProcessing"));
					objHospitalAccDetails
							.setDoctorRoundChargesAfterRoundTime((Float) rs
									.get("doctorRoundChargesAfterRoundTime"));
					objHospitalAccDetails
							.setOperationEmergencyCharges((Float) rs
									.get("operationEmergencyCharges"));
					objHospitalAccDetails.setAneNormal((Float) rs
							.get("anesthesiaNormal"));
					objHospitalAccDetails.setAneStandBy((Float) rs
							.get("anesthesaiStandBy"));
					objHospitalAccDetails.setAneAsaIv((Float) rs
							.get("anesthesiaAsaIv"));
					objHospitalAccDetails.setOTFrmTime((Time) rs
							.get("otTimeFrom"));
					objHospitalAccDetails
							.setOTToTime((Time) rs.get("otTimeTo"));
					objHospitalAccDetails.setAstSurgeonChrg((Float) rs
							.get("assistantSurgeonCharge"));
					objHospitalAccDetails.setEmrAdmChrg((Float) rs.get("emergencyAdmissionCharges"));
					objHospitalAccDetails.setEmrStartTime((Time) rs.get("emergencyAdmissionFromTime"));
					objHospitalAccDetails.setEmrEndTime((Time) rs.get("emergencyAdmissionToTime"));
					arrHospitalAccDetails.add(objHospitalAccDetails);

				}

			}
			return arrHospitalAccDetails;
		}

	}

 
}
