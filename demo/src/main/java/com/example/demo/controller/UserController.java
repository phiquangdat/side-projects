package com.example.demo.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.controller.UserController.UserDto;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {
  private final UserRepository userRepository;

  public UserController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @PostMapping
  public ResponseEntity<?> createUser(@RequestBody @Valid UserDto dto) {
    if (userRepository.existsByDisplayName(dto.getDisplayName())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body("Display name already exists");
    }
    User user = new User();
    user.setDisplayName(dto.getDisplayName());
    user.setCity(dto.getCity());
    user.setState(dto.getState());
    user.setZip(dto.getZip());
    user.setPeanutAllergy(dto.getPeanutAllergy());
    user.setEggAllergy(dto.getEggAllergy());
    user.setDairyAllergy(dto.getDairyAllergy());
    userRepository.save(user);
    return ResponseEntity.status(HttpStatus.CREATED).body(new UserDto(user));
  }

  @PutMapping("/{displayName}")
  public ResponseEntity<?> updateUser(@PathVariable String displayName, @RequestBody @Valid UserDto dto) {
    Optional<User> userOpt = userRepository.findByDisplayName(displayName);
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
    User user = userOpt.get();
    user.setCity(dto.getCity());
    user.setState(dto.getState());
    user.setZip(dto.getZip());
    user.setPeanutAllergy(dto.getPeanutAllergy());
    user.setEggAllergy(dto.getEggAllergy());
    user.setDairyAllergy(dto.getDairyAllergy());
    userRepository.save(user);
    return ResponseEntity.ok(new UserDto(user));
  }

  @GetMapping("/{displayName}")
  public ResponseEntity<?> getUser(@PathVariable String displayName) {
    Optional<User> userOpt = userRepository.findByDisplayName(displayName);
    if (userOpt.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
    }
    return ResponseEntity.ok(new UserDto(userOpt.get()));
  }

  public static class UserDto {
    private String displayName;
    private String city;
    private String state;
    private String zip;
    private Boolean peanutAllergy;
    private Boolean eggAllergy;
    private Boolean dairyAllergy;
    public UserDto() {}
    public UserDto(User u) {
      this.displayName = u.getDisplayName();
      this.city = u.getCity();
      this.state = u.getState();
      this.zip = u.getZip();
      this.peanutAllergy = u.getPeanutAllergy();
      this.eggAllergy = u.getEggAllergy();
      this.dairyAllergy = u.getDairyAllergy();
    }

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
}
