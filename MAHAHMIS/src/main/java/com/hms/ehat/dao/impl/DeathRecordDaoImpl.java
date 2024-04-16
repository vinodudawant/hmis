package com.hms.ehat.dao.impl;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.LogicalExpression;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.dto.Doctor;
import com.hms.ehat.dao.DeathRecordDao;
import com.hms.ehat.dto.DeathPatientView;
import com.hms.ehat.dto.DeathPatientViewNew;
import com.hms.ehat.dto.DeathRecordDto;
/*import com.hms.ehat.dto.MaintainanceNoificationDTO;*/
import com.hms.ehat.dto.LabWorksheetViewDto;


@Repository
public class DeathRecordDaoImpl implements DeathRecordDao{

	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int saveOrUpdateDeathRecord(String patientId, int docId,
			Integer userId,Integer unitId,String narration,int deathId,String deathFlag,Date deathDate, String deathTime) {
	
		try {
			SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
			Date dd=null;
			java.sql.Date sqlDate=null;
			String str=sf.format(deathDate);
				dd = sf.parse(str);
				sqlDate= new java.sql.Date(dd.getTime());
			if (deathId > 0) {
				 DeathRecordDto obj = (DeathRecordDto) sessionFactory
							.getCurrentSession().get(DeathRecordDto.class, deathId);
				    
					obj.setUpdatedBy(userId);
					obj.setUpdatedDate(new Date(new java.util.Date().getTime()));
					obj.setDeleted("N");
					obj.setDocId(docId);
					obj.setUnitId(unitId);
					obj.setNarration(narration);
					obj.setDeathFlag(deathFlag);
					obj.setDeathDate(deathDate);
					obj.setDeathTime(deathTime);
				return 2;
			} else {
				DeathRecordDto obj = new DeathRecordDto();
				String[] servIds;
				if (patientId.length() > 0) {
					servIds = patientId.split(",");
					for (String id : servIds) {
						Query q = sessionFactory.getCurrentSession().createSQLQuery(
			                    "SELECT count(*) as count FROM  death_record_master where  patientId="
			                     +id+" " );

			                Integer count = ((Number) q.uniqueResult()).intValue();
			                if (count > 0) {
			                	Query update = sessionFactory
										.getCurrentSession()
										.createSQLQuery(
												"update death_record_master set death_flag='Y',deleted='N',narration='"+narration+"',docid='"+docId+"',death_date='"+sqlDate+"',death_time='"+deathTime+"' where  patientId= "+id+" ");
			                	
								
								update.executeUpdate();
							} else {
								obj.setPatientId(Integer.parseInt(id));
								obj.setCreatedBy(userId);
								obj.setCreatedDate(new Date(new java.util.Date().getTime()));
								obj.setDeleted("N");
								obj.setDocId(docId);
								obj.setUnitId(unitId);
								obj.setNarration(narration);
								obj.setDeathFlag(deathFlag);
								obj.setDeathDate(deathDate);
								obj.setDeathTime(deathTime);
								sessionFactory.getCurrentSession().merge(obj);
							}
						
					}

				}
				return 1;
			}
			
		} catch (Exception e) {
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return 0;
		}
		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DeathPatientView> getDeathList() {

		List<DeathPatientView> ltRegistrationViewDto = new ArrayList<DeathPatientView>();

		try {
 			
			Session session = sessionFactory.getCurrentSession();
			String hql = ("from DeathPatientView where deleted='N' and deathFlag='Y' ");
			Query query = session.createQuery(hql);
			//query.setMaxResults(10);
			
			 
			ltRegistrationViewDto=query.list();
  			  
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}

	@Override
	public boolean deleteUnit(Integer deathId, Integer userId) {
		boolean val=false;
		try {
			 DeathRecordDto obj = (DeathRecordDto) sessionFactory
						.getCurrentSession().get(DeathRecordDto.class, deathId);
			    
				obj.setDeletedBy(userId);
				obj.setDeletedDate(new Date(new java.util.Date().getTime()));
				obj.setDeathFlag("N");
				obj.setDeleted("Y");
				
				val =true;
		} catch (Exception e) {
			val =false;
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
		}
		return val;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DeathPatientView> getMarkVisitList() {

		List<DeathPatientView> ltRegistrationViewDto = new ArrayList<DeathPatientView>();

		try {
 			
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(DeathPatientView.class);
			criteria.add(Restrictions.eq("deletedP", "N"));
			
			criteria.add(Restrictions.eq("deathFlag", "N"));
			criteria.setMaxResults(10);
			ltRegistrationViewDto = criteria.list();
  			  
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return ltRegistrationViewDto;
		}
		return ltRegistrationViewDto;
	}

	@SuppressWarnings("unchecked")
	@Override
	public DeathPatientView autoSuggestionMarkVisit(String letter,String call) {
		DeathPatientView mv = new DeathPatientView();
		List<DeathPatientView> ltRegistrationViewDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DeathPatientView.class);
			
			
				if (call.equals("all")) {
					criteria.add(Restrictions.eq("deathFlag", "N"));
					criteria.add(Restrictions.eq("deletedP", "N"));
					criteria.addOrder(Order.desc("ptId"));
				} else {
					criteria.add(Restrictions.eq("deathFlag", "Y"));
					criteria.add(Restrictions.eq("deletedP", "N"));
					criteria.addOrder(Order.desc("ptId"));
				}
				Criterion rest1= Restrictions.like("patientName", "%" +letter+ "%");
				Criterion rest2= Restrictions.like("adharcardNo", "%" +letter+ "%");
				Criterion rest3= Restrictions.like("mobile", "%" +letter+ "%");
				Criterion rest4= Restrictions.like("pIdd", "%" +letter+ "%");
				
				
				criteria.add(Restrictions.or(rest1, rest2, rest3, rest4));			
  			 criteria.setMaxResults(10); 
			 ltRegistrationViewDto = criteria.list();
			 
			mv.setLstRegviewDto(ltRegistrationViewDto);
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return null;
		}
		return mv;
	}


	@Override
	public List<Doctor> setDoctorList() {
			
		List<Doctor>  ltDTO = new ArrayList<Doctor>();
		String sql = "select * from doctor where status='Y' and doc_Type='doctor' or doc_Type='visitingdoctor' order by doc_name ASC";

		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
		query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		List<Map<String, Object>> listItems = query.list();
		//List<Map<String, Object>> ltMaitcItems = (List<Map<String, Object>>) getJdbcTemplate().queryForList(sql);
		try {
			 for(Map<String, Object> row : listItems)
			{
				 Doctor docDTO = new Doctor();
				 docDTO.setDoctor_ID((Integer)(row.get("Doctor_ID")));
				 docDTO.setDoc_name((String)(row.get("doc_name")));
				 ltDTO.add(docDTO);
			}
			
/*			 Doctor objNote=new Doctor();
			objNote.setDoctorList(ltDTO);*/
			return ltDTO;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}


	@Override
	public List<DeathPatientView> getdeathpatientsList(String fromdate, String todate, String callfrom) {

		List<DeathPatientView> ltRegistrationViewDto = new ArrayList<DeathPatientView>();

		List<DeathPatientView> ltdeathaliverecord = new ArrayList<DeathPatientView>();
		try { 	
               Double patientsaleamount = 0.0;
               Double indentsaleamount = 0.0;
               Double totDisc = 0.0;
               Double totPaid = 0.0;
               Double totAmt = 0.0;
               String sponsername="";
			if (callfrom.equals("date")) {

				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date date1, date2;
				date1 = dateFormat.parse(fromdate);
				date2 = dateFormat.parse(todate);

				System.err.println("date1.."+date1);
				System.err.println("date2.."+date2);
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(DeathPatientView.class);
				criteria.add(Restrictions.eq("deletedP", "N"));
    			//criteria.add(Restrictions.eq("tFlag", "Y"));
				criteria.add(Restrictions.eq("deathFlag", "Y"));
				criteria.add(Restrictions.between("deathDate", dateFormat.parse(fromdate), dateFormat.parse(todate)));
    			
				Criterion ipd = Restrictions.eq("department_id", 2);
				Criterion opd = Restrictions.eq("department_id", 1);
				LogicalExpression orExp = Restrictions.or(ipd, opd);
				criteria.add(orExp);
				criteria.setMaxResults(10);
				ltRegistrationViewDto = criteria.list();

			}else{
					final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
				 	final Date fDate = new SimpleDateFormat("yyyy-MM-dd").parse(fromdate);
	                final Date tDate = new SimpleDateFormat("yyyy-MM-dd").parse(todate);
	                fromdate = formatter.format(fDate);
	                todate = formatter.format(tDate);
	                final Criteria criteria = this.sessionFactory.getCurrentSession().createCriteria((Class)DeathPatientView.class);
	                criteria.add(Restrictions.eq("deletedP", "N"));
	                criteria.add(Restrictions.eq("deathFlag", "Y")); Criterion ipd =
				    Restrictions.eq("department_id", 2); Criterion opd =
				    Restrictions.eq("department_id",1); LogicalExpression orExp =
				    Restrictions.or(ipd, opd); criteria.add( orExp ); criteria.setMaxResults(10);
				    ltRegistrationViewDto = criteria.list();
               }
			
			
		 //  for(DeathPatientViewNew listdeath : ltRegistrationViewDto)
			for(DeathPatientView listdeath : ltRegistrationViewDto){
				DeathPatientView death = new DeathPatientView();
				death.setPtId(listdeath.getPtId());
				death.setCenterPatientId(listdeath.getCenterPatientId());
				death.setPatientName(listdeath.getPatientName());
				death.setDisName(listdeath.getDisName());
				death.setAge(listdeath.getAge());
			String DeathFlag =	listdeath.getDeathFlag();
			    death.setDeathFlag(DeathFlag);
			if(DeathFlag.equals("Y")){
				 System.err.println("death.."+listdeath.getDeathDate());
				 SimpleDateFormat sm = new SimpleDateFormat("mm-dd-yyyy");
				 String strDate=sm.format(listdeath.getDeathDate());
				 System.err.println("using string death.."+strDate);
				 
				death.setDeathDate(listdeath.getDeathDate());
				death.setPatientstatus("Dead");
			}
				  
		//	Query q = sessionFactory.getCurrentSession().createSQLQuery(
		 //                   "select charges_master_slave_id from patient_records_details where  treatment_id="+ listdeath.getTtId() +" and patient_id	="+ listdeath.getPtId() +"" );
		      Query q = sessionFactory.getCurrentSession().createSQLQuery(
				                    "select charges_slave_id from ehat_multiple_sponsor where  treatment_id="+ listdeath.getTtId() +" and patient_id	="+ listdeath.getPtId() +"" );
		      q.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
		      String charges_master_slave_id="-1";
		          //    Integer charges_master_slave_id = ((Number) q.uniqueResult()).intValue();
		        		List<Map<String, Object>> mulpcharges_master_slave_id =  q.list();
                       for(Map<String, Object> row : mulpcharges_master_slave_id){
                    	   charges_master_slave_id=charges_master_slave_id + ","+ row.get("charges_slave_id");
                       }
		                
				SQLQuery patientsale =sessionFactory.getCurrentSession().createSQLQuery("SELECT patient_sales_bill_net_amt as amount FROM pharma_patient_sales_bill_master where " +
			    		"  patient_bill_patient_id="+ listdeath.getPtId() +" and patient_sale_treatmentId	="+ listdeath.getTtId() +"  and patient_sales_bill_delete_flag ="+ 0 +" ");
				patientsale.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			  
			    List<Map<String, Object>> data1 = patientsale.list();
			    for(Map<String, Object> row : data1){
			    	Double	amount=(Double)row.get("amount");
			    	patientsaleamount =patientsaleamount + amount;
			    	
			    }
			    Double totalamountmed=0.0;
				/*SQLQuery indentsale =sessionFactory.getCurrentSession().createSQLQuery("SELECT sm.indent_sale_net_amt as amount FROM pharma_indent_sale_master sm,pharma_indent_master pm where " +
			    		" pm.indent_id= sm.indent_sale_indent_no and pm.indent_treatement_id="+ listdeath.getTtId() +"  and sm.indent_sale_delete_flag="+ 0 +" ");
				indentsale.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
			  
			    List<Map<String, Object>> data = indentsale.list();
			    Double totalamountmed=0.0;
			    for(Map<String, Object> row : data){
			    	Double	amount=(Double)row.get("amount");
			    	indentsaleamount = indentsaleamount + amount;
			    	
			    }
			    if(patientsaleamount ==null && indentsaleamount ==null){
			    	  totalamountmed =0.0;
			    	//death.setMedicineamount(0.0);
			    }
			    if(patientsaleamount > 0){
			    	 if(indentsaleamount > 0){
			    		 totalamountmed = patientsaleamount + indentsaleamount;
			    		 if(totalamountmed==null){
			    			 totalamountmed=0.0;
			    		 }
			    	//	 death.setMedicineamount(totalamountmed);
					    }else{
					    	 if(patientsaleamount==null){
					    		 patientsaleamount=0.0;
				    		 }
					    	 totalamountmed =patientsaleamount;
					    	//death.setMedicineamount(patientsaleamount);
					    }
			    	
			    }else{
			    	 if(indentsaleamount > 0){
				    	 if(patientsaleamount > 0){
				    		 totalamountmed = patientsaleamount + indentsaleamount;
				    		 if(totalamountmed==null){
				    			 totalamountmed=0.0;
				    		 }
				    	//	 death.setMedicineamount(totalamount);
						    }else{
						    	 if(indentsaleamount==null){
						    		 indentsaleamount=0.0;
					    		 }
						    	 totalamountmed = indentsaleamount;
						    	//death.setMedicineamount(totalamountmed);
						    }
				    	
				    }	
			    }
*/			   
				String sql="";
			  	Query q4 = sessionFactory.getCurrentSession().createSQLQuery("" +
            			"select count(*) from patient_daignosis_master where treatmentId="+ listdeath.getTtId() +"");

	                Integer count_id = ((Number) q4.uniqueResult()).intValue();
        
	                String diagnosiscom ="";
        		if (count_id > 0) {

        			sql = "SELECT max(id) FROM patient_daignosis_master WHERE treatmentId=? AND status =?";
        			Query q5 = sessionFactory.getCurrentSession().createSQLQuery("SELECT max(id) FROM patient_daignosis_master WHERE treatmentId="+ listdeath.getTtId() +" AND status ='Y'");

		             Integer patient_daignosis_masterId = ((Number) q5.uniqueResult()).intValue();
        			
       			    sql = "SELECT diagnosis FROM patient_daignosis_slave WHERE patient_daignosis_masterId="+ patient_daignosis_masterId +" AND status='Y' AND diagnosis_Type='Confirmed'";
        			
    				Query recQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql);

    				recQuery1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
    				@SuppressWarnings("unchecked")
    				List<Map<String, Object>> assesmentDetails = recQuery1.list();
    				for(Map<String, Object> row2 : assesmentDetails){
    							
    						String diagnosis= (String) (row2.get("diagnosis"));
    						
    						diagnosiscom =diagnosiscom + "," +  diagnosis;
    								
    				}
                   }
				/*if (mulpcharges_master_slave_id.size() > 0) {
					String sql1 = "select category_name from ehat_charges_master_slave where  id="
							+ charges_master_slave_id + " and deleted='N'";
					Query q1 = sessionFactory.getCurrentSession()
							.createSQLQuery(sql1);
					q1.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> sponserlist = q1.list();
					for (Map<String, Object> row2 : sponserlist) {
						String cname = (String) (row2.get("category_name"));
						sponsername = sponsername + "," + cname;	
						}
				}    */            
				if(listdeath.getDepartment_id() == 1){
    				//if(charges_master_slave_id>0){
                	if(mulpcharges_master_slave_id.size()>0){
                	
    				//	sql="select sum(other_amount) as totAmt,sum(other_concession) as totConcn FROM ehat_bill_details where deleted='N' and treatment_id="+listdeath.getTtId()+" and cancle='N' ";
        				sql="select s.total_bill as totAmt,s.total_concn as totConcn,ifnull(s.discount,0) as totDisc,ifnull(s.total_paid,0) as totPaid,ifnull(s.total_remain,0) as totRemain,ifnull(s.total_refund,0) as totRefund,sp.category_name as category_name ,sp.id as spid  FROM  ehat_multiple_sponsor s ,ehat_charges_master_slave sp  where sp.deleted='N'  and s.deleted='N' and s.treatment_id="+listdeath.getTtId()+" and     sp.id=s.charges_slave_id      and   s.charges_slave_id  in ("+ charges_master_slave_id +") ";

                	}else{
    					
    					sql="select sum(amount) as totAmt,sum(concession) as totConcn FROM ehat_bill_details where deleted='N' and treatment_id="+listdeath.getTtId()+" and cancle='N' ";
    				}
    			}else{
    				
    				if(mulpcharges_master_slave_id.size()>0){
    					
        				sql="select s.total_bill as totAmt,s.total_concn as totConcn,ifnull(s.discount,0) as totDisc,ifnull(s.total_paid,0) as totPaid,ifnull(s.total_remain,0) as totRemain,ifnull(s.total_refund,0) as totRefund,sp.category_name as category_name ,sp.id as spid  FROM  ehat_multiple_sponsor s ,ehat_charges_master_slave sp  where sp.deleted='N'  and s.deleted='N' and s.treatment_id="+listdeath.getTtId()+" and    sp.id=s.charges_slave_id      and   s.charges_slave_id  in ("+ charges_master_slave_id +")";

    					//	sql="select sum(other_amount) as totAmt,sum(other_concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+listdeath.getTtId()+" and cancle='N' ";
    				}else{
    					
    					sql="select sum(amount) as totAmt,sum(concession) as totConcn FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+listdeath.getTtId()+" and cancle='N' ";
    				}
    			}
                Query billDetailsQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
    			billDetailsQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
    			@SuppressWarnings("unchecked")			
    			List<Map<String, Object>> listBillDetails = billDetailsQuery.list();
				for (Map<String, Object> row : listBillDetails) {
					if (mulpcharges_master_slave_id.size() > 0) {
						
						DeathPatientView death1 =new DeathPatientView();
						totAmt = (Double) row.get("totAmt");
						death1.setPtId(listdeath.getPtId());
						death1.setCenterPatientId(listdeath.getCenterPatientId());
						death1.setPatientName(listdeath.getPatientName());
						death1.setDisName(listdeath.getDisName());
						death1.setAge(listdeath.getAge());
						death1.setDeathFlag(listdeath.getDeathFlag());
					if(DeathFlag.equals("Y")){
						death1.setDeathDate(listdeath.getDeathDate());
						death1.setDeathTime(listdeath.getDeathTime());
						 System.err.println("death111.."+listdeath.getDeathDate());
						death1.setPatientstatus("Dead");
					}
						if (totAmt != null) {
							death1.setTreamentamount(totAmt);
						} else {
							death1.setTreamentamount(0.0);
						}

						totDisc = (Double) row.get("totDisc");
						totPaid = (Double) row.get("totPaid");
						if (totDisc != null) {
							death1.setDiscount(totDisc);
						} else {
							death1.setDiscount(0.0);
						}

						if (totPaid != null) {
							death1.setAdvancedamount(totPaid);
						} else {
							death1.setAdvancedamount(0.0);
						}

						if (diagnosiscom.length() > 0) {
							diagnosiscom = diagnosiscom.substring(1);
							death1.setDignosis(diagnosiscom);
						} else {
							death1.setDignosis("-");

						}
						String sql1="";
						death1.setSponsername((String)row.get("category_name"));
						if(listdeath.getDepartment_id() == 1){
							sql1="select sum(other_amount) as totAmt FROM ehat_bill_details_ipd where deleted='N' and treatment_id="+listdeath.getTtId()+" and cancle='N' and charges_slave_id="+ row.get("spid") +" and service_id='-5' ";
						}else{
							sql1="select sum(other_amount) as totAmt FROM  ehat_bill_details where deleted='N' and treatment_id="+listdeath.getTtId()+" and cancle='N' and charges_slave_id="+ row.get("spid") +" and service_id='-5' ";
		
						}
    					Query qurypharma = sessionFactory.getCurrentSession().createSQLQuery(sql1);
    					totalamountmed= (Double) qurypharma.uniqueResult();
    					if(totalamountmed ==null){
    						totalamountmed=0.0;	
    					}
						death1.setMedicineamount(totalamountmed);
				
							ltdeathaliverecord.add(death1);		
							
					} else {
						totAmt = (Double) row.get("totAmt");
						if (totAmt != null) {
							death.setTreamentamount(totAmt);
						} else {
							death.setTreamentamount(0.0);
						}
					}

				}
    		
    			if(mulpcharges_master_slave_id.size()==0){

					if (listdeath.getDepartment_id() == 1) {

						sql = "select ifnull(sum(total_discount),0) as totDisc,ifnull(sum(total_paid),0) as totPaid,"
								+ "ifnull(sum(total_remain),0) as totRemain,ifnull(sum(refund_amt),0) as totRefund FROM ehat_receipt_master where deleted='N' and treatment_id="
								+ listdeath.getTtId() + " and against_id=0 ";

						Query recQuery = sessionFactory.getCurrentSession()
								.createSQLQuery(sql);
						recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRec = recQuery.list();
						for (Map<String, Object> row : listRec) {

							totDisc = (Double) row.get("totDisc");
							totPaid = (Double) row.get("totPaid");

						}

					} else {

						sql = "select ifnull(sum(total_paid),0) as totPaid,"
								+ "ifnull(sum(total_remain),0) as totRemain FROM ehat_receipt_master_ipd where deleted='N' and treatment_id="
								+ listdeath.getTtId() + " and against_id=0 ";

						Query recQuery = sessionFactory.getCurrentSession()
								.createSQLQuery(sql);
						recQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRec = recQuery.list();
						for (Map<String, Object> row : listRec) {

							totPaid = (Double) row.get("totPaid");

						}
						String sql1 = "SELECT  ifnull(sum(r.total_discount),0) as total_discount from"
								+ " ehat_ipdbill_discount r  where r.deleted='N' and treatment_id="
								+ listdeath.getTtId() + "";

						Query recQuery1 = sessionFactory.getCurrentSession()
								.createSQLQuery(sql1);
						recQuery1
								.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						@SuppressWarnings("unchecked")
						List<Map<String, Object>> listRec1 = recQuery1.list();
						for (Map<String, Object> row : listRec1) {

							totDisc = (Double) row.get("total_discount");

						}

					}

					if (totDisc != null) {
						death.setDiscount(totDisc);
					} else {
						death.setDiscount(0.0);
					}

					if (totPaid != null) {
						death.setAdvancedamount(totPaid);
					} else {
						death.setAdvancedamount(0.0);
					}
					if(diagnosiscom.length() > 0){
	        			diagnosiscom = diagnosiscom.substring(1);
	        			death.setDignosis(diagnosiscom);
	        		}else{
	        			death.setDignosis("-");
	        		}
					death.setMedicineamount(totalamountmed);
					death.setSponsername("Self");
					ltdeathaliverecord.add(death);		
				} 
			}
  			  
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("ehatException -: Class Name :"+
                    new Exception().getStackTrace()[0].getClassName()+" Method Name : "+
                    new Exception().getStackTrace()[0].getMethodName()+" Line No :"+ new Exception().getStackTrace()[0].getLineNumber());
			return ltdeathaliverecord;
		}
		return ltdeathaliverecord;
	}

}
