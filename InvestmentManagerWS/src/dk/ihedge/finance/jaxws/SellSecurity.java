
package dk.ihedge.finance.jaxws;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

/**
 * This class was generated by Apache CXF 2.7.4
 * Wed May 29 21:33:20 CEST 2013
 * Generated source version: 2.7.4
 */

@XmlRootElement(name = "sellSecurity", namespace = "http://finance.ihedge.dk/")
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "sellSecurity", namespace = "http://finance.ihedge.dk/", propOrder = {"login", "security"})

public class SellSecurity {

    @XmlElement(name = "login")
    private java.lang.String login;
    @XmlElement(name = "security")
    private dk.ihedge.finance.dtl.Security security;

    public java.lang.String getLogin() {
        return this.login;
    }

    public void setLogin(java.lang.String newLogin)  {
        this.login = newLogin;
    }

    public dk.ihedge.finance.dtl.Security getSecurity() {
        return this.security;
    }

    public void setSecurity(dk.ihedge.finance.dtl.Security newSecurity)  {
        this.security = newSecurity;
    }

}

