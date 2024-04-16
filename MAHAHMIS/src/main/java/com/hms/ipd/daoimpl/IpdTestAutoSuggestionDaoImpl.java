package com.hms.ipd.daoimpl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ipd.dao.IpdTestAutoSuggestionDao;
import com.hms.opdbill.dto.SponsorTestChargesDto;
import com.hms.opdbill.dto.TestAutoSuggestionDto;
import com.hms.opdbill.dto.TestSponsorAutoSuggestionDto;

@Repository
public class IpdTestAutoSuggestionDaoImpl implements IpdTestAutoSuggestionDao{

	static Logger log=Logger.getLogger(IpdTestAutoSuggestionDaoImpl.class.getName());
	static {
		System.out.println("TestAutoSuggestionDaoImpl is Loaded...!");
	}
	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public TestAutoSuggestionDto getTestAutoSuggestion(TestAutoSuggestionDto objDto) {

		log.info("In TestAutoSuggestionDaoImpl getTestAutoSuggestion()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_test_autosuggestion(:unitId,:userId,:serviceId,:deptId,:searchText)");
			querySp.setParameter("unitId", objDto.getUnitid());
			querySp.setParameter("userId", objDto.getUserId());
			if(objDto.getServiceid() > 0)
				querySp.setParameter("serviceId", objDto.getServiceid());
			else
				querySp.setParameter("serviceId", null);
			querySp.setParameter("deptId", objDto.getDept_id());
			querySp.setParameter("searchText", objDto.getCategoryName());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(TestAutoSuggestionDto.class));
			@SuppressWarnings("unchecked")
			List<TestAutoSuggestionDto> lstTestAutoSuggestionDto = querySp.list();		
			objDto.setLstService(lstTestAutoSuggestionDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public TestSponsorAutoSuggestionDto getSponsorTestAutosuggestion(TestSponsorAutoSuggestionDto objDto) {
		
		log.info("In TestAutoSuggestionDaoImpl getSponsorTestAutosuggestion()");
		Session s = sessionFactory.getCurrentSession();
		
		try {
			
			Query querySp = s.createSQLQuery("call sp_opd_bill_sponsor_services_autosuggestion(:userId,:unitId,:serviceId,:deptId,:searchText)");
			querySp.setParameter("userId", objDto.getUserid());
			querySp.setParameter("unitId", objDto.getUnitid());
			if(objDto.getServiceid() > 0)
				querySp.setParameter("serviceId", objDto.getServiceid());
			else
				querySp.setParameter("serviceId", null);
			querySp.setParameter("deptId", objDto.getDept_id());
			querySp.setParameter("searchText", objDto.getCategoryName());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(TestSponsorAutoSuggestionDto.class));
			@SuppressWarnings("unchecked")
			List<TestSponsorAutoSuggestionDto> lstTestAutoSuggestionDto = querySp.list();		
			objDto.setLstService(lstTestAutoSuggestionDto);
			log.debug("Response--------> "+objDto);
			return objDto;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public SponsorTestChargesDto getSponsorTestCharges(SponsorTestChargesDto objDto) {

		log.info("In TestAutoSuggestionDaoImpl getSponsorTestCharges()");
		Session s = sessionFactory.getCurrentSession();

		try {

			Query querySp = s.createSQLQuery(
					"call sp_ipd_bill_charges_sponsor(:chargesSlaveId,:isComServId,:isComServlastId,:hallSlaveId,:serviceid,:unitId)");

			querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
			querySp.setParameter("isComServId", objDto.getIsComServId());
			querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
			querySp.setParameter("hallSlaveId", objDto.getHallSlaveId());
			querySp.setParameter("serviceid", objDto.getServiceid());
			querySp.setParameter("unitId", objDto.getUnitId());
			querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));
			@SuppressWarnings("unchecked")
			List<SponsorTestChargesDto> lstSponsorTestChargesDto = querySp.list();
			objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
			log.debug("Response--------> " + objDto);
			return objDto;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		// return objDto;
	}
	
//	fetch sponsor charges  //added by vishant
	@Override
	public SponsorTestChargesDto getSponsorTestChargesNew(SponsorTestChargesDto objDto) {

		log.info("In TestAutoSuggestionDaoImpl getSponsorTestCharges()");
		Session s = sessionFactory.getCurrentSession();

		try {

			Query querySp = s.createSQLQuery(
					"call sp_ipd_bill_charges_sponsor(:chargesSlaveId,:isComServId,:isComServlastId,:hallSlaveId,:serviceid,:unitId)");

			if (objDto.getIsComServlastId() > 0) {

				String sql = "select count(*) from ehat_configuration_services where chargesSlave_id="
						+ objDto.getChargesSlaveId() + " and hallSlave_id=" + objDto.getHallSlaveId()
						+ " and is_com_servlastId =" + objDto.getIsComServlastId();
				int count = ((BigInteger) sessionFactory.getCurrentSession().createSQLQuery(sql).uniqueResult())
						.intValue();
				if (count > 0) {

					querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
					querySp.setParameter("isComServId", objDto.getIsComServId());
					querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
					querySp.setParameter("hallSlaveId", objDto.getHallSlaveId());
					querySp.setParameter("serviceid", objDto.getServiceid());
					querySp.setParameter("unitId", objDto.getUnitId());
					querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));

				} else {

					if (objDto.getChargesSlaveId() > 0) {

						String sponsorCheckCount = "select count(*) from ehat_configuration_services where chargesSlave_id="
								+ objDto.getChargesSlaveId() + " and hallSlave_id=" + 0 + " and is_com_servlastId ="
								+ objDto.getIsComServlastId();
						int sponsorCount = ((BigInteger) sessionFactory.getCurrentSession()
								.createSQLQuery(sponsorCheckCount).uniqueResult()).intValue();
						if (sponsorCount > 0) {

							querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
							querySp.setParameter("isComServId", objDto.getIsComServId());
							querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
							querySp.setParameter("hallSlaveId", 0);
							querySp.setParameter("serviceid", objDto.getServiceid());
							querySp.setParameter("unitId", objDto.getUnitId());
							querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));
//						@SuppressWarnings("unchecked")
//						List<SponsorTestChargesDto> lstSponsorTestChargesDto = querySp.list();		
//						objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
//						log.debug("Response--------> "+objDto);
//						return objDto;
						} else {

							String hallCheckCount2 = "select count(*) from ehat_configuration_services where chargesSlave_id="
									+ 0 + " and hallSlave_id=" + objDto.getHallSlaveId() + " and is_com_servlastId ="
									+ objDto.getIsComServlastId();
							int hallCount = ((BigInteger) sessionFactory.getCurrentSession()
									.createSQLQuery(hallCheckCount2).uniqueResult()).intValue();
							if (hallCount > 0) {

								querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
								querySp.setParameter("isComServId", objDto.getIsComServId());
								querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
								querySp.setParameter("hallSlaveId", objDto.getHallSlaveId());
								querySp.setParameter("serviceid", objDto.getServiceid());
								querySp.setParameter("unitId", objDto.getUnitId());
								querySp.setResultTransformer(
										new AliasToBeanResultTransformer(SponsorTestChargesDto.class));

							}else {
								querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
								querySp.setParameter("isComServId", objDto.getIsComServId());
								querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
								querySp.setParameter("hallSlaveId", objDto.getHallSlaveId());
								querySp.setParameter("serviceid", objDto.getServiceid());
								querySp.setParameter("unitId", objDto.getUnitId());
								querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));
								
							}
						}
					} else {

						String sponsorCheckCount = "select count(*) from ehat_configuration_services where chargesSlave_id="
								+ 0 + " and hallSlave_id=" + 0 + " and is_com_servlastId ="
								+ objDto.getIsComServlastId();
						int hallCOuntCount = ((BigInteger) sessionFactory.getCurrentSession()
								.createSQLQuery(sponsorCheckCount).uniqueResult()).intValue();
						if (hallCOuntCount > 0) {

							querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
							querySp.setParameter("isComServId", objDto.getIsComServId());
							querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
							querySp.setParameter("hallSlaveId", 0);
							querySp.setParameter("serviceid", objDto.getServiceid());
							querySp.setParameter("unitId", objDto.getUnitId());
							querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));
