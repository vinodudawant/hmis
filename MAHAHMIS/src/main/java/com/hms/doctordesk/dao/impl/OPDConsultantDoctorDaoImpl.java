package com.hms.doctordesk.dao.impl;

import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.transform.AliasToBeanResultTransformer;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.hms.doctordesk.dao.OPDConsultantDoctorDao;
import com.hms.doctordesk.dto.OPDAddConstlutantDto;
import com.hms.doctordesk.dto.OPDConstultantDoctorDto;
import com.hms.doctordesk.dto.OPDTokenDto;
import com.hms.dto.Doctor;
import com.hms.ehat.dto.BillDetailsDto;
import com.hms.ehat.dto.BillDetailsIpdDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.registration.dto.SpecialityWiseDoctorDto;
import com.hms.registration.dto.SpecializationDto;

@Repository
public class OPDConsultantDoctorDaoImpl implements OPDConsultantDoctorDao {
	
	@Autowired
	SessionFactory sessionFactory;
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = formatter.format(currentDate.getTime());
 	SimpleDateFormat formatter1 = new SimpleDateFormat("HH:mm:ss");
	String todays_time = formatter1.format(currentDate.getTime());
 	SimpleDateFormat formatter3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String todays_date3 = formatter3.format(currentDate.getTime());
  	SimpleDateFormat formatter2 = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date2 = formatter2.format(currentDate.getTime());
	SimpleDateFormat formatter4 = new SimpleDateFormat("yyyy-MM-dd");
	String todays_date4 = formatter4.format(currentDate.getTime());

	@Override
	public List<SpecializationDto> getSpecialization(SpecializationDto regDto) {
		Session s = sessionFactory.openSession();
		try {
			
			Query specialitySp = s.createSQLQuery("call sp_reg_get_hospital_specialization()");
			specialitySp.setResultTransformer(new AliasToBeanResultTransformer(SpecializationDto.class));
			@SuppressWarnings("unchecked")
			List<SpecializationDto> lstSpecialization = specialitySp.list();			
			s.flush();
			s.close();
			return lstSpecialization;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}		
	}

	@Override
	public List<SpecialityWiseDoctorDto> getDoctorBySpecialization(SpecialityWiseDoctorDto doctorDto) {
		
		Session s = sessionFactory.openSession();
		try {
			
			Query doctorSp;
			if(doctorDto.getDoctor_id() > 0) {
				
				doctorSp = s.createSQLQuery("call sp_reg_get_doctor_by_specialization(:specialityId)");
				doctorSp.setParameter("specialityId", doctorDto.getDoctor_id());
			}else {
				
				doctorSp = s.createSQLQuery("call sp_get_doctor_list()");
			}
			doctorSp.setResultTransformer(new AliasToBeanResultTransformer(SpecialityWiseDoctorDto.class));
			@SuppressWarnings("unchecked")
			List<SpecialityWiseDoctorDto> lstDoctor = doctorSp.list();			
			s.flush();
			s.close();
			return lstDoctor;
			
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}		
	}

