package com.hms.ecogreenapi;

import java.util.Date;

import org.springframework.http.HttpStatus;

public class PharmaIndentErrorDTO  {
	 private transient String msg;
	 private transient HttpStatus status;
	 private transient String  date;
public String getMsg() {
	return msg;
}
public void setMsg(String msg) {
	this.msg = msg;
}
public HttpStatus getStatus() {
	return status;
}
public void setStatus(HttpStatus status) {
	this.status = status;
}
public String getDate() {
	return date;
}
public void setDate(String date) {
	this.date = date;
}
@Override
public String toString() {
	return "PharmaIndentErrorDTO [msg=" + msg + ", status=" + status + ", date=" + date + "]";
}

   
   
}
