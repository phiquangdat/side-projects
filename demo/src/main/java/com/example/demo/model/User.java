package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String displayName;
    
    private String city;
    private String state;
    private String zip;
    private Boolean peanutAllergy;
    private Boolean eggAllergy;
    private Boolean dairyAllergy;

    // Manual getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String displayName) { this.displayName = displayName; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getState() { return state; }
    public void setState(String state) { this.state = state; }
    public String getZip() { return zip; }
    public void setZip(String zip) { this.zip = zip; }
    public Boolean getPeanutAllergy() { return peanutAllergy; }
    public void setPeanutAllergy(Boolean peanutAllergy) { this.peanutAllergy = peanutAllergy; }
    public Boolean getEggAllergy() { return eggAllergy; }
    public void setEggAllergy(Boolean eggAllergy) { this.eggAllergy = eggAllergy; }
    public Boolean getDairyAllergy() { return dairyAllergy; }
    public void setDairyAllergy(Boolean dairyAllergy) { this.dairyAllergy = dairyAllergy; }
}
