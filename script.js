$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
    $('.tron-button').click(clickedTronButton);
  
})
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name:"Bit", weight: 15, happiness: 20};
  
    function clickedTreatButton() {
      // Increase pet happiness
      pet_info.happiness += 2;
      // Increase pet weight
      pet_info.weight += 3;
      updatePetMessage("Tasty snack!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedPlayButton() {
      // Increase pet happiness
      pet_info.happiness += 5;
      // Decrease pet weight
      pet_info.weight -= 2;
      updatePetMessage("That was fun!");
      checkAndUpdatePetInfoInHtml();
    }
    
    function clickedExerciseButton() {
      // Decrease pet happiness
      pet_info.happiness -= 3;
      // Decrease pet weight
      pet_info.weight -= 5;
      updatePetMessage("Good workout!");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedNapButton() {
      pet_info.happiness += 1;
      updatePetMessage("Feeling rested.");
      checkAndUpdatePetInfoInHtml();
    }

    function clickedTronButton() {
      pet_info.happiness += 10;
      pet_info.weight -= 8;
      updatePetMessage("Greetings, Program! Light Cycle racing is intense!");
      checkAndUpdatePetInfoInHtml();
    }
  
    function checkAndUpdatePetInfoInHtml() {
      checkWeightAndHappinessBeforeUpdating();  
      updatePetInfoInHtml();
    }
    
    function checkWeightAndHappinessBeforeUpdating() {
      // Add conditional so if weight is lower than zero.
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }
      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }

      // Explosion Logic
      if (pet_info.weight > 30 || pet_info.happiness <= 0 || pet_info.happiness >= 100||pet_info.weight <=0 ) {
        $('.pet-image').wrap("<div style='background: #00ffff; border: 50px solid white; border-radius: 50%; padding: 20px;'></div>");
        
        setTimeout(function() {
          $('.pet-image').parent().remove();
          $('.button-container').empty();
          $('#pet-comment').text("DEREZZED! " + pet_info.name + " has left the grid.");
        }, 300);
      }
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
    }

    function updatePetMessage(msg) {
       
      $('#pet-comment').empty();
      $('#pet-comment').text(msg);

      if ($('.pet-image').length > 0) {
         
        $('.pet-image').wrap("<div style='border: 3px dashed #00ffff; display: inline-block;'></div>");
        
        setTimeout(function() {
           
          $('.pet-image').unwrap();
        }, 500);
      }
    }