//						@SuppressWarnings("unchecked")
//						List<SponsorTestChargesDto> lstSponsorTestChargesDto = querySp.list();		
//						objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
//						log.debug("Response--------> "+objDto);
//						return objDto;
						} else {

							String hallCheckCount2 = "select count(*) from ehat_configuration_services where chargesSlave_id="
									+ 0 + " and hallSlave_id=" + objDto.getHallSlaveId() + " and is_com_servlastId ="
									+ objDto.getIsComServlastId();
							int hallCount = ((BigInteger) sessionFactory.getCurrentSession()
									.createSQLQuery(hallCheckCount2).uniqueResult()).intValue();
							if (hallCount > 0) {

								querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
								querySp.setParameter("isComServId", objDto.getIsComServId());
								querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
								querySp.setParameter("hallSlaveId", objDto.getHallSlaveId());
								querySp.setParameter("serviceid", objDto.getServiceid());
								querySp.setParameter("unitId", objDto.getUnitId());
								querySp.setResultTransformer(
										new AliasToBeanResultTransformer(SponsorTestChargesDto.class));

							}
						}

					}

				}

				@SuppressWarnings("unchecked")
				List<SponsorTestChargesDto> lstSponsorTestChargesDto = querySp.list();
				objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
				log.debug("Response--------> " + objDto);
				return objDto;

			} else {

				querySp.setParameter("chargesSlaveId", objDto.getChargesSlaveId());
				querySp.setParameter("isComServId", objDto.getIsComServId());
				querySp.setParameter("isComServlastId", objDto.getIsComServlastId());
				querySp.setParameter("hallSlaveId", objDto.getHallSlaveId());
				querySp.setParameter("serviceid", objDto.getServiceid());
				querySp.setParameter("unitId", objDto.getUnitId());
				querySp.setResultTransformer(new AliasToBeanResultTransformer(SponsorTestChargesDto.class));
				@SuppressWarnings("unchecked")
				List<SponsorTestChargesDto> lstSponsorTestChargesDto = querySp.list();
				objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
				log.debug("Response--------> " + objDto);
				return objDto;

			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public SponsorTestChargesDto getHallWiseTestCharges(SponsorTestChargesDto objDto) {
		
		log.info("In TestAutoSuggestionDaoImpl getSponsorTestCharges()");
		Session s = sessionFactory.getCurrentSession();
	
		   
		   try {
			         //  get parent Hall Id
			          String sqlParentHallId= "Select selfId from ehat_charges_master_slave where id="+objDto.getHallSlaveId()+"";
			         SQLQuery qParentHallId  =s.createSQLQuery(sqlParentHallId);
			         int parentHallId=((Number) qParentHallId.uniqueResult()).intValue();
			         // end parent Hall Id
			         String sql="";
			         
			        	 // check particuler test configure with sponsor and Hall
			        	    String sqlSponsorAndHallCount=" select count(*) from ehat_configuration_services where service_id="+objDto.getServiceid()+"  and hallSlave_id="+parentHallId+" and deleted='N'  ";
			        	   SQLQuery qSponsorAndHallCount =s.createSQLQuery(sqlSponsorAndHallCount);
			        	  int countSponsorandHall =((Number) qSponsorAndHallCount.uniqueResult()).intValue();
			        	  if(countSponsorandHall > 0) {
			        		 
			        		  sql="Select charges from ehat_configuration_services where service_id="+objDto.getServiceid()+"  and hallSlave_id="+parentHallId+" and deleted='N'  and chargesSlave_id=0 limit 1";
			        	  }
			        	  else {
			        		  sql=" select charges from ehat_subservice where id="+objDto.getServiceid()+"";
			        	  }
			        
			         
			         SQLQuery qMain=s.createSQLQuery(sql);
			        double charges= (double) qMain.uniqueResult();
			        
			       
			        
			        List<SponsorTestChargesDto> lstSponsorTestChargesDto =new  ArrayList<SponsorTestChargesDto> ();		
			        SponsorTestChargesDto obj=new SponsorTestChargesDto();
			        obj.setCharges(charges);
			        
			        lstSponsorTestChargesDto.add(obj);
			        
					objDto.setLstSponsorTestChargesDto(lstSponsorTestChargesDto);
			         
			         
		   }catch (Exception e) {
			e.printStackTrace();
		}
		
		return objDto;
	}
}
