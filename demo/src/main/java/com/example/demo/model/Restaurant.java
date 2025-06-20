package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Restaurant {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String address;
  private String city;
  private String state;
  private String zip;

  private Double peanutScore;
  private Double eggScore;
  private Double dairyScore;
  private Double overallScore;

  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }

  public String getCity() { return city; }
  public void setCity(String city) { this.city = city; }

  public String getState() { return state; }
  public void setState(String state) { this.state = state; }

  public String getZip() { return zip; }
  public void setZip(String zip) { this.zip = zip; }

  public Double getPeanutScore() { return peanutScore; }
  public void setPeanutScore(Double peanutScore) { this.peanutScore = peanutScore; }

  public Double getEggScore() { return eggScore; }
  public void setEggScore(Double eggScore) { this.eggScore = eggScore; }

  public Double getDairyScore() { return dairyScore; }
  public void setDairyScore(Double dairyScore) { this.dairyScore = dairyScore; }
  
  public Double getOverallScore() { return overallScore; }
  public void setOverallScore(Double overallScore) { this.overallScore = overallScore; }
}
