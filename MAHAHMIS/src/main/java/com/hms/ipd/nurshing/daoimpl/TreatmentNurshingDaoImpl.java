package com.hms.ipd.nurshing.daoimpl;

import java.text.DateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dto.OPDChemoTheropyDTO;
import com.hms.dto.Users;
import com.hms.ehat.dto.AutosugeestionDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.ipd.nurshing.dao.TreatmentNurshingDao;
import com.hms.ipd.nurshing.dto.ChartInfoDTO;
import com.hms.ipd.nurshing.dto.ChartReportDTO;
import com.hms.ipd.nurshing.dto.NurshingCarePlanDTO;
import com.hms.ipd.nurshing.dto.NurshingDrugAdministartionDTO;
import com.hms.ipd.nurshing.dto.NurshingPainScaleDTO;
import com.hms.ipd.nurshing.dto.TreatmentNurshingDTO;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;

@Repository
public class TreatmentNurshingDaoImpl implements TreatmentNurshingDao {

	DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
	java.util.Calendar currentDate1 = java.util.Calendar.getInstance();
	String current_date_time = dateFormat.format(currentDate1.getTime());
	
	@Autowired
	SessionFactory sf;
	
	@Override
	public int saveNurshingChartDetails(TreatmentNurshingDTO obj,String password) {
		 try {
			    
			        Users uobj=(Users) sf.getCurrentSession().get(Users.class, obj.getNurseId());
			        if(uobj.getPassword().equalsIgnoreCase(password)) {
							 if(obj.getId() == 0) {
								 obj.setAssign_date_time(current_date_time);
								 sf.getCurrentSession().merge(obj);
								 return 1;
							 }else {
								 obj.setAssign_date_time(current_date_time);
								 sf.getCurrentSession().merge(obj);
								 return 2;
							 }
			        }else {
			        	return 3;
			        }
			 
		 }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<TreatmentNurshingDTO> getNurchingChartDetails(int treatmentId, int unitId,String date) {
	        List<TreatmentNurshingDTO> list=new ArrayList<>();
	        try {
	        	
	        Criteria c	=sf.getCurrentSession().createCriteria(TreatmentNurshingDTO.class);
	        c.add(Restrictions.eq("deleted", "N"));
	        c.add(Restrictions.eq("treatmentId", treatmentId));
	        c.add(Restrictions.eq("unitId", unitId));
	        c.add(Restrictions.eq("dateVital", date));
	        list=  c.list();
	        }catch (Exception e) {
				e.printStackTrace();
			}
		return list;
	}

	@Override
	public int deleteNusrshingDetails(String ids, int UserId) {
	 
		try {
			String hql= "Update TreatmentNurshingDTO set deleted='Y',deletedBy="+UserId+" where id in ("+ids+") ";
			Query q=sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		  
		return 0;
	}

	@Override
	public int saveInputOutputNurshingChart(ChartInfoDTO obj) {
	
		  try {
			   if(obj.getId()==0) {
				   sf.getCurrentSession().merge(obj);
				   return 1;
			   }else {
				   sf.getCurrentSession().merge(obj);
				   return 2;
			   }
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<ChartInfoDTO> getListOfInputOutputDetails(int treatmentId, int unitId, int cType,String vitalDate) {
		List<ChartInfoDTO> list=new ArrayList<>();
		try {
	        Criteria c =sf.getCurrentSession().createCriteria(ChartInfoDTO.class);
	        c.add(Restrictions.eq("treatmentId", treatmentId));
	        c.add(Restrictions.eq("unitId", unitId));
	        c.add(Restrictions.eq("cType", cType));
	        c.add(Restrictions.eq("dateVital", vitalDate));
	        c.add(Restrictions.eq("deleted", "N"));
	        list=c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public ChartInfoDTO editChartInfo(int chartId) {
		ChartInfoDTO obj=new ChartInfoDTO(); 
		try {
			obj=(ChartInfoDTO) sf.getCurrentSession().get(ChartInfoDTO.class, chartId);
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int deleteInputOutputDetails(int id,int UserId) {
		try {
			String hql= "Update ChartInfoDTO set deleted='Y',deletedBy="+UserId+" where id="+id+"  ";
			Query q=sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		  
		return 0;
	}

	@Override
	public int saveIpdVitals(ChartReportDTO obj) {
		       try {
		    	   sf.getCurrentSession().merge(obj);
		       }catch (Exception e) {
				e.printStackTrace();
			}
		return 0;
	}

	@Override
	public List<ChartReportDTO> getIpdVitalList(int treatmentId, int unitId,String todayDate) {
		List<ChartReportDTO> list=new ArrayList<>();
		try {
	        Criteria c =sf.getCurrentSession().createCriteria(ChartReportDTO.class);
	        c.add(Restrictions.eq("treatmentId", treatmentId));
	        c.add(Restrictions.eq("unitId", unitId));
	        c.add(Restrictions.eq("deleted", "N"));
	        c.add(Restrictions.eq("dateVital", todayDate));
	        c.add(Restrictions.eq("chartId", 0));
	        list=c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int savePostIntensvisit(ChartReportDTO obj) {
	     try {
	    	    if(obj.getId() == 0) {
	    	    	sf.getCurrentSession().merge(obj);
	    	    	return 1;
	    	    }else {
	    	    	sf.getCurrentSession().merge(obj);
	    	    	return 2;
	    	    }
	    	 
	     }catch (Exception e) {
		    e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<ChartReportDTO> getPostIntensvisit(int treatmentId, int unitId, String todayDate, int chartType) {
		List<ChartReportDTO> list=new ArrayList<>();
		try {
	        Criteria c =sf.getCurrentSession().createCriteria(ChartReportDTO.class);
	        c.add(Restrictions.eq("treatmentId", treatmentId));
	        c.add(Restrictions.eq("unitId", unitId));
	        c.add(Restrictions.eq("deleted", "N"));
	        c.add(Restrictions.eq("dateVital", todayDate));
	        c.add(Restrictions.eq("chartId", chartType));
	        list=c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int saveNurshingCarePlan(NurshingCarePlanDTO obj) {
		    try {
		    	  if(obj.getId() == 0) {
		    		  sf.getCurrentSession().merge(obj);
		    		  return 1;
		    	  }else {
		    		  sf.getCurrentSession().merge(obj);
		    		  return 2;
		    	  }
		    }catch (Exception e) {
				e.printStackTrace();
			}
		return 0;
	}

	@Override
	public NurshingCarePlanDTO getNurshingCarePlan(int treatmentId, int unitId) {
		NurshingCarePlanDTO obj=new NurshingCarePlanDTO(); 
		try {
			Criteria c   =sf.getCurrentSession().createCriteria(NurshingCarePlanDTO.class);
			c.add(Restrictions.eq("treatmentId", treatmentId));
			c.add(Restrictions.eq("unitId", unitId));
			obj=(NurshingCarePlanDTO) c.uniqueResult();
		   }catch (Exception e) {
			e.printStackTrace();
		}
		return obj;
	}

	@Override
	public int saveNurshingPainScale(NurshingPainScaleDTO obj) {
		try {
			if(obj.getId() == 0) {
				sf.getCurrentSession().merge(obj);
				return 1;
			}else {
				sf.getCurrentSession().merge(obj);
				return 2;
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public NurshingPainScaleDTO getNurshingPainScale(int treatmentId, int unitId, String todayDate) {
		NurshingPainScaleDTO obj=new NurshingPainScaleDTO();           
		try {
		            Criteria c	=sf.getCurrentSession().createCriteria(NurshingPainScaleDTO.class);
		            c.add(Restrictions.eq("treatmentId", treatmentId));
					c.add(Restrictions.eq("unitId", unitId));
					c.add(Restrictions.eq("painScaleDate", todayDate));
					obj=(NurshingPainScaleDTO) c.uniqueResult();
		            }catch (Exception e) {
						e.printStackTrace();
					}
		return obj;
	}

	@Override
	public NurshingPainScaleDTO getNurshingPainScaleForPrint(int treatmentId, int unitId, String fromDate,	String toDate) {
		NurshingPainScaleDTO obj=new NurshingPainScaleDTO();		
		List<NurshingPainScaleDTO> list=new ArrayList<>();
				   try {
					 Criteria c  =sf.getCurrentSession().createCriteria(NurshingPainScaleDTO.class);
					 c.add(Restrictions.eq("treatmentId", treatmentId));
						c.add(Restrictions.eq("unitId", unitId));
						c.add(Restrictions.ge("painScaleDate", fromDate));
						c.add(Restrictions.le("painScaleDate", toDate));
						list=c.list();
						obj.setLstNurshingPainScale(list);
				   }catch (Exception e) {
					e.printStackTrace();
				}
					return obj;
		}

	@Override
	public int updateChemoDetailsOnNurshing(int id, String startTime, String stopTime, String sign, String remark) {
		  try {
			  String hql="Update OPDChemoTheropyDTO set startTime='"+startTime+"',endTime='"+stopTime+"',sign='"+sign+"', remark='"+remark+"' where chemoTheropyMasterId="+id+"   ";
			Query q  =sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			return 1;
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public int saveNurshingDrugAdministration(NurshingDrugAdministartionDTO obj, String password) {
		try {
			 Users uobj=(Users) sf.getCurrentSession().get(Users.class, obj.getDoctorId());
		        if(uobj.getPassword().equalsIgnoreCase(password)) {
			   if(obj.getId() == 0) {
				   sf.getCurrentSession().merge(obj);
				   return 1;
			   }else {
				   sf.getCurrentSession().merge(obj);
				   return 2;
			   }
		        }else {
		        	return 3;
		        }
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public List<NurshingDrugAdministartionDTO> getNurshingDrugAdministartionlist(int treatmentId, int unitId,String dateDrug) {
		List<NurshingDrugAdministartionDTO> list=new ArrayList<>();  
		
		
		
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			Date parsedDate = dateFormat.parse(dateDrug);

			LocalDate parsedLocalDate = parsedDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

			Criteria c = sf.getCurrentSession().createCriteria(NurshingDrugAdministartionDTO.class);
			c.add(Restrictions.eq("treatmentId", treatmentId));
			c.add(Restrictions.eq("unitId", unitId));
			c.add(Restrictions.eq("deleted", "N"));
			// Added By Tushar Jadhav
			c.add(Restrictions.sqlRestriction("DATE_FORMAT(created_date_time, '%Y-%m-%d') = ?",
					parsedLocalDate.toString(), StandardBasicTypes.STRING));

			list = c.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	//For Print getting all Drug for particular treatmentId
	@Override
	public List<NurshingDrugAdministartionDTO> getNurshingDrugAdministartionlist(int treatmentId, int unitId) {
		List<NurshingDrugAdministartionDTO> list = new ArrayList<>();

		try {
			Criteria c = sf.getCurrentSession().createCriteria(NurshingDrugAdministartionDTO.class);
			c.add(Restrictions.eq("treatmentId", treatmentId));
			c.add(Restrictions.eq("unitId", unitId));
			c.add(Restrictions.eq("deleted", "N"));
			list = c.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@Override
	public int deleteNusrshingDrugDetails(String ids, int UserId) {
		try {
			String hql= "Update NurshingDrugAdministartionDTO set deleted='Y',deletedBy="+UserId+" where id in ("+ids+") ";
			Query q=sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		  
		return 0;
	}

	@Override
	public List<AutosugeestionDto> getServiceDetailsOnNurshing(int serviceId,String findName, int unitId) {
		List<AutosugeestionDto> ltSubService=new ArrayList<AutosugeestionDto>();
		
		Integer depdocdeskid=2;
		try {
			Criteria criteria = sf.getCurrentSession().createCriteria(AutosugeestionDto.class);
			criteria.add(Restrictions.eq("categorydeleted", "N"));
			criteria.add(Restrictions.eq("isCategory", "N"));
			criteria.add(Restrictions.eq("servicdeleted", "N"));
			criteria.add(Restrictions.eq("unitid", unitId));
			criteria.add(Restrictions.eq("serviceid", serviceId));
			criteria.add(Restrictions.eq("dept_id", depdocdeskid));
			criteria.add(Restrictions.ilike("categoryName", "%"+findName+"%"));
			criteria.setMaxResults(15);
			ltSubService = criteria.list();
		}catch (Exception e) {
			e.printStackTrace();
		}
		return ltSubService;
	}

	@Override
	public int deleteIpdServiceDetailsOnNusrshing(String ids, int UserId) {
		try {
			String hql= "Update BillDetailsIpdDto set deleted='Y',deletedBy="+UserId+" where billDetailsId in ("+ids+") ";
			Query q=sf.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			return 1;
		}catch (Exception e) {
			e.printStackTrace();
		}
		  
		return 0;
	}

	@Override
	public List<OPDChemoTheropyDTO> getListOfChemoDetails(int treatmentId, int unitId) {
		 List<OPDChemoTheropyDTO> list=new ArrayList<>(); 
		try {
			    
			       TreatmentDto tobj = (TreatmentDto) sf.getCurrentSession().get(TreatmentDto.class, treatmentId);
			     Criteria c = sf.getCurrentSession().createCriteria(OPDChemoTheropyDTO.class);
			          c.add(Restrictions.eq("treatObj", tobj));
			          list=c.list();
		  }catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<NurshingPainScaleDTO> getAllNurshingPainScale(int treatmentId, int unitId) {
		List<NurshingPainScaleDTO> obj = new ArrayList<NurshingPainScaleDTO>();          
		try {
		            Criteria c	=sf.getCurrentSession().createCriteria(NurshingPainScaleDTO.class);
		            c.add(Restrictions.eq("treatmentId", treatmentId));
					c.add(Restrictions.eq("unitId", unitId));
					obj=c.list();
					//retrun obj;
		            }catch (Exception e) {
						e.printStackTrace();
					}
		return obj;
	}

	
	
	
}