	@Override
	public int addNewConsultantOpd(BillDetailsDto billDetailsDto, String queryType) {
		int a = 0;
		try {
			BillDetailsDto billDetailsDtoSave = new BillDetailsDto();
			String conChargesQuery = "";
			String sql = "";
			int patId = billDetailsDto.getPatienttId();
			int treatId = billDetailsDto.getTreatmentId();
			int unitId = billDetailsDto.getUnitId();
        	
			//sql="select ifnull(doctor_id,'0') as doctor_id from ehat_treatment where treatment_id="+treatId;
			//Query docIdList = sessionFactory.getCurrentSession().createSQLQuery(sql);
			  sql="Select   doctorIdList from TreatmentDto  where treatmentId="+treatId+" ";
			  Query docIdList=sessionFactory.getCurrentSession().createQuery(sql);
			
			
			
			String docIdListStr = (String) docIdList.uniqueResult();
						
			if (queryType.equalsIgnoreCase("delete")) {
				
			
				
			//	sql="select bill_details_id FROM ehat_bill_details where deleted='N' and cancle ='N' and treatment_id ="+treatId+" and doctor_id="+billDetailsDto.getDoctorId();
				//Query conQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);			
				//int billdetailId = (Integer) conQueryIpd.uniqueResult();
				
				sql="Select billDetailsId  from BillDetailsDto  where deleted='N' and cancle='N' and treatmentId="+treatId+" and doctorId="+billDetailsDto.getDoctorId()+" ";
				Query conQueryIpd = sessionFactory.getCurrentSession().createQuery(sql);
				int billdetailId = (Integer) conQueryIpd.uniqueResult();
				
				//sql= "UPDATE ehat_bill_details set deleted = 'Y',deleted_by = "+billDetailsDto.getCreatedBy()+",deleted_date_time = concat(curdate(), ' ', curtime()) WHERE bill_details_id ="+billdetailId;
				//Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
				
				sql="UPDATE BillDetailsDto set deleted='Y',deletedBy="+billDetailsDto.getCreatedBy()+",deletedDateTime=now() where billDetailsId="+billdetailId+" ";
				Query query=sessionFactory.getCurrentSession().createQuery(sql);
				query.executeUpdate();	
				
				String docIdListStrNew="";
				String[] ary = docIdListStr.split(",");
				for (int i = 0; i < ary.length; i++) {
					
					if(Integer.parseInt(ary[i]) != billDetailsDto.getDoctorId()){
						
						docIdListStrNew = docIdListStrNew + ary[i]+",";
					}
				}		
				
				//ql = "UPDATE ehat_treatment set doctor_id ='"+docIdListStrNew.substring(0,docIdListStrNew.length()-1)+"' WHERE treatment_id ="+treatId;
				sql="UPDATE TreatmentDto set doctorIdList='"+docIdListStrNew+"' where treatmentId="+treatId+"  ";
				Query queryTreat = sessionFactory.getCurrentSession().createQuery(sql);
				queryTreat.executeUpdate();	
				
			} else if (queryType.equalsIgnoreCase("insert")) {
					
				
				int sourceTypeId = 0;
				int billId = 0;
				int departmentId = 0;
				int sponsorId = 0;
				int chargesSlaveId = 0;
				
				
				if(docIdListStr.contains(String.valueOf(billDetailsDto.getDoctorId()))){
					
					a = -5;
				}else{				
				
				//	sql="select * from ehat_bill_master where treatment_id="+treatId;
					//Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
				//	billQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					/*
					 * @SuppressWarnings("unchecked") List<Map<String, Object>> listBillDetails =
					 * billQuery.list(); for(Map<String, Object> row : listBillDetails){
					 * 
					 * billId = (Integer)row.get("bill_id"); chargesSlaveId =
					 * (Integer)row.get("charges_master_slave_id"); sourceTypeId =
					 * (Integer)row.get("source_type_id"); departmentId =
					 * (Integer)row.get("department_id"); unitId = (Integer)row.get("unit_id");
					 * if(chargesSlaveId > 0){ sponsorId = 1; }else{ sponsorId = 0; } }
					 */
				
					
					
					
					  Query q=sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_bill_details_by_treatment_id(:treatmentId,:unitId)");
					  q.setParameter("treatmentId", treatId);
					  q.setParameter("unitId", unitId);
					  q.setResultTransformer(Transformers.aliasToBean(OPDAddConstlutantDto.class));
					OPDAddConstlutantDto  bobj=(OPDAddConstlutantDto) q.uniqueResult();
					if(bobj !=null) {
					billId=bobj.getBill_id();
					chargesSlaveId=bobj.getCharges_master_slave_id();
					sourceTypeId=bobj.getSource_type_id();
					departmentId=bobj.getDepartment_id();
					unitId=bobj.getUnit_id();
					}
					
					
					
					
					billDetailsDtoSave.setPatienttId(patId);
					billDetailsDtoSave.setTreatmentId(treatId);
					billDetailsDtoSave.setBillId(billId);		
					billDetailsDtoSave.setUnitId(unitId);
					billDetailsDtoSave.setChargesSlaveId(chargesSlaveId);
					billDetailsDtoSave.setSourceTypeId(sourceTypeId);
					billDetailsDtoSave.setSponsorId(sponsorId);
					billDetailsDtoSave.setDepartmentId(departmentId);
					billDetailsDtoSave.setPaidFlag("N");
					billDetailsDtoSave.setDoctorId(billDetailsDto.getDoctorId());				
					billDetailsDtoSave.setCreatedBy(billDetailsDto.getCreatedBy());
					billDetailsDtoSave.setCreatedDateTime(new Date(new java.util.Date().getTime()));
					
					int hallslave_id = 0;
					if(departmentId == 1){
						
						hallslave_id = -1;
					}else if(departmentId == 3){
						
						hallslave_id = -3;
					}
					
					String doctorIdList = String.valueOf(billDetailsDto.getDoctorId());
					if (masterConfigAccess(billDetailsDtoSave.getUnitId(),billDetailsDtoSave.getDepartmentId(), 2)) {
						if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {
							//String[] ary = doctorIdList.split(",");
							//ary[0] = doctorIdList;
							for (int i = 0; i < 1; i++) {
								
								int docId = billDetailsDto.getDoctorId();//Integer.parseInt(ary[i]);
								
								String subServQueryForId = "SELECT ifnull(id,0) as id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
								
								// query to fetch consultation charges of the doctor
								//conChargesQuery ="SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
								if (chargesSlaveId > 0) {
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
					    	    	
				    	    	}else{
				    	    		
				    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
				    	    	}
								
								//if (queryType.equalsIgnoreCase("markvisit")) {}
								
								SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
					    	    String currentDay = dayFormatter.format(currentDate.getTime());
					    	    
					    	    if(currentDay.equalsIgnoreCase("Sun")){
					    	    	
					    	    	if (chargesSlaveId > 0) {
					    	    		
					    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
						    	    	
					    	    	}else{
					    	    		
					    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
					    	    	}
					    	    }				    	    
								
								double constCharges = 0;
								String sqlC = "";
								if (chargesSlaveId > 0) {
									
									sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
								}else{
									
									sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
								}
								
								Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlC);
								int countDr = ((Number)refQuery.uniqueResult()).intValue();
								
								if(countDr > 0){
									
									Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
									constCharges = (Double) q1.uniqueResult();
								}else{
									
									constCharges = 0; 
								}	
								// added by vinod
															
								Query q2 = sessionFactory.getCurrentSession().createSQLQuery(subServQueryForId);
								Integer subServIdConcsultaion = ((Number) q2.uniqueResult()).intValue();
	
								//check for holiday=today?
								Query qCount = sessionFactory.getCurrentSession().createSQLQuery("select count(*) from hospital_holiday where date="+todays_date4);
								Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
								
								//check for sunday today?
								if(countHoliday > 0 || chkEmergencyTime()){
					    	    	
					    	    	//fetch emergency percentage
					    	    	double emrChrPer = getEmergencyPer();				    	    	
					    	    	constCharges = constCharges *(1+emrChrPer/100);
					    	    }
					    	    
								billDetailsDtoSave.setRate(constCharges);
								billDetailsDtoSave.setQuantity(1);
								billDetailsDtoSave.setAmount(constCharges * 1);
								billDetailsDtoSave.setServiceId(2);
								
								// doctor
								if(subServIdConcsultaion .equals("") ||  subServIdConcsultaion.equals(null) || subServIdConcsultaion.equals("null")) {
									subServIdConcsultaion=0;
								}
								
								billDetailsDtoSave.setSubServiceId(subServIdConcsultaion);
								billDetailsDtoSave.setOtherAmount(constCharges * 1);
								billDetailsDtoSave.setOtherRate(constCharges);
								billDetailsDtoSave.setOtherPay(constCharges * 1);
								billDetailsDtoSave.setCoPay(constCharges);							
								
								// Entry in database opd bill table for consultation
								sessionFactory.getCurrentSession().merge(billDetailsDtoSave);							
	
								docIdListStr = docIdListStr + "," + docId;								
								//sql = "UPDATE ehat_treatment set doctor_id ='"+docIdListStr+"' WHERE treatment_id ="+treatId;
								//Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
								sql="UPDATE TreatmentDto set doctorIdList='"+docIdListStr+"' where treatmentId="+treatId+"  ";
								Query query = sessionFactory.getCurrentSession().createQuery(sql);
								
								query.executeUpdate();								

								a = maxCountOfColumn(BillDetailsDto.class, "billDetailsId");
							}
						}					
					}			
				}
			} 			

		} catch (Exception e) {
			e.printStackTrace();
			a = -1;
		}
		// returning bill_Id
		return a;
	}
	
	
	
	//Max value of any coloumn
		public int maxCountOfColumn(@SuppressWarnings("rawtypes") Class className,
	            String columnName) {

	        Criteria criteria = sessionFactory.getCurrentSession()
	                .createCriteria(className)
	                .setProjection(Projections.max(columnName));
	        Integer maxAge = (Integer) criteria.uniqueResult();
	        if (maxAge == null) {
	            maxAge = 0;
	        }
	        return maxAge;
	    }
		
		
		
		public boolean chkEmergencyTime() {
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
		
		
		public boolean masterConfigAccess(int unitId, int deptId, int serviceId) {
			
			/*
			 * Query q = sessionFactory.getCurrentSession().
			 * createSQLQuery("SELECT count(*) FROM ehat_master_config where deleted='N' and unit_id="
			 * + unitId + " and dept_id=" + deptId + " and service_id=" + serviceId);
			 */

			Query q = sessionFactory.getCurrentSession().createQuery("Select count(*) from MasterConfigDto where deleted='N' and deptId="+deptId+" and unitId="+unitId+" and serviceId="+serviceId+"  ");
			
			Integer count = ((Number) q.uniqueResult()).intValue();

			if (count > 0) {
				return true;
			} else {
				return false;
			}

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

		
		public double getEmergencyPer() {
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

		@Override
		public List<OPDConstultantDoctorDto> getlstOPDConsultantDoctor(Integer treatmentId,Integer patientId,Integer unitId) {
			
			List<OPDConstultantDoctorDto> list = new ArrayList<OPDConstultantDoctorDto>();
			  TreatmentDto obj=(TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,treatmentId);
			  String doctorIdList=obj.getDoctorIdList();
			
			
			try {
				
				  Query q=sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_consulting_doctor_by_treatment_id(:patientId,:treatmentId,:unitId,:doctorList)");
				  q.setParameter("patientId", patientId);
				  q.setParameter("treatmentId", treatmentId);
				  q.setParameter("unitId", unitId);
				  q.setParameter("doctorList", doctorIdList);
				  
				  q.setResultTransformer(Transformers.aliasToBean(OPDConstultantDoctorDto.class));
				  list=q.list();
				
			}catch (Exception e) {
				
			}
			
			return list;
		}

		@Override
		public int getLatestConsultantDoctorIdByTreatment(Integer treatmentId) {
			int latestDoctorId=0;
			String sql="";
			try {
				sql="select ifnull(doctor_id,'0') as doctor_id from ehat_treatment where treatment_id="+treatmentId;
				Query docIdList = sessionFactory.getCurrentSession().createSQLQuery(sql);
				String docIdListStr = (String) docIdList.uniqueResult();


					String docIdStrNew="";
					String[] ary = docIdListStr.split(",");
					int length=ary.length;
					docIdStrNew=ary[length-1];
					if(docIdStrNew==null||docIdStrNew==""||docIdStrNew.isEmpty()) {
						docIdStrNew="0";
					}
					latestDoctorId=Integer.parseInt(docIdStrNew);
						
				
			}catch (Exception e) {
				e.printStackTrace();
			}
			return latestDoctorId;
		}

		@Override
		public int getDepartNameByDoctorId(Integer doctorId) {
			int deptId=0;
			try {
				Doctor obj=(Doctor) sessionFactory.getCurrentSession().get(Doctor.class, doctorId);
				String depat=obj.getDepartment();
				deptId=Integer.parseInt(depat);
			}catch (Exception e) {
				e.printStackTrace();
			}
			return deptId;
		}

		@Override
		public String checkUpDoneOrCancelOPD(OPDTokenDto obj) {
			
			String result = "0";
			try {
				
				Query querySp = sessionFactory.getCurrentSession().createSQLQuery("call sp_opd_display_led(:p_unit_id, :p_callform, :p_speciality_id, :p_doctor_id, :p_treatment_id, :p_user_id, :p_narration)");
				querySp.setParameter("p_unit_id", obj.getUnitId());
				querySp.setParameter("p_callform", obj.getCallFrom());
				querySp.setParameter("p_speciality_id", obj.getSpecialityId());
				querySp.setParameter("p_doctor_id", obj.getDoctorId());
				querySp.setParameter("p_treatment_id", obj.getTreatmentId());
				querySp.setParameter("p_user_id", obj.getUserId());
				querySp.setParameter("p_narration", obj.getNarration());
				//querySp.executeUpdate();
				result = (String)querySp.uniqueResult();
				
				//Added By Rahul
				if(obj.getCallFrom().equals("cancel")) {
					String sql = "update ehat_treatment set t_flag='N',adm_cancel_flag='Y' where treatment_id="+obj.getTreatmentId()+"";
					SQLQuery createSQLQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
					createSQLQuery.executeUpdate();
					
					String sql1="update ehat_bill_details set deleted='Y' where treatment_id="+obj.getTreatmentId()+"";
					SQLQuery createSQLQuery1 = sessionFactory.getCurrentSession().createSQLQuery(sql1);
					createSQLQuery1.executeUpdate();
				}
				/*if(res == -1) {
					result = "-1";
				}else {
					
					if(obj.getCallFrom().equalsIgnoreCase("cancel")) {
						result = "1";
					}else if(obj.getCallFrom().equalsIgnoreCase("out")) {
						result = "2";
					}else if(obj.getCallFrom().equalsIgnoreCase("send")) {
						result = "3";
					}
				}*/
				
				
				/*if(obj.getCallFrom().equalsIgnoreCase("cancel")) {
						
					String cancelSql = "SELECT queueStatus FROM TokenDto where specialityId="+obj.getSpecialityId()+" and doctorIdList="+obj.getDoctorId()+" and treatmentId="+obj.getTreatmentId()+" ";	
					Query qcancel = sessionFactory.getCurrentSession().createQuery(cancelSql);
					String qStatus = (String) qcancel.uniqueResult();
					if(qStatus.equalsIgnoreCase("in")) {
						
						String cancelUpdate="UPDATE TokenDto SET cancelDateTime=now(),cancelBy="+obj.getUserId()+",queueStatus='cancel',narration='"+obj.getNarration()+"' WHERE specialityId="+obj.getSpecialityId()+" and treatmentId="+obj.getTreatmentId()+" and doctorIdList="+obj.getDoctorId()+" ";
						Query qcancelUpadte=   sessionFactory.getCurrentSession().createQuery(cancelUpdate);
						qcancelUpadte.executeUpdate();
					}
						
					result = "1";
				
				}else if(obj.getCallFrom().equalsIgnoreCase("out")) {
						
					String outSql="SELECT queueStatus FROM TokenDto where specialityId="+obj.getSpecialityId()+" and doctorIdList="+obj.getDoctorId()+" and treatmentId="+obj.getTreatmentId()+" ";
					Query qout = sessionFactory.getCurrentSession().createQuery(outSql);
					String qStatus=(String) qout.uniqueResult();
					
					if(qStatus.equalsIgnoreCase("in")) {
						String outUpdate = "UPDATE TokenDto SET queueStatus='out',checkupDoneDateTime=now() WHERE specialityId="+obj.getSpecialityId()+" and treatmentId="+obj.getTreatmentId()+" and doctorIdList="+obj.getDoctorId()+"  ";
						Query qoutUpdate = sessionFactory.getCurrentSession().createQuery(outUpdate);
						qoutUpdate.executeUpdate();
					}
						
					result = "2";
					
				}else if(obj.getCallFrom().equalsIgnoreCase("send")) {
					
					int inCount=0, nextCount=0, waitCount=0;
					String outSql="SELECT in_count,next_count,wait_count FROM opd_token_limit where speciality_id="+obj.getSpecialityId();
					Query qout = sessionFactory.getCurrentSession().createSQLQuery(outSql);
					qout.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
					List<Map<String, Object>> details = qout.list();
					for (Map<String, Object> row: details) {
									
						inCount = (Integer)row.get("in_count");
						nextCount = (Integer)row.get("next_count");
						waitCount = (Integer)row.get("wait_count");
					}
					
					int inPatientCount=0,nextPatientCount=0,waitPatientCount=0;
					String inHql="";
					
					inHql ="SELECT count(*) FROM TokenDto where specialityId="+obj.getSpecialityId()+" and doctorIdList="+obj.getDoctorId()+" and treatmentId="+obj.getTreatmentId()+" and queueStatus='in' ";
					Query inQuery = sessionFactory.getCurrentSession().createQuery(inHql);
					inPatientCount = (Integer) inQuery.uniqueResult();
					 
					inHql ="SELECT count(*) FROM TokenDto where specialityId="+obj.getSpecialityId()+" and doctorIdList="+obj.getDoctorId()+" and treatmentId="+obj.getTreatmentId()+" and queueStatus='next' ";
					Query outQuery = sessionFactory.getCurrentSession().createQuery(inHql);
					nextPatientCount = (Integer) outQuery.uniqueResult();
						
					inHql ="SELECT count(*) FROM TokenDto where specialityId="+obj.getSpecialityId()+" and doctorIdList="+obj.getDoctorId()+" and treatmentId="+obj.getTreatmentId()+" and queueStatus='wait' ";
					Query waitQuery = sessionFactory.getCurrentSession().createQuery(inHql);
					waitPatientCount = (Integer) waitQuery.uniqueResult();
					
					if(inPatientCount <= inCount) {
						
						String outUpdate = "UPDATE TokenDto SET queueStatus='in', sendDateTime=now(), sendBy="+obj.getUserId()+" WHERE speciality_id="+obj.getSpecialityId()+" and treatment_id="+obj.getTreatmentId()+" and doctorIdList="+obj.getDoctorId()+"  ";
						Query qoutUpdate = sessionFactory.getCurrentSession().createQuery(outUpdate);
						qoutUpdate.executeUpdate();
						result = "3";
						
					}else if(nextPatientCount <= nextCount) {
						
						String outUpdate = "UPDATE TokenDto SET queueStatus='next', sendDateTime=now(), sendBy="+obj.getUserId()+" WHERE speciality_id="+obj.getSpecialityId()+" and treatment_id="+obj.getTreatmentId()+" and doctorIdList="+obj.getDoctorId()+"  ";
						Query qoutUpdate = sessionFactory.getCurrentSession().createQuery(outUpdate);
						qoutUpdate.executeUpdate();
						result = "3";
						
					}else if(waitPatientCount <= waitCount) {
						
						String outUpdate = "UPDATE TokenDto SET queueStatus='wait', sendDateTime=now(), sendBy="+obj.getUserId()+" WHERE speciality_id="+obj.getSpecialityId()+" and treatment_id="+obj.getTreatmentId()+" and doctorIdList="+obj.getDoctorId()+"  ";
						Query qoutUpdate = sessionFactory.getCurrentSession().createQuery(outUpdate);
						qoutUpdate.executeUpdate();
						result = "3";
						
					}else {
						
						result = "-1";
					}					
				}*/	
				return result;
				
			}catch (Exception e) {
				e.printStackTrace();
				return "0";
			}
		}
		
		@Override
		public List<OPDConstultantDoctorDto> getlstIPDConsultantDoctor(Integer treatmentId,Integer patientId,Integer unitId) {
			
			List<OPDConstultantDoctorDto> list = new ArrayList<OPDConstultantDoctorDto>();
			  TreatmentDto obj=(TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class,treatmentId);
			  String doctorIdList=obj.getDoctorIdList();
			
			
			try {
				
				  Query q=sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_consulting_doctor_by_treatment_id_ipd(:patientId,:treatmentId,:unitId,:doctorList)");
				  q.setParameter("patientId", patientId);
				  q.setParameter("treatmentId", treatmentId);
				  q.setParameter("unitId", unitId);
				  q.setParameter("doctorList", doctorIdList);
				  
				  q.setResultTransformer(Transformers.aliasToBean(OPDConstultantDoctorDto.class));
				  list=q.list();
				
			}catch (Exception e) {
				
			}
			
			return list;
		}
		
		
		@Override
		public int addNewConsultantIpd(BillDetailsIpdDto billDetailsDto, String queryType) {
			int a = 0;
			try {
				BillDetailsIpdDto billDetailsDtoSave = new BillDetailsIpdDto();
				String conChargesQuery = "";
				String sql = "";
				int patId = billDetailsDto.getPatienttId();
				int treatId = billDetailsDto.getTreatmentId();
				int unitId = billDetailsDto.getUnitId();
	        	
				//sql="select ifnull(doctor_id,'0') as doctor_id from ehat_treatment where treatment_id="+treatId;
				//Query docIdList = sessionFactory.getCurrentSession().createSQLQuery(sql);
				  sql="Select   doctorIdList from TreatmentDto  where treatmentId="+treatId+" ";
				  Query docIdList=sessionFactory.getCurrentSession().createQuery(sql);
				
				
				
				String docIdListStr = (String) docIdList.uniqueResult();
							
				if (queryType.equalsIgnoreCase("delete")) {
					
				
					
				//	sql="select bill_details_id FROM ehat_bill_details where deleted='N' and cancle ='N' and treatment_id ="+treatId+" and doctor_id="+billDetailsDto.getDoctorId();
					//Query conQueryIpd = sessionFactory.getCurrentSession().createSQLQuery(sql);			
					//int billdetailId = (Integer) conQueryIpd.uniqueResult();
					
					sql="Select billDetailsId  from BillDetailsIpdDto  where deleted='N' and cancle='N' and treatmentId="+treatId+" and doctorId="+billDetailsDto.getDoctorId()+" ";
					Query conQueryIpd = sessionFactory.getCurrentSession().createQuery(sql);
					int billdetailId = (Integer) conQueryIpd.uniqueResult();
					
					//sql= "UPDATE ehat_bill_details set deleted = 'Y',deleted_by = "+billDetailsDto.getCreatedBy()+",deleted_date_time = concat(curdate(), ' ', curtime()) WHERE bill_details_id ="+billdetailId;
					//Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
					
					sql="UPDATE BillDetailsIpdDto set deleted='Y',deletedBy="+billDetailsDto.getCreatedBy()+",deletedDateTime=now() where billDetailsId="+billdetailId+" ";
					Query query=sessionFactory.getCurrentSession().createQuery(sql);
					query.executeUpdate();	
					
					String docIdListStrNew="";
					String[] ary = docIdListStr.split(",");
					for (int i = 0; i < ary.length; i++) {
						
						if(Integer.parseInt(ary[i]) != billDetailsDto.getDoctorId()){
							
							docIdListStrNew = docIdListStrNew + ary[i]+",";
						}
					}		
					
					//ql = "UPDATE ehat_treatment set doctor_id ='"+docIdListStrNew.substring(0,docIdListStrNew.length()-1)+"' WHERE treatment_id ="+treatId;
					sql="UPDATE TreatmentDto set doctorIdList='"+docIdListStrNew+"' where treatmentId="+treatId+"  ";
					Query queryTreat = sessionFactory.getCurrentSession().createQuery(sql);
					queryTreat.executeUpdate();	
					
				} else if (queryType.equalsIgnoreCase("insert")) {
						
					
					int sourceTypeId = 0;
					int billId = 0;
					int departmentId = 0;
					int sponsorId = 0;
					int chargesSlaveId = 0;
					
					
					if(docIdListStr.contains(String.valueOf(billDetailsDto.getDoctorId()))){
						
						a = -5;
					}else{				
					
					//	sql="select * from ehat_bill_master where treatment_id="+treatId;
						//Query billQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);				
					//	billQuery.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
						/*
						 * @SuppressWarnings("unchecked") List<Map<String, Object>> listBillDetails =
						 * billQuery.list(); for(Map<String, Object> row : listBillDetails){
						 * 
						 * billId = (Integer)row.get("bill_id"); chargesSlaveId =
						 * (Integer)row.get("charges_master_slave_id"); sourceTypeId =
						 * (Integer)row.get("source_type_id"); departmentId =
						 * (Integer)row.get("department_id"); unitId = (Integer)row.get("unit_id");
						 * if(chargesSlaveId > 0){ sponsorId = 1; }else{ sponsorId = 0; } }
						 */
					
						
						
						
						  Query q=sessionFactory.getCurrentSession().createSQLQuery("CALL sp_opd_bill_details_by_treatment_id(:treatmentId,:unitId)");
						  q.setParameter("treatmentId", treatId);
						  q.setParameter("unitId", unitId);
						  q.setResultTransformer(Transformers.aliasToBean(OPDAddConstlutantDto.class));
						OPDAddConstlutantDto  bobj=(OPDAddConstlutantDto) q.uniqueResult();
						if(bobj !=null) {
						billId=bobj.getBill_id();
						chargesSlaveId=bobj.getCharges_master_slave_id();
						sourceTypeId=bobj.getSource_type_id();
						departmentId=bobj.getDepartment_id();
						unitId=bobj.getUnit_id();
						}
						
						
						
						
						billDetailsDtoSave.setPatienttId(patId);
						billDetailsDtoSave.setTreatmentId(treatId);
						billDetailsDtoSave.setBillId(billId);		
						billDetailsDtoSave.setUnitId(unitId);
						billDetailsDtoSave.setChargesSlaveId(chargesSlaveId);
						billDetailsDtoSave.setSourceTypeId(sourceTypeId);
						billDetailsDtoSave.setSponsorId(sponsorId);
						billDetailsDtoSave.setDepartmentId(departmentId);
						billDetailsDtoSave.setPaidFlag("N");
						billDetailsDtoSave.setDoctorId(billDetailsDto.getDoctorId());				
						billDetailsDtoSave.setCreatedBy(billDetailsDto.getCreatedBy());
						billDetailsDtoSave.setCreatedDateTime(new Date(new java.util.Date().getTime()));
						
						int hallslave_id = 0;
						if(departmentId == 1){
							
							hallslave_id = -1;
						}else if(departmentId == 3){
							
							hallslave_id = -3;
						}
						
						String doctorIdList = String.valueOf(billDetailsDto.getDoctorId());
						if (masterConfigAccess(billDetailsDtoSave.getUnitId(),billDetailsDtoSave.getDepartmentId(), 2)) {
							if (!doctorIdList.equalsIgnoreCase("") && !doctorIdList.equalsIgnoreCase(null)) {
								//String[] ary = doctorIdList.split(",");
								//ary[0] = doctorIdList;
								for (int i = 0; i < 1; i++) {
									
									int docId = billDetailsDto.getDoctorId();//Integer.parseInt(ary[i]);
									
									String subServQueryForId = "SELECT ifnull(id,0) as id FROM ehat_subservice where service_id=2 and deleted='N' limit 1";
									
									// query to fetch consultation charges of the doctor
									//conChargesQuery ="SELECT ifnull(doctorfee,0) as doctorfee FROM doctor where Doctor_ID=(:doctorId)";
									if (chargesSlaveId > 0) {
					    	    		
					    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
						    	    	
					    	    	}else{
					    	    		
					    	    		conChargesQuery = "SELECT ifnull(consult_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
					    	    	}
									
									//if (queryType.equalsIgnoreCase("markvisit")) {}
									
									SimpleDateFormat dayFormatter = new SimpleDateFormat("E");
						    	    String currentDay = dayFormatter.format(currentDate.getTime());
						    	    
						    	    if(currentDay.equalsIgnoreCase("Sun")){
						    	    	
						    	    	if (chargesSlaveId > 0) {
						    	    		
						    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
							    	    	
						    	    	}else{
						    	    		
						    	    		conChargesQuery = "SELECT ifnull(consult_weekend_amnt,0) as doctorfee FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";							    	    	
						    	    	}
						    	    }				    	    
									
									double constCharges = 0;
									String sqlC = "";
									if (chargesSlaveId > 0) {
										
										sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and sponserslave_id = "+chargesSlaveId+" and hallslave_id = "+hallslave_id+" and drflag = 'S' and deleted = 'N'";
									}else{
										
										sqlC = "SELECT count(dr_id) FROM ehat_consultation_charges_master where dr_id = "+docId+" and hallslave_id = "+hallslave_id+" and drflag = 'H' and deleted = 'N'";
									}
									
									Query refQuery = sessionFactory.getCurrentSession().createSQLQuery(sqlC);
									int countDr = ((Number)refQuery.uniqueResult()).intValue();
									
									if(countDr > 0){
										
										Query q1 = sessionFactory.getCurrentSession().createSQLQuery(conChargesQuery);
										constCharges = (Double) q1.uniqueResult();
									}else{
										
										constCharges = 0; 
									}	
									// added by vinod
																
									Query q2 = sessionFactory.getCurrentSession().createSQLQuery(subServQueryForId);
									Integer subServIdConcsultaion = ((Number) q2.uniqueResult()).intValue();
		
									//check for holiday=today?
									Query qCount = sessionFactory.getCurrentSession().createSQLQuery("select count(*) from hospital_holiday where date="+todays_date4);
									Integer countHoliday = ((Number) qCount.uniqueResult()).intValue();
									
									//check for sunday today?
									if(countHoliday > 0 || chkEmergencyTime()){
						    	    	
						    	    	//fetch emergency percentage
						    	    	double emrChrPer = getEmergencyPer();				    	    	
						    	    	constCharges = constCharges *(1+emrChrPer/100);
						    	    }
						    	    
									billDetailsDtoSave.setRate(constCharges);
									billDetailsDtoSave.setQuantity(1);
									billDetailsDtoSave.setAmount(constCharges * 1);
									billDetailsDtoSave.setServiceId(2);
									
									// doctor
									if(subServIdConcsultaion .equals("") ||  subServIdConcsultaion.equals(null) || subServIdConcsultaion.equals("null")) {
										subServIdConcsultaion=0;
									}
									
									billDetailsDtoSave.setSubServiceId(subServIdConcsultaion);
									billDetailsDtoSave.setOtherAmount(constCharges * 1);
									billDetailsDtoSave.setOtherRate(constCharges);
									billDetailsDtoSave.setOtherPay(constCharges * 1);
									billDetailsDtoSave.setCoPay(constCharges);							
									
									// Entry in database ipd bill table for consultation
									sessionFactory.getCurrentSession().merge(billDetailsDtoSave);							
		
									docIdListStr = docIdListStr + "," + docId;								
									//sql = "UPDATE ehat_treatment set doctor_id ='"+docIdListStr+"' WHERE treatment_id ="+treatId;
									//Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
									sql="UPDATE TreatmentDto set doctorIdList='"+docIdListStr+"' where treatmentId="+treatId+"  ";
									Query query = sessionFactory.getCurrentSession().createQuery(sql);
									
									query.executeUpdate();								

									a = maxCountOfColumn(BillDetailsDto.class, "billDetailsId");
								}
							}					
						}			
					}
				} 			

			} catch (Exception e) {
				e.printStackTrace();
				a = -1;
			}
			// returning bill_Id
			return a;
		}
		
		@Override
		public List<OPDConstultantDoctorDto> getIPDConsultantDoctorNew(Integer treatmentId,Integer patientId,Integer unitId) {
			
			List<OPDConstultantDoctorDto> list = new
					 ArrayList<OPDConstultantDoctorDto>();
			/*
			 * List<OPDConstultantDoctorDto> list = new
			 * ArrayList<OPDConstultantDoctorDto>(); TreatmentDto obj=(TreatmentDto)
			 * sessionFactory.getCurrentSession().get(TreatmentDto.class,treatmentId);
			 * String doctorIdList=obj.getDoctorIdList();
			 */
			
			
			try {
				
				  Query q=sessionFactory.getCurrentSession().createSQLQuery("CALL sp_get_consulting_doctor_by_treatment_id_ipd_new(:patientId,:treatmentId,:unitId,:doctorList)");
				  q.setParameter("patientId", patientId);
				  q.setParameter("treatmentId", treatmentId);
				  q.setParameter("unitId", unitId);
				  q.setParameter("doctorList", "0");
				  
				  q.setResultTransformer(Transformers.aliasToBean(OPDConstultantDoctorDto.class));
				  list=q.list();
				
			}catch (Exception e) {
				
			}
			
			return list;
		}
}



