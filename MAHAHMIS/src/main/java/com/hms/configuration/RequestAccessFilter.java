package com.hms.configuration;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

@WebFilter("/*")
public class RequestAccessFilter implements Filter {  
    @Override  
    public void destroy() {  
         // Nothing Needed            
    }  
    @Override  
    public void doFilter(ServletRequest request, ServletResponse response,  
              FilterChain chain) throws IOException, ServletException {  
         Context context = Context.newInstance((HttpServletRequest) request);  
         try {  
           chain.doFilter(request, response);  
         } finally {  
           context.release();  
         }  
    }  
    @Override  
    public void init(FilterConfig arg0) throws ServletException {  
         // Nothing Needed  
    }  
}  
