package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiningReview {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String displayName;
  private Long restaurantId;
  private Double peanutScore;
  private Double eggScore;
  private Double dairyScore;
  private String commentary;

  @Enumerated(EnumType.STRING)
  private DiningReviewStatus status;

  public enum DiningReviewStatus {
    PENDING,
    APPROVED,
    REJECTED
  }

  // Manual getters and setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getDisplayName() { return displayName; }
  public void setDisplayName(String displayName) { this.displayName = displayName; }
  public Long getRestaurantId() { return restaurantId; }
  public void setRestaurantId(Long restaurantId) { this.restaurantId = restaurantId; }
  public Double getPeanutScore() { return peanutScore; }
  public void setPeanutScore(Double peanutScore) { this.peanutScore = peanutScore; }
  public Double getEggScore() { return eggScore; }
  public void setEggScore(Double eggScore) { this.eggScore = eggScore; }
  public Double getDairyScore() { return dairyScore; }
  public void setDairyScore(Double dairyScore) { this.dairyScore = dairyScore; }
  public String getCommentary() { return commentary; }
  public void setCommentary(String commentary) { this.commentary = commentary; }
  public DiningReviewStatus getStatus() { return status; }
  public void setStatus(DiningReviewStatus status) { this.status = status; }
}
