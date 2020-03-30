Feature: Get an Google Meet link for a Course
  As a Canvas user (teacher, student)
  I want to use Google Meet
  So that I can be safe during the Coronavirus

  Scenario: a Google Meet already exists for the Course
    Given a course in Canvas
    And a logged in user on the course page
    And a Google Meet entry exist for the course
    When the user clicks on "Google Meet" Link
    Then the user will have a page with a valid google meet link
    And a valid dial-in phone number
    And a valid verification code.

  Scenario: a Google Meet does not exist for the Course
    Given a course in Canvas
    And a logged in user on the course page
    And no Google Meet entry for the course
    When the user clicks on "Google Meet" Link
    Then the user will have a page with a valid google meet link
    And a valid dial-in phone number
    And a valid verification code.
