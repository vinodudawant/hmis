package com.hms.ehat.dao.impl;

import java.math.BigDecimal;
import java.security.Timestamp;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.PlatformTransactionManager;

import com.hms.administrator.dto.Beds;
import com.hms.administrator.dto.HallManagementDto;
import com.hms.dto.Treatment;
import com.hms.ehat.dao.IPDDao;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.ConfigurServicesDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatMentBeds;
import com.hms.ehat.service.ConfigurationServiceService;
import com.hms.ehat.service.RegService;
import com.hms.ipd.dao.BedManagementDao;

@Repository
public class IPDDaoImpl implements IPDDao {
	@Autowired
	SessionFactory sessionFactory;
	
	@Autowired
	ConfigurationServiceService configServiceService;
	
	@Autowired
	RegService regService;
	
	@Autowired
	BedManagementDao bedManagementDao;
	
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	SimpleDateFormat formatter4 = new SimpleDateFormat("yyyy-MM-dd");
	String todays_date4 = formatter4.format(currentDate.getTime());
	
	private PlatformTransactionManager transactionManager = null;

	public void setTransactionManager(PlatformTransactionManager transactionManager) {
		this.transactionManager = transactionManager;
	}

	@Override
	public HallManagementDto fetchWordNameList(Integer hallType) {

		List<HallManagementDto> list = new ArrayList<HallManagementDto>();
		HallManagementDto obj = new HallManagementDto();
		try {

			Criteria c = sessionFactory.getCurrentSession().createCriteria(HallManagementDto.class);
			c.add(Restrictions.eq("hall_type", Integer.toString(hallType)));
			list = c.list();
			obj.setHallList(list);
			return obj;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public HallManagementDto fetchNoOfBeds(Integer hallID) {
		System.err.println("hallId.............." + hallID);
		String sql="";
		 HallManagementDto obj = new HallManagementDto();
		 
		 Integer countAvailableBeds=0;
		 Integer countCleaningBeds=0;
		 Integer countAllocateBeds=0;
		 String sqlcount="";
		
		 sqlcount="select count(*) as countAvailable from beds where Hall_ID="+hallID+" and idbedstate='4' and deleted='N' and status='Y' ";
		 SQLQuery qcountAva= sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
		 countAvailableBeds=((Number) qcountAva.uniqueResult()).intValue();
		 
		 sqlcount="select count(*) as countCleaning from beds where Hall_ID="+hallID+" and idbedstate='2' and deleted='N' and status='Y' ";
		 SQLQuery qcountClean= sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
		 countCleaningBeds=((Number) qcountClean.uniqueResult()).intValue();
		 
		 sqlcount="select count(*) as countAllocate from beds where Hall_ID="+hallID+" and idbedstate='3' and deleted='N' and status='Y' ";
		 SQLQuery qcountAllocate= sessionFactory.getCurrentSession().createSQLQuery(sqlcount);
		 countAllocateBeds=((Number) qcountAllocate.uniqueResult()).intValue();
		 
		 
		 obj.setCountAvailableBeds(countAvailableBeds);
		 obj.setCountCleaningBeds(countCleaningBeds);
		 obj.setCountAllocateBeds(countAllocateBeds);
		 
		/*
		 * List<Beds> list = new ArrayList<Beds>(); HallManagementDto obj = new
		 * HallManagementDto(); try { obj = (HallManagementDto)
		 * sessionFactory.getCurrentSession().get(HallManagementDto.class, hallId);
		 * 
		 * Criteria c = sessionFactory.getCurrentSession().createCriteria(Beds.class);
		 * c.add(Restrictions.eq("hall_ID", hallId)); c.add(Restrictions.eq("status",
		 * "Y")); c.add(Restrictions.eq("deleted", "N")); list = c.list();
		 * obj.setBedsList(list); return obj;
		 * 
		 * } catch (Exception e) { e.printStackTrace(); } return obj;
		 */
		List<HallManagementDto> arrDefaultHall = new ArrayList<HallManagementDto>();

		try {

			if (hallID.equals("allBed")) {
			//	sql = "select * from hall where status='Y' and unit_id= "+unitId+" order by Htype";
				sql = "select * from hall where status='Y'  order by Htype";
			} else if (hallID.equals("allHallBed")) {
				sql = "select * from hall where status='Y'  order by Htype";
			} else {
				sql = "select * from hall where status='Y'  and Hall_ID= "
						+ hallID;
			}
			/*
			 * List<Map<String, Object>> hallDetails = getJdbcTemplate().queryForList(sql);
			 */
			
			SQLQuery q=    sessionFactory.getCurrentSession().createSQLQuery(sql);
			
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> hallDetails = q.list();
			         
			for (Map<String, Object> rs : hallDetails) {
				HallManagementDto objhallDetails = new HallManagementDto();
				List<Beds> arrDefaultBed = new ArrayList<Beds>();
				objhallDetails.setHall((Integer) rs.get("Hall_ID"));
				objhallDetails.setHallName((String) rs.get("Hname"));
				objhallDetails.setHall_type((String) rs.get("Htype"));
				String htypeid = (String) rs.get("Htype");
				objhallDetails.setHtypeName(findHallTypeNameById(htypeid));
				objhallDetails.setNumberOfBed((String) rs.get("Number_of_Beds"));
				/* objhallDetails.setA((String) rs .get("Available_Beds")); */
				
				objhallDetails.setLeasePreBed((String) rs.get("lease_per_bed"));

				sql = "SELECT b.*,tb.Treatment_ID,tb.isolation, tb.bedAllocatedFor, tb.In_Time"
					//	+ " FROM beds b  left join treatment_beds tb ON b.Bed_ID=tb.Bed_ID and tb.status != 'N' and  tb.Treatment_ID is not null"
					    + " FROM beds b  left join treatment_beds tb ON b.Bed_ID=tb.Bed_ID "
						+ " WHERE  b.status = 'Y'  and b.Hall_ID="+objhallDetails.getHall();
			
				/*
				 * List<Map<String, Object>> bedDetails = getJdbcTemplate().queryForList(sql,new
				 * Object[] { objhallDetails.getHall_ID() });
				 */
				
				 q=    sessionFactory.getCurrentSession().createSQLQuery(sql);
				q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
				
				List<Map<String, Object>> bedDetails = q.list();
				
				for (Map<String, Object> rs1 : bedDetails) {
					Beds objBedDetails = new Beds();
					/*
					 * objBedDetails.setAvailability((String) rs1
					 * .get("Availability"));
					 */
					objBedDetails.setBed_ID((Integer) rs1.get("Bed_ID"));
					objBedDetails.setBed_name((String) rs1.get("bed_name"));
					objBedDetails.setStatus((String) rs1.get("status"));
					objBedDetails.setAvailability(((String) rs1.get("idbedstate")));
					objBedDetails.setBedstate(((String) rs1.get("idbedstate")));
					objBedDetails.setIsolation((String) rs1.get("isolation"));

					// used ternary operator

					try {
						objBedDetails
								.setInDateTime((rs1.get("In_Time") == null) ? ("")
										: (((Timestamp) rs1.get("In_Time"))
												.toString()));
					} catch (Exception e) {
						objBedDetails.setInDateTime("");
					}

					if (((Integer) rs1.get("Treatment_ID")) != null
							&& !hallID.equals("allHallBed")) {

						objBedDetails.setTreatment_ID((Integer) rs1
								.get("Treatment_ID"));

						String bedAllocatedFor = (String) rs1
								.get("bedAllocatedFor");

						List<RegistrationDto> pat = fetchPatList(
								(Integer) rs1.get("Treatment_ID"),
								bedAllocatedFor);
						// System.out.println(pat);
						objBedDetails.setPatList(pat);
					}

					arrDefaultBed.add(objBedDetails);
					
					objhallDetails.setBedsList(arrDefaultBed);
				}

				arrDefaultHall.add(objhallDetails);
				
				obj.setHallList(arrDefaultHall);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return obj;

		
		
		
		
		
	}
	
	public String findHallTypeNameById(String htypeid) {

		String sql = "select * from hall_type where idhall_type ="+htypeid;
		String hTNM = "";
		/*
		 * List<Map<String, Object>> hallDetails = getJdbcTemplate().queryForList(sql,
		 * new Object[] { htypeid });
		 */
		try {
		SQLQuery q=	sessionFactory.getCurrentSession().createSQLQuery(sql);
		q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		
		List<Map<String, Object>> hallDetails = q.list();
		
		for (Map<String, Object> rs : hallDetails) {
			hTNM = (String) rs.get("hall_type_name");
		}
		}catch(Exception e) {
			e.printStackTrace();
		}
		return hTNM;
	}
	
	
	private List<RegistrationDto> fetchPatList(Integer treatId, String bedAllocatedFor) {
		
		//	System.err.println("Tid => "+treatId+"  bedAllocafor => "+bedAllocatedFor);
			
			List arrPat = null;
			try {
			String sql="SELECT ehat_patient.patient_id as patient_id, ehat_patient.f_name as fName,ehat_patient.m_name as mName, "
			+ " ehat_patient.l_name as lName, ehat_patient.mrnno as mr_no, ehat_patient.prefix as title,"
		    +" date(ehat_patient.created_date_time) as reg_date, ehat_patient.age, ehat_patient.gender as sex, date(ehat_treatment.updated_date_time) as TendDate,"
		    + " DATEDIFF(now(), ehat_treatment.created_date_time) as admitedDays, ehat_treatment.doctor_id as doctor_id, ifnull(ehat_bill_master.source_type_id,0) as source_type_id,"
			+ " ehat_bill_master.charges_master_slave_id as charges_master_slave_id, ehat_charges_master_slave.category_name as category_name"
			
			+ " FROM ehat_treatment left join ehat_patient ON (ehat_treatment.patient_id = ehat_patient.patient_id)"
		    + " left join ehat_bill_master ON(ehat_treatment.treatment_id=ehat_bill_master.treatment_id)	left join ehat_charges_master_slave ON (ehat_bill_master.charges_master_slave_id = ehat_charges_master_slave.id)"
		    + " where ehat_treatment.treatment_id ="+treatId;
			
			
			/*
			 * List<Map<String, Object>> patDetails = getJdbcTemplate().queryForList(sql,
			 * new Object[] { treatId });
			 */
			SQLQuery q=	sessionFactory.getCurrentSession().createSQLQuery(sql);
			q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			
			List<Map<String, Object>> patDetails = q.list();
			
		
			arrPat = fetchPatDetails(patDetails, bedAllocatedFor);
	}catch(Exception e) {
		e.printStackTrace();
	}
			return arrPat;

		}

		private List fetchPatDetails(List<Map<String, Object>> patDetails,	String bedAllocatedFor) {
			String sql="";
			
			List<RegistrationDto> arrPat = new ArrayList<RegistrationDto>();
			for (Map<String, Object> rs : patDetails) {

				RegistrationDto objPat = new RegistrationDto();
				objPat.setPrefix((String) rs.get("title"));
				objPat.setfName((String) rs.get("fName"));
				objPat.setmName((String) rs.get("mName"));
				objPat.setlName((String) rs.get("lName"));
				objPat.setCreatedDateTime((Date) rs.get("reg_date"));
				
				objPat.setMrnno((String) rs.get("mr_no"));
				objPat.setAge((Integer) rs.get("age"));
				objPat.setGender((String) rs.get("sex"));
				objPat.setPatientId((Integer)rs.get("patient_id"));
				objPat.setAdmitedDays(((Number) rs.get("admitedDays")).intValue());
				objPat.setSourceTypeId( ((Number)rs.get("source_type_id")).intValue() );
				objPat.setSponsorName((String) rs.get("category_name"));
				String docIDs=(String) rs.get("doctor_id");
				
				if(docIDs.equalsIgnoreCase("") || docIDs.equalsIgnoreCase("0"))
				{
					objPat.setDocName("-");
				}else
				{
							sql="SELECT  ifnull(GROUP_CONCAT(doc_name SEPARATOR ', '),'') as docname"
							+" FROM doctor where Doctor_ID in("+docIDs+")";
							
							/*String docName=getJdbcTemplate().queryForObject(sql,String.class);*/
							
					SQLQuery qname=		sessionFactory.getCurrentSession().createSQLQuery(sql);
					String docName=(String) qname.uniqueResult();
							objPat.setDocName(docName);
				}
				
				
			
				// System.err.println((String) rs.get("fName"));

				TreatMentBeds objTB = new TreatMentBeds();
				objTB.setBedAllocatedFor(bedAllocatedFor);

				Treatment objTreatment = new Treatment();
				
				sql = "SELECT count(*) FROM sp_dic_master where sp_dic_master_id="+objTreatment.getSpecialDiscount();
				
				/*int count = getJdbcTemplate().queryForInt(sql,new Object[] { objTreatment.getSpecialDiscount() });*/
				
			     SQLQuery q=	sessionFactory.getCurrentSession().createSQLQuery(sql);
			     int count=  ((Number) q.uniqueResult()).intValue();
				
				String insuranceCmpny = "Self Pay";

				if (count > 0) {
					sql = "SELECT name FROM sp_dic_master where sp_dic_master_id="+objTreatment.getSpecialDiscount();
					
					/*insuranceCmpny = (String) getJdbcTemplate().queryForObject(sql,
							new Object[] { objTreatment.getSpecialDiscount() },
							String.class);*/
					 SQLQuery q1=	sessionFactory.getCurrentSession().createSQLQuery(sql);
					 insuranceCmpny= (String) q1.uniqueResult();
					
				}

				objTreatment.setInsuranceCmpny(insuranceCmpny);
				objPat.setObjTreatment(objTreatment);
				objPat.setObjtreatmentbeds(objTB);
				arrPat.add(objPat);
			}

			return arrPat;
		}

	

	@Override
	public String allocateBedToPatient(TreatMentBeds obj, String BedAllocStatus, String DallocBedId,
			String billableBedType, String patientType) {
		String msg = "";

	
		msg = allocBedsNew(obj.getBedId(), obj.getTreatmentId(),BedAllocStatus, DallocBedId, obj.getIsolation(), "P", billableBedType, 1, 1);
		 
		//new flow
		//if (BedAllocStatus.equals("new")) 
			//msg=bedManagementDao.allocateBed(obj.getBed_ID(), obj.getTreatment_ID(), BedAllocStatus, DallocBedId,obj.getIsolation(), patientType, billableBedType, 1, 1);
		//else
			//msg=bedManagementDao.shiftBed(obj.getBed_ID(), obj.getTreatment_ID(), BedAllocStatus, DallocBedId,obj.getIsolation(), patientType, billableBedType, 1, 1);
		//new flow end
		
		return msg;
	}

	public synchronized String allocBedsNew(int bedID, int tid, String bedAllocStatus, String dallocBedId,
			String isolation, String patientType, String billableBedType, Integer userId, Integer unitId) {

		java.util.Calendar currentDate = java.util.Calendar.getInstance();

		String msg = "";
		/*
		 * TransactionDefinition def = new DefaultTransactionDefinition();
		 * System.err.println("def........"+def); TransactionStatus status =
		 * transactionManager.getTransaction(def);
		 * System.err.println("status........"+status);
		 */
		double other_amount = 0.0;
		double other_nur = 0.0;
		String sql = "";
		if (bedAllocStatus.equals("new")) {

			try {

				// sql="select count(bill_details_id) FROM ehat_bill_details_ipd where
				// service_id=3 and on_bed_flag='Y' and deleted='N' and cancle='N' and
				// treatment_id="+tid;
				sql = "select count(Treatment_ID) FROM treatment_beds where (Bed_ID=" + bedID + " or Treatment_ID="
						+ tid + ") and status='Y' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int isBedAllocatedCount = ((Number) countQuery.uniqueResult()).intValue();

				if (isBedAllocatedCount == 0) {

					// added by Tarique Aalam
					sql = "SELECT source_type_id FROM ehat_bill_master  where treatment_id="+tid;
					
					/*
					 * int sourceTypeId = (Integer) getJdbcTemplate().queryForObject(sql, new
					 * Object[] { tid }, Integer.class);
					 */
					
				SQLQuery q=	sessionFactory.getCurrentSession().createSQLQuery(sql);
				int sourceTypeId=(int) q.uniqueResult();

					if (patientType.equals("R")) {

					} else {// p

						// String s = " select count(*) from treatment_beds where (Treatment_ID=? or
						// Bed_ID=?) and status='Y' and bedAllocatedFor='P' ";
						/*
						 * Stirng s=
						 * "SELECT count(*) FROM ehatenterprise2017_noble_10_11.ehat_bill_details_ipd" +
						 * "where treatment_id=36 and  service_id=3 and on_bed_flag='Y' ";
						 */

						/*
						 * String s ="SELECT count(*) FROM ehat_bill_details_ipd"
						 * +" where  service_id=3 and sub_service_id	=? and on_bed_flag='Y'";
						 * 
						 * int count = getJdbcTemplate().queryForInt(s,new Object[] { bedID });
						 * 
						 * 
						 */
						int count = 0;

						String s = "SELECT count(*) FROM ehat_bill_details_ipd"
								+ " where  service_id=3 and sub_service_id	=" + bedID + " and on_bed_flag='Y'";
						SQLQuery hquery = sessionFactory.getCurrentSession().createSQLQuery(s);
						count = ((Number) hquery.uniqueResult()).intValue();

						if (count == 0) {
							/*
							 * String sql =
							 * "update treatment_beds set status='N',Out_Time=?,shifted_By=?,shifted_date_time=?  where Bed_ID=? and status='Y'"
							 * ; getJdbcTemplate().update(sql, new Object[] {currentDate.getTime(),userId,
							 * currentDate.getTime(), bedID });
							 */
							String sql1 = "update treatment_beds set status='N',Out_Time=now(),shifted_By=" + userId
									+ ",shifted_date_time=now()  where Bed_ID=" + bedID + " and status='Y'";

							SQLQuery traetquery = sessionFactory.getCurrentSession().createSQLQuery(sql1);
							traetquery.executeUpdate();
						}

						if (count > 0) {
							msg = "This Bed Is Already Allocated For Patient.";
						} else {

							TreatMentBeds obj=new TreatMentBeds();
							String statusy = "Y";

							/*
							 * String sql =
							 * "insert into treatment_beds(Treatment_ID,Bed_ID,status,In_Time,isolation,bedAllocatedFor,idBillableBedType,created_By,created_date_time) values(?,?,?,?,?,?,?,?,?)"
							 * ;
							 * 
							 * getJdbcTemplate().update(sql,new Object[] { tid,//1496 bedID,//350
							 * statusy,//Y currentDate.getTime() startDate current time , isolation, //0
							 * patientType,//'P' as paitne billableBedType, //0 userId,
							 * currentDate.getTime() });
							 */
							
							obj.setBedId(bedID);
							obj.setTreatmentId(tid);
							obj.setStatus(statusy);
							obj.setIn_Time(currentDate.getTime());
							obj.setIsolation(isolation);
							obj.setBedAllocatedFor(patientType);
							obj.setIdBillableBedType(billableBedType);
							obj.setCreatedBy(userId);
							obj.setCreatedDateTime(currentDate.getTime());
							
							sessionFactory.getCurrentSession().merge(obj);

							int treatment_beds_id = 0;
							String sqlfor_treatment_beds_id = "";
							sqlfor_treatment_beds_id = "select last_insert_id()";
						
							/*
							 * treatment_beds_id =
							 * getJdbcTemplate().queryForInt(sqlfor_treatment_beds_id);/// 222 max id /// of
							 * it
							 */
							
							SQLQuery qtreat=sessionFactory.getCurrentSession().createSQLQuery(sqlfor_treatment_beds_id);
							treatment_beds_id=((Number) qtreat.uniqueResult()).intValue();
							
							String bedr = "";
							String serop = "";
							int billId = 0;
							int corporateAccountId = 0;
							// double other_amount=0.0;
							// double other_nur=0.0;
							// Code for changes in ipdbill_bedcharges_table

							// int idipdbill_bedcharges = 0;
							// int idipdbill_bedcharges_slave = 0;
							Date bedTime = null;
							double charges = 0;

							float allocatedDays = 0;
							String billing_entry_flag = "";
							String nursingcharges_billing_entry_flag = "";
							float nursingcharges_quantity = 0;
							double prevcharges = 0;
							double prevnursingcharges = 0;
							String prevstatus = "";
							
							/*
							 * sql =
							 * "select b.bill_id,t.* from bill_master b,treatment t where t.Treatment_ID=b.Treatment_ID and t.Treatment_ID ="
							 * +tid;
							 */
						
							/*
							 * List<Map<String, Object>> ipdBillList = getJdbcTemplate().queryForList(sql,
							 * new Object[] { tid });
							 */
							
							/*
							 * SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery( sql);
							 * 
							 * query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							 * 
							 * List<Map<String, Object>> ipdBillList = query.list();
							 * 
							 * for (Map<String, Object> rs : ipdBillList) { billId = (Integer)
							 * rs.get("bill_id"); corporateAccountId = (Integer) rs.get("sp_dic_master_id");
							 * 
							 * if (!((String) rs.get("bedridden")).equals("")) { bedr = (String)
							 * rs.get("bedridden"); } else { bedr = "N"; }
							 * 
							 * if (!((String) rs.get("seropositive")).equals("")) { serop = (String)
							 * rs.get("seropositive"); } else { serop = "N"; }
							 * 
							 * }
							 * 
							 */							float bedrcharges = 0;

							float serocharges = 0;

							String sql7 = null;
							String leaseRate = "0";
							float lease_per_bed_isolation = 0;
							double nursingCharges = 0.0;

							if (corporateAccountId == 0) {
								// for Non Sponser

								if (Integer.parseInt(billableBedType) == 0) {

									sql = "select lease_per_bed,lease_per_bed_isolation from hall inner join beds on hall.Hall_ID = beds.Hall_ID where beds.Bed_ID ="+bedID;
									/*
									 * List<Map<String, Object>> bedDetails = getJdbcTemplate().queryForList(sql,
									 * new Object[] { bedID });
									 */
									
									SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
									queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									
									List<Map<String, Object>> bedDetails = queryb.list();
									if (bedDetails.size() > 0) {
										for (Map<String, Object> rs : bedDetails) {
											leaseRate = (String) rs.get("lease_per_bed");

											if (isolation.equals("1")) {// isolation
																		// charges
												lease_per_bed_isolation = (Float) rs.get("lease_per_bed_isolation");
												sql7 = "select ifnull((select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
														+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'Y' and beds.Bed_ID = "
														+ bedID + " LIMIT 1),0) as medical_team ";
											} else {// normal nusrsing charge ,
													// Medical team
												sql7 = " select ifnull(( select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
														+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'N' and beds.Bed_ID = "
														+ bedID + " LIMIT 1 ),0) as medical_team ";
											}
											//nursingCharges = getJdbcTemplate().queryForInt(sql7);
											
											SQLQuery querynurshing = sessionFactory.getCurrentSession().createSQLQuery(sql7);
											nursingCharges=(float) querynurshing.uniqueResult();
										}
									} else {// if nursing charge not found then
											// default zero
										leaseRate = "0";
										lease_per_bed_isolation = 0;
										nursingCharges = 0;
									}

								} else {
									sql = "select lease_per_bed,lease_per_bed_isolation from hall where Hall_ID ="+billableBedType;

									/*
									 * List<Map<String, Object>> bedDetails = getJdbcTemplate().queryForList(sql,
									 * new Object[] { billableBedType });
									 */
									
									SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
									queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									
									List<Map<String, Object>> bedDetails = queryb.list();
									
									if (bedDetails.size() > 0) {
										for (Map<String, Object> rs : bedDetails) {
											leaseRate = (String) rs.get("lease_per_bed");

											if (isolation.equals("1")) {
												lease_per_bed_isolation = (Float) rs.get("lease_per_bed_isolation");
											}
										}
									} else {
										leaseRate = "0";
										lease_per_bed_isolation = 0;
									}
								}

								if (bedr.equals("Y")) {// bedr=N default
									sql = "select bedriddencharges from hospital ";
									/* bedrcharges = getJdbcTemplate().queryForInt(sql); */
									
									SQLQuery querybedri = sessionFactory.getCurrentSession().createSQLQuery(sql);
									bedrcharges=(float) querybedri.uniqueResult();
								}
								if (serop.equals("Y")) {// serop=N default
									sql = "select servocharges from hospital ";
									/* serocharges = getJdbcTemplate().queryForInt(sql); */
									
									SQLQuery querybedri = sessionFactory.getCurrentSession().createSQLQuery(sql);
									serocharges=(float) querybedri.uniqueResult();
								}

								nursingCharges = nursingCharges + (int) bedrcharges + (int) serocharges;

								// System.err.println("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$--->leaseRate="+leaseRate+"
								// nursingCharges="+nursingCharges);
								// double charges = 0;
								// float pay = 0;
								float cpay = 0;
								float nur_pay = 0;
								float nur_copay = 0;

								if (isolation.equals("1")) {
									charges = lease_per_bed_isolation;
								} else {
									charges = Double.parseDouble(leaseRate);
								}

								other_amount = charges;
								other_nur = nursingCharges;
								sql = "SELECT bill_id FROM ehat_bill_master where treatment_id="+tid;
								
								/*
								 * int biId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid
								 * }, Integer.class);
								 */
								
								SQLQuery billidQ=sessionFactory.getCurrentSession().createSQLQuery(sql);
								int biId =((Number) billidQ.uniqueResult()).intValue();
								

								sql = "SELECT patient_id FROM ehat_treatment  where treatment_id="+tid;
								/*
								 * int pId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid
								 * }, Integer.class);
								 */
								
								SQLQuery pIdQ=sessionFactory.getCurrentSession().createSQLQuery(sql);
								int pId=((Number) pIdQ.uniqueResult()).intValue();

								other_amount = charges;
								other_nur = nursingCharges;

								// bytk
								// charges_master_slave_id
								sql = "SELECT charges_master_slave_id FROM ehat_bill_master  where treatment_id="+tid;
								/*
								 * int sponsrLeaf = (Integer) getJdbcTemplate().queryForObject(sql, new Object[]
								 * { tid }, Integer.class);
								 */
								
								SQLQuery sponsrLeafQ=sessionFactory.getCurrentSession().createSQLQuery(sql);
								int sponsrLeaf=((Number) sponsrLeafQ.uniqueResult()).intValue();
								System.out.println(sponsrLeaf);

								sql = "select ifnull((SELECT concat(h.ehat_hallid,'/', ht.ehat_halltype_id) as hidhtypid FROM beds b INNER JOIN hall  h ON b.Hall_ID=h.Hall_ID"
										+ " INNER JOIN hall_type  ht ON h.Htype=ht.idhall_type" + " where b.Bed_ID="+bedID+"),0) as hidhtypid" ;

								/*
								 * String htypidId = (String) getJdbcTemplate().queryForObject(sql, new Object[]
								 * { bedID }, String.class);
								 */
								
								SQLQuery htypidIdQ=sessionFactory.getCurrentSession().createSQLQuery(sql);
								String htypidId=(String) htypidIdQ.uniqueResult();

								String dateSp[] = htypidId.split("/");
								//Integer hallId = Integer.parseInt(dateSp[0]);
								//Double hType = Double.parseDouble(dateSp[1]);
								Integer hallId=0;
								System.err.println("dateSp.length..."+dateSp.length);
								for(int i=0; i<dateSp.length;i++) {
									 hallId = Integer.parseInt(dateSp[i]);
									Double hType = Double.parseDouble(dateSp[i]);
								}

								// Added By Bilal For Bed and medical team charges
								int chargesId = 1;
								int mainhal = 2;
								int isComServId = 0;
								int isComServlastId = 0;
								int hallleaf = hallId;

								List<ConfigurServicesDto> lts = new ArrayList<ConfigurServicesDto>();
								lts = configServiceService.fetchMedicalTeamCharges(chargesId, sponsrLeaf, mainhal,
										hallleaf, isComServId, isComServlastId);
								double hallcharges = 0.0;
								double medicalteamcharges = 0.0;
								if (lts.size() > 0) {
									hallcharges = lts.get(0).getHallCharges();
									medicalteamcharges = lts.get(0).getMedicalCharges();
									if (hallcharges > -1) {
										other_amount = hallcharges;
									}
									if (medicalteamcharges > -1) {
										other_nur = medicalteamcharges;
									}
								}

								// Emergency Charges code Start

								// check for holiday=today?
								Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
										"select count(*) from hospital_holiday where date=" + todays_date4);

								Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();

								// check for sunday today?
								SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
								String currentDay = dayFormatter.format(currentDate.getTime());

								if (currentDay.equalsIgnoreCase("Sun") || countHoliday > 0 || chkEmergencyTimeNew()) {

									// fetch emergency percentage
									double emrChrPer = getEmergencyPerNew();

									charges = charges * (1 + emrChrPer / 100);

									nursingCharges = nursingCharges * (1 + emrChrPer / 100);

									other_amount = other_amount * (1 + emrChrPer / 100);

									other_nur = other_nur * (1 + emrChrPer / 100);
								}

								// Emergency Charges code End

								// bytk

								/*********
								 * @author touheed
								 * @modified 14-Sep-2017
								 * @reason : New Follow for noble
								 */
								// inserting into billing for noble

								sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id="+tid;
							
								/*
								 * int chargesSlaveId = (Integer) getJdbcTemplate().queryForObject(sql, new
								 * Object[] { tid }, Integer.class);
								 */
								
								SQLQuery chargeQ= sessionFactory.getCurrentSession().createSQLQuery(sql);
								int chargesSlaveId =((Number) chargeQ.uniqueResult()).intValue();

								int sponsorId = 0;
								if (chargesSlaveId > 0) {

									sponsorId = 1;
								}

								/*
								 * sql = "INSERT INTO ehat_bill_details_ipd(amount, bill_id, " +
								 * "concession, created_by, created_date_time, discount, doctor_id, patient_cat_id, "
								 * + "patient_id, quantity, rate, service_id, source_type_id, sponsor_cat_id, "
								 * +
								 * "sub_service_id, unit_id,treatment_id,co_pay,pay,department_id,other_amount,other_co_pay,other_concession,other_pay,"
								 * + "other_rate,on_bed_flag,emrgency_percentage,charges_slave_id,sponsor_id)" +
								 * " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)"
								 * ;
								 */

								/*
								 * getJdbcTemplate().update(sql, new Object[] { charges, biId, 0, userId,
								 * currentDate, 0, 0, 0, pId, 1, charges, 3, sourceTypeId, 0, // 3 for Bed
								 * Charges bedID, unitId, tid, charges, 0, 2, other_amount, 0, 0, other_amount,
								 * other_amount, "Y", 0, chargesSlaveId, sponsorId });
								 */
								BillDetailsIpdDto  obj1=new BillDetailsIpdDto();
								obj1.setAmount(charges);
								obj1.setBillId(biId);
								obj1.setConcession(0.0);
								obj1.setCreatedBy(userId);
								//obj1.setCreatedDateTime(currentDate);
								obj1.setDiscount(0.0);
								obj1.setDoctorId(0);
								obj1.setPatientCatId(0.0);
								obj1.setPatienttId(pId);
								obj1.setQuantity(1);
								obj1.setRate(charges);
								obj1.setServiceId(3);
								obj1.setSourceTypeId(sourceTypeId);
								obj1.setSponsorCatId(0);
								obj1.setSubServiceId( bedID);
								
								obj1.setUnitId(unitId);
								obj1.setTreatmentId(tid);
								obj1.setCoPay(charges);
								obj1.setPay(0.0);
								obj1.setDepartmentId(2);
								obj1.setOtherAmount(other_amount);
								obj1.setOtherCoPay(0.0);
								obj1.setOtherConcession(0.0);
								obj1.setOtherCoPay(other_amount);
								obj1.setOtherRate(other_amount);
								char c='Y';
								obj1.setOnBedFlag(c);
								obj1.setEmrPer(0.0);
								obj1.setChargesSlaveId(chargesSlaveId);
								obj1.setSponsorId(sponsorId);
								
								sessionFactory.getCurrentSession().merge(obj1);
								

								// 'nursing charges
								/*
								 * sql = "INSERT INTO ehat_bill_details_ipd(amount, bill_id, " +
								 * "concession, created_by, created_date_time, discount, doctor_id, patient_cat_id, "
								 * + "patient_id, quantity, rate, service_id, source_type_id, sponsor_cat_id, "
								 * +
								 * "sub_service_id, unit_id,treatment_id,co_pay,pay,department_id,other_amount,other_co_pay,other_concession,other_pay,"
								 * + "other_rate,on_bed_flag,emrgency_percentage,charges_slave_id,sponsor_id)" +
								 * " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)"
								 * ;
								 * 
								 * getJdbcTemplate().update(sql, new Object[] { nursingCharges, biId, 0, userId,
								 * currentDate, 0, 0, 0, pId, 1, nursingCharges, 3, sourceTypeId, 0, // 3 for
								 * Bed Charges 0, unitId, tid, nursingCharges, 0, 2, other_nur, 0, 0, other_nur,
								 * other_nur, "Y", 0, chargesSlaveId, sponsorId });
								 */
								
								BillDetailsIpdDto  obj2=new BillDetailsIpdDto();
								obj2.setAmount(nursingCharges);
								obj2.setBillId(biId);
								obj2.setConcession(0.0);
								obj2.setCreatedBy(userId);
								//obj1.setCreatedDateTime(currentDate);
								obj2.setDiscount(0.0);
								obj2.setDoctorId(0);
								obj2.setPatientCatId(0.0);
								obj2.setPatienttId(pId);
								obj2.setQuantity(1);
								obj2.setRate(nursingCharges);
								obj2.setServiceId(3);
								obj2.setSourceTypeId(sourceTypeId);
								obj2.setSponsorCatId(0);
								obj2.setSubServiceId( bedID);
								
								obj2.setUnitId(unitId);
								obj2.setTreatmentId(tid);
								obj2.setCoPay(nursingCharges);
								obj2.setPay(0.0);
								obj2.setDepartmentId(2);
								obj2.setOtherAmount(other_nur);
								obj2.setOtherCoPay(0.0);
								obj2.setOtherConcession(0.0);
								obj2.setOtherCoPay(other_nur);
								obj2.setOtherRate(other_nur);
								char cc='Y';
								obj2.setOnBedFlag(cc);
								obj2.setEmrPer(0.0);
								obj2.setChargesSlaveId(chargesSlaveId);
								obj2.setSponsorId(sponsorId);
								
								sessionFactory.getCurrentSession().merge(obj2);
								
								
								
								
								

							}

							String sql1 = " update beds set idbedstate =3 where Bed_ID ="+bedID ;
							/* getJdbcTemplate().update(sql1, new Object[] { bedID }); */
							
							SQLQuery qUpdate=  sessionFactory.getCurrentSession().createSQLQuery(sql1);
							qUpdate.executeUpdate();

							msg = "Bed Allocated Successfully.";

							ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
							String smsSendNewFlow = (resourceBundle.getObject("smsSendNewFlow").toString());
							if (smsSendNewFlow.equalsIgnoreCase("on")) {

								// sendSMSDoctorCK(tid);

							}
							// Irfan Khan registration and consultation entry Starts
							BillDetailsIpdDto billDetailsIpdDto = new BillDetailsIpdDto();

							billDetailsIpdDto.setBillDetailsId(0);
							billDetailsIpdDto.setTreatmentId(tid);

							sql = "SELECT * FROM ehat_bill_master where treatment_id ="+tid+" and deleted='N' ";
							
							/*
							 * List<Map<String, Object>> billMasterList =
							 * getJdbcTemplate().queryForList(sql, new Object[] { tid });
							 */
							
							SQLQuery queryb = sessionFactory.getCurrentSession().createSQLQuery(sql);
							queryb.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
							
							List<Map<String, Object>> billMasterList = queryb.list();

							for( Map<String, Object> rs : billMasterList) {
								billDetailsIpdDto.setPatienttId((Integer) rs.get("patient_id"));
								billDetailsIpdDto.setBillId((Integer) rs.get("bill_id"));
								billDetailsIpdDto.setSourceTypeId((Integer) rs.get("source_type_id"));
								billDetailsIpdDto.setDepartmentId((Integer) rs.get("department_id"));
								billDetailsIpdDto.setUnitId((Integer) rs.get("unit_id"));
								billDetailsIpdDto.setSponsorId((Integer) rs.get("source_type_id"));
								billDetailsIpdDto.setChargesSlaveId((Integer) rs.get("charges_master_slave_id"));
								billDetailsIpdDto.setCreatedBy((Integer) rs.get("created_by"));

							}

							String docIdsQuery = "SELECT doctor_id FROM ehat_treatment where deleted='N' and treatment_id="
									+ tid;

							/*String docIdsRes = (String) getJdbcTemplate().queryForObject(docIdsQuery, String.class);*/
							
					SQLQuery querydoc=	sessionFactory.getCurrentSession().createSQLQuery(docIdsQuery);
					String docIdsRes=(String) querydoc.uniqueResult();

							String queryType = "insert";

							String markQuery = "SELECT count(treatment_id) as treatment_count FROM ehat_treatment where t_flag='N' and patient_id="
									+ billDetailsIpdDto.getPatienttId();

							/*Integer treatment_count = (Integer) getJdbcTemplate().queryForInt(markQuery);*/
							
							SQLQuery markQueryQ=	sessionFactory.getCurrentSession().createSQLQuery(markQuery);
							Integer treatment_count=	((Number) markQueryQ.uniqueResult()).intValue();

							if (treatment_count > 0) {
								queryType = "markvisit";
							}
							int billDetailsIpdId = regService.saveBillDetailsIpd(billDetailsIpdDto,
									billDetailsIpdDto.getCreatedBy(), queryType, docIdsRes);

							System.err.println("heyy==" + billDetailsIpdId);
							// Irfan Khan registration and concultation entry Ends
							/*********
							 * @author touheed
							 * @modified 14-Sep-2017
							 * @reason : New Follow for noble
							 */
							// Added by vinod start

							ResourceBundle resourceBundleEhat = ResourceBundle
									.getBundle("EhatEnterpriseConfigurationFile");
							int servId = Integer.parseInt(resourceBundleEhat.getObject("adminServId").toString());
							int subServId = Integer.parseInt(resourceBundleEhat.getObject("adminSubServId").toString());
							if (masterConfigAccess(1, 2, servId)) {

								sql = "SELECT bill_id FROM ehat_bill_master where treatment_id="+tid;
								
								/*int biId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid },
										Integer.class);*/
								
								SQLQuery q11= sessionFactory.getCurrentSession().createSQLQuery(sql);
								int biId=((Number) q11.uniqueResult()).intValue();

								sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id="+tid;
								
								/*int chargesSlaveId = (Integer) getJdbcTemplate().queryForObject(sql,
										new Object[] { tid }, Integer.class);*/
								
								SQLQuery charhesq= sessionFactory.getCurrentSession().createSQLQuery(sql);
								int chargesSlaveId=	((Number) charhesq.uniqueResult()).intValue();
								

								sql = "SELECT patient_id FROM ehat_treatment  where treatment_id="+tid;
								
								/*int pId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid },
										Integer.class);*/
								
								SQLQuery pidq= sessionFactory.getCurrentSession().createSQLQuery(sql);
								int pId=	((Number) pidq.uniqueResult()).intValue();

								sql = "SELECT charges FROM ehat_subservice where id=" + subServId + "";
								
								/*double adminCharges = (Double) getJdbcTemplate().queryForObject(sql, Double.class);*/
								
								SQLQuery adminq= sessionFactory.getCurrentSession().createSQLQuery(sql);
								double adminCharges=	(double) adminq.uniqueResult();

								int sponsorId = 0;
								if (chargesSlaveId > 0) {

									sponsorId = 1;
								}

								/*sql = "INSERT INTO ehat_bill_details_ipd(amount, bill_id, "
										+ "concession, created_by, created_date_time, discount, doctor_id, patient_cat_id, "
										+ "patient_id, quantity, rate, service_id, source_type_id, sponsor_cat_id, "
										+ "sub_service_id, unit_id,treatment_id,co_pay,pay,department_id,on_bed_flag,first_admin_chrg,charges_slave_id,sponsor_id)"
										+ " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";*/

								/*getJdbcTemplate().update(sql,
										new Object[] { 0, biId, 0, userId, currentDate, 0, 0, 0, pId, 1, 0, servId,
												sourceTypeId, 0, // 20 for admin service
												subServId, unitId, tid, 0, 0, 2, "N", adminCharges, chargesSlaveId,
												sponsorId });// 42 for admin sub service
*/							
							
								BillDetailsIpdDto obj1=new BillDetailsIpdDto();
								obj1.setAmount(0.0);
								obj1.setBillId(biId);
								obj1.setConcession(0.0);
							   obj1.setCreatedBy(userId);
							   //obj1.setCreatedDateTime(currentDate);
							   obj1.setDiscount(0.0);
							   obj1.setDoctorId(0);
							   obj1.setPatientCatId(0);
							   obj1.setPatienttId(pId);
							   obj1.setQuantity(1);
							   obj1.setRate(0.0);
							   obj1.setServiceId(servId);
							   obj1.setSourceTypeId(sourceTypeId);
							   obj1.setSponsorCatId(0);
							   obj1.setSubServiceId(subServId);
							   obj1.setUnitId(unitId);
							   obj1.setTreatmentId(tid);
							   obj1.setCoPay(0.0);
							   obj1.setPay(0.0);
							   obj1.setDepartmentId(2);
							   char c='N';
							   obj1.setOnBedFlag(c);
							   obj1.setFirstAdminChrg(adminCharges);
							   obj1.setChargesSlaveId(chargesSlaveId);
							   obj1.setSponsorId(sponsorId);
							   
							   sessionFactory.getCurrentSession().merge(obj1);
							
							}

							sql = "select ifnull(sum(amount),0) from ehat_bill_details_ipd where treatment_id=" + tid
									+ " and deleted='N' and cancle='N' ";
							
							/*double totBill = getJdbcTemplate().queryForObject(sql, Double.class);*/
							
						SQLQuery q12=	sessionFactory.getCurrentSession().createSQLQuery(sql);
						double totBill=(double) q12.uniqueResult();

							sql = "update ehat_bill_master set total_bill="+totBill+" where treatment_id="+tid;
							
							/*getJdbcTemplate().update(sql, new Object[] { totBill, tid });*/
							
							SQLQuery q123=sessionFactory.getCurrentSession().createSQLQuery(sql);
							q123.executeUpdate();

							// Added by vinod end

						}

					}

					updateConsultationChargesIpd(tid, "new");

					//transactionManager.commit(status);

				} else {

					msg = "Bed already allocated to this patient.";
				}
			} catch (Exception e) {
				System.out.println("database error...could not insert: " + e.getMessage());
				e.printStackTrace();
				//transactionManager.rollback(status);
			}

		} else if (bedAllocStatus.equals("old")) {
			try { // added by Tarique Aalam

				sql = "select count(Treatment_ID) FROM treatment_beds where (Bed_ID=" + bedID + " or Treatment_ID="
						+ tid + ") and status='Y' ";
				Query countQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				int isBedAllocatedCount = ((Number) countQuery.uniqueResult()).intValue();

				String sqlPhycal = "select ifnull(count(treatment_id),0) as treat_count from ehat_treatment where phydis_flag='Y' and treatment_id="
						+ tid;
				Query sqlPhycalQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlPhycal);
				int countPhysical = ((Number) sqlPhycalQuery.uniqueResult()).intValue();

				if (isBedAllocatedCount == 1 && countPhysical == 0) {

					sql = "SELECT source_type_id FROM ehat_bill_master  where treatment_id="+tid;
					
					/*int sourceTypeId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid },
							Integer.class);*/
					
				SQLQuery q=	sessionFactory.getCurrentSession().createSQLQuery(sql);
				int sourceTypeId=	((Number) q.uniqueResult()).intValue();

					if (patientType.equals("R")) {

					} else {

						String s = "select count(*) from treatment_beds where Bed_ID="+dallocBedId+" and Treatment_ID="+tid+" and status='Y' and bedAllocatedFor='P' ";
						
						/*int a = getJdbcTemplate().queryForInt(s, new Object[] { dallocBedId, tid });*/
						
						SQLQuery qa=sessionFactory.getCurrentSession().createSQLQuery(s);
						int a=((Number) qa.uniqueResult()).intValue();

						if (a > 0) {
							String sql11 = "update treatment_beds set status='N',Out_Time=now(),shifted_By="+userId+",shifted_date_time=now()  where Bed_ID="+dallocBedId+" and status='Y'";
							/*getJdbcTemplate().update(sql,
									new Object[] { currentDate.getTime(), userId, currentDate.getTime(), dallocBedId });*/
							
							
						SQLQuery qq=	sessionFactory.getCurrentSession().createSQLQuery(sql11);
						qq.executeUpdate();
							

							String sql1 = "update beds set idbedstate = 2  where Bed_ID ="+dallocBedId;
							/*getJdbcTemplate().update(sql1, new Object[] { dallocBedId });*/
							
							SQLQuery q1=	sessionFactory.getCurrentSession().createSQLQuery(sql1);
							q1.executeUpdate();
								

							// change current position of bed ie N to that bed of patient @Touheed
							String ipdBill = "update ehat_bill_details_ipd set on_bed_flag ='N' where service_id=3 and sub_service_id ="+dallocBedId+" and treatment_id="+tid;
							
							/*getJdbcTemplate().update(ipdBill, new Object[] { dallocBedId, tid });*/
							
							SQLQuery q2=	sessionFactory.getCurrentSession().createSQLQuery(ipdBill);
							q2.executeUpdate();
							

							// change current position of bed ie N to that bed of patient for nursing
							// @Touheed
							
							String ipdBill1 = "update ehat_bill_details_ipd set on_bed_flag ='N' where service_id=3 and sub_service_id = 0 and treatment_id="+tid;
							/*getJdbcTemplate().update(ipdBill1, new Object[] { tid });*/
							
							SQLQuery q3=	sessionFactory.getCurrentSession().createSQLQuery(ipdBill1);
							q3.executeUpdate();

							// change current position of bed ie N to that bed of patient@Touheed
							String sd = "select count(*) from treatment_beds where (Treatment_ID="+tid+" or Bed_ID="+bedID+") and status='Y' and bedAllocatedFor='P'  ";
							
							/*int count = getJdbcTemplate().queryForInt(sd, new Object[] { tid, bedID });*/
							
							SQLQuery q4=	sessionFactory.getCurrentSession().createSQLQuery(sd);
							int count=((Number) q4.uniqueResult()).intValue();
							
							if (count > 0) {

								msg = "This Bed Is Already Allocated For Patient.";
							} else {

								String statusy = "Y";
								
								/*sql = "insert into treatment_beds(Treatment_ID,Bed_ID,status,In_Time,isolation,bedAllocatedFor,idBillableBedType) values(?,?,?,?,?,?,?)";
								getJdbcTemplate().update(sql, new Object[] { tid, bedID, statusy, currentDate.getTime(),
										isolation, patientType, billableBedType });*/
								
								TreatMentBeds obj=new TreatMentBeds();
								obj.setBedId(bedID);
								obj.setTreatmentId(tid);
								obj.setStatus(statusy);
								obj.setIn_Time(currentDate.getTime());
								obj.setIsolation(isolation);
								obj.setBedAllocatedFor(patientType);
								obj.setIdBillableBedType(billableBedType);
								
								sessionFactory.getCurrentSession().merge(obj);

								String bedr = "";
								String serop = "";
								int corporateAccountId = 0;

								// Code for changes in ipdbill_bedcharges_table
								double charges = 0;
								float bedrcharges = 0;
								float serocharges = 0;

								String sql7 = null;
								String leaseRate = "0";
								float lease_per_bed_isolation = 0;
								double nursingCharges = 0.0;

								if (corporateAccountId == 0) {
									// for Non Sponser

									if (Integer.parseInt(billableBedType) == 0) {
										sql = "select lease_per_bed,lease_per_bed_isolation from hall inner join beds on hall.Hall_ID = beds.Hall_ID where beds.Bed_ID ="+bedID;
										/*List<Map<String, Object>> bedDetails = getJdbcTemplate().queryForList(sql,
												new Object[] { bedID });*/
										
										SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
										query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
										
										List<Map<String, Object>> bedDetails = query.list();

										if (bedDetails.size() > 0) {

											for (Map<String, Object> rs : bedDetails) {

												leaseRate = (String) rs.get("lease_per_bed");

												if (isolation.equals("1")) {// isolation charges

													lease_per_bed_isolation = (Float) rs.get("lease_per_bed_isolation");
													sql7 = "select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
															+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'Y' and beds.Bed_ID = "
															+ bedID + " limit 1";
												} else {// normal nusrsing charge , Medical team
													//CAST(hall_type_charges.medical_team AS DECIMAL(7,2) ) AS medical_team
													
													//sql7 = "select distinct hall_type_charges.medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
													sql7 = "select distinct CAST(hall_type_charges.medical_team AS DECIMAL(7,2) ) AS medical_team from beds inner join hall on beds.Hall_ID = hall.Hall_ID inner join hall_type on hall_type.idhall_type = hall.Htype"
															+ " inner join hall_type_charges on hall_type_charges.idhall_type = hall_type.idhall_type where hall_type_charges.isolation_flag = 'N' and beds.Bed_ID = "
															+ bedID + " limit 1";
												}
												/*nursingCharges = getJdbcTemplate().queryForInt(sql7);*/
												
												SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql7);
												nursingCharges=((BigDecimal) query1.uniqueResult()).doubleValue();
												
											}
										} else {// if nursing charge not found then default zero
											leaseRate = "0";
											lease_per_bed_isolation = 0;
											nursingCharges = 0;
										}
									}

									if (bedr.equals("Y")) {// bedr=N default
										sql = "select bedriddencharges from hospital ";
										/*bedrcharges = getJdbcTemplate().queryForInt(sql);*/
										SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
										bedrcharges=(float) query1.uniqueResult();
									}
									if (serop.equals("Y")) {// serop=N default
										sql = "select servocharges from hospital ";
									/*	serocharges = getJdbcTemplate().queryForInt(sql);*/
										SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
										serocharges=(float) query1.uniqueResult();
									}

									nursingCharges = nursingCharges + (int) bedrcharges + (int) serocharges;

									if (isolation.equals("1")) {
										charges = lease_per_bed_isolation;
									} else {
										charges = Double.parseDouble(leaseRate);
									}

									sql = "SELECT bill_id FROM ehat_bill_master where treatment_id="+tid;
									
									/*int biId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid },
											Integer.class);
											
											
									 	*/
									SQLQuery query1 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int biId=((Number) query1.uniqueResult()).intValue();
									
									sql = "SELECT patient_id FROM ehat_treatment  where treatment_id="+tid;
									
									/*int pId = (Integer) getJdbcTemplate().queryForObject(sql, new Object[] { tid },
											Integer.class);*/
									
									SQLQuery query2 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int pId=((Number) query2.uniqueResult()).intValue();

									other_amount = charges;
									other_nur = nursingCharges;

									// charges_master_slave_id
									sql = "SELECT charges_master_slave_id FROM ehat_bill_master  where treatment_id="+tid;
									
									/*int sponsrLeaf = (Integer) getJdbcTemplate().queryForObject(sql,
											new Object[] { tid }, Integer.class);*/
									
									SQLQuery query3 =sessionFactory.getCurrentSession().createSQLQuery(sql);
									int sponsrLeaf=((Number) query3.uniqueResult()).intValue();

									sql = "SELECT concat(h.ehat_hallid,'/', ht.ehat_halltype_id) as hidhtypid FROM beds b INNER JOIN hall  h ON b.Hall_ID=h.Hall_ID"
											+ " INNER JOIN hall_type  ht ON h.Htype=ht.idhall_type where b.Bed_ID="+bedID;

									/*String htypidId = (String) getJdbcTemplate().queryForObject(sql,
											new Object[] { bedID }, String.class);*/
									
									SQLQuery query4 =sessionFactory.getCurrentSession().createSQLQuery(sql);
									String htypidId =(String) query4.uniqueResult();
									
									
									String dateSp[] = htypidId.split("/");
									Integer hallId = Integer.parseInt(dateSp[0]);
									// Double hType = Double.parseDouble(dateSp[1]);
									int chargesId = 1;
									int mainhal = 2;
									int isComServId = 0;
									int isComServlastId = 0;
									int hallleaf = hallId;

									List<ConfigurServicesDto> lts = new ArrayList<ConfigurServicesDto>();
									lts = configServiceService.fetchMedicalTeamCharges(chargesId, sponsrLeaf, mainhal,
											hallleaf, isComServId, isComServlastId);
									double hallcharges = 0.0;
									double medicalteamcharges = 0.0;
									if (lts.size() > 0) {
										hallcharges = lts.get(0).getHallCharges();
										medicalteamcharges = lts.get(0).getMedicalCharges();
										if (hallcharges > 0) {
											other_amount = hallcharges;
										}
										if (medicalteamcharges > 0) {
											other_nur = medicalteamcharges;
										}
									}

									// Emergency Charges code Start

									// check for holiday=today?
									Query qCount = sessionFactory.getCurrentSession().createSQLQuery(
											"select count(*) from hospital_holiday where date=" + todays_date4);
									Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();

									// check for sunday today?
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
									String currentDay = dayFormatter.format(currentDate.getTime());

									if (currentDay.equalsIgnoreCase("Sun") || countHoliday > 0
											|| chkEmergencyTimeNew()) {

										// fetch emergency percentage
										double emrChrPer = getEmergencyPerNew();
										charges = charges * (1 + emrChrPer / 100);
										nursingCharges = nursingCharges * (1 + emrChrPer / 100);
										other_amount = other_amount * (1 + emrChrPer / 100);
										other_nur = other_nur * (1 + emrChrPer / 100);
									}

									// Emergency Charges code End

									// inserting into billing for noble
									sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id="+tid;
								
									/*int chargesIdd = (Integer) getJdbcTemplate().queryForObject(sql,
											new Object[] { tid }, Integer.class);*/
									
									SQLQuery query5 = sessionFactory.getCurrentSession().createSQLQuery(sql);
									int chargesIdd=((Number) query5.uniqueResult()).intValue();
									int sponsorId = 1;

									/*sql = "INSERT INTO ehat_bill_details_ipd(amount, bill_id, "
											+ "concession, created_by, created_date_time, discount, doctor_id, patient_cat_id, "
											+ "patient_id, quantity, rate, service_id, source_type_id, sponsor_cat_id, "
											+ "sub_service_id, unit_id,treatment_id,co_pay,pay,department_id,other_amount,other_co_pay,other_concession,other_pay,"
											+ "other_rate,on_bed_flag,charges_slave_id,sponsor_id)"
											+ " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";

									getJdbcTemplate().update(sql,
											new Object[] { charges, biId, 0, userId, currentDate, 0, 0, 0, pId, 1,
													charges, 3, sourceTypeId, 0, // 3 for Bed Charges
													bedID, unitId, tid, charges, 0, 2, other_amount, 0, 0, other_amount,
													other_amount, "Y", chargesIdd, sponsorId });*/
									
									
									BillDetailsIpdDto obj1=new BillDetailsIpdDto();
									obj1.setAmount(charges);
									obj1.setBillId(biId);
									obj1.setConcession(0.0);
									obj1.setCreatedBy(userId);
									//obj1.setCreatedDateTime(currentDate);
									obj1.setDiscount(0.0);
									obj1.setDoctorId(0);
									obj1.setPatientCatId(0.0);
									obj1.setPatienttId(pId);
									obj1.setQuantity(1);
									obj1.setRate(charges);
									obj1.setServiceId(3);
									obj1.setSourceTypeId(sourceTypeId);
									obj1.setSponsorCatId(0);
									obj1.setSubServiceId( bedID);
									
									obj1.setUnitId(unitId);
									obj1.setTreatmentId(tid);
									obj1.setCoPay(charges);
									obj1.setPay(0.0);
									obj1.setDepartmentId(2);
									obj1.setOtherAmount(other_amount);
									obj1.setOtherCoPay(0.0);
									obj1.setOtherConcession(0.0);
									obj1.setOtherCoPay(other_amount);
									obj1.setOtherRate(other_amount);
									char c='Y';
									obj1.setOnBedFlag(c);
									obj1.setEmrPer(0.0);
									obj1.setChargesSlaveId(chargesIdd);
									obj1.setSponsorId(sponsorId);
									
									sessionFactory.getCurrentSession().merge(obj1);
									
									
									

									// 'nursing charges
									/*sql = "INSERT INTO ehat_bill_details_ipd(amount, bill_id, "
											+ "concession, created_by, created_date_time, discount, doctor_id, patient_cat_id, "
											+ "patient_id, quantity, rate, service_id, source_type_id, sponsor_cat_id, "
											+ "sub_service_id, unit_id,treatment_id,co_pay,pay,department_id,other_amount,other_co_pay,other_concession,other_pay,"
											+ "other_rate,on_bed_flag,charges_slave_id,sponsor_id)"
											+ " values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)";

									getJdbcTemplate().update(sql,
											new Object[] { nursingCharges, biId, 0, userId, currentDate, 0, 0, 0, pId,
													1, nursingCharges, 3, sourceTypeId, 0, // 3 for Bed Charges
													0, unitId, tid, nursingCharges, 0, 2, other_nur, 0, 0, other_nur,
													other_nur, "Y", chargesIdd, sponsorId });*/
									
									
									
									BillDetailsIpdDto obj2=new BillDetailsIpdDto();
									obj2.setAmount(nursingCharges);
									obj2.setBillId(biId);
									obj2.setConcession(0.0);
									obj2.setCreatedBy(userId);
									//obj1.setCreatedDateTime(currentDate);
									obj2.setDiscount(0.0);
									obj2.setDoctorId(0);
									obj2.setPatientCatId(0.0);
									obj2.setPatienttId(pId);
									obj2.setQuantity(1);
									obj2.setRate(nursingCharges);
									obj2.setServiceId(3);
									obj2.setSourceTypeId(sourceTypeId);
									obj2.setSponsorCatId(0);
									obj2.setSubServiceId( bedID);
									
									obj2.setUnitId(unitId);
									obj2.setTreatmentId(tid);
									obj2.setCoPay(nursingCharges);
									obj2.setPay(0.0);
									obj2.setDepartmentId(2);
									obj2.setOtherAmount(other_nur);
									obj2.setOtherCoPay(0.0);
									obj2.setOtherConcession(0.0);
									obj2.setOtherCoPay(other_nur);
									obj2.setOtherRate(other_nur);
									char cc='Y';
									obj2.setOnBedFlag(cc);
									obj2.setEmrPer(0.0);
									obj2.setChargesSlaveId(chargesIdd);
									obj2.setSponsorId(sponsorId);
									
									sessionFactory.getCurrentSession().merge(obj2);
									
									
								}
								sql = " update beds set idbedstate =3 where Bed_ID ="+bedID;
								
								/*getJdbcTemplate().update(sql, new Object[] { bedID });*/
								
								SQLQuery qbeds=  sessionFactory.getCurrentSession().createSQLQuery(sql);
								qbeds.executeUpdate();

								msg = "Bed Shifted Successfully.";
							}
						} else {
							msg = "This Bed Is Already Allocated This Patient.";
						}
					}

					updateConsultationChargesIpd(tid, "markvisit");

					//transactionManager.commit(status);

				} else {

					msg = "Bed already occupied..select another bed";
				}
			} catch (Exception e) {

				System.out.println("database error...could not insert: " + e.getMessage());
				e.printStackTrace();
				//transactionManager.rollback(status);
			}
		}
		return msg;

	}
	
	public boolean chkEmergencyTimeNew() {
		//private DateFormat sdf = new SimpleDateFormat("HH");
		boolean emergencyFlag = false;
		try{
		DateFormat sdf = new SimpleDateFormat("HH"); 
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
		String todays_time = formatter1.format(currentDate.getTime());
		
		DateFormat sdf2 = new SimpleDateFormat("mm"); 
		
		
		int fromTime = 0;
		int toTime = 0;
		

		String sql = "select emergencyAdmissionFromTime,emergencyAdmissionToTime from hospitalaccinfo";
		
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
									
		List<Map<String, Object>> details = query.list();
		
		//List<Map<String, Object>> details = getJdbcTemplate().queryForList(sql);

		//current time from system
		// sdf is an object of simple date format which takes only hours from the time("HH")

		
		int min = Integer.parseInt(sdf2.format(Time.valueOf(todays_time)).toLowerCase());
	
		int inTime = Integer.parseInt(sdf.format(Time.valueOf(todays_time)).toLowerCase());
		//int inTime2=inTime+min;
									
			for (Map<String, Object> row: details) {
							
					//assigning (fromTime & toTime)Time values from table into sdf("HH") hours
					fromTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionFromTime")).toLowerCase());
					toTime = Integer.parseInt(sdf.format((Time)row.get("emergencyAdmissionToTime")).toLowerCase());
								
			}

		//business logic for registration charges.
			if ((fromTime > toTime) && (inTime >= fromTime || inTime <= toTime)) {
				if(inTime == toTime && min>0 )
				{
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else if (fromTime < toTime && (inTime >= fromTime && inTime <= toTime)) {
				if(inTime == toTime && min>0 )
				{
					emergencyFlag = false;
					return emergencyFlag;
				}
				emergencyFlag = true;
			} else{
				emergencyFlag = false;
		}
		return emergencyFlag;
		}
		catch(Exception e){

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return emergencyFlag;
		}

	}
	
	
	public double getEmergencyPerNew() {
		double a = 0;
		try {
			Query emerChr = sessionFactory
					.getCurrentSession()
					.createSQLQuery(
							"select emrChrPer from hospitalaccinfo where idhospitalAccInfo=1");

			a = (Double) emerChr.uniqueResult();
		} catch (Exception e) {

			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"
					+ new Exception().getStackTrace()[0].getClassName()
					+ " Method Name : "
					+ new Exception().getStackTrace()[0].getMethodName()
					+ " Line No :"
					+ new Exception().getStackTrace()[0].getLineNumber());
			return a;
		}
		return a;
	}

public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {
		
	String	sql = "SELECT count(*) FROM ehat_master_config where deleted='N' and unit_id="+unitId+" and" +
			  " dept_id="+deptId+" and service_id="+serviceId+" ";		
	/*
	 * Integer count = (Integer)
	 * getJdbcTemplate().queryForObject(sql,Integer.class);
	 */		
	
	  SQLQuery q=  sessionFactory.getCurrentSession().createSQLQuery(sql);
	  Integer count=((Number) q.uniqueResult()).intValue();
		
		if (count > 0) {
			return true;
		} else {
			return false;
		}
	}


int updateConsultationChargesIpd(int tid,String callFrom) {
     String sql="";
	
	try{					
		sql = "SELECT patient_id FROM ehat_treatment where treatment_id="+tid;		
		
		/*
		 * int patientId = (Integer) getJdbcTemplate().queryForObject(sql,new Object[]
		 * {tid}, Integer.class);
		 */
		
	  SQLQuery q=sessionFactory.getCurrentSession().createSQLQuery(sql);
	  int patientId= (int) q.uniqueResult();
		
		sql = "SELECT count(treatment_id) FROM ehat_treatment where patient_id="+patientId;		
		
		/*
		 * int trCount = (Integer) getJdbcTemplate().queryForObject(sql,new Object[]
		 * {patientId}, Integer.class);
		 */
		
		 SQLQuery qq=sessionFactory.getCurrentSession().createSQLQuery(sql);
		  int trCount= ((Number) qq.uniqueResult()).intValue();
		if(trCount > 1){
			callFrom = "markvisit";
		}else{
			callFrom = "new";
		}
		
		sql = "SELECT charges_master_slave_id FROM ehat_bill_master where treatment_id="+tid;	
		
		/*
		 * int chargesSlaveId = (Integer) getJdbcTemplate().queryForObject(sql,new
		 * Object[] {tid}, Integer.class);
		 */
		
		 SQLQuery q1=sessionFactory.getCurrentSession().createSQLQuery(sql);
		 int chargesSlaveId= ((Number) q1.uniqueResult()).intValue();
		 
		String sqlHallId ="select h.Htype from hall h,treatment_beds tb,beds b where tb.Bed_ID = b.Bed_ID and b.Hall_ID = h.Hall_ID and tb.Treatment_ID ="+tid+"  and tb.status = 'Y' and tb.bedAllocatedFor = 'P' ";
		
		/*
		 * int hId = (Integer) getJdbcTemplate().queryForObject(sqlHallId, new Object[]
		 * {tid}, Integer.class);
		 */			
		
		SQLQuery q2=sessionFactory.getCurrentSession().createSQLQuery(sqlHallId);
		 int hId= Integer.parseInt((String) q2.uniqueResult());
		
		sqlHallId ="SELECT ifnull(ehat_halltype_id,0) as htypeId FROM hall_type where idhall_type = "+hId;
		
		/*
		 * int trHallId = (Integer)
		 * getJdbcTemplate().queryForObject(sqlHallId,Integer.class);
		 */		
		
		SQLQuery q3=sessionFactory.getCurrentSession().createSQLQuery(sqlHallId);
		int trHallId=((Number) q3.uniqueResult()).intValue();
		
		
		sqlHallId ="select doctor_id from ehat_treatment where treatment_id ="+tid+" and t_flag = 'Y' and deleted = 'N' ";
		
		/*
		 * String doctorIdList = (String) getJdbcTemplate().queryForObject(sqlHallId,
		 * new Object[] {tid}, String.class);
		 */
		
		SQLQuery q4=sessionFactory.getCurrentSession().createSQLQuery(sqlHallId);
		 String doctorIdList =(String) q4.uniqueResult();
		
		String conChargesQuery = "";
		if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {
			
			String[] ary = doctorIdList.split(",");
			for (int i = 0; i < ary.length; i++) {
				
				int docId = Integer.parseInt(ary[i]);
				
				// For week day consultation charges
				if (chargesSlaveId > 0) {
    	    		
    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+trHallId+" and drflag = 'S' and deleted = 'N'";
	    	    	
    	    	}else{
    	    		
    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+trHallId+" and drflag = 'H' and deleted = 'N'";							    	    	
    	    	}
				
				// For weekend consultation charges
				SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
	    	    String currentDay = dayFormatter.format(currentDate.getTime());
	    	    
	    	    if(currentDay.equalsIgnoreCase("Sun")){
	    	    	
	    	    	if (chargesSlaveId > 0) {
	    	    		
	    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+trHallId+" and drflag = 'S' and deleted = 'N'";
		    	    	
	    	    	}else{
	    	    		
	    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+trHallId+" and drflag = 'H' and deleted = 'N'";							    	    	
	    	    	}
	    	    }
				
				if(callFrom.equals("markvisit")){
					
					//fetch doctor_followup_days from hospital table
					String ss = "SELECT doctor_followup_days as doctor_followup_days FROM hospital";
					
					/*
					 * Integer doctorFollowupDays = (Integer) getJdbcTemplate().queryForObject(ss,
					 * Integer.class);
					 */
					
				SQLQuery qfolloup=	sessionFactory.getCurrentSession().createSQLQuery(ss);
				Integer doctorFollowupDays =(Integer) qfolloup.uniqueResult();
					
					//fetch last treatment date
					ss = "SELECT ifnull(CASE WHEN(select count(*) FROM ehat_treatment WHERE patient_id = "+patientId+" AND t_flag = 'N' > 0)"
								       +" THEN(SELECT DATE(created_date_time) AS created_date_time FROM ehat_treatment WHERE patient_id ="+patientId
								       +" AND t_flag = 'N' order by treatment_id desc limit 1)else( date(now()) ) END,date(now())) AS created_date_time ";
					
					/*
					 * Date lastTreatmentDate = (Date) getJdbcTemplate().queryForObject(ss,
					 * Date.class);
					 */
					
					SQLQuery lasttreat=sessionFactory.getCurrentSession().createSQLQuery(ss);
					Date lastTreatmentDate =(Date) lasttreat.uniqueResult();
					
					
					//calculate difference between last treatment and current treatment
					long differenceDays = getDifferenceDays(lastTreatmentDate,new Date(new java.util.Date().getTime()));
					
					//if diff is less than or equals followup days then apply followup charges
					if(differenceDays <= doctorFollowupDays){
						
			    	  //  if(currentDay.equalsIgnoreCase("Sat") || currentDay.equalsIgnoreCase("Sun")){
			    	    if(currentDay.equalsIgnoreCase("Sun")){//only for shraddha
			    	    	
			    	    	if (chargesSlaveId > 0) {
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+trHallId+" and drflag = 'S' and deleted = 'N'";
				    	    	
			    	    	}else{
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(follow_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+trHallId+" and drflag = 'H' and deleted = 'N'";
				    	    }
			    	    }else{
			    	    	
			    	    	if (chargesSlaveId > 0) {
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+trHallId+" and drflag = 'S' and deleted = 'N'";
				    	    	
			    	    	}else{
			    	    		
			    	    		conChargesQuery = "SELECT ifnull(followup_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+trHallId+" and drflag = 'H' and deleted = 'N'";							    	    	
			    	    	}					    	    	
			    	    }
					}						
				}
				double constCharges = 0;
				String sqlC = "";
				if (chargesSlaveId > 0) {
					
					sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+trHallId+" and drflag = 'S' and deleted = 'N'";
				}else{
					
					sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+trHallId+" and drflag = 'H' and deleted = 'N'";
				}
				
				/*
				 * int countDr = (Integer) getJdbcTemplate().queryForObject(sqlC,
				 * Integer.class);
				 */
				
				SQLQuery  qc=sessionFactory.getCurrentSession().createSQLQuery(sqlC);
				int countDr=((Number) qc.uniqueResult()).intValue();
				
				if(countDr > 0){
					
					
					/*
					 * constCharges = (Double) getJdbcTemplate().queryForObject(conChargesQuery,
					 * Double.class);
					 */
					
					SQLQuery  constChargesQ=sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
					constCharges=(double) constChargesQ.uniqueResult();
					
					
				}else{
					
					constCharges = 0; 
				}
				
				String sqlUpdate = "update ehat_bill_details_ipd set rate="+constCharges+",amount="+constCharges+",co_pay="+constCharges+",pay="+constCharges+",other_co_pay="+constCharges+",other_pay="+constCharges+",other_rate="+constCharges+", other_amount="+constCharges+" where doctor_id="+docId+" and service_id=2 and treatment_id="+tid;
				/* getJdbcTemplate().update(sqlUpdate); */
				
				SQLQuery  sqlUpdateq=sessionFactory.getCurrentSession().createSQLQuery(sqlUpdate);
				sqlUpdateq.executeUpdate();
			}
		}
	}catch(Exception e){
	
		e.printStackTrace();
	}		
	
	return 1;

	
}

public static long getDifferenceDays(Date d1, Date d2) {
	if(d1.equals(null)){
		d1 = new Date(new java.util.Date().getTime());
	}
	if(d2.equals(null)){
		d2 = new Date(new java.util.Date().getTime());
	}
    long diff = d2.getTime() - d1.getTime();
   // System.err.println("days in diff=="+TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS));
    return TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
}

}




